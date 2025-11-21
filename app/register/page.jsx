"use client"
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Register() {
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    password: "",
    role: "employee"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("users")
      .insert([formData]);
    if (error) alert(error.message);
    else alert("Registered successfully!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="employee_id" placeholder="Employee ID" onChange={handleChange} /><br />
        <input name="full_name" placeholder="Full Name" onChange={handleChange} /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
        <select name="role" onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
