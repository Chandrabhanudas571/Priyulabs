# Priyulabs Google Apps Script Lead Processing

This directory contains the production-ready Google Apps Script backend code for the Priyulabs Free Trial / Lead capture system.

- **Source Code**: [`Code.gs`](./Code.gs)
- **Complete Setup Guide**: [Setup Documentation](../docs/GOOGLE_APPS_SCRIPT_SETUP.md)

### Key Features
1. **Zero Secret Exposure**: Public forms post data directly to Google Apps Script; no API keys, private keys, or passwords in frontend code.
2. **Permanent Storage**: Every lead is appended as a new row in Google Sheets with server-side IST timestamp.
3. **Instant Notifications**: Styled email with customer details and one-click WhatsApp/Call action buttons sent to `priylabspos@gmail.com`.
4. **Anti-Spam & Validation**: Honeypot filtering and server-side validation.
5. **CORS Safe**: Fully compliant with browser fetch policies.
