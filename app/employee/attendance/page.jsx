
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

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) return;

      if (data) {
        setUser(data);
        setPresentDates(data.attendance_dates || []);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Attendance Page</h1>
      <div>
        {presentDates.map((date, i) => (
          <div key={i}>{date}</div>
        ))}
      </div>
    </div>
  );
}
