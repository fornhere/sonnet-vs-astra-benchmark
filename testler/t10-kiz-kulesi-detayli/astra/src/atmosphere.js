import * as T from "three";
import { noiseGLSL, rng } from "./util.js";
export function atmosphere(scene, U, low) {
  const sky = new T.Mesh(
    new T.SphereGeometry(1400, 24, 16),
    new T.ShaderMaterial({
      side: T.BackSide,
      depthWrite: false,
      uniforms: U,
      vertexShader: `varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `uniform float uTime,uDawn,uStorm,uFlash;varying vec3 vPos;${noiseGLSL}
 void main(){vec3 d=normalize(vPos);float h=max(d.y,0.);vec2 uv=d.xz/(.25+h)*1.3+vec2(uTime*.004,uTime*.002);float n=fbm(uv*2.);float billow=fbm(uv*5.+n*3.);float cloud=smoothstep(.26,.75,n*.6+billow*.6);
 vec3 col=mix(vec3(.035,.068,.095),vec3(.006,.014,.026),pow(h,.4));col=mix(col,col*.23,cloud*(.65+uStorm*.25));
 vec3 dawn=mix(vec3(.5,.29,.19),vec3(.105,.18,.25),pow(h,.35));col=mix(col,dawn*(1.-cloud*.55),uDawn*.8);
 float moon=dot(d,normalize(vec3(-.65,.5,-.9)));float halo=pow(max(moon,0.),65.);col+=vec3(.22,.36,.44)*halo*(1.-cloud*.83);col+=vec3(.55,.68,.7)*smoothstep(.99955,.99985,moon)*(1.-cloud);
 col+=uFlash*vec3(.33,.43,.57)*(.4+cloud*.6);gl_FragColor=vec4(col,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`,
    }),
  );
  scene.add(sky);
  const random = rng(40),
    count = low ? 2300 : 6500,
    arr = new Float32Array(count * 6),
    seed = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    let x = (random() - 0.5) * 160,
      y = random() * 65,
      z = (random() - 0.5) * 160;
    arr.set([x, y, z, x, y, z], i * 6);
    seed[i * 2] = 0;
    seed[i * 2 + 1] = 1;
  }
  const rg = new T.BufferGeometry();
  rg.setAttribute("position", new T.BufferAttribute(arr, 3));
  rg.setAttribute("aEnd", new T.BufferAttribute(seed, 1));
  const rain = new T.LineSegments(
    rg,
    new T.ShaderMaterial({
      uniforms: U,
      transparent: true,
      depthWrite: false,
      vertexShader: `uniform float uTime,uStorm;attribute float aEnd;varying float vAlpha;void main(){vec3 p=position;float speed=22.+uStorm*19.;p.y=mod(p.y-uTime*speed,65.);p.x=mod(p.x+uTime*(7.+uStorm*9.)+80.,160.)-80.;p.xz+=cameraPosition.xz;float len=.4+uStorm*.65;p+=vec3(-.4,1.,.03)*aEnd*len;vec4 mv=viewMatrix*vec4(p,1.);vAlpha=uStorm*(.04+uStorm*.2)*(1.-aEnd*.7)*smoothstep(0.,8.,-mv.z);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `uniform float uFlash,uDawn;varying float vAlpha;void main(){gl_FragColor=vec4(vec3(.5,.66,.72)+uFlash*.3,vAlpha*(1.-uDawn*.2));}`,
    }),
  );
  rain.frustumCulled = false;
  scene.add(rain);
  // Ballistic shoreline spray: particles born in staggered, wave-synchronised bursts.
  const n = low ? 650 : 1700,
    pp = new Float32Array(n * 3),
    ph = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let a = random() * Math.PI * 2;
    pp.set([Math.cos(a) * 16, random(), Math.sin(a) * 11.8], i * 3);
    ph[i] = random() * 8;
  }
  const sg = new T.BufferGeometry();
  sg.setAttribute("position", new T.BufferAttribute(pp, 3));
  sg.setAttribute("phase", new T.BufferAttribute(ph, 1));
  const spray = new T.Points(
    sg,
    new T.ShaderMaterial({
      uniforms: U,
      transparent: true,
      depthWrite: false,
      vertexShader: `uniform float uTime,uStorm;attribute float phase;varying float alpha;void main(){float age=mod(uTime+phase,3.2);float power=.3+uStorm*1.4;vec3 p=position;vec2 dir=normalize(p.xz);p.xz+=dir*age*(.9+position.y);p.y=.3+age*(3.6+position.y*4.)*power-5.2*age*age;alpha=smoothstep(-.1,.45,p.y)*max(0.,1.-age/2.)*(.2+uStorm*.6);vec4 mv=viewMatrix*vec4(p,1.);gl_PointSize=clamp((1.5+position.y*2.)*100./-mv.z,1.,12.);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying float alpha;void main(){float d=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(.66,.79,.8,alpha*(1.-smoothstep(.1,1.,d)));}`,
    }),
  );
  scene.add(spray);
  const beamGeo = new T.ConeGeometry(16, 110, 48, 1, true);
  beamGeo.translate(0, -55, 0);
  beamGeo.rotateX(-Math.PI / 2);
  const beamMaterial = new T.ShaderMaterial({
    side: T.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: T.AdditiveBlending,
    uniforms: U,
    vertexShader: `varying vec3 vWorld,vAxis;void main(){vAxis=normalize(mat3(modelMatrix)*vec3(0,0,1));vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}`,
    fragmentShader: `uniform float uTime,uStorm;varying vec3 vWorld,vAxis;${noiseGLSL}
 void main(){vec3 ray=normalize(vWorld-cameraPosition);float sum=0.;for(int i=0;i<16;i++){vec3 p=vWorld+ray*(float(i)*2.);vec3 delta=p-vec3(-3,19.25,0);float along=dot(delta,vAxis);float radius=max(.12,along*.145);float radial=length(delta-vAxis*along);float density=pow(max(0.,1.-radial/radius),2.);density*=smoothstep(0.,1.,along)*(1.-smoothstep(5.,110.,along));sum+=density;}float grain=.82+.18*noise(vWorld.xz*.2+uTime*.13);gl_FragColor=vec4(.92,.76,.46,sum*.115*(.35+uStorm*.65)*grain);}`,
  });
  const beams = new T.Group();
  beams.position.set(-3, 19.25, 0);
  const beam = new T.Mesh(beamGeo, beamMaterial);
  beam.rotation.x = 0.035;
  beams.add(beam);
  const back = beam.clone();
  back.rotation.y = Math.PI;
  beams.add(back);
  scene.add(beams);
  const mistMat = new T.ShaderMaterial({
    uniforms: U,
    transparent: true,
    depthWrite: false,
    side: T.DoubleSide,
    vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform float uTime,uDawn,uFlash,uStorm;varying vec2 vUv;${noiseGLSL}void main(){float edge=pow(max(0.,sin(vUv.y*3.14159)),2.);float n=fbm(vec2(vUv.x*22.-uTime*.025,vUv.y*3.));float a=edge*smoothstep(.3,.72,n)*(.2+uStorm*.2);gl_FragColor=vec4(vec3(.07,.13,.17)+uFlash*.28+uDawn*.12,a);}`,
  });
  for (let i = 0; i < 3; i++) {
    let bank = new T.Mesh(new T.PlaneGeometry(780, 30), mistMat);
    bank.position.set(0, 8 + i * 3, -170 - i * 18);
    scene.add(bank);
  }
  const bolts = new T.Group();
  scene.add(bolts);
  const boltMat = new T.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    fog: false,
    toneMapped: false,
  });
  const boltGlow = new T.MeshBasicMaterial({
    color: 0x75baff,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    blending: T.AdditiveBlending,
    fog: false,
    toneMapped: false,
  });
  const haloMat = new T.LineBasicMaterial({
    color: 0x7499cf,
    transparent: true,
    opacity: 0.4,
    blending: T.AdditiveBlending,
  });
  function strike(camera) {
    while (bolts.children.length) {
      let o = bolts.children[0];
      o.geometry.dispose();
      bolts.remove(o);
    }
    const forward = camera.getWorldDirection(new T.Vector3());
    forward.y = 0;
    forward.normalize();
    const right = new T.Vector3(-forward.z, 0, forward.x);
    const offset = (Math.random() > 0.5 ? 1 : -1) * (65 + Math.random() * 35);
    const origin = camera.position
      .clone()
      .addScaledVector(forward, 230)
      .addScaledVector(right, offset);
    let x = origin.x,
      z = origin.z;
    let path = [new T.Vector3(x, 100, z)];
    let bend = 0;
    for (let i = 1; i < 21; i++) {
      bend += (Math.random() - 0.5) * 13;
      path.push(
        new T.Vector3(x + bend, 100 - i * 4.5, z + (Math.random() - 0.5) * 10),
      );
    }
    function branch(points, radius) {
      const curve = new T.CatmullRomCurve3(points, false, "catmullrom", 0.01);
      bolts.add(
        new T.Mesh(
          new T.TubeGeometry(curve, points.length * 2, radius, 4, false),
          boltMat,
        ),
      );
      bolts.add(
        new T.Line(new T.BufferGeometry().setFromPoints(points), haloMat),
      );
      bolts.add(
        new T.Mesh(
          new T.TubeGeometry(curve, points.length * 2, radius * 4, 6, false),
          boltGlow,
        ),
      );
    }
    branch(path, 0.26);
    for (let j of [5, 10, 13]) {
      let b = [path[j].clone()];
      const direction = Math.random() > 0.5 ? 1 : -1;
      for (let k = 1; k < 5; k++)
        b.push(
          path[j]
            .clone()
            .add(
              new T.Vector3(
                k * direction * 5 + (Math.random() - 0.5) * 4,
                -k * 6,
                (Math.random() - 0.5) * 8,
              ),
            ),
        );
      branch(b, 0.11);
    }
    bolts.visible = true;
  }
  return { beams, bolts, boltMat, strike, sky };
}
