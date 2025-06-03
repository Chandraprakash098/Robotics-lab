"use client"

import { useState, useRef, useEffect } from "react"
import { attendanceAPI, studentAPI } from "../../services/api"
import { Button, Card, Select } from "../../styles/GlobalStyles"
import styled from "styled-components"

const MobileContainer = styled.div`
  max-width: 100%;
  padding: 10px;
  
  @media (min-width: 768px) {
    max-width: 500px;
    margin: 0 auto;
  }
`

const ScannerCard = styled(Card)`
  text-align: center;
  margin-bottom: 20px;
`

const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
  
  video {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #007bff;
  }
  
  canvas {
    display: none;
  }
`

const ScanOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 2px solid #007bff;
  border-radius: 8px;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid rgba(0, 123, 255, 0.3);
    border-radius: 8px;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`

const StudentProfile = styled(Card)`
  margin-top: 20px;
  
  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #007bff;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      margin-right: 15px;
    }
    
    .info {
      flex: 1;
      
      h3 {
        margin: 0 0 5px 0;
        color: #333;
      }
      
      p {
        margin: 0;
        color: #666;
        font-size: 14px;
      }
    }
  }
  
  .profile-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
    
    .detail-item {
      .label {
        font-size: 12px;
        color: #666;
        text-transform: uppercase;
        margin-bottom: 3px;
      }
      
      .value {
        font-size: 14px;
        color: #333;
        font-weight: 500;
      }
    }
  }
  
  .contact-info {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    
    h4 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 16px;
    }
    
    .contact-item {
      margin-bottom: 8px;
      font-size: 14px;
      
      .contact-label {
        font-weight: 500;
        color: #666;
      }
      
      .contact-value {
        color: #333;
      }
    }
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const MobileQRScanner = () => {
  const [scannedStudent, setScannedStudent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [selectedSession, setSelectedSession] = useState("")
  const [labSessions] = useState(["Morning Lab", "Afternoon Lab", "Evening Lab", "Special Session"])

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const startCamera = async () => {
    try {
      setIsScanning(true)
      setError("")

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setError("Unable to access camera. Please check permissions.")
      setIsScanning(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setLoading(true)
    setError("")

    try {
      // Simulate QR code scanning by searching for a student
      // In real implementation, you would decode the QR code from the image
      const studentsResponse = await studentAPI.getAll({ limit: 1 })

      if (studentsResponse.data.students && studentsResponse.data.students.length > 0) {
        setScannedStudent(studentsResponse.data.students[0])
        setSelectedSession(labSessions[0]) // Default to first session
      } else {
        setError("No students found")
      }
    } catch (error) {
      console.error("Error scanning QR code:", error)
      setError("Error scanning QR code")
    } finally {
      setLoading(false)
    }
  }

  const handleManualInput = async () => {
    const studentId = prompt("Enter student ID from QR code:")
    if (!studentId) return

    setLoading(true)
    setError("")

    try {
      const studentsResponse = await studentAPI.getAll({ search: studentId })

      if (studentsResponse.data.students && studentsResponse.data.students.length > 0) {
        setScannedStudent(studentsResponse.data.students[0])
        setSelectedSession(labSessions[0])
      } else {
        setError("Student not found")
      }
    } catch (error) {
      console.error("Error finding student:", error)
      setError("Error finding student")
    } finally {
      setLoading(false)
    }
  }

  const recordAttendance = async () => {
    if (!scannedStudent || !selectedSession) return

    setLoading(true)
    try {
      const attendanceData = {
        studentId: scannedStudent._id,
        labSession: selectedSession,
        notes: "Recorded via mobile QR scan",
      }

      await attendanceAPI.record(attendanceData)
      alert("✅ Attendance recorded successfully!")

      // Reset for next scan
      setScannedStudent(null)
      setSelectedSession("")
    } catch (error) {
      console.error("Error recording attendance:", error)
      alert("❌ Error recording attendance: " + (error.response?.data?.message || "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  const callParent = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`
    }
  }

  const messageParent = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = `sms:${phoneNumber}`
    }
  }

  useEffect(() => {
    return () => {
      stopCamera() // Cleanup camera on unmount
    }
  }, [])

  return (
    <MobileContainer>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>📱 Mobile QR Scanner</h2>

      <ScannerCard>
        <h3>Scan Student QR Code</h3>

        {!isScanning ? (
          <div>
            <p>Choose scanning method:</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              <Button onClick={startCamera}>📷 Use Camera</Button>
              <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                📁 Upload Image
              </Button>
              <Button variant="secondary" onClick={handleManualInput}>
                ⌨️ Manual Input
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>
        ) : (
          <div>
            <CameraContainer>
              <video ref={videoRef} autoPlay playsInline />
              <canvas ref={canvasRef} />
              <ScanOverlay />
            </CameraContainer>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <Button variant="secondary" onClick={stopCamera}>
                Stop Camera
              </Button>
              <Button onClick={handleManualInput}>Manual Input</Button>
            </div>

            <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
              Position the QR code within the blue frame
            </p>
          </div>
        )}

        {loading && <p>🔄 Processing...</p>}
        {error && <p style={{ color: "red" }}>❌ {error}</p>}
      </ScannerCard>

      {scannedStudent && (
        <StudentProfile>
          <div className="profile-header">
            <div className="avatar">
              {scannedStudent.personalDetails.firstName.charAt(0)}
              {scannedStudent.personalDetails.lastName.charAt(0)}
            </div>
            <div className="info">
              <h3>
                {scannedStudent.personalDetails.firstName} {scannedStudent.personalDetails.lastName}
              </h3>
              <p>Student ID: {scannedStudent.studentId}</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <div className="label">Email</div>
              <div className="value">{scannedStudent.personalDetails.email}</div>
            </div>
            <div className="detail-item">
              <div className="label">Phone</div>
              <div className="value">{scannedStudent.personalDetails.phone}</div>
            </div>
            <div className="detail-item">
              <div className="label">Grade</div>
              <div className="value">{scannedStudent.academicRecords.grade}</div>
            </div>
            <div className="detail-item">
              <div className="label">GPA</div>
              <div className="value">{scannedStudent.academicRecords.gpa || "N/A"}</div>
            </div>
          </div>

          <div className="contact-info">
            <h4>👨‍👩‍👧‍👦 Parent Contact</h4>
            {scannedStudent.parentContact.fatherName && (
              <div className="contact-item">
                <span className="contact-label">Father: </span>
                <span className="contact-value">
                  {scannedStudent.parentContact.fatherName} - {scannedStudent.parentContact.fatherPhone}
                </span>
                <div style={{ marginTop: "5px" }}>
                  <Button
                    size="small"
                    onClick={() => callParent(scannedStudent.parentContact.fatherPhone)}
                    style={{ marginRight: "5px", padding: "5px 10px", fontSize: "12px" }}
                  >
                    📞 Call
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => messageParent(scannedStudent.parentContact.fatherPhone)}
                    style={{ padding: "5px 10px", fontSize: "12px" }}
                  >
                    💬 Message
                  </Button>
                </div>
              </div>
            )}

            {scannedStudent.parentContact.motherName && (
              <div className="contact-item">
                <span className="contact-label">Mother: </span>
                <span className="contact-value">
                  {scannedStudent.parentContact.motherName} - {scannedStudent.parentContact.motherPhone}
                </span>
                <div style={{ marginTop: "5px" }}>
                  <Button
                    size="small"
                    onClick={() => callParent(scannedStudent.parentContact.motherPhone)}
                    style={{ marginRight: "5px", padding: "5px 10px", fontSize: "12px" }}
                  >
                    📞 Call
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => messageParent(scannedStudent.parentContact.motherPhone)}
                    style={{ padding: "5px 10px", fontSize: "12px" }}
                  >
                    💬 Message
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div>
            <h4>📝 Record Attendance</h4>
            <Select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              required
              style={{ marginBottom: "15px" }}
            >
              <option value="">Select Lab Session</option>
              {labSessions.map((session, index) => (
                <option key={index} value={session}>
                  {session}
                </option>
              ))}
            </Select>
          </div>

          <ActionButtons>
            <Button onClick={recordAttendance} disabled={!selectedSession || loading} style={{ flex: 1 }}>
              {loading ? "Recording..." : "✅ Record Attendance"}
            </Button>
            <Button variant="secondary" onClick={() => setScannedStudent(null)} style={{ flex: 1 }}>
              🔄 Scan Next
            </Button>
          </ActionButtons>
        </StudentProfile>
      )}
    </MobileContainer>
  )
}

export default MobileQRScanner
