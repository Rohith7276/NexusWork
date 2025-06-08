"use client"

import { useState, useEffect } from "react"
import Dashboard from "../components/Dashboard"
import UploadRecord from "../components/UploadRecord"
import SearchRecords from "../components/SearchRecords"
import ActiveCases from "../components/ActiveCases"
import NFTSearch from "../components/NFTSearch"
import "../styles/App.css"

declare global {
  interface Window {
    ethereum?: any
    web3?: any
  }
}

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

export default function CrimTrack() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [account, setAccount] = useState<string>("")
  const [records, setRecords] = useState<CriminalRecord[]>([
    {
      id: 1,
      suspectName: "John Doe",
      crimeType: "Theft",
      description: "Stolen vehicle from downtown parking lot",
      dateReported: "2024-01-15",
      status: "Active",
      priority: "High",
      nftId: "NFT001",
      officerName: "Officer Smith",
      location: "Downtown District",
    },
    {
      id: 2,
      suspectName: "Jane Wilson",
      crimeType: "Fraud",
      description: "Credit card fraud case involving multiple victims",
      dateReported: "2024-01-10",
      status: "Under Investigation",
      priority: "Medium",
      nftId: "NFT002",
      officerName: "Officer Johnson",
      location: "Financial District",
    },
    {
      id: 3,
      suspectName: "Mike Brown",
      crimeType: "Assault",
      description: "Physical assault at local bar",
      dateReported: "2024-01-08",
      status: "Closed",
      priority: "High",
      nftId: "NFT003",
      officerName: "Officer Davis",
      location: "Entertainment District",
    },
  ])

  useEffect(() => {
    connectWallet()
  }, [])

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setAccount(accounts[0])
      } catch (error) {
        console.error("Error connecting wallet:", error)
      }
    }
  }

  const addRecord = (newRecord: Omit<CriminalRecord, "id" | "nftId">) => {
    const record: CriminalRecord = {
      ...newRecord,
      id: records.length + 1,
      nftId: `NFT${String(records.length + 1).padStart(3, "0")}`,
    }
    setRecords([...records, record])
  }

  const updateRecordStatus = (id: number, status: CriminalRecord["status"]) => {
    setRecords(records.map((record) => (record.id === id ? { ...record, status } : record)))
  }

  return (
    <div className="crimtrack-app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="app-title">🔒 CrimTrack</h1>
            <p className="app-subtitle">Blockchain Criminal Record Management</p>
          </div>
          <div className="wallet-section">
            {account ? (
              <div className="wallet-connected">
                <span className="wallet-status">Connected</span>
                <span className="wallet-address">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </div>
            ) : (
              <button onClick={connectWallet} className="connect-wallet-btn">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>
        <button className={`nav-btn ${activeTab === "upload" ? "active" : ""}`} onClick={() => setActiveTab("upload")}>
          📤 Upload Record
        </button>
        <button className={`nav-btn ${activeTab === "search" ? "active" : ""}`} onClick={() => setActiveTab("search")}>
          🔍 Search Records
        </button>
        <button
          className={`nav-btn ${activeTab === "active-cases" ? "active" : ""}`}
          onClick={() => setActiveTab("active-cases")}
        >
          ⚡ Active Cases
        </button>
        <button
          className={`nav-btn ${activeTab === "nft-search" ? "active" : ""}`}
          onClick={() => setActiveTab("nft-search")}
        >
          🎫 NFT Search
        </button>
      </nav>

      <main className="app-main">
        {activeTab === "dashboard" && <Dashboard records={records} />}
        {activeTab === "upload" && <UploadRecord onAddRecord={addRecord} />}
        {activeTab === "search" && <SearchRecords records={records} />}
        {activeTab === "active-cases" && <ActiveCases records={records} onUpdateStatus={updateRecordStatus} />}
        {activeTab === "nft-search" && <NFTSearch records={records} />}
      </main>
    </div>
  )
}
