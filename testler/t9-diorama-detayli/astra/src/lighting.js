import { THREE, random, box } from "./core.js";
import { landAt, isPark } from "./terrain.js";
export function addLamps() {
  for (let x = -30; x < 56; x += 5.8)
    for (let z = -122; z < 54; z += 9) {
      if (landAt(x, z) && !isPark(x, z)) {
        box("metal", x, 1.65, z, 0.08, 2.4, 0.08, "#666854");
        box("metal", x + 0.25, 2.8, z, 0.58, 0.09, 0.09, "#73715a");
        box("glow", x + 0.48, 2.75, z, 0.35, 0.19, 0.3, "#f2d493");
      }
    }
}
export function lighting(scene, renderer, materials, low) {
  const hemi = new THREE.HemisphereLight("#e9e5cb", "#747563", 2.3);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight("#ffe1a3", 3.3);
  sun.position.set(-100, 150, 95);
  sun.castShadow = true;
  sun.shadow.mapSize.set(low ? 1024 : 2048, low ? 1024 : 2048);
  Object.assign(sun.shadow.camera, {
    left: -170,
    right: 170,
    top: 170,
    bottom: -170,
    near: 1,
    far: 480,
  });
  sun.shadow.bias = -0.0002;
  sun.shadow.normalBias = 0.12;
  sun.shadow.radius = 2;
  sun.target.position.set(0, 0, -20);
  scene.add(sun, sun.target);
  const fill = new THREE.DirectionalLight("#a7c6c3", 0.7);
  fill.position.set(70, 90, -100);
  scene.add(fill);
  const bg = new THREE.Color(),
    warm = new THREE.Color("#eee4ce"),
    nightBg = new THREE.Color("#172b36");
  let night = 0;
  function setTime(hour) {
    night =
      hour > 18
        ? THREE.MathUtils.smoothstep(hour, 18, 21)
        : hour < 7
          ? 1 - THREE.MathUtils.smoothstep(hour, 5, 7)
          : 0;
    const sunset = 1 - Math.min(1, Math.abs(hour - 17.5) / 4);
    hemi.intensity = 1.5 * (1 - night) + 0.7 * night;
    hemi.color.set(night > 0.5 ? "#7695ad" : "#f1e6cc");
    sun.intensity = (2.6 + sunset * 0.65) * (1 - night) + 0.35 * night;
    sun.color.set(
      night > 0.5 ? "#829eb6" : sunset > 0.3 ? "#ffe6c4" : "#fff2d5",
    );
    sun.position.set(-95, 65 + (1 - sunset) * 100, 100);
    fill.intensity = 0.65 + night * 0.45;
    materials.window.emissiveIntensity = night * 1.75;
    materials.glow.emissiveIntensity = 0.05 + night * 3;
    materials.window.color.setRGB(1, 1, 1);
    bg.copy(warm).lerp(nightBg, night);
    scene.background = bg.clone();
    scene.fog.color.copy(bg);
    renderer.toneMappingExposure = 1.05 - night * 0.12;
    renderer.shadowMap.needsUpdate = true;
    document.documentElement.style.setProperty("--night", night);
    return night;
  }
  setTime(17.5);
  return {
    setTime,
    get night() {
      return night;
    },
    sun,
  };
}
const vertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
const fragment = `precision highp float;
 varying vec2 vUv; uniform sampler2D tColor; uniform sampler2D tDepth; uniform vec2 resolution; uniform float focus; uniform float dof; uniform float night; uniform float quality;
float depth(vec2 uv){return texture2D(tDepth,clamp(uv,0.,1.)).r;}
void main(){vec2 px=1./resolution; vec4 center=texture2D(tColor,vUv);float d=depth(vUv);float blur=smoothstep(.08,.32,abs(vUv.y-focus))*dof;vec3 col=center.rgb*.28;float bloom=0.;vec3 glow=vec3(0.);float occ=0.;for(int i=0;i<8;i++){float a=float(i)*.785398;vec2 dir=vec2(cos(a),sin(a));vec2 uv=vUv+dir*px*blur;col+=texture2D(tColor,uv).rgb*.09;vec3 b=texture2D(tColor,vUv+dir*px*(3.+night*3.)).rgb;glow+=max(b-vec3(.73),vec3(0.))*.125;float nd=depth(vUv+dir*px*(2.+quality));float delta=d-nd;occ+=step(.00003,delta)*(1.-smoothstep(.0001,.008,delta))*.008;}
col*=1.-occ;col+=glow*night*.43;float vignette=1.-.16*pow(length((vUv-.5)*vec2(1.1,1.)),1.7);col*=vignette;col=mix(vec3(dot(col,vec3(.2126,.7152,.0722))),col,1.12);gl_FragColor=vec4(col,1.);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
export function postprocess(renderer, scene, camera, low) {
  const target = new THREE.WebGLRenderTarget(1, 1, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true,
    type: THREE.HalfFloatType,
  });
  target.depthTexture = new THREE.DepthTexture(1, 1, THREE.UnsignedIntType);
  const uniforms = {
    tColor: { value: target.texture },
    tDepth: { value: target.depthTexture },
    resolution: { value: new THREE.Vector2(1, 1) },
    focus: { value: 0.5 },
    dof: { value: low ? 1.4 : 3.5 },
    night: { value: 0 },
    quality: { value: low ? 0 : 1 },
  };
  const mat = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });
  const screen = new THREE.Scene();
  screen.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
  const cam = new THREE.Camera();
  return {
    uniforms,
    resize(w, h) {
      target.setSize(w, h);
      uniforms.resolution.value.set(w, h);
    },
    render() {
      renderer.setRenderTarget(target);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.render(screen, cam);
    },
  };
}
export function atmosphere(scene, snowState) {
  const cloudMat = new THREE.MeshStandardMaterial({
    color: "#eee7ce",
    roughness: 1,
    transparent: true,
    opacity: 0.67,
    depthWrite: false,
  });
  const cloudPieces = [];
  const cloudDummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 7; j++)
      cloudPieces.push({
        x: -94 + i * 29 + j * 2.8,
        y: 75 + Math.sin(i) * 8 + Math.sin(j) * 0.8,
        z: -110 + i * 15 + random() * 2,
        w: 3 + random() * 5,
        h: 1.7 + random() * 1.2,
        d: 2.4 + random() * 3,
        phase: i,
      });
  const clouds = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, 1),
    cloudMat,
    cloudPieces.length,
  );
  clouds.frustumCulled = false;
  scene.add(clouds);
  const birdVertices = new Float32Array(12 * 4 * 3);
  const birdGeometry = new THREE.BufferGeometry();
  birdGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(birdVertices, 3),
  );
  const birds = new THREE.LineSegments(
    birdGeometry,
    new THREE.LineBasicMaterial({
      color: "#525d50",
      transparent: true,
      opacity: 0.75,
    }),
  );
  birds.frustumCulled = false;
  scene.add(birds);
  const snowN = 950,
    snow = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.38, 0.38, 0.38),
      new THREE.MeshBasicMaterial({ color: "#faf8e7" }),
      snowN,
    );
  snow.visible = false;
  const flakes = Array.from({ length: snowN }, () => ({
    x: -105 + random() * 210,
    y: random() * 85,
    z: -148 + random() * 250,
    speed: 3 + random() * 3,
  }));
  scene.add(snow);
  const dummy = new THREE.Object3D();
  let weather = "clear";
  return {
    setWeather(v) {
      weather = v;
      snowState.value = v === "snow" ? 1 : 0;
      snow.visible = v === "snow";
      scene.fog.density =
        v === "fog" ? 0.0025 : v === "snow" ? 0.0009 : 0.00032;
      cloudMat.opacity = v === "fog" ? 0.25 : 0.67;
    },
    update(t, zoom = 1) {
      cloudMat.opacity =
        (weather === "fog" ? 0.25 : 0.67) * (zoom > 2 ? 0.08 : 1);
      cloudPieces.forEach((c, i) => {
        cloudDummy.position.set(
          c.x + Math.sin(t * 0.014 + c.phase) * 8,
          c.y,
          c.z,
        );
        cloudDummy.scale.set(c.w, c.h, c.d);
        cloudDummy.updateMatrix();
        clouds.setMatrixAt(i, cloudDummy.matrix);
      });
      clouds.instanceMatrix.needsUpdate = true;
      birds.position.set(
        Math.sin(t * 0.027) * 30,
        43 + Math.sin(t * 0.14),
        -35 + Math.cos(t * 0.027) * 52,
      );
      birds.rotation.y = t * 0.025;
      for (let i = 0; i < 12; i++) {
        const x = (i % 4) * 2.5,
          y = Math.floor(i / 4) * 1.6,
          z = Math.floor(i / 4) * 2,
          flap = Math.sin(t * 4 + i) * 0.27;
        birdVertices.set(
          [
            x - 0.55,
            y + flap,
            z,
            x,
            y - 0.2,
            z + 0.12,
            x,
            y - 0.2,
            z + 0.12,
            x + 0.55,
            y + flap,
            z,
          ],
          i * 12,
        );
      }
      birdGeometry.attributes.position.needsUpdate = true;
      if (snow.visible) {
        flakes.forEach((f, i) => {
          dummy.position.set(
            f.x + Math.sin(t * 0.4 + i) * 1.5,
            (((f.y - t * f.speed) % 85) + 85) % 85,
            f.z,
          );
          dummy.rotation.set(t * 0.3 + i, t * 0.17, 0);
          dummy.updateMatrix();
          snow.setMatrixAt(i, dummy.matrix);
        });
        snow.instanceMatrix.needsUpdate = true;
      }
    },
  };
}
