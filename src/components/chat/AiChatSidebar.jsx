import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, User, Trash2 } from "lucide-react";
import "./AiChatSidebar.css";

export default function AiChatSidebar({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm Jay's Portfolio Assistant. Ask me anything about his projects, skills, education, or contact details!",
      isTyping: false
    }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const parseMarkdown = (text) => {
    return text.split("\n").map((line, lineIdx) => {
      let content = line;
      
      // Parse Bold: **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-white font-bold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }
      
      const parsedLine = parts.length > 0 ? parts : content;
      
      // Parse bullet points
      if (line.startsWith("* ") || line.startsWith("- ")) {
        return (
          <li key={lineIdx} className="ml-4 list-disc mt-1 text-[var(--text-muted)]">
            {typeof parsedLine === "string" ? parsedLine.substring(2) : parsedLine}
          </li>
        );
      }
      // Parse decimal lists
      if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
        return (
          <li key={lineIdx} className="ml-4 list-decimal mt-1 text-[var(--text-muted)]">
            {typeof parsedLine === "string" ? parsedLine.substring(3) : parsedLine}
          </li>
        );
      }
      
      return (
        <p key={lineIdx} className={line.trim() === "" ? "h-2" : "mt-1 text-[var(--text-muted)]"}>
          {parsedLine}
        </p>
      );
    });
  };

  const simulateBotResponse = (userText) => {
    let reply = "";
    const lower = userText.toLowerCase().trim();
    
    if (lower.includes("project") || lower.includes("portfolio") || lower.includes("highlights") || lower.includes("build") || lower.includes("code")) {
      reply = "Jay has built several notable projects:\n\n1. **Abhisar**: A streaming LLM workspace powered by the Groq Inference Engine (React & Express).\n2. **SysAware ML Optimizer**: A hardware-aware PyTorch model quantization & benchmarking suite with a Streamlit GUI and full pytest coverage.\n3. **oss-hunter**: An autonomous open-source contribution agent built on Gemini CLI, running on a 24-hour loop with a semi-autonomous PR workflow.\n4. **Real-Time AI Surveillance**: An end-to-end computer vision pipeline utilizing YOLOv8 & DeepSORT.\n5. **OctaWipe**: A secure storage data sanitization tool compliant with DoD standards.\n\nSelect **Projects.jsx** in the sidebar to explore detailed walkthroughs!";
    } else if (lower.includes("skill") || lower.includes("stack") || lower.includes("technolog") || lower.includes("competenc") || lower.includes("language")) {
      reply = "Jay's core competencies include:\n\n* **AI/ML & Systems**: Python, PyTorch, YOLOv8, DeepSORT, OpenCV, model quantization, Streamlit.\n* **Frontend & Engineering**: React.js, JavaScript, TypeScript, Vite.js, Tailwind CSS, GSAP, Three.js.\n* **Tools & Databases**: Git, SQL, Docker, AppleScript/shell scripting, local LLM tooling (LM Studio, Ollama, MLX).\n\nSelect **Skills.jsx** in the sidebar to see his interactive skills matrix!";
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("linkedin") || lower.includes("reach") || lower.includes("github")) {
      reply = "You can reach out to Jay directly:\n\n* **Email**: jay05.joshi@gmail.com\n* **LinkedIn**: linkedin.com/in/gaminbhoot\n* **GitHub**: github.com/gaminbhoot\n\nSelect **Contact.jsx** in the sidebar to open the contact form!";
    } else if (lower.includes("resume") || lower.includes("cv") || lower.includes("download")) {
      reply = "You can download Jay's resume in PDF format directly from the Home page or download it here: [JAY_JOSHI_RESUME.pdf](/JAY%20JOSHI%20RESUME.pdf).";
    } else if (lower.includes("education") || lower.includes("college") || lower.includes("university") || lower.includes("degree") || lower.includes("study") || lower.includes("school")) {
      reply = "Jay's educational background includes:\n\n* **Amity University** (Noida): Bachelor's in Technology (B.Tech) in Computer Science (2023-2027).\n* **IIT Guwahati**: Minor in Data Science (2025-2026).\n* **Vishwa Bharati Public School** (Noida): Senior Secondary School (CBSE), class of 2023.";
    } else if (lower.includes("open") || lower.includes("hire") || lower.includes("internship") || lower.includes("job") || lower.includes("role") || lower.includes("work") || lower.includes("available") || lower.includes("start")) {
      reply = "Yes, Jay is actively open to job roles, internships, and contract work in AI/ML and software/frontend engineering! He can start working within **2 weeks** of receiving an offer and is fully open to relocation, hybrid, or remote setups.";
    } else if (lower.includes("where") || lower.includes("from") || lower.includes("location") || lower.includes("located") || lower.includes("live") || lower.includes("place")) {
      reply = "Jay is based in **Noida, India**, but he is fully open to **relocation** for matching job roles or internships.";
    } else if (lower.includes("setup") || lower.includes("pc") || lower.includes("mac") || lower.includes("system") || lower.includes("terminal") || lower.includes("ide") || lower.includes("os") || lower.includes("hardware") || lower.includes("laptop")) {
      reply = "Jay's personal development environment setup is:\n\n* **OS/Platform**: MacBook Pro (M5 Pro) under macOS, Windows (PowerShell scripting), and Fedora Workstation 44 (Linux systems/administration).\n* **IDE & Editors**: VS Code for lightweight scripts, Antigravity for agent tasks, and JetBrains IDEs or Neovim for larger backend pipelines.\n* **Terminal**: Zsh on macOS Terminal, PowerShell on Windows, and Bash on GNOME Terminal.";
    } else if (lower.includes("philosophy") || lower.includes("style") || lower.includes("manner") || lower.includes("perfection") || lower.includes("leadership") || lower.includes("creative")) {
      reply = "Jay operates with a deep commitment to **perfection**, ensuring his code and visual designs are built to a top-notch standard. He has a hands-on, test-driven working style (full pytest coverage on his ML tooling) and a strong interest in open-source contribution. When collaborating, he naturally takes charge of direction while remaining patient and supportive with his teammates.";
    } else if (lower.includes("who") || lower.includes("about") || lower.includes("experience") || lower.includes("jay")) {
      reply = "Jay Joshi is a Computer Science undergraduate focused on production-oriented AI systems, deep learning optimizations, and frontend developer experiences. He is currently looking for AI/ML and Software Engineering internships! You can explore his background and credentials directly on the **Home** workspace.";
    } else {
      reply = "I'm Jay's Portfolio Assistant! I can help you review his credentials, search projects, or get his contact info. Try asking:\n\n* *'What projects did he build?'*\n* *'What are his skills?'*\n* *'Where did he do his education?'*\n* *'Is he open to job roles?'*";
    }
    const botMsgId = Date.now() + 1;
    setMessages(prev => [...prev, { id: botMsgId, sender: "bot", text: "", isTyping: true }]);
    
    let currentText = "";
    let charIdx = 0;
    
    const interval = setInterval(() => {
      if (charIdx < reply.length) {
        currentText += reply[charIdx];
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, text: currentText } : msg
        ));
        charIdx++;
      } else {
        clearInterval(interval);
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, isTyping: false } : msg
        ));
      }
    }, 12);
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add User Message
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, sender: "user", text: text }]);
    setInputText("");

    // Trigger Bot Response
    setTimeout(() => simulateBotResponse(text), 600);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "Chat cleared! Ask me anything about Jay's experience, projects, skills, or contact info.",
        isTyping: false
      }
    ]);
  };

  const isBotTyping = messages.some(m => m.isTyping);

  return (
    <div className={`ai-chat-sidebar ${isOpen ? "" : "collapsed"}`}>
      {/* Header */}
      <div className="ai-chat-header">
        <div className="ai-chat-title">
          <Sparkles size={16} />
          <span>PORTFOLIO ASSISTANT</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            className="ai-chat-close-btn" 
            title="Clear Chat History"
            onClick={handleClear}
            disabled={isBotTyping}
          >
            <Trash2 size={13} />
          </button>
          <button className="ai-chat-close-btn" onClick={onClose} title="Minimize Sidebar">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages Viewport */}
      <div className="ai-chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`ai-message-row ${msg.sender}`}>
            <div className="ai-avatar">
              {msg.sender === "bot" ? <Sparkles size={13} /> : <User size={13} />}
            </div>
            <div className="ai-bubble">
              {msg.isTyping && msg.text === "" ? (
                <div className="ai-bubble-typing">
                  <span className="ai-typing-dot"></span>
                  <span className="ai-typing-dot"></span>
                  <span className="ai-typing-dot"></span>
                </div>
              ) : (
                <div className="space-y-1">{parseMarkdown(msg.text)}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="ai-chat-suggestions">
        {[
          "List projects",
          "What are his skills?",
          "How to contact him?",
          "Resume download"
        ].map(suggestion => (
          <button
            key={suggestion}
            className="ai-suggestion-chip"
            onClick={() => handleSend(suggestion)}
            disabled={isBotTyping}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="ai-chat-input-area">
        <div className="ai-chat-input-wrapper">
          <input
            type="text"
            className="ai-chat-text-input"
            placeholder={isBotTyping ? "Assistant is typing..." : "Ask Assistant a question..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isBotTyping}
          />
        </div>
        <button
          className="ai-chat-send-btn"
          onClick={() => handleSend()}
          disabled={!inputText.trim() || isBotTyping}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
