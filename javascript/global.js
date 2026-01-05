(() => {
  "use strict";

  // ----- Helpers -----
  const $ = (sel, root = document) => root.querySelector(sel);

  function clampIndex(i, count) {
    if (count <= 0) return 1;
    if (i < 1) return count;
    if (i > count) return 1;
    return i;
  }

  // ----- Modal Controller -----
  const state = {
    isOpen: false,
    projectKey: null,
    dir: "",
    ext: ".webp",
    count: 0,
    index: 1,
    // Cache: projectKey -> DocumentFragment of thumbnails (or array of nodes)
    thumbCache: new Map(),
    // Cache: url -> true (preloaded)
    preloadCache: new Set(),
  };

  // DOM refs (filled on init)
  let modal, panel, closeBtn, backdrop;
  let titleEl, subtitleEl, descEl;
  let viewerImg, prevBtn, nextBtn;
  let thumbStrip, thumbTemplate;
  let imageNumberEl, totalImageEl;

  function init() {
    modal = $("#projectContainer");
    if (!modal) return; // page doesn't have the modal

    panel = $(".projectPanel", modal) || $("#projectInfo", modal) || modal;
    closeBtn = $("#closePopUp", modal);
    backdrop = $(".projectBackdrop", modal);

    titleEl = $("#projectTitle", modal);
    subtitleEl = $("#projectSubtitle", modal);
    descEl = $("#textContainer", modal);

    viewerImg = $("#nestedImg", modal);
    prevBtn = $("#preArrow", modal);
    nextBtn = $("#nextArrow", modal);

    thumbStrip = $("#thumbnails", modal);
    thumbTemplate = $("#thumbnailTemplate");

    imageNumberEl = $("#imageNumber", modal);
    totalImageEl = $("#totalImage", modal);

    // Guard: if key pieces are missing, do nothing (prevents crashes)
    if (!viewerImg || !thumbStrip || !prevBtn || !nextBtn || !titleEl) return;

    // Close handlers
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);

    // Close when clicking outside the panel (fallback if no backdrop)
    modal.addEventListener("click", (e) => {
      if (!state.isOpen) return;
      if (panel && panel.contains(e.target)) return;
      // allow clicks on modal content only; outside closes
      if (e.target === modal) close();
    });

    // Keyboard
    document.addEventListener("keydown", (e) => {
      if (!state.isOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });

    // Arrows
    prevBtn.addEventListener("click", () => step(-1));
    nextBtn.addEventListener("click", () => step(1));

    // Expose API for other scripts
    window.ProjectModal = {
      openFromElement,
      setDescriptionHtml,
      close,
    };
  }

  function openFromElement(el) {
    // Read data-* from the clicked project tile (button)
    const key = el.dataset.key || el.id || "project";
    const dir = (el.dataset.dir || "").trim();
    const ext = (el.dataset.ext || ".webp").trim();
    const count = Number(el.dataset.count || "0");
    const title = el.dataset.title || "Project";
    const subtitle = el.dataset.subtitle || "";

    if (!dir || !count) {
      console.warn("Missing data-dir or data-count for project:", key, el);
      return;
    }

    state.projectKey = key;
    state.dir = ensureTrailingSlash(dir);
    state.ext = ext;
    state.count = count;
    state.index = 1;

    // Update text
    titleEl.textContent = title;
    if (subtitleEl) subtitleEl.textContent = subtitle;

    // Tracker
    if (imageNumberEl) imageNumberEl.textContent = "1";
    if (totalImageEl) totalImageEl.textContent = String(count);

    // Build/reuse thumbnails
    renderThumbnails();

    // Show modal
    open();
    // Load first image
    setViewerImage(1);
  }

  function ensureTrailingSlash(p) {
    return p.endsWith("/") ? p : p + "/";
  }

  function open() {
    state.isOpen = true;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function close() {
    state.isOpen = false;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function step(direction) {
    const nextIndex = clampIndex(state.index + direction, state.count);
    setViewerImage(nextIndex);
  }

  function setViewerImage(i) {
    state.index = clampIndex(i, state.count);
    const url = `${state.dir}${state.index}${state.ext}`;

    viewerImg.src = url;
    viewerImg.alt = `${titleEl.textContent} — image ${state.index}`;

    if (imageNumberEl) imageNumberEl.textContent = String(state.index);

    // Update active thumb state
    markActiveThumb(state.index);

    // Light preload for neighbors (fast UX, low bandwidth)
    preloadNeighbor(state.index - 1);
    preloadNeighbor(state.index + 1);
  }

  function preloadNeighbor(i) {
    const idx = clampIndex(i, state.count);
    const url = `${state.dir}${idx}${state.ext}`;
    if (state.preloadCache.has(url)) return;

    const img = new Image();
    img.src = url;
    state.preloadCache.add(url);
  }

  function setDescriptionHtml(html) {
    if (!descEl) return;
    descEl.innerHTML = html || "";
  }

  function renderThumbnails() {
    // If you have a lot of images, caching saves DOM rebuild costs
    const key = state.projectKey;
    thumbStrip.innerHTML = "";

    if (state.thumbCache.has(key)) {
      // clone cached nodes so they can be re-inserted
      const cached = state.thumbCache.get(key);
      thumbStrip.appendChild(cached.cloneNode(true));
      bindThumbClicks(); // need to rebind because clone
      markActiveThumb(1);
      return;
    }

    const frag = document.createDocumentFragment();

    for (let i = 1; i <= state.count; i++) {
      const thumbBtn = makeThumbButton(i);
      frag.appendChild(thumbBtn);
    }

    // cache a copy
    state.thumbCache.set(key, frag.cloneNode(true));

    thumbStrip.appendChild(frag);
    bindThumbClicks();
    markActiveThumb(1);
  }

  function makeThumbButton(i) {
    // Use template if present
    if (thumbTemplate && thumbTemplate.content) {
      const node = thumbTemplate.content.firstElementChild.cloneNode(true);
      node.dataset.index = String(i);

      const img = node.querySelector("img");
      if (img) {
        img.src = `${state.dir}${i}${state.ext}`; // later: point to /thumb/
        img.alt = `${titleEl.textContent} thumbnail ${i}`;
      }
      return node;
    }

    // Fallback: build button manually
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "thumbnailBtn";
    btn.dataset.index = String(i);
    btn.setAttribute("aria-label", `Go to image ${i}`);

    const img = document.createElement("img");
    img.className = "thumbnailImg";
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 120;
    img.height = 80;
    img.src = `${state.dir}${i}${state.ext}`;
    img.alt = `${titleEl.textContent} thumbnail ${i}`;

    btn.appendChild(img);
    return btn;
  }

  function bindThumbClicks() {
    thumbStrip.addEventListener("click", (e) => {
      const btn = e.target.clostest("[data-index]");
      if (!btn) return;
      setViewerImage(Number(btn.dataset.index));
    })
  }

  function onThumbStripClick(e) {
    const btn = e.target.closest("[data-index]");
    if (!btn) {
      bindThumbClicks();
      return;
    }
    const i = Number(btn.dataset.index);
    setViewerImage(i);
    bindThumbClicks();
  }

  function markActiveThumb(i) {
    const nodes = thumbStrip.querySelectorAll("[data-index]");
    nodes.forEach((n) => {
      n.classList.toggle("active", Number(n.dataset.index) === i);
    });

    // Scroll active thumb into view (optional)
    const active = thumbStrip.querySelector(`[data-index="${i}"]`);
    if (active) {
      active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
