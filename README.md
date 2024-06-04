# Supply Chain Tracking System

This repository is a supply chain tracking system, consisting of a backend API built with TypeScript and Express, and a frontend web app built with Next.js. The system allows users to track and trace supply chain items by creating, updating, and querying orders and their associated events.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [API Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Deployment Instructions](#deployment-instructions)
  - [Deploying API](#deploying-backend)
  - [Deploying Frontend](#deploying-frontend)

## Tech Stack

- **API**: Node.js, Express, TypeScript, MongoDB, Mongoose
- **Frontend**: Next.js, React, Bootstrap
- **Deployment**: Vercel for the frontend, Docker for containerization

## Setup Instructions

### API Setup

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>/logistics-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file in the `logistics-api` directory and add the following environment variables:**

    ```env
    PORT=3000
    DB_URL=mongodb://localhost:27017/logistics-api
    ```

4. **Run the API server:**

    ```bash
    npm run dev
    ```

    The API server should now be running at `http://localhost:3000`.

### Frontend Setup

1. **Navigate to the `logistics-web` directory:**

    ```bash
    cd ../logistics-web
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env.local` file in the `logistics-web` directory and add the following environment variable:**

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```

4. **Run the frontend application:**

    ```bash
    npm run dev
    ```

    The frontend application should now be running at `http://localhost:3001`.

## Deployment Instructions

### Deploying Backend

You can deploy the backend to any cloud service provider or use Docker for containerization.

1. **Build and run the Docker container:**

    ```bash
    docker build -t logistics-api .
    docker run -p 3000:3000 logistics-api
    ```

    Ensure your MongoDB instance is accessible from the deployed backend.

### Deploying Frontend

1. **Install Vercel CLI:**

    ```bash
    npm install -g vercel
    ```

2. **Login to Vercel:**

    ```bash
    vercel login
    ```

3. **Create a `vercel.json` file in the `frontend` directory:**

    ```json
    {
      "version": 2,
      "builds": [
        {
          "src": "package.json",
          "use": "@vercel/next"
        }
      ],
      "routes": [
        {
          "src": "/(.*)",
          "dest": "/"
        }
      ]
    }
    ```

4. **Deploy the frontend:**

    ```bash
    cd frontend
    vercel
    ```

5. **Set Environment Variables on Vercel:**

    Go to your project’s dashboard on Vercel, navigate to the "Settings" tab, and add your environment variables, such as `NEXT_PUBLIC_API_URL`.

By following these instructions, you should be able to set up and deploy your Supply Chain Tracking System successfully. If you encounter any issues, please refer to the official documentation for the respective technologies or raise an issue in the project repository.
