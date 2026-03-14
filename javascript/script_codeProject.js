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
    IfcQA: `
      <div class="projectDescription">

    <h4 class="subInfo">Role: Sole developer · C# / JavaScript · BIM / IFC</h4>
    <h4 class="subTitle">IfcQA — IFC Model Validation Tool</h4>

    <p>
        IfcQA is a lightweight BIM validation tool written in C#/.NET that analyzes IFC models and produces structured
        QA reports.
        The tool parses IFC data, evaluates rule-based checks, and exports results in HTML, JSON, and CSV formats for
        both human review and machine-readable workflows.
    </p>

    <figure class="projectFigure">
    <img
      src="./image/webp/codeProjects/IfcQA/ReportOverview.webp"
      alt="IfcQA report viewer with issue table and 3D model inspection"
      class="projectInlineImg">
      <figcaption>
        IfcQA report interface combining issue table inspection with an interactive 3D model viewer.
      </figcaption>
    </figure>

    <p>
        Rather than treating validation as a single script or report generator, the project explores how BIM model
        analysis can be structured as a clear software pipeline.
        The diagram below shows the overall architecture of the validation process.
    </p>

    <figure class="projectFigure">
        <img src="./image/webp/codeProjects/IfcQA/FlowDiagram.webp"
            alt="IfcQA validation and report generation flow diagram" class="projectInlineImg">
        <figcaption>
            IfcQA validation pipeline: ruleset loading, analysis engine, and report generation.
        </figcaption>
    </figure>

    <p>
        In many BIM delivery workflows, quality checks are performed manually or through fragmented toolchains.
        IfcQA was designed as a lightweight validation layer that can run before model handoff, making model issues
        easier to identify and communicate in a repeatable format.
    </p>

    <p>
        A key design decision in the project is to structure validation results around element identity.
        Issues are associated with IFC element GlobalIds so they can be linked back to geometry in the viewer.
    </p>

    <figure class="projectFigure">
        <img src="./image/webp/codeProjects/IfcQA/ViewerConcept.webp" alt="Issue to model linking concept diagram"
            class="projectInlineImg">
        <figcaption>
            Concept diagram of issue-to-geometry linking in the report viewer using element GlobalIds.
        </figcaption>
    </figure>

    <p>
        Preserving this identity allows the report viewer to highlight elements directly inside the 3D model.
        When a user selects or hovers over an issue, the viewer resolves the corresponding GlobalId and highlights the
        associated mesh.
        This makes validation results spatially understandable rather than purely textual.
    </p>

    <p>
        The viewer interaction system relies on raycasting and mesh indexing to map user input back to BIM elements.
        The diagram below documents the internal viewer workflow used to resolve user interactions and update highlight
        states.
    </p>

    <figure class="projectFigure">
        <img src="./image/webp/codeProjects/IfcQA/ViewerTechnical.webp" alt="Three.js viewer technical diagram"
            class="projectInlineImg">
        <figcaption>
            Three.js viewer architecture showing model loading, mesh indexing, raycasting, and selection logic.
        </figcaption>
    </figure>

    <p>
        Overall, IfcQA demonstrates how BIM model validation, structured issue data, and interactive visualization can
        be designed as a connected system rather than isolated tools.
        The project focuses on clear data flow, separation of responsibilities, and the ability to extend validation
        rules and outputs without changing the core architecture.
    </p>

    <p>
        <a href="https://github.com/tommylee0923/ifcqa-tool" target="_blank" rel="noopener">
            View the GitHub repository
        </a>
    </p>

</div>
`,
  };

  function onProjectClick(e) {
    const btn = e.target.closest("[data-project]");
    if (!btn) return;

    const key = btn.dataset.key;
    const html = PROJECT_DESCRIPTIONS[key] || `
  <div class="projectDescription">
    <h4 class="subTitle">Project</h4>
    <p>Description coming soon.</p>
  </div>
`;

    window.ProjectModal?.openFromElement?.(btn);
    window.ProjectModal?.setDescriptionHtml?.(html);
  }

  document.addEventListener("click", onProjectClick);
})();
