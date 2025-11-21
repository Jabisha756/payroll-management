"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AttendancePage() {
  const [user, setUser] = useState(null);
  const [presentDates, setPresentDates] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem("userId");
      if (!id) return;

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setUser(data);
        setPresentDates(data.attendance_dates || []); // array of dates
      }
    };

    fetchUser();
  }, []);

  // Build calendar for current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = today.toLocaleString("default", { month: "long" });

  const isPresent = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return presentDates.includes(dateString);
  };

  return (
    <div>
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Padmakanya Technologies</h2>
        <a href="./dashboard">Dashboard</a>
        <a href="./attendance">Attendance</a>
        <a href="./profile">Profile</a>
        <a href="/login">Logout</a>
      </aside>

      {/* Topbar */}
      <header className="topbar">
        <div className="top-icons">
          <span className="icon">🔔</span>
          <span className="icon">💬</span> </div>
      </header>

      <main className="main-content">
        <h1>Attendance Calendar</h1>

        <h2 style={{ marginBottom: "15px" }}>
          {monthName} {year}
        </h2>
<div>
  <iframe
    style={{
      border: "1px solid #ddd",
      width: "100%",
      height: "700px",
      borderRadius: "10px"
    }}
    src="https://calendar.google.com/calendar/embed?src=iframely.embeds%40gmail.com"
    allowFullScreen
    title="Calendar"
  ></iframe>
</div>
      </main>
    </div>
  );
}
