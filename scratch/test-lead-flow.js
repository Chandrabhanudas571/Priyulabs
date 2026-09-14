// Comprehensive Automated Test Suite for Priyulabs Free Trial & Lead System

// Mock Memory Cache for Idempotency Simulation
const mockCache = new Map();

function simulateAppsScript(payload) {
  // 1. Anti-spam honeypot
  if (payload.website || payload.hp_field || payload.honeypot || payload.website_hp) {
    return { success: false, message: "Submission rejected" };
  }

  // 2. Extract & sanitize
  const name = (payload.name || "").trim().substring(0, 100);
  const businessType = (payload.businessType || payload.BusinessType || payload.StoreName || "").trim().substring(0, 150);
  const service = (payload.service || payload.Service || payload.Category || "").trim().substring(0, 100);
  const customRequirement = (payload.customRequirement || payload.CustomRequirement || "").trim().substring(0, 1500);
  const mobile = (payload.mobile || payload.Mobile || payload.phone || payload.Phone || "").trim().substring(0, 30);
  const source = (payload.source || "free-trial-form").trim().substring(0, 100);
  const pageUrl = (payload.pageUrl || "").trim().substring(0, 500);
  const requestId = (payload.requestId || "").trim().substring(0, 100);

  // 3. Server-side Validations
  if (!name || name.length < 2) {
    return { success: false, message: "Please provide a valid name" };
  }

  if (!mobile || !/^[0-9+\-\s()]{7,20}$/.test(mobile)) {
    return { success: false, message: "Please provide a valid mobile or WhatsApp number" };
  }

  if (!businessType) {
    return { success: false, message: "Please select or provide your business type" };
  }

  if (!service) {
    return { success: false, message: "Please select a service or category" };
  }

  if (service.toLowerCase() === 'custom') {
    const words = customRequirement ? customRequirement.trim().split(/\s+/) : [];
    if (words.length === 0) {
      return { success: false, message: "Please describe what you need in the custom requirements field" };
    }
    if (words.length > 100) {
      return { success: false, message: "Custom requirement exceeds 100 words limit" };
    }
  }

  // 4. Deduplication / Idempotency Check
  const cleanPhone = mobile.replace(/[^0-9]/g, '');
  const dedupeKey = requestId ? `req_${requestId}` : `lead_${cleanPhone}_${name.toLowerCase()}`;
  if (mockCache.has(dedupeKey)) {
    return {
      success: true,
      message: "Lead already received and scheduled for follow-up",
      duplicate: true
    };
  }

  mockCache.set(dedupeKey, "processed");

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const row = [timestamp, name, businessType, service, customRequirement || "N/A", mobile, source, pageUrl];

  return {
    success: true,
    message: "Lead submitted successfully",
    capturedRow: row,
    emailRecipient: "priylabspos@gmail.com",
    emailSubject: `New Priyulabs Free Trial Lead — ${name}`
  };
}

// Mock Frontend Form Logic
function simulateFrontendSubmit(formData, mockNetworkResponse, mockNetworkError = false) {
  let formValues = { ...formData };
  let statusMessage = "";
  let isSuccess = false;
  let formReset = false;
  let buttonDisabled = true;

  // Frontend validation
  if (!formData.name || formData.name.length < 2) {
    return { isSuccess: false, formReset: false, statusMessage: "Please enter your full name.", formValues };
  }
  if (!formData.mobile || !/^[0-9+\-\s()]{7,20}$/.test(formData.mobile)) {
    return { isSuccess: false, formReset: false, statusMessage: "Please enter a valid phone or WhatsApp number.", formValues };
  }
  if (formData.service === 'Custom') {
    const words = formData.customRequirement ? formData.customRequirement.trim().split(/\s+/) : [];
    if (words.length === 0 || words.length > 100) {
      return { isSuccess: false, formReset: false, statusMessage: "Custom requirement validation failed.", formValues };
    }
  }

  // Network call simulation
  try {
    if (mockNetworkError) {
      throw new Error("Network offline or timeout");
    }

    if (mockNetworkResponse && mockNetworkResponse.success) {
      isSuccess = true;
      statusMessage = "Thank you! Your request has been submitted. Our team will contact you within 15 minutes.";
      formReset = true;
      formValues = { name: "", businessType: "", service: "POS", customRequirement: "", mobile: "" };
      buttonDisabled = false;
    } else {
      throw new Error(mockNetworkResponse?.message || "Submission failed");
    }
  } catch (err) {
    isSuccess = false;
    statusMessage = "Unable to submit your request right now. Please try again or reach out on WhatsApp.";
    formReset = false; // Form values MUST be retained on failure
    buttonDisabled = false; // Button re-enabled for retry
  }

  return { isSuccess, formReset, statusMessage, formValues, buttonDisabled };
}

let passed = 0;
let total = 0;

function assert(condition, testName) {
  total++;
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
  }
}

