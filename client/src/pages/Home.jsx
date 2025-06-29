import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import mockBlogs from '../mockBlogs';

const categories = [
  'Writing',
  'Productivity',
  'Lifestyle',
  'Technology',
  'Travel',
  'Education',
  'Health',
];

const Home = () => {
  const { user, isLoaded } = useUser();
  let displayName = '';
  if (isLoaded && user) {
    displayName = user.firstName || user.fullName || user.username || user.primaryEmailAddress?.emailAddress || '';
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Greeting and CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="headline-serif text-4xl mb-2 text-gray-900">
            {displayName ? `Welcome, ${displayName}!` : 'Welcome to InkSphere!'}
          </h2>
          <p className="text-lg text-gray-700">Discover, read, and share amazing stories and ideas.</p>
        </div>
        <Link to="/create" className="editorial-btn mt-4 sm:mt-0">+ Create Blog</Link>
      </div>

      {/* Categories/Tags Row */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-1 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-black hover:text-white transition-base text-sm font-medium"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home; 