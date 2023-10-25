let timeout;
let camera, scene, renderer, geometry, material, mesh;

document.addEventListener("mousemove", resetTimer, false);
document.addEventListener("mousedown", resetTimer, false);
document.addEventListener("keydown", resetTimer, false);
document.addEventListener("scroll", resetTimer, false);
document.addEventListener("touchmove", resetTimer, false);

function setupScreensaver() {
    if (scene) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

   
    geometry = new THREE.BoxGeometry(2, 2, 2); 
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('screensaver').appendChild(renderer.domElement);
}

function startScreensaver() {
    setupScreensaver();
    document.getElementById('screensaver').style.display = 'block';
    animate();
}

function animate() {
    requestAnimationFrame(animate);


    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.015;
    renderer.render(scene, camera);
}

function stopScreensaver() {
    document.getElementById('screensaver').style.display = 'none';
}

function resetTimer() {
    clearTimeout(timeout);
    stopScreensaver();
    timeout = setTimeout(startScreensaver, 60000);
}

resetTimer(); 