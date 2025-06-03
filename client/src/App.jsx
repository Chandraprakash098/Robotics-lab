


// "use client"
// import { Routes, Route, Navigate } from "react-router-dom"
// import { useAuth } from "./contexts/AuthContext"
// import Layout from "./components/Layout/Layout"
// import Login from "./pages/Auth/Login"
// import Register from "./pages/Auth/Register"
// import Dashboard from "./pages/Dashboard/Dashboard"
// import Students from "./pages/Students/Students"
// import StudentDetail from "./pages/Students/StudentDetail"
// import StudentQRCard from "./pages/Students/StudentQRCard"
// import AddStudent from "./pages/Students/AddStudent"
// import Attendance from "./pages/Attendance/Attendance"
// import BehaviorReports from "./pages/Behavior/BehaviorReports"
// import ParentCommunication from "./pages/Parents/ParentCommunication"
// import QRScanner from "./pages/QR/QRScanner"
// import MobileQRScanner from "./pages/QR/MobileQRScanner"
// import QRCodeGenerator from "./pages/QR/QRCodeGenerator"

// function App() {
//   const { user, loading } = useAuth()

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <Routes>
//       <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
//       <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
//       <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
//         <Route index element={<Navigate to="/dashboard" />} />
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="students" element={<Students />} />
//         <Route path="students/add" element={<AddStudent />} />
//         <Route path="students/:id" element={<StudentDetail />} />
//         <Route path="students/:id/card" element={<StudentQRCard />} />
//         <Route path="attendance" element={<Attendance />} />
//         <Route path="behavior" element={<BehaviorReports />} />
//         <Route path="communication" element={<ParentCommunication />} />
//         <Route path="qr-scanner" element={<QRScanner />} />
//         <Route path="mobile-scanner" element={<MobileQRScanner />} />
//         <Route path="qr-generator" element={<QRCodeGenerator />} />
//       </Route>
//     </Routes>
//   )
// }

// export default App



"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import Layout from "./components/Layout/Layout"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Dashboard from "./pages/Dashboard/Dashboard"
import Students from "./pages/Students/Students"
import StudentDetail from "./pages/Students/StudentDetail"
import StudentQRCard from "./pages/Students/StudentQRCard"
import AddStudent from "./pages/Students/AddStudent"
import Attendance from "./pages/Attendance/Attendance"
import BehaviorReports from "./pages/Behavior/BehaviorReports"
import ParentCommunication from "./pages/Parents/ParentCommunication"
import QRScanner from "./pages/QR/QRScanner"
import MobileQRScanner from "./pages/QR/MobileQRScanner"
import QRCodeGenerator from "./pages/QR/QRCodeGenerator"
import QRTestPage from "./pages/QR/QRTestPage"

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/add" element={<AddStudent />} />
        <Route path="students/:id" element={<StudentDetail />} />
        <Route path="students/:id/card" element={<StudentQRCard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="behavior" element={<BehaviorReports />} />
        <Route path="communication" element={<ParentCommunication />} />
        <Route path="qr-scanner" element={<QRScanner />} />
        <Route path="mobile-scanner" element={<MobileQRScanner />} />
        <Route path="qr-generator" element={<QRCodeGenerator />} />
        <Route path="test-qr" element={<QRTestPage />} />
      </Route>
    </Routes>
  )
}

export default App
