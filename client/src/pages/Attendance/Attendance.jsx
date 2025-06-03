"use client"

import { useState, useEffect } from "react"
import { attendanceAPI, studentAPI } from "../../services/api"
import { Button, Input, Select, Table, Card, Modal, ModalContent } from "../../styles/GlobalStyles"
import styled from "styled-components"

const AttendanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    studentId: "",
    labSession: "",
    notes: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [attendanceRes, studentsRes] = await Promise.all([
        attendanceAPI.getToday(),
        studentAPI.getAll({ limit: 100 }),
      ])

      setAttendanceRecords(attendanceRes.data)
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
      await attendanceAPI.record(formData)
      setShowModal(false)
      setFormData({ studentId: "", labSession: "", notes: "" })
      fetchData()
    } catch (error) {
      console.error("Error recording attendance:", error)
      alert(error.response?.data?.message || "Error recording attendance")
    }
  }

  const handleTimeOut = async (attendanceId) => {
    try {
      await attendanceAPI.recordTimeOut({ attendanceId })
      fetchData()
    } catch (error) {
      console.error("Error recording time out:", error)
    }
  }

  if (loading) {
    return <div>Loading attendance...</div>
  }

  return (
    <div>
      <AttendanceHeader>
        <h2>Attendance Management</h2>
        <Button onClick={() => setShowModal(true)}>Record Attendance</Button>
      </AttendanceHeader>

      <Card>
        <h3>Today's Attendance</h3>
        {attendanceRecords.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Lab Session</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record._id}>
                  <td>
                    {record.studentId?.personalDetails?.firstName} {record.studentId?.personalDetails?.lastName}
                  </td>
                  <td>{record.studentId?.studentId}</td>
                  <td>{record.labSession}</td>
                  <td>{new Date(record.timeIn).toLocaleTimeString()}</td>
                  <td>{record.timeOut ? new Date(record.timeOut).toLocaleTimeString() : "Not recorded"}</td>
                  <td>
                    {!record.timeOut && (
                      <Button variant="secondary" onClick={() => handleTimeOut(record._id)}>
                        Record Time Out
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No attendance records for today</p>
        )}
      </Card>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Record Attendance</h3>
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

              <Input
                type="text"
                placeholder="Lab Session"
                value={formData.labSession}
                onChange={(e) => setFormData({ ...formData, labSession: e.target.value })}
                required
              />

              <Input
                type="text"
                placeholder="Notes (optional)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Record Attendance</Button>
              </div>
            </form>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}

export default Attendance
