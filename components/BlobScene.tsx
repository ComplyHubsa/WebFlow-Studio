'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Compact Ashima Arts simplex noise — identical string embedded in both shaders
const NOISE = /* glsl */`
vec3 _m289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 _m289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 _perm(vec4 x){return _m289(((x*34.)+10.)*x);}
vec4 _tiSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=_m289(i);
  vec4 p=_perm(_perm(_perm(
    i.z+vec4(0.,i1.z,i2.z,1.))
    +i.y+vec4(0.,i1.y,i2.y,1.))
    +i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=_tiSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const vertexShader = /* glsl */`
${NOISE}
uniform float uTime;
uniform float uMorphIntensity;
uniform vec2  uMouseDir;
uniform float uMouseNear;

varying vec3  vNormal;
varying vec3  vWorldPos;
varying float vDisp;

void main(){
  vNormal = normalize(normalMatrix * normal);

  // Three octaves of noise for organic liquid morphing
  float n1 = snoise(position * 1.3  + uTime * 0.20);
  float n2 = snoise(position * 2.7  + uTime * 0.35 + 1.5);
  float n3 = snoise(position * 5.4  + uTime * 0.52 + 3.1);
  float base = n1*0.55 + n2*0.28 + n3*0.12;

  // Mouse warps the morphing toward cursor direction
  vec3 mVec = vec3(uMouseDir, 0.0);
  float mBoost = snoise(position*2.4 + mVec*1.6 + uTime*0.38) * uMouseNear * 0.38;

  float disp = (base + mBoost) * uMorphIntensity;
  vDisp = disp;

  vec3 displaced = position + normal * disp;
  vWorldPos = (modelMatrix * vec4(displaced, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`

const fragmentShader = /* glsl */`
${NOISE}
uniform float uTime;
uniform float uMorphIntensity;

varying vec3  vNormal;
varying vec3  vWorldPos;
varying float vDisp;

void main(){
  // ── Aurora colour palette ──────────────────────────────────────────
  vec3 dBlue   = vec3(0.02, 0.05, 0.52);
  vec3 rBlue   = vec3(0.04, 0.22, 0.88);
  vec3 dViolet = vec3(0.28, 0.03, 0.72);
  vec3 purple  = vec3(0.52, 0.04, 0.84);
  vec3 fuchsia = vec3(0.80, 0.04, 0.70);
  vec3 rose    = vec3(0.92, 0.10, 0.52);

  float t = uTime * 0.13;

  // Noise-modulated colour bands that flow across the surface
  float band1 = snoise(vNormal * 1.7 + vec3( t,     t*0.7, t*0.4)) * 0.5 + 0.5;
  float band2 = snoise(vNormal * 2.3 + vec3(-t*0.5, t*1.1, t*0.6) + 2.3) * 0.5 + 0.5;

  float cy1 = sin(t*1.10 + band1*2.8       ) * 0.5 + 0.5;
  float cy2 = sin(t*0.85 + band2*2.2 + 1.8 ) * 0.5 + 0.5;
  float cy3 = sin(t*0.60 + band1*1.6 + 3.6 ) * 0.5 + 0.5;

  vec3 col = dBlue;
  col = mix(col, rBlue,   cy3);
  col = mix(col, dViolet, cy2 * 0.80);
  col = mix(col, purple,  cy1 * 0.75);
  col = mix(col, fuchsia, cy2 * 0.50 * (1.0 - cy3));
  col = mix(col, rose,    cy3 * 0.40 * cy1);

  // ── Silky ribbon highlights ────────────────────────────────────────
  // Two swirling noise fields drive the ribbon directions
  float f1 = snoise(vNormal * 5.5  + uTime * 0.065);
  float f2 = snoise(vNormal * 9.0  - uTime * 0.048 + 3.14);
  float f3 = snoise(vNormal * 12.5 + uTime * 0.082 + 1.57);

  // Sharp thin bright lines at the crests of the noise waves
  float rib1 = sin(f1*8.5  + f2*4.5  + uTime*0.16);
  rib1 = pow(clamp(rib1*0.5+0.5, 0.0, 1.0), 7.0);

  float rib2 = sin(f2*10.5 + f3*3.2  - uTime*0.11);
  rib2 = pow(clamp(rib2*0.5+0.5, 0.0, 1.0), 10.0);

  // Ribbon hues: bright iridescent highlights shifting over time
  vec3 rHue1 = mix(vec3(0.55, 0.25, 1.00), vec3(1.00, 0.28, 0.80), sin(uTime*0.14)*0.5+0.5);
  vec3 rHue2 = mix(vec3(0.30, 0.40, 1.00), vec3(0.85, 0.18, 1.00), cos(uTime*0.19)*0.5+0.5);

  col += rib1 * rHue1 * 0.60;
  col += rib2 * rHue2 * 0.38;

  // ── Depth shading ──────────────────────────────────────────────────
  // Raised parts of the displaced surface are brighter
  col *= 0.65 + clamp((vDisp + 0.5) * 0.85, 0.0, 1.0);

  // ── Fresnel rim glow ───────────────────────────────────────────────
  // cameraPosition is a Three.js built-in uniform
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  float nDotV  = max(dot(normalize(vNormal), viewDir), 0.0);
  float fresnel = pow(1.0 - nDotV, 3.2);

  vec3 rimCol = mix(vec3(0.48, 0.16, 1.0), vec3(1.0, 0.18, 0.72), sin(uTime*0.22)*0.5+0.5);
  col += fresnel * rimCol * 0.75;

  // Subtle tone-map to keep very bright ribbons from blowing out
  col = col / (col + 0.55);
  col = pow(max(col, 0.0), vec3(0.85));

  gl_FragColor = vec4(col, 1.0);
}
`

interface Props {
  onSettled: () => void
}

export default function BlobScene({ onSettled }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cbRef = useRef(onSettled)
  cbRef.current = onSettled

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const W = container.clientWidth
    const H = container.clientHeight

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    container.appendChild(renderer.domElement)

    // ── Scene / Camera ────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x04060c)

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.z = 4.5

    // ── Blob mesh ─────────────────────────────────────────────────────
    const geo = new THREE.IcosahedronGeometry(1, 4) // 2562 verts — smooth

    const uniforms = {
      uTime:           { value: 0 },
      uMorphIntensity: { value: 0.78 },
      uMouseDir:       { value: new THREE.Vector2() },
      uMouseNear:      { value: 0 },
    }

    const mat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // ── Compute right-side target in world space ───────────────────────
    // At camera.z, half-height of view frustum = tan(fov/2) * z
    const halfH  = Math.tan((50 / 2) * (Math.PI / 180)) * camera.position.z
    const halfW  = halfH * (W / H)
    const isNarrow = W < 768
    const rightOffset = halfW * (isNarrow ? 0.15 : 0.33)

    // ── Intro animation values ────────────────────────────────────────
    const INTRO_DUR = 3.0
    const START_SCALE = 2.4   // fills viewport
    const END_SCALE   = 0.88  // comfortable orb
    const START_MORPH = 0.78
    const END_MORPH   = 0.26

    mesh.scale.setScalar(START_SCALE)
    mesh.position.x = 0

    // ── Mouse ─────────────────────────────────────────────────────────
    const targetMouse = new THREE.Vector2()
    let mouseNearOrb = 0
    let settled = false

    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      const nx =  (e.clientX - r.left) / r.width  * 2 - 1
      const ny = -((e.clientY - r.top) / r.height * 2 - 1)
      targetMouse.set(nx, ny)

      if (settled) {
        const orbNDCx = rightOffset / halfW
        const dist = Math.hypot(nx - orbNDCx, ny)
        mouseNearOrb = Math.max(0, 1 - dist / 0.60)
      }
    }
    const onMouseLeave = () => { mouseNearOrb = 0 }
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseleave', onMouseLeave)

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ────────────────────────────────────────────────
    const startMs = performance.now()
    let raf: number
    // Safety fallback: guarantee callback fires even if RAF is throttled (hidden tab, etc.)
    const fallbackTimer = setTimeout(() => {
      if (!settled) { settled = true; cbRef.current() }
    }, (INTRO_DUR + 0.5) * 1000)

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const elapsed = (performance.now() - startMs) / 1000

      const progress = Math.min(elapsed / INTRO_DUR, 1)
      const eased    = easeInOutCubic(progress)

      // Scale + position transition
      mesh.scale.setScalar(START_SCALE + (END_SCALE - START_SCALE) * eased)
      mesh.position.x = rightOffset * eased

      // Morph intensity: intro is wilder, settled is calm + pulsing + mouse
      const baseMorph = START_MORPH + (END_MORPH - START_MORPH) * eased
      const pulse     = settled ? Math.sin(elapsed * 0.75) * 0.035 : 0
      uniforms.uMorphIntensity.value = baseMorph + pulse + mouseNearOrb * 0.30

      // Smooth mouse lerp
      uniforms.uMouseDir.value.lerp(targetMouse, 0.07)
      uniforms.uMouseNear.value += (mouseNearOrb - uniforms.uMouseNear.value) * 0.06

      // Slow rotation for continuous organic feel
      mesh.rotation.y += 0.0028
      mesh.rotation.x  = Math.sin(elapsed * 0.18) * 0.12

      uniforms.uTime.value = elapsed

      if (progress >= 1 && !settled) {
        settled = true
        cbRef.current()
      }

      renderer.render(scene, camera)
    }

    tick()

    return () => {
      clearTimeout(fallbackTimer)
      cancelAnimationFrame(raf)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    />
  )
}
