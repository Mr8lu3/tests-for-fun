const express = require('express');
const path = require('path');
const app = express();

// In-memory log storage for remote logging
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
