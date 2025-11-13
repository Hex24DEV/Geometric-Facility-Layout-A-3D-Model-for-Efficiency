// components/3d-viewer.js
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
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #1a202c;
        }
      </style>
      <div id="canvas-container"></div>
    `;
    this.initScene();
  }

  initScene() {
    const container = this.shadowRoot.getElementById('canvas-container');

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a202c);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(3, 5, 2);
    scene.add(dirLight);

    // Materials
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

    // Example Factory Layout
    const addBox = (x, y, z, sizeX, sizeY, sizeZ, mat) => {
      const geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.set(x, y, z);
      scene.add(mesh);
    };

    addBox(-3, 0.5, 2, 1, 1, 1, materials.machine);      // Machine
    addBox(3, 0.5, -1, 1.2, 1, 1.2, materials.machine); // Machine
    addBox(0, 0.35, 0, 1, 0.7, 1, materials.workstation);// Workstation
    addBox(-4, 0.5, -3, 2, 1, 1, materials.storage);    // Storage
    addBox(0, 0.025, 0, 10, 0.05, 1, materials.pathway); // Pathway

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }
}

customElements.define('three-d-viewer', ThreeDViewer);
