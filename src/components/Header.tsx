import { Link, useLocation } from "react-router-dom"
import { Logo } from "../icons/Logo"
import styled from "styled-components"

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoContainer = styled.div`
  width: 200px;
`

const AuthContainer = styled.div`
  cursor: not-allowed;
  font-size: 20px;
  font-weight: bold;
`

export const Header = () => {
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <HeaderContainer>
      <LogoContainer>
        {!isHome ? (
          <Link to="/">
            <Logo />
          </Link>
        ) : (
          <Logo />
        )}
      </LogoContainer>
      <AuthContainer>
        Login
      </AuthContainer>
    </HeaderContainer>
  )
}