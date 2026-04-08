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
  const langKey = "course_lang";

  // ── Language Toggle ───────────────────────────────────
  function initLanguage() {
    const saved = localStorage.getItem(langKey) || "en";
    setLanguage(saved);

    document.querySelectorAll(".lang-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLanguage(btn.dataset.lang);
      });
    });
  }

  function setLanguage(lang) {
    document.body.classList.toggle("lang-pt", lang === "pt");
    localStorage.setItem(langKey, lang);

    document.querySelectorAll(".lang-toggle-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
  }

  // ── Access Control ────────────────────────────────────
  const PASSWORD = "renatacourses";

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
      initPasswordGate(gate);
      return false;
    }
    return true;
  }

  function initPasswordGate(gate) {
    const form = gate.querySelector(".access-gate-form");
    const input = gate.querySelector(".access-gate-password");
    const error = gate.querySelector(".access-gate-error");
    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (input.value.trim().toLowerCase() === PASSWORD) {
        localStorage.setItem(accessKey, "granted");
        gate.classList.remove("is-visible");
        // Re-initialize everything now that access is granted
        restoreProgress();
        initQuizzes();
        initScenarios();
        initTapDiagrams();
        initPointQuizzes();
        initReactionDemo();
        initPhraseBuilders();
        initAlgoSelectors();
        initFlowPickers();
        initFlipCards();
        initPositionBuilders();
        updateProgressBar();
      } else {
        if (error) {
          error.textContent = "Incorrect password. Try again.";
          error.classList.add("is-visible");
        }
        input.value = "";
        input.focus();
      }
    });
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

  // ── Before/After Scenario Tabs ────────────────────────
  function initScenarios() {
    document.querySelectorAll(".scenario").forEach((s) => {
      const tabs = s.querySelectorAll(".scenario-tab");
      const panels = s.querySelectorAll(".scenario-panel");

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          tabs.forEach((t) => t.classList.remove("is-active"));
          panels.forEach((p) => p.classList.remove("is-active"));
          tab.classList.add("is-active");
          const target = tab.dataset.panel;
          s.querySelector(`.scenario-panel[data-panel="${target}"]`)?.classList.add("is-active");
        });
      });
    });
  }

  // ── Interactive Tapping Diagram ───────────────────────
  function initTapDiagrams() {
    document.querySelectorAll(".tap-diagram").forEach((diagram) => {
      const points = diagram.querySelectorAll(".tap-point");
      const infoName = diagram.querySelector(".tap-info-name");
      const infoLoc = diagram.querySelector(".tap-info-location");
      const infoMer = diagram.querySelector(".tap-info-meridian");
      const infoHint = diagram.querySelector(".tap-info-hint");

      points.forEach((pt) => {
        pt.addEventListener("click", () => {
          // Deactivate all
          points.forEach((p) => {
            p.classList.remove("is-active", "is-tapping");
          });
          // Activate clicked
          pt.classList.add("is-active", "is-tapping");
          // Show info
          if (infoName) { infoName.textContent = pt.dataset.name || ""; infoName.style.display = "block"; }
          if (infoLoc) { infoLoc.textContent = pt.dataset.location || ""; infoLoc.style.display = "block"; }
          if (infoMer) { infoMer.textContent = pt.dataset.meridian || ""; infoMer.style.display = "block"; }
          if (infoHint) infoHint.style.display = "none";
          // Remove tapping class after animation
          setTimeout(() => pt.classList.remove("is-tapping"), 1200);
        });
      });
    });
  }

  // ── Point Identification Quiz ─────────────────────────
  function initPointQuizzes() {
    document.querySelectorAll(".point-quiz").forEach((quiz) => {
      const questions = JSON.parse(quiz.dataset.questions || "[]");
      if (questions.length === 0) return;

      let currentQ = 0;
      let score = 0;
      const promptEl = quiz.querySelector(".point-quiz-prompt");
      const questionEl = quiz.querySelector(".point-quiz-question");
      const feedbackEl = quiz.querySelector(".point-quiz-feedback");
      const nextBtn = quiz.querySelector(".point-quiz-next");
      const scoreEl = quiz.querySelector(".point-quiz-score");
      const diagram = quiz.querySelector(".tap-diagram");
      const points = diagram ? diagram.querySelectorAll(".tap-point") : [];

      function showQuestion() {
        if (currentQ >= questions.length) {
          if (scoreEl) {
            scoreEl.textContent = `You got ${score} out of ${questions.length} correct!`;
            scoreEl.classList.add("is-visible");
          }
          if (questionEl) questionEl.textContent = "Quiz complete!";
          if (promptEl) promptEl.textContent = "🎉";
          points.forEach((p) => p.style.pointerEvents = "none");
          if (nextBtn) nextBtn.classList.remove("is-visible");
          return;
        }
        const q = questions[currentQ];
        if (promptEl) promptEl.textContent = `Question ${currentQ + 1} of ${questions.length}`;
        if (questionEl) questionEl.textContent = q.question;
        if (feedbackEl) {
          feedbackEl.classList.remove("is-visible", "is-correct", "is-incorrect");
          feedbackEl.textContent = "";
        }
        if (nextBtn) nextBtn.classList.remove("is-visible");
        points.forEach((p) => {
          p.classList.remove("is-active", "is-tapping");
          p.style.pointerEvents = "auto";
        });
      }

      // Point click handler for quiz mode
      points.forEach((pt) => {
        pt.addEventListener("click", () => {
          if (!quiz.classList.contains("is-quiz-active")) return;
          if (currentQ >= questions.length) return;
          const q = questions[currentQ];
          const clicked = pt.dataset.code;
          points.forEach((p) => p.style.pointerEvents = "none");

          if (clicked === q.answer) {
            score++;
            pt.classList.add("is-active");
            if (feedbackEl) {
              feedbackEl.textContent = "✓ Correct! " + (q.explanation || "");
              feedbackEl.classList.add("is-visible", "is-correct");
            }
          } else {
            pt.classList.add("is-active");
            // Highlight correct one
            points.forEach((p) => {
              if (p.dataset.code === q.answer) p.classList.add("is-active");
            });
            if (feedbackEl) {
              feedbackEl.textContent = "✗ That's " + clicked + ". The correct answer is " + q.answer + ". " + (q.explanation || "");
              feedbackEl.classList.add("is-visible", "is-incorrect");
            }
          }
          if (nextBtn) nextBtn.classList.add("is-visible");
        });
      });

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          currentQ++;
          showQuestion();
        });
      }

      // Start quiz
      const startBtn = quiz.querySelector(".point-quiz-start");
      if (startBtn) {
        startBtn.addEventListener("click", () => {
          quiz.classList.add("is-quiz-active");
          startBtn.style.display = "none";
          showQuestion();
        });
      }
    });
  }

  // ── Reaction Speed Demo (Module 1) ────────────────────
  function initReactionDemo() {
    document.querySelectorAll(".reaction-demo").forEach((demo) => {
      const area = demo.querySelector(".reaction-demo-area");
      const insight = demo.querySelector(".reaction-demo-insight");
      if (!area) return;

      let state = "idle"; // idle, waiting, ready, go
      let timer = null;
      let startTime = 0;
      let attempts = [];

      area.addEventListener("click", () => {
        if (state === "idle" || state === "result" || state === "early") {
          // Start: waiting phase
          state = "waiting";
          area.className = "reaction-demo-area is-waiting";
          area.textContent = "Wait for it...";
          const delay = 1500 + Math.random() * 3000;
          timer = setTimeout(() => {
            state = "go";
            area.className = "reaction-demo-area is-go";
            area.textContent = "TAP NOW!";
            startTime = performance.now();
          }, delay);
        } else if (state === "waiting") {
          // Too early
          clearTimeout(timer);
          state = "early";
          area.className = "reaction-demo-area is-early";
          area.textContent = "Too early! Click to try again.";
        } else if (state === "go") {
          const elapsed = Math.round(performance.now() - startTime);
          attempts.push(elapsed);
          state = "result";
          area.className = "reaction-demo-area is-result";
          area.textContent = elapsed + " ms — Click to try again";
          if (insight) {
            let msg = `Your reaction: ${elapsed}ms. `;
            if (elapsed < 250) msg += "Fast! But your amygdala fired at ~12ms — it was already done before you even noticed the color change.";
            else if (elapsed < 400) msg += "That's typical. Now consider: your amygdala completes its threat assessment in 12ms. By the time you clicked, it had processed the stimulus 20+ times over.";
            else msg += "No worries — this is about awareness, not speed. The point is: your amygdala processes at 12ms. Your conscious response is always playing catch-up.";
            if (attempts.length >= 3) {
              const avg = Math.round(attempts.reduce((a, b) => a + b) / attempts.length);
              msg += ` Your average: ${avg}ms — that's ${Math.round(avg / 12)}× slower than your amygdala.`;
            }
            insight.textContent = msg;
            insight.classList.add("is-visible");
          }
        }
      });
    });
  }

  // ── Phrase Builder (Module 3) ─────────────────────────
  function initPhraseBuilders() {
    document.querySelectorAll(".phrase-builder").forEach((builder) => {
      const input = builder.querySelector(".phrase-builder-input");
      const output = builder.querySelector(".phrase-builder-output");
      if (!input || !output) return;

      const mainPhrase = output.querySelector(".phrase-builder-phrase");
      const variations = output.querySelectorAll(".phrase-builder-variation");

      input.addEventListener("input", () => {
        const val = input.value.trim();
        if (!val) {
          output.classList.remove("is-visible");
          return;
        }
        output.classList.add("is-visible");
        if (mainPhrase) mainPhrase.textContent = `"Even though I have this ${val}, I deeply and completely accept myself."`;
        const alts = [
          `"Even though I have this ${val}, I choose to accept myself just as I am."`,
          `"Even though I have this ${val}, I am open to releasing this."`,
          `"Even though I have this ${val}, I choose to feel peace about this."`
        ];
        variations.forEach((v, i) => { if (alts[i]) v.textContent = alts[i]; });
      });
    });
  }

  // ── Algorithm Selector (Module 4) ─────────────────────
  function initAlgoSelectors() {
    document.querySelectorAll(".algo-selector").forEach((selector) => {
      const btns = selector.querySelectorAll(".algo-selector-btn");
      const panels = selector.querySelectorAll(".algo-selector-result[data-algo-panel]");

      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const algoKey = btn.dataset.algo;
          const isAlreadyActive = btn.classList.contains("is-active");

          // Toggle off if clicking same button
          btns.forEach((b) => b.classList.remove("is-active"));
          panels.forEach((p) => p.classList.remove("is-visible"));

          if (!isAlreadyActive) {
            btn.classList.add("is-active");
            const panel = selector.querySelector(`.algo-selector-result[data-algo-panel="${algoKey}"]`);
            if (panel) panel.classList.add("is-visible");
          }
        });
      });
    });
  }

  // ── Technique Flowchart (Module 5) ────────────────────
  function initFlowPickers() {
    document.querySelectorAll(".flow-picker").forEach((picker) => {
      const steps = picker.querySelectorAll("[data-flow-step]");
      const answers = picker.querySelectorAll(".flow-picker-answer");
      const restart = picker.querySelector(".flow-picker-restart");

      function showStep(stepId) {
        steps.forEach((s) => s.style.display = s.dataset.flowStep === stepId ? "block" : "none");
        answers.forEach((a) => a.classList.remove("is-visible"));
        if (restart) restart.classList.remove("is-visible");
      }

      picker.querySelectorAll(".flow-picker-choice").forEach((choice) => {
        choice.addEventListener("click", () => {
          const next = choice.dataset.next;
          const answer = choice.dataset.answer;
          if (answer) {
            steps.forEach((s) => s.style.display = "none");
            const answerEl = picker.querySelector(`.flow-picker-answer[data-answer="${answer}"]`);
            if (answerEl) answerEl.classList.add("is-visible");
            if (restart) restart.classList.add("is-visible");
          } else if (next) {
            showStep(next);
          }
        });
      });

      if (restart) {
        restart.addEventListener("click", () => showStep("1"));
      }

      showStep("1");
    });
  }

  // ── Flip Cards (Module 6 dissociation, Module 7 ethics) ──
  function initFlipCards() {
    document.querySelectorAll(".flip-card").forEach((card) => {
      card.addEventListener("click", () => {
        card.classList.toggle("is-flipped");
      });
    });
  }

  // ── Positioning Builder (Module 8) ────────────────────
  function initPositionBuilders() {
    document.querySelectorAll(".position-builder").forEach((builder) => {
      const inputs = builder.querySelectorAll("input");
      const preview = builder.querySelector(".position-builder-preview");
      if (!preview) return;

      function update() {
        const who = builder.querySelector('[data-field="who"]')?.value.trim() || "[who you help]";
        const what = builder.querySelector('[data-field="what"]')?.value.trim() || "[what they struggle with]";
        const how = builder.querySelector('[data-field="how"]')?.value.trim() || "[your approach]";
        const result = builder.querySelector('[data-field="result"]')?.value.trim() || "[the transformation]";
        preview.textContent = `I help ${who} overcome ${what} using ${how} — so they can ${result}.`;
      }

      inputs.forEach((input) => input.addEventListener("input", update));
      update();
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
    initLanguage();
    checkAccess();
    // Always initialize interactive elements (even in preview/feedback mode)
    restoreProgress();
    initQuizzes();
    initScenarios();
    initTapDiagrams();
    initPointQuizzes();
    initReactionDemo();
    initPhraseBuilders();
    initAlgoSelectors();
    initFlowPickers();
    initFlipCards();
    initPositionBuilders();
    initBackToTop();
    initKeyboardNav();
    updateProgressBar();
  });
})();
