# Tournament Backend

A robust backend service for managing tournaments, built with Node.js, Express, and MongoDB. This API handles user authentication, tournament creation and management, participant registration, payments, and wallet functionality.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication (registration, login) with JWT
- Tournament creation and retrieval
- Participant management for tournaments
- Payment processing
- Wallet system for users
- Admin panel for tournament oversight
- Role-based access control
- Input validation and error handling
- Asynchronous operation handling

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Environment Variables**: dotenv
- **Development**: tsx, ts-node-dev, typescript

## Project Structure
```
src/
├── app.ts              # Express app setup
├── server.ts           # Server entry point
├── config/             # Configuration files
├── constants/          # Application constants
├── db/                 # Database connection
├── jobs/               # Background jobs
├── middlewares/        # Custom middleware (auth, error handling)
├── modules/            # Feature modules
│   ├── auth/           # Authentication routes, controllers, services
│   ├── tournament/     # Tournament management
│   ├── user/           # User profile management
│   ├── participant/    # Tournament participant management
│   ├── wallet/         # User wallet and transactions
│   ├── payment/        # Payment processing
│   ├── admin/          # Administrative functions
│   └── withdrawl/      # Withdrawal functionality
├── types/              # TypeScript type definitions
├── utils/              # Utility classes and helpers
└── validators/         # Input validation schemas
```

## API Routes

All API routes are prefixed with `/api`.

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and receive JWT

### Tournaments
- `POST /api/tournamets/create` - Create a new tournament (protected)
- `GET /api/tournamets/` - Get all upcoming tournaments (public)
- `GET /api/tournamets/:id` - Get tournament by ID (public)
- `PUT /api/tournamets/:id` - Update tournament by ID (protected)
- `DELETE /api/tournamets/:id` - Delete tournament by ID (protected)
- `GET /api/tournamets/status/:id` - Get tournament status by ID (public)
- `POST /api/tournamets/start/:id` - Start tournament by ID (protected)
- `POST /api/tournamets/end/:id` - End tournament by ID (protected)

### Users
*(Routes to be implemented)*

### Participants
- `POST /api/participants/:tournamentId/join` - Join a tournament (protected)
- `POST /api/participants/:tournamentId/leave` - Leave a tournament (protected)
- `GET /api/:tournamentId/participants` - Get participants for a tournament (public)
### Wallet
*(Routes to be implemented)*

### Payments
*(Routes to be implemented)*

### Admin
*(Routes to be implemented)*

### Withdrawal
*(Routes to be implemented)*

> **Note**: Some modules currently have empty route files as they are in progress. The implemented routes above are functional.

## Setup

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tournament_db
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

## Running the Application

### Development Mode
```bash
npm run dev
```
This uses `tsx watch` for automatic restart on file changes.

### Production Mode
```bash
npm run build   # Compiles TypeScript to JavaScript
npm start       # Runs the compiled server
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

---

Built with ❤️ by Hemant