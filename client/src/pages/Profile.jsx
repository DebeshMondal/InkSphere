import { useUser } from '@clerk/clerk-react';
import BlogCard from '../components/BlogCard';
import mockBlogs from '../mockBlogs';

const Profile = () => {
  const { user, isLoaded } = useUser();
  let displayName = '', email = '', avatar = '', authoredBlogs = [];
  if (isLoaded && user) {
    displayName = user.fullName || user.firstName || user.username || user.primaryEmailAddress?.emailAddress || '';
    email = user.primaryEmailAddress?.emailAddress || '';
    avatar = user.imageUrl;
    // For now, filter mockBlogs by author name
    authoredBlogs = mockBlogs.filter(b => b.author === displayName);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
        <img src={avatar} alt={displayName} className="w-24 h-24 rounded-full object-cover border-2 border-black" />
        <div>
          <h2 className="headline-serif text-3xl mb-1">{displayName}</h2>
          <p className="text-gray-600 mb-2">{email}</p>
          <span className="inline-block bg-black text-white rounded-full px-4 py-1 text-xs font-semibold">Member</span>
        </div>
      </div>
      <h3 className="headline-serif text-2xl mb-4">Authored Blogs</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {authoredBlogs.length > 0 ? (
          authoredBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-gray-500 col-span-2">No blogs authored yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile; 