# Contactmin

The easy and modern contact form dashboard — built with **SvelteKit**, **Prisma**, **TypeScript**, and **Tailwind CSS**.

---

## Table of Contents
1. [What is this?](#what-is-this)
2. [Features](#features)
3. [Requirements](#requirements)
4. [How to Use](#how-to-use)
5. [Configuration](#configuration)
7. [Problems or Ideas?](#problems-or-ideas)
8. [License](#license)

---

## What is this?

**Contactmin** is a simple API and dashboard solution for handling contact form submissions from your website.  
Instead of building a backend for every site, you can use Contactmin as your centralized form handler with a clean dashboard to view and manage messages.

---

## Features

- Simple and clean dashboard built with **SvelteKit**
- Full **TypeScript** + **Prisma** setup
- Works out-of-the-box with **MySQL**, but easily adaptable to other databases
- Optional **Cloudflare Turnstile** spam protection
- Ready to deploy to **Vercel** (or any other host)
- CORS support — limit access to only your allowed domains

---

## Requirements

- Basic knowledge of **TypeScript** and **Prisma**
- A place to host it (Vercel is the easiest and free)
- A database (MySQL by default — can be changed in `schema.prisma`)

---

## How to Use

1. **Fork** this repository and name it however you like  
2. Edit whatever you need (e.g., Prisma schema, UI, etc.)
3. Rename `.env.example` → `.env` and fill in your configuration values
4. If you don’t need Turnstile, remove it from the send API route and `.env` file
5. Open `hooks.server.ts` and edit the `allowedOrigins` array to match your domain(s)
6. **Deploy** it on your hosting provider (Vercel recommended)

---

## Configuration

Example `.env` setup:

```env
DATABASE_URL="mysql://user:password@host:port/dbname"
TURNSTILE_SECRET="your_turnstile_secret"
```

also make sure to add an user in the User table in the db


## Problems or Ideas?

If you have a problem or idea, feel free to:

- Open an issue
- Create a pull request with your fix or feature

We’ll be happy to help!
