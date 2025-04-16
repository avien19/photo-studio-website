# Photography Studio Website Template

## Overview
This project was originally developed as a custom website for a photography studio client. While the client project was discontinued, I've decided to open-source the codebase as a modern, responsive template for photography studios and creative professionals.

## Features
- 🎨 Modern, minimalist design
- 📱 Fully responsive layout
- 🖼️ Dynamic image gallery with Supabase integration
- 🌓 Smooth animations and transitions
- 📝 Contact form functionality
- 🔍 Portfolio filtering system
- 🎯 SEO optimized
- 🚀 Built with performance in mind

## Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase (for image storage and management)
- Framer Motion (for animations)
- Shadcn UI Components

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- pnpm (recommended) or npm
- Supabase account (for image storage)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/photo-studio-website.git
cd photo-studio-website
```

2. Install dependencies
```bash
pnpm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. Run the development server
```bash
pnpm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment

This template is optimized for deployment on Vercel. To deploy:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add your environment variables in Vercel's project settings
4. Deploy!

## Customization

### Images
- Replace placeholder images in the `/public` directory with your own
- Update image references in components as needed
- Configure Supabase storage for dynamic image management

### Content
- Modify text content in `app/page.tsx`
- Update services in the services section
- Customize portfolio categories
- Edit contact information

### Styling
- Colors can be adjusted in `tailwind.config.ts`
- Component styles are in their respective files under `components/`
- Global styles are in `app/globals.css`

## Developer Info

### Original Developer
- **Name**: Avie Balois
- **GitHub**: [github.com/avien19](https://github.com/avien19)
- **Portfolio**: [avien.site](https://portfolio-avien.vercel.app/)

### Contributing
While this is primarily a template, contributions are welcome! Feel free to:
- Report bugs
- Suggest enhancements
- Submit pull requests

### License
This project is open source and available under the MIT License.

## Support
If you find this template helpful, please consider:
- Starring the repository
- Sharing it with others
- Following the developer on GitHub

## Acknowledgments
- Original design inspiration from modern photography portfolios
- Built with [Shadcn UI](https://ui.shadcn.com/) components
- Icons from [Lucide Icons](https://lucide.dev/)

---

*Note: This template is provided as-is, without warranty or guaranteed support. Feel free to use it as a starting point for your own photography studio website!* 