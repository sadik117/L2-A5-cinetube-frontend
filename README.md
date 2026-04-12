# Overview of Cinetube

CineTube is a full-stack movie streaming platform where users can explore movies and give review, rating, like, comment, manage watchlists, and access premium content through a subscription system.

It includes a modern UI, secure authentication, and an admin dashboard for managing content and subscriptions.

# Live Demo:

 ([(https://cinetube-universe.vercel.app/)](https://cinetube-universe.vercel.app/))

# Features

# User Features
 Browse movies by categories (Action, Comedy, etc.)
 
 View detailed movie information (cast, rating, synopsis)
 
 Add/remove movies from watchlist
 
 Give review and rating
 
 Comment and like on review
 
 View user reviews
 
 Subscribe to premium plans (Stripe integration)
 
 Secure authentication system
 
# Admin Features
 Add new movies/series
 
 Update existing media
 
 Delete media
 
 View subscription analytics
 
 Monitor users & subscriptions
 
# Additional Features

Fully responsive design

 Optimized performance

 Toast notifications for user feedback
 
 Robust error handling system
 
 Cloudinary image upload
 
# Tech Stack

# Frontend

Next.js

TypeScript

Tailwind CSS

ShadCN UI / Lucide Icons

Backend

Node.js

Express.js

Prisma ORM

PostgreSQL

Services

Stripe (Payments & Subscriptions)

Cloudinary (Image Upload)
      
# Installation & Setup

 1. Clone the repository
git clone [](https://github.com/sadik117/L2-A5-cinetube-frontend/)
cd cinetube

 3. Setup Backend
cd server
npm install

Run:

npx prisma migrate dev
npm run dev

 3. Setup Frontend
cd client
npm install
npm run dev

# Environment Variables

Make sure to configure:

Database (PostgreSQL)

Stripe API keys

Cloudinary credentials

# Stripe Testing

Use Stripe test cards:

4242 4242 4242 4242

Expiry: Any future date

CVC: Any 3 digits

# Error Handling

Centralized error handler (backend)

Custom error class (AppError)

Frontend toast notifications

Validation & auth protection

# Admin Dashboard

Subscription analytics

Plan distribution charts

Active vs canceled users

Media management system
