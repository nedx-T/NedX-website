'use client'

import { motion } from 'framer-motion'
import { IndianRupee, Sparkles, BadgePercent } from 'lucide-react'

export function PackagesPricingBanner() {
  return (
    <div className="relative py-10 bg-gradient-to-r from-slate-800 via-purple-900/80 to-slate-800 overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-10 w-40 h-40 bg-accent-purple/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-accent-blue/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap">
            {/* Pricing info */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <IndianRupee className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-semibold text-lg">
                Packages Starting From{' '}
                <span className="text-yellow-300 font-black text-xl">₹10,999</span>
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-white/30" />

            {/* Discount offer */}
            <div className="flex items-center gap-3">
              <BadgePercent className="w-6 h-6 text-emerald-400" />
              <span className="text-white/90 font-medium text-lg">
                Be Our Pioneer Customer & Avail{' '}
                <span className="text-emerald-400 font-black">Up To 50% Discount</span>
              </span>
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="gradient-bg text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
            >
              Get Your Exclusive Quote
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
