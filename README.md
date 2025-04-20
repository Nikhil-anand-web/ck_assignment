# Project Setup Guide

This is a Next.js project. Follow the steps below to set up and run the project locally.

## Prerequisites
- Node.js (v16 or higher)
- npm
- Git

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
1. **Install the dependencies**
   ```bash
   npm i
1. **Create a .env file and the following dependencies accourding to your environment**
  
   GOOGLE_CLIENT_ID="349085567960-ifio9oq0md1c0pf7b734ee91lb7tsioh.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL=http://localhost:3000


DATABASE_URL=""



NEXT_PUBLIC_PAYTM_MID=""
PAYTM_MERCHANT_KEY=""
NEXT_PUBLIC_PAYTM_WEBSITE=DEFAULT
NEXT_PUBLIC_PAYTM_CHANNEL_ID=WEB
NEXT_PUBLIC_PAYTM_INDUSTRY_TYPE_ID=Retail
NEXT_PUBLIC_PAYTM_CALLBACK_URL=http://localhost:3000/api/v1/paytm/callback
PAYTM_ENVIRONMENT=PROD
APP_ENV="TEST"

4. **generate the db schema**
   ```bash
   
   npx prisma generate
5. **generate the db schema**
   ```bash
   
   npm run build 
   npm start