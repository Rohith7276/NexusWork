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
  ipfsHash?: string
  creator?: string
  timestamp?: number
}

// Sample data for demonstration
const sampleRecords: CriminalRecord[] = [
  {
    id: 0,
    suspectName: "John Doe",
    crimeType: "Theft",
    description: "Stolen vehicle from downtown parking lot",
    dateReported: "2024-01-15",
    status: "Active",
    priority: "High",
    nftId: "NFT001",
    officerName: "Officer Smith",
    location: "Downtown District",
    ipfsHash: "QmDemo1234..."
  },
  {
    id: 1,
    suspectName: "Jane Wilson",
    crimeType: "Fraud",
    description: "Credit card fraud case involving multiple victims",
    dateReported: "2024-01-10",
    status: "Under Investigation",
    priority: "Medium",
    nftId: "NFT002",
    officerName: "Officer Johnson",
    location: "Financial District",
    ipfsHash: "QmDemo9876..."
  },
  {
    id: 2,
    suspectName: "Mike Brown",
    crimeType: "Assault",
    description: "Physical altercation at local bar",
    dateReported: "2024-01-20",
    status: "Active",
    priority: "High",
    nftId: "NFT003",
    officerName: "Officer Davis",
    location: "Entertainment District",
    ipfsHash: "QmDemo5556..."
  }
]

export default function SearchRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const filteredRecords = sampleRecords.filter((record) => {
    const matchesSearch =
      searchTerm === "" ||
      record.suspectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.crimeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.nftId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.ipfsHash && record.ipfsHash.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = filterType === "all" || record.crimeType === filterType
    const matchesStatus = filterStatus === "all" || record.status === filterStatus
    const matchesPriority = filterPriority === "all" || record.priority === filterPriority

    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const viewDocument = (ipfsHash?: string) => {
    if (ipfsHash && !ipfsHash.startsWith("QmDemo")) {
      window.open(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`, "_blank")
    } else {
      alert("Document not available - this is a demo record")
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">🔍 Search Criminal Records</h1>
        <p className="text-gray-300">Search and filter blockchain-verified criminal records with IPFS document storage.</p>
      </div>

      {/* Search Bar and Filters */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, crime type, location, IPFS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64 px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="all">All Crime Types</option>
            <option value="Theft">Theft</option>
            <option value="Fraud">Fraud</option>
            <option value="Assault">Assault</option>
            <option value="Burglary">Burglary</option>
            <option value="Drug Offense">Drug Offense</option>
            <option value="Vandalism">Vandalism</option>
            <option value="Cybercrime">Cybercrime</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-4xl mx-auto mb-6">
        <h2 className="text-2xl font-bold">Search Results: {filteredRecords.length}</h2>
      </div>

      {/* Records List */}
      <div className="max-w-4xl mx-auto space-y-8">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">🚫 No records found.</p>
            <p className="text-gray-500">Try changing the filters or search term.</p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div key={record.id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              {/* Record ID and Status */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl font-bold text-gray-300">#{record.id}</span>
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  record.status === "Active" ? "bg-green-600 text-white" :
                  record.status === "Under Investigation" ? "bg-yellow-600 text-black" :
                  "bg-gray-600 text-white"
                }`}>
                  {record.status}
                </span>
              </div>

              {/* Name and Crime Type */}
              <h3 className="text-3xl font-bold mb-2">{record.suspectName}</h3>
              <p className="text-xl text-red-400 mb-3">{record.crimeType}</p>
              <p className="text-lg text-gray-300 mb-4">{record.description}</p>

              {/* Details */}
              <div className="space-y-2 text-lg mb-4">
                <div><span className="font-bold">Date:</span> {record.dateReported}</div>
                <div><span className="font-bold">Location:</span> {record.location}</div>
                <div><span className="font-bold">Officer:</span> {record.officerName}</div>
                <div><span className="font-bold">NFT ID:</span> {record.nftId}</div>
                {record.ipfsHash && (
                  <div><span className="font-bold">IPFS:</span> {record.ipfsHash}</div>
                )}
              </div>

              {/* Priority and Actions */}
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  record.priority === "High" ? "bg-red-600 text-white" :
                  record.priority === "Medium" ? "bg-yellow-600 text-black" :
                  "bg-green-600 text-white"
                }`}>
                  {record.priority} Priority
                </span>
                
                <div className="flex gap-4">
                  <button className="text-blue-400 hover:text-blue-300">
                    🎫 View NFT
                  </button>
                  {record.ipfsHash && (
                    <button
                      onClick={() => viewDocument(record.ipfsHash)}
                      className="text-green-400 hover:text-green-300"
                    >
                      📄 View Doc
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}