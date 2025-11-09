export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const formData = await request.json();
    
    // Email configuration
    const emailData = {
      to: 'xbc@xtrabyte.com',
      from: 'noreply@xtrabyte-cybersecurity.vercel.app',
      subject: `New Quote Request from ${formData.firstName} ${formData.lastName}`,
      html: `
        <h2>New Quote Request</h2>
        
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>Job Title:</strong> ${formData.title || 'Not provided'}</p>
        
        <h3>Service Requirements</h3>
        <p><strong>Services Interested In:</strong></p>
        <ul>
          ${Array.isArray(formData.services) 
            ? formData.services.map(s => `<li>${s}</li>`).join('') 
            : '<li>Not specified</li>'}
        </ul>
        <p><strong>Industry:</strong> ${formData.industry}</p>
        <p><strong>Company Size:</strong> ${formData.companySize}</p>
        <p><strong>Timeline:</strong> ${formData.timeline}</p>
        <p><strong>Budget Range:</strong> ${formData.budget || 'Not provided'}</p>
        
        <h3>Project Details</h3>
        <p><strong>Description:</strong></p>
        <p>${formData.details}</p>
        
        <p><strong>Current Security Measures:</strong></p>
        <p>${formData.currentSecurity || 'Not provided'}</p>
        
        <hr>
        <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
      `
    };

    // Use Resend API for sending emails
    // Note: You'll need to set up a RESEND_API_KEY environment variable in Vercel
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      // Fall back to just logging for now
      console.log('Quote request received:', formData);
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Quote request received (email service not configured)' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!resendResponse.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Quote request submitted successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing quote request:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process quote request',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
