// src/data/projectsData.js

export const projectsData = [
  {
    id: "ai-motion-tracker",
    title: "Real-Time AI Motion Detection & Tracking System",
    category: "Computer Vision / Systems Engineering",
    year: "2025",
    thumbnail: "/images/ai-vision/thumb.webp",
    heroImage: "/images/ai-vision/hero.webp",
    
    // RECRUITER SUMMARY - Technical implementation highlights only
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
        {
          title: "Detection Pipeline",
          description: "Implemented YOLOv8 nano variant with COCO pretrained weights for real-time person detection. Single forward pass architecture with confidence thresholding to balance precision and recall."
        },
        {
          title: "Identity Tracking",
          description: "Integrated Deep SORT for persistent object tracking across frames using Kalman filters for motion prediction and appearance embeddings for data association via Hungarian matching."
        },
        {
          title: "Motion Analytics",
          description: "Built cumulative spatial heatmap system using floating-point grids updated by tracked object centroids, visualizing movement patterns over time."
        },
        {
          title: "Behavioral Analysis",
          description: "Developed rule-based temporal persistence logic to detect loitering events based on spatial confinement thresholds."
        },
        {
          title: "Deployment",
          description: "Deployed as Flask-based web application with browser-compatible video streaming, REST API endpoints for motion statistics, and GPU-enabled cloud compatibility."
        }
      ],
      
      metrics: [
        "12-18 FPS throughput on GPU environments",
        "90-130ms end-to-end latency (network-bound)",
        "25-35ms inference time per frame",
        ">0.70 confidence for majority of detections"
      ],
      
      architecture: "Modular pipeline: Video Input → YOLOv8 Detection → Deep SORT Tracking → Heatmap Generation → Flask Web Streaming",
      
      // Select which images to showcase (image path + title)
      showcaseImages: [
        {
          image: "/images/ai-vision/architecture.webp",
          title: "System Architecture"
        },
        {
          image: "/images/ai-vision/detection.webp",
          title: "Object Detection Strategy"
        },
        {
          image: "/images/ai-vision/tracking.webp",
          title: "Multi-Object Tracking"
        },
        {
          image: "/images/ai-vision/heatmap.webp",
          title: "Motion Heatmap Analytics"
        },
        {
          image: "/images/ai-vision/results.webp",
          title: "Performance Results"
        }
      ]
    },
    
    // Full detailed sections for ProjectDetail.jsx
    sections: [
      {
        id: "overview",
        title: "Overview",
        image: "/images/ai-vision/overview.webp",
        content:
          "This project focuses on designing and implementing a real-time surveillance system capable of detecting, tracking, and analyzing motion in live video streams. By combining deep learning–based object detection (YOLOv8), multi-object tracking (Deep SORT), and motion heatmap analytics, the system transforms raw video feeds into actionable spatial and behavioral insights. The goal was not only accurate detection, but sustained identity tracking, motion pattern visualization, and deployability in real-world environments."
      },
      {
        id: "problem",
        title: "Problem Statement & Motivation",
        image: "/images/ai-vision/problem.webp",
        content:
          "Traditional motion detection systems rely heavily on background subtraction or frame differencing, which perform poorly in dynamic environments due to lighting variation, shadows, camera noise, and background motion. In real-world surveillance scenarios—such as corridors, classrooms, offices, or public spaces—these limitations lead to high false positives and limited situational awareness. At the same time, many modern systems perform object detection without long-term tracking, losing identity across frames, while tracking-only systems lack semantic understanding. The motivation behind this project was to design a unified, context-aware pipeline that understands what is moving, where it is moving, and how long it persists, while remaining performant in real-time settings."
      },
      {
        id: "goals",
        title: "Design Goals",
        image: "/images/ai-vision/goals.webp",
        content:
          "The system was designed around four core goals: " +
          "(1) Near real-time performance under constrained hardware and network conditions, " +
          "(2) Stable multi-object tracking with minimal identity switches, " +
          "(3) Interpretable motion analytics through cumulative heatmaps, " +
          "(4) Modular deployment via a lightweight web interface. " +
          "All architectural decisions—from model selection to visualization—were evaluated against these constraints."
      },
      {
        id: "architecture",
        title: "System Architecture",
        image: "/images/ai-vision/architecture.webp",
        content:
          "The pipeline follows a modular, sequential architecture. Incoming video frames are first processed by YOLOv8 for object detection. Detected bounding boxes are passed to Deep SORT, which applies Kalman filtering and appearance embeddings to preserve object identities across frames. Tracking metadata is then used to update a cumulative motion heatmap, highlighting regions of frequent activity. Finally, all visual outputs—bounding boxes, track IDs, and heatmaps—are streamed in real time through a Flask-based web interface."
      },
      {
        id: "detection",
        title: "Object Detection Strategy",
        image: "/images/ai-vision/detection.webp",
        content:
          "YOLOv8 (nano variant) was selected for its anchor-free architecture and favorable speed–accuracy tradeoff. The model performs object localization and classification in a single forward pass, making it well suited for real-time inference. Pretrained COCO weights were used to reliably detect humans without the need for custom dataset training. Confidence thresholding was applied to suppress low-confidence detections while preserving recall in moderately crowded scenes."
      },
      {
        id: "tracking",
        title: "Multi-Object Tracking & Identity Preservation",
        image: "/images/ai-vision/tracking.webp",
        content:
          "To maintain consistent identities across frames, Deep SORT was integrated on top of YOLOv8 detections. Deep SORT combines motion prediction via Kalman filters with appearance-based embeddings and Hungarian matching for data association. This significantly reduces identity switches during occlusions and re-entries, enabling temporal reasoning about object persistence, loitering behavior, and movement trajectories."
      },
      {
        id: "motion-analysis",
        title: "Motion Analysis & Heatmap Generation",
        image: "/images/ai-vision/heatmap.webp",
        content:
          "Beyond detection and tracking, the system introduces a motion heatmap layer that accumulates spatial activity over time. Each tracked object contributes to a floating-point heatmap grid based on its centroid position. Over successive frames, frequently traversed regions emerge as high-intensity areas, providing a persistent spatial summary of movement patterns without requiring video replay."
      },
      {
        id: "threat-logic",
        title: "Behavioral Analysis & Threat Logic",
        image: "/images/ai-vision/threat-logic.webp",
        content:
          "A lightweight, rule-based behavioral analysis layer was implemented on top of tracking and motion data. Objects that remain within a confined spatial region beyond a predefined temporal threshold are flagged as potential loitering events. This temporal persistence-based logic prioritizes interpretability and robustness over complex learned models, demonstrating how low-level vision outputs can be elevated into meaningful security signals."
      },
      {
        id: "deployment",
        title: "Deployment & Web Interface",
        image: "/images/ai-vision/deployment.webp",
        content:
          "The system is deployed using a Flask-based web server, exposing a browser-compatible video stream with real-time overlays for detections, tracking IDs, and heatmaps. Additional REST endpoints provide JSON-based access to motion statistics and alert states, enabling integration with dashboards or external systems. The system was validated both locally and in GPU-enabled cloud environments."
      },
      {
        id: "results",
        title: "Results & Performance Evaluation",
        image: "/images/ai-vision/results.webp",
        content:
          "System performance was evaluated under live operating conditions without ground-truth annotations. On GPU-backed environments, the pipeline achieved stable throughput in the range of 12–18 FPS with end-to-end latencies between approximately 90–130 ms, dominated by network transmission rather than inference. Inference time remained consistently low (≈25–35 ms per frame). Detection confidence analysis showed the majority of person detections clustering above 0.70 confidence, supporting reliable downstream tracking. Loitering events were detected only after sustained temporal persistence, reducing false alerts and demonstrating robust behavioral consistency."
      },
      {
        id: "limitations",
        title: "Limitations",
        image: "/images/ai-vision/limitations.webp",
        content:
          "The system relies on heuristic, rule-based behavioral logic, which may produce false positives in ambiguous or highly congested scenes. Heatmap accumulation does not currently incorporate temporal decay, potentially overemphasizing historical motion. Additionally, overall performance is influenced by camera placement, scene density, and detector accuracy. These tradeoffs were accepted to preserve interpretability and real-time responsiveness."
      },
      {
        id: "future",
        title: "Future Directions & Impact",
        image: "/images/ai-vision/future.webp",
        content:
          "Future iterations could replace heuristic threat logic with learned temporal anomaly detection models, such as autoencoders or temporal convolutional networks. Incorporating temporal decay and semantic zoning would further refine heatmap analytics. Beyond technical extensions, this project demonstrates how modern computer vision pipelines can move beyond raw detection toward interpretable, deployable surveillance intelligence, providing a strong foundation for real-world monitoring systems that balance performance, transparency, and usability."
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
    
    // RECRUITER SUMMARY - Technical implementation highlights only
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
        {
          title: "Storage-Aware Sanitization Engine",
          description: "Implemented differentiated wiping strategies: multi-pass overwriting (shred) for HDDs, ATA Secure Erase and blkdiscard for SSDs, nvme-cli for NVMe devices. Includes HPA/DCO sector handling to prevent hidden data persistence."
        },
        {
          title: "Bootable Deployment Architecture",
          description: "Built OS-independent execution via Live USB, ISO, and PXE network boot. PXE enables one-click bulk sanitization across enterprise device fleets without individual OS installation."
        },
        {
          title: "Automated Verification Layer",
          description: "Designed verification subsystem that validates wipe completion, method integrity, and device-specific parameters post-sanitization. Prevents silent failures and ensures standards compliance."
        },
        {
          title: "Cryptographic Certification System",
          description: "Developed dual-format certificate generation (PDF + JSON) with digital signatures. Includes device metadata, wipe method, execution logs, timestamps, and cryptographic proofs."
        },
        {
          title: "Blockchain-Anchored Trust Layer",
          description: "Implemented immutable certificate validation using blockchain hash anchoring. Certificate hashes are stored on distributed ledger, enabling independent tamper detection without centralized servers."
        }
      ],
      
      metrics: [
        "NIST 800-88 & DoD 5220.22-M compliant",
        "Supports HDD, SSD, NVMe storage types",
        "Cross-platform: Windows, Linux, Android",
        "Bulk PXE wiping for enterprise scale",
        "Cryptographically verifiable certificates"
      ],
      
      architecture: "Modular workflow: Web Portal/Local Boot → Device Detection → Storage-Type Routing → Sanitization Execution → Verification → Signed Certificate + Blockchain Anchoring",
      
      // Select which images to showcase (image path + title)
      showcaseImages: [
        {
          image: "/images/octawipe/goals.webp",
          title: "Project Goals & Design Constraints"
        },
        {
          image: "/images/octawipe/architecture.webp",
          title: "System Architecture"
        },
        
        {
          image: "/images/octawipe/sanitization.webp",
          title: "Bootable Deployment"
        },
        {
          image: "/images/octawipe/novelty.webp",
          title: "Network Wiping"
        }
      ]
    },
    
    // Full detailed sections for ProjectDetail.jsx
    sections: [
      {
        id: "overview",
        title: "Overview",
        image: "/images/octawipe/overview.webp",
        content:
          "OctaWipe is a secure, cross-platform data sanitization system designed to enable safe IT asset recycling and reuse. Built in alignment with international data destruction standards, the system provides a one-click, user-friendly interface for securely erasing data from storage devices while ensuring forensic unrecoverability. The solution targets individuals, enterprises, and e-waste processors seeking trustworthy and verifiable data wiping mechanisms."
      },
      {
        id: "context-problem",
        title: "Context, Motivation & Problem Statement",
        image: "/images/octawipe/problem.webp",
        content:
          "India faces a rapidly growing e-waste crisis, with millions of devices hoarded or prematurely discarded due to concerns over residual data exposure. Individuals, enterprises, and recycling agencies often avoid reuse or resale of hardware simply because they cannot be certain that sensitive data has been completely erased. Existing data wiping tools are frequently fragmented, OS-dependent, or designed for technically skilled users, creating a high barrier to secure data sanitization.\n\n" +
          "At the same time, most current data destruction solutions suffer from deeper systemic issues. Many lack cross-platform compatibility, making them impractical in heterogeneous environments. Others offer no independent or verifiable proof of sanitization, forcing users and organizations to blindly trust opaque wiping processes. This lack of transparency becomes a serious compliance risk in regulated industries.\n\n" +
          "Enterprise-scale environments face additional challenges, particularly when attempting to sanitize large fleets of devices efficiently. Bulk wiping across dozens or hundreds of machines is often slow, manual, and error-prone. The problem is further compounded by modern storage technologies such as SSDs and NVMe drives, where traditional overwriting techniques are insufficient and forensic recoverability remains a real concern. OctaWipe was conceived to address this combined gap—usability, scale, verification, and trust—within a single, standards-compliant system."
      },
      {
        id: "goals",
        title: "Design Goals",
        image: "/images/octawipe/goals.webp",
        content:
          "The system was designed around four primary goals: " +
          "(1) Full compliance with NIST 800-88 and DoD 5220.22-M data sanitization standards, " +
          "(2) Cross-platform usability across Windows, Linux, and Android environments, " +
          "(3) Support for bulk and network-based wiping at enterprise scale, " +
          "(4) Generation of tamper-proof, verifiable wiping certificates. " +
          "All architectural and tooling decisions were guided by these constraints."
      },
      {
        id: "architecture",
        title: "System Architecture",
        image: "/images/octawipe/architecture.webp",
        content:
          "OctaWipe follows a modular architecture centered around a boot-independent wiping environment. The workflow begins with a web-based or local portal, followed by bootable execution via USB, ISO, or PXE network boot. Once launched, the system detects connected storage devices, applies the selected sanitization method, verifies the wipe, and finally generates a digitally signed certificate containing logs and metadata."
      },
      {
        id: "sanitization",
        title: "Disk Detection & Sanitization Engine",
        image: "/images/octawipe/sanitization.webp",
        content:
          "At its core, OctaWipe implements multiple sanitization techniques tailored to different storage technologies. For HDDs, multi-pass and single-pass overwriting is supported using shred. For SSDs and NVMe devices, the system leverages ATA Secure Erase, blkdiscard, nvme-cli, and cryptographic erase methods. Special handling ensures HPA and DCO sectors are also wiped, preventing hidden data persistence."
      },
      {
        id: "boot",
        title: "Bootable & Network Deployment",
        image: "/images/octawipe/boot.webp",
        content:
          "To eliminate OS dependency, OctaWipe supports execution via Live USB, ISO, and PXE network boot. PXE booting enables one-click bulk wiping across multiple machines in enterprise and e-waste facilities, while Live USB support allows portable, offline wiping in field conditions. Ubuntu 24.04 LTS serves as the underlying execution environment."
      },
      {
        id: "verification-trust",
        title: "Verification, Certification & Tamper-Proof Trust Layer",
        image: "/images/octawipe/certification.webp",
        content:
          "Verification is treated as a first-class system component in OctaWipe rather than a post-process add-on. After sanitization, the system performs automated verification checks to ensure that the selected wiping standard has been correctly applied. These checks validate completion status, method integrity, and device-specific parameters, ensuring that no partial or silent failures go unnoticed.\n\n" +
          "Once verification is complete, OctaWipe generates digitally signed wiping certificates in both human-readable (PDF) and machine-readable (JSON) formats. Each certificate contains detailed metadata including device identifiers, storage type, applied wipe method, execution logs, timestamps, and cryptographic signatures. This enables both operational confirmation and long-term auditability.\n\n" +
          "To eliminate the risk of certificate tampering or forgery, OctaWipe introduces an additional immutable trust layer using blockchain anchoring. Rather than storing full certificates on-chain, cryptographic hashes of the signed wipe reports are anchored to a distributed ledger. This design preserves privacy while ensuring that any future alteration of a certificate can be independently detected.\n\n" +
          "By decoupling verification from centralized servers, the system avoids single points of failure and long-term dependency risks. The result is a robust trust architecture where wiping claims can be validated years later, even outside the original operational environment. This layered approach balances transparency, privacy, and durability without introducing unnecessary blockchain overhead."
      },
      {
        id: "standards",
        title: "Standards Compliance",
        image: "/images/octawipe/standards.webp",
        content:
          "OctaWipe adheres strictly to globally recognized data sanitization standards, including NIST 800-88, DoD 5220.22-M (E), and DoD 5220.22-M (ECE). These standards ensure that data is rendered unrecoverable using both software-based and forensic techniques, making the solution suitable for regulated industries."
      },
      {
        id: "novelty",
        title: "Novelty & Innovation",
        image: "/images/octawipe/novelty.webp",
        content:
          "OctaWipe's novelty lies not in inventing new wiping algorithms, but in integrating existing, proven techniques into a cohesive, verifiable system. The combination of PXE-based bulk wiping, storage-aware sanitization methods, and cryptographically verifiable certificates is rarely seen in a single platform. Most existing tools focus either on wiping or reporting; OctaWipe treats verification as a first-class system component. This integration-first design enables scalability, auditability, and trust without sacrificing usability, making the solution suitable for both enterprise and field deployment scenarios."
      },
      {
        id: "impact-future",
        title: "Impact, Benefits & Future Scope",
        image: "/images/octawipe/future.webp",
        content:
          "OctaWipe addresses a critical trust deficit in the IT asset disposal and reuse lifecycle. By providing verifiable, tamper-resistant proof of data destruction, the system enables devices to be safely resold, refurbished, or recycled without fear of residual data leakage. This directly reduces unnecessary hardware disposal and supports circular economy practices, particularly in regions facing severe e-waste challenges.\n\n" +
          "For enterprises, OctaWipe significantly lowers compliance risk and operational overhead during large-scale decommissioning workflows. Automated verification, bulk wiping via PXE, and standardized certification streamline audit readiness and reduce reliance on manual reporting. For individuals and e-waste handlers, the system restores confidence that sensitive personal or organizational data has been permanently erased using recognized standards.\n\n" +
          "Looking ahead, future development will focus on deeper automation, intelligence, and ecosystem integration. Planned enhancements include policy-driven wipe recommendations based on device type, storage technology, and regulatory context, as well as tighter integration with enterprise asset management and ITSM systems. Expanded support for mobile, embedded, and IoT-class devices will further broaden applicability.\n\n" +
          "Long-term, OctaWipe has the potential to evolve into a standardized trust layer for device lifecycle management—bridging data security, compliance, and sustainable hardware reuse. By extending verification beyond the moment of wiping and into the lifetime of the asset, the system can help redefine how organizations think about digital trust in physical infrastructure."
      }
    ]
  }

  // Add more projects here
];