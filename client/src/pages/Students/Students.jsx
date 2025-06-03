// "use client"

// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { studentAPI } from "../../services/api"
// import { Button, Input, Table, Badge } from "../../styles/GlobalStyles"
// import styled from "styled-components"

// const StudentsHeader = styled.div`
//   display: flex;
//   justify-content: between;
//   align-items: center;
//   margin-bottom: 30px;
//   gap: 20px;
// `

// const SearchContainer = styled.div`
//   flex: 1;
//   max-width: 400px;
// `

// const Students = () => {
//   const [students, setStudents] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [search, setSearch] = useState("")
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     total: 0,
//   })
//   const navigate = useNavigate()

//   useEffect(() => {
//     fetchStudents()
//   }, [search, pagination.currentPage])

//   const fetchStudents = async () => {
//     try {
//       setLoading(true)
//       const response = await studentAPI.getAll({
//         page: pagination.currentPage,
//         limit: 10,
//         search,
//       })

//       setStudents(response.data.students)
//       setPagination({
//         currentPage: response.data.currentPage,
//         totalPages: response.data.totalPages,
//         total: response.data.total,
//       })
//     } catch (error) {
//       console.error("Error fetching students:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSearch = (e) => {
//     setSearch(e.target.value)
//     setPagination((prev) => ({ ...prev, currentPage: 1 }))
//   }

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to deactivate this student?")) {
//       try {
//         await studentAPI.delete(id)
//         fetchStudents()
//       } catch (error) {
//         console.error("Error deleting student:", error)
//       }
//     }
//   }

//   if (loading) {
//     return <div>Loading students...</div>
//   }

//   return (
//     <div>
//       <StudentsHeader>
//         <h2>Students</h2>
//         <SearchContainer>
//           <Input type="text" placeholder="Search students..." value={search} onChange={handleSearch} />
//         </SearchContainer>
//         <Link to="/students/add">
//           <Button>Add Student</Button>
//         </Link>
//       </StudentsHeader>

