// src/data/projectsData.js

export const projectsData = [
 {
  id: "ai-motion-tracker",
  title: "Real-Time AI Motion Detection & Tracking System",
  category: "Computer Vision / Systems Engineering",
  year: "2025",
  thumbnail: "/images/ai-vision/thumb.webp",
  heroImage: "/images/ai-vision/hero.webp",
  sections: [

    {
      id: "overview",
      title: "Overview",
      image: "/images/ai-vision/overview.webp",
      content:
        "This project focuses on designing and implementing a real-time surveillance system capable of detecting, tracking, and analyzing motion in live video streams. By combining deep learning–based object detection (YOLOv8), multi-object tracking (Deep SORT), and motion heatmap analytics, the system transforms raw video feeds into actionable spatial and behavioral insights. The goal was not only accurate detection, but sustained identity tracking, motion pattern visualization, and deployability in real-world environments."
    },
    {
      id: "context",
      title: "Context & Motivation",
      image: "/images/ai-vision/context.webp",
      content:
        "Traditional motion detection systems rely heavily on background subtraction or frame differencing, which often fail in dynamic environments due to lighting changes, shadows, camera noise, and background motion. In modern surveillance scenarios—such as classrooms, corridors, offices, or public spaces—these limitations lead to high false positives and poor situational awareness. This project was motivated by the need for a more intelligent, context-aware system that understands what is moving, where it is moving, and how long it persists in a scene."
    },
    {
      id: "problem",
      title: "The Problem",
      image: "/images/ai-vision/problem.webp",
      content:
        "Most existing real-time surveillance setups either detect motion without semantic understanding or detect objects without long-term tracking and spatial analysis. Systems that perform object detection alone lose identity across frames, while tracking-only systems struggle with occlusion and re-identification. Additionally, many solutions lack visual analytics such as heatmaps that summarize motion behavior over time, making post-event analysis difficult. The challenge was to design a unified pipeline that maintains real-time performance while combining detection, tracking, motion analysis, and visualization."
    },
    {
      id: "goals",
      title: "Design Goals",
      image: "/images/ai-vision/goals.webp",
      content:
        "The system was designed around four core goals: " +
        "(1) Real-time performance on commodity hardware, " +
        "(2) Stable multi-object tracking with minimal ID switches, " +
        "(3) Interpretable motion analytics through heatmaps, " +
        "(4) Modular deployment via a lightweight web interface. " +
        "Every architectural decision—from model selection to visualization—was evaluated against these constraints."
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
        "YOLOv8 (nano variant) was selected for its anchor-free architecture and favorable speed–accuracy tradeoff. The model performs object localization and classification in a single forward pass, making it well suited for real-time inference. Pretrained COCO weights were used to reliably detect humans and common objects without the need for custom dataset training. Confidence thresholding was applied to reduce false positives while maintaining recall in crowded scenes."
    },
    {
      id: "tracking",
      title: "Multi-Object Tracking & Identity Preservation",
      image: "/images/ai-vision/tracking.webp",
      content:
        "To maintain consistent identities across frames, Deep SORT was integrated on top of YOLOv8 detections. Deep SORT combines motion prediction via Kalman filters with appearance-based embeddings and Hungarian matching for data association. This approach significantly reduces ID switches during occlusions and re-entries, allowing the system to reason about object persistence, loitering behavior, and movement trajectories over time."
    },
    {
      id: "motion-analysis",
      title: "Motion Analysis & Heatmap Generation",
      image: "/images/ai-vision/heatmap.webp",
      content:
        "Beyond detection and tracking, the system introduces a motion heatmap layer that accumulates spatial activity over time. Each tracked object contributes to a floating-point heatmap matrix corresponding to its bounding box region. Over successive frames, frequently traversed areas emerge as high-intensity regions. This transforms frame-by-frame motion into a persistent spatial summary, enabling rapid identification of hotspots, blind spots, and behavioral patterns without replaying raw video."
    },
    {
      id: "threat-logic",
      title: "Behavioral Analysis & Threat Logic",
      image: "/images/ai-vision/threat-logic.webp",
      content:
        "A rule-based threat assessment layer was implemented on top of tracking and heatmap data. Objects that persist within a confined spatial region beyond a temporal threshold are flagged as potential loitering events. Similarly, repeated traversal through high-density heatmap regions increases contextual risk scores. While intentionally simple, this layer demonstrates how low-level vision outputs can be elevated into interpretable security signals."
    },
    {
      id: "deployment",
      title: "Deployment & Web Interface",
      image: "/images/ai-vision/deployment.webp",
      content:
        "To ensure accessibility and ease of deployment, the system was wrapped in a Flask-based web server. Video streams with overlaid detections, track IDs, and heatmaps are served via a browser-compatible MJPEG feed. Additional API endpoints expose motion and threat status in JSON format, allowing integration with dashboards or external systems. The project was validated both locally and in GPU-enabled cloud environments such as Google Colab."
    },
    {
      id: "results",
      title: "Results & Performance",
      image: "/images/ai-vision/results.webp",
      content:
        "On GPU-backed environments, the system consistently achieved 35–45 FPS while maintaining stable tracking and responsive heatmap updates. Detection precision exceeded 85% for human subjects in controlled scenes, with low ID-switch rates even under partial occlusion. On CPU-only systems, performance degraded gracefully to 7–10 FPS, demonstrating practical usability beyond high-end hardware."
    },
    {
      id: "limitations",
      title: "Limitations",
      image: "/images/ai-vision/limitations.webp",
      content:
        "While effective, the system relies on rule-based threat logic, which can produce false positives in ambiguous scenarios. Heatmap accumulation currently lacks temporal decay, potentially overemphasizing historical motion. Additionally, performance is bounded by detector accuracy and camera placement. These limitations were accepted tradeoffs to preserve interpretability and real-time responsiveness."
    },
    {
      id: "future",
      title: "Future Directions",
      image: "/images/ai-vision/future.webp",
      content:
        "Future iterations could incorporate learned anomaly detection models, such as autoencoders or temporal CNNs, to replace heuristic threat logic. Temporal decay and semantic zone modeling would further refine heatmap analytics. Edge deployment optimization and multi-camera fusion represent natural extensions of the current architecture."
    },
    {
      id: "impact",
      title: "Impact",
      image: "/images/ai-vision/impact.webp",
      content:
        "This project demonstrates how modern computer vision systems can move beyond raw detection toward interpretable, deployable surveillance intelligence. By integrating detection, tracking, motion analytics, and visualization into a single pipeline, the system provides a foundation for real-world monitoring applications that value both performance and human interpretability."
    }
  ],
  }
,
  
 {
  id: "octawipe",
  title: "OctaWipe — Secure Data Sanitization",
  category: "System Security / Data Sanitization",
  year: "2025",
  thumbnail: "/images/octawipe/thumb.webp",
  heroImage: "/images/octawipe/hero.webp",
  sections: [
    {
      id: "overview",
      title: "Overview",
      image: "/images/octawipe/overview.webp",
      content:
        "OctaWipe is a secure, cross-platform data sanitization system designed to enable safe IT asset recycling and reuse. Built in alignment with international data destruction standards, the system provides a one-click, user-friendly interface for securely erasing data from storage devices while ensuring forensic unrecoverability. The solution targets individuals, enterprises, and e-waste processors seeking trustworthy and verifiable data wiping mechanisms."
    },
    {
      id: "context",
      title: "Context & Motivation",
      image: "/images/octawipe/context.webp",
      content:
        "India faces a rapidly growing e-waste crisis, with millions of devices hoarded or discarded due to concerns over residual data exposure. Existing data wiping tools are often fragmented, OS-dependent, or technically inaccessible to non-expert users. This gap creates both privacy risks and barriers to sustainable device reuse. OctaWipe was conceived to provide a simple yet standards-compliant solution that lowers the barrier to secure data destruction."
    },
    {
      id: "problem",
      title: "The Problem",
      image: "/images/octawipe/problem.webp",
      content:
        "Most current data wiping solutions lack ease of use, cross-platform compatibility, or independent verification of successful sanitization. Users are forced to trust opaque processes without proof of compliance. Additionally, enterprise-scale environments struggle with bulk wiping across large fleets of devices, while forensic recoverability remains a persistent concern—especially for SSDs and NVMe storage."
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
      id: "verification",
      title: "Verification & Digital Certification",
      image: "/images/octawipe/certification.webp",
      content:
        "Post-sanitization, OctaWipe performs verification checks to ensure compliance with selected standards. The system automatically generates digitally signed wiping certificates in PDF and JSON formats. These certificates include device identifiers, wipe method, timestamped logs, and cryptographic signatures, enabling auditability and trust."
    },
    {
      id: "blockchain",
      title: "Tamper-Proof Certificate Layer",
      image: "/images/octawipe/blockchain.webp",
      content:
        "The blockchain layer in OctaWipe serves as an immutable trust anchor rather than a transactional system. Instead of storing full certificates on-chain, cryptographic hashes of digitally signed wipe reports are anchored to a distributed ledger. This design ensures that certificate integrity can be independently verified at any point in the future without exposing sensitive device metadata. By decoupling verification from centralized servers, the system eliminates single points of failure and reduces the risk of forged or altered wipe reports. This approach balances transparency, privacy, and long-term auditability while avoiding unnecessary blockchain overhead."
    },
    {
      id: "standards",
      title: "Standards Compliance",
      image: "/images/octawipe/standards.webp",
      content:
        "OctaWipe adheres strictly to globally recognized data sanitization standards, including NIST 800-88, DoD 5220.22-M (E), and DoD 5220.22-M (ECE). These standards ensure that data is rendered unrecoverable using both software-based and forensic techniques, making the solution suitable for regulated industries."
    },
    {
      id: "impact",
      title: "Impact & Benefits",
      image: "/images/octawipe/impact.webp",
      content:
       "OctaWipe addresses a critical trust gap in the IT asset disposal lifecycle. By providing verifiable proof of data destruction, the system enables devices to be safely resold, refurbished, or recycled without fear of residual data leakage. This directly reduces unnecessary hardware disposal and supports circular economy practices. For enterprises, OctaWipe lowers compliance risk and operational overhead in large-scale decommissioning workflows. For individuals and e-waste handlers, it restores confidence that sensitive personal or organizational data is permanently erased. The net impact is both environmental sustainability and improved data security hygiene."
    },
    {
      id: "novelty",
      title: "Novelty & Innovation",
      image: "/images/octawipe/novelty.webp",
      content:
        "OctaWipe’s novelty lies not in inventing new wiping algorithms, but in integrating existing, proven techniques into a cohesive, verifiable system. The combination of PXE-based bulk wiping, storage-aware sanitization methods, and cryptographically verifiable certificates is rarely seen in a single platform. Most existing tools focus either on wiping or reporting; OctaWipe treats verification as a first-class system component. This integration-first design enables scalability, auditability, and trust without sacrificing usability, making the solution suitable for both enterprise and field deployment scenarios."
    },
    {
      id: "future",
      title: "Future Scope",
      image: "/images/octawipe/future.webp",
      content:
        "Future development of OctaWipe will focus on strengthening automation, intelligence, and interoperability. Planned extensions include policy-driven wipe recommendations based on device type and regulatory context, tighter integration with enterprise asset management systems, and expanded support for mobile and embedded devices. Introducing controlled temporal decay and forensic verification layers could further enhance post-wipe assurance. Long-term, the system could evolve into a standardized trust layer for device lifecycle management, bridging the gap between data security, compliance, and sustainable hardware reuse."
    }
  ]
},


  // Add more projects here
];