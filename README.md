# Basudev Naidu Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and journey as a software engineer. Built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Hacker-themed Preloader**: Interactive terminal-style preloader with 8 terminal windows displaying hacking animations
- **Smooth Animations**: Powered by Framer Motion for seamless transitions and interactions
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Scrolling**: Enhanced navigation experience with smooth scroll behavior
- **Scroll-to-Top Button**: Floating button for easy navigation
- **AI Assistant**: Interactive AI chat and ideas generation powered by Groq
- **Contact Form**: Functional contact form with EmailJS integration
- **Social Links**: Links to LinkedIn, Instagram, Telegram, and email
- **MIT License**: Open source under MIT License
- **Loading Skeletons**: Skeleton loaders for improved perceived performance
- **SEO Optimized**: Comprehensive meta tags for better search engine visibility

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **AI Service**: Groq API
- **Email Service**: EmailJS
- **Git**: Version control

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/BasudevNaidu/BasudevNaiduPortfolio.git
```

2. Navigate to the project directory:
```bash
cd BasudevNaiduPortfolio
```

3. Navigate to the frontend directory:
```bash
cd frontend
```

4. Install dependencies:
```bash
npm install
```

5. Create a `.env` file in the frontend directory with your Groq API key:
```bash
VITE_GROQ_API_KEY=your_groq_api_key_here
```

6. Start the development server:
```bash
npm run dev
```

7. Open your browser and visit:
```
http://localhost:5173
```

## 🔑 Groq API Configuration

The AI assistant uses Groq API for chat and ideas generation. To configure it:

1. Sign up at [Groq Console](https://console.groq.com/)
2. Create a new API key
3. Add the API key to `frontend/.env`:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

## 📧 EmailJS Configuration

The contact form uses EmailJS for sending emails. To configure it for your use:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a new email service
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update the EmailJS credentials in `frontend/src/sections/Contact.jsx`:
   - Replace `service_ow01fsr` with your Service ID
   - Replace `template_4hg34pg` with your Template ID
   - Replace `WX5kjfvooAFMo2YWH` with your Public Key
   - Update `to_email` with your email address

## 📝 Project Structure

```
BasudevNaiduPortfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── contexts/
│   │   ├── services/
│   │   └── data/
│   ├── index.html
│   └── package.json
├── LICENSE
└── README.md
```

## 🎨 Sections

- **Hero**: Introduction with animated profile, taglines, and stats
- **About**: Personal information and background
- **Education**: Educational background and achievements
- **Skills**: Technical skills and proficiency
- **Projects**: Featured projects with descriptions
- **Coding**: Coding platforms and profiles
- **Certifications**: Certifications and achievements
- **Contact**: Contact form and social links
- **Footer**: Copyright, quick links, and MIT License link

## 🌐 Deployment

This project is deployed on GitHub Pages. You can view it at:
```
https://basudevnaidu.github.io/BasudevNaiduPortfolio/
```

## 📧 Contact

- **Email**: basudevnaidu2@gmail.com
- **LinkedIn**: [LinkedIn Profile]
- **GitHub**: [GitHub Profile]

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/BasudevNaidu/BasudevNaiduPortfolio/issues).

## ⭐ Star this Repository

If you find this project helpful or interesting, please consider giving it a star on GitHub!

---

Made with ❤️ by Naidu Basudev
