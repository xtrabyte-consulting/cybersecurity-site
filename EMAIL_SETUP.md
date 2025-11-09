# XtraByte Cybersecurity Website - Email Setup Instructions

## Email Configuration for Quote Form

The quote form submissions are configured to be sent to **xbc@xtrabyte.com**.

### Setup Options

#### Option 1: Using Resend (Recommended for Vercel)

1. Sign up for a free account at [resend.com](https://resend.com)
2. Get your API key from the Resend dashboard
3. Add the API key to your Vercel environment variables:
   ```bash
   RESEND_API_KEY=your_api_key_here
   ```
4. Verify your domain with Resend to send from `@xtrabyte.com` or use `noreply@resend.dev` for testing

#### Option 2: Using Web3Forms (Simpler alternative)

If you prefer a simpler solution without backend API setup:

1. Sign up at [web3forms.com](https://web3forms.com) (free)
2. Get your access key
3. Update the form action in `src/pages/quote.astro`:
   ```html
   <form class="quote-form" action="https://api.web3forms.com/submit" method="POST">
     <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
     <input type="hidden" name="redirect" value="https://xtrabyte-cybersecurity.vercel.app/thank-you">
     <!-- rest of form fields -->
   </form>
   ```

#### Option 3: Using Formspree

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get the endpoint URL
3. Update form action to: `https://formspree.io/f/{your-form-id}`

### Testing Email Delivery

After deploying to Vercel:

1. Go to your quote page: `https://your-site.vercel.app/quote`
2. Fill out the form completely
3. Submit the form
4. Check xbc@xtrabyte.com inbox (may take a few minutes)
5. Check spam folder if email doesn't arrive

### Environment Variables in Vercel

To set environment variables in Vercel:

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add `RESEND_API_KEY` with your API key
4. Redeploy your site for changes to take effect

### Current Implementation

The form currently:
- Submits to `/api/quote` endpoint
- Validates all required fields
- Collects comprehensive quote information
- Formats data into a professional email
- Shows loading state during submission
- Displays success/error messages to users

### Email Content

Each submission includes:
- Contact Information (name, email, phone, company, title)
- Service Requirements (selected services, industry, company size, timeline, budget)
- Project Details and current security measures
- Timestamp of submission

All emails are sent to: **xbc@xtrabyte.com**
