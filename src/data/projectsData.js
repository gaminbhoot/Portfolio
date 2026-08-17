// src/data/projectsData.js

export const projectsData = [
  {
    id: "ai-motion-tracker",
    title: "Real-Time AI Motion Detection & Tracking System",
    category: "Computer Vision / Systems Engineering",
    year: "2025",
    thumbnail: "/images/ai-vision/thumb.webp",
    heroImage: "/images/ai-vision/hero.webp",
    githubLink: "https://github.com/gaminbhoot/surveillance-system",
    prototypeLink: "https://surveillance-system.jayjoshi.online/",

    summary: {
      tagline: "Real-time surveillance system combining YOLOv8 detection, Deep SORT tracking, and motion heatmap analytics deployed via Flask web interface.",
      projectMeta: {
        problem: "Legacy detection relies on background subtraction with zero cross-frame identity tracking.",
        role: "Sole Engineer (Architecture, ML pipeline, full-stack deployment)",
        result: "Built a real-time YOLOv8 + Deep SORT tracking pipeline with spatial heatmap analytics streamed via Flask."
      },
      keyTechnologies: [
        "YOLOv8 (nano) for object detection",
        "Deep SORT for multi-object tracking",
        "Kalman filtering & Hungarian matching",
        "Flask web server with real-time streaming",
        "OpenCV for video processing",
        "NumPy for heatmap generation"
      ],
      technicalHighlights: [
        { title: "Detection Pipeline", description: "Implemented YOLOv8 nano variant with COCO pretrained weights for real-time person detection. Single forward pass architecture with confidence thresholding to balance precision and recall." },
        { title: "Identity Tracking", description: "Integrated Deep SORT for persistent object tracking across frames using Kalman filters for motion prediction and appearance embeddings for data association via Hungarian matching." },
        { title: "Motion Analytics", description: "Built cumulative spatial heatmap system using floating-point grids updated by tracked object centroids, visualizing movement patterns over time." },
        { title: "Behavioral Analysis", description: "Developed rule-based temporal persistence logic to detect loitering events based on spatial confinement thresholds." },
        { title: "Deployment", description: "Deployed as Flask-based web application with browser-compatible video streaming, REST API endpoints for motion statistics, and GPU-enabled cloud compatibility." }
      ],
      metrics: [
        "12-18 FPS throughput on GPU environments",
        "90-130ms end-to-end latency (network-bound)",
        "25-35ms inference time per frame",
        ">0.70 confidence for majority of detections"
      ],
      architecture: "Modular pipeline: Video Input → YOLOv8 Detection → Deep SORT Tracking → Heatmap Generation → Flask Web Streaming",
      showcaseImages: [
        { image: "/images/ai-vision/architecture.webp", title: "System Architecture" },
        { image: "/images/ai-vision/detection.webp", title: "Object Detection Strategy" },
        { image: "/images/ai-vision/tracking.webp", title: "Multi-Object Tracking" },
        { image: "/images/ai-vision/heatmap.webp", title: "Motion Heatmap Analytics" },
        { image: "/images/ai-vision/results.webp", title: "Performance Results" }
      ]
    },

    sections: [
      {
        id: "overview",
        title: "Overview",
        image: "/images/ai-vision/overview.webp",
        pullQuote: "Detection is trivial. Knowing who moved, where, and for how long  that's intelligence.",
        content: "Most surveillance systems stop at detection. This one doesn't. Built as a full-stack vision pipeline, it combines YOLOv8 object detection, Deep SORT multi-object tracking, and cumulative motion heatmaps into a single deployable system  streamed live via a Flask web interface. The goal was to move from raw pixels to actionable spatial intelligence, in real time."
      },
      {
        id: "problem",
        title: "The Problem",
        image: "/images/ai-vision/problem.webp",
        content: "Legacy motion detection relies on background subtraction  a technique that breaks under changing light, shadows, and camera noise. The result is high false-positive rates and zero semantic understanding. Worse, systems that do detect objects rarely track them across frames, losing identity the moment something moves behind another object. There was no unified solution that could detect, track, persist, and visualize  so this one was built."
      },
      {
        id: "goals",
        title: "Design Goals",
        image: "/images/ai-vision/goals.webp",
        content:
          "Four constraints shaped every architectural decision: " +
          "(1) Near real-time performance on constrained hardware, " +
          "(2) Stable identity tracking with minimal ID switches across occlusions, " +
          "(3) Interpretable motion analytics without black-box models, " +
          "(4) Lightweight web deployment requiring no client-side installation."
      },
      {
        id: "architecture",
        title: "System Architecture",
        image: "/images/ai-vision/architecture.webp",
        content: "The pipeline is strictly sequential and modular. Incoming frames pass through YOLOv8 for detection, bounding boxes are handed to Deep SORT for identity-preserving tracking, centroids update a floating-point heatmap grid, and the final annotated frame is streamed via Flask. Each stage is decoupled  making individual components replaceable without restructuring the pipeline."
      },
      {
        id: "detection",
        title: "Object Detection",
        image: "/images/ai-vision/detection.webp",
        content: "YOLOv8 nano was chosen for its single-pass architecture fast enough for real-time use, accurate enough for person detection using pretrained COCO weights. No custom training was required. A confidence threshold filters low-quality detections before they reach the tracker, preventing noise from propagating downstream."
      },
      {
        id: "tracking",
        title: "Identity Tracking",
        image: "/images/ai-vision/tracking.webp",
        pullQuote: "The hardest part isn't finding someone in a frame. It's recognising them in the next one.",
        content: "Deep SORT handles identity persistence across frames using Kalman filter-based motion prediction combined with appearance embeddings. When two tracks collide or briefly disappear, Hungarian matching re-associates them without resetting IDs. This makes reasoning about object continuity  loitering, re-entry, path tracing  tractable."
      },
      {
        id: "motion-analysis",
        title: "Motion Heatmaps",
        image: "/images/ai-vision/heatmap.webp",
        content: "Each tracked centroid increments a spatial grid in proportion to its position. Over time, frequently traversed areas accumulate into visible hotspots. The result is a continuously updating heatmap that makes movement patterns immediately legible  useful for security audits, space utilization studies, or just understanding how people actually move through a space."
      },
      {
        id: "threat-logic",
        title: "Behavioral Analysis",
        image: "/images/ai-vision/threat-logic.webp",
        content: "On top of tracking, a lightweight rule layer flags objects that remain spatially confined past a time threshold  a proxy for loitering. The logic is deliberately simple: no learned models, no opaque scoring. Interpretability was treated as a feature, not a limitation. Low-level spatial features, applied consistently, are enough to surface security-relevant behavior."
      },
      {
        id: "deployment",
        title: "Deployment",
        image: "/images/ai-vision/deployment.webp",
        content: "The system runs as a Flask application, streaming annotated video to any browser with detection overlays, tracking IDs, and heatmap layers rendered in real time. REST endpoints expose motion statistics and alert states as JSON. Tested across local CPU environments and GPU-backed cloud instances  the architecture scales with available hardware."
      },
      {
        id: "results",
        title: "Results",
        image: "/images/ai-vision/results.webp",
        content: "On GPU, the system sustains 12–18 FPS with end-to-end latency between 90–130ms  the variance almost entirely network-bound. Inference alone runs at 25–35ms per frame. Person detection confidence held above 0.70 for the majority of frames. Loitering detection triggered consistently after the defined temporal threshold, with no ground-truth annotations required for validation."
      },
      {
        id: "limitations",
        title: "Limitations",
        image: "/images/ai-vision/limitations.webp",
        layout: "text-only",
        content: "The heatmap has no temporal decay  past movement is weighted equally to recent movement, which can mislead in long sessions. Rule-based loitering detection produces false positives in dense or chaotic scenes. Performance degrades predictably with camera placement and scene complexity. These tradeoffs were accepted to preserve interpretability and real-time responsiveness."
      },
      {
        id: "future",
        title: "What's Next",
        image: "/images/ai-vision/future.webp",
        layout: "text-only",
        content: "The immediate next step is temporal decay in heatmaps  weighting recent movement more heavily than historical. Longer term, the rule-based behavior layer could be replaced with learned anomaly detection without changing the upstream pipeline. This project demonstrates that existing vision components, composed thoughtfully, can produce surveillance intelligence that is both deployable and explainable."
      }
    ]
  },

  {
    id: "octawipe",
    title: "OctaWipe - Secure Data Sanitization",
    category: "System Security / Data Sanitization",
    year: "2025",
    thumbnail: "/images/octawipe/thumb.webp",
    heroImage: "/images/octawipe/hero.webp",
    githubLink: "https://github.com/gaminbhoot/Octawipe",
    prototypeLink: "https://octawipe.jayjoshi.online/",

    summary: {
      tagline: "Cross-platform data sanitization system with NIST/DoD compliance, bootable deployment, and blockchain-anchored verification certificates.",
      projectMeta: {
        problem: "E-waste processing lacks verifiable, cross-platform drive wiping with cryptographic proof of destruction.",
        role: "Research & Frontend Developer",
        result: "Engineered a NIST/DoD-compliant sanitization system distributed via PXE network boot and Live USB."
      },
      keyTechnologies: [
        "shred, blkdiscard, nvme-cli for multi-method sanitization",
        "ATA Secure Erase & Cryptographic Erase",
        "Ubuntu 24.04 LTS Live Boot environment",
        "PXE network boot for bulk wiping",
        "Digital signature & blockchain anchoring",
        "PDF/JSON certificate generation"
      ],
      technicalHighlights: [
        { title: "Storage-Aware Sanitization Engine", description: "Implemented differentiated wiping strategies: multi-pass overwriting (shred) for HDDs, ATA Secure Erase and blkdiscard for SSDs, nvme-cli for NVMe devices. Includes HPA/DCO sector handling to prevent hidden data persistence." },
        { title: "Bootable Deployment Architecture", description: "Built OS-independent execution via Live USB, ISO, and PXE network boot. PXE enables one-click bulk sanitization across enterprise device fleets without individual OS installation." },
        { title: "Automated Verification Layer", description: "Designed verification subsystem that validates wipe completion, method integrity, and device-specific parameters post-sanitization. Prevents silent failures and ensures standards compliance." },
        { title: "Cryptographic Certification System", description: "Developed dual-format certificate generation (PDF + JSON) with digital signatures. Includes device metadata, wipe method, execution logs, timestamps, and cryptographic proofs." },
        { title: "Blockchain-Anchored Trust Layer", description: "Implemented immutable certificate validation using blockchain hash anchoring. Certificate hashes are stored on distributed ledger, enabling independent tamper detection without centralized servers." }
      ],
      metrics: [
        "NIST 800-88 & DoD 5220.22-M compliant",
        "Supports HDD, SSD, NVMe storage types",
        "Cross-platform: Windows, Linux, Android",
        "Bulk PXE wiping for enterprise scale",
        "Cryptographically verifiable certificates"
      ],
      architecture: "Modular workflow: Web Portal/Local Boot → Device Detection → Storage-Type Routing → Sanitization Execution → Verification → Signed Certificate + Blockchain Anchoring",
      showcaseImages: [
        { image: "/images/octawipe/goals.webp", title: "Project Goals & Design Constraints" },
        { image: "/images/octawipe/architecture.webp", title: "System Architecture" },
        { image: "/images/octawipe/sanitization.webp", title: "Bootable Deployment" },
        { image: "/images/octawipe/novelty.webp", title: "Network Wiping" }
      ]
    },

    sections: [
      {
        id: "overview",
        title: "Overview",
        image: "/images/octawipe/overview.webp",
        pullQuote: "A wiped drive is only as trustworthy as the proof it comes with.",
        content: "OctaWipe is a cross-platform data sanitization system built for individuals, enterprises, and e-waste processors who need verifiable, standards-compliant data destruction. It doesn't just erase  it proves erasure. Every wipe produces a cryptographically signed certificate, anchored to a blockchain, that can be independently verified long after the device leaves your hands."
      },
      {
        id: "context-problem",
        title: "The Problem",
        image: "/images/octawipe/problem.webp",
        content: "India generates millions of tonnes of e-waste annually. Most of it sits in storage  not because devices are broken, but because people don't trust that their data is gone. Existing sanitization tools are fragmented, platform-dependent, and produce no verifiable proof. For SSDs and NVMe drives, traditional overwriting doesn't even work. At enterprise scale, manually wiping fleets of devices is slow, error-prone, and leaves no audit trail. OctaWipe was built to fix all of this in a single system."
      },
      {
        id: "goals",
        title: "Design Goals",
        image: "/images/octawipe/goals.webp",
        content:
          "Four constraints shaped the architecture: " +
          "(1) Full compliance with NIST 800-88 and DoD 5220.22-M standards, " +
          "(2) Cross-platform usability across Windows, Linux, and Android without OS dependency, " +
          "(3) Bulk enterprise-scale wiping via network boot, " +
          "(4) Tamper-proof, independently verifiable wiping certificates."
      },
      {
        id: "architecture",
        title: "System Architecture",
        image: "/images/octawipe/architecture.webp",
        content: "The system is boot-independent by design. Execution begins from a web portal or local interface, then hands off to a bootable environment via USB, ISO, or PXE. From there: device detection, storage-type routing, sanitization execution, automated verification, and certificate generation in sequence, with no manual steps between stages."
      },
      {
        id: "sanitization",
        title: "Sanitization Engine",
        image: "/images/octawipe/sanitization.webp",
        content: "Different storage media require different destruction methods. HDDs receive multi-pass overwriting via shred. SSDs use ATA Secure Erase and blkdiscard. NVMe devices are handled via nvme-cli and cryptographic erase. HPA and DCO sectors hidden areas that standard tools miss are explicitly targeted. The engine selects the correct method automatically based on device type."
      },
      {
        id: "boot",
        title: "Bootable & Network Deployment",
        image: "/images/octawipe/boot.webp",
        content: "To eliminate OS dependency, OctaWipe runs from Live USB, ISO, or PXE Network Boot on Ubuntu 24.04 LTS. PXE is the key enterprise feature it allows one-click simultaneous wiping across an entire device fleet from a single server, without touching each machine individually. For recycling centers processing hundreds of devices, this changes the operational calculus entirely."
      },
      {
        id: "verification-trust",
        title: "Verification & Trust Layer",
        image: "/images/octawipe/certification.webp",
        pullQuote: "Verification isn't a post-process. It's a system component.",
        content: "After sanitization, automated checks validate completion status, method integrity, and device parameters catching silent failures before they become compliance gaps. The verified result produces a signed certificate in both PDF and JSON formats, containing device identifiers, wipe method, execution logs, timestamps, and cryptographic signatures. To prevent certificate forgery, hashes are anchored to a distributed ledger. No centralized server required any future alteration is independently detectable, years later."
      },
      {
        id: "standards",
        title: "Standards Compliance",
        image: "/images/octawipe/standards.webp",
        layout: "text-only",
        content: "OctaWipe implements NIST 800-88, DoD 5220.22-M (E), and DoD 5220.22-M (ECE) the globally recognized benchmarks for data sanitization. Compliance with these standards means data is rendered unrecoverable by both software and forensic analysis, making the system viable for regulated industries including finance, healthcare, and government."
      },
      {
        id: "novelty",
        title: "What Makes It Different",
        image: "/images/octawipe/novelty.webp",
        content: "OctaWipe doesn't invent new wiping algorithms. Its novelty is architectural combining storage-aware sanitization, PXE bulk deployment, automated verification, and blockchain-anchored certificates into a single cohesive system. Most tools do one of these things. None do all four. Treating verification as a first-class component rather than an afterthought is what separates OctaWipe from a script with a UI."
      },
      {
        id: "impact-future",
        title: "Impact & Future Scope",
        image: "/images/octawipe/future.webp",
        layout: "image-first",
        content: "By making proof of erasure cryptographically verifiable, OctaWipe enables devices to be safely resold, refurbished, or recycled directly reducing unnecessary disposal. For enterprises, it cuts compliance risk during decommissioning. For individuals and e-waste handlers, it replaces anxiety with certainty. Future development targets policy-driven wipe recommendations, tighter ITSM integration, and support for mobile and IoT-class devices. The longer arc is a standardized trust layer for the entire device lifecycle from first boot to final wipe."
      }
    ]
  },
  {
    id: "abhisar-llm",
    title: "Abhisar: Groq-Powered LLM Product",
    category: "Full-Stack AI Product",
    year: "2026",
    thumbnail: "/images/abhisar/hero.webp",
    heroImage: "/images/abhisar/hero.webp",
    githubLink: "https://github.com/gaminbhoot/Abhisar",
    prototypeLink: "https://abhisar.jayjoshi.online/",

    summary: {
      tagline:
        "A massively fast, user-facing conversational AI client powered by Groq and LLaMA models, wrapped in a responsive React frontend.",
      projectMeta: {
        role: "Founder-builder (product, frontend, backend integration)",
        teamSize: "1",
        duration: "Iterative product build",
        status: "Built an ultra-fast responsive React client powered by Groq's LPU and LLaMA 3.",
        audience:
          "General users seeking fast, friendly conversational AI experiences",
      },
      keyTechnologies: [
        "React for UI/UX",
        "Groq API for inference",
        "LLaMA 3 models",
        "Node.js backend",
        "REST API integration",
        "Tailwind CSS",
      ],
      technicalHighlights: [
        {
          title: "Instant Inference",
          description:
            "Leveraged Groq's LPU architecture to achieve near-zero latency text generation inside a responsive web application.",
        },
        {
          title: "Conversation State",
          description:
            "Built robust frontend state management to handle complex chat histories, streaming tokens, and prompt context windows.",
        },
        {
          title: "Product Thinking",
          description:
            "Designed an intuitive, accessible user interface optimized for high-speed engagement and practical user adoption.",
        },
        {
          title: "Resilient API Integration",
          description:
            "Implemented robust request handling, graceful fallbacks, and latency-conscious UX states for production-like reliability.",
        },
        {
          title: "Memory and Session Design",
          description:
            "Structured conversation memory and context-window management to preserve relevant history while controlling token growth.",
        },
      ],
      metrics: [
        "Sub-100ms time to first token",
        "Seamless state synchronization across conversational turns",
        "Responsive behavior across desktop and mobile layouts",
        "Reduced perceived wait times via streaming-first UX",
      ],
      architecture: "React Frontend -> Node.js/Express Middleware -> Groq API -> LLaMA 3",
      myContributions: [
        "Designed product direction and conversation UX philosophy",
        "Built frontend architecture for stateful, streaming chat",
        "Integrated backend middleware for model orchestration and API security boundaries",
        "Implemented persistent chat memory and client-side experience polish",
      ],
      engineeringDecisions: [
        "Used middleware layer to isolate provider concerns and simplify frontend logic",
        "Prioritized low-latency interaction patterns over heavy feature bloat",
        "Designed for iterative model/provider swaps with minimal UI disruption",
      ],
      testingAndValidation: [
        "Conversation flow testing across long and short context windows",
        "Latency profiling under different network conditions",
        "UI responsiveness and mobile usability checks",
      ],
      deploymentAndOps: [
        "Environment-based API configuration for secure deployment",
        "Production-ready web deployment with static frontend hosting and API middleware",
      ],
      keyOutcomes: [
        "Delivered a real user-facing LLM product with strong speed perception",
        "Validated Groq-backed low-latency UX for consumer chat interactions",
        "Established extensible architecture for multi-model expansion",
      ],
      showcaseImages: [
        { image: "/images/abhisar/hero.webp", title: "Product Experience" },
        { image: "/images/abhisar/thumb.webp", title: "UI Snapshot" },
      ],
    },

  },
      
  {
    id: "java-compiler",
    title: "Mini Compiler Pipeline",
    category: "Systems & Tooling",
    year: "2026",
    thumbnail: "/images/compiler/thumb.webp",
    heroImage: "/images/compiler/hero.webp",
    githubLink: "https://github.com/gaminbhoot/mini_compiler",
    
    summary: {
      tagline: "A custom language compiler built fully in Java, featuring robust lexical analysis, abstract syntax tree (AST) construction, and assembly generation.",
      projectMeta: {
        problem: "Understanding how programming languages function requires deep systems building rather than using pre-built library parsers.",
        role: "Systems Programmer",
        result: "Built a compiler pipeline from scratch in Java, demonstrating low-level lexical analysis and AST construction."
      },
      keyTechnologies: [
        "Java",
        "Lexer & Parser Architecture",
        "AST Generation",
        "Semantic Analysis",
        "Code Generation"
      ],
      technicalHighlights: [
        { title: "Lexical Analysis", description: "Engineered a robust scanner to tokenize source files, handling complex grammar rules, keywords, and punctuation operators." },
        { title: "Parsing & AST", description: "Implemented a recursive descent parser to produce correct Abstract Syntax Trees capable of identifying syntactical errors precisely." },
        { title: "Semantic Operations", description: "Handled scope validation, type checking, and operational precedence natively." }
      ],
      metrics: [],
      architecture: "Source Code → Lexer → Parser → AST → Semantic Check → Code Gen",
      showcaseImages: []
    },

    sections: [
      {
        id: "overview",
        title: "Systems Engineering",
        content: "Building a compiler from scratch provides unparalleled insight into how programming languages actually function. This project demonstrated low-level systems programming within Java, prioritizing strong software architecture and algorithmic thinking over pre-built libraries."
      }
    ]
  },
  {
    id: "sysaware-ml-optimizer",
    title: "SysAware ML Optimizer",
    category: "Distributed Systems & Machine Learning",
    year: "2026",
    thumbnail: "/images/sysaware/thumb.webp",
    heroImage: "/images/sysaware/hero.webp",
    githubLink: "https://github.com/gaminbhoot/sysaware-ml-optimizer",
    
    summary: {
      tagline: "A distributed, hardware-aware ecosystem designed to dynamically profile, diagnose, and accelerate LLMs and deep learning models across CPU, GPU, Apple Silicon (MPS), and NPUs.",
      projectMeta: {
        problem: "Deploying and tuning LLMs across heterogeneous local and edge hardware is plagued by unpredictable VRAM spilling, opaque quantization degradation, and inaccurate static memory approximations.",
        role: "Systems & Machine Learning Engineer (Core Architecture, Profiling, ML Estimator)",
        result: "Built a full-stack dual-path optimization suite featuring a RandomForest inference estimator, LAN fleet telemetry, and real-time runtime tuning for LM Studio & Ollama."
      },
      keyTechnologies: [
        "Python 3.11+",
        "FastAPI & SSE Streaming",
        "React · TypeScript · Vite",
        "PyTorch (CUDA & Apple Silicon MPS)",
        "Scikit-learn (RandomForest)",
        "SQLite & UDP Autodiscovery",
        "Pytest & Playwright E2E"
      ],
      technicalHighlights: [
        { title: "Dual-Path Diagnostic & Tuning Architecture", description: "Orchestrates two specialized pipelines: Path A for deep structural scans on raw checkpoints (.safetensors, .pt) analyzing dead neurons and quantization headroom, and Path B for live runtime parameter tuning (optimal GPU layer splits and context limits) on backends like LM Studio and Ollama." },
        { title: "Machine Learning Inference Estimator", description: "Predicts tokens-per-second (tok/s) before loading a model via a trained RandomForest Regressor calibrated on community benchmarks and ground-truth lab data, explicitly modeling RAM-spill penalties and Apple Silicon unified memory." },
        { title: "Distributed Fleet Telemetry", description: "Real-time fleet monitoring dashboard across local area networks utilizing lightweight UDP autodiscovery (:8001) and Server-Sent Events (SSE), backed by SQLite persistence with automatic schema migrations." },
        { title: "Prompt Engine Laboratory & Live Chat", description: "Token-efficiency restructuring engine that strips semantic bloat from prompts with immediate validation against live proxied LLMs in an integrated chat workspace." },
        { title: "Security-Enforced Model Ingest", description: "Enforces strict security boundaries with verified SafeTensors ingestion and guarded deserialization, mitigating arbitrary code execution risks during model loading." }
      ],
      metrics: [
        "Hardware-aware profiling across CPU, CUDA, and Apple Silicon MPS",
        "Sub-5% Variance (CoV) convergence on dynamic execution micro-benchmarks",
        "Multi-node LAN fleet discovery with 30s heartbeat & SQLite telemetry",
        "Comprehensive dual-layer testing with Pytest and Playwright E2E"
      ],
      architecture: "React TypeScript UI / CLI → FastAPI Service Layer → Diagnostic & Tuning Engines (LM Studio / SafeTensors) → RandomForest Estimator → UDP Fleet Broker & SQLite",
      showcaseImages: []
    },

    sections: [
      {
        id: "overview",
        title: "Overview",
        image: "/images/sysaware/overview.webp",
        content: "SysAware ML Optimizer bridges the divide between deep learning weights and physical hardware execution. Evolving from a single-machine profiling engine into a full-stack distributed ecosystem, it delivers automated model diagnostics, empirical runtime tuning, and predictive inference estimation across CPU, NVIDIA CUDA, Apple Silicon (MPS), and edge hardware."
      },
      {
        id: "problem",
        title: "The Problem",
        image: "/images/sysaware/problem.webp",
        content: "Running and fine-tuning modern LLMs on edge or local infrastructure is fraught with operational guesswork. Static parameter counts fail to account for intermediate activation memory and KV-cache expansion, leading to silent RAM spills and severe throughput collapse. Furthermore, manual trial-and-error for GPU layer offloading is slow and unreliable, while legacy model serialization invites arbitrary code execution vulnerabilities."
      },
      {
        id: "architecture",
        title: "Dual-Path System Architecture",
        image: "/images/sysaware/architecture.webp",
        content: "SysAware orchestrates two decoupled workflows: Path A (Model Diagnostic) performs architectural scans on raw checkpoints (.safetensors, .pt) to detect dead neurons, layer redundancy, and INT8/4-bit quantization headroom without accuracy drop. Path B (Parameter Tuner) connects to runtime engines (LM Studio, Ollama), calculating mathematically optimal GPU/CPU layer distributions and empirical maximum context bounds."
      },
      {
        id: "benchmarking",
        title: "ML Inference Estimator & Benchmarking",
        image: "/images/sysaware/benchmarking.webp",
        content: "Rather than relying on static formulas, SysAware features a dedicated RandomForest inference predictor that estimates tokens-per-second before loading a model into memory. In runtime benchmarking, target execution loops are wrapped with native memory tracing until measurement variance stabilizes below 5% (CoV < 0.05), ensuring reliable ground-truth profiling."
      },
      {
        id: "optimization",
        title: "Prompt Laboratory & Live Proxy",
        image: "/images/sysaware/optimization.webp",
        content: "SysAware includes a Prompt Engine Laboratory that automatically optimizes instruction structures for token economy—stripping semantic stop-words and restructuring templates. Optimized prompts can be executed directly in the integrated Live Chat workspace, which proxies streaming requests through the connected inference backend."
      },
      {
        id: "deployment",
        title: "Distributed Fleet Telemetry & Deployment",
        image: "/images/sysaware/deployment.webp",
        content: "Designed for multi-machine setups, SysAware Fleet unites cluster nodes across a local area network. Nodes discover the central hub via UDP broadcast on port 8001 and stream live health heartbeats over Server-Sent Events (SSE). The system is built as a clean monorepo combining a FastAPI backend, SQLite persistence, and a cinematic React TypeScript dashboard, validated through comprehensive Pytest and Playwright test suites."
      }
    ]
  }
];