// "use client"

// import { useState, useRef } from "react"
// import { qrAPI } from "../../services/api"
// import { Button, Card } from "../../styles/GlobalStyles"
// import styled from "styled-components"

// const ScannerContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 20px;
// `

// const VideoContainer = styled.div`
//   width: 100%;
//   max-width: 500px;
//   position: relative;
  
//   video {
//     width: 100%;
//     border-radius: 8px;
//   }
// `

// const FileInput = styled.input`
//   margin-bottom: 20px;
// `

// const StudentInfo = styled(Card)`
//   width: 100%;
//   max-width: 500px;
//   text-align: center;
  
//   h3 {
//     color: #007bff;
//     margin-bottom: 15px;
//   }
  
//   .student-details {
//     text-align: left;
//     margin-top: 20px;
    
//     div {
//       margin-bottom: 10px;
      
//       strong {
//         display: inline-block;
//         width: 120px;
//         color: #333;
//       }
//     }
//   }
// `

// const QRScanner = () => {
//   const [scannedStudent, setScannedStudent] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const fileInputRef = useRef(null)

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0]
//     if (!file) return

//     setLoading(true)
//     setError("")

//     try {
//       // Create a canvas to read the QR code from the image
//       const canvas = document.createElement("canvas")
//       const ctx = canvas.getContext("2d")
//       const img = new Image()

//       img.onload = async () => {
//         canvas.width = img.width
//         canvas.height = img.height
//         ctx.drawImage(img, 0, 0)

//         // For demo purposes, we'll simulate QR code scanning
//         // In a real app, you'd use a QR code library like jsQR
//         const mockQRData = JSON.stringify({
//           studentId: "STU001",
//           timestamp: Date.now(),
//         })

//         try {
//           const response = await qrAPI.scan(mockQRData)
//           setScannedStudent(response.data.student)
//         } catch (error) {
//           setError("Invalid QR code or student not found")
//         }
//       }

//       img.src = URL.createObjectURL(file)
//     } catch (error) {
//       setError("Error processing QR code")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleManualInput = async () => {
//     const qrData = prompt("Enter QR code data:")
//     if (!qrData) return

//     setLoading(true)
//     setError("")

//     try {
//       const response = await qrAPI.scan(qrData)
//       setScannedStudent(response.data.student)
//     } catch (error) {
//       setError("Invalid QR code or student not found")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const recordAttendance = async () => {
//     if (!scannedStudent) return

//     try {
//       const attendanceData = {
//         studentId: scannedStudent._id,
//         labSession: prompt("Enter lab session:") || "General Lab",
//         notes: "Recorded via QR scan",
//       }

//       await fetch("http://localhost:5000/api/attendance/record", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(attendanceData),
//       })

//       alert("Attendance recorded successfully!")
//       setScannedStudent(null)
//     } catch (error) {
//       alert("Error recording attendance")
//     }
//   }

//   return (
//     <div>
//       <h2 style={{ textAlign: "center", marginBottom: "30px" }}>QR Code Scanner</h2>

//       <ScannerContainer>
//         <Card style={{ textAlign: "center", width: "100%", maxWidth: "500px" }}>
//           <h3>Scan QR Code</h3>
//           <p>Upload an image containing a QR code or enter QR data manually</p>

//           <FileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} />

//           <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
//             <Button onClick={() => fileInputRef.current?.click()}>Upload QR Image</Button>
//             <Button variant="secondary" onClick={handleManualInput}>
//               Manual Input
//             </Button>
//           </div>

//           {loading && <p>Processing QR code...</p>}
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </Card>

//         {scannedStudent && (
//           <StudentInfo>
//             <h3>Student Found!</h3>
//             <div className="student-details">
//               <div>
//                 <strong>Name:</strong>
//                 {scannedStudent.personalDetails.firstName} {scannedStudent.personalDetails.lastName}
//               </div>
//               <div>
//                 <strong>Student ID:</strong>
//                 {scannedStudent.studentId}
//               </div>
//               <div>
//                 <strong>Email:</strong>
//                 {scannedStudent.personalDetails.email}
//               </div>
//               <div>
//                 <strong>Grade:</strong>
//                 {scannedStudent.academicRecords.grade}
//               </div>
//             </div>

//             <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
//               <Button onClick={recordAttendance}>Record Attendance</Button>
//               <Button variant="secondary" onClick={() => setScannedStudent(null)}>
//                 Clear
//               </Button>
//             </div>
//           </StudentInfo>
//         )}
//       </ScannerContainer>
//     </div>
//   )
// }

