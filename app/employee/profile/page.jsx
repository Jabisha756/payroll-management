"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) return;

    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setUser(data);
    };

    fetchUser();
  }, []);

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
        <h2>Profile</h2>
        <div className="top-icons">
        <span className="icon">🔔</span>
        <span className="icon">💬</span></div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1>Your Profile</h1>

        {!user ? (
          <p>Loading...</p>
        ) : (
          <div className="profile-card">
            <img
              src={user.photo_url || "/default-user.png"}
              className="profile-photo"
            />

            <h2>{user.full_name}</h2>
            <p className="email">{user.email}</p>

            <div className="info-box">
              <div className="row">
                <span>Employee ID:</span>
                <strong>{user.employee_id}</strong>
              </div>

              <div className="row">
                <span>Role:</span>
                <strong>{user.role}</strong>
              </div>

              <div className="row">
                <span>Salary:</span>
                <strong>Rs. {user.salary || "----"}</strong>
              </div>

              <div className="row">
                <span>Attendance:</span>
                <strong>{user.attendance || "----"}%</strong>
              </div>

              <div className="row">
                <span>Profit:</span>
                <strong>{user.profit || "----"}%</strong>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Extra CSS (add this inside your global css file) */}
      <style jsx>{`
        .profile-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          max-width: 400px;
          text-align: center;
          margin: 0 auto;
        }

        .profile-photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 20px;
        }

        .email {
          color: #555;
          margin-bottom: 20px;
        }

        .info-box {
          margin-top: 20px;
          text-align: left;
        }

        .row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
      `}</style>
    </div>
  );
}
