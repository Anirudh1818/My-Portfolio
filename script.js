/**
 * ==============================================================================
 * ANIRUDH SAXENA — PERSONAL PORTFOLIO SCRIPT
 * High-Performance Vanilla JavaScript Interactions
 * 
 * Features:
 * 1. Live Indian Standard Time (IST) Clock & Dynamic Footer Year
 * 2. Responsive Mobile Navigation Drawer
 * 3. 3D Magnetic Parallax Mouse Tilt on Anirudh's Portrait
 * 4. Filterable Project Case Studies Grid
 * 5. Interactive Capabilities & Expertise Accordion
 * 6. Case Study Deep-Dive Modal Drawer (CV-Verified Projects)
 * 7. One-Click Copy Email to Clipboard
 * 8. Client & Recruiter Inquiry Validation System
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", function () {

  /* ==========================================================================
     1. LIVE INDIAN STANDARD TIME (IST) & DYNAMIC YEAR
     ========================================================================== */
  function initTimeAndYear() {
    const clockElement = document.querySelector("#ist-clock .time-digits");
    const yearElement = document.getElementById("footer-year");

    // Dynamic Year
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // Live IST Time Clock (Asia/Kolkata UTC+5:30)
    function updateIndianTime() {
      if (!clockElement) return;
      try {
        const now = new Date();
        const options = {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        };
        const formatter = new Intl.DateTimeFormat("en-IN", options);
        clockElement.textContent = formatter.format(now) + " IST";
      } catch (e) {
        // Fallback calculation for UTC+5:30
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * 5.5));
        const hrs = String(nd.getHours()).padStart(2, '0');
        const mins = String(nd.getMinutes()).padStart(2, '0');
        const secs = String(nd.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hrs}:${mins}:${secs} IST`;
      }
    }

    updateIndianTime();
    setInterval(updateIndianTime, 1000);
  }

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    const navItems = document.querySelectorAll(".nav-item");

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("active");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navItems.forEach(function (link) {
      link.addEventListener("click", function () {
        if (mainNav.classList.contains("active")) {
          mainNav.classList.remove("active");
          menuToggle.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ==========================================================================
     3. 3D MAGNETIC PARALLAX TILT ON ANIRUDH'S PORTRAIT
     Tracks mouse movement and applies perspective tilt
     ========================================================================== */
  function initHeroParallax() {
    const heroStage = document.querySelector(".hero-stage");
    const portraitFrame = document.querySelector(".portrait-frame");

    if (!heroStage || !portraitFrame) return;

    heroStage.addEventListener("mousemove", function (e) {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt limits (max 7 degrees)
      const rotateX = ((centerY - y) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * 6;

      portraitFrame.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroStage.addEventListener("mouseleave", function () {
      portraitFrame.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  }

  /* ==========================================================================
     4. FILTERABLE PROJECT CASE STUDIES GRID
     ========================================================================== */
  function initWorksFilter() {
    const filterButtons = document.querySelectorAll(".filter-pill");
    const workCards = document.querySelectorAll(".work-card");

    if (!filterButtons.length || !workCards.length) return;

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedFilter = button.getAttribute("data-filter");

        workCards.forEach(function (card) {
          const cardCategories = card.getAttribute("data-category") || "";

          if (selectedFilter === "all" || cardCategories.includes(selectedFilter)) {
            card.classList.remove("hide");
            card.style.animation = "fadeInCard 0.4s ease forwards";
          } else {
            card.classList.add("hide");
          }
        });
      });
    });
  }

  /* ==========================================================================
     5. CAPABILITIES & EXPERTISE ACCORDION
     ========================================================================== */
  function initServicesAccordion() {
    const serviceRows = document.querySelectorAll(".service-row");

    serviceRows.forEach(function (row) {
      const header = row.querySelector(".service-header");
      if (!header) return;

      header.addEventListener("click", function () {
        const isCurrentActive = row.classList.contains("active");

        serviceRows.forEach(function (item) {
          item.classList.remove("active");
        });

        if (!isCurrentActive) {
          row.classList.add("active");
        }
      });
    });
  }

  /* ==========================================================================
     6. CASE STUDY DEEP-DIVE MODAL DRAWER (ANIRUDH'S REAL WORK)
     ========================================================================== */
  const caseStudiesData = {
    krealink: {
      title: "KreaLink — AI-Creator Marketplace & Escrow Platform",
      category: "1ST POSITION WINNER &bull; HACXLERATE 2026 &bull; BYTEXL ROUND 2",
      client: "Team Tech Mafias &bull; Kampus.vc Problem Statement",
      year: "May – Oct 2026",
      metrics: [
        { label: "Hackathon Result", value: "1st Place" },
        { label: "Primary Commits", value: "44 of 47" },
        { label: "Firestore Rules", value: "600+ Lines" }
      ],
      overview: "KreaLink is a full-stack creator-brand marketplace built for the Kampus.vc Round 2 brief at ByteXL's Hyderabad headquarters, following a 1st place victory at Shoolini University.",
      challenge: "Managing end-to-end brand campaign delivery, verified escrow payments, multi-tier user authorization (brands, creators, admins), and fraud-proof cloud database rules.",
      solution: "As the primary developer, built brand, creator, and admin portals with Firebase Authentication; implemented Razorpay payment flows with server-side HMAC-SHA256 signature verification; authored 600+ lines of Firestore security rules backed by emulator tests and 44 passing unit tests; designed an explainable 8-weighted signal ranking engine with Gemini/OpenAI API brief structuring.",
      deliverables: [
        "Brand & Creator Multi-Portal Architecture",
        "Razorpay Escrow with HMAC-SHA256 Server Verification",
        "600+ Lines of Firestore Security Rules (Tested in Emulator)",
        "Explainable 8-Signal Creator Ranking Engine",
        "Admin Console with Immutable Audit Logs"
      ],
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Firebase Auth & Firestore", "Razorpay", "Gemini API", "Vercel", "node:test"],
      githubUrl: "https://github.com/Anirudh1818"
    },
    webbrothers: {
      title: "Web Brothers Digital — Studio Platform & Client Portal",
      category: "CO-FOUNDER &amp; LEAD FULL-STACK DEVELOPER",
      client: "Web Brothers Digital &bull; Regional Business Platform",
      year: "May 2026 – Present",
      metrics: [
        { label: "Lead Growth", value: "+320%" },
        { label: "Delivery Speed", value: "Instant" },
        { label: "Lighthouse Score", value: "100 / 100" }
      ],
      overview: "Co-founded a digital studio focused on designing, developing, and deploying high-converting web applications for regional businesses in Moradabad and beyond.",
      challenge: "Local businesses lacked professional online lead capture, resulting in delayed customer inquiries and poor organic search discoverability.",
      solution: "Architected a responsive marketing platform utilizing Next.js Server Actions with server-side input validation. Connected automated email delivery through the Resend API, structured a direct WhatsApp hand-off funnel, and optimized meta tags for local search discovery.",
      deliverables: [
        "Full-Stack Web Application Architecture",
        "Server Actions Form Validation",
        "Automated Transactional Emails via Resend",
        "Direct WhatsApp Customer Handoff",
        "Local Business SEO & OpenGraph Metadata"
      ],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Server Actions", "Resend API", "WhatsApp Integration", "Vercel"],
      githubUrl: "https://github.com/Anirudh1818"
    },
    supermarket: {
      title: "Supermarket Sales Analysis — Exploratory Data Analysis",
      category: "EXPLORATORY DATA SCIENCE &amp; BUSINESS INTELLIGENCE",
      client: "Retail Intelligence Study &bull; Individual Project",
      year: "Nov 2026",
      metrics: [
        { label: "Transactions", value: "1,000+" },
        { label: "Queries Solved", value: "16 Questions" },
        { label: "F&B Gender Gap", value: "+44% Female" }
      ],
      overview: "A comprehensive business intelligence study investigating retail transactions across three supermarket branches to uncover operational and demographic purchasing trends.",
      challenge: "Transforming multi-column transaction logs with timestamps and product lines into actionable scheduling and inventory recommendations.",
      solution: "Performed data cleaning, groupbys, and multi-dimensional pivot tables in Python using Pandas. Discovered that Saturday is the highest revenue day, 19:00 represents the busiest operating hour, and female customers spend 44% more on food and beverages, guiding targeted retail promotions.",
      deliverables: [
        "16 Business Intelligence Insights Answered",
        "Pandas Groupby & Pivot Table Aggregations",
        "Hourly Footfall & Sales Trajectory Visualizations",
        "Branch Profit Margin Benchmarks"
      ],
      techStack: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook", "Google Colab"],
      githubUrl: "https://github.com/Anirudh1818"
    },
    calculator: {
      title: "Scientific Calculator in C with Interactive Web Simulator",
      category: "SYSTEMS PROGRAMMING &amp; WEB EXECUTION MIRROR",
      client: "Systems Architecture Project &bull; Individual",
      year: "Nov 2026",
      metrics: [
        { label: "Edge Guards", value: "100% Covered" },
        { label: "Memory Safety", value: "Zero Leaks" },
        { label: "Sync Engine", value: "Step-by-Step" }
      ],
      overview: "A defensive mathematical calculation engine built in C, paired with a modern web dashboard that mirrors internal C execution logic in real time.",
      challenge: "Preventing arithmetic overflow, segmentation faults, and invalid mathematical expressions (division by zero, negative roots, undefined tangents, non-positive logarithms).",
      solution: "Implemented modular C functions with switch-case dispatch and robust guard assertions. Replicated the exact execution pipeline in Vanilla JavaScript so students and developers can visualize C stack behavior and intermediate calculations in a clean web UI.",
      deliverables: [
        "Modular C Arithmetic & Trigonometric Engine",
        "Defensive Guards for Invalid Operations",
        "Interactive Browser Execution Dashboard",
        "Step-by-Step Stack Trace Visualizer"
      ],
      techStack: ["C Language (GCC)", "HTML5", "CSS3", "Vanilla JavaScript", "Node.js"],
      githubUrl: "https://github.com/Anirudh1818"
    }
  };

  function initCaseStudyModal() {
    const modal = document.getElementById("case-study-modal");
    const modalCategory = document.getElementById("modal-case-category");
    const modalTitle = document.getElementById("modal-case-title");
    const modalBody = document.getElementById("modal-scroll-body");
    const closeTrigger = document.getElementById("modal-close-trigger");
    const dismissBtn = document.getElementById("modal-dismiss-btn");
    const caseStudyButtons = document.querySelectorAll(".btn-case-study");

    if (!modal || !modalBody) return;

    function openModal(projectId) {
      const data = caseStudiesData[projectId];
      if (!data) return;

      modalCategory.innerHTML = data.category;
      modalTitle.textContent = data.title;

      const metricsHTML = data.metrics.map(function (m) {
        return `
          <div class="modal-metric-box">
            <span class="metric-big">${m.value}</span>
            <span class="metric-label">${m.label}</span>
          </div>
        `;
      }).join("");

      const deliverablesHTML = data.deliverables.map(function (d) {
        return `<li>${d}</li>`;
      }).join("");

      const techHTML = data.techStack.map(function (t) {
        return `<span class="tag" style="margin-right: 6px; margin-bottom: 6px; display: inline-block;">${t}</span>`;
      }).join("");

      modalBody.innerHTML = `
        <div class="modal-metrics-row">
          ${metricsHTML}
        </div>

        <h4>Project Overview</h4>
        <p>${data.overview}</p>

        <h4>The Technical Challenge</h4>
        <p>${data.challenge}</p>

        <h4>The Engineering Solution</h4>
        <p>${data.solution}</p>

        <h4>Key Deliverables &amp; Milestones</h4>
        <ul class="modal-bullets">
          ${deliverablesHTML}
        </ul>

        <h4>Technical Stack</h4>
        <div style="margin-top: 8px;">
          ${techHTML}
        </div>

        <div class="modal-action-row">
          <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="pill-btn pill-btn-dark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>View on GitHub</span>
          </a>
        </div>
      `;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    caseStudyButtons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const projectId = button.getAttribute("data-project");
        openModal(projectId);
      });
    });

    if (closeTrigger) closeTrigger.addEventListener("click", closeModal);
    if (dismissBtn) dismissBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        closeModal();
      }
    });
  }

  /* ==========================================================
     7. ONE-CLICK COPY EMAIL TO CLIPBOARD
     ========================================================== */
  function initCopyEmail() {
    const copyBtn = document.getElementById("btn-copy-email");
    const tooltip = document.getElementById("copy-tooltip");

    if (!copyBtn || !tooltip) return;

    copyBtn.addEventListener("click", function () {
      const email = "saxenaanirudh59@gmail.com";
      navigator.clipboard.writeText(email).then(function () {
        tooltip.textContent = "Copied!";
        copyBtn.style.backgroundColor = "#10b981";
        copyBtn.style.color = "#ffffff";

        setTimeout(function () {
          tooltip.textContent = "Copy";
          copyBtn.style.backgroundColor = "";
          copyBtn.style.color = "";
        }, 2200);
      }).catch(function () {
        tooltip.textContent = "saxenaanirudh59@gmail.com";
      });
    });
  }

  /* ==========================================================
     8. CLIENT & RECRUITER INQUIRY FORM (REAL EMAIL DISPATCH)
     Delivers directly to saxenaanirudh59@gmail.com via FormSubmit AJAX
     ========================================================== */
  function initInquiryForm() {
    const form = document.getElementById("inquiry-form");
    const banner = document.getElementById("inquiry-banner");
    const submitBtn = document.getElementById("btn-submit");

    if (!form || !banner) return;

    const nameInput = document.getElementById("client-name");
    const emailInput = document.getElementById("client-email");
    const messageInput = document.getElementById("client-message");
    const subjectInput = document.getElementById("client-subject");

    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function setFieldError(fieldId, errorId, message) {
      const field = document.getElementById(fieldId);
      const err = document.getElementById(errorId);
      if (field) field.classList.add("has-error");
      if (err) err.textContent = message;
    }

    function clearFieldError(fieldId, errorId) {
      const field = document.getElementById(fieldId);
      const err = document.getElementById(errorId);
      if (field) field.classList.remove("has-error");
      if (err) err.textContent = "";
    }

    if (nameInput) {
      nameInput.addEventListener("input", function () {
        if (nameInput.value.trim().length >= 2) clearFieldError("field-name", "err-name");
      });
    }

    if (emailInput) {
      emailInput.addEventListener("input", function () {
        if (isValidEmail(emailInput.value.trim())) clearFieldError("field-email", "err-email");
      });
    }

    if (messageInput) {
      messageInput.addEventListener("input", function () {
        if (messageInput.value.trim().length >= 10) clearFieldError("field-message", "err-message");
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;

      const nameVal = nameInput ? nameInput.value.trim() : "";
      if (nameVal === "") {
        setFieldError("field-name", "err-name", "Please provide your name.");
        isValid = false;
      } else if (nameVal.length < 2) {
        setFieldError("field-name", "err-name", "Name must be at least 2 characters.");
        isValid = false;
      } else {
        clearFieldError("field-name", "err-name");
      }

      const emailVal = emailInput ? emailInput.value.trim() : "";
      if (emailVal === "") {
        setFieldError("field-email", "err-email", "Please provide your email address.");
        isValid = false;
      } else if (!isValidEmail(emailVal)) {
        setFieldError("field-email", "err-email", "Please enter a valid email (e.g. name@domain.com).");
        isValid = false;
      } else {
        clearFieldError("field-email", "err-email");
      }

      const msgVal = messageInput ? messageInput.value.trim() : "";
      if (msgVal === "") {
        setFieldError("field-message", "err-message", "Please share a message or brief overview.");
        isValid = false;
      } else if (msgVal.length < 10) {
        setFieldError("field-message", "err-message", "Message must be at least 10 characters long.");
        isValid = false;
      } else {
        clearFieldError("field-message", "err-message");
      }

      if (!isValid) {
        banner.className = "inquiry-banner error";
        banner.textContent = "Please fill out all required fields marked with an asterisk (*).";
        banner.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return;
      }

      const checkedPurpose = document.querySelector('input[name="purpose"]:checked') || document.querySelector('input[name="service"]:checked');
      const purposeVal = checkedPurpose ? checkedPurpose.value : "Collaboration Inquiry";
      const subjectText = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : `Portfolio Message: ${purposeVal}`;

      // Loading state on button
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "<span>Send Message Directly</span>";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Sending to Anirudh...</span>
          <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
        `;
      }

      banner.className = "inquiry-banner info";
      banner.textContent = "Transmitting message securely to saxenaanirudh59@gmail.com...";

      // Prepare payload for FormSubmit AJAX API
      const payload = {
        name: nameVal,
        email: emailVal,
        purpose: purposeVal,
        subject: subjectText,
        message: msgVal,
        _subject: `New Portfolio Message from ${nameVal} (${purposeVal})`,
        _template: "table"
      };

      fetch("https://formsubmit.co/ajax/saxenaanirudh59@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        banner.className = "inquiry-banner success";
        banner.innerHTML = `
          <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 6px;">Message Sent Successfully!</div>
          <div>Thank you, <strong>${nameVal}</strong>! Your inquiry regarding <strong>${purposeVal}</strong> has been sent directly to Anirudh's inbox (<code>saxenaanirudh59@gmail.com</code>).</div>
          <div style="margin-top: 6px; font-size: 0.875rem; opacity: 0.95;">Anirudh will review your note and respond back to <strong>${emailVal}</strong> within 24 hours.</div>
        `;

        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Message Sent!</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
          setTimeout(function () {
            submitBtn.innerHTML = originalBtnHTML;
          }, 6000);
        }
        banner.scrollIntoView({ behavior: "smooth", block: "nearest" });
      })
      .catch(function (err) {
        console.warn("AJAX submission encountered an issue, executing native dispatch:", err);
        // Fallback: Native form submission guarantees FormSubmit receives the message
        banner.className = "inquiry-banner info";
        banner.textContent = "Connecting to mail server to complete submission...";
        form.submit();
      });
    });
  }

  /* ==========================================================
     INITIALIZE ALL MODULES
     ========================================================== */
  initTimeAndYear();
  initMobileMenu();
  initHeroParallax();
  initWorksFilter();
  initServicesAccordion();
  initCaseStudyModal();
  initCopyEmail();
  initInquiryForm();

  console.log("Anirudh Saxena Portfolio Initialized — Ready to Impress.");
});
