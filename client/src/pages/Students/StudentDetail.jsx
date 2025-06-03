


// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { studentAPI, attendanceAPI, behaviorAPI } from "../../services/api"
// import { Button, Card, Table, Badge } from "../../styles/GlobalStyles"
// import styled from "styled-components"

// const StudentHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 30px;
// `

// const InfoGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 20px;
//   margin-bottom: 30px;
// `

// const InfoItem = styled.div`
//   margin-bottom: 15px;
  
//   strong {
//     display: block;
//     color: #333;
//     margin-bottom: 5px;
//   }
  
//   span {
//     color: #666;
//   }
// `

// const TabContainer = styled.div`
//   margin-top: 30px;
// `

// const TabButtons = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-bottom: 20px;
// `

// const TabButton = styled.button`
//   padding: 10px 20px;
//   border: 1px solid #ddd;
//   background: ${(props) => (props.active ? "#007bff" : "white")};
//   color: ${(props) => (props.active ? "white" : "#333")};
//   border-radius: 4px;
//   cursor: pointer;
  
//   &:hover {
//     background: ${(props) => (props.active ? "#0056b3" : "#f8f9fa")};
//   }
// `

// const StudentDetail = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [student, setStudent] = useState(null)
//   const [attendance, setAttendance] = useState([])
//   const [behaviors, setBehaviors] = useState([])
//   const [activeTab, setActiveTab] = useState("info")
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchStudentData()
//   }, [id])

//   const fetchStudentData = async () => {
//     try {
//       const [studentRes, attendanceRes, behaviorRes] = await Promise.all([
//         studentAPI.getById(id),
//         attendanceAPI.getByStudent(id, { limit: 10 }),
//         behaviorAPI.getAll({ studentId: id, limit: 10 }),
//       ])

//       setStudent(studentRes.data)
//       setAttendance(attendanceRes.data.attendance || [])
//       setBehaviors(behaviorRes.data.reports || [])
//     } catch (error) {
//       console.error("Error fetching student data:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return <div>Loading student details...</div>
//   }

//   if (!student) {
//     return <div>Student not found</div>
//   }

//   return (
//     <div>
//       <StudentHeader>
//         <h2>
//           {student.personalDetails.firstName} {student.personalDetails.lastName}
//         </h2>
//         <div>
//           <Button variant="secondary" onClick={() => navigate("/students")} style={{ marginRight: "10px" }}>
//             Back to Students
//           </Button>
//           <Button onClick={() => navigate(`/students/${id}/edit`)}>Edit Student</Button>
//         </div>
//       </StudentHeader>

//       <TabContainer>
//         <TabButtons>
//           <TabButton active={activeTab === "info"} onClick={() => setActiveTab("info")}>
//             Student Information
//           </TabButton>
//           <TabButton active={activeTab === "attendance"} onClick={() => setActiveTab("attendance")}>
//             Attendance History
//           </TabButton>
//           <TabButton active={activeTab === "behavior"} onClick={() => setActiveTab("behavior")}>
//             Behavior Reports
//           </TabButton>
//         </TabButtons>

//         {activeTab === "info" && (
//           <InfoGrid>
//             <Card>
//               <h3>Personal Details</h3>
//               <InfoItem>
//                 <strong>Student ID:</strong>
//                 <span>{student.studentId}</span>
//               </InfoItem>
//               <InfoItem>
//                 <strong>Email:</strong>
//                 <span>{student.personalDetails.email}</span>
//               </InfoItem>
//               <InfoItem>
//                 <strong>Phone:</strong>
//                 <span>{student.personalDetails.phone}</span>
//               </InfoItem>
//               <InfoItem>
//                 <strong>Date of Birth:</strong>
//                 <span>{new Date(student.personalDetails.dateOfBirth).toLocaleDateString()}</span>
//               </InfoItem>
//               <InfoItem>
//                 <strong>Gender:</strong>
//                 <span>{student.personalDetails.gender}</span>
//               </InfoItem>
//             </Card>

//             <Card>
//               <h3>Academic Information</h3>
//               <InfoItem>
//                 <strong>Grade:</strong>
//                 <span>{student.academicRecords.grade}</span>
//               </InfoItem>
//               <InfoItem>
//                 <strong>GPA:</strong>
//                 <span>{student.academicRecords.gpa || "N/A"}</span>
//               </InfoItem>
//               <InfoItem>
//                 <strong>Enrollment Date:</strong>
//                 <span>{new Date(student.academicRecords.enrollmentDate).toLocaleDateString()}</span>
//               </InfoItem>
//             </Card>

//             <Card>
//               <h3>Parent Contact</h3>
//               <InfoItem>
//                 <strong>Father:</strong>
//                 <span>
//                   {student.parentContact.fatherName} - {student.parentContact.fatherPhone}
//                 </span>
//               </InfoItem>
//               <InfoItem>
//                 <strong>Mother:</strong>
//                 <span>
//                   {student.parentContact.motherName} - {student.parentContact.motherPhone}
//                 </span>
//               </InfoItem>
//               {student.parentContact.guardianName && (
//                 <InfoItem>
//                   <strong>Guardian:</strong>
//                   <span>
//                     {student.parentContact.guardianName} - {student.parentContact.guardianPhone}
//                   </span>
//                 </InfoItem>
//               )}
//             </Card>

