"use client"

import { useState, useEffect } from "react"
import { parentAPI, studentAPI } from "../../services/api"
import { Button, Input, Select, TextArea, Table, Card, Modal, ModalContent, Badge } from "../../styles/GlobalStyles"
import styled from "styled-components"

const CommunicationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const ParentCommunication = () => {
  const [communications, setCommunications] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    studentId: "",
    communicationType: "email",
    subject: "",
    message: "",
    recipientType: "all",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [communicationsRes, studentsRes] = await Promise.all([
        parentAPI.getCommunications(),
        studentAPI.getAll({ limit: 100 }),
      ])

      setCommunications(communicationsRes.data.communications)
      setStudents(studentsRes.data.students)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await parentAPI.sendCommunication(formData)
      setShowModal(false)
      setFormData({
        studentId: "",
        communicationType: "email",
        subject: "",
        message: "",
        recipientType: "all",
      })
      fetchData()
      alert("Communication sent successfully!")
    } catch (error) {
      console.error("Error sending communication:", error)
      alert(error.response?.data?.message || "Error sending communication")
    }
  }

  if (loading) {
    return <div>Loading communications...</div>
  }

  return (
    <div>
      <CommunicationHeader>
        <h2>Parent Communication</h2>
        <Button onClick={() => setShowModal(true)}>Send Communication</Button>
      </CommunicationHeader>

      <Card>
        <h3>Communication History</h3>
        {communications.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Type</th>
                <th>Subject</th>
                <th>Recipients</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {communications.map((comm) => (
                <tr key={comm._id}>
                  <td>{new Date(comm.sentDate).toLocaleDateString()}</td>
                  <td>
                    {comm.studentId?.personalDetails?.firstName} {comm.studentId?.personalDetails?.lastName}
                  </td>
                  <td>{comm.communicationType}</td>
                  <td>{comm.subject}</td>
                  <td>{comm.recipientType}</td>
                  <td>
                    <Badge
                      variant={
                        comm.status === "delivered" ? "success" : comm.status === "failed" ? "danger" : "warning"
                      }
                    >
                      {comm.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No communications found</p>
        )}
      </Card>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Send Communication</h3>
            <form onSubmit={handleSubmit}>
              <Select
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                required
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.personalDetails.firstName} {student.personalDetails.lastName} - {student.studentId}
                  </option>
                ))}
              </Select>

              <Select
                value={formData.communicationType}
                onChange={(e) => setFormData({ ...formData, communicationType: e.target.value })}
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="call">Call</option>
                <option value="meeting">Meeting</option>
              </Select>

              <Select
                value={formData.recipientType}
                onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
              >
                <option value="all">All Parents</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="guardian">Guardian</option>
              </Select>

              <Input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />

              <TextArea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send Communication</Button>
              </div>
            </form>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}

export default ParentCommunication
