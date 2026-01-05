(() => {
  "use strict";

  const PROJECT_DESCRIPTIONS = {
    SnakeGame: `
      <div class="projectDescription">
        <h4 class="subTitle">Classic Snake Game</h4>
        <p>
          Built with HTML, CSS, and JavaScript, this game brings a web-friendly twist to the arcade classic,
          featuring controls for both desktop and mobile users, customizable themes, and an interactive design.
        </p>
        <p>
          <a href="./snakeGame.html">Play it here</a>
        </p>
        <p>
          This project is based on a Snake Game tutorial and then extended with personal touches.
        </p>
      </div>
    `,

    Yolo: `
      <div class="projectDescription">
        <h4 class="subInfo">Co-authored with U Jin Seah</h4>
        <h4 class="subTitle">YOLOv8 AI Image Object Detection</h4>

        <p>
          This project leverages YOLOv8 for multi-class object detection and provides a streamlined workflow for
          integrating multiple disparate datasets. It includes tools for preprocessing, class remapping, model training,
          and ONNX export for deployment.
        </p>

        <h4 class="subTitle">Key features</h4>
        <ul>
          <li><strong>Dataset integration:</strong> combine datasets with different class mappings into one training set.</li>
          <li><strong>Training workflow:</strong> train a YOLOv8 model for multi-class object detection.</li>
          <li><strong>Class remapping:</strong> unify class IDs across datasets automatically.</li>
          <li><strong>Model export:</strong> export to ONNX for deployment.</li>
          <li><strong>Extendable:</strong> easy to incorporate new datasets/classes.</li>
        </ul>

        <p>
          <a href="https://github.com/tommylee0923/YOLOv8-Image-Object-DatasetIntegration" target="_blank" rel="noopener">
            View the GitHub repository
          </a>
        </p>
      </div>
    `,
  };

  function onProjectClick(e) {
    const btn = e.target.closest("[data-project]");
    if (!btn) return;

    // Open modal + load images
    window.ProjectModal?.openFromElement?.(btn);

    // Inject description
    const key = btn.dataset.key;
    const html = PROJECT_DESCRIPTIONS[key] || "";
    window.ProjectModal?.setDescriptionHtml?.(html);
  }

  document.addEventListener("click", onProjectClick);
})();
