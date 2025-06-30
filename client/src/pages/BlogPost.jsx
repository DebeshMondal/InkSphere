import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const BlogPost = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center py-10 text-lg text-gray-500">Loading blog...</div>;
  if (error) return <div className="text-center py-10 text-red-600 font-semibold">{error}</div>;
  if (!blog) return null;

  const isAuthor = user && (user.fullName === blog.author || user.username === blog.author || user.primaryEmailAddress?.emailAddress === blog.author);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>
      <h1 className="headline-serif text-4xl mb-2">{blog.title}</h1>
      <div className="flex items-center gap-4 mb-4 text-gray-600 text-sm">
        <span>By <span className="font-semibold text-black">{blog.author}</span></span>
        <span>•</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        <span>•</span>
        <span className="bg-gray-200 rounded-full px-3 py-1 text-xs font-medium">{blog.category}</span>
        {isAuthor && (
          <Link to={`/edit/${blog._id}`} className="ml-auto editorial-btn py-1 px-6 text-sm">Edit</Link>
        )}
      </div>
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="w-full max-h-80 object-cover rounded-xl mb-6" />
      )}
      <div className="prose prose-lg max-w-none mb-6" style={{whiteSpace: 'pre-line'}}>{blog.content}</div>
      {blog.keywords && blog.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.keywords.map((kw, i) => (
            <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{kw}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPost; 