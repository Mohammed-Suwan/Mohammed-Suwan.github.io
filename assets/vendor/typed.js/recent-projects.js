const projects = [
    {
        title: "Project 1",
        description: "Description for Project 1",
        imageUrl: "https://via.placeholder.com/300",
        date: "2023-01-01"
    },
    {   title: "Project 2",
        description: "Description for Project 2",
        imageUrl: "https://via.placeholder.com/300",   
        date: "2023-02-01"
    },
    {   title: "Project 3",
        description: "Description for Project 3",
        imageUrl: "https://via.placeholder.com/300",   
        date: "2023-03-01"
    }
];
projects.sort((a, b) => new Date(b.date) - new Date(a.date));
const container = document.getElementById('recent-projects');

let displayedCount = 1; // Number of projects currently displayed
const projectsPerLoad = 2;

function createProjectCard(project) {
        return `
        <div class="col s12 m6 l4">
            <div class="card medium">
                <div class="card-image waves-effect waves-block waves-light">
                    <img alt="${project.title}" src="${project.imageUrl}" style="height: 100%; width: 100%" class="activator" />
                </div>
                <div class="card-content">
                    <span class="card-title activator teal-text hoverline">${project.title}<i class="mdi-navigation-more-vert right"></i></span>
                    <p>${project.description}</p>
                </div>
            </div>
        </div>
        `;
}

function renderProjects() {
        let html = '';
        for (let i = 0; i < displayedCount && i < projects.length; i++) {
                html += createProjectCard(projects[i]);
        }
        container.innerHTML = html;
}

function loadMoreProjects() {
        displayedCount += projectsPerLoad;
        renderProjects();
        if (displayedCount >= projects.length) {
                document.getElementById('load-more-projects').style.display = 'none';
        }
}

document.addEventListener('DOMContentLoaded', function() {
        displayedCount = 1; // Show only the latest project initially
        renderProjects();
        document.getElementById('load-more-projects').addEventListener('click', loadMoreProjects);
});
