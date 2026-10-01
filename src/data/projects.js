export const projects = [
  {
    id: "chakravyuh",
    title: "Chakravyuh SETU",
    subtitle: "Real-time blockchain analytics platform for tracing fraud-linked cryptocurrency transactions",
    category: "Blockchain & Cybersecurity",
    badge: "SIH 2026",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "NodeJS",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "Blockchain APIs",
      "Machine Learning"
    ],
    description:
      "Chakravyuh SETU is an automated blockchain analytics and investigation platform designed to help cyber-crime investigators trace cryptocurrency fraud from victim-reported suspect wallet addresses to downstream exchange endpoints. The system performs recursive multi-hop fund tracing across Ethereum, Polygon, BSC, Tron and Bitcoin, handles fund splits and merges through path-aware attribution, correlates cross-chain bridge activity, identifies Virtual Asset Service Provider (VASP) wallet roles, and separates risk, case relevance and VASP confidence into distinct analytical metrics. It also includes real-time wallet monitoring, anomaly detection, cryptographic evidence provenance, tamper-evident audit trails and versioned investigation reports.",
    stats: [
      { label: "Chains", value: "5+" },
      { label: "Tracing", value: "Multi-Hop" },
      { label: "Backend", value: "FastAPI" },
      { label: "Database", value: "Supabase" }
    ],
    github: "https://github.com/gvraghuveer/SIH-project",
    demo: null,
    accent: "from-purple-500 to-blue-500",
    previewType: "media"
  },
  {
    id: "aethercode",
    title: "AetherCode",
    subtitle: "Experimental AI-assisted programming and developer automation project",
    category: "AI • Developer Automation",
    badge: "Experimental",
    technologies: ["Artificial Intelligence", "Developer Tooling", "Automation", "Software Development", "AI-Assisted Programming"],
    description:
      "An experimental developer-focused project exploring AI-assisted programming and automation. Investigates how AI can assist with software-development tasks and automate parts of the development process. Represents the intersection of traditional software engineering with modern AI capabilities and AI-powered developer tools.",
    stats: [
      { label: "Type", value: "Experimental" },
      { label: "Domain", value: "AI + Dev Tooling" },
      { label: "Focus", value: "Code Automation" },
      { label: "Stack", value: "AI-Assisted" }
    ],
    github: "https://github.com/gvraghuveer/AetherCode",
    demo: null,
    accent: "from-violet-500 to-indigo-600",
    previewType: "code"
  },
  {
    id: "crimeshield",
    title: "CrimeShield",
    subtitle: "ESP32 + OpenCV safety system with GPS, emergency activation & camera vision",
    category: "IoT • Computer Vision • Embedded",
    badge: "IoT + CV Project",
    technologies: ["ESP32", "ESP32-CAM", "Python", "OpenCV", "GPS", "HTTP", "IoT", "Computer Vision"],
    description:
      "A safety-oriented technology project combining hardware, software, computer vision, and location-based functionality. Uses ESP32-based hardware including an ESP32-CAM alongside a GPS module, buzzer, and physical emergency button. The ESP32-CAM provides a live camera stream processed by a Python-based computer-vision pipeline with OpenCV and YOLO for real-time object detection. Hardware components communicate over HTTP.",
    stats: [
      { label: "Hardware", value: "ESP32 / CAM" },
      { label: "Vision", value: "OpenCV" },
      { label: "Location", value: "GPS Module" },
      { label: "Comms", value: "HTTP Protocol" }
    ],
    github: "https://github.com/gvraghuveer/CSSERS",
    demo: null,
    accent: "from-red-500 to-rose-600",
    previewType: "iot"
  },
  {
    id: "s3-drive",
    title: "S3 Drive",
    subtitle: "Cloud-based file management web app built around Amazon S3",
    category: "Full-Stack Web & Cloud",
    badge: "Cloud Web App",
    technologies: ["React", "Vite", "Tailwind CSS", "DaisyUI", "Node.js", "Express.js", "AWS S3", "AWS SDK", "IAM", "Multer"],
    description:
      "A cloud-based file-management application built around Amazon S3. Provides a web interface for managing files stored in an S3 bucket with direct multipart file uploads, instant file browsing, secure pre-signed download URLs, real-time search filtering, and file deletion. Backend uses Node.js and Express with the AWS SDK; frontend uses React, Vite, Tailwind CSS, and DaisyUI.",
    stats: [
      { label: "Frontend", value: "React + Vite" },
      { label: "Backend", value: "Express API" },
      { label: "Storage", value: "Amazon S3" },
      { label: "Auth", value: "Pre-Signed URLs" }
    ],
    github: "https://github.com/gvraghuveer/s3-drive",
    demo: null,
    accent: "from-cyan-500 to-blue-600",
    previewType: "s3"
  },
  {
    id: "web-scraper",
    title: "Web Scraper",
    subtitle: "Automated web scraping pipeline containerized with Docker on Linux",
    category: "Automation & DevOps",
    badge: "Automation Project",
    technologies: ["Web Scraping", "Python", "Docker", "Linux", "Data Extraction", "Automation", "Containers"],
    description:
      "A web-scraping project focused on automatically collecting and processing information from websites. The project involved building a scraping pipeline for structured data extraction, containerizing the application using Docker, and running it within a Linux environment — exploring the intersection of automation, data collection, and DevOps practices.",
    stats: [
      { label: "Runtime", value: "Docker Container" },
      { label: "OS", value: "Linux" },
      { label: "Type", value: "Automation" },
      { label: "Output", value: "Structured Data" }
    ],
    github: "https://github.com/gvraghuveer/web-scrapper",
    demo: null,
    accent: "from-emerald-500 to-teal-600",
    previewType: "scraper"
  },
  // {
  //   id: "avengers-watchlist",
  //   title: "Avengers Watchlist",
  //   subtitle: "React web app with dynamic content, API integration and interactive frontend",
  //   category: "Web & API Architecture",
  //   badge: "React App",
  //   technologies: ["React", "JavaScript", "HTML", "CSS", "APIs"],
  //   description:
  //     "A React-based web application focused on dynamic content and interactive frontend functionality. Involves working with React components, JavaScript, application data, API-based functionality, and responsive interfaces — built as a practical exercise in modern React development patterns and external API integration.",
  //   stats: [
  //     { label: "Framework", value: "React" },
  //     { label: "Data", value: "API-Driven" },
  //     { label: "Language", value: "JavaScript" },
  //     { label: "Type", value: "Web App" }
  //   ],
  //   github: "https://github.com/gvraghuveer/avengers-watchlist",
  //   demo: "https://avengers-watchlist.vercel.app/",
  //   accent: "from-blue-500 to-cyan-500",
  //   previewType: "media"
  // }
];

