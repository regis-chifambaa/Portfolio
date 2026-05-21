// ── Navbar scroll effect ──────────────────────────────
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});


// ── Mobile menu ───────────────────────────────────────
const navToggle  = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    navToggle.textContent = mobileMenu.classList.contains("open") ? "✕" : "☰";
});

function closeMenu() {
    mobileMenu.classList.remove("open");
    navToggle.textContent = "☰";
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
    }
});


// ── Scroll reveal animation ───────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    ".stat-card, .skill-pill, .project-card, .contact-card, .about-text p"
).forEach((el, i) => {
    el.style.opacity    = "0";
    el.style.transform  = "translateY(20px)";
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    observer.observe(el);
});

document.addEventListener("animationstart", () => {}, false);

// Add visible class via IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    ".stat-card, .skill-pill, .project-card, .contact-card, .about-text p"
).forEach(el => revealObserver.observe(el));


// ── Active nav link on scroll ─────────────────────────
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute("id");
        }
    });

    document.querySelectorAll(".nav-links a").forEach(a => {
        a.style.color = a.getAttribute("href") === `#${current}`
            ? "#facc15"
            : "";
    });
});
