/* =============================
   5. MOBILE MENU & NAVBAR
============================= */
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");
  if (!hamburger || !menu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
    }
  });
}

initMobileMenu();

function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

function initActiveNavLinks() {
  const path = window.location.pathname;
  // Get the current filename (e.g., "lagos-listings.html")
  const page = path.split("/").pop() || "index.html";
  const allLinks = document.querySelectorAll(".nav-center a, .mobile-menu a");

  allLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (!linkHref) return;

    // Remove any existing active class first
    link.classList.remove("active");

    // Clean the linkHref for comparison (remove queries like ?type=...)
    const cleanLinkHref = linkHref.split("?")[0];

    // 1. Handle Home Page
    if (
      (page === "index.html" || page === "") &&
      cleanLinkHref === "index.html"
    ) {
      link.classList.add("active");
    }
    // 2. Handle Exact Matches (This prevents "listings.html" matching "lagos-listings.html")
    else if (page === cleanLinkHref) {
      link.classList.add("active");
    }
    /* 3. Special Case: If we are on a property detail page, underline "All Properties"
    else if (page === "property.html" && cleanLinkHref === "listings.html") {
      link.classList.add("active");
    }*/
  });
}
initNavbar();
initActiveNavLinks();

/* =============================
    SCROLL & ANIMATIONS
============================= */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) scrollTopBtn.classList.add("show");
    else scrollTopBtn.classList.remove("show");
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initScrollAnimations() {
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add("active");
      } else if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove("active");
        entry.target.style.transitionDelay = "0s";
      }
    });
  }, observerOptions);
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
initScrollToTop();
initScrollAnimations();

/* =============================
   Programs Toggle
============================= */
document.addEventListener("DOMContentLoaded", initProgramButtons);
function initProgramButtons() {
  const primaryBtn = document.getElementById("primary-program-btn");
  const juniorBtn = document.getElementById("junior-program-btn");
  const seniorBtn = document.getElementById("senior-program-btn");
  const primaryTab = document.getElementById("primary-tab");
  const juniorTab = document.getElementById("junior-tab");
  const seniorTab = document.getElementById("senior-tab");
  const hash = window.location.hash;

  if (
    !primaryBtn ||
    !juniorBtn ||
    !seniorBtn ||
    !primaryTab ||
    !juniorTab ||
    !seniorTab
  )
    return;

  primaryBtn.onclick = () => {
    primaryTab.style.display = "block";
    juniorTab.style.display = "none";
    seniorTab.style.display = "none";
    primaryBtn.classList.add("active");
    juniorBtn.classList.remove("active");
    seniorBtn.classList.remove("active");
  };

  juniorBtn.onclick = () => {
    juniorTab.style.display = "block";
    primaryTab.style.display = "none";
    seniorTab.style.display = "none";
    juniorBtn.classList.add("active");
    primaryBtn.classList.remove("active");
    seniorBtn.classList.remove("active");
  };

  seniorBtn.onclick = () => {
    seniorTab.style.display = "block";
    primaryTab.style.display = "none";
    juniorTab.style.display = "none";
    seniorBtn.classList.add("active");
    primaryBtn.classList.remove("active");
    juniorBtn.classList.remove("active");
  };

  function showTab(tab, btn) {
    primaryTab.style.display = "none";
    juniorTab.style.display = "none";
    seniorTab.style.display = "none";

    primaryBtn.classList.remove("active");
    juniorBtn.classList.remove("active");
    seniorBtn.classList.remove("active");

    tab.style.display = "block";
    btn.classList.add("active");
  }

  // Handle URL hash
  if (hash === "#junior-tab") {
    showTab(juniorTab, juniorBtn);
  } else if (hash === "#senior-tab") {
    showTab(seniorTab, seniorBtn);
  } else {
    showTab(primaryTab, primaryBtn); // default
  }
}

/* =============================
    INFO BTN SCROLLING TEXT (Mobile Only)
============================= */
const track = document.getElementById("scrollTrack");
const container = document.getElementById("scrollContainer");

// Only run the logic if the screen is 400px or smaller
if (window.innerWidth <= 400) {
  // 1. Create and add the 'Loop Divider' dynamically
  const loopDivider = document.createElement("span");
  loopDivider.className = "divider";
  track.appendChild(loopDivider);

  // 2. Clone the track for the infinite loop
  const clone = track.cloneNode(true);
  container.appendChild(clone);

  let scrollLeft = 0;
  const speed = 0.6; // Slightly slower for readability
  let isPaused = false;

  // 3. Animation Logic
  function animate() {
    if (!isPaused) {
      scrollLeft += speed;

      // Reset when the first track finishes
      if (scrollLeft >= track.offsetWidth) {
        scrollLeft = 0;
      }
      container.scrollLeft = scrollLeft;
    }
    requestAnimationFrame(animate);
  }

  // Start
  animate();

  // Interaction: Pause on touch/hover
  container.addEventListener("mouseenter", () => (isPaused = true));
  container.addEventListener("mouseleave", () => (isPaused = false));
  container.addEventListener("touchstart", () => (isPaused = true));
  container.addEventListener("touchend", () => (isPaused = false));
}
