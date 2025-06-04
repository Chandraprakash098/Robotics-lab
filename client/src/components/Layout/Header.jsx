"use client";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../styles/GlobalStyles";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 32px;
  border-bottom: 3px solid #5a67d8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
    z-index: 0;
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #ffffff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: "🎓";
    font-size: 32px;
    -webkit-text-fill-color: initial;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.15);
  padding: 12px 20px;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.span`
  font-weight: 600;
  color: white;
  font-size: 16px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const UserRole = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
    background: linear-gradient(135deg, #ff5252 0%, #e53e3e 100%);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Header = () => {
  const { user, logout } = useAuth();

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Title>Student Management </Title>
        <UserInfo>
          <UserAvatar>
            {getInitials(user?.firstName, user?.lastName)}
          </UserAvatar>
          <UserDetails>
            <UserName>
              {user?.firstName} {user?.lastName}
            </UserName>
            <UserRole>Administrator</UserRole>
          </UserDetails>
          <StyledButton variant="secondary" onClick={logout}>
            Logout
          </StyledButton>
        </UserInfo>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
