"use client"

import { useState } from "react"

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

interface ActiveCasesProps {
  records: CriminalRecord[]
  onUpdateStatus: (id: number, status: CriminalRecord["status"]) => void
}

export default function ActiveCases({ records, onUpdateStatus }: ActiveCasesProps) {
  const [selectedPriority, setSelectedPriority] = useState("all")

  const activeCases = records.filter((record) => record.status === "Active" || record.status === "Under Investigation")

  const filteredCases =
    selectedPriority === "all" ? activeCases : activeCases.filter((record) => record.priority === selectedPriority)

  const priorityOrder = { High: 3, Medium: 2, Low: 1 }
  const sortedCases = filteredCases.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])

  const handleStatusChange = (id: number, newStatus: CriminalRecord["status"]) => {
    onUpdateStatus(id, newStatus)
  }

  return (
    <div className="active-cases">
      <div className="cases-header">
        <h2>⚡ Active Cases</h2>
        <p>Manage and track active criminal cases</p>
      </div>

      <div className="cases-controls">
        <div className="priority-filter">
          <label>Filter by Priority:</label>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="priority-select"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        <div className="cases-stats">
          <div className="stat-item">
            <span className="stat-number">{activeCases.length}</span>
            <span className="stat-label">Total Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{activeCases.filter((c) => c.priority === "High").length}</span>
            <span className="stat-label">High Priority</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{activeCases.filter((c) => c.status === "Under Investigation").length}</span>
            <span className="stat-label">Under Investigation</span>
          </div>
        </div>
      </div>

      {sortedCases.length === 0 ? (
        <div className="no-cases">
          <div className="no-cases-icon">📋</div>
          <h3>No Active Cases</h3>
          <p>All cases have been resolved or no cases match the selected priority</p>
        </div>
      ) : (
        <div className="cases-list">
          {sortedCases.map((record) => (
            <div key={record.id} className={`case-card priority-${record.priority.toLowerCase()}`}>
              <div className="case-header">
                <div className="case-info">
                  <h3>{record.suspectName}</h3>
                  <span className="case-id">Case #{record.id}</span>
                </div>
                <div className="case-badges">
                  <div className={`priority-badge ${record.priority.toLowerCase()}`}>{record.priority}</div>
                  <div className={`status-badge ${record.status.toLowerCase().replace(" ", "-")}`}>{record.status}</div>
                </div>
              </div>

              <div className="case-content">
                <div className="crime-info">
                  <h4>{record.crimeType}</h4>
                  <p>{record.description}</p>
                </div>

                <div className="case-details-grid">
                  <div className="detail-group">
                    <span className="detail-label">📅 Date Reported</span>
                    <span className="detail-value">{record.dateReported}</span>
                  </div>
                  <div className="detail-group">
                    <span className="detail-label">📍 Location</span>
                    <span className="detail-value">{record.location}</span>
                  </div>
                  <div className="detail-group">
                    <span className="detail-label">👮 Officer</span>
                    <span className="detail-value">{record.officerName}</span>
                  </div>
                  <div className="detail-group">
                    <span className="detail-label">🎫 NFT ID</span>
                    <span className="detail-value nft-id">{record.nftId}</span>
                  </div>
                </div>
              </div>

              <div className="case-actions">
                <div className="status-controls">
                  <label>Update Status:</label>
                  <select
                    value={record.status}
                    onChange={(e) => handleStatusChange(record.id, e.target.value as CriminalRecord["status"])}
                    className="status-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Under Investigation">Under Investigation</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="action-buttons">
                  <button className="action-btn view-btn">👁️ View Details</button>
                  <button className="action-btn nft-btn">🎫 View NFT</button>
                  <button className="action-btn edit-btn">✏️ Edit Case</button>
                </div>
              </div>

              <div className="case-timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <span>Case created on {record.dateReported}</span>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot active"></div>
                  <span>Currently {record.status.toLowerCase()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
