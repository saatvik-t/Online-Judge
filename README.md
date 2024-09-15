
# Online Judge

Online Judge is a full-stack application designed for attempting coding problems. It allows users to solve programming problems, and validate the solutions. It features backend built with NodeJS, frontend in React, and containers for deployment using Docker.


## Features

- User authentication (Based on Json Web Token)
- Profile management for users
- View problem statements and past submissions
- Code execution in multiple programming languages (Java, Python, C++)
- Cross-page navigation with protected routes.
- Responsive design and user-friendly UI.
- Backend containerized using Docker for easier deployment

## Tech Stack

**Client** 
- React
- TailwindCSS

**Server**
- NodeJS with Express
- MongoDB for data storage
- JWT for authentication
- Docker for containerization


## Environment Variables

To run this project, we need two .env files

### Backend

`MONGODB_URL = <your_mongodb_uri>`

`JWT_SECRET = <your_jwt_secret>`

`PORT = 8000`

`NODE_ENV = production`

`SAME_SITE = None`

`ORIGIN = <your_frontend_url>`

### Frontend

`VITE_BACKEND_URL = <your_backend_url>`