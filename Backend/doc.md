# Tournament Backend API Documentation

This document outlines the backend API endpoints, their purposes, and the required data payloads. It is intended to be used as a reference for building the frontend Admin Dashboard and User Interfaces.

## Base URL
All routes are prefixed with `/api` (e.g., `http://localhost:3000/api`).

---

## 1. Authentication Routes

### Register a New User
- **Endpoint**: `POST /auth/register`
- **Access**: Public
- **Body**:
  ```json
  {
    "name": "John Doe",             // string, required
    "email": "john@example.com",    // string, optional (either email or phone required)
    "phone": "1234567890",          // string, optional (either email or phone required)
    "password": "securepassword123" // string, required
  }
  ```

### Login User
- **Endpoint**: `POST /auth/login`
- **Access**: Public
- **Body**:
  ```json
  {
    "email": "john@example.com",    // string, optional (either email or phone required)
    "phone": "1234567890",          // string, optional (either email or phone required)
    "password": "securepassword123" // string, required
  }
  ```
- **Response**: Returns User object, `accessToken`, and `refreshToken`.

---

## 2. Tournament Routes

### Create Tournament
- **Endpoint**: `POST /tournaments/create`
- **Access**: Admin (Protected)
- **Body**:
  ```json
  {
    "name": "Summer Championship",      // string, required
    "game": "bgmi",                     // string, required (Enum: "freefire", "bgmi", "cod", "other")
    "entryFee": 50,                     // number, required
    "prizePool": 5000,                  // number, required
    "mode": {
      "map": "Erangel",                 // string, optional (Default: "Bermuda")
      "player": "squad",                // string, required (Enum: "solo", "duo", "squad")
      "type": "Classic"                 // string, required
    },
    "StartTime": "2023-12-01T14:30:00Z",// Date string, required
    "maxPlayers": 100,                  // number, required
    "PlacementPrize": {                 // optional
      "first": 2500,
      "second": 1500,
      "third": 1000
    }
  }
  ```

### Update Tournament
- **Endpoint**: `PUT /tournaments/update/:id`
- **Access**: Admin (Protected)
- **Params**: `id` (Tournament ObjectId)
- **Body**: Same payload structure as **Create Tournament**.

### Delete Tournament
- **Endpoint**: `DELETE /tournaments/delete/:id`
- **Access**: Admin (Protected)
- **Params**: `id` (Tournament ObjectId)
- **Condition**: Fails if the `StartTime` is in the past (tournament has already started).

### Start Tournament (Provide Room Details)
- **Endpoint**: `POST /tournaments/start/:id`
- **Access**: Admin (Protected)
- **Params**: `id` (Tournament ObjectId)
- **Body**:
  ```json
  {
    "roomId": "ROOM_12345",         // string, required
    "roomPassword": "PASSWORD_123"  // string, required
  }
  ```
- **Condition**: Fails if the current time is before the `StartTime`.

### End Tournament
- **Endpoint**: `POST /tournaments/end/:id`
- **Access**: Admin (Protected)
- **Params**: `id` (Tournament ObjectId)
- **Description**: Marks the tournament `isCompleted` as `true`.

### Get All Tournaments
- **Endpoint**: `GET /tournaments`
- **Access**: Public
- **Description**: Retrieves all tournaments (usually upcoming/ongoing).

### Get Tournament by ID
- **Endpoint**: `GET /tournaments/:id`
- **Access**: Public
- **Params**: `id` (Tournament ObjectId)

### Get Tournament Status
- **Endpoint**: `GET /tournaments/status/:id`
- **Access**: Public
- **Params**: `id` (Tournament ObjectId)
- **Response**:
  ```json
  {
    "success": true,
    "status": "upcoming" // can be "upcoming", "ongoing", or "completed"
  }
  ```

---

## 3. Participant Routes

### Join Tournament
- **Endpoint**: `POST /participants/:id/join`
- **Access**: Protected (User)
- **Params**: `id` (Tournament ObjectId)
- **Description**: Registers the authenticated user to the specified tournament.

### Leave Tournament
- **Endpoint**: `POST /participants/:id/leave`
- **Access**: Protected (User)
- **Params**: `id` (Tournament ObjectId)
- **Description**: Removes the authenticated user from the specified tournament.

### Get Tournament Participants
- **Endpoint**: `GET /participants/:id/participants`
- **Access**: Public / Admin
- **Params**: `id` (Tournament ObjectId)
- **Description**: Fetches all participants registered for a specific tournament.

---

## Important Enums and Defaults

- **Roles**: `"admin"`, `"user"`, `"moderator"` (Default is `"user"`)
- **Game**: `"freefire"`, `"bgmi"`, `"cod"`, `"other"`
- **PlayerMode**: `"solo"`, `"duo"`, `"squad"`

## Authentication Headers
For protected routes, include the JWT Access Token in the Authorization header:
`Authorization: Bearer <your_access_token>`
