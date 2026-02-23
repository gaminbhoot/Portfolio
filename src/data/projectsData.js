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
          "This project focuses on the design and development of a real-time video surveillance system with the capability of detecting, tracking, and analyzing movement in real-time video feeds. The project integrates object detection using deep learning algorithms (YOLOv8), tracking of multiple objects (Deep SORT), and movement heatmap analytics. The project's aim goes beyond object detection; it also focuses on tracking moving objects, visualization of movement, and practical application in real-world scenarios."
      },
      {
        id: "problem",
        title: "Problem Statement & Motivation",
        image: "/images/ai-vision/problem.webp",
        content:
          "Traditional motion detection systems rely heavily on background subtraction or frame differencing, which are ineffective under changing conditions of illumination, shadows, camera noise, and background movement. In practical surveillance scenarios, such as corridors, classrooms, offices, or public areas, these systems lead to high false positives and low situational awareness. Simultaneously, there are numerous modern systems that detect objects but do not track them over time, causing loss of identity, and systems that track but do not understand the semantics of the scene. The need for this project was to develop a unified system that can detect what is moving, where it is moving, and for how long, with high performance."
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
          "All architectural decisions from model selection to visualization were evaluated against these constraints."
      },
      {
        id: "architecture",
        title: "System Architecture",
        image: "/images/ai-vision/architecture.webp",
        content:
          "The pipeline follows a modular and sequential structure. The video frames received are first processed by the YOLOv8 model to detect objects in the video feed. The detected objects' bounding boxes are then fed into the Deep SORT model, which utilizes Kalman filtering and appearance embeddings to keep track of the objects' identities over time. The tracking information is then used to construct a cumulative heatmap representing the areas with the most movement. Finally, the video feed and other relevant information are streamed in real time via a Flask-based web interface."
      },
      {
        id: "detection",
        title: "Object Detection Strategy",
        image: "/images/ai-vision/detection.webp",
        content:
          "For the purpose of object localization and classification in a single pass, the YOLOv8 model's nano variant was selected for its advantageous balance of speed and accuracy. Additionally, the model's ability to utilize the COCO weights for the detection of human objects without the need for training on a custom dataset was a major consideration. A confidence threshold was also used for filtering out low-confidence detections."
      },
      {
        id: "tracking",
        title: "Multi-Object Tracking & Identity Preservation",
        image: "/images/ai-vision/tracking.webp",
        content:
          "In order to maintain consistent identity in each frame, Deep SORT was integrated with YOLOv8. Deep SORT makes use of Kalman Filter-based motion prediction in combination with appearance-based embeddings and Hungarian matching. This significantly reduces identity swaps during occlusions and re-entries. This allows reasoning about object persistence, loitering, and movement."
      },
      {
        id: "motion-analysis",
        title: "Motion Analysis & Heatmap Generation",
        image: "/images/ai-vision/heatmap.webp",
        content:
          "Apart from mere detection and tracking, the system also introduces a motion heatmap layer. In this case, spatial activities are accumulated over a certain period of time. The detected objects contribute to a floating-point heatmap grid in proportion to their centroid position. Over a series of frames, areas with frequent traversal are identified as hotspots. This provides an interpretable visualization of movement patterns, which can be useful for security monitoring, space utilization analysis, or behavioral insights."
      },
      {
        id: "threat-logic",
        title: "Behavioral Analysis & Threat Logic",
        image: "/images/ai-vision/threat-logic.webp",
        content:
          "A lightweight rule-based behavior analysis was also implemented on top of tracking and motion information. Objects that remain in a confined region of space after a temporal threshold are identified as possible loitering behavior. This temporal persistence-based approach prioritizes interpretability over more sophisticated learned models, demonstrating the power of low-level vision features in being promoted to security relevance."
      },
      {
        id: "deployment",
        title: "Deployment & Web Interface",
        image: "/images/ai-vision/deployment.webp",
        content:
          "The system can be deployed through a web server based on Flask, which sends a browser-compatible video stream with real-time overlays for detections, tracking IDs, and heatmaps. Other endpoints provide JSON-based access to motion statistics and alert states through REST APIs. The validation of the system was done through local environments and GPU-enabled cloud environments."
      },
      {
        id: "results",
        title: "Results & Performance Evaluation",
        image: "/images/ai-vision/results.webp",
        content:
          "The performance of the system was also tested under real-time conditions in the absence of ground truth annotations. In the GPU-backed environment, the system was able to provide stable performance with a frame rate between 12 FPS and 18 FPS, with end-to-end latency between 90 ms and 130 ms. The difference in latency was mostly because of the transmission aspect. The inference latency was consistently low at around 25-35 ms per frame. The confidence in person detection was also analyzed, which revealed that most of the detection confidence was above 0.70. Loitering detection was also found to happen after temporal persistence."
      },
      {
        id: "limitations",
        title: "Limitations",
        image: "/images/ai-vision/limitations.webp",
        content:
          "The system also uses heuristic, rule-based behavioral logic, which can sometimes result in false positives in uncertain or highly congested scenes. The accumulation of the heatmap does not currently have temporal decay, which could result in over-weighting past movement. The performance of the system also depends on the location of the cameras, the density of the scenes, and the accuracy of the detectors. These limitations were necessary to ensure interpretability and real-time responsiveness."
      },
      {
        id: "future",
        title: "Future Directions & Impact",
        image: "/images/ai-vision/future.webp",
        content:
          "The upcoming versions of this approach could replace heuristic threat logic with learned temporal anomaly detection models. The addition of temporal decay and semantic zoning would further improve heatmap analytics. Finally, it is important to note that this project shows how existing computer vision pipelines can be used to improve surveillance intelligence from raw detection to something deployable and interpretable, thereby building a solid base for surveillance intelligence."
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
          "OctaWipe provides a secure and cross-platform solution for data erasure that can be used to promote safe IT asset recycling and reuse. The OctaWipe system was developed in accordance with various international standards on data destruction and provides a one-click user interface for secure data erasure from storage devices while ensuring forensic unrecoverability. The OctaWipe solution targets various users, including individuals, enterprises, and e-waste processors who require secure and verifiable wiping methods for their data."
      },
      {
        id: "context-problem",
        title: "Context, Motivation & Problem Statement",
        image: "/images/octawipe/problem.webp",
        content:
          "The problem of e-waste is growing at a very fast rate in India, with millions of devices being stored or discarded early because of the fear of exposing the data. Many people, organizations, and recycling centers avoid reselling or reusing these devices because they cannot ensure the complete removal of the sensitive information. The current methods of removing data are highly fragmented, platform-dependent, and require technical expertise, which is a major hindrance.\n\n" +
          "Currently, the greater part of the prevailing data destruction solutions is suffering from the aforementioned systemic issues. A substantial number of the solutions lack cross-platform compatibility, making them impractical and ineffective in heterogeneous environments. Others lack independent and verifiable evidence of sanitization, making the user and organization in question forced to employ an opaque wiping process without guarantees.\n\n" +
          "In large-scale enterprise settings, there are additional issues that come into play to efficiently sanitize a large number of devices. Bulk wiping a large number of devices can be a slow and laborious process. The problem is further compounded by modern storage media, such as SSDs and NVMe drives, where traditional overwriting methods do not suffice and forensic recoverability is a valid concern. OctaWipe was developed to address the usability, scale, verification, and trust issues within a single standards-based solution."
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
          "OctaWipe has a modular architecture that uses a boot-independent wiping environment. Its operation starts by using a web-based or local portal, followed by a bootable execution using USB, ISO, and PXE Network Boot. Once executed, the device detects the storage devices, applies the wiping method, and then creates a digitally signed certificate that includes the logs and the metadata."
      },
      {
        id: "sanitization",
        title: "Disk Detection & Sanitization Engine",
        image: "/images/octawipe/sanitization.webp",
        content:
          "Essentially, the core idea behind OctaWipe is the implementation of various sanitization methods, depending on the storage devices being used. For instance, when dealing with HDD devices, the tool supports both multi-pass and single-pass overwriting using the shred method. On the other hand, the tool uses ATA Secure Erase, blkdiscard, nvme-cli, and even cryptographic erase methods when dealing with SSD and NVMe devices. The tool also supports the wiping of HPA and DCO sectors."
      },
      {
        id: "boot",
        title: "Bootable & Network Deployment",
        image: "/images/octawipe/boot.webp",
        content:
          "To overcome the OS dependency, OctaWipe supports execution on Live USB, ISO, and PXE Network Boot. The advantage of using PXE Boot is that it allows one-click wiping of multiple machines, which is especially useful for enterprises and e-waste recycling centers. The execution environment is provided by Ubuntu 24.04 LTS."
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
          "OctaWipe adheres strictly to globally recognized data sanitization standards, including NIST 800-88, DoD 5220.22-M (E), and DoD 5220.22-M (ECE). These standards ensure that data is rendered unrecoverable using both software based and forensic techniques, making the solution suitable for regulated industries."
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