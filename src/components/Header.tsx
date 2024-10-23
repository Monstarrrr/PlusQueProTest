import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header>
      <h1>- Header -</h1>
      <Link to="/">Home</Link>
    </header>
  )
}