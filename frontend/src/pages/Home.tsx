import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.js';


const DEFAULT_COVERS = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=60&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=60&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=60&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=60&auto=format&fit=crop'
];

function formatPrice(priceCents: number | undefined){
  if (!priceCents) return '₹399';
  return '₹' + (priceCents / 100).toFixed(0);
}

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/courses');
        if (mounted) setCourses(res.data || []);
      } catch (err: any) {
        console.error('Failed to load courses:', err);
        if (mounted) setError(err?.response?.data?.message || err.message || 'Failed to load courses');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      <main className="container">
        <section>
        
        </section>

        {loading && <div className="loading">Loading courses…</div>}

        {error && <div className="error">{error}</div>}

        {!loading && !error && courses.length === 0 && (
          <div className="empty">No courses available — check backend or API routes.</div>
        )}

        <section className="courses-section">
          <div className="course-grid">
            {courses.map((c, idx) => (
              <article key={c.id} className="course-card">
                <div className="course-image">
                  <img
                    src={c.coverImage || DEFAULT_COVERS[idx % DEFAULT_COVERS.length] || `https://via.placeholder.com/360x200?text=${encodeURIComponent(c.title || 'Course')}`}
                    alt={c.title}
                    onError={(e: any) => { e.currentTarget.src = `https://via.placeholder.com/360x200?text=${encodeURIComponent(c.title || 'Course')}`; }}
                  />
                </div>

                <div className="course-body">
                  <h3 className="course-title">
                    <Link to={'/courses/' + c.slug} className="course-link">{c.title}</Link>
                  </h3>
                  <p className="course-desc">{c.shortDesc}</p>

                  <div className="course-meta">
                    <div className="instructor">{c.instructorName || '—'}</div>
                    <div className="badges">
                      {(!c.priceCents || c.priceCents === 0) ? (
                        <span className="badge badge-bestseller">Bestseller</span>
                      ) : (
                        <span className="badge badge-hot">Hot & New</span>
                      )}
                    </div>
                  </div>

                  <div className="course-footer">
                    <div className="price">{formatPrice(c.priceCents)}</div>
                    <div className="strike">{c.priceCents ? '₹3,019' : ''}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}













