# URL Shortener API

## Project Overview
A robust URL shortening service with advanced tracking and rate limiting capabilities.

## Features
- Shorten long URLs
- Redirect to original URLs
- Track URL usage statistics
- Rate limiting
- Comprehensive error handling

## Technology Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Validator.js
- Rate Limiter
- dotenv

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Deployment platform (Render/Railway/Vercel)

## Environment Variables
Create a `.env` file with the following:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

## Deployment
Deployed at: [YOUR_DEPLOYMENT_LINK_HERE]

## API Endpoints
1. `POST /shorten`
   - Request: `{ "originalUrl": "https://example.com" }`
   - Response: `{ "shortUrl": "http://short.url/abc123" }`
   - deployed Url `{https://url-shortner-app-9cj4.onrender.com/shorten}`

2. `GET /:shortId`
   - Redirects to original URL
   - Tracks click statistics

3. `GET /stats/:shortId`
   - Returns usage statistics
   - Response: 
     ```json
     {
       "totalClicks": 42,
       "lastAccessedAt": "2024-01-15T10:30:00Z"
     }
     ```

## Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up `.env` file
4. Run: `npm start`

## Testing
- `npm test` for running test suite

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct.
