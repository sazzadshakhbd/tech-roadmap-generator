const careerData = {
  frontend: {
    title: "Frontend Developer",
    description: "Frontend developers build the user interfaces and interactive elements of websites and applications.",
    beginner: {
      skills: [
        { name: "HTML", description: "The standard markup language for web pages" },
        { name: "CSS", description: "Styling language used to design web pages" },
        { name: "JavaScript Basics", description: "Programming language for the web" },
        { name: "Responsive Design", description: "Making websites work on all devices" },
        { name: "Version Control (Git)", description: "Track and manage code changes" }
      ],
      resources: {
        videos: [
          { name: "HTML & CSS Crash Course", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G" },
          { name: "JavaScript Basics", url: "https://www.youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX" }
        ],
        articles: [
          { name: "MDN Web Docs - HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
          { name: "CSS-Tricks", url: "https://css-tricks.com/" }
        ],
        books: [
          { name: "HTML and CSS: Design and Build Websites", author: "Jon Duckett" },
          { name: "Eloquent JavaScript", author: "Marijn Haverbeke" }
        ],
        projects: [
          { name: "Personal Portfolio Website", description: "Create a simple portfolio to showcase your projects" },
          { name: "Landing Page", description: "Build a responsive landing page for a fictional product" }
        ],
        courses: [
          { name: "The Web Developer Bootcamp", platform: "Udemy" },
          { name: "freeCodeCamp - Responsive Web Design", platform: "freeCodeCamp" }
        ]
      }
    },
    intermediate: {
      skills: [
        { name: "JavaScript ES6+", description: "Modern JavaScript features" },
        { name: "CSS Frameworks", description: "Bootstrap, Tailwind CSS, etc." },
        { name: "Frontend Framework", description: "React, Vue, or Angular" },
        { name: "State Management", description: "Redux, Context API, Vuex, etc." },
        { name: "API Integration", description: "Fetching and displaying data from APIs" }
      ],
      resources: {
        videos: [
          { name: "React JS Crash Course", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8" },
          { name: "Redux Tutorial", url: "https://www.youtube.com/watch?v=93p3LxR9xfM" }
        ],
        articles: [
          { name: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
          { name: "CSS-in-JS Explained", url: "https://medium.com/dailyjs/what-is-actually-css-in-js-f2f529a2757" }
        ],
        books: [
          { name: "You Don't Know JS", author: "Kyle Simpson" },
          { name: "React Quickly", author: "Azat Mardan" }
        ],
        projects: [
          { name: "Weather App", description: "Create a weather app using a public API" },
          { name: "E-commerce Product Page", description: "Build a product page with filtering and cart functionality" }
        ],
        courses: [
          { name: "JavaScript: Understanding the Weird Parts", platform: "Udemy" },
          { name: "Epic React", platform: "Kent C. Dodds" }
        ]
      }
    },
    advanced: {
      skills: [
        { name: "Performance Optimization", description: "Improving load times and rendering" },
        { name: "Testing", description: "Unit, integration, and E2E testing" },
        { name: "TypeScript", description: "Typed JavaScript for better code quality" },
        { name: "Advanced State Management", description: "Complex state patterns and libraries" },
        { name: "Progressive Web Apps", description: "Creating offline-capable web apps" }
      ],
      resources: {
        videos: [
          { name: "TypeScript Course", url: "https://www.youtube.com/watch?v=BwuLxPH8IDs" },
          { name: "Testing React with Jest and Testing Library", url: "https://www.youtube.com/watch?v=7dTTFW7yACQ" }
        ],
        articles: [
          { name: "Web Performance Optimization", url: "https://developers.google.com/web/fundamentals/performance" },
          { name: "PWA Introduction", url: "https://web.dev/progressive-web-apps/" }
        ],
        books: [
          { name: "Programming TypeScript", author: "Boris Cherny" },
          { name: "Testing JavaScript Applications", author: "Lucas da Costa" }
        ],
        projects: [
          { name: "Full-Stack Social Media App", description: "Build a social media application with authentication" },
          { name: "Real-time Dashboard", description: "Create a dashboard with real-time data updates" }
        ],
        courses: [
          { name: "Frontend Masters - TypeScript", platform: "Frontend Masters" },
          { name: "Testing JavaScript", platform: "Kent C. Dodds" }
        ]
      }
    }
  },
  backend: {
    title: "Backend Developer",
    description: "Backend developers build the server-side logic that powers websites and applications.",
    beginner: {
      skills: [
        { name: "Programming Fundamentals", description: "Basic programming concepts" },
        { name: "Backend Language", description: "Node.js, Python, Java, etc." },
        { name: "Basic Database Concepts", description: "SQL vs NoSQL, basic queries" },
        { name: "API Basics", description: "Understanding REST APIs" },
        { name: "Version Control (Git)", description: "Track and manage code changes" }
      ],
      resources: {
        videos: [
          { name: "Node.js Crash Course", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" },
          { name: "SQL Tutorial", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY" }
        ],
        articles: [
          { name: "MDN - Server-side website programming", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side" },
          { name: "REST API Tutorial", url: "https://restfulapi.net/" }
        ],
        books: [
          { name: "The Road to Learn React", author: "Robin Wieruch" },
          { name: "Express.js Guide", author: "Azat Mardan" }
        ],
        projects: [
          { name: "Simple REST API", description: "Create a basic CRUD API" },
          { name: "CLI Application", description: "Build a command-line tool" }
        ],
        courses: [
          { name: "The Complete Node.js Developer Course", platform: "Udemy" },
          { name: "freeCodeCamp - APIs and Microservices", platform: "freeCodeCamp" }
        ]
      }
    },
    intermediate: {
      // Similar structure as frontend intermediate
      skills: [
        { name: "Database Design", description: "Normalization, indexing, optimization" },
        { name: "Authentication & Authorization", description: "JWT, OAuth, session management" },
        { name: "API Design", description: "RESTful principles, GraphQL" },
        { name: "Server Frameworks", description: "Express, Django, Spring, etc." },
        { name: "Caching Strategies", description: "Redis, Memcached, application caching" }
      ],
      resources: {
        // Similar structure as frontend intermediate resources
        videos: [],
        articles: [],
        books: [],
        projects: [],
        courses: []
      }
    },
    advanced: {
      // Similar structure as frontend advanced
      skills: [],
      resources: {
        videos: [],
        articles: [],
        books: [],
        projects: [],
        courses: []
      }
    }
  },
  datascience: {
    title: "Data Scientist",
    description: "Data scientists analyze and interpret complex data to help guide business decisions.",
    // Similar structure as other careers
    beginner: {
      skills: [],
      resources: {
        videos: [],
        articles: [],
        books: [],
        projects: [],
        courses: []
      }
    },
    intermediate: {
      skills: [],
      resources: {
        videos: [],
        articles: [],
        books: [],
        projects: [],
        courses: []
      }
    },
    advanced: {
      skills: [],
      resources: {
        videos: [],
        articles: [],
        books: [],
        projects: [],
        courses: []
      }
    }
  },
  devops: {
    title: "DevOps Engineer",
    description: "DevOps engineers bridge development and operations to improve deployment frequency and reliability.",
    // Similar structure as other careers
    beginner: {
      skills: [],
      resources: {
        videos: [],
        articles: [],
        books: [],
        projects: [],
        courses: []
      }
    },
    intermediate: {
      skills: [],
      resources: {
        videos: [],
        articles: [],
        books: [],
        projects: [],
        courses: []
      }
    },
    advanced: {
      skills: [],
      resources: {
        videos: [],
        articles: [],
        books: [],
        projects: [],
        courses: []
      }
    }
  }
};

export default careerData;