const express = require('express');
const path = require('path');
const app = express();

5xp2bc-codex/create-fuzzing-playground-web-app
// In-memory log storage for remote logging (capped at 1000 entries)

qsf0uw-codex/create-fuzzing-playground-web-app
// In-memory log storage for remote logging
main
const logs = [];

// Parse JSON bodies for log POSTs
app.use(express.json());

// Serve static files similar to `http-server`
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to receive log messages from the client
app.post('/api/log', (req, res) => {
  const { message } = req.body || {};
  if (typeof message === 'string') {
    const ts = new Date().toISOString();
    logs.push(`[${ts}] ${message}`);
5xp2bc-codex/create-fuzzing-playground-web-app
    if (logs.length > 1000) logs.shift(); // keep the array size reasonable

main
  }
  res.sendStatus(204);
});

// Endpoint to fetch collected logs
app.get('/api/logs', (req, res) => {
  res.json({ logs });
 5xp2bc-codex/create-fuzzing-playground-web-app


app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
main

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Fuzzing playground listening on port ${PORT}`);
});
