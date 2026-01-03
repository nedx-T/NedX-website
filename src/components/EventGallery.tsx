'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function EventGallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'celebration', label: 'Celebrations' },
  ]

  const events = [
    {
      id: 1,
      title: 'Royal Wedding Ceremony',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
      location: 'Mumbai',
      description: 'Magical butterfly display during the grand wedding reception'
    },
    {
      id: 2,
      title: 'Tech Summit 2024',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      location: 'Bangalore',
      description: 'Innovative butterfly drone showcase at product launch'
    },
    {
      id: 3,
      title: 'Golden Anniversary',
      category: 'celebration',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
      location: 'Delhi',
      description: '50th anniversary celebration with synchronized butterfly dance'
    },
    {
      id: 4,
      title: 'Destination Wedding',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop',
      location: 'Goa',
      description: 'Beach wedding with sunset butterfly performance'
    },
    {
      id: 5,
      title: 'Annual Corporate Gala',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop',
      location: 'Hyderabad',
      description: 'Award ceremony enhanced with butterfly choreography'
    },
    {
      id: 6,
      title: 'Sweet 16 Party',
      category: 'celebration',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop',
      location: 'Chennai',
      description: 'Fairy-tale birthday celebration with magical butterflies'
    },
    {
      id: 7,
      title: 'Palace Wedding',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop',
      location: 'Jaipur',
      description: 'Heritage venue transformed with butterfly magic'
    },
    {
      id: 8,
      title: 'Inauguration Ceremony',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
      location: 'Pune',
      description: 'Grand opening ceremony with spectacular butterfly display'
    },
    {
      id: 9,
      title: 'New Year Gala',
      category: 'celebration',
      image: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?w=600&h=400&fit=crop',
      location: 'Mumbai',
      description: 'Midnight countdown with butterfly light show'
    }
  ]

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="gallery" className="relative py-20 bg-gradient-to-b from-background to-card/30 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-10 w-72 h-72 bg-accent-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Our Work
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground"
          >
            Event <span className="gradient-text">Gallery</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            Explore our magical butterfly moments from events across India
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'gradient-bg text-white'
                  : 'bg-card border border-border text-foreground hover:border-accent-purple/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image */}
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🦋</span>
                    <span className="text-accent-blue text-sm font-medium">{event.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {event.description}
                  </p>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="glass-effect px-3 py-1 rounded-full text-xs font-medium text-white capitalize">
                    {event.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => {
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="gradient-bg text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            Create Your Magical Moment
          </button>
        </motion.div>
      </div>
    </section>
  )
}
