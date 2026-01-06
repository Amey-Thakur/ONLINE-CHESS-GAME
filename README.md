<div align="center">

  <a name="readme-top"></a>
  # Online Chess Game

  [![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)
  ![Status](https://img.shields.io/badge/Status-Completed-success)
  [![Technology](https://img.shields.io/badge/Technology-Node.js%20%7C%20Express%20%7C%20Socket.IO-blueviolet)](https://github.com/Amey-Thakur/ONLINE-CHESS-GAME)
  [![Developed by Amey Thakur & Mega Satish](https://img.shields.io/badge/Developed%20by-Amey%20Thakur%20%26%20Mega%20Satish-blue)](https://github.com/Amey-Thakur/ONLINE-CHESS-GAME)

  A real-time multiplayer chess application featuring instant move synchronization, in-game chat, and AI integration, designed with a focus on human-computer interaction principles.

  **[Source Code](Source%20Code/)** &nbsp;&middot;&nbsp; **[Technical Specification](docs/SPECIFICATION.md)** &nbsp;&middot;&nbsp; **[Video Demo](https://youtu.be/CCbrTQwYyE8)**

  [![Online Chess Game Demo](https://img.youtube.com/vi/CCbrTQwYyE8/0.jpg)](https://youtu.be/CCbrTQwYyE8)

</div>

---

<div align="center">

  [Authors](#authors) &nbsp;·&nbsp; [Overview](#overview) &nbsp;·&nbsp; [Features](#features) &nbsp;·&nbsp; [Structure](#project-structure) &nbsp;·&nbsp; [Quick Start](#quick-start) &nbsp;·&nbsp; [Usage Guidelines](#usage-guidelines) &nbsp;·&nbsp; [License](#license) &nbsp;·&nbsp; [About](#about-this-repository) &nbsp;·&nbsp; [Acknowledgments](#acknowledgments)

</div>

---

<!-- AUTHORS -->
<div align="center">

  ## Authors

  **Terna Engineering College | Computer Engineering | Batch of 2022**

  <table>
  <tr>
  <td align="center">
  <a href="https://github.com/Amey-Thakur">
  <img src="https://github.com/Amey-Thakur.png" width="150px;" alt="Amey Thakur"/><br />
  <sub><b>Amey Thakur</b></sub>
  </a>
  </td>
  <td align="center">
  <a href="https://github.com/msatmod">
  <img src="https://raw.githubusercontent.com/Amey-Thakur/ONLINE-CHESS-GAME/main/Mega/Mega.png" width="150px;" alt="Mega Satish"/><br />
  <sub><b>Mega Satish</b></sub>
  </a>
  </td>
  </tr>
  </table>

  *Special thanks to [Mega Satish](https://github.com/msatmod) for her meaningful contributions, guidance, and support that helped shape this work.*

</div>

---

<!-- OVERVIEW -->
## Overview

This project involves the development of a sophisticated **Online Chess Game**, engineered as a comprehensive case study in interactive system design and user-centric architecture. The implementation prioritizes fundamental Human-Machine Interaction (HMI) principles, specifically focusing on **direct manipulation** and **immediate visual feedback** to ensure a seamless mental model for the user.

The system leverages a responsive design framework to maintain interaction consistency across diverse device orientations. At its core, the application integrates complex algorithmic structures for **real-time move validation** and state management, demonstrating the practical application of usability engineering metrics. This project serves as an exploration into the synergy between high-performance back-end logic and intuitive front-end layouts, aiming to optimize the overall **User Experience (UX)** through iterative design and evaluation.

> [!IMPORTANT]
> **Academic Context**
>
> This project was developed as a **Mini-Project** for the **Human-Machine Interaction Laboratory**, exploring the practical application of usability principles in game design. The scholarly documentation is archived on **ResearchGate**.
>
> - [Technical Report @ResearchGate](https://doi.org/10.13140/RG.2.2.28183.85920)
> - [Project Presentation @ResearchGate](https://doi.org/10.13140/RG.2.2.21472.97284)

### Resources

| # | Resource | Description | Date | Marks | Link |
|---|---|---|---|---|---|
| 1 | **Project Presentation** | Visual demonstration and slides | May 2022 | 9/10 | [View](Mini-Project/HMI_MINI_PROJECT_PRESENTATION_BE_COMPS_B-50,51,58.pdf) |
| 2 | **Project Report** | Detailed project documentation | May 2022 | 9/10 | [View](Mini-Project/HMI_MINI_PROJECT_REPORT_BE_COMPS_B-50,51,58.pdf) |
| 3 | **Project Repository** | Complete source code and documentation | May 2022 | — | [View](Source%20Code/) |
| 4 | **Project Teams** | Team composition and roles | March 2022 | — | [View](Mini-Project/HMI%20Mini%20Project%20Teams.pdf) |
| 5 | **Project Demo (YouTube)** | Real-time demonstration of features | May 2022 | — | [View](https://youtu.be/CCbrTQwYyE8) |

---

<!-- FEATURES -->
## Features

| Feature | Description |
|---------|-------------|
| **Real-Time Multiplayer** | Full-duplex communication via Socket.IO for instant move synchronization and state updates between remote players. |
| **Integrative Chat System** | Built-in messaging interface allowing seamless social interaction without disrupting gameplay flow. |
| **Game State Logic** | Robust rules enforcement (checkmate, stalemate, castling) powered by a dedicated server-side chess engine. |
| **Responsive Interface** | Adaptive chessboard and UI components that scale effectively across different viewport sizes and devices. |
| **Visual Themes** | customizable board aesthetics providing users with control over their visual environment (HMI Principle). |
| **Single Player AI** | Integrated algorithmic opponent for solo practice and strategy testing. |

### Tech Stack
- **Runtime**: Node.js 14+
- **Framework**: Express 4.x
- **Real-time**: Socket.IO 2.x
- **Frontend**: HTML5, CSS3, jQuery, Chessboard.js
- **Logic**: Chess.js

---

<!-- STRUCTURE -->
## Project Structure

```bash
ONLINE-CHESS-GAME/
│
├── docs/                                          # Formal Documentation
│   └── SPECIFICATION.md                           # Technical Architecture & Spec
│
├── Mega/                                          # Archival Attribution Assets
│   └── Mega.png                                   # Author Profile Image (Mega Satish)
│
├── Mini-Project/                                  # Research, Demos & Training Materials
│   ├── HMI Mini Project Teams.pdf                 # Team Composition Record
│   ├── HMI_MINI_PROJECT_PRESENTATION...pdf        # Technical Presentation (PDF)
│   ├── HMI_MINI_PROJECT_PRESENTATION...pptx       # Technical Presentation (Source)
│   ├── HMI_MINI_PROJECT_REPORT...pdf              # Comprehensive Project Report
│   └── HMI_Mini Project - BE( B ).xlsx            # Raw Team Metadata
│
├── Source Code/                                   # Real-Time Web Application (Node.js)
│   ├── css/                                       # Presentation Layer Stylesheets
│   │   ├── themes/                                # Visual Customization Assets
│   │   ├── chessboard-1.0.0.min.css               # Chessboard Library Styles
│   │   ├── semantic.min.css                       # UI Framework Styles (Semantic UI)
│   │   └── styles.css                             # Application-Specific Styling
│   ├── img/                                       # Graphic & Asset Repository
│   │   └── chesspieces/                           # Sprite Assets for Game Pieces
│   ├── js/                                        # Client-Side Logic & Libraries
│   │   ├── app.js                                 # Frontend Event Handling & Logic
│   │   ├── chessboard-1.0.0.min.js                # Chessboard Interaction Library
│   │   └── semantic.min.js                        # UI Framework Logic (Semantic UI)
│   ├── mp3/                                       # Audio Feedback Assets
│   │   ├── insight.mp3                            # Game Alert Sound
│   │   └── soundMove.mp3                          # Move Confirmation Sound
│   ├── app.js                                     # Server-Side Entry Point (Socket.IO)
│   ├── index.html                                 # Main User Interface Gateway
│   ├── package-lock.json                          # Dependency Version Lockfile
│   └── package.json                               # Network Dependency Manifest
│
├── .gitattributes                                 # Global Git LFS & Config
├── .gitignore                                     # Asset Exclusion Manifest
├── CITATION.cff                                   # Scholarly Citation Metadata
├── codemeta.json                                  # Software Metadata Manifest
├── LICENSE                                        # MIT License Terms
├── README.md                                      # Comprehensive Archival Entrance
└── SECURITY.md                                    # Vulnerability Exposure Policy
```

---

<!-- QUICK START -->
## Quick Start

### 1. Prerequisites
Ensure your local development environment meets the following technical requirements:
- **Runtime Environment**: Node.js **14.x** (LTS) or higher.
- **Package Manager**: npm (v6.x+) for dependency resolution.
- **Browser**: Modern web browser with WebSocket support (Chrome, Firefox, Edge).

### 2. Setup & Deployment
1.  **Repository Cloning**:
    Download the project assets to your local machine:
    ```bash
    git clone https://github.com/Amey-Thakur/ONLINE-CHESS-GAME.git
    cd ONLINE-CHESS-GAME
    ```
2.  **Dependency Resolution**:
    Install the required Node.js packages as defined in the manifest:
    ```bash
    cd "Source Code"
    npm install
    ```

### 3. Execution Integration
1.  **Server Initialization**:
    Launch the backend server to establish the Socket.IO gateway:
    ```bash
    node app.js
    ```
    *The console should indicate: `Server is up on port 3000!`*

2.  **User Interface Access**:
    Open the application in your web browser to initialize the client session:
    -   **Local Gateway**: [http://localhost:3000](http://localhost:3000)

---

<!-- =========================================================================================
                                     USAGE SECTION
     ========================================================================================= -->
## Usage Guidelines

This repository is openly shared to support learning and knowledge exchange across the academic community.

**For Students**
Use this mini-project as a case study for implementing real-time web applications using WebSocket protocols. It demonstrates the practical integration of rule-based logic engines (`Chess.js`) with visual frontend libraries (`Chessboard.js`) within a Node.js environment.

**For Educators**
This project may serve as a practical example for courses covering **Human-Machine Interaction** (`CSC801`) or **Web Technology**. It highlights principles of immediate feedback, error prevention, and user control.

**For Developers**
The codebase provides a foundational structure for multiplayer game servers, event-driven state management, and scalable room orchestration using Socket.IO.

---

<!-- LICENSE -->
## License

This repository and all linked academic content are made available under the **MIT License**. See the [LICENSE](LICENSE) file for complete terms.

> [!NOTE]
> **Summary**: You are free to share and adapt this content for any purpose, even commercially, as long as you provide appropriate attribution to the original author.

Copyright © 2022 Amey Thakur, Mega Satish

---

<!-- ABOUT -->
## About This Repository

**Created & Maintained by**: [Amey Thakur](https://github.com/Amey-Thakur) & [Mega Satish](https://github.com/msatmod)
**Academic Journey**: Bachelor of Engineering in Computer Engineering (2018-2022)
**Institution**: [Terna Engineering College](https://ternaengg.ac.in/), Navi Mumbai
**University**: [University of Mumbai](https://mu.ac.in/)

This repository serves as a permanent technical record for the **Online Chess Game**, developed as an **8th Semester Mini-Project**. It highlights the application of HMI principles in designing interactive, real-time digital systems.

**Connect**: [GitHub](https://github.com/Amey-Thakur) · [LinkedIn](https://www.linkedin.com/in/amey-thakur)

### Acknowledgments

Grateful acknowledgment to **[Mega Satish](https://github.com/msatmod)** for her pivotal role and collaborative excellence during the development of this project. Her intellectual contributions, technical insights, and dedicated commitment to software quality were fundamental in achieving the system's analytical and functional objectives. This technical record serves as a testament to her scholarly partnership and significant impact on the final implementation.

Special thanks to the faculty members of the Department of Computer Engineering for their guidance.

---

<div align="center">

  [↑ Back to Top](#readme-top)

  [Authors](#authors) &nbsp;·&nbsp; [Overview](#overview) &nbsp;·&nbsp; [Features](#features) &nbsp;·&nbsp; [Structure](#project-structure) &nbsp;·&nbsp; [Quick Start](#quick-start) &nbsp;·&nbsp; [Usage Guidelines](#usage-guidelines) &nbsp;·&nbsp; [License](#license) &nbsp;·&nbsp; [About](#about-this-repository) &nbsp;·&nbsp; [Acknowledgments](#acknowledgments)

  <br>

  🧬 **[Human-Machine Interaction Lab](https://github.com/Amey-Thakur/HUMAN-MACHINE-INTERACTION-AND-HUMAN-MACHINE-INTERACTION-LAB)** &nbsp;·&nbsp; ♟️ **[Online Chess Game](https://github.com/Amey-Thakur/ONLINE-CHESS-GAME)**

  ---

  ### Presented as part of the 8th Semester Mini-Project @ Terna Engineering College

  ### 🎓 [Computer Engineering Repository](https://github.com/Amey-Thakur/COMPUTER-ENGINEERING)

  **Computer Engineering (B.E.) - University of Mumbai**

  *Semester-wise curriculum, laboratories, projects, and academic notes.*

</div>
