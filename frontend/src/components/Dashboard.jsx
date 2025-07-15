import React, { useState, useRef, useEffect } from 'react';
import './Dashboard.css';
import {
  BsPerson, BsActivity, BsFileText, BsBoxArrowRight, BsCalendar3,
  BsChevronLeft, BsChevronRight, BsFillBellFill, BsFillEnvelopeFill,
  BsPersonCircle, BsSearch, BsJustify
} from 'react-icons/bs';
import {
  FiEdit, FiUpload, FiSave, FiX, FiHeart, FiMessageSquare,
  FiShare2, FiClock, FiAward, FiBookmark, FiUserPlus, FiTrendingUp,
  FiTrash2, FiEye, FiBarChart2
} from 'react-icons/fi';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showStreakCalendar, setShowStreakCalendar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [yearsData] = useState(generateMultiYearData());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Articles state
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articlesError, setArticlesError] = useState('');

  useEffect(() => {
    if (activeSection === 'articles') {
      setArticlesLoading(true);
      setArticlesError('');
      fetch('http://localhost:5000/articles')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setArticles(data);
          } else {
            setArticles([]);
            setArticlesError('Invalid data format from backend.');
          }
        })
        .catch((err) => {
          setArticles([]);
          setArticlesError('Failed to fetch articles: ' + err.message);
          console.error('Failed to fetch articles:', err);
        })
        .finally(() => setArticlesLoading(false));
    }
  }, [activeSection]);

  // Profile state
  const [profile, setProfile] = useState({
    name: 'satwika',
    email: 'satwijanu@gmail.com',
    dob: '09-02-2005',
    location: 'HanumanNagar 8thline, Vinukonda',
  });
  const [profileImage, setProfileImage] = useState(
    'https://source.unsplash.com/random/300x300?portrait'
  );
  const fileInputRef = useRef(null);

  // Activities state
  const [filter, setFilter] = useState('all');
  const streakDays = 7;
  const streakActive = streakDays > 0;

  const activities = [
    {
      id: 1,
      img: 'https://source.unsplash.com/random/300x200?social',
      desc: 'Liked a post about React hooks',
      type: 'like',
      time: '2 mins ago',
      content: 'React Hooks: A Complete Guide',
      icon: <FiHeart />
    },
    {
      id: 2,
      img: 'https://source.unsplash.com/random/300x200?comment',
      desc: 'Commented on an article',
      type: 'comment',
      time: '15 mins ago',
      content: 'State Management in 2023',
      icon: <FiMessageSquare />
    },
    {
      id: 3,
      img: 'https://source.unsplash.com/random/300x200?share',
      desc: 'Shared a resource with team',
      type: 'share',
      time: '1 hour ago',
      content: 'CSS Grid Tutorial',
      icon: <FiShare2 />
    },
    {
      id: 4,
      img: 'https://source.unsplash.com/random/300x200?read',
      desc: 'Read an article',
      type: 'read',
      time: '3 hours ago',
      content: 'My thoughts on Next.js',
      icon: <FiBookmark />
    },
    {
      id: 5,
      img: 'https://source.unsplash.com/random/300x200?like',
      desc: 'Liked a tutorial',
      type: 'like',
      time: '5 hours ago',
      content: 'TypeScript for Beginners',
      icon: <FiHeart />
    },
    {
      id: 6,
      img: 'https://source.unsplash.com/random/300x200?discussion',
      desc: 'Started a discussion',
      type: 'discussion',
      time: '1 day ago',
      content: 'Best UI Libraries in 2023',
      icon: <FiMessageSquare />
    },
    {
      id: 7,
      img: 'https://source.unsplash.com/random/300x200?connection',
      desc: 'New connection added',
      type: 'connection',
      time: '2 days ago',
      content: 'Sarah Johnson',
      icon: <FiUserPlus />
    },
    {
      id: 8,
      img: 'https://source.unsplash.com/random/300x200?achievement',
      desc: 'Earned an achievement',
      type: 'achievement',
      time: '3 days ago',
      content: 'Active Contributor',
      icon: <FiAward />
    }
  ];

  // Helpers
  const getDayColor = (activityLevel) => {
    if (activityLevel === null) return 'future';
    if (activityLevel === 0) return 'empty';
    return `level-${activityLevel}`;
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case 'like': return 'like-badge';
      case 'comment': return 'comment-badge';
      case 'share': return 'share-badge';
      case 'read': return 'read-badge';
      case 'discussion': return 'discussion-badge';
      case 'connection': return 'connection-badge';
      case 'achievement': return 'achievement-badge';
      default: return '';
    }
  };

  const getFilterLabel = (type) => {
    switch (type) {
      case 'like': return 'Likes';
      case 'comment': return 'Comments';
      case 'share': return 'Shares';
      case 'read': return 'Reads';
      case 'discussion': return 'Discussions';
      case 'connection': return 'Connections';
      case 'achievement': return 'Achievements';
      default: return 'All';
    }
  };

  // Profile image helpers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      setProfileImage(imageDataUrl);
      localStorage.setItem('userProfileImage', imageDataUrl);
    };
    reader.readAsDataURL(file);
  };
