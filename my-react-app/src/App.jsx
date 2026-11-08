import { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://dev.to/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.description &&
        post.description.toLowerCase().includes(search.toLowerCase())),
  );

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <>
      <section className="hero">
        <h1>
          Stay Ahead Of The Curve: Stay Informed With Our Blog For The Latest
          Industry Insights
        </h1>
        <p>
          Insights that inspire success: uncover a wealth of knowledge by
          staying updated
        </p>
      </section>

      <h2 className="section-title">
        Stay Updated with the Latest trends in Tobams Group
      </h2>

      <section className="controls">
        <div className="controls-container">
          <div className="search-wrapper">
            <img src="/searchh.svg" alt="" className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select>
            <option>All posts</option>
          </select>
        </div>
      </section>

      <div className="grid">
        {filtered.map((post) => (
          <div key={post.id} className="card">
            {post.cover_image && (
              <img src={post.cover_image} alt={post.title} />
            )}
            <div className="card-body">
              <span className="tag">{post.tag_list?.[0] || "General"}</span>
              <h3>{post.title}</h3>
              <p>{post.description?.slice(0, 110)}...</p>
              <div className="meta">
                <span>
                  {new Date(post.published_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>{post.reading_time_minutes || 3} mins read</span>
              </div>
              <Link to={`/blog/${post.id}`} className="view">
                View Post →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", margin: "30px 0 50px" }}>
        <button
          style={{
            width: "136px",
            height: "48px",
            background: "white",
            border: "1px solid #571244",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#571244",
            cursor: "pointer",
          }}
        >
          Load More
        </button>
      </div>

      {/* Newsletter Section */}
      <div
        style={{
          width: "1312px",
          maxWidth: "100%",
          height: "281px",
          margin: "40px auto",
          background: "#f3f0f5",
          padding: "64px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxSizing: "border-box",
        }}
      >
        <div>
          <h2
            style={{ fontSize: "28px", fontWeight: 600, marginBottom: "8px" }}
          >
            Sign Up for Our Newsletter
          </h2>
          <p style={{ color: "#555", marginBottom: "16px" }}>
            Subscribe to receive our latest company updates
          </p>
          <div style={{ display: "flex", gap: "12px", maxWidth: "700px" }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                height: "48px",
                padding: "0 16px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px",
                background: "white",
              }}
            />
            <button
              style={{
                background: "#571244",
                color: "white",
                border: "none",
                padding: "0 28px",
                height: "48px",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dev.to/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading post...</div>;
  if (!post) return <div className="loading">Post not found</div>;

  return (
    <div style={{ maxWidth: 760, margin: "40px auto", padding: "0 20px" }}>
      <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>
        ← Back to Blog
      </Link>
      <h1 style={{ fontSize: 34, margin: "16px 0" }}>{post.title}</h1>
      {post.cover_image && (
        <img
          src={post.cover_image}
          alt=""
          style={{ width: "100%", borderRadius: 8, margin: "20px 0" }}
        />
      )}
      <div
        style={{ fontSize: 18, lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: post.body_html }}
      />
    </div>
  );
}

export default function App() {
  return (
    <>
      <header className="header">
        <div className="top-bar">
          <Link to="/" className="logo">
            <img
              src="/iconn.svg"
              alt="Tobams Group"
              style={{ height: "36px" }}
            />
          </Link>

          <img src="/hamburger.svg" alt="Menu" className="hamburger" />

          <div
            className="top-actions"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <button
              className="btn-account"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <img
                src="/framess.svg"
                alt=""
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              Account
              <img
                src="/iconamoon.svg"
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </button>
            <button className="btn-assessment">Take Assessment</button>
          </div>
        </div>
        <div className="nav-bar">
          <nav className="nav">
            <a href="#">
              About{" "}
              <img
                src="/purple.svg"
                alt=""
                style={{
                  width: "12px",
                  height: "12px",
                  marginLeft: "4px",
                  verticalAlign: "middle",
                }}
              />
            </a>
            <a href="#">
              What We Do{" "}
              <img
                src="/purple.svg"
                alt=""
                style={{
                  width: "12px",
                  height: "12px",
                  marginLeft: "4px",
                  verticalAlign: "middle",
                }}
              />
            </a>
            <a href="#">
              Jobs{" "}
              <img
                src="/purple.svg"
                alt=""
                style={{
                  width: "12px",
                  height: "12px",
                  marginLeft: "4px",
                  verticalAlign: "middle",
                }}
              />
            </a>
            <a href="#">Projects</a>
            <a href="#">TG Academy</a>
            <a href="#">Strategic Partnership</a>
            <a href="#">Pricing</a>
            <a href="#">Book a Consultation</a>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          background: "#11040E",
          color: "white",
          padding: "40px 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "1312px",
            maxWidth: "100%",
            margin: "0 auto",
            padding: "20px 0",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "30px",
              marginBottom: "40px",
            }}
          >
            <div>
              <img
                src="/iconn.svg"
                alt="Tobams Group"
                style={{ height: "40px", marginBottom: "16px" }}
              />
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#ccc" }}>
                Tobams Group is an innovative consultancy firm reshaping the
                future of tech talent development in Africa.
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <img
                  src="/framess.svg"
                  alt=""
                  style={{ width: "24px", height: "24px" }}
                />
                <img
                  src="/framess.svg"
                  alt=""
                  style={{ width: "24px", height: "24px" }}
                />
                <img
                  src="/framess.svg"
                  alt=""
                  style={{ width: "24px", height: "24px" }}
                />
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: "16px" }}>What We Do</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  Sustainability Services
                </a>
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  Tech Talent Solutions
                </a>
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  Training and Development
                </a>
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  IT Consulting Services
                </a>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: "16px" }}>Company</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  About
                </a>
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  Jobs
                </a>
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  Projects
                </a>
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  Contact Us
                </a>
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  Blog
                </a>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: "16px" }}>Solution</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  Tobams Group Academy
                </a>
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  Pricing
                </a>
                <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                  Book a Consultation
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "1312px",
              maxWidth: "100%",
              margin: "0 auto 30px",
              padding: "20px",
              background: "#1a0a14",
              borderRadius: "8px",
              boxSizing: "border-box",
              display: "flex",
              gap: "40px",
              color: "white",
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ marginBottom: "12px" }}>Registered Offices</h4>
              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  fontSize: "14px",
                  color: "#ccc",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <strong style={{ color: "#ef4353" }}>United Kingdom</strong>
                  <p>07491196 (Registered by Company House)</p>
                  <p>
                    Vibe Complex, 213 North Street, Romford, Essex, United
                    Kingdom, RM1 4QA
                  </p>
                </div>
                <div>
                  <strong style={{ color: "#ef4353" }}>Nigeria</strong>
                  <p>
                    RC 1049723 (Registered by the Corporate Affairs Commission)
                  </p>
                  <p>4 Muaz Close, Abakaliki, Ebonyi</p>
                </div>
              </div>
            </div>

            <div style={{ width: "280px", minWidth: "200px" }}>
              <h4 style={{ marginBottom: "12px" }}>Contact Information</h4>
              <div style={{ fontSize: "14px", color: "#ccc" }}>
                <p>📧 theteam@tobamsgroup.com</p>
                <p>📞 +447886600748</p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "20px",
              borderTop: "1px solid #333",
              fontSize: "14px",
              color: "#999",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span>Copyright © Tobams Group, 2024. All rights reserved.</span>
            <div style={{ display: "flex", gap: "20px" }}>
              <a href="#" style={{ color: "#999", textDecoration: "none" }}>
                Terms and Conditions
              </a>
              <a href="#" style={{ color: "#999", textDecoration: "none" }}>
                Privacy Policy
              </a>
              <a href="#" style={{ color: "#999", textDecoration: "none" }}>
                Cookies Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
