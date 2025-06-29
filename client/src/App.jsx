import { useState } from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn, SignUp, useUser } from '@clerk/clerk-react';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';
import Explore from './pages/Explore';
import Admin from './pages/Admin';
import BlogCard from './components/BlogCard';
import mockBlogs from './mockBlogs';

function Navbar() {
  const { user } = useUser();
  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold headline-serif text-gray-900">InkSphere</span>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink to="/" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>Home</NavLink>
            <NavLink to="/create" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>Create Blog</NavLink>
            <NavLink to="/my-blogs" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>My Blogs</NavLink>
            <NavLink to="/explore" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>Explore</NavLink>
            <NavLink to="/admin" className={({isActive}) => isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'}>Admin</NavLink>
            {user && (
              <img src={user.imageUrl} alt={user.fullName} className="w-8 h-8 rounded-full ml-2 border object-cover" />
            )}
          </div>
        </div>
      </div>
    </nav>
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
        {location.pathname === '/' && (
          <section className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-start">
            <h1 className="headline-serif text-6xl md:text-7xl mb-6 leading-tight text-gray-900">Human stories & ideas</h1>
            <p className="text-xl text-gray-700 mb-8">A place to read, write, and deepen your understanding</p>
            <button className="editorial-btn mb-8">Start reading</button>
          </section>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
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
