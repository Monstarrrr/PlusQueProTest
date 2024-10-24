import { Link, useLocation } from "react-router-dom"
import { Logo } from "../icons/Logo"

export const Header = () => {
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <header>
      {!isHome ? (
        <Link to="/">
          <Logo />
        </Link>
      ) : (
        <Logo />
      )}
    </header>
  )
}