# Kaushal Wani — Personal Developer Portfolio

A modern, fast, accessible, and fully responsive developer portfolio built for **Kaushal Wani**, an engineering student and aspiring Full-Stack Developer at JSPM's Rajarshi Shahu College of Engineering (RSCOE), Pune.

---

## 📁 Project Structure

```text
portfolio_kaushalwani/
├── index.html                 # Main portfolio page containing all 10 required sections
├── 404.html                   # Custom branded 404 error page for static hosting
├── README.md                  # Complete documentation and deployment guide
├── css/
│   └── style.css              # Custom CSS design system, dark/light themes, glassmorphism, ATS resume print styles
├── js/
│   └── main.js                # Theme toggle, typing effect, scroll progress, lightbox modal, ATS PDF resume generation
└── assets/
    ├── img/
    │   ├── profile.jpg        # Kaushal Wani's professional profile photo
    │   ├── favicon.svg        # Clean vector brand favicon
    │   ├── wanderlust_banner.svg # Vector project preview for Wanderlust
    │   └── sih_banner.svg     # Vector preview for Smart India Hackathon
    ├── certs/
    │   ├── nptel_python_data_science.png # Elite Certificate (NPTEL, IIT Madras)
    │   ├── claude_anthropic.png          # Claude with Anthropic API Certificate
    │   ├── nptel_soft_skills.png         # Soft Skills Certificate (NPTEL, IIT Kanpur)
    │   └── acbs_appointment_letter.jpg   # Official ACBS Digital Team Appointment Letter
    └── docs/                  # Reserved for additional documents & PDF copies
```

---

## 🚀 How to Run Locally

Because this project is built using vanilla HTML5, CSS3, and JavaScript, **no heavy frameworks or build steps (npm, webpack) are required**.

### Option A: Open directly in your browser
Simply double-click `index.html` or right-click and choose **Open with > Chrome / Edge / Firefox**.

### Option B: Using VS Code Live Server (Recommended)
1. Open VS Code.
2. Open the `portfolio_kaushalwani` folder.
3. Install the **Live Server** extension (by Ritwick Dey) if you haven't already.
4. Click **Go Live** at the bottom-right corner of VS Code, or right-click `index.html` and click **Open with Live Server**.

### Option C: Using Python
If you have Python installed, open PowerShell or Terminal in this folder and run:
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your web browser.

---

## ✨ Features & Architecture

1. **Honest & Genuine Representation**:
   - Accurately portrays Kaushal as an engineering student actively learning web development and Data Structures & Algorithms in Java.
   - Avoids inflated titles like "expert" or "senior developer".

2. **Ordered Sections**:
   1. **Hero**: Animated typing roles (`Aspiring Full-Stack Developer | Engineering Student | Learning Web Development | Java & DSA Learner`), introduction, "Download Resume", "View Projects", "Contact Me", and social links.
   2. **About Me**: Narrative of learning journey, personal details, mission statement, languages known (English, Japanese, Hindi/Marathi), and volleyball sportsmanship.
   3. **Education**: JSPM RSCOE Pune (Current CGPA: 8.39, Sem IV SGPA: 8.55), DDSP College (12th: 83%), Podar International School (10th: 84%).
   4. **Skills**: Categorized cards without misleading percentages (Java, Python, JavaScript, C++, C, HTML5, CSS3, EJS, MySQL, Git, GitHub, VS Code) + featured **Currently Learning: Java DSA** card.
   5. **Projects**: Wanderlust (Full-Stack MVC stay-listing web app, In Progress) and Smart India Hackathon (Institutional Round Selected).
   6. **Coding Profile**: Featured LeetCode profile card (`@kaushalwani`), GitHub, and LinkedIn links.
   7. **Experience & Leadership**: Timeline with PDC Cell Co-Lead and ACBS Digital Team Member (with interactive high-resolution lightbox for the appointment letter).
   8. **Certifications**: Filterable grid ("All", "Technical", "Soft Skills") featuring verified NPTEL and Anthropic certificates with lightbox previews and verification links.
   9. **Contact**: Preserved email (`kaushalrw34@gmail.com`), location, and contact form with mailto fallback and optional Formspree integration.
   10. **Footer**: Dynamic year generation and quick navigation links.

