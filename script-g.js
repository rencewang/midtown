const GRID_WIDTH = 5; // The number of tiles across the grid
const GRID_HEIGHT = 5; // The number of tiles down the grid
const TILE_SIZE = 200; // The size of each tile in pixels

const sidebar = document.querySelector('.sidebar');
const grid = document.querySelector('.grid');

// Generate the tiles for the grid
for (let x = 0; x < GRID_WIDTH; x++) {
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    // tile.style.width = TILE_SIZE + 'px';
    // tile.style.height = TILE_SIZE + 'px';
    // tile.style.left = (x * TILE_SIZE) / 2 + (y * TILE_SIZE) / 2 + 'px';
    // tile.style.top = (y * TILE_SIZE) / 4 - (x * TILE_SIZE) / 4 + 'px';
    grid.appendChild(tile);
  }
}

// // Add event listener for dragging a building from the sidebar
// let selectedBuilding = null;
// let offsetX = 0;
// let offsetY = 0;

// sidebar.addEventListener('mousedown', (event) => {
//   const building = event.target.closest('img');
//   if (building) {
//     selectedBuilding = building.cloneNode();
//     selectedBuilding.classList.add('selected');
//     sidebar.appendChild(selectedBuilding);
//     offsetX = event.offsetX;
//     offsetY = event.offsetY;
//   }
// });

// // Add event listener for dragging a building on the grid
// grid.addEventListener('mousemove', (event) => {
//   if (selectedBuilding) {
//     const x = Math.floor(event.clientX / TILE_SIZE) * TILE_SIZE;
//     const y = Math.floor(event.clientY / TILE_SIZE) * TILE_SIZE;
//     selectedBuilding.style.transform = `translate(${x - offsetX}px, ${
//       y - offsetY
//     }px)`;
//   }
// });

// // Add event listener for dropping a building on the grid
// grid.addEventListener('mouseup', (event) => {
//   if (selectedBuilding) {
//     const x = Math.floor(event.clientX / TILE_SIZE) * TILE_SIZE;
//     const y = Math.floor(event.clientY / TILE_SIZE) * TILE_SIZE;
//     const building = selectedBuilding.cloneNode();
//     building.classList.remove('selected');
//     building.style.transform = `translate(${x - offsetX}px, ${y - offsetY}px)`;
//     grid.appendChild(building);
//     selectedBuilding.remove();
//     selectedBuilding = null;
//   }
// });

// Add event listener for zooming in and out
let zoomLevel = 1;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

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

const zoomInButton = document.createElement('button');
zoomInButton.textContent = '+';
zoomInButton.addEventListener('click', zoomIn);
sidebar.appendChild(zoomInButton);

const zoomOutButton = document.createElement('button');
zoomOutButton.textContent = '-';
zoomOutButton.addEventListener('click', zoomOut);
sidebar.appendChild(zoomOutButton);

let isDragging = false;
let startX, startY;
let translateX = 0;
let translateY = 0;

grid.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
});

grid.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    translateX += deltaX / zoomLevel;
    translateY += deltaY / zoomLevel;
    grid.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px) skewX(-30deg)`;
    startX = event.clientX;
    startY = event.clientY;
  }
});

grid.addEventListener('mouseup', () => {
  isDragging = false;
});

// // Add function to save the grid as a PNG
// function saveAsPNG() {
//   const canvas = document.createElement('canvas');
//   canvas.width = GRID_WIDTH * TILE_SIZE;
//   canvas.height = GRID_HEIGHT * TILE_SIZE;
//   const ctx = canvas.getContext('2d');
//   ctx.scale(zoomLevel, zoomLevel);
//   const buildings = Array.from(grid.children).filter(
//     (child) => !child.classList.contains('tile')
//   );
//   buildings.forEach((building) => {
//     const x = parseInt(building.style.transform.split('(')[1].split('px')[0]);
//     const y = parseInt(building.style.transform.split(',')[1].split('px')[0]);
//     ctx.drawImage(building, x, y);
//   });
//   const dataURL = canvas.toDataURL();
//   const link = document.createElement('a');
//   link.download = 'grid.png';
//   link.href = dataURL;
//   link.click();
// }

// // Add event listener for saving as PNG
// const saveButton = document.createElement('button');
// saveButton.textContent = 'Save as PNG';
// saveButton.addEventListener('click', saveAsPNG);
// sidebar.appendChild(saveButton);
