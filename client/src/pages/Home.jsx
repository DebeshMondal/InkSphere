import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';

const categories = [
  'All',
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
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  let displayName = '';
  if (isLoaded && user) {
    displayName = user.firstName || user.fullName || user.username || user.primaryEmailAddress?.emailAddress || '';
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:5000/api/blogs');
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

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
            className={`px-4 py-1 rounded-full border border-gray-300 text-gray-700 text-sm font-medium transition-base ${selectedCategory === cat ? 'bg-black text-white border-black' : 'bg-white hover:bg-black hover:text-white'}`}
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="text-center py-10 text-lg text-gray-500">Loading blogs...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600 font-semibold">{error}</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No blogs found. Be the first to create one!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 