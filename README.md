# ParallaxUI

**ParallaxUI** is a graphical user interface designed to help developers and users with basic programming knowledge create customizable objects that feature dynamic parallax effects. Through an intuitive and modern interface, users can create objects with multiple layers that move at different speeds based on mouse hover, adding depth and a 3D-like experience. After completing their design, users can export an iframe embed code to integrate the object into their own projects or websites.

## Key Features

- **Customizable Elements:** Create and customize elements by adjusting dimensions, position (X/Y), depth (Z-axis), and color.
- **Parallax Effects:** Elements move at different speeds based on their depth value, creating a 3D parallax effect on mouse hover.
- **Real-Time Preview:** See changes immediately in the editor canvas powered by `react-parallax-tilt`.
- **Export & Embed:** Export designs as iframe embed codes. Designs are saved to the backend and served via `/embed/:id` routes.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS v4, shadcn/ui (New York style)
- **Backend:** Python / Flask, SQLAlchemy, PostgreSQL
- **Deployment:** Vercel (frontend), Render (backend)

## Getting Started

### Prerequisites
- Node.js
- Python 3.13
- pipenv

### Frontend
```bash
npm install
cp env.example .env        # set VITE_API_URL=http://localhost:5555
npm run dev                 # http://localhost:5173
```

### Backend
```bash
cd backend
pipenv install
cp template.env server/.env.development   # fill in DB_URI, FLASK_RUN_PORT, etc.
cd server
python application.py
```

Local development uses SQLite by default (`DB_URI=sqlite:///test.db`).

## Screenshots

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
  <img src="./src/assets/Screenshot%202024-10-23%20at%2011.11.34%E2%80%AFPM.png" alt="ParallaxUI Interface" width="400"/>
  <img src="./src/assets/Screenshot%202024-10-23%20at%2011.11.16%E2%80%AFPM.png" alt="ParallaxUI Interface" width="400"/>
  <img src="./src/assets/Screenshot 2024-10-23 at 11.11.03 PM.png" alt="ParallaxUI Interface" width="400"/>
  <img src="./src/assets/Screenshot 2024-10-23 at 11.10.54 PM.png" alt="ParallaxUI Interface" width="400"/>
</div>
