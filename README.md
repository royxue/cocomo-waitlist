# COCOMO Waitlist Landing Page

A beautiful, responsive waitlist landing page for the COCOMO companion robot, designed specifically for the Japanese market.

## 🎨 Features

- **Japanese-focused design** with warm, inviting colors
- **Smooth animations** using Framer Motion
- **Real-time email collection** via Supabase
- **Responsive design** optimized for all devices
- **Vercel-ready** deployment configuration

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project dashboard
3. Navigate to **Settings → API**
4. Copy your project URL and anon key

### 3. Create Database Table

In your Supabase SQL editor, run:

```sql
-- Create the waitlist table
CREATE TABLE waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  source text DEFAULT 'landing_page'
);

-- Option 1: Simple setup - Disable RLS (recommended for waitlist)
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

-- Option 2: Enable RLS with proper policies (if you need more security)
-- ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable insert for waitlist" ON waitlist FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Enable select for waitlist" ON waitlist FOR SELECT USING (true);
```

**Note**: For a simple waitlist, disabling RLS is recommended. If you need more security later, you can enable RLS with proper policies.

### 4. Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your landing page!

## 📊 Managing Your Waitlist

### View Collected Emails

You can view your collected emails in several ways:

1. **Supabase Dashboard**: Go to your project → Table Editor → waitlist
2. **API Endpoint**: `GET /api/waitlist` returns all entries with count
3. **Export**: Use Supabase dashboard to export as CSV

### Sample API Response
```json
{
  "count": 1250,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "created_at": "2024-01-15T10:30:00Z",
      "source": "landing_page"
    }
  ]
}
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

Vercel will automatically detect Next.js and configure everything for you.

## 📱 Customization

### Colors
Edit `tailwind.config.js` to adjust the warm color palette:
- `warm`: Main brand colors
- `cherry`: Accent colors
- `sand`: Supporting tones

### Content
Update Japanese text in `app/page.tsx`:
- Hero messaging
- Feature descriptions
- Form labels

### Animations
Modify animations in `app/page.tsx` using Framer Motion components.

## 🔧 Tech Stack

- **Next.js 14** - React framework with app router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Supabase** - Backend and database
- **Vercel** - Hosting platform

## 📈 Analytics

Consider adding analytics to track:
- Page views
- Signup conversion rate
- Traffic sources
- User behavior

Popular options:
- Google Analytics
- Vercel Analytics
- Plausible

## 🛡️ Security

The setup includes:
- Input validation
- Duplicate email prevention
- Rate limiting (recommended to add)
- CORS protection
- Environment variable security

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure Supabase table and policies are created
4. Test the API endpoints directly

---

Built with ❤️ for the Japanese market