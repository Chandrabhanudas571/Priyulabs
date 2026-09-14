/**
 * Priyulabs Free Trial & Lead Management System
 * Google Apps Script Web App Endpoint
 *
 * Repository: Chandrabhanudas571/Priyulabs
 * Target Lead Notification: priylabspos@gmail.com
 *
 * This Apps Script Web App:
 * 1. Receives form submissions from https://priyulabs.in/ and associated pages
 * 2. Enforces anti-spam honeypot filtering & server-side validation
 * 3. Enforces idempotency / deduplication using CacheService & request IDs
 * 4. Appends lead records permanently to the "Leads" Google Sheet
 * 5. Dispatches real-time email notifications to priylabspos@gmail.com
 * 6. Returns a JSON response with CORS compatibility
 */

const CONFIG = {
  // Official Priyulabs business notification email
  NOTIFICATION_EMAIL: "priylabspos@gmail.com",
  // Target Sheet Name inside the Spreadsheet
  SHEET_NAME: "Leads",
  // Expected Columns Header Definition
  HEADERS: [
    "Timestamp",
    "Name",
    "Business Type",
    "Service / Category",
    "Custom Requirement",
    "Phone / WhatsApp",
    "Source",
    "Page URL"
  ],
  // Max length constraints
  MAX_NAME_LEN: 100,
  MAX_BIZ_LEN: 150,
  MAX_SERVICE_LEN: 100,
  MAX_CUSTOM_WORDS: 100,
  MAX_PHONE_LEN: 30,
  MAX_SOURCE_LEN: 100,
  MAX_URL_LEN: 500,
  // Deduplication cache timeout in seconds (10 minutes)
  DEDUPE_CACHE_TTL_SEC: 600
};

/**
 * Handle HTTP POST requests from the website lead form.
 */