//             <Card>
//               <h3>Student QR Code</h3>
//               {student.qrCode ? (
//                 <div style={{ textAlign: "center", marginTop: "15px" }}>
//                   <img src={student.qrCode || "/placeholder.svg"} alt="Student QR Code" style={{ maxWidth: "200px" }} />
//                   <div style={{ marginTop: "10px" }}>
//                     <Button onClick={() => window.open(student.qrCode)}>View Full Size</Button>
//                     <Button
//                       variant="secondary"
//                       onClick={() => {
//                         const link = document.createElement("a")
//                         link.href = student.qrCode
//                         link.download = `${student.studentId}_qrcode.png`
//                         document.body.appendChild(link)
//                         link.click()
//                         document.body.removeChild(link)
//                       }}
//                       style={{ marginLeft: "10px" }}
//                     >
//                       Download QR
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <p>QR code not available</p>
//               )}
//             </Card>
//           </InfoGrid>
//         )}

//         {activeTab === "attendance" && (
//           <Card>
//             <h3>Attendance History</h3>
//             {attendance.length > 0 ? (
//               <Table>
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Time In</th>
//                     <th>Time Out</th>
//                     <th>Lab Session</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {attendance.map((record) => (
//                     <tr key={record._id}>
//                       <td>{new Date(record.date).toLocaleDateString()}</td>
//                       <td>{new Date(record.timeIn).toLocaleTimeString()}</td>
//                       <td>{record.timeOut ? new Date(record.timeOut).toLocaleTimeString() : "N/A"}</td>
//                       <td>{record.labSession}</td>
//                       <td>
//                         <Badge variant="success">{record.status}</Badge>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             ) : (
//               <p>No attendance records found</p>
//             )}
//           </Card>
//         )}

//         {activeTab === "behavior" && (
//           <Card>
//             <h3>Behavior Reports</h3>
//             {behaviors.length > 0 ? (
//               <Table>
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Type</th>
//                     <th>Category</th>
//                     <th>Title</th>
//                     <th>Severity</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {behaviors.map((report) => (
//                     <tr key={report._id}>
//                       <td>{new Date(report.reportDate).toLocaleDateString()}</td>
//                       <td>
//                         <Badge variant={report.behaviorType === "positive" ? "success" : "danger"}>
//                           {report.behaviorType}
//                         </Badge>
//                       </td>
//                       <td>{report.category}</td>
//                       <td>{report.title}</td>
//                       <td>
//                         <Badge variant={report.severity === "high" ? "danger" : "warning"}>{report.severity}</Badge>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             ) : (
//               <p>No behavior reports found</p>
//             )}
//           </Card>
//         )}
//       </TabContainer>
//     </div>
//   )
// }

// export default StudentDetail



"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { studentAPI, attendanceAPI, behaviorAPI } from "../../services/api"
import { Button, Card, Table, Badge } from "../../styles/GlobalStyles"
import styled from "styled-components"

const StudentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`

const InfoItem = styled.div`
  margin-bottom: 15px;
  
  strong {
    display: block;
    color: #333;
    margin-bottom: 5px;
  }
  
  span {
    color: #666;
  }
`

const TabContainer = styled.div`
  margin-top: 30px;
`

const TabButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`

const TabButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: ${(props) => (props.active ? "#007bff" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: ${(props) => (props.active ? "#0056b3" : "#f8f9fa")};
  }
`

const QRCardSection = styled.div`
  text-align: center;
  
  .qr-preview {
    max-width: 200px;
    margin: 15px auto;
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    background: white;
  }
  
  .qr-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 15px;
  }
