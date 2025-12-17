import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import SplitType from "split-type";
import "../styles/kinetic-intro.css";

/**
 * Fullscreen kinetic typography intro. Plays once per session then hides.
 */
export function KineticIntro() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("kineticIntroSeen");
    if (!seen) {
      setVisible(true);
    } else {
      window.dispatchEvent(new Event("kineticIntroComplete"));
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const container = containerRef.current;
    if (!container) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let scrambleRegistered = false;

    gsap.registerPlugin(CustomEase);

    const cleanupFns: Array<() => void> = [];

    document.fonts.ready.then(async () => {
      try {
        const mod: any = await import("gsap/ScrambleTextPlugin");
        const ScrambleTextPlugin = mod.default || mod.ScrambleTextPlugin || mod;
        gsap.registerPlugin(ScrambleTextPlugin);
        scrambleRegistered = true;
      } catch (err) {
        console.warn("ScrambleTextPlugin not available", err);
      }

      CustomEase.create("customEase", "0.86, 0, 0.07, 1");
      CustomEase.create("mouseEase", "0.25, 0.1, 0.25, 1");

      const backgroundTextItems = container.querySelectorAll<HTMLElement>(".text-item");
      const backgroundImages: Record<string, HTMLElement | null> = {
        default: container.querySelector("#default-bg"),
        focus: container.querySelector("#focus-bg"),
        presence: container.querySelector("#presence-bg"),
        feel: container.querySelector("#feel-bg"),
      };

      backgroundTextItems.forEach((item) => {
        item.dataset.originalText = item.textContent || "";
        item.dataset.text = item.textContent || "";
        gsap.set(item, { opacity: 1 });
      });

      const typeLines = container.querySelectorAll<HTMLElement>(".type-line");
      typeLines.forEach((line, index) => {
        line.classList.add(index % 2 === 0 ? "odd" : "even");
      });

      const oddLines = container.querySelectorAll<HTMLElement>(".type-line.odd");
      const evenLines = container.querySelectorAll<HTMLElement>(".type-line.even");
      const TYPE_LINE_OPACITY = 0.015;

      const state = {
        activeRowId: null as string | null,
        kineticAnimationActive: false,
        activeKineticAnimation: null as gsap.core.Timeline | null,
        textRevealAnimation: null as gsap.core.Timeline | null,
        transitionInProgress: false,
      };

      const textRows = container.querySelectorAll<HTMLElement>(".text-row");
      const splitTexts: Record<string, SplitType> = {};

      textRows.forEach((row) => {
        const textElement = row.querySelector<HTMLElement>(".text-content");
        const text = textElement?.dataset.text;
        const rowId = row.dataset.rowId;
        if (!textElement || !text || !rowId) return;

        splitTexts[rowId] = new SplitType(textElement, {
          type: "chars",
          charsClass: "char",
          mask: true,
          reduceWhiteSpace: false,
          propIndex: true,
        });

        textElement.style.visibility = "visible";
      });

      const alternativeTexts: Record<string, Record<string, string>> = {
        focus: {
          BE: "BECOME",
          PRESENT: "MINDFUL",
          LISTEN: "HEAR",
          DEEPLY: "INTENTLY",
          OBSERVE: "NOTICE",
          "&": "+",
          FEEL: "SENSE",
          MAKE: "CREATE",
          BETTER: "IMPROVED",
          DECISIONS: "CHOICES",
          THE: "YOUR",
          CREATIVE: "ARTISTIC",
          PROCESS: "JOURNEY",
          IS: "FEELS",
          MYSTERIOUS: "MAGICAL",
          S: "START",
          I: "INSPIRE",
          M: "MAKE",
          P: "PURE",
          L: "LIGHT",
          C: "CREATE",
          T: "TRANSFORM",
          Y: "YOURS",
          "IS THE KEY": "UNLOCKS ALL",
          "FIND YOUR VOICE": "SPEAK YOUR TRUTH",
          "TRUST INTUITION": "FOLLOW INSTINCT",
          "EMBRACE SILENCE": "WELCOME STILLNESS",
          "QUESTION EVERYTHING": "CHALLENGE NORMS",
          TRUTH: "HONESTY",
          WISDOM: "INSIGHT",
          FOCUS: "CONCENTRATE",
          ATTENTION: "AWARENESS",
          AWARENESS: "CONSCIOUSNESS",
          PRESENCE: "BEING",
          SIMPLIFY: "MINIMIZE",
          REFINE: "PERFECT",
        },
        presence: {
          BE: "EVOLVE",
          PRESENT: "ENGAGED",
          LISTEN: "ABSORB",
          DEEPLY: "FULLY",
          OBSERVE: "ANALYZE",
          "&": "→",
          FEEL: "EXPERIENCE",
          MAKE: "BUILD",
          BETTER: "STRONGER",
          DECISIONS: "SYSTEMS",
          THE: "EACH",
          CREATIVE: "ITERATIVE",
          PROCESS: "METHOD",
          IS: "BECOMES",
          MYSTERIOUS: "REVEALING",
          S: "STRUCTURE",
          I: "ITERATE",
          M: "METHOD",
          P: "PRACTICE",
          L: "LEARN",
          C: "CONSTRUCT",
          T: "TECHNIQUE",
          Y: "YIELD",
          "IS THE KEY": "DRIVES SUCCESS",
          "FIND YOUR VOICE": "DEVELOP YOUR STYLE",
          "TRUST INTUITION": "FOLLOW THE FLOW",
          "EMBRACE SILENCE": "VALUE PAUSES",
          "QUESTION EVERYTHING": "EXAMINE DETAILS",
          TRUTH: "CLARITY",
          WISDOM: "KNOWLEDGE",
          FOCUS: "DIRECTION",
          ATTENTION: "PRECISION",
          AWARENESS: "UNDERSTANDING",
          PRESENCE: "ENGAGEMENT",
          SIMPLIFY: "STREAMLINE",
          REFINE: "OPTIMIZE",
        },
        feel: {
          BE: "SEE",
          PRESENT: "FOCUSED",
          LISTEN: "UNDERSTAND",
          DEEPLY: "CLEARLY",
          OBSERVE: "PERCEIVE",
          "&": "=",
          FEEL: "KNOW",
          MAKE: "ACHIEVE",
          BETTER: "CLEARER",
          DECISIONS: "VISION",
          THE: "THIS",
          CREATIVE: "INSIGHTFUL",
          PROCESS: "THINKING",
          IS: "BRINGS",
          MYSTERIOUS: "ILLUMINATING",
          S: "SHARP",
          I: "INSIGHT",
          M: "MINDFUL",
          P: "PRECISE",
          L: "LUCID",
          C: "CLEAR",
          T: "TRANSPARENT",
          Y: "YES",
          "IS THE KEY": "REVEALS TRUTH",
          "FIND YOUR VOICE": "DISCOVER YOUR VISION",
          "TRUST INTUITION": "BELIEVE YOUR EYES",
          "EMBRACE SILENCE": "SEEK STILLNESS",
          "QUESTION EVERYTHING": "CLARIFY ASSUMPTIONS",
          TRUTH: "REALITY",
          WISDOM: "PERCEPTION",
          FOCUS: "CLARITY",
          ATTENTION: "OBSERVATION",
          AWARENESS: "RECOGNITION",
          PRESENCE: "ALERTNESS",
          SIMPLIFY: "DISTILL",
          REFINE: "SHARPEN",
        },
      };

      const updateCharacterWidths = () => {
        const isMobile = window.innerWidth < 1024;

        textRows.forEach((row) => {
          const rowId = row.dataset.rowId;
          if (!rowId) return;
          const textElement = row.querySelector<HTMLElement>(".text-content");
          if (!textElement) return;
          const computedStyle = window.getComputedStyle(textElement);
          const currentFontSize = computedStyle.fontSize;
          const chars = splitTexts[rowId]?.chars || [];

          chars.forEach((char, i) => {
            const inner = char.querySelector<HTMLElement>(".char-inner");
            const charText = char.textContent || inner?.textContent || "";
            if (!charText && i === 0) return;

            let charWidth = 0;

            if (isMobile) {
              const fontSizeValue = parseFloat(currentFontSize);
              const standardCharWidth = fontSizeValue * 0.6;
              charWidth = standardCharWidth;

              if (!inner && charText) {
                char.textContent = "";
                const innerSpan = document.createElement("span");
                innerSpan.className = "char-inner";
                innerSpan.textContent = charText;
                char.appendChild(innerSpan);
                innerSpan.style.transform = "translate3d(0, 0, 0)";
              }

              char.style.width = `${charWidth}px`;
              char.style.maxWidth = `${charWidth}px`;
              char.dataset.charWidth = String(charWidth);
              char.dataset.hoverWidth = String(charWidth);
            } else {
              const tempSpan = document.createElement("span");
              tempSpan.style.position = "absolute";
              tempSpan.style.visibility = "hidden";
              tempSpan.style.fontSize = currentFontSize;
              tempSpan.style.fontFamily = "Longsile, sans-serif";
              tempSpan.textContent = charText;
              document.body.appendChild(tempSpan);

              const actualWidth = tempSpan.offsetWidth;
              document.body.removeChild(tempSpan);

              const fontSizeValue = parseFloat(currentFontSize);
              const fontSizeRatio = fontSizeValue / 160;
              const padding = 10 * fontSizeRatio;

              charWidth = Math.max(actualWidth + padding, 30 * fontSizeRatio);

              if (!inner && charText) {
                char.textContent = "";
                const innerSpan = document.createElement("span");
                innerSpan.className = "char-inner";
                innerSpan.textContent = charText;
                char.appendChild(innerSpan);
                innerSpan.style.transform = "translate3d(0, 0, 0)";
              }

              char.style.width = `${charWidth}px`;
              char.style.maxWidth = `${charWidth}px`;
              char.dataset.charWidth = String(charWidth);

              const hoverWidth = Math.max(charWidth * 1.8, 85 * fontSizeRatio);
              char.dataset.hoverWidth = String(hoverWidth);
            }

            char.style.setProperty("--char-index", String(i));
          });
        });
      };

      updateCharacterWidths();

      let resizeTimer: ReturnType<typeof setTimeout>;
      const resizeHandler = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => updateCharacterWidths(), 250);
      };
      window.addEventListener("resize", resizeHandler);
      cleanupFns.push(() => window.removeEventListener("resize", resizeHandler));

      textRows.forEach((row, rowIndex) => {
        const rowId = row.dataset.rowId;
        const split = rowId ? splitTexts[rowId] : null;
        const chars = split?.chars || [];

        gsap.set(chars, { opacity: 0, filter: "blur(15px)" });

        gsap.to(chars, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.09,
          ease: "customEase",
          delay: 0.15 * rowIndex,
        });
      });

      const kineticType = container.querySelector<HTMLElement>("#kinetic-type");

      const forceResetKineticAnimation = () => {
        if (state.activeKineticAnimation) {
          state.activeKineticAnimation.kill();
          state.activeKineticAnimation = null;
        }

        if (!kineticType) return;
        gsap.killTweensOf([kineticType, typeLines, oddLines, evenLines]);

        gsap.set(kineticType, {
          display: "grid",
          scale: 1,
          rotation: 0,
          opacity: 1,
          visibility: "visible",
        });

        gsap.set(typeLines, {
          opacity: TYPE_LINE_OPACITY,
          x: "0%",
        });

        state.kineticAnimationActive = false;
      };

      const startKineticAnimation = (text: string) => {
        if (!kineticType) return;
        forceResetKineticAnimation();

        const repeatedText = `${text} ${text} ${text}`;
        typeLines.forEach((line) => {
          line.textContent = repeatedText;
        });

        const timeline = gsap.timeline({
          onComplete: () => {
            state.kineticAnimationActive = false;
          },
        });

        timeline.to(kineticType, {
          duration: 1.4,
          ease: "customEase",
          scale: 2.7,
          rotation: -90,
        });

        timeline.to(
          oddLines,
          {
            keyframes: [
              { x: "20%", duration: 1, ease: "customEase" },
              { x: "-200%", duration: 1.5, ease: "customEase" },
            ],
            stagger: 0.08,
          },
          0,
        );

        timeline.to(
          evenLines,
          {
            keyframes: [
              { x: "-20%", duration: 1, ease: "customEase" },
              { x: "200%", duration: 1.5, ease: "customEase" },
            ],
            stagger: 0.08,
          },
          0,
        );

        timeline.to(
          typeLines,
          {
            keyframes: [
              { opacity: 1, duration: 1, ease: "customEase" },
              { opacity: 0, duration: 1.5, ease: "customEase" },
            ],
            stagger: 0.05,
          },
          0,
        );

        state.kineticAnimationActive = true;
        state.activeKineticAnimation = timeline;
      };

      const fadeOutKineticAnimation = () => {
        if (!state.kineticAnimationActive || !kineticType) return;

        if (state.activeKineticAnimation) {
          state.activeKineticAnimation.kill();
          state.activeKineticAnimation = null;
        }

        const fadeOutTimeline = gsap.timeline({
          onComplete: () => {
            gsap.set(kineticType, {
              scale: 1,
              rotation: 0,
              opacity: 1,
            });

            gsap.set(typeLines, {
              opacity: TYPE_LINE_OPACITY,
              x: "0%",
            });

            state.kineticAnimationActive = false;
          },
        });

        fadeOutTimeline.to(kineticType, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "customEase",
        });
      };

      const switchBackgroundImage = (id: string) => {
        Object.values(backgroundImages).forEach((bg) => {
          if (!bg) return;
          gsap.to(bg, { opacity: 0, duration: 0.8, ease: "customEase" });
        });

        const target = backgroundImages[id as keyof typeof backgroundImages] || backgroundImages.default;
        if (target) {
          gsap.to(target, { opacity: 1, duration: 0.8, ease: "customEase", delay: 0.2 });
        }
      };

      const createTextRevealAnimation = (rowId: string) => {
        const timeline = gsap.timeline();

        timeline.to(backgroundTextItems, {
          opacity: 0.3,
          duration: 0.5,
          ease: "customEase",
        });

        timeline.call(() => {
          backgroundTextItems.forEach((item) => item.classList.add("highlight"));
        });

        timeline.call(
          () => {
            backgroundTextItems.forEach((item) => {
              const originalText = item.dataset.text || "";
              if (alternativeTexts[rowId] && alternativeTexts[rowId][originalText]) {
                item.textContent = alternativeTexts[rowId][originalText];
              }
            });
          },
          null,
          "+=0.5",
        );

        timeline.call(() => {
          backgroundTextItems.forEach((item) => {
            item.classList.remove("highlight");
            item.classList.add("highlight-reverse");
          });
        });

        timeline.call(
          () => {
            backgroundTextItems.forEach((item) => item.classList.remove("highlight-reverse"));
          },
          null,
          "+=0.5",
        );

        return timeline;
      };

      const resetBackgroundTextWithAnimation = () => {
        const timeline = gsap.timeline();

        timeline.call(() => backgroundTextItems.forEach((item) => item.classList.add("highlight")));

        timeline.call(
          () => {
            backgroundTextItems.forEach((item) => {
              item.textContent = item.dataset.originalText || "";
            });
          },
          null,
          "+=0.5",
        );

        timeline.call(() => {
          backgroundTextItems.forEach((item) => {
            item.classList.remove("highlight");
            item.classList.add("highlight-reverse");
          });
        });

        timeline.call(
          () => backgroundTextItems.forEach((item) => item.classList.remove("highlight-reverse")),
          null,
          "+=0.5",
        );

        timeline.to(backgroundTextItems, {
          opacity: 1,
          duration: 0.5,
          ease: "customEase",
        });

        return timeline;
      };

      const createTextReveal = (row: HTMLElement) => {
        const rowId = row.dataset.rowId;
        if (!rowId) return;

        const text = row.querySelector<HTMLElement>(".text-content")?.dataset.text || "";
        const chars = splitTexts[rowId]?.chars || [];
        const innerSpans = row.querySelectorAll<HTMLElement>(".char-inner");

        switchBackgroundImage(rowId);
        startKineticAnimation(text);

        if (state.textRevealAnimation) state.textRevealAnimation.kill();
        state.textRevealAnimation = createTextRevealAnimation(rowId);

        const timeline = gsap.timeline();

        timeline.to(
          chars,
          {
            maxWidth: (i, target) => parseFloat((target as HTMLElement).dataset.hoverWidth || "0"),
            duration: 0.64,
            stagger: 0.04,
            ease: "customEase",
          },
          0,
        );

        timeline.to(
          innerSpans,
          {
            x: -35,
            duration: 0.64,
            stagger: 0.04,
            ease: "customEase",
          },
          0.05,
        );
      };

      const activateRow = (row: HTMLElement) => {
        const rowId = row.dataset.rowId;
        if (!rowId || state.transitionInProgress) return;
        if (state.activeRowId === rowId) return;

        const activeRow = container.querySelector<HTMLElement>(".text-row.active");

        const toRow = row;
        const toRowId = rowId;

        const doTransition = (fromRow: HTMLElement, to: HTMLElement) => {
          const fromRowId = fromRow.dataset.rowId;
          if (!fromRowId) return;

          state.transitionInProgress = true;

          fromRow.classList.remove("active");
          const fromChars = splitTexts[fromRowId]?.chars || [];
          const fromInners = fromRow.querySelectorAll<HTMLElement>(".char-inner");

          gsap.killTweensOf(fromChars);
          gsap.killTweensOf(fromInners);

          to.classList.add("active");
          state.activeRowId = to.dataset.rowId || null;

          forceResetKineticAnimation();
          createTextReveal(to);

          gsap.set(fromChars, {
            maxWidth: (i, target) => parseFloat((target as HTMLElement).dataset.charWidth || "0"),
          });

          gsap.set(fromInners, { x: 0 });

          const toChars = splitTexts[toRowId]?.chars || [];
          const toInners = to.querySelectorAll<HTMLElement>(".char-inner");

          const timeline = gsap.timeline({
            onComplete: () => {
              state.transitionInProgress = false;
            },
          });

          timeline.to(
            toChars,
            {
              maxWidth: (i, target) => parseFloat((target as HTMLElement).dataset.hoverWidth || "0"),
              duration: 0.64,
              stagger: 0.04,
              ease: "customEase",
            },
            0,
          );

          timeline.to(
            toInners,
            {
              x: -35,
              duration: 0.64,
              stagger: 0.04,
              ease: "customEase",
            },
            0.05,
          );
        };

        if (activeRow) {
          doTransition(activeRow, toRow);
        } else {
          row.classList.add("active");
          state.activeRowId = rowId;
          createTextReveal(row);
        }
      };

      const deactivateRow = (row: HTMLElement) => {
        const rowId = row.dataset.rowId;
        if (!rowId) return;
        if (state.activeRowId !== rowId || state.transitionInProgress) return;

        state.activeRowId = null;
        row.classList.remove("active");

        switchBackgroundImage("default");
        fadeOutKineticAnimation();

        if (state.textRevealAnimation) state.textRevealAnimation.kill();
        state.textRevealAnimation = resetBackgroundTextWithAnimation();

        const chars = splitTexts[rowId]?.chars || [];
        const innerSpans = row.querySelectorAll<HTMLElement>(".char-inner");

        const timeline = gsap.timeline();

        timeline.to(
          innerSpans,
          {
            x: 0,
            duration: 0.64,
            stagger: 0.03,
            ease: "customEase",
          },
          0,
        );

        timeline.to(
          chars,
          {
            maxWidth: (i, target) => parseFloat((target as HTMLElement).dataset.charWidth || "0"),
            duration: 0.64,
            stagger: 0.03,
            ease: "customEase",
          },
          0.05,
        );
      };

      const initializeParallax = () => {
        const backgroundElements = [
          ...container.querySelectorAll<HTMLElement>("[id$='-bg']"),
          ...container.querySelectorAll<HTMLElement>(".bg-text-container"),
        ];

        const parallaxLayers = [0.02, 0.03, 0.04, 0.05];
        backgroundElements.forEach((el, index) => {
          el.dataset.parallaxSpeed = String(parallaxLayers[index % parallaxLayers.length]);
          gsap.set(el, { transformOrigin: "center center", force3D: true });
        });

        let lastParallaxTime = 0;
        const throttleParallax = 20;

        const mouseMoveHandler = (e: MouseEvent) => {
          const now = Date.now();
          if (now - lastParallaxTime < throttleParallax) return;
          lastParallaxTime = now;

          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const offsetX = (e.clientX - centerX) / centerX;
          const offsetY = (e.clientY - centerY) / centerY;

          backgroundElements.forEach((el) => {
            const speed = parseFloat(el.dataset.parallaxSpeed || "0");
            if (el.id && el.id.endsWith("-bg") && el.style.opacity === "0") return;

            const moveX = offsetX * 100 * speed;
            const moveY = offsetY * 50 * speed;

            gsap.to(el, { x: moveX, y: moveY, duration: 1.0, ease: "mouseEase", overwrite: "auto" });
          });
        };

        const mouseLeaveHandler = () => {
          backgroundElements.forEach((el) => {
            gsap.to(el, { x: 0, y: 0, duration: 1.5, ease: "customEase" });
          });
        };

        container.addEventListener("mousemove", mouseMoveHandler);
        container.addEventListener("mouseleave", mouseLeaveHandler);

        cleanupFns.push(() => {
          container.removeEventListener("mousemove", mouseMoveHandler);
          container.removeEventListener("mouseleave", mouseLeaveHandler);
        });

        backgroundElements.forEach((el, index) => {
          const delay = index * 0.2;
          const floatAmount = 5 + (index % 3) * 2;

          gsap.to(el, {
            y: `+=${floatAmount}`,
            duration: 3 + (index % 2),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay,
          });
        });
      };

      textRows.forEach((row) => {
        const interactiveArea = row.querySelector<HTMLElement>(".interactive-area");
        if (!interactiveArea) return;

        const enter = () => activateRow(row);
        const leave = () => {
          if (state.activeRowId === row.dataset.rowId) deactivateRow(row);
        };

        interactiveArea.addEventListener("mouseenter", enter);
        interactiveArea.addEventListener("mouseleave", leave);
        row.addEventListener("click", enter);

        cleanupFns.push(() => {
          interactiveArea.removeEventListener("mouseenter", enter);
          interactiveArea.removeEventListener("mouseleave", leave);
          row.removeEventListener("click", enter);
        });
      });

      const scrambleRandomText = () => {
        if (!scrambleRegistered) return;
        const items = Array.from(backgroundTextItems);
        if (!items.length) return;
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items[randomIndex];
        const originalText = randomItem.dataset.text || randomItem.textContent || "";

        gsap.to(randomItem, {
          duration: 1,
          scrambleText: { text: originalText, chars: "■▪▌▐▬", revealDelay: 0.5, speed: 0.3 },
          ease: "none",
        });

        const delay = 0.5 + Math.random() * 2;
        setTimeout(scrambleRandomText, delay * 1000);
      };

      setTimeout(scrambleRandomText, 1000);

      const simplicity = container.querySelector<HTMLElement>(".text-item[data-text='IS THE KEY']");
      if (simplicity) {
        const splitSimplicity = new SplitType(simplicity, { type: "chars", charsClass: "simplicity-char" });
        gsap.from(splitSimplicity.chars, {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          stagger: 0.015,
          ease: "customEase",
          delay: 1,
        });
        cleanupFns.push(() => splitSimplicity.revert());
      }

      backgroundTextItems.forEach((item, index) => {
        const delay = index * 0.1;
        gsap.to(item, {
          opacity: 0.85,
          duration: 2 + (index % 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay,
        });
      });

      initializeParallax();

      const style = document.createElement("style");
      style.textContent = `
        #kinetic-type {
          z-index: 200 !important;
          display: grid !important;
          visibility: visible !important;
          opacity: 1;
          pointer-events: none;
        }
      `;
      document.head.appendChild(style);
      cleanupFns.push(() => document.head.removeChild(style));

      const finish = () => {
        setVisible(false);
        sessionStorage.setItem("kineticIntroSeen", "true");
        window.dispatchEvent(new Event("kineticIntroComplete"));
      };

      const autoFinish = setTimeout(finish, 7000);
      cleanupFns.push(() => clearTimeout(autoFinish));
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="kinetic-overlay" role="presentation">
      <div className="background-frame"></div>

      <div className="background-image default" id="default-bg"></div>
      <div className="background-image focus" id="focus-bg"></div>
      <div className="background-image presence" id="presence-bg"></div>
      <div className="background-image feel" id="feel-bg"></div>

      <div className="bottom-gradient"></div>

      <div className="text-background">
        <div className="text-item" style={{ top: "5%", left: "8%" }} data-text="BE">BE</div>
        <div className="text-item" style={{ top: "5%", left: "15%" }} data-text="PRESENT">PRESENT</div>
        <div className="text-item" style={{ top: "5%", left: "28%" }} data-text="LISTEN">LISTEN</div>
        <div className="text-item" style={{ top: "5%", left: "42%" }} data-text="DEEPLY">DEEPLY</div>
        <div className="text-item" style={{ top: "5%", left: "55%" }} data-text="OBSERVE">OBSERVE</div>
        <div className="text-item" style={{ top: "5%", left: "75%" }} data-text="&">& </div>
        <div className="text-item" style={{ top: "5%", left: "85%" }} data-text="FEEL">FEEL</div>

        <div className="text-item" style={{ top: "10%", left: "12%" }} data-text="MAKE">MAKE</div>
        <div className="text-item" style={{ top: "10%", left: "45%" }} data-text="BETTER">BETTER</div>
        <div className="text-item" style={{ top: "10%", right: "20%" }} data-text="DECISIONS">DECISIONS</div>

        <div className="text-item" style={{ top: "15%", left: "8%" }} data-text="THE">THE</div>
        <div className="text-item" style={{ top: "15%", left: "30%" }} data-text="CREATIVE">CREATIVE</div>
        <div className="text-item" style={{ top: "15%", left: "55%" }} data-text="PROCESS">PROCESS</div>
        <div className="text-item" style={{ top: "15%", right: "20%" }} data-text="IS">IS</div>
        <div className="text-item" style={{ top: "15%", right: "5%" }} data-text="MYSTERIOUS">MYSTERIOUS</div>

        <div className="text-item" style={{ top: "25%", left: "5%" }} data-text="S">S</div>
        <div className="text-item" style={{ top: "25%", left: "10%" }} data-text="I">I</div>
        <div className="text-item" style={{ top: "25%", left: "15%" }} data-text="M">M</div>
        <div className="text-item" style={{ top: "25%", left: "20%" }} data-text="P">P</div>
        <div className="text-item" style={{ top: "25%", left: "25%" }} data-text="L">L</div>
        <div className="text-item" style={{ top: "25%", left: "30%" }} data-text="I">I</div>
        <div className="text-item" style={{ top: "25%", left: "35%" }} data-text="C">C</div>
        <div className="text-item" style={{ top: "25%", left: "40%" }} data-text="I">I</div>
        <div className="text-item" style={{ top: "25%", left: "45%" }} data-text="T">T</div>
        <div className="text-item" style={{ top: "25%", left: "50%" }} data-text="Y">Y</div>
        <div className="text-item" style={{ top: "25%", right: "5%" }} data-text="IS THE KEY">IS THE KEY</div>

        <div className="text-item" style={{ top: "35%", left: "25%" }} data-text="FIND YOUR VOICE">FIND YOUR VOICE</div>
        <div className="text-item" style={{ top: "35%", left: "65%" }} data-text="TRUST INTUITION">TRUST INTUITION</div>

        <div className="text-item" style={{ top: "50%", left: "5%" }} data-text="EMBRACE SILENCE">EMBRACE SILENCE</div>
        <div className="text-item" style={{ top: "50%", right: "5%" }} data-text="QUESTION EVERYTHING">QUESTION EVERYTHING</div>

        <div className="text-item" style={{ top: "75%", left: "20%" }} data-text="TRUTH">TRUTH</div>
        <div className="text-item" style={{ top: "75%", right: "20%" }} data-text="WISDOM">WISDOM</div>

        <div className="text-item" style={{ top: "80%", left: "10%" }} data-text="FOCUS">FOCUS</div>
        <div className="text-item" style={{ top: "80%", left: "35%" }} data-text="ATTENTION">ATTENTION</div>
        <div className="text-item" style={{ top: "80%", left: "65%" }} data-text="AWARENESS">AWARENESS</div>
        <div className="text-item" style={{ top: "80%", right: "10%" }} data-text="PRESENCE">PRESENCE</div>

        <div className="text-item" style={{ top: "85%", left: "25%" }} data-text="SIMPLIFY">SIMPLIFY</div>
        <div className="text-item" style={{ top: "85%", right: "25%" }} data-text="REFINE">REFINE</div>
      </div>

      <div className="main-content">
        <div className="sliced-container">
          <div className="text-row" data-row-id="focus">
            <div className="text-content" data-text="FOCUS">FOCUS</div>
            <div className="interactive-area"></div>
          </div>

          <div className="text-row" data-row-id="presence">
            <div className="text-content" data-text="PRESENCE">PRESENCE</div>
            <div className="interactive-area"></div>
          </div>

          <div className="text-row" data-row-id="feel">
            <div className="text-content" data-text="FEEL">FEEL</div>
            <div className="interactive-area"></div>
          </div>
        </div>
      </div>

      <div className="type" id="kinetic-type" aria-hidden="true">
        <div className="type-line odd">focus focus focus</div>
        <div className="type-line even">presence presence presence</div>
        <div className="type-line odd">feel feel feel</div>
        <div className="type-line even">focus focus focus</div>
        <div className="type-line odd">presence presence presence</div>
        <div className="type-line even">focus focus focus</div>
        <div className="type-line odd">focus focus focus</div>
        <div className="type-line even">presence presence presence</div>
        <div className="type-line odd">feel feel feel</div>
        <div className="type-line even">focus focus focus</div>
        <div className="type-line odd">presence presence presence</div>
        <div className="type-line even">focus focus focus</div>
      </div>
    </div>
  );
}
