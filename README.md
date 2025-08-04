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

## Environment Configuration

The project uses the following environment file structure:

- **`.env`**: Contains example configurations and default values
- **`.env.local`**: Contains your actual credentials for local development (not committed to git)
- **Docker**: Uses `.env.local` files for containerized deployment

**Important**: Never commit your `.env.local` files to version control as they contain sensitive credentials.

## Setup Instructions

### API Setup

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>/logistics-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Environment Configuration:**

    The project includes `.env` files with example configurations. For local development, create a `.env.local` file:

    ```bash
    # Copy the environment file for local development
    cp .env .env.local
    ```
    
    Then edit the `.env.local` file and replace the placeholder values with your actual credentials:
    
    ```env
    PORT=8080
    MONGODB_URI=mongodb+srv://damolasorinolu:wXU2SM0jHmrpXOpE@dignifiedlabs.wbhkx33.mongodb.net
    FRONTEGG_CLIENT_ID=your_frontegg_client_id_here
    FRONTEGG_API_KEY=your_frontegg_api_key_here
    DEV_CORS_ORIGIN=http://localhost:3000
    ```

4. **Run the API server:**

    ```bash
    npm run dev
    ```

    The API server should now be running at `http://localhost:8080`.

### Frontend Setup

1. **Navigate to the `logistics-frontend` directory:**

    ```bash
    cd ../logistics-frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Environment Configuration:**

    The project includes `.env` files with example configurations. For local development, create a `.env.local` file:

    ```bash
    # Copy the environment file for local development
    cp .env .env.local
    ```
    
    Then edit the `.env.local` file and replace the placeholder values with your actual credentials:
    
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8080
    FRONTEGG_CLIENT_ID=your_frontegg_client_id_here
    FRONTEGG_APP_ID=your_frontegg_app_id_here
    ```

4. **Run the frontend application:**

    ```bash
    npm run dev
    ```

    The frontend application should now be running at `http://localhost:3000`.

## Troubleshooting

### Frontegg Authentication Issues

If you're experiencing authentication failures between the frontend and backend:

1. **Check Environment Variables**: Ensure you have set the correct Frontegg credentials in your `.env.local` files:
   - Backend (`.env.local`): `FRONTEGG_CLIENT_ID` and `FRONTEGG_API_KEY`
   - Frontend (`.env.local`): `FRONTEGG_CLIENT_ID` and `FRONTEGG_APP_ID`

2. **Verify Frontegg Configuration**: Make sure your Frontegg application is properly configured:
   - Check that your application's allowed origins include `http://localhost:3000`
   - Verify that your API key has the necessary permissions

3. **Check CORS Configuration**: Ensure the backend CORS settings allow requests from your frontend domain

4. **Version Compatibility**: The backend uses `@frontegg/client` v9.2.2 and frontend uses `@frontegg/nextjs` v9.2.2. Make sure these versions are compatible.

## Deployment Instructions

### Deploying Backend

You can deploy the backend & frontend to any cloud service provider or use Docker for containerization.

1. **Navigate to the root directory:**

    ```bash
    cd ..
    ```

2. **Build and run the Docker container for both frontend and backend:**

    ```bash
    docker-compose up --build
    ```

3. **To Build and run the Docker container for the backend alone:**

    ```bash
    docker build -t logistics-backend .
    docker run -p 8080:8080 logistics-backend
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

3. **Deploy the frontend:**

    ```bash
    cd frontend
    vercel
    ```

4. **Set Environment Variables on Vercel:**

    Go to your project’s dashboard on Vercel, navigate to the "Settings" tab, and add your environment variables, such as `NEXT_PUBLIC_API_URL`.

By following these instructions, you should be able to set up and deploy your Supply Chain Tracking System successfully.
