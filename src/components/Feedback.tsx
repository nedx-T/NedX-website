'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export function Feedback() {
  const [isVisible, setIsVisible] = useState(false)

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Wedding Planner',
      avatar: 'PS',
      rating: 5,
      review: 'The bionic butterflies were absolutely magical at our client\'s wedding! The guests were mesmerized. NedX team was professional and the choreography was stunning.',
      event: 'Grand Wedding Reception',
      location: 'Mumbai'
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      role: 'Corporate Events Manager',
      avatar: 'RM',
      rating: 5,
      review: 'We used NedX butterflies for our company\'s annual gala. The effect was breathtaking - it added a unique touch that everyone is still talking about!',
      event: 'Corporate Gala',
      location: 'Bangalore'
    },
    {
      id: 3,
      name: 'Ananya Patel',
      role: 'Bride',
      avatar: 'AP',
      rating: 5,
      review: 'My dream wedding became even more magical with NedX\'s butterfly drones. The moment they flew around us during our first dance was unforgettable!',
      event: 'Wedding Ceremony',
      location: 'Delhi'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'Event Organizer',
      avatar: 'VS',
      rating: 5,
      review: 'Flawless execution! The coordination with our lighting team was perfect. The butterflies created an ethereal atmosphere that elevated the entire event.',
      event: 'Product Launch',
      location: 'Hyderabad'
    },
    {
      id: 5,
      name: 'Meera Krishnan',
      role: 'Mother of the Bride',
      avatar: 'MK',
      rating: 5,
      review: 'Beyond expectations! The NedX team went above and beyond. The butterfly dance during the ceremony brought tears to everyone\'s eyes. Truly magical!',
      event: 'Wedding Ceremony',
      location: 'Chennai'
    },
    {
      id: 6,
      name: 'Arjun Reddy',
      role: 'Party Host',
      avatar: 'AR',
      rating: 5,
      review: 'Hired NedX for my daughter\'s 18th birthday bash. The butterfly show was the highlight of the evening. All her friends were amazed!',
      event: 'Birthday Celebration',
      location: 'Pune'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="feedback" className="relative py-20 bg-background overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Customer Love
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground"
          >
            What Our <span className="gradient-text">Clients</span> Say
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            Real experiences from real celebrations
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 transition-all duration-500 hover:shadow-xl hover:shadow-accent-purple/10 hover:border-accent-purple/30 hover:-translate-y-2">
                
                {/* Quote Icon */}
                <div className="absolute -top-4 -right-4 w-10 h-10 gradient-bg rounded-full flex items-center justify-center opacity-80">
                  <Quote className="w-5 h-5 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground/80 leading-relaxed mb-6 italic">
                  "{review.review}"
                </p>

                {/* Event Info */}
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="gradient-text font-semibold">{review.event}</span>
                  <span className="mx-2">•</span>
                  <span>{review.location}</span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{review.avatar}</span>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black gradient-text mb-2">500+</div>
              <div className="text-muted-foreground">Events Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black gradient-text mb-2">100%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black gradient-text mb-2">50+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black gradient-text mb-2">5.0</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
