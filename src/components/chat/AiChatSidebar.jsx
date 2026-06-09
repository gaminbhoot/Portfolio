import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, User, Trash2 } from "lucide-react";
import "./AiChatSidebar.css";

export default function AiChatSidebar({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm Jay's Portfolio Copilot. Ask me anything about his projects, skills, education, or contact details!",
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
    
    if (lower.includes("project") || lower.includes("portfolio") || lower.includes("highlights") || lower.includes("build")) {
      reply = "Jay has built several notable projects:\n\n1. **Abhisar**: A streaming LLM product powered by the Groq Inference Engine (React & Express).\n2. **SysAware ML Optimizer**: A PyTorch model quantization profiling wrapper.\n3. **Real-Time AI Surveillance**: A computer vision pipeline utilizing YOLOv8 & Deep SORT.\n4. **OctaWipe**: A storage sanitization tool compliant with DoD standards.\n\nSelect **Projects.jsx** in the sidebar to view detailed walkthroughs!";
    } else if (lower.includes("skill") || lower.includes("stack") || lower.includes("technolog") || lower.includes("competenc")) {
      reply = "Jay's core competencies include:\n\n* **AI/ML & Systems**: Python, PyTorch, YOLOv8, Deep SORT, OpenCV, model quantization.\n* **Frontend & Engineering**: React.js, JavaScript, Vite.js, Tailwind CSS, Vanilla CSS, GSAP, Three.js.\n\nSelect **Skills.jsx** in the sidebar to see his interactive skills sheet!";
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("linkedin") || lower.includes("hire") || lower.includes("reach")) {
      reply = "You can reach out to Jay directly:\n\n* **Email**: jay05.joshi@gmail.com\n* **LinkedIn**: linkedin.com/in/gaminbhoot\n* **GitHub**: github.com/gaminbhoot\n\nSelect **Contact.jsx** in the sidebar to open the contact form!";
    } else if (lower.includes("resume") || lower.includes("cv") || lower.includes("download")) {
      reply = "You can download Jay's resume in PDF format directly from the Home page or download it here: [JAY_JOSHI_RESUME.pdf](/JAY%20JOSHI%20RESUME.pdf).";
    } else if (lower.includes("who") || lower.includes("about") || lower.includes("experience") || lower.includes("jay") || lower.includes("education")) {
      reply = "Jay Joshi is a Computer Science undergraduate focused on production-oriented AI systems, deep learning optimizations, and frontend developer experiences. He is currently looking for AI/ML and Software Engineering internships! You can find his full credentials in the `README.md` file or explore his pages.";
    } else {
      reply = "I'm Jay's Portfolio Copilot! I can help you review his credentials, search projects, or get his contact info. Try asking:\n\n* *'What projects did he build?'*\n* *'What are his skills?'*\n* *'How do I contact him?'*";
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
          <span>PORTFOLIO COPILOT</span>
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
            placeholder={isBotTyping ? "Copilot is typing..." : "Ask Copilot a question..."}
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
