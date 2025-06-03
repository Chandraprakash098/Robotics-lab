"use client"

import { useState, useEffect } from "react"
import { behaviorAPI, studentAPI } from "../../services/api"
import { Button, Input, Select, TextArea, Table, Card, Modal, ModalContent, Badge } from "../../styles/GlobalStyles"
import styled from "styled-components"

const BehaviorHeader = styled.div`
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

const BehaviorReports = () => {
  const [reports, setReports] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({
    studentId: "",
    behaviorType: "",
    category: "",
  })
  const [formData, setFormData] = useState({
    studentId: "",
    behaviorType: "",
    category: "",
    title: "",
    description: "",
    severity: "medium",
    actionTaken: "",
    followUpRequired: false,
  })

  useEffect(() => {
    fetchData()
  }, [filters])

  const fetchData = async () => {
    try {
      const [reportsRes, studentsRes] = await Promise.all([
        behaviorAPI.getAll(filters),
        studentAPI.getAll({ limit: 100 }),
      ])

      setReports(reportsRes.data.reports)
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
      await behaviorAPI.create(formData)
      setShowModal(false)
      setFormData({
        studentId: "",
        behaviorType: "",
        category: "",
        title: "",
        description: "",
        severity: "medium",
        actionTaken: "",
        followUpRequired: false,
      })
      fetchData()
    } catch (error) {
      console.error("Error creating behavior report:", error)
      alert(error.response?.data?.message || "Error creating behavior report")
    }
  }

  if (loading) {
    return <div>Loading behavior reports...</div>
  }

  return (
    <div>
      <BehaviorHeader>
        <h2>Behavior Reports</h2>
        <Button onClick={() => setShowModal(true)}>Create Report</Button>
      </BehaviorHeader>

      <Card>
        <h3>Filters</h3>
        <FilterContainer>
          <Select value={filters.studentId} onChange={(e) => setFilters({ ...filters, studentId: e.target.value })}>
            <option value="">All Students</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.personalDetails.firstName} {student.personalDetails.lastName}
              </option>
            ))}
          </Select>

          <Select
            value={filters.behaviorType}
            onChange={(e) => setFilters({ ...filters, behaviorType: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
            <option value="neutral">Neutral</option>
          </Select>

          <Select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            <option value="">All Categories</option>
            <option value="academic">Academic</option>
            <option value="social">Social</option>
            <option value="disciplinary">Disciplinary</option>
            <option value="participation">Participation</option>
            <option value="leadership">Leadership</option>
          </Select>
        </FilterContainer>
      </Card>

      <Card>
        <h3>Behavior Reports</h3>
        {reports.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Type</th>
                <th>Category</th>
                <th>Title</th>
                <th>Severity</th>
                <th>Follow Up</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td>{new Date(report.reportDate).toLocaleDateString()}</td>
                  <td>
                    {report.studentId?.personalDetails?.firstName} {report.studentId?.personalDetails?.lastName}
                  </td>
                  <td>
                    <Badge
                      variant={
                        report.behaviorType === "positive"
                          ? "success"
                          : report.behaviorType === "negative"
                            ? "danger"
                            : "info"
                      }
                    >
                      {report.behaviorType}
                    </Badge>
                  </td>
                  <td>{report.category}</td>
                  <td>{report.title}</td>
                  <td>
                    <Badge
                      variant={
                        report.severity === "high" ? "danger" : report.severity === "medium" ? "warning" : "info"
                      }
                    >
                      {report.severity}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={report.followUpRequired ? "warning" : "success"}>
                      {report.followUpRequired ? "Required" : "Not Required"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No behavior reports found</p>
        )}
      </Card>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Create Behavior Report</h3>
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
                value={formData.behaviorType}
                onChange={(e) => setFormData({ ...formData, behaviorType: e.target.value })}
                required
              >
                <option value="">Select Behavior Type</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="neutral">Neutral</option>
              </Select>

              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="academic">Academic</option>
                <option value="social">Social</option>
                <option value="disciplinary">Disciplinary</option>
                <option value="participation">Participation</option>
                <option value="leadership">Leadership</option>
              </Select>

              <Input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <TextArea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />

              <Select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>

              <TextArea
                placeholder="Action Taken (optional)"
                value={formData.actionTaken}
                onChange={(e) => setFormData({ ...formData, actionTaken: e.target.value })}
              />

              <label style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                <input
                  type="checkbox"
                  checked={formData.followUpRequired}
                  onChange={(e) => setFormData({ ...formData, followUpRequired: e.target.checked })}
                  style={{ marginRight: "8px" }}
                />
                Follow-up Required
              </label>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Report</Button>
              </div>
            </form>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}

export default BehaviorReports
