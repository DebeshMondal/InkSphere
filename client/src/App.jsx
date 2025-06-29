import { useState } from 'react';
import { SignedIn, SignedOut, SignIn, SignUp, useUser } from '@clerk/clerk-react'
import Navbar from './components/Navbar'
import BlogCard from './components/BlogCard'
import mockBlogs from './mockBlogs'

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const { user, isLoaded } = useUser();

  let displayName = '';
  if (isLoaded && user) {
    displayName = user.firstName || user.fullName || user.username || user.primaryEmailAddress?.emailAddress || '';
  }

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      <SignedIn>
        <Navbar />
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-start">
          <h1 className="headline-serif text-6xl md:text-7xl mb-6 leading-tight text-gray-900">Human stories & ideas</h1>
          <p className="text-xl text-gray-700 mb-8">A place to read, write, and deepen your understanding</p>
          <button className="editorial-btn mb-8">Start reading</button>
        </section>
        {/* Dashboard/Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome{displayName ? `, ${displayName}` : ''}!</h2>
                <p className="text-gray-600">Create, share, and discover amazing blogs.</p>
              </div>
              <button className="mt-4 sm:mt-0 editorial-btn">+ Create Blog</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </main>
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
  )
}

export default App
