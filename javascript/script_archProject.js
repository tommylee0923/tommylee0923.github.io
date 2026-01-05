(() => {
    "use strict";

    const PROJECT_DESCRIPTIONS = {
        Hawaii: `
        <div class="projectDescription">
            <h4 class="subInfo">Fall 2024</h4>
            <p>This project is rooted in the Hawaiian worldview of 'Āina—“the land that feeds”—and Ahupua'a, the 
            traditional land division system fostering sustainable relationships between people and their environment. 
            Unlike Western traditions that prioritize preservation and display, Hawaiian culture emphasizes the active 
            use of artifacts within communal practices, where they serve as living vessels for stories and traditions. 
            The design emphasizes spaces where these artifacts are not merely displayed but actively integrated into 
            cultural practices, strengthening connections between people, land, and tradition. Situated in Lo'i Kalo 
            Mini Park, a site with rich history of taro patches, the project creates spaces that unite poi-pounding and 
            other cultural practices with routine park maintenance. By blending food preparation, cultural activities, 
            and community stewardship, the architecture becomes both inspired by and a vessel for Hawaiian culture, 
            fostering its continued vibrancy and relevance.</p>
        </div>`,
        BeyondBooks: `
        <div class="projectDescription">
            <h4 class="subInfo">Fall 2023</h4>
            <p>tilizing the library as a shared repository of memories, the project employs Urban Resources Initiative as facilitators to cultivate an inclusive community centered around the library. The primary objective is to forge connections between the established library and URI, emphasizing meaningful interactions among people, nature (represented by trees), and domestic-like spaces. 
            <br>The aim is to craft intimate spaces that nurture openness, enhance accessibility, and ultimately give rise to a community that transcends the conventional role of Fair Haven Library, transforming it into a dynamic hub that embodies more than just a repository of books and knowledge.
            </p>
        </div>`,
        HomeAndRetreat: `
        <div class="projectDescription">
            <h4 class="subInfo">Spring 2023</h4>
            <h4 class="subTitle"> Respite, Safety, and Support for the Mothers and Children</h4>
            <p>Home and Retreat is in collaboration with Friends Center for Children at New Haven to provide housing for teachers (single mothers) and their children. 
            <br>Our house is to facilitate and celebrate the everyday lives of the mothers and children who will call it home. Entry circulation is oriented along a linear “cubby wall” that contains a variety
            of functions, becoming not only a device to ease the lives of mothers, but also a place of exploration and discovery for children. Additionally, the cubby wall divides the
            common kitchen from the families' private living spaces, allowing for privacy and engagement with both one another and the site's forest landscape.</p>
        </div>`,
        IsolatedOpenness: `
        <div class="projectDescription">
            <h4 class="subInfo">Fall 2022</h4>
            <h4 class="subTitle">Space, Form, Site, and Co-Authorship</h4>
            <p> Core One Studio focuses on how architecture is conceived, developed, and communicated, consecutively in scale and breadth to encompass materiality, construction, program, and site. Projects will begin with the experiential, organizational, and social capacity of built form and volume and end with a concrete site and program. Isolated Openness is a building that synthesizes and develops the collages, sections, and plans in the first half of the semester in the context of the site (Bangladesh) and programs (community center and daycare).</p>
        
            <p>Isolated Openness locates in Gaibandha, Bangladesh, where the site is surrounded by farmlands, resulting in the region being isolated by the river streams. Yet, the region is relatively open due to the farmlands and flat typology. The project stemmed from the idea of creating isolated openness, which is manifested clearly on the first floor, starting from the river stream, to farmlands, to the ground mounts around the building, and finally, to the central elevated spiritual space emphasized by the lightwell above.</p> 
            <p>The formal strategy of following a grid full of circles helps create isolated spatial islands while the sectional condition helps connect the spaces, hence achieving openness inside the seemingly enclosed building. The void at the middle of each floor serves as the sector of programs - one side is dedicated to adults and community centers, and the other is for a children's daycare. </p>
        </div>`,
        PainterHouse: `
        <div class="projectDescription">
            <h4 class="subInfo">Fall 2022</h4>
            <p> Located in Latvia, the project is a temporary home and workshop for two painters' families, providing a versatile space that accommodates the collective working
            space and the privacy of both families. The house focuses on the flexiblity in terms of the strategy of sptial organization, while simultaneously aims to capture the lake view.</p>
        </div>`,
        BooleanAuditorium: `
        <div class="projectDescription">
            <h4 class="subInfo">Spring 2022</h4>
            <h4 class="subTitle">Form = Structure + Shape</h4>
            <p> The 200B Studio is part of an integrated introductory design curriculum that engages a wider range of architectural concerns with a specific focus on form and space that are influenced by site, program, and circulation.</p>
            <p>The premise of this project follows the formula of <i>Form = Structure + Shape</i>. Structure can be understood as the organizational ideas that bring order and hierarchy to form, space, program, and materiality. Shape is the exterior contour or outline of something. It gives a general sense of an object's bounding condition. </p>
            <h4 class="subTitle">The Boolean Auditorium</h4>
            <p>The project started with a Boolean operation between a cross and a cube. Together with the site boundary serve as the Shape element. Following the shapes, a column grid system referencing the cross ensures the alignment of architectural elements. The facade also referenced this grid in the sense of the same angles and proportions. </p>
            <p>In light of the cross, circulation revolves around the centralized movement with the programs being closer to the perimeter and grouped based on their nature. Gathering spaces, working spaces, and auditorium-related spaces are distributed among different floors. The working spaces serve as a buffer zone between the gathering space and the auditorium, creating a smooth programmatic transition associated dwith spatial movement between the most active parts and the auditorium.</p>
        </div>`,
        LoopHouse: `
        <div class="projectDescription">
            <h4 class="subInfo">Fall 2021</h4>
            <h4 class="subTitle">The Duplex for a Nightowl and a Photophile</h4>
            <p>Extracted and developed architectural ideas based on the analysis of the precedent, Casa Poli by Pezo von Ellrichshausen, to represent the ideas as generators for subsequent architectures through formal operations. The process was then combined with the understanding of the syntax of form and formal operations to design a new architecture - a duplex for specified dwellers.</p>
            <h4 class="subTitle">The Loop House</h4>
            <p>Based on the formal logic and spatial configuration of the previous project - the duplex, the duplex is to be reduced to a single dwelling in size and scope. Additionally, a more public and community-based program is added to the site.</p>
        </div>`,
        LostInTime: `
        <div class="projectDescription">
            <h4 class="subInfo">Summer 2021</h4>
            <h4 class="subTitle">Time in Architecture</h4>
            <p>The perspective of time is relatively less talked about in architectural settings. Though time is hardly sensed accurately without any reference. time is what space makes it to be. This project focused on portraying time from an architectural perspective, aiming to design a learning space for the Avery-Fayerweather plaza at Columbia University.</p> 
            <h4 class="subTitle">The Playground and the Library</h4>
            <p>The design proposed the combination of the kid's playground and a newly established kid's library within Avery Library. The playground as a time frame holds childhood memories and simultaneously writes down new stories for the kids and Columbia University. Furthermore, it serves as one of the paths to the kid’s library and creates interactions with the Avery Library and the plaza, allowing more public engagement and encouraging dialogues between different communities.</p>
        </div>`,
        Reciplate: `
        <div class="projectDescription">
            <h4 class="subInfo">2018</h4>
            <h4 class="subTitle">Modular Structural Art</h4>
            <p>The seminar revolved around the creation of modular structural art through the characteristics of aggregation and accumulation. The modular units are required to be lightweight and used daily, especially easy to assemble. Hence, disposable plates and skewers are chosen as they are commonly used in Asian culture such as night markets.</p>
            <h4 class="subTitle">Urban Pavilion</h4>
            <p>The production of the units can be standardized and thus the structure is expandable. With careful planning, the plates and skewers formed into a dome-shaped structure that allows people to sit inside. The plates help reduce noise, provide shade, and simultaneously allow air circulation. Reciplate is not only a structural art but also an urban personal pavilion.</p>
        </div>`,
    };

    function onProjectClick(e) {
        const btn = e.target.closest("[data-project]");
        if (!btn) return;

        // Open modal + load images
        if (window.ProjectModal?.openFromElement) {
            window.ProjectModal.openFromElement(btn);
        }

        // Inject description (optional)
        const key = btn.dataset.key;
        const html = PROJECT_DESCRIPTIONS[key] || "";
        window.ProjectModal?.setDescriptionHtml?.(html);
    }

    document.addEventListener("click", onProjectClick);
})();