"use client";

import { useEffect, useState } from "react";

export default function AllIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      const res = await fetch("/api/get-reports");
      const data = await res.json();
      const valid = data.reports.filter((r) => r.resultData);
      setIssues(valid);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbsUp = async (id) => {
    try {
      const votedIssues = JSON.parse(localStorage.getItem("votedIssues")) || [];
      if (votedIssues.includes(id)) {
        alert("You already supported this issue 👍");
        return;
      }
      await fetch("/api/thumbs-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueId: id }),
      });
      localStorage.setItem("votedIssues", JSON.stringify([...votedIssues, id]));
      fetchIssues();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssues();
    const interval = setInterval(fetchIssues, 5000);
    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (level) => {
    if (level === "CRITICAL") return { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)", text: "#f87171" };
    if (level === "MEDIUM") return { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)", text: "#fbbf24" };
    return { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.35)", text: "#34d399" };
  };

  const getStatusColor = (status) => {
    if (!status) return { text: "rgba(232,234,240,0.4)" };
    const s = status.toLowerCase();
    if (s.includes("resolv")) return { text: "#34d399" };
    if (s.includes("progress") || s.includes("assign")) return { text: "#60a5fa" };
    return { text: "#fbbf24" };
  };

  if (loading) return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "4rem 2rem", color: "rgba(232,234,240,0.4)", fontSize: "0.9rem",
      gap: "0.6rem",
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: "50%", background: "#3b82f6",
        display: "inline-block", animation: "blink 1.2s infinite",
      }} />
      Loading issues...
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>
    </div>
  );

  if (issues.length === 0) return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      padding: "4rem 2rem", textAlign: "center",
      color: "rgba(232,234,240,0.35)", fontSize: "0.9rem",
    }}>
      No issues reported yet.
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        .issue-card { transition: all 0.25s; }
        .issue-card:hover { background: rgba(255,255,255,0.055) !important; transform: translateY(-2px); }
        .support-btn { transition: all 0.2s; }
        .support-btn:hover { background: rgba(59,130,246,0.25) !important; border-color: rgba(59,130,246,0.6) !important; }
        .support-btn:active { transform: scale(0.96); }
      `}</style>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        marginBottom: "2rem", flexWrap: "wrap", gap: "1rem",
      }}>
        <div>
          <p style={{
            fontSize: "0.72rem", color: "#60a5fa",
            letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: "0.4rem", fontWeight: 500,
          }}>
            Live Feed
          </p>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.04em",
            color: "#fff", margin: 0,
          }}>
            Public Issues
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%", background: "#3b82f6",
            display: "inline-block", animation: "pulse 2s infinite",
          }} />
          <span style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.4)" }}>
            {issues.length} active report{issues.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}>
        {issues.map((r) => {
          const data = r.resultData;
          const urgencyPercent = Math.min(((r.thumbsUp || 0) / 50) * 100, 100);
          const priority = getPriorityColor(data.priority?.level);
          const statusStyle = getStatusColor(data.action?.status);

          return (
            <div
              key={r._id}
              className="issue-card"
              style={{
  background: "rgba(15, 23, 42, 0.72)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  backdropFilter: "blur(10px)",
}}
            >
              {/* Issue image */}
              {r.image && (
                <div style={{ width: "100%", height: 240, overflow: "hidden" }}>
                  <img
                    src={r.image}
                    alt="issue"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              )}

              <div style={{ padding: "1.1rem 1.25rem" }}>

                {/* Top row: priority badge + ticket */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{
                    fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.06em",
                    textTransform: "uppercase", padding: "0.22rem 0.65rem", borderRadius: 100,
                    background: priority.bg, border: `1px solid ${priority.border}`,
                    color: priority.text,
                  }}>
                    {data.priority?.level || "—"}
                  </span>
                  <span style={{ fontSize: "0.67rem", color: "rgba(232,234,240,0.25)", fontFamily: "monospace" }}>
                    #{data.action?.ticketId?.slice(-6) || "—"}
                  </span>
                </div>

                {/* Issue title */}
                <h3 style={{
                  fontFamily: "Syne, sans-serif", fontWeight: 700,
                  fontSize: "0.95rem", color: "#e8eaf0",
                  margin: "0 0 0.3rem",
                }}>
                  {r.issue}
                </h3>

                {/* Location */}
                <p style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.4)", margin: "0 0 0.85rem" }}>
                  📍 {r.location}
                </p>

                {/* Department + Status row */}
                <div style={{
                  display: "flex", gap: "0.5rem", flexWrap: "wrap",
                  marginBottom: "1rem",
                }}>
                  <span style={{
                    fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: 100,
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(232,234,240,0.45)",
                  }}>
                    {data.action?.assignedDepartment || "Unassigned"}
                  </span>
                  <span style={{
                    fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: 100,
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: statusStyle.text, fontWeight: 500,
                  }}>
                    {data.action?.status || "Pending"}
                  </span>
                </div>

                {/* Urgency bar */}
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginBottom: "0.4rem",
                  }}>
                    <span style={{ fontSize: "0.7rem", color: "rgba(232,234,240,0.4)" }}>
                      Community urgency
                    </span>
                    <span style={{ fontSize: "0.7rem", color: urgencyPercent > 60 ? "#f87171" : "rgba(232,234,240,0.5)", fontWeight: 500 }}>
                      {Math.round(urgencyPercent)}%
                    </span>
                  </div>
                  <div style={{
                    width: "100%", height: 4, borderRadius: 2,
                    background: "rgba(255,255,255,0.07)",
                  }}>
                    <div style={{
                      height: "100%", borderRadius: 2,
                      width: `${urgencyPercent}%`,
                      background: urgencyPercent > 70
                        ? "linear-gradient(90deg, #f97316, #ef4444)"
                        : urgencyPercent > 35
                        ? "linear-gradient(90deg, #fbbf24, #f97316)"
                        : "linear-gradient(90deg, #3b82f6, #60a5fa)",
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                </div>

                {/* Support button */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <button
                    onClick={() => handleThumbsUp(r._id)}
                    className="support-btn"
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "0.4rem 1rem", borderRadius: 8,
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.3)",
                      color: "#93c5fd", fontSize: "0.78rem", fontWeight: 500,
                      cursor: "pointer", fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    <span style={{ fontSize: 14 }}>👍</span>
                    Support
                  </button>
                  <span style={{ fontSize: "0.72rem", color: "rgba(232,234,240,0.35)" }}>
                    {r.thumbsUp || 0} {r.thumbsUp === 1 ? "person" : "people"} supported
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}