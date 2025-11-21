"use client"
import { useState } from "react"
import EmployeeList from "./EmployeeList"
import SalaryTable from "./SalaryTable"
import AttendanceTable from "./AttendanceTable"

export default function AdminDashboard() {
  const [tab, setTab] = useState("employees")

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Admin Dashboard</h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-xl ${tab === "employees" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setTab("employees")}
          >
            Employees
          </button>
          <button
            className={`px-4 py-2 rounded-xl ${tab === "attendance" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setTab("attendance")}
          >
            Attendance
          </button>
          <button
            className={`px-4 py-2 rounded-xl ${tab === "salary" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setTab("salary")}
          >
            Salary
          </button>
        </div>

        {tab === "employees" && <EmployeeList />}
        {tab === "attendance" && <AttendanceTable />}
        {tab === "salary" && <SalaryTable />}
      </div>
    </div>
  )
}
