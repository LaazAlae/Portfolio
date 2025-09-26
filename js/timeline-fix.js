console.log('🔧 EMERGENCY TIMELINE FIX LOADED');

// Timeline emergency fix
function createWorkingTimeline() {
    console.log('📍 Creating working timeline...');

    const container = document.getElementById('timeline-container');
    if (!container) {
        console.error('❌ Timeline container not found!');
        return;
    }

    console.log('✅ Container found, creating timeline...');

    // Clear container
    container.innerHTML = '';

    // Add timeline line
    const line = document.createElement('div');
    line.className = 'timeline-line';
    container.appendChild(line);

    // Add timeline track
    const track = document.createElement('div');
    track.className = 'timeline-track';

    // Add projects
    if (typeof projectsData !== 'undefined') {
        console.log(`✅ Found ${projectsData.length} projects`);

        projectsData.forEach((project, index) => {
            console.log(`📦 Creating project: ${project.title}`);

            const item = document.createElement('div');
            item.className = 'timeline-item';

            item.innerHTML = `
                <div class="project-card" data-project="${project.id}">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                    </div>
                    <div class="project-content">
                        <span class="project-stage">${project.stage}</span>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-headline">${project.headline}</p>
                    </div>
                </div>
            `;

            // Add click handler
            const card = item.querySelector('.project-card');
            card.addEventListener('click', () => {
                console.log(`🔗 Opening project: ${project.id}`);
                if (typeof openProjectDialog === 'function') {
                    openProjectDialog(project.id);
                } else {
                    console.error('❌ openProjectDialog function not found');
                }
            });

            track.appendChild(item);
        });

        container.appendChild(track);
        console.log('✅ Timeline created successfully!');
    } else {
        console.error('❌ projectsData not found!');
        container.innerHTML = '<p style="color: red; padding: 20px;">ERROR: Project data not loaded!</p>';
    }
}

// Initialize immediately when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWorkingTimeline);
} else {
    createWorkingTimeline();
}