// export default QRScanner


"use client"

import { useState, useRef, useEffect } from "react"
import { attendanceAPI, studentAPI } from "../../services/api"
import { Button, Card, Select } from "../../styles/GlobalStyles"
import styled from "styled-components"

const ScannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const VideoContainer = styled.div`
  width: 100%;
  max-width: 500px;
  position: relative;
  
  video {
    width: 100%;
    border-radius: 8px;
  }
`

const FileInput = styled.input`
  margin-bottom: 20px;
`

const StudentInfo = styled(Card)`
  width: 100%;
  max-width: 500px;
  text-align: center;
  
  h3 {
    color: #007bff;
    margin-bottom: 15px;
  }
  
  .student-details {
    text-align: left;
    margin-top: 20px;
    
    div {
      margin-bottom: 10px;
      
      strong {
        display: inline-block;
        width: 120px;
        color: #333;
      }
    }
  }
`

const QRScanner = () => {
  const [scannedStudent, setScannedStudent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [labSessions, setLabSessions] = useState(["Morning Lab", "Afternoon Lab", "Evening Lab", "Special Session"])
  const [selectedSession, setSelectedSession] = useState("")
  const fileInputRef = useRef(null)

  useEffect(() => {
    // If we have a student selected, default to the first lab session
    if (scannedStudent && !selectedSession) {
      setSelectedSession(labSessions[0])
    }
  }, [scannedStudent])

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setLoading(true)
    setError("")

    try {
      // In a real implementation, you would use a library to read the QR code
      // For now, we'll simulate by looking up a student directly

      // Simulate QR code scanning by getting the first student
      const studentsResponse = await studentAPI.getAll({ limit: 1 })
      if (studentsResponse.data.students && studentsResponse.data.students.length > 0) {
        setScannedStudent(studentsResponse.data.students[0])
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
    const studentId = prompt("Enter student ID:")
    if (!studentId) return

    setLoading(true)
    setError("")

    try {
      // In a real implementation, you would scan the QR and extract the student ID
      // Here we're simulating by searching for students
      const studentsResponse = await studentAPI.getAll({ search: studentId })

      if (studentsResponse.data.students && studentsResponse.data.students.length > 0) {
        setScannedStudent(studentsResponse.data.students[0])
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
        notes: "Recorded via QR scan",
      }

      await attendanceAPI.record(attendanceData)
      alert("Attendance recorded successfully!")
      setScannedStudent(null)
      setSelectedSession("")
    } catch (error) {
      console.error("Error recording attendance:", error)
      alert("Error recording attendance: " + (error.response?.data?.message || "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>QR Code Scanner</h2>

      <ScannerContainer>
        <Card style={{ textAlign: "center", width: "100%", maxWidth: "500px" }}>
          <h3>Scan QR Code</h3>
          <p>Upload an image containing a QR code or enter student ID manually</p>

          <FileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} />

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button onClick={() => fileInputRef.current?.click()}>Upload QR Image</Button>
            <Button variant="secondary" onClick={handleManualInput}>
              Manual Input
            </Button>
          </div>

          {loading && <p>Processing...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Card>

        {scannedStudent && (
          <StudentInfo>
            <h3>Student Found!</h3>
            <div className="student-details">
              <div>
                <strong>Name:</strong>
                {scannedStudent.personalDetails.firstName} {scannedStudent.personalDetails.lastName}
              </div>
              <div>
                <strong>Student ID:</strong>
                {scannedStudent.studentId}
              </div>
              <div>
                <strong>Email:</strong>
                {scannedStudent.personalDetails.email}
              </div>
              <div>
                <strong>Grade:</strong>
                {scannedStudent.academicRecords.grade}
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h4>Record Attendance</h4>
              <Select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)} required>
                <option value="">Select Lab Session</option>
                {labSessions.map((session, index) => (
                  <option key={index} value={session}>
                    {session}
                  </option>
                ))}
              </Select>
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <Button onClick={recordAttendance} disabled={!selectedSession || loading}>
                {loading ? "Recording..." : "Record Attendance"}
              </Button>
              <Button variant="secondary" onClick={() => setScannedStudent(null)}>
                Cancel
              </Button>
            </div>
          </StudentInfo>
        )}
      </ScannerContainer>
    </div>
  )
}

export default QRScanner

