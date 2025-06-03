"use client"

import { useState } from "react"
import { qrAPI } from "../../services/api"
import { Button, Input, Card } from "../../styles/GlobalStyles"
import styled from "styled-components"

const GeneratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const QRDisplay = styled.div`
  margin-top: 20px;
  text-align: center;
  
  img {
    max-width: 250px;
    margin-bottom: 15px;
  }
`

const QRCodeGenerator = () => {
  const [qrData, setQrData] = useState("")
  const [generatedQR, setGeneratedQR] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!qrData) return

    setLoading(true)

    try {
      const response = await qrAPI.generate(qrData)
      setGeneratedQR(response.data.qrCode)
    } catch (error) {
      console.error("Error generating QR code:", error)
      alert("Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!generatedQR) return

    const link = document.createElement("a")
    link.href = generatedQR
    link.download = "qrcode.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>QR Code Generator</h2>

      <GeneratorContainer>
        <Card style={{ width: "100%", maxWidth: "500px" }}>
          <h3>Generate QR Code</h3>
          <form onSubmit={handleGenerate}>
            <Input
              type="text"
              placeholder="Enter data for QR code"
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading} style={{ width: "100%" }}>
              {loading ? "Generating..." : "Generate QR Code"}
            </Button>
          </form>

          {generatedQR && (
            <QRDisplay>
              <img src={generatedQR || "/placeholder.svg"} alt="Generated QR Code" />
              <Button onClick={handleDownload}>Download QR Code</Button>
            </QRDisplay>
          )}
        </Card>
      </GeneratorContainer>
    </div>
  )
}

export default QRCodeGenerator
