# AlphaQuiz

## Description
AlphaQuiz is an interactive quiz application that allows users to test their knowledge on various topics.

## Table of Contents
1. Project Overview  
2. Tech Stack  
3. Prerequisites  
4. Installation & Setup  
5. Project Structure  
6. Running the Application  
7. Features  
8. References

## Project Overview
This project aims to provide an engaging platform for users to take quizzes and track their scores. It consists of a backend API and a frontend client application.

## Tech Stack
- **Backend**: AlphaQuizAPI  
- **Frontend**: quiz-client

## Prerequisites
- Node.js (for both backend and frontend)  
- MongoDB (backend database)

## Installation & Setup
### For Backend:
1. Clone the repository: `git clone https://github.com/YashGupta95/AlphaQuiz.git`
2. Navigate into the backend directory: `cd AlphaQuiz/AlphaQuizAPI`
3. Install dependencies: `npm install`
4. Set up your environment variables.
5. Start the server: `npm start`

### For Frontend:
1. Navigate into the frontend directory: `cd AlphaQuiz/quiz-client`
2. Install dependencies: `npm install`
3. Run the application: `npm start`

## Project Structure
```
AlphaQuiz/
├── AlphaQuizAPI/  
│   ├── models/  
│   ├── routes/  
│   └── server.js  
└── quiz-client/  
    ├── src/  
    ├── public/  
    └── package.json  
```

## Running the Application
After setting up both the backend and frontend, run the server and client applications. The frontend should connect to the backend API at the designated endpoint.

## Features
- User authentication  
- Quiz creation and management  
- Score tracking  
- Responsive design

## References
Original tutorial by CodAffection