# Google Apps Script Setup Guide — Priyulabs Free Trial & Lead System

This guide outlines the complete setup for the Google Apps Script endpoint that powers the Priyulabs Free Trial & Lead submission forms across https://priyulabs.in/.

---

## Architecture Overview

```text
Visitor Submits Form (index.html / pos.html / React LeadForm)
                   │
                   ▼
  HTTP POST (text/plain JSON payload)
                   │
                   ▼
       Google Apps Script Web App (Code.gs)
         ├── 1. Anti-spam honeypot check
         ├── 2. Server-side validation
         ├── 3. Server timestamp (Asia/Kolkata)
         ├── 4. Append row to Google Sheet ("Leads")
         ├── 5. Email priylabspos@gmail.com
         └── 6. Return { "success": true, "message": "..." }
```

---

## Step-by-Step Deployment Instructions

### 1. Create the Google Sheet
1. Open [Google Sheets](https://sheets.new) logged in with the official business Google account (`priylabspos@gmail.com` or authorized admin account).
2. Name the spreadsheet: **`Priyulabs Leads`**.
3. Rename the first sheet tab (at the bottom) to **`Leads`**.
4. (Optional) In Row 1, add these exact headers across Columns A through H:
   - **Column A**: `Timestamp`
   - **Column B**: `Name`
   - **Column C**: `Business Type`
   - **Column D**: `Service / Category`
   - **Column E**: `Custom Requirement`
   - **Column F**: `Phone / WhatsApp`
   - **Column G**: `Source`
   - **Column H**: `Page URL`
   *(Note: `Code.gs` will automatically format and create these headers if the sheet is empty).*

---

### 2. Open Apps Script Editor
1. In your Google Sheet, click on **Extensions** in the top menu.
2. Select **Apps Script**.
3. Rename the script project (top left) to **`Priyulabs Lead Handler`**.

---

### 3. Add the Apps Script Code
1. In the Apps Script code editor, delete any existing boilerplate in `Code.gs`.
2. Copy the entire contents of [`google-apps-script/Code.gs`](../google-apps-script/Code.gs) and paste it into the editor.
3. Verify that `NOTIFICATION_EMAIL` in the `CONFIG` object is set to:
   ```javascript
   NOTIFICATION_EMAIL: "priylabspos@gmail.com"
   ```
4. Click the **Save** icon (disk icon or `Ctrl+S` / `Cmd+S`).

---

### 4. Deploy as a Web App
1. Click the blue **Deploy** button (top right) → **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure the deployment settings:
   - **Description**: `Priyulabs Production Lead Webhook v1`
   - **Execute as**: **`Me (priylabspos@gmail.com)`** *(Crucial: ensures emails are sent by this account and the sheet is accessible)*
   - **Who has access**: **`Anyone`** *(Crucial: allows public website visitors to submit without needing a Google login)*
4. Click **Deploy**.
5. When prompted with **Authorize Access**:
   - Click **Review Permissions**.
   - Select your Priyulabs Google account.
   - Click **Advanced** → **Go to Priyulabs Lead Handler (unsafe)** (standard Apps Script notice).
   - Click **Allow** to grant permission for Google Sheets and Email dispatching.
6. Copy the generated **Web App URL** (e.g. `https://script.google.com/macros/s/AKfy.../exec`).

---

### 5. Website Configuration

#### For the Static Production Website (`https://priyulabs.in/`):
- The default endpoint URL is already defined in `script.js`.
- If you deploy a new Apps Script Web App version, update the `GOOGLE_SCRIPT_URL` constant in `script.js` or define:
  ```html
  <script>
    window.PRIYULABS_LEAD_ENDPOINT = "YOUR_NEW_WEB_APP_URL";
  </script>
  ```

#### For the Vite React Application (`apps/web`):
- Add the Web App URL to `apps/web/.env`:
  ```env
  VITE_LEAD_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
  ```

---

## Verification & Testing

### 1. Test via Browser or cURL
Run a test `GET` request in the browser:
```text
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```
Expected response:
```json
{"success": true, "message": "Priyulabs Lead Processing Service is Active"}
```

### 2. Test Form Submission
1. Fill out the "Start Your Free Trial" form on `https://priyulabs.in/`.
2. Check that:
   - Success message appears on the website.
   - A new row is appended to the `Leads` sheet in Google Sheets.
   - A styled email notification is delivered to `priylabspos@gmail.com`.
