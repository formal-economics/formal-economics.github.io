function oe(t,o,n){if(t.kind===1)return t.alpha*Math.pow(o,t.gamma)+(1-t.alpha)*n;const a=t.alpha,e=1-t.alpha,i=Math.log(o),l=Math.log(n);if(Math.abs(t.rho)<.02){const m=i-l,d=a*i+e*l,b=a*e*m*m,P=a*e*(1-2*a)*m*m*m;return Math.exp(d+.5*t.rho*b+t.rho*t.rho*P/6)}const u=t.rho*i+Math.log(a),f=t.rho*l+Math.log(e),s=Math.max(u,f);return Math.exp((s+Math.log(Math.exp(u-s)+Math.exp(f-s)))/t.rho)}function st(t,o,n){return t.kind===1?t.alpha*t.gamma*Math.pow(o,t.gamma-1)/(1-t.alpha):t.alpha/(1-t.alpha)*Math.pow(o/n,t.rho-1)}function lt(t){return t.kind===1?t.gamma===1?"perfect-substitutes":"quasi-linear":t.rho===0?"cobb-douglas":t.rho===1?"perfect-substitutes":t.rho<=-4?"near-leontief":"ces"}function ct(t){return t.kind===1?t.gamma===1?1/0:NaN:t.rho===1?1/0:1/(1-t.rho)}const ye=[{d:9,kind:0,from:0,to:0},{d:8,kind:0,from:0,to:-8,viaSigma:!0},{d:5,kind:0,from:-8,to:-8},{d:8,kind:0,from:-8,to:0,viaSigma:!0},{d:4,kind:0,from:0,to:0},{d:7,kind:0,from:0,to:1},{d:4,kind:0,from:1,to:1},{d:6,kind:1,from:1,to:.4},{d:6,kind:1,from:.4,to:.4},{d:6,kind:1,from:.4,to:1},{d:7,kind:0,from:1,to:0}],Ee=ye.reduce((t,o)=>t+o.d,0),ut=t=>t*t*t*(t*(t*6-15)+10);function be(t){const o=.6+.08*Math.sin(2*Math.PI*t/29);let n=(t%Ee+Ee)%Ee;for(let a=0;a<ye.length;a++){const e=ye[a];if(n<e.d||a===ye.length-1){let i;if(e.from===e.to)i=e.from;else{const l=ut(Math.min(1,Math.max(0,n/e.d)));if(e.viaSigma){const u=1/(1-e.from),f=1/(1-e.to);i=1-1/(u+(f-u)*l)}else i=e.from+(e.to-e.from)*l}return e.kind===0?{kind:0,alpha:o,rho:i,gamma:1}:{kind:1,alpha:o,rho:1,gamma:i}}n-=e.d}return{kind:0,alpha:o,rho:0,gamma:1}}function ft(t){const o=t.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);if(o)return[+o[1]/255,+o[2]/255,+o[3]/255];const n=t.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/i);return n?[+n[1],+n[2],+n[3]]:null}const we=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4),mt=t=>t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055;function We([t,o,n]){const a=we(t),e=we(o),i=we(n),l=Math.cbrt(.4122214708*a+.5363325363*e+.0514459929*i),u=Math.cbrt(.2119034982*a+.6806995451*e+.1073969566*i),f=Math.cbrt(.0883024619*a+.2817188376*e+.6299787005*i);return[.2104542553*l+.793617785*u-.0040720468*f,1.9779984951*l-2.428592205*u+.4505937099*f,.0259040371*l+.7827717662*u-.808675766*f]}function ht([t,o,n]){const a=Math.pow(t+.3963377774*o+.2158037573*n,3),e=Math.pow(t-.1055613458*o-.0638541728*n,3),i=Math.pow(t-.0894841775*o-1.291485548*n,3),l=u=>Math.min(1,Math.max(0,mt(u)));return[l(4.0767416621*a-3.3077115913*e+.2309699292*i),l(-1.2684380046*a+2.6097574011*e-.3413193965*i),l(-.0041960863*a-.7034186147*e+1.707614701*i)]}const dt=t=>[parseInt(t.slice(1,3),16)/255,parseInt(t.slice(3,5),16)/255,parseInt(t.slice(5,7),16)/255],pt=["#0E6F73","#27C6D6","#4F86FF","#8B6CFF","#CF5CD2","#FFB25E"].map(dt);function vt(t,o){const n=t.map(We),a=We(o),e=n.length-1,i=new Uint8Array(256*4);for(let l=0;l<256;l++){const u=l/255,f=Math.min(e-1e-9,u*e),s=Math.floor(f),m=f-s;let d=[0,1,2].map(x=>n[s][x]+(n[s+1][x]-n[s][x])*m);const b=Math.min(1,Math.max(0,(u-.94)/.06)),P=b*b*(3-2*b)*.8;d=[0,1,2].map(x=>d[x]+(a[x]-d[x])*P);const M=ht(d);i[l*4]=Math.round(M[0]*255),i[l*4+1]=Math.round(M[1]*255),i[l*4+2]=Math.round(M[2]*255),i[l*4+3]=255}return i}function xt(t){const o=document.createElement("span");o.style.position="absolute",o.style.visibility="hidden",t.appendChild(o);const n=(u,f)=>(o.style.color="",o.style.color=`var(${u})`,getComputedStyle(t).getPropertyValue(u).trim()?ft(getComputedStyle(o).color)??f:f),a=n("--_hf-bg",[.016,.024,.039]),e=n("--_hf-ink",[.933,.949,.973]),i=n("--_hf-gold",[.886,.706,.361]),l=pt.map((u,f)=>n(`--_hf-a${f}`,u));return o.remove(),{bg:a,ink:e,gold:i,ramp:vt(l,i)}}const ue=(t,o)=>{const n=Math.round(Math.min(1,Math.max(0,o))*255)*4;return[t.ramp[n]/255,t.ramp[n+1]/255,t.ramp[n+2]/255]},ce=(t,o=1)=>`rgba(${Math.round(t[0]*255)},${Math.round(t[1]*255)},${Math.round(t[2]*255)},${o})`,C=4,de=2/C,me=.2,Te=5,he=128,gt=1.3,Ye=.55,je=2.4;function Qe(t,o,n){const a=t<700,e=t<o*.9,i={hs:1.06,kap:.82,floor:-.62,az:32,el:25,fov:30,swAz:9,swEl:2.2,size:Math.min(t*.52,o*1.02,900),cx:n?n[0]:.74,cy:n?n[1]:.42,ty:.18,detail:1,glass:.8,mapIn:.5,mapOut:.075};return(e||a)&&(i.size=Math.min(t*.98,o*.62),i.cx=n?Math.max(.5,Math.min(.62,n[0])):.58,i.cy=n?n[1]:.72,i.el=27,i.detail=a?0:1),i}function bt(t,o,n,a,e){const i=1/Math.tan(o/2),l=1/(a-e);return t.fill(0),t[0]=i/n,t[5]=i,t[10]=(e+a)*l,t[11]=-1,t[14]=2*e*a*l,t}function Mt(t,o,n){let a=o[0]-n[0],e=o[1]-n[1],i=o[2]-n[2],l=Math.hypot(a,e,i)||1;a/=l,e/=l,i/=l;let u=i,f=0,s=-a;l=Math.hypot(u,f,s)||1,u/=l,f/=l,s/=l;const m=e*s-i*f,d=i*u-a*s,b=a*f-e*u;return t[0]=u,t[1]=m,t[2]=a,t[3]=0,t[4]=f,t[5]=d,t[6]=e,t[7]=0,t[8]=s,t[9]=b,t[10]=i,t[11]=0,t[12]=-(u*o[0]+f*o[1]+s*o[2]),t[13]=-(m*o[0]+d*o[1]+b*o[2]),t[14]=-(a*o[0]+e*o[1]+i*o[2]),t[15]=1,t}function yt(t,o,n){const a=new Float32Array(16);for(let e=0;e<4;e++)for(let i=0;i<4;i++)a[e*4+i]=o[i]*n[e*4]+o[4+i]*n[e*4+1]+o[8+i]*n[e*4+2]+o[12+i]*n[e*4+3];return t.set(a),t}function At(t,o){const n=o[0],a=o[1],e=o[2],i=o[3],l=o[4],u=o[5],f=o[6],s=o[7],m=o[8],d=o[9],b=o[10],P=o[11],M=o[12],x=o[13],h=o[14],p=o[15],E=n*u-a*l,D=n*f-e*l,F=n*s-i*l,S=a*f-e*u,N=a*s-i*u,y=e*s-i*f,v=m*x-d*M,w=m*h-b*M,T=m*p-P*M,U=d*h-b*x,R=d*p-P*x,_=b*p-P*h;let r=E*_-D*R+F*U+S*T-N*w+y*v;return r?(r=1/r,t[0]=(u*_-f*R+s*U)*r,t[1]=(e*R-a*_-i*U)*r,t[2]=(x*y-h*N+p*S)*r,t[3]=(b*N-d*y-P*S)*r,t[4]=(f*T-l*_-s*w)*r,t[5]=(n*_-e*T+i*w)*r,t[6]=(h*F-M*y-p*D)*r,t[7]=(m*y-b*F+P*D)*r,t[8]=(l*R-u*T+s*v)*r,t[9]=(a*T-n*R-i*v)*r,t[10]=(M*N-x*F+p*E)*r,t[11]=(d*F-m*N-P*E)*r,t[12]=(u*w-l*U-f*v)*r,t[13]=(n*U-a*w+e*v)*r,t[14]=(x*D-M*S-h*E)*r,t[15]=(m*S-d*D+b*E)*r,t):null}function ke(t,o,n,a){return[t[0]*o+t[4]*n+t[8]*a+t[12],t[1]*o+t[5]*n+t[9]*a+t[13],t[2]*o+t[6]*n+t[10]*a+t[14],t[3]*o+t[7]*n+t[11]*a+t[15]]}const Re=Math.PI/180;function Et(t,o,n,a,e){const i=n.fov*Re,l=2.83*o/(2*Math.tan(i/2)*Math.max(80,n.size)),u=[0,n.ty,0],f=a*Re,s=e*Re,m=[u[0]+l*Math.sin(f)*Math.cos(s),u[1]+l*Math.sin(s),u[2]+l*Math.cos(f)*Math.cos(s)],d=Mt(new Float32Array(16),m,u),b=bt(new Float32Array(16),i,t/o,l*.08,l*6),P=n.cx*2-1,M=1-n.cy*2;for(let p=0;p<4;p++)b[p*4]+=P*b[p*4+3],b[p*4+1]+=M*b[p*4+3];const x=yt(new Float32Array(16),b,d),h=At(new Float32Array(16),x)??new Float32Array(16);return{vp:x,inv:h,eye:m,dist:l}}function Le(t,o,n,a){const e=t.hs*Math.pow(Math.max(0,Math.min(2,a/o)),t.kap);return t.floor+n*(e-t.floor)}const ot=(t,o)=>[(t-C/2)*de,(C/2-o)*de],Fe=(t,o)=>[t/de+C/2,C/2-o/de];function Je(t,o,n,a,e,i,l){const u=ke(t.inv,i,l,-1),f=ke(t.inv,i,l,1),s=[u[0]/u[3],u[1]/u[3],u[2]/u[3]];let m=[f[0]/f[3]-s[0],f[1]/f[3]-s[1],f[2]/f[3]-s[2]];const d=Math.hypot(m[0],m[1],m[2])||1;m=[m[0]/d,m[1]/d,m[2]/d];const b=m[1]<-1e-6?(o.floor-s[1])/m[1]:t.dist*4,P=E=>{const D=s[0]+m[0]*E,F=s[2]+m[2]*E;if(D<-1||D>1||F<-1||F>1)return null;const[S,N]=Fe(D,F),y=Le(o,a,e,oe(n,Math.max(1e-4,S),Math.max(1e-4,N)));return s[1]+m[1]*E<=y},M=220;let x=0;for(let E=1;E<=M;E++){const D=b*E/M;if(P(D)===!0){let F=x,S=D;for(let v=0;v<18;v++){const w=(F+S)/2;P(w)===!0?S=w:F=w}const[N,y]=Fe(s[0]+m[0]*S,s[2]+m[2]*S);return{x1:Math.min(C,Math.max(.001,N)),x2:Math.min(C,Math.max(.001,y)),on:"surface"}}x=D}if(m[1]>=-1e-6)return null;const[h,p]=Fe(s[0]+m[0]*b,s[2]+m[2]*b);return h<=.02||p<=.02||h>C*3||p>C*3?null:{x1:h,x2:p,on:"floor"}}function wt(t,o,n){if(!(o>0))return 0;const a=f=>{const s=Math.cos(f),m=Math.sin(f);let d=1,b=0;for(;oe(t,Math.max(1e-9,d*s),Math.max(1e-9,d*m))<o&&b++<60;)d*=2;let P=0;for(let M=0;M<40;M++){const x=(P+d)/2;oe(t,Math.max(1e-9,x*s),Math.max(1e-9,x*m))<o?P=x:d=x}return(P+d)/2},e=1e-4,i=Math.PI/2-1e-4;let l=e;if(a(e)*Math.cos(e)>C){let f=e,s=i;for(let m=0;m<40;m++){const d=(f+s)/2;a(d)*Math.cos(d)>C?f=d:s=d}l=s}let u=i;if(a(i)*Math.sin(i)>C){let f=e,s=i;for(let m=0;m<40;m++){const d=(f+s)/2;a(d)*Math.sin(d)>C?s=d:f=d}u=f}if(!(u>l))return 0;for(let f=0;f<he;f++){const s=l+(u-l)*f/(he-1),m=a(s),[d,b]=ot(Math.min(C,m*Math.cos(s)),Math.min(C,m*Math.sin(s)));n[f*2]=d,n[f*2+1]=b}return he}const De=`
uniform int uKind;
uniform float uA;
uniform float uRho;
uniform float uGam;

float U(vec2 x) {
  if (uKind == 1) return uA * pow(x.x, uGam) + (1.0 - uA) * x.y;
  vec2 l = log(x);
  float b = 1.0 - uA;
  if (abs(uRho) < 0.02) {
    float d = l.x - l.y;
    float mu = uA * l.x + b * l.y;
    float v = uA * b * d * d;
    float k3 = uA * b * (1.0 - 2.0 * uA) * d * d * d;
    return exp(mu + 0.5 * uRho * v + uRho * uRho * k3 / 6.0);
  }
  float p = uRho * l.x + log(uA);
  float q = uRho * l.y + log(b);
  float m = max(p, q);
  return exp((m + log(exp(p - m) + exp(q - m))) / uRho);
}

// the exact gradient of u
vec2 gradU(vec2 x, float u) {
  if (uKind == 1) return vec2(uA * uGam * pow(x.x, uGam - 1.0), 1.0 - uA);
  vec2 r = log(x) - log(max(u, 1e-20));
  return vec2(uA * exp((uRho - 1.0) * r.x), (1.0 - uA) * exp((uRho - 1.0) * r.y));
}
`,Me=t=>t.toFixed(6),Ue=`
const float XS = ${Me(C)};
const float K = ${Me(de)};
const float DELTA = ${Me(me)};
const float INDEXF = ${Me(Te)};
`,Rt=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Ft=`#version 300 es
precision highp float;
precision highp int;
${Ue}
uniform vec2 uRes;
uniform mat4 uInv;
uniform vec3 uEye;
uniform float uFloor;
uniform float uDpr;
uniform float uDist;
uniform float uUref;
uniform float uProbeU;
uniform float uHi;
uniform float uReveal;
uniform vec2 uMap;
uniform vec3 uBg;
uniform vec3 uInk;
uniform sampler2D uLut;
${De}
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float aaLine(float d, float w) { return clamp(0.5 * w + 0.5 - d, 0.0, 1.0); }

void main() {
  vec2 fc = gl_FragCoord.xy;
  vec2 ndc = fc / uRes * 2.0 - 1.0;
  vec4 a4 = uInv * vec4(ndc, -1.0, 1.0);
  vec4 b4 = uInv * vec4(ndc, 1.0, 1.0);
  vec3 ro = a4.xyz / a4.w;
  vec3 rd = normalize(b4.xyz / b4.w - ro);

  // the sky: the hero colour, with the faintest lift toward the horizon
  vec3 col = uBg;
  float hz = pow(clamp(1.0 - abs(rd.y) * 3.0, 0.0, 1.0), 4.0);
  col += vec3(0.006, 0.010, 0.018) * hz;

  // the ground plane (every pixel computes it, so the derivatives below stay well defined)
  bool down = rd.y < -1e-4;
  float t = down ? (uFloor - ro.y) / rd.y : 1e4;
  t = min(t, 1e4);
  vec3 p = ro + rd * t;
  vec2 x = vec2(p.x / K + 0.5 * XS, 0.5 * XS - p.z / K);
  vec2 xs = max(x, vec2(1e-4));
  float u = U(xs);

  float dist = length(p - uEye);
  float fog = down ? exp(-max(dist / uDist - 0.95, 0.0) * 1.9) : 0.0;
  float r = length(p.xz);
  float spread = exp(-max(r - 1.15, 0.0) * max(r - 1.15, 0.0) / 5.0);
  float vis = fog * spread;

  // pixel-size of one unit of each good, for the hairlines
  vec2 ew = max(vec2(length(vec2(dFdx(x.x), dFdy(x.x))), length(vec2(dFdx(x.y), dFdy(x.y)))), vec2(1e-6));
  float inQ = clamp(min(x.x / ew.x, x.y / ew.y) + 0.5, 0.0, 1.0);
  vec2 q = smoothstep(vec2(-0.03), vec2(0.05), x) * (1.0 - smoothstep(vec2(XS - 0.05), vec2(XS + 0.03), x));
  float foot = q.x * q.y;

  // the indifference map: every level u = kΔ
  float f = u / DELTA;
  float fl = max(length(vec2(dFdx(f), dFdy(f))), 1e-6);
  float d = abs(fract(f + 0.5) - 0.5) / fl;
  float k = floor(f + 0.5);
  float isIdx = 1.0 - step(0.5, mod(k, INDEXF));
  float cov = aaLine(d, mix(0.8, 1.3, isIdx) * uDpr);
  float sp = 1.0 / fl;
  float dens = mix(smoothstep(3.0 * uDpr, 9.0 * uDpr, sp), smoothstep(3.0 * uDpr, 9.0 * uDpr, sp * INDEXF), isIdx);
  float lv = k * DELTA;
  vec3 ramp = texture(uLut, vec2(clamp(lv / uUref, 0.0, 1.0), 0.5)).rgb;
  vec3 lineCol = mix(uInk * 0.6, ramp, foot);
  float rev = clamp((uReveal - u) / (0.35 * uUref), 0.0, 1.0);
  float la = cov * dens * mix(uMap.y, uMap.x, foot) * mix(0.62, 1.0, isIdx) * step(0.5, k) * rev;
  col += lineCol * la * vis * inQ;

  // the mountain's light on the ground beneath it
  vec3 rampU = texture(uLut, vec2(clamp(u / uUref, 0.0, 1.0), 0.5)).rgb;
  col += rampU * 0.022 * foot * vis * inQ * rev;

  // the axes of the quadrant, with a tick at every unit
  float ax1 = aaLine(abs(x.y) / ew.y, 1.0 * uDpr) * step(0.0, x.x) * exp(-x.x / (2.2 * XS));
  float ax2 = aaLine(abs(x.x) / ew.x, 1.0 * uDpr) * step(0.0, x.y) * exp(-x.y / (2.2 * XS));
  float tk1 = aaLine(abs(fract(x.x + 0.5) - 0.5) / ew.x, 1.0 * uDpr) * step(abs(x.y), 0.07) * step(0.5, x.x) * exp(-x.x / (1.6 * XS));
  float tk2 = aaLine(abs(fract(x.y + 0.5) - 0.5) / ew.y, 1.0 * uDpr) * step(abs(x.x), 0.07) * step(0.5, x.y) * exp(-x.y / (1.6 * XS));
  col += uInk * 0.34 * max(max(ax1, ax2), max(tk1, tk2)) * fog;

  // the probe's level set, on the ground
  float gu = max(length(vec2(dFdx(u), dFdy(u))), 1e-7);
  float dh = abs(u - uProbeU) / gu;
  vec3 hcol = mix(texture(uLut, vec2(clamp(uProbeU / uUref, 0.0, 1.0), 0.5)).rgb, vec3(1.0), 0.4);
  float hl = aaLine(dh, 1.5 * uDpr) * 0.85 + exp(-dh / (4.0 * uDpr)) * 0.2;
  col += hcol * hl * uHi * inQ * mix(vis, fog, 0.6);

  col += (hash(fc) - 0.5) / 255.0;
  outColor = vec4(col, 1.0);
}`,Ze=`#version 300 es
precision highp float;
precision highp int;
${Ue}
in vec2 aST;
uniform mat4 uVP;
uniform float uUref;
uniform float uRise;
uniform float uHs;
uniform float uKap;
uniform float uFloor;
${De}
out vec2 vX;
out vec3 vW;
void main() {
  vec2 x = max(aST * XS, vec2(1e-4));
  float u = U(x);
  float y = uFloor + uRise * (uHs * pow(clamp(u / uUref, 0.0, 2.0), uKap) - uFloor);
  vec3 w = vec3((x.x - 0.5 * XS) * K, y, (0.5 * XS - x.y) * K);
  vX = x;
  vW = w;
  gl_Position = uVP * vec4(w, 1.0);
}`,St=`#version 300 es
precision mediump float;
out vec4 outColor;
void main() { outColor = vec4(0.0); }`,Tt=`#version 300 es
precision highp float;
precision highp int;
${Ue}
in vec2 vX;
in vec3 vW;
uniform vec3 uEye;
uniform float uDpr;
uniform float uDist;
uniform float uUref;
uniform float uRise;
uniform float uHs;
uniform float uKap;
uniform float uProbeU;
uniform float uHi;
uniform float uReveal;
uniform float uDetail;
uniform float uGlass;
uniform vec3 uBg;
uniform vec3 uInk;
uniform sampler2D uLut;
${De}
out vec4 outColor;

float aaLine(float d, float w) { return clamp(0.5 * w + 0.5 - d, 0.0, 1.0); }

void main() {
  vec2 x = max(vX, vec2(1e-4));
  float u = U(x);
  float tu = clamp(u / uUref, 0.0, 1.0);

  // the normal of y = floor + rise (h(u) − floor), from the exact gradient of u
  vec2 g = gradU(x, u);
  float hp = uRise * uHs * uKap * pow(max(tu, 1e-3), uKap - 1.0) / uUref;
  vec3 n = normalize(vec3(-hp * g.x / K, 1.0, hp * g.y / K));
  vec3 V = normalize(uEye - vW);
  float ndv = clamp(abs(dot(n, V)), 0.0, 1.0);
  float fres = pow(1.0 - ndv, 3.0);
  float dist = length(uEye - vW);
  float fog = exp(-max(dist / uDist - 0.82, 0.0) * 1.6);

  // the contours: the level sets u = kΔ, i.e. the indifference curves
  float f = u / DELTA;
  float fl = max(length(vec2(dFdx(f), dFdy(f))), 1e-6);
  float d = abs(fract(f + 0.5) - 0.5) / fl;
  float k = floor(f + 0.5);
  float isIdx = 1.0 - step(0.5, mod(k, INDEXF));
  float cov = aaLine(d, mix(1.0, 1.75, isIdx) * uDpr);
  float sp = 1.0 / fl;
  float dens = mix(smoothstep(2.4 * uDpr, 8.0 * uDpr, sp), smoothstep(2.4 * uDpr, 8.0 * uDpr, sp * INDEXF), isIdx);
  float halo = exp(-d / (2.6 * uDpr)) * mix(0.18, 0.32, isIdx);
  float lv = k * DELTA;
  vec3 ramp = texture(uLut, vec2(clamp(lv / uUref, 0.0, 1.0), 0.5)).rgb;
  vec3 rampU = texture(uLut, vec2(tu, 0.5)).rgb;
  float rev = clamp((uReveal - u) / (0.35 * uUref), 0.0, 1.0);
  float la = (cov + halo) * dens * mix(0.62, 1.0, isIdx) * step(0.5, k) * rev * (0.72 + 0.55 * tu);

  // the wire: the lines x1 = const and x2 = const, every half unit
  vec2 gq = x * 2.0;
  vec2 gw = max(vec2(length(vec2(dFdx(gq.x), dFdy(gq.x))), length(vec2(dFdx(gq.y), dFdy(gq.y)))), vec2(1e-6));
  vec2 gd = abs(fract(gq + 0.5) - 0.5) / gw;
  vec2 gc = clamp(0.5 * 0.8 * uDpr + 0.5 - gd, 0.0, 1.0) * smoothstep(vec2(3.0 * uDpr), vec2(10.0 * uDpr), 1.0 / gw);
  float wire = max(gc.x, gc.y) * uDetail;

  // the rim of the base
  vec2 ex = min(vX, XS - vX) / max(vec2(length(vec2(dFdx(vX.x), dFdy(vX.x))), length(vec2(dFdx(vX.y), dFdy(vX.y)))), vec2(1e-6));
  float rim = aaLine(min(ex.x, ex.y), 1.3 * uDpr);

  // the probe's level set, on the mountain
  float gu = max(length(vec2(dFdx(u), dFdy(u))), 1e-7);
  float dh = abs(u - uProbeU) / gu;
  vec3 hcol = mix(texture(uLut, vec2(clamp(uProbeU / uUref, 0.0, 1.0), 0.5)).rgb, vec3(1.0), 0.5);
  float hl = aaLine(dh, 2.0 * uDpr) * 0.95 + exp(-dh / (5.0 * uDpr)) * 0.3;

  // dark glass, faintly lit from the upper left, with a cool rim at grazing angles
  vec3 L = normalize(vec3(-0.45, 0.8, 0.4));
  float lam = max(dot(n, L), 0.0);
  float alpha = min(1.0, uGlass * mix(1.0, 1.15, fres));
  vec3 col = (uBg * 0.7 + rampU * (0.012 + 0.028 * lam)) * alpha;
  col += vec3(0.5, 0.66, 1.0) * fres * 0.045;
  col += ramp * la;
  col += uInk * wire * 0.045 * rev;
  col += mix(rampU, uInk, 0.35) * rim * 0.5 * rev;
  col += hcol * hl * uHi;
  outColor = vec4(col * fog, alpha);
}`,kt=`#version 300 es
precision highp float;
precision highp int;
in vec3 aP;
in vec2 aVS;
uniform mat4 uVP;
out vec2 vVS;
void main() {
  vVS = aVS;
  gl_Position = uVP * vec4(aP, 1.0);
}`,Lt=`#version 300 es
precision highp float;
precision highp int;
in vec2 vVS;
uniform vec3 uCol;
uniform float uA;
uniform float uTime;
out vec4 outColor;
void main() {
  float v = vVS.x;
  float s = vVS.y;
  float ends = smoothstep(0.0, 0.07, s) * (1.0 - smoothstep(0.93, 1.0, s));
  float rays = 0.62 + 0.38 * sin(s * 163.0 + uTime * 0.7) * sin(s * 57.0 - uTime * 0.43 + 1.7);
  float prof = 0.05 + 0.4 * pow(v, 7.0) + 0.22 * pow(1.0 - v, 12.0);
  outColor = vec4(uCol * prof * rays * ends * uA, 0.0);
}`,Dt=`#version 300 es
precision highp float;
precision highp int;
uniform vec2 uRes;
uniform vec2 uP0;
uniform vec2 uP1;
uniform float uHalf;
uniform int uMode;
out vec2 vL;
void main() {
  int i = gl_VertexID;
  vec2 c = vec2(float(i == 1 || i == 2 || i == 4), float(i == 2 || i == 4 || i == 5)) * 2.0 - 1.0;
  vec2 p;
  if (uMode == 0) {
    p = uP0 + c * uHalf;
    vL = c * uHalf;
  } else {
    vec2 dd = uP1 - uP0;
    float len = length(dd);
    vec2 tt = len > 0.0 ? dd / len : vec2(1.0, 0.0);
    vec2 nn = vec2(-tt.y, tt.x);
    float along = (c.x * 0.5 + 0.5) * (len + 2.0 * uHalf) - uHalf;
    p = uP0 + tt * along + nn * c.y * uHalf;
    vL = vec2(along, c.y * uHalf);
  }
  gl_Position = vec4(p / uRes * 2.0 - 1.0, 0.0, 1.0);
}`,Ut=`#version 300 es
precision highp float;
precision highp int;
in vec2 vL;
uniform int uMode;
uniform vec3 uCol;
uniform vec3 uCore;
uniform float uA;
uniform float uLen;
uniform vec4 uShape;   // mode 0: ring radius, ring width, bead radius, glow radius; mode 1: width, dash, gap, -
out vec4 outColor;
void main() {
  if (uMode == 0) {
    float r = length(vL);
    float ring = clamp(uShape.y * 0.5 + 0.5 - abs(r - uShape.x), 0.0, 1.0);
    float bead = clamp(uShape.z + 0.5 - r, 0.0, 1.0);
    float glow = exp(-(r * r) / (2.0 * uShape.w * uShape.w));
    vec3 c = uCol * ring * 0.9 + uCore * bead + uCore * glow * 0.22;
    float a = max(max(ring * 0.9, bead), glow * 0.22);
    outColor = vec4(c * uA, a * uA);
  } else {
    float across = clamp(uShape.x * 0.5 + 0.5 - abs(vL.y), 0.0, 1.0);
    float ph = mod(vL.x, uShape.y + uShape.z);
    float on = clamp(ph + 0.5, 0.0, 1.0) * clamp(uShape.y + 0.5 - ph, 0.0, 1.0);
    float inside = step(0.0, vL.x) * step(vL.x, uLen);
    float a = across * on * inside;
    outColor = vec4(uCol * a * uA, a * uA);
  }
}`;function Pt(t,o,n,a){const e=t.getContext("webgl2",{alpha:!1,antialias:!0,depth:!0,stencil:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:"low-power",failIfMajorPerformanceCaveat:!0});if(!e)return null;const i=[],l=[],u=(r,g,k=[])=>{const L=(z,$)=>{const q=e.createShader(z);return q?(e.shaderSource(q,$),e.compileShader(q),i.push(q),q):null},Q=L(e.VERTEX_SHADER,r),X=L(e.FRAGMENT_SHADER,g),O=e.createProgram();if(!Q||!X||!O||(e.attachShader(O,Q),e.attachShader(O,X),k.forEach((z,$)=>e.bindAttribLocation(O,$,z)),e.linkProgram(O),!e.getProgramParameter(O,e.LINK_STATUS)))return null;l.push(O);const W={},B=e.getProgramParameter(O,e.ACTIVE_UNIFORMS);for(let z=0;z<B;z++){const $=e.getActiveUniform(O,z);$&&(W[$.name.replace(/\[0\]$/,"")]=e.getUniformLocation(O,$.name))}return{prog:O,u:W}},f=u(Rt,Ft),s=u(Ze,Tt,["aST"]),m=u(Ze,St,["aST"]),d=u(kt,Lt,["aP","aVS"]),b=u(Dt,Ut);if(!f||!s||!m||!d||!b)return null;let P=!1;try{const r=e.getExtension("WEBGL_debug_renderer_info"),g=String(e.getParameter(r?r.UNMASKED_RENDERER_WEBGL:e.RENDERER)||"");P=/swiftshader|llvmpipe|softpipe|lavapipe|software|basic render/i.test(g)}catch{P=!1}const M=e.createTexture();e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,M),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,o.ramp),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const x=a+1,h=new Float32Array(x*x*2);for(let r=0;r<x;r++)for(let g=0;g<x;g++)h[(r*x+g)*2]=g/a,h[(r*x+g)*2+1]=r/a;const p=new Uint16Array(a*a*6);let E=0;for(let r=0;r<a;r++)for(let g=0;g<a;g++){const k=r*x+g;p[E++]=k,p[E++]=k+1,p[E++]=k+x,p[E++]=k+1,p[E++]=k+x+1,p[E++]=k+x}const D=e.createVertexArray();e.bindVertexArray(D);const F=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,F),e.bufferData(e.ARRAY_BUFFER,h,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const S=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,S),e.bufferData(e.ELEMENT_ARRAY_BUFFER,p,e.STATIC_DRAW);const N=p.length,y=new Float32Array(he*2*5),v=e.createVertexArray();e.bindVertexArray(v);const w=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,w),e.bufferData(e.ARRAY_BUFFER,y.byteLength,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,20,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,20,12);const T=e.createVertexArray();e.bindVertexArray(null);let U=1,R=1;const _=(r,g)=>{e.uniform1i(r.uKind,g.kind),e.uniform1f(r.uA,g.alpha),e.uniform1f(r.uRho,g.rho),e.uniform1f(r.uGam,g.gamma)};return{kind:"webgl2",software:P,resize(r,g,k){U=Math.max(1,Math.round(r*k)),R=Math.max(1,Math.round(g*k)),t.width!==U&&(t.width=U),t.height!==R&&(t.height=R)},draw(r){const{look:g,cam:k}=r,L=U/Math.max(1,r.w),Q=Number.isFinite(r.reveal)?r.reveal:1e9;e.viewport(0,0,U,R),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,M),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.useProgram(f.prog);const X=f.u;_(X,r.p),e.uniform2f(X.uRes,U,R),e.uniformMatrix4fv(X.uInv,!1,k.inv),e.uniform3fv(X.uEye,k.eye),e.uniform1f(X.uFloor,g.floor),e.uniform1f(X.uDpr,L),e.uniform1f(X.uDist,k.dist),e.uniform1f(X.uUref,r.uref),e.uniform1f(X.uProbeU,r.probeU),e.uniform1f(X.uHi,r.hi),e.uniform1f(X.uReveal,Q),e.uniform2f(X.uMap,g.mapIn,g.mapOut),e.uniform3fv(X.uBg,o.bg),e.uniform3fv(X.uInk,o.ink),e.uniform1i(X.uLut,0),e.bindVertexArray(T),e.drawArrays(e.TRIANGLES,0,3);const O=Le(g,r.uref,r.rise,r.probeU);if(r.curveN>1&&r.hi>.01&&r.rise>.05){let z=0;const $=[0];for(let V=1;V<r.curveN;V++)z+=Math.hypot(r.curve[V*2]-r.curve[V*2-2],r.curve[V*2+1]-r.curve[V*2-1]),$.push(z);for(let V=0;V<r.curveN;V++){const Y=r.curve[V*2],re=r.curve[V*2+1],J=z>0?$[V]/z:0,A=V*10;y[A]=Y,y[A+1]=g.floor,y[A+2]=re,y[A+3]=0,y[A+4]=J,y[A+5]=Y,y[A+6]=O,y[A+7]=re,y[A+8]=1,y[A+9]=J}e.bindBuffer(e.ARRAY_BUFFER,w),e.bufferSubData(e.ARRAY_BUFFER,0,y,0,r.curveN*10),e.useProgram(d.prog);const q=d.u;e.uniformMatrix4fv(q.uVP,!1,k.vp);const ee=ue(o,r.probeU/r.uref);e.uniform3f(q.uCol,ee[0]*.6+.4,ee[1]*.6+.4,ee[2]*.6+.4),e.uniform1f(q.uA,r.hi*Math.min(1,r.rise*1.2)),e.uniform1f(q.uTime,r.time),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(v),e.drawArrays(e.TRIANGLE_STRIP,0,r.curveN*2)}e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.disable(e.BLEND),e.colorMask(!1,!1,!1,!1),e.useProgram(m.prog);const W=m.u;_(W,r.p),e.uniformMatrix4fv(W.uVP,!1,k.vp),e.uniform1f(W.uUref,r.uref),e.uniform1f(W.uRise,r.rise),e.uniform1f(W.uHs,g.hs),e.uniform1f(W.uKap,g.kap),e.uniform1f(W.uFloor,g.floor),e.bindVertexArray(D),e.drawElements(e.TRIANGLES,N,e.UNSIGNED_SHORT,0),e.colorMask(!0,!0,!0,!0),e.depthFunc(e.LEQUAL),e.depthMask(!1),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(s.prog);const B=s.u;if(_(B,r.p),e.uniformMatrix4fv(B.uVP,!1,k.vp),e.uniform3fv(B.uEye,k.eye),e.uniform1f(B.uDpr,L),e.uniform1f(B.uDist,k.dist),e.uniform1f(B.uUref,r.uref),e.uniform1f(B.uRise,r.rise),e.uniform1f(B.uHs,g.hs),e.uniform1f(B.uKap,g.kap),e.uniform1f(B.uFloor,g.floor),e.uniform1f(B.uProbeU,r.probeU),e.uniform1f(B.uHi,r.hi),e.uniform1f(B.uReveal,Q),e.uniform1f(B.uDetail,g.detail),e.uniform1f(B.uGlass,g.glass),e.uniform3fv(B.uBg,o.bg),e.uniform3fv(B.uInk,o.ink),e.uniform1i(B.uLut,0),e.drawElements(e.TRIANGLES,N,e.UNSIGNED_SHORT,0),e.depthMask(!0),e.disable(e.DEPTH_TEST),r.hi>.01){const z=(ae,pe,Ae)=>{const ne=ke(k.vp,ae,pe,Ae);return ne[3]<=1e-6?null:[(ne[0]/ne[3]*.5+.5)*U,(ne[1]/ne[3]*.5+.5)*R]},[$,q]=ot(r.probe[0],r.probe[1]),V=r.probe[0]<=C&&r.probe[1]<=C?z($,Le(g,r.uref,r.rise,r.probeU),q):null,Y=z($,g.floor,q),re=ue(o,r.probeU/r.uref),J=[re[0]*.35+.65,re[1]*.35+.65,re[2]*.35+.65];e.useProgram(b.prog);const A=b.u;e.uniform2f(A.uRes,U,R),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.bindVertexArray(T),V&&Y&&r.rise>.2&&(e.uniform1i(A.uMode,1),e.uniform2f(A.uP0,V[0],V[1]),e.uniform2f(A.uP1,Y[0],Y[1]),e.uniform1f(A.uHalf,2*L),e.uniform1f(A.uLen,Math.hypot(Y[0]-V[0],Y[1]-V[1])),e.uniform4f(A.uShape,1*L,3*L,4*L,0),e.uniform3f(A.uCol,o.ink[0],o.ink[1],o.ink[2]),e.uniform1f(A.uA,.42*r.hi*Math.min(1,r.rise)),e.drawArrays(e.TRIANGLES,0,6)),e.uniform1i(A.uMode,0),Y&&(e.uniform2f(A.uP0,Y[0],Y[1]),e.uniform1f(A.uHalf,14*L),e.uniform4f(A.uShape,4.5*L,1*L,1.6*L,5*L),e.uniform3f(A.uCol,J[0],J[1],J[2]),e.uniform3f(A.uCore,J[0],J[1],J[2]),e.uniform1f(A.uA,.7*r.hi),e.drawArrays(e.TRIANGLES,0,6)),V&&(e.uniform2f(A.uP0,V[0],V[1]),e.uniform1f(A.uHalf,22*L),e.uniform4f(A.uShape,7*L,1.1*L,2.7*L,9*L),e.uniform3f(A.uCol,o.ink[0],o.ink[1],o.ink[2]),e.uniform3f(A.uCore,1,1,1),e.uniform1f(A.uA,r.hi),e.drawArrays(e.TRIANGLES,0,6))}e.disable(e.BLEND),e.bindVertexArray(null)},destroy(){e.deleteTexture(M),e.deleteBuffer(F),e.deleteBuffer(S),e.deleteBuffer(w),e.deleteVertexArray(D),e.deleteVertexArray(v),e.deleteVertexArray(T),l.forEach(r=>e.deleteProgram(r)),i.forEach(r=>e.deleteShader(r))}}}const _t=25.6,et=.6;function tt(t,o){const n=Math.sqrt(t*o/(_t*et));return{s1:n,s2:et*n}}function It(t,o){const n=t.getContext("2d",{alpha:!1});if(!n)return null;const a=6;let e=0,i=0,l=1,u=0,f=0,s=new Float64Array(0);const m=24,d=[];for(let h=0;h<m;h++)d.push(ce(ue(o,h/(m-1))));const b=Array.from({length:m*2},()=>[]),P=[];function M(h,p,E,D,F,S,N,y){const v=(D>y?8:0)|(F>y?4:0)|(S>y?2:0)|(N>y?1:0);if(v===0||v===15)return;const w=()=>[p+a*((y-D)/(F-D)),E],T=()=>[p+a,E+a*((y-F)/(S-F))],U=()=>[p+a*((y-N)/(S-N)),E+a],R=()=>[p,E+a*((y-D)/(N-D))],_=(r,g)=>h.push(r[0],r[1],g[0],g[1]);switch(v){case 1:case 14:_(R(),U());break;case 2:case 13:_(U(),T());break;case 3:case 12:_(R(),T());break;case 4:case 11:_(w(),T());break;case 6:case 9:_(w(),U());break;case 7:case 8:_(R(),w());break;case 5:case 10:{const r=(D+F+S+N)/4>y;v===5===r?(_(R(),w()),_(U(),T())):(_(w(),T()),_(R(),U()));break}}}const x=h=>{n.beginPath();for(let p=0;p<h.length;p+=4)n.moveTo(h[p],h[p+1]),n.lineTo(h[p+2],h[p+3]);n.stroke()};return{kind:"canvas2d",software:!0,resize(h,p,E){e=h,i=p,l=E,t.width=Math.max(1,Math.round(e*l)),t.height=Math.max(1,Math.round(i*l)),u=Math.ceil(e/a)+1,f=Math.ceil(i/a)+1,s=new Float64Array(u*f)},pick2d(h,p,E){const{s1:D,s2:F}=tt(e,i);return{x1:Math.max(.001,p/D),x2:Math.max(.001,(i-E)/F),on:"floor"}},draw(h){const{s1:p,s2:E}=tt(e,i);n.setTransform(l,0,0,l,0,0),n.globalAlpha=1,n.fillStyle=ce(o.bg),n.fillRect(0,0,e,i);const D=oe(h.p,.04*(e/p),.04*(i/E)),F=oe(h.p,.96*(e/p),.96*(i/E)),S=n.createRadialGradient(e,0,0,e,0,Math.max(e,i)*.8);S.addColorStop(0,ce(ue(o,.7),.04)),S.addColorStop(1,ce(ue(o,.7),0)),n.fillStyle=S,n.fillRect(0,0,e,i);for(let v=0;v<f;v++){const w=Math.max(1e-5,(i-v*a)/E);for(let T=0;T<u;T++)s[v*u+T]=oe(h.p,Math.max(1e-5,T*a/p),w)}for(const v of b)v.length=0;P.length=0;const N=1/Math.max(1e-6,F-D),y=Number.isFinite(h.reveal)?h.reveal:1/0;for(let v=0;v<f-1;v++)for(let w=0;w<u-1;w++){const T=s[v*u+w],U=s[v*u+w+1],R=s[(v+1)*u+w+1],_=s[(v+1)*u+w],r=Math.min(T,U,R,_),g=Math.max(T,U,R,_),k=Math.ceil(r/me),L=Math.floor(Math.min(g,y)/me),Q=w*a,X=v*a;if(L>=k){const O=Math.floor(g/me)-k+1,W=a/O>=5,B=a*Te/O>=5;for(let z=Math.max(1,k);z<=L;z++){const $=z%Te===0;if($?!B:!W)continue;const q=z*me,ee=Math.min(1,Math.max(0,(q-D)*N)),V=Math.round(ee*(m-1))*2+($?1:0);M(b[V],Q,X,T,U,R,_,q)}}h.hi>0&&r<=h.probeU&&g>=h.probeU&&M(P,Q,X,T,U,R,_,h.probeU)}n.lineCap="round";for(let v=0;v<b.length;v++){const w=b[v];if(!w.length)continue;const T=v%2===1;n.strokeStyle=d[v>>1],n.globalAlpha=T?.6:.26,n.lineWidth=T?1.4:.8,x(w)}if(h.hi>0){const v=ue(o,(h.probeU-D)*N),w=[v[0]*.5+.5,v[1]*.5+.5,v[2]*.5+.5];n.strokeStyle=ce(w),n.globalAlpha=.14*h.hi,n.lineWidth=7,x(P),n.globalAlpha=.95*h.hi,n.lineWidth=1.5,x(P);const T=h.probe[0]*p,U=i-h.probe[1]*E;n.globalAlpha=.85*h.hi,n.strokeStyle=ce(o.ink),n.lineWidth=1.1,n.beginPath(),n.arc(T,U,6.5,0,Math.PI*2),n.stroke(),n.globalAlpha=h.hi,n.fillStyle="#fff",n.beginPath(),n.arc(T,U,2.6,0,Math.PI*2),n.fill()}n.globalAlpha=1},destroy(){}}}function Ct(t,o){const n=getComputedStyle(t).getPropertyValue(o).trim();if(!n||n==="none")return null;const a=n.split(/[\s,]+/).map(Number);return a.length>=2&&a.slice(0,2).every(e=>Number.isFinite(e))?a:null}function Se(t){return[C*(.6+.2*Math.sin(t*.13+.4)+.05*Math.sin(t*.31+2)),C*(.58+.2*Math.sin(t*.1+1.9)+.05*Math.sin(t*.27+.7))]}function Nt(t){const o=t.querySelector("canvas[data-hf-main]")??t.querySelector("canvas");if(!o)return null;const n=t.parentElement??t,a=null,e=2,i=!1,l=c=>c,u=xt(t),f=matchMedia("(max-width: 640px)");let s=null;if(s=Pt(o,u,a==="gl",f.matches?72:128),!s){let c=o;{const I=o.cloneNode(!1);o.replaceWith(I),c=I}s=It(c,u)}if(!s)return null;t.dataset.renderer=s.kind;const m=s.software&&a!=="gl",d=t.querySelector("canvas[data-hf-main]")??t.querySelector("canvas"),b=matchMedia("(prefers-reduced-motion: reduce)"),P=matchMedia("(hover: none)");let M=b.matches||a==="static"||i,x=0,h=0,p=m?1/Math.min(window.devicePixelRatio||1,1.5):1,E=1,D=null,F=l(Qe(1440,900,null)),S=e,N=M?99:0,y=0,v=0,w=!0,T=document.visibilityState!=="hidden",U=!1,R=null,_=-1e9,r=0,g=0,k=Se(e),L="auto",Q=null,X=0,O=0,W="";const B=new Float32Array(he*2),z=()=>{const c=Ct(t,"--field-probe");D=c?[c[0],c[1]]:null,F=l(Qe(x,h,D))},$=()=>{const c=t.getBoundingClientRect();x=Math.max(1,c.width),h=Math.max(1,c.height),E=Math.min(window.devicePixelRatio||1,1.5)*p,s.resize(x,h,E),z()},q=()=>{const c=Math.min(1,N/gt),I=Math.min(1,Math.max(0,(N-Ye)/je)),H=G=>G<.5?4*G*G*G:1-Math.pow(-2*G+2,3)/2;return{map:1-Math.pow(1-c,3),rise:H(I),done:I>=1&&c>=1}},ee=()=>{const c=F.az+(M?0:F.swAz*Math.sin(S*2*Math.PI/96))+r,I=F.el+(M?0:F.swEl*Math.sin(S*2*Math.PI/67+1.1))+g;return Et(x,h,F,c,I)},V=(c,I,H,G)=>R?s.kind==="webgl2"?Je(c,F,I,H,G,R.nx,-R.ny):s.pick2d?.({},(R.nx+1)/2*x,(R.ny+1)/2*h)??null:null,Y=(c,I,H,G)=>{const j=q(),Z=Math.max(.001,k[0]),te=Math.max(.001,k[1]),K=oe(c,Z,te),ie=st(c,Z,te),xe=s.kind==="webgl2"&&K<H?wt(c,K,B):0,se=j.done?1/0:j.map*H*2.6,ge=j.done?1:Math.min(1,Math.max(0,(N-Ye-je*.7)/.6));return re(c,Z,te,K,ie,G),{w:x,h,dpr:E,look:F,cam:I,p:c,uref:H,rise:j.rise,reveal:se,probe:[Z,te],probeU:K,probeMrs:ie,hi:O*ge,curve:B,curveN:xe,time:S}};function re(c,I,H,G,j,Z){const te={x1:I,x2:H,u:G,mrs:j,family:lt(c),alpha:c.alpha,rho:c.rho,sigma:ct(c),gamma:c.gamma,source:Z},K=`${I.toFixed(2)}|${H.toFixed(2)}|${G.toFixed(2)}|${j.toPrecision(3)}|${te.family}|${c.alpha.toFixed(2)}|${c.rho.toFixed(2)}|${c.gamma.toFixed(2)}|${Z}`;K!==W&&(W=K,t.dispatchEvent(new CustomEvent("fe:field-probe",{detail:te,bubbles:!0})))}const J=()=>{U=!1;const c=be(M?e:S),I=oe(c,C,C),H=ee();O=1;const G=V(H,c,I,q().rise);k=G?[G.x1,G.x2]:Q??Se(M?e:S),s.draw(Y(c,H,I,G?"pointer":M?"static":"auto"))},A=()=>{U||(U=!0,requestAnimationFrame(J))},ae=[];let pe=24;const Ae=()=>m?32:performance.now()-_<1600?15:31,ne=c=>{if(v=0,!Pe())return;const I=Ae();if(y&&c-y<I){v=requestAnimationFrame(ne);return}const H=y?Math.min(.05,(c-y)/1e3):1/60;if(y&&(ae.push((c-y)/(I+2)),ae.length>=pe)){const rt=ae.reduce((at,it)=>at+it,0)/ae.length;ae.length=0,pe=45,rt>1.3&&p>.6&&(p=Math.max(.6,p*.82),$())}y=c,S+=H,N+=H;const G=performance.now();L==="pinned"&&G>X&&(L="auto",Q=null);const j=1-Math.exp(-H/.9),Z=R&&L==="pointer"?R.nx*7:0,te=R&&L==="pointer"?-R.ny*4:0;r+=(Z-r)*j,g+=(te-g)*j;const K=be(S),ie=oe(K,C,C),xe=ee(),se=L==="pointer"?V(xe,K,ie,q().rise):null,ge=se?[se.x1,se.x2]:L==="pinned"&&Q?Q:Se(S),nt=se?.06:L==="pinned"?.25:.9,Ke=1-Math.exp(-H/nt);k=[k[0]+(ge[0]-k[0])*Ke,k[1]+(ge[1]-k[1])*Ke],O+=(1-O)*(1-Math.exp(-H/.4)),s.draw(Y(K,xe,ie,se?"pointer":"auto")),v=requestAnimationFrame(ne)},Pe=()=>!M&&w&&T,ve=()=>{if(M){A();return}!v&&Pe()&&(y=0,v=requestAnimationFrame(ne))},fe=()=>{v&&cancelAnimationFrame(v),v=0},_e=c=>{const I=t.getBoundingClientRect(),H=Math.min(I.width,Math.max(0,c.clientX-I.left)),G=Math.min(I.height,Math.max(0,c.clientY-I.top));return{nx:H/Math.max(1,I.width)*2-1,ny:G/Math.max(1,I.height)*2-1}};let le=null;const Ie=c=>{c.pointerType==="touch"||P.matches&&c.pointerType!=="mouse"||(L="pointer",R=_e(c),_=performance.now(),M&&A())},Ce=c=>{c.pointerType!=="touch"&&(L==="pointer"&&(L="auto"),R=null,M&&A())},Ne=c=>{c.pointerType==="touch"&&(le={x:c.clientX,y:c.clientY,t:performance.now()})},Ve=c=>{if(c.pointerType!=="touch"||!le)return;const I=Math.hypot(c.clientX-le.x,c.clientY-le.y),H=performance.now()-le.t<450;le=null;const G=c.target;if(!H||I>12||G&&G.closest('a, button, input, label, [role="button"]'))return;const j=_e(c),Z=be(M?e:S),te=oe(Z,C,C);let K=null;if(s.kind==="webgl2"){const ie=ee();K=Je(ie,F,Z,te,q().rise,j.nx,-j.ny)}else K=s.pick2d?.({},(j.nx+1)/2*x,(j.ny+1)/2*h)??null;K&&(L="pinned",Q=[K.x1,K.x2],X=performance.now()+6e3,_=performance.now(),M&&A())};n.addEventListener("pointermove",Ie,{passive:!0}),n.addEventListener("pointerleave",Ce,{passive:!0}),n.addEventListener("pointerdown",Ne,{passive:!0}),n.addEventListener("pointerup",Ve,{passive:!0});const Be=new ResizeObserver(()=>{$(),(M||!v)&&A()});Be.observe(t);const Xe=new IntersectionObserver(c=>{w=c[c.length-1].isIntersecting,w?ve():fe()});Xe.observe(t);const Ge=()=>{T=document.visibilityState!=="hidden",T?ve():fe()};document.addEventListener("visibilitychange",Ge);const ze=()=>{M=b.matches||a==="static"||i,M?(fe(),N=99,A()):ve()};b.addEventListener("change",ze);const He=c=>{c.preventDefault(),fe()},Oe=()=>{$e.destroy(),delete t.dataset.renderer,Nt(t)};d.addEventListener("webglcontextlost",He),d.addEventListener("webglcontextrestored",Oe);const qe=()=>{z(),M&&A()};if(t.addEventListener("fe:field-config",qe),$(),M)O=1,J();else{const c=be(S);s.draw(Y(c,ee(),oe(c,C,C),"auto")),ve()}t.classList.add("is-live");const $e={renderer:s.kind,destroy(){fe(),Be.disconnect(),Xe.disconnect(),document.removeEventListener("visibilitychange",Ge),b.removeEventListener("change",ze),n.removeEventListener("pointermove",Ie),n.removeEventListener("pointerleave",Ce),n.removeEventListener("pointerdown",Ne),n.removeEventListener("pointerup",Ve),d.removeEventListener("webglcontextlost",He),d.removeEventListener("webglcontextrestored",Oe),t.removeEventListener("fe:field-config",qe),s?.destroy()}};return $e}export{lt as familyOf,Nt as initHeroField,st as mrs,be as paramsAt,ct as sigmaOf,oe as utility};
