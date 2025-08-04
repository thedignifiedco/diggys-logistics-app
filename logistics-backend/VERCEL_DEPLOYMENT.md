# Vercel Deployment Guide

## Environment Variables Required

Make sure to set the following environment variables in your Vercel project settings:

### Required Variables:
- `MONGODB_URI` - Your MongoDB connection string
- `FRONTEGG_CLIENT_ID` - Your Frontegg client ID
- `FRONTEGG_API_KEY` - Your Frontegg API key
- `NODE_ENV` - Set to "production"

### Optional Variables:
- `PORT` - Port number (Vercel will set this automatically)
- `PROD_CORS_ORIGIN` - Your frontend domain for CORS

## Deployment Steps:

1. **Connect your Vercel project** to the `logistics-backend` subdirectory
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

## Build Process:

- Vercel will use the `@vercel/node` builder
- TypeScript files will be compiled automatically
- The server will start from `src/server.ts`

## Troubleshooting:

If you encounter build errors:
1. Check that all environment variables are set
2. Ensure the Vercel project is connected to the correct subdirectory
3. Verify that `package.json` is in the `logistics-backend` directory 