const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => navObserver.observe(section));

document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("user-is-tabbing");
});

lucide.createIcons();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animatedElements = document.querySelectorAll(
  [
    ".hero-copy > *",
    ".signal-panel",
    ".section-heading",
    ".compact-card",
    ".process-card",
    ".offer-row",
    ".case-card",
    ".about-copy > *",
    ".metric-row > *",
    ".no-list > *",
    ".contact-card",
  ].join(", ")
);

animatedElements.forEach((element, index) => {
  element.classList.add("animate-on-scroll");
  element.style.setProperty("--stagger-delay", `${(index % 5) * 55}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  },
  {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.12,
  }
);

animatedElements.forEach((element) => revealObserver.observe(element));

const heroCanvas = document.getElementById("hero-canvas");

if (heroCanvas && !reducedMotion) {
  const ctx = heroCanvas.getContext("2d");
  let width = 0;
  let height = 0;
  let nodes = [];

  const resizeCanvas = () => {
    const section = heroCanvas.closest(".hero-section");
    if (!section) return;

    width = section.clientWidth;
    height = section.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    heroCanvas.width = width * dpr;
    heroCanvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(24, Math.min(52, Math.floor(width / 34)));
    nodes = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      color: index % 5 === 0 ? "#ff006e" : index % 3 === 0 ? "#0b5fff" : "#111111",
    }));
  };

  const drawGrid = () => {
    ctx.strokeStyle = "rgba(17, 17, 17, 0.055)";
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 44) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += 44) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    drawGrid();

    nodes.forEach((node, index) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < -10) node.x = width + 10;
      if (node.x > width + 10) node.x = -10;
      if (node.y < -10) node.y = height + 10;
      if (node.y > height + 10) node.y = -10;

      for (let j = index + 1; j < nodes.length; j += 1) {
        const other = nodes[j];
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(17, 17, 17, ${0.11 - distance / 1500})`;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.fillStyle = node.color;
      ctx.globalAlpha = node.color === "#111111" ? 0.28 : 0.68;
      ctx.arc(node.x, node.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    window.requestAnimationFrame(render);
  };

  resizeCanvas();
  render();
  window.addEventListener("resize", resizeCanvas);
}
