const images = document.querySelectorAll('.screen-content .screen-image');
const titles = document.querySelectorAll('.title-box .screen-description');
const descriptions = document.querySelectorAll(
	'.description-box .screen-description'
);
const infographicSection = document.querySelector('.mock-phone-section');

let index = 0;
let intervalId = null;

function showSlide(i) {
	images.forEach((img, idx) => img.classList.toggle('active', idx === i));
	titles.forEach((title, idx) => title.classList.toggle('active', idx === i));
	descriptions.forEach((desc, idx) =>
		desc.classList.toggle('active', idx === i)
	);
}

function startCycling() {
	if (!intervalId) {
		intervalId = setInterval(() => {
			index = (index + 1) % images.length;
			showSlide(index);
		}, 5000); // adjust cycle time here
	}
}

function stopCycling() {
	clearInterval(intervalId);
	intervalId = null;
}

// Initial show
showSlide(index);

// Set up observer to watch if the section is in view
const observer = new IntersectionObserver(
	(entries) => {
		const isVisible = entries[0].isIntersecting;
		if (isVisible) {
			startCycling();
		} else {
			stopCycling();
		}
	},
	{
		root: null, // viewport
		threshold: 0.2, // at least 20% in view
	}
);

observer.observe(infographicSection);
