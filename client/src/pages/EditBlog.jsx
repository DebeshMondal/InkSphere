import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const categories = [
  'Writing', 'Productivity', 'Lifestyle', 'Technology', 'Travel', 'Education', 'Health'
];

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState('');
  const [keywords, setKeywords] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setTitle(data.title);
        setCategory(data.category);
        setImage(data.image || '');
        setKeywords((data.keywords || []).join(', '));
        setContent(data.content);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          image,
          content,
          author: user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || 'Anonymous',
          keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
        })
      });
      if (!res.ok) throw new Error('Failed to update blog');
      navigate(`/blog/${id}`);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-lg text-gray-500">Loading blog...</div>;
  if (error) return <div className="text-center py-10 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="headline-serif text-4xl mb-6">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-lg">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input type="text" className="w-full border rounded-lg px-3 py-2" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select className="w-full border rounded-lg px-3 py-2" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input type="text" className="w-full border rounded-lg px-3 py-2" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <label className="block font-semibold mb-1">Keywords (comma separated)</label>
          <input type="text" className="w-full border rounded-lg px-3 py-2" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="e.g. productivity, writing, tips" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-[120px]" value={content} onChange={e => setContent(e.target.value)} required />
        </div>
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="editorial-btn w-full mt-2"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </form>
    </div>
  );
};

export default EditBlog; 