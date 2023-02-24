const sidebar = document.querySelector('.sidebar');
const grid = document.querySelector('.wrapper');
const zoomInButton = document.querySelector('#zoomIn');
const zoomOutButton = document.querySelector('#zoomOut');

// Add event listener for zooming in and out
let zoomLevel = 1;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;

function zoomIn() {
  zoomLevel += 0.1;
  zoomLevel = Math.min(zoomLevel, MAX_ZOOM);
  grid.style.transform = `scale(${zoomLevel})`;
}

function zoomOut() {
  zoomLevel -= 0.1;
  zoomLevel = Math.max(zoomLevel, MIN_ZOOM);
  grid.style.transform = `scale(${zoomLevel})`;
}

zoomInButton.addEventListener('click', zoomIn);
zoomOutButton.addEventListener('click', zoomOut);
