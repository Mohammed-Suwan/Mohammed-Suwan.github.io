(function () {
const projects = [
  {
    title: "GANS",
    date: "2025-07-10", // TODO: set actual date (YYYY-MM-DD)
    description: "An image translator based on the concept of adversarial networks (GANs)",
    tools: "Django, HTML, CSS, Bootstrap, SQLite, AWS S3, Heroku",
    details: "Trained a Pix2Pix conditional GAN with a U-Net generator and PatchGAN discriminator to convert satellite images into Google Maps-style visualizations using Python and PyTorch libraries.   Collaborated with a 4-member team using GitHub for version control and a Gantt chart to coordinate milestones. Preprocessed and augmented 2,000+ image pairs to improve model robustness and reduce spatial bias. Achieved an L1 loss of 6.47% and a Structural Similarity Index of 0.69, demonstrating effective reconstruction.", 
    image: "/assets/img/gan.png",
    //demo: "https://galvanic-music.herokuapp.com/",
    //repo: "https://github.com/varadbhogayata/music-player"
  },
   {
    title: "GPSSafety",
    date: "2025-05-10", // TODO: set actual date (YYYY-MM-DD)
    description: "A GIS web application that helps users to find the safest path between two locations based on real-time crime data.",
    details: " Developed a C++-based GIS application prioritizing real-time access to safe navigation across Toronto. Implemented A* and multi-destination Dijkstra’s algorithms to compute the shortest and safest path. Integrated parallel programming and multithreading to boost runtime performance and reduce UI latency. Communicated with an external developer to gain API access for live Toronto crime data, anchoring the application around immediate safety awareness. Achieved search times under 100 ms, Toronto map load time of 4.22 seconds, and a System Usability Scale (SUS) score of 76, reflecting strong user experience and performance efficiency.", 
    tools: "Django, HTML, CSS, Bootstrap, SQLite, AWS S3, Heroku",
    details: "Trained a Pix2Pix conditional GAN with a U-Net generator and PatchGAN discriminator to convert satellite images into Google Maps-style visualizations using Python and PyTorch libraries.   Collaborated with a 4-member team using GitHub for version control and a Gantt chart to coordinate milestones. Preprocessed and augmented 2,000+ image pairs to improve model robustness and reduce spatial bias. Achieved an L1 loss of 6.47% and a Structural Similarity Index of 0.69, demonstrating effective reconstruction.", 
    image: "/assets/img_new/GPssafety.png",
    //demo: "https://galvanic-music.herokuapp.com/",
    //repo: "https://github.com/varadbhogayata/music-player"
  }
];
  // 2) Config: show this many on first load; the rest appear when clicking "Load more"
  const INITIAL_COUNT = 1;

  // 3) Helpers
  const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

  function esc(s) {
    // very light escape for text nodes/attrs
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function cardHTML(p) {
    const bulletsHTML = (p.bullets || [])
      .map((li) => `<li>${esc(li)}</li>`)
      .join("");

    // Optional action buttons (repo/demo)
    const actions =
      (p.repo || p.demo)
        ? `<div class="card-action">
             ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" class="btn-flat waves-effect">Source</a>` : ""}
             ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" class="btn-flat waves-effect">Live Demo</a>` : ""}
           </div>`
        : "";

    return `
      <div class="col s12 m6 l4">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img alt="Screenshot of ${esc(p.title)}" src="${esc(p.image)}" style="height: 100%; width: 100%" class="activator" />
          </div>
          <div class="card-content">
            <span class="card-title activator teal-text hoverline">
              ${esc(p.title)}<i class="mdi-navigation-more-vert right"></i>
            </span>
            <p>${esc(p.short || "")}</p>
          ${p.description ? `<p class="grey-text">${esc(p.description)}</p>` : ""}
          </div>
          <div class="card-reveal">
            <span class="card-title brown-text">
              <small>Accomplishments</small><i class="mdi-navigation-close right"></i>
            </span>
            <ul>${bulletsHTML}</ul>
            <ul>${esc(p.description || "")}</ul>
            <p>${esc(p.details || "")}</p>
            
            ${actions}
          </div>
        </div>
      </div>
    `;
  }

  // 4) Render logic
  let renderedCount = 0;
  let sorted = [];

  function renderNext(n) {
    const container = document.getElementById("recent-projects");
    if (!container) return;

    const next = sorted.slice(renderedCount, renderedCount + n);
    const html = next.map(cardHTML).join("");
    container.insertAdjacentHTML("beforeend", html);
    renderedCount += next.length;

    // Hide/disable button if done
    const btn = document.getElementById("load-more-projects");
    if (btn) {
      if (renderedCount >= sorted.length) {
        btn.disabled = true;
        btn.classList.add("disabled");
        btn.style.opacity = "0.6";
        btn.textContent = "All projects shown";
      } else {
        btn.disabled = false;
        btn.classList.remove("disabled");
        btn.style.opacity = "";
        btn.textContent = "Load more";
      }
    }
  }

  // 5) Init
  document.addEventListener("DOMContentLoaded", function () {
    // Sort newest → oldest
    sorted = projects.slice().sort(byDateDesc);

    // Render the most recent item(s)
    renderNext(Math.min(INITIAL_COUNT, sorted.length));

    // Wire the button to render the rest (older)
    const btn = document.getElementById("load-more-projects");
    if (btn) {
      btn.addEventListener("click", function () {
        // Load *all remaining* older projects
        renderNext(sorted.length - renderedCount);
      });
    }
  });
})();