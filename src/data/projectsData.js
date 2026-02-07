// src/data/projectsData.js

export const projectsData = [
  {
    id: "stadia-bluetooth",
    title: "Stadia Bluetooth",
    category: "System Engineering",
    year: "2024",
    thumbnail: "/ComputerVision.jpg", // Replace with your image path
    heroImage: "/stadia-hero.jpg",   // Replace with your image path
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: "This project unlocks the Bluetooth capabilities of the Stadia controller...",
      },
      {
        id: "problem",
        title: "The Problem",
        content: "The controller was originally locked to Wi-Fi connectivity...",
      },
      {
        id: "architecture",
        title: "System Architecture",
        content: "We utilized reverse engineering to patch the firmware...",
      },
      {
        id: "solution",
        title: "The Solution",
        content: "A custom flasher tool built with WebUSB...",
      },
    ],
  },
  {
    id: "ai-vision",
    title: "AI Motion Tracker",
    category: "Computer Vision",
    year: "2025",
    thumbnail: "/vision-thumb.jpg",
    heroImage: "/vision-hero.jpg",
    sections: [
      { id: "overview", title: "Overview", content: "Real-time tracking..." },
      { id: "tech-stack", title: "Tech Stack", content: "YOLOv8, OpenCV..." },
    ],
  },
  // Add more projects here
];