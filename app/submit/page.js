"use client";

import { useState } from "react";
import MapPicker from "../../components/MapPickerWrapper";


export default function SubmitPage() {
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [locLoading, setLocLoading] = useState(false);

  const handleAutoLocation = async () => {
    if (!navigator.geolocation) { alert("Geolocation not supported"); return; }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        const a = data.address;
        const city = a.city || a.town || a.village || a.county || "";
        const area = a.suburb || a.neighbourhood || a.hamlet || "";
        setLocation(`${area ? area + ", " : ""}${city}${a.state ? ", " + a.state : ""}`);
        setLocLoading(false);
      },
      () => { alert("Location access denied"); setLocLoading(false); }
    );
  };

  const handleConfirm = async () => {
    let imageUrl = "";
    if (image) {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }
    const res = await fetch("/api/save-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue, location, image: imageUrl, resultData: result.data }),
    });
    const data = await res.json();
    if (data.success) setConfirmed(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setConfirmed(false);
    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue, location, imageUrl: image }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  const priorityStyles = {
    CRITICAL: { bg: "rgba(239,68,68,.15)", border: "rgba(239,68,68,.3)", color: "#fca5a5" },
    MEDIUM:   { bg: "rgba(245,158,11,.15)", border: "rgba(245,158,11,.3)", color: "#fcd34d" },
    LOW:      { bg: "rgba(16,185,129,.15)", border: "rgba(16,185,129,.3)", color: "#6ee7b7" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #1e4db7; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060a12; }
        ::-webkit-scrollbar-thumb { background: #1e3a6e; border-radius: 3px; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
      `}</style>

      <div style={{ background: "#060a12", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#e8eaf0" }}>
        

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "6rem 1.5rem 3rem" }}>

          {/* BADGE */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: ".3rem .8rem", borderRadius: 100,
            background: "rgba(30,77,183,.18)", border: "1px solid rgba(59,130,246,.35)",
            fontSize: ".72rem", color: "#60a5fa", letterSpacing: ".08em",
            textTransform: "uppercase", fontWeight: 500, marginBottom: "1.25rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", animation: "pulse 2s infinite", flexShrink: 0 }} />
            Report an issue
          </div>

          {/* HEADING */}
          <h1 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(1.8rem,5vw,2.8rem)", letterSpacing: "-.04em",
            lineHeight: 1.1, marginBottom: ".5rem",
            background: "linear-gradient(135deg,#fff 0%,#93c5fd 50%,#3b82f6 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Submit a<br />Civic Report</h1>

          <p style={{ color: "rgba(203,213,225,.55)", fontSize: ".95rem", fontWeight: 300, marginBottom: "2.5rem" }}>
            Fill in the details below and our AI will analyze, classify, and route your issue automatically.
          </p>

          {/* FORM CARD */}
          <form onSubmit={handleAnalyze} style={{
            background: "rgba(10,18,40,.88)", border: "1px solid rgba(59,130,246,.22)",
            borderRadius: 20, padding: "2rem", backdropFilter: "blur(16px)",
          }}>

            {/* ISSUE */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Issue description</label>
              <textarea
                value={issue}
                onChange={e => setIssue(e.target.value)}
                placeholder="e.g. Large pothole on the main road near bus stop..."
                required
                rows={3}
                style={inputStyle}
              />
            </div>

            {/* LOCATION */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Park Street, Kolkata"
                required
                style={inputStyle}
              />

              <button
                type="button"
                onClick={handleAutoLocation}
                disabled={locLoading}
                style={{
                  display: "inline-flex", alignItems: "center", gap: ".4rem",
                  marginTop: ".6rem", padding: ".45rem .9rem", borderRadius: 8,
                  border: "1px solid rgba(59,130,246,.35)", background: "rgba(30,77,183,.1)",
                  color: "#60a5fa", fontSize: ".8rem", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", transition: "all .2s",
                }}
              >
                📍 {locLoading ? "Fetching..." : "Use current location"}
              </button>

              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: ".78rem", color: "rgba(148,163,184,.45)", marginBottom: ".6rem" }}>
                  Click on map to pick exact location
                </p>
                <MapPicker setLocation={setLocation} />
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>
                Photo evidence{" "}
                <span style={{ fontSize: ".72rem", color: "rgba(148,163,184,.35)", textTransform: "none", letterSpacing: 0 }}>
                  (optional)
                </span>
              </label>

              <label style={{
                display: "block", border: "1.5px dashed rgba(59,130,246,.25)",
                borderRadius: 12, padding: "1.75rem", textAlign: "center",
                cursor: "pointer", background: "rgba(6,10,18,.3)", transition: "all .2s",
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: ".4rem" }}>↑</div>
                <p style={{ fontSize: ".82rem", color: "rgba(148,163,184,.55)" }}>
                  Drag & drop or <span style={{ color: "#60a5fa" }}>browse to upload</span>
                </p>
                <p style={{ fontSize: ".72rem", color: "rgba(148,163,184,.3)", marginTop: ".25rem" }}>JPG, PNG up to 10MB</p>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
              </label>

              {image && (
                <img
                  src={image}
                  alt="preview"
                  style={{ width: "100%", borderRadius: 10, maxHeight: 200, objectFit: "cover", marginTop: ".75rem", border: "1px solid rgba(59,130,246,.2)" }}
                />
              )}
            </div>

            <div style={{ height: 1, background: "rgba(59,130,246,.1)", margin: "1.5rem 0" }} />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: ".9rem", borderRadius: 12,
                background: "linear-gradient(135deg,#1e4db7,#2563eb)",
                color: "#fff", fontWeight: 500, fontSize: ".95rem", border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif", opacity: loading ? .6 : 1,
                boxShadow: "0 0 40px rgba(37,99,235,.3)", transition: "all .2s",
              }}
            >
              {loading ? "Analyzing..." : "Analyze issue →"}
            </button>
          </form>

          {/* RESULT */}
          {result?.success && (
            <div style={{
              marginTop: "1.5rem",
              background: "rgba(10,18,40,.88)", border: "1px solid rgba(59,130,246,.22)",
              borderRadius: 20, padding: "2rem", backdropFilter: "blur(16px)",
            }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1.5rem" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                  background: "rgba(30,77,183,.25)", border: "1px solid rgba(59,130,246,.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem",
                }}>✦</div>
                <div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#e2e8f0" }}>
                    AI Analysis Result
                  </div>
                  <div style={{ fontSize: ".75rem", color: "rgba(148,163,184,.45)", marginTop: 2 }}>
                    Processed in under 2 seconds
                  </div>
                </div>
              </div>

              {/* Duplicate status */}
              {result.data.duplicate ? (
                <div style={{
                  padding: ".75rem 1rem", borderRadius: 10, marginBottom: "1.25rem",
                  background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)",
                  color: "#fca5a5", fontSize: ".85rem", display: "flex", gap: ".5rem",
                }}>
                  ⚠ Duplicate detected — similarity: {result.data.similarTo?.score?.toFixed(2)}
                </div>
              ) : (
                <div style={{
                  padding: ".75rem 1rem", borderRadius: 10, marginBottom: "1.25rem",
                  background: "rgba(16,185,129,.1)", border: "1px solid rgba(16,185,129,.25)",
                  color: "#6ee7b7", fontSize: ".85rem", display: "flex", alignItems: "center", gap: ".5rem",
                }}>
                  ✓ No duplicate found — unique report
                </div>
              )}

              {/* Meta grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", marginBottom: "1rem" }}>
                {[
                  ["Category", result.data.decision.category],
                  ["Urgency", result.data.decision.urgency],
                  ["Department", result.data.action.assignedDepartment],
                ].map(([label, value]) => (
                  <div key={label} style={metaItemStyle}>
                    <div style={metaLabelStyle}>{label}</div>
                    <div style={{ fontSize: ".9rem", fontWeight: 500, color: "#e2e8f0" }}>{value}</div>
                  </div>
                ))}

                {/* Priority */}
                <div style={metaItemStyle}>
                  <div style={metaLabelStyle}>Priority</div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: ".35rem",
                    padding: ".3rem .75rem", borderRadius: 6, fontSize: ".78rem", fontWeight: 500,
                    background: priorityStyles[result.data.priority.level]?.bg,
                    border: `1px solid ${priorityStyles[result.data.priority.level]?.border}`,
                    color: priorityStyles[result.data.priority.level]?.color,
                  }}>
                    {result.data.priority.level} ({result.data.priority.score.toFixed(2)})
                  </div>
                </div>
              </div>

              {/* Status */}
              <div style={{ ...metaItemStyle, marginBottom: "1rem" }}>
                <div style={metaLabelStyle}>Status</div>
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", flexShrink: 0, animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: ".9rem", fontWeight: 500, color: "#e2e8f0" }}>{result.data.action.status}</span>
                </div>
              </div>

              {/* Confirm button */}
              {!result.data.duplicate && !confirmed && (
                <button
                  onClick={handleConfirm}
                  style={{
                    width: "100%", padding: ".85rem", borderRadius: 12, marginTop: ".5rem",
                    background: "rgba(30,77,183,.2)", border: "1px solid rgba(59,130,246,.45)",
                    color: "#93c5fd", fontSize: ".9rem", fontWeight: 500,
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .2s",
                  }}
                >
                  Confirm & submit ticket →
                </button>
              )}

              {confirmed && (
                <div style={{
                  padding: "1rem 1.25rem", marginTop: ".75rem",
                  background: "rgba(37,99,235,.12)", border: "1px solid rgba(59,130,246,.35)",
                  borderRadius: 12, color: "#93c5fd", fontSize: ".88rem", lineHeight: 1.6,
                }}>
                  Ticket submitted successfully!<br />
                  <span style={{
                    fontFamily: "monospace", fontSize: ".8rem",
                    background: "rgba(59,130,246,.15)", padding: ".2rem .5rem",
                    borderRadius: 4, display: "inline-block", marginTop: ".3rem", color: "#60a5fa",
                  }}>
                    Ticket ID: {result.data.action.ticketId}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const labelStyle = {
  display: "block", fontSize: ".8rem", fontWeight: 500,
  color: "rgba(148,163,184,.8)", letterSpacing: ".06em",
  textTransform: "uppercase", marginBottom: ".55rem",
};

const inputStyle = {
  width: "100%", background: "rgba(6,10,18,.7)",
  border: "1px solid rgba(59,130,246,.2)", borderRadius: 10,
  padding: ".75rem 1rem", color: "#e8eaf0",
  fontFamily: "'DM Sans', sans-serif", fontSize: ".9rem", outline: "none",
  resize: "vertical",
};

const metaItemStyle = {
  background: "rgba(6,10,18,.5)", border: "1px solid rgba(59,130,246,.15)",
  borderRadius: 10, padding: ".75rem 1rem",
};

const metaLabelStyle = {
  fontSize: ".7rem", color: "rgba(148,163,184,.45)",
  textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".3rem",
};