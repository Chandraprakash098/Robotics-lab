"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { studentAPI, attendanceAPI, behaviorAPI } from "../../services/api";
import { Button, Card, Table, Badge } from "../../styles/GlobalStyles";
import styled, { keyframes } from "styled-components";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Main Container
const Container = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 50%,
        rgba(120, 119, 198, 0.3) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(255, 119, 198, 0.3) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 80%,
        rgba(120, 219, 226, 0.3) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
`;

// Header Section
const StudentHeader = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 30px 40px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  h2 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .header-buttons {
    display: flex;
    gap: 15px;
  }
`;

// Enhanced Buttons
const ModernButton = styled(Button)`
  background: ${(props) =>
    props.variant === "secondary"
      ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"};
  border: none;
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`;

// Tab System
const TabContainer = styled.div`
  margin-top: 30px;
  animation: ${fadeInUp} 1s ease-out 0.2s both;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  justify-content: center;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 15px 30px;
  border: none;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "rgba(255, 255, 255, 0.9)"};
  color: ${(props) => (props.active ? "white" : "#333")};
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
  box-shadow: ${(props) =>
    props.active
      ? "0 10px 30px rgba(102, 126, 234, 0.4)"
      : "0 5px 20px rgba(0, 0, 0, 0.1)"};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:not([active]):hover {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }
`;

// Grid Layout
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

// Enhanced Cards
const ModernCard = styled(Card)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.6s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg at 50% 50%,
      transparent 0deg,
      rgba(102, 126, 234, 0.1) 60deg,
      transparent 120deg
    );
    animation: rotate 8s linear infinite;
    opacity: 0;
    transition: opacity 0.3s;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);

    &::before {
      opacity: 1;
    }
  }

  h3 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 25px;
    position: relative;
    z-index: 1;
  }
`;

// Info Items
const InfoItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.05) 0%,
    rgba(118, 75, 162, 0.05) 100%
  );
  border-radius: 12px;
  border-left: 4px solid transparent;
  border-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateX(5px);
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.1) 0%,
      rgba(118, 75, 162, 0.1) 100%
    );
  }

  strong {
    display: block;
    color: #333;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  span {
    color: #555;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

// QR Code Section
const QRCardSection = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;

  .qr-preview {
    max-width: 200px;
    margin: 20px auto;
    background: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    animation: ${float} 3s ease-in-out infinite;

    &:hover {
      transform: scale(1.05);
      animation-play-state: paused;
    }

    img {
      width: 100%;
      border-radius: 12px;
    }

    p {
      margin: 15px 0 0 0;
      font-size: 0.9rem;
      color: #666;
      font-weight: 500;
    }
  }

  .qr-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .instructions {
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.1) 0%,
      rgba(118, 75, 162, 0.1) 100%
    );
    border-radius: 16px;
    padding: 20px;
    margin-top: 25px;
    border: 1px solid rgba(102, 126, 234, 0.2);
    position: relative;

    &::before {
      content: "💡";
      font-size: 1.5rem;
      position: absolute;
      top: -15px;
      left: 20px;
      background: white;
      padding: 5px 10px;
      border-radius: 50%;
      animation: ${pulse} 2s infinite;
    }
  }
`;

