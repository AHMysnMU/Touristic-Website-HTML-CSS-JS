

document.addEventListener("DOMContentLoaded", () => {
  console.log("Website loaded successfully");


  // 1) Theme toggle (Light/Dark)
  const themeBtn = document.getElementById("darkModeBtn");
  const THEME_KEY = "worldMonumentsTheme"; // "dark" | "light"

  function isLightMode() {
    return document.body.classList.contains("theme-light");
  }

  function applyTheme(theme) {
    const useLight = theme === "light";
    document.body.classList.toggle("theme-light", useLight);

    if (themeBtn) {
      // aria-pressed=true means the alternate state (light mode) is active
      themeBtn.setAttribute("aria-pressed", String(useLight));
      themeBtn.textContent = useLight ? "Dark mode" : "Light mode";
      themeBtn.setAttribute(
        "aria-label",
        useLight ? "Switch to dark mode" : "Switch to light mode"
      );
    }
  }

  // Load saved theme (default: dark)
  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme === "light" ? "light" : "dark");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const nextTheme = isLightMode() ? "dark" : "light";
      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }


  // 2) Highlight current page in navigation
  const navLinks = document.querySelectorAll(".site-nav a[href]");
  const currentFile = (() => {
    // Works for both local files (file://) and hosted sites
    const url = new URL(window.location.href);
    const last = url.pathname.split("/").pop();
    return last && last.length ? last : "index.html";
  })();

  navLinks.forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    const linkFile = href.split("/").pop();
    if (linkFile === currentFile) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.remove("is-active");
      a.removeAttribute("aria-current");
    }
  });


  // 3) Feedback form (demo submit)
  const feedbackForm = document.querySelector("form.form");
  const statusEl = document.getElementById("formStatus");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      // Let HTML5 validation run first
      if (!feedbackForm.checkValidity()) {
        // Show browser validation messages
        feedbackForm.reportValidity();
        return;
      }

      // Prevent real form submission (this is a static site)
      e.preventDefault();

      if (statusEl) {
        statusEl.textContent =
          "Thanks! This is a demo form. Your submission was not sent, but we received it locally in the browser.";
      } else {
        alert(
          "Thanks! This is a demo form. Your submission was not sent, but we received it locally in the browser."
        );
      }

      // Optional: clear fields (keeps the consent checkbox logic visible)
      feedbackForm.reset();
    });
  }
});
