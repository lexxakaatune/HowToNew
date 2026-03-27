# HowTo - Tutorial Website

A comprehensive tutorial website with categories, search functionality, admin dashboard, feedback system, and ad monetization.

![HowTo Website](https://your-screenshot-url-here.png)

## 🌐 Live Demo

**Website**: https://lexxakaatune.github.io/HowToNew/

**reset**: https://lexxakaatune.github.io/HowToNew/?reset=1

**Admin Panel**: https://lexxakaatune.github.io/HowToNew/#/admin/login

## ✨ Features

### User Features
- 🔍 **Search** - Full-text search across all articles
- 📂 **Categories** - Browse by topic (Automotive, Gardening, Cooking, Technology, Home Repair, Health)
- 📖 **Articles** - Step-by-step guides with images
- 💬 **Feedback** - Request articles or report issues
- 🔖 **Bookmark** - Save articles for later
- 📤 **Share** - Social sharing (Facebook, Twitter, LinkedIn)
- 📱 **Responsive** - Works on all devices

### Admin Features
- 📊 **Dashboard** - View stats and analytics
- 📝 **Article Management** - Create, edit, delete articles
- 💌 **Feedback Management** - View and respond to user feedback
- 🔐 **Secure Login** - Protected admin panel

### Monetization
- 🎯 **4 Ad Networks** - Google AdSense, Media.net, PropellerAds, Adsterra
- 📍 **Multiple Placements** - Banner, sidebar, in-article ads

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lexxakaatune/HowTo.git
cd HowTo

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 👤 Admin Credentials

- **Username**: `codeByLex`
- **Password**: `LexHowTo2024!`

To change the password, edit `src/data/store.ts`:

```typescript
export const ADMIN_CREDENTIALS = {
  username: 'codeByLex',
  password: 'YourNewPasswordHere',
};
```

## 💰 Ad Monetization Setup

See [AD-MONETIZATION-GUIDE.md](./AD-MONETIZATION-GUIDE.md) for detailed instructions on setting up ads.

### Quick Setup

1. **Google AdSense**
   - Sign up at https://google.com/adsense
   - Add your site: `https://lexxakaatune.github.io/HowTo/`
   - Replace code in `src/components/ads/AdBanner.tsx`

2. **Media.net**
   - Sign up at https://media.net
   - Add code to `src/components/ads/AdInArticle.tsx`

3. **PropellerAds**
   - Sign up at https://propellerads.com
   - Add code to `index.html`

4. **Adsterra**
   - Sign up at https://adsterra.com
   - Add code to `src/components/ads/AdSidebar.tsx`

## 📁 Project Structure

```
HowTo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/                      # Static assets
│   └── *.jpg                   # Article images
├── src/
│   ├── components/
│   │   ├── ads/                # Ad components
│   │   │   ├── AdBanner.tsx
│   │   │   ├── AdSidebar.tsx
│   │   │   └── AdInArticle.tsx
│   │   └── ui/                 # UI components
│   ├── data/
│   │   ├── categories.ts       # Category definitions
│   │   └── store.ts            # Data store & functions
│   ├── pages/
│   │   ├── admin/              # Admin pages
│   │   │   ├── AdminLogin.tsx
│   │   │   └── AdminDashboard.tsx
│   │   ├── Home.tsx
│   │   ├── SearchResults.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── ArticlePage.tsx
│   │   └── FeedbackPage.tsx
│   ├── sections/               # Page sections
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Categories.tsx
│   │   ├── FeaturedGuides.tsx
│   │   ├── LatestArticles.tsx
│   │   ├── Newsletter.tsx
│   │   └── Footer.tsx
│   ├── App.tsx                 # Main app with routing
│   └── main.tsx                # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State**: localStorage (client-side)
- **Deployment**: GitHub Pages

## 📝 Adding New Articles

### Method 1: Through Admin Panel
1. Login at `/admin/login`
2. Go to "Articles" → "New Article"
3. Fill in details and save

### Method 2: Edit Code
Add to `src/data/categories.ts`:

```typescript
{
  id: 'your-article-id',
  title: 'How to Do Something',
  description: 'Brief description...',
  category: 'Category Name',
  categoryId: 'category-id',
  readTime: 10,
  image: '/your-image.jpg',
  featured: false,
  content: [
    'Step 1: Do this...',
    'Step 2: Do that...',
    // ... more steps
  ]
}
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:

```javascript
colors: {
  red: {
    600: '#your-color',
  }
}
```

### Change Logo
Edit `src/sections/Navigation.tsx`:

```tsx
<span className="text-2xl font-bold text-white">
  Your<span className="text-red-600">Logo</span>
</span>
```

## 📊 Analytics

Add Google Analytics to track visitors:

1. Sign up at https://analytics.google.com
2. Create a property for your website
3. Add the tracking code to `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Deployment

This project uses GitHub Actions for automatic deployment.

### Setup

1. Go to your repository settings
2. Click "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. Push to `main` branch - it will auto-deploy!

### Manual Deployment

```bash
npm run build
# Copy dist folder contents to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

If you have questions or need help:

1. Check the [AD-MONETIZATION-GUIDE.md](./AD-MONETIZATION-GUIDE.md)
2. Open an issue on GitHub
3. Email: your-email@example.com

---

**Made with ❤️ by codeByLex**
