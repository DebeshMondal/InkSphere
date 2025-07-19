import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'debeshmondal05@gmail.com'; // Change this to your admin email

const Admin = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState('');

  const isAdmin = isLoaded && user && (user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL);

  useEffect(() => {
    if (!isAdmin) return;
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
  }, [isAdmin, deleting]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog');
      setBlogs(blogs => blogs.filter(b => b._id !== id));
    } catch (err) {
      alert(err.message || 'Delete failed');
    } finally {
      setDeleting('');
    }
  };

  if (!isAdmin) {
    return <div className="text-center py-10 text-lg text-red-600 font-semibold">Access denied. Admins only.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="headline-serif text-4xl mb-6">Admin Dashboard</h2>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          className="border rounded-lg px-4 py-2 w-full md:w-80"
          placeholder="Search by title, author, category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search blogs"
        />
      </div>
      {loading ? (
        <div className="text-center py-10 text-lg text-gray-500">Loading blogs...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600 font-semibold">{error}</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No blogs found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.filter(blog =>
                blog.title.toLowerCase().includes(search.toLowerCase()) ||
                blog.author.toLowerCase().includes(search.toLowerCase()) ||
                blog.category.toLowerCase().includes(search.toLowerCase())
              ).map(blog => (
                <tr key={blog._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold max-w-xs truncate" title={blog.title}>{blog.title}</td>
                  <td className="py-3 px-4">{blog.author}</td>
                  <td className="py-3 px-4">{blog.category}</td>
                  <td className="py-3 px-4">{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <Link to={`/blog/${blog._id}`} className="editorial-btn py-1 px-4 text-xs" aria-label="View blog">View</Link>
                    <Link to={`/edit/${blog._id}`} className="editorial-btn py-1 px-4 text-xs" aria-label="Edit blog">Edit</Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="editorial-btn py-1 px-4 text-xs bg-red-600 hover:bg-red-700 border-none"
                      aria-label="Delete blog"
                      disabled={deleting === blog._id}
                    >
                      {deleting === blog._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin; 