// Live Network Verification Script for Google Apps Script Endpoint

const PRODUCTION_URL = "https://script.google.com/macros/s/AKfycbyH13ep4RQxIBDc8I1gGrwr9eVU9yEYY30psOD1akHgePYWSg34vzPn2BtyVk3QWzqegg/exec";

async function testEndpoint(url, label) {
  console.log(`\n========================================`);
  console.log(`Testing [${label}]: ${url}`);
  console.log(`========================================`);

  // 1. GET Request
  try {
    console.log("--> Sending GET request (Health Check)...");
    const getRes = await fetch(url, { method: "GET", redirect: "follow" });
    console.log(`GET HTTP Status: ${getRes.status} ${getRes.statusText}`);
    const getText = await getRes.text();
    console.log(`GET Body Raw: ${getText.substring(0, 300)}`);
    try {
      const getJson = JSON.parse(getText);
      console.log("GET Parsed JSON:", getJson);
    } catch (e) {
      console.log("GET is not valid JSON.");
    }
  } catch (err) {
    console.error("GET Request Failed:", err.message);
  }

  // 2. Valid POST Request
  const requestId = `verify_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const validPayload = {
    name: "Priyulabs Integration Test",
    businessType: "Test Business",
    service: "Smart POS",
    mobile: "9999999999",
    customRequirement: "Production integration verification",
    source: "integration-test",
    pageUrl: "https://priyulabs.in/",
    requestId: requestId,
    website: ""
  };

  try {
    console.log("\n--> Sending valid POST request...");
    const postRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(validPayload),
      redirect: "follow"
    });
    console.log(`POST HTTP Status: ${postRes.status} ${postRes.statusText}`);
    const postText = await postRes.text();
    console.log(`POST Body Raw: ${postText.substring(0, 300)}`);
    try {
      const postJson = JSON.parse(postText);
      console.log("POST Parsed JSON:", postJson);
    } catch (e) {
      console.log("POST is not valid JSON.");
    }
  } catch (err) {
    console.error("POST Request Failed:", err.message);
  }

  // 3. Duplicate POST Request with same requestId
  try {
    console.log("\n--> Sending duplicate POST request (same requestId)...");
    const dupRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(validPayload),
      redirect: "follow"
    });
    const dupText = await dupRes.text();
    try {
      const dupJson = JSON.parse(dupText);
      console.log("Duplicate POST Parsed JSON:", dupJson);
    } catch (e) {
      console.log("Duplicate POST Body Raw:", dupText.substring(0, 300));
    }
  } catch (err) {
    console.error("Duplicate POST Failed:", err.message);
  }

  // 4. Invalid POST Request (Missing Name)
  try {
    console.log("\n--> Sending invalid POST request (Missing Name)...");
    const invalidRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...validPayload, name: "" }),
      redirect: "follow"
    });
    const invalidText = await invalidRes.text();
    try {
      const invJson = JSON.parse(invalidText);
      console.log("Invalid POST Parsed JSON:", invJson);
    } catch (e) {
      console.log("Invalid POST Body Raw:", invalidText.substring(0, 300));
    }
  } catch (err) {
    console.error("Invalid POST Failed:", err.message);
  }
}

async function run() {
  await testEndpoint(PRODUCTION_URL, "Production Google Apps Script Web App");
}

run();
