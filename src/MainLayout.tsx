// import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default MainLayout
