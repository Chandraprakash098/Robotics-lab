"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { studentAPI } from "../../services/api"
import { Button, Input, Table, Badge, Select } from "../../styles/GlobalStyles"
import styled, { keyframes } from "styled-components"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

const Container = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
`

const StudentsHeader = styled.div`
  margin-bottom: 30px;
`

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 25px 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  margin: 0;
  color: white;
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(45deg, #fff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const SearchSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 35px;
  margin-bottom: 25px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #667eea, transparent);
    animation: ${shimmer} 2s infinite;
  }
`

const SearchRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 200px 200px auto;
  gap: 20px;
  align-items: end;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`

const SearchGroup = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.6s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
`

const SearchLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 10px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const StudentIdSearch = styled.div`
  display: flex;
  gap: 12px;
  align-items: end;
  grid-column: span 2;
  
  @media (max-width: 1200px) {
    grid-column: span 2;
  }
  
  @media (max-width: 768px) {
    grid-column: span 1;
    flex-direction: column;
    align-items: stretch;
  }
`

const SearchButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  min-width: 120px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`

const ClearButton = styled(Button)`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border: none;
  padding: 14px 20px;
  border-radius: 12px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: linear-gradient(135deg, #ff5252 0%, #e74c3c 100%);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
  }
`

const AddButton = styled(Button)`
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  border: none;
  padding: 14px 28px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #45b7af 0%, #3d8b7e 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(78, 205, 196, 0.5);
  }
`

const StyledInput = styled(Input)`
  border-radius: 12px;
  border: 2px solid transparent;
  background: white;
  padding: 14px 18px;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`

const StyledSelect = styled(Select)`
  border-radius: 12px;
  border: 2px solid transparent;
  padding: 14px 18px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }
`

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 15px 25px;
  border-radius: 16px;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const TableContainer = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const StyledTable = styled(Table)`
  margin: 0;
  border-radius: 0;
  
  thead {
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    
    th {
      color: #ffffff !important;
      font-weight: 700;
      padding: 20px 16px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-size: 13px;
      border: none;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
      
      /* Ensure emojis are visible */
      filter: brightness(1.2) contrast(1.1);
      
      /* Alternative: Use solid background for better emoji visibility */
      /* background: #2d3748 !important; */
    }
  }
  
  tbody {
    tr {
      transition: all 0.3s ease;
      border-bottom: 1px solid #f7fafc;
      
      &:hover {
        background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
        transform: scale(1.01);
      }
      
      td {
        padding: 18px 16px;
        border: none;
        font-size: 14px;
        color: #2d3748;
      }
    }
  }
`

const ActionButton = styled(Button)`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  &.view {
    background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
      transform: translateY(-2px);
    }
  }
  
  &.edit {
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
      transform: translateY(-2px);
    }
  }
  
  &.delete {
    background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
      transform: translateY(-2px);
    }
  }
`

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
  font-size: 18px;
  color: white;
  
  &::before {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 15px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  color: #4a5568;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #2d3748;
  }
  
  p {
    font-size: 16px;
    color: #718096;
  }
`

