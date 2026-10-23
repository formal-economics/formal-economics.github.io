function ye(t,o,n){if(t.kind===1)return t.alpha*Math.pow(o,t.gamma)+(1-t.alpha)*n;const a=t.alpha,i=1-t.alpha,e=Math.log(o),u=Math.log(n);if(Math.abs(t.rho)<.02){const s=e-u,p=a*e+i*u,m=a*i*s*s,R=a*i*(1-2*a)*s*s*s;return Math.exp(p+.5*t.rho*m+t.rho*t.rho*R/6)}const l=t.rho*e+Math.log(a),f=t.rho*u+Math.log(i),d=Math.max(l,f);return Math.exp((d+Math.log(Math.exp(l-d)+Math.exp(f-d)))/t.rho)}function Rt(t,o,n){return t.kind===1?t.alpha*t.gamma*Math.pow(o,t.gamma-1)/(1-t.alpha):t.alpha/(1-t.alpha)*Math.pow(o/n,t.rho-1)}function yt(t){return t.kind===1?t.gamma===1?"perfect-substitutes":"quasi-linear":t.rho===0?"cobb-douglas":t.rho===1?"perfect-substitutes":t.rho<=-4?"near-leontief":"ces"}function Tt(t){return t.kind===1?t.gamma===1?1/0:NaN:t.rho===1?1/0:1/(1-t.rho)}const Ye=[{d:9,kind:0,from:0,to:0},{d:8,kind:0,from:0,to:-8,viaSigma:!0},{d:5,kind:0,from:-8,to:-8},{d:8,kind:0,from:-8,to:0,viaSigma:!0},{d:4,kind:0,from:0,to:0},{d:7,kind:0,from:0,to:1},{d:4,kind:0,from:1,to:1},{d:6,kind:1,from:1,to:.4},{d:6,kind:1,from:.4,to:.4},{d:6,kind:1,from:.4,to:1},{d:7,kind:0,from:1,to:0}],je=Ye.reduce((t,o)=>t+o.d,0),At=t=>t*t*t*(t*(t*6-15)+10);function Ke(t){const o=.6+.08*Math.sin(2*Math.PI*t/29);let n=(t%je+je)%je;for(let a=0;a<Ye.length;a++){const i=Ye[a];if(n<i.d||a===Ye.length-1){let e;if(i.from===i.to)e=i.from;else{const u=At(Math.min(1,Math.max(0,n/i.d)));if(i.viaSigma){const l=1/(1-i.from),f=1/(1-i.to);e=1-1/(l+(f-l)*u)}else e=i.from+(i.to-i.from)*u}return i.kind===0?{kind:0,alpha:o,rho:e,gamma:1}:{kind:1,alpha:o,rho:1,gamma:e}}n-=i.d}return{kind:0,alpha:o,rho:0,gamma:1}}function wt(t){const o=t.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);if(o)return[+o[1]/255,+o[2]/255,+o[3]/255];const n=t.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/i);return n?[+n[1],+n[2],+n[3]]:null}const Qe=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4),Ft=t=>t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055;function st([t,o,n]){const a=Qe(t),i=Qe(o),e=Qe(n),u=Math.cbrt(.4122214708*a+.5363325363*i+.0514459929*e),l=Math.cbrt(.2119034982*a+.6806995451*i+.1073969566*e),f=Math.cbrt(.0883024619*a+.2817188376*i+.6299787005*e);return[.2104542553*u+.793617785*l-.0040720468*f,1.9779984951*u-2.428592205*l+.4505937099*f,.0259040371*u+.7827717662*l-.808675766*f]}function Ut([t,o,n]){const a=Math.pow(t+.3963377774*o+.2158037573*n,3),i=Math.pow(t-.1055613458*o-.0638541728*n,3),e=Math.pow(t-.0894841775*o-1.291485548*n,3),u=l=>Math.min(1,Math.max(0,Ft(l)));return[u(4.0767416621*a-3.3077115913*i+.2309699292*e),u(-1.2684380046*a+2.6097574011*i-.3413193965*e),u(-.0041960863*a-.7034186147*i+1.707614701*e)]}const Dt=t=>[parseInt(t.slice(1,3),16)/255,parseInt(t.slice(3,5),16)/255,parseInt(t.slice(5,7),16)/255],St=["#0E6F73","#27C6D6","#4F86FF","#8B6CFF","#CF5CD2","#FFB25E"].map(Dt);function Pt(t,o){const n=t.map(st),a=st(o),i=n.length-1,e=new Uint8Array(256*4);for(let u=0;u<256;u++){const l=u/255,f=Math.min(i-1e-9,l*i),d=Math.floor(f),s=f-d;let p=[0,1,2].map(T=>n[d][T]+(n[d+1][T]-n[d][T])*s);const m=Math.min(1,Math.max(0,(l-.94)/.06)),R=m*m*(3-2*m)*.8;p=[0,1,2].map(T=>p[T]+(a[T]-p[T])*R);const b=Ut(p);e[u*4]=Math.round(b[0]*255),e[u*4+1]=Math.round(b[1]*255),e[u*4+2]=Math.round(b[2]*255),e[u*4+3]=255}return e}function Lt(t){const o=document.createElement("span");o.style.position="absolute",o.style.visibility="hidden",t.appendChild(o);const n=(l,f)=>(o.style.color="",o.style.color=`var(${l})`,getComputedStyle(t).getPropertyValue(l).trim()?wt(getComputedStyle(o).color)??f:f),a=n("--_hf-bg",[.016,.024,.039]),i=n("--_hf-ink",[.933,.949,.973]),e=n("--_hf-gold",[.886,.706,.361]),u=St.map((l,f)=>n(`--_hf-a${f}`,l));return o.remove(),{bg:a,ink:i,gold:e,ramp:Pt(u,e)}}const Fe=(t,o)=>{const n=Math.round(Math.min(1,Math.max(0,o))*255)*4;return[t.ramp[n]/255,t.ramp[n+1]/255,t.ramp[n+2]/255]},_e=(t,o=1)=>`rgba(${Math.round(t[0]*255)},${Math.round(t[1]*255)},${Math.round(t[2]*255)},${o})`,O=5,He=2/O,ze=O/2,Xe=.1,tt=5,Ge=128,_t=1.3,ct=.55,lt=2.4;function ft(t,o,n,a){const i=t<700||t<o*.9,e=Math.min(1,Math.max(0,(t-1e3)/400)),u={hs:1.45,kap:1.8,floor:-1,az:-12,el:26,fov:24,swAz:10,swEl:2.2,size:Math.min(t*(.29+.05*e),o*.58,620),cx:.805-.035*e,cy:.43+.06*e,ty:.18,detail:1,glass:.72,mapIn:.6,mapOut:.17,bloom:.95};if(i){const l=n&&n.length>=4?n[1]:.7,f=n&&n.length>=4?Math.max(40,n[3]*4*o):.14*o;u.size=Math.max(160,Math.min(t*.6,f*1.8)),u.cx=.62,u.cy=l+.01,u.el=32,u.floor=-.75,u.swAz=9,u.detail=t<700?0:1}return a&&a.length>=2&&(u.cx=a[0],u.cy=a[1]),u}function kt(t,o,n,a,i){const e=1/Math.tan(o/2),u=1/(a-i);return t.fill(0),t[0]=e/n,t[5]=e,t[10]=(i+a)*u,t[11]=-1,t[14]=2*i*a*u,t}function Ct(t,o,n){let a=o[0]-n[0],i=o[1]-n[1],e=o[2]-n[2],u=Math.hypot(a,i,e)||1;a/=u,i/=u,e/=u;let l=e,f=0,d=-a;u=Math.hypot(l,f,d)||1,l/=u,f/=u,d/=u;const s=i*d-e*f,p=e*l-a*d,m=a*f-i*l;return t[0]=l,t[1]=s,t[2]=a,t[3]=0,t[4]=f,t[5]=p,t[6]=i,t[7]=0,t[8]=d,t[9]=m,t[10]=e,t[11]=0,t[12]=-(l*o[0]+f*o[1]+d*o[2]),t[13]=-(s*o[0]+p*o[1]+m*o[2]),t[14]=-(a*o[0]+i*o[1]+e*o[2]),t[15]=1,t}function Bt(t,o,n){const a=new Float32Array(16);for(let i=0;i<4;i++)for(let e=0;e<4;e++)a[i*4+e]=o[e]*n[i*4]+o[4+e]*n[i*4+1]+o[8+e]*n[i*4+2]+o[12+e]*n[i*4+3];return t.set(a),t}function It(t,o){const n=o[0],a=o[1],i=o[2],e=o[3],u=o[4],l=o[5],f=o[6],d=o[7],s=o[8],p=o[9],m=o[10],R=o[11],b=o[12],T=o[13],v=o[14],h=o[15],A=n*l-a*u,U=n*f-i*u,D=n*d-e*u,B=a*f-i*l,N=a*d-e*l,L=i*d-e*f,x=s*T-p*b,E=s*v-m*b,w=s*h-R*b,y=p*v-m*T,_=p*h-R*T,I=m*h-R*v;let P=A*I-U*_+D*y+B*w-N*E+L*x;return P?(P=1/P,t[0]=(l*I-f*_+d*y)*P,t[1]=(i*_-a*I-e*y)*P,t[2]=(T*L-v*N+h*B)*P,t[3]=(m*N-p*L-R*B)*P,t[4]=(f*w-u*I-d*E)*P,t[5]=(n*I-i*w+e*E)*P,t[6]=(v*D-b*L-h*U)*P,t[7]=(s*L-m*D+R*U)*P,t[8]=(u*_-l*w+d*x)*P,t[9]=(a*w-n*_-e*x)*P,t[10]=(b*N-T*D+h*A)*P,t[11]=(p*D-s*N-R*A)*P,t[12]=(l*E-u*y-f*x)*P,t[13]=(n*y-a*E+i*x)*P,t[14]=(T*U-b*B-v*A)*P,t[15]=(s*B-p*U+m*A)*P,t):null}function ot(t,o,n,a){return[t[0]*o+t[4]*n+t[8]*a+t[12],t[1]*o+t[5]*n+t[9]*a+t[13],t[2]*o+t[6]*n+t[10]*a+t[14],t[3]*o+t[7]*n+t[11]*a+t[15]]}const Je=Math.PI/180;function Nt(t,o,n,a,i){const e=n.fov*Je,u=2.83*o/(2*Math.tan(e/2)*Math.max(80,n.size)),l=[0,n.ty,0],f=a*Je,d=i*Je,s=[l[0]+u*Math.sin(f)*Math.cos(d),l[1]+u*Math.sin(d),l[2]+u*Math.cos(f)*Math.cos(d)],p=Ct(new Float32Array(16),s,l),m=kt(new Float32Array(16),e,t/o,u*.08,u*6),R=n.cx*2-1,b=1-n.cy*2;for(let h=0;h<4;h++)m[h*4]+=R*m[h*4+3],m[h*4+1]+=b*m[h*4+3];const T=Bt(new Float32Array(16),m,p),v=It(new Float32Array(16),T)??new Float32Array(16);return{vp:T,inv:v,eye:s,dist:u}}function We(t,o,n,a){const i=t.hs*Math.pow(Math.max(0,Math.min(2,a/o)),t.kap);return t.floor+n*(i-t.floor)}const nt=(t,o)=>[(t-ze)*He,(ze-o)*He],Ze=(t,o)=>[t/He+ze,ze-o/He],xt=(t,o)=>t>=0&&o>=0&&t*t+o*o<=O*O;function Xt(t,o){const n=Math.max(.001,t),a=Math.max(.001,o),i=Math.hypot(n,a);return i>O?[n*O/i,a*O/i]:[n,a]}function qe(t){const o=m=>ye(t,Math.max(1e-6,O*Math.cos(m)),Math.max(1e-6,O*Math.sin(m)));let n=0,a=Math.PI/2;const i=(Math.sqrt(5)-1)/2;let e=a-i*(a-n),u=n+i*(a-n),l=o(e),f=o(u);for(let m=0;m<48;m++)l>f?(a=u,u=e,f=l,e=a-i*(a-n),l=o(e)):(n=e,e=u,l=f,u=n+i*(a-n),f=o(u));const d=(n+a)/2,s=[[O*Math.cos(d),O*Math.sin(d)],[O,1e-6],[1e-6,O]];let p={x1:s[0][0],x2:s[0][1],u:-1/0};for(const[m,R]of s){const b=ye(t,Math.max(1e-6,m),Math.max(1e-6,R));b>p.u&&(p={x1:m,x2:R,u:b})}return p}function mt(t,o,n,a,i,e,u){const l=ot(t.inv,e,u,-1),f=ot(t.inv,e,u,1),d=[l[0]/l[3],l[1]/l[3],l[2]/l[3]];let s=[f[0]/f[3]-d[0],f[1]/f[3]-d[1],f[2]/f[3]-d[2]];const p=Math.hypot(s[0],s[1],s[2])||1;s=[s[0]/p,s[1]/p,s[2]/p];const m=s[1]<-1e-6?(o.floor-d[1])/s[1]:t.dist*4,R=U=>{const D=d[0]+s[0]*U,B=d[2]+s[2]*U;if(D<-1||D>1||B<-1||B>1)return null;const[N,L]=Ze(D,B);if(!xt(N,L))return null;const x=We(o,a,i,ye(n,Math.max(1e-4,N),Math.max(1e-4,L)));return d[1]+s[1]*U<=x},b=220;let T=0,v=!1;for(let U=1;U<=b;U++){const D=m*U/b,B=R(D);if(B!==!0||!v){v=B===!1,T=D;continue}let N=T,L=D;for(let w=0;w<18;w++){const y=(N+L)/2;R(y)===!0?L=y:N=y}const[x,E]=Xt(...Ze(d[0]+s[0]*L,d[2]+s[2]*L));return{x1:x,x2:E,on:"surface"}}if(s[1]>=-1e-6)return null;const[h,A]=Ze(d[0]+s[0]*m,d[2]+s[2]*m);return h<=.02||A<=.02||h>O*3||A>O*3?null:{x1:h,x2:A,on:"floor"}}let rt=0,gt=Math.PI/2;function Gt(t,o,n){if(!(o>0))return 0;const a=p=>{const m=Math.cos(p),R=Math.sin(p);let b=1,T=0;for(;ye(t,Math.max(1e-9,b*m),Math.max(1e-9,b*R))<o&&T++<60;)b*=2;let v=0;for(let h=0;h<40;h++){const A=(v+b)/2;ye(t,Math.max(1e-9,A*m),Math.max(1e-9,A*R))<o?v=A:b=A}return(v+b)/2},i=1e-4,e=Math.PI/2-1e-4;let u=i,l=e;for(let p=0;p<40;p++){const m=u+(l-u)/3,R=l-(l-u)/3;a(m)<a(R)?l=R:u=m}const f=(u+l)/2;if(a(f)>=O)return 0;let d=i;if(a(i)>O){let p=i,m=f;for(let R=0;R<36;R++){const b=(p+m)/2;a(b)>O?p=b:m=b}d=m}let s=e;if(a(e)>O){let p=f,m=e;for(let R=0;R<36;R++){const b=(p+m)/2;a(b)>O?m=b:p=b}s=p}if(!(s>d))return 0;rt=d,gt=s;for(let p=0;p<Ge;p++){const m=d+(s-d)*p/(Ge-1),R=Math.min(O,a(m)),[b,T]=nt(R*Math.cos(m),R*Math.sin(m));n[p*2]=b,n[p*2+1]=T}return Ge}const at=`
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

float aaLine(float d, float w) { return clamp(0.5 * w + 0.5 - d, 0.0, 1.0); }

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
`,Ne=t=>t.toFixed(6),Ve=`
const float RB = ${Ne(O)};
const float XC = ${Ne(ze)};
const float K = ${Ne(He)};
const float DELTA = ${Ne(Xe)};
const float INDEXF = ${Ne(tt)};
`,$e=`#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Ht=`#version 300 es
precision highp float;
precision highp int;
${Ve}
uniform vec2 uRes;
uniform mat4 uInv;
uniform vec3 uEye;
uniform float uFloor;
uniform float uDpr;
uniform float uDist;
uniform float uUref;
uniform float uProbeU;
uniform float uHi;
uniform vec2 uPulse;    // the travelling light: polar angle, strength
uniform float uReveal;
uniform vec2 uMap;
uniform vec2 uGlowPx;   // the summit on screen, device px
uniform vec2 uSummit;   // the summit, a bundle
uniform vec3 uHaze0;    // the haze behind the mountain: violet above, cyan below, blue around
uniform vec3 uHaze1;
uniform vec3 uHaze2;
uniform vec3 uBg;
uniform vec3 uInk;
uniform vec3 uGold;
uniform sampler2D uLut;
${at}
in vec2 vUv;
out vec4 outColor;

