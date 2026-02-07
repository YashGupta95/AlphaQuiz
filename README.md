# AlphaQuiz

A simple Quiz application built using C# and ReactJS (using Material UI library)

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Features](#features)
- [References](#references)

## Project Overview

AlphaQuiz is a full-stack quiz application that provides an interactive platform for users to take quizzes. The application combines a robust backend API built with C# and .NET with a modern, responsive frontend built using ReactJS and Material UI.

## Tech Stack

### Backend
- **Language:** C#
- **Framework:** .NET (Version 6 or above)
- **Database:** Microsoft SQL Server
- **IDE:** Visual Studio 2022 (or above)

### Frontend
- **Framework:** ReactJS
- **UI Library:** Material UI
- **IDE:** VS Code

## Prerequisites

To setup and run the application, ensure you have the following installed:

- Visual Studio 2022 (or above)
- VS Code
- Microsoft .NET Runtime 6 (or above)
- Microsoft SQL Server Management Studio
- Node.js and npm (for the React frontend)

## Installation & Setup

### Backend Setup
1. Open Visual Studio 2022
2. Clone or open the repository
3. Restore NuGet packages
4. Configure your SQL Server connection string
5. Build the solution

### Frontend Setup
1. Navigate to the `quiz-client` directory
2. Run `npm install` to install dependencies
3. Configure API endpoint if necessary

## Project Structure

```
AlphaQuiz/
├── quiz-client/          # ReactJS frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── Backend/              # C# .NET API
│   └── ...
└── README.md
```

## Running the Application

### Start the Backend API
1. Open the solution in Visual Studio 2022
2. Build the project
3. Run the application (the API will typically run on a configured port)

### Start the Frontend
1. Navigate to the `quiz-client` directory
2. Run `npm start`
3. The application will open in your browser at [http://localhost:3000](http://localhost:3000)

## Features

- Interactive quiz taking experience
- Material UI for modern and responsive design
- Secure backend API with C# and .NET
- SQL Server database for reliable data storage
- Real-time feedback on quiz performance

## References

**Note:** The application has been built following the guidance & references from this tutorial by CodAffection: https://www.youtube.com/watch?v=rgrvOtCPS6Y&ab_channel=CodAffection