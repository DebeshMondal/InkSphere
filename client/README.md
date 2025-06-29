# InkSphere Frontend

A modern blog creation platform built with React, Vite, Tailwind CSS, and Clerk authentication.

## Features

- 🔐 **Authentication**: Powered by Clerk
- 🎨 **Modern UI**: Built with Tailwind CSS
- ⚡ **Fast Development**: Vite for lightning-fast builds
- 📱 **Responsive**: Mobile-first design
- 🧩 **Component-based**: Modular React components

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Clerk:**
   - Sign up at [clerk.com](https://clerk.com)
   - Create a new application
   - Copy your publishable key
   - Create a `.env.local` file in the root directory:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
     ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation component
│   └── BlogCard.jsx    # Blog preview card
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles (Tailwind)
```

## Next Steps

- [ ] Set up backend API
- [ ] Add blog creation functionality
- [ ] Implement blog listing and search
- [ ] Add user profiles
- [ ] Implement likes and comments
- [ ] Add admin dashboard
