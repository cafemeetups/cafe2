import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, User, LogOut, MessageCircle, Calendar, Crown } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
            <span className="text-xl font-bold text-orange-500">CafeMeetups</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/profiles" className="text-gray-700 hover:text-orange-500">Profiles</Link>
            <Link to="/events" className="text-gray-700 hover:text-orange-500">Events</Link>
            {user ? (
              <>
                <Link to="/chat" className="text-gray-700 hover:text-orange-500 flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Link>
                {!user.isPremium && (
                  <Link to="/premium" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full flex items-center">
                    <Crown className="w-4 h-4 mr-1" />
                    Go Premium
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700">
                    <img 
                      src={user.profilePicture || '/default-avatar.png'} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link to="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/auth" className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/profiles" className="text-gray-700">Profiles</Link>
              <Link to="/events" className="text-gray-700">Events</Link>
              {user ? (
                <>
                  <Link to="/chat" className="text-gray-700">Chat</Link>
                  <Link to="/profile" className="text-gray-700">Profile</Link>
                  {!user.isPremium && (
                    <Link to="/premium" className="text-orange-500">Go Premium</Link>
                  )}
                  <button onClick={handleLogout} className="text-gray-700 text-left">Logout</button>
                </>
              ) : (
                <Link to="/auth" className="text-orange-500">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
