# Simple MERN Notes App

A basic notes app built with MongoDB, Express, React, and Node.js.

## Prerequisites

- Node.js installed
- MongoDB installed and running locally on port 27017

## Setup

### Backend

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start MongoDB (if not already running):
```bash
mongod
```

5. Start the server:
```bash
node server.js
```

Server will run on `http://localhost:5000`

### Frontend

1. In a new terminal, navigate to project root

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Features

- Create notes with title and content
- View all notes
- Edit existing notes
- Delete notes
- Notes are stored in MongoDB

## API Endpoints

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