// Enhanced Table
const ModernTable = styled(Table)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  thead {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

    th {
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 20px 15px;
      font-size: 0.9rem;
    }
  }

  tbody {
    tr {
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(
          135deg,
          rgba(102, 126, 234, 0.05) 0%,
          rgba(118, 75, 162, 0.05) 100%
        );
        transform: scale(1.01);
      }

      td {
        padding: 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

// Enhanced Badge
const ModernBadge = styled(Badge)`
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

// Loading Component
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  flex-direction: column;
  gap: 20px;

  .spinner {
    width: 60px;
    height: 60px;
    border: 6px solid rgba(102, 126, 234, 0.1);
    border-top: 6px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  p {
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [behaviors, setBehaviors] = useState([]);
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  const fetchStudentData = async () => {
    try {
      const [studentRes, attendanceRes, behaviorRes] = await Promise.all([
        studentAPI.getById(id),
        attendanceAPI.getByStudent(id, { limit: 10 }),
        behaviorAPI.getAll({ studentId: id, limit: 10 }),
      ]);

      setStudent(studentRes.data);
      setAttendance(attendanceRes.data.attendance || []);
      setBehaviors(behaviorRes.data.reports || []);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintCard = () => {
    navigate(`/students/${id}/card`);
  };

  const handleDownloadQR = () => {
    if (!student?.qrCode) return;

    const link = document.createElement("a");
    link.href = student.qrCode;
    link.download = `${student.studentId}_qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div className="spinner"></div>
          <p>Loading student details...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (!student) {
    return (
      <Container>
        <LoadingContainer>
          <p>Student not found</p>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        <StudentHeader>
          <h2>
            {student.personalDetails.firstName}{" "}
            {student.personalDetails.lastName}
          </h2>
          <div className="header-buttons">
            <ModernButton
              variant="secondary"
              onClick={() => navigate("/students")}
            >
              ← Back to Students
            </ModernButton>
            {/* <ModernButton onClick={() => navigate(`/students/${id}/edit`)}>
              ✏️ Edit Student
            </ModernButton> */}
          </div>
        </StudentHeader>

        <TabContainer>
          <TabButtons>
            <TabButton
              active={activeTab === "info"}
              onClick={() => setActiveTab("info")}
            >
              📋 Student Information
            </TabButton>
            <TabButton
              active={activeTab === "attendance"}
              onClick={() => setActiveTab("attendance")}
            >
              📅 Attendance History
            </TabButton>
            <TabButton
              active={activeTab === "behavior"}
              onClick={() => setActiveTab("behavior")}
            >
              📊 Behavior Reports
            </TabButton>
          </TabButtons>

          {activeTab === "info" && (
            <InfoGrid>
              <ModernCard>
                <h3>👤 Personal Details</h3>
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
                  <span>
                    {new Date(
                      student.personalDetails.dateOfBirth
                    ).toLocaleDateString()}
                  </span>
                </InfoItem>
                <InfoItem>
                  <strong>Gender:</strong>
                  <span>{student.personalDetails.gender}</span>
                </InfoItem>
              </ModernCard>

              <ModernCard>
                <h3>🎓 Academic Information</h3>
                <InfoItem>
                  <strong>Class:</strong>
                  <span>{student.academicRecords.class}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Section:</strong>
                  <span>{student.academicRecords.section}</span>
                </InfoItem>
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
                  <span>
                    {new Date(
                      student.academicRecords.enrollmentDate
                    ).toLocaleDateString()}
                  </span>
                </InfoItem>
              </ModernCard>

              <ModernCard>
                <h3>👨‍👩‍👧‍👦 Parent Contact</h3>
                <InfoItem>
                  <strong>Father:</strong>
                  <span>
                    {student.parentContact.fatherName} -{" "}
                    {student.parentContact.fatherPhone}
                  </span>
                </InfoItem>
                <InfoItem>
                  <strong>Mother:</strong>
                  <span>
                    {student.parentContact.motherName} -{" "}
                    {student.parentContact.motherPhone}
                  </span>
                </InfoItem>
                {student.parentContact.guardianName && (
                  <InfoItem>
                    <strong>Guardian:</strong>
                    <span>
                      {student.parentContact.guardianName} -{" "}
                      {student.parentContact.guardianPhone}
                    </span>
                  </InfoItem>
                )}
              </ModernCard>

              <ModernCard>
                <h3>🎫 Student ID Card & QR Code</h3>
                <QRCardSection>
                  {student.qrCode ? (
                    <div>
                      <div className="qr-preview">
                        <img
                          src={student.qrCode || "/placeholder.svg"}
                          alt="Student QR Code"
                        />
                        <p>Student QR Code</p>
                      </div>

                      <div className="qr-actions">
                        <ModernButton onClick={handlePrintCard}>
                          🖨️ Print ID Card
                        </ModernButton>
                        <ModernButton
                          variant="secondary"
                          onClick={handleDownloadQR}
                        >
                          📥 Download QR
                        </ModernButton>
                        <ModernButton
                          variant="secondary"
                          onClick={() => window.open(student.qrCode)}
                        >
                          🔍 View Full Size
                        </ModernButton>
                      </div>

                      <div className="instructions">
                        <p
                          style={{
                            fontSize: "0.95rem",
                            color: "#555",
                            marginTop: "25px",
                            lineHeight: "1.6",
                          }}
                        >
                          <strong>Instructions:</strong> Print the ID card and
                          give it to the student. When they come to class, scan
                          their QR code to view their profile and record
                          attendance.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p>QR code not available</p>
                  )}
                </QRCardSection>
              </ModernCard>
            </InfoGrid>
          )}

          {activeTab === "attendance" && (
            <ModernCard>
              <h3>📅 Attendance History</h3>
              {attendance.length > 0 ? (
                <ModernTable>
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
                        <td>
                          {record.timeOut
                            ? new Date(record.timeOut).toLocaleTimeString()
                            : "N/A"}
                        </td>
                        <td>{record.labSession}</td>
                        <td>
                          <ModernBadge variant="success">
                            {record.status}
                          </ModernBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </ModernTable>
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "1.1rem",
                    padding: "40px",
                  }}
                >
                  No attendance records found
                </p>
              )}
            </ModernCard>
          )}

          {activeTab === "behavior" && (
            <ModernCard>
              <h3>📊 Behavior Reports</h3>
              {behaviors.length > 0 ? (
                <ModernTable>
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
                        <td>
                          {new Date(report.reportDate).toLocaleDateString()}
                        </td>
                        <td>
                          <ModernBadge
                            variant={
                              report.behaviorType === "positive"
                                ? "success"
                                : "danger"
                            }
                          >
                            {report.behaviorType}
                          </ModernBadge>
                        </td>
                        <td>{report.category}</td>
                        <td>{report.title}</td>
                        <td>
                          <ModernBadge
                            variant={
                              report.severity === "high" ? "danger" : "warning"
                            }
                          >
                            {report.severity}
                          </ModernBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </ModernTable>
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "1.1rem",
                    padding: "40px",
                  }}
                >
                  No behavior reports found
                </p>
              )}
            </ModernCard>
          )}
        </TabContainer>
      </ContentWrapper>
    </Container>
  );
};

export default StudentDetail;
