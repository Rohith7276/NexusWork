"use client"

import type React from "react"

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

interface NFTSearchProps {
  records: CriminalRecord[]
}

export default function NFTSearch({ records }: NFTSearchProps) {
  const [nftId, setNftId] = useState("")
  const [searchResult, setSearchResult] = useState<CriminalRecord | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async () => {
    if (!nftId.trim()) return

    setIsSearching(true)
    setNotFound(false)
    setSearchResult(null)

    // Simulate blockchain search
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const found = records.find((record) => record.nftId.toLowerCase() === nftId.toLowerCase())

    if (found) {
      setSearchResult(found)
    } else {
      setNotFound(true)
    }

    setIsSearching(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="nft-search">
      <div className="nft-search-header">
        <h2>🎫 NFT Certificate Search</h2>
        <p>Search criminal records using NFT certificate IDs</p>
      </div>

      <div className="nft-info-section">
        <div className="nft-info-card">
          <div className="nft-icon">🔐</div>
          <div className="nft-info-content">
            <h3>How NFT Search Works</h3>
            <p>
              Each criminal record generates a unique NFT certificate that serves as an immutable proof of authenticity.
              Use the NFT ID to quickly locate and verify records.
            </p>
          </div>
        </div>
      </div>

      <div className="search-section">
        <div className="nft-search-bar">
          <input
            type="text"
            placeholder="Enter NFT ID (e.g., NFT001, NFT002...)"
            value={nftId}
            onChange={(e) => setNftId(e.target.value)}
            onKeyPress={handleKeyPress}
            className="nft-input"
          />
          <button onClick={handleSearch} disabled={isSearching || !nftId.trim()} className="nft-search-btn">
            {isSearching ? (
              <>
                <div className="spinner"></div>
                Searching...
              </>
            ) : (
              <>🔍 Search NFT</>
            )}
          </button>
        </div>

        <div className="available-nfts">
          <h4>Available NFT IDs:</h4>
          <div className="nft-tags">
            {records.map((record) => (
              <button key={record.nftId} className="nft-tag" onClick={() => setNftId(record.nftId)}>
                {record.nftId}
              </button>
            ))}
          </div>
        </div>
      </div>

      {notFound && (
        <div className="search-result not-found">
          <div className="result-icon">❌</div>
          <div className="result-content">
            <h3>NFT Not Found</h3>
            <p>
              No criminal record found with NFT ID: <strong>{nftId}</strong>
            </p>
            <p>Please check the NFT ID and try again.</p>
          </div>
        </div>
      )}

      {searchResult && (
        <div className="search-result found">
          <div className="result-header">
            <div className="result-icon">✅</div>
            <div>
              <h3>NFT Certificate Found</h3>
              <p>Record verified on blockchain</p>
            </div>
          </div>

          <div className="nft-certificate">
            <div className="certificate-header">
              <h4>🎫 NFT Certificate: {searchResult.nftId}</h4>
              <div className="certificate-status">
                <span className="verified-badge">✅ Verified</span>
                <span className="blockchain-badge">🔗 On Blockchain</span>
              </div>
            </div>

            <div className="certificate-content">
              <div className="record-summary">
                <h5>Criminal Record Summary</h5>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Record ID:</span>
                    <span className="summary-value">#{searchResult.id}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Suspect:</span>
                    <span className="summary-value">{searchResult.suspectName}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Crime Type:</span>
                    <span className="summary-value">{searchResult.crimeType}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Status:</span>
                    <span className={`summary-value status-${searchResult.status.toLowerCase().replace(" ", "-")}`}>
                      {searchResult.status}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Priority:</span>
                    <span className={`summary-value priority-${searchResult.priority.toLowerCase()}`}>
                      {searchResult.priority}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Date:</span>
                    <span className="summary-value">{searchResult.dateReported}</span>
                  </div>
                </div>
              </div>

              <div className="record-details-full">
                <h5>Full Record Details</h5>
                <div className="details-content">
                  <p>
                    <strong>Description:</strong> {searchResult.description}
                  </p>
                  <p>
                    <strong>Location:</strong> {searchResult.location}
                  </p>
                  <p>
                    <strong>Reporting Officer:</strong> {searchResult.officerName}
                  </p>
                </div>
              </div>

              <div className="nft-metadata">
                <h5>NFT Metadata</h5>
                <div className="metadata-grid">
                  <div className="metadata-item">
                    <span>Token ID:</span>
                    <span>{searchResult.nftId}</span>
                  </div>
                  <div className="metadata-item">
                    <span>Contract:</span>
                    <span>0x742d35Cc6634C0532925a3b8D</span>
                  </div>
                  <div className="metadata-item">
                    <span>Blockchain:</span>
                    <span>Ethereum</span>
                  </div>
                  <div className="metadata-item">
                    <span>Created:</span>
                    <span>{searchResult.dateReported}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="certificate-actions">
              <button className="action-btn primary">📄 Download Certificate</button>
              <button className="action-btn secondary">🔗 View on Blockchain</button>
              <button className="action-btn secondary">📤 Share Certificate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
