import { useState } from 'react';
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react'
import Navbar from './components/Navbar'

function App() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <SignedIn>
        <Navbar />
        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to InkSphere!</h2>
                <p className="text-gray-600">Your blog creation platform is ready.</p>
                <p className="text-sm text-gray-500 mt-2">Start creating amazing content!</p>
              </div>
            </div>
          </div>
        </main>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
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
