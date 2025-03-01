# 🌏 LafeAINet-Report

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/TiDB-MySQL%20compatible-4479A1?style=flat-square&logo=mysql" alt="TiDB">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License">
  <br>
  <strong>🏆 Submission for AI for Connectivity Hackathon II: Building Resilient Networks</strong>
</div>

<div align="center">
  <h3>Network connectivity reporting platform for Timor-Leste</h3>
  <h4>Empowering communities with data-driven connectivity insights</h4>
  <p><a href="https://lafeainet-report.vercel.app" target="_blank">View Live Demo →</a></p>
</div>

## 🌟 About LafeAINet-Report

LafeAINet-Report is a user-friendly network quality reporting platform designed specifically for Timor-Leste.

### 💡 Why It Matters

In Timor-Leste, where connectivity is crucial for development but remains challenging across the mountainous terrain:

- **Economic Growth**: Reliable connectivity enables digital business and e-commerce
- **Education Access**: Students need stable internet for remote learning resources
- **Healthcare**: Telemedicine requires dependable networks in remote areas
- **Emergency Response**: Communication networks are vital during natural disasters

## 🚀 Key Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🌡️ Automated Speed Testing</h3>
      <p>Measure download and upload speeds directly in the browser using WebRTC and performance APIs</p>
    </td>
    <td width="50%" valign="top">
      <h3>📍 Location-Based Data</h3>
      <p>Capture geographic coordinates with privacy controls for precise connectivity mapping</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🔍 Provider Detection</h3>
      <p>Automatically detect the user's ISP using open-source geolocation APIs</p>
    </td>
    <td width="50%" valign="top">
      <h3>📱 Mobile-First Design</h3>
      <p>Optimized for smartphones, the primary way most Timorese citizens access the internet</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🔒 Anonymous Reporting</h3>
      <p>Submit reports without requiring registration or personal information</p>
    </td>
    <td width="50%" valign="top">
      <h3>⚡ Offline Support</h3>
      <p>(Coming soon) Submit reports even in areas with intermittent connectivity</p>
    </td>
  </tr>
</table>

## 📊 System Architecture

```mermaid
flowchart TB
    subgraph "Client Layer"
        UI["User Interface (React)"]
        SpeedTest["Speed Test Module"]
        GeoLocation["Geolocation Module"]
        ProviderDetect["ISP Provider Detection"]
    end
    subgraph "Next.js Application"
        ClientComp["Client Components"]
        ServerComp["Server Components"]
        APIRoutes["API Routes"]
    end
    subgraph "Database Layer (TiDB)"
        DB[(TiDB Database)]
        subgraph "Tables"
            Users[("Users")]
            Providers[("Providers")]
            DataPackages[("Data Packages")]
            NetworkReports[("Network Reports")]
            AnalysisResults[("Analysis Results")]

        end
    end
    subgraph "External Services"
        IPAPIs["Open Source IP APIs\n(ip-api.com, ipapi.co, freegeoip.app)"]
    end
    %% Connections between components
    UI --> ClientComp
    SpeedTest --> ClientComp
    GeoLocation --> ClientComp
    ProviderDetect --> IPAPIs
    IPAPIs --> ProviderDetect

    ClientComp --> APIRoutes
    APIRoutes --> ServerComp
    ServerComp --> DB

    %% Database relationships
    DB --> Users
    DB --> Providers
    DB --> DataPackages
    DB --> NetworkReports
    DB --> AnalysisResults

    %% Data flow in detail
    NetworkReports --> AnalysisResults
    Providers --> DataPackages
    Users --> NetworkReports
    Providers --> NetworkReports
    DataPackages --> NetworkReports

    %% Legend/styling
    classDef clientModules fill:#f9d6fe,stroke:#333,stroke-width:1px
    classDef nextServer fill:#d0e8ff,stroke:#333,stroke-width:1px
    classDef database fill:#dbffd6,stroke:#333,stroke-width:1px
    classDef external fill:#ffe9d6,stroke:#333,stroke-width:1px

    class UI,SpeedTest,GeoLocation,ProviderDetect clientModules
    class ClientComp,ServerComp,APIRoutes,Middleware nextServer
    class DB,Users,Providers,DataPackages,NetworkReports,AnalysisResults database
    class IPAPIs external
```

LafeAINet-Report follows a modular architecture focused on performance and usability:

### Client Layer

- **User Interface**: React components optimized for mobile devices
- **Speed Test Module**: Browser-based bandwidth measurement
- **Geolocation Module**: Accurate position data with permission controls
- **ISP Provider Detection**: Automatic carrier identification

### Application Layer

- **Client Components**: Interactive UI elements with state management
- **Server Components**: Efficient data processing and validation
- **API Routes**: Secure endpoints for data submission
- **Middleware**: Request validation and error handling

### Database Layer

- **TiDB Database**: Scalable, MySQL-compatible storage
- **Structured Schema**: Optimized for analytics and AI processing

## 📱 User Experience Flow

