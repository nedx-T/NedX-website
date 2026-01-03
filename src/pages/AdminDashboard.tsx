'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LogOut, 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  User, 
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  RefreshCw,
  UserPlus
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { InviteAdminForm } from '@/components/InviteAdminForm'
import nedxLogo from '@/assets/nedx-logo.png'

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  event_type: string
  preferred_time: string
  message: string | null
  status: string
  created_at: string
  updated_at: string
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isAdmin, setIsAdmin] = useState(false)
  const [showInviteForm, setShowInviteForm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      navigate('/admin/auth')
      return
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')

    if (!roles || roles.length === 0) {
      toast.error('Access denied. Admin privileges required.')
      await supabase.auth.signOut()
      navigate('/admin/auth')
      return
    }

    setIsAdmin(true)
    fetchBookings()
  }

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBookings(data || [])
    } catch (error: any) {
      toast.error('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      
      setBookings(prev => 
        prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
      )
      toast.success(`Booking status updated to ${newStatus}`)
    } catch (error: any) {
      toast.error('Failed to update status')
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setBookings(prev => prev.filter(b => b.id !== id))
      toast.success('Booking deleted successfully')
    } catch (error: any) {
      toast.error('Failed to delete booking')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/auth')
  }

  const filteredBookings = statusFilter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === statusFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'confirmed': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={nedxLogo} alt="NedX" className="h-12" />
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-purple-200/60 text-sm">Manage Bookings</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowInviteForm(!showInviteForm)}
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-200 hover:bg-purple-500/20"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Admin
            </Button>
            <Button
              onClick={fetchBookings}
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-200 hover:bg-purple-500/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-300 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Invite Admin Form */}
        {showInviteForm && (
          <div className="mb-8">
            <InviteAdminForm onSuccess={() => setShowInviteForm(false)} />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6"
          >
            <p className="text-purple-200/60 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6"
          >
            <p className="text-yellow-200/60 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-300 mt-1">{stats.pending}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-emerald-500/20 p-6"
          >
            <p className="text-emerald-200/60 text-sm">Confirmed</p>
            <p className="text-3xl font-bold text-emerald-300 mt-1">{stats.confirmed}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6"
          >
            <p className="text-blue-200/60 text-sm">Completed</p>
            <p className="text-3xl font-bold text-blue-300 mt-1">{stats.completed}</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-purple-200">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter by status:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === status
                    ? 'gradient-bg text-white'
                    : 'bg-slate-800/50 text-purple-200/70 hover:bg-slate-700/50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-purple-200/60 text-lg">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Customer Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{booking.name}</h3>
                        <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-purple-200/70">
                        <Mail className="w-4 h-4 text-purple-400" />
                        <a href={`mailto:${booking.email}`} className="hover:text-purple-300">{booking.email}</a>
                      </div>
                      <div className="flex items-center gap-2 text-purple-200/70">
                        <Phone className="w-4 h-4 text-purple-400" />
                        <a href={`tel:${booking.phone}`} className="hover:text-purple-300">{booking.phone}</a>
                      </div>
                      <div className="flex items-center gap-2 text-purple-200/70">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span>{booking.event_type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-200/70">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span>{booking.preferred_time}</span>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="bg-slate-700/30 rounded-lg p-3 text-purple-200/70 text-sm">
                        <strong className="text-purple-300">Message:</strong> {booking.message}
                      </div>
                    )}

                    <p className="text-xs text-purple-200/40">
                      Submitted: {formatDate(booking.created_at)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                      className="bg-slate-700/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <Button
                      onClick={() => deleteBooking(booking.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
