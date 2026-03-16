# Gagan Rai - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing my projects, skills, and experience as a Computer Science student.

## ✨ Features

- **Modern & Clean Design**: Beautiful UI with glassmorphism effects
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Fully Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- **Smooth Animations**: Eye-catching animations and transitions
- **Interactive Elements**: Hover effects, scroll animations, and more
- **Project Showcase**: Display your best projects with images and descriptions
- **Contact Form**: Functional contact form for visitors to reach out
- **Social Media Integration**: Links to GitHub, LinkedIn, and email

## 🚀 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (Vanilla)**: Interactive functionality without dependencies
- **Font Awesome**: Icons
- **Google Fonts**: Poppins font family

## 📂 File Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
└── README.md          # Documentation
```

## 🎨 Sections

1. **Home/Hero Section**
   - Introduction and tagline
   - Call-to-action buttons
   - Social media links
   - Animated profile image

2. **About Me**
   - Personal introduction
   - Interests and passions
   - Key highlights

3. **Skills**
   - Programming languages (Python, Java, JavaScript, C++)
   - Technologies & frameworks (Flask, Node.js, MongoDB, etc.)
   - Animated skill progress bars

4. **Projects**
   - Featured project cards
   - Project descriptions and tags
   - GitHub links

5. **Education**
   - Academic background
   - Degree information

6. **Contact**
   - Contact form
   - Contact information
   - Social media links

7. **Footer**
   - Quick navigation links
   - Social media links
   - Copyright information

## 🎯 Key Features Explained

### Dark/Light Mode
- Automatically saves user preference in localStorage
- Smooth transition between themes
- Custom color scheme for each mode

### Glassmorphism Effect
- Semi-transparent backgrounds with blur effect
- Modern, elegant appearance
- Used throughout cards and navigation

### Smooth Scrolling
- Animated scroll to sections
- Active navigation highlighting
- Scroll-to-top button

### Animations
- Fade-in effects on scroll
- Typing effect for hero subtitle
- Skill bar progress animations
- Hover effects on cards and buttons
- Cursor trail effect (desktop only)

## 🛠️ Customization Guide

### Update Personal Information

**In `index.html`:**

1. **Name and Title**: Update in the hero section
2. **Profile Images**: Replace placeholder URLs with your images
3. **About Me**: Edit the about section content
4. **Projects**: Update project details, images, and GitHub links
5. **Education**: Add your university details
6. **Social Links**: Update GitHub, LinkedIn, and email addresses

### Update Colors

**In `styles.css` (`:root` section):**

```css
--primary-color: #667eea;     /* Main brand color */
--secondary-color: #764ba2;   /* Secondary color */
--accent-color: #f093fb;      /* Accent color */
```

### Add Projects

**In `index.html`, add a new project card:**

```html
<div class="project-card">
    <div class="project-image">
        <img src="your-image-url" alt="Project Name">
        <div class="project-overlay">
            <a href="your-github-link" target="_blank" class="project-link">
                <i class="fab fa-github"></i>
            </a>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">Project description...</p>
        <div class="project-tags">
            <span class="tag">Tag1</span>
            <span class="tag">Tag2</span>
        </div>
    </div>
</div>
```

## 🌐 Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository
3. Go to Repository Settings → Pages
4. Select the main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify

1. Create account on [Netlify](https://www.netlify.com/)
2. Drag and drop your project folder
3. Your site will be deployed instantly

### Vercel

1. Create account on [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Deploy with one click

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 🔧 Setup Instructions

1. **Download/Clone the project**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required

3. **Customize**
   - Edit HTML, CSS, and JS files as needed
   - Replace placeholder content with your information

## 💡 Tips

- Replace all placeholder images with your actual images
- Update all social media links with your profiles
- Customize the color scheme to match your preference
- Add more projects as you complete them
- Keep the content updated regularly

## 📧 Contact Form Setup

The contact form currently shows a success notification. To make it functional:

### Telegram Notification (Implemented)

The project now includes an API route at `api/contact.js` that forwards contact form messages to Telegram.

1. Create a Telegram bot using `@BotFather` and copy the bot token.
2. Get your chat ID:
   - Send a message to your bot in Telegram.
   - Open: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find `chat.id` in the JSON response.
3. Add environment variables on your hosting platform:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
4. Deploy on a platform that supports serverless functions (recommended: Vercel).

Important:
- GitHub Pages is static hosting only, so `api/contact.js` will not run there.
- For Telegram notifications, deploy this project to Vercel/Netlify (with serverless functions enabled).

1. **Using Formspree** (Easy):
   ```html
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```

2. **Using EmailJS** (Free):
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Add EmailJS SDK and configure

3. **Backend API** (Advanced):
   - Create your own backend API
   - Send form data to your server

## 📄 License

This project is open source and available for personal use. Feel free to modify and use it for your own portfolio.

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Placeholder images from placeholder.com (replace with your own)

---

**Made with ❤️ by Gagan Rai**

If you like this portfolio, give it a ⭐ on GitHub!
