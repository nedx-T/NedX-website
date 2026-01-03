import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { UserPlus, Loader2, Mail, Copy, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface InviteAdminFormProps {
  onSuccess?: () => void
}

export function InviteAdminForm({ onSuccess }: InviteAdminFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [invitationLink, setInvitationLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setLoading(true)
    setInvitationLink(null)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        toast.error('You must be logged in to send invitations')
        return
      }

      const { data, error } = await supabase.functions.invoke('create-admin-invitation', {
        body: { email }
      })

      if (error) {
        throw new Error(error.message || 'Failed to create invitation')
      }

      if (data?.error) {
        throw new Error(data.error)
      }

      // If email wasn't sent (no Resend API key), show the link
      if (data?.invitationLink) {
        setInvitationLink(data.invitationLink)
        toast.success('Invitation created! Share the link below with the new admin.')
      } else {
        toast.success(`Invitation email sent to ${email}`)
        setEmail('')
      }

      onSuccess?.()
    } catch (error: any) {
      console.error('Invite error:', error)
      toast.error(error.message || 'Failed to send invitation')
    } finally {
      setLoading(false)
    }
  }

  const copyLink = async () => {
    if (invitationLink) {
      await navigator.clipboard.writeText(invitationLink)
      setCopied(true)
      toast.success('Link copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <UserPlus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Invite New Admin</h3>
          <p className="text-purple-200/60 text-sm">Send a secure invitation link</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="invite-email" className="text-purple-200">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <Input
              id="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-200/40 pl-10"
              disabled={loading}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Invitation...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Send Invitation
            </>
          )}
        </Button>
      </form>

      <AnimatePresence>
        {invitationLink && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-purple-500/20"
          >
            <p className="text-sm text-purple-200/70 mb-2">
              Share this link with the new admin (expires in 48 hours):
            </p>
            <div className="flex items-center gap-2">
              <Input
                value={invitationLink}
                readOnly
                className="bg-slate-800/50 border-purple-500/20 text-purple-200 text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyLink}
                className="border-purple-500/30 text-purple-200 hover:bg-purple-500/20 shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 text-xs text-purple-200/40">
        The invitation link will expire in 48 hours. The recipient will need to create a password to complete their account setup.
      </p>
    </motion.div>
  )
}
