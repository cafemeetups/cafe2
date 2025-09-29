import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Users, Calendar, MessageCircle, Star } from 'lucide-react'

const Home = () => {
  const { user } = useAuth()

  return (
    <div>
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Connect with Amazing Creators
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join CafeMeetups - Where influencers, entrepreneurs, artists, and creators meet, chat, and collaborate over coffee.
            </p>
            <div className="space-x-4">
              {user ? (
                <Link 
                  to="/profiles" 
                  className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100"
                >
                  Explore Profiles
                </Link>
              ) : (
                <Link 
                  to="/auth" 
                  className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100"
                >
                  Get Started
                </Link>
              )}
              <Link 
                to="/events" 
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join CafeMeetups?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Connect with like-minded individuals from various creative fields and industries.</p>
            </div>
            <div className="text-center p-6">
              <Calendar className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Exclusive Events</h3>
              <p className="text-gray-600">Join curated coffee meetups and community events in your city.</p>
            </div>
            <div className="text-center p-6">
              <MessageCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Direct Messaging</h3>
              <p className="text-gray-600">Chat directly with other members and build meaningful connections.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Communities</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['Influencer', 'Entrepreneur', 'Blogger', 'Artist', 'Creator', 'Video Editor'].map((community) => (
              <div key={community} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <Star className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold">{community}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of creators already building connections on CafeMeetups.</p>
          {!user && (
            <Link 
              to="/auth" 
              className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100"
            >
              Create Your Profile
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
