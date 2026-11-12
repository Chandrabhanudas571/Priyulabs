const http = require('http');
const path = require('path');
const fs = require('fs');

// Require the same server logic or probe port 3000
const req = http.get('http://127.0.0.1:3000/assets/css/business-types-mobile.css', (res) => {
  console.log('HTTP Status from running server (port 3000):', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Content-Type:', res.headers['content-type']);
    console.log('File length received:', data.length);
    console.log('Sample content:', data.slice(0, 100));
  });
});

req.on('error', (err) => {
  console.log('Could not connect to port 3000 directly:', err.message);
});

