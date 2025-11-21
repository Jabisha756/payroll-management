"use client"
import { useState } from "react"
import { supabase } from "../../../lib/supabaseClient"

export default function EditEmployeeModal({ employee, close, refresh }) {
  const [form, setForm] = useState(employee)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  async function saveChanges() {
    await supabase.from("users").update({
      full_name: form.full_name,
      email: form.email,
      department: form.department,
      position: form.position
    }).eq("id", employee.id)
    refresh()
    close()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h3 className="text-xl font-semibold mb-4">Edit Employee</h3>
        <input className="border p-2 w-full mb-2" name="full_name" value={form.full_name} onChange={handleChange} />
        <input className="border p-2 w-full mb-2" name="email" value={form.email} onChange={handleChange} />
        <input className="border p-2 w-full mb-2" name="department" value={form.department} onChange={handleChange} />
        <input className="border p-2 w-full mb-4" name="position" value={form.position} onChange={handleChange} />

        <div className="flex justify-between">
          <button onClick={saveChanges} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
          <button onClick={close} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
        </div>
      </div>
    </div>
  )
}