const Students = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [studentIdSearch, setStudentIdSearch] = useState("")
  const [classFilter, setClassFilter] = useState("")
  const [sectionFilter, setSectionFilter] = useState("")
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchStudents()
  }, [search, classFilter, sectionFilter, pagination.currentPage])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await studentAPI.getAll({
        page: pagination.currentPage,
        limit: 10,
        search: search || studentIdSearch,
        class: classFilter,
        section: sectionFilter,
      })

      setStudents(response.data.students)
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total,
      })
    } catch (error) {
      console.error("Error fetching students:", error)
      alert("Failed to fetch students. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGeneralSearch = (e) => {
    setSearch(e.target.value)
    setStudentIdSearch("")
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  const handleStudentIdSearch = () => {
    if (studentIdSearch.trim()) {
      setSearch("")
      setPagination((prev) => ({ ...prev, currentPage: 1 }))
      fetchStudents()
    }
  }

  const handleClearSearch = () => {
    setSearch("")
    setStudentIdSearch("")
    setClassFilter("")
    setSectionFilter("")
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  const handleClassFilter = (e) => {
    setClassFilter(e.target.value)
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  const handleSectionFilter = (e) => {
    setSectionFilter(e.target.value)
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to deactivate this student?")) {
      try {
        await studentAPI.delete(id)
        alert("Student deactivated successfully")
        fetchStudents()
      } catch (error) {
        console.error("Error deleting student:", error)
        alert("Failed to deactivate student. Please try again.")
      }
    }
  }

  const handleEdit = (id) => {
    navigate(`/students/edit/${id}`)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStudentIdSearch()
    }
  }

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          Loading students...
        </LoadingSpinner>
      </Container>
    )
  }

  return (
    <Container>
      <ContentWrapper>
        <StudentsHeader>
          <HeaderTop>
            <Title>🎓 Students Management</Title>
            <Link to="/students/add">
              <AddButton>✨ Add New Student</AddButton>
            </Link>
          </HeaderTop>

          <SearchSection>
            <SearchRow>
              <StudentIdSearch>
                <SearchGroup delay="0.1s">
                  <SearchLabel>🔍 Search by Student ID</SearchLabel>
                  <StyledInput 
                    type="text" 
                    placeholder="Enter Student ID..." 
                    value={studentIdSearch} 
                    onChange={(e) => setStudentIdSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </SearchGroup>
                <SearchButton onClick={handleStudentIdSearch}>
                  🚀 Search
                </SearchButton>
              </StudentIdSearch>

              {/* <SearchGroup delay="0.2s">
                <SearchLabel>📝 General Search</SearchLabel>
                <StyledInput 
                  type="text" 
                  placeholder="Search by name, email..." 
                  value={search} 
                  onChange={handleGeneralSearch} 
                />
              </SearchGroup> */}

              <SearchGroup delay="0.3s">
                <SearchLabel>📚 Class</SearchLabel>
                <StyledSelect value={classFilter} onChange={handleClassFilter}>
                  <option value="">All Classes</option>
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
                </StyledSelect>
              </SearchGroup>

              <SearchGroup delay="0.4s">
                <SearchLabel>🏫 Section</SearchLabel>
                <StyledSelect value={sectionFilter} onChange={handleSectionFilter}>
                  <option value="">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </StyledSelect>
              </SearchGroup>

              <ClearButton onClick={handleClearSearch}>
                🗑️ Clear
              </ClearButton>
            </SearchRow>
          </SearchSection>

          <ResultsInfo>
            <span>📊 Showing {students.length} of {pagination.total} students</span>
            <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
          </ResultsInfo>
        </StudentsHeader>

        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>🆔 Student ID</th>
                <th>👤 Name</th>
                <th>📚 Class</th>
                <th>🏫 Section</th>
                <th>📧 Email</th>
                <th>📊 Grade</th>
                <th>⚡ Status</th>
                <th>⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id} style={{animationDelay: `${index * 0.1}s`}}>
                  <td><strong>{student.studentId}</strong></td>
                  <td>
                    {student.personalDetails.firstName} {student.personalDetails.lastName}
                  </td>
                  <td>{student.academicRecords.class}</td>
                  <td>{student.academicRecords.section}</td>
                  <td>{student.personalDetails.email}</td>
                  <td>{student.academicRecords.grade}</td>
                  <td>
                    <Badge variant={student.isActive ? "success" : "danger"}>
                      {student.isActive ? "✅ Active" : "❌ Inactive"}
                    </Badge>
                  </td>
                  <td>
                    <ActionButton 
                      className="view"
                      onClick={() => navigate(`/students/${student._id}`)}
                    >
                      👁️ View
                    </ActionButton>
                    <ActionButton 
                      className="edit"
                      onClick={() => handleEdit(student._id)}
                    >
                      ✏️ Edit
                    </ActionButton>
                    <ActionButton 
                      className="delete"
                      onClick={() => handleDelete(student._id)}
                    >
                      🗑️ Delete
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>

        {students.length === 0 && (
          <EmptyState>
            <h3>🔍 No students found</h3>
            <p>Try adjusting your search criteria or add new students to get started.</p>
          </EmptyState>
        )}
      </ContentWrapper>
    </Container>
  )
}

export default Students