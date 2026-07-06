# 🏥 Child Health Monitoring Dashboard

A MERN Stack application developed for managing child profiles and monitoring pediatric health measurements. 
The system enables healthcare staff to record and review children's latest health information while ensuring data integrity through backend validation.

---

## 📖 Project Overview

 This application provides a simple dashboard where healthcare staff can:

- Manage child profiles
- Record multiple health measurements
- View the latest health record of a child
- Identify abnormal health measurements using visual indicators

The application focuses on clean architecture, RESTful APIs, validation, and maintainable React components.

---

# ✨ Features

##  Child Management

- Create Child
- View All Children
- View Child Details
- Search Child by Name

---

## ❤️ Health Monitoring

Each child can have multiple health records.

Health Record contains:

- Height (cm)
- Weight (kg)
- Body Temperature (°C)
- Heart Rate (bpm)
- SpO₂ (%)
- Measurement Date & Time

---

## 📊 Dashboard

- View child details
- View latest health record
- BMI calculation
- Visual highlighting for abnormal measurements
- Responsive dashboard using Tailwind CSS

---

# ✅ Backend Validation

The backend validates:

- Required fields
- Child name (letters and spaces only)
- Contact number (10 digits)
- Date of birth cannot be in the future
- Measurement date cannot be in the future
- Height must be positive
- Weight must be positive
- Heart rate must be positive
- SpO₂ must be between 0–100
- Temperature must be within realistic human range
- Health records can only be created for existing children (prevents orphan records)

Appropriate HTTP status codes and descriptive error messages are returned.

---

#  Bonus Features Implemented

-  Search Child by Name
-  BMI Calculation
- Responsive UI using Tailwind CSS
-  Loading State
-  Success & Error Toast Notifications

---

# 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast
- Vite

### Backend

- Node.js
- Express.js
- TypeScript
- Mongoose

### Database

- MongoDB Atlas

---

# 📁 Project Structure

```
SGX Project
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── types
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
```

---

# 🗄️ Database Design

## Child Collection

```
Child

- fullName
- dateOfBirth
- gender
- guardianName
- contactNumber
```

---

## HealthRecord Collection

```
HealthRecord

- childId (ObjectId)
- height
- weight
- temperature
- heartRate
- spo2
- measurementDate
```

Relationship

```
One Child
      │
      │
      ├────────► Many Health Records
```

---

# 🔗 REST API Endpoints

## Child APIs

| Method | Endpoint | Description |
|----------|----------------|----------------|
| POST | /api/children | Create Child |
| GET | /api/children | Get All Children |
| GET | /api/children/:id | Get Child By ID |
| PUT | /api/children/:id | Update Child |
| DELETE | /api/children/:id | Delete Child |

---

## Health Record APIs

| Method | Endpoint | Description |
|----------|-------------------------------|--------------------------|
| POST | /api/health-records | Add Health Record |
| GET | /api/health-records/:childId | Get All Records |
| GET | /api/health-records/latest/:childId | Get Latest Record |

---


## Backend

https://child-health-monitoring-dashboard.onrender.com/
---

## Frontend
https://child-health-monitoring-dashboard-gamma.vercel.app/

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

# 📸 Application Modules

- Dashboard
- Child List
- Child Details
- Add Child Form
- Latest Health Summary
- Add Health Record Form

---

# 🔍 Edge Cases Handled

- Invalid child name
- Invalid contact number
- Future date of birth
- Future measurement date
- Negative height
- Negative weight
- Invalid SpO₂
- Invalid heart rate
- Invalid body temperature
- Missing child while creating health record
- Empty search results

---

# 🚀 Future Improvements

- Authentication
- Growth Charts
- Trend Indicators
- Pagination
- Filter Health Records by Date
- Export Reports
- Role-based Access

---

# 👨‍💻 Author
Eby JK
Developed as part of a MERN Stack Machine Test.

Frontend:
- React
- TypeScript
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

