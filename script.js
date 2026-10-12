"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && window.matchMedia("(max-width: 640px)").matches) {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    }
  });
}

const lightbox = document.querySelector(".lightbox");

if (lightbox instanceof HTMLDialogElement) {
  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (!(lightboxImage instanceof HTMLImageElement)) return;
      lightboxImage.src = item.dataset.full || "";
      lightboxImage.alt = item.dataset.alt || "";
      lightbox.showModal();
    });
  });

  closeButton?.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      lightbox.close();
    }
  });
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => {
    if (lightboxImage instanceof HTMLImageElement) lightboxImage.removeAttribute("src");
  });
}
