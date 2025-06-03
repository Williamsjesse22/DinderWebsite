import 'https://unpkg.com/@splinetool/viewer@1.9.97/build/spline-viewer.js';

const container = document.getElementById('splineContainer');
const desktopSplineURL =
	'https://prod.spline.design/rvdCHiFk4mrCLsU8/scene.splinecode';
const mobileSplineURL =
	'https://prod.spline.design/rvdCHiFk4mrCLsU8/scene.splinecode';

let currentMode = null;
let isViewerLoaded = false;

// Create the viewer element (but don’t add to DOM yet)
function createViewer(mode) {
	const viewer = document.createElement('spline-viewer');
	viewer.setAttribute(
		'url',
		mode === 'mobile' ? mobileSplineURL : desktopSplineURL
	);
	viewer.style.width = '100%';
	viewer.style.height = '100%';
	return viewer;
}

// Load viewer into DOM
function loadViewer(mode) {
	if (isViewerLoaded) return;
	container.innerHTML = '';
	container.appendChild(createViewer(mode));
	isViewerLoaded = true;
	currentMode = mode;
}

// Remove viewer from DOM
function unloadViewer() {
	container.innerHTML = '';
	isViewerLoaded = false;
}

// Detect mode (desktop or mobile)
function detectMode() {
	return window.innerWidth < 768 ? 'mobile' : 'desktop';
}

// Debounced resize handling
let resizeTimeout;
window.addEventListener('resize', () => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		if (isViewerLoaded) {
			const mode = detectMode();
			if (mode !== currentMode) {
				loadViewer(mode);
			}
		}
	}, 150);
});

// Visibility detection
const observer = new IntersectionObserver(
	(entries) => {
		const entry = entries[0];
		if (entry.isIntersecting) {
			const mode = detectMode();
			loadViewer(mode);
		} else {
			unloadViewer();
		}
	},
	{
		root: null,
		threshold: 0.05,
	}
);

observer.observe(container);
