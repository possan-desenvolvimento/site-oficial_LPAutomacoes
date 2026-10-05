import * as THREE from '../assets/vendor/three.module.js';

const host = document.getElementById('avatar-scene');
const pauseButton = document.getElementById('avatar-pause');
const resetButton = document.getElementById('avatar-reset');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

if (host) {
    try {
        buildAvatar();
    } catch (error) {
        host.closest('.portrait-media').classList.remove('avatar-ready');
        console.warn('A cena 3D não pôde ser iniciada; a foto foi preservada.', error);
    }
}

function buildAvatar() {
    const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.setAttribute('aria-label', 'Personagem 3D inspirado em Leonardo, com óculos e headset, trabalhando no computador');
    renderer.domElement.setAttribute('role', 'img');
    host.append(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
    const target = new THREE.Vector3(0, 1.4, 0.35);
    const material = (color, roughness = 0.6, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const skin = material('#bc8868', 0.64);
    const lip = material('#985d50', 0.72);
    const hair = material('#171511', 0.8);
    const beard = material('#25201b', 0.9);
    const shirt = material('#e6e2dc', 0.95);
    const black = material('#1c2027', 0.55);
    const metal = material('#373e48', 0.35, 0.65);
    const blue = material('#078bff', 0.28, 0.35);
    const glow = new THREE.MeshStandardMaterial({ color:'#47baff', emissive:'#1389ff', emissiveIntensity:2.2 });
    const sphereGeometry = new THREE.SphereGeometry(1, 48, 32);

    function mesh(geometry, surface, parent, position, scale) {
        const object = new THREE.Mesh(geometry, surface);
        if (position) object.position.set(...position);
        if (scale) object.scale.set(...scale);
        object.castShadow = true;
        object.receiveShadow = true;
        parent.add(object);
        return object;
    }
    const sphere = (parent, surface, position, scale) => mesh(sphereGeometry, surface, parent, position, scale);
    const box = (parent, surface, position, scale) => mesh(new THREE.BoxGeometry(...scale), surface, parent, position);
    function bone(parent, start, end, radius, surface, endRadius = radius) {
        const from = new THREE.Vector3(...start);
        const to = new THREE.Vector3(...end);
        const direction = to.clone().sub(from);
        const object = mesh(new THREE.CylinderGeometry(endRadius, radius, direction.length(), 24), surface, parent);
        object.position.copy(from.add(to).multiplyScalar(0.5));
        object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
        return object;
    }
    function curve(parent, points, radius, surface, closed = false) {
        const path = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)), closed);
        return mesh(new THREE.TubeGeometry(path, 48, radius, 8, closed), surface, parent);
    }

    scene.add(new THREE.HemisphereLight('#cce5ff', '#333139', 2.1));
    const key = new THREE.DirectionalLight('#fff0df', 3.2);
    key.position.set(-3, 5, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -2;
    key.shadow.normalBias = 0.035;
    scene.add(key);
    const rim = new THREE.PointLight('#128aff', 16, 8, 2);
    rim.position.set(-1.7, 2.8, -1.2);
    scene.add(rim);
    const monitorLight = new THREE.PointLight('#78caff', 3.5, 3, 2);
    monitorLight.position.set(0.2, 1.8, 1.05);
    scene.add(monitorLight);

    const floor = mesh(new THREE.PlaneGeometry(12, 12), new THREE.ShadowMaterial({ opacity:0.22 }), scene);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.03;
    floor.castShadow = false;

    const chair = new THREE.Group();
    scene.add(chair);
    box(chair, black, [0, 0.98, -0.03], [0.95, 0.15, 0.85]);
    const backrest = sphere(chair, black, [0, 1.63, -0.32], [0.52, 0.75, 0.13]);
    backrest.rotation.x = -0.13;
    bone(chair, [0, 0.15, 0], [0, 0.94, 0], 0.065, metal);
    for (let index = 0; index < 5; index++) {
        const angle = index * Math.PI * 2 / 5;
        const end = [Math.cos(angle) * 0.46, 0.13, Math.sin(angle) * 0.46];
        bone(chair, [0, 0.17, 0], end, 0.026, metal);
        sphere(chair, black, end, [0.065, 0.055, 0.06]);
    }

    const person = new THREE.Group();
    scene.add(person);
    sphere(person, material('#242d38'), [-0.23, 0.87, 0.34], [0.21, 0.19, 0.48]);
    sphere(person, material('#242d38'), [0.23, 0.87, 0.34], [0.21, 0.19, 0.48]);
    bone(person, [-0.27, 0.84, 0.65], [-0.29, 0.19, 0.55], 0.12, black, 0.15);
    bone(person, [0.27, 0.84, 0.65], [0.29, 0.19, 0.55], 0.12, black, 0.15);
    sphere(person, black, [-0.29, 0.13, 0.72], [0.14, 0.09, 0.27]);
    sphere(person, black, [0.29, 0.13, 0.72], [0.14, 0.09, 0.27]);
    const torso = sphere(person, shirt, [0, 1.43, 0], [0.43, 0.52, 0.26]);
    torso.rotation.x = 0.06;
    bone(person, [0, 1.84, 0.02], [0, 2.04, 0.03], 0.12, skin);
    curve(person, [[-0.15,1.87,0.2],[-0.06,1.8,0.28],[0,1.79,0.29],[0.08,1.81,0.27],[0.15,1.87,0.2]], 0.024, shirt);
    box(person, material('#d4cfc5'), [0, 1.69, 0.26], [0.027, 0.16, 0.018]);
    for (let index = 0; index < 3; index++) sphere(person, material('#b9a184'), [0, 1.73 - index * 0.055, 0.278], [0.009, 0.009, 0.004]);

    const hands = [];
    const fingers = [];
    for (const side of [-1, 1]) {
        const shoulder = [side * 0.35, 1.74, 0.01];
        const elbow = [side * 0.51, 1.21, 0.35];
        const wrist = [side * 0.28, 1.23, 0.81];
        bone(person, shoulder, [side * 0.47, 1.48, 0.19], 0.145, shirt, 0.18);
        bone(person, [side * 0.47, 1.49, 0.17], elbow, 0.108, skin, 0.13);
        bone(person, elbow, wrist, 0.075, skin, 0.108);
        sphere(person, skin, elbow, [0.106, 0.108, 0.105]);
        const hand = new THREE.Group();
        hand.position.set(...wrist);
        person.add(hand);
        sphere(hand, skin, [0, 0, 0.035], [0.085, 0.041, 0.11]);
        for (let digit = 0; digit < 4; digit++) {
            const finger = new THREE.Group();
            finger.position.set((digit - 1.5) * 0.039, -0.005, 0.115);
            hand.add(finger);
            bone(finger, [0, 0, 0], [0, -0.013, 0.1 - Math.abs(digit - 1.5) * 0.018], 0.016, skin, 0.018);
            fingers.push(finger);
        }
        bone(hand, [side * -0.065, 0, 0.02], [side * -0.105, -0.012, 0.11], 0.023, skin);
        hands.push(hand);
        if (side === -1) {
            for (let index = 0; index < 7; index++) {
                const amount = index / 6;
                const center = new THREE.Vector3(...elbow).lerp(new THREE.Vector3(...wrist), amount);
                const tattoo = mesh(new THREE.TorusGeometry(0.084 - amount * 0.022, 0.004, 6, 28), material('#4a423b'), person);
                tattoo.position.copy(center);
                tattoo.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(...wrist).sub(new THREE.Vector3(...elbow)).normalize());
            }
        }
    }

    const head = new THREE.Group();
    head.position.set(0, 2.3, 0.025);
    person.add(head);
    sphere(head, skin, [0, 0.02, 0], [0.283, 0.365, 0.265]);
    sphere(head, skin, [0, -0.16, 0.025], [0.236, 0.205, 0.223]);
    const baseHeadParts = new Set(head.children);
    sphere(head, skin, [-0.16, -0.035, 0.19], [0.096, 0.1, 0.067]);
    sphere(head, skin, [0.16, -0.035, 0.19], [0.096, 0.1, 0.067]);
    for (const side of [-1, 1]) {
        sphere(head, skin, [side * 0.282, -0.01, 0], [0.043, 0.082, 0.035]);
        sphere(head, lip, [side * 0.301, -0.01, 0.013], [0.013, 0.041, 0.019]);
        sphere(head, material('#efe7df'), [side * 0.114, 0.056, 0.238], [0.054, 0.024, 0.027]);
        sphere(head, material('#533b25', 0.3), [side * 0.114, 0.055, 0.262], [0.017, 0.019, 0.007]);
        sphere(head, black, [side * 0.114, 0.055, 0.268], [0.008, 0.013, 0.004]);
        sphere(head, material('#ffffff', 0.15), [side * 0.108, 0.061, 0.272], [0.003, 0.003, 0.002]);
        curve(head, [[side*.065,.08,.26],[side*.11,.092,.263],[side*.16,.078,.248]], 0.006, skin);
        curve(head, [[side*.064,.128,.24],[side*.11,.148,.245],[side*.178,.132,.22]], 0.012, hair);
    }
    sphere(head, skin, [0, 0.021, 0.262], [0.032, 0.085, 0.052]);
    sphere(head, skin, [0, -0.032, 0.305], [0.048, 0.036, 0.036]);
    for (const side of [-1, 1]) sphere(head, lip, [side*.031,-.045,.295], [.013,.008,.008]);
    curve(head, [[-.07,-.139,.251],[0,-.13,.27],[.07,-.139,.251]], .009, lip);
    curve(head, [[-.062,-.153,.248],[0,-.157,.267],[.062,-.153,.248]], .012, lip);
    sphere(head, beard, [0, -.257, .108], [.184, .101, .145]);
    for (const side of [-1, 1]) {
        curve(head, [[side*.24,-.045,.13],[side*.22,-.14,.15],[side*.18,-.24,.175],[side*.07,-.296,.17]], .031, beard);
        curve(head, [[side*.018,-.088,.271],[side*.05,-.091,.271],[side*.087,-.12,.24]], .014, beard);
    }
    const proceduralFaceParts = head.children.filter(part => !baseHeadParts.has(part));
    const faceReference = new Image();
    faceReference.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 640;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.ellipse(256, 320, 250, 316, 0, 0, Math.PI * 2);
        context.clip();
        context.drawImage(faceReference, 393, 242, 274, 354, 0, 0, 512, 640);
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const geometry = new THREE.PlaneGeometry(.552, .706, 48, 48);
        const positions = geometry.attributes.position;
        for (let index = 0; index < positions.count; index++) {
            const horizontal = positions.getX(index) / .276;
            const vertical = positions.getY(index) / .353;
            const curvature = Math.sqrt(Math.max(.05, 1 - horizontal*horizontal*.65 - vertical*vertical*.6));
            const nose = .035 * Math.exp(-horizontal*horizontal*55 - Math.pow(vertical+.06,2)*35);
            positions.setZ(index, .284*curvature + nose);
        }
        geometry.computeVertexNormals();
        const surface = new THREE.MeshStandardMaterial({ map:texture, transparent:true, alphaTest:.04, roughness:.9 });
        const face = mesh(geometry, surface, head, [0,-.004,.012]);
        face.castShadow = false;
        proceduralFaceParts.forEach(part => { part.visible = false; });
        draw();
    };
    faceReference.src = 'assets/eu-tatto.jpeg';
    sphere(head, hair, [0, .268, -.027], [.28, .134, .239]);
    for (let index = 0; index < 11; index++) {
        const start = -.22 + index * .043;
        curve(head, [[start,.255,.14],[start-.018,.345,.05],[start+.018,.324,-.13]], .018, hair);
    }
    for (const side of [-1, 1]) {
        const center = side * .119;
        curve(head, [[center-.077,.107,.279],[center+.076,.107,.279],[center+.083,.014,.281],[center+.05,-.022,.28],[center-.055,-.022,.28],[center-.082,.017,.281]], .009, black, true);
        curve(head, [[side*.193,.1,.276],[side*.27,.08,.1],[side*.282,.015,-.035]], .009, black);
        sphere(head, black, [side*.313,-.008,-.034], [.045,.117,.094]);
        sphere(head, metal, [side*.35,-.008,-.034], [.015,.085,.068]);
        curve(head, [[side*.361,.058,.01],[side*.364,-.023,.037],[side*.359,-.076,.0]], .005, glow);
    }
    curve(head, [[-.041,.072,.293],[0,.083,.308],[.041,.072,.293]], .008, black);
    curve(head, [[-.312,.041,-.041],[-.26,.301,-.042],[0,.427,-.035],[.26,.301,-.042],[.312,.041,-.041]], .025, black);
    curve(head, [[.332,-.059,.007],[.366,-.17,.136],[.272,-.207,.273],[.155,-.191,.318]], .012, black);
    sphere(head, black, [.154,-.191,.319], [.037,.023,.019]);

    const desk = new THREE.Group();
    scene.add(desk);
    box(desk, material('#252a32', .5), [0, 1.12, .94], [2.35, .085, 1.12]);
    box(desk, glow, [0, 1.105, 1.495], [2.32, .014, .009]);
    for (const side of [-1, 1]) {
        box(desk, black, [side*.94,.56,.7], [.055,1.08,.065]);
        box(desk, black, [side*.94,.055,.94], [.13,.055,.7]);
    }
    const laptop = new THREE.Group();
    laptop.position.set(0, 1.17, .95);
    desk.add(laptop);
    box(laptop, metal, [0, .012, 0], [.92,.025,.58]);
    for (let row = 0; row < 4; row++) for (let column = 0; column < 12; column++) {
        box(laptop, black, [-.38+column*.068,.031,-.2+row*.061], [.052,.008,.042]);
    }
    box(laptop, black, [0,.032,.12], [.25,.005,.09]);
    const lid = new THREE.Group();
    lid.position.set(0, .028, .27);
    lid.rotation.x = .13;
    laptop.add(lid);
    box(lid, metal, [0,.29,0], [.94,.58,.035]);
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 320;
    const screenContext = screenCanvas.getContext('2d');
    screenContext.fillStyle = '#0b1525';
    screenContext.fillRect(0,0,512,320);
    screenContext.fillStyle = '#253953';
    screenContext.fillRect(0,0,512,24);
    const codeLines = ['public class Automacao {','  private final Tecnologia tecnologia;','','  public void conectar() {','    tecnologia.criarPossibilidades();','  }','}'];
    screenContext.font = '17px monospace';
    codeLines.forEach((line, index) => {
        screenContext.fillStyle = index % 2 ? '#89c9ff' : '#f2f5fa';
        screenContext.fillText(line, 22, 65 + index*30);
    });
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    const screen = mesh(new THREE.PlaneGeometry(.865,.5), new THREE.MeshBasicMaterial({map:screenTexture}), lid, [0,.29,-.019]);
    screen.rotation.y = Math.PI;
    const logoTexture = new THREE.TextureLoader().load('assets/logo-lp.png', () => draw());
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    mesh(new THREE.PlaneGeometry(.23,.23), new THREE.MeshBasicMaterial({map:logoTexture}), lid, [0,.3,.019]);
    const mug = mesh(new THREE.CylinderGeometry(.10,.085,.22,32), black, desk, [-.8,1.27,1.12]);
    mesh(new THREE.TorusGeometry(.067,.018,10,32), black, desk, [-.927,1.28,1.12]);
    sphere(desk, material('#493528'), [-.8,1.382,1.12], [.084,.003,.084]);
    mug.castShadow = true;

    let yaw = .55;
    let pitch = .18;
    let distance = 5.7;
    let paused = false;
    let visible = false;
    let elapsed = 0;
    let previousTime = 0;
    let frame = 0;
    let drag = null;

    function updateCamera() {
        camera.position.set(target.x + Math.sin(yaw)*Math.cos(pitch)*distance, target.y + Math.sin(pitch)*distance, target.z + Math.cos(yaw)*Math.cos(pitch)*distance);
        camera.lookAt(target);
    }
    function pose() {
        const time = elapsed;
        head.rotation.y = -.065 + Math.sin(time*.45)*.065;
        head.rotation.x = .08 + Math.sin(time*.62)*.025;
        torso.scale.y = .52 + Math.sin(time*1.5)*.003;
        hands.forEach((hand, index) => {
            hand.position.y = 1.23 + Math.sin(time*6.5+index*2.6)*.006;
            hand.rotation.x = Math.sin(time*4+index)*.025;
        });
        fingers.forEach((finger, index) => { finger.rotation.x = Math.sin(time*8+index*1.4)*.1; });
    }
    function draw() {
        pose();
        updateCamera();
        renderer.render(scene, camera);
    }
    function animate(timestamp) {
        frame = 0;
        if (!visible || document.hidden || paused || motionPreference.matches) return;
        if (previousTime) elapsed += Math.min((timestamp-previousTime)/1000, .04);
        previousTime = timestamp;
        draw();
        frame = requestAnimationFrame(animate);
    }
    function updateAnimation() {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
        pauseButton.disabled = motionPreference.matches;
        if (motionPreference.matches) pauseButton.title = 'Animação desativada pela preferência de movimento reduzido';
        else pauseButton.title = paused ? 'Retomar animação' : 'Pausar animação';
        if (visible && !document.hidden && !paused && !motionPreference.matches) frame = requestAnimationFrame(animate);
        else draw();
    }
    function resize() {
        const {width,height} = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width,height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix();
        distance = camera.aspect < 1 ? 7.5 : 5.7;
        draw();
    }
    new ResizeObserver(resize).observe(host);
    new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        updateAnimation();
    }, {threshold:.05}).observe(host);
    pauseButton.addEventListener('click', () => {
        paused = !paused;
        pauseButton.setAttribute('aria-pressed', String(paused));
        pauseButton.setAttribute('aria-label', paused ? 'Retomar animação' : 'Pausar animação');
        pauseButton.title = paused ? 'Retomar animação' : 'Pausar animação';
        pauseButton.querySelector('i').className = paused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
        updateAnimation();
    });
    resetButton.addEventListener('click', () => { yaw=.55; pitch=.18; resize(); });
    renderer.domElement.addEventListener('pointerdown', event => {
        drag = {x:event.clientX,y:event.clientY};
        renderer.domElement.setPointerCapture(event.pointerId);
    });
    renderer.domElement.addEventListener('pointermove', event => {
        if (!drag) return;
        yaw = THREE.MathUtils.clamp(yaw+(event.clientX-drag.x)*.007,-.8,1.2);
        pitch = THREE.MathUtils.clamp(pitch+(event.clientY-drag.y)*.004,.05,.48);
        drag = {x:event.clientX,y:event.clientY};
        draw();
    });
    renderer.domElement.addEventListener('pointerup', () => { drag=null; });
    renderer.domElement.addEventListener('pointercancel', () => { drag=null; });
    renderer.domElement.addEventListener('webglcontextlost', event => {
        event.preventDefault();
        visible = false;
        cancelAnimationFrame(frame);
        host.closest('.portrait-media').classList.remove('avatar-ready');
    });
    motionPreference.addEventListener('change', updateAnimation);
    document.addEventListener('visibilitychange', updateAnimation);
    resize();
    host.closest('.portrait-media').classList.add('avatar-ready');
}