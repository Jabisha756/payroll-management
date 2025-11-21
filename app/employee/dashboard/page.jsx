"use client"
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (!error) setEmployee(data);
    };

    fetchEmployee();
  }, []);

  return (
    <div>
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Padmakanya Technologies</h2>
        <a>Dashboard</a>
        <a href="./attendance">Attendance</a>
        <a href="./profile">Profile</a>
        <a href="/login">Logout</a>
      </aside>

      {/* Topbar */}
      <header className="topbar">
        
<h2> Welcome, {employee?.full_name || "Employee"}</h2>
        <div className="top-icons">
          <span className="icon">🔔</span>
          <span className="icon">💬</span>

          {/* USER PHOTO FIXED */}
          <img
            src={employee?.photo_url || "/default-user.png"}
            className="top-profile"
            alt="profile"
          />
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
        <h1>Employee Dashboard</h1>

        <div className="cards">
          <div className="card">
            <h3>Employee ID</h3>
            <p>{employee?.employee_id || "----"}</p>
          </div>

          <div className="card">
            <h3>Role</h3>
            <p>{employee?.role || "----"}</p>
          </div>

          <div className="card">
            <h3>Email</h3>
            <p>{employee?.email || "----"}</p>
          </div>

          <div className="card">
            <h3>Attendance</h3>
            <p>{employee?.attendance || "----"}%</p>
          </div>

          <div className="card">
            <h3>Salary</h3>
            <p>Rs. {employee?.salary || "----"}</p>
          </div>

          <div className="card">
            <h3>Profit</h3>
            <p>{employee?.profit || "----"}%</p>
          </div>
        </div>
      </main>
    </div>
  );
}