3. **One-Page ATS-Friendly Resume PDF**:
   - Clicking **Download Resume** uses `html2pdf.js` to generate a single-page A4 PDF (`Kaushal_Wani_Resume.pdf`).
   - ATS-friendly single-column layout, dark text on white, standard margins, no photos, and pure text selectable.
   - Includes `@media print` fallback for seamless printing (`Ctrl + P`).

---

## 🛠️ How to Customize & Add Content

### 1. Adding a New Project
In `index.html`, inside `<div class="projects-grid">`, copy and paste a project card template:
```html
<article class="project-card">
  <div class="project-media-wrapper">
    <img src="assets/img/your-project-preview.png" alt="Project Name" class="project-img" loading="lazy">
    <span class="badge badge-primary project-status-badge">Completed / In Progress</span>
  </div>
  <div class="project-body">
    <h3 class="project-title">Your Project Title</h3>
    <p class="project-description">Describe the application and purpose.</p>
    <div class="project-tech-stack">
      <span class="tech-chip"><i class="fab fa-js"></i> Tech 1</span>
      <span class="tech-chip"><i class="fas fa-database"></i> Tech 2</span>
    </div>
    <div class="project-links">
      <a href="YOUR_GITHUB_REPO_URL" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
        <i class="fab fa-github"></i> GitHub
      </a>
    </div>
  </div>
</article>
```

### 2. Adding a New Certificate
In `index.html`, inside `<div class="certs-grid">`:
```html
<article class="cert-card" data-category="technical"> <!-- or soft-skills -->
  <div class="cert-thumb-container" 
       data-lightbox-src="assets/certs/your-certificate.png" 
       data-lightbox-title="Certificate Name">
    <img src="assets/certs/your-certificate.png" alt="Certificate Name" class="cert-img" loading="lazy">
    <div class="cert-overlay-view"><i class="fas fa-search-plus"></i> View Certificate</div>
  </div>
  <div class="cert-body">
    <div class="cert-top-meta">
      <span class="cert-issuer">Issuer Name</span>
      <span class="badge badge-success">Verified</span>
    </div>
    <h3 class="cert-title">Certificate Name</h3>
    <ul class="cert-details-list">
      <li><span>Date:</span> <strong>Month Year</strong></li>
      <li><span>Score / Result:</span> <strong>Details</strong></li>
    </ul>
    <div class="cert-actions">
      <button type="button" class="btn btn-secondary btn-sm" 
              data-lightbox-src="assets/certs/your-certificate.png" 
              data-lightbox-title="Certificate Name">
        <i class="fas fa-eye"></i> View
      </button>
    </div>
  </div>
</article>
```

---

## 🌐 How to Deploy

### Option 1: GitHub Pages (Free & Automatic)
1. Initialize Git in the `portfolio_kaushalwani` directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of upgraded portfolio"
   ```
2. Create a repository on GitHub (e.g., `portfolio` or `kaushalrw34-ctrl.github.io`).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/kaushalrw34-ctrl/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. In your GitHub repository, navigate to **Settings > Pages**.
5. Under **Branch**, select `main` and root `/`, then click **Save**.
6. Your portfolio will be live at `https://kaushalrw34-ctrl.github.io/portfolio/` in a few minutes!

### Option 2: Netlify (Drag & Drop)
1. Go to [netlify.com](https://www.netlify.com/) and log in.
2. Drag and drop the `portfolio_kaushalwani` folder into the Netlify Sites dashboard.
3. Your site will instantly go live with a custom HTTPS URL.

---

## 📝 Placeholders & TODOs Checklist

Here are the specific placeholders marked with `<!-- TODO -->` in `index.html` for details you can easily fill in whenever ready:

- [ ] **Smart India Hackathon (SIH) Details**:
  - Exact Problem Statement Title
  - Team Name
  - Year and specific role
  - Proof document / certificate thumbnail (when available)
- [ ] **Contact Form Endpoint (Formspree)**:
  - Currently, submitting the form opens the user's email client directly with pre-filled content to `kaushalrw34@gmail.com`.
  - If you prefer seamless background submissions without opening email software, create a free endpoint at [formspree.io](https://formspree.io) and update `action="https://formspree.io/f/YOUR_FORM_ID"` in `index.html`.
- [ ] **Phone Number (Optional)**:
  - If you wish to display a phone number link on the website or resume, you can add it to the contact information card.
