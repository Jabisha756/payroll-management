"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Browser-only code
    const fetchEmployee = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Supabase error:", error);
          return;
        }

        setEmployee(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchEmployee();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="sidebar p-4 bg-gray-100 w-60 h-screen">
        <h2 className="text-xl font-bold mb-4">Padmakanya Technologies</h2>
        <a href="./dashboard" className="block mb-2 font-bold">Dashboard</a>
        <a href="./attendance" className="block mb-2">Attendance</a>
        <a href="./profile" className="block mb-2">Profile</a>
        <a href="/login" className="block mt-4 text-red-600">Logout</a>
      </aside>

      <main className="flex-1 p-6">
        {/* Topbar */}
        <header className="flex justify-between items-center mb-6">
          <h2>Welcome, {employee?.full_name || "Employee"}</h2>
          <div className="flex items-center space-x-4">
            <span>🔔</span>
            <span>💬</span>
            <img
              src={employee?.photo_url || "/default-user.png"}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-4 border rounded shadow">
            <h3>Employee ID</h3>
            <p>{employee?.employee_id || "----"}</p>
          </div>

          <div className="card p-4 border rounded shadow">
            <h3>Role</h3>
            <p>{employee?.role || "----"}</p>
          </div>

          <div className="card p-4 border rounded shadow">
            <h3>Email</h3>
            <p>{employee?.email || "----"}</p>
          </div>

          <div className="card p-4 border rounded shadow">
            <h3>Attendance</h3>
            <p>{employee?.attendance || "----"}%</p>
          </div>

          <div className="card p-4 border rounded shadow">
            <h3>Salary</h3>
            <p>Rs. {employee?.salary || "----"}</p>
          </div>

          <div className="card p-4 border rounded shadow">
            <h3>Profit</h3>
            <p>{employee?.profit || "----"}%</p>
          </div>
        </div>
      </main>
    </div>
  );
}
