"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface CriminalRecord {
  id: number
  suspectName: string
  crimeType: string
  description: string
  dateReported: string
  status: "Active" | "Closed" | "Under Investigation"
  priority: "High" | "Medium" | "Low"
  nftId: string
  officerName: string
  location: string
}

interface DashboardProps {
  records: CriminalRecord[]
}

export default function Dashboard({ records }: DashboardProps) {
  const crimeTypeData = records.reduce(
    (acc, record) => {
      acc[record.crimeType] = (acc[record.crimeType] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(crimeTypeData).map(([type, count]) => ({
    name: type,
    value: count,
  }))

  const statusData = records.reduce(
    (acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const statusChartData = Object.entries(statusData).map(([status, count]) => ({
    name: status,
    value: count,
  }))

  const priorityData = records.reduce(
    (acc, record) => {
      acc[record.priority] = (acc[record.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const priorityChartData = Object.entries(priorityData).map(([priority, count]) => ({
    name: priority,
    value: count,
  }))

  const COLORS = ["#dc2626", "#1f2937", "#6b7280", "#9ca3af"]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Criminal Records Dashboard</h2>
        <p>Overview of all criminal records and statistics</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Records</h3>
            <p className="stat-number">{records.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>Active Cases</h3>
            <p className="stat-number">{records.filter((r) => r.status === "Active").length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <h3>Under Investigation</h3>
            <p className="stat-number">{records.filter((r) => r.status === "Under Investigation").length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Closed Cases</h3>
            <p className="stat-number">{records.filter((r) => r.status === "Closed").length}</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Crime Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Case Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Priority Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1f2937" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Records</h3>
        <div className="activity-list">
          {records
            .slice(-5)
            .reverse()
            .map((record) => (
              <div key={record.id} className="activity-item">
                <div className="activity-icon">🔒</div>
                <div className="activity-content">
                  <p>
                    <strong>{record.suspectName}</strong> - {record.crimeType}
                  </p>
                  <p className="activity-meta">
                    {record.dateReported} • {record.status} • NFT: {record.nftId}
                  </p>
                </div>
                <div className={`priority-badge ${record.priority.toLowerCase()}`}>{record.priority}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
