import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AcceptInvitationRequest {
  token: string;
  password: string;
}

// Hash a token using SHA-256 for comparison with stored hash
async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, password }: AcceptInvitationRequest = await req.json();

    // Validate inputs
    if (!token || token.length !== 64) {
      return new Response(
        JSON.stringify({ error: "Invalid invitation token" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!password || password.length < 8) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 8 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    console.log("Looking up invitation token");

    // Hash the provided token to compare with stored hash
    const hashedToken = await hashToken(token);

    // Find the invitation by hashed token
    const { data: invitation, error: invitationError } = await supabase
      .from("admin_invitations")
      .select("*")
      .eq("token", hashedToken) // Compare hashed values
      .single();

    if (invitationError || !invitation) {
      console.log("Invitation not found:", invitationError?.message);
      return new Response(
        JSON.stringify({ error: "Invalid or expired invitation" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if invitation is used
    if (invitation.used) {
      return new Response(
        JSON.stringify({ error: "This invitation has already been used" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if invitation is expired
    if (new Date(invitation.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "This invitation has expired" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Valid invitation found for:", invitation.email);

    let userId: string;

    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === invitation.email);

    if (existingUser) {
      console.log("User already exists, updating password and adding admin role");
      userId = existingUser.id;
      
      // Update password for existing user
      const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
        password
      });

      if (updateError) {
        console.error("Failed to update user password:", updateError);
        return new Response(
          JSON.stringify({ error: "Failed to update user account" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: invitation.email,
        password,
        email_confirm: true
      });

      if (createError || !newUser.user) {
        console.error("Failed to create user:", createError);
        return new Response(
          JSON.stringify({ error: "Failed to create user account" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log("User created:", newUser.user.id);
      userId = newUser.user.id;
    }

    // Check if admin role already exists
    const { data: existingRoles } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", userId)
      .eq("role", "admin");

    if (!existingRoles || existingRoles.length === 0) {
      // Assign admin role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: "admin" });

      if (roleError) {
        console.error("Failed to assign admin role:", roleError);
        return new Response(
          JSON.stringify({ error: "Failed to assign admin role" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log("Admin role assigned successfully");
    } else {
      console.log("User already has admin role");
    }

    // Mark invitation as used
    const { error: updateError } = await supabase
      .from("admin_invitations")
      .update({ used: true })
      .eq("id", invitation.id);

    if (updateError) {
      console.error("Failed to mark invitation as used:", updateError);
      // Don't fail the request, user is already set up
    }

    console.log("Invitation accepted successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Admin account created successfully",
        email: invitation.email
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in accept-admin-invitation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
