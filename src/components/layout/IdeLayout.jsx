import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  FileText,
  Coffee,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import CustomCursor from "../cursor/CustomCursor";
import GlassOverlay from "../background/GlassOverlay";
import { ThemeContext } from "../../app";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./IdeLayout.css";

gsap.registerPlugin(ScrollTrigger);

export default function IdeLayout({ children, isDesktop }) {
  const navigate = useNavigate();
  const location = useLocation();
  const viewportRef = useRef(null);

  // ── Theme Context ──────────────────────────────────────────────────────────
  const { theme, setTheme } = useContext(ThemeContext);

  // ── Layout Toggles ─────────────────────────────────────────────────────────
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelState, setPanelState] = useState("normal"); // "normal", "maximized"
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);

  // ── Terminal Shell Logic ───────────────────────────────────────────────────
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState([
    { text: "Initializing portfolio dev environment...", type: "system" },
    { text: "[Vite] hot module replacement enabled", type: "muted" },
    { text: "Welcome to Jay Joshi's Portfolio Terminal v1.0.6", type: "system" },
    { text: "Type 'help' to see list of available commands.", type: "system" },
    { text: "", type: "system" }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalEndRef = useRef(null);
  const terminalInputRef = useRef(null);

  // ── Map Location to Workspace Files ────────────────────────────────────────
  // We represent routes as workspace files
  const files = useMemo(() => [
    { name: "Home.jsx", path: "/", icon: <Home size={14} className="text-accent" /> },
    { name: "Projects.jsx", path: "/projects", icon: <Folder size={14} className="text-amber-400" /> },
    { name: "Skills.jsx", path: "/skills", icon: <Settings size={14} className="text-sky-400" /> },
    { name: "Contact.jsx", path: "/contact", icon: <Mail size={14} className="text-emerald-400" /> },
    { name: "README.md", path: "/readme", icon: <FileText size={14} className="text-gray-400" /> }
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
  const executeCommand = (cmdString) => {
    const trimmedCmd = cmdString.trim();
    if (!trimmedCmd) return;

    // Add to history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Output command line
    setTerminalLines(prev => [...prev, { text: `visitor@jay-portfolio:~$ ${trimmedCmd}`, type: "input" }]);

    const parts = trimmedCmd.toLowerCase().split(" ");
    const cmd = parts[0];
    const arg = parts[1];

    let output = [];

    switch (cmd) {
      case "help":
        output = [
          { text: "Available commands:", type: "system" },
          { text: "  ls            - List files/pages in directory", type: "system" },
          { text: "  cd <page>     - Navigate to page (home, projects, skills, contact)", type: "system" },
          { text: "  cat <file>    - Print file contents (README.md)", type: "system" },
          { text: "  theme <name>  - Change theme (glass, dracula, one-dark, nord, synthwave)", type: "system" },
          { text: "  neofetch      - Display system info & stats", type: "system" },
          { text: "  clear         - Clear the screen", type: "system" }
        ];
        break;

      case "ls":
      case "dir":
        output = [
          { text: "Directory: src/pages/", type: "system" },
          { text: "  Home.jsx        Projects.jsx    Skills.jsx    Contact.jsx", type: "system" },
          { text: "  README.md", type: "system" }
        ];
        break;

      case "cd":
        if (!arg) {
          output = [{ text: "Usage: cd <page> (e.g. cd projects)", type: "error" }];
        } else if (arg === "home" || arg === "home.jsx" || arg === "/" || arg === "..") {
          navigate("/");
          output = [{ text: "Navigating to Home...", type: "system" }];
        } else if (arg === "projects" || arg === "projects.jsx") {
          navigate("/projects");
          output = [{ text: "Navigating to Projects...", type: "system" }];
        } else if (arg === "skills" || arg === "skills.jsx") {
          navigate("/skills");
          output = [{ text: "Navigating to Skills...", type: "system" }];
        } else if (arg === "contact" || arg === "contact.jsx") {
          navigate("/contact");
          output = [{ text: "Navigating to Contact...", type: "system" }];
        } else if (arg === "readme" || arg === "readme.md") {
          navigate("/readme");
          output = [{ text: "Navigating to README...", type: "system" }];
        } else {
          output = [{ text: `Directory not found: '${arg}'`, type: "error" }];
        }
        break;

      case "cat":
        if (!arg) {
          output = [{ text: "Usage: cat <file> (e.g. cat README.md)", type: "error" }];
        } else if (arg === "readme.md" || arg === "readme") {
          navigate("/readme");
          output = [
            { text: "Reading README.md...", type: "system" },
            { text: "# Jay Joshi - Portfolio", type: "bold" },
            { text: "CS Student | AI/ML & Frontend Engineer based in Noida, India.", type: "system" },
            { text: "Building real-time computer vision systems, optimized DNN pipelines,", type: "system" },
            { text: "and premium, dynamic user experiences with React, Tailwind, and GSAP.", type: "system" }
          ];
        } else {
          output = [{ text: `cat: File not found: '${arg}'`, type: "error" }];
        }
        break;

      case "theme":
        if (!arg) {
          output = [{ text: "Usage: theme <glass|dracula|one-dark|nord|synthwave>", type: "error" }];
        } else if (["glass", "dracula", "one-dark", "nord", "synthwave"].includes(arg)) {
          setTheme(arg);
          output = [{ text: `Theme successfully updated to '${arg}'!`, type: "system" }];
        } else {
          output = [{ text: `Unknown theme: '${arg}'. Available themes: glass, dracula, one-dark, nord, synthwave`, type: "error" }];
        }
        break;

      case "clear":
      case "cls":
        setTerminalLines([]);
        setTerminalInput("");
        return;

      case "epoxy":
      case "sudo epoxy":
        output = [{ text: "Bypassing protocols... Running Epoxy Auth Sequence", type: "system" }];
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('epoxyAccessToken', token);
        setTimeout(() => { navigate(`/${token}`); }, 500);
        break;

      case "git":
        if (arg === "status") {
          output = [
            { text: "On branch main", type: "system" },
            { text: "Your branch is up to date with 'origin/main'.", type: "system" },
            { text: "Changes not staged for commit:", type: "system" },
            { text: "  (use \"git add <file>...\" to update what will be committed)", type: "muted" },
            { text: "  modified:   src/app.jsx (Smart Navigation: OK)", type: "bold" },
            { text: "no changes added to commit (use \"git add\" and/or \"git commit -a\")", type: "system" }
          ];
        } else {
          output = [{ text: `git: Command option not implemented. Try 'git status'.`, type: "error" }];
        }
        break;

      case "neofetch":
        output = [
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
        break;

      default:
        // Check if command is simply a page name (e.g. typing "projects" to go to projects)
        const fileMatch = files.find(f => f.name.toLowerCase().startsWith(cmd));
        if (fileMatch) {
          navigate(fileMatch.path);
          output = [{ text: `Shortcut recognized. Navigating to ${fileMatch.name}...`, type: "system" }];
        } else {
          output = [{ text: `shell: Command not found: '${cmd}'. Type 'help' for options.`, type: "error" }];
        }
    }

    setTerminalLines(prev => [...prev, ...output, { text: "", type: "system" }]);
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
    <div className={`ide-container`} data-theme={theme}>
      {/* ── Background Layer ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="mobile-creative-bg">
          <div className="wireframe-shape shape-1" />
          <div className="wireframe-shape shape-2" />
          <div className="wireframe-shape shape-3" />
        </div>
      </div>

      {/* ── Glass Overlay Layer ──────────────────────────────────────────────── */}
      {isDesktop && (
        <GlassOverlay tint="rgba(15, 15, 20, 0.45)" blur={12} opacity={0.55} />
      )}

      {/* ── Desktop UI Cursor ────────────────────────────────────────────────── */}
      <CustomCursor />

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
            explorerOpen || (mobileExplorerOpen && !isDesktop) ? "" : "collapsed"
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
                <div className="tree-folder-header select-none text-[10px] text-white/50">
                  <ChevronDown size={10} />
                  <span>pages</span>
                </div>

                {/* Main Pages files */}
                <div className="ml-2 flex flex-col">
                  {files.slice(0, 4).map(file => (
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
                  ))}
                </div>
              </div>

              {/* Extra files */}
              <div className="ml-3 mt-1">
                {files.slice(4).map(file => (
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
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main Editor Area */}
        <div className="editor-area">
          {/* Tab bar */}
          <div className="editor-tabs">
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

          {/* Active File Viewport */}
          <div ref={viewportRef} className="editor-viewport relative z-10" id="ide-viewport">
            {children}
          </div>

          {/* Collapsible Panel (Terminal) */}
          <div
            className={`bottom-panel ${panelOpen ? "" : "collapsed"} ${
              panelState === "maximized" ? "expanded" : ""
            }`}
          >
            {/* Panel Header */}
            <div className="panel-header" onClick={focusTerminal}>
              <div className="panel-tabs">
                <div className="panel-tab select-none">
                  PROBLEMS <span className="panel-badge">0</span>
                </div>
                <div className="panel-tab active select-none">
                  TERMINAL
                </div>
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
              <div className="ide-terminal-content">
                <div className="terminal-history">
                  {terminalLines.map((line, idx) => {
                    let className = "text-white/80";
                    if (line.type === "input") className = "text-amber-300 font-bold";
                    if (line.type === "error") className = "text-red-400 font-semibold";
                    if (line.type === "system") className = "text-accent-hover";
                    if (line.type === "bold") className = "text-white font-bold text-[14px]";
                    if (line.type === "muted") className = "text-white/40";
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
            </div>
          </div>
        </div>
      </div>

      {/* ── Status Bar ──────────────────────────────────────────────────────── */}
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
    </div>
  );
}
