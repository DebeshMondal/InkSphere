import { useState } from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn, SignUp, useUser, UserButton } from '@clerk/clerk-react';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';
import Explore from './pages/Explore';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import BlogCard from './components/BlogCard';
import mockBlogs from './mockBlogs';
import BlogPost from './pages/BlogPost';
import EditBlog from './pages/EditBlog';

function Navbar() {
  const { user } = useUser();
  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="flex items-center">
            <span className="text-3xl md:text-4xl font-bold headline-serif text-gray-900">InkSphere</span>
          </div>
          <div className="flex items-center space-x-6 text-lg md:text-xl">
            <NavLink to="/" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>Home</NavLink>
            <NavLink to="/explore" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>Explore</NavLink>
            <NavLink to="/create" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>Create Blog</NavLink>
            <NavLink to="/my-blogs" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>My Blogs</NavLink>
            <NavLink to="/admin" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>Admin</NavLink>
            <NavLink to="/profile" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>Profile</NavLink>
            {user && (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

function HeroSection() {
  return (
    <section className="hero-bg w-full py-14 md:py-18 px-4 flex flex-col items-center justify-center text-center relative rounded-b-3xl shadow-lg mb-12 overflow-hidden">
      <h1 className="headline-serif text-3xl md:text-5xl lg:text-6xl mb-4 leading-tight text-white drop-shadow-lg max-w-2xl mx-auto">
        <span className="relative inline-block">
          <span className="accent font-extrabold" style={{
            WebkitTextStroke: '2px #fff',
            textShadow: '0 2px 16px rgba(0,0,0,0.18)',
            color: '#6366f1',
            position: 'relative',
            zIndex: 2
          }}>InkSphere</span>
        </span>
        <span className="block mt-1">Human stories & ideas</span>
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl mx-auto drop-shadow">
        A place to read, write, and deepen your understanding. Share your voice with the world.
      </p>
      <button className="editorial-btn mb-6 shadow-xl">Start reading</button>
      {/* Subtle SVG illustration */}
      <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 bottom-0 w-60 h-24 md:w-80 md:h-32 opacity-20 pointer-events-none">
        <ellipse cx="200" cy="60" rx="200" ry="60" fill="#fff" />
      </svg>
    </section>
  );
}

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const { user, isLoaded } = useUser();
  const location = useLocation();

  let displayName = '';
  if (isLoaded && user) {
    displayName = user.firstName || user.fullName || user.username || user.primaryEmailAddress?.emailAddress || '';
  }

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      <SignedIn>
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            {location.pathname === '/' && <HeroSection />}
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/edit/:id" element={<EditBlog />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#FAF9F6' }}>
          {showSignIn ? (
            <>
              <SignIn routing="hash" signUpUrl="/" />
              <button
                className="mt-4 text-blue-600 underline"
                onClick={() => setShowSignIn(false)}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              <SignUp routing="hash" signInUrl="/" />
              <button
                className="mt-4 text-blue-600 underline"
                onClick={() => setShowSignIn(true)}
              >
                Already have an account? Sign in
              </button>
            </>
          )}
        </div>
      </SignedOut>
    </div>
  );
}

export default App;
