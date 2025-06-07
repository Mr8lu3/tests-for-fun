const express = require('express');
const path = require('path');
const app = express();

// In-memory log storage for remote logging
const logs = [];

// Parse JSON bodies for log POSTs
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Fuzzing playground listening on port ${PORT}`);
});