`

const StudentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [attendance, setAttendance] = useState([])
  const [behaviors, setBehaviors] = useState([])
  const [activeTab, setActiveTab] = useState("info")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudentData()
  }, [id])

  const fetchStudentData = async () => {
    try {
      const [studentRes, attendanceRes, behaviorRes] = await Promise.all([
        studentAPI.getById(id),
        attendanceAPI.getByStudent(id, { limit: 10 }),
        behaviorAPI.getAll({ studentId: id, limit: 10 }),
      ])

      setStudent(studentRes.data)
      setAttendance(attendanceRes.data.attendance || [])
      setBehaviors(behaviorRes.data.reports || [])
    } catch (error) {
      console.error("Error fetching student data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrintCard = () => {
    navigate(`/students/${id}/card`)
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
    return <div>Loading student details...</div>
  }

  if (!student) {
    return <div>Student not found</div>
  }

  return (
    <div>
      <StudentHeader>
        <h2>
          {student.personalDetails.firstName} {student.personalDetails.lastName}
        </h2>
        <div>
          <Button variant="secondary" onClick={() => navigate("/students")} style={{ marginRight: "10px" }}>
            Back to Students
          </Button>
          <Button onClick={() => navigate(`/students/${id}/edit`)}>Edit Student</Button>
        </div>
      </StudentHeader>

      <TabContainer>
        <TabButtons>
          <TabButton active={activeTab === "info"} onClick={() => setActiveTab("info")}>
            Student Information
          </TabButton>
          <TabButton active={activeTab === "attendance"} onClick={() => setActiveTab("attendance")}>
            Attendance History
          </TabButton>
          <TabButton active={activeTab === "behavior"} onClick={() => setActiveTab("behavior")}>
            Behavior Reports
          </TabButton>
        </TabButtons>

        {activeTab === "info" && (
          <InfoGrid>
            <Card>
              <h3>Personal Details</h3>
              <InfoItem>
                <strong>Student ID:</strong>
                <span>{student.studentId}</span>
              </InfoItem>
              <InfoItem>
                <strong>Email:</strong>
                <span>{student.personalDetails.email}</span>
              </InfoItem>
              <InfoItem>
                <strong>Phone:</strong>
                <span>{student.personalDetails.phone}</span>
              </InfoItem>
              <InfoItem>
                <strong>Date of Birth:</strong>
                <span>{new Date(student.personalDetails.dateOfBirth).toLocaleDateString()}</span>
              </InfoItem>
              <InfoItem>
                <strong>Gender:</strong>
                <span>{student.personalDetails.gender}</span>
              </InfoItem>
            </Card>

            <Card>
              <h3>Academic Information</h3>
              <InfoItem>
                <strong>Grade:</strong>
                <span>{student.academicRecords.grade}</span>
              </InfoItem>
              <InfoItem>
                <strong>GPA:</strong>
                <span>{student.academicRecords.gpa || "N/A"}</span>
              </InfoItem>
              <InfoItem>
                <strong>Enrollment Date:</strong>
                <span>{new Date(student.academicRecords.enrollmentDate).toLocaleDateString()}</span>
              </InfoItem>
            </Card>

            <Card>
              <h3>Parent Contact</h3>
              <InfoItem>
                <strong>Father:</strong>
                <span>
                  {student.parentContact.fatherName} - {student.parentContact.fatherPhone}
                </span>
              </InfoItem>
              <InfoItem>
                <strong>Mother:</strong>
                <span>
                  {student.parentContact.motherName} - {student.parentContact.motherPhone}
                </span>
              </InfoItem>
              {student.parentContact.guardianName && (
                <InfoItem>
                  <strong>Guardian:</strong>
                  <span>
                    {student.parentContact.guardianName} - {student.parentContact.guardianPhone}
                  </span>
                </InfoItem>
              )}
            </Card>

            <Card>
              <h3>🎫 Student ID Card & QR Code</h3>
              <QRCardSection>
                {student.qrCode ? (
                  <div>
                    <div className="qr-preview">
                      <img src={student.qrCode || "/placeholder.svg"} alt="Student QR Code" style={{ width: "100%" }} />
                      <p style={{ margin: "10px 0 0 0", fontSize: "12px", color: "#666" }}>Student QR Code</p>
                    </div>

                    <div className="qr-actions">
                      <Button onClick={handlePrintCard}>🖨️ Print ID Card</Button>
                      <Button variant="secondary" onClick={handleDownloadQR}>
                        📥 Download QR
                      </Button>
                      <Button variant="secondary" onClick={() => window.open(student.qrCode)}>
                        🔍 View Full Size
                      </Button>
                    </div>

                    <p style={{ fontSize: "12px", color: "#666", marginTop: "15px" }}>
                      💡 <strong>Instructions:</strong> Print the ID card and give it to the student. When they come to
                      class, scan their QR code to view their profile and record attendance.
                    </p>
                  </div>
                ) : (
                  <p>QR code not available</p>
                )}
              </QRCardSection>
            </Card>
          </InfoGrid>
        )}

        {activeTab === "attendance" && (
          <Card>
            <h3>Attendance History</h3>
            {attendance.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time In</th>
                    <th>Time Out</th>
                    <th>Lab Session</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr key={record._id}>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                      <td>{new Date(record.timeIn).toLocaleTimeString()}</td>
                      <td>{record.timeOut ? new Date(record.timeOut).toLocaleTimeString() : "N/A"}</td>
                      <td>{record.labSession}</td>
                      <td>
                        <Badge variant="success">{record.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No attendance records found</p>
            )}
          </Card>
        )}

        {activeTab === "behavior" && (
          <Card>
            <h3>Behavior Reports</h3>
            {behaviors.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Title</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {behaviors.map((report) => (
                    <tr key={report._id}>
                      <td>{new Date(report.reportDate).toLocaleDateString()}</td>
                      <td>
                        <Badge variant={report.behaviorType === "positive" ? "success" : "danger"}>
                          {report.behaviorType}
                        </Badge>
                      </td>
                      <td>{report.category}</td>
                      <td>{report.title}</td>
                      <td>
                        <Badge variant={report.severity === "high" ? "danger" : "warning"}>{report.severity}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No behavior reports found</p>
            )}
          </Card>
        )}
      </TabContainer>
    </div>
  )
}

export default StudentDetail
