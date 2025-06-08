"use client"

import type React from "react"

import { useState } from "react"

interface CriminalRecord {
  suspectName: string
  crimeType: string
  description: string
  dateReported: string
  status: "Active" | "Closed" | "Under Investigation"
  priority: "High" | "Medium" | "Low"
  officerName: string
  location: string
}

interface UploadRecordProps {
  onAddRecord: (record: CriminalRecord) => void
}

export default function UploadRecord({ onAddRecord }: UploadRecordProps) {
  const [formData, setFormData] = useState<CriminalRecord>({
    suspectName: "",
    crimeType: "",
    description: "",
    dateReported: "",
    status: "Active",
    priority: "Medium",
    officerName: "",
    location: "",
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onAddRecord(formData)
    setIsUploading(false)
    setUploadSuccess(true)

    // Reset form
    setFormData({
      suspectName: "",
      crimeType: "",
      description: "",
      dateReported: "",
      status: "Active",
      priority: "Medium",
      officerName: "",
      location: "",
    })

    setTimeout(() => setUploadSuccess(false), 3000)
  }

  return (
    <div className="upload-record">
      <div className="upload-header">
        <h2>📤 Upload Criminal Record</h2>
        <p>Create a new criminal record and generate NFT certificate</p>
      </div>

      {uploadSuccess && (
        <div className="success-message">
          <div className="success-icon">✅</div>
          <div>
            <h3>Record Uploaded Successfully!</h3>
            <p>NFT certificate has been generated and stored on blockchain</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="suspectName">Suspect Name *</label>
            <input
              type="text"
              id="suspectName"
              name="suspectName"
              value={formData.suspectName}
              onChange={handleInputChange}
              required
              placeholder="Enter suspect's full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="crimeType">Crime Type *</label>
            <select id="crimeType" name="crimeType" value={formData.crimeType} onChange={handleInputChange} required>
              <option value="">Select crime type</option>
              <option value="Theft">Theft</option>
              <option value="Fraud">Fraud</option>
              <option value="Assault">Assault</option>
              <option value="Burglary">Burglary</option>
              <option value="Drug Offense">Drug Offense</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dateReported">Date Reported *</label>
            <input
              type="date"
              id="dateReported"
              name="dateReported"
              value={formData.dateReported}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority Level *</label>
            <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange} required>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Case Status *</label>
            <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
              <option value="Active">Active</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="officerName">Reporting Officer *</label>
            <input
              type="text"
              id="officerName"
              name="officerName"
              value={formData.officerName}
              onChange={handleInputChange}
              required
              placeholder="Officer's name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="Crime location"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Detailed description of the crime..."
            rows={4}
          />
        </div>

        <div className="nft-info">
          <div className="nft-icon">🎫</div>
          <div>
            <h4>NFT Certificate Generation</h4>
            <p>
              Upon submission, a unique NFT certificate will be automatically generated for this record, ensuring
              immutable proof of authenticity.
            </p>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isUploading}>
          {isUploading ? (
            <>
              <div className="spinner"></div>
              Uploading to Blockchain...
            </>
          ) : (
            <>🔒 Upload Record & Generate NFT</>
          )}
        </button>
      </form>
    </div>
  )
}
