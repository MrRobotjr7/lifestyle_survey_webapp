# Lifestyle Survey WebApp

This is a full-stack lifestyle survey application built with **React (Vite + Tailwind CSS v4)** for the frontend and **Flask + MySQL** for the backend. It collects user responses on lifestyle preferences and calculates useful statistics like age analysis, favorite foods, and activity ratings.

---

## 📦 Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | React 19, Vite, Tailwind CSS v4                 |
| Backend     | Python, Flask, Flask-CORS, SQLAlchemy           |
| Database    | MySQL                                           |
| Deployment  | GitHub + Localhost (Can be deployed to Vercel/Render) |

---

## 📁 Project Structure
lifestyle_survey_webapp/
├── Backend_Survey/
│ ├── assignment.py # Main Flask app
│ ├── models.py # SQLAlchemy model
│ ├── requirements.txt # Backend dependencies
│ └── .env # (local DB config, not pushed)
├── Frontend_Survey/
│ ├── src/ # React components
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ ├── package.json
│ └── vite.config.js
└── README.md


---

## 🎯 Features

- ✅ **User Survey Form**
  - Full name, email, date of birth, contact number
  - Multiple-choice for favorite food
  - 1-5 rating scale for movies, radio, eating out, and TV
  - Validation and input restrictions (age must be 5–120)

- 📊 **Results Dashboard**
  - Total surveys completed
  - Average, youngest, oldest age
  - % of users who like pizza, pasta, pap & wors
  - Average scores for lifestyle ratings

---

## 🚀 Getting Started

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/MrRobotjr7/lifestyle_survey_webapp.git
cd lifestyle_survey_webapp

🧠 2. Backend Setup (Flask + MySQL)
🐍 Create a virtual environment

cd Backend_Survey
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/macOS

📦 Install dependencies

pip install -r requirements.txt

⚙️ Create .env file

Create a .env file in Backend_Survey/:

FLASK_APP=assignment.py
FLASK_ENV=development
SQLALCHEMY_DATABASE_URI=mysql+pymysql://<username>:<password>@localhost/<database>

🟢 Run Flask API

flask run

API will be live at http://localhost:5000
💻 3. Frontend Setup (React + Vite + Tailwind v4)

cd ../Frontend_Survey
npm install
npm run dev

Frontend will run at http://localhost:5173
📊 API Endpoints
Method	Endpoint	Description
POST	/api/surveys	Submit a new survey
GET	/api/survey-stats	Get aggregated survey analytics
🧪 Validations

    All text fields must be filled.

    Age is calculated from date of birth and must be between 5 and 120.

    All four rating questions are mandatory.

    Invalid submissions are rejected by both frontend and backend.

📈 Sample Statistics

    total_surveys: 150

    average_age: 29.7

    youngest_age: 6

    oldest_age: 64

    pizza_percent: 68.5%

    watch_movies_avg: 3.7

🧼 Deployment Suggestions

You can host:

    Frontend: Vercel / Netlify

    Backend: Render / Railway / Fly.io

    Database: Planetscale / Railway / AWS RDS MySQL

👨‍💻 Author

Ramateletse Morena
Samsung Advanced Industry Experience Programme
📍 South Africa · 🧠 Tech & Innovation Enthusiast
📜 License

This project is licensed under the MIT License.


---

Let me know when you're ready to update this file or push it to GitHub:

```bash
git add README.md
git commit -m "Add full project README"
git push origin main
