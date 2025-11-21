"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabaseClient"
import EditEmployeeModal from "./EditEmployeeModal"

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    const { data, error } = await supabase.from("users").select("*").eq("role", "employee")
    if (!error) setEmployees(data)
  }

  async function deleteEmployee(id) {
    await supabase.from("users").delete().eq("id", id)
    fetchEmployees()
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <table className="w-full text-left border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Department</th>
            <th className="p-2">Position</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{emp.employee_id}</td>
              <td className="p-2">{emp.full_name}</td>
              <td className="p-2">{emp.email}</td>
              <td className="p-2">{emp.department}</td>
              <td className="p-2">{emp.position}</td>
              <td className="p-2 text-center">
                <button onClick={() => setSelected(emp)} className="px-3 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
                <button onClick={() => deleteEmployee(emp.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && <EditEmployeeModal employee={selected} close={() => setSelected(null)} refresh={fetchEmployees} />}
    </div>
  )
}
