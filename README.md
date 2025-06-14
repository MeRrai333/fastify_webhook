# Fastify Pub&Sub Webhook
Webhook Project for Publisher list of message in database to Subscriber in database.
[subscriber side](webhook_subscriber/README.md)

# Tech  stack
 - Fastify
 - PrismaORM
 - MySQL
 - Redis

# Feature
 - Subscribe by pass url
 - Stored list of publishes message
 - Send publishes message from stored to subscriber

# Getting Started
## Prerequisites
 - Node.JS (v21.7.3)
 - MySQL (10.4.32-MariaDB)
 - Redis

## Installation
 1. install module
 `npm install`

 2. create `.env` file then write this
 ```
DATABASE_URL="mysql://your_user:your_password@your_host:your_port/your_db"
REDIS_URL="redis://:your_password@your_host:your_port/0"
 ```

 3. PrismaORM migration
 `npx prisma migrate dev --name init`

 4. Start server
 `npm run dev`

 ## Quick start guide
  1. Add Subscriber by `POST` in `/api/subscribe`
  JSON Body
  ```
  {
      "url": "your subscruber url"
  }
  ```
  2. Add Publishe messages by `POST` in `/api/provide_data`
  JSON Body
  ```
  {
    "message": "some message"
  }
  ```
  3. Send webhook by `POST` in `/api/ask`
  JSSON Body
  ```
  {
      "tx_id": "tx_id from Step 2."
  }
  ```
  4. (Optional) Unsubscribe by `POST` in `/api/unsubscribe`
  JSON Body
  ```
  {
      "sub_id": "sub_id from Step 1."
  }
  ```
  5. List of subscriber by `GET` in `/api/subscribers`
  6. List of message by `GET` in `/api/provide_data`

  # API documentation
  - `POST`: `/api/subscribe` to add subscriber
  JSON Body:
  ```
  {
      "url": "your subscruber url, Must start with 'http://' or 'https://' "
  }
  ```
  Response:
  ```
  {
    "status": "ok",
    "data": {
        "sub_id": 1,
        "secret": "..."
    }
  }
  ```

  - `GET`: `/api/subscribe` list of subscriber
  Response:
  ```
  {
    "subscribers": [
        {
            "subId": 1,
            "url": "http://...",
            "secret": "...",
            "createdAt": "2025-06-14T15:29:30.887Z"
        },...
    ],
    "count": 1
  }
  ```

  - `POST`: `/api/unsubscribe` to unsubscribe
  JSON Body:
  ```
  {
      "sub_id": "subId"
  }
  ```
  Response:
  ```
  {
    "status": "ok",
    "subscriber": {
        "subId": 1,
        "url": "http://...",
        "secret": "...",
        "createdAt": "2025-06-14T16:13:09.576Z"
    }
  }
  ```

  - `POST`: `/api/provide_data` to add new message to publishe
  JSON Body:
  ```
  {
      "message": "some message"
  }
  ```
  Response:
  ```
  {
    "status": "ok",
    "provideData": {
        "txId": 1,
        "message": "some message",
        "createdAt": "2025-06-14T17:32:35.398Z"
    }
  }
  ```

  - `GET`: `/api/provide_data` list of message to publishe
  Response:
  ```
  {
    "subscribeDatas": [
        {
            "txId": 1,
            "message": "some message",
            "createdAt": "2025-06-14T15:29:41.581Z"
        },...
    ],
    "count": 1
  }
  ```

  - `POST`: `/api/ask` Publish to Webhook from tx_id
  JSON Body:
  ```
  {
    "tx_id": 1
  }
  ```
  Response:
  ```
  {
    "status": "ok",
    "data": {
        "message": "message from tx_id"
    }
  }
  ```