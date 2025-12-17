# [title]

A project management application built with Next.js, inspired by Linear.

## Features

- User authentication (sign up, sign in, sign out)
- Issue management (create, update, delete)
- Modern UI with Tailwind CSS
- Responsive design

## Tech Stack

- [Next.js](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [DirzzleORM](https://orm.drizzle.team/) for database ORM
- [PostgreSQL](https://www.postgresql.org/) for database
- [NextAuth.js](https://next-auth.js.org/) for authentication

## Getting Started

### Prerequisites

- Node.js and npm/yarn
- PostgreSQL database (or use a service like [Neon](https://neon.tech/))

### Installation

1. Clone the repository

   ```bash
   git clone [repo_url]
   cd []
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Copy the `.env.example` file to `.env.local` and update the values

   ```bash
   cp .env.example .env.local
   ```

4. Set up your database and update the `DATABASE_URL` in `.env.local`

5. Run database migrations

   ```bash
   npm run db:push
   ```

6. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `app/api/` - API routes for authentication and issues
- `app/components/` - Reusable UI components
- `lib/` - Utility functions and libraries
- `db/` - Database schema and client

## License

This project is licensed under the MIT License.
