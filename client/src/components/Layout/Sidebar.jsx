
// import { NavLink } from "react-router-dom"
// import styled from "styled-components"

// const SidebarContainer = styled.div`
//   width: 250px;
//   background: #2c3e50;
//   color: white;
//   padding: 20px 0;
// `

// const Logo = styled.div`
//   padding: 0 20px 30px;
//   font-size: 20px;
//   font-weight: bold;
//   border-bottom: 1px solid #34495e;
//   margin-bottom: 20px;
// `

// const NavList = styled.ul`
//   list-style: none;
// `

// const NavItem = styled.li`
//   margin-bottom: 5px;
// `

// const StyledNavLink = styled(NavLink)`
//   display: block;
//   padding: 12px 20px;
//   color: #bdc3c7;
//   text-decoration: none;
//   transition: all 0.2s;

//   &:hover {
//     background: #34495e;
//     color: white;
//   }

//   &.active {
//     background: #3498db;
//     color: white;
//   }
// `

// const Sidebar = () => {
//   return (
//     <SidebarContainer>
//       <Logo>Student Management</Logo>
//       <NavList>
//         <NavItem>
//           <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
//         </NavItem>
//         <NavItem>
//           <StyledNavLink to="/students">Students</StyledNavLink>
//         </NavItem>
//         <NavItem>
//           <StyledNavLink to="/attendance">Attendance</StyledNavLink>
//         </NavItem>
//         <NavItem>
//           <StyledNavLink to="/behavior">Behavior Reports</StyledNavLink>
//         </NavItem>
//         <NavItem>
//           <StyledNavLink to="/communication">Parent Communication</StyledNavLink>
//         </NavItem>
//         <NavItem>
//           <StyledNavLink to="/qr-scanner">QR Scanner</StyledNavLink>
//         </NavItem>
//         <NavItem>
//           <StyledNavLink to="/qr-generator">QR Generator</StyledNavLink>
//         </NavItem>
//       </NavList>
//     </SidebarContainer>
//   )
// }

// export default Sidebar



import { NavLink } from "react-router-dom"
import styled from "styled-components"

const SidebarContainer = styled.div`
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px 0;
`

const Logo = styled.div`
  padding: 0 20px 30px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #34495e;
  margin-bottom: 20px;
`

const NavList = styled.ul`
  list-style: none;
`

const NavItem = styled.li`
  margin-bottom: 5px;
`

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 12px 20px;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #34495e;
    color: white;
  }

  &.active {
    background: #3498db;
    color: white;
  }
`

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>Robotics Lab</Logo>
      <NavList>
        <NavItem>
          <StyledNavLink to="/dashboard">📊 Dashboard</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/students">👥 Students</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/attendance">📝 Attendance</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/behavior">📋 Behavior Reports</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/communication">📧 Parent Communication</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/mobile-scanner">📱 Mobile Scanner</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/qr-generator">🔗 QR Generator</StyledNavLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  )
}

export default Sidebar


