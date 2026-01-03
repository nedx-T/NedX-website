'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Crown, Diamond, Sparkles } from 'lucide-react'

export function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)

  const packages = [
    {
      id: 'silver',
      name: 'Silver',
      icon: Sparkles,
      price: 'Contact Us',
      description: 'Perfect for intimate celebrations',
      color: 'from-slate-400 to-slate-300',
      borderColor: 'border-slate-400',
      features: [
        '1 Bionic Butterfly Drone',
        '2 Hour Event Coverage',
        '1 Event Session',
        'Basic Choreography',
        'Setup & Teardown Included',
        'Event Coordination'
      ],
      popular: false
    },
    {
      id: 'gold',
      name: 'Gold',
      icon: Star,
      price: 'Contact Us',
      description: 'Ideal for weddings & corporate events',
      color: 'from-amber-400 to-yellow-300',
      borderColor: 'border-amber-400',
      features: [
        '2 Bionic Butterfly Drones',
        '5 Hour Event Coverage',
        '2 Event Sessions',
        'Custom Choreography',
        'Premium Setup & Teardown',
        'Dedicated Event Manager',
        'Photo/Video Integration'
      ],
      popular: true
    },
    {
      id: 'platinum',
      name: 'Platinum',
      icon: Crown,
      price: 'Contact Us',
      description: 'For grand celebrations & galas',
      color: 'from-purple-400 to-violet-300',
      borderColor: 'border-purple-400',
      features: [
        '3 Bionic Butterfly Drones',
        '8 Hour Event Coverage',
        'Multiple Event Sessions',
        'Customizable Themes',
        'Full Production Team',
        'Priority Support 24/7',
        'Venue Coordination',
        'Custom Lighting Sync'
      ],
      popular: false
    },
    {
      id: 'diamond',
      name: 'Diamond',
      icon: Diamond,
      price: 'Custom Quote',
      description: 'Ultimate luxury experience',
      color: 'from-cyan-400 to-blue-300',
      borderColor: 'border-cyan-400',
      features: [
        'Unlimited Butterfly Drones',
        'Full Day Coverage',
        'Unlimited Event Sessions',
        'Bespoke Choreography',
        'White Glove Service',
        'VIP Priority Access',
        'Multiple Venue Support',
        'Custom Drone Colors',
        'Exclusive Premiere Access'
      ],
      popular: false
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="services" className="relative py-20 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-accent-blue/10 rounded-full blur-2xl" />
      </div>

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
            <span className="text-sm font-semibold text-purple-300">
              Premium Packages
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-white"
          >
            Our <span className="gradient-text">Butterfly</span> Packages
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-purple-200/80 leading-relaxed max-w-3xl mx-auto"
          >
            Choose the perfect experience for your special event
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`relative group ${pkg.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="gradient-bg text-white text-sm font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div 
                className={`relative h-full bg-slate-800/50 backdrop-blur-sm rounded-2xl border-2 ${pkg.borderColor} p-6 transition-all duration-500 ${
                  hoveredPackage === pkg.id ? 'scale-105 shadow-2xl shadow-purple-500/20' : 'hover:shadow-lg'
                } ${pkg.popular ? 'ring-2 ring-purple-500/50' : ''}`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-6 mx-auto`}>
                  <pkg.icon className="w-8 h-8 text-slate-900" />
                </div>

                {/* Package Name */}
                <h3 className="text-2xl font-black text-white text-center mb-2">
                  {pkg.name}
                </h3>

                {/* Description */}
                <p className="text-purple-200/70 text-center text-sm mb-6">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-3xl font-black gradient-text">
                    {pkg.price}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-slate-900" />
                      </div>
                      <span className="text-purple-100/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button 
                  onClick={() => {
                    const contactSection = document.getElementById('contact')
                    contactSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    pkg.popular 
                      ? 'gradient-bg text-white hover:opacity-90' 
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  Book {pkg.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-purple-200/60 text-sm">
            All packages include professional setup, safety briefing, and cleanup. Custom packages available upon request.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