//       <Table>
//         <thead>
//           <tr>
//             <th>Student ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Grade</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student._id}>
//               <td>{student.studentId}</td>
//               <td>
//                 {student.personalDetails.firstName} {student.personalDetails.lastName}
//               </td>
//               <td>{student.personalDetails.email}</td>
//               <td>{student.academicRecords.grade}</td>
//               <td>
//                 <Badge variant={student.isActive ? "success" : "danger"}>
//                   {student.isActive ? "Active" : "Inactive"}
//                 </Badge>
//               </td>
//               <td>
//                 <Button onClick={() => navigate(`/students/${student._id}`)} style={{ marginRight: "10px" }}>
//                   View
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(student._id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {students.length === 0 && <p style={{ textAlign: "center", marginTop: "20px" }}>No students found</p>}
//     </div>
//   )
// }

// export default Students



// "use client"

// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { studentAPI } from "../../services/api"
// import { Button, Input, Table, Badge, Select } from "../../styles/GlobalStyles"
// import styled from "styled-components"

// const StudentsHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 30px;
//   gap: 20px;
// `

// const FilterContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   flex: 1;
// `

// const SearchContainer = styled.div`
//   flex: 1;
//   max-width: 400px;
// `

// const Students = () => {
//   const [students, setStudents] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [search, setSearch] = useState("")
//   const [classFilter, setClassFilter] = useState("")
//   const [sectionFilter, setSectionFilter] = useState("")
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     total: 0,
//   })
//   const navigate = useNavigate()

//   useEffect(() => {
//     fetchStudents()
//   }, [search, classFilter, sectionFilter, pagination.currentPage])

//   const fetchStudents = async () => {
//     try {
//       setLoading(true)
//       const response = await studentAPI.getAll({
//         page: pagination.currentPage,
//         limit: 10,
//         search,
//         class: classFilter,
//         section: sectionFilter,
//       })

//       setStudents(response.data.students)
//       setPagination({
//         currentPage: response.data.currentPage,
//         totalPages: response.data.totalPages,
//         total: response.data.total,
//       })
//     } catch (error) {
//       console.error("Error fetching students:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSearch = (e) => {
//     setSearch(e.target.value)
//     setPagination((prev) => ({ ...prev, currentPage: 1 }))
//   }

//   const handleClassFilter = (e) => {
//     setClassFilter(e.target.value)
//     setPagination((prev) => ({ ...prev, currentPage: 1 }))
//   }

//   const handleSectionFilter = (e) => {
//     setSectionFilter(e.target.value)
//     setPagination((prev) => ({ ...prev, currentPage: 1 }))
//   }

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to deactivate this student?")) {
//       try {
//         await studentAPI.delete(id)
//         fetchStudents()
//       } catch (error) {
//         console.error("Error deleting student:", error)
//       }
//     }
//   }

//   if (loading) {
//     return <div>Loading students...</div>
//   }

//   return (
//     <div>
//       <StudentsHeader>
//         <h2>Students</h2>
//         <FilterContainer>
//           <SearchContainer>
//             <Input type="text" placeholder="Search students..." value={search} onChange={handleSearch} />
//           </SearchContainer>
//           <Select value={classFilter} onChange={handleClassFilter}>
//             <option value="">All Classes</option>
//             <option value="9">Class 9</option>
//             <option value="10">Class 10</option>
//             <option value="11">Class 11</option>
//             <option value="12">Class 12</option>
//           </Select>
//           <Select value={sectionFilter} onChange={handleSectionFilter}>
//             <option value="">All Sections</option>
//             <option value="A">Section A</option>
//             <option value="B">Section B</option>
//             <option value="C">Section C</option>
//             <option value="D">Section D</option>
//           </Select>
//         </FilterContainer>
//         <Link to="/students/add">
//           <Button>Add Student</Button>
//         </Link>
//       </StudentsHeader>

//       <Table>
//         <thead>
//           <tr>
//             <th>Student ID</th>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Section</th>
//             <th>Email</th>
//             <th>Grade</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student._id}>
//               <td>{student.studentId}</td>
//               <td>
//                 {student.personalDetails.firstName} {student.personalDetails.lastName}
//               </td>
//               <td>{student.academicRecords.class}</td>
//               <td>{student.academicRecords.section}</td>
//               <td>{student.personalDetails.email}</td>
//               <td>{student.academicRecords.grade}</td>
//               <td>
//                 <Badge variant={student.isActive ? "success" : "danger"}>
//                   {student.isActive ? "Active" : "Inactive"}
//                 </Badge>
//               </td>
//               <td>
//                 <Button onClick={() => navigate(`/students/${student._id}`)} style={{ marginRight: "10px" }}>
//                   View
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(student._id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {students.length === 0 && <p style={{ textAlign: "center", marginTop: "20px" }}>No students found</p>}
//     </div>
//   )
// }

// export default Students




"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { studentAPI } from "../../services/api"
import { Button, Input, Table, Badge, Select } from "../../styles/GlobalStyles"
import styled from "styled-components"

const StudentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
`

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
`

const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;
`

const Students = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
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
        search,
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
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
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
        fetchStudents()
      } catch (error) {
        console.error("Error deleting student:", error)
      }
    }
  }

  if (loading) {
    return <div>Loading students...</div>
  }

  return (
    <div>
      <StudentsHeader>
        <h2>Students</h2>
        <FilterContainer>
          <SearchContainer>
            <Input type="text" placeholder="Search students..." value={search} onChange={handleSearch} />
          </SearchContainer>
          <Select value={classFilter} onChange={handleClassFilter}>
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
          </Select>
          <Select value={sectionFilter} onChange={handleSectionFilter}>
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </Select>
        </FilterContainer>
        <Link to="/students/add">
          <Button>Add Student</Button>
        </Link>
      </StudentsHeader>

      <Table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Email</th>
            <th>Grade</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>
                {student.personalDetails.firstName} {student.personalDetails.lastName}
              </td>
              <td>{student.academicRecords.class}</td>
              <td>{student.academicRecords.section}</td>
              <td>{student.personalDetails.email}</td>
              <td>{student.academicRecords.grade}</td>
              <td>
                <Badge variant={student.isActive ? "success" : "danger"}>
                  {student.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td>
                <Button onClick={() => navigate(`/students/${student._id}`)} style={{ marginRight: "10px" }}>
                  View
                </Button>
                {/* <Button variant="danger" onClick={() => handleDelete(student._id)}>
                  Delete
                </Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {students.length === 0 && <p style={{ textAlign: "center", marginTop: "20px" }}>No students found</p>}
    </div>
  )
}

export default Students


// "use client"

// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { studentAPI } from "../../services/api"
// import { Button, Input, Table, Badge, Select } from "../../styles/GlobalStyles"
// import styled from "styled-components"

// const StudentsHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 30px;
//   gap: 20px;
// `

// const FilterContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   flex: 1;
// `

// const SearchContainer = styled.div`
//   flex: 1;
//   max-width: 400px;
// `

// const Students = () => {
//   const [students, setStudents] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [search, setSearch] = useState("")
//   const [classFilter, setClassFilter] = useState("")
//   const [sectionFilter, setSectionFilter] = useState("")
//   const [pagination, setPagination] = useState({
//     básico: 1,
//     totalPages: 1,
//     total: 0,
//   })
//   const navigate = useNavigate()

//   useEffect(() => {
//     fetchStudents()
//   }, [search, classFilter, sectionFilter, pagination.currentPage])

//   const fetchStudents = async () => {
//     try {
//       setLoading(true)
//       const response = await studentAPI.getAll({
//         page: pagination.currentPage,
//         limit: 10,
//         search,
//         class: classFilter,
//         section: sectionFilter,
//       })

//       setStudents(response.data.students)
//       setPagination({
//         currentPage: response.data.currentPage,
//         totalPages: response.data.totalPages,
//         total: response.data.total,
//       })
//     } catch (error) {
//       console.error("Error fetching students:", error)
//       alert("Failed to fetch students. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSearch = (e) => {
//     setSearch(e.target.value)
//     setPagination((prev) => ({ ...prev, currentPage: 1 }))
//   }

//   const handleClassFilter = (e) => {
//     setClassFilter(e.target.value)
//     setPagination((prev) => ({ ...prev, currentPage: 1 }))
//   }

//   const handleSectionFilter = (e) => {
//     setSectionFilter(e.target.value)
//     setPagination((prev) => ({ ...prev, currentPage: 1 }))
//   }

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to deactivate this student?")) {
//       try {
//         await studentAPI.delete(id)
//         alert("Student deactivated successfully")
//         fetchStudents()
//       } catch (error) {
//         console.error("Error deleting student:", error)
//         alert("Failed to deactivate student. Please try again.")
//       }
//     }
//   }

//   const handleEdit = (id) => {
//     navigate(`/students/edit/${id}`)
//   }

//   if (loading) {
//     return <div>Loading students...</div>
//   }

//   return (
//     <div>
//       <StudentsHeader>
//         <h2>Students</h2>
//         <FilterContainer>
//           <SearchContainer>
//             <Input type="text" placeholder="Search students..." value={search} onChange={handleSearch} />
//           </SearchContainer>
//           <Select value={classFilter} onChange={handleClassFilter}>
//             <option value="">All Classes</option>
//             <option value="1">Class 1</option>
//             <option value="2">Class 2</option>
//             <option value="3">Class 3</option>
//             <option value="4">Class 4</option>
//             <option value="5">Class 5</option>
//             <option value="6">Class 6</option>
//             <option value="7">Class 7</option>
//             <option value="8">Class 8</option>
//             <option value="9">Class 9</option>
//             <option value="10">Class 10</option>
//             <option value="11">Class 11</option>
//             <option value="12">Class 12</option>
//           </Select>
//           <Select value={sectionFilter} onChange={handleSectionFilter}>
//             <option value="">All Sections</option>
//             <option value="A">Section A</option>
//             <option value="B">Section B</option>
//             <option value="C">Section C</option>
//             <option value="D">Section D</option>
//           </Select>
//         </FilterContainer>
//         <Link to="/students/add">
//           <Button>Add Student</Button>
//         </Link>
//       </StudentsHeader>

//       <Table>
//         <thead>
//           <tr>
//             <th>Student ID</th>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Section</th>
//             <th>Email</th>
//             <th>Grade</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student._id}>
//               <td>{student.studentId}</td>
//               <td>
//                 {student.personalDetails.firstName} {student.personalDetails.lastName}
//               </td>
//               <td>{student.academicRecords.class}</td>
//               <td>{student.academicRecords.section}</td>
//               <td>{student.personalDetails.email}</td>
//               <td>{student.academicRecords.grade}</td>
//               <td>
//                 <Badge variant={student.isActive ? "success" : "danger"}>
//                   {student.isActive ? "Active" : "Inactive"}
//                 </Badge>
//               </td>
//               <td>
//                 <Button onClick={() => navigate(`/students/${student._id}`)} style={{ marginRight: "10px" }}>
//                   View
//                 </Button>
//                 <Button onClick={() => handleEdit(student._id)} style={{ marginRight: "10px" }}>
//                   Edit
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(student._id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {students.length === 0 && <p style={{ textAlign: "center", marginTop: "20px" }}>No students found</p>}
//     </div>
//   )
// }

// export default Students


