# Travel Itinerary System Setup Guide

This guide will help you set up and run both the backend and frontend components of the Travel Itinerary System.

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## Backend Setup

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
   pip install -r requirements.txt
   \`\`\`

5. Run the application:
   \`\`\`bash
   python run.py
   \`\`\`

This will:
- Seed the database with sample data
- Start the main API server on http://localhost:8000
- Start the recommendation server on http://localhost:8001

## Frontend Setup

1. Navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to http://localhost:3000

## Project Structure

\`\`\`
travel-itinerary-system/
├── backend/               # Python FastAPI backend
│   ├── models.py          # SQLAlchemy database models
│   ├── main.py            # FastAPI main application
│   ├── mcp_server.py      # Recommendation server
│   ├── seed_data.py       # Database seeding script
│   └── run.py             # Script to run both servers
│
├── frontend/              # Next.js frontend
│   ├── app/               # Next.js app directory
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utility functions
│   └── public/            # Static assets
\`\`\`

## API Endpoints

- `GET /api/itineraries` - Get all itineraries
- `GET /api/itineraries/{id}` - Get a specific itinerary
- `POST /api/itineraries` - Create a new itinerary
- `GET /api/recommendations/{nights}` - Get recommended itineraries for a specific duration

## Troubleshooting

1. **Backend server not starting**:
   - Ensure you have all required dependencies installed
   - Check if ports 8000 and 8001 are available
   - Make sure you're running the commands from the backend directory

2. **Frontend not connecting to backend**:
   - Verify that both backend servers are running
   - Check for CORS issues in the browser console
   - Ensure the API URLs in the frontend code match the backend server addresses
