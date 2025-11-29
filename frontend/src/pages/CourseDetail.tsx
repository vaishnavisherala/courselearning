import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer.js";
import Navbar from "../components/Navbar.js";
import { useCart } from "../context/CartContext.js";


export default function CourseDetail() {
  const { addToCart, buyNow } = useCart();

  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/courses/" + slug);
        if (mounted) setCourse(res.data);
      } catch (err) {
        console.error("Failed loading course", err);
      } finally {
        mounted && setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [slug]);


  return (
    <div style={{ background: "#f7f7fb", minHeight: "100vh" }}>
      <Navbar />

      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#6b7280",
            fontSize: "18px",
          }}
        >
          Loading course…
        </div>
      )}

      {course && (
        <>
          <header
            style={{
              background: "linear-gradient(to right, #4c1d95, #7c3aed)",
              padding: "40px 20px",
              color: "white",
            }}
          >
            <div
              style={{
                maxWidth: "1100px",
                margin: "0 auto",
                display: "flex",
                gap: "28px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
            
              <div style={{ flex: 1, minWidth: "280px" }}>
                <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>
                  {course.title}
                </h1>

                <div style={{ marginTop: "8px", fontSize: "16px" }}>
                  By{" "}
                  <strong>
                    {course.instructorName || "Instructor"}
                  </strong>
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "15px",
                    opacity: 0.9,
                  }}
                >
                  <span>⭐ 4.6</span>
                  <span>•</span>
                  <span>{course.lessons?.length || 0} lessons</span>
                  <span>•</span>
                  <span>Updated Recently</span>
                </div>

                <p
                  style={{
                    marginTop: "14px",
                    maxWidth: "600px",
                    opacity: 0.95,
                  }}
                >
                  {course.shortDesc || course.description}
                </p>
              </div>

             
              <div style={{ width: "300px" }}>
                
              </div>
            </div>
          </header>

          
          <main
            style={{
              maxWidth: "1100px",
              margin: "30px auto",
              padding: "0 16px",
              display: "flex",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >
          
            <section style={{ flex: 1, minWidth: "300px" }}>
              
              <div
                style={{
                  background: "white",
                  padding: "16px",
                  borderRadius: "10px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                }}
              >
                {course.lessons?.length > 0 &&
                course.lessons[0].videoUrl ? (
                  <VideoPlayer src={course.lessons[0].videoUrl} />
                ) : (
                  <div
                    style={{
                      padding: "50px",
                      textAlign: "center",
                      color: "#666",
                      background: "#f3f4f6",
                      borderRadius: "8px",
                    }}
                  >
                    No preview available
                  </div>
                )}
              </div>

              <section style={{ marginTop: "26px" }}>
                <h2 style={{ marginBottom: "10px", fontSize: "22px" }}>
                  What you'll learn
                </h2>
                <p style={{ color: "#444", lineHeight: "1.6" }}>
                  {course.description}
                </p>
              </section>

              <section style={{ marginTop: "26px" }}>
                <h2 style={{ fontSize: "22px", marginBottom: "12px" }}>
                  Curriculum
                </h2>

                <div
                  style={{
                    background: "white",
                    padding: "16px",
                    borderRadius: "10px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {course.lessons?.map((l, i) => (
                    <div
                      key={l.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          width: "30px",
                          textAlign: "center",
                        }}
                      >
                        {i + 1}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{l.title}</div>
                        <div style={{ fontSize: "13px", color: "#666" }}>
                          {l.order ? `Order ${l.order}` : ""}
                        </div>
                      </div>

                      <div style={{ width: "30px", textAlign: "center" }}>
                        {l.videoUrl ? "▶" : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </section>

            <aside
              style={{
                width: "320px",
                minWidth: "260px",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
                }}
              >
               

                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    marginBottom: "14px",
                  }}
                >
                  {course.priceCents && course.priceCents > 0
                    ? `₹${(course.priceCents / 100).toFixed(0)}`
                    : "Free"}
                </div>

                <button
  onClick={() => buyNow(course)}
  style={{
    width: "100%",
    padding: "12px",
    background: "#7c3aed",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "10px",
  }}
>
  Buy now
</button>

<button
  onClick={() => addToCart(course)}
  style={{
    width: "100%",
    padding: "12px",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "16px",
  }}
>
  Add to cart
</button>

                <ul style={{ paddingLeft: "20px", color: "#444" }}>
                  <li>Full lifetime access</li>
                  <li>Certificate of completion</li>
                  <li>30-day money-back guarantee</li>
                </ul>
              </div>
            </aside>
          </main>
        </>
      )}
    </div>
  );
}
