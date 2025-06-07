const express = require('express');
const path = require('path');
const app = express();

// In-memory log storage for remote logging (capped at 1000 entries)
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
    if (logs.length > 1000) logs.shift(); // keep the array size reasonable
  }
  res.sendStatus(204);
});

// Endpoint to fetch collected logs
app.get('/api/logs', (req, res) => {
  res.json({ logs });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Fuzzing playground listening on port ${PORT}`);
});
