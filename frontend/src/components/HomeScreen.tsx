import Navbar from "./Navbar.js";

export default function HomeScreen() {
  return (
    <div className="home-screen" style={{ overflowX: "hidden" }}>
      <div style={{ paddingTop:"0px",maxWidth: "1690px", margin: "0 auto", padding: "0 16px" }}>

        <Navbar />

        <section className="hero">
          <div className="hero-content">
            <div className="hero-card">
              <h2 className="hero-title">
                Learn more, spend less — Black Friday Sale from ₹399
              </h2>

              <p className="hero-sub">
                Sitewide savings on thousands of courses. Ends Nov 28.
              </p>

              <button className="hero-cta">Save now</button>
            </div>
          </div>
        </section>

        <div className="home-inner">

          <h2 className="section-title">
            Learn from 350+ top universities and companies
          </h2>

          

          <div className="features">
            <h2 className="features-title">Invest in your career</h2>

            <div className="features-grid">

              <div className="feature">
                <div className="feature-icon">🎯</div>
                <div>
                  <h3 style={{ margin: 0 }}>Explore new skills</h3>
                  <p style={{ marginTop: "8px" }}>
                    Access 10,000+ courses in AI, business, technology, and more.
                  </p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">📄⭐</div>
                <div>
                  <h3 style={{ margin: 0 }}>Earn valuable credentials</h3>
                  <p style={{ marginTop: "8px" }}>
                    Get certificates for every course you finish at no extra cost.
                  </p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">⭐</div>
                <div>
                  <h3 style={{ margin: 0 }}>Learn from the best</h3>
                  <p style={{ marginTop: "8px" }}>
                    Take expert-led courses and grow with AI-powered guidance.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
