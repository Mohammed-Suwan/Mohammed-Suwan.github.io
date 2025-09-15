console.log("projects.js loaded");
const projects = [
  {
    title: "Music Player Web-App",
    date: "2025-07-10", // TODO: set actual date (YYYY-MM-DD)
    description: "A music streaming web app based on Django",
    tools: "Django, HTML, CSS, Bootstrap, SQLite, AWS S3, Heroku",
    image: "/assets/img/project-music-player.png",
    demo: "https://galvanic-music.herokuapp.com/",
    repo: "https://github.com/varadbhogayata/music-player"
  },
  {
    title: "Quiz Web-App",
    date: "2025-06-05", // TODO: set actual date
    description: "A quiz playing web app based on Django",
    tools: "Django, HTML, CSS, Bootstrap, SQLite, Heroku",
    image: "/assets/img/project-quizup-logo-1.png",
    demo: "https://quiz-up-app.herokuapp.com/",
    repo: "https://github.com/varadbhogayata/QuizUp"
  },
  {
    title: "Blog Web-App",
    date: "2025-05-15", // TODO: set actual date
    description: "A simple and extensible blog web-app based on Flask.",
    tools: "HTML, CSS, Bootstrap, Flask, SQLAlchemy, PostgreSQL, Python",
    image: "/assets/img/project-blog-logo.jpg",
    demo: "https://flask-heroku-blog.herokuapp.com/",
    repo: "https://github.com/varadbhogayata/flask-blog"
  },
  {
    title: "Visual Question Answering",
    date: "2025-04-20", // TODO: set actual date
    description: "An attention-based classification model that generates an answer for a given input image.",
    tools: "CNN, LSTM, COCO, Python",
    image: "/assets/img/project-aim_bert-bias.png",
    demo: "",
    repo: "https://github.com/varadbhogayata/visual-question-answering"
  },
  {
    title: "Video Summarizer",
    date: "2025-03-10", // TODO: set actual date
    description: "A Seq2Seq model that generates a short summary of the given input video.",
    tools: "CNN, LSTM, MSVD, Python",
    image: "/assets/img/computer-vision-v2-04.png",
    demo: "",
    repo: "https://github.com/varadbhogayata/"
  }
];
projects.sort((a, b) => new Date(b.date) - new Date(a.date));

  // ------------- (C) DOM handles -------------
  const container = document.getElementById("recent-projects");
  const loadMoreBtn = document.getElementById("load-more-projects");

  // Show only the latest first
  let visibleCount = 1;
  const LOAD_STEP = 2; // how many to add each click

  // ------------- (D) Render helpers -------------
  function render() {
    container.innerHTML = "";
    for (let i = 0; i < Math.min(visibleCount, projects.length); i++) {
      container.appendChild(projectCard(projects[i]));
    }
    // Hide the button when all are shown
    loadMoreBtn.style.display = visibleCount >= projects.length ? "none" : "inline-flex";
  }

  function projectCard(p) {
    const col = document.createElement("div");
    col.className = "col s12 m6"; // Materialize grid; tweak for your CSS framework

    const dateStr = new Date(p.date).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "2-digit"
    });

    col.innerHTML = `
      <div class="card hoverable">
        ${p.image ? `
          <div class="card-image">
            <img src="${p.image}" alt="${escapeHtml(p.title)}">
            <span class="card-title">${escapeHtml(p.title)}</span>
          </div>
        ` : `
          <div class="card-content">
            <span class="card-title">${escapeHtml(p.title)}</span>
          </div>
        `}
        <div class="card-content">
          <p class="grey-text text-darken-1" style="margin-bottom:8px;">${dateStr}</p>
          <p>${escapeHtml(p.description)}</p>
          ${Array.isArray(p.tags) && p.tags.length
            ? `<div style="margin-top:10px;">${p.tags.map(t => `<span class="chip">${escapeHtml(t)}</span>`).join(" ")}</div>`
            : ""}
        </div>
        <div class="card-action">
          ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">View project</a>` : ""}
        </div>
      </div>
    `;
    return col;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[s]));
  }

  // ------------- (E) Wire up "Load more" -------------
  loadMoreBtn.addEventListener("click", () => {
    visibleCount = Math.min(visibleCount + LOAD_STEP, projects.length);
    render();
  });

  // Initial render: only latest project
  render();