function doPost(e) {
  try {
    let data = {};

    // 1. Parse incoming payload (supports JSON and form-urlencoded / FormData)
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 2. Anti-spam honeypot check
    // If any honeypot field is populated by a bot, quietly reject
    if (data.website || data.hp_field || data.honeypot || data.website_hp) {
      return jsonResponse({
        success: false,
        message: "Submission rejected"
      });
    }

    // 3. Extract & sanitize fields
    const name = sanitizeString(data.name || data.Name, CONFIG.MAX_NAME_LEN);
    const businessType = sanitizeString(data.businessType || data.BusinessType || data.StoreName, CONFIG.MAX_BIZ_LEN);
    const service = sanitizeString(data.service || data.Service || data.Category, CONFIG.MAX_SERVICE_LEN);
    const customRequirement = sanitizeString(data.customRequirement || data.CustomRequirement, 1500);
    const mobile = sanitizeString(data.mobile || data.Mobile || data.phone || data.Phone, CONFIG.MAX_PHONE_LEN);
    const source = sanitizeString(data.source || data.Source || "free-trial-form", CONFIG.MAX_SOURCE_LEN);
    const pageUrl = sanitizeString(data.pageUrl || data.PageUrl || data.url || "", CONFIG.MAX_URL_LEN);
    const requestId = sanitizeString(data.requestId || data.request_id || "", 100);

    // 4. Server-side validation
    if (!name || name.length < 2) {
      return jsonResponse({
        success: false,
        message: "Please provide a valid name"
      });
    }

    if (!mobile || !/^[0-9+\-\s()]{7,20}$/.test(mobile)) {
      return jsonResponse({
        success: false,
        message: "Please provide a valid mobile or WhatsApp number"
      });
    }

    if (!businessType) {
      return jsonResponse({
        success: false,
        message: "Please select or provide your business type"
      });
    }

    if (!service) {
      return jsonResponse({
        success: false,
        message: "Please select a service or category"
      });
    }

    // Check custom requirement word limit if service is Custom
    if (service.toLowerCase() === 'custom') {
      const words = customRequirement ? customRequirement.trim().split(/\s+/) : [];
      if (words.length === 0) {
        return jsonResponse({
          success: false,
          message: "Please describe what you need in the custom requirements field"
        });
      }
      if (words.length > CONFIG.MAX_CUSTOM_WORDS) {
        return jsonResponse({
          success: false,
          message: "Custom requirement exceeds 100 words limit"
        });
      }
    }

    // 5. Idempotency & Deduplication Protection
    const cache = CacheService.getScriptCache();
    const cleanPhone = mobile.replace(/[^0-9]/g, '');
    const dedupeKey = requestId ? `req_${requestId}` : `lead_${cleanPhone}_${name.toLowerCase().replace(/\s+/g, '')}`;

    if (cache && cache.get(dedupeKey)) {
      // Duplicate submission detected within the cache window — acknowledge without duplicating row or email
      return jsonResponse({
        success: true,
        message: "Lead already received and scheduled for follow-up",
        duplicate: true
      });
    }

    // 6. Generate server-side timestamp in IST (Asia/Kolkata)
    const timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'");

    // 7. Append lead record to Google Sheet ("Leads")
    const sheet = getLeadSheet();
    if (!sheet) {
      console.error("Target sheet 'Leads' could not be opened or initialized.");
      return jsonResponse({
        success: false,
        message: "Unable to process lead: storage sheet unavailable"
      });
    }

    const rowData = [
      timestamp,
      name,
      businessType,
      service,
      customRequirement || "N/A",
      mobile,
      source,
      pageUrl
    ];
    sheet.appendRow(rowData);

    // 8. Record in deduplication cache
    if (cache) {
      cache.put(dedupeKey, "processed", CONFIG.DEDUPE_CACHE_TTL_SEC);
    }

    // 9. Send notification email to priylabspos@gmail.com
    sendLeadEmail({
      timestamp: timestamp,
      name: name,
      businessType: businessType,
      service: service,
      customRequirement: customRequirement || "None",
      mobile: mobile,
      source: source,
      pageUrl: pageUrl
    });

    // 10. Return confirmed success response
    return jsonResponse({
      success: true,
      message: "Lead submitted successfully"
    });

  } catch (err) {
    // Log error internally in Apps Script execution logs without leaking internal errors to users
    console.error("Error processing lead submission:", err);
    return jsonResponse({
      success: false,
      message: "Unable to submit lead"
    });
  }
}

/**
 * Handle HTTP GET requests (Health check / verification)
 */
function doGet(e) {
  return jsonResponse({
    success: true,
    message: "Priyulabs Lead Processing Service is Active"
  });
}

/**
 * Helper to build JSON output with CORS compatibility.
 */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Sanitize and truncate string input.
 */
function sanitizeString(str, maxLength) {
  if (!str) return "";
  let clean = String(str).trim();
  if (maxLength && clean.length > maxLength) {
    clean = clean.substring(0, maxLength);
  }
  return clean;
}

/**
 * Retrieve or initialize the target Sheet with standard headers.
 */
function getLeadSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return null;

  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }
  // If the sheet is brand new, create header row
  if (sheet && sheet.getLastRow() === 0) {
    sheet.appendRow(CONFIG.HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, CONFIG.HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4338ca");
    headerRange.setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Send an email notification for the incoming lead to priylabspos@gmail.com
 */
function sendLeadEmail(lead) {
  const recipient = CONFIG.NOTIFICATION_EMAIL;
  const subject = "New Priyulabs Free Trial Lead — " + lead.name;

  // Clean plain text fallback
  const textBody = 
`New Priyulabs Free Trial Lead

Name: ${lead.name}
Business Type: ${lead.businessType}
Service: ${lead.service}
Custom Requirement: ${lead.customRequirement}
Phone / WhatsApp: ${lead.mobile}
Source: ${lead.source}
Page URL: ${lead.pageUrl}
Submitted At: ${lead.timestamp}
`;

  // Quick Action links for the sales & onboarding team
  const digitsOnly = lead.mobile.replace(/[^0-9]/g, '');
  const waPhone = digitsOnly.length === 10 ? "91" + digitsOnly : digitsOnly;
  const waUrl = digitsOnly ? `https://wa.me/${waPhone}` : "";

  // Responsive HTML email
  const htmlBody = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); padding: 24px 28px; text-align: left;">
      <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 4px 0; font-weight: 800; letter-spacing: -0.02em;">PRIYULABS DIGITAL</h1>
      <p style="color: #e0e7ff; font-size: 13.5px; margin: 0; font-weight: 500;">New Free Trial / Demo Lead Received</p>
    </div>
    
    <div style="padding: 24px 28px; background-color: #ffffff;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
        <tr>
          <td style="padding: 11px 0; font-weight: 700; color: #64748b; width: 38%; border-bottom: 1px solid #f1f5f9;">Customer Name:</td>
          <td style="padding: 11px 0; font-weight: 800; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-size: 15px;">${escapeHtml(lead.name)}</td>
        </tr>
        <tr>
          <td style="padding: 11px 0; font-weight: 700; color: #64748b; border-bottom: 1px solid #f1f5f9;">Business Type:</td>
          <td style="padding: 11px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(lead.businessType)}</td>
        </tr>
        <tr>
          <td style="padding: 11px 0; font-weight: 700; color: #64748b; border-bottom: 1px solid #f1f5f9;">Service / Category:</td>
          <td style="padding: 11px 0; font-weight: 700; color: #4338ca; border-bottom: 1px solid #f1f5f9;">${escapeHtml(lead.service)}</td>
        </tr>
        <tr>
          <td style="padding: 11px 0; font-weight: 700; color: #64748b; border-bottom: 1px solid #f1f5f9; vertical-align: top;">Custom Requirement:</td>
          <td style="padding: 11px 0; color: #334155; border-bottom: 1px solid #f1f5f9; line-height: 1.5;">${escapeHtml(lead.customRequirement)}</td>
        </tr>
        <tr>
          <td style="padding: 11px 0; font-weight: 700; color: #64748b; border-bottom: 1px solid #f1f5f9;">Phone / WhatsApp:</td>
          <td style="padding: 11px 0; font-weight: 800; color: #059669; border-bottom: 1px solid #f1f5f9; font-size: 15px;">
            <a href="tel:${escapeHtml(lead.mobile)}" style="color: #059669; text-decoration: none;">${escapeHtml(lead.mobile)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 11px 0; font-weight: 700; color: #64748b; border-bottom: 1px solid #f1f5f9;">Source:</td>
          <td style="padding: 11px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">${escapeHtml(lead.source)}</td>
        </tr>
        <tr>
          <td style="padding: 11px 0; font-weight: 700; color: #64748b; border-bottom: 1px solid #f1f5f9;">Page URL:</td>
          <td style="padding: 11px 0; color: #64748b; border-bottom: 1px solid #f1f5f9; word-break: break-all; font-size: 12px;">${escapeHtml(lead.pageUrl)}</td>
        </tr>
        <tr>
          <td style="padding: 11px 0; font-weight: 700; color: #64748b;">Submitted At:</td>
          <td style="padding: 11px 0; color: #475569; font-weight: 600;">${escapeHtml(lead.timestamp)}</td>
        </tr>
      </table>

      ${waUrl ? `
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px dashed #cbd5e1; text-align: center;">
        <a href="${waUrl}" style="display: inline-block; background-color: #25d366; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 8px; font-weight: 700; font-size: 14px; margin-right: 10px;">Chat on WhatsApp →</a>
        <a href="tel:${escapeHtml(lead.mobile)}" style="display: inline-block; background-color: #4338ca; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 8px; font-weight: 700; font-size: 14px;">Call Customer</a>
      </div>
      ` : ''}
    </div>

    <div style="padding: 14px 28px; background-color: #f1f5f9; text-align: center; font-size: 12px; color: #64748b;">
      Stored automatically in <strong>Priyulabs Leads Google Sheet</strong> • Server generated
    </div>
  </div>
  `;

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: textBody,
    htmlBody: htmlBody
  });
}

/**
 * Escape HTML special characters for safe email rendering.
 */
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