const handleDeleteArticle = async (id) => {
  if (!window.confirm("Are you sure you want to delete this article?")) return;

  try {
    const res = await fetch(`http://localhost:5000/articles/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Article deleted.");
      setArticles((prev) => prev.filter((a) => a._id !== id));
      setSelectedArticle(null);
    } else {
      const err = await res.json();
      alert("Failed to delete: " + err.error);
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("An error occurred while deleting.");
  }
};
const handleEditArticle = async (article) => {
  const newTitle = prompt("Enter new title", article.title);
  if (!newTitle || newTitle === article.title) return;

  try {
    const res = await fetch(`http://localhost:5000/articles/${article._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...article, title: newTitle }),
    });

    if (res.ok) {
      const updated = await res.json();
      setArticles((prev) =>
        prev.map((a) => (a._id === updated._id ? updated : a))
      );
      setSelectedArticle(updated);
      alert("Article updated.");
    } else {
      const err = await res.json();
      alert("Failed to update: " + err.error);
    }
  } catch (err) {
    console.error("Edit error:", err);
    alert("An error occurred while updating.");
  }
};

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleSave = async () => {
  try {
    // Replace 'userId' with the actual user's _id from your backend
    const userId = profile._id; // Make sure profile has _id from backend
    const res = await fetch(`http://localhost:5000/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    const updatedProfile = await res.json();
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
  } catch (err) {
    alert('Profile updated successfully');
  }
};

  const handleCancel = () => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedImage) setProfileImage(savedImage);
    setIsEditing(false);
  };

  // Calendar helpers
  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      const today = new Date();
      const nextMonth = direction === 'prev'
        ? newDate.getMonth() - 1
        : newDate.getMonth() + 1;
      newDate.setMonth(nextMonth);

      // Prevent navigating into the future
      if (
        newDate.getFullYear() > today.getFullYear() ||
        (newDate.getFullYear() === today.getFullYear() &&
          newDate.getMonth() > today.getMonth())
      ) {
        return prev;
      }
      return newDate;
    });
  };



  // Load profile on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedImage) setProfileImage(savedImage);
  }, []);

  // Calendar generation utilities
  function generateDayData(day, maxDay) {
    const probability = 0.3 + 0.7 * (day / maxDay);
    return Math.random() < probability ? Math.floor(Math.random() * 4) + 1 : 0;
  }
  function generateMonthData(year, month) {
    const today = new Date();
    if (
      year > today.getFullYear() ||
      (year === today.getFullYear() && month > today.getMonth())
    )
      return {};

    const isCurrentMonth =
      year === today.getFullYear() && month === today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const maxDay = isCurrentMonth ? today.getDate() : daysInMonth;
    const monthData = {};
    for (let day = 1; day <= daysInMonth; day++) {
      monthData[day] = day <= maxDay ? generateDayData(day, maxDay) : null;
    }
    return monthData;
  }
  function generateMultiYearData() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const years = {};
    for (let year = currentYear - 2; year <= currentYear; year++) {
      years[year] = {};
      for (let month = 0; month < 12; month++) {
        if (
          year < currentYear ||
          (year === currentYear && month <= today.getMonth())
        ) {
          years[year][month] = generateMonthData(year, month);
        }
      }
    }
    return years;
  }

  // Calendar & streak components
  const renderMonthCalendar = (year, month) => {
    const today = new Date();
    if (
      year > today.getFullYear() ||
      (year === today.getFullYear() && month > today.getMonth())
    )
      return null;

    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const monthData = yearsData[year]?.[month] || {};
    const firstDay = new Date(year, month, 1).getDay();
    const isCurrentMonth =
      year === today.getFullYear() && month === today.getMonth();

    return (
      <div className="month-calendar" key={`${year}-${month}`}>
        <h3>
          {monthNames[month]} {year}
        </h3>

        <div className="day-names">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>

        <div className="month-grid">
          {Array(firstDay)
            .fill(null)
            .map((_, i) => (
              <div key={`empty-${i}`} className="empty-day" />
            ))}

          {Object.entries(monthData).map(([day, activityLevel]) => {
            const isToday =
              isCurrentMonth && parseInt(day, 10) === today.getDate();
            return (
              <div
                key={day}
                className={`calendar-day ${getDayColor(activityLevel)} ${isToday ? 'today' : ''}`}
                title={
                  activityLevel === null
                    ? 'Future day'
                    : activityLevel === 0
                      ? 'No activity'
                      : `${activityLevel} contribution${activityLevel > 1 ? 's' : ''}`
                }
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const StreakCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const generateStreakData = () => {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const streakData = {};
      for (let i = 1; i <= daysInMonth; i++) {
        streakData[i] = Math.random() > 0.3;
      }
      return streakData;
    };

    const streakData = generateStreakData();
    const activeDays = Object.values(streakData).filter(Boolean).length;
    const streakPercentage = Math.round(
      (activeDays / Object.keys(streakData).length) * 100
    );

    return (
      <div className="streak-calendar">
        <div className="streak-header">
          <h3>Monthly Activity</h3>
          <div className="streak-stats">
            <span>{activeDays} days active</span>
            <span>{streakPercentage}% completion</span>
          </div>
        </div>

        <div className="calendar-grid">
          {Object.entries(streakData).map(([day, isActive]) => (
            <div
              key={day}
              className={`calendar-day ${isActive ? 'active' : ''}`}
              title={`Day ${day}: ${isActive ? 'Active' : 'Inactive'}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const filteredActivities =
    filter === 'all'
      ? activities
      : activities.filter((act) => act.type === filter);

  // JSX
  return (
    <div className="dashboard">
      <Header
        OpenSidebar={() => setSidebarOpen((o) => !o)}
        notifications={3}
        messages={5}
      />

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div
          className="logo"
          onClick={() => setShowStreakCalendar((s) => !s)}
          style={{ cursor: 'pointer' }}
        >
          <h1>DASHBOARD</h1>
        </div>

        <ul className="sidebar-menu">
          <li
            onClick={() => setActiveSection('profile')}
            className={activeSection === 'profile' ? 'active' : ''}
          >
            <BsPerson className="sidebar-icon" />
            <span>Profile</span>
          </li>
         
          <li
            onClick={() => setActiveSection('articles')}
            className={activeSection === 'articles' ? 'active' : ''}
          >
            <BsFileText className="sidebar-icon" />
            <span>Articles Created</span>
          </li>
        
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        {/* PROFILE */}
        {activeSection === 'profile' && (
          <div className="profile-container">
            <div className="profile-header">
              <h2>Profile Information</h2>
              {isEditing ? (
                <div className="edit-buttons">
                  <button className="save-btn" onClick={handleSave}>
                    <FiSave /> Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    <FiX /> Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  <FiEdit /> Edit Profile
                </button>
              )}
            </div>

            <div className="profile-content">
              <div className="profile-image-section">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                />
                {isEditing && (
                  <div className="image-upload">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <button
                      onClick={triggerFileInput}
                      className="upload-btn"
                    >
                      <FiUpload /> Change Photo
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-details">
                {isEditing ? (
                  <>
                    {[
                      { label: 'Name', type: 'text', name: 'name' },
                      { label: 'Email', type: 'email', name: 'email' },
                      { label: 'Location', type: 'text', name: 'location' },
                    ].map(({ label, type, name }) => (
                      <div className="form-group" key={name}>
                        <label>{label}</label>
                        <input
                          type={type}
                          name={name}
                          value={profile[name]}
                          onChange={handleInputChange}
                        />
                      </div>
                    ))}

                    
                  </>
                ) : (
                  <>
                    {[
                      ['Name', profile.name],
                      ['Email', profile.email],
                    
                      ['Location', profile.location]
                    ].map(([label, value]) => (
                      <div className="detail-item" key={label}>
                        <span className="detail-label">{label}:</span>
                        <span className="detail-value">{value}</span>
                      </div>
                    ))}

                    
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ACTIVITIES */}
        {activeSection === 'activities' && (
          <div className="activity-container">
            <div className="activity-header">
              <div className="header-left">
                <h2>Recent Activities</h2>
                {streakActive && (
                  <div className="streak-badge">
                    <FiTrendingUp className="streak-icon" />
                    <span>{streakDays} day streak</span>
                  </div>
                )}
              </div>

              <div className="activity-filters">
                {[
                  'all', 'like', 'comment', 'share',
                  'read', 'discussion', 'connection', 'achievement'
                ].map((type) => (
                  <button
                    key={type}
                    className={`filter-btn ${filter === type ? 'active' : ''}`}
                    onClick={() => setFilter(type)}
                  >
                    {getFilterLabel(type)}
                  </button>
                ))}
              </div>
            </div>

            <div className="cards">
              {filteredActivities.length ? (
                filteredActivities.map((act) => (
                  <div key={act.id} className="card">
                    <img src={act.img} alt={act.desc} />
                    <span className={`activity-badge ${getBadgeClass(act.type)}`}>
                      {act.icon}
                      <span className="badge-text">
                        {act.type.charAt(0).toUpperCase() + act.type.slice(1)}
                      </span>
                    </span>

                    <div className="card-content">
                      <h4>{act.content}</h4>
                      <p>{act.desc}</p>
                      <div className="activity-footer">
                        <small className="activity-time">
                          <FiClock className="time-icon" /> {act.time}
                        </small>
                        {act.type === 'achievement' && (
                          <span className="achievement-tag">Achievement</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-activities">
                  <p>No activities found for this filter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ARTICLES */}
        {activeSection === 'articles' && (
          <div className="articles-container">
            <h2>Articles Created ({articles.length})</h2>
            {articlesLoading && (
              <div className="loading-message">
                <p>Loading articles...</p>
              </div>
            )}
            {articlesError && (
              <div className="error-message">
                <p>{articlesError}</p>
              </div>
            )}
            {!articlesLoading && !articlesError && articles.length === 0 && (
              <div className="no-articles-message">
                <p>No articles found.</p>
              </div>
            )}
            <div className="articles-layout">
              {/* List */}
              <div className="articles-list">
                {articles.map((article) => (
                  <div
                    key={article._id || article.id}
                    className={`article-card ${selectedArticle?._id === article._id ? 'active' : ''}`}
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="article-info">
                      <h3>{article.title}</h3>
                      <div className="article-meta">
                        <span className={`status ${article.status?.toLowerCase()}`}>
                          {article.status}
                        </span>
                        <span className="date">{article.date}</span>
                      </div>
                      <div className="article-stats">
                        <span title="Views">
                          <FiEye /> {article.views}
                        </span>
                        <span title="Likes">❤ {article.likes}</span>
                        <span title="Comments">
                          <FiBarChart2 /> {article.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Detail */}
              <div className="article-detail">
                {selectedArticle ? (
                  <>
                    <div className="detail-header">
  <h3>{selectedArticle.title}</h3>
  <div className="article-actions">
    <button
      className="edit-btn"
      onClick={() => handleEditArticle(selectedArticle)}
    >
      <FiEdit /> Edit
    </button>
    <button
      className="delete-btn"
      onClick={() => handleDeleteArticle(selectedArticle._id)}
    >
      <FiTrash2 /> Delete
    </button>
  </div>
</div>

                   
                    <div className="article-meta">
                      <span className={`status ${selectedArticle.status?.toLowerCase()}`}>
                        {selectedArticle.status}
                      </span>
                      
                      <div className="article-tags">
                        {(selectedArticle.tags || []).map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="article-content">
                      <p>{selectedArticle.content}</p>
                    </div>
                    
                  </>
                ) : (
                  <div className="no-article-selected">
                    <p>Select an article to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* STREAK OVERLAY */}
      {showStreakCalendar && (
        <div
          className="streak-calendar-overlay"
          onClick={() => setShowStreakCalendar(false)}
        >
          <div
            className="streak-calendar-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="streak-calendar">
              <div className="streak-header">
                <BsCalendar3 className="calendar-icon" />
                <h2>Your Activity</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowStreakCalendar(false)}
                >
                  ×
                </button>
              </div>
              {/* Month navigation */}
              <div className="calendar-navigation">
                <button onClick={() => navigateMonth('prev')}>
                  <BsChevronLeft />
                </button>
                <h3>
                  {currentDate.toLocaleString('default', { month: 'long' })}{' '}
                  {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  disabled={
                    currentDate.getFullYear() >= new Date().getFullYear() &&
                    currentDate.getMonth() >= new Date().getMonth()
                  }
                >
                  <BsChevronRight />
                </button>
              </div>
              {/* Calendars */}
              <div className="months-container">
                {renderMonthCalendar(
                  currentDate.getFullYear(),
                  currentDate.getMonth()
                )}
                {currentDate.getMonth() < new Date().getMonth() &&
                  renderMonthCalendar(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1
                  )}
              </div>
              {/* Legend */}
              <div className="streak-legend">
                {[
                  ['empty', 'No activity'],
                  ['level-1', '1 contribution'],
                  ['level-2', '2 contributions'],
                  ['level-3', '3 contributions'],
                  ['level-4', '4+ contributions']
                ].map(([cls, txt]) => (
                  <div className="legend-item" key={cls}>
                    <span className={`legend-color ${cls}`} />
                    <span>{txt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// HEADER
function Header({ OpenSidebar, notifications, messages }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <div className="search-container">
          <BsSearch className="icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>
      </div>
      <div className="header-right">
        <div className="icon-container">
          <BsFillBellFill className="icon" />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </div>
        <div className="icon-container">
          <BsFillEnvelopeFill className="icon" />
          {messages > 0 && (
            <span className="notification-badge">{messages}</span>
          )}
        </div>
        <BsPersonCircle className="icon profile-icon" />
      </div>
    </header>
  );
}

export default Dashboard;