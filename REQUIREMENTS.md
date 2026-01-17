# conductor-test - Technical Requirements

## Overview

A simple Express.js Hello World server built with TypeScript. The server listens on port 3000 and responds with "Hello World" on the root route (`/`). Includes proper TypeScript types, error handling, and graceful shutdown capabilities.

---

## Dependencies

### Internal Dependencies
None

### External Dependencies
- **express** (^4.18.2) - Web application framework for Node.js
- **@types/express** (^4.17.21) - TypeScript type definitions for Express
- **@types/node** (^20.10.5) - TypeScript type definitions for Node.js
- **tsx** (^4.7.0) - TypeScript execution engine for Node.js
- **typescript** (^5.3.3) - TypeScript compiler

---

## APIs and Interfaces

### Exported Functions/Classes
- **app** (default export): The Express application instance

### HTTP Endpoints
- **GET /** - Returns "Hello World" as plain text response
  - Status Code: 200
  - Response Type: text/plain
  - Response Body: "Hello World"

### Events
The server handles the following process events for graceful shutdown:
- `SIGTERM`: Graceful shutdown signal
- `SIGINT`: Interrupt signal (Ctrl+C)

---

## Configuration

### Environment Variables
- **PORT**: Server port (default: 3000)

### Server Configuration
- **Host**: localhost
- **Port**: 3000
- **Protocol**: HTTP

---

## Build and Run

```bash
# Install dependencies
npm install

# How to build
npm run build

# How to run (production)
npm start

# How to run (development with auto-reload)
npm run dev

# How to test
npm test
```

---

## Notes

- Server includes basic error handling middleware
- Graceful shutdown handling for both SIGTERM and SIGINT signals
- TypeScript configuration supports ES2022 and ESNext modules
- Uses tsx for development execution with watch mode
- Server logs startup message and shutdown events to console
- The project uses ES modules (`"type": "module"`)
- The main entry point is `src/index.ts`

---

*This file should be updated whenever interfaces or dependencies change.*
