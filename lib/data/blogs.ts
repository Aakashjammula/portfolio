/**
 * lib/data/blogs.ts
 * Centralized data store for all blog posts.
 */

// Define TypeScript interfaces for strict typing
export interface BlogLink {
    text: string;
    url: string;
}

export interface BlogContentItem {
    type: "heading" | "paragraph" | "list" | "code" | "divider" | "image" | "links";
    level?: 1 | 2 | 3 | 4 | 5 | 6; // For headings
    content?: string;             // For headings, paragraphs, code
    id?: string;                  // For headings (table of contents anchor)
    style?: "unordered" | "ordered"; // For lists
    items?: string[] | BlogLink[];   // For lists or links
    language?: string;            // For code blocks
    src?: string;                 // For images
    alt?: string;                 // For images
    width?: number;               // For images
    height?: number;              // For images
    caption?: string;             // For images
}

export interface BlogPost {
    title: string;
    description: string;
    date: string;
    readTime: string;
    slug: string;
    content: BlogContentItem[];
}

export const blogs: BlogPost[] = [
    // ===== BLOG: Day 12 — 30 Days of Free Resources =====
    {
        title: "Day 12: 30 Days of Free Learning Resources 🚀",
        description: "Day 12 of sharing 5 free learning resources — today featuring Stanford Online, Snowflake Quickstarts, Databricks Academy, Elastic Training, and JavaScript.info.",
        date: "March 8, 2026",
        readTime: "4 min read",
        slug: "day-12-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Welcome to Day 12 of my 30-day challenge! Today we are diving deep into advanced data engineering, enterprise-scale analytics, and mastering the core mechanics of JavaScript. These platforms are used by senior engineers to build massive, scalable systems.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Stanford Online",
                id: "stanford-online",
            },
            {
                type: "paragraph",
                content: "Stanford University's free online platform provides access to the exact same lectures and materials used in their world-renowned computer science programs. It's an incredible resource if you want to dive deep into complex theory, from advanced algorithms to artificial intelligence.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Access to full, recorded lectures from actual Stanford University engineering and CS classes.",
                    "Deep dive into complex theoretical concepts like Machine Learning, Cryptography, and Advanced Algorithms.",
                    "Self-paced learning suitable for working professionals who want an Ivy League education for free.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "❄️ Snowflake Quickstarts",
                id: "snowflake-quickstarts",
            },
            {
                type: "paragraph",
                content: "Snowflake is the industry-standard data warehouse, and their free Quickstarts platform provides hands-on, step-by-step tutorials to get you up to speed. This is crucial for anyone looking to enter data engineering or data analytics at an enterprise level.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Step-by-step guides for building real-world data pipelines and analytics applications.",
                    "Detailed integrations with modern data stack tools like dbt, Python environments, and Machine Learning integrations.",
                    "Hands-on practice setups that mimic actual massive-scale enterprise environments.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Databricks Academy",
                id: "databricks-academy",
            },
            {
                type: "paragraph",
                content: "Databricks Academy offers phenomenal, free foundational training focused on Apache Spark, Delta Lake, and unified analytics. Databricks is fundamentally changing how big data is processed, making these skills highly lucrative and sought-after.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Comprehensive fundamentals of Data Engineering, Data Science, and Machine Learning.",
                    "Complete deep dive into Delta Lake and the modern Lakehouse architecture.",
                    "Structured preparation paths designed to help you pass official Databricks certifications.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Elastic Training",
                id: "elastic-training",
            },
            {
                type: "paragraph",
                content: "Learn enterprise search, system observability, and security with completely free training directly from the creators of Elasticsearch. If you are building applications that require lightning-fast search capabilities, you need to understand the ELK stack.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Fundamentals of Elasticsearch, Logstash, and Kibana (commonly known as the ELK stack).",
                    "Hands-on labs and tutorials for building and managing massive search infrastructures.",
                    "Free quick-start courses for observability, teaching you how to monitor complex applications.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "JavaScript.info",
                id: "javascript-info",
            },
            {
                type: "paragraph",
                content: "This is arguably one of the most detailed, master-class level tutorials on the internet for learning modern JavaScript. It goes far beyond the basics, explaining the underlying mechanics of the language and the browser environment.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Incredibly comprehensive coverage of modern JavaScript (ES6+), treating JS as a serious language.",
                    "Deep explanations of language mechanics like closers, generators, the Event Loop, and prototype inheritance.",
                    "Interactive coding tasks directly in the browser at the end of every highly-detailed chapter.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day12",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 11 — 30 Days of Free Resources =====
    {
        title: "Day 11: 30 Days of Free Learning Resources 🚀",
        description: "Day 11 of sharing 5 free learning resources — today featuring Alchemy University, Python Institute, HashiCorp Developer, edX, and Codewars.",
        date: "March 7, 2026",
        readTime: "4 min read",
        slug: "day-11-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Day 11 is packed with 5 amazing platforms focused on Web3 development, mastering Python, automating infrastructure as code, and daily programming practice. Whether you want to build blockchains or automate cloud servers, today is for you.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "⚗️ Alchemy University",
                id: "alchemy-university",
            },
            {
                type: "paragraph",
                content: "Alchemy University is widely considered the definitive place to learn Web3 development and blockchain engineering for free. They've partnered with leading crypto ecosystems to offer a massive, interactive bootcamp.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "A massive, comprehensive Ethereum Developer Bootcamp taking you from zero to full Web3 developer.",
                    "Learn Solidity, smart contract architecture, interacting with EVM, and basic cryptography.",
                    "Interactive coding environments directly in your browser, no local setup required.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Python Institute",
                id: "python-institute",
            },
            {
                type: "paragraph",
                content: "The Python Institute, backed by the OpenEDG, offers robust, free online study programs to learn Python programming from complete scratch. It's a structured path designed to get you officially certified.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Extensive courses ranging from absolute beginner to advanced object-oriented Python concepts.",
                    "Dedicated preparation tracks for the globally recognized PCEP and PCAP certifications.",
                    "Interactive coding sandboxes built directly into the lessons for immediate feedback.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🏗️ HashiCorp Developer",
                id: "hashicorp-developer",
            },
            {
                type: "paragraph",
                content: "HashiCorp makes the tools that run the modern internet. Their developer portal is the absolute best place to learn infrastructure as code and cloud security automation using their industry-standard tools.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "In-depth, hands-on tutorials for Terraform (Infrastructure), Vault (Security), and Consul (Networking).",
                    "Learn how to formally provision, manage, and scale complex cloud infrastructure across AWS, Azure, and GCP.",
                    "Interactive browser-based labs give you access to real environments without the cloud bills.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "edX",
                id: "edx",
            },
            {
                type: "paragraph",
                content: "edX is a massive open online course provider created by Harvard and MIT. It allows you to audit thousands of courses from top universities around the world completely for free.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Access massive courses from MIT, Harvard, Berkeley, and leading tech corporations.",
                    "Topics covering literally every tech domain: full-stack, data science, AI, cyber security, and networking.",
                    "The 'Audit' mode provides free access to most high-quality course videos, readings, and un-graded assignments.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "⚔️ Codewars",
                id: "codewars",
            },
            {
                type: "paragraph",
                content: "Codewars helps you achieve programming mastery through challenge. It is an educational community where developers train alongside each other on algorithm-based exercises known as 'kata'.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Practice coding complex algorithms and data structures to prepare for intense technical interviews.",
                    "Support for over 50 different programming languages, from Python and Rust to Haskell and Clojure.",
                    "Incredible community-driven solutions let you see the most efficient, clever, and 'best practice' ways to solve a problem after you finish.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day11",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 10 — 30 Days of Free Resources =====
    {
        title: "Day 10: 30 Days of Free Learning Resources 🚀",
        description: "Day 10 of sharing 5 free learning resources — today featuring Codecademy, Free for Developers, Coursera, Neo4j GraphAcademy, and Salesforce Trailhead.",
        date: "March 6, 2026",
        readTime: "4 min read",
        slug: "day-10-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Welcome to Day 10! Today we're exploring diverse dev tools, graph databases, lucrative CRM skills, and an incredible curated list of free services that every developer needs to bookmark immediately.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Codecademy",
                id: "codecademy",
            },
            {
                type: "paragraph",
                content: "Codecademy is one of the most popular platforms on the internet for beginners. Their free tier is an excellent, highly interactive way to learn syntax and the basic concepts of dozens of programming languages.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "World-class interactive coding environments right in your browser, perfect for visual learners.",
                    "Dozens of completely free basic courses covering HTML, CSS, JavaScript, Python, C++, SQL, and more.",
                    "An excellent place for absolute beginners to get their feet wet before committing to a dense, complex bootcamp.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Free for Developers",
                id: "free-for-developers",
            },
            {
                type: "paragraph",
                content: "This isn't a single course, but an essential resource: a massive, community-curated list of software and services that have genuine free tiers for developers. If you are building a side project, check this list before paying for anything.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Categorized lists of free cloud hosting, CI/CD pipelines, databases, APIs, and email services.",
                    "Regularly updated and vetted by the open-source community on GitHub to ensure the free tiers are still active.",
                    "An absolute essential bookmark for indie hackers, students, and side-project builders looking to keep costs at zero.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Coursera",
                id: "coursera",
            },
            {
                type: "paragraph",
                content: "While many know Coursera for their expensive paid certificates and degrees, a little-known fact is that almost all courses can be 'audited' completely for free, giving you access to the world's best tech education.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Access incredibly high-quality tech courses built by Google, IBM, Meta, and Stanford.",
                    "The 'Audit' mode lets you watch all video lectures and read all materials without paying a cent.",
                    "Vast library spanning computer science, IT support, UX design, and specialized machine learning tracks.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🕸️ Neo4j GraphAcademy",
                id: "neo4j-graphacademy",
            },
            {
                type: "paragraph",
                content: "Graph databases are incredibly powerful for recommendation engines and social networks. Neo4j GraphAcademy is the premier place to learn how to model graph data and build graph-powered applications.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Free, self-paced courses focused entirely on graph data modeling and architecture.",
                    "Hands-on browser-based query practice teaching you Cypher, the graph query language.",
                    "Earn free professional certifications upon completion to bolster your LinkedIn profile.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "☁️ Salesforce Trailhead",
                id: "salesforce-trailhead",
            },
            {
                type: "paragraph",
                content: "Salesforce developers are some of the highest-paid engineers in enterprise tech. Trailhead is a fun, heavily gamified way to learn Salesforce integration, APEX programming, and overall cloud computing concepts.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Learn high-demand CRM implementation, the APEX programming language, and enterprise cloud architecture.",
                    "Earn badges, rank up, and easily showcase your verified points on your resumes.",
                    "Completely free hands-on 'playgrounds' allow you to build and test configurations in real Salesforce environments.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day10",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 9 — 30 Days of Free Resources =====
    {
        title: "Day 9: 30 Days of Free Learning Resources 🚀",
        description: "Day 9 of sharing 5 free learning resources — today featuring Postman Academy, MongoDB University, React.dev Learn, Redis University, and OverTheWire Wargames.",
        date: "March 5, 2026",
        readTime: "4 min read",
        slug: "day-9-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Day 9 is here! Today we are looking at absolutely essential daily skills for modern developers: API testing, NoSQL and In-memory databases, React fundamentals, and learning Linux security through games.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Postman Academy",
                id: "postman-academy",
            },
            {
                type: "paragraph",
                content: "Postman is the industry standard tool for interacting with APIs. Postman Academy is the ultimate central hub for learning API development, comprehensive testing, and how to write excellent API documentation.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Learn fundamental API architectures (REST, GraphQL, gRPC) and advanced testing strategies.",
                    "Hands-on labs allow you to earn highly recognized Postman API Professional badges.",
                    "Deep dive into understanding API lifecycles, mock servers, and automated CI/CD integrations.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "MongoDB University",
                id: "mongodb-university",
            },
            {
                type: "paragraph",
                content: "MongoDB is the undisputed king of NoSQL databases used by countless modern startups. MongoDB University is the official, completely free learning platform for mastering data modeling and aggregation.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Comprehensive courses on document data modeling, advanced aggregation pipelines, and high-performance querying.",
                    "Interactive code execution directly in the browser—no local database installation required.",
                    "Structured learning paths designed to take you from a novice to a certified MongoDB Developer.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "⚛️ React.dev Learn",
                id: "react-dev-learn",
            },
            {
                type: "paragraph",
                content: "The React team recently completely overhauled their official documentation, and it now serves as an incredible, interactive tutorial for frontend developers. It is universally considered the best place to learn React today.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Step-by-step, highly visual guides taking you from incredibly basic UI components to complex state management hooks.",
                    "Interactive coding sandboxes built directly into the documentation, allowing you to instantly test concepts.",
                    "Written and maintained by the core React team, ensuring you are learning modern, idiomatic best practices.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Redis University",
                id: "redis-university",
            },
            {
                type: "paragraph",
                content: "Redis is the secret behind the blazing fast speeds of apps like Twitter and GitHub. Redis University teaches you how to use in-memory data stores for caching, messaging, and building ultra-fast applications.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Free courses dedicated to Redis fundamentals, complex data structures, and the Pub/Sub messaging paradigm.",
                    "Learn exactly how to integrate Redis with massive backend services in Python, Node.js, and Java.",
                    "Includes rich hands-on exercises and access to free, temporary cloud instances for testing.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "OverTheWire Wargames",
                id: "overthewire-wargames",
            },
            {
                type: "paragraph",
                content: "This is a unique, incredibly fun, gamified way to learn Linux command-line tools and foundational cybersecurity. You learn by actually hacking into remote servers over SSH and solving puzzles.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Play through increasingly difficult SSH 'wargames' starting from basic Linux directory navigation.",
                    "The famous 'Bandit' game is highly recommended for absolute beginners wanting to master the terminal.",
                    "You are forced to learn by doing in a real, live terminal environment—the best way to learn bash scripting and security.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day9",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 8 — 30 Days of Free Resources =====
    {
        title: "Day 8: 30 Days of Free Learning Resources 🚀",
        description: "Day 8 of sharing 5 free learning resources — today featuring KodeKloud, UXcel, Sololearn, DataCamp, and LeetCode.",
        date: "March 4, 2026",
        readTime: "4 min read",
        slug: "day-8-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Welcome to Day 8! Today's resources are intensely practical and geared towards getting you hired. We are covering DevOps infrastructure, UI/UX design basics, data science foundations, and acing your technical algorithms interviews.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "KodeKloud",
                id: "kodekloud",
            },
            {
                type: "paragraph",
                content: "KodeKloud is a phenomenal platform dedicated to giving you practical DevOps skills. While they have a paid tier, they offer an incredible selection of free courses that are fundamentally essential for any modern developer.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Includes incredibly high-quality free courses on Linux basics, Git, and Docker fundamentals.",
                    "Their custom in-browser terminal environment gives you instant, frictionless hands-on practice.",
                    "A perfect, gentle stepping stone before diving into complex orchestration tools like Kubernetes and Jenkins.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "UXcel",
                id: "uxcel",
            },
            {
                type: "paragraph",
                content: "UXcel is essentially the 'Duolingo of Design'. They offer an excellent free tier to learn UI/UX design principles interactively, which is highly tailored and beneficial for front-end developers wanting to build prettier apps.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Interactively learn web accessibility standards, color theory, typography, and visual layout hierarchy.",
                    "Bite-sized, gamified lessons that you can easily complete during a commute or coffee break.",
                    "Assess and track your design skills with built-in tests and visually appealing certificates.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Sololearn",
                id: "sololearn",
            },
            {
                type: "paragraph",
                content: "Sololearn is perfect for learning on the go. It offers bite-sized coding lessons and boasts a massive, vibrant community. It's fantastic for keeping your coding streak alive when you don't have access to a laptop.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Excellent mobile applications for iOS and Android, enabling ubiquitous learning anywhere.",
                    "Vast array of tracks including C++, Python, Web Development, SQL, and Machine Learning basics.",
                    "A built-in code playground allowing you to test your snippets and share them with the community easily.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "DataCamp",
                id: "datacamp",
            },
            {
                type: "paragraph",
                content: "DataCamp is the premiere online platform for learning Data Science. Their free basic tier provides the introductory chapters of their extensive curriculum, giving you a massive head start in data analytics.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Learn the absolute basics of data manipulation using Python, R, and querying with SQL.",
                    "An incredibly smooth, interactive in-browser coding interface that eliminates environment setup issues.",
                    "A fantastic, zero-risk way to determine if data science and analytics is the right career path for you.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "LeetCode",
                id: "leetcode",
            },
            {
                type: "paragraph",
                content: "LeetCode is the undisputed gold standard for software engineering interview preparation. If you want to work at FAANG or any top tech company, you must spend time here exploring their thousands of free algorithmic challenges.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Solve real, verifiable interview questions that have been asked by companies like Google, Meta, and Amazon.",
                    "Extremely active community discussions where you can study multiple solution approaches (e.g., Dynamic Programming vs. Greed Approaches).",
                    "Participate in massive weekly contests to test your coding speed and algorithmic thinking under pressure.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day8",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 7 — 30 Days of Free Resources =====
    {
        title: "Day 7: 30 Days of Free Learning Resources 🚀",
        description: "Day 7 of sharing 5 free learning resources — today featuring HackerRank, Unity Learn, Elements of AI, Cybrary, and W3Schools.",
        date: "March 3, 2026",
        readTime: "4 min read",
        slug: "day-7-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Day 7 brings us back to hardcore computer science logic, game development, AI literacy, and practical cybersecurity foundations. Today is all about expanding the breadth of your knowledge.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "HackerRank",
                id: "hackerrank",
            },
            {
                type: "paragraph",
                content: "HackerRank heavily focuses on competitive programming and helps developers methodically hone their data structures and algorithms. It's also the exact platform thousands of companies use to issue technical screening tests.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Practice coding and algorithm optimization in almost any functional or object-oriented language.",
                    "Earn language proficiency badges that you can link directly to your resume or LinkedIn profile.",
                    "Familiarizing yourself with this site is crucial, as you will likely take a real job interview test here eventually.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Unity Learn",
                id: "unity-learn",
            },
            {
                type: "paragraph",
                content: "Unity Learn is the spectacular official learning platform for creating 2D, 3D, AR, and VR experiences using the industry-standard Unity Engine. It is an absolute treasure trove for aspiring game developers.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Comprehensive pathways taking you from absolute beginner to advanced C# programming for game logic.",
                    "Hundreds of hours of free video tutorials and massive libraries of free project assets to play with.",
                    "Earn badges, track your progress, and build a portfolio of fully playable indie games.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Elements of AI",
                id: "elements-of-ai",
            },
            {
                type: "paragraph",
                content: "A series of beautifully designed, completely free online courses created by MinnaLearn and the University of Helsinki. Its sole mission is to teach the fundamentals of AI to a broad audience, demystifying the hype.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Demystifies what AI actually is and how it works, entirely avoiding overwhelmingly complex mathematics.",
                    "Learn the foundational mechanics behind machine learning, neural networks, and probability logic.",
                    "Fantastic for non-technical beginners, product managers, or developers wanting a high-level overview.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🛡️ Cybrary",
                id: "cybrary",
            },
            {
                type: "paragraph",
                content: "Cybrary offers an incredibly extensive collection of free cybersecurity courses and IT administration training. It functions as a massive, open-source catalogue for everything related to information security.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Hundreds of hours of free video training from industry experts across multiple security domains.",
                    "Deeply covers topics like ethical hacking, network defense, penetration testing, and security governance.",
                    "Provides excellent, structured preparation material for major industry certifications like Security+ and CISSP.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "W3Schools",
                id: "w3schools",
            },
            {
                type: "paragraph",
                content: "W3Schools is one of the oldest, most fundamentally relied upon sites for straight-to-the-point web development tutorials. It acts more like a living dictionary and sandbox for web standards than an intense video boot camp.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Simple, remarkably easy-to-understand explanations of HTML, CSS, JavaScript, and SQL.",
                    "The legendary 'Try it Yourself' editor allows for immediate experimentation and tweaking without leaving the page.",
                    "Massive, exhaustive reference documentation for every single web standard, HTML tag, and CSS property.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day7",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 6 — 30 Days of Free Resources =====
    {
        title: "Day 6: 30 Days of Free Learning Resources 🚀",
        description: "Day 6 of sharing 5 free learning resources — today featuring Scrimba, Linux Foundation Training, Cognitive Class by IBM, HackTheBox, and Frontend Mentor.",
        date: "March 2, 2026",
        readTime: "4 min read",
        slug: "day-6-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Welcome to Day 6! Today we are checking out interactive frontend learning, Linux open-source mastery, enterprise data science, and intense, legally safe hacking labs.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Scrimba",
                id: "scrimba",
            },
            {
                type: "paragraph",
                content: "Scrimba completely revolutionized frontend learning with their magical interactive screencasts. You literally pause the tutorial video and edit the instructor's code directly inside the video player. It feels like magic.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "The 'Frontend Developer Career Path' offers substantial free introductory modules to get you hooked.",
                    "Amazing, highly acclaimed free courses on React, HTML, CSS, and modern JavaScript fundamentals.",
                    "The ability to edit code directly inside the video player creates a truly unparalleled active learning experience.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Linux Foundation Training",
                id: "linux-foundation-training",
            },
            {
                type: "paragraph",
                content: "The Linux Foundation offers incredible, free introductory courses via edX on essential open-source technologies. If you want to understand the infrastructure that runs the world, this is where you start.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Extensive introductory courses covering Linux system administration, Git version control, and Kubernetes orchestration.",
                    "Taught directly by the non-profit organizations and open-source maintainers who actively build the technologies.",
                    "Perfect foundational knowledge for aspiring DevOps engineers, Site Reliability Engineers, and SysAdmins.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Cognitive Class by IBM",
                id: "cognitive-class-by-ibm",
            },
            {
                type: "paragraph",
                content: "Cognitive Class is a massive initiative by IBM to provide data science and AI education to everyone for free. It is particularly strong in big data analytics, data engineering, and enterprise AI tools.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Deep courses on Python, Data Science, Hadoop, Blockchain, and Container orchestration.",
                    "Incredible free access to cloud-hosted environments, allowing you to run powerful Jupyter Labs without melting your computer.",
                    "Earn official IBM digital badges for your resume that genuinely hold weight in the enterprise tech world.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "HackTheBox",
                id: "hackthebox",
            },
            {
                type: "paragraph",
                content: "HackTheBox is a legendary online cybersecurity training platform. It allows individuals, businesses, and universities to practice penetration testing and exploit development skills in a legally safe, gamified environment.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Dozens of free 'machines' (virtual servers) that you are legally encouraged to practice hacking into.",
                    "Intense challenges covering complex cryptography, digital forensics, binary reversing, and web exploitation.",
                    "Highly respected by the infosec community; getting a high rank here can literally land you a job in cybersecurity.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Frontend Mentor",
                id: "frontend-mentor",
            },
            {
                type: "paragraph",
                content: "Frontend Mentor solves the biggest problem self-taught developers face: a lack of real-world practice. They provide stunning, professional UI designs so you can practice building pixel-perfect, real-world projects.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Download real, professional Figma/Sketch design files and assets, just like working at an actual agency.",
                    "Submit your coded solutions for intense community feedback, learning responsive design best practices.",
                    "By the time you finish the challenges, you'll have built an incredibly impressive portfolio of real-looking web applications.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day6",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 5 — 30 Days of Free Resources =====
    {
        title: "Day 5: 30 Days of Free Learning Resources 🚀",
        description: "Day 5 of sharing 5 free learning resources — today featuring MIT OpenCourseWare, AWS Skill Builder, Exercism, Full Stack Open, and Cisco Networking Academy.",
        date: "March 1, 2026",
        readTime: "4 min read",
        slug: "day-5-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "It's Day 5! Today we feature incredible, university-grade computer science education, official AWS cloud training, open-source mentorship, and comprehensive modern web development.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🏛️ MIT OpenCourseWare",
                id: "mit-opencourseware",
            },
            {
                type: "paragraph",
                content: "MIT OpenCourseWare is a monumental initiative that makes the materials used in the teaching of MIT's subjects available on the web, completely free of charge. It is the pinnacle of computer science education available to anyone.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Incredible depth and mathematical rigor on algorithms, discrete mathematics, and complex software systems.",
                    "Access to full video lectures, exams (with solutions), and heavy assignments from real Ivy League MIT classes.",
                    "Completely open—no annoying registration, paywalls, or accounts required to access the massive library.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "☁️ AWS Skill Builder",
                id: "aws-skill-builder",
            },
            {
                type: "paragraph",
                content: "AWS Skill Builder is the official learning center for Amazon Web Services. Cloud computing is an essential skill for any backend or full-stack developer, and AWS dominates the market. This platform has hundreds of free digital courses.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Over 600 totally free courses covering cloud architecture, serverless computing, Machine Learning ops, and databases.",
                    "Structured learning plans explicitly designed to prepare you for lucrative AWS Certifications like the Solutions Architect.",
                    "Features the highly interactive 'Cloud Quest', an RPG-style game for fun, hands-on architectural learning.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Exercism",
                id: "exercism",
            },
            {
                type: "paragraph",
                content: "Exercism is a unique platform that offers coding practice and, crucially, free mentorship in over 60 different programming languages. It focuses heavily on teaching you the 'idiomatic' (natural and accepted) way to write a language.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "A 100% free, passionate, community-driven platform funded entirely by donations and volunteers.",
                    "Submit your code and get actual, human-written feedback from experienced mentors pointing out optimizations.",
                    "Fantastic for learning the specific quirks and accepted stylistic standards of a brand new language.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Full Stack Open",
                id: "full-stack-open",
            },
            {
                type: "paragraph",
                content: "Created by the University of Helsinki, Full Stack Open is a legendary, highly intensive, and totally free course on modern web development. It is widely considered one of the best React and Node.js bootcamps in existence.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "An intense deep dive into React state, Redux, Node.js, MongoDB database architectures, and GraphQL APIs.",
                    "Goes far beyond basic tutorials by teaching you how to build CI/CD pipelines and configure Docker containers.",
                    "Highly practical, text-based, and frequently updated by the university to keep pace with modern tech trends.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Cisco Networking Academy",
                id: "cisco-networking-academy",
            },
            {
                type: "paragraph",
                content: "Cisco's 'Skills for All' initiative provides free, high-quality, self-paced courses focused heavily on networking, routing, and cybersecurity. Every software engineer eventually needs to understand how IP and DNS actually work.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Learn fundamental network packet routing, Python for network automation, and endpoint security principles.",
                    "Includes access to the excellent Packet Tracer network simulation tool to build virtual LANs.",
                    "Earn verified digital badges indicating your proficiency in foundational IT infrastructure.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day5",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 4 — 30 Days of Free Resources =====
    {
        title: "Day 4: 30 Days of Free Learning Resources 🚀",
        description: "Day 4 of sharing 5 free learning resources — today featuring DeepLearning.AI, TryHackMe, fast.ai, GitHub Skills, and PortSwigger Web Security Academy.",
        date: "February 28, 2026",
        readTime: "4 min read",
        slug: "day-4-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Welcome to Day 4! Today we explore world-class artificial intelligence training, intensely hands-on cybersecurity, git and GitHub deployment skills, and web security engineering.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "DeepLearning.AI",
                id: "deeplearning-ai",
            },
            {
                type: "paragraph",
                content: "Founded by the legendary Andrew Ng, this platform offers some of the most highly regarded and respected AI education on the entire internet. It bridges the gap between complex research and practical application.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Brilliant, free short courses focused heavily on prompt engineering, operating LLMs, and building AI-wrapper applications.",
                    "Taught directly by industry leaders and researchers from companies like OpenAI, Google Brain, and Meta.",
                    "Highly practical, Python-and-Notebook focused tutorials that get you generating AI results immediately.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "TryHackMe",
                id: "tryhackme",
            },
            {
                type: "paragraph",
                content: "TryHackMe is a brilliant online platform that teaches cybersecurity through short, highly gamified, real-world labs. It is universally recommended as the best starting point for anyone wanting to learn ethical hacking.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Their generous free tier provides access to hundreds of security 'rooms' and educational modules.",
                    "Learn through guided, bite-sized lessons executed directly in a browser-based virtual machine (Kali Linux).",
                    "Covers everything from basic Linux permissions to complex web vulnerabilities and offensive penetration testing.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "fast.ai",
                id: "fast-ai",
            },
            {
                type: "paragraph",
                content: "fast.ai provides an incredible, fully free course on deep learning intended to make training neural networks accessible to everyone, not just PhDs. Their philosophy is to get you building first, and learning the complex math later.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Their flagship 'Practical Deep Learning for Coders' course is entirely free and constantly updated.",
                    "Employs a revolutionary top-down approach: build vision models in hour one, learn the calculus in week four.",
                    "Utilizes the incredibly powerful fastai library, which is built on top of industry-standard PyTorch.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "GitHub Skills",
                id: "github-skills",
            },
            {
                type: "paragraph",
                content: "GitHub Skills is GitHub's official learning platform that brilliantly uses GitHub itself to teach you Git version control, team collaboration, and continuous integration pipelines.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Learn by doing. The tutorials happen directly inside real GitHub repositories using issues and pull requests.",
                    "Interactive, automated guides powered by GitHub Actions that respond to your commits and guide your learning.",
                    "Vital courses cover Markdown writing, deploying GitHub Pages, building CI/CD workflows, and resolving nasty merge conflicts.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "PortSwigger Web Security Academy",
                id: "portswigger-web-security-academy",
            },
            {
                type: "paragraph",
                content: "Created by PortSwigger, the makers of the industry-standard Burp Suite tool. This is the ultimate, completely free training ground for deep web security and bug bounty hunting.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "A completely free, intensely interactive web security training platform written by top security researchers.",
                    "Hundreds of practical, deliberately vulnerable labs covering exploits like Cross-Site Scripting (XSS) and SQL Injection.",
                    "Continuously updated with the absolute latest web exploitation techniques and bypassing methods.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day4",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 3 — 30 Days of Free Resources =====
    {
        title: "Day 3: 30 Days of Free Learning Resources 🚀",
        description: "Day 3 of sharing 5 free learning resources — today featuring freeCodeCamp, Harvard CS50, IBM SkillsBuild, The Odin Project, and Kaggle Learn.",
        date: "February 27, 2026",
        readTime: "4 min read",
        slug: "day-3-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Day 3! We are kicking things off by focusing on massive, foundational platforms that have paved the way for self-taught developers across full-stack engineering, data science, and IT.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🏕️ freeCodeCamp",
                id: "freecodecamp",
            },
            {
                type: "paragraph",
                content: "freeCodeCamp is an incredible non-profit organization that provides a completely free, massive curriculum for aspiring developers. You learn by building real-world projects directly in your browser, from basic HTML all the way to advanced machine learning and information security. It's one of the few platforms where you can go from zero to landing a job without spending a dime.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Massive interactive curriculum covering Responsive Web Design, JavaScript Algorithms, and Front End Development Libraries.",
                    "Deep dive tracks into Relational Databases, Back End Development and APIs, and Machine Learning with Python.",
                    "Earn 12+ verified technical certifications completely free by building required capstone projects.",
                    "Active community forum and a massive YouTube channel with thousands of hours of deep-dive tech tutorials.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Harvard CS50",
                id: "harvard-cs50",
            },
            {
                type: "paragraph",
                content: "Harvard University's CS50 is legendary. It is widely considered the best introduction to the intellectual enterprises of computer science and the art of programming on earth. It is rigorous, highly engaging, and entirely free to audit online.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Learn foundational mechanics of C, Python, SQL, and JavaScript basics from Professor David J. Malan.",
                    "World-class, highly produced lectures available freely via edX or their dedicated YouTube channel.",
                    "Engaging, challenging problem sets that force you to think like a true computer scientist.",
                    "Massive global community of learners and incredibly high-quality production value.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "IBM SkillsBuild",
                id: "ibm-skillsbuild",
            },
            {
                type: "paragraph",
                content: "IBM SkillsBuild is a massive platform designed to help adult learners, students, and educators gain free professional and technical skills. It heavily focuses on emerging technologies and enterprise-ready professional skills.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Extensive courses on Artificial Intelligence, sustainability, cybersecurity, and cloud computing.",
                    "Earn recognized IBM digital credentials and badges to instantly boost your resume.",
                    "Strong focus on 'soft skills' like design thinking, agile methodologies, and professional job readiness.",
                    "Access to select mentorship aspects and career building tools.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "The Odin Project",
                id: "the-odin-project",
            },
            {
                type: "paragraph",
                content: "The Odin Project is an open-source, absolutely free, full-stack curriculum designed to literally take you from zero to hired. It is famous for not holding your hand—it forces you to set up a real developer environment and build portfolio-worthy projects.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Project-based learning approach heavily focused on building applications entirely from scratch.",
                    "Choose between two massive tracks: full-stack Ruby on Rails or full-stack JavaScript (Node/MERN).",
                    "Teaches you vital developer tools like working directly in the Linux command line and Git.",
                    "An incredibly supportive Discord community of thousands of learners helping each other debug.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "Kaggle Learn",
                id: "kaggle-learn",
            },
            {
                type: "paragraph",
                content: "Kaggle, owned by Google, is the world's largest data science community. Kaggle Learn offers fast-paced, highly practical micro-courses designed to get you rapidly up to speed on Data Science and Machine Learning concepts.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Learn core data skills rapidly: Python, Pandas, Machine Learning, Data Visualization, and SQL.",
                    "Run all of your code directly in browser-based Kaggle Notebooks instantly, avoiding dependency hell.",
                    "Curriculum is specifically designed to help you seamlessly transition from learning to competing in Kaggle data challenges.",
                    "Access to millions of free, open-source datasets to practice your new skills on.",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day3",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 2 — 30 Days of Free Resources =====
    {
        title: "Day 2: 30 Days of Free Learning Resources 📚",
        description: "Day 2 of sharing 5 free learning resources — today featuring Grow with Google, NVIDIA Academy, LangChain Academy, Oracle Academy, and Infosys Springboard.",
        date: "February 26, 2026",
        readTime: "3 min read",
        slug: "day-2-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Welcome to Day 2 of my 30-day challenge! Today I'm sharing 5 more incredible free learning platforms. These cover AI agents, GPU computing, cloud, Java, and career growth tools.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🟢 Grow with Google",
                id: "grow-with-google",
            },
            {
                type: "paragraph",
                content: "Google's career growth platform offers free training and Google Career Certificates. You can learn data analytics, UX design, project management, and IT support — all designed to get you job-ready.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Google Career Certificates in Data Analytics, UX Design, Project Management, IT Support",
                    "Free tools and resources to grow your skills and business",
                    "Designed for career changers — no degree required",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🟢 NVIDIA Academy",
                id: "nvidia-academy",
            },
            {
                type: "paragraph",
                content: "NVIDIA Academy covers everything from AI & Data Science to networking and DGX Systems. They offer self-paced courses, public remote training, private customized training, and certifications.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Topics: AI & Data Science, DGX Systems, Networking, RDMA, Software & Tools",
                    "Formats: Self-paced, public remote, private customized training",
                    "Certifications available to validate your skills",
                    "From beginner to advanced — including partner technical training",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🦜 LangChain Academy",
                id: "langchain-academy",
            },
            {
                type: "paragraph",
                content: "Want to build AI agents? LangChain Academy offers free courses that take you from zero to deploying production-ready agents.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Intro to Building Agents — Python",
                    "LangGraph Essentials — Python & TypeScript (State, Nodes, Edges, Memory)",
                    "LangSmith Agent Builder — build no-code agents using everyday language",
                    "LangSmith Essentials — the platform for agent engineering with live production data",
                    "Foundation: Introduction to LangChain — pre-built architectures and model integrations",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🔴 Oracle Academy",
                id: "oracle-academy",
            },
            {
                type: "paragraph",
                content: "Oracle Academy provides free courses for educational institutions covering the fundamentals of programming, databases, and cloud computing.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Java: Fundamentals → Foundations → Programming → AP Computer Science A",
                    "SQL, PL/SQL, and database design with hands-on Oracle APEX labs",
                    "Python and Node.js programming",
                    "Oracle Cloud Infrastructure (OCI) and cloud concepts",
                    "AI with Machine Learning in Java",
                    "Career Center with pathways to Oracle professional certifications",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🔵 Infosys Springboard",
                id: "infosys-springboard",
            },
            {
                type: "paragraph",
                content: "Infosys Springboard is a massive free learning platform with over 20,000 courses. Content comes from partnerships with Coursera and Harvard Business Publishing.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Programming: Java, Python, C#, JavaScript, Flutter (mobile app dev)",
                    "Emerging tech: Big Data, Robotics, ML, IoT, LLMs, Prompt Engineering, Deep Learning",
                    "Microsoft certifications prep (MS-900 and more)",
                    "Certifications via virtual proctored examinations",
                    "AI-powered immersive labs and secure assessments",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day2",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 1 — 30 Days of Free Resources =====
    {
        title: "Day 1: 30 Days of Free Learning Resources 🚀",
        description: "I'm starting a 30-day challenge — sharing 5 free learning resources every day. Day 1 features Hugging Face, MDN, Microsoft Learn, and Google.",
        date: "February 25, 2026",
        readTime: "3 min read",
        slug: "day-1-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "I'm starting a 30-day challenge: sharing 5 free learning resources every day for the next 30 days.",
            },
            {
                type: "paragraph",
                content: "Why? Because big tech companies offer incredible, abundant resources — from networking to AI agents, full stack to cloud, backend to DevOps — and most people don't even know they exist. Every resource will range across all companies where you can learn full stack, cloud, backend, AI agents, and more — all completely free.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "💡 Why Free Company Resources Matter",
                id: "why-resources-matter",
            },
            {
                type: "paragraph",
                content: "Companies like Microsoft, Google, NVIDIA, and Hugging Face have built massive learning platforms. These aren't basic tutorials — they're structured courses, career paths, and hands-on labs built by the people who make the tools you use every day.",
            },
            {
                type: "paragraph",
                content: "You can go from knowing nothing about a topic to building production-ready apps — and it won't cost you a single rupee. The only investment is your time.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🤗 Hugging Face Learn",
                id: "hugging-face-learn",
            },
            {
                type: "paragraph",
                content: "Hugging Face's learning hub features 12 completely free courses built by the Hugging Face team using their open-source ecosystem.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "LLM Course — everything about Large Language Models",
                    "AI Agents Course — build and deploy your own AI agents",
                    "MCP Course — learn the Model Context Protocol",
                    "Robotics Course — build robots with LeRobot",
                    "Deep RL Course — deep reinforcement learning",
                    "Computer Vision, Audio, Diffusion Models, ML for Games, ML for 3D",
                    "Open-Source AI Cookbook — practical notebooks by AI builders",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📜 JavaScript — MDN Web Docs",
                id: "javascript-mdn",
            },
            {
                type: "paragraph",
                content: "The gold standard for learning JavaScript. Mozilla's MDN Web Docs is the definitive reference used by developers worldwide.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Beginner tutorials to get you started from scratch",
                    "Intermediate guides: client-side frameworks, server-side programming",
                    "Advanced topics: closures, prototypes, iterators, meta-programming",
                    "Complete reference for every built-in object, expression, and API",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🔵 Microsoft Learn — Training Catalog",
                id: "microsoft-learn-training",
            },
            {
                type: "paragraph",
                content: "Microsoft Learn offers thousands of free, step-by-step training modules and learning paths with built-in sandbox environments to practice.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Azure, AI, Power Platform, Microsoft 365, Dynamics 365",
                    "Hands-on sandbox environments — no setup needed",
                    "Progress tracking and badges",
                    "New modules added regularly to cover the latest technologies",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🎯 Microsoft Learn — Career Paths",
                id: "microsoft-career-paths",
            },
            {
                type: "paragraph",
                content: "Microsoft maps their training to 15 real-world career roles. Pick your dream job role and follow a structured path to get there.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "AI Engineer — define and implement cutting-edge AI solutions",
                    "Data Scientist — find trends and develop data-driven solutions",
                    "Data Engineer — make complex data available and accessible",
                    "Developer — make technology work for everyone",
                    "DevOps Engineer — blend technical expertise with business savvy",
                    "Solutions Architect — define vision and implementation of tech solutions",
                    "Security Engineer, Data Analyst, Administrator, and more",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🌐 Google Learning",
                id: "google-learning",
            },
            {
                type: "paragraph",
                content: "Google's learning hub covers school, work, and life — with a strong focus on AI and the future of learning. Over 1 billion people discover something new through Google's tools every day.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "AI experiments and tools for educators, skill-seekers, and the curious",
                    "Google Workspace tools for working smarter",
                    "$263M committed to closing computing education equity gaps",
                    "70 million people gaining digital skills globally",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🔮 What's Coming Next",
                id: "whats-coming-next",
            },
            {
                type: "paragraph",
                content: "Over the next 30 days, I'll share resources from every major company — covering full stack, cloud, backend, AI agents, networking, databases, DevOps, and more. Stay tuned!",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 Check My Resources Page",
                id: "resources-page-day1",
            },
            {
                type: "paragraph",
                content: "I'm curating every resource I share on my dedicated Resources page. Bookmark it and check back daily!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG 1: Google Gemini CLI =====
    {
        title: "Supercharge Your Workflow with Google Gemini CLI",
        description: "Unlock AI-powered command-line capabilities. Learn how the new Google Gemini CLI lets you bootstrap projects and generate code directly from your terminal.",
        date: "May 10, 2025",
        readTime: "5 min read",
        slug: "supercharge-workflow-google-gemini-cli",
        content: [

            {
                type: "paragraph",
                content: "Unlock AI-powered CLI in seconds with the new Google Gemini CLI.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🚀 Introduction",
                id: "introduction",
            },
            {
                type: "paragraph",
                content: "Gemini CLI lets you bootstrap projects, generate code, and integrate AI assistants directly from your terminal.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "💻 Installation",
                id: "installation",
            },
            {
                type: "paragraph",
                content: "Ensure you have Node.js ≥ 18 installed, then:",
            },
            {
                type: "code",
                language: "bash",
                content: '# Run without installing\nnpx https://github.com/google-gemini/gemini-cli\n\n# Or install globally\nnpm install -g @google/gemini-cli',
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🔐 Authentication",
                id: "authentication",
            },
            {
                type: "paragraph",
                content: "Choose one of three methods:",
            },
            {
                type: "code",
                language: "text",
                content: '❍ Login with Google\n● Gemini API Key (AI Studio)\n❍ Vertex AI',
            },
            {
                type: "image",
                src: "/images/blog/installing.png",
                alt: "Authentication prompt for Gemini CLI",
                caption: "Choose your authentication method.",
                width: 700,
                height: 200,
            },
            {
                type: "paragraph",
                content: "Add your GEMINI_API_KEY to your .env (no reload needed), or follow the on-screen guide to log in.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "✨ Quick Example",
                id: "quick-example",
            },
            {
                type: "paragraph",
                content: "Create a Python FastAPI calculator project:",
            },
            {
                type: "image",
                src: "/images/blog/example.png",
                alt: "CLI prompt asking for a project description",
                caption: "Prompting Gemini CLI to create a FastAPI calculator.",
                width: 700,
                height: 150,
            },
            {
                type: "paragraph",
                content: "After confirming, Gemini CLI creates your files:",
            },
            {
                type: "image",
                src: "/images/blog/files_created.png",
                alt: "A tree view of the files created by the CLI",
                caption: "File structure generated by the CLI.",
                width: 700,
                height: 250,
            },
            {
                type: "paragraph",
                content: "It then starts the server at http://localhost:8000/:",
            },
            {
                type: "image",
                src: "/images/blog/code_output.png",
                alt: "Browser output from the generated FastAPI application",
                caption: "The running FastAPI application in the browser.",
                width: 700,
                height: 150,
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🎯 Conclusion",
                id: "conclusion",
            },
            {
                type: "paragraph",
                content: "Scaffold full-stack apps with a single command. Try Gemini CLI today and accelerate your development!",
            },
            { type: "divider" },
            {
                type: "paragraph",
                content: "Learn more & contribute:",
            },
            {
                type: "links",
                items: [
                    { text: "Google Gemini CLI GitHub Repo", url: "https://github.com/google-gemini/gemini-cli" } as BlogLink,
                    { text: "Google Gemini tutorial codes", url: "https://github.com/Aakashjammula/gemini_cli_turorial" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG 2: UV Python Package Manager =====
    {
        title: "uv: The Fastest Python Package Manager",
        description: "Discover the blazing fast Python package manager written in Rust that's revolutionizing Python workflows.",
        date: "April 16, 2025",
        readTime: "10 min read",
        slug: "uv-fastest-python-package-manager",
        content: [

            {
                type: "heading",
                level: 2,
                content: "What is uv?",
                id: "what-is-uv",
            },
            {
                type: "paragraph",
                content:
                    "uv is a blazing fast, all-in-one Python package and project manager built in Rust by the creators of Ruff.",
            },
            {
                type: "paragraph",
                content: "It aims to replace tools like:",
            },
            {
                type: "list",
                style: "unordered",
                items: ["pip, pip-tools, pipx, virtualenv", "poetry, pyenv, and twine"],
            },
            {
                type: "heading",
                level: 3,
                content: "Highlights",
                id: "highlights",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "10–100x faster than pip",
                    "One tool for everything: deps, envs, Python versions, tools",
                    "Manages Python versions",
                    "Uses global cache for space-efficient installs",
                    "Compatible with pip CLI",
                ],
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                level: 2,
                content: "How to Install uv",
                id: "how-to-install-uv",
            },
            {
                type: "heading",
                level: 3,
                content: "With curl (recommended)",
                id: "with-curl-recommended",
            },
            {
                type: "code",
                language: "bash",
                content:
                    '# macOS/Linux\ncurl -LsSf https://astral.sh/uv/install.sh | sh\n\n# Windows (PowerShell)\npowershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"',
            },
            {
                type: "heading",
                level: 3,
                content: "With pip or pipx",
                id: "with-pip-or-pipx",
            },
            {
                type: "code",
                language: "bash",
                content: "pip install uv\n# or\npipx install uv",
            },
            {
                type: "paragraph",
                content: "To update:",
            },
            {
                type: "code",
                language: "bash",
                content: "uv self update",
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                level: 2,
                content: "How to Use uv",
                id: "how-to-use-uv",
            },
            {
                type: "heading",
                level: 3,
                content: "1. Creating a new project",
                id: "creating-a-new-project",
            },
            {
                type: "code",
                language: "bash",
                content: "uv init myproject\ncd myproject\nuv add requests\nuv run script.py",
            },
            {
                type: "list",
                style: "unordered",
                items: ["Initializes a pyproject.toml", "Creates .venv", "Adds dependencies and runs your code"],
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                level: 3,
                content: "2. Using uv in an existing project",
                id: "using-uv-in-an-existing-project",
            },
            {
                type: "code",
                language: "bash",
                content:
                    "cd existing-project\nuv venv                    # create/manage virtualenv\nuv sync                    # install from lockfile\nuv run app.py              # run code inside env\n# Optional: uv compile     # compile deps into lockfile",
            },
            {
                type: "list",
                style: "unordered",
                items: ["Works even if you're not using uv for setup", "Compatible with requirements.txt and pyproject.toml"],
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                level: 2,
                content: "uv Cheat Sheet",
                id: "uv-cheat-sheet",
            },
            {
                type: "paragraph",
                content: "Based on SaaS Pegasus Deep Dive",
            },
            {
                type: "code",
                language: "bash",
                content:
                    '# Project setup\nuv init myproject            # Init new project\nuv venv                      # Create/manage virtualenv\nuv python install 3.11       # Install specific Python version\nuv python pin 3.11           # Use specific Python version\n\n# Dependency management\nuv add requests              # Add dependency\nuv remove requests           # Remove dependency\nuv compile                   # Create uv.lock\nuv sync                      # Install from lockfile\nuv pip install -r req.txt    # Use pip commands\nuv pip sync file.txt         # Install from requirements.txt\n\n# Run scripts\nuv run script.py             # Run Python file\nuv run "command"             # Run shell command in venv\n\n# Tools\nuv tool install ruff         # Install CLI tool like pipx\nuvx pycowsay "hello world"   # Run tool temporarily\n\n# Scripts with inline metadata\nuv add --script script.py requests  # Inject deps into script\nuv run script.py                    # Run it in isolated env\n\n# Cache and maintenance\nuv cache clean               # Clear cache\nuv self update               # Update uv itself',
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                level: 2,
                content: "Pros and Cons",
                id: "pros-and-cons",
            },
            {
                type: "heading",
                level: 3,
                content: "Pros",
                id: "pros",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Extremely fast (Rust-powered)",
                    "Drop-in pip & pipx replacement",
                    "All-in-one (env, deps, tools, Python)",
                    "Global cache saves space",
                    "Universal lockfile",
                    "Great for mono-repos (Cargo-style workspaces)",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: "Cons",
                id: "cons",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Still new—less mature than pip/poetry",
                    "Not all advanced features from poetry yet",
                    "Smaller ecosystem",
                ],
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                level: 2,
                content: "Conclusion",
                id: "conclusion-uv",
            },
            {
                type: "paragraph",
                content:
                    "uv is not just fast—it's a serious contender to unify the Python tooling ecosystem. Whether you're a beginner or managing large workspaces, it's worth trying today.",
            },
            {
                type: "links",
                items: [
                    { text: "Official Docs", url: "https://docs.astral.sh/uv" } as BlogLink,
                    { text: "GitHub Repo", url: "https://github.com/astral-sh/uv" } as BlogLink,
                    { text: "Benchmarks & Deep Dive", url: "https://www.saaspegasus.com/guides/uv-deep-dive/" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG 3: Model Control Protocol =====
    {
        title: "Beginner's Guide to MCP with LangChain and Gemini",
        description: "A beginner's guide to the Model Control Protocol in AI agents with LangChain, Gemini and Python-MCP SDK.",
        date: "April 16, 2025",
        readTime: "10 min read",
        slug: "mcp-model-control-protocol",
        content: [

            {
                type: "heading",
                level: 2,
                content: "What is MCP?",
                id: "what-is-mcp"
            },
            {
                type: "paragraph",
                content: "MCP (Model Control Protocol) is a standard way for language models to interact with external tools like web search, calculators, or databases in a structured and clean manner."
            },
            {
                type: "paragraph",
                content: "It acts like a bridge between the model and the tools, making communication modular and manageable."
            },
            {
                type: "heading",
                level: 2,
                content: "Why Use MCP in Agents?",
                id: "why-use-mcp-in-agents"
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Separates model logic from tool logic",
                    "Allows AI agents to decide when and how to use tools",
                    "Keeps the system modular, scalable, and easier to maintain",
                    "Works great with agent frameworks like LangChain"
                ]
            },
            {
                type: "paragraph",
                content: "In short, MCP makes your AI agent smarter and more capable by letting it access external knowledge or functionalities as needed."
            },
            {
                type: "divider"
            },
            {
                type: "heading",
                level: 2,
                content: "Let's Understand This by a Simple Project",
                id: "lets-understand-this-by-a-simple-project"
            },
            {
                type: "paragraph",
                content: "To see MCP in action, let's look at a practical example: the GitHub project mcp_langchain_examples."
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Uses LangChain to create and manage the agent",
                    "Uses Gemini 2.0 Flash as the base AI model",
                    "Adds DuckDuckGo as an external web search tool",
                    "Uses MCP to connect the model and tools cleanly"
                ]
            },
            {
                type: "paragraph",
                content: "Here's how the project is structured:"
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "server.py - Implements the MCP server and tool (DuckDuckGo)",
                    "prompt.py - Contains system prompts to guide the AI",
                    "main.py - Runs the agent logic with Gemini and MCP tools",
                    "requirements.txt - Lists Python dependencies"
                ]
            },
            {
                type: "divider"
            },
            {
                type: "heading",
                level: 2,
                content: "Installation & Setup",
                id: "installation-and-setup-mcp"
            },
            {
                type: "heading",
                level: 3,
                content: "Prerequisites",
                id: "prerequisites"
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Python 3.8+",
                    "Google API key for Gemini model"
                ]
            },
            {
                type: "heading",
                level: 3,
                content: "Method 1: Using uv (recommended)",
                id: "using-uv"
            },
            {
                type: "code",
                language: "bash",
                content: "# Install uv\ncurl -LsSf https://astral.sh/uv/install.sh | sh\n\n# Create env & install\nuv venv\nuv sync"
            },
            {
                type: "heading",
                level: 3,
                content: "Method 2: Using pip",
                id: "using-pip"
            },
            {
                type: "code",
                language: "bash",
                content: "# Create and activate virtual environment\npython -m venv .venv\nsource .venv/bin/activate\n\n# Install requirements\npip install -r requirements.txt"
            },
            {
                type: "paragraph",
                content: "Then, create a `.env` file in the root and add your Gemini API key:"
            },
            {
                type: "code",
                language: "bash",
                content: "GOOGLE_API_KEY=your_api_key_here"
            },
            {
                type: "divider"
            },
            {
                type: "heading",
                level: 2,
                content: "Running the Project",
                id: "running-the-project"
            },
            {
                type: "code",
                language: "bash",
                content: "# Start the MCP Server\nuv run ./src/server.py\n\n# In another terminal, run the main app\nuv run ./src/main.py"
            },
            {
                type: "divider"
            },
            {
                type: "heading",
                level: 2,
                content: "How It Works",
                id: "how-it-works"
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "User inputs a question",
                    "The agent checks the prompt and decides to use the search tool",
                    "The MCP server handles the DuckDuckGo search",
                    "Results are returned and formatted as a response"
                ]
            },
            {
                type: "heading",
                level: 2,
                content: "Example Interaction",
                id: "example-interaction"
            },
            {
                type: "code",
                language: "bash",
                content: "Question: Who is the current CEO of OpenAI?\nAnswer: As of the latest search, the CEO of OpenAI is Sam Altman."
            },
            {
                type: "divider"
            },
            {
                type: "heading",
                level: 2,
                content: "Conclusion",
                id: "conclusion-mcp"
            },
            {
                type: "paragraph",
                content: "MCP brings a structured and scalable way to empower your AI agents. By combining it with LangChain and a capable model like Gemini, you can build smart, flexible, tool-using agents easily. Try out this project and start building your own powerful AI workflows!"
            },
            {
                type: "links",
                items: [
                    {
                        text: "Project GitHub Repo",
                        url: "https://github.com/Aakashjammula/mcp_langchain_examples"
                    } as BlogLink,
                    {
                        text: "Learn about LangChain",
                        url: "https://docs.langchain.com"
                    } as BlogLink,
                    {
                        text: "Explore Gemini API",
                        url: "https://ai.google.dev/"
                    } as BlogLink
                ],
            },
        ],
    },
];
