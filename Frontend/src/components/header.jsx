"use client"
import { useState, useRef, useEffect } from "react"
import { FiMenu } from "react-icons/fi"
import { FaRegUserCircle } from "react-icons/fa"
import "../styles/header.css"
import { SquareCheckBig } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../Features/Auth/Context/AuthContext"
import { searchTasks } from "../services/TasksService"

const Header = ({ searchTerm, setSearchTerm }) => {
  const { logout } = useAuth()
  const handleLogout = () => logout()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  // const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    const token = localStorage.getItem("token")
    if (token) {
      searchTasks(token, e.target.value)
        .then((response) => {
          console.log("Search results:", response.data.tasks)
        })
        .catch((error) => {
          console.error("Error searching tasks:", error)
        })
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="header">
      <header className="header-container">
        <div className="header-title-container">
          <SquareCheckBig className="todo-icon" size={32} />
          <h1 className="header-title">To Do</h1>
        </div>

        <div className="header-search">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            className="search-input"
          />
        </div>

        <nav className="nav">
          <div className="nav-item user-icon-container" ref={dropdownRef}>
            <div className="nav-item user-icon" onClick={toggleDropdown}>
              <FaRegUserCircle size={49} />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <div className="dropdown-item" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
          <div className="nav-item menu-icon">
            <FiMenu />
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header
