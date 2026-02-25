/**
 * lib/data/resources.ts
 * Centralized data store for all learning resources.
 */

export interface Resource {
    title: string;
    description: string;
    url: string;
    category: "tool" | "article" | "course" | "video" | "other";
    logo: string;       // path to logo in /public/images/resources/
    brandColor: string;  // hex color for the card banner background
}

export const resources: Resource[] = [
    {
        title: "Hugging Face Learn",
        description:
            "Free courses on NLP, transformers, deep reinforcement learning, and more from the Hugging Face team.",
        url: "https://huggingface.co/learn",
        category: "course",
        logo: "/images/resources/huggingface.svg",
        brandColor: "#FF9D00",
    },
    {
        title: "JavaScript — MDN Web Docs",
        description:
            "The definitive reference and tutorials for JavaScript by Mozilla. From basics to advanced concepts.",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        category: "article",
        logo: "/images/resources/javascript.svg",
        brandColor: "#323330",
    },
    {
        title: "Microsoft Learn — Training",
        description:
            "Browse Microsoft's entire catalog of free, hands-on training modules across Azure, AI, Power Platform, and more.",
        url: "https://learn.microsoft.com/en-us/training/browse/",
        category: "course",
        logo: "/images/resources/microsoft.svg",
        brandColor: "#0078D4",
    },
    {
        title: "Microsoft Learn — Career Paths",
        description:
            "Structured learning paths aligned to career roles like AI Engineer, Data Scientist, and Cloud Developer.",
        url: "https://learn.microsoft.com/en-us/training/career-paths/",
        category: "course",
        logo: "/images/resources/microsoft.svg",
        brandColor: "#5C2D91",
    },
    {
        title: "Google Learning",
        description:
            "Google's hub for learning resources including AI, cloud, data analytics, and digital skills.",
        url: "https://learning.google/",
        category: "course",
        logo: "/images/resources/google.svg",
        brandColor: "#0f172a", // Slate 900 - dark background to make the colorful G pop
    },
    {
        title: "Grow with Google",
        description:
            "Free training and tools from Google to help you grow your skills, career, or business.",
        url: "https://grow.google/intl/en_in/",
        category: "course",
        logo: "/images/resources/google.svg",
        brandColor: "#1e293b", // Slate 800 - looks great with the multi-colored G
    },
    {
        title: "NVIDIA Academy",
        description:
            "Self-paced courses on deep learning, CUDA programming, computer vision, and accelerated computing.",
        url: "https://academy.nvidia.com/en/",
        category: "course",
        logo: "/images/resources/nvidia.svg",
        brandColor: "#14532d", // Dark green background
    },
    {
        title: "LangChain Academy",
        description:
            "Free courses on building AI agents with LangChain, LangGraph, and LangSmith. From no-code agent builders to Python/TypeScript essentials.",
        url: "https://academy.langchain.com/collections",
        category: "course",
        logo: "/images/resources/langchain.svg",
        brandColor: "#10A37F",
    },
    {
        title: "Oracle Academy",
        description:
            "Free courses in Java, SQL, database design, Python, Node.js, Oracle Cloud Infrastructure, and AI with Machine Learning.",
        url: "https://academy.oracle.com/en/oa-web-overview.html",
        category: "course",
        logo: "/images/resources/oracle.svg",
        brandColor: "#C74634",
    },
    {
        title: "Infosys Springboard",
        description:
            "20,000+ free courses covering Java, Python, Flutter, Big Data, Robotics, ML, LLMs, and Prompt Engineering. Certifications included.",
        url: "https://infyspringboard.onwingspan.com/web/en/login",
        category: "course",
        logo: "/images/resources/infosys.svg",
        brandColor: "#007CC3", // Restored blue background
    },
];