```mermaid
flowchart LR
    Start((Start)) --> SpeedTest[Run Speed Test]
    SpeedTest --> Location[Detect Location]
    Location --> Provider[Identify Provider]
    Provider --> Feedback[Collect Feedback]
    Feedback --> Submit[Submit Report]
    Submit --> Confirmation((Complete))

    %% Add descriptions
    SpeedTest -.-> SpeedDesc[Measure download\nand upload speeds]
    Location -.-> LocationDesc[Capture geographic\ncoordinates]
    Provider -.-> ProviderDesc[Detect current ISP\nand data package]
    Feedback -.-> FeedbackDesc[User rates experience\nand adds comments]
    Submit -.-> SubmitDesc[Send data to\nbackend storage]
    Confirmation -.-> ConfirmationDesc[Display success\nand thank user]

    %% Styling
    classDef process fill:#d0e8ff,stroke:#333,stroke-width:1px,rounded
    classDef endpoint fill:#dbffd6,stroke:#333,stroke-width:1px,rounded
    classDef description fill:#f9f9f9,stroke:#999,stroke-width:1px,stroke-dasharray: 5 5,font-style:italic,font-size:12px

    class SpeedTest,Location,Provider,Feedback,Submit process
    class Start,Confirmation endpoint
    class SpeedDesc,LocationDesc,ProviderDesc,FeedbackDesc,SubmitDesc,ConfirmationDesc description
```

1. **Begin Report**: User initiates the network reporting process
2. **Speed Test**: Browser measures download and upload speeds
3. **Location Detection**: Captures geographic coordinates with user permission
4. **Provider Detection**: Identifies the current ISP automatically
5. **User Feedback**: Collects qualitative information about network experience
6. **Data Submission**: Sends the complete report to the database
7. **Confirmation**: Provides successful submission feedback

## 🛠️ Technology Stack

<table align="center">
  <tr>
    <td align="center"><strong>Frontend</strong></td>
    <td align="center"><strong>Backend</strong></td>
    <td align="center"><strong>Infrastructure</strong></td>
  </tr>
  <tr>
    <td>
      • React 19<br>
      • TailwindCSS 3.4.1<br>
      • TypeScript 5.0
    </td>
    <td>
      • Next.js API Routes<br>
      • MySQL2 client<br>
      • Open Source IP APIs
    </td>
    <td>
      • TiDB (MySQL-compatible)<br>
      • Vercel/AWS Hosting<br>
      • GitHub CI/CD
    </td>
  </tr>
</table>

## 🔧 Installation and Setup

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- MySQL-compatible database (TiDB recommended)

### Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/ajitonelsonn/lafeainet-report.git
cd lafeainet-report
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

Create a `.env.local` file with:

```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=db_netrep_tls
DB_PORT=4000
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🌱 The LafeAINet Ecosystem

```mermaid
flowchart TD
    subgraph "LafeAINet Ecosystem"
        LafeAINet["LafeAINet\nCentral Repository"]

        subgraph "Data Collection"
            Report["LafeAINet-Report\nUser-facing app"]
        end

        subgraph "Data Processing"
            Analyzer["LafeAINet-Analyzer\nAI Engine"]
        end

        subgraph "Data Visualization"
            Dashboard["LafeAINet-Dashboard\nInsights Platform"]
        end

        Users["Users in Timor-Leste"] --> Report
        Report --"Network Reports"--> Analyzer
        Analyzer --"Processed Insights"--> Dashboard
        Dashboard --"Feedback"--> Users

        LafeAINet --- Report
        LafeAINet --- Analyzer
        LafeAINet --- Dashboard
    end

    classDef main fill:#f9f,stroke:#333,stroke-width:2px
    classDef collect fill:#bbf,stroke:#333,stroke-width:1px
    classDef process fill:#bfb,stroke:#333,stroke-width:1px
    classDef visual fill:#fbf,stroke:#333,stroke-width:1px
    classDef user fill:#fbb,stroke:#333,stroke-width:1px

    class LafeAINet main
    class Report collect
    class Analyzer process
    class Dashboard visual
    class Users user
```

LafeAINet-Analyzer is part of a larger initiative to improve connectivity in Timor-Leste:

- **[LafeAINet](https://github.com/ajitonelsonn/LafeAINet)**: Main repository for the complete ecosystem
- **[LafeAINet-Report](https://github.com/ajitonelsonn/lafeainet-report)**: User-facing app for collecting network reports (this repo)
- **[LafeAINet-Analyzer](https://github.com/ajitonelsonn/lafeainet-analyzer)**: AI engine for processing network data
- **[LafeAINet-Dashboard](https://github.com/ajitonelsonn/lafeainet-dashboard)**: Visualization platform for network insights

## 💡 Real-World Impact

<table>
  <tr>
    <td width="33%" align="center">
      <h3>📊 Data-Driven Planning</h3>
      <p>Enables evidence-based infrastructure investment by telecommunications companies</p>
    </td>
    <td width="33%" align="center">
      <h3>🧩 Gap Identification</h3>
      <p>Highlights underserved areas requiring urgent connectivity improvement</p>
    </td>
    <td width="33%" align="center">
      <h3>📈 Service Improvement</h3>
      <p>Provides feedback to providers for targeted network enhancements</p>
    </td>
  </tr>
</table>

## 🔒 Privacy & Security

LafeAINet-Report prioritizes user privacy:

- **Anonymity**: No personal information or registration required
- **Transparency**: Clear data usage policy displayed before submission
- **Location Control**: Geographic coordinates only collected with explicit permission
- **Data Purpose**: All information used solely for network improvement
- **No Tracking**: No advertising or behavioral tracking implemented

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/ajitonelsonn">
        <img src="https://github.com/ajitonelsonn.png" width="100px;" alt=""/>
        <br />
        <sub><b>Ajito Nelson</b></sub>
      </a>
    </td>
  </tr>
</table>

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built with 💙 for improving connectivity in Timor-Leste</p>
  <p>
    <a href="https://lablab.ai/event/ai-for-connectivity-hackathon-building-resilient-networks">AI for Connectivity Hackathon II</a>
    •
    <a href="https://github.com/ajitonelsonn/LafeAINet">LafeAINet Ecosystem</a>
    •
    <a href="https://lafeainet-report.vercel.app">Live Demo</a>
  </p>
</div>