// the ray through a point of the screen (device px), from the eye
vec3 rayAt(vec2 fc) {
  vec4 b4 = uInv * vec4(fc / uRes * 2.0 - 1.0, 1.0, 1.0);
  return normalize(b4.xyz / b4.w - uEye);
}
// the bundle where a downward ray meets the ground
vec2 groundAt(vec3 rd) {
  vec3 p = uEye + rd * ((uFloor - uEye.y) / min(rd.y, -1e-5));
  return vec2(p.x / K + XC, XC - p.z / K);
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  vec3 rd = rayAt(fc);

  // the night: the hero colour, a faint lift toward the horizon, and an aurora haze behind the summit
  vec3 col = uBg;
  vec2 gp = (fc - uGlowPx) / uRes.y * vec2(0.8, 1.15);
  col += mix(uHaze0, uHaze1, clamp(0.5 - gp.y * 1.04, 0.0, 1.0)) * exp(-dot(gp, gp) * 5.0);
  vec2 gm = (fc - uGlowPx + vec2(0.0, 0.32 * uRes.y)) / uRes.y * vec2(0.9, 1.3);
  col += uHaze2 * exp(-dot(gm, gm) * 3.2);
  outColor = vec4(col, 1.0);
  if (rd.y > -1e-3) return;

  // the ground plane; where it has faded to nothing, stop here (the screen-space derivatives below
  // are taken by hand from neighbouring rays, so returning early is safe)
  float t = (uFloor - uEye.y) / rd.y;
  vec3 p = uEye + rd * t;
  vec2 x = vec2(p.x / K + XC, XC - p.z / K);
  float fog = exp(-max(t / uDist - 0.92, 0.0) * 1.5);
  float r = length(p.xz);
  float spread = exp(-max(r - 1.2, 0.0) * max(r - 1.2, 0.0) / 6.0);
  float vis = fog * spread;
  bool nearAxis = min(x.x, x.y) > -0.4 && min(abs(x.x), abs(x.y)) < 0.4 && max(x.x, x.y) < 3.0 * RB;
  if (vis < 0.002 && !(nearAxis && fog > 0.004)) return;

  // how the bundle changes from one pixel to the next, across and up the screen
  vec2 dX = groundAt(rayAt(fc + vec2(1.0, 0.0))) - x;
  vec2 dY = groundAt(rayAt(fc + vec2(0.0, 1.0))) - x;
  vec2 ew = max(vec2(length(vec2(dX.x, dY.x)), length(vec2(dX.y, dY.y))), vec2(1e-6));
  vec2 xs = max(x, vec2(1e-4));
  float u = U(xs);
  vec2 g = gradU(xs, u);
  float gu = max(length(vec2(dot(g, dX), dot(g, dY))), 1e-7);   // utility per pixel

  float inQ = clamp(min(x.x / ew.x, x.y / ew.y) + 0.5, 0.0, 1.0);
  vec2 q = smoothstep(vec2(-0.03), vec2(0.06), x);
  float foot = q.x * q.y * (1.0 - smoothstep(RB - 0.06, RB + 0.03, length(x)));

  // the indifference map: every level u = kΔ, index levels heavier
  float f = u / DELTA;
  float fl = gu / DELTA;
  float d = abs(fract(f + 0.5) - 0.5) / fl;
  float k = floor(f + 0.5);
  float isIdx = 1.0 - step(0.5, mod(k, INDEXF));
  float cov = aaLine(d, mix(0.75, 1.3, isIdx) * uDpr);
  float sp = 1.0 / fl;
  float dens = mix(smoothstep(2.6 * uDpr, 7.5 * uDpr, sp), smoothstep(2.6 * uDpr, 7.5 * uDpr, sp * INDEXF), isIdx);
  float lv = k * DELTA;
  vec3 ramp = texture(uLut, vec2(clamp(lv / uUref, 0.0, 1.0), 0.5)).rgb;
  vec3 dim = mix(uInk * 0.5, ramp, 0.45);
  vec3 lineCol = mix(dim, ramp, foot);
  float rev = clamp((uReveal - u) / (0.35 * uUref), 0.0, 1.0);
  float la = cov * dens * mix(uMap.y, uMap.x, foot) * mix(0.55, 1.0, isIdx) * step(0.5, k) * rev;
  col += lineCol * la * vis * inQ;

  // the mountain's light on the ground beneath it, warmest under the summit
  vec3 rampU = texture(uLut, vec2(clamp(u / uUref, 0.0, 1.0), 0.5)).rgb;
  col += rampU * 0.032 * foot * vis * inQ * rev;
  vec2 ds = x - uSummit;
  col += uGold * 0.085 * exp(-dot(ds, ds) * 0.7) * vis * inQ * rev;

  // the axes of the quadrant, with a tick at every unit
  float ax1 = aaLine(abs(x.y) / ew.y, 0.9 * uDpr) * step(0.0, x.x) * exp(-x.x / (2.0 * RB));
  float ax2 = aaLine(abs(x.x) / ew.x, 0.9 * uDpr) * step(0.0, x.y) * exp(-x.y / (2.0 * RB));
  float tk1 = aaLine(abs(fract(x.x + 0.5) - 0.5) / ew.x, 0.9 * uDpr) * step(abs(x.y), 0.06) * step(0.5, x.x) * exp(-x.x / (1.4 * RB));
  float tk2 = aaLine(abs(fract(x.y + 0.5) - 0.5) / ew.y, 0.9 * uDpr) * step(abs(x.x), 0.06) * step(0.5, x.y) * exp(-x.y / (1.4 * RB));
  col += uInk * 0.2 * max(max(ax1, ax2), max(tk1, tk2)) * fog * rev;

  // the probe's level set, on the ground
  float dh = abs(u - uProbeU) / gu;
  vec3 hcol = mix(texture(uLut, vec2(clamp(uProbeU / uUref, 0.0, 1.0), 0.5)).rgb, vec3(1.0), 0.35);
  float hl = aaLine(dh, 1.3 * uDpr) * 0.75 + exp(-dh / (3.5 * uDpr)) * 0.14;
  float run = exp(-pow((atan(xs.y, xs.x) - uPulse.x) / 0.06, 2.0)) * uPulse.y;
  hl *= 1.0 + 1.6 * run;
  col += hcol * hl * uHi * inQ * vis * mix(0.22, 1.0, foot);

  outColor = vec4(col, 1.0);
}`,ht=`#version 300 es
precision highp float;
precision highp int;
${Ve}
in vec2 aST;
uniform mat4 uVP;
uniform float uUref;
uniform float uRise;
uniform float uHs;
uniform float uKap;
uniform float uFloor;
${at}
out vec2 vX;
out vec3 vW;
void main() {
  // aST = (radius, angle) as fractions of the base; both run one cell past it, a skirt that carries
  // the rim's height outwards so the fragment shader can fade the silhouette over a pixel (analytic
  // antialiasing, no multisampling)
  float th = aST.y * 1.5707963;
  vec2 xr = RB * aST.x * vec2(cos(th), sin(th));
  vec2 x = max(xr, vec2(1e-4));
  x *= min(1.0, RB / length(x));
  float u = U(x);
  float y = uFloor + uRise * (uHs * pow(clamp(u / uUref, 0.0, 2.0), uKap) - uFloor);
  vec3 w = vec3((xr.x - XC) * K, y, (XC - xr.y) * K);
  vX = xr;
  vW = w;
  gl_Position = uVP * vec4(w, 1.0);
}`,zt=`#version 300 es
precision highp float;
${Ve}
in vec2 vX;
in vec3 vW;
out vec4 outColor;
void main() {
  if (min(min(vX.x, vX.y), RB - length(vX)) < 0.0) discard;
  outColor = vec4(0.0);
}`,Vt=`#version 300 es
precision highp float;
precision highp int;
${Ve}
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
uniform vec2 uPulse;    // the travelling light: polar angle, strength
uniform float uReveal;
uniform float uDetail;
uniform float uGlass;
uniform vec3 uBg;
uniform vec3 uInk;
uniform vec3 uGold;
uniform sampler2D uLut;
${at}
out vec4 outColor;