// 1. Valid Normal Lead
const t1 = simulateAppsScript({
  name: "Ramesh Kumar",
  businessType: "Restaurants & Fine Dining",
  service: "POS",
  mobile: "+91 98765 43210",
  source: "free-trial-form",
  pageUrl: "https://priyulabs.in/"
});
assert(t1.success === true && t1.capturedRow[1] === "Ramesh Kumar" && t1.emailRecipient === "priylabspos@gmail.com", "Test 1: Valid Normal Lead submission");

// 2. Valid Custom Lead under 100 words
const t2 = simulateAppsScript({
  name: "Pooja Sharma",
  businessType: "Apparel Boutique",
  service: "Custom",
  customRequirement: "Need dual display POS with integrated inventory barcode printing.",
  mobile: "9876543210",
  source: "free-trial-form",
  pageUrl: "https://priyulabs.in/"
});
assert(t2.success === true && t2.capturedRow[4].includes("dual display POS"), "Test 2: Valid Custom Lead under 100 words");

// 3. Missing / short Name
const t3 = simulateAppsScript({
  name: "A",
  businessType: "Cafe",
  service: "POS",
  mobile: "9876543210"
});
assert(t3.success === false && t3.message.includes("valid name"), "Test 3: Missing or short name rejection");

// 4. Invalid Phone Number
const t4 = simulateAppsScript({
  name: "Rajesh Mohanty",
  businessType: "Supermarket",
  service: "POS",
  mobile: "123"
});
assert(t4.success === false && t4.message.includes("valid mobile"), "Test 4: Invalid phone number rejection");

// 5. Missing Business Type
const t5 = simulateAppsScript({
  name: "Rajesh Mohanty",
  businessType: "",
  service: "POS",
  mobile: "9876543210"
});
assert(t5.success === false && t5.message.includes("business type"), "Test 5: Missing business type rejection");

// 6. Missing Service
const t6 = simulateAppsScript({
  name: "Rajesh Mohanty",
  businessType: "Retail",
  service: "",
  mobile: "9876543210"
});
assert(t6.success === false && t6.message.includes("service"), "Test 6: Missing service rejection");

// 7. Custom Requirement over 100 words
const over100Words = Array(105).fill("word").join(" ");
const t7 = simulateAppsScript({
  name: "Amit Patel",
  businessType: "Bakery",
  service: "Custom",
  customRequirement: over100Words,
  mobile: "9876543210"
});
assert(t7.success === false && t7.message.includes("exceeds 100 words"), "Test 7: Custom requirement > 100 words rejection");

// 8. Honeypot Populated (Anti-Spam)
const t8 = simulateAppsScript({
  name: "Spam Bot",
  businessType: "Spam Biz",
  service: "POS",
  mobile: "9876543210",
  website: "https://spam.com"
});
assert(t8.success === false && t8.message === "Submission rejected", "Test 8: Populated honeypot rejection");

// 9. Double Submission Protection / Idempotency
const reqId = "req_test_12345";
const t9_first = simulateAppsScript({
  name: "Sunil Verma",
  businessType: "Electronics",
  service: "Website Building",
  mobile: "9876543211",
  requestId: reqId
});
const t9_second = simulateAppsScript({
  name: "Sunil Verma",
  businessType: "Electronics",
  service: "Website Building",
  mobile: "9876543211",
  requestId: reqId
});
assert(t9_first.success === true && t9_second.duplicate === true, "Test 9: Duplicate submission detection via requestId");

// 10. Frontend Backend Success Response Handling
const validForm = { name: "Anil Dash", businessType: "Jewellery", service: "POS", mobile: "9876543212" };
const t10 = simulateFrontendSubmit(validForm, { success: true, message: "Lead submitted successfully" });
assert(t10.isSuccess === true && t10.formReset === true && t10.statusMessage.includes("submitted"), "Test 10: Backend success handling & form reset");

// 11. Frontend Backend Failure Response Handling
const t11 = simulateFrontendSubmit(validForm, { success: false, message: "Unable to submit lead" });
assert(t11.isSuccess === false && t11.formReset === false && t11.formValues.name === "Anil Dash", "Test 11: Backend failure handling & error message display");

// 12. Frontend Network Failure Handling
const t12 = simulateFrontendSubmit(validForm, null, true);
assert(t12.isSuccess === false && t12.formReset === false && t12.statusMessage.includes("Unable to submit"), "Test 12: Network failure handling without false success");

// 13. Form Values Retained on Failure
const customLeadForm = { name: "Sneha Roy", businessType: "Salons", service: "Custom", customRequirement: "Appointment booking app", mobile: "9876543213" };
const t13 = simulateFrontendSubmit(customLeadForm, { success: false });
assert(t13.formValues.name === "Sneha Roy" && t13.formValues.customRequirement === "Appointment booking app", "Test 13: Form values fully retained on failure for user retry");

// 14. Form Reset ONLY after Confirmed Success
const t14_fail = simulateFrontendSubmit(customLeadForm, { success: false });
const t14_pass = simulateFrontendSubmit(customLeadForm, { success: true });
assert(t14_fail.formReset === false && t14_pass.formReset === true, "Test 14: Form resets ONLY after confirmed success");

console.log(`\nResults: ${passed} / ${total} tests passed.`);
if (passed !== total) process.exit(1);
