/* ══════════════════════════════════════════════════════
   COURSES — Shared JS for Course Player Pages
   Handles: sidebar nav, module switching, access control,
   progress tracking, quiz engine
   ══════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ── Configuration (set per page via data attributes) ──
  const page = document.querySelector("[data-course]");
  if (!page) return;

  const courseId = page.dataset.course; // "eft" or "rebirth"
  const accessKey = courseId + "_access";
  const stripeUrl = page.dataset.stripeUrl || "#";

  // ── Access Control ────────────────────────────────────
  function checkAccess() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access");

    // If token in URL, store it
    if (token) {
      localStorage.setItem(accessKey, token);
      // Clean URL
      const clean = window.location.pathname;
      window.history.replaceState({}, "", clean);
    }

    const stored = localStorage.getItem(accessKey);
    const gate = document.getElementById("access-gate");

    if (!stored && gate) {
      gate.classList.add("is-visible");
      return false;
    }

    return true;
  }

  // ── Sidebar Navigation ────────────────────────────────
  const sidebar = document.querySelector(".course-sidebar");
  const hamburger = document.querySelector(".topbar-hamburger");
  const overlay = document.querySelector(".sidebar-overlay");
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const modules = document.querySelectorAll(".module-section");

  function switchModule(index) {
    // Update sidebar
    sidebarItems.forEach((item, i) => {
      item.classList.toggle("is-active", i === index);
    });

    // Update content
    modules.forEach((mod, i) => {
      mod.classList.toggle("is-active", i === index);
    });

    // Mark previous modules as completed
    sidebarItems.forEach((item, i) => {
      if (i < index) {
        item.classList.add("is-completed");
      }
    });

    // Save progress
    saveProgress(index);
    updateProgressBar();

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Close mobile sidebar
    closeSidebar();
  }

  // Sidebar item click handlers
  sidebarItems.forEach((item, i) => {
    item.addEventListener("click", () => switchModule(i));
  });

  // Module nav buttons (prev/next)
  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = getCurrentIndex();
      const dir = btn.dataset.nav;
      if (dir === "next" && current < modules.length - 1) {
        switchModule(current + 1);
      } else if (dir === "prev" && current > 0) {
        switchModule(current - 1);
      }
    });
  });

  function getCurrentIndex() {
    for (let i = 0; i < sidebarItems.length; i++) {
      if (sidebarItems[i].classList.contains("is-active")) return i;
    }
    return 0;
  }

  // ── Mobile Sidebar Toggle ─────────────────────────────
  function openSidebar() {
    sidebar?.classList.add("is-open");
    overlay?.classList.add("is-visible");
    hamburger?.classList.add("is-open");
  }

  function closeSidebar() {
    sidebar?.classList.remove("is-open");
    overlay?.classList.remove("is-visible");
    hamburger?.classList.remove("is-open");
  }

  hamburger?.addEventListener("click", () => {
    if (sidebar?.classList.contains("is-open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay?.addEventListener("click", closeSidebar);

  // ── Progress Tracking ─────────────────────────────────
  const progressKey = courseId + "_progress";

  function saveProgress(index) {
    const data = getProgressData();
    data.current = index;
    if (!data.completed.includes(index)) {
      // Mark all before current as completed
      for (let i = 0; i < index; i++) {
        if (!data.completed.includes(i)) data.completed.push(i);
      }
    }
    localStorage.setItem(progressKey, JSON.stringify(data));
  }

  function getProgressData() {
    try {
      const raw = localStorage.getItem(progressKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { current: 0, completed: [] };
  }

  function restoreProgress() {
    const data = getProgressData();
    // Restore completed states
    data.completed.forEach((i) => {
      if (sidebarItems[i]) sidebarItems[i].classList.add("is-completed");
    });
    // Switch to last module
    switchModule(data.current || 0);
  }

  function updateProgressBar() {
    const data = getProgressData();
    const total = modules.length;
    const completed = data.completed.length;
    const pct = Math.round((completed / total) * 100);

    const fill = document.querySelector(".topbar-progress-fill");
    const text = document.querySelector(".topbar-progress-text");

    if (fill) fill.style.width = pct + "%";
    if (text) text.textContent = pct + "% complete";
  }

  // ── Quiz Engine ───────────────────────────────────────
  function initQuizzes() {
    document.querySelectorAll(".quiz-section").forEach((quiz) => {
      const questions = quiz.querySelectorAll(".quiz-question");
      const submitBtn = quiz.querySelector(".quiz-submit");
      const scoreEl = quiz.querySelector(".quiz-score");

      // Option click handler
      questions.forEach((q) => {
        const options = q.querySelectorAll(".quiz-option");
        options.forEach((opt) => {
          opt.addEventListener("click", () => {
            // Don't allow changes after submission
            if (q.dataset.answered === "true") return;
            // Deselect all in this question
            options.forEach((o) => o.classList.remove("is-selected"));
            opt.classList.add("is-selected");
          });
        });
      });

      // Submit handler
      submitBtn?.addEventListener("click", () => {
        let correct = 0;
        let total = questions.length;

        questions.forEach((q) => {
          q.dataset.answered = "true";
          const options = q.querySelectorAll(".quiz-option");
          const selected = q.querySelector(".quiz-option.is-selected");
          const correctAnswer = q.dataset.correct;
          const feedbackCorrect = q.querySelector(".quiz-feedback.is-correct-answer");
          const feedbackIncorrect = q.querySelector(".quiz-feedback.is-incorrect-answer");

          options.forEach((opt) => {
            if (opt.dataset.value === correctAnswer) {
              opt.classList.add("is-correct");
            }
          });

          if (selected) {
            if (selected.dataset.value === correctAnswer) {
              correct++;
              if (feedbackCorrect) {
                feedbackCorrect.classList.add("is-visible", "is-correct");
              }
            } else {
              selected.classList.add("is-incorrect");
              if (feedbackIncorrect) {
                feedbackIncorrect.classList.add("is-visible", "is-incorrect");
              }
            }
          } else {
            // No answer selected
            if (feedbackIncorrect) {
              feedbackIncorrect.classList.add("is-visible", "is-incorrect");
            }
          }
        });

        // Show score
        if (scoreEl) {
          scoreEl.textContent = `You scored ${correct} out of ${total}`;
          scoreEl.classList.add("is-visible");
        }

        // Hide submit button
        submitBtn.style.display = "none";
      });
    });
  }

  // ── Back to Top Button ─────────────────────────────────
  function initBackToTop() {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      btn.classList.toggle("is-visible", window.scrollY > 400);
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ── Keyboard Navigation ───────────────────────────────
  function initKeyboardNav() {
    document.addEventListener("keydown", (e) => {
      // Left/right arrows for module navigation (only when not in quiz/input)
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const current = getCurrentIndex();
      if (e.key === "ArrowRight" && current < modules.length - 1) {
        switchModule(current + 1);
      } else if (e.key === "ArrowLeft" && current > 0) {
        switchModule(current - 1);
      }
    });
  }

  // ── Initialize ────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    const hasAccess = checkAccess();
    if (hasAccess) {
      restoreProgress();
      initQuizzes();
      initBackToTop();
      initKeyboardNav();
    }
    updateProgressBar();
  });
})();
