"use client";

import { useEffect, useState } from "react";

const STATUS_OPTIONS = ["ASSIGNED", "IN_PROGRESS", "RESOLVED", "CLOSED"];

const STATUS_META = {
  ASSIGNED:    { color: "#3b82f6", bg: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.35)" },
  IN_PROGRESS: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)",  border: "rgba(245,158,11,0.35)" },
  RESOLVED:    { color: "#10b981", bg: "rgba(16,185,129,0.15)",  border: "rgba(16,185,129,0.35)" },
  CLOSED:      { color: "#6b7280", bg: "rgba(107,114,128,0.15)", border: "rgba(107,114,128,0.35)" },
};

const PRIORITY_META = {
  CRITICAL: { color: "#ef4444", bg: "rgba(239,68,68,0.15)",   border: "rgba(239,68,68,0.4)",   label: "CRITICAL" },
  HIGH:     { color: "#f97316", bg: "rgba(249,115,22,0.15)",  border: "rgba(249,115,22,0.4)",  label: "HIGH"     },
  MEDIUM:   { color: "#f59e0b", bg: "rgba(245,158,11,0.15)",  border: "rgba(245,158,11,0.4)",  label: "MEDIUM"   },
  LOW:      { color: "#10b981", bg: "rgba(16,185,129,0.15)",  border: "rgba(16,185,129,0.4)",  label: "LOW"      },
};

