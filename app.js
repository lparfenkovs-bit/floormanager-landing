const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const revealTargets = document.querySelectorAll(".reveal");
const year = document.getElementById("year");
const leadForms = document.querySelectorAll("[data-mailto]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

if (header && navToggle) {
  const setOpen = (open) => {
    header.dataset.open = String(open);
    navToggle.setAttribute("aria-expanded", String(open));
  };

  navToggle.addEventListener("click", () => {
    setOpen(header.dataset.open !== "true");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 760px)").matches) {
        setOpen(false);
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target) && header.dataset.open === "true") {
      setOpen(false);
    }
  });
}

leadForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const mailto = form.getAttribute("data-mailto");
    if (!mailto) {
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(
      `floormanager.app demo request${company ? ` - ${company}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        name ? `Name: ${name}` : null,
        company ? `Company: ${company}` : null,
        email ? `Email: ${email}` : null,
        message ? `Message: ${message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
