import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Mouse Y: browser clientY grows DOWN (0=top).
// In this WebGL setup, uv.y is POSITIVE at the top of the screen.
// So pass clientY/height directly (no flip) and negate in shader for correct mapping.
const FRAGMENT_SHADER = `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;     // (clientX/W, clientY/H) — 0=top-left, 1=bottom-right
  uniform float uIsDark;

  #define MAX_STEPS 82
  #define MAX_DIST  38.0
  #define SURF_DIST 0.0013

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
    return mix(b,a,h) - k*h*(1.0-h);
  }

  float scene(vec3 p) {
    float t = uTime * 0.11;

    // ---- cursor attractor ----
    // uMouse.x : 0=left  → 1=right
    // uMouse.y : 0=top   → 1=bottom  (browser coords, no flip)
    // WebGL uv.y : positive=TOP, negative=BOTTOM
    // → negate uMouse.y and centre: mapY = (0.5 - uMouse.y) * scale
    float mx =  (uMouse.x - 0.5) * 6.5;
    float my =  (0.5 - uMouse.y) * 6.5;   // ← correct: top-mouse → positive GL Y
    float d = length(p - vec3(mx, my, 1.2)) - 0.85;

    // ---- 8 large autonomous mercury bodies ----
    for (int i = 0; i < 8; i++) {
      float fi  = float(i);
      float phi = fi * 0.785;
      vec3 pos  = vec3(
        sin(t*(0.60+fi*0.07)+phi)*4.0 + cos(t*(0.40+fi*0.05)+phi*1.3)*1.8,
        cos(t*(0.50+fi*0.08)+phi*0.9)*3.0 + sin(t*(0.35+fi*0.06)+phi*1.7)*1.4,
        sin(t*(0.90+fi*0.04)+phi*0.5)*1.2
      );
      vec3 ps = p - pos;
      ps.y   *= 0.82 + 0.28*sin(t*0.9+fi*1.1);
      float r  = 0.58 + 0.30*sin(t*0.75+fi*0.9);
      d = smin(d, length(ps)-r, 1.18);
    }

    // ---- 11 micro-beads ----
    for (int j = 0; j < 11; j++) {
      float fj  = float(j);
      float psi = fj * 1.05;
      vec3 pos  = vec3(
        sin(t*(1.15+fj*0.09)+psi)*5.0 + cos(t*(0.80+fj*0.06)+psi*2.1)*2.2,
        cos(t*(0.95+fj*0.10)+psi*1.4)*3.8 + sin(t*(0.70+fj*0.05)+psi*0.8)*1.6,
        sin(t*(1.60+fj*0.07)+psi*0.4)*0.9
      );
      float r = 0.10 + 0.20*abs(cos(t*1.7+fj*1.2));
      d = smin(d, length(p-pos)-r, 0.48);
    }

    d += sin(p.x*2.2+t)*sin(p.y*2.3+t*0.85)*0.055;
    return d;
  }

  vec3 normal(vec3 p) {
    vec2 e = vec2(0.001,0.0);
    return normalize(vec3(
      scene(p+e.xyy)-scene(p-e.xyy),
      scene(p+e.yxy)-scene(p-e.yxy),
      scene(p+e.yyx)-scene(p-e.yyx)
    ));
  }

  vec3 env(vec3 r, float dk) {
    float ov = smoothstep(-0.4,0.65,r.y);
    vec3 lc  = mix(vec3(0.82,0.87,0.96), vec3(1.0), ov);
    vec3 dc  = mix(vec3(0.03,0.05,0.11), vec3(0.18,0.22,0.30), ov);
    vec3 col = mix(lc, dc, dk);
    float b1 = pow(max(0.0,dot(r,normalize(vec3( 1.6, 0.3,-0.8)))),28.0);
    float b2 = pow(max(0.0,dot(r,normalize(vec3(-1.4, 0.2,-0.5)))),36.0);
    col += mix(vec3(1.3),vec3(2.2),dk)*b1*ov;
    col += mix(vec3(0.8),vec3(1.5),dk)*b2*(1.0-ov);
    float rim = pow(1.0-abs(r.z),4.0);
    col += mix(vec3(0.05,0.35,0.60),vec3(0.10,0.70,1.0),dk)*rim*smoothstep(-0.2,0.5,r.x);
    col += mix(vec3(0.25,0.10,0.45),vec3(0.55,0.15,0.90),dk)*rim*smoothstep(0.2,-0.5,r.x);
    return col;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5*uResolution.xy) / uResolution.y;
    vec3 ro  = vec3(0.0, 0.0, -8.2);
    vec3 rd  = normalize(vec3(uv, 3.2));

    float d = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
      vec3 p  = ro + rd*d;
      float s = scene(p);
      d      += s;
      if (d > MAX_DIST || abs(s) < SURF_DIST) break;
    }

    vec3 bg  = mix(vec3(0.965,0.975,0.990), vec3(0.022,0.028,0.058), uIsDark);
    vec3 col = bg;

    if (d < MAX_DIST) {
      vec3 p  = ro + rd*d;
      vec3 n  = normal(p);
      vec3 v  = -rd;
      vec3 r  = reflect(rd, n);

      col = env(r, uIsDark);

      // cursor spotlight
      vec3 lp  = normalize(vec3((uMouse.x-0.5)*16.0, (0.5-uMouse.y)*14.0+4.0, -3.5));
      float sp = pow(max(0.0,dot(reflect(-lp,n),v)),1600.0);
      col += mix(vec3(1.8),vec3(3.4),uIsDark)*sp;

      float fr = pow(1.0-max(0.0,dot(n,v)),5.0);
      col  = mix(col,vec3(1.0),fr*0.8);
      col += fr*mix(vec3(0.15,0.45,0.80),vec3(0.35,0.80,1.20),uIsDark)*0.75;

      float cv = 1.0-abs(dot(n,vec3(0.0,0.0,1.0)));
      col *= mix(1.0,0.68,pow(cv,3.0));
    }

    gl_FragColor = vec4(clamp(pow(col,vec3(0.88)),0.0,1.0),1.0);
  }
`;

