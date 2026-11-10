"use client";
import { useEffect } from "react";

const TILT = ".service-card,.project-card,.process-list article,.principles article,.catalog-grid article,.solution-grid article,.production-feature,.venture-example,.engineering-points>div";
const LABELS = ".section-label,.eyebrow,.project-type,.sx-kicker";
const NUMS = ".card-top>span,.process-list article>span,.principles article>span,.catalog-grid article>span,.solution-grid article>span,.sx-mm-grid article>span,.sx-mm-path b,.sx-life>div>span,.production-flow span,.approval-flow article>span,.stage-topline span:last-child";
const GLYPHS = "01ABCDEFXYZ<>/#$%&";

/** Cursor glow, 3D card tilt with spotlight, click ink-splatter, scroll progress, text scramble. Skipped under reduced motion. */
export function FxLayer() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];
    const root = document.documentElement;

    const mk = (cls: string) => {
      const d = document.createElement("div");
      d.className = cls;
      d.setAttribute("aria-hidden", "true");
      document.body.appendChild(d);
      cleanups.push(() => d.remove());
      return d;
    };
    mk("fx-grain");
    const bar = mk("fx-progress");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty("--p", String(max > 0 ? scrollY / max : 0));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => removeEventListener("scroll", onScroll));

    if (fine) {
      const dot = mk("fx-cursor");
      const ring = mk("fx-ring");
      let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
      const loop = () => {
        rx += (x - rx) * 0.16;
        ry += (y - ry) * 0.16;
        dot.style.transform = `translate(${x}px,${y}px)`;
        ring.style.transform = `translate(${rx}px,${ry}px)`;
        raf = requestAnimationFrame(loop);
      };
      const move = (e: PointerEvent) => {
        x = e.clientX; y = e.clientY;
        root.classList.add("fx-on");
        ring.classList.toggle("is-hot", !!(e.target as Element | null)?.closest("a,button,summary,input,textarea,select"));
      };
      const leave = () => root.classList.remove("fx-on");
      const click = (e: PointerEvent) => {
        for (let i = 0; i < 14; i++) {
          const b = document.createElement("div");
          const s = 6 + Math.random() * 14, a = Math.random() * Math.PI * 2, d = 30 + Math.random() * 90;
          b.className = "fx-blot";
          b.style.cssText = `left:${e.clientX - s / 2}px;top:${e.clientY - s / 2}px;width:${s}px;height:${s}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d + 20}px`;
          document.body.appendChild(b);
          setTimeout(() => b.remove(), 950);
        }
      };
      raf = requestAnimationFrame(loop);
      addEventListener("pointermove", move);
      document.addEventListener("pointerleave", leave);
      addEventListener("pointerdown", click);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
        removeEventListener("pointerdown", click);
        root.classList.remove("fx-on");
      });

      document.querySelectorAll<HTMLElement>(TILT).forEach((el) => {
        if (getComputedStyle(el).position === "static") el.style.position = "relative";
        el.classList.add("fx-tilt");
        const spot = document.createElement("span");
        spot.className = "fx-spot";
        el.insertBefore(spot, el.firstChild);
        const m = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          spot.style.setProperty("--sx", `${px * 100}%`);
          spot.style.setProperty("--sy", `${py * 100}%`);
          el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 9}deg) rotateY(${(px - 0.5) * 11}deg) translateZ(8px)`;
        };
        const l = () => { el.style.transform = ""; };
        el.addEventListener("pointermove", m);
        el.addEventListener("pointerleave", l);
        cleanups.push(() => {
          el.removeEventListener("pointermove", m);
          el.removeEventListener("pointerleave", l);
          el.classList.remove("fx-tilt");
          el.style.transform = "";
          spot.remove();
        });
      });
    }

    const running = new WeakSet<HTMLElement>();
    const scramble = (el: HTMLElement, frames: number) => {
      if (running.has(el)) return;
      const nodes: Text[] = [];
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n = w.nextNode(); n; n = w.nextNode()) if (n.nodeValue?.trim()) nodes.push(n as Text);
      if (!nodes.length) return;
      running.add(el);
      const finals = nodes.map((n) => n.nodeValue ?? "");
      const box = el.getBoundingClientRect();
      const prevMin = el.style.minHeight;
      el.style.minHeight = `${box.height}px`; // hold layout so glyph widths can't reflow the page
      const start = performance.now(), dur = frames * 32;
      const done = () => {
        clearInterval(t);
        nodes.forEach((n, i) => (n.nodeValue = finals[i]));
        el.style.minHeight = prevMin;
        running.delete(el);
      };
      const t = setInterval(() => {
        const p = (performance.now() - start) / dur;
        nodes.forEach((n, i) => {
          const src = finals[i];
          n.nodeValue = src.split("").map((c, k) => (c === " " || k / src.length < p - 0.08 ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
        });
        if (p >= 1) done();
      }, 32);
      cleanups.push(done);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      scramble(el, el.matches(NUMS) ? 16 : 22);
    }), { threshold: 0.35 });
    document.querySelectorAll<HTMLElement>(`${LABELS},${NUMS}`).forEach((n) => io.observe(n));
    cleanups.push(() => io.disconnect());

    // numerals decode again whenever their card is hovered
    if (fine) {
      document.querySelectorAll<HTMLElement>(NUMS).forEach((num) => {
        const host = num.closest<HTMLElement>("article,.production-flow>div,.sx-life>div,.sx-mm-path>div,.card-top") ?? num;
        const h = () => scramble(num, 14);
        host.addEventListener("pointerenter", h);
        cleanups.push(() => host.removeEventListener("pointerenter", h));
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}
