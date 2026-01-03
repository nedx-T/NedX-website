import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// HTML escape function to prevent XSS attacks
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  preferredTime: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingRequest = await req.json();
    const { name, email, phone, eventType, preferredTime, message } = bookingData;

    console.log("Received booking request:", { name, email, phone, eventType, preferredTime });

    // Sanitize all user inputs for HTML embedding
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeEventType = escapeHtml(eventType);
    const safePreferredTime = escapeHtml(preferredTime);
    const safeMessage = message ? escapeHtml(message) : '';

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save booking to database
    const { data: booking, error: dbError } = await supabase
      .from("bookings")
      .insert({
        name,
        email,
        phone,
        event_type: eventType,
        preferred_time: preferredTime,
        message: message || null,
        status: "pending"
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to save booking: ${dbError.message}`);
    }

    console.log("Booking saved to database:", booking.id);

    // Send email notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: "NedX Technologies <onboarding@resend.dev>",
      to: ["nedxtechnology@gmail.com"],
      subject: `New Booking Request: ${safeEventType} - ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #9333ea, #3b82f6); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">🦋 New Booking Request</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; border-bottom: 2px solid #9333ea; padding-bottom: 10px;">Customer Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666;">Name:</td>
                <td style="padding: 10px 0; color: #333;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666;">Email:</td>
                <td style="padding: 10px 0; color: #333;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666;">Phone:</td>
                <td style="padding: 10px 0; color: #333;"><a href="tel:${safePhone}">${safePhone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666;">Event Type:</td>
                <td style="padding: 10px 0; color: #333;">${safeEventType}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666;">Preferred Contact Time:</td>
                <td style="padding: 10px 0; color: #333;">${safePreferredTime}</td>
              </tr>
            </table>
            
            ${safeMessage ? `
              <h3 style="color: #333; margin-top: 20px;">Additional Message:</h3>
              <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #9333ea; color: #555;">
                ${safeMessage}
              </p>
            ` : ''}
            
            <p style="margin-top: 30px; padding: 15px; background: #e8f4f8; border-radius: 5px; text-align: center; color: #666;">
              <strong>Booking ID:</strong> ${booking.id}<br>
              <small>This booking has been saved to your database</small>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Admin email sent successfully:", adminEmailResponse);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "NedX Technologies <onboarding@resend.dev>",
      to: [email],
      subject: `Booking Confirmation - Flappion by NedX 🦋`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #9333ea, #3b82f6); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🦋 Thank You, ${safeName}!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your booking request has been received</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              We're thrilled to receive your booking request for our magical Bionic Butterfly Drone experience! 🦋
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; background: linear-gradient(135deg, #f0e6fa, #e6f0fa); padding: 15px; border-radius: 10px; border-left: 4px solid #9333ea;">
              <strong>Our team will contact you within 24-48 hours</strong> to discuss your event details and create a customized experience just for you.
            </p>
            
            <div style="background: white; border-radius: 10px; padding: 20px; margin: 20px 0; border: 1px solid #e0e0e0;">
              <h3 style="color: #9333ea; margin: 0 0 15px 0; border-bottom: 2px solid #9333ea; padding-bottom: 10px;">Your Booking Details</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666; width: 40%;">Booking ID:</td>
                  <td style="padding: 8px 0; color: #333;">${booking.id}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Event Type:</td>
                  <td style="padding: 8px 0; color: #333;">${safeEventType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Preferred Contact Time:</td>
                  <td style="padding: 8px 0; color: #333;">${safePreferredTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">${safePhone}</td>
                </tr>
              </table>
            </div>

            <div style="background: linear-gradient(135deg, #f0e6fa, #e6f0fa); border-radius: 10px; padding: 20px; margin: 20px 0;">
              <h4 style="color: #9333ea; margin: 0 0 10px 0;">What happens next?</h4>
              <ul style="color: #555; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Our events team will review your request</li>
                <li>We'll contact you at your preferred time</li>
                <li>We'll discuss your event details and customize your experience</li>
                <li>Once confirmed, you'll receive a final confirmation with all the details</li>
              </ul>
            </div>
            
            <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
              Have questions? Contact us at<br>
              <a href="mailto:nedxtechnology@gmail.com" style="color: #9333ea;">nedxtechnology@gmail.com</a> | 
              <a href="tel:+919847870647" style="color: #9333ea;">+91 98478 70647</a>
            </p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} NedX Technologies. All rights reserved.<br>
                Flappion - Elevating Magical Moments with Wings
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Customer confirmation email sent successfully:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        bookingId: booking.id,
        message: "Booking saved and email sent successfully" 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
