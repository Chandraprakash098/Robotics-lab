"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { studentAPI } from "../../services/api"
import { Button } from "../../styles/GlobalStyles"
import styled from "styled-components"

const PrintableCard = styled.div`
  width: 85.6mm;
  height: 53.98mm;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 8mm;
  margin: 20px auto;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: Arial, sans-serif;
  
  @media print {
    margin: 0;
    border: 1px solid #000;
  }
`

const CardHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  margin-bottom: 8px;
  
  h3 {
    margin: 0;
    font-size: 14px;
    color: #333;
  }
  
  p {
    margin: 2px 0;
    font-size: 10px;
    color: #666;
  }
`

const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`

const StudentInfo = styled.div`
  flex: 1;
  
  .name {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 3px;
    color: #333;
  }
  
  .id {
    font-size: 10px;
    color: #666;
    margin-bottom: 2px;
  }
  
  .grade {
    font-size: 10px;
    color: #666;
  }
`

const QRSection = styled.div`
  text-align: center;
  
  img {
    width: 60px;
    height: 60px;
    border: 1px solid #ddd;
  }
  
  .qr-label {
    font-size: 8px;
    color: #666;
    margin-top: 2px;
  }
`

const CardFooter = styled.div`
  text-align: center;
  border-top: 1px solid #ddd;
  padding-top: 3px;
  margin-top: 5px;
  
  .instructions {
    font-size: 8px;
    color: #666;
  }
`

const PrintControls = styled.div`
  text-align: center;
  margin: 20px 0;
  
  @media print {
    display: none;
  }
`

const StudentQRCard = () => {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudent()
  }, [id])

  const fetchStudent = async () => {
    try {
      const response = await studentAPI.getById(id)
      setStudent(response.data)
    } catch (error) {
      console.error("Error fetching student:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadQR = () => {
    if (!student?.qrCode) return

    const link = document.createElement("a")
    link.href = student.qrCode
    link.download = `${student.studentId}_qrcode.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return <div>Loading student card...</div>
  }

  if (!student) {
    return <div>Student not found</div>
  }

  return (
    <div>
      <PrintControls>
        <h2>Student ID Card</h2>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button onClick={handlePrint}>Print Card</Button>
          <Button variant="secondary" onClick={handleDownloadQR}>
            Download QR Only
          </Button>
        </div>
      </PrintControls>

      <PrintableCard>
        <CardHeader>
          <h3>ROBOTICS LAB</h3>
          <p>Student Identification Card</p>
        </CardHeader>

        <CardBody>
          <StudentInfo>
            <div className="name">
              {student.personalDetails.firstName} {student.personalDetails.lastName}
            </div>
            <div className="id">ID: {student.studentId}</div>
            <div className="grade">Grade: {student.academicRecords.grade}</div>
          </StudentInfo>

          <QRSection>
            <img src={student.qrCode || "/placeholder.svg"} alt="Student QR Code" />
            <div className="qr-label">SCAN ME</div>
          </QRSection>
        </CardBody>

        <CardFooter>
          <div className="instructions">Present this card to faculty for attendance and lab access</div>
        </CardFooter>
      </PrintableCard>
    </div>
  )
}

export default StudentQRCard
