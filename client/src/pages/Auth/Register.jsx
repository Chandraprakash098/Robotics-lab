"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Button, Input, Select, Card } from "../../styles/GlobalStyles"
import styled from "styled-components"

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  margin: 20px;
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  text-align: center;
`

const AuthLink = styled.div`
  text-align: center;
  margin-top: 20px;
  
  a {
    color: #007bff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "faculty",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await register(formData)

    if (!result.success) {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Register</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Select name="role" value={formData.role} onChange={handleChange}>
            <option value="faculty">Faculty</option>
            {/* <option value="admin">Admin</option> */}
          </Select>
          <Button type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
        <AuthLink>
          Already have an account? <Link to="/login">Login here</Link>
        </AuthLink>
      </AuthCard>
    </AuthContainer>
  )
}

export default Register
