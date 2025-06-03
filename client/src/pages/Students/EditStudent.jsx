"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { studentAPI } from "../../services/api"
import { Button, Input, Select } from "../../styles/GlobalStyles"
import styled from "styled-components"

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`

const EditStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: "",
      lastName: "",
      email: "",
    },
    academicRecords: {
      class: "",
      section: "",
      grade: "",
    },
    studentId: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStudent()
  }, [])

  const fetchStudent = async () => {
    try {
      setLoading(true)
      const response = await studentAPI.getById(id)
      setFormData(response.data)
    } catch (error) {
      console.error("Error fetching student:", error)
      setError("Failed to fetch student data")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes("personalDetails.")) {
      const field = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          [field]: value,
        },
      }))
    } else if (name.includes("academicRecords.")) {
      const field = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        academicRecords: {
          ...prev.academicRecords,
          [field]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await studentAPI.update(id, formData)
      alert("Student updated successfully")
      navigate("/students")
    } catch (error) {
      console.error("Error updating student:", error)
      alert("Failed to update student. Please try again.")
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <FormContainer>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Student ID</Label>
          <Input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>First Name</Label>
          <Input
            type="text"
            name="personalDetails.firstName"
            value={formData.personalDetails.firstName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input
            type="text"
            name="personalDetails.lastName"
            value={formData.personalDetails.lastName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="personalDetails.email"
            value={formData.personalDetails.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Class</Label>
          <Select
            name="academicRecords.class"
            value={formData.academicRecords.class}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Section</Label>
          <Select
            name="academicRecords.section"
            value={formData.academicRecords.section}
            onChange={handleChange}
            required
          >
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Grade</Label>
          <Input
            type="text"
            name="academicRecords.grade"
            value={formData.academicRecords.grade}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Update Student</Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/students")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </form>
    </FormContainer>
  )
}

export default EditStudent