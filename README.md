# Secure Link Locker

A secure personal vault for storing links, notes, and sensitive information with end-to-end encryption.

## Features

- User authentication with JWT and bcrypt password hashing
- Store links, notes, logins, cards, and identity documents
- Organize items by category with search and filtering
- Mark items as sensitive to encrypt notes with AES-256-GCM
- Decryption happens only on authenticated requests
- Responsive, modern dark UI


## Tech Stack

Frontend - React 18, Vite, Tailwind CSS, Axios
Backend -  Node.js, Express.js  
DB - MongoDB with Mongoose
Auth - JWT, bcryptjs


### 1. Clone and install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure environment

```bash
cp .env.example server/.env
# Edit server/.env with your values
```

### 3. Start the server

```bash
cd server
npm run dev
```

### 4. Start the client

```bash
cd client
npm run dev