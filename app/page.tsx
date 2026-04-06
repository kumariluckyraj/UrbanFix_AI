"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import AllIssues from "@/components/Allissues";
import Navbar from "@/components/navbar";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x060a12, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 30;

    const gridCount = 80;
    const spacing = 2.5;
    const positions: number[] = [];
    const colors: number[] = [];
    const originalY: number[] = [];

    for (let ix = 0; ix < gridCount; ix++) {
      for (let iz = 0; iz < gridCount; iz++) {
        const x = (ix - gridCount / 2) * spacing;
        const z = (iz - gridCount / 2) * spacing;
        const y = (Math.random() - 0.5) * 1.5;
        positions.push(x, y, z);
        originalY.push(y);
        colors.push(0.1 + Math.random() * 0.15, 0.3 + Math.random() * 0.3, 0.7 + Math.random() * 0.3);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const lineMat = new THREE.LineBasicMaterial({ color: 0x1a3a6e, transparent: true, opacity: 0.25 });
    for (let i = 0; i < 30; i++) {
      const lGeo = new THREE.BufferGeometry();
      const axis = Math.random() > 0.5;
      const offset = (Math.random() - 0.5) * gridCount * spacing;
      const half = (gridCount / 2) * spacing;
      const pts = axis
        ? [new THREE.Vector3(-half, 0, offset), new THREE.Vector3(half, 0, offset)]
        : [new THREE.Vector3(offset, 0, -half), new THREE.Vector3(offset, 0, half)];
      lGeo.setFromPoints(pts);
      scene.add(new THREE.Line(lGeo, lineMat));
    }

    for (let i = 0; i < 60; i++) {
      const w = 0.4 + Math.random() * 1.2;
      const h = 0.5 + Math.random() * 6;
      const d = 0.4 + Math.random() * 1.2;
      const bGeo = new THREE.BoxGeometry(w, h, d);
      const edges = new THREE.EdgesGeometry(bGeo);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.7, 0.35 + Math.random() * 0.25),
        transparent: true,
        opacity: 0.3 + Math.random() * 0.4,
      });
      const mesh = new THREE.LineSegments(edges, mat);
      mesh.position.set(
        (Math.random() - 0.5) * gridCount * spacing * 0.7,
        h / 2 - 1,
        (Math.random() - 0.5) * gridCount * spacing * 0.7
      );
      scene.add(mesh);
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouse);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let frame = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;

      const posArr = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < gridCount * gridCount; i++) {
        const ix = i % gridCount;
        const iz = Math.floor(i / gridCount);
        const wave = Math.sin((frame * 0.015) + ix * 0.15 + iz * 0.15) * 0.4;
        posArr[i * 3 + 1] = originalY[i] + wave;
      }
      geometry.attributes.position.needsUpdate = true;

      camera.position.x += (mouseRef.current.x * 8 - camera.position.x) * 0.03;
      camera.position.y += (mouseRef.current.y * 5 + 2 - camera.position.y) * 0.03;
      camera.lookAt(0, -2, 0);

      points.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Syne', sans-serif", background: "#060a12", color: "#e8eaf0", minHeight: "100vh", overflowX: "hidden" }}>

      {/* THREE.JS CANVAS */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", inset: 0, zIndex: 0,
          width: "100vw", height: "100vh", pointerEvents: "none",
        }}
      />

      {/* VIGNETTE */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 25%, rgba(6,10,18,0.88) 100%)",
      }} />

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section style={{
        position: "relative", zIndex: 10,
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "6rem 2rem 4rem",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "0.35rem 0.9rem", borderRadius: 100,
          background: "rgba(30,77,183,0.18)",
          border: "1px solid rgba(59,130,246,0.35)",
          fontSize: "0.75rem", color: "#60a5fa", marginBottom: "2rem",
          letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: 500,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", display: "inline-block", animation: "pulse 2s infinite" }} />
          AI-powered civic reporting
        </div>

        <h1 style={{
          fontFamily: "Syne, sans-serif", fontWeight: 800,
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          lineHeight: 1.0, letterSpacing: "-0.04em",
          marginBottom: "1.5rem",
          background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #3b82f6 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Fix Your<br />City, Now.
        </h1>

        <p style={{
          maxWidth: 540, margin: "0 auto 2.5rem",
          color: "rgba(203,213,225,0.65)", fontSize: "1.1rem", lineHeight: 1.7, fontWeight: 300,
        }}>
          Report broken infrastructure, detect duplicates, and auto-route civic issues to the right department — powered by AI.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/submit" className="btn-primary">Report an Issue →</Link>
          <Link href="#how" className="btn-ghost">See how it works</Link>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "1.25rem", marginTop: "4rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[["12,400+", "Issues Reported"], ["94%", "Resolution Rate"], ["2.1 days", "Avg. Fix Time"]].map(([val, label]) => (
            <div key={label} className="stat-item">
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.9rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{val}</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(148,163,184,0.65)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ position: "relative", zIndex: 10, padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.72rem", color: "#60a5fa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem", fontWeight: 500 }}>The Process</p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", color: "#fff" }}>
              From Report to Resolved
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {[
              { num: "01", title: "Snap & Submit", desc: "Upload a photo with your location. Takes under 30 seconds.", accent: "#3b82f6", glow: "rgba(59,130,246,0.22)" },
              { num: "02", title: "AI Analysis", desc: "Duplicate detection and severity classification happen instantly.", accent: "#8b5cf6", glow: "rgba(139,92,246,0.18)" },
              { num: "03", title: "Auto-Route", desc: "Sent directly to the correct municipal department.", accent: "#06b6d4", glow: "rgba(6,182,212,0.18)" },
              { num: "04", title: "Track Live", desc: "Follow your issue from filed to fixed in real time.", accent: "#10b981", glow: "rgba(16,185,129,0.18)" },
            ].map((s) => (
              <div
                key={s.num}
                className="step-card"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${s.glow}`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = s.accent + "66";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.3)";
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, width: 100, height: 100,
                  background: `radial-gradient(circle at top left, ${s.accent}1a, transparent 70%)`,
                  borderRadius: "18px 0 0 0",
                  pointerEvents: "none",
                }} />
                <div style={{
                  fontFamily: "Syne, sans-serif", fontSize: "2.8rem", fontWeight: 800,
                  color: s.accent, opacity: 0.35, lineHeight: 1, marginBottom: "1rem",
                  letterSpacing: "-0.04em",
                }}>{s.num}</div>
                <h3 style={{
                  fontFamily: "Syne, sans-serif", fontSize: "1.08rem", fontWeight: 700,
                  color: "#f1f5f9", marginBottom: "0.6rem",
                }}>{s.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(148,163,184,0.85)", lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{
                  position: "absolute", bottom: 0, left: "1.75rem", right: "1.75rem", height: 2,
                  background: `linear-gradient(90deg, ${s.accent}66, transparent)`,
                  borderRadius: 1,
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE ISSUES FEED */}
      <section style={{ position: "relative", zIndex: 10, padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AllIssues />
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        position: "relative", zIndex: 10, padding: "7rem 2rem",
        background: "linear-gradient(135deg, rgba(30,77,183,0.18) 0%, rgba(6,10,18,0.96) 100%)",
        borderTop: "1px solid rgba(30,77,183,0.25)", borderBottom: "1px solid rgba(30,77,183,0.25)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 300,
          background: "radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em",
            color: "#fff", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            Your city needs<br />
            <span style={{ color: "#3b82f6" }}>your voice.</span>
          </h2>
          <p style={{ color: "rgba(148,163,184,0.75)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Every report helps build faster, safer, cleaner cities. Join thousands of citizens already making a difference.
          </p>
          <Link href="/submit" className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: 14 }}>
            Report an Issue Now →
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ position: "relative", zIndex: 10, padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.72rem", color: "#60a5fa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem", fontWeight: 500 }}>Community</p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.04em", color: "#fff" }}>
              Impact Stories
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { name: "Ravi K.", city: "Bengaluru", text: "A broken streetlight I reported was fixed in just 2 days. Never had that happen before.", initials: "RK", accent: "#3b82f6" },
              { name: "Ananya S.", city: "Kolkata", text: "Pothole complaints now actually reach the right department. The AI routing is genuinely smart.", initials: "AS", accent: "#8b5cf6" },
              { name: "Mohit D.", city: "Delhi", text: "UrbanFix makes civic reporting fast, transparent, and actually effective.", initials: "MD", accent: "#06b6d4" },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <p style={{
                  color: "rgba(203,213,225,0.88)", fontSize: "0.92rem", lineHeight: 1.8,
                  marginBottom: "1.5rem", fontStyle: "italic", fontWeight: 300,
                }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.accent}88, ${t.accent}22)`,
                    border: `1px solid ${t.accent}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.7rem", fontWeight: 700, color: "#fff",
                    fontFamily: "Syne, sans-serif", letterSpacing: "0.03em",
                    flexShrink: 0,
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#e2e8f0" }}>{t.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(148,163,184,0.55)", marginTop: 2 }}>{t.city}</div>
                  </div>
                </div>
                <div style={{
                  position: "absolute", bottom: 0, left: "2rem", right: "2rem", height: 1,
                  background: `linear-gradient(90deg, ${t.accent}44, transparent)`,
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        position: "relative", zIndex: 10,
        padding: "2.5rem 3rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "1rem",
        background: "rgba(3, 6, 12, 0.97)",
      }}>
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem" }}>
          Urban<span style={{ color: "#3b82f6" }}>Fix</span>
        </span>
        <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.38)" }}>
          © 2025 UrbanFix AI · Built for smarter cities
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.35)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(148,163,184,0.35)")}
            >{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}