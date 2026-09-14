// Live Invalid Request Verification Script
const ENDPOINT = "https://script.google.com/macros/s/AKfycbyH13ep4RQxIBDc8I1gGrwr9eVU9yEYY30psOD1akHgePYWSg34vzPn2BtyVk3QWzqegg/exec";

async function runTest(testName, payload) {
  console.log(`\n----------------------------------------`);
  console.log(`Running: ${testName}`);
  console.log(`Payload:`, JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    console.log(`HTTP Status: ${response.status} ${response.statusText}`);
    const text = await response.text();
    console.log(`Raw Response: ${text.substring(0, 300)}`);

    let json = null;
    try {
      json = JSON.parse(text);
      console.log(`Parsed JSON:`, json);
    } catch (e) {
      console.log(`Response is not JSON.`);
    }

    const isSuccess = json && json.success === true;
    const isExpectedFailure = json && json.success === false;

    if (isExpectedFailure) {
      console.log(`✅ Result: PASS (Rejected with success: false, message: "${json.message}")`);
      return true;
    } else if (isSuccess) {
      console.error(`❌ Result: FAIL (Expected rejection, but got success: true)`);
      return false;
    } else {
      console.error(`❌ Result: FAIL (Unexpected response format)`);
      return false;
    }
  } catch (err) {
    console.error(`❌ Request Error:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`====================================================`);
  console.log(`LIVE INVALID REQUEST TEST ON PRODUCTION ENDPOINT`);
  console.log(`Endpoint: ${ENDPOINT}`);
  console.log(`====================================================`);

  const basePayload = {
    name: "Valid Name",
    businessType: "Restaurant",
    service: "Smart POS",
    mobile: "9876543210",
    customRequirement: "",
    source: "invalid-test-suite",
    pageUrl: "https://priyulabs.in/",
    requestId: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    website: ""
  };

  const tests = [
    {
      name: "1. Missing Required Name",
      payload: { ...basePayload, name: "", requestId: `inv_name_${Date.now()}` }
    },
    {
      name: "2. Short Name (< 2 chars)",
      payload: { ...basePayload, name: "A", requestId: `inv_shortname_${Date.now()}` }
    },
    {
      name: "3. Missing Required Phone",
      payload: { ...basePayload, mobile: "", requestId: `inv_phone_${Date.now()}` }
    },
    {
      name: "4. Invalid Format Phone",
      payload: { ...basePayload, mobile: "abc", requestId: `inv_badphone_${Date.now()}` }
    },
    {
      name: "5. Missing Business Type",
      payload: { ...basePayload, businessType: "", requestId: `inv_biz_${Date.now()}` }
    },
    {
      name: "6. Missing Service Category",
      payload: { ...basePayload, service: "", requestId: `inv_svc_${Date.now()}` }
    },
    {
      name: "7. Custom Category with > 100 words requirement",
      payload: {
        ...basePayload,
        service: "Custom",
        customRequirement: Array(110).fill("word").join(" "),
        requestId: `inv_custom_${Date.now()}`
      }
    },
    {
      name: "8. Spam Honeypot Submission (website field filled)",
      payload: {
        ...basePayload,
        website: "https://spambot-link.example.com",
        requestId: `inv_hp_${Date.now()}`
      }
    }
  ];

  let passed = 0;
  for (const test of tests) {
    const ok = await runTest(test.name, test.payload);
    if (ok) passed++;
    await new Promise(r => setTimeout(r, 1200));
  }

  console.log(`\n====================================================`);
  console.log(`Invalid Request Test Summary: ${passed} / ${tests.length} tests passed rejection check`);
  console.log(`====================================================`);
}

main();
