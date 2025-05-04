# Travel Itinerary Management System

A full-stack application for managing travel itineraries for Thailand destinations, featuring a FastAPI backend and Next.js frontend.

## Project Structure

\`\`\`
travel-itinerary-system/
├── backend/               # Python FastAPI backend
├── frontend/              # Next.js frontend
└── README.md              # Project documentation
\`\`\`

## Backend Setup

The backend is built with FastAPI, SQLAlchemy, and SQLite.

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Create a virtual environment:
   \`\`\`bash
   python -m venv venv
   \`\`\`

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   \`\`\`bash
   pip install fastapi uvicorn sqlalchemy pydantic
   \`\`\`

### Running the Backend

1. Run the application using the run script:
   \`\`\`bash
   python run.py
   \`\`\`

This will:
- Seed the database with sample data
- Start the main API server on http://localhost:8000
- Start the recommendation server on http://localhost:8001

The API documentation will be available at http://localhost:8000/docs

## Frontend Setup

The frontend is built with Next.js, React, and Tailwind CSS.

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

### Running the Frontend

1. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

2. Open your browser and navigate to http://localhost:3000

## Using the Application

1. **Browse Itineraries**: View all available travel itineraries on the Itineraries page
2. **View Details**: Click on an itinerary to see its detailed information
3. **Get Recommendations**: Use the Recommendations page to get itineraries based on your preferred duration
4. **Create Itinerary**: Create your own custom itinerary using the multi-step form

## API Endpoints

- `GET /api/itineraries` - Get all itineraries
- `GET /api/itineraries/{id}` - Get a specific itinerary
- `POST /api/itineraries` - Create a new itinerary
- `GET /api/recommendations/{nights}` - Get recommended itineraries for a specific duration

## Database Schema

The application uses the following database models:
- Itinerary
- Accommodation
- Transfer
- Activity

See the Schema page in the frontend for detailed information.
