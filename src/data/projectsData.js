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
    title: "OctaWipe — Secure Data Sanitization",
    category: "System Security / Data Sanitization",
    year: "2025",
    thumbnail: "/images/octawipe/thumb.webp",
    heroImage: "/images/octawipe/hero.webp",
    githubLink: "https://github.com/gaminbhoot/Octawipe",
    prototypeLink: "https://octawipe.jayjoshi.online/",

    summary: {
      tagline: "Cross-platform data sanitization system with NIST/DoD compliance, bootable deployment, and blockchain-anchored verification certificates.",
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
    thumbnail: "/images/abhisar/thumb.webp",
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
        status: "Live prototype",
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

    sections: [
      {
        id: "overview",
        title: "The Product",
        image: "/images/abhisar/overview.webp",
        pullQuote:
          "Speed is not just a performance metric. In conversational AI, it is the product experience.",
        content:
          "Abhisar is an applied AI web application designed to put ultra-fast inference directly into users' hands. Unlike heavy, delayed APIs, Groq integration enabled near-instant responses, dramatically improving the experience of everyday conversational AI.",
      },
      {
        id: "problem",
        title: "The Problem",
        image: "/images/abhisar/problem.webp",
        content:
          "Most AI chat products feel computationally capable but experientially weak. Users tolerate delay, context drops, and UI friction because they have no better baseline. The project began with a product question rather than a model question: what would a conversational interface feel like if responsiveness, continuity, and emotional usability were treated as first-class constraints instead of afterthoughts? Abhisar was built as a practical answer to that question.",
      },
      {
        id: "product-strategy",
        title: "Product Strategy",
        image: "/images/abhisar/strategy.webp",
        content:
          "The strategy aligned around three principles: speed as perceived trust, minimal interaction friction, and conversational continuity over feature clutter. Rather than overloading the interface with controls, the design favors flow: instant feedback, stable history behavior, and clear response states. The objective was not to simulate complexity but to preserve momentum so users stay in the conversation instead of managing the tool.",
      },
      {
        id: "architecture",
        title: "Architecture",
        image: "/images/abhisar/architecture.webp",
        content:
          "The system is intentionally layered. React manages rendering and state transitions, the middleware tier manages API boundaries and provider orchestration, and Groq-backed LLaMA inference drives generation. This separation keeps the client predictable while preserving backend flexibility for provider swaps, model routing, and policy updates. Architectural modularity was prioritized early so product iteration could happen without repeated rewrites.",
      },
      {
        id: "state-management",
        title: "Conversation State",
        image: "/images/abhisar/state.webp",
        content:
          "State management was the critical engineering layer. Streaming responses, request lifecycles, user edits, and historical context needed to remain coherent even under variable network conditions. The implementation tracks conversation turns with deterministic update rules so partial and final outputs never corrupt history. Context windows are managed deliberately to preserve semantic continuity while controlling latency and token growth.",
      },
      {
        id: "latency",
        title: "Latency Engineering",
        image: "/images/abhisar/latency.webp",
        content:
          "Latency was treated as both infrastructure behavior and product psychology. Provider choice, streaming delivery, and immediate UI feedback loops were tuned together so users perceive momentum from the first interaction. Time to first token and time to usable response became practical product metrics, not hidden backend numbers. The outcome is a chat rhythm that feels conversational rather than request-response transactional.",
      },
      {
        id: "results",
        title: "Results",
        image: "/images/abhisar/results.webp",
        content:
          "The product achieved fast response onset in favorable conditions and sustained stable multi-turn behavior under realistic usage. Session continuity remained reliable across longer interactions, and users experienced fewer interruptions from waiting states. Compared to traditional blocking-response interfaces, the streaming-first design substantially improved perceived speed and conversational flow, which directly supports retention and repeated use.",
      },
      {
        id: "future",
        title: "Future Scope",
        image: "/images/abhisar/future.webp",
        layout: "text-only",
        content:
          "Next iterations include intent-aware model routing, user-level memory controls, and stronger observability for response quality, cost, and latency outliers. The architecture is already prepared for multi-model orchestration and personalization layers. Long-term, the direction is an adaptive conversational platform where interface behavior and model selection co-evolve based on user context and interaction patterns.",
      },
    ],
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
  category: "Machine Learning / Systems Engineering",
  year: "2026",
  thumbnail: "/images/sysaware/thumb.webp",
  heroImage: "/images/sysaware/hero.webp",
  githubLink: "https://github.com/gaminbhoot/sysaware-ml-optimizer",
  
  summary: {
    tagline: "An advanced, hardware-aware tool designed to dynamically profile, compress, and accelerate PyTorch models based on the host system's physical capabilities.",
    keyTechnologies: [
      "Python 3.9+",
      "PyTorch (CUDA & MPS Support)",
      "Streamlit for rapid UX",
      "Python tracemalloc & psutil",
      "Subprocess & CLI Systems"
    ],
    technicalHighlights: [
      { title: "Security-First Model Loading", description: "Mitigates arbitrary code execution vulnerabilities during serialization by strictly enforcing torch.load(..., weights_only=True) boundaries, protecting local environments from malicious payloads." },
      { title: "Dynamic Hardware Tiering", description: "Replaces hardcoded tier rules with algorithmic checks mapping model sizes against accessible memory ratios, robustly shifting between CPU, GPU, and Apple Silicon MPS domains." },
      { title: "Robust Benchmarking Mechanics", description: "Utilizes Python's 'tracemalloc' internally to measure actual intermediate tensors footprints seamlessly, cutting off benchmarks dynamically once inferences reach a tight coefficient of variance (CoV < 5%)." },
      { title: "Expanded INT8 Quantization", description: "Automatically traverses nested layer blocks and dynamically compresses structural networks including Conv1d, Conv2d, Conv3d, LSTM, and GRU operations alongside standard Linear perceptrons." },
      { title: "Intelligent Prompt Optimizer", description: "A decoupled heuristic compiler that evaluates instruction prompts natively, targeting and recursively stripping semantic stop-words while restructuring the remaining text into formatted templates." }
    ],
    metrics: [
      "Hardware agnostic support: CPU, CUDA, and Apple Silicon MPS",
      "Sub-5% Variance (CoV) tracking for dynamic micro-benchmarks",
      "Format-compliant JSON runtime error envelopes",
      "Optimized Disk-based state cloning to prevent OOM errors"
    ],
    architecture: "CLI / Streamlit GUI → Hardware Profiler → Model Estimator (Tracemalloc) → Strategy Engine → AutoTuner (INT8/FP16) → JSON Result Endpoint",
    showcaseImages: []
  },

  sections: [
    {
      id: "overview",
      title: "Overview",
      image: "/images/sysaware/overview.webp",
      content: "SysAware ML Optimizer bridges the gap between deep learning infrastructure and production optimization. Built as a comprehensive toolkit, it analyzes latency constraints, dynamically estimates intermediate activation footprints, and autotunes PyTorch models targeting INT8 or FP16 formats based on real-time hardware capabilities seamlessly across Windows, Linux, and macOS environments."
    },
    {
      id: "problem",
      title: "The Problem",
      image: "/images/sysaware/problem.webp",
      content: "Machine learning models are frequently deployed in heavily constrained environments. Static parameter counts fail to reflect actual memory limits because they blindside runtime gradients and expansive intermediate activation states. Furthermore, legacy model loading mechanisms invite critical security vulnerabilities via arbitrary code execution, and standard optimization cloning crashes constrained machines through exponential memory ballooning. A dynamic, resilient pipeline was needed."
    },
    {
      id: "architecture",
      title: "Core Architecture & Security",
      image: "/images/sysaware/architecture.webp",
      content: "Every optimization pass is driven by strict type contracts and modular decoupling. Security is treated as a first-class citizen unsafe deep copies were deprecated in favor of a disk-cached state load mechanism to prevent OOM exhaustion. Moreover, malicious payload injection via unpickling was mitigated outright by strictly enforcing 'weights_only=True' instantiation policies."
    },
    {
      id: "benchmarking",
      title: "Hardware Profiling & Benchmarking",
      image: "/images/sysaware/benchmarking.webp",
      content: "The profiler autonomously extracts comprehensive hardware topologies, surfacing system RAM, CUDA availability, and Apple Silicon MPS configurations. Rather than estimating execution via static parameter equations, SysAware measures real execution cost dynamically. It utilizes Python's native 'tracemalloc' directly wrapped around target prediction loops capturing exact memory footprints, persisting iterations exactly until variance stabilizes below 5%."
    },
    {
      id: "optimization",
      title: "Advanced Quantization & Prompt Engineering",
      image: "/images/sysaware/optimization.webp",
      content: "Beyond elementary linear blocks, the engine quantizes complex sequential layer paradigms safely, bringing Conv1d, Conv2d, Conv3d, LSTM, and GRU instances down to INT8. Adjacent to model optimization sits the Prompt Optimizer an algorithmic regex-bound engine scoring NLP instruction structures, automatically slicing semantic filler-words while yielding tactical templates optimized for downstream language execution."
    },
    {
      id: "deployment",
      title: "Enterprise Deployment",
      image: "/images/sysaware/deployment.webp",
      content: "SysAware was built to thrive within pipeline automation interfaces. The CLI envelope catches missing files or environment panics natively, encapsulating structural crashes into controlled HTTP 500-equivalent JSON payloads readable by CI runners. Conversely, human engagement happens seamlessly via its integrated Streamlit GUI, which incorporates aggressive stale-state invalidation hooks preventing latency when evaluating diverse model payloads iteratively."
    }
  ]
}
];