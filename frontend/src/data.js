import {
  FaHome,
  FaUser,
  FaGraduationCap,
  FaCode,
  FaProjectDiagram,
  FaTerminal,
  FaCertificate,
  FaEnvelope,
  FaJava,
  FaPython,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaDocker,
  FaDatabase,
  FaTools,
  FaVial,
  FaSitemap,
  FaLayerGroup,
  FaCodeBranch,
} from 'react-icons/fa'
import {
  SiC,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiJenkins,
  SiKubernetes,
  SiPostman,
  SiPycharm,
  SiEclipseide,
  SiSelenium,
  SiJunit5,
  SiSqlite,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

export const NAV_ITEMS = [
  { id: 'home', label: 'home', Icon: FaHome },
  { id: 'about', label: 'about', Icon: FaUser },
  { id: 'education', label: 'Education', Icon: FaGraduationCap },
  { id: 'skills', label: 'skills', Icon: FaCode },
  { id: 'projects', label: 'Project', Icon: FaProjectDiagram },
  { id: 'coding', label: 'coding profile', Icon: FaTerminal },
  { id: 'certifications', label: 'certifications', Icon: FaCertificate },
  { id: 'contact', label: 'get in touch', Icon: FaEnvelope },
]

export const HERO_TAGLINES = [
  'Aspiring Software Engineer',
  'Full Stack Developer',
  'Open Source Contributor',
  'Turning ideas to code',
  'Code. Break. Optimize. Repeat.',
]

export const EDUCATION = [
  {
    title: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering',
    school: 'K L E F Deemed To Be University',
    period: '2023 - 2027',
    place: 'Vijayawada, Andhra Pradesh, India',
    gpa: 'GPA: 9.07/10',
    logo: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/kl-university-guntur-india.webp?updatedAt=1776779337331',
  },
  {
    title: 'Senior Secondary (Class 12) — MPCB',
    school: 'St. Xavier High School (CBSE)',
    period: '2021 - 2023',
    place: 'Berhampur, Odisha, India',
    gpa: 'GPA: 8.1/10',
    logo: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/St-Xaviers-High-School-Ambapua-Berhampur-Logo.webp',
  },
  {
    title: 'Secondary (Class 10)',
    school: 'Sunabeda Public School (ICSE)',
    period: '2020 - 2021',
    place: 'Sunabeda, Odisha, India',
    gpa: 'GPA: 9.16/10',
    logo: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/sunabeda-public-school.png',
  },
]

export const SKILLS = [
  {
    title: 'Programming Languages',
    Icon: FaCode,
    color: 'from-brand-500 to-brand-300',
    items: [
      { name: 'C', Icon: SiC, color: '#00599C' },
      { name: 'Java', Icon: FaJava, color: '#E76F00' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Python', Icon: FaPython, color: '#3776AB' },
    ],
  },
  {
    title: 'Frameworks & Platforms',
    Icon: FaLayerGroup,
    color: 'from-accent-pink to-brand-400',
    items: [
      { name: 'React.js', Icon: FaReact, color: '#61DAFB' },
      { name: 'Node.js', Icon: FaNodeJs, color: '#3C873A' },
      { name: 'Express.js', Icon: SiExpress, color: '#222222' },
    ],
  },
  {
    title: 'Databases',
    Icon: FaDatabase,
    color: 'from-accent-mint to-brand-400',
    items: [
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      { name: 'SQL', Icon: SiSqlite, color: '#003B57' },
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
    ],
  },
  {
    title: 'Version Control & DevOps',
    Icon: FaCodeBranch,
    color: 'from-accent-peach to-accent-pink',
    items: [
      { name: 'Git', Icon: FaGitAlt, color: '#F05032' },
      { name: 'GitHub', Icon: FaGithub, color: '#181717' },
      { name: 'GitLab', Icon: FaGitlab, color: '#FC6D26' },
      { name: 'Docker', Icon: FaDocker, color: '#2496ED' },
      { name: 'Jenkins', Icon: SiJenkins, color: '#D24939' },
      { name: 'Kubernetes', Icon: SiKubernetes, color: '#326CE5' },
    ],
  },
  {
    title: 'Developer Tools',
    Icon: FaTools,
    color: 'from-accent-sky to-brand-500',
    items: [
      { name: 'VS Code', Icon: VscCode, color: '#007ACC' },
      { name: 'Eclipse', Icon: SiEclipseide, color: '#2C2255' },
      { name: 'PyCharm', Icon: SiPycharm, color: '#21D789' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
      { name: 'MySQL Workbench', Icon: SiMysql, color: '#4479A1' },
    ],
  },
  {
    title: 'Testing Tools',
    Icon: FaVial,
    color: 'from-accent-lemon to-accent-peach',
    items: [
      { name: 'Selenium', Icon: SiSelenium, color: '#43B02A' },
      { name: 'JUnit', Icon: SiJunit5, color: '#25A162' },
    ],
  },
  {
    title: 'DSA',
    Icon: FaSitemap,
    color: 'from-brand-400 to-accent-pink',
    items: [
      { name: 'Proficient in DSA', Icon: FaProjectDiagram, color: '#5b66ff' },
    ],
  },
]

// Drop a video file into `frontend/public/projects/` and set `video` to its path
// (e.g. video: '/projects/basudevbnb.mp4'). Until then, an animated placeholder is shown.
export const PROJECTS = [
  { name: 'Basudevbnb', tag: 'Stay Booking Platform', video: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/videos/basudevbnb.mp4', github: 'https://github.com/BasudevNaidu/Basudevbnb', live: 'https://basudevbnb-3nzp.vercel.app/' },
  { name: 'Eventhub', tag: 'Event Management', video: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/videos/eventhub.mp4?updatedAt=1776876084187', github: 'https://github.com/BasudevNaidu/EventHub', live: 'https://eventhubofbasudev.netlify.app/' },
  { name: 'Cyberscan', tag: 'Security Toolkit', video: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/videos/cyberscan.mp4', github: 'https://github.com/BasudevNaidu/CyberScan', live: null },
  { name: 'Spendwise - Expense Tracker', tag: 'Personal Finance', video: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/videos/spendwise.mp4?updatedAt=1776875829324', github: 'https://github.com/BasudevNaidu/SpendWise---Expense-Tracker', live: 'https://spend-wise-expense-tracker-46u4.vercel.app/' },
  { name: 'Fitrack', tag: 'Fitness Tracker', video: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/videos/fitrack.mp4?updatedAt=1776875767565', github: 'https://github.com/BasudevNaidu/Fitrack', live: 'https://fitrack-flame.vercel.app/' },
  { name: 'Hostel Management', tag: 'College Utility', video: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/videos/hostel-management.mp4?updatedAt=1776876078841', github: 'https://github.com/BasudevNaidu/Hostel-Management', live: 'https://hostel-management-jade-two.vercel.app/homePage/' },
  { name: 'VasuFlicks - OTT Platform', tag: 'Streaming App', video: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/videos/vasuflicks.mp4?updatedAt=1776875955907', github: 'https://github.com/BasudevNaidu/VasFlicks---OTT-Platform', live: 'https://vas-flicks-ott-platform.vercel.app/' },
]

export const CODING_PROFILES = [
  {
    name: 'CodeChef',
    handle: '@basudev06coder',
    url: 'https://www.codechef.com/users/basudev06coder',
    // Aligned with portfolio brand: purple → pink with peach accents
    bgGradient: 'from-[#F1F0FF] via-[#FBE7F4] to-[#FFE7D6]',
    iconGradient: 'from-[#5b66ff] via-[#a464ff] to-[#ff6ad5]',
    accent: '#5b66ff',
    softAccent: '#ff6ad5',
    chip: 'bg-[#5b66ff]/10 text-[#5b66ff] border-[#5b66ff]/25',
    stats: [
      { label: 'Stars', value: '★★' },
      { label: 'Solved', value: '120+' },
      { label: 'Rank', value: 'Active' },
    ],
  },
  {
    name: 'LeetCode',
    handle: '@klu2300032191',
    url: 'https://leetcode.com/klu2300032191/',
    // Aligned with portfolio brand: peach → pink with mint accent
    bgGradient: 'from-[#FFF1E8] via-[#FFE0EC] to-[#E6FBF2]',
    iconGradient: 'from-[#ff8e72] via-[#ff6ad5] to-[#7ce0c2]',
    accent: '#ff6ad5',
    softAccent: '#ff8e72',
    chip: 'bg-[#ff6ad5]/10 text-[#c43d9a] border-[#ff6ad5]/25',
    stats: [
      { label: 'Solved', value: '200+' },
      { label: 'Streak', value: '🔥' },
      { label: 'Level', value: 'Active' },
    ],
  },
]

export const CERTIFICATES = [
  {
    name: 'MongoDB Certified Associate Developer',
    img: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/certificates/mongodb.png?updatedAt=1776780883735',
  },
  {
    name: 'Linguaskill General — English Language Proficiency',
    img: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/certificates/linguaskill.png?updatedAt=1776780884739',
  },
  {
    name: 'Salesforce Certified AI Associate',
    img: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/certificates/Salesforce-ai-associate.png?updatedAt=1776780883962',
  },
  {
    name: 'Aviatrix MultiCloud Network Associate',
    img: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/certificates/aviatrix.png?updatedAt=1776780882627',
  },
  {
    name: 'Dynamic Programming, Greedy Algorithms (Univ. of Colorado Boulder)',
    img: 'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/certificates/DP%20&%20Greedy%20Algo.png?updatedAt=1776780885021',
  },
]

export const CONTACTS = [
  {
    name: 'LinkedIn',
    handle: '@naidu-basudev',
    url: 'https://www.linkedin.com/in/naidu-basudev-96b7a6289/',
    color: 'from-[#0a66c2] to-[#3b82f6]',
  },
  {
    name: 'Instagram',
    handle: '@basudev7788',
    url: 'https://www.instagram.com/basudev1728/',
    color: 'from-accent-pink to-accent-peach',
  },
  {
    name: 'Telegram',
    handle: '@BasudevNaidu',
    url: 'https://t.me/BasudevNaidu',
    color: 'from-accent-sky to-brand-400',
  },
  {
    name: 'Email',
    handle: 'basudevnaidu2@gmail.com',
    url: 'mailto:basudevnaidu2@gmail.com',
    color: 'from-accent-mint to-brand-400',
  },
]

export const RESUME_URL =
  'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/freshone.pdf'

export const HERO_IMG =
  'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/mypic.png?updatedAt=1776769484899'

export const ABOUT_IMG =
  'https://ik.imagekit.io/b2asu00dev6/PortfolioImg/mypic2.jpeg?updatedAt=1776779217075'
