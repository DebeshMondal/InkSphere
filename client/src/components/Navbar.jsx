import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">InkSphere</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <SignedIn>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Create Blog
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  My Blogs
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Explore
                </a>
              </SignedIn>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <SignedIn>
              <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition">
                + Create Blog
              </button>
              <div className="relative group ml-4">
                <div className="flex items-center cursor-pointer select-none">
                  {user?.imageUrl && (
                    <img
                      src={user.imageUrl}
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full border-2 border-blue-600 object-cover"
                    />
                  )}
                  <span className="ml-2 font-medium text-gray-900 hidden sm:block">
                    {user?.firstName}
                  </span>
                </div>
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-20">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
                  <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonPopoverCard: 'shadow-none border-none' } }} />
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 