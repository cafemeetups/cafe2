import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { Filter, MessageCircle, Crown } from 'lucide-react'

const COMMUNITIES = [
  'All',
  'Influencer',
  'Entrepreneur',
  'Blogger',
  'Artist',
  'Creator',
  'Video Editor'
]

const Profiles = () => {
  const [profiles, setProfiles] = useState([])
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [selectedCommunity, setSelectedCommunity] = useState('All')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchProfiles()
  }, [])

  useEffect(() => {
    if (selectedCommunity === 'All') {
      setFilteredProfiles(profiles)
    } else {
      setFilteredProfiles(profiles.filter(profile => profile.community === selectedCommunity))
    }
  }, [selectedCommunity, profiles])

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('/api/profiles')
      setProfiles(response.data.profiles)
    } catch (error) {
      console.error('Error fetching profiles:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discover Creators</h1>
          
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              {COMMUNITIES.map(community => (
                <option key={community} value={community}>{community}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProfiles.map(profile => (
            <div key={profile._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={profile.profilePicture || '/default-avatar.png'} 
                  alt={profile.name}
                  className="w-full h-48 object-cover"
                />
                {profile.isPremium && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-1 rounded-full">
                    <Crown className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    {profile.community}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {profile.bio}
                </p>

                <div className="flex justify-between items-center">
                  <Link 
                    to={`/profile/${profile._id}`}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    View Profile
                  </Link>
                  
                  {user && user.isPremium && (
                    <Link 
                      to={`/chat/${profile._id}`}
                      className="flex items-center space-x-1 bg-orange-500 text-white px-3 py-1 rounded-full text-sm hover:bg-orange-600"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat</span>
                    </Link>
                  )}
                </div>

                {!user?.isPremium && user && (
                  <div className="mt-2 text-xs text-gray-500">
                    <Link to="/premium" className="text-orange-500 hover:underline">
                      Go Premium to chat
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No profiles found in this community.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profiles
