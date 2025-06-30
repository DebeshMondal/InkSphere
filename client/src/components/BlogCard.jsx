import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog._id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group-hover:scale-[1.02]">
        {blog.image && (
          <div className="h-48 bg-gray-200">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center mb-2">
            <span className="inline-block bg-gradient-to-r from-blue-400 to-indigo-400 text-white text-xs px-2 py-1 rounded-full font-medium shadow transition-base">
              {blog.category}
            </span>
            <span className="text-gray-500 text-sm ml-auto">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {blog.excerpt || (blog.content && blog.content.slice(0, 120) + (blog.content.length > 120 ? '...' : ''))}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mr-3 flex items-center justify-center text-white font-bold text-lg shadow">
                {blog.author[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {blog.views || 0}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {blog.likes || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard 