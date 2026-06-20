import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { projectsData } from "../../data/projectsData";
import {
  Home,
  Folder,
  Settings,
  Mail,
  Play,
  Terminal,
  X,
  ChevronRight,
  ChevronDown,
  GitBranch,
  Files,
  Menu,
  Minimize2,
  Maximize2,
  ChevronUp,
  Coffee,
  AlertCircle,
  HelpCircle,
  FileText,
  PanelRight
} from "lucide-react";
import CustomCursor from "../cursor/CustomCursor";
import GlassOverlay from "../background/GlassOverlay";
import InteractiveConstellation from "../background/InteractiveConstellation";
import { ThemeContext } from "../../context/ThemeContext";
import AiChatSidebar from "../chat/AiChatSidebar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./IdeLayout.css";

gsap.registerPlugin(ScrollTrigger);

export default function IdeLayout({ children, isDesktop }) {
  const navigate = useNavigate();
  const location = useLocation();
  const viewportRef = useRef(null);

  const match = location.pathname.match(/\/project\/([^/]+)/);
  const projectId = match ? match[1] : null;
  const project = useMemo(() => {
    return projectId ? projectsData.find(p => p.id === projectId) : null;
  }, [projectId]);

  const [outlineOpen, setOutlineOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  // Track active section for Outline view on scroll
  useEffect(() => {
    if (!projectId) {
      setActiveSection("");
      return;
    }

    let observer;

    const bindObserver = () => {
      if (observer) observer.disconnect();

      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };

      observer = new IntersectionObserver(observerCallback, observerOptions);
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => observer.observe(section));
    };

    // Bind initially
    bindObserver();

    // Re-bind when mutations occur in the viewport (e.g. when Suspense lazy loading completes)
    const viewportEl = document.querySelector('.editor-viewport');
    let mutationObserver;
    if (viewportEl) {
      mutationObserver = new MutationObserver(() => {
        bindObserver();
      });
      mutationObserver.observe(viewportEl, { childList: true, subtree: true });
    }

    return () => {
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [projectId]);

  // ── Theme Context ──────────────────────────────────────────────────────────
  const { theme, setTheme } = useContext(ThemeContext);

  // ── Layout Toggles ─────────────────────────────────────────────────────────
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelState, setPanelState] = useState("normal"); // "normal", "maximized"
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // ── Terminal Shell Logic ───────────────────────────────────────────────────
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState([
    { text: "Initializing portfolio dev environment...", type: "system" },
    { text: "[Vite] hot module replacement enabled", type: "muted" },
    { text: "Welcome to Jay Joshi's Portfolio Terminal v1.0.6", type: "system" },
    { text: "Type 'help' to see list of available commands.", type: "system" },
    { text: "", type: "system" }
  ]);
  const [commandHistory, setCommandHistory] = useState(() => {
    try {
      const saved = sessionStorage.getItem("terminal_history");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalMode, setTerminalMode] = useState("normal"); // "normal", "matrix", "snake"

  const terminalEndRef = useRef(null);
  const terminalInputRef = useRef(null);

  const commandsList = useMemo(() => [
    "help", "ls", "cd", "cat", "theme", "neofetch", "clear", "git",
    "whoami", "ping", "joke", "skills", "weather", "matrix", "snake",
    "minesweeper", "tictactoe", "wordle", "games", "play", "epoxy"
  ], []);

  const handleAutocomplete = () => {
    const input = terminalInput.trim();
    if (!input) return;

    const parts = input.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    if (parts.length === 1) {
      const matches = commandsList.filter(c => c.startsWith(cmd));
      if (matches.length === 1) {
        setTerminalInput(matches[0] + " ");
      } else if (matches.length > 1) {
        setTerminalLines(prev => [
          ...prev,
          { text: `visitor@jay-portfolio:~$ ${terminalInput}`, type: "input" },
          { text: matches.join("    "), type: "system" },
          { text: "", type: "system" }
        ]);
      }
    } else if (parts.length === 2) {
      let options = [];
      if (cmd === "cd") {
        options = ["home", "readme.md", "projects", "skills", "contact"];
      } else if (cmd === "theme") {
        options = ["glass", "dracula", "one-dark", "nord", "synthwave", "grass", "atomic", "light"];
      } else if (cmd === "cat") {
        options = ["README.md"];
      } else if (cmd === "play") {
        options = ["snake", "minesweeper", "tictactoe", "wordle"];
      }

      const matches = options.filter(o => o.startsWith(arg.toLowerCase()));
      if (matches.length === 1) {
        setTerminalInput(`${parts[0]} ${matches[0]}`);
      } else if (matches.length > 1) {
        setTerminalLines(prev => [
          ...prev,
          { text: `visitor@jay-portfolio:~$ ${terminalInput}`, type: "input" },
          { text: matches.join("    "), type: "system" },
          { text: "", type: "system" }
        ]);
      }
    }
  };

  // ── Map Location to Workspace Files ────────────────────────────────────────
  // We represent routes as workspace files
  const files = useMemo(() => [
    { name: "Home.jsx", path: "/", icon: <Home size={14} className="text-accent" /> },
    { name: "Projects.jsx", path: "/projects", icon: <Folder size={14} className="text-amber-400" /> },
    { name: "Skills.jsx", path: "/skills", icon: <Settings size={14} className="text-sky-400" /> },
    { name: "Contact.jsx", path: "/contact", icon: <Mail size={14} className="text-emerald-400" /> },
    { name: "README.md", path: "/readme", icon: <FileText size={14} className="text-sky-300" /> }
  ], []);

  // Compute active file based on URL path
  const activeFile = useMemo(() => {
    const currentPath = location.pathname;
    // Find matching file
    const file = files.find(f => f.path === currentPath);
    if (file) return file;
    // Fallbacks
    if (currentPath.startsWith("/project/")) return { name: "ProjectDetail.jsx", path: currentPath, icon: <Folder size={14} className="text-amber-500" /> };
    if (currentPath.startsWith("/project-summary/")) return { name: "ProjectSummary.jsx", path: currentPath, icon: <Folder size={14} className="text-amber-500" /> };
    if (currentPath === "/epoxy" || currentPath.length > 20) return { name: "Epoxy.jsx", path: currentPath, icon: <Settings size={14} className="text-purple-400" /> };
    if (currentPath === "/boost") return { name: "Boost.jsx", path: currentPath, icon: <Play size={14} className="text-pink-400" /> };
    return files[0]; // Default Home.jsx
  }, [location.pathname, files]);

  // Open tabs list state
  const [openTabs, setOpenTabs] = useState(() => {
    // Start with Home.jsx and active tab
    return [files[0]];
  });

  // Whenever active file changes, add it to tabs if it's not there
  useEffect(() => {
    setOpenTabs(prev => {
      const exists = prev.some(tab => tab.name === activeFile.name);
      if (exists) return prev;
      return [...prev, activeFile];
    });
  }, [activeFile]);

  // Konami Code listener
  useEffect(() => {
    const konamiCode = [
      "ArrowUp", "ArrowUp",
      "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight",
      "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    let index = 0;

    const handleKeyDown = (e) => {
      const key = e.key;
      const expectedKey = konamiCode[index];

      if (key.toLowerCase() === expectedKey.toLowerCase()) {
        index++;
        if (index === konamiCode.length) {
          index = 0;
          triggerKonamiEgg();
        }
      } else {
        index = 0;
      }
    };

    const triggerKonamiEgg = () => {
      setPanelOpen(true);
      setPanelState("maximized");
      setTerminalLines(prev => [
        ...prev,
        { text: "==================================================", type: "system" },
        { text: "   !!! KONAMI CODE CHEAT CODE UNLOCKED !!!", type: "bold" },
        { text: "   ACCESS GRANTED. ENABLING SYSTEM DEEP WATERFALL.", type: "bold" },
        { text: "==================================================", type: "system" },
        { text: "", type: "system" }
      ]);
      setTimeout(() => {
        setTerminalMode("matrix");
      }, 1500);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderTreeItem = (file) => (
    <div
      key={file.name}
      onClick={() => {
        navigate(file.path);
        setMobileExplorerOpen(false);
      }}
      className={`tree-item ${activeFile.name === file.name ? "active" : ""}`}
    >
      {file.icon}
      <span className="font-mono text-xs">{file.name}</span>
    </div>
  );

  // Set default scroller for GSAP ScrollTrigger to the editor viewport
  React.useLayoutEffect(() => {
    if (viewportRef.current) {
      ScrollTrigger.defaults({
        scroller: viewportRef.current
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [location.pathname]);

  // Simulate realistic compiler logs in terminal history on routing
  useEffect(() => {
    const isInitialLoad = terminalLines.length <= 6;
    const compileTime = Math.floor(Math.random() * 50) + 20; // 20ms to 70ms

    if (isInitialLoad) {
      setTerminalLines(prev => [
        ...prev,
        { text: `[Vite] HMR connected`, type: "muted" },
        { text: `[Server] compiled ${activeFile.name} successfully in ${compileTime}ms`, type: "system" },
        { text: "", type: "system" }
      ]);
    } else {
      setTerminalLines(prev => [
        ...prev,
        { text: `[Vite] routing to ${activeFile.path}...`, type: "muted" },
        { text: `[Server] compiling ${activeFile.name}...`, type: "system" },
        { text: `[Server] successfully bundled in ${compileTime}ms`, type: "system" },
        { text: "", type: "system" }
      ]);
    }
  }, [location.pathname]);

  // Terminal Auto Scroll
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLines, panelOpen]);

  // Focus terminal input when panel is opened or clicked
  const focusTerminal = () => {
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  };

  // Close Tab handler
  const closeTab = (e, tabToClose) => {
    e.stopPropagation();
    // Don't close the last tab
    if (openTabs.length === 1) return;

    const newTabs = openTabs.filter(tab => tab.name !== tabToClose.name);
    setOpenTabs(newTabs);

    // If we closed the active tab, navigate to the next available one
    if (activeFile.name === tabToClose.name) {
      const remainingTab = newTabs[newTabs.length - 1];
      navigate(remainingTab.path);
    }
  };

  // Terminal Command Execution
  // Helper command handlers to resolve executeCommand complexity
  const commandHandlers = useMemo(() => ({
    help: () => [
      { text: "Available commands:", type: "system" },
      { text: "  ls            - List files/pages in directory", type: "system" },
      { text: "  cd <page>     - Navigate to page (home, projects, skills, contact)", type: "system" },
      { text: "  cat <file>    - Print file contents (README.md)", type: "system" },
      { text: "  theme <name>  - Change theme (glass, dracula, one-dark, nord, synthwave, grass, atomic, light)", type: "system" },
      { text: "  neofetch      - Display system info & stats", type: "system" },
      { text: "  whoami        - Display current session info", type: "system" },
      { text: "  ping <host>   - Test network latency", type: "system" },
      { text: "  git status    - Check current repository status", type: "system" },
      { text: "  joke          - Display a programming joke", type: "system" },
      { text: "  skills        - Print technical skills sheet", type: "system" },
      { text: "  weather [city]- Show current weather summary", type: "system" },
      { text: "  clear         - Clear the screen", type: "system" }
    ],
    ls: () => [
      { text: "Directory: workspace/", type: "system" },
      { text: "  Home.jsx        README.md       Projects.jsx    Skills.jsx    Contact.jsx", type: "system" }
    ],
    dir: () => commandHandlers.ls(),
    cd: (arg) => {
      if (!arg) return [{ text: "Usage: cd <page> (e.g. cd projects)", type: "error" }];
      const target = arg.toLowerCase();
      if (["home", "home.jsx", "/", ".."].includes(target)) {
        navigate("/");
        return [{ text: "Navigating to Home...", type: "system" }];
      }
      if (["readme", "readme.md"].includes(target)) {
        navigate("/readme");
        return [{ text: "Navigating to README.md...", type: "system" }];
      }
      if (["projects", "projects.jsx"].includes(target)) {
        navigate("/projects");
        return [{ text: "Navigating to Projects...", type: "system" }];
      }
      if (["skills", "skills.jsx"].includes(target)) {
        navigate("/skills");
        return [{ text: "Navigating to Skills...", type: "system" }];
      }
      if (["contact", "contact.jsx"].includes(target)) {
        navigate("/contact");
        return [{ text: "Navigating to Contact...", type: "system" }];
      }
      return [{ text: `Directory not found: '${arg}'`, type: "error" }];
    },
    cat: (arg) => {
      if (!arg) return [{ text: "Usage: cat <file> (e.g. cat README.md)", type: "error" }];
      const target = arg.toLowerCase();
      if (target === "readme.md" || target === "readme") {
        return [
          { text: "Reading README.md...", type: "system" },
          { text: "==============================================", type: "system" },
          { text: " JAY JOSHI - WORKSPACE PORTFOLIO", type: "bold" },
          { text: " AI/ML Engineer & Frontend Developer", type: "bold" },
          { text: "==============================================", type: "system" },
          { text: "CORE SYSTEMS INTERFACE: CLI TERMINAL", type: "bold" },
          { text: "  Interactive IDE terminal utilities are active in this workspace.", type: "system" },
          { text: "  Available commands:", type: "system" },
          { text: "    help, ls, cd, cat, theme, neofetch, whoami, ping, git, joke, skills, weather", type: "system" },
          { text: "", type: "system" },
          { text: "  [SYSTEM DIAGNOSTICS WARNING]", type: "bold" },
          { text: "    Certain unlisted developer testing utilities, emulator subsystems,", type: "system" },
          { text: "    and classic hardware cheat codes remain active but hidden.", type: "system" },
          { text: "    Try exploring shell arguments or inputting standard hardware patterns.", type: "system" },
          { text: "==============================================", type: "system" }
        ];
      }
      return [{ text: `cat: File not found: '${arg}'`, type: "error" }];
    },
    theme: (arg) => {
      if (!arg) return [{ text: "Usage: theme <glass|dracula|one-dark|nord|synthwave|grass|atomic|light>", type: "error" }];
      if (["glass", "dracula", "one-dark", "nord", "synthwave", "grass", "atomic", "light"].includes(arg)) {
        setTheme(arg);
        return [{ text: `Theme successfully updated to '${arg}'!`, type: "system" }];
      }
      return [{ text: `Unknown theme: '${arg}'. Available themes: glass, dracula, one-dark, nord, synthwave, grass, atomic, light`, type: "error" }];
    },
    epoxy: () => {
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('epoxyAccessToken', token);
      setTimeout(() => { navigate(`/${token}`); }, 500);
      return [{ text: "Bypassing protocols... Running Epoxy Auth Sequence", type: "system" }];
    },
    git: (arg) => {
      if (arg === "status") {
        return [
          { text: "On branch main", type: "system" },
          { text: "Your branch is up to date with 'origin/main'.", type: "system" },
          { text: "Changes not staged for commit:", type: "system" },
          { text: "  (use \"git add <file>...\" to update what will be committed)", type: "muted" },
          { text: "  modified:   src/app.jsx (Smart Navigation: OK)", type: "bold" },
          { text: "no changes added to commit (use \"git add\" and/or \"git commit -a\")", type: "system" }
        ];
      }
      return [{ text: `git: Command option not implemented. Try 'git status'.`, type: "error" }];
    },
    neofetch: () => {
      const systemInfo = [
        { text: "visitor@jay-portfolio", type: "bold" },
        { text: "---------------------", type: "muted" },
        { text: "OS: React / Vite v7.3.1", type: "system" },
        { text: "Kernel: portfolio-kernel-x86_64", type: "system" },
        { text: "Uptime: 100% stable", type: "system" },
        { text: "Shell: portfolio-sh v1.0.6", type: "system" },
        { text: "Theme: " + theme, type: "system" },
        { text: "Focus: AI/ML · Frontend", type: "system" },
        { text: "Status: Available for Internships", type: "system" }
      ];

      let header = [];
      if (theme === "synthwave") {
        header = [
          { text: " ─── SYNTHWAVE ───", type: "bold" },
          { text: "   .  .  *   .   .", type: "system" },
          { text: "  *    |    *  .", type: "system" },
          { text: " ───( o )─── * ", type: "system" },
          { text: "  *    |    *  .", type: "system" }
        ];
      } else if (theme === "grass") {
        header = [
          { text: " ─── GRASS THEME ───", type: "bold" },
          { text: "     _(_)_          ", type: "system" },
          { text: "   _(_)@(_)_        ", type: "system" },
          { text: "  (_)@(_)@(_)       ", type: "system" },
          { text: "    (_)@(_)         ", type: "system" }
        ];
      } else if (theme === "atomic") {
        header = [
          { text: " ─── ATOMIC TECH ───", type: "bold" },
          { text: "      .---.         ", type: "system" },
          { text: "     /  .  \\        ", type: "system" },
          { text: "    |  (o)  |       ", type: "system" },
          { text: "     \\  .  /        ", type: "system" }
        ];
      } else if (theme === "dracula") {
        header = [
          { text: " ─── DRACULA VAMP ───", type: "bold" },
          { text: "     /\\___/\\        ", type: "system" },
          { text: "    (=`_`  =)       ", type: "system" },
          { text: "      \\  /          ", type: "system" },
          { text: "       \\/           ", type: "system" }
        ];
      } else if (theme === "nord") {
        header = [
          { text: " ─── NORDIC ARCTIC ───", type: "bold" },
          { text: "      /\\            ", type: "system" },
          { text: "     /  \\           ", type: "system" },
          { text: "    /____\\          ", type: "system" },
          { text: "   /      \\         ", type: "system" }
        ];
      }

      return [...header, { text: "", type: "system" }, ...systemInfo];
    },
    whoami: () => {
      const userAgent = navigator.userAgent;
      let os = "Unknown OS";
      if (userAgent.indexOf("Win") !== -1) os = "Windows";
      else if (userAgent.indexOf("Mac") !== -1) os = "macOS";
      else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
      else if (userAgent.indexOf("Android") !== -1) os = "Android";
      else if (userAgent.indexOf("like Mac") !== -1) os = "iOS";

      const localTime = new Date().toLocaleString();
      return [
        { text: "visitor@jay-portfolio", type: "bold" },
        { text: `Role:        Guest Developer / Reviewer`, type: "system" },
        { text: `Client OS:   ${os}`, type: "system" },
        { text: `Local Time:  ${localTime}`, type: "system" },
        { text: `IP (MOCK):   192.168.1.107`, type: "system" },
        { text: `Host:        system.jayjoshi.dev`, type: "system" },
        { text: `Access:      Authorized (Level 1)`, type: "system" }
      ];
    },
    ping: (arg) => {
      const host = arg || "google.com";
      setTimeout(() => {
        setTerminalLines(prev => [...prev, { text: `64 bytes from ${host}: icmp_seq=1 ttl=116 time=14.2 ms`, type: "system" }]);
      }, 300);
      setTimeout(() => {
        setTerminalLines(prev => [...prev, { text: `64 bytes from ${host}: icmp_seq=2 ttl=116 time=12.8 ms`, type: "system" }]);
      }, 800);
      setTimeout(() => {
        setTerminalLines(prev => [...prev, { text: `64 bytes from ${host}: icmp_seq=3 ttl=116 time=15.1 ms`, type: "system" }]);
      }, 1300);
      setTimeout(() => {
        setTerminalLines(prev => [...prev, { text: `64 bytes from ${host}: icmp_seq=4 ttl=116 time=13.5 ms`, type: "system" }]);
      }, 1800);
      setTimeout(() => {
        setTerminalLines(prev => [...prev, 
          { text: `--- ${host} ping statistics ---`, type: "bold" },
          { text: `4 packets transmitted, 4 received, 0% packet loss, time 2005ms`, type: "system" },
          { text: `rtt min/avg/max/mdev = 12.8/13.9/15.1/0.88 ms`, type: "system" },
          { text: "", type: "system" }
        ]);
      }, 2300);

      return [
        { text: `PING ${host} (142.250.190.46) 56(84) bytes of data.`, type: "system" }
      ];
    },
    joke: () => {
      const jokes = [
        "Why do programmers wear glasses? Because they can't C#.",
        "There are 10 types of people in the world: those who understand binary, and those who don't.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "A SQL query goes into a bar, walks up to two tables and asks, 'Can I join you?'",
        "['hip', 'hip'] (hip hip array!)",
        "Why did the programmer quit his job? Because he didn't get arrays.",
        "An optimist says: 'The glass is half full.' A pessimist says: 'The glass is half empty.' A programmer says: 'The glass is twice as large as it needs to be.'",
        "What is a programmer's favorite hangout place? Foo Bar.",
        "Real programmers count from 0."
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return [
        { text: randomJoke, type: "bold" }
      ];
    },
    skills: () => [
      { text: "┌──────────────────────────────────────────────┐", type: "system" },
      { text: "│           JAY JOSHI - SKILL SHEETS           │", type: "bold" },
      { text: "├──────────────────────┬───────────────────────┤", type: "system" },
      { text: "│ AI & DEEP LEARNING   │ FRONTEND & WORKSPACE  │", type: "system" },
      { text: "├──────────────────────┼───────────────────────┤", type: "system" },
      { text: "│ • Python / PyTorch   │ • React.js / Vite.js  │", type: "system" },
      { text: "│ • OpenCV / YOLOv8    │ • Tailwind CSS / GSAP │", type: "system" },
      { text: "│ • DeepSORT / NLP     │ • Git / IDE Systems   │", type: "system" },
      { text: "│ • Model Optimization │ • Responsive Design   │", type: "system" },
      { text: "└──────────────────────┴───────────────────────┘", type: "system" }
    ],
    weather: (arg) => {
      const city = arg ? arg.charAt(0).toUpperCase() + arg.slice(1).toLowerCase() : "Noida";
      const temp = Math.floor(Math.random() * 10) + 28;
      return [
        { text: `Weather report: ${city}`, type: "bold" },
        { text: `   \\   /     Sunny`, type: "system" },
        { text: `    .-.      Temperature: ${temp}°C`, type: "system" },
        { text: ` ― (   ) ―   Humidity: 62%`, type: "system" },
        { text: `    \`-\`      Wind Speed: 12 km/h`, type: "system" },
        { text: `   /   \\     Condition: Clear skies, optimal code conditions.`, type: "system" }
      ];
    },
    sudo: (arg) => {
      if (!arg) return [{ text: "sudo: command option required", type: "error" }];
      const cmd = arg.toLowerCase();
      if (cmd === "rm" || cmd === "rm -rf") {
        return [
          { text: "WARNING: Attempting root deletion of portfolio workspace.", type: "error" },
          { text: "Access Denied. This incident has been logged and reported to Santa Claus.", type: "error" }
        ];
      }
      if (cmd === "make" || cmd === "make me a sandwich" || cmd === "make sandwich") {
        return [
          { text: "What? Make it yourself.", type: "system" }
        ];
      }
      return [
        { text: "visitor is not in the sudoers file. This incident will be reported.", type: "error" }
      ];
    },
    matrix: () => {
      setTimeout(() => setTerminalMode("matrix"), 300);
      return [{ text: "Initializing Matrix waterfall stream...", type: "system" }];
    },
    rain: () => commandHandlers.matrix(),
    snake: () => {
      setTimeout(() => setTerminalMode("snake"), 300);
      return [{ text: "Booting retro snake subsystem...", type: "system" }];
    },
    minesweeper: () => {
      setTimeout(() => setTerminalMode("minesweeper"), 300);
      return [{ text: "Booting Minesweeper...", type: "system" }];
    },
    tictactoe: () => {
      setTimeout(() => setTerminalMode("tictactoe"), 300);
      return [{ text: "Launching Tic Tac Toe...", type: "system" }];
    },
    wordle: () => {
      setTimeout(() => setTerminalMode("wordle"), 300);
      return [{ text: "Launching Wordle (Termle)...", type: "system" }];
    },
    games: () => [
      { text: "=== Game Library ===", type: "bold" },
      { text: "  snake        - Play Retro Snake", type: "system" },
      { text: "  minesweeper  - Play Minesweeper (Shift+Click to flag)", type: "system" },
      { text: "  tictactoe    - Play Tic Tac Toe (vs AI)", type: "system" },
      { text: "  wordle       - Play 5-letter Wordle (Termle)", type: "system" },
      { text: "", type: "system" },
      { text: "Type 'play <game>' or run the game command directly (e.g. 'snake') to launch.", type: "system" }
    ],
    play: (arg) => {
      if (!arg) return [{ text: "Usage: play <snake|minesweeper|tictactoe|wordle>", type: "error" }];
      const target = arg.toLowerCase();
      if (target === "snake") {
        setTimeout(() => setTerminalMode("snake"), 300);
        return [{ text: "Launching Snake...", type: "system" }];
      }
      if (target === "minesweeper") {
        setTimeout(() => setTerminalMode("minesweeper"), 300);
        return [{ text: "Launching Minesweeper...", type: "system" }];
      }
      if (target === "tictactoe") {
        setTimeout(() => setTerminalMode("tictactoe"), 300);
        return [{ text: "Launching Tic Tac Toe...", type: "system" }];
      }
      if (target === "wordle") {
        setTimeout(() => setTerminalMode("wordle"), 300);
        return [{ text: "Launching Wordle (Termle)...", type: "system" }];
      }
      return [{ text: `Unknown game: '${arg}'. Type 'games' to see options.`, type: "error" }];
    },
    game: () => commandHandlers.snake()
  }), [navigate, setTheme, theme, setTerminalLines, setTerminalMode]);

  // Terminal Command Execution
  const executeCommand = (cmdString) => {
    const trimmedCmd = cmdString.trim();
    if (!trimmedCmd) return;

    // Add to history
    setCommandHistory(prev => {
      const next = [...prev, trimmedCmd];
      try {
        sessionStorage.setItem("terminal_history", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
    setHistoryIndex(-1);

    // Output command line
    setTerminalLines(prev => [...prev, { text: `visitor@jay-portfolio:~$ ${trimmedCmd}`, type: "input" }]);

    const parts = trimmedCmd.toLowerCase().split(" ");
    const cmd = parts[0];
    const arg = parts[1];

    if (cmd === "clear" || cmd === "cls") {
      setTerminalLines([]);
      setTerminalInput("");
      return;
    }

    let output = [];
    const isEpoxy = cmd === "epoxy" || trimmedCmd.toLowerCase() === "sudo epoxy";
    const handler = isEpoxy ? commandHandlers.epoxy : commandHandlers[cmd];

    if (handler) {
      output = handler(arg);
    } else {
      // Check if command is simply a page name (e.g. typing "projects" to go to projects)
      const fileMatch = files.find(f => f.name.toLowerCase().startsWith(cmd));
      if (fileMatch) {
        navigate(fileMatch.path);
        output = [{ text: `Shortcut recognized. Navigating to ${fileMatch.name}...`, type: "system" }];
      } else {
        output = [{ text: `shell: Command not found: '${cmd}'. Type 'help' for options.`, type: "error" }];
      }
    }

    if (output) {
      setTerminalLines(prev => [...prev, ...output, { text: "", type: "system" }]);
    }
    setTerminalInput("");
  };

  // Keyboard navigation history keys
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(terminalInput);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setTerminalInput(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setTerminalInput("");
        } else {
          setHistoryIndex(nextIndex);
          setTerminalInput(commandHistory[nextIndex]);
        }
      }
    }
  };

  return (
    <div 
      className={`ide-container`} 
      data-theme={theme}
      style={{
        background: 'var(--bg-gradient)',
        backgroundColor: 'var(--bg-fallback)',
      }}
    >
      {/* ── Desktop UI Cursor ────────────────────────────────────────────────── */}
      <CustomCursor />

      {/* ── Interactive Constellation Background ──────────────────────────────── */}
      <InteractiveConstellation />

      {/* ── Mobile top nav bar ───────────────────────────────────────────────── */}
      <div className="mobile-nav-bar relative z-20">
        <div
          className="mobile-menu-toggle"
          onClick={() => setMobileExplorerOpen(!mobileExplorerOpen)}
        >
          <Menu size={20} />
        </div>
        <div className="mobile-active-tab font-mono flex items-center gap-1.5">
          {activeFile.icon}
          {activeFile.name}
        </div>
        <div onClick={() => setPanelOpen(!panelOpen)} className="text-accent">
          <Terminal size={18} />
        </div>
      </div>

      {/* ── IDE Workspace ────────────────────────────────────────────────────── */}
      <div className="ide-workspace relative z-20">
        {/* 1. Activity Bar */}
        <div className="activity-bar">
          <div className="activity-icons-top">
            <div
              className={`activity-icon-btn ${explorerOpen ? "active" : ""}`}
              onClick={() => {
                setExplorerOpen(!explorerOpen);
                setMobileExplorerOpen(false);
              }}
              title="File Explorer"
            >
              <Files size={22} />
            </div>
            <div className="activity-icon-btn" title="Git/Source Control" onClick={() => {
              setPanelOpen(true);
              executeCommand("git status");
            }}>
              <GitBranch size={22} />
              <span className="activity-badge">1</span>
            </div>
          </div>
          <div
            className="activity-icon-btn"
            title="Theme Selection"
            onClick={() => {
              setPanelOpen(true);
              setTerminalLines(prev => [
                ...prev,
                { text: "Change Theme using 'theme <name>'. Options:", type: "system" },
                { text: "  theme glass       - Default transparent glassmorphism", type: "system" },
                { text: "  theme dracula     - Dracula vampire palette", type: "system" },
                { text: "  theme one-dark    - VS Code classic One Dark Pro", type: "system" },
                { text: "  theme nord        - Sleek arctic theme", type: "system" },
                { text: "  theme synthwave   - Cyberpunk glow theme", type: "system" },
                { text: "  theme grass       - Emerald forest nature theme", type: "system" },
                { text: "  theme atomic      - Futuristic tech neon theme", type: "system" },
                { text: "  theme light       - Clean, high-contrast light theme", type: "system" },
                { text: "", type: "system" }
              ]);
            }}
          >
            <Coffee size={22} />
          </div>
        </div>

        {/* 2. Sidebar Explorer */}
        <div
          className={`sidebar-explorer ${
            (isDesktop ? explorerOpen : mobileExplorerOpen) ? "" : "collapsed"
          }`}
        >
          <div className="sidebar-title select-none">
            <span>Explorer: Workspace</span>
            <span
              className="cursor-pointer hover:text-white lg:hidden"
              onClick={() => setMobileExplorerOpen(false)}
            >
              <X size={14} />
            </span>
          </div>

          <div className="explorer-tree">
            {/* Tree Workspace root */}
            <div className="tree-folder-header select-none">
              <ChevronDown size={14} />
              <span className="font-bold">Portfolio</span>
            </div>

            {/* Tree Folder: src */}
            <div className="ml-3">
              <div className="tree-folder-header select-none">
                <ChevronDown size={12} />
                <span>src</span>
              </div>

              {/* Tree Folder: pages */}
              <div className="ml-3">
                <div className="tree-folder-header select-none">
                  <ChevronDown size={10} />
                  <span>pages</span>
                </div>

                {/* Main Pages files */}
                <div className="ml-2 flex flex-col">
                  {files.slice(0, 4).map(renderTreeItem)}
                </div>
              </div>
            </div>

            {/* Extra/Root files */}
            <div className="ml-3 mt-1 flex flex-col">
              {files.slice(4).map(renderTreeItem)}
            </div>
          </div>

          {/* Collapsible Outline Panel - displayed only on project detail pages */}
          {project && (
            <div className="sidebar-outline-section border-t border-[var(--border-color,#161722)] flex flex-col shrink-0">
              <div 
                className="sidebar-outline-header flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-white/5 select-none"
                onClick={() => setOutlineOpen(!outlineOpen)}
              >
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted,#8f90a6)] font-bold">
                  {outlineOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span>Outline: {project.title}</span>
                </div>
              </div>

              {outlineOpen && (
                <div className="sidebar-outline-items py-2 px-2 max-h-[35vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {project.sections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    return (
                      <div
                        key={section.id}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(section.id);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        className={`sidebar-outline-item flex items-center gap-2.5 py-1.5 px-3 rounded text-xs font-mono cursor-pointer transition-all duration-200 ${
                          isActive
                            ? "bg-accent/10 text-accent font-semibold"
                            : "text-[var(--text-muted,#8f90a6)] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="text-[10px] text-gray-500 font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="truncate">{section.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. Main Editor Area */}
        <div className="editor-area">
          {/* Tab bar */}
          <div className="editor-tabs">
            <div className="editor-tabs-scroll">
              {openTabs.map(tab => (
                <div
                  key={tab.name}
                  onClick={() => navigate(tab.path)}
                  className={`editor-tab font-mono ${
                    activeFile.name === tab.name ? "active" : ""
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                  {openTabs.length > 1 && (
                    <span
                      className="tab-close-btn ml-1"
                      onClick={(e) => closeTab(e, tab)}
                    >
                      <X size={10} />
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Editor Actions Toolbar */}
            <div className="editor-actions">
              <button
                className={`editor-action-btn ${chatOpen ? "active" : ""}`}
                onClick={() => setChatOpen(!chatOpen)}
                title="Toggle Assistant Chat"
              >
                <PanelRight size={15} />
              </button>
            </div>
          </div>

          {/* Active File Viewport */}
          <div ref={viewportRef} className="editor-viewport relative z-10" id="ide-viewport">
            {children}
          </div>

          {/* Collapsible Panel (Terminal) */}
          <IdeTerminal
            panelOpen={panelOpen}
            setPanelOpen={setPanelOpen}
            panelState={panelState}
            setPanelState={setPanelState}
            terminalLines={terminalLines}
            terminalInput={terminalInput}
            setTerminalInput={setTerminalInput}
            terminalInputRef={terminalInputRef}
            terminalEndRef={terminalEndRef}
            focusTerminal={focusTerminal}
            handleKeyDown={handleKeyDown}
            terminalMode={terminalMode}
            setTerminalMode={setTerminalMode}
            theme={theme}
          />
        </div>
        <AiChatSidebar isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>

      {/* ── Status Bar ──────────────────────────────────────────────────────── */}
      <IdeStatusBar
        setPanelOpen={setPanelOpen}
        executeCommand={executeCommand}
        setTerminalLines={setTerminalLines}
        theme={theme}
      />
    </div>
  );
}

function IdeTerminal({
  panelOpen,
  setPanelOpen,
  panelState,
  setPanelState,
  terminalLines,
  terminalInput,
  setTerminalInput,
  terminalInputRef,
  terminalEndRef,
  focusTerminal,
  handleKeyDown,
  terminalMode,
  setTerminalMode,
  theme,
}) {
  return (
    <div
      className={`bottom-panel ${panelOpen ? "" : "collapsed"} ${
        panelState === "maximized" ? "expanded" : ""
      }`}
    >
      {/* Panel Header */}
      <div 
        className="panel-header" 
        onClick={focusTerminal}
      >
        <div className="panel-tabs">
          <div className="panel-tab select-none">
            PROBLEMS <span className="panel-badge">0</span>
          </div>
          <div className="panel-tab active select-none">TERMINAL</div>
          <div className="panel-tab select-none">OUTPUT</div>
          <div className="panel-tab select-none">DEBUG CONSOLE</div>
        </div>

        {/* Controls */}
        <div className="panel-controls">
          {panelState === "normal" ? (
            <div
              className="panel-control-btn"
              onClick={() => setPanelState("maximized")}
              title="Maximize Panel"
            >
              <Maximize2 size={13} />
            </div>
          ) : (
            <div
              className="panel-control-btn"
              onClick={() => setPanelState("normal")}
              title="Restore Panel Size"
            >
              <Minimize2 size={13} />
            </div>
          )}
          <div
            className="panel-control-btn"
            onClick={() => setPanelOpen(false)}
            title="Close Panel"
          >
            <X size={14} />
          </div>
        </div>
      </div>

      {/* Panel Body (Interactive shell) */}
      <div className="panel-body" onClick={focusTerminal}>
        {terminalMode === "matrix" && (
          <TerminalMatrixRain onClose={() => setTerminalMode("normal")} />
        )}
        {terminalMode === "snake" && (
          <TerminalSnake onClose={() => setTerminalMode("normal")} />
        )}
        {terminalMode === "minesweeper" && (
          <TerminalMinesweeper onClose={() => setTerminalMode("normal")} />
        )}
        {terminalMode === "tictactoe" && (
          <TerminalTicTacToe onClose={() => setTerminalMode("normal")} />
        )}
        {terminalMode === "wordle" && (
          <TerminalWordle onClose={() => setTerminalMode("normal")} />
        )}

        {terminalMode === "normal" && (
          <div className="ide-terminal-content">
            <div className="terminal-history">
              {terminalLines.map((line, idx) => {
                let className = "text-white/80";
                if (line.type === "input") className = "text-amber-300 font-bold";
                if (line.type === "error") className = "text-red-400 font-semibold";
                if (line.type === "system") className = "text-accent-hover";
                if (line.type === "bold") className = "text-white font-bold text-[14px]";
                if (line.type === "muted") className = "text-[color:var(--text-muted)]";
                return (
                  <div key={idx} className={`terminal-line ${className}`}>
                    {line.text}
                  </div>
                );
              })}
            </div>

            <div className="terminal-input-row">
              <span className="terminal-prompt select-none">
                visitor@jay-portfolio:~$
              </span>
              <input
                ref={terminalInputRef}
                type="text"
                className="terminal-text-input"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
            <div ref={terminalEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}

function IdeStatusBar({ setPanelOpen, executeCommand, setTerminalLines, theme }) {
  return (
    <div className="status-bar relative z-20">
      <div className="status-section">
        <div 
          className="status-item-clickable flex items-center gap-1"
          onClick={() => {
            setPanelOpen(true);
            executeCommand("git status");
          }}
        >
          <GitBranch size={12} />
          <span>main</span>
        </div>
        <div
          className="status-item text-red-400 hover:text-red-300"
          onClick={() => {
            setPanelOpen(true);
            setTerminalLines(prev => [
              ...prev,
              { text: "Workspace Check: 0 Errors. All pipelines operational.", type: "system" },
              { text: "", type: "system" }
            ]);
          }}
        >
          <AlertCircle size={12} />
          <span>0</span>
        </div>
        <div className="status-item text-amber-400">
          <HelpCircle size={12} />
          <span>0</span>
        </div>
      </div>

      <div className="status-section font-mono">
        <div className="status-item hidden sm:flex">
          <span>Ln 1, Col 1</span>
        </div>
        <div className="status-item hidden md:flex">
          <span>Spaces: 2</span>
        </div>
        <div className="status-item">
          <span>UTF-8</span>
        </div>
        <div className="status-item">
          <span>LF</span>
        </div>
        <div className="status-item status-item-clickable" onClick={() => setPanelOpen(true)}>
          <span>React JSX</span>
        </div>
      </div>
    </div>
  );
}

function TerminalMatrixRain({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*+-/<>[]{}";
    const charArr = chars.split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops = Array(columns).fill(1);

    let animationFrameId;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleKeyDown = () => {
      onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("click", handleKeyDown);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onClose]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden cursor-pointer" style={{ minHeight: "150px" }}>
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="absolute top-3 right-5 text-xs font-mono text-[#00ff66] opacity-60 pointer-events-none select-none">
        Press any key to exit
      </div>
    </div>
  );
}

function TerminalSnake({ onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem("terminal_snake_highscore") || 0);
    } catch (e) {
      return 0;
    }
  });

  const gameState = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 5, y: 5 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    gridSize: 15,
    speed: 90,
  });

  const resetGame = () => {
    gameState.current.snake = [{ x: 10, y: 10 }];
    gameState.current.direction = { x: 1, y: 0 };
    gameState.current.nextDirection = { x: 1, y: 0 };
    generateFood();
    setScore(0);
    setGameOver(false);
  };

  const generateFood = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gridWidth = Math.floor(canvas.width / gameState.current.gridSize);
    const gridHeight = Math.floor(canvas.height / gameState.current.gridSize);
    
    let foodX, foodY;
    let onSnake = true;
    while (onSnake) {
      foodX = Math.floor(Math.random() * (gridWidth - 2)) + 1;
      foodY = Math.floor(Math.random() * (gridHeight - 2)) + 1;
      onSnake = gameState.current.snake.some(segment => segment.x === foodX && segment.y === foodY);
    }
    gameState.current.food = { x: foodX, y: foodY };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const resize = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight || 200;
      canvas.width = Math.floor(width / gameState.current.gridSize) * gameState.current.gridSize;
      canvas.height = Math.floor(height / gameState.current.gridSize) * gameState.current.gridSize;
      generateFood();
    };
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    let gameInterval;

    const gameLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      gameState.current.direction = gameState.current.nextDirection;
      const dir = gameState.current.direction;

      const snake = gameState.current.snake;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      const gridWidth = Math.floor(canvas.width / gameState.current.gridSize);
      const gridHeight = Math.floor(canvas.height / gameState.current.gridSize);

      const wallCollision = head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight;
      const selfCollision = snake.some(segment => segment.x === head.x && segment.y === head.y);

      if (wallCollision || selfCollision) {
        setGameOver(true);
        return;
      }

      snake.unshift(head);

      if (head.x === gameState.current.food.x && head.y === gameState.current.food.y) {
        setScore(prev => {
          const next = prev + 10;
          if (next > highScore) {
            setHighScore(next);
            try {
              localStorage.setItem("terminal_snake_highscore", String(next));
            } catch (e) {}
          }
          return next;
        });
        generateFood();
      } else {
        snake.pop();
      }

      ctx.fillStyle = "#16161a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#24242e";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += gameState.current.gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gameState.current.gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      snake.forEach((segment, idx) => {
        ctx.fillStyle = idx === 0 ? "var(--accent-color)" : "#10b981";
        ctx.fillRect(
          segment.x * gameState.current.gridSize + 1,
          segment.y * gameState.current.gridSize + 1,
          gameState.current.gridSize - 2,
          gameState.current.gridSize - 2
        );
      });

      ctx.fillStyle = "#ef4444";
      ctx.fillRect(
        gameState.current.food.x * gameState.current.gridSize + 2,
        gameState.current.food.y * gameState.current.gridSize + 2,
        gameState.current.gridSize - 4,
        gameState.current.gridSize - 4
      );
    };

    gameInterval = setInterval(gameLoop, gameState.current.speed);
    return () => clearInterval(gameInterval);
  }, [gameOver, highScore]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const dir = gameState.current.direction;
      if (e.key === "ArrowUp" && dir.y !== 1) {
        e.preventDefault();
        gameState.current.nextDirection = { x: 0, y: -1 };
      } else if (e.key === "ArrowDown" && dir.y !== -1) {
        e.preventDefault();
        gameState.current.nextDirection = { x: 0, y: 1 };
      } else if (e.key === "ArrowLeft" && dir.x !== 1) {
        e.preventDefault();
        gameState.current.nextDirection = { x: -1, y: 0 };
      } else if (e.key === "ArrowRight" && dir.x !== -1) {
        e.preventDefault();
        gameState.current.nextDirection = { x: 1, y: 0 };
      } else if (e.key.toLowerCase() === "r" && gameOver) {
        resetGame();
      } else if (e.key === "Escape" || e.key.toLowerCase() === "q") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#16161a] flex flex-col items-center justify-center font-mono" style={{ minHeight: "200px" }}>
      <div className="absolute top-2 left-4 flex gap-6 text-xs text-white/80 pointer-events-none select-none z-10">
        <div>SCORE: <span className="text-[var(--accent-color)] font-bold">{score}</span></div>
        <div>HIGH SCORE: <span className="text-green-400 font-bold">{highScore}</span></div>
      </div>
      
      <div className="absolute top-2 right-4 text-xs text-white/60 pointer-events-none select-none z-10">
        ESC / Q to exit
      </div>

      <canvas ref={canvasRef} className="border border-white/10" />

      {gameOver && (
        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-4 z-20">
          <div className="text-red-500 font-black text-2xl tracking-widest mb-2">GAME OVER</div>
          <div className="text-white text-sm mb-4">You scored {score} points!</div>
          <div className="text-green-400 text-xs animate-pulse">Press 'R' to restart or 'Q' to quit</div>
        </div>
      )}
    </div>
  );
}

function TerminalMinesweeper({ onClose }) {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [minesRemaining, setMinesRemaining] = useState(10);
  
  const rows = 9;
  const cols = 9;
  const totalMines = 10;

  const initBoard = () => {
    let newGrid = Array(rows).fill(null).map(() => Array(cols).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0
    })));

    let minesPlaced = 0;
    while (minesPlaced < totalMines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        minesPlaced++;
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newGrid[r][c].isMine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              if (newGrid[nr][nc].isMine) count++;
            }
          }
        }
        newGrid[r][c].neighborMines = count;
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false);
    setMinesRemaining(totalMines);
  };

  useEffect(() => {
    initBoard();
  }, []);

  const revealCell = (r, c) => {
    if (gameOver || gameWon || grid[r][c].isRevealed || grid[r][c].isFlagged) return;

    let newGrid = [...grid.map(row => [...row])];
    
    if (newGrid[r][c].isMine) {
      newGrid.forEach(row => {
        row.forEach(cell => {
          if (cell.isMine) cell.isRevealed = true;
        });
      });
      setGrid(newGrid);
      setGameOver(true);
      return;
    }

    const revealNeighbors = (gridCopy, startR, startC) => {
      const queue = [[startR, startC]];
      gridCopy[startR][startC].isRevealed = true;

      while (queue.length > 0) {
        const [currR, currC] = queue.shift();
        
        if (gridCopy[currR][currC].neighborMines === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = currR + dr;
              const nc = currC + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                const cell = gridCopy[nr][nc];
                if (!cell.isRevealed && !cell.isMine && !cell.isFlagged) {
                  cell.isRevealed = true;
                  queue.push([nr, nc]);
                }
              }
            }
          }
        }
      }
    };

    revealNeighbors(newGrid, r, c);

    let unrevealedSafeCells = 0;
    newGrid.forEach(row => {
      row.forEach(cell => {
        if (!cell.isMine && !cell.isRevealed) unrevealedSafeCells++;
      });
    });

    setGrid(newGrid);
    if (unrevealedSafeCells === 0) {
      setGameWon(true);
    }
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (gameOver || gameWon || grid[r][c].isRevealed) return;

    let newGrid = [...grid.map(row => [...row])];
    const isFlagged = !newGrid[r][c].isFlagged;
    newGrid[r][c].isFlagged = isFlagged;
    
    setGrid(newGrid);
    setMinesRemaining(prev => prev + (isFlagged ? -1 : 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key.toLowerCase() === "q") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#16161a] flex flex-col items-center justify-center font-mono select-none" style={{ minHeight: "220px" }}>
      <div className="absolute top-2 left-4 flex gap-6 text-xs text-white/80 pointer-events-none">
        <div>MINES REMAINING: <span className="text-red-400 font-bold">{minesRemaining}</span></div>
      </div>
      
      <div className="absolute top-2 right-4 text-xs text-white/60 pointer-events-none">
        Shift+Click to flag | ESC / Q to exit
      </div>

      <div className="grid grid-cols-9 gap-1 p-3 bg-[#1e1e24] rounded-lg border border-white/10 mt-6">
        {grid.map((row, rIdx) => 
          row.map((cell, cIdx) => {
            let label = "";
            let cellColorClass = "bg-[#2d2d37] hover:bg-[#3e3e4f] text-transparent";
            
            if (cell.isRevealed) {
              if (cell.isMine) {
                label = "💣";
                cellColorClass = "bg-red-500/30 text-white";
              } else {
                label = cell.neighborMines > 0 ? String(cell.neighborMines) : "";
                cellColorClass = "bg-[#16161a] text-accent font-black";
                if (cell.neighborMines === 1) cellColorClass += " text-blue-400";
                if (cell.neighborMines === 2) cellColorClass += " text-green-400";
                if (cell.neighborMines >= 3) cellColorClass += " text-red-400";
              }
            } else if (cell.isFlagged) {
              label = "🚩";
              cellColorClass = "bg-[#2d2d37] text-red-500 font-bold";
            }

            return (
              <div
                key={`${rIdx}-${cIdx}`}
                onClick={(e) => {
                  if (e.shiftKey) {
                    toggleFlag(e, rIdx, cIdx);
                  } else {
                    revealCell(rIdx, cIdx);
                  }
                }}
                onContextMenu={(e) => toggleFlag(e, rIdx, cIdx)}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center text-xs cursor-pointer border border-[#3e3e4f]/30 transition-colors ${cellColorClass}`}
              >
                {label}
              </div>
            );
          })
        )}
      </div>

      {(gameOver || gameWon) && (
        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-4 z-20">
          <div className={`font-black text-2xl tracking-widest mb-2 ${gameOver ? "text-red-500" : "text-green-400"}`}>
            {gameOver ? "MISSION FAILED" : "VICTORY"}
          </div>
          <div className="text-white text-xs mb-4">
            {gameOver ? "You stepped on a mine." : "All safe areas cleared successfully!"}
          </div>
          <button 
            onClick={initBoard}
            className="px-4 py-1.5 bg-[var(--accent-color)] hover:opacity-85 text-white font-bold text-xs rounded transition-opacity"
          >
            Play Again
          </button>
          <div className="text-white/40 text-[10px] mt-2">Press 'Q' to quit</div>
        </div>
      )}
    </div>
  );
}

function TerminalTicTacToe({ onClose }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null); // 'X', 'O', 'Draw', or null
  const [isAiThinking, setIsAiThinking] = useState(false);

  const initGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsAiThinking(false);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(sq => sq !== null)) {
      return "Draw";
    }
    return null;
  };

  const handleCellClick = (index) => {
    if (board[index] || winner || isAiThinking) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      return;
    }

    setIsXNext(false);
    setIsAiThinking(true);
  };

  useEffect(() => {
    if (isXNext || winner) return;

    const timer = setTimeout(() => {
      const emptySquares = board
        .map((val, idx) => (val === null ? idx : null))
        .filter(val => val !== null);

      if (emptySquares.length === 0) return;

      let aiMove = null;
      for (let i = 0; i < emptySquares.length; i++) {
        const testBoard = [...board];
        testBoard[emptySquares[i]] = "O";
        if (calculateWinner(testBoard) === "O") {
          aiMove = emptySquares[i];
          break;
        }
      }

      if (aiMove === null) {
        for (let i = 0; i < emptySquares.length; i++) {
          const testBoard = [...board];
          testBoard[emptySquares[i]] = "X";
          if (calculateWinner(testBoard) === "X") {
            aiMove = emptySquares[i];
            break;
          }
        }
      }

      if (aiMove === null) {
        if (board[4] === null) {
          aiMove = 4;
        } else {
          aiMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }
      }

      const newBoard = [...board];
      newBoard[aiMove] = "O";
      setBoard(newBoard);

      const win = calculateWinner(newBoard);
      if (win) {
        setWinner(win);
      } else {
        setIsXNext(true);
      }
      setIsAiThinking(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [isXNext, board, winner]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key.toLowerCase() === "q") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#16161a] flex flex-col items-center justify-center font-mono select-none" style={{ minHeight: "220px" }}>
      <div className="absolute top-2 left-4 text-xs text-white/80">
        TIC TAC TOE: <span className="text-[var(--accent-color)] font-bold">X (You)</span> vs <span className="text-green-400 font-bold">O (AI)</span>
      </div>
      <div className="absolute top-2 right-4 text-xs text-white/60">
        ESC / Q to exit
      </div>

      <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#1e1e24] rounded-lg mt-6 border border-white/10 w-[140px] sm:w-[160px]">
        {board.map((cell, idx) => {
          let color = "text-transparent";
          if (cell === "X") color = "text-[var(--accent-color)]";
          if (cell === "O") color = "text-green-400";
          return (
            <div
              key={idx}
              onClick={() => handleCellClick(idx)}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2d2d37] hover:bg-[#3e3e4f] rounded flex items-center justify-center text-lg sm:text-xl font-bold cursor-pointer transition-colors"
            >
              <span className={color}>{cell || ""}</span>
            </div>
          );
        })}
      </div>

      <div className="text-[10px] text-white/50 mt-3 h-3">
        {isAiThinking ? "AI is plotting its move..." : "Your turn!"}
      </div>

      {winner && (
        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-4 z-20">
          <div className="font-black text-2xl tracking-widest mb-2">
            {winner === "X" && <span className="text-[var(--accent-color)]">VICTORY!</span>}
            {winner === "O" && <span className="text-red-500">DEFEAT</span>}
            {winner === "Draw" && <span className="text-yellow-400">DRAW</span>}
          </div>
          <div className="text-white text-xs mb-4">
            {winner === "X" && "You defeated the system's grid algorithm!"}
            {winner === "O" && "The AI outsmarted your moves."}
            {winner === "Draw" && "A perfect balance of grids."}
          </div>
          <button 
            onClick={initGame}
            className="px-4 py-1.5 bg-[var(--accent-color)] hover:opacity-85 text-white font-bold text-xs rounded transition-opacity"
          >
            Play Again
          </button>
          <div className="text-white/40 text-[10px] mt-2">Press 'Q' to quit</div>
        </div>
      )}
    </div>
  );
}

function TerminalWordle({ onClose }) {
  const wordList = [
    "coder", "react", "debug", "stack", "logic", "bytes", "array", "build",
    "nodes", "input", "query", "cache", "cloud", "pixel", "mouse", "cyber",
    "robot", "graph", "queue", "loops", "index", "class", "print", "write",
    "token", "scope", "const", "shell", "linux", "parse", "patch", "merge",
    "clone", "fetch", "route", "state", "props", "hooks", "event", "click",
    "hover", "focus", "align", "style", "color", "theme", "panel", "timer",
    "clock", "watch", "stats", "table", "chart", "model", "train", "epoch",
    "layer", "dense", "learn", "admin", "login", "oauth", "email", "field",
    "value", "valid", "error", "fixed", "speed", "trace", "heaps", "local",
    "globe", "share", "repos", "ports", "proxy", "nginx", "redis", "mongo",
    "mysql", "maria", "flask", "swift", "scala", "basic"
  ];
  const [secretWord, setSecretWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentGuessIdx, setCurrentGuessIdx] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [message, setMessage] = useState("");

  const initGame = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setSecretWord(randomWord);
    setGuesses(Array(6).fill(""));
    setCurrentGuessIdx(0);
    setGameOver(false);
    setGameWon(false);
    setMessage("");
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only allow 'q' to quit if gameOver is true, so players can type 'q' in words like 'queue' or 'query'
      if (e.key === "Escape" || (gameOver && e.key.toLowerCase() === "q")) {
        onClose();
        return;
      }

      if (gameOver) {
        if (e.key.toLowerCase() === "r") {
          initGame();
        }
        return;
      }

      const key = e.key;

      if (/^[a-zA-Z]$/.test(key)) {
        setGuesses(prev => {
          const newGuesses = [...prev];
          const curr = newGuesses[currentGuessIdx];
          if (curr.length < 5) {
            newGuesses[currentGuessIdx] = curr + key.toLowerCase();
          }
          return newGuesses;
        });
      }

      if (key === "Backspace") {
        setGuesses(prev => {
          const newGuesses = [...prev];
          newGuesses[currentGuessIdx] = newGuesses[currentGuessIdx].slice(0, -1);
          return newGuesses;
        });
      }

      if (key === "Enter") {
        const guess = guesses[currentGuessIdx];
        if (guess.length < 5) {
          setMessage("Word must be 5 letters!");
          setTimeout(() => setMessage(""), 1500);
          return;
        }

        if (guess === secretWord) {
          setGameWon(true);
          setGameOver(true);
          return;
        }

        if (currentGuessIdx >= 5) {
          setGameOver(true);
          return;
        }

        setCurrentGuessIdx(prev => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guesses, currentGuessIdx, gameOver, secretWord]);

  const getCellStyles = (wordIdx, charIdx) => {
    const word = guesses[wordIdx];
    const char = word[charIdx];

    if (wordIdx < currentGuessIdx || (gameOver && wordIdx === currentGuessIdx)) {
      if (secretWord[charIdx] === char) {
        return "bg-green-600 text-white border-transparent";
      }
      if (secretWord.includes(char)) {
        return "bg-yellow-600 text-white border-transparent";
      }
      return "bg-[#2d2d37] text-white/40 border-transparent";
    }

    return "bg-transparent text-white border-[#3e3e4f]/50";
  };

  return (
    <div className="relative w-full h-full bg-[#16161a] flex flex-col items-center justify-center font-mono select-none" style={{ minHeight: "240px" }}>
      <div className="absolute top-2 left-4 text-xs text-white/80">
        TERMLE: <span className="text-[var(--accent-color)] font-bold">5-Letter Word Guess</span>
      </div>
      <div className="absolute top-2 right-4 text-xs text-white/60">
        {gameOver ? "ESC / Q to exit" : "ESC to exit"}
      </div>

      <div className="flex flex-col gap-1 mt-4">
        {guesses.map((word, wordIdx) => (
          <div key={wordIdx} className="flex gap-1">
            {Array(5).fill(null).map((_, charIdx) => {
              const char = word ? word[charIdx] : "";
              const style = getCellStyles(wordIdx, charIdx);
              return (
                <div
                  key={charIdx}
                  className={`w-6 h-6 sm:w-7 sm:h-7 border rounded flex items-center justify-center font-bold text-xs uppercase transition-colors ${style}`}
                >
                  {char || ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="text-[10px] text-red-400 mt-2 h-3 font-semibold">
        {message}
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-4 z-20">
          <div className={`font-black text-2xl tracking-widest mb-2 ${gameWon ? "text-green-400" : "text-red-500"}`}>
            {gameWon ? "ACCURATE MATCH" : "DECRYPTION FAILED"}
          </div>
          <div className="text-white text-xs mb-4">
            {gameWon ? `You cracked the code in ${currentGuessIdx + 1} attempts!` : `The target word was: ${secretWord.toUpperCase()}`}
          </div>
          <button 
            onClick={initGame}
            className="px-4 py-1.5 bg-[var(--accent-color)] hover:opacity-85 text-white font-bold text-xs rounded transition-opacity"
          >
            Play Again
          </button>
          <div className="text-white/40 text-[10px] mt-2">Press 'Q' to quit</div>
        </div>
      )}
    </div>
  );
}