void main() {
  vec2 x = max(vX, vec2(1e-4));
  x *= min(1.0, RB / length(x));
  float u = U(x);
  float tu = clamp(u / uUref, 0.0, 1.0);
  // the base's boundary, in device px (positive inside): the silhouette's coverage
  float rl = length(vX);
  vec3 eb = vec3(vX, RB - rl);
  vec3 gb = vec3(length(vec2(dFdx(vX.x), dFdy(vX.x))), length(vec2(dFdx(vX.y), dFdy(vX.y))), length(vec2(dFdx(rl), dFdy(rl))));
  vec3 epx = eb / max(gb, vec3(1e-6));
  float edge = min(min(epx.x, epx.y), epx.z);
  float cover = clamp(edge + 0.5, 0.0, 1.0);

  // the normal of y = floor + rise (h(u) − floor), from the exact gradient of u
  vec2 g = gradU(x, u);
  float hp = uRise * uHs * uKap * pow(max(tu, 1e-3), uKap - 1.0) / uUref;
  vec3 n = normalize(vec3(-hp * g.x / K, 1.0, hp * g.y / K));
  vec3 V = normalize(uEye - vW);
  float ndv = clamp(abs(dot(n, V)), 0.0, 1.0);
  float fres = pow(1.0 - ndv, 3.0);
  float dist = length(uEye - vW);
  float fog = exp(-max(dist / uDist - 0.85, 0.0) * 1.3);

  // the contours: the level sets u = kΔ, i.e. the indifference curves
  float f = u / DELTA;
  float fl = max(length(vec2(dFdx(f), dFdy(f))), 1e-6);
  float d = abs(fract(f + 0.5) - 0.5) / fl;
  float k = floor(f + 0.5);
  float isIdx = 1.0 - step(0.5, mod(k, INDEXF));
  float cov = aaLine(d, mix(0.85, 1.6, isIdx) * uDpr);
  float sp = 1.0 / fl;
  float dens = mix(smoothstep(2.2 * uDpr, 7.0 * uDpr, sp), smoothstep(2.2 * uDpr, 7.0 * uDpr, sp * INDEXF), isIdx);
  float lv = k * DELTA;
  vec3 ramp = texture(uLut, vec2(clamp(lv / uUref, 0.0, 1.0), 0.5)).rgb;
  vec3 rampU = texture(uLut, vec2(tu, 0.5)).rgb;
  float rev = clamp((uReveal - u) / (0.35 * uUref), 0.0, 1.0);
  float la = cov * dens * mix(0.46, 1.0, isIdx) * step(0.5, k) * rev * (0.74 + 0.5 * tu);

  // the wire: the lines x1 = const and x2 = const, every half unit
  vec2 gq = x * 2.0;
  vec2 gw = max(vec2(length(vec2(dFdx(gq.x), dFdy(gq.x))), length(vec2(dFdx(gq.y), dFdy(gq.y)))), vec2(1e-6));
  vec2 gd = abs(fract(gq + 0.5) - 0.5) / gw;
  vec2 gc = clamp(0.5 * 0.75 * uDpr + 0.5 - gd, 0.0, 1.0) * smoothstep(vec2(3.0 * uDpr), vec2(10.0 * uDpr), 1.0 / gw);
  float wire = max(gc.x, gc.y) * uDetail;

  // the rim of the base: a hairline just inside the silhouette
  float rim = aaLine(abs(edge - 0.6 * uDpr), 1.2 * uDpr);

  // the probe's level set, on the mountain
  float gu = max(length(vec2(dFdx(u), dFdy(u))), 1e-7);
  float dh = abs(u - uProbeU) / gu;
  vec3 hcol = mix(texture(uLut, vec2(clamp(uProbeU / uUref, 0.0, 1.0), 0.5)).rgb, vec3(1.0), 0.45);
  float hl = aaLine(dh, 1.8 * uDpr) + exp(-dh / (4.0 * uDpr)) * 0.22;
  float run = exp(-pow((atan(x.y, x.x) - uPulse.x) / 0.06, 2.0)) * uPulse.y;
  hl *= 1.0 + 1.6 * run;

  // dark glass: faintly lit from the upper left, tinted by its own utility, with a cool rim
  vec3 L = normalize(vec3(-0.5, 0.75, 0.45));
  float lam = max(dot(n, L), 0.0);
  float alpha = min(1.0, uGlass * mix(1.0, 1.2, fres));
  vec3 col = (uBg * 0.6 + rampU * (0.016 + 0.05 * lam * lam + 0.05 * tu * tu)) * alpha;
  col += mix(vec3(0.5, 0.66, 1.0), rampU, 0.5) * fres * 0.11;
  col += ramp * la;
  col += mix(uInk, rampU, 0.5) * wire * 0.07 * rev;
  col += mix(rampU, uInk, 0.3) * rim * 0.62 * rev;
  col += uGold * smoothstep(0.93, 1.0, tu) * 0.08 * rev;
  col += hcol * hl * uHi;
  outColor = vec4(col * fog, alpha) * cover;
}`,Ot=`#version 300 es
precision highp float;
${Ve}
in vec3 aP;
in vec2 aVS;
uniform mat4 uVP;
out vec2 vVS;
out float vTh;
void main() {
  vVS = aVS;
  vTh = atan(XC - aP.z / K, aP.x / K + XC);
  gl_Position = uVP * vec4(aP, 1.0);
}`,Kt=`#version 300 es
precision highp float;
in vec2 vVS;
in float vTh;
uniform vec3 uCol;
uniform float uA;
uniform float uTime;
uniform vec2 uPulse;
out vec4 outColor;
void main() {
  float v = vVS.x;
  float s = vVS.y;
  float beam = exp(-pow((vTh - uPulse.x) / 0.035, 2.0)) * uPulse.y;
  float ends = smoothstep(0.0, 0.07, s) * (1.0 - smoothstep(0.93, 1.0, s));
  float rays = 0.55 + 0.45 * sin(s * 181.0 + uTime * 0.7) * sin(s * 61.0 - uTime * 0.43 + 1.7);
  float prof = 0.06 + 0.42 * pow(v, 7.0) + 0.28 * pow(1.0 - v, 10.0);
  outColor = vec4(uCol * (prof * rays + beam * 0.5) * ends * uA, 0.0);
}`,qt=`#version 300 es
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
  if (uMode != 1) {
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
}`,$t=`#version 300 es
precision highp float;
precision highp int;
in vec2 vL;
uniform int uMode;
uniform vec3 uCol;
uniform vec3 uCore;
uniform float uA;
uniform float uLen;
uniform vec4 uShape;   // 0: ring radius, ring width, bead radius, glow σ; 1: width, dash, gap; 2: σ
out vec4 outColor;
void main() {
  if (uMode == 0) {
    float r = length(vL);
    float ring = clamp(uShape.y * 0.5 + 0.5 - abs(r - uShape.x), 0.0, 1.0);
    float bead = clamp(uShape.z + 0.5 - r, 0.0, 1.0);
    float glow = exp(-(r * r) / (2.0 * uShape.w * uShape.w));
    vec3 c = uCol * ring * 0.9 + uCore * bead + uCore * glow * 0.25;
    float a = max(max(ring * 0.9, bead), glow * 0.25);
    outColor = vec4(c * uA, a * uA);
  } else if (uMode == 1) {
    float across = clamp(uShape.x * 0.5 + 0.5 - abs(vL.y), 0.0, 1.0);
    float ph = mod(vL.x, uShape.y + uShape.z);
    float on = clamp(ph + 0.5, 0.0, 1.0) * clamp(uShape.y + 0.5 - ph, 0.0, 1.0);
    float inside = step(0.0, vL.x) * step(vL.x, uLen);
    float a = across * on * inside;
    outColor = vec4(uCol * a * uA, a * uA);
  } else {
    float r = length(vL);
    float glow = exp(-(r * r) / (2.0 * uShape.x * uShape.x));
    outColor = vec4(uCol * glow * uA, 0.0);
  }
}`,Yt=`#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uTexel;
uniform vec2 uScale;    // the part of the texture in use (the render scale)
uniform float uKnee;
out vec4 outColor;
vec3 tap(vec2 uv) { return texture(uTex, min(uv, uScale - 0.5 * uTexel)).rgb; }
void main() {
  vec2 uv = vUv * uScale;
  vec3 c = tap(uv + uTexel * vec2(-1.0, -1.0))
         + tap(uv + uTexel * vec2(1.0, -1.0))
         + tap(uv + uTexel * vec2(-1.0, 1.0))
         + tap(uv + uTexel * vec2(1.0, 1.0));
  c *= 0.25;
  float l = max(c.r, max(c.g, c.b));
  outColor = vec4(c * clamp((l - uKnee) / max(l, 1e-4), 0.0, 1.0), 1.0);
}`,Wt=`#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uDir;
uniform vec2 uScale;
uniform vec2 uTexel;
out vec4 outColor;
vec3 tap(vec2 uv) { return texture(uTex, clamp(uv, 0.5 * uTexel, uScale - 0.5 * uTexel)).rgb; }
void main() {
  vec2 uv = vUv * uScale;
  vec3 c = tap(uv) * 0.2270270270;
  c += (tap(uv + uDir * 1.3846153846) + tap(uv - uDir * 1.3846153846)) * 0.3162162162;
  c += (tap(uv + uDir * 3.2307692308) + tap(uv - uDir * 3.2307692308)) * 0.0702702703;
  outColor = vec4(c, 1.0);
}`,jt=`#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uBloomK;
uniform vec2 uScale;
uniform vec2 uLimS;     // the last texel centres in use, scene and bloom
uniform vec2 uLimB;
out vec4 outColor;
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
void main() {
  vec2 uv = vUv * uScale;
  vec3 c = texture(uScene, min(uv, uLimS)).rgb + texture(uBloom, min(uv, uLimB)).rgb * uBloomK;
  // a soft shoulder, so that stacked light never clips harshly
  c = mix(c, 1.0 - exp(-c * 1.15), smoothstep(0.55, 1.4, max(c.r, max(c.g, c.b))));
  c += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  outColor = vec4(c, 1.0);
}`;function Qt(t,o,n,a,i=new Set){const e=t.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:"low-power",failIfMajorPerformanceCaveat:!n});if(!e)return null;const u=[],l=[],f=(r,g,M=[])=>{const q=(ie,fe)=>{const me=e.createShader(ie);return me?(e.shaderSource(me,fe),e.compileShader(me),u.push(me),me):null},Z=q(e.VERTEX_SHADER,r),ce=q(e.FRAGMENT_SHADER,g),k=e.createProgram();if(!Z||!ce||!k||(e.attachShader(k,Z),e.attachShader(k,ce),M.forEach((ie,fe)=>e.bindAttribLocation(k,fe,ie)),e.linkProgram(k),!e.getProgramParameter(k,e.LINK_STATUS)))return null;l.push(k);const oe={},le=e.getProgramParameter(k,e.ACTIVE_UNIFORMS);for(let ie=0;ie<le;ie++){const fe=e.getActiveUniform(k,ie);fe&&(oe[fe.name.replace(/\[0\]$/,"")]=e.getUniformLocation(k,fe.name))}return{prog:k,u:oe}},d=f($e,Ht),s=f(ht,Vt,["aST"]),p=f(ht,zt,["aST"]),m=f(Ot,Kt,["aP","aVS"]),R=f(qt,$t),b=f($e,Yt),T=f($e,Wt),v=f($e,jt);if(!d||!s||!p||!m||!R||!b||!T||!v)return null;let h=!1;try{const r=e.getExtension("WEBGL_debug_renderer_info"),g=String(e.getParameter(r?r.UNMASKED_RENDERER_WEBGL:e.RENDERER)||"");h=/swiftshader|llvmpipe|softpipe|lavapipe|software|basic render/i.test(g)}catch{h=!1}const A=(r,g)=>new Float32Array(Fe(o,r).map(M=>M*g)),U=[A(.62,.05),A(.25,.05),A(.45,.03)],D=e.createTexture();e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,D),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,o.ramp),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const B=Math.round(a*.75),N=a,L=B+1,x=N+2,E=L+1,w=new Float32Array(E*(x+1)*2);for(let r=0;r<=x;r++)for(let g=0;g<E;g++)w[(r*E+g)*2]=g/B,w[(r*E+g)*2+1]=(r-1)/N;const y=new Uint16Array(L*x*6);let _=0;for(let r=0;r<x;r++)for(let g=0;g<L;g++){const M=r*E+g;y[_++]=M,y[_++]=M+1,y[_++]=M+E,y[_++]=M+1,y[_++]=M+E+1,y[_++]=M+E}const I=e.createVertexArray();e.bindVertexArray(I);const P=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,P),e.bufferData(e.ARRAY_BUFFER,w,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const te=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,te),e.bufferData(e.ELEMENT_ARRAY_BUFFER,y,e.STATIC_DRAW);const W=y.length,Y=new Float32Array(Ge*2*5),de=e.createVertexArray();e.bindVertexArray(de);const ve=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ve),e.bufferData(e.ARRAY_BUFFER,Y.byteLength,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,20,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,20,12);const J=e.createVertexArray();e.bindVertexArray(null);let X=null;const pe=(r,g)=>{const M=e.createTexture();return e.bindTexture(e.TEXTURE_2D,M),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,r,g,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),M},xe=()=>{X&&(e.deleteFramebuffer(X.sceneFbo),e.deleteTexture(X.sceneTex),e.deleteRenderbuffer(X.sceneDepth),X.bFbo.forEach(r=>e.deleteFramebuffer(r)),X.bTex.forEach(r=>e.deleteTexture(r)),X=null)},se=(r,g)=>{xe(),e.activeTexture(e.TEXTURE1);const M={w:r,h:g,bw:Math.max(1,Math.round(r/4)),bh:Math.max(1,Math.round(g/4)),sceneFbo:e.createFramebuffer(),sceneTex:pe(r,g),sceneDepth:e.createRenderbuffer(),bFbo:[e.createFramebuffer(),e.createFramebuffer()],bTex:[null,null]};e.bindFramebuffer(e.FRAMEBUFFER,M.sceneFbo),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,M.sceneTex,0),e.bindRenderbuffer(e.RENDERBUFFER,M.sceneDepth),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,r,g),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,M.sceneDepth);for(let q=0;q<2;q++)M.bTex[q]=pe(M.bw,M.bh),e.bindFramebuffer(e.FRAMEBUFFER,M.bFbo[q]),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,M.bTex[q],0);e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindRenderbuffer(e.RENDERBUFFER,null),e.activeTexture(e.TEXTURE0),X=M};let j=1,Q=1,ge=1,ke=0;const Ue=(r,g)=>{e.uniform1i(r.uKind,g.kind),e.uniform1f(r.uA,g.alpha),e.uniform1f(r.uRho,g.rho),e.uniform1f(r.uGam,g.gamma)},Me=()=>{e.bindVertexArray(J),e.drawArrays(e.TRIANGLES,0,3)};return{kind:"webgl2",software:h,resize(r,g,M){j=Math.max(1,Math.round(r*M)),Q=Math.max(1,Math.round(g*M)),t.width!==j&&(t.width=j),t.height!==Q&&(t.height=Q),(!X||X.w!==j||X.h!==Q)&&se(j,Q)},gpuMs:()=>ke,scale(r){ge=Math.min(1,Math.max(.5,r))},sync(){const r=new Uint8Array(4);e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,r)},draw(r){X||se(j,Q);const g=X,{look:M,cam:q}=r,Z=Math.max(1,Math.round(j*ge)),ce=Math.max(1,Math.round(Q*ge)),k=Z/Math.max(1,r.w),oe=Number.isFinite(r.reveal)?r.reveal:1e9,le=(ee,ue,ne)=>{const V=ot(q.vp,ee,ue,ne);return V[3]<=1e-6?null:[(V[0]/V[3]*.5+.5)*Z,(V[1]/V[3]*.5+.5)*ce]},ie=We(M,r.uref,r.rise,r.uref),[fe,me]=nt(r.summit[0],r.summit[1]),Te=le(fe,ie,me)??[Z*.7,ce*.7];e.bindFramebuffer(e.FRAMEBUFFER,g.sceneFbo),e.viewport(0,0,Z,ce),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,D),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.useProgram(d.prog);const G=d.u;Ue(G,r.p),e.uniform2f(G.uRes,Z,ce),e.uniformMatrix4fv(G.uInv,!1,q.inv),e.uniform3fv(G.uEye,q.eye),e.uniform1f(G.uFloor,M.floor),e.uniform1f(G.uDpr,k),e.uniform1f(G.uDist,q.dist),e.uniform1f(G.uUref,r.uref),e.uniform1f(G.uProbeU,r.probeU),e.uniform1f(G.uHi,r.hi),e.uniform2f(G.uPulse,r.pulse[0],r.pulse[1]),e.uniform1f(G.uReveal,oe),e.uniform2f(G.uMap,M.mapIn,M.mapOut),e.uniform2f(G.uGlowPx,Te[0],Te[1]),e.uniform2f(G.uSummit,r.summit[0],r.summit[1]),e.uniform3fv(G.uHaze0,U[0]),e.uniform3fv(G.uHaze1,U[1]),e.uniform3fv(G.uHaze2,U[2]),e.uniform3fv(G.uBg,o.bg),e.uniform3fv(G.uInk,o.ink),e.uniform3fv(G.uGold,o.gold),e.uniform1i(G.uLut,0),i.has("noground")||Me();const Ae=We(M,r.uref,r.rise,r.probeU);if(r.curveN>1&&r.hi>.01&&r.rise>.05&&!i.has("nocurtain")){let ee=0;const ue=[0];for(let z=1;z<r.curveN;z++)ee+=Math.hypot(r.curve[z*2]-r.curve[z*2-2],r.curve[z*2+1]-r.curve[z*2-1]),ue.push(ee);for(let z=0;z<r.curveN;z++){const Re=r.curve[z*2],c=r.curve[z*2+1],F=ee>0?ue[z]/ee:0,S=z*10;Y[S]=Re,Y[S+1]=M.floor,Y[S+2]=c,Y[S+3]=0,Y[S+4]=F,Y[S+5]=Re,Y[S+6]=Ae,Y[S+7]=c,Y[S+8]=1,Y[S+9]=F}e.bindBuffer(e.ARRAY_BUFFER,ve),e.bufferSubData(e.ARRAY_BUFFER,0,Y,0,r.curveN*10),e.useProgram(m.prog);const ne=m.u;e.uniformMatrix4fv(ne.uVP,!1,q.vp);const V=Fe(o,r.probeU/r.uref);e.uniform3f(ne.uCol,V[0]*.6+.4,V[1]*.6+.4,V[2]*.6+.4),e.uniform1f(ne.uA,r.hi*Math.min(1,r.rise*1.2)),e.uniform1f(ne.uTime,r.time),e.uniform2f(ne.uPulse,r.pulse[0],r.pulse[1]),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(de),e.drawArrays(e.TRIANGLE_STRIP,0,r.curveN*2)}e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.disable(e.BLEND),e.colorMask(!1,!1,!1,!1),e.useProgram(p.prog);const be=p.u;Ue(be,r.p),e.uniformMatrix4fv(be.uVP,!1,q.vp),e.uniform1f(be.uUref,r.uref),e.uniform1f(be.uRise,r.rise),e.uniform1f(be.uHs,M.hs),e.uniform1f(be.uKap,M.kap),e.uniform1f(be.uFloor,M.floor),e.bindVertexArray(I),e.drawElements(e.TRIANGLES,W,e.UNSIGNED_SHORT,0),e.colorMask(!0,!0,!0,!0),e.depthFunc(e.LEQUAL),e.depthMask(!1),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(s.prog);const H=s.u;Ue(H,r.p),e.uniformMatrix4fv(H.uVP,!1,q.vp),e.uniform3fv(H.uEye,q.eye),e.uniform1f(H.uDpr,k),e.uniform1f(H.uDist,q.dist),e.uniform1f(H.uUref,r.uref),e.uniform1f(H.uRise,r.rise),e.uniform1f(H.uHs,M.hs),e.uniform1f(H.uKap,M.kap),e.uniform1f(H.uFloor,M.floor),e.uniform1f(H.uProbeU,r.probeU),e.uniform1f(H.uHi,r.hi),e.uniform2f(H.uPulse,r.pulse[0],r.pulse[1]),e.uniform1f(H.uReveal,oe),e.uniform1f(H.uDetail,M.detail),e.uniform1f(H.uGlass,M.glass),e.uniform3fv(H.uBg,o.bg),e.uniform3fv(H.uInk,o.ink),e.uniform3fv(H.uGold,o.gold),e.uniform1i(H.uLut,0),i.has("nosurf")||e.drawElements(e.TRIANGLES,W,e.UNSIGNED_SHORT,0),e.depthMask(!0),e.disable(e.DEPTH_TEST),e.useProgram(R.prog);const C=R.u;if(e.uniform2f(C.uRes,Z,ce),e.bindVertexArray(J),r.rise>.3&&(e.blendFunc(e.ONE,e.ONE),e.uniform1i(C.uMode,2),e.uniform2f(C.uP0,Te[0],Te[1]),e.uniform1f(C.uHalf,60*k),e.uniform4f(C.uShape,16*k,0,0,0),e.uniform3f(C.uCol,o.gold[0],o.gold[1],o.gold[2]),e.uniform1f(C.uA,.22*Math.min(1,(r.rise-.3)/.5)),e.drawArrays(e.TRIANGLES,0,6)),r.hi>.01){const[ee,ue]=nt(r.probe[0],r.probe[1]),V=xt(r.probe[0],r.probe[1])?le(ee,We(M,r.uref,r.rise,r.probeU),ue):null,z=le(ee,M.floor,ue),Re=Fe(o,r.probeU/r.uref),c=[Re[0]*.3+.7,Re[1]*.3+.7,Re[2]*.3+.7];e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),V&&z&&r.rise>.2&&(e.uniform1i(C.uMode,1),e.uniform2f(C.uP0,V[0],V[1]),e.uniform2f(C.uP1,z[0],z[1]),e.uniform1f(C.uHalf,2*k),e.uniform1f(C.uLen,Math.hypot(z[0]-V[0],z[1]-V[1])),e.uniform4f(C.uShape,1*k,3*k,4*k,0),e.uniform3f(C.uCol,o.ink[0],o.ink[1],o.ink[2]),e.uniform1f(C.uA,.4*r.hi*Math.min(1,r.rise)),e.drawArrays(e.TRIANGLES,0,6)),e.uniform1i(C.uMode,0),z&&(e.uniform2f(C.uP0,z[0],z[1]),e.uniform1f(C.uHalf,14*k),e.uniform4f(C.uShape,4.5*k,1*k,1.5*k,5*k),e.uniform3f(C.uCol,c[0],c[1],c[2]),e.uniform3f(C.uCore,c[0],c[1],c[2]),e.uniform1f(C.uA,.65*r.hi),e.drawArrays(e.TRIANGLES,0,6)),V&&(e.uniform2f(C.uP0,V[0],V[1]),e.uniform1f(C.uHalf,22*k),e.uniform4f(C.uShape,7*k,1.1*k,2.6*k,9*k),e.uniform3f(C.uCol,o.ink[0],o.ink[1],o.ink[2]),e.uniform3f(C.uCore,1,1,1),e.uniform1f(C.uA,r.hi),e.drawArrays(e.TRIANGLES,0,6))}e.disable(e.BLEND);const Ce=M.bloom>0&&!i.has("nobloom"),De=Z/j,Se=ce/Q,Pe=Math.max(1,Math.round(g.bw*ge)),Le=Math.max(1,Math.round(g.bh*ge));if(e.activeTexture(e.TEXTURE1),Ce){e.viewport(0,0,Pe,Le),e.bindFramebuffer(e.FRAMEBUFFER,g.bFbo[0]),e.useProgram(b.prog),e.bindTexture(e.TEXTURE_2D,g.sceneTex),e.uniform1i(b.u.uTex,1),e.uniform2f(b.u.uTexel,1/j,1/Q),e.uniform2f(b.u.uScale,De,Se),e.uniform1f(b.u.uKnee,.1),Me(),e.useProgram(T.prog),e.uniform1i(T.u.uTex,1),e.uniform2f(T.u.uScale,Pe/g.bw,Le/g.bh),e.uniform2f(T.u.uTexel,1/g.bw,1/g.bh);for(const[ee,ue,ne,V]of[[0,1,1,0],[1,0,0,1],[0,1,2.2,0],[1,0,0,2.2]])e.bindFramebuffer(e.FRAMEBUFFER,g.bFbo[ue]),e.bindTexture(e.TEXTURE_2D,g.bTex[ee]),e.uniform2f(T.u.uDir,ne/g.bw,V/g.bh),Me()}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,j,Q),e.useProgram(v.prog),e.bindTexture(e.TEXTURE_2D,g.sceneTex),e.uniform1i(v.u.uScene,1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,g.bTex[0]),e.uniform1i(v.u.uBloom,2),e.uniform1f(v.u.uBloomK,Ce?M.bloom:0),e.uniform2f(v.u.uScale,De,Se),e.uniform2f(v.u.uLimS,De-.5/j,Se-.5/Q),e.uniform2f(v.u.uLimB,Pe/g.bw-.5/g.bw,Le/g.bh-.5/g.bh),Me(),e.activeTexture(e.TEXTURE0),e.bindVertexArray(null)},destroy(){xe(),e.deleteTexture(D),e.deleteBuffer(P),e.deleteBuffer(te),e.deleteBuffer(ve),e.deleteVertexArray(I),e.deleteVertexArray(de),e.deleteVertexArray(J),l.forEach(r=>e.deleteProgram(r)),u.forEach(r=>e.deleteShader(r))}}}const Jt=25.6,dt=.6;function vt(t,o){const n=Math.sqrt(t*o/(Jt*dt));return{s1:n,s2:dt*n}}function Zt(t,o){const n=t.getContext("2d",{alpha:!1});if(!n)return null;const a=6;let i=0,e=0,u=1,l=0,f=0,d=new Float64Array(0);const s=24,p=[];for(let v=0;v<s;v++)p.push(_e(Fe(o,v/(s-1))));const m=Array.from({length:s*2},()=>[]),R=[];function b(v,h,A,U,D,B,N,L){const x=(U>L?8:0)|(D>L?4:0)|(B>L?2:0)|(N>L?1:0);if(x===0||x===15)return;const E=()=>[h+a*((L-U)/(D-U)),A],w=()=>[h+a,A+a*((L-D)/(B-D))],y=()=>[h+a*((L-N)/(B-N)),A+a],_=()=>[h,A+a*((L-U)/(N-U))],I=(P,te)=>v.push(P[0],P[1],te[0],te[1]);switch(x){case 1:case 14:I(_(),y());break;case 2:case 13:I(y(),w());break;case 3:case 12:I(_(),w());break;case 4:case 11:I(E(),w());break;case 6:case 9:I(E(),y());break;case 7:case 8:I(_(),E());break;case 5:case 10:{const P=(U+D+B+N)/4>L;x===5===P?(I(_(),E()),I(y(),w())):(I(E(),w()),I(_(),y()));break}}}const T=v=>{n.beginPath();for(let h=0;h<v.length;h+=4)n.moveTo(v[h],v[h+1]),n.lineTo(v[h+2],v[h+3]);n.stroke()};return{kind:"canvas2d",software:!0,resize(v,h,A){i=v,e=h,u=A,t.width=Math.max(1,Math.round(i*u)),t.height=Math.max(1,Math.round(e*u)),l=Math.ceil(i/a)+1,f=Math.ceil(e/a)+1,d=new Float64Array(l*f)},pick2d(v,h){const{s1:A,s2:U}=vt(i,e);return{x1:Math.max(.001,v/A),x2:Math.max(.001,(e-h)/U),on:"floor"}},draw(v){const{s1:h,s2:A}=vt(i,e);n.setTransform(u,0,0,u,0,0),n.globalAlpha=1,n.fillStyle=_e(o.bg),n.fillRect(0,0,i,e);const U=ye(v.p,.04*(i/h),.04*(e/A)),D=ye(v.p,.96*(i/h),.96*(e/A)),B=n.createRadialGradient(i,0,0,i,0,Math.max(i,e)*.8);B.addColorStop(0,_e(Fe(o,.7),.04)),B.addColorStop(1,_e(Fe(o,.7),0)),n.fillStyle=B,n.fillRect(0,0,i,e);for(let x=0;x<f;x++){const E=Math.max(1e-5,(e-x*a)/A);for(let w=0;w<l;w++)d[x*l+w]=ye(v.p,Math.max(1e-5,w*a/h),E)}for(const x of m)x.length=0;R.length=0;const N=1/Math.max(1e-6,D-U),L=Number.isFinite(v.reveal)?v.reveal:1/0;for(let x=0;x<f-1;x++)for(let E=0;E<l-1;E++){const w=d[x*l+E],y=d[x*l+E+1],_=d[(x+1)*l+E+1],I=d[(x+1)*l+E],P=Math.min(w,y,_,I),te=Math.max(w,y,_,I),W=Math.ceil(P/Xe),Y=Math.floor(Math.min(te,L)/Xe),de=E*a,ve=x*a;if(Y>=W){const J=Math.floor(te/Xe)-W+1,X=a/J>=5,pe=a*tt/J>=5;for(let xe=Math.max(1,W);xe<=Y;xe++){const se=xe%tt===0;if(se?!pe:!X)continue;const j=xe*Xe,Q=Math.min(1,Math.max(0,(j-U)*N)),ge=Math.round(Q*(s-1))*2+(se?1:0);b(m[ge],de,ve,w,y,_,I,j)}}v.hi>0&&P<=v.probeU&&te>=v.probeU&&b(R,de,ve,w,y,_,I,v.probeU)}n.lineCap="round";for(let x=0;x<m.length;x++){const E=m[x];if(!E.length)continue;const w=x%2===1;n.strokeStyle=p[x>>1],n.globalAlpha=w?.6:.26,n.lineWidth=w?1.4:.8,T(E)}if(v.hi>0){const x=Fe(o,(v.probeU-U)*N),E=[x[0]*.5+.5,x[1]*.5+.5,x[2]*.5+.5];n.strokeStyle=_e(E),n.globalAlpha=.14*v.hi,n.lineWidth=7,T(R),n.globalAlpha=.95*v.hi,n.lineWidth=1.5,T(R);const w=v.probe[0]*h,y=e-v.probe[1]*A;n.globalAlpha=.85*v.hi,n.strokeStyle=_e(o.ink),n.lineWidth=1.1,n.beginPath(),n.arc(w,y,6.5,0,Math.PI*2),n.stroke(),n.globalAlpha=v.hi,n.fillStyle="#fff",n.beginPath(),n.arc(w,y,2.6,0,Math.PI*2),n.fill()}n.globalAlpha=1},destroy(){}}}function pt(t,o){const n=getComputedStyle(t).getPropertyValue(o).trim();if(!n||n==="none")return null;const a=n.split(/[\s,]+/).map(Number);return a.length>=2&&a.slice(0,2).every(i=>Number.isFinite(i))?a:null}function et(t){const o=O*(.66+.16*Math.sin(t*.13+.4)+.04*Math.sin(t*.31+2)),n=Math.PI/4+.36*Math.sin(t*.1+1.9)+.08*Math.sin(t*.27+.7);return[o*Math.cos(n),o*Math.sin(n)]}function eo(t){const o=t.querySelector("canvas[data-hf-main]")??t.querySelector("canvas");if(!o)return null;const n=t.parentElement??t,a=null,i=null,e=2,u=!1,l=c=>c,f=Lt(t),d=matchMedia("(max-width: 640px)");let s=null;const p=new Set("".split(",").filter(Boolean)),m=navigator.webdriver===!0;if(s=Qt(o,f,m,d.matches?72:128,p),s&&s.software&&i!=="gl"&&!m&&(s.destroy(),s=null),!s){let c=o;{const F=o.cloneNode(!1);o.replaceWith(F),c=F}s=Zt(c,f)}if(!s)return null;t.dataset.renderer=s.kind;const R=s.software&&i!=="gl",b=t.querySelector("canvas[data-hf-main]")??t.querySelector("canvas"),T=matchMedia("(prefers-reduced-motion: reduce)"),v=matchMedia("(hover: none)");let h=T.matches||i==="static"||u,A=0,U=0,D=R?Math.max(.6,1/Math.min(window.devicePixelRatio||1,1.5)):1,B=0;const N=Number(a?.get("rs"));N>=.5&&N<=1&&(D=N,p.add("fixq"));let L=1,x=l(ft(1440,900,null,null)),E=e,w=h||m?99:0,y=0,_=0,I=!0,P=document.visibilityState!=="hidden",te=!1,W=null,Y=-1e9,de=0,ve=0,J=et(e),X="auto",pe=null,xe=0,se=0,j="";const Q=new Float32Array(Ge*2),ge=()=>{x=l(ft(A,U,pt(t,"--field-probe"),pt(t,"--field-anchor")))},ke=()=>{const c=t.getBoundingClientRect();A=Math.max(1,c.width),U=Math.max(1,c.height);const F=Math.min(window.devicePixelRatio||1,1.5);L=s.scale?F:F*D,s.resize(A,U,L),s.scale?.(D),ge()},Ue=()=>{s.scale?s.scale(D):ke()},Me=()=>{const c=Math.min(1,w/_t),F=Math.min(1,Math.max(0,(w-ct)/lt)),S=K=>K<.5?4*K*K*K:1-Math.pow(-2*K+2,3)/2;return{map:1-Math.pow(1-c,3),rise:S(F),done:F>=1&&c>=1}},r=()=>{const c=x.az+(h?0:x.swAz*Math.sin(E*2*Math.PI/96))+de,F=x.el+(h?0:x.swEl*Math.sin(E*2*Math.PI/67+1.1))+ve;return Nt(A,U,x,c,F)},g=(c,F,S,K)=>W?s.kind==="webgl2"?mt(c,x,F,S,K,W.nx,-W.ny):s.pick2d?.((W.nx+1)/2*A,(W.ny+1)/2*U)??null:null,M=4.6,q=c=>{if(h||c<2)return[0,0];const F=E%M/M,S=F*F*(3-2*F);return[rt+(gt-rt)*S,Math.sin(Math.PI*F)]},Z=(c,F,S,K)=>{const $=Me(),he=S.u,Ee=Math.max(.001,J[0]),re=Math.max(.001,J[1]),ae=ye(c,Ee,re),Be=Rt(c,Ee,re),Ie=s.kind==="webgl2"&&ae<he?Gt(c,ae,Q):0,we=$.done?1/0:$.map*he*2.6,Oe=$.done?1:Math.min(1,Math.max(0,(w-ct-lt*.7)/.6));return ce(c,Ee,re,ae,Be,K),{w:A,h:U,dpr:L,look:x,cam:F,p:c,uref:he,summit:[S.x1,S.x2],rise:$.rise,reveal:we,probe:[Ee,re],probeU:ae,hi:se*Oe,curve:Q,curveN:Ie,pulse:q(Ie),time:E}};function ce(c,F,S,K,$,he){const Ee={x1:F,x2:S,u:K,mrs:$,family:yt(c),alpha:c.alpha,rho:c.rho,sigma:Tt(c),gamma:c.gamma,source:he},re=`${F.toFixed(2)}|${S.toFixed(2)}|${K.toFixed(2)}|${$.toPrecision(3)}|${Ee.family}|${c.alpha.toFixed(2)}|${c.rho.toFixed(2)}|${c.gamma.toFixed(2)}|${he}`;re!==j&&(j=re,t.dispatchEvent(new CustomEvent("fe:field-probe",{detail:Ee,bubbles:!0})))}const k=()=>{te=!1;const c=Ke(h?e:E),F=qe(c),S=F.u,K=r();se=1;const $=g(K,c,S,Me().rise);J=$?[$.x1,$.x2]:pe??et(h?e:E),s.draw(Z(c,K,F,$?"pointer":h?"static":"auto"))},oe=()=>{te||(te=!0,requestAnimationFrame(k))},le=[];let ie=24;const fe=()=>R?32:performance.now()-Y<1600?15:31,me=c=>{if(_=0,!Te())return;const F=fe();if(y&&c-y<F){_=requestAnimationFrame(me);return}const S=y?Math.min(.05,(c-y)/1e3):1/60;if(y&&(le.push((c-y)/(F+2)),le.length>=ie)){const ut=le.reduce((Et,Mt)=>Et+Mt,0)/le.length;le.length=0,ie=45,p.has("fixq")?B=0:ut>1.3&&D>.6?(D=Math.max(.6,D*.85),B=0,Ue()):ut<1.06&&D<1&&!R?++B>=3&&(D=Math.min(1,D/.85),B=0,Ue()):B=0}y=c,E+=S,w+=S;const K=performance.now();X==="pinned"&&K>xe&&(X="auto",pe=null);const $=1-Math.exp(-S/.9),he=W&&X==="pointer"?-W.nx*6:0,Ee=W&&X==="pointer"?-W.ny*4:0;de+=(he-de)*$,ve+=(Ee-ve)*$;const re=Ke(E),ae=qe(re),Be=ae.u,Ie=r(),we=X==="pointer"?g(Ie,re,Be,Me().rise):null,Oe=we?[we.x1,we.x2]:X==="pinned"&&pe?pe:et(E),bt=we?.06:X==="pinned"?.25:.9,it=1-Math.exp(-S/bt);J=[J[0]+(Oe[0]-J[0])*it,J[1]+(Oe[1]-J[1])*it],se+=(1-se)*(1-Math.exp(-S/.4)),s.draw(Z(re,Ie,ae,we?"pointer":"auto")),_=requestAnimationFrame(me)},Te=()=>!h&&I&&P,G=()=>{if(h){oe();return}!_&&Te()&&(y=0,_=requestAnimationFrame(me))},Ae=()=>{_&&cancelAnimationFrame(_),_=0},be=c=>{const F=t.getBoundingClientRect(),S=Math.min(F.width,Math.max(0,c.clientX-F.left)),K=Math.min(F.height,Math.max(0,c.clientY-F.top));return{nx:S/Math.max(1,F.width)*2-1,ny:K/Math.max(1,F.height)*2-1}};let H=null;const C=c=>{c.pointerType==="touch"||v.matches&&c.pointerType!=="mouse"||(X="pointer",W=be(c),Y=performance.now(),h&&oe())},Ce=c=>{c.pointerType!=="touch"&&(X==="pointer"&&(X="auto"),W=null,h&&oe())},De=c=>{c.pointerType==="touch"&&(H={x:c.clientX,y:c.clientY,t:performance.now()})},Se=c=>{if(c.pointerType!=="touch"||!H)return;const F=Math.hypot(c.clientX-H.x,c.clientY-H.y),S=performance.now()-H.t<450;H=null;const K=c.target;if(!S||F>12||K&&K.closest('a, button, input, label, [role="button"]'))return;const $=be(c),he=Ke(h?e:E),re=qe(he).u;let ae=null;if(s.kind==="webgl2"){const Be=r();ae=mt(Be,x,he,re,Me().rise,$.nx,-$.ny)}else ae=s.pick2d?.(($.nx+1)/2*A,($.ny+1)/2*U)??null;ae&&(X="pinned",pe=[ae.x1,ae.x2],xe=performance.now()+6e3,Y=performance.now(),h&&oe())};n.addEventListener("pointermove",C,{passive:!0}),n.addEventListener("pointerleave",Ce,{passive:!0}),n.addEventListener("pointerdown",De,{passive:!0}),n.addEventListener("pointerup",Se,{passive:!0});const Pe=new ResizeObserver(()=>{ke(),(h||!_)&&oe()});Pe.observe(t);const Le=new IntersectionObserver(c=>{I=c[c.length-1].isIntersecting,I?G():Ae()});Le.observe(t);const ee=()=>{P=document.visibilityState!=="hidden",P?G():Ae()};document.addEventListener("visibilitychange",ee);const ue=()=>{h=T.matches||i==="static"||u,h?(Ae(),w=99,oe()):G()};T.addEventListener("change",ue);const ne=c=>{c.preventDefault(),Ae()},V=()=>{Re.destroy(),delete t.dataset.renderer,eo(t)};b.addEventListener("webglcontextlost",ne),b.addEventListener("webglcontextrestored",V);const z=()=>{ge(),h&&oe()};if(t.addEventListener("fe:field-config",z),ke(),h)se=1,k();else{const c=Ke(E);s.draw(Z(c,r(),qe(c),"auto")),G()}t.classList.add("is-live");const Re={renderer:s.kind,destroy(){Ae(),Pe.disconnect(),Le.disconnect(),document.removeEventListener("visibilitychange",ee),T.removeEventListener("change",ue),n.removeEventListener("pointermove",C),n.removeEventListener("pointerleave",Ce),n.removeEventListener("pointerdown",De),n.removeEventListener("pointerup",Se),b.removeEventListener("webglcontextlost",ne),b.removeEventListener("webglcontextrestored",V),t.removeEventListener("fe:field-config",z),s?.destroy()}};return Re}export{yt as familyOf,eo as initHeroField,Rt as mrs,Ke as paramsAt,Tt as sigmaOf,ye as utility};
