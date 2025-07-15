import React, { useState } from 'react';
import './Feedback.css';

export const FeedbackComponent = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [feedbacks, setFeedbacks] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setFeedbacks([form, ...feedbacks]);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row gy-4">
          {/* Feedback Form */}
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3">Submit Feedback</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Your feedback..."
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Feedback Cards */}
          <div className="col-md-7 col-lg-8">
            <h3 className="text-center text-white mb-4">What Our Users Say!</h3>
            <div className="row">
              {feedbacks.map((item, index) => (
                <div className="col-md-6 mb-4" key={index}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <h6 style={{ color: "white" }} className="card-subtitle mb-2">
  {item.email}
</h6>

                      <p className="card-text">{item.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              {feedbacks.length === 0 && (
               <div className="text-center mt-5 w-100" style={{ color: "white" }}>
  No feedback submitted yet.
</div>

              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
