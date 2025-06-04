"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentAPI } from "../../services/api";
import { Button, Input, Select, Card } from "../../styles/GlobalStyles";
import styled from "styled-components";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  h3 {
    margin-bottom: 20px;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
  }
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const AddStudent = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    personalDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
    academicRecords: {
      class: "",
      section: "",
      grade: "",
      gpa: "",
    },
    parentContact: {
      fatherName: "",
      fatherPhone: "",
      fatherEmail: "",
      motherName: "",
      motherPhone: "",
      motherEmail: "",
      guardianName: "",
      guardianPhone: "",
      guardianEmail: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length === 1) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else if (keys.length === 3) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: { ...prev[keys[0]][keys[1]], [keys[2]]: value },
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await studentAPI.create(formData);
      alert("Student created successfully! QR code has been generated.");
      navigate("/students");
    } catch (error) {
      setError(error.response?.data?.message || "Error creating student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "30px" }}>Add New Student</h2>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Card>
        <form onSubmit={handleSubmit}>
          <FormSection>
            <h3>Basic Information</h3>
            <FormGrid>
              <Input
                type="text"
                name="studentId"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
              <div></div>
              <Input
                type="text"
                name="personalDetails.firstName"
                placeholder="First Name"
                value={formData.personalDetails.firstName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="personalDetails.lastName"
                placeholder="Last Name"
                value={formData.personalDetails.lastName}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="personalDetails.email"
                placeholder="Email"
                value={formData.personalDetails.email}
                onChange={handleChange}
                required
              />
              <Input
                type="tel"
                name="personalDetails.phone"
                placeholder="Phone"
                value={formData.personalDetails.phone}
                onChange={handleChange}
                required
              />
              <Input
                type="date"
                name="personalDetails.dateOfBirth"
                value={formData.personalDetails.dateOfBirth}
                onChange={handleChange}
                required
              />
              <Select
                name="personalDetails.gender"
                value={formData.personalDetails.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormGrid>
          </FormSection>

          <FormSection>
            <h3>Address</h3>
            <FormGrid>
              <Input
                type="text"
                name="personalDetails.address.street"
                placeholder="Street"
                value={formData.personalDetails.address.street}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="personalDetails.address.city"
                placeholder="City"
                value={formData.personalDetails.address.city}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="personalDetails.address.state"
                placeholder="State"
                value={formData.personalDetails.address.state}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="personalDetails.address.zipCode"
                placeholder="Zip Code"
                value={formData.personalDetails.address.zipCode}
                onChange={handleChange}
              />
            </FormGrid>
          </FormSection>

          <FormSection>
            <h3>Academic Information</h3>
            <FormGrid>
              <Input
                type="text"
                name="academicRecords.class"
                placeholder="Class (e.g., 10, 11, 12)"
                value={formData.academicRecords.class}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="academicRecords.section"
                placeholder="Section (e.g., A, B, C)"
                value={formData.academicRecords.section}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="academicRecords.grade"
                placeholder="Grade"
                value={formData.academicRecords.grade}
                onChange={handleChange}
                required
              />
              <Input
                type="number"
                name="academicRecords.gpa"
                placeholder="GPA"
                step="0.01"
                min="0"
                max="4"
                value={formData.academicRecords.gpa}
                onChange={handleChange}
              />
            </FormGrid>
          </FormSection>

          <FormSection>
            <h3>Parent Contact Information</h3>
            <FormGrid>
              <Input
                type="text"
                name="parentContact.fatherName"
                placeholder="Father's Name"
                value={formData.parentContact.fatherName}
                onChange={handleChange}
              />
              <Input
                type="tel"
                name="parentContact.fatherPhone"
                placeholder="Father's Phone"
                value={formData.parentContact.fatherPhone}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="parentContact.fatherEmail"
                placeholder="Father's Email"
                value={formData.parentContact.fatherEmail}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="parentContact.motherName"
                placeholder="Mother's Name"
                value={formData.parentContact.motherName}
                onChange={handleChange}
              />
              <Input
                type="tel"
                name="parentContact.motherPhone"
                placeholder="Mother's Phone"
                value={formData.parentContact.motherPhone}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="parentContact.motherEmail"
                placeholder="Mother's Email"
                value={formData.parentContact.motherEmail}
                onChange={handleChange}
              />
            </FormGrid>
          </FormSection>

          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/students")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Student"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddStudent;
