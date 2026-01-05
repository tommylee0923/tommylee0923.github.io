(() => {
    "use strict";

    const projectLink = document.getElementById("project_infoPage");
    const row = document.getElementById("projectRow");

    if (!projectLink || !row) return;

    projectLink.addEventListener("click", () => {
        projectLink.classList.toggle("clicked");
        row.classList.toggle("hidden");
    });
})();