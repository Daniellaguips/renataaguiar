/* ══════════════════════════════════════════════════════
   COURSES — Shared JS for Course Player Pages
   Handles: sidebar nav, module switching, step navigation,
   access control, progress tracking, quiz engine
   ══════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ── Configuration (set per page via data attributes) ──
  const page = document.querySelector("[data-course]");
  if (!page) return;

  const courseId = page.dataset.course;
  const accessKey = courseId + "_access";

  // ── Access Control ────────────────────────────────────
  function checkAccess() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access");

    if (token) {
      localStorage.setItem(accessKey, token);
      window.history.replaceState({}, "", window.location.pathname);
    }

    const stored = localStorage.getItem(accessKey);
    const gate = document.getElementById("access-gate");

    if (!stored && gate) {
      gate.classList.add("is-visible");
      return false;
    }
    return true;
  }

  // ── Elements ──────────────────────────────────────────
  const sidebar = document.querySelector(".course-sidebar");
  const hamburger = document.querySelector(".topbar-hamburger");
  const overlay = document.querySelector(".sidebar-overlay");
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const modules = document.querySelectorAll(".module-section");

  // ── Step Navigation ───────────────────────────────────
  // Each module can have multiple .module-step children.
  // If a module has no steps, it behaves as a single-step module.

  let currentModuleIndex = 0;
  let currentStepIndex = 0;

  function getSteps(moduleIndex) {
    const mod = modules[moduleIndex];
    if (!mod) return [];
    const steps = mod.querySelectorAll(".module-step");
    return steps.length > 0 ? Array.from(steps) : [];
  }

  function hasSteps(moduleIndex) {
    return getSteps(moduleIndex).length > 0;
  }

  function switchModule(index, stepIndex) {
    currentModuleIndex = index;
    currentStepIndex = stepIndex || 0;

    // Update sidebar
    sidebarItems.forEach((item, i) => {
      item.classList.toggle("is-active", i === index);
    });

    // Update content — show only active module
    modules.forEach((mod, i) => {
      mod.classList.toggle("is-active", i === index);
    });

    // Mark previous modules as completed
    sidebarItems.forEach((item, i) => {
      if (i < index) item.classList.add("is-completed");
    });

    // Handle steps within the module
    const steps = getSteps(index);
    if (steps.length > 0) {
      switchStep(index, currentStepIndex);
    }

    // Update bottom nav buttons
    updateNavButtons(index);

    // Save and update progress
    saveProgress(index, currentStepIndex);
    updateProgressBar();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Close mobile sidebar
    closeSidebar();
  }

  function switchStep(moduleIndex, stepIndex) {
    const steps = getSteps(moduleIndex);
    if (steps.length === 0) return;

    currentStepIndex = Math.max(0, Math.min(stepIndex, steps.length - 1));

    // Show only active step
    steps.forEach((step, i) => {
      step.classList.toggle("is-active", i === currentStepIndex);
    });

    // Update step indicator dots
    const mod = modules[moduleIndex];
    const dots = mod.querySelectorAll(".step-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentStepIndex);
      if (i < currentStepIndex) dot.classList.add("is-completed");
    });

    // Update nav buttons
    updateNavButtons(moduleIndex);

    // Save progress
    saveProgress(moduleIndex, currentStepIndex);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateNavButtons(moduleIndex) {
    const mod = modules[moduleIndex];
    if (!mod) return;

    const prevBtn = mod.querySelector('[data-nav="prev"]');
    const nextBtn = mod.querySelector('[data-nav="next"]');
    const steps = getSteps(moduleIndex);
    const hasMultipleSteps = steps.length > 1;

    if (prevBtn) {
      // Disable prev if first module AND first step
      const isFirst = moduleIndex === 0 && currentStepIndex === 0;
      prevBtn.disabled = isFirst;

      if (hasMultipleSteps && currentStepIndex > 0) {
        prevBtn.textContent = "← Previous";
      } else if (moduleIndex > 0) {
        prevBtn.textContent = "← Previous Module";
      } else {
        prevBtn.textContent = "← Previous";
      }
    }

    if (nextBtn) {
      const isLastModule = moduleIndex === modules.length - 1;
      const isLastStep = !hasMultipleSteps || currentStepIndex === steps.length - 1;

      if (hasMultipleSteps && !isLastStep) {
        nextBtn.textContent = "Continue →";
        nextBtn.disabled = false;
      } else if (!isLastModule) {
        nextBtn.textContent = "Next Module →";
        nextBtn.disabled = false;
      } else {
        nextBtn.textContent = "Complete ✓";
        nextBtn.disabled = false;
      }
    }
  }

  // ── Click Handlers ────────────────────────────────────

  // Sidebar items
  sidebarItems.forEach((item, i) => {
    item.addEventListener("click", () => switchModule(i, 0));
  });

  // Step indicator dots
  document.querySelectorAll(".step-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const stepIdx = parseInt(dot.dataset.step, 10);
      if (!isNaN(stepIdx)) {
        switchStep(currentModuleIndex, stepIdx);
      }
    });
  });

  // Prev/Next buttons
  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = btn.dataset.nav;
      const steps = getSteps(currentModuleIndex);
      const hasMultipleSteps = steps.length > 1;

      if (dir === "next") {
        if (hasMultipleSteps && currentStepIndex < steps.length - 1) {
          // Next step within module
          switchStep(currentModuleIndex, currentStepIndex + 1);
        } else if (currentModuleIndex < modules.length - 1) {
          // Next module
          switchModule(currentModuleIndex + 1, 0);
        }
      } else if (dir === "prev") {
        if (hasMultipleSteps && currentStepIndex > 0) {
          // Previous step within module
          switchStep(currentModuleIndex, currentStepIndex - 1);
        } else if (currentModuleIndex > 0) {
          // Previous module — go to its last step
          const prevSteps = getSteps(currentModuleIndex - 1);
          const lastStep = prevSteps.length > 0 ? prevSteps.length - 1 : 0;
          switchModule(currentModuleIndex - 1, lastStep);
        }
      }
    });
  });

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
    sidebar?.classList.contains("is-open") ? closeSidebar() : openSidebar();
  });

  overlay?.addEventListener("click", closeSidebar);

  // ── Progress Tracking ─────────────────────────────────
  const progressKey = courseId + "_progress";

  function saveProgress(moduleIndex, stepIndex) {
    const data = getProgressData();
    data.current = moduleIndex;
    data.currentStep = stepIndex || 0;
    // Mark all modules before current as completed
    for (let i = 0; i < moduleIndex; i++) {
      if (!data.completed.includes(i)) data.completed.push(i);
    }
    localStorage.setItem(progressKey, JSON.stringify(data));
  }

  function getProgressData() {
    try {
      const raw = localStorage.getItem(progressKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { current: 0, currentStep: 0, completed: [] };
  }

  function restoreProgress() {
    const data = getProgressData();
    data.completed.forEach((i) => {
      if (sidebarItems[i]) sidebarItems[i].classList.add("is-completed");
    });
    switchModule(data.current || 0, data.currentStep || 0);
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

      questions.forEach((q) => {
        const options = q.querySelectorAll(".quiz-option");
        options.forEach((opt) => {
          opt.addEventListener("click", () => {
            if (q.dataset.answered === "true") return;
            options.forEach((o) => o.classList.remove("is-selected"));
            opt.classList.add("is-selected");
          });
        });
      });

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
            if (opt.dataset.value === correctAnswer) opt.classList.add("is-correct");
          });

          if (selected) {
            if (selected.dataset.value === correctAnswer) {
              correct++;
              if (feedbackCorrect) feedbackCorrect.classList.add("is-visible", "is-correct");
            } else {
              selected.classList.add("is-incorrect");
              if (feedbackIncorrect) feedbackIncorrect.classList.add("is-visible", "is-incorrect");
            }
          } else {
            if (feedbackIncorrect) feedbackIncorrect.classList.add("is-visible", "is-incorrect");
          }
        });

        if (scoreEl) {
          scoreEl.textContent = `You scored ${correct} out of ${total}`;
          scoreEl.classList.add("is-visible");
        }
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
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const steps = getSteps(currentModuleIndex);
      const hasMultipleSteps = steps.length > 1;

      if (e.key === "ArrowRight") {
        if (hasMultipleSteps && currentStepIndex < steps.length - 1) {
          switchStep(currentModuleIndex, currentStepIndex + 1);
        } else if (currentModuleIndex < modules.length - 1) {
          switchModule(currentModuleIndex + 1, 0);
        }
      } else if (e.key === "ArrowLeft") {
        if (hasMultipleSteps && currentStepIndex > 0) {
          switchStep(currentModuleIndex, currentStepIndex - 1);
        } else if (currentModuleIndex > 0) {
          const prevSteps = getSteps(currentModuleIndex - 1);
          switchModule(currentModuleIndex - 1, prevSteps.length > 0 ? prevSteps.length - 1 : 0);
        }
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
