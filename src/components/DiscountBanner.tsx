'use client'

import { motion } from 'framer-motion'
import { Sparkles, Gift, Percent } from 'lucide-react'

export function DiscountBanner() {
  return (
    <section className="relative py-8 bg-gradient-to-r from-accent-purple via-purple-600 to-accent-blue overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center"
        >
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-yellow-300 animate-pulse" />
            <span className="text-white/80 text-sm sm:text-base font-medium">Early Bird Offer</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
              Be Our First Customer & Get Up To{' '}
              <span className="text-yellow-300">50% OFF</span>
            </h3>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-white text-purple-700 font-bold px-6 py-2 rounded-full hover:bg-yellow-300 transition-colors cursor-pointer"
          >
            Claim Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