function FluidCanvas() {
  const canvasRef = useRef(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { powerPreference: "high-performance", antialias: false }) ||
      canvas.getContext("experimental-webgl");

    if (!gl) { setWebglOk(false); return; }

    const mk = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s)); gl.deleteShader(s); return null;
      }
      return s;
    };
    const vs = mk(gl.VERTEX_SHADER,   VERTEX_SHADER);
    const fs = mk(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) { setWebglOk(false); return; }

    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog)); setWebglOk(false); return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime       = gl.getUniformLocation(prog, "uTime");
    const uResolution = gl.getUniformLocation(prog, "uResolution");
    const uMouse      = gl.getUniformLocation(prog, "uMouse");
    const uIsDark     = gl.getUniformLocation(prog, "uIsDark");

    // Mouse in VIEWPORT coords — 0=top-left, no scroll dependency
    let mxS = 0.5, myS = 0.5, mxT = 0.5, myT = 0.5;
    const onMove = (e) => {
      mxT = e.clientX / window.innerWidth;
      myT = e.clientY / window.innerHeight; // 0=top, 1=bottom — NO flip here, shader handles it
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width  = Math.floor(window.innerWidth  * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize); resize();

    const t0 = performance.now(); let raf;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      mxS += (mxT - mxS) * 0.055;
      myS += (myT - myS) * 0.055;
      const isDark = document.documentElement.classList.contains("dark") ? 1.0 : 0.0;
      gl.uniform1f(uTime, (performance.now() - t0) * 0.001);
      gl.uniform2f(uMouse, mxS, myS);
      gl.uniform1f(uIsDark, isDark);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {webglOk ? (
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      ) : (
        <div style={{ width: "100%", height: "100%", background: "#060810" }} />
      )}
      {/* soft edge vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 130% 110% at 50% 40%, transparent 50%, rgba(6,8,20,0.40) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// Portal → renders directly in document.body, escaping any overflow:hidden ancestor
export function FluidBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(<FluidCanvas />, document.body);
}
