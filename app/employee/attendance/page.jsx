"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AttendancePage() {
  const [user, setUser] = useState<any>(null);
  const [presentDates, setPresentDates] = useState<string[]>([]);

  // Only run in the browser
  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem("userId");
      if (!id) return;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Supabase fetch error:", error);
        return;
      }

      if (data) {
        setUser(data);
        setPresentDates(data.attendance_dates || []);
      }
    };

    fetchUser();
  }, []);

  // Calendar for current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = today.toLocaleString("default", { month: "long" });

  const isPresent = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return presentDates.includes(dateString);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="sidebar p-4 bg-gray-100 w-60 h-screen">
        <h2 className="text-xl font-bold mb-4">Padmakanya Technologies</h2>
        <a href="./dashboard" className="block mb-2">Dashboard</a>
        <a href="./attendance" className="block mb-2 font-bold">Attendance</a>
        <a href="./profile" className="block mb-2">Profile</a>
        <a href="/login" className="block mt-4 text-red-600">Logout</a>
      </aside>

      <main className="flex-1 p-6">
        <header className="flex justify-end mb-6">
          <span className="mr-4">🔔</span>
          <span>💬</span>
        </header>

        <h1 className="text-2xl font-bold mb-2">Attendance Calendar</h1>
        <h2 className="mb-4">{monthName} {year}</h2>

        {/* Google Calendar iframe */}
        <div>
          <iframe
            style={{
              border: "1px solid #ddd",
              width: "100%",
              height: "700px",
              borderRadius: "10px",
            }}
            src="https://calendar.google.com/calendar/embed?src=iframely.embeds%40gmail.com"
            allowFullScreen
            title="Calendar"
          />
        </div>

        {/* Optional: simple built-in calendar to mark present dates */}
        <div className="mt-6 grid grid-cols-7 gap-2">
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`p-2 text-center border rounded ${
                isPresent(day) ? "bg-green-300" : "bg-gray-100"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
