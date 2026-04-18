# NTD Portfolio - Senior Android Architect

A minimalist, high-fidelity personal portfolio showcasing a decade of expertise in scalable Android engineering and professional system architecture.

## 🚀 Live Demo
- **URL**: [https://namtrandev.github.io/Portfolio/]

---

## ✨ Features

- **Dynamic Data Architecture**: Content is entirely decoupled from the view layer, driven by localized JSON files for easy updates.
- **Multi-language Support (i18n)**: Seamless real-time switching between English and Vietnamese.
- **High-Fidelity Design**: A premium "Technical Minimalist" aesthetic featuring:
    - Custom editorial grid layouts.
    - Fluid typography (Scale-aware).
    - Smooth scroll-snap section transitions.
- **Responsive & Performant**: Lightweight Vanilla JS/CSS implementation ensuring maximum performance and SEO readiness.
- **Project Showcase**: Detailed project cards with specific tech-stack highlights and interactive "View" logic.

---

## 🛠 Tech Stack

- **Core**: HTML5, Vanilla CSS3, JavaScript (ES6+)
- **Architecture**: JSON-driven Dynamic Rendering
- **Design System**: Custom system inspired by high-end minimalist interfaces.
- **Icons & Fonts**: Google Fonts (Inter), Material Symbols.

---

## 📂 Directory Structure

```text
.
├── assets/
│   ├── css/            # Core styling and design tokens
│   ├── js/             # Application logic and rendering engine
│   ├── data/           # Localization files (en.json, vi.json)
│   └── images/         # Static assets and project screenshots
├── index.html          # Main entry point
└── README.md           # Project documentation
```

---

## ⚙️ Installation & Local Development

### Prerequisites
- A local web server is required to fetch localization data (due to CORS policy on `file://` protocol).

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NamTranDev/Portfolio.git
   cd Portfolio
   ```

2. **Start a local server:**

   **Using Python (Recommended):**
   ```bash
   python3 -m http.server 8000
   ```

   **Using Node.js (serve):**
   ```bash
   npx serve .
   ```

3. **Access the site:**
   Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## ✉️ Contact

- **Name**: Nam Tran (NTD)
- **Role**: Senior Android Engineer
- **Email**: [namtrandev09061992@gmail.com](mailto:namtrandev09061992@gmail.com)
- **LinkedIn**: [https://www.linkedin.com/in/tr%E1%BA%A7n-nam-abb185119/]

---

Developed with ❤️ by **NTD**.
