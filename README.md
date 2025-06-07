# Fuzzing Playground

This project is a minimal web application for experimenting with browser APIs in search of memory-safety issues. It exposes a set of small fuzzers that run in the browser and send their logs back to the server.

## Prerequisites
- Node.js 16 or newer
- npm

## Setup

```bash
npm install      # install dependencies
npm start        # start the Express server on port 3000
```

Open `http://localhost:3000` in a web browser and use the sidebar to run individual fuzzers or the **Run All** button to execute them sequentially.

## Fuzzers
- **Canvas** – exercises the HTML Canvas API
- **WebGL** – compiles random shaders and draws geometry
- **Audio** – manipulates `AudioContext` buffers and sources
- **CSS** – injects random style rules
- **Fetch** – fetches blobs and parses responses in different formats
- **WebAssembly** – builds tiny WASM modules on the fly
- **localStorage** – writes and removes random keys
- **Regex** – generates and tests random patterns

## Remote Logging
The browser sends each log entry to `/api/log` on the server. The last 1000 log messages are stored in memory and can be retrieved from `/api/logs`.

