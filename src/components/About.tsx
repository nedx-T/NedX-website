'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Heart, Shield } from 'lucide-react'
import modelButterfly from '@/assets/model-butterfly.jpeg'

export function About() {
  const [isVisible, setIsVisible] = useState(false)

  const features = [
    {
      icon: Sparkles,
      title: 'Bionic Technology',
      description: 'State-of-the-art butterfly drones with realistic wing movements and LED illumination',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Zap,
      title: 'Silent Operation',
      description: 'Ultra-quiet motors ensure your event ambiance remains undisturbed',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Custom Choreography',
      description: 'Professionally programmed flight patterns tailored to your event theme',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Advanced collision avoidance and certified safe for indoor events',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="about" className="relative py-20 bg-background overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />

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
              About NedX Technologies
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground"
          >
            The Magic Behind <span className="gradient-text">Flappion</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto"
          >
            NedX Technologies pioneers the future of event entertainment with our revolutionary bionic butterfly drones. 
            We transform ordinary moments into extraordinary memories through cutting-edge aerial artistry.
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto mb-20">
          
          {/* Left - Butterfly Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glowing Background */}
              <div className="absolute inset-0 gradient-bg rounded-3xl blur-3xl opacity-30" />
              
              {/* Model Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={modelButterfly} 
                  alt="Bionic Butterfly Drone Model" 
                  className="w-full h-full object-contain rounded-2xl drop-shadow-2xl"
                />
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-5 left-5 w-14 h-14 gradient-bg rounded-full flex items-center justify-center float-gentle shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute top-16 right-5 w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center float-gentle shadow-lg" style={{ animationDelay: '1s' }}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute bottom-16 left-12 w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center float-gentle shadow-lg" style={{ animationDelay: '2s' }}>
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Elevating Events with Innovation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our bionic butterfly drones are the world's first premium aerial decor solution designed 
                specifically for celebrations. Each drone features lifelike wing movements, customizable 
                LED colors, and synchronized choreography that captivates audiences.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Perfect for Every Occasion
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether it's a grand wedding, corporate gala, product launch, or intimate celebration, 
                our butterfly drones add an unforgettable touch of magic. We specialize in creating 
                custom experiences that align with your event's theme and vision.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium">
                🎊 Weddings
              </span>
              <span className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium">
                🏢 Corporate Events
              </span>
              <span className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium">
                🎂 Celebrations
              </span>
              <span className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium">
                🎭 Inaugurations
              </span>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 transition-all duration-500 hover:shadow-xl hover:shadow-accent-purple/10 hover:border-accent-purple/30 hover:-translate-y-2 text-center">
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
