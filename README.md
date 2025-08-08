# Mini LMS (Learning Management System)

A simple Learning Management System built using Next.js + Node.js + mongoDB + Express.js. It allows instructors to upload courses and students to enroll, learn, and track progress.

---

## Our Features

- Student can:
  - Browse and enroll in courses
  - Watch lessons/videos
  - Track course completion

- Auth:
  - JWT-based login/signup
  - Role-based access (Admin, Instructor, Student)

---

## 🛠Tech Stack

- **Frontend:** Next.js / Tailwind CSS
- **Backend:** Node.js / Express
- **Database:** MongoDB 
- **Authentication:** JWT / Passport.js
- **Storage:**  Local 

---

## 📦 Installation

```bash
git clone https://github.com/Prabin70/mini.git
cd mini-lms

# For backend
cd server
npm install
npm run dev

# For frontend
cd client
npm install
npm run dev
