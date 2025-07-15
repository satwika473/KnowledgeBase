import React, { useEffect, useState } from 'react';
import './Features.css';
import { FiHeart, FiMessageSquare, FiShare2, FiBookmark } from 'react-icons/fi';

const LIKES_KEY = 'articleLikes';
const BOOKMARK_KEY = 'articleBookmarks';

const Features = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tempTags, setTempTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareArticle, setShareArticle] = useState(null);
  const [likedMap, setLikedMap] = useState({});
  const [commentsMap, setCommentsMap] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [bookmarkedMap, setBookmarkedMap] = useState({});

  const TAGS = ['programming', 'cheatsheets', 'interviewprep', 'projects', 'error/solution'];
  const GIST_API_URL =
    'https://gist.githubusercontent.com/chandanapriyabadina/e58af47c6b26e5985891fbb83180dd4f/raw/92c26e70ad8ab67fdb856ccac9d564e78ffb167a/articles.json';

  // Load likes and bookmarks from localStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem(LIKES_KEY);
    const storedBookmarks = localStorage.getItem(BOOKMARK_KEY);
    if (storedLikes) setLikedMap(JSON.parse(storedLikes));
    if (storedBookmarks) setBookmarkedMap(JSON.parse(storedBookmarks));
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch(GIST_API_URL);
      const data = await res.json();

      const normalized = searchTerm.toLowerCase();

      const filtered = data.filter((article) => {
        const matchesSearch =
          !normalized ||
          article.title.toLowerCase().includes(normalized) ||
          article.description.toLowerCase().includes(normalized) ||
          article.tags.some((tag) => tag.toLowerCase().includes(normalized));

        const matchesTags =
          !selectedTags.length ||
          selectedTags.some((tag) =>
            article.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
          );

        return matchesSearch && matchesTags;
      });

      setArticles(filtered.slice(0, 20));
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [searchTerm, selectedTags]);

  const handleApplyFilters = () => setSelectedTags(tempTags);
  const handleClearFilters = () => {
    setTempTags([]);
    setSelectedTags([]);
  };
  const toggleTag = (tag) => {
    setTempTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleLike = (article) => {
    if (likedMap[article.id]) return;
    const updatedLikes = { ...likedMap, [article.id]: true };
    setLikedMap(updatedLikes);
    localStorage.setItem(LIKES_KEY, JSON.stringify(updatedLikes));
    setRecentActivity((prev) => [
      { type: 'like', article, time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  };

  const handleComment = (article) => {
    const comment = prompt('Enter your comment:');
    if (comment) {
      setCommentsMap((prev) => ({
        ...prev,
        [article.id]: [...(prev[article.id] || []), comment],
      }));
      setRecentActivity((prev) => [
        { type: 'comment', article, comment, time: new Date().toLocaleTimeString() },
        ...prev,
      ]);
    }
  };

  const handleShare = (article) => {
    setShareArticle(article);
    setShareModalOpen(true);
    setRecentActivity((prev) => [
      { type: 'share', article, time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  };

  const handleBookmark = (article) => {
    if (bookmarkedMap[article.id]) return;
    const updatedBookmarks = { ...bookmarkedMap, [article.id]: true };
    setBookmarkedMap(updatedBookmarks);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updatedBookmarks));
    setRecentActivity((prev) => [
      { type: 'bookmark', article, time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  };

  const SearchBar = () => (
    <div className="mb-4">
      <input
        type="text"
        className="form-control shadow-sm"
        placeholder="Search articles..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          borderRadius: 10,
          border: '1px solid #ccc',
          padding: '10px 15px',
          fontSize: '1rem',
          transition: 'all 0.2s ease-in-out',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}
        onFocus={(e) =>
          (e.target.style.boxShadow = '0 0 6px rgba(0,123,255,0.4)')
        }
        onBlur={(e) =>
          (e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)')
        }
      />
    </div>
  );

  const ArticleCard = ({ article }) => {
    const liked = likedMap[article.id] || false;
    const comments = commentsMap[article.id] || [];
    const bookmarked = bookmarkedMap[article.id] || false;
    const [showComments, setShowComments] = useState(false);

    return (
      <div className="card1 h-100 position-relative">
        <div
          className="bookmark-icon position-absolute top-0 end-0 p-2"
          style={{ cursor: 'pointer', fontSize: '1.25rem' }}
          onClick={() => handleBookmark(article)}
          title="Bookmark"
        >
          <FiBookmark color={bookmarked ? "#10b981" : "#ccc"} />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text"><strong>👤 Author:</strong> {article.author}</p>
          <p className="card-text">{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm mt-auto">
            Read More
          </a>
          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-outline-danger btn-sm" onClick={() => handleLike(article)} disabled={liked}>
              <FiHeart /> Like {liked ? 1 : 0}
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => handleComment(article)}>
              <FiMessageSquare /> Comment {comments.length}
            </button>
            <button className="btn btn-outline-info btn-sm" onClick={() => handleShare(article)}>
              <FiShare2 /> Share
            </button>
          </div>
          {comments.length > 0 && (
            <div className="mt-2">
              <button
                className="btn btn-link btn-sm"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments ? 'Hide Comments' : 'Show Comments'}
              </button>
              {showComments && (
                <ul className="list-group list-group-flush mt-1">
                  {comments.map((c, i) => (
                    <li key={i} className="list-group-item">{c}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const Filters = () => (
    <div className="filters-container p-3 shadow-sm bg-light rounded">
      <h5 className="mb-3">Filter by Tags</h5>
      {TAGS.map((tag) => (
        <div key={tag} className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id={`tag-${tag}`}
            checked={tempTags.includes(tag)}
            onChange={() => toggleTag(tag)}
          />
          <label className="form-check-label text-capitalize" htmlFor={`tag-${tag}`}>
            {tag}
          </label>
        </div>
      ))}
      {tempTags.length > 0 && (
        <>
          <h6 className="mt-3">Selected Tags:</h6>
          <div className="mb-2">
            {tempTags.map((tag) => (
              <span key={tag} className="badge bg-primary me-1 mb-1">
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
      <button className="btn btn-primary mt-2 w-100" onClick={handleApplyFilters}>Apply Filters</button>
      <button className="btn btn-outline-secondary mt-2 w-100" onClick={handleClearFilters}>Clear Filters</button>
    </div>
  );

  const ShareModal = ({ article, onClose }) => {
    if (!article) return null;
    const encodedUrl = encodeURIComponent(article.url);
    const encodedTitle = encodeURIComponent(article.title);
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 350 }}>
          <h5 className="mb-3">Share Article</h5>
          <p className="mb-2">{article.title}</p>
          <div className="d-flex flex-column gap-2">
            <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="btn btn-success">WhatsApp</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">LinkedIn</a>
            <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="btn btn-danger">Gmail</a>
          </div>
          <button className="btn btn-outline-secondary mt-3 w-100" onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };

  const RecentActivity = () => (
    <div className="recent-activity mt-5">
      <h4>Recent Activity</h4>
      {recentActivity.length === 0 ? (
        <p className="text-muted">No recent activity yet.</p>
      ) : (
        <ul className="list-group">
          {recentActivity.slice(0, 10).map((activity, idx) => (
            <li key={idx} className="list-group-item d-flex align-items-center">
              {activity.type === 'like' && <><FiHeart className="me-2 text-danger" /><span>Liked <strong>{activity.article.title}</strong> at {activity.time}</span></>}
              {activity.type === 'comment' && <><FiMessageSquare className="me-2 text-secondary" /><span>Commented on <strong>{activity.article.title}</strong>: "{activity.comment}" at {activity.time}</span></>}
              {activity.type === 'share' && <><FiShare2 className="me-2 text-info" /><span>Shared <strong>{activity.article.title}</strong> at {activity.time}</span></>}
              {activity.type === 'bookmark' && <><FiBookmark className="me-2 text-success" /><span>Bookmarked <strong>{activity.article.title}</strong> at {activity.time}</span></>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="row mt-4 features-page">
      <div className="col-md-3">
        <Filters />
      </div>
      <div className="col-md-9">
        <SearchBar />
        <div className="row">
          {articles.length ? (
            articles.map((article) => (
              <div key={article.id} className="col-md-6 col-lg-4 mb-4">
                <ArticleCard article={article} />
              </div>
            ))
          ) : (
            <p className="text-muted">No articles found.</p>
          )}
        </div>
        <RecentActivity />
      </div>
      {shareModalOpen && (
        <ShareModal article={shareArticle} onClose={() => setShareModalOpen(false)} />
      )}
    </div>
  );
};

export default Features;
