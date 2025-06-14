# Fastify Subscsriber Webhook
Webhook Project for Subscsribe Webhook. Receive message verify and decode by JWT to verify, Is message encode from legit token.

# Feature
 - receive message encode with jwt verify and decoding message.

# Getting Started
## Prerequisites
 - Node.JS (v21.7.3)

## Installation
 1. install module
 `npm install`

 2. In `src/server.ts` at line 14 `const endpoints: EndpointConfig[]` is list of endpoints that can manual add path and secret for each endpoint from [webhook_pub_sub](README.md)
 example:
  - From [webhook_pub_sub](README.md) `POST` in `/api/subscribe` send body
  ```
  {
    "url": "http://localhost:4000/test"
  }
  ```
  then got response:
  ```
  {
    "status": "ok",
    "data": {
        "sub_id": 1,
        "secret": "ABCDE"
    }
   }
  ```
   - Add
   ```
   {path: "/test", secret: "ABCDE"}
   ```
   to `const endpoints: EndpointConfig[]` for testing
   
  3. Start server
  `npm run dev`

  4. Send `POST` to `/api/ask` in [webhook_pub_sub](README.md)
  example:
  - If message in DB is
  ```
  {
      tx_id: 1,
      message: "Hello"
  }
  ```
  - Then send `POST` to `/api/ask` in [webhook_pub_sub](README.md) with `tx_id: 1`
  - In console will response:
  ```
  ----- Path /mm -----
  Raw: "JWT Token"
  Match in Redis!! / Not match in Redis, From DB!!
  Messsage from jwt decode: 'Hello'
  Timestamp: 2025-06-14T19:00:07.977Z
  ```
  5. Change message, Subscsribe or unsubscribe in [webhook_pub_sub](README.md) then test again