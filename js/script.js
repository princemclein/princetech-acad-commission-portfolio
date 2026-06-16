// Navigation: hamburger toggle //

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Highlight active nav link on scroll //

function setActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  if (sections.length === 0) return;

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href.endsWith("#" + current) || href === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);

// Back to top button //

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Scroll-reveal for service & portfolio cards //

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll(
  ".service-card, .portfolio-item, .resume-item",
);

animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Certificate modal //

const certButtons = document.querySelectorAll(".cert-btn");
const certModal = document.getElementById("certModal");
const certModalOverlay = document.getElementById("certModalOverlay");
const certModalClose = document.getElementById("certModalClose");
const certModalImage = document.getElementById("certModalImage");
const certModalTitle = document.getElementById("certModalTitle");

if (
  certModal &&
  certModalOverlay &&
  certModalClose &&
  certModalImage &&
  certModalTitle
) {
  certButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      certModalImage.src = btn.dataset.certImg;
      certModalTitle.textContent = btn.dataset.certTitle;
      certModal.classList.add("active");
    });
  });

  const closeCertModal = () => {
    certModal.classList.remove("active");
  };

  certModalClose.addEventListener("click", closeCertModal);
  certModalOverlay.addEventListener("click", closeCertModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certModal.classList.contains("active")) {
      closeCertModal();
    }
  });
}

// Simple page transition: fade in on load, fade out before leaving //

window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("page-loaded");
  });
});

document
  .querySelectorAll('a[href$=".html"], a[href*=".html#"]')
  .forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Skip same-page anchors and links opening in a new tab
      if (link.target === "_blank") return;

      e.preventDefault();
      document.body.classList.remove("page-loaded");

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
