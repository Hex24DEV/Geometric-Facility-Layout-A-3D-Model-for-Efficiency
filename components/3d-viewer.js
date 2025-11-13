class ThreeDViewer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        #canvas-container {
          width: 100%;
          height: 500px;
          background: #1a202c;
          border-radius: 12px;
          overflow: hidden;
        }
      </style>
      <div id="canvas-container"></div>
    `;

    this.initScene();
  }

  initScene() {
    const container = this.shadowRoot.querySelector('#canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a202c);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 3, 2);
    scene.add(directionalLight);

    // === CREATE YOUR FACILITY BELOW ===
    const materials = {
      machine: new THREE.MeshStandardMaterial({ color: 0x4f46e5 }),
      storage: new THREE.MeshStandardMaterial({ color: 0x22c55e }),
      workstation: new THREE.MeshStandardMaterial({ color: 0xfacc15 }),
      pathway: new THREE.MeshStandardMaterial({ color: 0x9ca3af }),
    };

    // Floor
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x2d3748, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Machines (x, y, z positions)
    const machine1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials.machine);
    machine1.position.set(-3, 0.5, 2);
    scene.add(machine1);

    const machine2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 1.2), materials.machine);
    machine2.position.set(3, 0.5, -1);
    scene.add(machine2);

    // Workstations
    const station = new THREE.Mesh(new THREE.BoxGeometry(1, 0.7, 1), materials.workstation);
    station.position.set(0, 0.35, 0);
    scene.add(station);

    // Storage
    const storage = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 1), materials.storage);
    storage.position.set(-4, 0.5, -3);
    scene.add(storage);

    // Pathways (flat boxes)
    const path = new THREE.Mesh(new THREE.BoxGeometry(10, 0.05, 1), materials.pathway);
    path.position.set(0, 0.025, 0);
    scene.add(path);

    // === END OF FACILITY ===

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }
}

customElements.define('three-d-viewer', ThreeDViewer);