export default function AdminData() {
  const [reports, setReports]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState({});
const [votedIssues, setVotedIssues] = useState([]);
  const fetchReports = async () => {
    try {
      const res  = await fetch("/api/get-reports");
      const data = await res.json();
      setReports(data.reports.filter((r) => r.resultData));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, []);

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("votedIssues")) || [];
  setVotedIssues(stored);
}, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch("/api/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

const handleThumbsUp = async (id) => {
  if (votedIssues.includes(id)) return; // prevent double vote

  try {
    await fetch("/api/thumbs-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ issueId: id }),
    });

    const updated = [...votedIssues, id];
    setVotedIssues(updated);
    localStorage.setItem("votedIssues", JSON.stringify(updated));

    fetchReports(); // refresh UI
  } catch (err) {
    console.error(err);
  }
};


  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  /* ─── Loading ─── */
  if (loading)
    return (
      <div style={styles.page}>
        <style>{css}</style>
        <div style={styles.loadWrap}>
          <div style={styles.spinner} />
          <p style={styles.loadText}>Fetching reports…</p>
        </div>
      </div>
    );

  /* ─── Empty ─── */
  if (reports.length === 0)
    return (
      <div style={styles.page}>
        <style>{css}</style>
        <div style={styles.loadWrap}>
          <p style={{ ...styles.loadText, fontSize: "1.1rem" }}>No reports found.</p>
        </div>
      </div>
    );

  /* ─── Dashboard ─── */
  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoRow}>
            <div style={styles.logoBox}>U</div>
            <span style={styles.logoText}>
              Urban<span style={{ color: "#3b82f6" }}>Fix</span>
            </span>
          </div>
          <div>
            <p style={styles.headerEyebrow}>Admin Console</p>
            <h1 style={styles.headerTitle}>Issue Dashboard</h1>
          </div>
          <div style={styles.countBadge}>
            <span style={styles.countNum}>{reports.length}</span>
            <span style={styles.countLabel}>Reports</span>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main style={styles.main}>
        <div style={styles.grid}>
          {reports.map((r, idx) => {
            const priority = r.resultData.priority?.level ?? "LOW";
            const status   = r.resultData.action?.status   ?? "ASSIGNED";
            const pm       = PRIORITY_META[priority] ?? PRIORITY_META.LOW;
            const sm       = STATUS_META[status]     ?? STATUS_META.ASSIGNED;
            const isOpen   = expanded[r._id];

            return (
              <div
                key={r._id}
                className="report-card"
                style={{
                  ...styles.card,
                  animationDelay: `${idx * 60}ms`,
                  "--accent": pm.color,
                }}
              >
                {/* Top accent line */}
                <div style={{ ...styles.cardTopBar, background: `linear-gradient(90deg, ${pm.color}, transparent)` }} />

                {/* Card header row */}
                <div style={styles.cardHead}>
                  <span style={{ ...styles.priorityBadge, color: pm.color, background: pm.bg, border: `1px solid ${pm.border}` }}>
                    {pm.label}
                  </span>
                  <span style={{ ...styles.statusBadge, color: sm.color, background: sm.bg, border: `1px solid ${sm.border}` }}>
                    {status.replace("_", " ")}
                  </span>
                </div>

                {/* Issue title */}
                <h2 style={styles.issueTitle}>{r.issue}</h2>

                {/* Meta row */}
                <div style={styles.metaRow}>
                  <div style={styles.metaItem}>
                    <span style={styles.metaIcon}>📍</span>
                    <span style={styles.metaText}>{r.location}</span>
                  </div>
                  <div style={styles.metaItem}>
                    <span style={styles.metaIcon}>🏢</span>
                    <span style={styles.metaText}>{r.resultData.action?.assignedDepartment}</span>
                  </div>
                  <div style={styles.metaItem}>
                    <span style={styles.metaIcon}>⚡</span>
                    <span style={styles.metaText}>{r.resultData.decision?.urgency}</span>
                  </div>
                </div>


                {/* Divider */}
                <div style={styles.divider} />

                <div style={styles.voteRow}>
  <button
    onClick={() => handleThumbsUp(r._id)}
    disabled={votedIssues.includes(r._id)}
    style={{
      ...styles.voteBtn,
      opacity: votedIssues.includes(r._id) ? 0.5 : 1,
      cursor: votedIssues.includes(r._id) ? "not-allowed" : "pointer",
    }}
  >
    👍 {r.thumbsUp || 0}
  </button>
</div>

                {/* Ticket + Status row */}
                <div style={styles.bottomRow}>
                  <div>
                    <p style={styles.fieldLabel}>Ticket ID</p>
                    <p style={styles.ticketId}>{r.resultData.action?.ticketId}</p>
                  </div>

                  <div>
                    <p style={styles.fieldLabel}>Update Status</p>
                    <div style={{ position: "relative" }}>
                      <select
                        value={status}
                        onChange={(e) => updateStatus(r._id, e.target.value)}
                        style={{
                          ...styles.select,
                          color: sm.color,
                          borderColor: sm.border,
                          background: sm.bg,
                        }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} style={{ background: "#0d1526", color: "#e2e8f0" }}>
                            {s.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Expand toggle */}
                <button
                  onClick={() => toggleExpand(r._id)}
                  style={{ ...styles.expandBtn, color: isOpen ? "#93c5fd" : "rgba(148,163,184,0.5)" }}
                >
                  {isOpen ? "▲ Hide Details" : "▼ View Full Data"}
                </button>

                {/* Expanded JSON */}
                {isOpen && (
                  <pre style={styles.json}>
                    {JSON.stringify(r.resultData, null, 2)}
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

/* ─────────────── Styles ─────────────── */

const styles = {
  voteRow: {
  marginTop: "0.5rem",
},

voteBtn: {
  background: "rgba(59,130,246,0.15)",
  border: "1px solid rgba(59,130,246,0.35)",
  color: "#60a5fa",
  padding: "0.35rem 0.8rem",
  borderRadius: 8,
  fontSize: "0.75rem",
  fontWeight: 600,
  transition: "all 0.2s",
},
  page: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#060a12",
    color: "#e8eaf0",
    minHeight: "100vh",
  },
  loadWrap: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    height: "100vh", gap: "1rem",
  },
  spinner: {
    width: 40, height: 40,
    borderRadius: "50%",
    border: "3px solid rgba(59,130,246,0.2)",
    borderTopColor: "#3b82f6",
    animation: "spin 0.9s linear infinite",
  },
  loadText: {
    color: "rgba(148,163,184,0.6)", fontSize: "0.9rem", letterSpacing: "0.05em",
  },

  header: {
    background: "rgba(6,10,18,0.85)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    borderBottom: "1px solid rgba(30,74,183,0.22)",
    position: "sticky", top: 0, zIndex: 50,
    padding: "1.25rem 2.5rem",
  },
  headerInner: {
    maxWidth: 1200, margin: "0 auto",
    display: "flex", alignItems: "center", gap: "1.5rem",
  },
  logoRow: { display: "flex", alignItems: "center", gap: "0.5rem", marginRight: "auto" },
  logoBox: {
    width: 34, height: 34, borderRadius: 8,
    background: "linear-gradient(135deg,#1e4db7,#0ea5e9)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, fontWeight: 800, color: "#fff",
    fontFamily: "Syne, sans-serif",
  },
  logoText: { fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" },

  headerEyebrow: { fontSize: "0.65rem", color: "#60a5fa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2, fontWeight: 500 },
  headerTitle: { fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.04em", margin: 0 },

  countBadge: {
    textAlign: "center", padding: "0.5rem 1.25rem",
    background: "rgba(30,77,183,0.15)",
    border: "1px solid rgba(59,130,246,0.25)",
    borderRadius: 12, minWidth: 80,
  },
  countNum: { display: "block", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#fff", lineHeight: 1.1 },
  countLabel: { fontSize: "0.62rem", color: "rgba(148,163,184,0.55)", textTransform: "uppercase", letterSpacing: "0.1em" },

  main: { maxWidth: 1200, margin: "0 auto", padding: "2.5rem 2rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "1.5rem",
  },

  card: {
    background: "rgba(10,18,40,0.88)",
    border: "1px solid rgba(59,130,246,0.2)",
    borderRadius: 18,
    padding: "1.75rem",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    position: "relative",
    overflow: "hidden",
    display: "flex", flexDirection: "column", gap: "1rem",
    animation: "fadeUp 0.45s ease both",
    transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s",
  },
  cardTopBar: { position: "absolute", top: 0, left: 0, right: 0, height: 2 },

  cardHead: { display: "flex", gap: "0.6rem", flexWrap: "wrap" },
  priorityBadge: {
    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
    padding: "0.25rem 0.7rem", borderRadius: 6,
    textTransform: "uppercase", fontFamily: "Syne, sans-serif",
  },
  statusBadge: {
    fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em",
    padding: "0.25rem 0.7rem", borderRadius: 6,
    textTransform: "uppercase",
  },

  issueTitle: {
    fontFamily: "Syne, sans-serif", fontWeight: 700,
    fontSize: "1.05rem", color: "#f1f5f9",
    lineHeight: 1.4, margin: 0,
  },

  metaRow: { display: "flex", flexDirection: "column", gap: "0.45rem" },
  metaItem: { display: "flex", alignItems: "center", gap: "0.5rem" },
  metaIcon: { fontSize: "0.85rem", flexShrink: 0 },
  metaText: { fontSize: "0.82rem", color: "rgba(148,163,184,0.8)", lineHeight: 1.4 },

  divider: { height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 1 },

  bottomRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", gap: "1rem",
  },
  fieldLabel: { fontSize: "0.62rem", color: "rgba(148,163,184,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 },
  ticketId: { fontFamily: "monospace", fontSize: "0.78rem", color: "#60a5fa", letterSpacing: "0.05em" },

  select: {
    appearance: "none",
    padding: "0.4rem 1.8rem 0.4rem 0.75rem",
    borderRadius: 8,
    border: "1px solid",
    fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.05em",
    cursor: "pointer",
    outline: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2360a5fa'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    transition: "box-shadow 0.2s",
  },

  expandBtn: {
    background: "none", border: "none", cursor: "pointer",
    fontSize: "0.72rem", letterSpacing: "0.06em",
    textTransform: "uppercase", fontWeight: 500,
    padding: "0.2rem 0", alignSelf: "flex-start",
    transition: "color 0.2s",
  },

  json: {
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: "1rem",
    fontSize: "0.7rem",
    color: "rgba(148,163,184,0.7)",
    overflowX: "auto",
    lineHeight: 1.6,
    fontFamily: "monospace",
    maxHeight: 280,
    overflowY: "auto",
    margin: 0,
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  .report-card:hover {
    box-shadow: 0 20px 60px rgba(var(--accent-rgb, 59,130,246), 0.15);
    border-color: rgba(59,130,246,0.38) !important;
    transform: translateY(-4px);
  }
  select:focus { box-shadow: 0 0 0 2px rgba(59,130,246,0.3); }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
  ::-webkit-scrollbar-thumb { background: #1e3a6e; border-radius: 3px; }
`;