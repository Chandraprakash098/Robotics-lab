"use client"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "../../styles/GlobalStyles"
import styled from "styled-components"

const HeaderContainer = styled.header`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const UserName = styled.span`
  font-weight: 500;
`

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <HeaderContainer>
      <h1>Welcome to Student Management System</h1>
      <UserInfo>
        <UserName>
          {user?.firstName} {user?.lastName}
        </UserName>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </UserInfo>
    </HeaderContainer>
  )
}

export default Header
