(()=>{var ce=(i,t,e)=>()=>{if(e)throw e[0];try{return i&&(t=i(i=0)),t}catch(n){throw e=[n],n}};var ed=(i,t)=>()=>{try{return t||i((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};function nd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function id(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function cu(){let i=ar("canvas");return i.style.display="block",i}function ec(...i){let t="THREE."+i.shift();Ss?Ss("log",t,...i):console.log(t,...i)}function hu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function It(...i){i=hu(i);let t="THREE."+i.shift();if(Ss)Ss("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Dt(...i){i=hu(i);let t="THREE."+i.shift();if(Ss)Ss("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Gi(...i){let t=i.join(" ");t in eh||(eh[t]=!0,It(...i))}function uu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Ds(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ke[i&255]+Ke[i>>8&255]+Ke[i>>16&255]+Ke[i>>24&255]+"-"+Ke[t&255]+Ke[t>>8&255]+"-"+Ke[t>>16&15|64]+Ke[t>>24&255]+"-"+Ke[e&63|128]+Ke[e>>8&255]+"-"+Ke[e>>16&255]+Ke[e>>24&255]+Ke[n&255]+Ke[n>>8&255]+Ke[n>>16&255]+Ke[n>>24&255]).toLowerCase()}function Jt(i,t,e){return Math.max(t,Math.min(e,i))}function nc(i,t){return(i%t+t)%t}function sd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function rd(i,t,e){return i!==t?(e-i)/(t-i):0}function er(i,t,e){return(1-e)*i+e*t}function ad(i,t,e,n){return er(i,t,1-Math.exp(-e*n))}function od(i,t=1){return t-Math.abs(nc(i,t*2)-t)}function ld(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function cd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function hd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ud(i,t){return i+Math.random()*(t-i)}function fd(i){return i*(.5-Math.random())}function dd(i){i!==void 0&&(nh=i);let t=nh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function pd(i){return i*tr}function md(i){return i*bs}function gd(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function xd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function vd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function _d(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),p=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*h,o*c);break;default:It("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function _s(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function sn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function yd(){let i={enabled:!0,workingColorSpace:ir,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ne&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ne&&(s.r=ys(s.r),s.g=ys(s.g),s.b=ys(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===hi?sr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Gi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Gi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ir]:{primaries:t,whitePoint:n,transfer:sr,toXYZ:sh,fromXYZ:rh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:rn},outputColorSpaceConfig:{drawingBufferColorSpace:rn}},[rn]:{primaries:t,whitePoint:n,transfer:ne,toXYZ:sh,fromXYZ:rh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:rn}}}),i}function si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ys(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}function pl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ia.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(It("Texture: Unable to serialize Texture."),{})}function xl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}function El(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ki.fromArray(i,r);let o=s.x*Math.abs(ki.x)+s.y*Math.abs(ki.y)+s.z*Math.abs(ki.z),l=t.dot(ki),c=e.dot(ki),h=n.dot(ki);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}function Fd(i,t,e,n,s,r,a,o){let l;if(t.side===Ye?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Ii,o),l===null)return null;la.copy(o),la.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(la);return c<e.near||c>e.far?null:{distance:c,point:la.clone(),object:i}}function ca(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,sa),i.getVertexPosition(l,ra),i.getVertexPosition(c,aa);let h=Fd(i,t,e,n,sa,ra,aa,gh);if(h){let d=new I;Ei.getBarycoord(gh,sa,ra,aa,d),s&&(h.uv=Ei.getInterpolatedAttribute(s,o,l,c,d,new Ct)),r&&(h.uv1=Ei.getInterpolatedAttribute(r,o,l,c,d,new Ct)),a&&(h.normal=Ei.getInterpolatedAttribute(a,o,l,c,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new I,materialIndex:0};Ei.getNormal(sa,ra,aa,u.normal),h.face=u,h.barycoord=d}return h}function da(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if(Na.fromBufferAttribute(o,s),Da.fromBufferAttribute(o,r),e.distanceSqToSegment(Na,Da,Pl,yh)>n)return;Pl.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Pl);if(!(c<t.near||c>t.far))return{distance:c,point:yh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}function wh(i,t,e,n,s,r,a){let o=Bl.distanceSqToPoint(i);if(o<e){let l=new I;Bl.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}function ji(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Eh(s))s.isRenderTargetTexture?(It("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Eh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function en(i){let t={};for(let e=0;e<i.length;e++){let n=ji(i[e]);for(let s in n)t[s]=n[s]}return t}function Eh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function zd(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ic(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}function gs(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Ll(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function pu(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Vd(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Gd(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=pu(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Vd(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}function Th(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}function Wd(){this._document.hidden===!1&&this.reset()}function ac(i,t,e,n){let s=jd(n);switch(e){case Kl:return i*t;case Qi:return i*t/s.components*s.byteLength;case ao:return i*t/s.components*s.byteLength;case Di:return i*t*2/s.components*s.byteLength;case oo:return i*t*2/s.components*s.byteLength;case Ql:return i*t*3/s.components*s.byteLength;case ln:return i*t*4/s.components*s.byteLength;case lo:return i*t*4/s.components*s.byteLength;case Cr:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Pr:case Lr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ho:case fo:return Math.max(i,16)*Math.max(t,8)/4;case co:case uo:return Math.max(i,8)*Math.max(t,8)/2;case po:case mo:case xo:case vo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case go:case Nr:case _o:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case yo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Mo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case So:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case bo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case wo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case To:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ao:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ro:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Co:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Io:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Po:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Lo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case No:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Do:case Uo:case Fo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Bo:case Oo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Dr:case zo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function jd(i){switch(i){case on:case Yl:return{byteLength:1,components:1};case Ps:case Zl:case Te:return{byteLength:2,components:1};case so:case ro:return{byteLength:2,components:4};case zn:case io:case mn:return{byteLength:4,components:1};case $l:case Jl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}var Ch,kl,Ih,yr,Ph,Cs,Ii,Ye,tn,Rn,Is,ci,Hl,Vl,Lh,$i,Nh,Dh,Uh,Fh,Bh,Oh,zh,kh,Gl,Wl,Hh,Vh,Gh,Wh,Xh,qh,Yh,Zh,$h,ya,Ma,Sa,Ms,ba,wa,Ea,Ta,Xl,Jh,Kh,On,Mr,Sr,br,Ji,wr,Er,Tr,ql,Pi,Ki,to,eo,Ar,Aa,wn,Ra,Ee,Qh,Rr,Ue,no,Li,on,Yl,Zl,Ps,io,zn,mn,Te,so,ro,Ls,$l,Jl,Kl,Ql,ln,Yn,Ni,Qi,ao,Di,oo,lo,Cr,Ir,Pr,Lr,co,ho,uo,fo,po,mo,go,xo,vo,Nr,_o,yo,Mo,So,bo,wo,Eo,To,Ao,Ro,Co,Io,Po,Lo,No,Do,Uo,Fo,Bo,Oo,Dr,zo,nr,Ca,va,Nl,Dl,Ul,Fl,jh,jl,tu,hi,rn,ir,sr,ne,_a,eu,nu,iu,su,ko,ru,au,Ho,ou,lu,Ns,tc,Bn,rr,eh,Ss,fu,Zn,Ke,nh,tr,bs,ze,oc,Ct,Ce,lc,I,fl,ih,cc,Bt,dl,sh,rh,qt,rs,Ia,Md,ws,Sd,ml,dn,hc,_e,Pa,Me,or,La,ja,jt,as,Nn,bd,wd,yi,Zr,gn,ah,oh,En,lr,Ed,lh,os,jn,$r,Ys,Td,Ad,ch,hh,uh,fh,Rd,ls,gl,pn,Oe,Cd,Es,du,Mi,Jr,Pt,Qe,Wi,Dn,ti,vl,ei,cs,hs,dh,_l,yl,Ml,Sl,bl,wl,Ei,Tn,ni,Un,Kr,us,fs,ds,Si,bi,zi,Zs,Qr,jr,ki,De,ta,Id,de,cr,hr,zt,Pd,$s,Tl,he,Ld,bn,Al,ps,xn,Js,We,ie,Rl,Nd,Dd,Fn,Ud,ri,ii,Cl,ea,na,Ts,Xi,ph,Hi,ia,mh,sa,ra,aa,Il,oa,gh,la,ue,ai,be,ms,xh,ha,vh,Bd,Ks,Qs,vn,Vi,Od,ua,ur,As,Na,Da,_h,js,fa,Pl,yh,Ua,Mh,Sh,fr,Fa,bh,Bl,pa,ma,dr,pr,Ti,Ba,mr,An,qi,gr,Oa,xr,oi,Yi,ui,kd,Hd,Ft,Rs,za,ka,Ai,Ha,Va,Ga,Wa,_n,Ri,Xa,qa,Ya,vr,Ci,Za,$a,mu,Ja,ga,xa,qn,_r,wi,Ah,Rh,je,li,an,xs,vs,Ka,Qa,Zi,sc,Xd,rc,qd,Yd,Zd,$d,Jd,Kd,Qd,Ol,ve,Fv,uc,zl,fc=ce(()=>{Ch=0,kl=1,Ih=2,yr=1,Ph=2,Cs=3,Ii=0,Ye=1,tn=2,Rn=0,Is=1,ci=2,Hl=3,Vl=4,Lh=5,$i=100,Nh=101,Dh=102,Uh=103,Fh=104,Bh=200,Oh=201,zh=202,kh=203,Gl=204,Wl=205,Hh=206,Vh=207,Gh=208,Wh=209,Xh=210,qh=211,Yh=212,Zh=213,$h=214,ya=0,Ma=1,Sa=2,Ms=3,ba=4,wa=5,Ea=6,Ta=7,Xl=0,Jh=1,Kh=2,On=0,Mr=1,Sr=2,br=3,Ji=4,wr=5,Er=6,Tr=7,ql=300,Pi=301,Ki=302,to=303,eo=304,Ar=306,Aa=1e3,wn=1001,Ra=1002,Ee=1003,Qh=1004,Rr=1005,Ue=1006,no=1007,Li=1008,on=1009,Yl=1010,Zl=1011,Ps=1012,io=1013,zn=1014,mn=1015,Te=1016,so=1017,ro=1018,Ls=1020,$l=35902,Jl=35899,Kl=1021,Ql=1022,ln=1023,Yn=1026,Ni=1027,Qi=1028,ao=1029,Di=1030,oo=1031,lo=1033,Cr=33776,Ir=33777,Pr=33778,Lr=33779,co=35840,ho=35841,uo=35842,fo=35843,po=36196,mo=37492,go=37496,xo=37488,vo=37489,Nr=37490,_o=37491,yo=37808,Mo=37809,So=37810,bo=37811,wo=37812,Eo=37813,To=37814,Ao=37815,Ro=37816,Co=37817,Io=37818,Po=37819,Lo=37820,No=37821,Do=36492,Uo=36494,Fo=36495,Bo=36283,Oo=36284,Dr=36285,zo=36286,nr=2300,Ca=2301,va=2302,Nl=2303,Dl=2400,Ul=2401,Fl=2402,jh=3200,jl=0,tu=1,hi="",rn="srgb",ir="srgb-linear",sr="linear",ne="srgb",_a=7680,eu=519,nu=512,iu=513,su=514,ko=515,ru=516,au=517,Ho=518,ou=519,lu=35044,Ns=35048,tc="300 es",Bn=2e3,rr=2001;eh={},Ss=null;fu={[ya]:Ma,[Sa]:Ea,[ba]:Ta,[Ms]:wa,[Ma]:ya,[Ea]:Sa,[Ta]:ba,[wa]:Ms},Zn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],nh=1234567,tr=Math.PI/180,bs=180/Math.PI;ze={DEG2RAD:tr,RAD2DEG:bs,generateUUID:Ds,clamp:Jt,euclideanModulo:nc,mapLinear:sd,inverseLerp:rd,lerp:er,damp:ad,pingpong:od,smoothstep:ld,smootherstep:cd,randInt:hd,randFloat:ud,randFloatSpread:fd,seededRandom:dd,degToRad:pd,radToDeg:md,isPowerOfTwo:gd,ceilPowerOfTwo:xd,floorPowerOfTwo:vd,setQuaternionFromProperEuler:_d,normalize:sn,denormalize:_s},oc=class oc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};oc.prototype.isVector2=!0;Ct=oc,Ce=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(d!==_||l!==u||c!==p||h!==g){let m=l*u+c*p+h*g+d*_;m<0&&(u=-u,p=-p,g=-g,_=-_,m=-m);let f=1-o;if(m<.9995){let M=Math.acos(m),E=Math.sin(M);f=Math.sin(f*M)/E,o=Math.sin(o*M)/E,l=l*f+u*o,c=c*f+p*o,h=h*f+g*o,d=d*f+_*o}else{l=l*f+u*o,c=c*f+p*o,h=h*f+g*o,d=d*f+_*o;let M=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=M,c*=M,h*=M,d*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*p-c*u,t[e+1]=l*g+h*u+c*d-o*p,t[e+2]=c*g+h*p+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:It("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>d){let p=2*Math.sqrt(1+n-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-n-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Jt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},lc=class lc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ih.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ih.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return fl.copy(this).projectOnVector(t),this.sub(fl)}reflect(t){return this.sub(fl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};lc.prototype.isVector3=!0;I=lc,fl=new I,ih=new Ce,cc=class cc{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],M=s[1],E=s[4],v=s[7],S=s[2],b=s[5],A=s[8];return r[0]=a*_+o*M+l*S,r[3]=a*m+o*E+l*b,r[6]=a*f+o*v+l*A,r[1]=c*_+h*M+d*S,r[4]=c*m+h*E+d*b,r[7]=c*f+h*v+d*A,r[2]=u*_+p*M+g*S,r[5]=u*m+p*E+g*b,r[8]=u*f+p*v+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,p=c*r-a*l,g=e*d+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Gi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(dl.makeScale(t,e)),this}rotate(t){return Gi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(dl.makeRotation(-t)),this}translate(t,e){return Gi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(dl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};cc.prototype.isMatrix3=!0;Bt=cc,dl=new Bt,sh=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rh=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt=yd();Ia=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{rs===void 0&&(rs=ar("canvas")),rs.width=t.width,rs.height=t.height;let s=rs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=rs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ar("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=si(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(si(e[n]/255)*255):e[n]=si(e[n]);return{data:e,width:t.width,height:t.height}}else return It("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Md=0,ws=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=Ds(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(pl(s[a].image)):r.push(pl(s[a]))}else r=pl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};Sd=0,ml=new I,dn=class i extends Zn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=wn,s=wn,r=Ue,a=Li,o=ln,l=on,c=i.DEFAULT_ANISOTROPY,h=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=Ds(),this.name="",this.source=new ws(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ml).x}get height(){return this.source.getSize(ml).y}get depth(){return this.source.getSize(ml).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){It(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ql)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Aa:t.x=t.x-Math.floor(t.x);break;case wn:t.x=t.x<0?0:1;break;case Ra:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Aa:t.y=t.y-Math.floor(t.y);break;case wn:t.y=t.y<0?0:1;break;case Ra:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=ql;dn.DEFAULT_ANISOTROPY=1;hc=class hc{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,v=(p+1)/2,S=(f+1)/2,b=(h+u)/4,A=(d+_)/4,x=(g+m)/4;return E>v&&E>S?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=b/n,r=A/n):v>S?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=b/s,r=x/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=A/r,s=x/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-_)/M,this.z=(u-h)/M,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this.w=Jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this.w=Jt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};hc.prototype.isVector4=!0;_e=hc,Pa=class extends Zn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ue,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new dn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ue,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ws(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Me=class extends Pa{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},or=class extends dn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ee,this.minFilter=Ee,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},La=class extends dn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ee,this.minFilter=Ee,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}},ja=class ja{constructor(t,e,n,s,r,a,o,l,c,h,d,u,p,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,p,g,_,m)}set(t,e,n,s,r,a,o,l,c,h,d,u,p,g,_,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ja().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/as.setFromMatrixColumn(t,0).length(),r=1/as.setFromMatrixColumn(t,1).length(),a=1/as.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,p=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,p=l*d,g=c*h,_=c*d;e[0]=u+_*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,p=l*d,g=c*h,_=c*d;e[0]=u-_*o,e[4]=-a*d,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,p=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-p,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+p,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*d+g,e[10]=u-_*d}else if(t.order==="XZY"){let u=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=a*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bd,t,wd)}lookAt(t,e,n){let s=this.elements;return gn.subVectors(t,e),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),yi.crossVectors(n,gn),yi.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),yi.crossVectors(n,gn)),yi.normalize(),Zr.crossVectors(gn,yi),s[0]=yi.x,s[4]=Zr.x,s[8]=gn.x,s[1]=yi.y,s[5]=Zr.y,s[9]=gn.y,s[2]=yi.z,s[6]=Zr.z,s[10]=gn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],M=n[3],E=n[7],v=n[11],S=n[15],b=s[0],A=s[4],x=s[8],T=s[12],R=s[1],P=s[5],N=s[9],B=s[13],L=s[2],O=s[6],G=s[10],W=s[14],Q=s[3],Y=s[7],K=s[11],nt=s[15];return r[0]=a*b+o*R+l*L+c*Q,r[4]=a*A+o*P+l*O+c*Y,r[8]=a*x+o*N+l*G+c*K,r[12]=a*T+o*B+l*W+c*nt,r[1]=h*b+d*R+u*L+p*Q,r[5]=h*A+d*P+u*O+p*Y,r[9]=h*x+d*N+u*G+p*K,r[13]=h*T+d*B+u*W+p*nt,r[2]=g*b+_*R+m*L+f*Q,r[6]=g*A+_*P+m*O+f*Y,r[10]=g*x+_*N+m*G+f*K,r[14]=g*T+_*B+m*W+f*nt,r[3]=M*b+E*R+v*L+S*Q,r[7]=M*A+E*P+v*O+S*Y,r[11]=M*x+E*N+v*G+S*K,r[15]=M*T+E*B+v*W+S*nt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15],M=l*p-c*u,E=o*p-c*d,v=o*u-l*d,S=a*p-c*h,b=a*u-l*h,A=a*d-o*h;return e*(_*M-m*E+f*v)-n*(g*M-m*S+f*b)+s*(g*E-_*S+f*A)-r*(g*v-_*b+m*A)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],M=e*o-n*a,E=e*l-s*a,v=e*c-r*a,S=n*l-s*o,b=n*c-r*o,A=s*c-r*l,x=h*_-d*g,T=h*m-u*g,R=h*f-p*g,P=d*m-u*_,N=d*f-p*_,B=u*f-p*m,L=M*B-E*N+v*P+S*R-b*T+A*x;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/L;return t[0]=(o*B-l*N+c*P)*O,t[1]=(s*N-n*B-r*P)*O,t[2]=(_*A-m*b+f*S)*O,t[3]=(u*b-d*A-p*S)*O,t[4]=(l*R-a*B-c*T)*O,t[5]=(e*B-s*R+r*T)*O,t[6]=(m*v-g*A-f*E)*O,t[7]=(h*A-u*v+p*E)*O,t[8]=(a*N-o*R+c*x)*O,t[9]=(n*R-e*N-r*x)*O,t[10]=(g*b-_*v+f*M)*O,t[11]=(d*v-h*b-p*M)*O,t[12]=(o*T-a*P-l*x)*O,t[13]=(e*P-n*T+s*x)*O,t[14]=(_*E-g*S-m*M)*O,t[15]=(h*S-d*E+u*M)*O,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,p=r*h,g=r*d,_=a*h,m=a*d,f=o*d,M=l*c,E=l*h,v=l*d,S=n.x,b=n.y,A=n.z;return s[0]=(1-(_+f))*S,s[1]=(p+v)*S,s[2]=(g-E)*S,s[3]=0,s[4]=(p-v)*b,s[5]=(1-(u+f))*b,s[6]=(m+M)*b,s[7]=0,s[8]=(g+E)*A,s[9]=(m-M)*A,s[10]=(1-(u+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=as.set(s[0],s[1],s[2]).length(),o=as.set(s[4],s[5],s[6]).length(),l=as.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Nn.copy(this);let c=1/a,h=1/o,d=1/l;return Nn.elements[0]*=c,Nn.elements[1]*=c,Nn.elements[2]*=c,Nn.elements[4]*=h,Nn.elements[5]*=h,Nn.elements[6]*=h,Nn.elements[8]*=d,Nn.elements[9]*=d,Nn.elements[10]*=d,e.setFromRotationMatrix(Nn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=Bn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s),g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===Bn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===rr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Bn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),p=-(n+s)/(n-s),g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===Bn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===rr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};ja.prototype.isMatrix4=!0;jt=ja,as=new I,Nn=new jt,bd=new I(0,0,0),wd=new I(1,1,1),yi=new I,Zr=new I,gn=new I,ah=new jt,oh=new Ce,En=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Jt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:It("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ah.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ah,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return oh.setFromEuler(this),this.setFromQuaternion(oh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};En.DEFAULT_ORDER="XYZ";lr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Ed=0,lh=new I,os=new Ce,jn=new jt,$r=new I,Ys=new I,Td=new I,Ad=new Ce,ch=new I(1,0,0),hh=new I(0,1,0),uh=new I(0,0,1),fh={type:"added"},Rd={type:"removed"},ls={type:"childadded",child:null},gl={type:"childremoved",child:null},pn=class i extends Zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=Ds(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new I,e=new En,n=new Ce,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new jt},normalMatrix:{value:new Bt}}),this.matrix=new jt,this.matrixWorld=new jt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.multiply(os),this}rotateOnWorldAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.premultiply(os),this}rotateX(t){return this.rotateOnAxis(ch,t)}rotateY(t){return this.rotateOnAxis(hh,t)}rotateZ(t){return this.rotateOnAxis(uh,t)}translateOnAxis(t,e){return lh.copy(t).applyQuaternion(this.quaternion),this.position.add(lh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ch,t)}translateY(t){return this.translateOnAxis(hh,t)}translateZ(t){return this.translateOnAxis(uh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?$r.copy(t):$r.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt(Ys,$r,this.up):jn.lookAt($r,Ys,this.up),this.quaternion.setFromRotationMatrix(jn),s&&(jn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(jn),this.quaternion.premultiply(os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Dt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(fh),ls.child=t,this.dispatchEvent(ls),ls.child=null):Dt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rd),gl.child=t,this.dispatchEvent(gl),gl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),jn.multiply(t.parent.matrixWorld)),t.applyMatrix4(jn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(fh),ls.child=t,this.dispatchEvent(ls),ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,t,Td),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,Ad,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};pn.DEFAULT_UP=new I(0,1,0);pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Oe=class extends pn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Cd={type:"move"},Es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Cd)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Oe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},du={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},Jr={h:0,s:0,l:0};Pt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=rn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=nc(t,1),e=Jt(e,0,1),n=Jt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=xl(a,r,t+1/3),this.g=xl(a,r,t),this.b=xl(a,r,t-1/3)}return qt.colorSpaceToWorking(this,s),this}setStyle(t,e=rn){function n(r){r!==void 0&&parseFloat(r)<1&&It("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:It("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);It("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=rn){let n=du[t.toLowerCase()];return n!==void 0?this.setHex(n,e):It("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=si(t.r),this.g=si(t.g),this.b=si(t.b),this}copyLinearToSRGB(t){return this.r=ys(t.r),this.g=ys(t.g),this.b=ys(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=rn){return qt.workingToColorSpace(Qe.copy(this),t),Math.round(Jt(Qe.r*255,0,255))*65536+Math.round(Jt(Qe.g*255,0,255))*256+Math.round(Jt(Qe.b*255,0,255))}getHexString(t=rn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.workingToColorSpace(Qe.copy(this),e);let n=Qe.r,s=Qe.g,r=Qe.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.workingToColorSpace(Qe.copy(this),e),t.r=Qe.r,t.g=Qe.g,t.b=Qe.b,t}getStyle(t=rn){qt.workingToColorSpace(Qe.copy(this),t);let e=Qe.r,n=Qe.g,s=Qe.b;return t!==rn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Mi),this.setHSL(Mi.h+t,Mi.s+e,Mi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Mi),t.getHSL(Jr);let n=er(Mi.h,Jr.h,e),s=er(Mi.s,Jr.s,e),r=er(Mi.l,Jr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qe=new Pt;Pt.NAMES=du;Wi=class extends pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Dn=new I,ti=new I,vl=new I,ei=new I,cs=new I,hs=new I,dh=new I,_l=new I,yl=new I,Ml=new I,Sl=new _e,bl=new _e,wl=new _e,Ei=class i{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Dn.subVectors(t,e),s.cross(Dn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Dn.subVectors(s,e),ti.subVectors(n,e),vl.subVectors(t,e);let a=Dn.dot(Dn),o=Dn.dot(ti),l=Dn.dot(vl),c=ti.dot(ti),h=ti.dot(vl),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,p=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ei.x),l.addScaledVector(a,ei.y),l.addScaledVector(o,ei.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Sl.setScalar(0),bl.setScalar(0),wl.setScalar(0),Sl.fromBufferAttribute(t,e),bl.fromBufferAttribute(t,n),wl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Sl,r.x),a.addScaledVector(bl,r.y),a.addScaledVector(wl,r.z),a}static isFrontFacing(t,e,n,s){return Dn.subVectors(n,e),ti.subVectors(t,e),Dn.cross(ti).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Dn.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),Dn.cross(ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;cs.subVectors(s,n),hs.subVectors(r,n),_l.subVectors(t,n);let l=cs.dot(_l),c=hs.dot(_l);if(l<=0&&c<=0)return e.copy(n);yl.subVectors(t,s);let h=cs.dot(yl),d=hs.dot(yl);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(cs,a);Ml.subVectors(t,r);let p=cs.dot(Ml),g=hs.dot(Ml);if(g>=0&&p<=g)return e.copy(r);let _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(hs,o);let m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return dh.subVectors(r,s),o=(d-h)/(d-h+(p-g)),e.copy(s).addScaledVector(dh,o);let f=1/(m+_+u);return a=_*f,o=u*f,e.copy(n).addScaledVector(cs,a).addScaledVector(hs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Tn=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Un):Un.fromBufferAttribute(r,a),Un.applyMatrix4(t.matrixWorld),this.expandByPoint(Un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Kr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Kr.copy(n.boundingBox)),Kr.applyMatrix4(t.matrixWorld),this.union(Kr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Un),Un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zs),Qr.subVectors(this.max,Zs),us.subVectors(t.a,Zs),fs.subVectors(t.b,Zs),ds.subVectors(t.c,Zs),Si.subVectors(fs,us),bi.subVectors(ds,fs),zi.subVectors(us,ds);let e=[0,-Si.z,Si.y,0,-bi.z,bi.y,0,-zi.z,zi.y,Si.z,0,-Si.x,bi.z,0,-bi.x,zi.z,0,-zi.x,-Si.y,Si.x,0,-bi.y,bi.x,0,-zi.y,zi.x,0];return!El(e,us,fs,ds,Qr)||(e=[1,0,0,0,1,0,0,0,1],!El(e,us,fs,ds,Qr))?!1:(jr.crossVectors(Si,bi),e=[jr.x,jr.y,jr.z],El(e,us,fs,ds,Qr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Un).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ni),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ni=[new I,new I,new I,new I,new I,new I,new I,new I],Un=new I,Kr=new Tn,us=new I,fs=new I,ds=new I,Si=new I,bi=new I,zi=new I,Zs=new I,Qr=new I,jr=new I,ki=new I;De=new I,ta=new Ct,Id=0,de=class extends Zn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Id++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=lu,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ta.fromBufferAttribute(this,e),ta.applyMatrix3(t),this.setXY(e,ta.x,ta.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix3(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=_s(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=sn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_s(e,this.array)),e}setX(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_s(e,this.array)),e}setY(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_s(e,this.array)),e}setZ(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_s(e,this.array)),e}setW(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),n=sn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),n=sn(n,this.array),s=sn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),n=sn(n,this.array),s=sn(s,this.array),r=sn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}},cr=class extends de{constructor(t,e,n){super(new Uint16Array(t),e,n)}},hr=class extends de{constructor(t,e,n){super(new Uint32Array(t),e,n)}},zt=class extends de{constructor(t,e,n){super(new Float32Array(t),e,n)}},Pd=new Tn,$s=new I,Tl=new I,he=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Pd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$s.subVectors(t,this.center);let e=$s.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector($s,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Tl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($s.copy(t.center).add(Tl)),this.expandByPoint($s.copy(t.center).sub(Tl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Ld=0,bn=new jt,Al=new pn,ps=new I,xn=new Tn,Js=new Tn,We=new I,ie=class i extends Zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ld++}),this.uuid=Ds(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nd(t)?hr:cr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,n){return bn.makeTranslation(t,e,n),this.applyMatrix4(bn),this}scale(t,e,n){return bn.makeScale(t,e,n),this.applyMatrix4(bn),this}lookAt(t){return Al.lookAt(t),Al.updateMatrix(),this.applyMatrix4(Al.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ps).negate(),this.translate(ps.x,ps.y,ps.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&It("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new he);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let n=this.boundingSphere.center;if(xn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Js.setFromBufferAttribute(o),this.morphTargetsRelative?(We.addVectors(xn.min,Js.min),xn.expandByPoint(We),We.addVectors(xn.max,Js.max),xn.expandByPoint(We)):(xn.expandByPoint(Js.min),xn.expandByPoint(Js.max))}xn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)We.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(We));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)We.fromBufferAttribute(o,c),l&&(ps.fromBufferAttribute(t,c),We.add(ps)),s=Math.max(s,n.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new de(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new I,l[x]=new I;let c=new I,h=new I,d=new I,u=new Ct,p=new Ct,g=new Ct,_=new I,m=new I;function f(x,T,R){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,R),u.fromBufferAttribute(r,x),p.fromBufferAttribute(r,T),g.fromBufferAttribute(r,R),h.sub(c),d.sub(c),p.sub(u),g.sub(u);let P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),o[x].add(_),o[T].add(_),o[R].add(_),l[x].add(m),l[T].add(m),l[R].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let x=0,T=M.length;x<T;++x){let R=M[x],P=R.start,N=R.count;for(let B=P,L=P+N;B<L;B+=3)f(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let E=new I,v=new I,S=new I,b=new I;function A(x){S.fromBufferAttribute(s,x),b.copy(S);let T=o[x];E.copy(T),E.sub(S.multiplyScalar(S.dot(T))).normalize(),v.crossVectors(b,T);let P=v.dot(l[x])<0?-1:1;a.setXYZW(x,E.x,E.y,E.z,P)}for(let x=0,T=M.length;x<T;++x){let R=M[x],P=R.start,N=R.count;for(let B=P,L=P+N;B<L;B+=3)A(t.getX(B+0)),A(t.getX(B+1)),A(t.getX(B+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new de(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,d=new I;if(t)for(let u=0,p=t.count;u<p;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new de(u,h,d)}if(this.index===null)return It("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],p=t(u,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Rl=new I,Nd=new I,Dd=new Bt,Fn=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Rl.subVectors(n,e).cross(Nd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Rl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Dd.getNormalMatrix(t),s=this.coplanarPoint(Rl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Ud=0,ri=class extends Zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=Ds(),this.name="",this.type="Material",this.blending=Is,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gl,this.blendDst=Wl,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=eu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_a,this.stencilZFail=_a,this.stencilZPass=_a,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){It(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Pt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Fn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ct().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ct().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},ii=new I,Cl=new I,ea=new I,na=new I,Ts=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ii)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ii.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ii.copy(this.origin).addScaledVector(this.direction,e),ii.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Cl.copy(t).add(e).multiplyScalar(.5),ea.copy(e).sub(t).normalize(),na.copy(this.origin).sub(Cl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ea),o=na.dot(this.direction),l=-na.dot(ea),c=na.lengthSq(),h=Math.abs(1-a*a),d,u,p,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let _=1/h;d*=_,u*=_,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Cl).addScaledVector(ea,u),p}intersectSphere(t,e){if(t.radius<0)return null;ii.subVectors(t.center,this.origin);let n=ii.dot(this.direction),s=ii.dot(ii)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ii)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,p=t.z-a.z,g=e.x-a.x,_=e.y-a.y,m=e.z-a.z,f=n.x-a.x,M=n.y-a.y,E=n.z-a.z,v=Math.abs(l),S=Math.abs(c),b=Math.abs(h),A,x,T,R,P,N,B,L,O,G,W,Q;if(v>=S&&v>=b?(T=l,N=d,O=g,Q=f,l>=0?(A=c,x=h,R=u,P=p,B=_,L=m,G=M,W=E):(A=h,x=c,R=p,P=u,B=m,L=_,G=E,W=M)):S>=b?(T=c,N=u,O=_,Q=M,c>=0?(A=h,x=l,R=p,P=d,B=m,L=g,G=E,W=f):(A=l,x=h,R=d,P=p,B=g,L=m,G=f,W=E)):(T=h,N=p,O=m,Q=E,h>=0?(A=l,x=c,R=d,P=u,B=g,L=_,G=f,W=M):(A=c,x=l,R=u,P=d,B=_,L=g,G=M,W=f)),T===0)return null;let Y=A/T,K=x/T,nt=1/T,vt=R-Y*N,_t=P-K*N,ae=B-Y*O,Wt=L-K*O,Kt=G-Y*Q,Z=W-K*Q,tt=Kt*Wt-Z*ae,yt=vt*Z-_t*Kt,Ot=ae*_t-Wt*vt;if(s){if(tt<0||yt<0||Ot<0)return null}else if((tt<0||yt<0||Ot<0)&&(tt>0||yt>0||Ot>0))return null;let gt=tt+yt+Ot;if(gt===0)return null;let Xt=nt*(tt*N+yt*O+Ot*Q);return(gt>0?Xt<0:Xt>0)?null:this.at(Xt/gt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xi=class extends ri{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Xl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ph=new jt,Hi=new Ts,ia=new he,mh=new I,sa=new I,ra=new I,aa=new I,Il=new I,oa=new I,gh=new I,la=new I,ue=class extends pn{constructor(t=new ie,e=new Xi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){oa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(Il.fromBufferAttribute(d,t),a?oa.addScaledVector(Il,h):oa.addScaledVector(Il.sub(e),h))}e.add(oa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ia.copy(n.boundingSphere),ia.applyMatrix4(r),Hi.copy(t.ray).recast(t.near),!(ia.containsPoint(Hi.origin)===!1&&(Hi.intersectSphere(ia,mh)===null||Hi.origin.distanceToSquared(mh)>(t.far-t.near)**2))&&(ph.copy(r).invert(),Hi.copy(t.ray).applyMatrix4(ph),!(n.boundingBox!==null&&Hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Hi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){let m=u[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=M,S=E;v<S;v+=3){let b=o.getX(v),A=o.getX(v+1),x=o.getX(v+2);s=ca(this,f,t,n,c,h,d,b,A,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let M=o.getX(m),E=o.getX(m+1),v=o.getX(m+2);s=ca(this,a,t,n,c,h,d,M,E,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){let m=u[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=M,S=E;v<S;v+=3){let b=v,A=v+1,x=v+2;s=ca(this,f,t,n,c,h,d,b,A,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let M=m,E=m+1,v=m+2;s=ca(this,a,t,n,c,h,d,M,E,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};ai=class extends dn{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ee,h=Ee,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},be=class extends de{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ms=new jt,xh=new jt,ha=[],vh=new Tn,Bd=new jt,Ks=new ue,Qs=new he,vn=class extends ue{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new be(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Bd)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Tn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ms),vh.copy(t.boundingBox).applyMatrix4(ms),this.boundingBox.union(vh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new he),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ms),Qs.copy(t.boundingSphere).applyMatrix4(ms),this.boundingSphere.union(Qs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Ks.geometry=this.geometry,Ks.material=this.material,Ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qs.copy(this.boundingSphere),Qs.applyMatrix4(n),t.ray.intersectsSphere(Qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ms),xh.multiplyMatrices(n,ms),Ks.matrixWorld=xh,Ks.raycast(t,ha);for(let a=0,o=ha.length;a<o;a++){let l=ha[a];l.instanceId=r,l.object=this,e.push(l)}ha.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new be(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ai(new Float32Array(s*this.count),s,this.count,Qi,mn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Vi=new he,Od=new Ct(.5,.5),ua=new I,ur=class{constructor(t=new Fn,e=new Fn,n=new Fn,s=new Fn,r=new Fn,a=new Fn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Bn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],_=r[9],m=r[10],f=r[11],M=r[12],E=r[13],v=r[14],S=r[15];if(s[0].setComponents(c-a,p-h,f-g,S-M).normalize(),s[1].setComponents(c+a,p+h,f+g,S+M).normalize(),s[2].setComponents(c+o,p+d,f+_,S+E).normalize(),s[3].setComponents(c-o,p-d,f-_,S-E).normalize(),n)s[4].setComponents(l,u,m,v).normalize(),s[5].setComponents(c-l,p-u,f-m,S-v).normalize();else if(s[4].setComponents(c-l,p-u,f-m,S-v).normalize(),e===Bn)s[5].setComponents(c+l,p+u,f+m,S+v).normalize();else if(e===rr)s[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(t){Vi.center.set(0,0,0);let e=Od.distanceTo(t.center);return Vi.radius=.7071067811865476+e,Vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ua.x=s.normal.x>0?t.max.x:t.min.x,ua.y=s.normal.y>0?t.max.y:t.min.y,ua.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ua)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},As=class extends ri{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Na=new I,Da=new I,_h=new jt,js=new Ts,fa=new he,Pl=new I,yh=new I,Ua=class extends pn{constructor(t=new ie,e=new As){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Na.fromBufferAttribute(e,s-1),Da.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Na.distanceTo(Da);t.setAttribute("lineDistance",new zt(n,1))}else It("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fa.copy(n.boundingSphere),fa.applyMatrix4(s),fa.radius+=r,t.ray.intersectsSphere(fa)===!1)return;_h.copy(s).invert(),js.copy(t.ray).applyMatrix4(_h);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=c){let f=h.getX(_),M=h.getX(_+1),E=da(this,t,js,l,f,M,_);E&&e.push(E)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(p),f=da(this,t,js,l,_,m,g-1);f&&e.push(f)}}else{let p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=c){let f=da(this,t,js,l,_,_+1,_);f&&e.push(f)}if(this.isLineLoop){let _=da(this,t,js,l,g-1,p,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};Mh=new I,Sh=new I,fr=class extends Ua{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Mh.fromBufferAttribute(e,s),Sh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Mh.distanceTo(Sh);t.setAttribute("lineDistance",new zt(n,1))}else It("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Fa=class extends ri{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},bh=new jt,Bl=new Ts,pa=new he,ma=new I,dr=class extends pn{constructor(t=new ie,e=new Fa){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(s),pa.radius+=r,t.ray.intersectsSphere(pa)===!1)return;bh.copy(s).invert(),Bl.copy(t.ray).applyMatrix4(bh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=u,_=p;g<_;g++){let m=c.getX(g);ma.fromBufferAttribute(d,m),wh(ma,m,l,s,t,e,this)}}else{let u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=u,_=p;g<_;g++)ma.fromBufferAttribute(d,g),wh(ma,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};pr=class extends dn{constructor(t=[],e=Pi,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ti=class extends dn{constructor(t,e,n=zn,s,r,a,o=Ee,l=Ee,c,h=Yn,d=1){if(h!==Yn&&h!==Ni)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ws(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ba=class extends Ti{constructor(t,e=zn,n=Pi,s,r,a=Ee,o=Ee,l,c=Yn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},mr=class extends dn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},An=class i extends ie{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(d,2));function g(_,m,f,M,E,v,S,b,A,x,T){let R=v/A,P=S/x,N=v/2,B=S/2,L=b/2,O=A+1,G=x+1,W=0,Q=0,Y=new I;for(let K=0;K<G;K++){let nt=K*P-B;for(let vt=0;vt<O;vt++){let _t=vt*R-N;Y[_]=_t*M,Y[m]=nt*E,Y[f]=L,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[m]=0,Y[f]=b>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(vt/A),d.push(1-K/x),W+=1}}for(let K=0;K<x;K++)for(let nt=0;nt<A;nt++){let vt=u+nt+O*K,_t=u+nt+O*(K+1),ae=u+(nt+1)+O*(K+1),Wt=u+(nt+1)+O*K;l.push(vt,_t,Wt),l.push(_t,ae,Wt),Q+=6}o.addGroup(p,Q,T),p+=Q,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},qi=class i extends ie{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],p=[],g=0,_=[],m=n/2,f=0;M(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new zt(d,3)),this.setAttribute("normal",new zt(u,3)),this.setAttribute("uv",new zt(p,2));function M(){let v=new I,S=new I,b=0,A=(e-t)/n;for(let x=0;x<=r;x++){let T=[],R=x/r,P=R*(e-t)+t;for(let N=0;N<=s;N++){let B=N/s,L=B*l+o,O=Math.sin(L),G=Math.cos(L);S.x=P*O,S.y=-R*n+m,S.z=P*G,d.push(S.x,S.y,S.z),v.set(O,A,G).normalize(),u.push(v.x,v.y,v.z),p.push(B,1-R),T.push(g++)}_.push(T)}for(let x=0;x<s;x++)for(let T=0;T<r;T++){let R=_[T][x],P=_[T+1][x],N=_[T+1][x+1],B=_[T][x+1];(t>0||T!==0)&&(h.push(R,P,B),b+=3),(e>0||T!==r-1)&&(h.push(P,N,B),b+=3)}c.addGroup(f,b,0),f+=b}function E(v){let S=g,b=new Ct,A=new I,x=0,T=v===!0?t:e,R=v===!0?1:-1;for(let N=1;N<=s;N++)d.push(0,m*R,0),u.push(0,R,0),p.push(.5,.5),g++;let P=g;for(let N=0;N<=s;N++){let L=N/s*l+o,O=Math.cos(L),G=Math.sin(L);A.x=T*G,A.y=m*R,A.z=T*O,d.push(A.x,A.y,A.z),u.push(0,R,0),b.x=O*.5+.5,b.y=G*.5*R+.5,p.push(b.x,b.y),g++}for(let N=0;N<s;N++){let B=S+N,L=P+N;v===!0?h.push(L,L+1,B):h.push(L+1,L,B),x+=3}c.addGroup(f,x,v===!0?1:2),f+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},gr=class i extends qi{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Oa=class i extends ie{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new zt(r,3)),this.setAttribute("normal",new zt(r.slice(),3)),this.setAttribute("uv",new zt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let E=new I,v=new I,S=new I;for(let b=0;b<e.length;b+=3)p(e[b+0],E),p(e[b+1],v),p(e[b+2],S),l(E,v,S,M)}function l(M,E,v,S){let b=S+1,A=[];for(let x=0;x<=b;x++){A[x]=[];let T=M.clone().lerp(v,x/b),R=E.clone().lerp(v,x/b),P=b-x;for(let N=0;N<=P;N++)N===0&&x===b?A[x][N]=T:A[x][N]=T.clone().lerp(R,N/P)}for(let x=0;x<b;x++)for(let T=0;T<2*(b-x)-1;T++){let R=Math.floor(T/2);T%2===0?(u(A[x][R+1]),u(A[x+1][R]),u(A[x][R])):(u(A[x][R+1]),u(A[x+1][R+1]),u(A[x+1][R]))}}function c(M){let E=new I;for(let v=0;v<r.length;v+=3)E.x=r[v+0],E.y=r[v+1],E.z=r[v+2],E.normalize().multiplyScalar(M),r[v+0]=E.x,r[v+1]=E.y,r[v+2]=E.z}function h(){let M=new I;for(let E=0;E<r.length;E+=3){M.x=r[E+0],M.y=r[E+1],M.z=r[E+2];let v=m(M)/2/Math.PI+.5,S=f(M)/Math.PI+.5;a.push(v,1-S)}g(),d()}function d(){for(let M=0;M<a.length;M+=6){let E=a[M+0],v=a[M+2],S=a[M+4],b=Math.max(E,v,S),A=Math.min(E,v,S);b>.9&&A<.1&&(E<.2&&(a[M+0]+=1),v<.2&&(a[M+2]+=1),S<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function p(M,E){let v=M*3;E.x=t[v+0],E.y=t[v+1],E.z=t[v+2]}function g(){let M=new I,E=new I,v=new I,S=new I,b=new Ct,A=new Ct,x=new Ct;for(let T=0,R=0;T<r.length;T+=9,R+=6){M.set(r[T+0],r[T+1],r[T+2]),E.set(r[T+3],r[T+4],r[T+5]),v.set(r[T+6],r[T+7],r[T+8]),b.set(a[R+0],a[R+1]),A.set(a[R+2],a[R+3]),x.set(a[R+4],a[R+5]),S.copy(M).add(E).add(v).divideScalar(3);let P=m(S);_(b,R+0,M,P),_(A,R+2,E,P),_(x,R+4,v,P)}}function _(M,E,v,S){S<0&&M.x===1&&(a[E]=M.x-1),v.x===0&&v.z===0&&(a[E]=S/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}},xr=class i extends Oa{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},oi=class i extends ie{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){let M=f*u-a;for(let E=0;E<c;E++){let v=E*d-r;g.push(v,-M,0),_.push(0,0,1),m.push(E/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){let E=M+c*f,v=M+c*(f+1),S=M+1+c*(f+1),b=M+1+c*f;p.push(E,v,b),p.push(v,S,b)}this.setIndex(p),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(_,3)),this.setAttribute("uv",new zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Yi=class i extends ie{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new I,u=new I,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){let M=[],E=f/n,v=a+E*o,S=t*Math.cos(v),b=Math.sqrt(t*t-S*S),A=0;f===0&&a===0?A=.5/e:f===n&&l===Math.PI&&(A=-.5/e);for(let x=0;x<=e;x++){let T=x/e,R=s+T*r;d.x=-b*Math.cos(R),d.y=S,d.z=b*Math.sin(R),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(T+A,1-E),M.push(c++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<e;M++){let E=h[f][M+1],v=h[f][M],S=h[f+1][M],b=h[f+1][M+1];(f!==0||a>0)&&p.push(E,v,b),(f!==n-1||l<Math.PI)&&p.push(v,S,b)}this.setIndex(p),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(_,3)),this.setAttribute("uv",new zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};ui={clone:ji,merge:en},kd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ft=class extends ri{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kd,this.fragmentShader=Hd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ji(t.uniforms),this.uniformsGroups=zd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Pt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ct().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new _e().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Bt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new jt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Rs=class extends Ft{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},za=class extends ri{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ka=class extends ri{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};Ai=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ha=class extends Ai{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Dl,endingEnd:Dl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ul:r=t,o=2*e-n;break;case Fl:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ul:a=t,l=2*n-e;break;case Fl:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,f=-u*m+2*u*_-u*g,M=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,E=(-1-p)*m+(1.5+p)*_+.5*g,v=p*m-p*_;for(let S=0;S!==o;++S)r[S]=f*a[h+S]+M*a[c+S]+E*a[l+S]+v*a[d+S];return r}},Va=class extends Ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},Ga=class extends Ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Wa=class extends Ai{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-e)/(s-e),_=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*_+a[l+m]*g;return r}let u=o*2,p=t-1;for(let g=0;g!==o;++g){let _=a[c+g],m=a[l+g],f=p*u+g*2,M=d[f],E=d[f+1],v=t*u+g*2,S=h[v],b=h[v+1],A=Gd(n,e,M,S,s);r[g]=pu(A,_,E,b,m)}return r}};_n=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=gs(e,this.TimeBufferType),this.values=gs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:gs(t.times,Array),values:gs(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Ll(t.settings)&&(n.settings={inTangents:gs(t.settings.inTangents,Array),outTangents:gs(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ga(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Va(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ha(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Wa(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case nr:e=this.InterpolantFactoryMethodDiscrete;break;case Ca:e=this.InterpolantFactoryMethodLinear;break;case va:e=this.InterpolantFactoryMethodSmooth;break;case Nl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return It("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return nr;case this.InterpolantFactoryMethodLinear:return Ca;case this.InterpolantFactoryMethodSmooth:return va;case this.InterpolantFactoryMethodBezier:return Nl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Ll(this.settings)&&(Th(this.settings.inTangents,t),Th(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Dt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Dt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Dt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Dt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&id(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Dt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===va,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,u=d-n,p=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[u+g]||_!==e[p+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,u=a*n;for(let p=0;p!==n;++p)e[u+p]=e[d+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Ll(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};_n.prototype.ValueTypeName="";_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=Ca;Ri=class extends _n{constructor(t,e,n){super(t,e,n)}};Ri.prototype.ValueTypeName="bool";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=nr;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;Xa=class extends _n{constructor(t,e,n,s){super(t,e,n,s)}};Xa.prototype.ValueTypeName="color";qa=class extends _n{constructor(t,e,n,s){super(t,e,n,s)}};qa.prototype.ValueTypeName="number";Ya=class extends Ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Ce.slerpFlat(r,0,a,c-o,a,c,l);return r}},vr=class extends _n{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Ya(this.times,this.values,this.getValueSize(),t)}};vr.prototype.ValueTypeName="quaternion";vr.prototype.InterpolantFactoryMethodSmooth=void 0;Ci=class extends _n{constructor(t,e,n){super(t,e,n)}};Ci.prototype.ValueTypeName="string";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=nr;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;Za=class extends _n{constructor(t,e,n,s){super(t,e,n,s)}};Za.prototype.ValueTypeName="vector";$a=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},mu=new $a,Ja=class{constructor(t){this.manager=t!==void 0?t:mu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ja.DEFAULT_MATERIAL_NAME="__DEFAULT";ga=new I,xa=new Ce,qn=new I,_r=class extends pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new jt,this.projectionMatrix=new jt,this.projectionMatrixInverse=new jt,this.coordinateSystem=Bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ga,xa,qn),qn.x===1&&qn.y===1&&qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,xa,qn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ga,xa,qn),qn.x===1&&qn.y===1&&qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,xa,qn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},wi=new I,Ah=new Ct,Rh=new Ct,je=class extends _r{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=bs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(wi.x,wi.y).multiplyScalar(-t/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wi.x,wi.y).multiplyScalar(-t/wi.z)}getViewSize(t,e){return this.getViewBounds(t,Ah,Rh),e.subVectors(Rh,Ah)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(tr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},li=class extends _r{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},an=class extends ie{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}},xs=-90,vs=1,Ka=class extends pn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new je(xs,vs,t,e);s.layers=this.layers,this.add(s);let r=new je(xs,vs,t,e);r.layers=this.layers,this.add(r);let a=new je(xs,vs,t,e);a.layers=this.layers,this.add(a);let o=new je(xs,vs,t,e);o.layers=this.layers,this.add(o);let l=new je(xs,vs,t,e);l.layers=this.layers,this.add(l);let c=new je(xs,vs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Qa=class extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Zi=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Wd.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};sc="\\[\\]\\.:\\/",Xd=new RegExp("["+sc+"]","g"),rc="[^"+sc+"]",qd="[^"+sc.replace("\\.","")+"]",Yd=/((?:WC+[\/:])*)/.source.replace("WC",rc),Zd=/(WCOD+)?/.source.replace("WCOD",qd),$d=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rc),Jd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rc),Kd=new RegExp("^"+Yd+Zd+$d+Jd+"$"),Qd=["material","materials","bones","map"],Ol=class{constructor(t,e,n){let s=n||ve.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ve=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Xd,"")}static parseTrackName(t){let e=Kd.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Qd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){It("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Dt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Dt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Dt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Dt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Dt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Dt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ve.Composite=Ol;ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ve.prototype.GetterByBindingType=[ve.prototype._getValue_direct,ve.prototype._getValue_array,ve.prototype._getValue_arrayElement,ve.prototype._getValue_toArray];ve.prototype.SetterByBindingTypeAndVersioning=[[ve.prototype._setValue_direct,ve.prototype._setValue_direct_setNeedsUpdate,ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_array,ve.prototype._setValue_array_setNeedsUpdate,ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_arrayElement,ve.prototype._setValue_arrayElement_setNeedsUpdate,ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_fromArray,ve.prototype._setValue_fromArray_setNeedsUpdate,ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];Fv=new Float32Array(1),uc=class uc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};uc.prototype.isMatrix2=!0;zl=uc;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?It("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186")});function Bu(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ap(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){let g=d[u],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){let _=d[p];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}function V0(i,t,e,n,s,r){let a=new Pt(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function p(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){let v=M.backgroundBlurriness>0;E=t.get(E,v)}return E}function g(M){let E=!1,v=p(M);v===null?m(a,o):v&&v.isColor&&(m(v,1),E=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,E){let v=p(E);v&&(v.isCubeTexture||v.mapping===Ar)?(c===void 0&&(c=new ue(new An(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:ji(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(H0.makeRotationFromEuler(E.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Ou),c.material.toneMapped=qt.getTransfer(v.colorSpace)!==ne,(h!==v||d!==v.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ue(new oi(2,2),new Ft({name:"BackgroundMaterial",uniforms:ji(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=qt.getTransfer(v.colorSpace)!==ne,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,E){M.getRGB(Vo,ic(i)),e.buffers.color.setClear(Vo.r,Vo.g,Vo.b,E,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:g,addToRenderList:_,dispose:f}}function G0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(P,N,B,L,O){let G=!1,W=d(P,L,B,N);r!==W&&(r=W,c(r.object)),G=p(P,L,B,O),G&&g(P,L,B,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,v(P,N,B,L),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function d(P,N,B,L){let O=L.wireframe===!0,G=n[N.id];G===void 0&&(G={},n[N.id]=G);let W=P.isInstancedMesh===!0?P.id:0,Q=G[W];Q===void 0&&(Q={},G[W]=Q);let Y=Q[B.id];Y===void 0&&(Y={},Q[B.id]=Y);let K=Y[O];return K===void 0&&(K=u(l()),Y[O]=K),K}function u(P){let N=[],B=[],L=[];for(let O=0;O<e;O++)N[O]=0,B[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:B,attributeDivisors:L,object:P,attributes:{},index:null}}function p(P,N,B,L){let O=r.attributes,G=N.attributes,W=0,Q=B.getAttributes();for(let Y in Q)if(Q[Y].location>=0){let nt=O[Y],vt=G[Y];if(vt===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(vt=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(vt=P.instanceColor)),nt===void 0||nt.attribute!==vt||vt&&nt.data!==vt.data)return!0;W++}return r.attributesNum!==W||r.index!==L}function g(P,N,B,L){let O={},G=N.attributes,W=0,Q=B.getAttributes();for(let Y in Q)if(Q[Y].location>=0){let nt=G[Y];nt===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(nt=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(nt=P.instanceColor));let vt={};vt.attribute=nt,nt&&nt.data&&(vt.data=nt.data),O[Y]=vt,W++}r.attributes=O,r.attributesNum=W,r.index=L}function _(){let P=r.newAttributes;for(let N=0,B=P.length;N<B;N++)P[N]=0}function m(P){f(P,0)}function f(P,N){let B=r.newAttributes,L=r.enabledAttributes,O=r.attributeDivisors;B[P]=1,L[P]===0&&(i.enableVertexAttribArray(P),L[P]=1),O[P]!==N&&(i.vertexAttribDivisor(P,N),O[P]=N)}function M(){let P=r.newAttributes,N=r.enabledAttributes;for(let B=0,L=N.length;B<L;B++)N[B]!==P[B]&&(i.disableVertexAttribArray(B),N[B]=0)}function E(P,N,B,L,O,G,W){W===!0?i.vertexAttribIPointer(P,N,B,O,G):i.vertexAttribPointer(P,N,B,L,O,G)}function v(P,N,B,L){_();let O=L.attributes,G=B.getAttributes(),W=N.defaultAttributeValues;for(let Q in G){let Y=G[Q];if(Y.location>=0){let K=O[Q];if(K===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(K=P.instanceColor)),K!==void 0){let nt=K.normalized,vt=K.itemSize,_t=t.get(K);if(_t===void 0)continue;let ae=_t.buffer,Wt=_t.type,Kt=_t.bytesPerElement,Z=Wt===i.INT||Wt===i.UNSIGNED_INT||K.gpuType===io;if(K.isInterleavedBufferAttribute){let tt=K.data,yt=tt.stride,Ot=K.offset;if(tt.isInstancedInterleavedBuffer){for(let gt=0;gt<Y.locationSize;gt++)f(Y.location+gt,tt.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let gt=0;gt<Y.locationSize;gt++)m(Y.location+gt);i.bindBuffer(i.ARRAY_BUFFER,ae);for(let gt=0;gt<Y.locationSize;gt++)E(Y.location+gt,vt/Y.locationSize,Wt,nt,yt*Kt,(Ot+vt/Y.locationSize*gt)*Kt,Z)}else{if(K.isInstancedBufferAttribute){for(let tt=0;tt<Y.locationSize;tt++)f(Y.location+tt,K.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let tt=0;tt<Y.locationSize;tt++)m(Y.location+tt);i.bindBuffer(i.ARRAY_BUFFER,ae);for(let tt=0;tt<Y.locationSize;tt++)E(Y.location+tt,vt/Y.locationSize,Wt,nt,vt*Kt,vt/Y.locationSize*tt*Kt,Z)}}else if(W!==void 0){let nt=W[Q];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(Y.location,nt);break;case 3:i.vertexAttrib3fv(Y.location,nt);break;case 4:i.vertexAttrib4fv(Y.location,nt);break;default:i.vertexAttrib1fv(Y.location,nt)}}}}M()}function S(){T();for(let P in n){let N=n[P];for(let B in N){let L=N[B];for(let O in L){let G=L[O];for(let W in G)h(G[W].object),delete G[W];delete L[O]}}delete n[P]}}function b(P){if(n[P.id]===void 0)return;let N=n[P.id];for(let B in N){let L=N[B];for(let O in L){let G=L[O];for(let W in G)h(G[W].object),delete G[W];delete L[O]}}delete n[P.id]}function A(P){for(let N in n){let B=n[N];for(let L in B){let O=B[L];if(O[P.id]===void 0)continue;let G=O[P.id];for(let W in G)h(G[W].object),delete G[W];delete O[P.id]}}}function x(P){for(let N in n){let B=n[N],L=P.isInstancedMesh===!0?P.id:0,O=B[L];if(O!==void 0){for(let G in O){let W=O[G];for(let Q in W)h(W[Q].object),delete W[Q];delete O[G]}delete B[L],Object.keys(B).length===0&&delete n[N]}}}function T(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:R,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function W0(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function X0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==ln&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let x=A===Te&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==on&&A!==mn&&!x&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(It("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&It("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:v,maxSamples:S,samples:b}}function q0(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Fn,o=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,E=M*4,v=f.clippingState||null;l.value=v,v=h(g,u,E,p);for(let S=0;S!==E;++S)v[S]=e[S];f.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,p,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let f=p+_*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,v=p;E!==_;++E,v+=4)a.copy(d[E]).applyMatrix4(M,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function K0(i){let t=[],e=[],n=i,s=i-Fs+1+Y0;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,p=3,g=new Float32Array(p*u*d),_=new Float32Array(p*u*d);for(let f=0;f<d;f++){let M=f%3*2/3-1,E=f>2?0:-1,v=[M,E,0,M+2/3,E,0,M+2/3,E+1,0,M,E,0,M+2/3,E+1,0,M,E+1,0];g.set(v,p*u*f);for(let S=0;S<u;S++){let b=h[S*2]*2-1,A=h[S*2+1]*2-1;f===0?ts.set(1,A,b):f===1?ts.set(-b,1,-A):f===2?ts.set(-b,A,1):f===3?ts.set(-1,A,-b):f===4?ts.set(-b,-1,A):ts.set(b,A,-1),ts.toArray(_,(f*u+S)*p)}}let m=new ie;m.setAttribute("position",new de(g,p)),m.setAttribute("outputDirection",new de(_,p)),e.push(new ue(m,null)),n>Fs&&n--}return{lodMeshes:e,sizeLods:t}}function xu(i,t,e){let n=new Me(i,t,e);return n.texture.mapping=Ar,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Us(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Q0(i,t,e){return new Ft({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function j0(i,t,e){return new Ft({name:"SphericalGaussianBlur",defines:{SAMPLES:Z0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Yo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function vu(){return new Ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function _u(){return new Ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Yo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}function tg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){let p=u.mapping;if(p===to||p===eo)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let _=new Xo(g.height);return _.fromEquirectangularTexture(i,u),t.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let p=u.mapping,g=p===to||p===eo,_=p===Pi||p===Ki;if(g||_){let m=e.get(u),f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new Wo(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let M=u.image;return g&&M&&M.height>0||_&&M&&l(M)?(n===null&&(n=new Wo(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===to?u.mapping=Pi:p===eo&&(u.mapping=Ki),u}function l(u){let p=0,g=6;for(let _=0;_<g;_++)u[_]!==void 0&&p++;return p===g}function c(u){let p=u.target;p.removeEventListener("dispose",c);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(u){let p=u.target;p.removeEventListener("dispose",h);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function eg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Gi("WebGLRenderer: "+n+" extension not supported."),s}}}function ng(i,t,e,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let p in u)t.update(u[p],i.ARRAY_BUFFER)}function c(d){let u=[],p=d.index,g=d.attributes.position,_=0;if(g===void 0)return;if(p!==null){let M=p.array;_=p.version;for(let E=0,v=M.length;E<v;E+=3){let S=M[E+0],b=M[E+1],A=M[E+2];u.push(S,b,b,A,A,S)}}else{let M=g.array;_=g.version;for(let E=0,v=M.length/3-1;E<v;E+=3){let S=E+0,b=E+1,A=E+2;u.push(S,b,b,A,A,S)}}let m=new(g.count>=65535?hr:cr)(u,1);m.version=_;let f=r.get(d);f&&t.remove(f),r.set(d,m)}function h(d){let u=r.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function ig(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),e.update(u,n,1)}function c(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,r,d*a,p),e.update(u,n,p))}function h(d,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,p);let _=0;for(let m=0;m<p;m++)_+=u[m];e.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function sg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Dt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function rg(i,t,e){let n=new WeakMap,s=new _e;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let T=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],E=0;p===!0&&(E=1),g===!0&&(E=2),_===!0&&(E=3);let v=o.attributes.position.count*E,S=1;v>t.maxTextureSize&&(S=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let b=new Float32Array(v*S*4*d),A=new or(b,v,S,d);A.type=mn,A.needsUpdate=!0;let x=E*4;for(let R=0;R<d;R++){let P=m[R],N=f[R],B=M[R],L=v*S*4*R;for(let O=0;O<P.count;O++){let G=O*x;p===!0&&(s.fromBufferAttribute(P,O),b[L+G+0]=s.x,b[L+G+1]=s.y,b[L+G+2]=s.z,b[L+G+3]=0),g===!0&&(s.fromBufferAttribute(N,O),b[L+G+4]=s.x,b[L+G+5]=s.y,b[L+G+6]=s.z,b[L+G+7]=0),_===!0&&(s.fromBufferAttribute(B,O),b[L+G+8]=s.x,b[L+G+9]=s.y,b[L+G+10]=s.z,b[L+G+11]=B.itemSize===4?s.w:1)}}u={count:d,texture:A,size:new Ct(v,S)},n.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function ag(i,t,e,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}function lg(i,t,e,n,s,r){let a=new Me(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new ie;c.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new zt([0,2,0,0,2,0],2));let h=new Rs({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ue(c,h),u=new li(-1,1,1,-1,0,1),p=null,g=null,_=!1,m,f=null,M=[],E=!1;this.setSize=function(v,S){a.setSize(v,S),o!==null&&o.setSize(v,S),l!==null&&l.setSize(v,S);for(let b=0;b<M.length;b++){let A=M[b];A.setSize&&A.setSize(v,S)}},this.setEffects=function(v){M=v,E=M.length>0&&M[0].isRenderPass===!0;let S=a.width,b=a.height;M.length>0&&o===null&&(o=new Me(S,b,{type:Te,depthBuffer:!1,stencilBuffer:!1}),l=new Me(S,b,{type:Te,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<M.length;A++){let x=M[A];x.setSize&&x.setSize(S,b)}},this.begin=function(v,S){if(_||v.toneMapping===On&&M.length===0)return!1;if(f=S,S!==null){let b=S.width,A=S.height;(a.width!==b||a.height!==A)&&this.setSize(b,A)}return E===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=On,!0},this.hasRenderPass=function(){return E},this.end=function(v,S){v.toneMapping=m,_=!0;let b=a,A=o;for(let x=0;x<M.length;x++){let T=M[x];T.enabled!==!1&&(T.render(v,A,b,S),T.needsSwap!==!1&&(b=A,A=A===o?l:o))}if(p!==v.outputColorSpace||g!==v.toneMapping){p=v.outputColorSpace,g=v.toneMapping,h.defines={},qt.getTransfer(p)===ne&&(h.defines.SRGB_TRANSFER="");let x=og[g];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,v.setRenderTarget(f),v.render(d,u),f=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}function Os(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=yu[s];if(r===void 0&&(r=new Float32Array(s),yu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ke(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function He(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Zo(i,t){let e=Mu[t];e===void 0&&(e=new Int32Array(t),Mu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function cg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;i.uniform2fv(this.addr,t),He(e,t)}}function ug(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ke(e,t))return;i.uniform3fv(this.addr,t),He(e,t)}}function fg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;i.uniform4fv(this.addr,t),He(e,t)}}function dg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),He(e,t)}else{if(ke(e,n))return;wu.set(n),i.uniformMatrix2fv(this.addr,!1,wu),He(e,n)}}function pg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),He(e,t)}else{if(ke(e,n))return;bu.set(n),i.uniformMatrix3fv(this.addr,!1,bu),He(e,n)}}function mg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),He(e,t)}else{if(ke(e,n))return;Su.set(n),i.uniformMatrix4fv(this.addr,!1,Su),He(e,n)}}function gg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function xg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;i.uniform2iv(this.addr,t),He(e,t)}}function vg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;i.uniform3iv(this.addr,t),He(e,t)}}function _g(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;i.uniform4iv(this.addr,t),He(e,t)}}function yg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Mg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;i.uniform2uiv(this.addr,t),He(e,t)}}function Sg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;i.uniform3uiv(this.addr,t),He(e,t)}}function bg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;i.uniform4uiv(this.addr,t),He(e,t)}}function wg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(_c.compareFunction=e.isReversedDepthBuffer()?Ho:ko,r=_c):r=zu,e.setTexture2D(t||r,s)}function Eg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Hu,s)}function Tg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Vu,s)}function Ag(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ku,s)}function Rg(i){switch(i){case 5126:return cg;case 35664:return hg;case 35665:return ug;case 35666:return fg;case 35674:return dg;case 35675:return pg;case 35676:return mg;case 5124:case 35670:return gg;case 35667:case 35671:return xg;case 35668:case 35672:return vg;case 35669:case 35673:return _g;case 5125:return yg;case 36294:return Mg;case 36295:return Sg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return wg;case 35679:case 36299:case 36307:return Eg;case 35680:case 36300:case 36308:case 36293:return Tg;case 36289:case 36303:case 36311:case 36292:return Ag}}function Cg(i,t){i.uniform1fv(this.addr,t)}function Ig(i,t){let e=Os(t,this.size,2);i.uniform2fv(this.addr,e)}function Pg(i,t){let e=Os(t,this.size,3);i.uniform3fv(this.addr,e)}function Lg(i,t){let e=Os(t,this.size,4);i.uniform4fv(this.addr,e)}function Ng(i,t){let e=Os(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Dg(i,t){let e=Os(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ug(i,t){let e=Os(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Fg(i,t){i.uniform1iv(this.addr,t)}function Bg(i,t){i.uniform2iv(this.addr,t)}function Og(i,t){i.uniform3iv(this.addr,t)}function zg(i,t){i.uniform4iv(this.addr,t)}function kg(i,t){i.uniform1uiv(this.addr,t)}function Hg(i,t){i.uniform2uiv(this.addr,t)}function Vg(i,t){i.uniform3uiv(this.addr,t)}function Gg(i,t){i.uniform4uiv(this.addr,t)}function Wg(i,t,e){let n=this.cache,s=t.length,r=Zo(e,s);ke(n,r)||(i.uniform1iv(this.addr,r),He(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=_c:a=zu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Xg(i,t,e){let n=this.cache,s=t.length,r=Zo(e,s);ke(n,r)||(i.uniform1iv(this.addr,r),He(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Hu,r[a])}function qg(i,t,e){let n=this.cache,s=t.length,r=Zo(e,s);ke(n,r)||(i.uniform1iv(this.addr,r),He(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Vu,r[a])}function Yg(i,t,e){let n=this.cache,s=t.length,r=Zo(e,s);ke(n,r)||(i.uniform1iv(this.addr,r),He(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||ku,r[a])}function Zg(i){switch(i){case 5126:return Cg;case 35664:return Ig;case 35665:return Pg;case 35666:return Lg;case 35674:return Ng;case 35675:return Dg;case 35676:return Ug;case 5124:case 35670:return Fg;case 35667:case 35671:return Bg;case 35668:case 35672:return Og;case 35669:case 35673:return zg;case 5125:return kg;case 36294:return Hg;case 36295:return Vg;case 36296:return Gg;case 35678:case 36198:case 36298:case 36306:case 35682:return Wg;case 35679:case 36299:case 36307:return Xg;case 35680:case 36300:case 36308:case 36293:return qg;case 36289:case 36303:case 36311:case 36292:return Yg}}function Eu(i,t){i.seq.push(t),i.map[t.id]=t}function $g(i,t,e){let n=i.name,s=n.length;for(xc.lastIndex=0;;){let r=xc.exec(n),a=xc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Eu(e,c===void 0?new yc(o,i,t):new Mc(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new Sc(o),Eu(e,d)),e=d}}}function Tu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}function Qg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function jg(i){qt._getMatrix(Au,qt.workingColorSpace,i);let t=`mat3( ${Au.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case sr:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return It("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ru(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Qg(i.getShaderSource(t),o)}else return r}function tx(i,t){let e=jg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function nx(i,t){let e=ex[t];return e===void 0?(It("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function ix(){qt.getLuminanceCoefficients(Go);let i=Go.x.toFixed(4),t=Go.y.toFixed(4),e=Go.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Br).join(`
`)}function rx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ax(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Br(i){return i!==""}function Cu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Iu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function bc(i){return i.replace(ox,cx)}function cx(i,t){let e=Gt[t];if(e===void 0){let n=lx.get(t);if(n!==void 0)e=Gt[n],It('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return bc(e)}function Pu(i){return i.replace(hx,ux)}function ux(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Lu(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function dx(i){return fx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function mx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":px[i.envMapMode]||"ENVMAP_TYPE_CUBE"}function xx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":gx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}function _x(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":vx[i.combine]||"ENVMAP_BLENDING_NONE"}function yx(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Mx(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=dx(e),c=mx(e),h=xx(e),d=_x(e),u=yx(e),p=sx(e),g=rx(r),_=s.createProgram(),m,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Br).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Br).join(`
`),f.length>0&&(f+=`
`)):(m=[Lu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Br).join(`
`),f=[Lu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==On?"#define TONE_MAPPING":"",e.toneMapping!==On?Gt.tonemapping_pars_fragment:"",e.toneMapping!==On?nx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,tx("linearToOutputTexel",e.outputColorSpace),ix(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Br).join(`
`)),a=bc(a),a=Cu(a,e),a=Iu(a,e),o=bc(o),o=Cu(o,e),o=Iu(o,e),a=Pu(a),o=Pu(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===tc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===tc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let E=M+m+a,v=M+f+o,S=Tu(s,s.VERTEX_SHADER,E),b=Tu(s,s.FRAGMENT_SHADER,v);s.attachShader(_,S),s.attachShader(_,b),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(P){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(_)||"",B=s.getShaderInfoLog(S)||"",L=s.getShaderInfoLog(b)||"",O=N.trim(),G=B.trim(),W=L.trim(),Q=!0,Y=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,S,b);else{let K=Ru(s,S,"vertex"),nt=Ru(s,b,"fragment");Dt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+K+`
`+nt)}else O!==""?It("WebGLProgram: Program Info Log:",O):(G===""||W==="")&&(Y=!1);Y&&(P.diagnostics={runnable:Q,programLog:O,vertexShader:{log:G,prefix:m},fragmentShader:{log:W,prefix:f}})}s.deleteShader(S),s.deleteShader(b),x=new Bs(s,_),T=ax(s,_)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(_,Jg)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Kg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=b,this}function bx(i){return i===Di||i===Nr||i===Dr}function wx(i,t,e,n,s,r){let a=new lr,o=new wc,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,T,R,P,N,B){let L=P.fog,O=N.geometry,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Q=t.get(x.envMap||G,W),Y=Q&&Q.mapping===Ar?Q.image.height:null,K=p[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&It("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let nt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,vt=nt!==void 0?nt.length:0,_t=0;O.morphAttributes.position!==void 0&&(_t=1),O.morphAttributes.normal!==void 0&&(_t=2),O.morphAttributes.color!==void 0&&(_t=3);let ae,Wt,Kt,Z;if(K){let me=Jn[K];ae=me.vertexShader,Wt=me.fragmentShader}else{ae=x.vertexShader,Wt=x.fragmentShader;let me=o.getVertexShaderStage(x),se=o.getFragmentShaderStage(x);o.update(x,me,se),Kt=me.id,Z=se.id}let tt=i.getRenderTarget(),yt=i.state.buffers.depth.getReversed(),Ot=N.isInstancedMesh===!0,gt=N.isBatchedMesh===!0,Xt=!!x.map,Be=!!x.matcap,Yt=!!Q,ee=!!x.aoMap,pe=!!x.lightMap,$t=!!x.bumpMap&&x.wireframe===!1,ye=!!x.normalMap,Ge=!!x.displacementMap,fn=!!x.emissiveMap,Se=!!x.metalnessMap,Le=!!x.roughnessMap,F=x.anisotropy>0,$e=x.clearcoat>0,oe=x.dispersion>0,C=x.retroreflectivity>0,y=x.iridescence>0,k=x.sheen>0,X=x.transmission>0,$=F&&!!x.anisotropyMap,st=$e&&!!x.clearcoatMap,rt=$e&&!!x.clearcoatNormalMap,J=$e&&!!x.clearcoatRoughnessMap,et=y&&!!x.iridescenceMap,at=y&&!!x.iridescenceThicknessMap,Tt=k&&!!x.sheenColorMap,ht=k&&!!x.sheenRoughnessMap,ot=!!x.specularMap,At=!!x.specularColorMap,Nt=!!x.specularIntensityMap,Ht=X&&!!x.transmissionMap,U=X&&!!x.thicknessMap,lt=!!x.gradientMap,j=!!x.alphaMap,ct=x.alphaTest>0,pt=!!x.alphaHash,it=!!x.extensions,Rt=On;x.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Rt=i.toneMapping);let bt={shaderID:K,shaderType:x.type,shaderName:x.name,vertexShader:ae,fragmentShader:Wt,defines:x.defines,customVertexShaderID:Kt,customFragmentShaderID:Z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:gt,batchingColor:gt&&N._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&N.instanceColor!==null,instancingMorph:Ot&&N.morphTexture!==null,outputColorSpace:tt===null?i.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:qt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Xt,matcap:Be,envMap:Yt,envMapMode:Yt&&Q.mapping,envMapCubeUVHeight:Y,aoMap:ee,lightMap:pe,bumpMap:$t,normalMap:ye,displacementMap:Ge,emissiveMap:fn,normalMapObjectSpace:ye&&x.normalMapType===tu,normalMapTangentSpace:ye&&x.normalMapType===jl,packedNormalMap:ye&&x.normalMapType===jl&&bx(x.normalMap.format),metalnessMap:Se,roughnessMap:Le,anisotropy:F,anisotropyMap:$,clearcoat:$e,clearcoatMap:st,clearcoatNormalMap:rt,clearcoatRoughnessMap:J,dispersion:oe,retroreflection:C,iridescence:y,iridescenceMap:et,iridescenceThicknessMap:at,sheen:k,sheenColorMap:Tt,sheenRoughnessMap:ht,specularMap:ot,specularColorMap:At,specularIntensityMap:Nt,transmission:X,transmissionMap:Ht,thicknessMap:U,gradientMap:lt,opaque:x.transparent===!1&&x.blending===Is&&x.alphaToCoverage===!1,alphaMap:j,alphaTest:ct,alphaHash:pt,combine:x.combine,mapUv:Xt&&g(x.map.channel),aoMapUv:ee&&g(x.aoMap.channel),lightMapUv:pe&&g(x.lightMap.channel),bumpMapUv:$t&&g(x.bumpMap.channel),normalMapUv:ye&&g(x.normalMap.channel),displacementMapUv:Ge&&g(x.displacementMap.channel),emissiveMapUv:fn&&g(x.emissiveMap.channel),metalnessMapUv:Se&&g(x.metalnessMap.channel),roughnessMapUv:Le&&g(x.roughnessMap.channel),anisotropyMapUv:$&&g(x.anisotropyMap.channel),clearcoatMapUv:st&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:rt&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:at&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Tt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:ht&&g(x.sheenRoughnessMap.channel),specularMapUv:ot&&g(x.specularMap.channel),specularColorMapUv:At&&g(x.specularColorMap.channel),specularIntensityMapUv:Nt&&g(x.specularIntensityMap.channel),transmissionMapUv:Ht&&g(x.transmissionMap.channel),thicknessMapUv:U&&g(x.thicknessMap.channel),alphaMapUv:j&&g(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ye||F),vertexNormals:!!O.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!O.attributes.uv&&(Xt||j),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||O.attributes.normal===void 0&&ye===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:yt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:_t,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Rt,decodeVideoTexture:Xt&&x.map.isVideoTexture===!0&&qt.getTransfer(x.map.colorSpace)===ne,decodeVideoTextureEmissive:fn&&x.emissiveMap.isVideoTexture===!0&&qt.getTransfer(x.emissiveMap.colorSpace)===ne,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===tn,flipSided:x.side===Ye,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:it&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&x.extensions.multiDraw===!0||gt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return bt.vertexUv1s=l.has(1),bt.vertexUv2s=l.has(2),bt.vertexUv3s=l.has(3),l.clear(),bt}function m(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let R in x.defines)T.push(R),T.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(f(T,x),M(T,x),T.push(i.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function f(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function M(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function E(x){let T=p[x.type],R;if(T){let P=Jn[T];R=ui.clone(P.uniforms)}else R=x.uniforms;return R}function v(x,T){let R=h.get(T);return R!==void 0?++R.usedTimes:(R=new Mx(i,T,x,s),c.push(R),h.set(T,R)),R}function S(x){if(--x.usedTimes===0){let T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function A(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:E,acquireProgram:v,releaseProgram:S,releaseShaderCache:b,programs:c,dispose:A}}function Ex(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Tx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Nu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Du(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,_,m,f){let M=i[t];return M===void 0?(M={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:f},i[t]=M):(M.id=u.id,M.object=u,M.geometry=p,M.material=g,M.materialVariant=a(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=m,M.group=f),t++,M}function l(u,p,g,_,m,f,M){M.reversedDepth===!0&&(m=-m);let E=o(u,p,g,_,m,f);g.transmission>0?n.push(E):g.transparent===!0?s.push(E):e.push(E)}function c(u,p,g,_,m,f){let M=o(u,p,g,_,m,f);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):e.unshift(M)}function h(u,p){e.length>1&&e.sort(u||Tx),n.length>1&&n.sort(p||Nu),s.length>1&&s.sort(p||Nu)}function d(){for(let u=t,p=i.length;u<p;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function Ax(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Du,i.set(n,[a])):s>=r.length?(a=new Du,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Rx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new I,color:new Pt};break;case"SpotLight":e={position:new I,direction:new I,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":e={color:new Pt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function Cx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}function Px(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Lx(i){let t=new Rx,e=Cx(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let s=new I,r=new jt,a=new jt;function o(c){let h=0,d=0,u=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,M=0,E=0,v=0,S=0,b=0,A=0,x=0,T=0,R=0;c.sort(Px);for(let N=0,B=c.length;N<B;N++){let L=c[N],O=L.color,G=L.intensity,W=L.distance,Q=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Di?Q=L.shadow.map.texture:Q=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=O.r*G,d+=O.g*G,u+=O.b*G;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],G);R++}else if(L.isSunLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let K=L.shadow,nt=e.get(L);nt.shadowIntensity=K.intensity,nt.shadowBias=K.bias,nt.shadowNormalBias=K.normalBias,nt.shadowRadius=K.radius,nt.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),n.sunShadow[g]=nt,n.sunShadowMap[g]=Q;let vt=K.getViewportCount();for(let _t=0;_t<vt;_t++)n.sunShadowMatrix[_+_t]=K.getMatrix(_t),n.sunShadowCascade[_+_t]=K._cascadeData[_t];_+=vt,g++}n.sun[p]=Y,p++}else if(L.isDirectionalLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let K=L.shadow,nt=e.get(L);nt.shadowIntensity=K.intensity,nt.shadowBias=K.bias,nt.shadowNormalBias=K.normalBias,nt.shadowRadius=K.radius,nt.shadowMapSize=K.mapSize,n.directionalShadow[m]=nt,n.directionalShadowMap[m]=Q,n.directionalShadowMatrix[m]=L.shadow.matrix,S++}n.directional[m]=Y,m++}else if(L.isSpotLight){let Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(O).multiplyScalar(G),Y.distance=W,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[M]=Y;let K=L.shadow;if(L.map&&(n.spotLightMap[x]=L.map,x++,K.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[M]=K.matrix,L.castShadow){let nt=e.get(L);nt.shadowIntensity=K.intensity,nt.shadowBias=K.bias,nt.shadowNormalBias=K.normalBias,nt.shadowRadius=K.radius,nt.shadowMapSize=K.mapSize,n.spotShadow[M]=nt,n.spotShadowMap[M]=Q,A++}M++}else if(L.isRectAreaLight){let Y=t.get(L);Y.color.copy(O).multiplyScalar(G),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[E]=Y,E++}else if(L.isPointLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){let K=L.shadow,nt=e.get(L);nt.shadowIntensity=K.intensity,nt.shadowBias=K.bias,nt.shadowNormalBias=K.normalBias,nt.shadowRadius=K.radius,nt.shadowMapSize=K.mapSize,nt.shadowCameraNear=K.camera.near,nt.shadowCameraFar=K.camera.far,n.pointShadow[f]=nt,n.pointShadowMap[f]=Q,n.pointShadowMatrix[f]=L.shadow.matrix,b++}n.point[f]=Y,f++}else if(L.isHemisphereLight){let Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(G),Y.groundColor.copy(L.groundColor).multiplyScalar(G),n.hemi[v]=Y,v++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let P=n.hash;(P.sunLength!==p||P.directionalLength!==m||P.pointLength!==f||P.spotLength!==M||P.rectAreaLength!==E||P.hemiLength!==v||P.numSunShadows!==g||P.numDirectionalShadows!==S||P.numPointShadows!==b||P.numSpotShadows!==A||P.numSpotMaps!==x||P.numLightProbes!==R)&&(n.sun.length=p,n.directional.length=m,n.spot.length=M,n.rectArea.length=E,n.point.length=f,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,P.sunLength=p,P.directionalLength=m,P.pointLength=f,P.spotLength=M,P.rectAreaLength=E,P.hemiLength=v,P.numSunShadows=g,P.numDirectionalShadows=S,P.numPointShadows=b,P.numSpotShadows=A,P.numSpotMaps=x,P.numLightProbes=R,n.version=Ix++)}function l(c,h){let d=0,u=0,p=0,g=0,_=0,m=0,f=h.matrixWorldInverse;for(let M=0,E=c.length;M<E;M++){let v=c[M];if(v.isSunLight){let S=n.sun[d];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(f),d++}else if(v.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),u++}else if(v.isSpotLight){let S=n.spot[g];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),g++}else if(v.isRectAreaLight){let S=n.rectArea[_];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(f),a.identity(),r.copy(v.matrixWorld),r.premultiply(f),a.extractRotation(r),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(v.isPointLight){let S=n.point[p];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(f),p++}else if(v.isHemisphereLight){let S=n.hemi[m];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:n}}function Uu(i){let t=new Lx(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Nx(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Uu(i),t.set(s,[o])):r>=a.length?(o=new Uu(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function Ox(i,t,e){let n=new ur,s=new Ct,r=new Ct,a=new _e,o=new za,l=new ka,c={},h=e.maxTextureSize,d={[Ii]:Ye,[Ye]:Ii,[tn]:tn},u=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:Dx,fragmentShader:Ux}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new ie;g.setAttribute("position",new de(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ue(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yr;let f=this.type;this.render=function(b,A,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===Ph&&(It("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=yr);let T=i.getRenderTarget(),R=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Rn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let B=f!==this.type;B&&A.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(O=>O.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,O=b.length;L<O;L++){let G=b[L],W=G.shadow;if(W===void 0){It("WebGLShadowMap:",G,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let Q=W.getFrameExtents();s.multiply(Q),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,W.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=Y,W.map===null||B===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Cs){if(G.isPointLight){It("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Me(s.x,s.y,{format:Di,type:Te,minFilter:Ue,magFilter:Ue,generateMipmaps:!1}),W.map.texture.name=G.name+".shadowMap",W.map.depthTexture=new Ti(s.x,s.y,mn),W.map.depthTexture.name=G.name+".shadowMapDepth",W.map.depthTexture.format=Yn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ee,W.map.depthTexture.magFilter=Ee}else G.isPointLight?(W.map=new Xo(s.x),W.map.depthTexture=new Ba(s.x,zn)):(W.map=new Me(s.x,s.y),W.map.depthTexture=new Ti(s.x,s.y,zn)),W.map.depthTexture.name=G.name+".shadowMap",W.map.depthTexture.format=Yn,this.type===yr?(W.map.depthTexture.compareFunction=Y?Ho:ko,W.map.depthTexture.minFilter=Ue,W.map.depthTexture.magFilter=Ue):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ee,W.map.depthTexture.magFilter=Ee);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let K=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();G.isPointLight!==!0&&W.updateMatrices(G,x);for(let nt=0;nt<K;nt++){let vt=W.getCamera(nt);if(G.isPointLight){let _t=W.camera,ae=W.matrix,Wt=G.distance||_t.far;Wt!==_t.far&&(_t.far=Wt,_t.updateProjectionMatrix()),Fr.setFromMatrixPosition(G.matrixWorld),_t.position.copy(Fr),vc.copy(_t.position),vc.add(Fx[nt]),_t.up.copy(Bx[nt]),_t.lookAt(vc),_t.updateMatrixWorld(),ae.makeTranslation(-Fr.x,-Fr.y,-Fr.z),Fu.multiplyMatrices(_t.projectionMatrix,_t.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Fu,_t.coordinateSystem,_t.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,nt),i.clear();else{nt===0&&(i.setRenderTarget(W.map),i.clear());let _t=W.getViewport(nt);a.set(r.x*_t.x,r.y*_t.y,r.x*_t.z,r.y*_t.w),N.viewport(a)}n=W.getFrustum(nt),v(A,x,vt,G,this.type)}W.isPointLightShadow!==!0&&this.type===Cs&&M(W,x),W.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(T,R,P)};function M(b,A){let x=t.update(_);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null?b.mapPass=new Me(s.x,s.y,{format:Di,type:Te}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(A,null,x,u,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value.set(b.map.width,b.map.height),p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(A,null,x,p,_,null)}function E(b,A,x,T){let R=null,P=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)R=P;else if(R=x.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let N=R.uuid,B=A.uuid,L=c[N];L===void 0&&(L={},c[N]=L);let O=L[B];O===void 0&&(O=R.clone(),L[B]=O,A.addEventListener("dispose",S)),R=O}if(R.visible=A.visible,R.wireframe=A.wireframe,T===Cs?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:d[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let N=i.properties.get(R);N.light=x}return R}function v(b,A,x,T,R){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===Cs)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);let B=t.update(b),L=b.material;if(Array.isArray(L)){let O=B.groups;for(let G=0,W=O.length;G<W;G++){let Q=O[G],Y=L[Q.materialIndex];if(Y&&Y.visible){let K=E(b,Y,T,R);b.onBeforeShadow(i,b,A,x,B,K,Q),i.renderBufferDirect(x,null,B,K,b,Q),b.onAfterShadow(i,b,A,x,B,K,Q)}}}else if(L.visible){let O=E(b,L,T,R);b.onBeforeShadow(i,b,A,x,B,O,null),i.renderBufferDirect(x,null,B,O,b,null),b.onAfterShadow(i,b,A,x,B,O,null)}}let N=b.children;for(let B=0,L=N.length;B<L;B++)v(N[B],A,x,T,R)}function S(b){b.target.removeEventListener("dispose",S);for(let x in c){let T=c[x],R=b.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}}function zx(i,t){function e(){let U=!1,lt=new _e,j=null,ct=new _e(0,0,0,0);return{setMask:function(pt){j!==pt&&!U&&(i.colorMask(pt,pt,pt,pt),j=pt)},setLocked:function(pt){U=pt},setClear:function(pt,it,Rt,bt,me){me===!0&&(pt*=bt,it*=bt,Rt*=bt),lt.set(pt,it,Rt,bt),ct.equals(lt)===!1&&(i.clearColor(pt,it,Rt,bt),ct.copy(lt))},reset:function(){U=!1,j=null,ct.set(-1,0,0,0)}}}function n(){let U=!1,lt=!1,j=null,ct=null,pt=null;return{setReversed:function(it){if(lt!==it){let Rt=t.get("EXT_clip_control");it?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),lt=it;let bt=pt;pt=null,this.setClear(bt)}},getReversed:function(){return lt},setTest:function(it){it?tt(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(it){j!==it&&!U&&(i.depthMask(it),j=it)},setFunc:function(it){if(lt&&(it=fu[it]),ct!==it){switch(it){case ya:i.depthFunc(i.NEVER);break;case Ma:i.depthFunc(i.ALWAYS);break;case Sa:i.depthFunc(i.LESS);break;case Ms:i.depthFunc(i.LEQUAL);break;case ba:i.depthFunc(i.EQUAL);break;case wa:i.depthFunc(i.GEQUAL);break;case Ea:i.depthFunc(i.GREATER);break;case Ta:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ct=it}},setLocked:function(it){U=it},setClear:function(it){pt!==it&&(pt=it,lt&&(it=1-it),i.clearDepth(it))},reset:function(){U=!1,j=null,ct=null,pt=null,lt=!1}}}function s(){let U=!1,lt=null,j=null,ct=null,pt=null,it=null,Rt=null,bt=null,me=null;return{setTest:function(se){U||(se?tt(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(se){lt!==se&&!U&&(i.stencilMask(se),lt=se)},setFunc:function(se,Ln,Wn){(j!==se||ct!==Ln||pt!==Wn)&&(i.stencilFunc(se,Ln,Wn),j=se,ct=Ln,pt=Wn)},setOp:function(se,Ln,Wn){(it!==se||Rt!==Ln||bt!==Wn)&&(i.stencilOp(se,Ln,Wn),it=se,Rt=Ln,bt=Wn)},setLocked:function(se){U=se},setClear:function(se){me!==se&&(i.clearStencil(se),me=se)},reset:function(){U=!1,lt=null,j=null,ct=null,pt=null,it=null,Rt=null,bt=null,me=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},p=new WeakMap,g=[],_=null,m=!1,f=null,M=null,E=null,v=null,S=null,b=null,A=null,x=new Pt(0,0,0),T=0,R=!1,P=null,N=null,B=null,L=null,O=null,G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,Q=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=Q>=1):Y.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=Q>=2);let K=null,nt={},vt=i.getParameter(i.SCISSOR_BOX),_t=i.getParameter(i.VIEWPORT),ae=new _e().fromArray(vt),Wt=new _e().fromArray(_t);function Kt(U,lt,j,ct){let pt=new Uint8Array(4),it=i.createTexture();i.bindTexture(U,it),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Rt=0;Rt<j;Rt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,ct,0,i.RGBA,i.UNSIGNED_BYTE,pt):i.texImage2D(lt+Rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,pt);return it}let Z={};Z[i.TEXTURE_2D]=Kt(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=Kt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=Kt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=Kt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(i.DEPTH_TEST),a.setFunc(Ms),$t(!1),ye(kl),tt(i.CULL_FACE),ee(Rn);function tt(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function yt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Ot(U,lt){return u[U]!==lt?(i.bindFramebuffer(U,lt),u[U]=lt,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=lt),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function gt(U,lt){let j=g,ct=!1;if(U){j=p.get(lt),j===void 0&&(j=[],p.set(lt,j));let pt=U.textures;if(j.length!==pt.length||j[0]!==i.COLOR_ATTACHMENT0){for(let it=0,Rt=pt.length;it<Rt;it++)j[it]=i.COLOR_ATTACHMENT0+it;j.length=pt.length,ct=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,ct=!0);ct&&i.drawBuffers(j)}function Xt(U){return _!==U?(i.useProgram(U),_=U,!0):!1}let Be={[$i]:i.FUNC_ADD,[Nh]:i.FUNC_SUBTRACT,[Dh]:i.FUNC_REVERSE_SUBTRACT};Be[Uh]=i.MIN,Be[Fh]=i.MAX;let Yt={[Bh]:i.ZERO,[Oh]:i.ONE,[zh]:i.SRC_COLOR,[Gl]:i.SRC_ALPHA,[Xh]:i.SRC_ALPHA_SATURATE,[Gh]:i.DST_COLOR,[Hh]:i.DST_ALPHA,[kh]:i.ONE_MINUS_SRC_COLOR,[Wl]:i.ONE_MINUS_SRC_ALPHA,[Wh]:i.ONE_MINUS_DST_COLOR,[Vh]:i.ONE_MINUS_DST_ALPHA,[qh]:i.CONSTANT_COLOR,[Yh]:i.ONE_MINUS_CONSTANT_COLOR,[Zh]:i.CONSTANT_ALPHA,[$h]:i.ONE_MINUS_CONSTANT_ALPHA};function ee(U,lt,j,ct,pt,it,Rt,bt,me,se){if(U===Rn){m===!0&&(yt(i.BLEND),m=!1);return}if(m===!1&&(tt(i.BLEND),m=!0),U!==Lh){if(U!==f||se!==R){if((M!==$i||S!==$i)&&(i.blendEquation(i.FUNC_ADD),M=$i,S=$i),se)switch(U){case Is:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ci:i.blendFunc(i.ONE,i.ONE);break;case Hl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Dt("WebGLState: Invalid blending: ",U);break}else switch(U){case Is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ci:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Hl:Dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Vl:Dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Dt("WebGLState: Invalid blending: ",U);break}E=null,v=null,b=null,A=null,x.set(0,0,0),T=0,f=U,R=se}return}pt=pt||lt,it=it||j,Rt=Rt||ct,(lt!==M||pt!==S)&&(i.blendEquationSeparate(Be[lt],Be[pt]),M=lt,S=pt),(j!==E||ct!==v||it!==b||Rt!==A)&&(i.blendFuncSeparate(Yt[j],Yt[ct],Yt[it],Yt[Rt]),E=j,v=ct,b=it,A=Rt),(bt.equals(x)===!1||me!==T)&&(i.blendColor(bt.r,bt.g,bt.b,me),x.copy(bt),T=me),f=U,R=!1}function pe(U,lt){U.side===tn?yt(i.CULL_FACE):tt(i.CULL_FACE);let j=U.side===Ye;lt&&(j=!j),$t(j),U.blending===Is&&U.transparent===!1?ee(Rn):ee(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let ct=U.stencilWrite;o.setTest(ct),ct&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),fn(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?tt(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function $t(U){P!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),P=U)}function ye(U){U!==Ch?(tt(i.CULL_FACE),U!==N&&(U===kl?i.cullFace(i.BACK):U===Ih?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),N=U}function Ge(U){U!==B&&(W&&i.lineWidth(U),B=U)}function fn(U,lt,j){U?(tt(i.POLYGON_OFFSET_FILL),(L!==lt||O!==j)&&(L=lt,O=j,a.getReversed()&&(lt=-lt),i.polygonOffset(lt,j))):yt(i.POLYGON_OFFSET_FILL)}function Se(U){U?tt(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function Le(U){U===void 0&&(U=i.TEXTURE0+G-1),K!==U&&(i.activeTexture(U),K=U)}function F(U,lt,j){j===void 0&&(K===null?j=i.TEXTURE0+G-1:j=K);let ct=nt[j];ct===void 0&&(ct={type:void 0,texture:void 0},nt[j]=ct),(ct.type!==U||ct.texture!==lt)&&(K!==j&&(i.activeTexture(j),K=j),i.bindTexture(U,lt||Z[U]),ct.type=U,ct.texture=lt)}function $e(){let U=nt[K];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function oe(){try{i.compressedTexImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function y(){try{i.texSubImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function k(){try{i.texSubImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function st(){try{i.texStorage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function rt(){try{i.texStorage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function J(){try{i.texImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function et(){try{i.texImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function at(U){return d[U]!==void 0?d[U]:i.getParameter(U)}function Tt(U,lt){d[U]!==lt&&(i.pixelStorei(U,lt),d[U]=lt)}function ht(U){ae.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ae.copy(U))}function ot(U){Wt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Wt.copy(U))}function At(U,lt){let j=c.get(lt);j===void 0&&(j=new WeakMap,c.set(lt,j));let ct=j.get(U);ct===void 0&&(ct=i.getUniformBlockIndex(lt,U.name),j.set(U,ct))}function Nt(U,lt){let ct=c.get(lt).get(U);l.get(lt)!==ct&&(i.uniformBlockBinding(lt,ct,U.__bindingPointIndex),l.set(lt,ct))}function Ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},K=null,nt={},u={},p=new WeakMap,g=[],_=null,m=!1,f=null,M=null,E=null,v=null,S=null,b=null,A=null,x=new Pt(0,0,0),T=0,R=!1,P=null,N=null,B=null,L=null,O=null,ae.set(0,0,i.canvas.width,i.canvas.height),Wt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:tt,disable:yt,bindFramebuffer:Ot,drawBuffers:gt,useProgram:Xt,setBlending:ee,setMaterial:pe,setFlipSided:$t,setCullFace:ye,setLineWidth:Ge,setPolygonOffset:fn,setScissorTest:Se,activeTexture:Le,bindTexture:F,unbindTexture:$e,compressedTexImage2D:oe,compressedTexImage3D:C,texImage2D:J,texImage3D:et,pixelStorei:Tt,getParameter:at,updateUBOMapping:At,uniformBlockBinding:Nt,texStorage2D:st,texStorage3D:rt,texSubImage2D:y,texSubImage3D:k,compressedTexSubImage2D:X,compressedTexSubImage3D:$,scissor:ht,viewport:ot,reset:Ht}}function kx(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,h=new WeakMap,d=new Set,u,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,y){return g?new OffscreenCanvas(C,y):ar("canvas")}function m(C,y,k){let X=1,$=oe(C);if(($.width>k||$.height>k)&&(X=k/Math.max($.width,$.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let st=Math.floor(X*$.width),rt=Math.floor(X*$.height);u===void 0&&(u=_(st,rt));let J=y?_(st,rt):u;return J.width=st,J.height=rt,J.getContext("2d").drawImage(C,0,0,st,rt),It("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+st+"x"+rt+")."),J}else return"data"in C&&It("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),C;return C}function f(C){return C.generateMipmaps}function M(C){i.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(C,y,k,X,$,st=!1){if(C!==null){if(i[C]!==void 0)return i[C];It("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let rt;X&&(rt=t.get("EXT_texture_norm16"),rt||It("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=y;if(y===i.RED&&(k===i.FLOAT&&(J=i.R32F),k===i.HALF_FLOAT&&(J=i.R16F),k===i.UNSIGNED_BYTE&&(J=i.R8),k===i.UNSIGNED_SHORT&&rt&&(J=rt.R16_EXT),k===i.SHORT&&rt&&(J=rt.R16_SNORM_EXT)),y===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.R8UI),k===i.UNSIGNED_SHORT&&(J=i.R16UI),k===i.UNSIGNED_INT&&(J=i.R32UI),k===i.BYTE&&(J=i.R8I),k===i.SHORT&&(J=i.R16I),k===i.INT&&(J=i.R32I)),y===i.RG&&(k===i.FLOAT&&(J=i.RG32F),k===i.HALF_FLOAT&&(J=i.RG16F),k===i.UNSIGNED_BYTE&&(J=i.RG8),k===i.UNSIGNED_SHORT&&rt&&(J=rt.RG16_EXT),k===i.SHORT&&rt&&(J=rt.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RG8UI),k===i.UNSIGNED_SHORT&&(J=i.RG16UI),k===i.UNSIGNED_INT&&(J=i.RG32UI),k===i.BYTE&&(J=i.RG8I),k===i.SHORT&&(J=i.RG16I),k===i.INT&&(J=i.RG32I)),y===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RGB8UI),k===i.UNSIGNED_SHORT&&(J=i.RGB16UI),k===i.UNSIGNED_INT&&(J=i.RGB32UI),k===i.BYTE&&(J=i.RGB8I),k===i.SHORT&&(J=i.RGB16I),k===i.INT&&(J=i.RGB32I)),y===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),k===i.UNSIGNED_INT&&(J=i.RGBA32UI),k===i.BYTE&&(J=i.RGBA8I),k===i.SHORT&&(J=i.RGBA16I),k===i.INT&&(J=i.RGBA32I)),y===i.RGB&&(k===i.UNSIGNED_SHORT&&rt&&(J=rt.RGB16_EXT),k===i.SHORT&&rt&&(J=rt.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),y===i.RGBA){let et=st?sr:qt.getTransfer($);k===i.FLOAT&&(J=i.RGBA32F),k===i.HALF_FLOAT&&(J=i.RGBA16F),k===i.UNSIGNED_BYTE&&(J=et===ne?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&rt&&(J=rt.RGBA16_EXT),k===i.SHORT&&rt&&(J=rt.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function S(C,y){let k;return C?y===null||y===zn||y===Ls?k=i.DEPTH24_STENCIL8:y===mn?k=i.DEPTH32F_STENCIL8:y===Ps&&(k=i.DEPTH24_STENCIL8,It("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===zn||y===Ls?k=i.DEPTH_COMPONENT24:y===mn?k=i.DEPTH_COMPONENT32F:y===Ps&&(k=i.DEPTH_COMPONENT16),k}function b(C,y){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ee&&C.minFilter!==Ue?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function A(C){let y=C.target;y.removeEventListener("dispose",A),T(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&d.delete(y)}function x(C){let y=C.target;y.removeEventListener("dispose",x),P(y)}function T(C){let y=n.get(C);if(y.__webglInit===void 0)return;let k=C.source,X=p.get(k);if(X){let $=X[y.__cacheKey];$.usedTimes--,$.usedTimes===0&&R(C),Object.keys(X).length===0&&p.delete(k)}n.remove(C)}function R(C){let y=n.get(C);i.deleteTexture(y.__webglTexture);let k=C.source,X=p.get(k);delete X[y.__cacheKey],a.memory.textures--}function P(C){let y=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(y.__webglFramebuffer[X]))for(let $=0;$<y.__webglFramebuffer[X].length;$++)i.deleteFramebuffer(y.__webglFramebuffer[X][$]);else i.deleteFramebuffer(y.__webglFramebuffer[X]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[X])}else{if(Array.isArray(y.__webglFramebuffer))for(let X=0;X<y.__webglFramebuffer.length;X++)i.deleteFramebuffer(y.__webglFramebuffer[X]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let X=0;X<y.__webglColorRenderbuffer.length;X++)y.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[X]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let k=C.textures;for(let X=0,$=k.length;X<$;X++){let st=n.get(k[X]);st.__webglTexture&&(i.deleteTexture(st.__webglTexture),a.memory.textures--),n.remove(k[X])}n.remove(C)}let N=0;function B(){N=0}function L(){return N}function O(C){N=C}function G(){let C=N;return C>=s.maxTextures&&It("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),N+=1,C}function W(C){let y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function Q(C,y){let k=n.get(C);if(C.isVideoTexture&&F(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){let X=C.image;if(X===null)It("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)It("WebGLRenderer: Texture marked for update but image is incomplete");else{yt(k,C,y);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+y)}function Y(C,y){let k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){yt(k,C,y);return}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+y)}function K(C,y){let k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){yt(k,C,y);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+y)}function nt(C,y){let k=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&k.__version!==C.version){Ot(k,C,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+y)}let vt={[Aa]:i.REPEAT,[wn]:i.CLAMP_TO_EDGE,[Ra]:i.MIRRORED_REPEAT},_t={[Ee]:i.NEAREST,[Qh]:i.NEAREST_MIPMAP_NEAREST,[Rr]:i.NEAREST_MIPMAP_LINEAR,[Ue]:i.LINEAR,[no]:i.LINEAR_MIPMAP_NEAREST,[Li]:i.LINEAR_MIPMAP_LINEAR},ae={[nu]:i.NEVER,[ou]:i.ALWAYS,[iu]:i.LESS,[ko]:i.LEQUAL,[su]:i.EQUAL,[Ho]:i.GEQUAL,[ru]:i.GREATER,[au]:i.NOTEQUAL};function Wt(C,y){if(y.type===mn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Ue||y.magFilter===no||y.magFilter===Rr||y.magFilter===Li||y.minFilter===Ue||y.minFilter===no||y.minFilter===Rr||y.minFilter===Li)&&It("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,vt[y.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,vt[y.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,vt[y.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,_t[y.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,_t[y.minFilter]),y.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,ae[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ee||y.minFilter!==Rr&&y.minFilter!==Li||y.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Kt(C,y){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",A));let X=y.source,$=p.get(X);$===void 0&&($={},p.set(X,$));let st=W(y);if(st!==C.__cacheKey){$[st]===void 0&&($[st]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),$[st].usedTimes++;let rt=$[C.__cacheKey];rt!==void 0&&($[C.__cacheKey].usedTimes--,rt.usedTimes===0&&R(y)),C.__cacheKey=st,C.__webglTexture=$[st].texture}return k}function Z(C,y,k){return Math.floor(Math.floor(C/k)/y)}function tt(C,y,k,X){let st=C.updateRanges;if(st.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,k,X,y.data);else{st.sort((Tt,ht)=>Tt.start-ht.start);let rt=0;for(let Tt=1;Tt<st.length;Tt++){let ht=st[rt],ot=st[Tt],At=ht.start+ht.count,Nt=Z(ot.start,y.width,4),Ht=Z(ht.start,y.width,4);ot.start<=At+1&&Nt===Ht&&Z(ot.start+ot.count-1,y.width,4)===Nt?ht.count=Math.max(ht.count,ot.start+ot.count-ht.start):(++rt,st[rt]=ot)}st.length=rt+1;let J=e.getParameter(i.UNPACK_ROW_LENGTH),et=e.getParameter(i.UNPACK_SKIP_PIXELS),at=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Tt=0,ht=st.length;Tt<ht;Tt++){let ot=st[Tt],At=Math.floor(ot.start/4),Nt=Math.ceil(ot.count/4),Ht=At%y.width,U=Math.floor(At/y.width),lt=Nt,j=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Ht),e.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,Ht,U,lt,j,k,X,y.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,J),e.pixelStorei(i.UNPACK_SKIP_PIXELS,et),e.pixelStorei(i.UNPACK_SKIP_ROWS,at)}}function yt(C,y,k){let X=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(X=i.TEXTURE_3D);let $=Kt(C,y),st=y.source;e.bindTexture(X,C.__webglTexture,i.TEXTURE0+k);let rt=n.get(st);if(st.version!==rt.__version||$===!0){if(e.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let j=qt.getPrimaries(qt.workingColorSpace),ct=y.colorSpace===hi?null:qt.getPrimaries(y.colorSpace),pt=y.colorSpace===hi||j===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt)}e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let et=m(y.image,!1,s.maxTextureSize);et=$e(y,et);let at=r.convert(y.format,y.colorSpace),Tt=r.convert(y.type),ht=v(y.internalFormat,at,Tt,y.normalized,y.colorSpace,y.isVideoTexture);Wt(X,y);let ot,At=y.mipmaps,Nt=y.isVideoTexture!==!0,Ht=rt.__version===void 0||$===!0,U=st.dataReady,lt=b(y,et);if(y.isDepthTexture)ht=S(y.format===Ni,y.type),Ht&&(Nt?e.texStorage2D(i.TEXTURE_2D,1,ht,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,ht,et.width,et.height,0,at,Tt,null));else if(y.isDataTexture)if(At.length>0){Nt&&Ht&&e.texStorage2D(i.TEXTURE_2D,lt,ht,At[0].width,At[0].height);for(let j=0,ct=At.length;j<ct;j++)ot=At[j],Nt?U&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ot.width,ot.height,at,Tt,ot.data):e.texImage2D(i.TEXTURE_2D,j,ht,ot.width,ot.height,0,at,Tt,ot.data);y.generateMipmaps=!1}else Nt?(Ht&&e.texStorage2D(i.TEXTURE_2D,lt,ht,et.width,et.height),U&&tt(y,et,at,Tt)):e.texImage2D(i.TEXTURE_2D,0,ht,et.width,et.height,0,at,Tt,et.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Nt&&Ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,ht,At[0].width,At[0].height,et.depth);for(let j=0,ct=At.length;j<ct;j++)if(ot=At[j],y.format!==ln)if(at!==null)if(Nt){if(U)if(y.layerUpdates.size>0){let pt=ac(ot.width,ot.height,y.format,y.type);for(let it of y.layerUpdates){let Rt=ot.data.subarray(it*pt/ot.data.BYTES_PER_ELEMENT,(it+1)*pt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,it,ot.width,ot.height,1,at,Rt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,ot.width,ot.height,et.depth,at,ot.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,ht,ot.width,ot.height,et.depth,0,ot.data,0,0);else It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,ot.width,ot.height,et.depth,at,Tt,ot.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,ht,ot.width,ot.height,et.depth,0,at,Tt,ot.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Nt&&Ht&&e.texStorage2D(i.TEXTURE_2D,lt,ht,At[0].width,At[0].height);for(let j=0,ct=At.length;j<ct;j++)ot=At[j],y.format!==ln?at!==null?Nt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,ot.width,ot.height,at,ot.data):e.compressedTexImage2D(i.TEXTURE_2D,j,ht,ot.width,ot.height,0,ot.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?U&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ot.width,ot.height,at,Tt,ot.data):e.texImage2D(i.TEXTURE_2D,j,ht,ot.width,ot.height,0,at,Tt,ot.data)}else if(y.isDataArrayTexture)if(Nt){if(Ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,ht,et.width,et.height,et.depth),U)if(y.layerUpdates.size>0){let j=ac(et.width,et.height,y.format,y.type);for(let ct of y.layerUpdates){let pt=et.data.subarray(ct*j/et.data.BYTES_PER_ELEMENT,(ct+1)*j/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ct,et.width,et.height,1,at,Tt,pt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,at,Tt,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ht,et.width,et.height,et.depth,0,at,Tt,et.data);else if(y.isData3DTexture)Nt?(Ht&&e.texStorage3D(i.TEXTURE_3D,lt,ht,et.width,et.height,et.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,at,Tt,et.data)):e.texImage3D(i.TEXTURE_3D,0,ht,et.width,et.height,et.depth,0,at,Tt,et.data);else if(y.isFramebufferTexture){if(Ht)if(Nt)e.texStorage2D(i.TEXTURE_2D,lt,ht,et.width,et.height);else{let j=et.width,ct=et.height;for(let pt=0;pt<lt;pt++)e.texImage2D(i.TEXTURE_2D,pt,ht,j,ct,0,at,Tt,null),j>>=1,ct>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let j=i.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),et.parentNode!==j){j.appendChild(et),d.add(y),j.onpaint=ct=>{let pt=ct.changedElements;for(let it of d)pt.includes(it.image)&&(it.needsUpdate=!0)},j.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,et);else{let pt=i.RGBA,it=i.RGBA,Rt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,pt,it,Rt,et)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(At.length>0){if(Nt&&Ht){let j=oe(At[0]);e.texStorage2D(i.TEXTURE_2D,lt,ht,j.width,j.height)}for(let j=0,ct=At.length;j<ct;j++)ot=At[j],Nt?U&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,at,Tt,ot):e.texImage2D(i.TEXTURE_2D,j,ht,at,Tt,ot);y.generateMipmaps=!1}else if(Nt){if(Ht){let j=oe(et);e.texStorage2D(i.TEXTURE_2D,lt,ht,j.width,j.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,at,Tt,et)}else e.texImage2D(i.TEXTURE_2D,0,ht,at,Tt,et);f(y)&&M(X),rt.__version=st.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Ot(C,y,k){if(y.image.length!==6)return;let X=Kt(C,y),$=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+k);let st=n.get($);if($.version!==st.__version||X===!0){e.activeTexture(i.TEXTURE0+k);let rt=qt.getPrimaries(qt.workingColorSpace),J=y.colorSpace===hi?null:qt.getPrimaries(y.colorSpace),et=y.colorSpace===hi||rt===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let at=y.isCompressedTexture||y.image[0].isCompressedTexture,Tt=y.image[0]&&y.image[0].isDataTexture,ht=[];for(let it=0;it<6;it++)!at&&!Tt?ht[it]=m(y.image[it],!0,s.maxCubemapSize):ht[it]=Tt?y.image[it].image:y.image[it],ht[it]=$e(y,ht[it]);let ot=ht[0],At=r.convert(y.format,y.colorSpace),Nt=r.convert(y.type),Ht=v(y.internalFormat,At,Nt,y.normalized,y.colorSpace),U=y.isVideoTexture!==!0,lt=st.__version===void 0||X===!0,j=$.dataReady,ct=b(y,ot);Wt(i.TEXTURE_CUBE_MAP,y);let pt;if(at){U&&lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ct,Ht,ot.width,ot.height);for(let it=0;it<6;it++){pt=ht[it].mipmaps;for(let Rt=0;Rt<pt.length;Rt++){let bt=pt[Rt];y.format!==ln?At!==null?U?j&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt,0,0,bt.width,bt.height,At,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt,Ht,bt.width,bt.height,0,bt.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt,0,0,bt.width,bt.height,At,Nt,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt,Ht,bt.width,bt.height,0,At,Nt,bt.data)}}}else{if(pt=y.mipmaps,U&&lt){pt.length>0&&ct++;let it=oe(ht[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ct,Ht,it.width,it.height)}for(let it=0;it<6;it++)if(Tt){U?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,ht[it].width,ht[it].height,At,Nt,ht[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Ht,ht[it].width,ht[it].height,0,At,Nt,ht[it].data);for(let Rt=0;Rt<pt.length;Rt++){let me=pt[Rt].image[it].image;U?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt+1,0,0,me.width,me.height,At,Nt,me.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt+1,Ht,me.width,me.height,0,At,Nt,me.data)}}else{U?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,At,Nt,ht[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Ht,At,Nt,ht[it]);for(let Rt=0;Rt<pt.length;Rt++){let bt=pt[Rt];U?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt+1,0,0,At,Nt,bt.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt+1,Ht,At,Nt,bt.image[it])}}}f(y)&&M(i.TEXTURE_CUBE_MAP),st.__version=$.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function gt(C,y,k,X,$,st){let rt=r.convert(k.format,k.colorSpace),J=r.convert(k.type),et=v(k.internalFormat,rt,J,k.normalized,k.colorSpace),at=n.get(y),Tt=n.get(k);if(Tt.__renderTarget=y,!at.__hasExternalTextures){let ht=Math.max(1,y.width>>st),ot=Math.max(1,y.height>>st);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,st,et,ht,ot,y.depth,0,rt,J,null):e.texImage2D($,st,et,ht,ot,0,rt,J,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),Le(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,$,Tt.__webglTexture,0,Se(y)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,$,Tt.__webglTexture,st),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(C,y,k){if(i.bindRenderbuffer(i.RENDERBUFFER,C),y.depthBuffer){let X=y.depthTexture,$=X&&X.isDepthTexture?X.type:null,st=S(y.stencilBuffer,$),rt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Le(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se(y),st,y.width,y.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se(y),st,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,st,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,rt,i.RENDERBUFFER,C)}else{let X=y.textures;for(let $=0;$<X.length;$++){let st=X[$],rt=r.convert(st.format,st.colorSpace),J=r.convert(st.type),et=v(st.internalFormat,rt,J,st.normalized,st.colorSpace);Le(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se(y),et,y.width,y.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se(y),et,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,et,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Be(C,y,k){let X=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let $=n.get(y.depthTexture);if($.__renderTarget=y,(!$.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X){if($.__webglInit===void 0&&($.__webglInit=!0,y.depthTexture.addEventListener("dispose",A)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Wt(i.TEXTURE_CUBE_MAP,y.depthTexture);let at=r.convert(y.depthTexture.format),Tt=r.convert(y.depthTexture.type),ht;y.depthTexture.format===Yn?ht=i.DEPTH_COMPONENT24:y.depthTexture.format===Ni&&(ht=i.DEPTH24_STENCIL8);for(let ot=0;ot<6;ot++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ht,y.width,y.height,0,at,Tt,null)}}else Q(y.depthTexture,0);let st=$.__webglTexture,rt=Se(y),J=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,et=y.depthTexture.format===Ni?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===Yn)Le(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,J,st,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,et,J,st,0);else if(y.depthTexture.format===Ni)Le(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,J,st,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,et,J,st,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Yt(C){let y=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){let X=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),X){let $=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,X.removeEventListener("dispose",$)};X.addEventListener("dispose",$),y.__depthDisposeCallback=$}y.__boundDepthTexture=X}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(k)for(let X=0;X<6;X++)Be(y.__webglFramebuffer[X],C,X);else{let X=C.texture.mipmaps;X&&X.length>0?Be(y.__webglFramebuffer[0],C,0):Be(y.__webglFramebuffer,C,0)}else if(k){y.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[X]),y.__webglDepthbuffer[X]===void 0)y.__webglDepthbuffer[X]=i.createRenderbuffer(),Xt(y.__webglDepthbuffer[X],C,!1);else{let $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=y.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,st)}}else{let X=C.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Xt(y.__webglDepthbuffer,C,!1);else{let $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,st)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(C,y,k){let X=n.get(C);y!==void 0&&gt(X.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Yt(C)}function pe(C){let y=C.texture,k=n.get(C),X=n.get(y);C.addEventListener("dispose",x);let $=C.textures,st=C.isWebGLCubeRenderTarget===!0,rt=$.length>1;if(rt||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=y.version,a.memory.textures++),st){k.__webglFramebuffer=[];for(let J=0;J<6;J++)if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[J]=[];for(let et=0;et<y.mipmaps.length;et++)k.__webglFramebuffer[J][et]=i.createFramebuffer()}else k.__webglFramebuffer[J]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let J=0;J<y.mipmaps.length;J++)k.__webglFramebuffer[J]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(rt)for(let J=0,et=$.length;J<et;J++){let at=n.get($[J]);at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Le(C)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let J=0;J<$.length;J++){let et=$[J];k.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[J]);let at=r.convert(et.format,et.colorSpace),Tt=r.convert(et.type),ht=v(et.internalFormat,at,Tt,et.normalized,et.colorSpace,C.isXRRenderTarget===!0),ot=Se(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,ht,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,k.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Xt(k.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(st){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Wt(i.TEXTURE_CUBE_MAP,y);for(let J=0;J<6;J++)if(y.mipmaps&&y.mipmaps.length>0)for(let et=0;et<y.mipmaps.length;et++)gt(k.__webglFramebuffer[J][et],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,et);else gt(k.__webglFramebuffer[J],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);f(y)&&M(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){for(let J=0,et=$.length;J<et;J++){let at=$[J],Tt=n.get(at),ht=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ht=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,Tt.__webglTexture),Wt(ht,at),gt(k.__webglFramebuffer,C,at,i.COLOR_ATTACHMENT0+J,ht,0),f(at)&&M(ht)}e.unbindTexture()}else{let J=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(J=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(J,X.__webglTexture),Wt(J,y),y.mipmaps&&y.mipmaps.length>0)for(let et=0;et<y.mipmaps.length;et++)gt(k.__webglFramebuffer[et],C,y,i.COLOR_ATTACHMENT0,J,et);else gt(k.__webglFramebuffer,C,y,i.COLOR_ATTACHMENT0,J,0);f(y)&&M(J),e.unbindTexture()}C.depthBuffer&&Yt(C)}function $t(C){let y=C.textures;for(let k=0,X=y.length;k<X;k++){let $=y[k];if(f($)){let st=E(C),rt=n.get($).__webglTexture;e.bindTexture(st,rt),M(st),e.unbindTexture()}}}let ye=[],Ge=[];function fn(C){if(C.samples>0){if(Le(C)===!1){let y=C.textures,k=C.width,X=C.height,$=i.COLOR_BUFFER_BIT,st=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=n.get(C),J=y.length>1;if(J)for(let at=0;at<y.length;at++)e.bindFramebuffer(i.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,rt.__webglMultisampledFramebuffer);let et=C.texture.mipmaps;et&&et.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,rt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let at=0;at<y.length;at++){if(C.resolveDepthBuffer&&(C.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,rt.__webglColorRenderbuffer[at]);let Tt=n.get(y[at]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Tt,0)}i.blitFramebuffer(0,0,k,X,0,0,k,X,$,i.NEAREST),l===!0&&(ye.length=0,Ge.length=0,ye.push(i.COLOR_ATTACHMENT0+at),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(ye.push(st),Ge.push(st),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ge)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ye))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let at=0;at<y.length;at++){e.bindFramebuffer(i.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,rt.__webglColorRenderbuffer[at]);let Tt=n.get(y[at]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,Tt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,rt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Se(C){return Math.min(s.maxSamples,C.samples)}function Le(C){let y=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function F(C){let y=a.render.frame;h.get(C)!==y&&(h.set(C,y),C.update())}function $e(C,y){let k=C.colorSpace,X=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==ir&&k!==hi&&(qt.getTransfer(k)===ne?(X!==ln||$!==on)&&It("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Dt("WebGLTextures: Unsupported texture color space:",k)),y}function oe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=B,this.getTextureUnits=L,this.setTextureUnits=O,this.setTexture2D=Q,this.setTexture2DArray=Y,this.setTexture3D=K,this.setTextureCube=nt,this.rebindTextures=ee,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=fn,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=Le,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Hx(i,t){function e(n,s=hi){let r,a=qt.getTransfer(s);if(n===on)return i.UNSIGNED_BYTE;if(n===so)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ro)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$l)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Jl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yl)return i.BYTE;if(n===Zl)return i.SHORT;if(n===Ps)return i.UNSIGNED_SHORT;if(n===io)return i.INT;if(n===zn)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===Te)return i.HALF_FLOAT;if(n===Kl)return i.ALPHA;if(n===Ql)return i.RGB;if(n===ln)return i.RGBA;if(n===Yn)return i.DEPTH_COMPONENT;if(n===Ni)return i.DEPTH_STENCIL;if(n===Qi)return i.RED;if(n===ao)return i.RED_INTEGER;if(n===Di)return i.RG;if(n===oo)return i.RG_INTEGER;if(n===lo)return i.RGBA_INTEGER;if(n===Cr||n===Ir||n===Pr||n===Lr)if(a===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Cr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Cr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===co||n===ho||n===uo||n===fo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===co)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ho)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===uo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===po||n===mo||n===go||n===xo||n===vo||n===Nr||n===_o)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===po||n===mo)return a===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===go)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===xo)return r.COMPRESSED_R11_EAC;if(n===vo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Nr)return r.COMPRESSED_RG11_EAC;if(n===_o)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===yo||n===Mo||n===So||n===bo||n===wo||n===Eo||n===To||n===Ao||n===Ro||n===Co||n===Io||n===Po||n===Lo||n===No)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===yo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Mo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===So)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===bo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===wo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Eo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===To)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ao)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ro)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Co)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Io)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Po)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Lo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===No)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Do||n===Uo||n===Fo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Do)return a===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Uo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Bo||n===Oo||n===Dr||n===zo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Bo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Dr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ls?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}function Xx(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,ic(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,E,v){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,M,E):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ye&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ye&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let M=t.get(f),E=M.envMap,v=M.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(Wx.makeRotationFromEuler(v)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Gu),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=E*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ye&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){let M=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function qx(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,S){let b=S.program;n.uniformBlockBinding(v,b)}function c(v,S){let b=s[v.id];b===void 0&&(m(v),b=h(v),s[v.id]=b,v.addEventListener("dispose",M));let A=S.program;n.updateUBOMapping(v,A);let x=t.render.frame;r[v.id]!==x&&(u(v),r[v.id]=x)}function h(v){let S=d();v.__bindingPointIndex=S;let b=i.createBuffer(),A=v.__size,x=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,A,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,b),b}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Dt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let S=s[v.id],b=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let x=0,T=b.length;x<T;x++){let R=b[x];if(Array.isArray(R))for(let P=0,N=R.length;P<N;P++)p(R[P],x,P,A);else p(R,x,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,S,b,A){if(_(v,S,b,A)===!0){let x=v.__offset,T=v.value;if(Array.isArray(T)){let R=0;for(let P=0;P<T.length;P++){let N=T[P],B=f(N);g(N,v.__data,R),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(R+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,v.__data)}}function g(v,S,b){typeof v=="number"||typeof v=="boolean"?S[0]=v:v.isMatrix3?(S[0]=v.elements[0],S[1]=v.elements[1],S[2]=v.elements[2],S[3]=0,S[4]=v.elements[3],S[5]=v.elements[4],S[6]=v.elements[5],S[7]=0,S[8]=v.elements[6],S[9]=v.elements[7],S[10]=v.elements[8],S[11]=0):ArrayBuffer.isView(v)?S.set(new v.constructor(v.buffer,v.byteOffset,S.length)):v.toArray(S,b)}function _(v,S,b,A){let x=v.value,T=S+"_"+b;if(A[T]===void 0)return typeof x=="number"||typeof x=="boolean"?A[T]=x:ArrayBuffer.isView(x)?A[T]=x.slice():A[T]=x.clone(),!0;{let R=A[T];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return A[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function m(v){let S=v.uniforms,b=0,A=16;for(let T=0,R=S.length;T<R;T++){let P=Array.isArray(S[T])?S[T]:[S[T]];for(let N=0,B=P.length;N<B;N++){let L=P[N],O=Array.isArray(L.value)?L.value:[L.value];for(let G=0,W=O.length;G<W;G++){let Q=O[G],Y=f(Q),K=b%A,nt=K%Y.boundary,vt=K+nt;b+=nt,vt!==0&&A-vt<Y.storage&&(b+=A-vt),L.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=Y.storage}}}let x=b%A;return x>0&&(b+=A-x),v.__size=b,v.__cache={},this}function f(v){let S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=48,S.storage=48):v.isMatrix4?(S.boundary=64,S.storage=64):v.isTexture?It("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(S.boundary=16,S.storage=v.byteLength):It("WebGLRenderer: Unsupported uniform value type.",v),S}function M(v){let S=v.target;S.removeEventListener("dispose",M);let b=a.indexOf(S.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function E(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:E}}function Zx(){return $n===null&&($n=new ai(Yx,16,16,Di,Te),$n.name="DFG_LUT",$n.minFilter=Ue,$n.magFilter=Ue,$n.wrapS=wn,$n.wrapT=wn,$n.generateMipmaps=!1,$n.needsUpdate=!0),$n}var op,lp,cp,hp,up,fp,dp,pp,mp,gp,xp,vp,_p,yp,Mp,Sp,bp,wp,Ep,Tp,Ap,Rp,Cp,Ip,Pp,Lp,Np,Dp,Up,Fp,Bp,Op,zp,kp,Hp,Vp,Gp,Wp,Xp,qp,Yp,Zp,$p,Jp,Kp,Qp,jp,tm,em,nm,im,sm,rm,am,om,lm,cm,hm,um,fm,dm,pm,mm,gm,xm,vm,_m,ym,Mm,Sm,bm,wm,Em,Tm,Am,Rm,Cm,Im,Pm,Lm,Nm,Dm,Um,Fm,Bm,Om,zm,km,Hm,Vm,Gm,Wm,Xm,qm,Ym,Zm,$m,Jm,Km,Qm,jm,t0,e0,n0,i0,s0,r0,a0,o0,l0,c0,h0,u0,f0,d0,p0,m0,g0,x0,v0,_0,y0,M0,S0,b0,w0,E0,T0,A0,R0,C0,I0,P0,L0,N0,D0,U0,F0,B0,O0,z0,k0,Gt,ut,Jn,Vo,H0,Ou,Fs,Y0,Z0,$0,Ur,gu,dc,pc,mc,gc,J0,ts,Wo,Xo,og,zu,_c,ku,Hu,Vu,yu,Mu,Su,bu,wu,yc,Mc,Sc,xc,Bs,Jg,Kg,Au,ex,Go,ox,lx,hx,fx,px,gx,vx,Sx,wc,Ec,Ix,Dx,Ux,Fx,Bx,Fu,Fr,vc,Vx,Gx,Tc,Ac,Wx,Gu,Yx,$n,qo,Ie=ce(()=>{fc();fc();op=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,cp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,up=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,gp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_p=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Mp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ip=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Lp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Op=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,kp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$p=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,jp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,tm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,em=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,im=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,am=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,om=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,hm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,um=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_m=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ym=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Mm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,wm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Em=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Tm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Im=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Um=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Bm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Om=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,km=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Wm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Xm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ym=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$m=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Km=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,t0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,e0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,n0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,i0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,r0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,a0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,o0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,l0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,f0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,p0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,m0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,g0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,x0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,v0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,y0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,M0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,S0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,T0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,R0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,C0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,L0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,D0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,F0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,B0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,O0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,z0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,k0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gt={alphahash_fragment:op,alphahash_pars_fragment:lp,alphamap_fragment:cp,alphamap_pars_fragment:hp,alphatest_fragment:up,alphatest_pars_fragment:fp,aomap_fragment:dp,aomap_pars_fragment:pp,batching_pars_vertex:mp,batching_vertex:gp,begin_vertex:xp,beginnormal_vertex:vp,bsdfs:_p,iridescence_fragment:yp,bumpmap_pars_fragment:Mp,clipping_planes_fragment:Sp,clipping_planes_pars_fragment:bp,clipping_planes_pars_vertex:wp,clipping_planes_vertex:Ep,color_fragment:Tp,color_pars_fragment:Ap,color_pars_vertex:Rp,color_vertex:Cp,common:Ip,cube_uv_reflection_fragment:Pp,defaultnormal_vertex:Lp,displacementmap_pars_vertex:Np,displacementmap_vertex:Dp,emissivemap_fragment:Up,emissivemap_pars_fragment:Fp,colorspace_fragment:Bp,colorspace_pars_fragment:Op,envmap_fragment:zp,envmap_common_pars_fragment:kp,envmap_pars_fragment:Hp,envmap_pars_vertex:Vp,envmap_physical_pars_fragment:jp,envmap_vertex:Gp,fog_vertex:Wp,fog_pars_vertex:Xp,fog_fragment:qp,fog_pars_fragment:Yp,gradientmap_pars_fragment:Zp,lightmap_pars_fragment:$p,lights_lambert_fragment:Jp,lights_lambert_pars_fragment:Kp,lights_pars_begin:Qp,lights_toon_fragment:tm,lights_toon_pars_fragment:em,lights_phong_fragment:nm,lights_phong_pars_fragment:im,lights_physical_fragment:sm,lights_physical_pars_fragment:rm,lights_fragment_begin:am,lights_fragment_maps:om,lights_fragment_end:lm,lightprobes_pars_fragment:cm,logdepthbuf_fragment:hm,logdepthbuf_pars_fragment:um,logdepthbuf_pars_vertex:fm,logdepthbuf_vertex:dm,map_fragment:pm,map_pars_fragment:mm,map_particle_fragment:gm,map_particle_pars_fragment:xm,metalnessmap_fragment:vm,metalnessmap_pars_fragment:_m,morphinstance_vertex:ym,morphcolor_vertex:Mm,morphnormal_vertex:Sm,morphtarget_pars_vertex:bm,morphtarget_vertex:wm,normal_fragment_begin:Em,normal_fragment_maps:Tm,normal_pars_fragment:Am,normal_pars_vertex:Rm,normal_vertex:Cm,normalmap_pars_fragment:Im,clearcoat_normal_fragment_begin:Pm,clearcoat_normal_fragment_maps:Lm,clearcoat_pars_fragment:Nm,iridescence_pars_fragment:Dm,opaque_fragment:Um,packing:Fm,premultiplied_alpha_fragment:Bm,project_vertex:Om,dithering_fragment:zm,dithering_pars_fragment:km,roughnessmap_fragment:Hm,roughnessmap_pars_fragment:Vm,shadowmap_pars_fragment:Gm,shadowmap_pars_vertex:Wm,shadowmap_vertex:Xm,shadowmask_pars_fragment:qm,skinbase_vertex:Ym,skinning_pars_vertex:Zm,skinning_vertex:$m,skinnormal_vertex:Jm,specularmap_fragment:Km,specularmap_pars_fragment:Qm,tonemapping_fragment:jm,tonemapping_pars_fragment:t0,transmission_fragment:e0,transmission_pars_fragment:n0,uv_pars_fragment:i0,uv_pars_vertex:s0,uv_vertex:r0,worldpos_vertex:a0,background_vert:o0,background_frag:l0,backgroundCube_vert:c0,backgroundCube_frag:h0,cube_vert:u0,cube_frag:f0,depth_vert:d0,depth_frag:p0,distance_vert:m0,distance_frag:g0,equirect_vert:x0,equirect_frag:v0,linedashed_vert:_0,linedashed_frag:y0,meshbasic_vert:M0,meshbasic_frag:S0,meshlambert_vert:b0,meshlambert_frag:w0,meshmatcap_vert:E0,meshmatcap_frag:T0,meshnormal_vert:A0,meshnormal_frag:R0,meshphong_vert:C0,meshphong_frag:I0,meshphysical_vert:P0,meshphysical_frag:L0,meshtoon_vert:N0,meshtoon_frag:D0,points_vert:U0,points_frag:F0,shadow_vert:B0,shadow_frag:O0,sprite_vert:z0,sprite_frag:k0},ut={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},Jn={basic:{uniforms:en([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:en([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Pt(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:en([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:en([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:en([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:en([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:en([ut.points,ut.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:en([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:en([ut.common,ut.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:en([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:en([ut.sprite,ut.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:en([ut.common,ut.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:en([ut.lights,ut.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};Jn.physical={uniforms:en([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};Vo={r:0,b:0,g:0},H0=new jt,Ou=new Bt;Ou.set(-1,0,0,0,1,0,0,0,1);Fs=4,Y0=6,Z0=20,$0=256,Ur=new li,gu=new Pt,dc=null,pc=0,mc=0,gc=!1,J0=new I,ts=new I,Wo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=J0}=r;dc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_u(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(dc,pc,mc),this._renderer.xr.enabled=gc,t.scissorTest=!1,Us(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pi||t.mapping===Ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),dc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ue,minFilter:Ue,generateMipmaps:!1,type:Te,format:ln,colorSpace:ir,depthBuffer:!1},s=xu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xu(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=K0(r)),this._blurMaterial=j0(r,t,e),this._ggxMaterial=Q0(r,t,e)}return s}_compileMaterial(t){let e=new ue(new ie,t);this._renderer.compile(e,Ur)}_sceneToCubeUV(t,e,n,s,r){let l=new je(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(gu),d.toneMapping=On,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ue(new An,new Xi({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,f=!1,M=t.background;M?M.isColor&&(m.color.copy(M),t.background=null,f=!0):(m.color.copy(gu),f=!0);for(let E=0;E<6;E++){let v=E%3;v===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):v===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));let S=this._cubeSize;Us(s,v*S,E>2?S:0,S,S),d.setRenderTarget(s),f&&d.render(_,l),d.render(t,l)}d.toneMapping=p,d.autoClear=u,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Pi||t.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_u()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Us(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ur)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,p=d*u,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Fs?n-g+Fs:0),f=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=g-e,Us(r,m,f,3*_,2*_),s.setRenderTarget(r),s.render(o,Ur),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Us(t,m,f,3*_,2*_),s.setRenderTarget(t),s.render(o,Ur)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-Fs?s-this._lodMax+Fs:0),u=4*(this._cubeSize-h);Us(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(l,Ur)}};Xo=class extends Me{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new pr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new An(5,5,5),r=new Ft({name:"CubemapFromEquirect",uniforms:ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:Rn});r.uniforms.tEquirect.value=e;let a=new ue(s,r),o=e.minFilter;return e.minFilter===Li&&(e.minFilter=Ue),new Ka(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};og={[Mr]:"LINEAR_TONE_MAPPING",[Sr]:"REINHARD_TONE_MAPPING",[br]:"CINEON_TONE_MAPPING",[Ji]:"ACES_FILMIC_TONE_MAPPING",[Er]:"AGX_TONE_MAPPING",[Tr]:"NEUTRAL_TONE_MAPPING",[wr]:"CUSTOM_TONE_MAPPING"};zu=new dn,_c=new Ti(1,1),ku=new or,Hu=new La,Vu=new pr,yu=[],Mu=[],Su=new Float32Array(16),bu=new Float32Array(9),wu=new Float32Array(4);yc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Rg(e.type)}},Mc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Zg(e.type)}},Sc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},xc=/(\w+)(\])?(\[|\.)?/g;Bs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);$g(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};Jg=37297,Kg=0;Au=new Bt;ex={[Mr]:"Linear",[Sr]:"Reinhard",[br]:"Cineon",[Ji]:"ACESFilmic",[Er]:"AgX",[Tr]:"Neutral",[wr]:"Custom"};Go=new I;ox=/^[ \t]*#include +<([\w\d./]+)>/gm;lx=new Map;hx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;fx={[yr]:"SHADOWMAP_TYPE_PCF",[Cs]:"SHADOWMAP_TYPE_VSM"};px={[Pi]:"ENVMAP_TYPE_CUBE",[Ki]:"ENVMAP_TYPE_CUBE",[Ar]:"ENVMAP_TYPE_CUBE_UV"};gx={[Ki]:"ENVMAP_MODE_REFRACTION"};vx={[Xl]:"ENVMAP_BLENDING_MULTIPLY",[Jh]:"ENVMAP_BLENDING_MIX",[Kh]:"ENVMAP_BLENDING_ADD"};Sx=0,wc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ec(t),e.set(t,n)),n}},Ec=class{constructor(t){this.id=Sx++,this.code=t,this.usedTimes=0}};Ix=0;Dx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ux=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Fx=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],Bx=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Fu=new jt,Fr=new I,vc=new I;Vx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Tc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new mr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ft({vertexShader:Vx,fragmentShader:Gx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ue(new oi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ac=class extends Zn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null,_=typeof XRWebGLBinding<"u",m=new Tc,f={},M=e.getContextAttributes(),E=null,v=null,S=[],b=[],A=new Ct,x=null,T=null,R=new je;R.viewport=new _e;let P=new je;P.viewport=new _e;let N=[R,P],B=new Qa,L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let tt=S[Z];return tt===void 0&&(tt=new Es,S[Z]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(Z){let tt=S[Z];return tt===void 0&&(tt=new Es,S[Z]=tt),tt.getGripSpace()},this.getHand=function(Z){let tt=S[Z];return tt===void 0&&(tt=new Es,S[Z]=tt),tt.getHandSpace()};function G(Z){let tt=b.indexOf(Z.inputSource);if(tt===-1)return;let yt=S[tt];yt!==void 0&&(yt.update(Z.inputSource,Z.frame,c||a),yt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Q);for(let Z=0;Z<S.length;Z++){let tt=b[Z];tt!==null&&(b[Z]=null,S[Z].disconnect(tt))}L=null,O=null,m.reset();for(let Z in f)delete f[Z];if(t.setRenderTarget(E),p=null,u=null,d=null,s=null,v=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(A.width,A.height,!1),T!==null){let Z=T.camera;Z.fov=T.fov,Z.zoom=T.zoom,Z.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&It("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&It("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Q),M.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Ot=null,gt=null;M.depth&&(gt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=M.stencil?Ni:Yn,Ot=M.stencil?Ls:zn);let Xt={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Xt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new Me(u.textureWidth,u.textureHeight,{format:ln,type:on,depthTexture:new Ti(u.textureWidth,u.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let yt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new Me(p.framebufferWidth,p.framebufferHeight,{format:ln,type:on,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Kt.setContext(s),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(Z){for(let tt=0;tt<Z.removed.length;tt++){let yt=Z.removed[tt],Ot=b.indexOf(yt);Ot>=0&&(b[Ot]=null,S[Ot].disconnect(yt))}for(let tt=0;tt<Z.added.length;tt++){let yt=Z.added[tt],Ot=b.indexOf(yt);if(Ot===-1){for(let Xt=0;Xt<S.length;Xt++)if(Xt>=b.length){b.push(yt),Ot=Xt;break}else if(b[Xt]===null){b[Xt]=yt,Ot=Xt;break}if(Ot===-1)break}let gt=S[Ot];gt&&gt.connect(yt)}}let Y=new I,K=new I;function nt(Z,tt,yt){Y.setFromMatrixPosition(tt.matrixWorld),K.setFromMatrixPosition(yt.matrixWorld);let Ot=Y.distanceTo(K),gt=tt.projectionMatrix.elements,Xt=yt.projectionMatrix.elements,Be=gt[14]/(gt[10]-1),Yt=gt[14]/(gt[10]+1),ee=(gt[9]+1)/gt[5],pe=(gt[9]-1)/gt[5],$t=(gt[8]-1)/gt[0],ye=(Xt[8]+1)/Xt[0],Ge=Be*$t,fn=Be*ye,Se=Ot/(-$t+ye),Le=Se*-$t;if(tt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Le),Z.translateZ(Se),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),gt[10]===-1)Z.projectionMatrix.copy(tt.projectionMatrix),Z.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let F=Be+Se,$e=Yt+Se,oe=Ge-Le,C=fn+(Ot-Le),y=ee*Yt/$e*F,k=pe*Yt/$e*F;Z.projectionMatrix.makePerspective(oe,C,y,k,F,$e),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function vt(Z,tt){tt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(tt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let tt=Z.near,yt=Z.far;m.texture!==null&&(m.depthNear>0&&(tt=m.depthNear),m.depthFar>0&&(yt=m.depthFar)),B.near=P.near=R.near=tt,B.far=P.far=R.far=yt,(L!==B.near||O!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),L=B.near,O=B.far),B.layers.mask=Z.layers.mask|6,R.layers.mask=B.layers.mask&-5,P.layers.mask=B.layers.mask&-3;let Ot=Z.parent,gt=B.cameras;vt(B,Ot);for(let Xt=0;Xt<gt.length;Xt++)vt(gt[Xt],Ot);gt.length===2?nt(B,R,P):B.projectionMatrix.copy(R.projectionMatrix),T===null&&Z.isPerspectiveCamera&&(T={camera:Z,fov:Z.fov,zoom:Z.zoom}),_t(Z,B,Ot)};function _t(Z,tt,yt){yt===null?Z.matrix.copy(tt.matrixWorld):(Z.matrix.copy(yt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(tt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(tt.projectionMatrix),Z.projectionMatrixInverse.copy(tt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=bs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(Z){return f[Z]};let ae=null;function Wt(Z,tt){if(h=tt.getViewerPose(c||a),g=tt,h!==null){let yt=h.views;p!==null&&(t.setRenderTargetFramebuffer(v,p.framebuffer),t.setRenderTarget(v));let Ot=!1;yt.length!==B.cameras.length&&(B.cameras.length=0,Ot=!0);for(let Yt=0;Yt<yt.length;Yt++){let ee=yt[Yt],pe=null;if(p!==null)pe=p.getViewport(ee);else{let ye=d.getViewSubImage(u,ee);pe=ye.viewport,Yt===0&&(t.setRenderTargetTextures(v,ye.colorTexture,ye.depthStencilTexture),t.setRenderTarget(v))}let $t=N[Yt];$t===void 0&&($t=new je,$t.layers.enable(Yt),$t.viewport=new _e,N[Yt]=$t),$t.matrix.fromArray(ee.transform.matrix),$t.matrix.decompose($t.position,$t.quaternion,$t.scale),$t.projectionMatrix.fromArray(ee.projectionMatrix),$t.projectionMatrixInverse.copy($t.projectionMatrix).invert(),$t.viewport.set(pe.x,pe.y,pe.width,pe.height),Yt===0&&(B.matrix.copy($t.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ot===!0&&B.cameras.push($t)}let gt=s.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let Yt=d.getDepthInformation(yt[0]);Yt&&Yt.isValid&&Yt.texture&&m.init(Yt,s.renderState)}if(gt&&gt.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let Yt=0;Yt<yt.length;Yt++){let ee=yt[Yt].camera;if(ee){let pe=f[ee];pe||(pe=new mr,f[ee]=pe);let $t=d.getCameraImage(ee);pe.sourceTexture=$t}}}}for(let yt=0;yt<S.length;yt++){let Ot=b[yt],gt=S[yt];Ot!==null&&gt!==void 0&&gt.update(Ot,tt,c||a)}ae&&ae(Z,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}let Kt=new Bu;Kt.setAnimationLoop(Wt),this.setAnimationLoop=function(Z){ae=Z},this.dispose=function(){}}},Wx=new jt,Gu=new Bt;Gu.set(-1,0,0,0,1,0,0,0,1);Yx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$n=null;qo=class{constructor(t={}){let{canvas:e=cu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=on}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let _=p,m=new Set([lo,oo,ao]),f=new Set([on,zn,Ps,Ls,so,ro]),M=new Uint32Array(4),E=new Int32Array(4),v=new I,S=null,b=null,A=[],x=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,N=null,B=null,L=null,O=null;this._outputColorSpace=rn;let G=0,W=0,Q=null,Y=-1,K=null,nt=new _e,vt=new _e,_t=null,ae=new Pt(0),Wt=0,Kt=e.width,Z=e.height,tt=1,yt=null,Ot=null,gt=new _e(0,0,Kt,Z),Xt=new _e(0,0,Kt,Z),Be=!1,Yt=new ur,ee=!1,pe=!1,$t=new jt,ye=new I,Ge=new _e,fn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Le(){return Q===null?tt:1}let F=n;function $e(w,D){return e.getContext(w,D)}let oe,C,y,k,X,$,st,rt,J,et,at,Tt,ht,ot,At,Nt,Ht,U,lt,j,ct,pt,it;try{let w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",me,!1),e.addEventListener("webglcontextrestored",se,!1),e.addEventListener("webglcontextcreationerror",Ln,!1),F===null){let D="webgl2";if(F=$e(D,w),F===null)throw $e(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Rt()}catch(w){throw e.removeEventListener("webglcontextlost",me,!1),e.removeEventListener("webglcontextrestored",se,!1),e.removeEventListener("webglcontextcreationerror",Ln,!1),Dt("WebGLRenderer: "+w.message),w}function Rt(){oe=new eg(F),oe.init(),ct=new Hx(F,oe),C=new X0(F,oe,t,ct),y=new zx(F,oe),C.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),B=F.createFramebuffer(),L=F.createFramebuffer(),O=F.createFramebuffer(),k=new sg(F),X=new Ex,$=new kx(F,oe,y,X,C,ct,k),st=new tg(R),rt=new ap(F),pt=new G0(F,rt),J=new ng(F,rt,k,pt),et=new ag(F,J,rt,pt,k),U=new rg(F,C,$),At=new q0(X),at=new wx(R,st,oe,C,pt,At),Tt=new Xx(R,X),ht=new Ax,ot=new Nx(oe),Ht=new V0(R,st,y,et,g,l),Nt=new Ox(R,et,C),it=new qx(F,k,C,y),lt=new W0(F,oe,k),j=new ig(F,oe,k),k.programs=at.programs,R.capabilities=C,R.extensions=oe,R.properties=X,R.renderLists=ht,R.shadowMap=Nt,R.state=y,R.info=k}_!==on&&(T=new lg(_,e.width,e.height,o,s,r));let bt=new Ac(R,F);this.xr=bt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let w=oe.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=oe.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(w){w!==void 0&&(tt=w,this.setSize(Kt,Z,!1))},this.getSize=function(w){return w.set(Kt,Z)},this.setSize=function(w,D,q=!0){if(bt.isPresenting){It("WebGLRenderer: Can't change size while VR device is presenting.");return}Kt=w,Z=D,e.width=Math.floor(w*tt),e.height=Math.floor(D*tt),q===!0&&(e.style.width=w+"px",e.style.height=D+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,w,D)},this.getDrawingBufferSize=function(w){return w.set(Kt*tt,Z*tt).floor()},this.setDrawingBufferSize=function(w,D,q){Kt=w,Z=D,tt=q,e.width=Math.floor(w*q),e.height=Math.floor(D*q),this.setViewport(0,0,w,D)},this.setEffects=function(w){if(_===on){Dt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let D=0;D<w.length;D++)if(w[D].isOutputPass===!0){It("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(nt)},this.getViewport=function(w){return w.copy(gt)},this.setViewport=function(w,D,q,H){w.isVector4?gt.set(w.x,w.y,w.z,w.w):gt.set(w,D,q,H),y.viewport(nt.copy(gt).multiplyScalar(tt).round())},this.getScissor=function(w){return w.copy(Xt)},this.setScissor=function(w,D,q,H){w.isVector4?Xt.set(w.x,w.y,w.z,w.w):Xt.set(w,D,q,H),y.scissor(vt.copy(Xt).multiplyScalar(tt).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(w){y.setScissorTest(Be=w)},this.setOpaqueSort=function(w){yt=w},this.setTransparentSort=function(w){Ot=w},this.getClearColor=function(w){return w.copy(Ht.getClearColor())},this.setClearColor=function(){Ht.setClearColor(...arguments)},this.getClearAlpha=function(){return Ht.getClearAlpha()},this.setClearAlpha=function(){Ht.setClearAlpha(...arguments)},this.clear=function(w=!0,D=!0,q=!0){let H=0;if(w){let V=!1;if(Q!==null){let dt=Q.texture.format;V=m.has(dt)}if(V){let dt=Q.texture.type,xt=f.has(dt),ft=Ht.getClearColor(),Mt=Ht.getClearAlpha(),wt=ft.r,Vt=ft.g,Zt=ft.b;xt?(M[0]=wt,M[1]=Vt,M[2]=Zt,M[3]=Mt,F.clearBufferuiv(F.COLOR,0,M)):(E[0]=wt,E[1]=Vt,E[2]=Zt,E[3]=Mt,F.clearBufferiv(F.COLOR,0,E))}else H|=F.COLOR_BUFFER_BIT}D&&(H|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),N=w},this.dispose=function(){e.removeEventListener("webglcontextlost",me,!1),e.removeEventListener("webglcontextrestored",se,!1),e.removeEventListener("webglcontextcreationerror",Ln,!1),Ht.dispose(),ht.dispose(),ot.dispose(),X.dispose(),st.dispose(),et.dispose(),pt.dispose(),it.dispose(),at.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",qc),bt.removeEventListener("sessionend",Yc),Oi.stop()};function me(w){w.preventDefault(),ec("WebGLRenderer: Context Lost."),P=!0}function se(){ec("WebGLRenderer: Context Restored."),P=!1;let w=k.autoReset,D=Nt.enabled,q=Nt.autoUpdate,H=Nt.needsUpdate,V=Nt.type;Rt(),k.autoReset=w,Nt.enabled=D,Nt.autoUpdate=q,Nt.needsUpdate=H,Nt.type=V}function Ln(w){Dt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Wn(w){let D=w.target;D.removeEventListener("dispose",Wn),Zf(D)}function Zf(w){$f(w),X.remove(w)}function $f(w){let D=X.get(w).programs;D!==void 0&&(D.forEach(function(q){at.releaseProgram(q)}),w.isShaderMaterial&&at.releaseShaderCache(w))}this.renderBufferDirect=function(w,D,q,H,V,dt){D===null&&(D=fn);let xt=V.isMesh&&V.matrixWorld.determinantAffine()<0,ft=Qf(w,D,q,H,V);y.setMaterial(H,xt);let Mt=q.index,wt=1;if(H.wireframe===!0){if(Mt=J.getWireframeAttribute(q),Mt===void 0)return;wt=2}let Vt=q.drawRange,Zt=q.attributes.position,St=Vt.start*wt,re=(Vt.start+Vt.count)*wt;dt!==null&&(St=Math.max(St,dt.start*wt),re=Math.min(re,(dt.start+dt.count)*wt)),Mt!==null?(St=Math.max(St,0),re=Math.min(re,Mt.count)):Zt!=null&&(St=Math.max(St,0),re=Math.min(re,Zt.count));let Ne=re-St;if(Ne<0||Ne===1/0)return;pt.setup(V,H,ft,q,Mt);let xe,fe=lt;if(Mt!==null&&(xe=rt.get(Mt),fe=j,fe.setIndex(xe)),V.isMesh)H.wireframe===!0?(y.setLineWidth(H.wireframeLinewidth*Le()),fe.setMode(F.LINES)):fe.setMode(F.TRIANGLES);else if(V.isLine){let Je=H.linewidth;Je===void 0&&(Je=1),y.setLineWidth(Je*Le()),V.isLineSegments?fe.setMode(F.LINES):V.isLineLoop?fe.setMode(F.LINE_LOOP):fe.setMode(F.LINE_STRIP)}else V.isPoints?fe.setMode(F.POINTS):V.isSprite&&fe.setMode(F.TRIANGLES);if(V.isBatchedMesh)if(oe.get("WEBGL_multi_draw"))fe.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let Je=V._multiDrawStarts,mt=V._multiDrawCounts,nn=V._multiDrawCount,te=Mt?rt.get(Mt).bytesPerElement:1,Sn=X.get(H).currentProgram.getUniforms();for(let Xn=0;Xn<nn;Xn++)Sn.setValue(F,"_gl_DrawID",Xn),fe.render(Je[Xn]/te,mt[Xn])}else if(V.isInstancedMesh)fe.renderInstances(St,Ne,V.count);else if(q.isInstancedBufferGeometry){let Je=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,mt=Math.min(q.instanceCount,Je);fe.renderInstances(St,Ne,mt)}else fe.render(St,Ne)};function Xc(w,D,q,H){N!==null&&w.isNodeMaterial&&N.setObject(H,w),ee===!0&&At.setState(w,q,!1),w.transparent===!0&&w.side===tn&&w.forceSinglePass===!1?(w.side=Ye,w.needsUpdate=!0,Yr(w,D,H),w.side=Ii,w.needsUpdate=!0,Yr(w,D,H),w.side=tn):Yr(w,D,H)}this.compile=function(w,D,q=null){q===null&&(q=w),N!==null&&N.renderStart(w,D,q),b=ot.get(q),b.init(D),x.push(b),q.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(b.pushLight(V),V.castShadow&&b.pushShadow(V))}),w!==q&&w.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(b.pushLight(V),V.castShadow&&b.pushShadow(V))}),b.setupLights(),N!==null&&N.updateLights(b.state.lightsArray),pe=this.localClippingEnabled,ee=At.init(this.clippingPlanes,pe),ee===!0&&At.setGlobalState(this.clippingPlanes,D),N!==null&&Nt.render(b.state.shadowsArray,q,D);let H=new Set;return w.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let dt=V.material;if(dt)if(Array.isArray(dt))for(let xt=0;xt<dt.length;xt++){let ft=dt[xt];Xc(ft,q,D,V),H.add(ft)}else Xc(dt,q,D,V),H.add(dt)}),b=x.pop(),N!==null&&N.renderEnd(),H},this.compileAsync=function(w,D,q=null){let H=this.compile(w,D,q);return new Promise(V=>{function dt(){if(H.forEach(function(xt){let Mt=X.get(xt).currentProgram;(Mt===void 0||Mt.isReady())&&H.delete(xt)}),H.size===0){V(w);return}setTimeout(dt,10)}oe.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let hl=null;function Jf(w){hl&&hl(w)}function qc(){Oi.stop()}function Yc(){Oi.start()}let Oi=new Bu;Oi.setAnimationLoop(Jf),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(w){hl=w,bt.setAnimationLoop(w),w===null?Oi.stop():Oi.start()},bt.addEventListener("sessionstart",qc),bt.addEventListener("sessionend",Yc),this.render=function(w,D){if(D!==void 0&&D.isCamera!==!0){Dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N!==null&&N.renderStart(w,D);let q=bt.enabled===!0&&bt.isPresenting===!0,H=T!==null&&(Q===null||q)&&T.begin(R,Q);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(D),D=bt.getCamera()),w.isScene===!0&&w.onBeforeRender(R,w,D,Q),b=ot.get(w,x.length),b.init(D),b.state.textureUnits=$.getTextureUnits(),x.push(b),$t.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Yt.setFromProjectionMatrix($t,Bn,D.reversedDepth),pe=this.localClippingEnabled,ee=At.init(this.clippingPlanes,pe),S=ht.get(w,A.length),S.init(),A.push(S),bt.enabled===!0&&bt.isPresenting===!0){let xt=R.xr.getDepthSensingMesh();xt!==null&&ul(xt,D,-1/0,R.sortObjects)}ul(w,D,0,R.sortObjects),S.finish(),N!==null&&N.updateLights(b.state.lightsArray),R.sortObjects===!0&&S.sort(yt,Ot),Se=bt.enabled===!1||bt.isPresenting===!1||bt.hasDepthSensing()===!1,Se&&Ht.addToRenderList(S,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ee===!0&&At.beginShadows();let V=b.state.shadowsArray;if(Nt.render(V,w,D),ee===!0&&At.endShadows(),(H&&T.hasRenderPass())===!1){let xt=S.opaque,ft=S.transmissive;if(b.setupLights(),D.isArrayCamera){let Mt=D.cameras;if(ft.length>0)for(let wt=0,Vt=Mt.length;wt<Vt;wt++){let Zt=Mt[wt];$c(xt,ft,w,Zt)}Se&&Ht.render(w);for(let wt=0,Vt=Mt.length;wt<Vt;wt++){let Zt=Mt[wt];Zc(S,w,Zt,Zt.viewport)}}else ft.length>0&&$c(xt,ft,w,D),Se&&Ht.render(w),Zc(S,w,D)}Q!==null&&W===0&&($.updateMultisampleRenderTarget(Q),$.updateRenderTargetMipmap(Q)),H&&T.end(R),w.isScene===!0&&w.onAfterRender(R,w,D),pt.resetDefaultState(),Y=-1,K=null,x.pop(),x.length>0?(b=x[x.length-1],$.setTextureUnits(b.state.textureUnits),ee===!0&&At.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?S=A[A.length-1]:S=null,N!==null&&N.renderEnd()};function ul(w,D,q,H){if(w.visible===!1)return;if(w.layers.test(D.layers)){if(w.isGroup)q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(D);else if(w.isLightProbeGrid)b.pushLightProbeGrid(w);else if(w.isLight)b.pushLight(w),w.castShadow&&b.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Yt)){H&&Ge.setFromMatrixPosition(w.matrixWorld).applyMatrix4($t);let xt=et.update(w),ft=w.material;ft.visible&&S.push(w,xt,ft,q,Ge.z,null,D)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Yt))){let xt=et.update(w),ft=w.material;if(H&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ge.copy(w.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Ge.copy(xt.boundingSphere.center)),Ge.applyMatrix4(w.matrixWorld).applyMatrix4($t)),Array.isArray(ft)){let Mt=xt.groups;for(let wt=0,Vt=Mt.length;wt<Vt;wt++){let Zt=Mt[wt],St=ft[Zt.materialIndex];St&&St.visible&&S.push(w,xt,St,q,Ge.z,Zt,D)}}else ft.visible&&S.push(w,xt,ft,q,Ge.z,null,D)}}let dt=w.children;for(let xt=0,ft=dt.length;xt<ft;xt++)ul(dt[xt],D,q,H)}function Zc(w,D,q,H){let{opaque:V,transmissive:dt,transparent:xt}=w;b.setupLightsView(q),ee===!0&&At.setGlobalState(R.clippingPlanes,q),H&&y.viewport(nt.copy(H)),V.length>0&&qr(V,D,q),dt.length>0&&qr(dt,D,q),xt.length>0&&qr(xt,D,q),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function $c(w,D,q,H){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[H.id]===void 0){let St=oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[H.id]=new Me(1,1,{generateMipmaps:!0,type:St?Te:on,minFilter:Li,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:qt.workingColorSpace})}let dt=b.state.transmissionRenderTarget[H.id],xt=H.viewport||nt;dt.setSize(xt.z*R.transmissionResolutionScale,xt.w*R.transmissionResolutionScale);let ft=R.getRenderTarget(),Mt=R.getActiveCubeFace(),wt=R.getActiveMipmapLevel();R.setRenderTarget(dt),R.getClearColor(ae),Wt=R.getClearAlpha(),Wt<1&&R.setClearColor(16777215,.5),R.clear(),Se&&Ht.render(q);let Vt=R.toneMapping;R.toneMapping=On;let Zt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),b.setupLightsView(H),ee===!0&&At.setGlobalState(R.clippingPlanes,H),qr(w,q,H),$.updateMultisampleRenderTarget(dt),$.updateRenderTargetMipmap(dt),oe.has("WEBGL_multisampled_render_to_texture")===!1){let St=!1;for(let re=0,Ne=D.length;re<Ne;re++){let xe=D[re],{object:fe,geometry:Je,material:mt,group:nn}=xe;if(mt.side===tn&&fe.layers.test(H.layers)){let te=mt.side;mt.side=Ye,mt.needsUpdate=!0,Jc(fe,q,H,Je,mt,nn),mt.side=te,mt.needsUpdate=!0,St=!0}}St===!0&&($.updateMultisampleRenderTarget(dt),$.updateRenderTargetMipmap(dt))}R.setRenderTarget(ft,Mt,wt),R.setClearColor(ae,Wt),Zt!==void 0&&(H.viewport=Zt),R.toneMapping=Vt}function qr(w,D,q){let H=D.isScene===!0?D.overrideMaterial:null;for(let V=0,dt=w.length;V<dt;V++){let xt=w[V],{object:ft,geometry:Mt,group:wt}=xt,Vt=xt.material;Vt.allowOverride===!0&&H!==null&&(Vt=H),ft.layers.test(q.layers)&&Jc(ft,D,q,Mt,Vt,wt)}}function Jc(w,D,q,H,V,dt){N!==null&&V.isNodeMaterial&&N.setObject(w,V),w.onBeforeRender(R,D,q,H,V,dt),w.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),V.onBeforeRender(R,D,q,H,w,dt),V.transparent===!0&&V.side===tn&&V.forceSinglePass===!1?(V.side=Ye,V.needsUpdate=!0,R.renderBufferDirect(q,D,H,V,w,dt),V.side=Ii,V.needsUpdate=!0,R.renderBufferDirect(q,D,H,V,w,dt),V.side=tn):R.renderBufferDirect(q,D,H,V,w,dt),w.onAfterRender(R,D,q,H,V,dt)}function Yr(w,D,q){D.isScene!==!0&&(D=fn);let H=X.get(w),V=b.state.lights,dt=b.state.shadowsArray,xt=V.state.version,ft=at.getParameters(w,V.state,dt,D,q,b.state.lightProbeGridArray),Mt=at.getProgramCacheKey(ft),wt=H.programs;H.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?D.environment:null,H.fog=D.fog;let Vt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;H.envMap=st.get(w.envMap||H.environment,Vt),H.envMapRotation=H.environment!==null&&w.envMap===null?D.environmentRotation:w.envMapRotation,wt===void 0&&(w.addEventListener("dispose",Wn),wt=new Map,H.programs=wt);let Zt=wt.get(Mt);if(Zt!==void 0){if(H.currentProgram===Zt&&H.lightsStateVersion===xt)return Qc(w,ft),Zt}else ft.uniforms=at.getUniforms(w),N!==null&&w.isNodeMaterial&&N.build(w,q,ft),w.onBeforeCompile(ft,R),Zt=at.acquireProgram(ft,Mt),wt.set(Mt,Zt),H.uniforms=ft.uniforms;let St=H.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(St.clippingPlanes=At.uniform),Qc(w,ft),H.needsLights=td(w),H.lightsStateVersion=xt,H.needsLights&&(St.ambientLightColor.value=V.state.ambient,St.lightProbe.value=V.state.probe,St.sunLights.value=V.state.sun,St.sunLightShadows.value=V.state.sunShadow,St.directionalLights.value=V.state.directional,St.directionalLightShadows.value=V.state.directionalShadow,St.spotLights.value=V.state.spot,St.spotLightShadows.value=V.state.spotShadow,St.rectAreaLights.value=V.state.rectArea,St.ltc_1.value=V.state.rectAreaLTC1,St.ltc_2.value=V.state.rectAreaLTC2,St.pointLights.value=V.state.point,St.pointLightShadows.value=V.state.pointShadow,St.hemisphereLights.value=V.state.hemi,St.sunShadowMatrix.value=V.state.sunShadowMatrix,St.sunShadowCascade.value=V.state.sunShadowCascade,St.directionalShadowMatrix.value=V.state.directionalShadowMatrix,St.spotLightMatrix.value=V.state.spotLightMatrix,St.spotLightMap.value=V.state.spotLightMap,St.pointShadowMatrix.value=V.state.pointShadowMatrix),H.lightProbeGrid=b.state.lightProbeGridArray.length>0,H.currentProgram=Zt,H.uniformsList=null,Zt}function Kc(w){if(w.uniformsList===null){let D=w.currentProgram.getUniforms();w.uniformsList=Bs.seqWithValue(D.seq,w.uniforms)}return w.uniformsList}function Qc(w,D){let q=X.get(w);q.outputColorSpace=D.outputColorSpace,q.batching=D.batching,q.batchingColor=D.batchingColor,q.instancing=D.instancing,q.instancingColor=D.instancingColor,q.instancingMorph=D.instancingMorph,q.skinning=D.skinning,q.morphTargets=D.morphTargets,q.morphNormals=D.morphNormals,q.morphColors=D.morphColors,q.morphTargetsCount=D.morphTargetsCount,q.numClippingPlanes=D.numClippingPlanes,q.numIntersection=D.numClipIntersection,q.vertexAlphas=D.vertexAlphas,q.vertexTangents=D.vertexTangents,q.toneMapping=D.toneMapping}function Kf(w,D){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;v.setFromMatrixPosition(D.matrixWorld);for(let q=0,H=w.length;q<H;q++){let V=w[q];if(V.texture!==null&&V.boundingBox.containsPoint(v))return V}return null}function Qf(w,D,q,H,V){D.isScene!==!0&&(D=fn),$.resetTextureUnits();let dt=D.fog,xt=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?D.environment:null,ft=Q===null?R.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:qt.workingColorSpace,Mt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,wt=st.get(H.envMap||xt,Mt),Vt=H.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Zt=!!q.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),St=!!q.morphAttributes.position,re=!!q.morphAttributes.normal,Ne=!!q.morphAttributes.color,xe=On;H.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(xe=R.toneMapping);let fe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Je=fe!==void 0?fe.length:0,mt=X.get(H),nn=b.state.lights;if(ee===!0&&(pe===!0||w!==K)){let ge=w===K&&H.id===Y;At.setState(H,w,ge)}let te=!1;H.version===mt.__version?(mt.needsLights&&mt.lightsStateVersion!==nn.state.version||mt.outputColorSpace!==ft||V.isBatchedMesh&&mt.batching===!1||!V.isBatchedMesh&&mt.batching===!0||V.isBatchedMesh&&mt.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&mt.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&mt.instancing===!1||!V.isInstancedMesh&&mt.instancing===!0||V.isSkinnedMesh&&mt.skinning===!1||!V.isSkinnedMesh&&mt.skinning===!0||V.isInstancedMesh&&mt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&mt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&mt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&mt.instancingMorph===!1&&V.morphTexture!==null||mt.envMap!==wt||H.fog===!0&&mt.fog!==dt||mt.numClippingPlanes!==void 0&&(mt.numClippingPlanes!==At.numPlanes||mt.numIntersection!==At.numIntersection)||mt.vertexAlphas!==Vt||mt.vertexTangents!==Zt||mt.morphTargets!==St||mt.morphNormals!==re||mt.morphColors!==Ne||mt.toneMapping!==xe||mt.morphTargetsCount!==Je||!!mt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(te=!0):(te=!0,mt.__version=H.version);let Sn=mt.currentProgram;te===!0&&(Sn=Yr(H,D,V),N&&H.isNodeMaterial&&N.onUpdateProgram(H,Sn,mt));let Xn=!1,xi=!1,is=!1,le=Sn.getUniforms(),Re=mt.uniforms;if(y.useProgram(Sn.program)&&(Xn=!0,xi=!0,is=!0),H.id!==Y&&(Y=H.id,xi=!0),mt.needsLights){let ge=Kf(b.state.lightProbeGridArray,V);mt.lightProbeGrid!==ge&&(mt.lightProbeGrid=ge,xi=!0)}if(Xn||K!==w){y.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),le.setValue(F,"projectionMatrix",w.projectionMatrix),le.setValue(F,"viewMatrix",w.matrixWorldInverse);let _i=le.map.cameraPosition;_i!==void 0&&_i.setValue(F,ye.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&le.setValue(F,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&le.setValue(F,"isOrthographic",w.isOrthographicCamera===!0),K!==w&&(K=w,xi=!0,is=!0)}if(mt.needsLights&&(nn.state.sunShadowMap.length>0&&le.setValue(F,"sunShadowMap",nn.state.sunShadowMap,$),nn.state.directionalShadowMap.length>0&&le.setValue(F,"directionalShadowMap",nn.state.directionalShadowMap,$),nn.state.spotShadowMap.length>0&&le.setValue(F,"spotShadowMap",nn.state.spotShadowMap,$),nn.state.pointShadowMap.length>0&&le.setValue(F,"pointShadowMap",nn.state.pointShadowMap,$)),V.isSkinnedMesh){le.setOptional(F,V,"bindMatrix"),le.setOptional(F,V,"bindMatrixInverse");let ge=V.skeleton;ge&&(ge.boneTexture===null&&ge.computeBoneTexture(),le.setValue(F,"boneTexture",ge.boneTexture,$))}V.isBatchedMesh&&(le.setOptional(F,V,"batchingTexture"),le.setValue(F,"batchingTexture",V._matricesTexture,$),le.setOptional(F,V,"batchingIdTexture"),le.setValue(F,"batchingIdTexture",V._indirectTexture,$),le.setOptional(F,V,"batchingColorTexture"),V._colorsTexture!==null&&le.setValue(F,"batchingColorTexture",V._colorsTexture,$));let vi=q.morphAttributes;if((vi.position!==void 0||vi.normal!==void 0||vi.color!==void 0)&&U.update(V,q,Sn),(xi||mt.receiveShadow!==V.receiveShadow)&&(mt.receiveShadow=V.receiveShadow,le.setValue(F,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&D.environment!==null&&(Re.envMapIntensity.value=D.environmentIntensity),Re.dfgLUT!==void 0&&(Re.dfgLUT.value=Zx()),xi){if(le.setValue(F,"toneMappingExposure",R.toneMappingExposure),mt.needsLights&&jf(Re,is),dt&&H.fog===!0&&Tt.refreshFogUniforms(Re,dt),Tt.refreshMaterialUniforms(Re,H,tt,Z,b.state.transmissionRenderTarget[w.id]),mt.needsLights&&mt.lightProbeGrid){let ge=mt.lightProbeGrid;Re.probesSH.value=ge.texture,Re.probesMin.value.copy(ge.boundingBox.min),Re.probesMax.value.copy(ge.boundingBox.max),Re.probesResolution.value.copy(ge.resolution)}Bs.upload(F,Kc(mt),Re,$)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Bs.upload(F,Kc(mt),Re,$),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&le.setValue(F,"center",V.center),le.setValue(F,"modelViewMatrix",V.modelViewMatrix),le.setValue(F,"normalMatrix",V.normalMatrix),le.setValue(F,"modelMatrix",V.matrixWorld),H.uniformsGroups!==void 0){let ge=H.uniformsGroups;for(let _i=0,ss=ge.length;_i<ss;_i++){let th=ge[_i];it.update(th,Sn),it.bind(th,Sn)}}return Sn}function jf(w,D){w.ambientLightColor.needsUpdate=D,w.lightProbe.needsUpdate=D,w.sunLights.needsUpdate=D,w.sunLightShadows.needsUpdate=D,w.directionalLights.needsUpdate=D,w.directionalLightShadows.needsUpdate=D,w.pointLights.needsUpdate=D,w.pointLightShadows.needsUpdate=D,w.spotLights.needsUpdate=D,w.spotLightShadows.needsUpdate=D,w.rectAreaLights.needsUpdate=D,w.hemisphereLights.needsUpdate=D}function td(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(w,D,q){let H=X.get(w);H.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),X.get(w.texture).__webglTexture=D,X.get(w.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:q,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,D){let q=X.get(w);q.__webglFramebuffer=D,q.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(w,D=0,q=0){Q=w,G=D,W=q;let H=null,V=!1,dt=!1;if(w){let ft=X.get(w);if(ft.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(F.FRAMEBUFFER,ft.__webglFramebuffer),nt.copy(w.viewport),vt.copy(w.scissor),_t=w.scissorTest,y.viewport(nt),y.scissor(vt),y.setScissorTest(_t),Y=-1;return}else if(ft.__webglFramebuffer===void 0)$.setupRenderTarget(w);else if(ft.__hasExternalTextures)$.rebindTextures(w,X.get(w.texture).__webglTexture,X.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Vt=w.depthTexture;if(ft.__boundDepthTexture!==Vt){if(Vt!==null&&X.has(Vt)&&(w.width!==Vt.image.width||w.height!==Vt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(w)}}let Mt=w.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(dt=!0);let wt=X.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(wt[D])?H=wt[D][q]:H=wt[D],V=!0):w.samples>0&&$.useMultisampledRTT(w)===!1?H=X.get(w).__webglMultisampledFramebuffer:Array.isArray(wt)?H=wt[q]:H=wt,nt.copy(w.viewport),vt.copy(w.scissor),_t=w.scissorTest}else nt.copy(gt).multiplyScalar(tt).floor(),vt.copy(Xt).multiplyScalar(tt).floor(),_t=Be;if(q!==0&&(H=B),y.bindFramebuffer(F.FRAMEBUFFER,H)&&y.drawBuffers(w,H),y.viewport(nt),y.scissor(vt),y.setScissorTest(_t),V){let ft=X.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+D,ft.__webglTexture,q)}else if(dt){let ft=D;for(let Mt=0;Mt<w.textures.length;Mt++){let wt=X.get(w.textures[Mt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Mt,wt.__webglTexture,q,ft)}}else if(w!==null&&q!==0){let ft=X.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ft.__webglTexture,q)}Y=-1};function jc(w){let D=X.get(w);return(D.__readFormat!==w.format||D.__readType!==w.type)&&(D.__readFormat=w.format,D.__readType=w.type,D.__formatReadable=C.textureFormatReadable(w.format),D.__typeReadable=C.textureTypeReadable(w.type)),D}this.readRenderTargetPixels=function(w,D,q,H,V,dt,xt,ft=0){if(!(w&&w.isWebGLRenderTarget)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=X.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&xt!==void 0&&(Mt=Mt[xt]),Mt){y.bindFramebuffer(F.FRAMEBUFFER,Mt);try{let wt=w.textures[ft],Vt=wt.format,Zt=wt.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+ft);let St=jc(wt);if(St.__formatReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(St.__typeReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=w.width-H&&q>=0&&q<=w.height-V&&F.readPixels(D,q,H,V,ct.convert(Vt),ct.convert(Zt),dt)}finally{let wt=Q!==null?X.get(Q).__webglFramebuffer:null;y.bindFramebuffer(F.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(w,D,q,H,V,dt,xt,ft=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=X.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&xt!==void 0&&(Mt=Mt[xt]),Mt)if(D>=0&&D<=w.width-H&&q>=0&&q<=w.height-V){y.bindFramebuffer(F.FRAMEBUFFER,Mt);let wt=w.textures[ft],Vt=wt.format,Zt=wt.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+ft);let St=jc(wt);if(St.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(St.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,re),F.bufferData(F.PIXEL_PACK_BUFFER,dt.byteLength,F.STREAM_READ),F.readPixels(D,q,H,V,ct.convert(Vt),ct.convert(Zt),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Ne=Q!==null?X.get(Q).__webglFramebuffer:null;y.bindFramebuffer(F.FRAMEBUFFER,Ne);let xe=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await uu(F,xe,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,re),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,dt),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(re),F.deleteSync(xe),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,D=null,q=0){let H=Math.pow(2,-q),V=Math.floor(w.image.width*H),dt=Math.floor(w.image.height*H),xt=D!==null?D.x:0,ft=D!==null?D.y:0;$.setTexture2D(w,0),F.copyTexSubImage2D(F.TEXTURE_2D,q,0,0,xt,ft,V,dt),y.unbindTexture()},this.copyTextureToTexture=function(w,D,q=null,H=null,V=0,dt=0){let xt,ft,Mt,wt,Vt,Zt,St,re,Ne,xe=w.isCompressedTexture?w.mipmaps[dt]:w.image;if(q!==null)xt=q.max.x-q.min.x,ft=q.max.y-q.min.y,Mt=q.isBox3?q.max.z-q.min.z:1,wt=q.min.x,Vt=q.min.y,Zt=q.isBox3?q.min.z:0;else{let Re=Math.pow(2,-V);xt=Math.floor(xe.width*Re),ft=Math.floor(xe.height*Re),w.isDataArrayTexture?Mt=xe.depth:w.isData3DTexture?Mt=Math.floor(xe.depth*Re):Mt=1,wt=0,Vt=0,Zt=0}H!==null?(St=H.x,re=H.y,Ne=H.z):(St=0,re=0,Ne=0);let fe=ct.convert(D.format),Je=ct.convert(D.type),mt;D.isData3DTexture?($.setTexture3D(D,0),mt=F.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?($.setTexture2DArray(D,0),mt=F.TEXTURE_2D_ARRAY):($.setTexture2D(D,0),mt=F.TEXTURE_2D),y.activeTexture(F.TEXTURE0),y.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,D.flipY),y.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),y.pixelStorei(F.UNPACK_ALIGNMENT,D.unpackAlignment);let nn=y.getParameter(F.UNPACK_ROW_LENGTH),te=y.getParameter(F.UNPACK_IMAGE_HEIGHT),Sn=y.getParameter(F.UNPACK_SKIP_PIXELS),Xn=y.getParameter(F.UNPACK_SKIP_ROWS),xi=y.getParameter(F.UNPACK_SKIP_IMAGES);y.pixelStorei(F.UNPACK_ROW_LENGTH,xe.width),y.pixelStorei(F.UNPACK_IMAGE_HEIGHT,xe.height),y.pixelStorei(F.UNPACK_SKIP_PIXELS,wt),y.pixelStorei(F.UNPACK_SKIP_ROWS,Vt),y.pixelStorei(F.UNPACK_SKIP_IMAGES,Zt);let is=w.isDataArrayTexture||w.isData3DTexture,le=D.isDataArrayTexture||D.isData3DTexture;if(w.isDepthTexture){let Re=X.get(w),vi=X.get(D),ge=X.get(Re.__renderTarget),_i=X.get(vi.__renderTarget);y.bindFramebuffer(F.READ_FRAMEBUFFER,ge.__webglFramebuffer),y.bindFramebuffer(F.DRAW_FRAMEBUFFER,_i.__webglFramebuffer);for(let ss=0;ss<Mt;ss++)is&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,X.get(w).__webglTexture,V,Zt+ss),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,X.get(D).__webglTexture,dt,Ne+ss)),F.blitFramebuffer(wt,Vt,xt,ft,St,re,xt,ft,F.DEPTH_BUFFER_BIT,F.NEAREST);y.bindFramebuffer(F.READ_FRAMEBUFFER,null),y.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(V!==0||w.isRenderTargetTexture||X.has(w)){let Re=X.get(w),vi=X.get(D);y.bindFramebuffer(F.READ_FRAMEBUFFER,L),y.bindFramebuffer(F.DRAW_FRAMEBUFFER,O);for(let ge=0;ge<Mt;ge++)is?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Re.__webglTexture,V,Zt+ge):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Re.__webglTexture,V),le?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,vi.__webglTexture,dt,Ne+ge):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,vi.__webglTexture,dt),V!==0?F.blitFramebuffer(wt,Vt,xt,ft,St,re,xt,ft,F.COLOR_BUFFER_BIT,F.NEAREST):le?F.copyTexSubImage3D(mt,dt,St,re,Ne+ge,wt,Vt,xt,ft):F.copyTexSubImage2D(mt,dt,St,re,wt,Vt,xt,ft);y.bindFramebuffer(F.READ_FRAMEBUFFER,null),y.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else le?w.isDataTexture||w.isData3DTexture?F.texSubImage3D(mt,dt,St,re,Ne,xt,ft,Mt,fe,Je,xe.data):D.isCompressedArrayTexture?F.compressedTexSubImage3D(mt,dt,St,re,Ne,xt,ft,Mt,fe,xe.data):F.texSubImage3D(mt,dt,St,re,Ne,xt,ft,Mt,fe,Je,xe):w.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,dt,St,re,xt,ft,fe,Je,xe.data):w.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,dt,St,re,xe.width,xe.height,fe,xe.data):F.texSubImage2D(F.TEXTURE_2D,dt,St,re,xt,ft,fe,Je,xe);y.pixelStorei(F.UNPACK_ROW_LENGTH,nn),y.pixelStorei(F.UNPACK_IMAGE_HEIGHT,te),y.pixelStorei(F.UNPACK_SKIP_PIXELS,Sn),y.pixelStorei(F.UNPACK_SKIP_ROWS,Xn),y.pixelStorei(F.UNPACK_SKIP_IMAGES,xi),dt===0&&D.generateMipmaps&&F.generateMipmap(mt),y.unbindTexture()},this.initRenderTarget=function(w){X.get(w).__webglFramebuffer===void 0&&$.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?$.setTextureCube(w,0):w.isData3DTexture?$.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?$.setTexture2DArray(w,0):$.setTexture2D(w,0),y.unbindTexture()},this.resetState=function(){G=0,W=0,Q=null,y.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}});var we,Ui,Kn=ce(()=>{we=[{id:"goreme",name:"G\xF6reme",x:180,z:120,r:190,kind:"town",text:"Kayalara oyulmu\u015F evleriyle bir vadi kasabas\u0131. 1985\u2019te UNESCO D\xFCnya Miras\u0131 listesine giren G\xF6reme Milli Park\u0131\u2019n\u0131n kalbi buras\u0131."},{id:"uchisar",name:"U\xE7hisar Kalesi",x:-760,z:-430,r:230,kind:"castle",text:"Y\xFCzlerce odas\u0131, ge\xE7idi ve deli\u011Fiyle yekpare bir kaya. B\xF6lgenin en y\xFCksek noktalar\u0131ndan biri; tepesinden b\xFCt\xFCn vadiler g\xF6r\xFCn\xFCr."},{id:"ask",name:"A\u015Fk Vadisi",x:640,z:-640,r:260,kind:"valley",text:"Boylar\u0131 on metreyi a\u015Fan uzun, ince peribacalar\u0131yla \xFCnl\xFC. Sert bazalt ba\u015Fl\u0131klar, alt\u0131ndaki yumu\u015Fak t\xFCf\xFC milyonlarca y\u0131l korudu."},{id:"guvercinlik",name:"G\xFCvercinlik Vadisi",x:-330,z:560,r:240,kind:"valley",text:"Kayalara oyulmu\u015F binlerce g\xFCvercin yuvas\u0131. K\xF6yl\xFCler g\xFCvercin g\xFCbresini ba\u011Flar\u0131n\u0131 beslemek i\xE7in toplard\u0131."},{id:"gul",name:"G\xFCl Vadisi",x:930,z:380,r:260,kind:"valley",text:"G\xFCn batarken kayalar pembeden k\u0131z\u0131la d\xF6ner. T\xFCf katmanlar\u0131ndaki demir oksit, ta\u015Fa bu rengi verir."},{id:"devrent",name:"Devrent \xB7 Hayal Vadisi",x:-1010,z:830,r:250,kind:"valley",text:"R\xFCzg\xE2r ve ya\u011Fmurun oydu\u011Fu mantar, deve ve hayvan bi\xE7imli kayalar. Herkes farkl\u0131 bir \u015Fekil g\xF6r\xFCr."},{id:"pasabag",name:"Pa\u015Faba\u011F \xB7 Ke\u015Fi\u015Fler Vadisi",x:330,z:1010,r:240,kind:"valley",text:"Bir g\xF6vdeden \xE7\u0131kan \xE7ok ba\u015Fl\u0131 peribacalar\u0131. Erken H\u0131ristiyan ke\u015Fi\u015Fler bu kayalar\u0131n i\xE7inde ya\u015Fad\u0131."},{id:"balon",name:"Balon Kalk\u0131\u015F Alan\u0131",x:-240,z:-980,r:220,kind:"field",text:"Her sabah g\xFCn do\u011Farken onlarca balon burada \u015Fi\u015Fer, sonra vadilerin \xFCzerinde s\xFCz\xFClmeye ba\u015Flar."}],Ui={x:110,z:700}});var Lt,Pe,qe,kn,Qn,fi=ce(()=>{Ie();Kn();Lt={uTime:{value:0},uSunDir:{value:new I(0,1,0)},uLightDir:{value:new I(0,1,0)},uLightColor:{value:new Pt(1,1,1)},uSkyTop:{value:new Pt},uSkyHor:{value:new Pt},uSkyGlow:{value:new Pt},uAmbSky:{value:new Pt},uAmbGround:{value:new Pt},uFogDensity:{value:1e-4},uFogFall:{value:.004},uFogBase:{value:0},uMist:{value:0},uNight:{value:0},uHeight:{value:null},uNorm:{value:null},uShadowH:{value:null},uWorld:{value:new Ct(4096,2048)},uBalloons:{value:Array.from({length:24},()=>new _e(0,-9999,0,0))}},Pe=`
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float hash13(vec3 p3){ p3 = fract(p3*.1031); p3 += dot(p3,p3.zyx+31.32); return fract((p3.x+p3.y)*p3.z); }
vec2 hash22(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*vec3(.1031,.1030,.0973)); p3 += dot(p3,p3.yzx+33.33); return fract((p3.xx+p3.yz)*p3.zy); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash12(i),hash12(i+vec2(1,0)),f.x), mix(hash12(i+vec2(0,1)),hash12(i+vec2(1,1)),f.x), f.y); }
float vnoise3(vec3 p){ vec3 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  float a=hash13(i), b=hash13(i+vec3(1,0,0)), c=hash13(i+vec3(0,1,0)), d=hash13(i+vec3(1,1,0));
  float e=hash13(i+vec3(0,0,1)), g=hash13(i+vec3(1,0,1)), h=hash13(i+vec3(0,1,1)), k=hash13(i+vec3(1,1,1));
  return mix(mix(mix(a,b,f.x),mix(c,d,f.x),f.y), mix(mix(e,g,f.x),mix(h,k,f.x),f.y), f.z); }
float gnoise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*f*(f*(f*6.-15.)+10.);
  vec2 ga=hash22(i)*2.-1., gb=hash22(i+vec2(1,0))*2.-1., gc=hash22(i+vec2(0,1))*2.-1., gd=hash22(i+vec2(1,1))*2.-1.;
  float va=dot(ga,f), vb=dot(gb,f-vec2(1,0)), vc=dot(gc,f-vec2(0,1)), vd=dot(gd,f-vec2(1,1));
  return 1.45*mix(mix(va,vb,u.x), mix(vc,vd,u.x), u.y);
}
float gfbm(vec2 p, int oct){
  float a=.5, s=0.; mat2 R=mat2(0.8,-0.6,0.6,0.8);
  for(int i=0;i<6;i++){ if(i>=oct) break; s+=a*gnoise(p); p=R*p*2.03+vec2(17.,9.); a*=.5; }
  return s;
}
`,qe=`
uniform float uTime;
uniform vec3 uSunDir, uLightDir, uLightColor, uSkyTop, uSkyHor, uSkyGlow, uAmbSky, uAmbGround;
uniform float uFogDensity, uFogFall, uFogBase, uMist, uNight;

vec3 skyColorG(vec3 d, float gs){
  float y = max(d.y, 0.0);
  float sd = max(dot(d, uSunDir), 0.0);
  vec3 col = mix(uSkyHor, uSkyTop, pow(y, 0.42));
  float g = pow(sd, 5.0) * exp(-y*2.6);
  col += uSkyGlow * g * gs * 0.8;
  col += uSkyGlow * 0.3 * pow(sd, 1.5) * exp(-y*6.0) * gs;
  return col;
}
vec3 skyColor(vec3 d){ return skyColorG(d, 1.0); }

vec3 applyFogS(vec3 col, vec3 wp, float fs){
  vec3 v = wp - cameraPosition; float dist = length(v); vec3 dir = v / max(dist, 0.001);
  float ya = cameraPosition.y, dy = wp.y - ya;
  float k = uFogFall;
  float base = uFogDensity * fs * exp(-k*(ya - uFogBase));
  float kd = k*dy;
  float od = (abs(kd) > 0.0005) ? base * dist * (1.0 - exp(-kd)) / kd : base * dist;
  // vadi sisi: ince, al\xE7ak, yo\u011Fun tabaka
  float km = 0.085;
  float mBase = uMist * 0.0036 * exp(-km*(ya - 50.0));
  float kmd = km*dy;
  float om = (abs(kmd) > 0.0005) ? mBase * dist * (1.0 - exp(-kmd)) / kmd : mBase * dist;
  vec3 fdir = normalize(vec3(dir.x, 0.0, dir.z) + vec3(0.0001));
  vec3 fogCol = skyColorG(fdir, 0.42);
  float f = 1.0 - exp(-max(od, 0.0));
  vec3 outc = mix(col, fogCol, f);
  float fm = 1.0 - exp(-max(om, 0.0));
  vec3 mistCol = mix(fogCol, uLightColor*0.10 + uAmbSky*0.9, 0.35);
  outc = mix(outc, mistCol, fm);
  if (fs < 0.99) { float ff = smoothstep(26000.0, 46000.0, dist); outc = mix(outc, fogCol, ff); }
  return outc;
}
vec3 applyFog(vec3 col, vec3 wp){ return applyFogS(col, wp, 1.0); }
`,kn=`
uniform sampler2D uHeight;
uniform vec2 uWorld;
float heightAt(vec2 xz){
  vec2 t = (xz + uWorld.x*0.5) / uWorld.x * uWorld.y - 0.5;
  vec2 i = floor(t); vec2 f = t - i;
  int mx = int(uWorld.y) - 1;
  ivec2 a = clamp(ivec2(i), ivec2(0), ivec2(mx));
  ivec2 b = clamp(ivec2(i) + ivec2(1), ivec2(0), ivec2(mx));
  float h00 = texelFetch(uHeight, ivec2(a.x, a.y), 0).r;
  float h10 = texelFetch(uHeight, ivec2(b.x, a.y), 0).r;
  float h01 = texelFetch(uHeight, ivec2(a.x, b.y), 0).r;
  float h11 = texelFetch(uHeight, ivec2(b.x, b.y), 0).r;
  return mix(mix(h00, h10, f.x), mix(h01, h11, f.x), f.y);
}
`,Qn=`
uniform sampler2D uShadowH;
uniform sampler2D uNorm;
uniform vec4 uBalloons[24];
vec2 wuv(vec2 xz){ return xz / uWorld.x + 0.5; }
float shadowH(vec2 xz){ return texture2D(uShadowH, wuv(xz)).r; }

float sunShadow(vec3 p, float t0){
  vec3 L = uLightDir;
  if (L.y < 0.005) return 0.0;
  float half_ = uWorld.x*0.5;
  float res = 1.0;
  float t = t0;
  for (int i = 0; i < 46; i++) {
    vec3 q = p + L*t;
    if (abs(q.x) > half_ || abs(q.z) > half_ || q.y > 420.0) break;
    float h = shadowH(q.xz);
    res = min(res, clamp(10.0*(q.y - h)/t + 0.15, 0.0, 1.0));
    if (res < 0.01) break;
    t += 2.0 + t*0.105;
  }
  return res*res*(3.0-2.0*res);
}

float balloonShadow(vec3 p){
  float s = 1.0;
  vec3 L = uLightDir;
  if (L.y < 0.03) return 1.0;
  for (int i = 0; i < 24; i++) {
    vec4 b = uBalloons[i];
    if (b.w <= 0.0) continue;
    vec3 d = b.xyz - p;
    float tt = dot(d, L);
    if (tt < 0.0) continue;
    vec3 c = d - L*tt;
    float dist = length(c);
    float rr = b.w;
    s *= mix(0.55, 1.0, smoothstep(rr*0.55, rr*1.15, dist));
  }
  return s;
}

float terrainAO(vec3 p, vec3 n){
  vec3 d = normalize(n + vec3(0.0, 0.8, 0.0));
  float occ = 0.0;
  for (int i = 1; i <= 6; i++) {
    float t = float(i*i) * 1.7;
    vec3 q = p + d*t;
    float h = shadowH(q.xz);
    occ += clamp((h - q.y) / t, 0.0, 1.0) * (1.6 / float(i));
  }
  return clamp(1.0 - occ*0.33, 0.25, 1.0);
}
`});function Or(i){Wu[0]=i;let t=Jx[0],e=t>>>16&32768,n=(t>>>23&255)-112,s=t&8388607;return n<=0?e:n>=31?e|31743:e|n<<10|s>>>13}function jx(i,t){let e=i/t,n=[],s=[],r=[],a=(p,g)=>g*(t+1)+p;for(let p=0;p<=t;p++)for(let g=0;g<=t;g++)n.push(-i/2+g*e,0,-i/2+p*e),s.push(0);for(let p=0;p<t;p++)for(let g=0;g<t;g++){let _=a(g,p),m=a(g+1,p),f=a(g,p+1),M=a(g+1,p+1);r.push(_,f,m,m,f,M)}let o=p=>{let g=n.length/3;for(let _ of p)n.push(n[_*3],0,n[_*3+2]),s.push(1);for(let _=0;_<p.length-1;_++){let m=p[_],f=p[_+1],M=g+_,E=g+_+1;r.push(m,M,f,f,M,E,m,f,M,f,E,M)}},l=[],c=[],h=[],d=[];for(let p=0;p<=t;p++)l.push(a(p,0)),c.push(a(p,t));for(let p=0;p<=t;p++)h.push(a(0,p)),d.push(a(t,p));o(l),o(c),o(h),o(d);let u=new ie;return u.setAttribute("position",new zt(n,3)),u.setAttribute("aSkirt",new zt(s,1)),u.setIndex(r),u.boundingSphere=new he(new I(0,150,0),330),u.boundingBox=new Tn(new I(-i/2,0,-i/2),new I(i/2,320,i/2)),u}var $x,Wu,Jx,Kx,$o,Qx,tv,Rc,ev,Cc=ce(()=>{Ie();Kn();fi();$x=`
precision highp float;
uniform vec3 uTown, uUch, uField;
${Pe}
float plateauBase(vec2 p){ return 150. + 16.*gfbm(p*0.0007 + vec2(11.,4.), 3); }

float cones(vec2 p, float cell){
  vec2 g = floor(p/cell); float best = 0.;
  for(int dx=-1; dx<=1; dx++) for(int dy=-1; dy<=1; dy++){
    vec2 c = g + vec2(float(dx), float(dy));
    vec2 o = hash22(c);
    vec2 cp = (c + o) * cell;
    float r = cell*(0.34 + 0.26*hash12(c+7.));
    float k = clamp(1. - length(p-cp)/r, 0., 1.);
    best = max(best, pow(k, 1.35) * (0.45 + 0.55*hash12(c+3.)));
  }
  return best;
}
float smin(float a, float b, float k){ float h = clamp(0.5+0.5*(b-a)/k, 0., 1.); return mix(b,a,h) - k*h*(1.-h); }

float prof(float s){ return mix(s, smoothstep(0.22, 0.78, s), 0.72); }
void terrainAll(vec2 p, out float H, out float green, out float region){
  vec2 wv = vec2(gfbm(p*0.0011+vec2(3.7,1.3),3), gfbm(p*0.0011+vec2(8.1,5.2),3));
  vec2 q = p + wv*430.;
  float n1 = gfbm(q*0.00078+vec2(2.,7.), 4);
  float d1 = abs(n1);
  float w1 = 0.12 + 0.06*(gnoise(q*0.0007)*0.5+0.5);
  float wall1 = smoothstep(0.03, w1, d1);
  float n2 = gfbm(q*0.0021+vec2(40.,3.), 3);
  float d2 = abs(n2);
  float wall2 = smoothstep(0.018, 0.085, d2);
  float n3 = gfbm(q*0.0052+vec2(9.,31.), 3);
  float d3 = abs(n3);
  float wall3 = smoothstep(0.014, 0.075, d3);

  float plat = plateauBase(p) + 14.*gfbm(p*0.0016, 3);
  float floorH = 26. + 7.*gfbm(p*0.004, 2);
  float s1 = prof(wall1), s2 = prof(wall2), s3 = prof(wall3);
  float h1 = mix(floorH, plat, s1);
  float h2 = mix(plat - 78., plat, s2);
  float h3 = mix(plat - 34., plat, s3);
  float H0 = smin(smin(h1, h2, 10.), h3, 7.);

  float z1 = smoothstep(0.02, 0.3, s1) * (1. - smoothstep(0.8, 0.99, s1));
  float z2 = smoothstep(0.02, 0.3, s2) * (1. - smoothstep(0.8, 0.99, s2));
  float z3 = smoothstep(0.02, 0.3, s3) * (1. - smoothstep(0.8, 0.99, s3));
  float wz = max(z1, max(z2*0.9, z3*0.7));

  float ridge = 1. - abs(gnoise(p*0.030 + vec2(5.,2.)));
  float ridge2 = 1. - abs(gnoise(p*0.075 + vec2(1.,8.)));
  H0 += wz * (ridge*ridge*7.0 + ridge2*ridge2*2.6 - 4.);
  float cn = cones(p + wv*40., 52.);
  float cn2 = cones(p*1.7 + 30., 26.);
  float cn3 = cones(p*0.5 + 11., 96.);
  float t1 = smoothstep(0.08, 0.5, s1) * (1. - smoothstep(0.55, 0.97, s1));
  float t2 = smoothstep(0.08, 0.5, s2) * (1. - smoothstep(0.6, 0.97, s2));
  float talus = max(t1, t2*0.85);
  H0 += talus * (cn*15. + cn2*4.5);
  // plato \xFCst\xFCnde t\xFCf t\xFCmsekleri
  float top = smoothstep(0.85, 1.0, min(s1, min(s2, s3)));
  H0 += top * cn3 * 20.;

  float stp = 6.0 + 2.*gnoise(p*0.004);
  float tt = H0 / stp;
  float terr = (floor(tt) + smoothstep(0.55, 1.0, fract(tt))) * stp;
  H0 = mix(H0, terr, 0.32 * wz);
  // her yerde: t\xFCmsekler ve s\u0131\u011F oyuntular
  float hum = gfbm(p*0.011 + vec2(31.,7.), 4);
  float gul = 1. - abs(gnoise(p*0.017 + vec2(2.,19.)));
  H0 += (1.0 - 0.6*wz) * (hum*7.5 + gul*gul*3.5 - 1.8);
  H0 += (1.0 - wz) * cones(p*0.9 + 70., 38.) * 6.0;

  // ilgi noktas\u0131 \u015Fekilleri
  // U\xE7hisar kaya k\xFCtlesi
  float du = length(p - uUch.xy) + 26.*gnoise(p*0.018) + 10.*gnoise(p*0.05);
  float uMass = 1. - smoothstep(uUch.z*0.3, uUch.z*0.75, du);
  float ru = 0.6 + 0.6*(gfbm(p*0.011, 4)+0.5);
  float crag = 1. - abs(gnoise(p*0.035 + 3.));
  H0 = mix(H0, max(H0, plat) + 96.*pow(uMass, 0.6)*ru + crag*crag*24.*uMass, smoothstep(0.0, 0.3, uMass));
  // G\xF6reme kasabas\u0131: kaba bir yama\xE7 teras\u0131
  float dt = length(p - uTown.xy);
  float tMask = 1. - smoothstep(uTown.z*0.55, uTown.z*1.35, dt);
  float townH = 62. - 0.055*(p.x - uTown.x) - 0.02*(p.y - uTown.y) + 3.*gnoise(p*0.02);
  H0 = mix(H0, townH, tMask*0.96);
  // balon alan\u0131: geni\u015F d\xFCz vadi taban\u0131
  float dfld = length(p - uField.xy);
  float fMask = 1. - smoothstep(uField.z*0.5, uField.z*1.5, dfld);
  H0 = mix(H0, 46. + 2.*gnoise(p*0.01), fMask);

  // d\xFCnya kenar\u0131na do\u011Fru yayla
  float edge = smoothstep(1500., 1980., max(abs(p.x), abs(p.y)));
  H0 = mix(H0, plat, edge);

  // ye\u015Fil: vadi taban\u0131 ve kasaba \xE7evresi
  float fl = 1. - smoothstep(0.03, 0.15, d1);
  fl *= (1. - s1);
  float gr = smoothstep(0.2, 0.8, fl) * smoothstep(-0.15, 0.25, gfbm(p*0.006+4., 3));
  gr = max(gr, tMask*0.35*smoothstep(-0.1,0.3,gnoise(p*0.03)));
  green = clamp(gr, 0., 1.) * (1.-edge);
  region = clamp(0.5 + 0.9*gfbm(p*0.0005 + vec2(21.,13.), 3), 0., 1.);
  H = H0;
}

void main(){
  vec2 p = (gl_FragCoord.xy / ${2048}.0 - 0.5) * ${4096}.0;
  float H, g, r;
  terrainAll(p, H, g, r);
  float x = floor(clamp((H + 64.) / 512., 0., 1.) * 65535. + 0.5);
  float hi = floor(x / 256.);
  float lo = x - hi * 256.;
  gl_FragColor = vec4(hi, lo, floor(g*255.+0.5), floor(r*255.+0.5)) / 255.;
}
`,Wu=new Float32Array(1),Jx=new Uint32Array(Wu.buffer),Kx=`
precision highp float;
uniform sampler2D uSrc;
${Pe}
float hdec(ivec2 c){ c = clamp(c, ivec2(0), ivec2(${2047})); vec4 t = texelFetch(uSrc, c, 0)*255.; return ((t.r*256.+t.g)/65535.)*512.-64.; }
void main(){
  ivec2 c = ivec2(gl_FragCoord.xy);
  vec4 t = texelFetch(uSrc, c, 0)*255.;
  float h = ((t.r*256.+t.g)/65535.)*512.-64.;
  float step_ = 3.;
  float hx = (hdec(c+ivec2(3,0)) - hdec(c-ivec2(3,0))) / (2.*step_*${4096/2048}.);
  float hz = (hdec(c+ivec2(0,3)) - hdec(c-ivec2(0,3))) / (2.*step_*${4096/2048}.);
  vec2 g = vec2(hx, hz);
  float sl = length(g);
  vec2 dir = g / max(sl, 1e-4);
  vec2 tn = vec2(-dir.y, dir.x);
  vec2 p = (gl_FragCoord.xy / ${2048}.0 - 0.5) * ${4096}.0;
  float across = dot(p, tn), along = dot(p, dir);
  float f1 = 1. - abs(gnoise(vec2(across*0.12, along*0.018) + 3.));
  float f2 = 1. - abs(gnoise(vec2(across*0.31, along*0.05) + 11.));
  float f3 = gnoise(vec2(across*0.7, along*0.11) + 5.);
  float amp = smoothstep(0.42, 1.2, sl);
  float H = h + amp * (f1*f1*5.2 + f2*f2*1.8 + f3*0.5 - 3.4);
  float x = floor(clamp((H + 64.) / 512., 0., 1.) * 65535. + 0.5);
  float hi = floor(x / 256.);
  float lo = x - hi * 256.;
  gl_FragColor = vec4(hi, lo, t.b, t.a) / 255.;
}
`;$o=class{constructor(t,e){this.renderer=t,this.scene=e,this.H=null,this.SH=null,this.G=null,this.R=null,this.NX=null,this.NZ=null}async generate(t){let e=this.renderer,n=()=>new Me(2048,2048,{type:on,format:ln,minFilter:Ee,magFilter:Ee,depthBuffer:!1,stencilBuffer:!1}),s=n(),r=n(),a=A=>we.find(x=>x.id===A),o=a("goreme"),l=a("uchisar"),c=a("balon"),h="void main(){ gl_Position = vec4(position.xy, 0., 1.); }",d=new Ft({vertexShader:h,fragmentShader:$x,uniforms:{uTown:{value:new I(o.x,o.z,o.r)},uUch:{value:new I(l.x,l.z,l.r)},uField:{value:new I(c.x,c.z,c.r)}},depthTest:!1,depthWrite:!1}),u=new Ft({vertexShader:h,fragmentShader:Kx,uniforms:{uSrc:{value:s.texture}},depthTest:!1,depthWrite:!1}),p=new ie;p.setAttribute("position",new zt([-1,-1,0,3,-1,0,-1,3,0],3));let g=new ue(p,d);g.frustumCulled=!1;let _=new li(-1,1,1,-1,0,1),m=new Wi;m.add(g);let f=e.getRenderTarget(),M=e.getContext(),E=64,v=2048*2048;this.H=new Float32Array(v),this.G=new Float32Array(v),this.R=new Float32Array(v);let S=new Uint8Array(2048*E*4);e.autoClear=!1;let b=async(A,x,T)=>{e.setRenderTarget(A),A.scissorTest=!0;for(let R=0;R<2048;R+=E){if(A.scissor.set(0,R,2048,E),A.viewport.set(0,0,2048,2048),e.render(m,_),x){e.readRenderTargetPixels(A,0,R,2048,E,S);for(let P=0;P<2048*E;P++){let N=R*2048+P;this.H[N]=(S[P*4]*256+S[P*4+1])/65535*512-64,this.G[N]=S[P*4+2]/255,this.R[N]=S[P*4+3]/255}}else M.finish();t&&t(T+.5*R/2048),await new Promise(P=>setTimeout(P,0))}A.scissorTest=!1};await b(s,!1,0),g.material=u,await b(r,!0,.5),e.autoClear=!0,e.setRenderTarget(f),s.dispose(),r.dispose(),d.dispose(),u.dispose(),p.dispose(),this.computeNormals()}computeNormals(){let t=2048,e=this.H;this.NX=new Float32Array(t*t),this.NZ=new Float32Array(t*t);for(let n=0;n<t;n++){let s=Math.max(n-1,0),r=Math.min(n+1,t-1);for(let a=0;a<t;a++){let o=Math.max(a-1,0),l=Math.min(a+1,t-1),c=(e[n*t+l]-e[n*t+o])/((l-o)*2),h=(e[r*t+a]-e[s*t+a])/((r-s)*2),d=1/Math.sqrt(c*c+1+h*h);this.NX[n*t+a]=-c*d,this.NZ[n*t+a]=-h*d}}}_idx(t,e){let n=(t+2048)/2-.5,s=(e+2048)/2-.5,r=Math.floor(n),a=Math.floor(s);return[r,a,n-r,s-a]}_bil(t,e,n){let[s,r,a,o]=this._idx(e,n),l=2047,c=Math.min(Math.max(s,0),l),h=Math.min(Math.max(s+1,0),l),d=Math.min(Math.max(r,0),l),u=Math.min(Math.max(r+1,0),l),p=t[d*2048+c],g=t[d*2048+h],_=t[u*2048+c],m=t[u*2048+h];return(p+(g-p)*a)*(1-o)+(_+(m-_)*a)*o}heightAt(t,e){return this._bil(this.H,t,e)}greenAt(t,e){return this._bil(this.G,t,e)}regionAt(t,e){return this._bil(this.R,t,e)}normalAt(t,e,n=new I){let s=this._bil(this.NX,t,e),r=this._bil(this.NZ,t,e),a=Math.sqrt(Math.max(0,1-s*s-r*r));return n.set(s,a,r)}slopeAt(t,e){return 1-this.normalAt(t,e,Qx).y}buildTextures(t){let e=2048,n=new ai(this.H,e,e,Qi,mn);n.minFilter=n.magFilter=Ee,n.generateMipmaps=!1,n.needsUpdate=!0;let s=new Uint16Array(e*e*4);for(let a=0;a<e*e;a++)s[a*4]=Or(this.NX[a]),s[a*4+1]=Or(this.NZ[a]),s[a*4+2]=Or(this.G[a]),s[a*4+3]=Or(this.R[a]);let r=new ai(s,e,e,ln,Te);r.minFilter=r.magFilter=Ue,r.generateMipmaps=!1,r.wrapS=r.wrapT=wn,r.needsUpdate=!0,this.texH=n,this.texN=r,Lt.uHeight.value=n,Lt.uNorm.value=r,this.updateShadowTexture(t||this.H)}updateShadowTexture(t){let e=2048,n=new Uint16Array(e*e);for(let r=0;r<e*e;r++)n[r]=Or(t[r]);this.texS&&this.texS.dispose();let s=new ai(n,e,e,Qi,Te);s.minFilter=s.magFilter=Ue,s.generateMipmaps=!1,s.needsUpdate=!0,this.texS=s,Lt.uShadowH.value=s}buildChunks(){let e=4096/128,n=[64,32,16,8].map(r=>jx(128,r));this.lodGeos=n,this.material=new Ft({uniforms:{...Lt},vertexShader:tv,fragmentShader:ev}),this.chunks=[];let s=new Oe;for(let r=0;r<e;r++)for(let a=0;a<e;a++){let o=-2048+(a+.5)*128,l=-2048+(r+.5)*128,c=new ue(n[3],this.material);c.position.set(o,0,l),c.updateMatrix(),c.matrixAutoUpdate=!1,c.frustumCulled=!0,c.userData.lod=3,c.userData.cx=o,c.userData.cz=l,s.add(c),this.chunks.push(c)}this.group=s,this.scene.add(s)}updateLod(t){let e=t.position.x,n=t.position.z;for(let s of this.chunks){let r=s.userData.cx-e,a=s.userData.cz-n,o=Math.sqrt(r*r+a*a),l=s.userData.lod,c=12,h=o<250?0:o<620?1:o<1300?2:3;if(h!==l){let u=[250,620,1300][Math.min(h,l)];Math.abs(o-u)<c&&(h=l)}h!==l&&(s.geometry=this.lodGeos[h],s.userData.lod=h)}}},Qx=new I;tv=`
${kn}
attribute float aSkirt;
varying vec3 vWorld;
void main(){
  vec4 wp = modelMatrix * vec4(position.x, 0.0, position.z, 1.0);
  float h = heightAt(wp.xz);
  wp.y = h - aSkirt*36.0;
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,Rc=`
vec3 strataColor(float h, float region){
  vec3 sand  = vec3(0.47,0.35,0.24);
  vec3 white = vec3(0.64,0.55,0.43);
  vec3 pink  = vec3(0.54,0.33,0.26);
  vec3 rose  = vec3(0.48,0.26,0.22);
  vec3 rust  = vec3(0.40,0.23,0.13);
  vec3 ash   = vec3(0.33,0.28,0.25);
  vec3 col = mix(sand, white, smoothstep(0.0, 1.0, h));
  float pk = smoothstep(0.32, 0.72, region) * step(0.45, fract(h*7.3));
  col = mix(col, mix(pink, rose, fract(h*3.7)), pk*0.85);
  col = mix(col, rust, smoothstep(0.72, 0.95, region) * step(0.55, fract(h*5.1)) * 0.9);
  col = mix(col, ash, step(0.94, fract(h*11.7))*0.45);
  return col;
}
`,ev=`
${Pe}
${qe}
${kn}
${Qn}
${Rc}
varying vec3 vWorld;

float detailN(vec3 p){ return vnoise3(p*vec3(1.3,0.55,1.3))*0.6 + vnoise3(p*vec3(4.1,1.6,4.1))*0.4; }

void main(){
  vec3 wp = vWorld;
  vec4 nt = texture2D(uNorm, wuv(wp.xz));
  vec3 N = normalize(vec3(nt.x, sqrt(max(0.0, 1.0 - nt.x*nt.x - nt.y*nt.y)), nt.y));
  float green = nt.z, region = nt.w;
  float dist = length(wp - cameraPosition);

  // ince ayr\u0131nt\u0131 normali (yak\u0131n mesafe)
  float dfade = 1.0 - smoothstep(120.0, 520.0, dist);
  if (dfade > 0.0) {
    float e = 0.35;
    float f0 = detailN(wp);
    vec3 g = vec3(detailN(wp+vec3(e,0,0)) - f0, detailN(wp+vec3(0,e,0)) - f0, detailN(wp+vec3(0,0,e)) - f0) / e;
    g -= N * dot(g, N);
    N = normalize(N - g * 0.32 * dfade);
  }
  float slope = 1.0 - N.y;

  // ---- albedo ----
  float warp = gnoise(wp.xz*0.006)*3.0 + gnoise(vec2(wp.x*0.4+wp.z*0.4, wp.y)*0.04)*1.2;
  float bp = (wp.y + warp) / 3.3;
  float bi = floor(bp), bf = fract(bp);
  float rg = floor(region*4.0);
  // katman kenarlar\u0131nda sert/yumu\u015Fak t\xFCf basamaklar\u0131: \xFCst kenar yukar\u0131, alt kenar a\u015Fa\u011F\u0131 bakar
  float wallW = smoothstep(0.2, 0.5, slope);
  float ledgeUp = smoothstep(0.80, 1.0, bf), ledgeDn = 1.0 - smoothstep(0.0, 0.14, bf);
  N = normalize(N + vec3(0.0, (ledgeUp*0.9 - ledgeDn*0.55) * wallW * (1.0 - smoothstep(60.0, 500.0, dist)), 0.0));
  vec3 c1 = strataColor(hash12(vec2(bi, rg)), region);
  vec3 c2 = strataColor(hash12(vec2(bi+1.0, rg)), region);
  vec3 rock = mix(c1, c2, smoothstep(0.78, 1.0, bf));
  rock = mix(rock, (c1+c2)*0.5, smoothstep(250.0, 1500.0, dist)*0.6);
  float streak = vnoise3(vec3(wp.x*0.9, wp.y*0.35, wp.z*0.9));
  float mott = vnoise3(wp*vec3(3.2,1.4,3.2));
  rock *= 0.82 + 0.34*streak;
  rock *= 0.9 + 0.2*mott;

  // toprak: b\xFCy\xFCk \xF6l\xE7ekli renk yamalar\u0131 + kuru ot
  float patchA = vnoise(wp.xz*0.011), patchB = vnoise(wp.xz*0.047 + 9.0), fineS = vnoise(wp.xz*0.6);
  vec3 soilA = vec3(0.30,0.22,0.15), soilB = vec3(0.38,0.29,0.19), soilC = vec3(0.27,0.24,0.20), soilD = vec3(0.36,0.25,0.18);
  vec3 soil = mix(soilA, soilB, patchA);
  soil = mix(soil, soilC, smoothstep(0.55, 0.85, patchB)*0.7);
  soil = mix(soil, soilD, smoothstep(0.5, 0.2, patchA)*0.5*smoothstep(0.3,0.7,region));
  soil *= 0.85 + 0.3*fineS;
  soil = mix(soil, rock*0.62, 0.30 + 0.3*vnoise(wp.xz*0.013));
  float wall = smoothstep(0.16, 0.42, slope + (vnoise3(wp*0.8)-0.5)*0.12);
  vec3 col = mix(soil, rock, wall);
  // kuru ot ve \xE7al\u0131 k\xFCmeleri
  float tuft = smoothstep(0.58, 0.85, vnoise(wp.xz*0.32 + patchA*4.0)) * (1.0 - wall) * smoothstep(0.35, 0.6, patchB);
  col = mix(col, vec3(0.34,0.30,0.11)*(0.7+0.6*fineS), tuft*0.55);
  float scrub = smoothstep(0.7, 0.86, vnoise(wp.xz*2.7)) * (1.0 - wall) * smoothstep(0.3,0.6,patchA);
  col = mix(col, vec3(0.10,0.11,0.05), scrub*0.55);

  // ba\u011F, bah\xE7e ve tarlalar
  float gmask = smoothstep(0.28, 0.6, green) * (1.0 - smoothstep(0.12, 0.3, slope));
  if (gmask > 0.0) {
    vec2 cell = floor(wp.xz / 46.0);
    float ang = hash12(cell) * 3.14159;
    vec2 dir = vec2(cos(ang), sin(ang));
    float rows = 0.5 + 0.5*sin(dot(wp.xz, dir) * 2.1);
    float kind = hash12(cell + 9.0);
    rows = smoothstep(0.25, 0.85, rows);
    vec3 vine = mix(vec3(0.07,0.12,0.03), vec3(0.24,0.27,0.07), rows);
    vec3 crop = mix(vec3(0.28,0.24,0.08), vec3(0.37,0.31,0.12), rows);
    vec3 orch = mix(vec3(0.07,0.14,0.04), vec3(0.14,0.20,0.06), vnoise(wp.xz*0.5));
    vec3 fld = kind < 0.4 ? vine : kind < 0.72 ? crop : orch;
    fld *= 0.85 + 0.3*vnoise(wp.xz*0.35);
    col = mix(col, fld, gmask);
  }

  // ---- yak\u0131n alan: \xE7ak\u0131l, ta\u015F ve toprak dokusu ----
  float nd = 1.0 - smoothstep(8.0, 75.0, dist);
  if (nd > 0.0) {
    vec2 q = wp.xz * 2.6; vec2 ci = floor(q); vec2 cf = fract(q) - 0.5;
    float rn = hash12(ci); vec2 off = (hash22(ci + 3.0) - 0.5) * 0.45;
    float rr = length(cf - off); float rad = 0.10 + 0.17*rn;
    float peb = smoothstep(rad, rad*0.55, rr) * step(0.5, hash12(ci + 7.0)) * (1.0 - wall);
    vec2 pd = (cf - off) / max(rr, 0.02);
    N = normalize(N + vec3(pd.x, 0.0, pd.y) * peb * 0.55 * nd);
    col *= mix(1.0, 0.55 + 0.9*hash12(ci+11.0), peb*nd);
    float grain = vnoise(wp.xz*17.0) - 0.5, grain2 = vnoise(wp.xz*45.0) - 0.5;
    col *= 1.0 + (grain*0.45 + grain2*0.3) * nd;
    // y\xFCksek frekansl\u0131 \xE7\u0131k\u0131nt\u0131
    float b0 = vnoise(wp.xz*6.0), bx = vnoise((wp.xz+vec2(0.06,0.0))*6.0), bz = vnoise((wp.xz+vec2(0.0,0.06))*6.0);
    N = normalize(N + vec3(b0-bx, 0.0, b0-bz) * 0.9 * nd * nd);
  }

  // ---- \u0131\u015F\u0131k ----
  float NdL = max(dot(N, uLightDir), 0.0);
  float sh = 1.0;
  if (NdL > 0.0 && dist < 5200.0) sh = sunShadow(wp + N*0.6, 1.5);
  float bs = balloonShadow(wp);
  float ao = terrainAO(wp + N*0.4, N);
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5 + 0.5) * ao;
  // duvardan yans\u0131yan s\u0131cak \u0131\u015F\u0131k
  vec3 bounce = uLightColor * 0.05 * ao * (1.0 - N.y) * vec3(1.0, 0.6, 0.4);
  vec3 lit = col * (uLightColor * NdL * sh * bs + amb + bounce);
  vec3 outc = applyFog(lit, wp);
  gl_FragColor = vec4(outc, 1.0);
}
`});function nv(i){let t=0;for(;t<Jo.length-2&&i>Jo[t+1][0];)t++;let e=Jo[t],n=Jo[t+1],s=ze.clamp((i-e[0])/(n[0]-e[0]),0,1),r=s*s*(3-2*s)*.35+s*.65;return{a:e,b:n,t:r}}function iv(i){return 64*Math.sin(2*Math.PI*(i-6)/24)+1.5}function sv(i){return ze.degToRad(72+(i-6)*15.5)}function Ic(i){let t=iv(i),e=sv(i),n=ze.degToRad(t);Lt.uSunDir.value.set(Math.cos(n)*Math.sin(e),Math.sin(n),-Math.cos(n)*Math.cos(e)).normalize();let{a:s,b:r,t:a}=nv(t),o=(h,d)=>d.copy(s[h]).lerp(r[h],a);o(1,Lt.uSkyTop.value),o(2,Lt.uSkyHor.value),o(3,Lt.uSkyGlow.value),o(4,Lt.uLightColor.value),o(5,Lt.uAmbSky.value),o(6,Lt.uAmbGround.value),Lt.uLightColor.value.multiplyScalar(.52),Lt.uFogDensity.value=s[7]+(r[7]-s[7])*a,Lt.uMist.value=s[8]+(r[8]-s[8])*a,In.exposure=s[9]+(r[9]-s[9])*a,In.elev=t,In.hour=i;let l=ze.smoothstep(-t,2,9);In.moon=l,Lt.uLightColor.value.r+=.13*l,Lt.uLightColor.value.g+=.19*l,Lt.uLightColor.value.b+=.34*l,Lt.uAmbSky.value.r+=.02*l,Lt.uAmbSky.value.g+=.035*l,Lt.uAmbSky.value.b+=.075*l;let c=ze.smoothstep(t,-6,-2);Lt.uLightDir.value.copy(Xu).lerp(Lt.uSunDir.value,c).normalize(),Lt.uNight.value=ze.smoothstep(-t,-3,6)}function qu(){let i=new Yi(1,48,32),t=new Ft({uniforms:{...Lt,uMoonDir:{value:Xu},uMoon:{value:0}},vertexShader:rv,fragmentShader:av,side:Ye,depthWrite:!1,depthTest:!1}),e=new ue(i,t);return e.scale.setScalar(9e4),e.frustumCulled=!1,e.renderOrder=-100,e.onBeforeRender=(n,s,r)=>{e.position.copy(r.position),t.uniforms.uMoon.value=In.moon},e}var Ut,Jo,dS,Xu,In,rv,av,Yu=ce(()=>{Ie();fi();Ut=(i,t,e)=>new Pt(i,t,e),Jo=[[-20,Ut(.002,.004,.014),Ut(.01,.016,.04),Ut(0,0,0),Ut(0,0,0),Ut(.012,.018,.048),Ut(.008,.008,.014),5e-5,.5,2.1],[-10,Ut(.01,.028,.1),Ut(.1,.11,.24),Ut(.25,.1,.1),Ut(0,0,0),Ut(.032,.052,.13),Ut(.03,.025,.04),8e-5,.9,1.6],[-5,Ut(.06,.12,.3),Ut(.55,.38,.5),Ut(.9,.32,.2),Ut(.03,.012,.008),Ut(.075,.1,.2),Ut(.06,.045,.05),1e-4,1,1.25],[-1.5,Ut(.11,.22,.48),Ut(.95,.58,.42),Ut(2.4,.95,.35),Ut(1.3,.44,.16),Ut(.16,.19,.3),Ut(.12,.08,.07),11e-5,1,1],[3,Ut(.17,.31,.58),Ut(1.05,.72,.52),Ut(2.6,1.25,.5),Ut(3.7,1.9,.85),Ut(.24,.28,.4),Ut(.17,.12,.09),12e-5,.85,.86],[10,Ut(.2,.36,.68),Ut(.9,.8,.72),Ut(1.6,1,.5),Ut(4.5,3.3,2.2),Ut(.32,.4,.55),Ut(.22,.17,.12),13e-5,.4,.74],[25,Ut(.15,.32,.72),Ut(.68,.78,.92),Ut(.8,.6,.35),Ut(5,4.2,3.4),Ut(.36,.46,.66),Ut(.26,.21,.16),14e-5,0,.64],[65,Ut(.1,.27,.68),Ut(.6,.74,.92),Ut(.3,.25,.2),Ut(5.3,4.8,4.2),Ut(.34,.46,.7),Ut(.28,.23,.18),14e-5,0,.6]],dS=new Pt;Xu=new I(-.6,.55,.4).normalize();In={exposure:.8,elev:30,hour:8,moon:0};rv=`
varying vec3 vDir;
void main(){
  vDir = position;
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`,av=`
${Pe}
${qe}
uniform vec3 uMoonDir;
uniform float uMoon;
varying vec3 vDir;

float cloudField(vec2 p){
  float f = gfbm(p, 5);
  return f;
}

void main(){
  vec3 d = normalize(vDir);
  vec3 col = skyColor(d);
  float sd = dot(d, uSunDir);
  // g\xFCne\u015F diski ve \u0131\u015F\u0131mas\u0131
  float vis = smoothstep(-0.05, 0.02, uSunDir.y);
  vec3 sunCol = uLightColor * 0.9 + uSkyGlow*0.4;
  float disc = smoothstep(0.99992, 0.99998, sd);
  col += sunCol * disc * 30.0 * vis;
  col += sunCol * (pow(max(sd,0.0), 400.0)*0.9 + pow(max(sd,0.0), 60.0)*0.12) * vis;

  // y\u0131ld\u0131zlar
  float nightAmt = uNight;
  if (nightAmt > 0.01 && d.y > 0.0) {
    vec2 uv = vec2(atan(d.z, d.x), asin(clamp(d.y,-1.,1.))) * 95.0;
    vec2 cell = floor(uv), fr = fract(uv) - 0.5;
    float h = hash12(cell);
    float st = step(0.965, h);
    vec2 o = (hash22(cell+3.1) - 0.5) * 0.5;
    float r = length(fr - o);
    float tw = 0.7 + 0.3*sin(uTime*(1.0+h*5.0) + h*40.0);
    col += vec3(0.85,0.9,1.0) * st * smoothstep(0.16, 0.0, r) * (0.5 + 1.8*hash12(cell+9.0)) * tw * nightAmt * smoothstep(0.0, 0.25, d.y);
    // Samanyolu benzeri hafif bulut
    float band = exp(-pow(dot(d, normalize(vec3(0.3,0.5,-0.8))) * 4.0, 2.0));
    col += vec3(0.05,0.06,0.09) * band * (0.4+0.6*vnoise(uv*0.15)) * nightAmt;
  }
  // ay
  if (uMoon > 0.01) {
    float md = dot(d, uMoonDir);
    float mdisc = smoothstep(0.99955, 0.99972, md);
    col += vec3(0.85,0.9,1.0) * mdisc * 3.5 * uMoon;
    col += vec3(0.25,0.32,0.5) * (pow(max(md,0.0), 80.0)*0.6 + pow(max(md,0.0),8.0)*0.06) * uMoon;
  }

  // bulutlar
  if (d.y > 0.005) {
    vec2 uv = d.xz / (d.y + 0.08) * 0.55 + vec2(uTime*0.004, uTime*0.0015) + vec2(3.0, 7.0);
    float f = cloudField(uv);
    float dens = smoothstep(0.02, 0.42, f);
    // g\xFCne\u015Fe do\u011Fru ikinci \xF6rnek: \xF6z g\xF6lge
    vec2 sdir = normalize(uSunDir.xz + 0.0001) * 0.045 / max(uSunDir.y + 0.25, 0.25);
    float f2 = cloudField(uv + sdir);
    float shade = clamp((f - f2)*4.0 + 0.55, 0.0, 1.0);
    vec3 lit = uLightColor * 0.16 + uSkyGlow * 0.35 * (0.5 + 0.5*max(sd,0.0)) ;
    vec3 dark = uAmbSky * 1.2 + uSkyHor * 0.25;
    vec3 ccol = mix(dark, lit + dark*0.6, shade);
    ccol += uSkyGlow * pow(max(sd, 0.0), 8.0) * 0.5 * (1.0 - dens*0.5);
    float fadeH = smoothstep(0.005, 0.20, d.y);
    // ince sirrus
    float ci = smoothstep(0.1, 0.5, gfbm(vec2(uv.x*0.5, uv.y*2.8) + 4.0, 4)) * 0.35;
    float alpha = clamp(dens*0.9 + ci*(1.0-dens), 0.0, 1.0) * fadeH;
    col = mix(col, ccol, alpha);
  }
  gl_FragColor = vec4(col, 1.0);
}
`});var zs,Pc=ce(()=>{zs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`}});var yn,ov,Lc,lv,Fi,ks=ce(()=>{Ie();yn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},ov=new li(-1,1,1,-1,0,1),Lc=class extends ie{constructor(){super(),this.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new zt([0,2,0,0,2,0],2))}},lv=new Lc,Fi=class{constructor(t){this._mesh=new ue(lv,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,ov)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}});var Hs,Nc=ce(()=>{Ie();ks();Hs=class extends yn{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Ft?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ui.clone(t.uniforms),this.material=new Ft({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Fi(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}});var zr,Ko,Zu=ce(()=>{ks();zr=class extends yn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Ko=class extends yn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}});var Qo,$u=ce(()=>{Ie();Pc();Nc();Zu();Qo=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new Ct);this._width=n.width,this._height=n.height,e=new Me(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Te}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Hs(zs),this.copyPass.material.blending=Rn,this.timer=new Zi}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}zr!==void 0&&(a instanceof zr?n=!0:a instanceof Ko&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new Ct);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}});var jo,Ju=ce(()=>{Ie();ks();jo=class extends yn{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Pt}render(t,e,n){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}}});var Ku,Qu=ce(()=>{Ie();Ku={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Pt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`}});var Vs,ju=ce(()=>{Ie();ks();Pc();Qu();Vs=class i extends yn{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new Ct(t.x,t.y):new Ct(256,256),this.clearColor=new Pt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Me(r,a,{type:Te,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new Me(r,a,{type:Te,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let u=new Me(r,a,{type:Te,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}let o=Ku;this.highPassUniforms=ui.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ft({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Ct(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ui.clone(zs.uniforms),this.blendMaterial=new Ft({uniforms:this.copyUniforms,vertexShader:zs.vertexShader,fragmentShader:zs.fragmentShader,premultipliedAlpha:!0,blending:ci,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Pt,this._oldClearAlpha=1,this._basic=new Xi,this._fsQuad=new Fi(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Ct(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){let e=[],n=t/3;for(let a=0;a<t;a++)e.push(.39894*Math.exp(-.5*a*a/(n*n))/n);let s=[],r=[];for(let a=1;a<t;a+=2){let o=e[a],l=a+1<t?e[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new Ft({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new Ct(.5,.5)},direction:{value:new Ct(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new Ft({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Vs.BlurDirectionX=new Ct(1,0);Vs.BlurDirectionY=new Ct(0,1)});var kr,tf=ce(()=>{kr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`}});var tl,ef=ce(()=>{Ie();ks();tf();tl=class extends yn{constructor(){super(),this.isOutputPass=!0,this.uniforms=ui.clone(kr.uniforms),this.material=new Rs({name:kr.name,uniforms:this.uniforms,vertexShader:kr.vertexShader,fragmentShader:kr.fragmentShader}),this._fsQuad=new Fi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},qt.getTransfer(this._outputColorSpace)===ne&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Mr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Sr?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===br?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ji?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Er?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Tr?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===wr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}});function nf(i,t,e){let n=i.getDrawingBufferSize(new Ct),s=new Me(n.x,n.y,{type:Te,samples:4}),r=new Qo(i,s),a=new jo(t,e),o=new Vs(new Ct(n.x,n.y),.42,.75,1.15),l=new Hs(cv),c=new tl;return r.addPass(a),r.addPass(o),r.addPass(l),r.addPass(c),{composer:r,bloom:o,grade:l,out:c,rp:a}}var cv,sf=ce(()=>{Ie();$u();Ju();ju();Nc();ef();cv={uniforms:{tDiffuse:{value:null},uFade:{value:0},uVig:{value:.32},uTime:{value:0},uGrain:{value:.012},uAspect:{value:1},uNightMix:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform float uFade, uVig, uTime, uGrain, uAspect, uNightMix;
    varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
    void main(){
      vec2 c = vUv - 0.5;
      // hafif kromatik sapma
      float ca = dot(c,c) * 0.0035;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + c*ca).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - c*ca).b;
      // vinyet
      float v = smoothstep(0.95, 0.15, length(c*vec2(uAspect*0.75, 1.0))*1.15);
      col *= mix(1.0 - uVig, 1.0, v);
      // s\u0131cak/so\u011Fuk ton ay\u0131rma: g\xF6lgeler serin, ayd\u0131nl\u0131klar s\u0131cak
      float l = dot(col, vec3(0.2126,0.7152,0.0722));
      col = mix(col, col*vec3(0.93,0.98,1.08), (1.0 - smoothstep(0.0, 0.5, l))*0.45);
      col = mix(col, col*vec3(1.05,1.0,0.93), smoothstep(0.4, 2.0, l)*0.35);
      // film greni
      float g = h(vUv*vec2(1920.,1080.) + fract(uTime)*137.0) - 0.5;
      col += g * uGrain * (0.4 + 0.6*(1.0 - clamp(l,0.0,1.0)));
      col *= 1.0 - uFade;
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }`}});function Gn(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Bi(i,t,e){let n=Math.imul(i|0,374761393)+Math.imul(t|0,668265263)+Math.imul(e|0,1274126177);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function Hr(i,t,e){let n=Math.floor(i),s=Math.floor(t),r=Math.floor(e),a=Dc(i-n),o=Dc(t-s),l=Dc(e-r),c=(h,d,u)=>h+(d-h)*u;return c(c(c(Bi(n,s,r),Bi(n+1,s,r),a),c(Bi(n,s+1,r),Bi(n+1,s+1,r),a),o),c(c(Bi(n,s,r+1),Bi(n+1,s,r+1),a),c(Bi(n,s+1,r+1),Bi(n+1,s+1,r+1),a),o),l)}function hv(i,t){return Hr(i,t,.37)}function el(i,t,e=4){let n=.5,s=0;for(let r=0;r<e;r++)s+=n*hv(i,t),i=i*2.03+11,t=t*2.03+7,n*=.5;return s/.9375}var Dc,di,Gs,Vn,Ws=ce(()=>{Dc=i=>i*i*(3-2*i);di=(i,t,e)=>{let n=Math.min(Math.max((e-i)/(t-i),0),1);return n*n*(3-2*n)},Gs=class{constructor(t,e){this.size=t,this.n=e,this.cell=t/e,this.items=Array.from({length:e*e},()=>[])}idx(t,e){let n=Math.min(this.n-1,Math.max(0,Math.floor((t+this.size/2)/this.cell)));return Math.min(this.n-1,Math.max(0,Math.floor((e+this.size/2)/this.cell)))*this.n+n}add(t,e,n){this.items[this.idx(t,e)].push(n)}center(t){let e=t%this.n,n=Math.floor(t/this.n);return[-this.size/2+(e+.5)*this.cell,-this.size/2+(n+.5)*this.cell]}},Vn=class{constructor(t=24){this.c=t,this.m=new Map}key(t,e){return t*73856093^e*19349663}add(t,e,n,s){let r=Math.floor(t/this.c),a=Math.floor(e/this.c),o=this.key(r,a),l=this.m.get(o);l||(l=[],this.m.set(o,l)),l.push({x:t,z:e,r:n,data:s})}query(t,e,n,s){let r=Math.floor((t-n)/this.c),a=Math.floor((t+n)/this.c),o=Math.floor((e-n)/this.c),l=Math.floor((e+n)/this.c);for(let c=o;c<=l;c++)for(let h=r;h<=a;h++){let d=this.m.get(this.key(h,c));if(d)for(let u of d)s(u)}}anyWithin(t,e,n){let s=!1;return this.query(t,e,n+12,r=>{let a=r.x-t,o=r.z-e,l=r.r+n;a*a+o*o<l*l&&(s=!0)}),s}}});function rf(i,t,e,n,s){let r=s*s,a=r*s;return .5*(2*t+(-i+e)*s+(2*i-5*t+4*e-n)*r+(-i+3*t-3*e+n)*a)}function af(i,t){let e=i.pts,n=e.length-1,s=Math.min(Math.max(t,0),1)*n,r=Math.min(Math.floor(s),n-1),a=s-r,o=l=>e[Math.min(Math.max(l,0),n)];return[rf(o(r-1)[0],o(r)[0],o(r+1)[0],o(r+2)[0],a),rf(o(r-1)[1],o(r)[1],o(r+1)[1],o(r+2)[1],a)]}function Vr(i,t,e,n,s){let[r,a]=af(i,t),o=Math.cos(e),l=Math.sin(e),c=a>i.capY,h=Hr(o*1.4+n,a*2.6,l*1.4+n*.7),d=Hr(o*5+n*3,a*.9,l*5+n),u=Hr(o*3+n*5,a*7,l*3),p=1+.2*(h-.5)*2+(c?.05:.1)*(d-.5)*2+.035*(u-.5)*2;p*=1+.1*(1-di(0,.22,a))*(h-.5);let g=Math.max(0,r)*p;return s[0]=g*o,s[1]=a+(c?0:.02*(d-.5)*0),s[2]=g*l,s}function uv(i,t,e,n){let s=[],r=[],a=[],o=[],l=[],c=[0,0,0],h=[0,0,0],d=[0,0,0],u=1/(n*6),p=.01;for(let A=0;A<=n;A++){let x=A/n;for(let T=0;T<=e;T++){let R=T/e*Math.PI*2;Vr(i,x,R,t,c),s.push(c[0],c[1],c[2]);let P=Math.min(1,x+u),N=Math.max(0,x-u);Vr(i,P,R,t,h);let B=h[0],L=h[1],O=h[2];Vr(i,N,R,t,h);let G=B-h[0],W=L-h[1],Q=O-h[2];Vr(i,x,R+p,t,h);let Y=h[0],K=h[1],nt=h[2];Vr(i,x,R-p,t,d);let vt=Y-d[0],_t=K-d[1],ae=nt-d[2],Wt=W*ae-Q*_t,Kt=Q*vt-G*ae,Z=G*_t-W*vt,tt=Math.hypot(Wt,Kt,Z)||1;A===n&&(Wt=0,Kt=1,Z=0,tt=1),r.push(Wt/tt,Kt/tt,Z/tt),a.push(T/e,x),o.push(c[1]>i.capY?1:0)}}for(let A=0;A<n;A++)for(let x=0;x<e;x++){let T=A*(e+1)+x,R=T+1,P=T+e+1,N=P+1;l.push(T,R,P,R,N,P)}let g=new ie;g.setAttribute("position",new zt(s,3)),g.setAttribute("normal",new zt(r,3)),g.setAttribute("aUV",new zt(a,2)),g.setAttribute("aCap",new zt(o,1)),g.setIndex(l);let _=l[0],m=l[1],f=l[2],M=new I(s[_*3],s[_*3+1],s[_*3+2]),E=new I(s[m*3],s[m*3+1],s[m*3+2]),v=new I(s[f*3],s[f*3+1],s[f*3+2]),S=new I().crossVectors(E.clone().sub(M),v.clone().sub(M)),b=new I(r[_*3],r[_*3+1],r[_*3+2]);if(S.dot(b)<0){for(let A=0;A<l.length;A+=3){let x=l[A+1];l[A+1]=l[A+2],l[A+2]=x}g.setIndex(l)}return g.boundingSphere=new he(new I(0,.5,0),1.3),g}function fv(i){let e=new Float32Array(25),n=400;for(let s=0;s<=24;s++)e[s]=-1;for(let s=0;s<=n;s++){let[r,a]=af(i,s/n),o=Math.floor(Math.max(r,0)/i.r*24);for(let l=0;l<=Math.min(o,24);l++)e[l]=Math.max(e[l],a)}return e}function mv(){return new Ft({uniforms:{...Lt},vertexShader:dv,fragmentShader:pv})}function of(i,t){let e=Gn(20260929),n=new Vn(20),s=[],r=f=>we.find(M=>M.id===f),a=r("goreme"),o=r("balon"),l=r("uchisar"),c=we.filter(f=>f.kind==="valley"),h=new I,d=f=>f?f.id==="ask"?[.24,.6,.05,.11]:f.id==="devrent"?[.22,.08,.55,.15]:f.id==="pasabag"?[.7,.12,.05,.13]:f.id==="guvercinlik"?[.26,.48,.13,.13]:[.36,.34,.14,.16]:[.36,.34,.14,.16],u=(f,M)=>M<f[0]?0:M<f[0]+f[1]?1:M<f[0]+f[1]+f[2]?2:3,p=(f,M,E,v,S)=>{if(Math.abs(f)>1780||Math.abs(M)>1780)return!1;let b=Xs[E],A=v*(E===3?.62:E===2?.4:E===1?.3:.33)*(.85+.35*e()),x=b.pts[0][0]*A,T=b.r*A;if(n.anyWithin(f,M,Math.max(x,T)*.85))return!1;let R=1e9,P=-1e9;for(let W=0;W<8;W++){let Q=W/8*Math.PI*2,Y=i.heightAt(f+Math.cos(Q)*x*.85,M+Math.sin(Q)*x*.85);R=Math.min(R,Y),P=Math.max(P,Y)}if(!S&&P-R>x*1.7)return!1;let N=R-.15-Math.min(P-R,3)*.05,B=e()*Math.PI*2,L=(e()-.5)*.09,O=e()*Math.PI*2,G=i.regionAt(f,M);return s.push({x:f,z:M,y0:N,type:E,H:v,Rs:A,yaw:B,lean:L,leanDir:O,seed:e(),tone:e(),region:G,dwell:e()<.34&&v>11?.6+e()*.6:0}),n.add(f,M,Math.max(x*.9,T*.75),null),!0},g=3200,_=5e5;for(let f=0;f<_&&s.length<g;f++){let M=(e()*2-1)*1740,E=(e()*2-1)*1740,S=1-i.normalAt(M,E,h).y,b=i.greenAt(M,E);if(Math.hypot(M-a.x,E-a.z)<a.r*.7||Math.hypot(M-o.x,E-o.z)<o.r*.9)continue;let A=Math.max(di(.04,.16,S),.28*di(0,.05,S+.02))*(1-di(.4,.62,S));A*=1-.85*di(.35,.8,b);let x=1,T=null;for(let G of c){let W=Math.hypot(M-G.x,E-G.z);if(W<G.r*1.15){let Q=1-W/(G.r*1.15);Q*6>x&&(x=1+Q*7,T=G)}}let R=di(.38,.72,el(M*.0042+3,E*.0042+9,3));if(Math.hypot(M-l.x,E-l.z)<150)continue;T&&(A=Math.max(A,.25*di(0,.08,S)*(1-di(.4,.62,S))*(1-b*.9)));let N=A*(.18+R*.95)*x*.22;if(e()>N)continue;let B=d(T),L=u(B,e()),O=L===1?7+Math.pow(e(),1.4)*20:L===2?5+e()*10:L===3?5+e()*9:6+Math.pow(e(),1.3)*17;if(T&&T.id==="ask"&&(O*=1.25),T&&T.id==="devrent"&&(O*=.9),p(M,E,L,O,!1)){let G=T?e()<.55?3:1:e()<.3?2:0;for(let W=0;W<G;W++){let Q=e()*Math.PI*2,Y=O*(.28+.35*e())+4,K=T&&T.id==="pasabag"?0:e()<.6?L:e()<.5?0:1;p(M+Math.cos(Q)*Y,E+Math.sin(Q)*Y,K,O*(.45+.5*e()),!1)}}}let m=[];for(let f=0;f<110;f++)m.push([(e()*2-1)*1650,(e()*2-1)*1650]);m.push([150,300],[-40,240],[260,330],[90,420],[-150,520],[-260,470]);for(let[f,M]of m){if(Math.hypot(f-a.x,M-a.z)<a.r*.85||Math.hypot(f-o.x,M-o.z)<o.r||Math.hypot(f-l.x,M-l.z)<190||i.greenAt(f,M)>.55||i.slopeAt(f,M)>.4)continue;let E=e(),v=5+Math.floor(e()*16),S=22+e()*46,b=c.find(x=>Math.hypot(f-x.x,M-x.z)<x.r*1.1)||null,A=d(b);for(let x=0;x<v*4&&x<v*4;x++){let T=e()*Math.PI*2,R=Math.sqrt(e())*S,P=f+Math.cos(T)*R,N=M+Math.sin(T)*R,B=u(A,e()),L=(B===1?6+Math.pow(e(),1.4)*17:B===2?4.5+e()*9:B===3?4+e()*8:5.5+Math.pow(e(),1.3)*14)*(.55+.8*(1-R/S));p(P,N,B,L,!1)}}return s}function lf(i,t){let e=new Float32Array(i.H),n=Xs.map(fv);for(let s of t){let r=Xs[s.type],a=n[s.type],o=r.r*s.Rs*1.02,l=Math.floor((s.x-o+2048)/2),c=Math.ceil((s.x+o+2048)/2),h=Math.floor((s.z-o+2048)/2),d=Math.ceil((s.z+o+2048)/2);for(let u=h;u<=d;u++)if(!(u<0||u>=2048))for(let p=l;p<=c;p++){if(p<0||p>=2048)continue;let g=-2048+(p+.5)*2,_=-2048+(u+.5)*2,m=Math.hypot(g-s.x,_-s.z)/s.Rs/r.r;if(m>1)continue;let f=a[Math.min(24,Math.floor(m*24))];if(f<0)continue;let M=s.y0+f*s.H,E=u*2048+p;M>e[E]&&(e[E]=M)}}return e}function cf(i,t){let e=mv(),n=Xs.map((g,_)=>uv(g,3.7+_*5.1,22,20)),s=new Gs(4096,8);for(let g of i)s.add(g.x,g.z,g);let r=new Oe,a=[],o=new jt,l=new Ce,c=new Ce,h=new En,d=new I,u=new I,p=new I;for(let g=0;g<s.items.length;g++){let _=s.items[g];if(_.length)for(let m=0;m<Xs.length;m++){let f=_.filter(x=>x.type===m);if(!f.length)continue;let M=n[m],E=new an;E.index=M.index,E.attributes={...M.attributes},E.boundingSphere=M.boundingSphere;let v=new Float32Array(f.length*4),S=new vn(E,e,f.length);f.forEach((x,T)=>{l.setFromAxisAngle(p.set(0,1,0),x.yaw),c.setFromAxisAngle(p.set(Math.cos(x.leanDir),0,Math.sin(x.leanDir)).cross(new I(0,1,0)).normalize(),x.lean),l.premultiply(c),d.set(x.x,x.y0,x.z),u.set(x.Rs,x.H,x.Rs),o.compose(d,l,u),S.setMatrixAt(T,o),v[T*4]=x.seed,v[T*4+1]=x.tone,v[T*4+2]=x.dwell,v[T*4+3]=x.region}),E.setAttribute("aInst",new be(v,4)),S.instanceMatrix.needsUpdate=!0,S.computeBoundingSphere(),S.frustumCulled=!0;let[b,A]=s.center(g);S.userData.cx=b,S.userData.cz=A,r.add(S),a.push(S)}}return t.add(r),{group:r,meshes:a,geos:n}}function hf(i){let t=new Vn(24);for(let e of i){let n=Xs[e.type];t.add(e.x,e.z,n.pts[0][0]*e.Rs*.75,e)}return t}var Xs,dv,pv,uf=ce(()=>{Ie();Kn();fi();Cc();Ws();Xs=[{pts:[[.64,0],[.55,.035],[.4,.14],[.29,.32],[.225,.52],[.195,.7],[.175,.775],[.2,.808],[.34,.822],[.385,.85],[.365,.895],[.29,.945],[.15,.985],[0,1]],capY:.81,r:.385},{pts:[[.7,0],[.54,.06],[.37,.22],[.27,.45],[.19,.68],[.125,.86],[.065,.955],[0,1]],capY:2,r:.7},{pts:[[.74,0],[.56,.05],[.37,.19],[.31,.4],[.3,.56],[.33,.64],[.46,.685],[.58,.72],[.6,.79],[.52,.9],[.32,.968],[0,1]],capY:.66,r:.74},{pts:[[.95,0],[.8,.05],[.58,.2],[.42,.44],[.31,.66],[.2,.85],[.09,.96],[0,1]],capY:2,r:.95}];dv=`
attribute vec2 aUV; attribute float aCap; attribute vec4 aInst;
varying vec3 vWorld; varying vec3 vN; varying vec2 vUV; varying float vCap; varying vec4 vInst; varying vec3 vLocal;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  vec3 s = vec3(length(M[0].xyz), length(M[1].xyz), length(M[2].xyz));
  vN = normalize(mat3(M) * (normal / (s*s)));
  vWorld = wp.xyz; vUV = aUV; vCap = aCap; vInst = aInst;
  vLocal = position * s;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,pv=`
${Pe}
${qe}
${kn}
${Qn}
${Rc}
varying vec3 vWorld; varying vec3 vN; varying vec2 vUV; varying float vCap; varying vec4 vInst; varying vec3 vLocal;

float archSDF(vec2 p, float w, float h){
  // p: merkez tabanda, y yukar\u0131. Dikd\xF6rtgen + yar\u0131m daire
  float rr = w*0.5;
  vec2 q = vec2(abs(p.x), p.y);
  float rect = max(q.x - rr, max(-q.y, q.y - (h - rr)));
  float circ = length(vec2(q.x, q.y - (h - rr))) - rr;
  return q.y > h - rr ? circ : rect;
}

void main(){
  vec3 wp = vWorld;
  vec3 N = normalize(vN);
  float dist = length(wp - cameraPosition);
  float y = vUV.y;
  float region = vInst.w;

  // --- y\xFCzey detay\u0131 ---
  float e = 0.22;
  vec3 lp = vLocal;
  float f0 = vnoise3(lp*vec3(1.6,0.35,1.6))*0.6 + vnoise3(lp*vec3(5.0,1.0,5.0))*0.4;
  float dfade = 1.0 - smoothstep(60.0, 300.0, dist);
  if (dfade > 0.0) {
    float fx = vnoise3((lp+vec3(e,0,0))*vec3(1.6,0.35,1.6))*0.6 + vnoise3((lp+vec3(e,0,0))*vec3(5.0,1.0,5.0))*0.4;
    float fy = vnoise3((lp+vec3(0,e,0))*vec3(1.6,0.35,1.6))*0.6 + vnoise3((lp+vec3(0,e,0))*vec3(5.0,1.0,5.0))*0.4;
    float fz = vnoise3((lp+vec3(0,0,e))*vec3(1.6,0.35,1.6))*0.6 + vnoise3((lp+vec3(0,0,e))*vec3(5.0,1.0,5.0))*0.4;
    vec3 g = vec3(fx-f0, fy-f0, fz-f0)/e;
    g -= N*dot(g,N);
    N = normalize(N - g*0.35*dfade);
  }

  // --- albedo: d\xFCnya y\xFCksekli\u011Fine g\xF6re t\xFCf katmanlar\u0131 ---
  float warp = gnoise(wp.xz*0.006)*3.0;
  float bp = (wp.y + warp) / 3.3;
  float bi = floor(bp), bf = fract(bp);
  float rg = floor(region*4.0);
  vec3 c1 = strataColor(hash12(vec2(bi, rg)), region);
  vec3 c2 = strataColor(hash12(vec2(bi+1.0, rg)), region);
  vec3 col = mix(c1, c2, smoothstep(0.78, 1.0, bf));
  col *= 0.80 + 0.28*vInst.y;
  col *= mix(vec3(1.0), vec3(1.06,0.94,0.86), vInst.x);
  float streak = vnoise3(vec3(lp.x*2.4, lp.y*0.3, lp.z*2.4));
  col *= 0.8 + 0.36*streak;
  col *= 0.85 + 0.3*f0;
  // ba\u015Fl\u0131k: koyu bazalt/ignimbrit
  float capMask = smoothstep(0.35, 0.65, vCap) ;
  vec3 capCol = vec3(0.14,0.10,0.08) * (0.7 + 0.8*vnoise3(lp*vec3(3.0,3.0,3.0)));
  capCol = mix(capCol, vec3(0.26,0.19,0.14), 0.5*vnoise3(lp*1.3));
  col = mix(col, capCol, capMask);
  // dipte toprakla kar\u0131\u015F
  vec3 soil = vec3(0.34,0.26,0.18);
  col = mix(soil, col, smoothstep(0.0, 0.11, y));

  // --- kaya evleri / pencereler ---
  if (vInst.z > 0.5 && vCap < 0.5 && y > 0.05 && y < 0.72 && dist < 700.0) {
    float th = atan(lp.z, lp.x);
    float rad = max(length(lp.xz), 0.4);
    float arc = th * rad;
    vec2 cellSz = vec2(2.4, 3.2);
    vec2 cp = vec2(arc, lp.y + 0.7*sin(th*3.0)) / cellSz;
    vec2 ci = floor(cp), cf = fract(cp);
    float hh = hash12(ci + floor(vInst.x*97.0));
    if (hh < 0.22 * vInst.z) {
      vec2 lpx = (cf - vec2(0.5, 0.12)) * cellSz;
      float w = 0.85 + 0.5*hash12(ci+3.0), h = 1.2 + 0.9*hash12(ci+7.0);
      float sd = archSDF(lpx, w, h);
      float inside = 1.0 - smoothstep(-0.02, 0.05, sd);
      float lip = (1.0 - smoothstep(0.0, 0.16, sd)) * (1.0 - inside);
      vec3 hole = vec3(0.012,0.009,0.008) + vec3(0.04,0.03,0.02)*smoothstep(0.5,-0.4,lpx.y)*0.4;
      col = mix(col, col*1.12 + 0.02, lip*0.55);
      col = mix(col, hole, inside);
      N = normalize(mix(N, normalize(N + vec3(0,0.0,0)), 0.0));
    }
  }

  // --- \u0131\u015F\u0131k ---
  float NdL = max(dot(N, uLightDir), 0.0);
  float sh = 1.0;
  if (NdL > 0.0 && dist < 4200.0) sh = sunShadow(wp + N*0.4, 5.5);
  float bs = balloonShadow(wp);
  float ao = mix(0.55, 1.0, smoothstep(0.0, 0.2, y));
  ao *= 1.0 - 0.35*smoothstep(0.65, 0.83, y) * (1.0 - vCap) * 0.0;
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5+0.5) * ao;
  vec3 bounce = uLightColor * 0.05 * ao * vec3(1.0,0.62,0.4) * (1.0 - N.y);
  vec3 lit = col * (uLightColor*NdL*sh*bs + amb + bounce);
  gl_FragColor = vec4(applyFog(lit, wp), 1.0);
}
`});function ff(i,t){let e=[[.24,0],[.3,.025],[.5,.11],[.76,.27],[.94,.44],[1,.57],[.95,.71],[.78,.86],[.47,.96],[0,1]],n=(m,f,M,E,v)=>.5*(2*f+(-m+M)*v+(2*m-5*f+4*M-E)*v*v+(-m+3*f-3*M+E)*v*v*v),s=e.length-1,r=m=>{let f=m*s,M=Math.min(Math.floor(f),s-1),E=f-M,v=S=>e[Math.min(Math.max(S,0),s)];return[n(v(M-1)[0],v(M)[0],v(M+1)[0],v(M+2)[0],E),n(v(M-1)[1],v(M)[1],v(M+1)[1],v(M+2)[1],E)]},a=[],o=[],l=[],c=[],h=[];for(let m=0;m<=t;m++)h.push(r(m/t));for(let m=0;m<=t;m++){let[f,M]=h[m],E=Math.max(m-1,0),v=Math.min(m+1,t),S=h[v][0]-h[E][0],b=h[v][1]-h[E][1];for(let A=0;A<=i;A++){let x=A/i*Math.PI*2,T=Math.cos(x),R=Math.sin(x),P=A/i*24,N=1+.018*Math.sin(P*Math.PI*2-Math.PI/2+Math.PI)*0;a.push(f*T*N,M,f*R*N);let B=b,L=-S,O=Math.hypot(B,L)||1;B/=O,L/=O,m===t?o.push(0,1,0):o.push(B*T,L,B*R),l.push(A/i,m/t)}}for(let m=0;m<t;m++)for(let f=0;f<i;f++){let M=m*(i+1)+f,E=M+1,v=M+i+1,S=v+1;c.push(M,v,E,E,v,S)}let d=new ie;d.setAttribute("position",new zt(a,3)),d.setAttribute("normal",new zt(o,3)),d.setAttribute("uv",new zt(l,2)),d.setIndex(c);let u=d.attributes.position,p=d.attributes.normal,g=m=>new I(u.getX(m),u.getY(m),u.getZ(m));if(new I().crossVectors(g(c[1]).sub(g(c[0])),g(c[2]).sub(g(c[0]))).dot(new I(p.getX(c[0]),p.getY(c[0]),p.getZ(c[0])))<0){for(let m=0;m<c.length;m+=3){let f=c[m+1];c[m+1]=c[m+2],c[m+2]=f}d.setIndex(c)}return d.boundingSphere=new he(new I(0,.5,0),1.2),d}function mf(i,t){let e=we.find(R=>R.id==="balon"),n=Gn(31),s=new Oe,o=ff(28,20),l=6,c=new an;c.index=o.index,c.attributes={...o.attributes},c.boundingSphere=new he(new I(0,0,0),60);let h=new Float32Array(l*4),d=new Float32Array(l*4),u=new Float32Array(l*4);for(let R=0;R<l;R++){let P=cn[Math.floor(n()*cn.length)],N=cn[Math.floor(n()*cn.length)],B=cn[8];h.set([...P,Math.floor(n()*6)],R*4),d.set([...N,0],R*4),u.set([...B,0],R*4)}c.setAttribute("aA",new be(h,4)),c.setAttribute("aB",new be(d,4)),c.setAttribute("aC",new be(u,4));let p=new vn(c,new Ft({uniforms:{...Lt},vertexShader:df,fragmentShader:pf}),l),g=[[95,40],[120,-20],[70,95],[-110,60],[-135,-30],[-60,120]],_=new jt,m=new Ce,f=new En,M=new I,E=new I;for(let R=0;R<l;R++){let[P,N]=g[R],B=e.x+P,L=e.z+N,O=t.heightAt(B,L),G=n()*6.28;m.setFromEuler(f.set(0,G,0)).multiply(new Ce().setFromAxisAngle(new I(0,0,1),Math.PI/2)),M.set(B,O+1.3,L),E.set(4.2,22+n()*5,8.5+n()*2),_.compose(M,m,E),p.setMatrixAt(R,_)}p.frustumCulled=!1,s.add(p);let v=new An(1,1,1);v.translate(0,.5,0);let S=9,b=new an;b.index=v.index,b.attributes={...v.attributes},b.boundingSphere=new he(new I(0,1,0),6);let A=new Float32Array(S*4),x=new vn(b,new Ft({uniforms:{...Lt},vertexShader:yv,fragmentShader:Mv}),S),T=[[.75,.75,.72],[.15,.25,.5],[.6,.12,.1],[.85,.82,.7],[.2,.2,.22]];for(let R=0;R<S;R++){let P=n()*6.28,N=70+n()*110,B=e.x+Math.cos(P)*N,L=e.z+Math.sin(P)*N,O=t.heightAt(B,L),G=n()*6.28;m.setFromAxisAngle(new I(0,1,0),G),M.set(B,O-.1,L);let W=n()<.5;E.set(2.1,W?2.4:1.9,W?6:4.6),_.compose(M,m,E),x.setMatrixAt(R,_);let Q=T[Math.floor(n()*T.length)];A.set([...Q,n()],R*4)}return b.setAttribute("aInst",new be(A,4)),x.frustumCulled=!1,s.add(x),i.add(s),s}var ns,es,cn,df,pf,gv,xv,vv,_v,nl,yv,Mv,gf=ce(()=>{Ie();fi();Ws();Kn();ns=24,es=ns+1,cn=[[.85,.03,.03],[.95,.3,.03],[.98,.68,.05],[.03,.55,.55],[.04,.16,.7],[.75,.05,.42],[.1,.6,.14],[.92,.9,.85],[.02,.02,.03],[.55,.1,.65],[.9,.45,.6],[.1,.35,.85]];df=`
attribute vec4 aA; attribute vec4 aB; attribute vec4 aC;
varying vec3 vWorld; varying vec3 vN; varying vec2 vUV; varying vec4 vA; varying vec4 vB; varying vec4 vC;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  vN = normalize(mat3(M) * normal);
  vWorld = wp.xyz; vUV = uv; vA = aA; vB = aB; vC = aC;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,pf=`
${Pe}
${qe}
${kn}
${Qn}
varying vec3 vWorld; varying vec3 vN; varying vec2 vUV; varying vec4 vA; varying vec4 vB; varying vec4 vC;
void main(){
  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vWorld);
  float gore = vUV.x * 24.0;
  float gi = floor(gore), gf = fract(gore);
  float y = vUV.y;
  int pat = int(vA.w + 0.5);
  vec3 c1 = vA.rgb, c2 = vB.rgb, c3 = vC.rgb;
  vec3 col = c1;
  float par = mod(gi, 2.0);
  if (pat == 0) { col = par < 0.5 ? c1 : c2; }
  else if (pat == 1) { float b = floor(y*7.0); col = mod(b, 2.0) < 0.5 ? c1 : c2; if (y > 0.86) col = c3; }
  else if (pat == 2) { float m = mod(gi, 3.0); col = m < 0.5 ? c1 : (m < 1.5 ? c2 : c3); }
  else if (pat == 3) { float z = mod(gi + floor(y*9.0), 2.0); col = z < 0.5 ? c1 : c2; }
  else if (pat == 4) { col = c1; if (y > 0.30 && y < 0.40) col = c2; if (y > 0.62 && y < 0.70) col = c3; if (y > 0.9) col = c2; }
  else { float w = abs(fract(gore*0.5) - 0.5); col = (w + 0.3*sin(y*12.0)) < 0.25 ? c2 : c1; if (y < 0.16) col = c3; }
  // etek
  if (y < 0.055) col = mix(vec3(0.02), c3, 0.35);
  // diki\u015Fler
  float seam = smoothstep(0.0, 0.05, gf) * smoothstep(1.0, 0.95, gf);
  col *= 0.8 + 0.2*seam;
  float ring = smoothstep(0.0, 0.03, abs(fract(y*9.0)-0.0));
  col *= 0.94 + 0.06*ring;
  col *= 0.92 + 0.16*vnoise(vec2(gore*3.0, y*40.0));

  float NdL = max(dot(N, uLightDir), 0.0);
  float wrap = max((dot(N, uLightDir) + 0.35)/1.35, 0.0);
  float bs = 1.0;
  float sh = 1.0;
  float dist = length(vWorld - cameraPosition);
  // terrain onu g\xF6lgeleyebilir (vadi duvar\u0131 vs.)
  if (NdL > 0.0 && dist < 3000.0) sh = sunShadow(vWorld + N*0.5, 3.0);
  // kuma\u015F \u0131\u015F\u0131k ge\xE7irgenli\u011Fi (arka ayd\u0131nlatma)
  float back = pow(max(dot(-N, uLightDir), 0.0), 1.2) * max(dot(V, -uLightDir)*0.5+0.5, 0.0);
  vec3 trans = col * uLightColor * back * 1.0 * sh;
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5+0.5);
  vec3 lit = col * (uLightColor * wrap * sh + amb) + trans;
  // parlakl\u0131k
  vec3 H = normalize(uLightDir + V);
  lit += uLightColor * pow(max(dot(N,H),0.0), 40.0) * 0.06 * sh;
  // br\xFCl\xF6r \u0131\u015F\u0131mas\u0131 (alt yar\u0131da i\xE7ten ayd\u0131nlanma)
  float flame = vC.w;
  float lowMask = smoothstep(0.62, 0.05, y);
  float inner = (0.35*uNight + 0.12 + flame*1.2) * lowMask;
  lit += col * vec3(2.2,1.0,0.35) * inner * (0.6 + 0.4*flame);
  if (!gl_FrontFacing) lit *= 0.42;
  gl_FragColor = vec4(applyFog(lit, vWorld), 1.0);
}
`,gv=`
varying vec3 vWorld; varying vec3 vN; varying vec3 vL;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  vN = normalize(mat3(M) * normal); vWorld = wp.xyz; vL = position;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,xv=`
${Pe}
${qe}
varying vec3 vWorld; varying vec3 vN; varying vec3 vL;
void main(){
  vec3 N = normalize(vN);
  float weave = 0.75 + 0.25*step(0.5, fract(vL.y*9.0 + floor(vL.x*8.0+vL.z*8.0)*0.5));
  vec3 col = vec3(0.30,0.18,0.09)*weave;
  float NdL = max(dot(N, uLightDir), 0.0);
  vec3 lit = col*(uLightColor*NdL*0.9 + mix(uAmbGround,uAmbSky,N.y*0.5+0.5));
  gl_FragColor = vec4(applyFog(lit, vWorld), 1.0);
}`,vv=`
attribute vec4 aF; // xyz konum, w \u015Fiddet
varying vec2 vUv; varying float vI;
void main(){
  vUv = uv; vI = aF.w;
  vec4 mv = viewMatrix * vec4(aF.xyz, 1.0);
  float s = (2.0 + 9.0*aF.w);
  mv.xy += position.xy * s;
  gl_Position = projectionMatrix * mv;
}`,_v=`
varying vec2 vUv; varying float vI;
void main(){
  vec2 p = vUv - 0.5;
  float d = length(p*vec2(1.3, 0.8));
  float core = smoothstep(0.5, 0.0, d);
  float tip = smoothstep(0.5, -0.1, p.y*1.0 + d*0.6);
  float a = core*core*vI * 1.6;
  gl_FragColor = vec4(vec3(1.8,0.85,0.25)*a*3.0, a);
}`,nl=class{constructor(t,e){this.scene=t,this.terrain=e;let n=Gn(77);this.items=[];let a=ff(32,26),o=new an;o.index=a.index,o.attributes={...a.attributes},o.boundingSphere=a.boundingSphere;let l=new Float32Array(es*4),c=new Float32Array(es*4),h=new Float32Array(es*4);this.aC=new be(h,4),o.setAttribute("aA",new be(l,4)),o.setAttribute("aB",new be(c,4)),o.setAttribute("aC",this.aC),this.env=new vn(o,new Ft({uniforms:{...Lt},vertexShader:df,fragmentShader:pf,side:tn}),es),this.env.frustumCulled=!1,this.env.instanceMatrix.setUsage(Ns);let d=new An(1,1,1);this.basket=new vn(d,new Ft({uniforms:{...Lt},vertexShader:gv,fragmentShader:xv}),es),this.basket.frustumCulled=!1,this.basket.instanceMatrix.setUsage(Ns);let u=new an,p=new oi(1,1);u.index=p.index,u.attributes={...p.attributes},this.fArr=new Float32Array(es*4),this.fAttr=new be(this.fArr,4),this.fAttr.setUsage(Ns),u.setAttribute("aF",this.fAttr),u.instanceCount=es,this.flame=new ue(u,new Ft({vertexShader:vv,fragmentShader:_v,transparent:!0,depthWrite:!1,blending:ci})),this.flame.frustumCulled=!1,this.flame.renderOrder=5,this.cableGeo=new ie,this.cablePos=new Float32Array(ns*8*2*3),this.cableGeo.setAttribute("position",new de(this.cablePos,3).setUsage(Ns)),this.cables=new fr(this.cableGeo,new As({color:1709072,transparent:!0,opacity:.55,fog:!1})),this.cables.frustumCulled=!1;let g=we.find(_=>_.id==="balon");for(let _=0;_<ns;_++){let m=cn[Math.floor(n()*cn.length)],f=cn[Math.floor(n()*cn.length)],M=cn[Math.floor(n()*cn.length)];f===m&&(f=cn[(cn.indexOf(m)+3)%cn.length]),(M===m||M===f)&&(M=cn[8]);let E=Math.floor(n()*6);l.set([...m,E],_*4),c.set([...f,0],_*4),h.set([...M,0],_*4);let v=.75+n()*.5,S=_<7,b=[[-12,-8,6],[34,-42,12],[-48,-46,18],[16,30,10],[66,4,24],[-74,22,14],[-30,62,30]],A={i:_,size:S?.95+n()*.25:v,launch:S,x:S?g.x+b[_][0]:(n()*2-1)*1300,z:S?g.z+b[_][1]:(n()*2-1)*1300,agl:S?b[_][2]:55+Math.pow(n(),.8)*320,targetAgl:60+n()*260,phase:n()*6.28,meander:.4+n()*.8,burnT:n()*8,burnPeriod:S?3.2+n()*2.5:5+n()*6,burnLen:1.2+n()*1.3,flame:0,y:0,rise:S};this.items.push(A)}l.set([.86,.05,.04,0],ns*4),c.set([.95,.93,.88,0],ns*4),h.set([.03,.03,.04,0],ns*4),this.env.geometry.attributes.aA.needsUpdate=!0,this.env.geometry.attributes.aB.needsUpdate=!0,t.add(this.env,this.basket,this.flame,this.cables),this.time=0,this.initial=this.items.map(_=>({..._})),this.m=new jt,this.q=new Ce,this.p=new I,this.s=new I}reset(){this.items.forEach((t,e)=>Object.assign(t,this.initial[e])),this.time=0}update(t,e){this.time+=t;let n=this.time,s=this.terrain,r=this._wind||(this._wind=new I(2.4,0,.9)),a=this._up||(this._up=new I(0,1,0)),o=Lt.uBalloons.value;for(let l of this.items){l.rise&&(l.agl+=(l.targetAgl-l.agl)*Math.min(1,t*.012)+t*.7,Math.abs(l.agl-l.targetAgl)<3&&(l.rise=!1));let c=1+l.agl/400,h=l.launch?Math.min(1,Math.max(0,(l.agl-40)/90)):1;l.x+=(r.x*c+Math.sin(n*.05*l.meander+l.phase)*.9)*t*h,l.z+=(r.z*c+Math.cos(n*.043*l.meander+l.phase)*.8)*t*h,l.x>1500&&(l.x=-1500),l.z>1500&&(l.z=-1500),l.x<-1600&&(l.x=1500),l.z<-1600&&(l.z=1500);let d=s.heightAt(l.x,l.z),u=Math.sin(n*.3+l.phase)*1.2,g=d+Math.max(l.agl,3.5)+u;l.y===0?l.y=g:l.y+=(g-l.y)*Math.min(1,t*1.5),l.burnT+=t;let m=l.burnT%l.burnPeriod<l.burnLen?1:0;l.flame+=(m-l.flame)*Math.min(1,t*(m?8:3)),m&&l.rise&&(l.agl+=t*1.6);let f=11*l.size,M=24*l.size,E=n*.02*l.meander+l.phase;this.q.setFromAxisAngle(a,E);let v=l.x,S=l.z,b=l.y;this.p.set(v,b+4*l.size,S),this.s.set(f,M,f),this.m.compose(this.p,this.q,this.s),this.env.setMatrixAt(l.i,this.m),this.p.set(v,b,S),this.s.set(1.6*l.size,1.1*l.size,1.6*l.size),this.m.compose(this.p,this.q,this.s),this.basket.setMatrixAt(l.i,this.m),this.aC.setW(l.i,l.flame),this.fArr[l.i*4]=v,this.fArr[l.i*4+1]=b+3*l.size,this.fArr[l.i*4+2]=S,this.fArr[l.i*4+3]=l.flame*(.75+.25*Math.sin(n*40+l.phase*9));for(let A=0;A<8;A++){let x=A/8*Math.PI*2+E,T=(l.i*8+A)*6;this.cablePos[T]=v+Math.cos(x)*.75*l.size,this.cablePos[T+1]=b+1.05*l.size,this.cablePos[T+2]=S+Math.sin(x)*.75*l.size,this.cablePos[T+3]=v+Math.cos(x)*2.6*l.size,this.cablePos[T+4]=b+4.2*l.size,this.cablePos[T+5]=S+Math.sin(x)*2.6*l.size}o[l.i].set(v,b+M*.5+4*l.size,S,f*.95)}{let l=ns;if(e&&e.s>.03){let c=1.1*e.s,h=e.y-1.65;this.q.setFromAxisAngle(a,e.yaw||0),this.p.set(e.x,h+4*c,e.z),this.s.set(11*c,24*c,11*c),this.m.compose(this.p,this.q,this.s),this.env.setMatrixAt(l,this.m),this.fArr[l*4]=e.x,this.fArr[l*4+1]=h+3.2*c+1.2*e.s,this.fArr[l*4+2]=e.z,this.fArr[l*4+3]=e.flame*.22,this.aC.setW(l,e.flame*.35)}else this.p.set(0,-9999,0),this.s.set(.001,.001,.001),this.m.compose(this.p,this.q,this.s),this.env.setMatrixAt(l,this.m),this.fArr[l*4+3]=0;this.p.set(0,-9999,0),this.s.set(.001,.001,.001),this.m.compose(this.p,this.q,this.s),this.basket.setMatrixAt(l,this.m)}this.env.instanceMatrix.needsUpdate=!0,this.basket.instanceMatrix.needsUpdate=!0,this.aC.needsUpdate=!0,this.fAttr.needsUpdate=!0,this.cableGeo.attributes.position.needsUpdate=!0}nearest(t){let e=null,n=1e9;for(let s of this.items){let r=Math.hypot(s.x-t.x,s.y-t.y,s.z-t.z);r<n&&(n=r,e=s)}return{it:e,d:n}}},yv=`
attribute vec4 aInst;
varying vec3 vWorld; varying vec3 vN; varying vec4 vI;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec3 sc = vec3(length(M[0].xyz), length(M[1].xyz), length(M[2].xyz));
  vec4 wp = M * vec4(position, 1.0);
  vN = normalize(mat3(M) * (normal / (sc*sc))); vWorld = wp.xyz; vI = aInst;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Mv=`
${Pe}
${qe}
varying vec3 vWorld; varying vec3 vN; varying vec4 vI;
void main(){
  vec3 N = normalize(vN);
  vec3 col = vI.rgb;
  float NdL = max(dot(N, uLightDir), 0.0);
  vec3 lit = col * (uLightColor*NdL*0.9 + mix(uAmbGround, uAmbSky, N.y*0.5+0.5));
  // s\xFCr\xFCc\xFC kabini i\xE7in \xF6n cam ve far par\u0131lt\u0131s\u0131 (gece)
  lit += vec3(1.0,0.85,0.55) * uNight * 0.6 * step(0.985, fract(vI.a*7.0)) ;
  gl_FragColor = vec4(applyFog(lit, vWorld), 1.0);
}`});function Uc(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new ie,c=0;for(let h=0;h<i.length;++h){let d=i[h],u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in d.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(d.attributes[p]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in d.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(d.morphAttributes[p])}if(t){let p;if(e)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(e){let h=0,d=[];for(let u=0;u<i.length;++u){let p=i[u].index;for(let g=0;g<p.count;++g)d.push(p.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(let h in r){let d=xf(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){let p=[];for(let _=0;_<a[h].length;++_)p.push(a[h][_][u]);let g=xf(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function xf(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new de(a,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let d=l/e;for(let u=0,p=h.count;u<p;u++)for(let g=0;g<e;g++){let _=h.getComponent(u,g);o.setComponent(u+d,g,_)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var vf=ce(()=>{Ie()});function il({items:i,geometry:t,material:e,size:n=4096,cells:s=8,matrixOf:r,attr:a,attrSize:o=4,group:l,maxDist:c}){let h=new Gs(n,s);for(let u of i)h.add(u.x,u.z,u);let d=[];for(let u=0;u<h.items.length;u++){let p=h.items[u];if(!p.length)continue;let g=new an;g.index=t.index,g.attributes={...t.attributes},g.boundingSphere=t.boundingSphere;let _=new vn(g,e,p.length),m=new Float32Array(p.length*o),f=new jt;p.forEach((v,S)=>{r(v,f),_.setMatrixAt(S,f),a(v,m,S*o)}),g.setAttribute("aInst",new be(m,o)),_.instanceMatrix.needsUpdate=!0,_.computeBoundingSphere();let[M,E]=h.center(u);_.userData.cx=M,_.userData.cz=E,_.userData.maxDist=c,l.add(_),d.push(_)}return d}function bf(i,t){let e=Gn(4242),n=new Vn(6),s=[],r=new I,a=qs("uchisar"),o=qs("guvercinlik"),l=qs("goreme"),c=qs("balon"),h=(v,S,b,A)=>{if(Math.abs(v)>1750||Math.abs(S)>1750)return!1;let x=i.normalAt(v,S,r);if(1-x.y<.28||n.anyWithin(v,S,b===1?1.4:2.4))return!1;let R=b===1?.7+e()*.5:b===2?2.6+e()*1.2:1.2+e()*.9,P=b===1?R:b===2?R*1.5:R*(1.4+.3*e()),N=i.heightAt(v,S);return s.push({x:v,z:S,y:N,nx:x.x,ny:x.y,nz:x.z,w:R*1.6,h:P*1.6,type:b,seed:e()}),n.add(v,S,b===1?.9:1.6,null),!0},d=(v,S,b,A,x)=>{let T=0;for(let R=0;R<A*9&&T<A;R++){let P=e()*Math.PI*2,N=Math.sqrt(e())*b;h(v+Math.cos(P)*N,S+Math.sin(P)*N,x(),0)&&T++}return T};for(let v=0;v<26;v++){let S=e()*Math.PI*2,b=20+e()*a.r*.5;d(a.x+Math.cos(S)*b,a.z+Math.sin(S)*b,40,26,()=>e()<.12?2:0)}for(let v=0;v<24;v++){let S=e()*Math.PI*2,b=e()*o.r;d(o.x+Math.cos(S)*b,o.z+Math.sin(S)*b,32,30,()=>e()<.8?1:0)}for(let v=0;v<130;v++){let S=(e()*2-1)*1700,b=(e()*2-1)*1700;Math.hypot(S-c.x,b-c.z)<c.r||d(S,b,30,10,()=>e()<.08?2:e()<.2?1:0)}let u=new oi(1,1);u.translate(0,.5,0),u.boundingSphere=new he(new I(0,.5,0),1.5);let p=new Ft({uniforms:{...Lt},vertexShader:Sv,fragmentShader:bv,side:tn}),g=new Oe,_=new I,m=new I,f=new I,M=new I(0,1,0),E=il({items:s,geometry:u,material:p,group:g,maxDist:2600,matrixOf:(v,S)=>{_.set(v.nx,v.ny,v.nz).normalize(),m.crossVectors(M,_).normalize(),f.crossVectors(_,m).normalize(),S.makeBasis(m.clone().multiplyScalar(v.w),f.clone().multiplyScalar(v.h),_.clone()),S.setPosition(v.x,v.y-v.h*.42,v.z)},attr:(v,S,b)=>{S[b]=v.type,S[b+1]=v.seed,S[b+2]=0,S[b+3]=0}});return t.add(g),{group:g,meshes:E,count:s.length}}function wf(i,t){let e=Gn(9090),n=qs("goreme"),s=[],r=new Vn(12),a=new I;for(let f=0;f<4e3&&s.length<150;f++){let M=e()*Math.PI*2,E=Math.sqrt(e())*n.r*.95,v=n.x+Math.cos(M)*E,S=n.z+Math.sin(M)*E,b=i.normalAt(v,S,a);if(1-b.y>.1)continue;let A=5.5+e()*5,x=5.5+e()*4.5,T=Math.max(A,x)*.72;if(r.anyWithin(v,S,T))continue;let R=Math.atan2(b.x,b.z)+(e()-.5)*.35+(e()<.5?0:Math.PI/2),P=1e9,N=-1e9;for(let[G,W]of[[1,1],[1,-1],[-1,1],[-1,-1]]){let Q=Math.cos(R),Y=Math.sin(R),K=G*A*.5,nt=W*x*.5,vt=i.heightAt(v+K*Q+nt*Y,S-K*Y+nt*Q);P=Math.min(P,vt),N=Math.max(N,vt)}if(N-P>3.2)continue;let O=(e()<.55?1:2)*3.3+.4+e()*.8+(N-P);if(s.push({x:v,z:S,y0:P-.4,w:A,d:x,h:O,yaw:R,tone:e(),seed:e()}),r.add(v,S,T,null),e()<.6){let G=A*(.45+e()*.25),W=x*(.45+e()*.3),Q=(e()-.5)*(A-G),Y=(e()-.5)*(x-W),K=Math.cos(R),nt=Math.sin(R);s.push({x:v+Q*K+Y*nt,z:S-Q*nt+Y*K,y0:P-.4+O-.05,w:G,d:W,h:3+e()*.8,yaw:R,tone:e(),seed:e(),annex:!0})}}let o=new An(1,1,1);o.translate(0,.5,0),o.boundingSphere=new he(new I(0,.5,0),1);let l=new Ft({uniforms:{...Lt},vertexShader:_f,fragmentShader:yf}),c=new Oe,h=new Ce,d=new I(0,1,0),u=new I,p=new I,g=il({items:s,geometry:o,material:l,group:c,cells:8,maxDist:3400,matrixOf:(f,M)=>{h.setFromAxisAngle(d,f.yaw),u.set(f.x,f.y0,f.z),p.set(f.w,f.h,f.d),M.compose(u,h,p)},attr:(f,M,E)=>{M[E]=f.annex?0:.4,M[E+1]=1,M[E+2]=f.tone,M[E+3]=f.seed}}),_=null,m=1e9;for(let f=0;f<600;f++){let M=e()*Math.PI*2,E=Math.sqrt(e())*n.r*.55,v=n.x+Math.cos(M)*E,S=n.z+Math.sin(M)*E;if(r.anyWithin(v,S,16))continue;let b=1-i.normalAt(v,S,a).y;b<m&&(m=b,_=[v,S])}if(_){let[f,M]=_,E=i.heightAt(f,M),v=new Ft({uniforms:{...Lt},vertexShader:_f,fragmentShader:yf}),S=(B,L,O,G,W,Q,Y,K,nt=0)=>{let vt=new an;vt.index=B.index,vt.attributes={...B.attributes},vt.boundingSphere=new he(new I(0,0,0),60),vt.setAttribute("aInst",new be(new Float32Array([0,nt,K,.3]),4));let _t=new vn(vt,v,1);return _t.setMatrixAt(0,new jt().compose(new I(W,Q,Y),new Ce,new I(L,O,G))),_t.computeBoundingSphere(),c.add(_t),_t},b=new An(1,1,1);b.translate(0,.5,0);let A=new qi(1,1,1,20,1);A.translate(0,.5,0);let x=new gr(1,1,20,1);x.translate(0,.5,0);let T=new Yi(1,24,10,0,Math.PI*2,0,Math.PI/2);S(b,15,8.5,12,f,E-1,M,.9,1),S(T,5.2,4.2,5.2,f,E+7.5,M,.95),S(A,5.3,1,5.3,f,E+7.4,M,.9);let R=f+10.5,P=M+7,N=i.heightAt(R,P);S(A,1.1,26,1.1,R,N-1,P,.97),S(A,1.7,.55,1.7,R,N+18.5,P,.9),S(x,1.35,6.5,1.35,R,N+25,P,.7),window.__mosque={x:f,z:M,y:E,tx:R,tz:P,ty:N}}return t.add(c),{group:c,meshes:g,houses:s,count:s.length}}function Fc(i,t,e,n,s,r,a,o){let l=new xr(i,3),c=l.attributes.position,h=new I,d=new Float32Array(c.count*3);for(let p=0;p<c.count;p++){h.fromBufferAttribute(c,p);let g=el(h.x*2.2+o,h.y*2.2+h.z*1.3,3);h.multiplyScalar(.8+.42*g),c.setXYZ(p,h.x*t+s,h.y*e+r,h.z*n+a);let _=new I(h.x/t,h.y/e,h.z/n).normalize();d[p*3]=_.x,d[p*3+1]=_.y,d[p*3+2]=_.z}l.setAttribute("normal",new de(d,3));let u=new Float32Array(c.count).fill(1);return l.setAttribute("aPart",new de(u,1)),l}function Mf(i,t){let e=new qi(t*.7,t,i,5,1);return e.translate(0,i/2,0),e.setAttribute("aPart",new de(new Float32Array(e.attributes.position.count).fill(0),1)),e}function Sf(i){return i.index?i.toNonIndexed():i}function Ef(i,t,e){let n=Gn(31337),s=[],r=qs("goreme"),a=new I,o=new Vn(6);for(let E=0;E<26e4&&s.length<6200;E++){let v=(n()*2-1)*1750,S=(n()*2-1)*1750,b=i.greenAt(v,S),A=Math.hypot(v-r.x,S-r.z)<r.r;if(b<.42&&!(A&&n()<.35)||1-i.normalAt(v,S,a).y>.14)continue;let T=Math.floor(v/46)*131+Math.floor(S/46),R=Math.abs(Math.sin(T*12.9898)*43758.5453)%1;if(R<.45&&!A)continue;let P=R>.85||n()<.18,N=P?1.4:2.6;if(o.anyWithin(v,S,N)||e&&e.anyWithin(v,S,3))continue;let B=P?.8+n()*.6:.65+n()*.75;s.push({x:v,z:S,y:i.heightAt(v,S)-.15,poplar:P,s:B,yaw:n()*6.28,tone:n(),seed:n()}),o.add(v,S,N,null)}let l=Uc([Mf(2.2,.16),Fc(1,1.7,1.45,1.7,0,3.4,0,1.3),Fc(1,1.1,.9,1.1,.9,2.6,.3,5.1)].map(Sf)),c=Uc([Mf(2,.14),Fc(1,.72,4.7,.72,0,5,0,8.7)].map(Sf));l.boundingSphere=new he(new I(0,3,0),6),c.boundingSphere=new he(new I(0,5,0),11);let h=new Ft({uniforms:{...Lt},vertexShader:wv,fragmentShader:Ev}),d=new Oe,u=new Ce,p=new I(0,1,0),g=new I,_=new I,m={material:h,group:d,cells:8,maxDist:2200,matrixOf:(E,v)=>{u.setFromAxisAngle(p,E.yaw),g.set(E.x,E.y,E.z),_.setScalar(E.s),v.compose(g,u,_)},attr:(E,v,S)=>{v[S]=0,v[S+1]=E.tone,v[S+2]=0,v[S+3]=E.seed}},f=il({...m,items:s.filter(E=>!E.poplar),geometry:l}),M=il({...m,items:s.filter(E=>E.poplar),geometry:c});return t.add(d),{group:d,meshes:[...f,...M],items:s}}function Tf(i,t){let e=t.position.x,n=t.position.z;for(let s of i){let r=Math.hypot(s.userData.cx-e,s.userData.cz-n);s.visible=r<(s.userData.maxDist||3e3)+350}}var qs,Sv,bv,_f,yf,wv,Ev,Af=ce(()=>{Ie();vf();Kn();fi();Ws();qs=i=>we.find(t=>t.id===i);Sv=`
attribute vec4 aInst;
varying vec2 vUv; varying vec4 vInst; varying vec3 vWorld; varying vec3 vN;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec3 nz = normalize(M[2].xyz);
  vec4 wp = M * vec4(position, 1.0);
  float d = length(wp.xyz - cameraPosition);
  wp.xyz += nz * (0.10 + 0.0028*d);
  vUv = uv; vInst = aInst; vWorld = wp.xyz; vN = nz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,bv=`
${Pe}
${qe}
${kn}
${Qn}
varying vec2 vUv; varying vec4 vInst; varying vec3 vWorld; varying vec3 vN;
float archSDF(vec2 p, float w, float h){
  float rr = w*0.5; vec2 q = vec2(abs(p.x), p.y);
  float rect = max(q.x - rr, max(-q.y, q.y - (h - rr)));
  float circ = length(vec2(q.x, q.y - (h - rr))) - rr;
  return q.y > h - rr ? circ : rect;
}
void main(){
  int type = int(vInst.x + 0.5);
  vec2 p = vUv - vec2(0.5, 0.06);
  float sd;
  float lipW = 0.1;
  if (type == 0) { sd = archSDF(p, 0.56, 0.78); }
  else if (type == 1) { vec2 q = abs(vUv - 0.5) - vec2(0.27); sd = max(q.x, q.y); lipW = 0.07; }
  else { sd = archSDF(p, 0.66, 0.9); lipW = 0.12; }
  float outer = sd - lipW;
  if (outer > 0.0) discard;
  vec3 N = normalize(vN);
  float NdL = max(dot(N, uLightDir), 0.0);
  float dist = length(vWorld - cameraPosition);
  float sh = 1.0;
  if (NdL > 0.0 && dist < 2500.0) sh = sunShadow(vWorld + N*0.7, 1.8);
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5+0.5);
  vec3 stone = vec3(0.56,0.45,0.33) * (0.85 + 0.3*hash12(vec2(vInst.y*91.0, 3.0)));
  float lipA = smoothstep(0.0, -0.03, sd);          // i\xE7eride
  vec3 col = stone * (uLightColor*NdL*sh + amb);
  // i\xE7: koyu, alt k\u0131s\u0131mda hafif \u0131\u015F\u0131k
  float depth = smoothstep(0.0, 0.5, vUv.y + 0.1);
  vec3 hole = vec3(0.018,0.013,0.011) + vec3(0.06,0.04,0.025) * (uLightColor*0.1 + amb*0.6) * (1.0 - depth) * (type == 1 ? 0.0 : 1.0) * NdL * sh;
  // kenarl\u0131k daha a\xE7\u0131k (oyma bilezik) ve d\u0131\u015F yumu\u015Fak kenar: g\xF6lgeli kaya kar\u0131\u015F\u0131m\u0131
  float edgeFade = smoothstep(0.0, -0.05, outer);
  col = mix(col, hole, step(sd, 0.0));
  gl_FragColor = vec4(applyFog(col, vWorld), 1.0);
  // d\u0131\u015F bilezik terrain'e kar\u0131\u015Fs\u0131n: kenarda koyula\u015F
  if (sd > 0.0) gl_FragColor.rgb = mix(gl_FragColor.rgb, applyFog(col*0.55, vWorld), smoothstep(0.0, lipW, sd));
}`;_f=`
attribute vec4 aInst;   // x: temel derinli\u011Fi, y: pencere var m\u0131, z: ton, w: tohum
varying vec3 vWorld; varying vec3 vN; varying vec3 vLocal; varying vec3 vNl; varying vec4 vInst; varying vec2 vEdge;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  vec3 s = vec3(length(M[0].xyz), length(M[1].xyz), length(M[2].xyz));
  vN = normalize(mat3(M) * (normal / (s*s)));
  vWorld = wp.xyz; vNl = normal; vLocal = position * s; vInst = aInst;
  vec2 ed = (vec2(0.5) - abs(position.xz)) * s.xz; vEdge = ed;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,yf=`
${Pe}
${qe}
${kn}
${Qn}
varying vec3 vWorld; varying vec3 vN; varying vec3 vLocal; varying vec3 vNl; varying vec4 vInst; varying vec2 vEdge;
float archSDF(vec2 p, float w, float h){
  float rr = w*0.5; vec2 q = vec2(abs(p.x), p.y);
  float rect = max(q.x - rr, max(-q.y, q.y - (h - rr)));
  float circ = length(vec2(q.x, q.y - (h - rr))) - rr;
  return q.y > h - rr ? circ : rect;
}
void main(){
  vec3 N = normalize(vN);
  vec3 wp = vWorld;
  float dist = length(wp - cameraPosition);
  float y = vLocal.y - vInst.x;         // zeminden y\xFCkseklik
  float hv = fract(vInst.w*7.31);
  vec3 tone = mix(vec3(0.50,0.36,0.24), vec3(0.66,0.53,0.38), vInst.z);
  if (hv > 0.82) tone = vec3(0.70,0.63,0.50);            // badanal\u0131
  else if (hv < 0.12) tone = vec3(0.55,0.34,0.24);       // kiremit/k\u0131z\u0131l ta\u015F
  vec3 col = tone;
  bool roof = vNl.y > 0.5;
  vec3 emis = vec3(0.0);
  if (roof) {
    col = vec3(0.36,0.28,0.20) * (0.8 + 0.4*vnoise(wp.xz*1.3));
    float ed = min(vEdge.x, vEdge.y);
    col = mix(tone*1.05, col, smoothstep(0.28, 0.42, ed));          // parapet
    col *= 0.75 + 0.25*smoothstep(0.0, 0.12, ed);
    vec2 rc = floor(wp.xz*0.35);
    if (hash12(rc) > 0.9) col *= 0.7;
  } else {
    // ta\u015F dizileri
    float row = floor(y/0.42);
    float u = abs(vNl.x) > 0.5 ? vLocal.z : vLocal.x;
    float bl = fract((u + row*0.47)/0.85);
    float mortar = smoothstep(0.0, 0.05, bl) * smoothstep(0.0, 0.06, fract(y/0.42));
    col *= 0.86 + 0.14*mortar;
    col *= 0.88 + 0.24*hash12(vec2(floor((u + row*0.47)/0.85), row));
    col *= 0.85 + 0.3*vnoise(vec2(u*1.7+row*3.1, y*3.0));
    if (vInst.y > 0.5) {
      float uu = u + vInst.w*13.0;
      vec2 cs = vec2(3.1, 3.3);
      vec2 cp = vec2(uu, y - 0.35) / cs;
      vec2 ci = floor(cp), cf = fract(cp);
      float hh = hash12(ci + vInst.w*31.0);
      float floorNo = ci.y;
      if (y > 0.8 && hh < 0.82) {
        vec2 lp = (cf - vec2(0.5, 0.28)) * cs;
        float sdw = archSDF(lp, 0.92, 1.35);
        float inside = 1.0 - smoothstep(-0.02, 0.04, sdw);
        float lit = step(0.42, hash12(ci + 5.0 + vInst.w*7.0)) * uNight;
        vec3 glass = mix(vec3(0.03,0.04,0.05), vec3(1.0,0.55,0.20)*3.4, lit);
        float frame = (1.0 - smoothstep(0.0, 0.14, sdw)) * (1.0 - inside);
        vec3 wood = mix(vec3(0.10,0.06,0.04), vec3(0.16,0.10,0.06), hash12(ci+2.0));
        // panjurlar: pencerenin iki yan\u0131nda renkli ah\u015Fap
        float shut = smoothstep(0.55, 0.5, abs(lp.x)) * smoothstep(0.42, 0.5, abs(lp.x)) * step(-0.05, lp.y) * step(lp.y, 1.2) * step(0.6, hash12(ci+9.0));
        vec3 shutCol = mix(vec3(0.10,0.28,0.30), vec3(0.32,0.16,0.08), step(0.5, hash12(ci+4.0)));
        col = mix(col, wood, frame*0.9);
        col = mix(col, shutCol*0.7, shut*(1.0-inside)*0.9);
        col = mix(col, vec3(0.0), inside);
        emis = glass * inside;
      }
    }
  }
  float NdL = max(dot(N, uLightDir), 0.0);
  float sh = 1.0;
  if (NdL > 0.0 && dist < 3000.0) sh = sunShadow(wp + N*0.5, 2.5);
  float bs = balloonShadow(wp);
  float ao = mix(0.6, 1.0, smoothstep(0.0, 1.6, y));
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5+0.5) * ao;
  vec3 lit = col * (uLightColor*NdL*sh*bs + amb) + emis;
  gl_FragColor = vec4(applyFog(lit, wp), 1.0);
}`;wv=`
attribute vec4 aInst; attribute float aPart;
varying vec3 vWorld; varying vec3 vN; varying vec4 vInst; varying float vPart; varying float vH;
uniform float uTime;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  float sway = sin(uTime*1.5 + wp.x*0.21 + wp.z*0.17) * 0.045 * max(position.y, 0.0);
  wp.x += sway; wp.z += sway*0.6;
  vN = normalize(mat3(M) * normal);
  vWorld = wp.xyz; vInst = aInst; vPart = aPart; vH = position.y;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Ev=`
${Pe}
${qe}
${kn}
${Qn}
varying vec3 vWorld; varying vec3 vN; varying vec4 vInst; varying float vPart; varying float vH;
void main(){
  vec3 N = normalize(vN);
  float dist = length(vWorld - cameraPosition);
  vec3 V = normalize(cameraPosition - vWorld);
  vec3 dark = vec3(0.045,0.10,0.03), mid = vec3(0.10,0.17,0.04), yel = vec3(0.30,0.28,0.06);
  float t = vInst.y;
  vec3 leaf = t < 0.6 ? mix(dark, mid, t/0.6) : mix(mid, yel, (t-0.6)/0.4);
  float cl = vnoise3(vWorld*vec3(2.6,2.2,2.6)) * 0.6 + vnoise3(vWorld*vec3(7.0,6.0,7.0)) * 0.4;
  leaf *= 0.45 + 1.0*cl;
  leaf = mix(leaf, leaf*vec3(1.5,1.4,0.9), smoothstep(0.55,0.9,cl)*0.6);
  vec3 col = vPart < 0.5 ? vec3(0.16,0.11,0.08) : leaf;
  float NdL = max(dot(N, uLightDir), 0.0);
  float wrap = max((dot(N, uLightDir)+0.4)/1.4, 0.0);
  float sh = 1.0;
  if (NdL > 0.0 && dist < 900.0) sh = sunShadow(vWorld + N*0.4, 1.2);
  else if (dist >= 900.0) sh = 1.0;
  float back = pow(max(dot(-V, uLightDir), 0.0), 3.0) * 0.5;
  float ao = 0.55 + 0.45*smoothstep(0.0, 1.2, vH * 0.5 + 0.2);
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5+0.5) * ao;
  vec3 lit = col * (uLightColor*wrap*sh + amb) + leaf*uLightColor*back*sh*vec3(1.0,1.1,0.4)*0.7;
  gl_FragColor = vec4(applyFog(lit, vWorld), 1.0);
}`});function Rf(i,t){let e=i.length;if(t<=i[0].t)return i[0].v.slice();if(t>=i[e-1].t)return i[e-1].v.slice();let n=0;for(;n<e-2&&t>i[n+1].t;)n++;let s=i[n],r=i[n+1],a=r.t-s.t,o=(t-s.t)/a,l=i[Math.max(n-1,0)],c=i[Math.min(n+2,e-1)],h=o*o,d=h*o,u=2*d-3*h+1,p=d-2*h+o,g=-2*d+3*h,_=d-h,m=[];for(let f=0;f<s.v.length;f++){let M=(r.v[f]-l.v[f])/Math.max(r.t-l.t,1e-4),E=(c.v[f]-s.v[f])/Math.max(c.t-s.t,1e-4);m.push(u*s.v[f]+p*a*M+g*r.v[f]+_*a*E)}return m}var Tv,Cf,sl,If=ce(()=>{Ie();Tv=[{name:"kalkis",dur:17,hour:[5.28,5.52],fov:[50,46],fadeIn:2.4,fadeOut:.7,keys:[{t:0,p:[-165,11,-928],l:[-250,28,-985]},{t:7,p:[-146,24,-905],l:[-246,34,-985]},{t:13,p:[-120,52,-885],l:[-238,42,-992]},{t:17,p:[-96,92,-862],l:[-230,50,-1e3]}]},{name:"goreme",dur:15,hour:[5.6,5.8],fov:[56,50],fadeIn:.7,fadeOut:.7,keys:[{t:0,p:[120,60,262],l:[213,25,127]},{t:8,p:[188,36,232],l:[213,30,127]},{t:15,p:[246,26,188],l:[214,34,127]}]},{name:"ask",dur:16,hour:[5.92,6.12],fov:[60,56],fadeIn:.7,fadeOut:.7,keys:[{t:0,p:[482,28,-850],l:[466,31,-629]},{t:8,p:[478,24,-790],l:[466,30,-629]},{t:16,p:[472,20,-725],l:[468,30,-629]}]},{name:"balon",follow:9,dur:14,hour:[6.16,6.34],fov:[44,40],fadeIn:.7,fadeOut:.7,keys:[{t:0,p:[-66,2,26],l:[0,3,0]},{t:7,p:[-72,6,-6],l:[0,3,0]},{t:14,p:[-66,11,-40],l:[0,4,0]}]},{name:"uchisar",dur:15,hour:[6.42,6.64],fov:[56,52],fadeIn:.7,fadeOut:.7,keys:[{t:0,p:[-505,112,-55],l:[-760,-8,-430]},{t:6,p:[-535,98,-160],l:[-762,-18,-430]},{t:11,p:[-548,108,-255],l:[-766,-14,-432]},{t:15,p:[-532,138,-325],l:[-768,-6,-438]}]},{name:"inis",dur:15,hour:[6.74,6.94],fov:[62,66],fadeIn:.7,fadeOut:0,keys:[{t:0,p:[175,118,545],l:[110,20,720]},{t:7,p:[142,72,640],l:[70,15,730]},{t:12,p:[126,26,690],l:[-10,14,742]},{t:15,p:[110,1.75,700],l:[-100,14,750]}]}],Cf=[{t0:1.6,t1:8.6,center:!0,kick:"Nev\u015Fehir \xB7 T\xFCrkiye",title:"KAPADOKYA",text:"G\xFCzel atlar\u0131n \xFClkesi."},{t0:10.2,t1:16.2,kick:"\u015Eafak",title:"Vadiler uyan\u0131rken",text:"G\xFCn do\u011Fmadan balonlar \u015Fi\u015Fer, ilk \u0131\u015F\u0131kla birlikte vadilerin \xFCzerine y\xFCkselir."},{t0:18.6,t1:27.8,kick:"G\xF6reme",title:"Kayaya oyulmu\u015F bir kasaba",text:"Evler, kiliseler, g\xFCvercinlikler\u2026 hepsi yumu\u015Fak t\xFCf ta\u015F\u0131na oyuldu."},{t0:34.6,t1:45.6,kick:"A\u015Fk Vadisi",title:"Peribacalar\u0131",text:"Sert bir ba\u015Fl\u0131k, alt\u0131ndaki yumu\u015Fak t\xFCf\xFC milyonlarca y\u0131l r\xFCzg\xE2ra ve ya\u011Fmura kar\u015F\u0131 korudu."},{t0:52.5,t1:62.5,kick:"G\xF6ky\xFCz\xFC",title:"Sessiz bir y\xFCkseli\u015F",text:"Balonlar r\xFCzg\xE2rla s\xFCz\xFCl\xFCr; y\xFCkseldik\xE7e vadiler bir harita gibi a\xE7\u0131l\u0131r."},{t0:67.2,t1:77.6,kick:"U\xE7hisar Kalesi",title:"Bir kayan\u0131n i\xE7inde \u015Fehir",text:"Y\xFCzlerce oda, ge\xE7it ve pencere. B\xF6lgenin en y\xFCksek noktalar\u0131ndan biri."},{t0:83.4,t1:92,kick:"\u015Eimdi s\u0131ra sende",title:"Vadiye in ve ke\u015Ffet",text:"Sekiz yer seni bekliyor. Y\xFCr\xFC, ko\u015F ya da bir balona atla."}],sl=class{constructor(t,e){this.terrain=t,this.balloons=e,this.shots=Tv;let n=0;for(let s of this.shots)s.start=n,n+=s.dur;this.total=n,this.pos=new I,this.look=new I,this.tmp=new I}shotAt(t){for(let e=this.shots.length-1;e>=0;e--)if(t>=this.shots[e].start)return this.shots[e];return this.shots[0]}ground(t,e){return this.terrain.heightAt(t,e)}sample(t){t=Math.min(Math.max(t,0),this.total-.001);let e=this.shotAt(t),n=t-e.start,s=Rf(e.keys.map(A=>({t:A.t,v:A.p})),n),r=Rf(e.keys.map(A=>({t:A.t,v:A.l})),n),a=n/e.dur,o=a*a*(3-2*a),l,c,h,d,u,p;if(e.follow!==void 0&&this.balloons){let A=this.balloons.items[e.follow],x=A.y+15*A.size;l=A.x+s[0],c=x+s[1],h=A.z+s[2],d=A.x+r[0],u=x+r[1],p=A.z+r[2]}else l=s[0],h=s[2],d=r[0],p=r[2],c=this.ground(l,h)+s[1],u=this.ground(d,p)+r[1];let g=d-l,_=p-h,m=Math.hypot(g,_)||1,f=e.name==="inis"&&n>e.dur-3?0:3.2,M=this.ground(l,h),E=Math.max(this.ground(l+g/m*14,h+_/m*14),this.ground(l+g/m*32,h+_/m*32)-6);e.name==="inis"&&n>e.dur-4&&(E=-1e9),c=Math.max(c,M+f,E+4.5*(e.name==="inis"?.3:1)),this.pos.set(l,c,h),this.look.set(d,u,p);let v=e.hour[0]+(e.hour[1]-e.hour[0])*a,S=e.fov[0]+(e.fov[1]-e.fov[0])*o,b=0;return n<e.fadeIn&&(b=1-n/e.fadeIn),e.fadeOut>0&&e.dur-n<e.fadeOut&&(b=Math.max(b,1-(e.dur-n)/e.fadeOut)),b=b*b*(3-2*b),{pos:this.pos,look:this.look,hour:v,fov:S,fade:b,shot:e.name}}}});var Bc,Gr,rl,Pn,al,Pf=ce(()=>{Ie();Kn();Bc=1.72,Gr=new I,rl=new I,Pn=new I,al=class{constructor(t,e,n){this.camera=t,this.terrain=e,this.colliders=n,this.pos=new I(Ui.x,0,Ui.z),this.vel=new I,this.yaw=0,this.pitch=0,this.mode="walk",this.grounded=!0,this.keys=new Set,this.look={dx:0,dy:0},this.joy={mx:0,mz:0},this.camY=0,this.bob=0,this.speed=0,this.walking=!1,this.sprint=!1,this.burn=!1,this.roll=0,this.enabled=!1,this.eye=Bc}place(t,e,n,s=0){this.pos.set(t,this.terrain.heightAt(t,e),e),this.yaw=n,this.pitch=s,this.vel.set(0,0,0),this.camY=this.pos.y+Bc,this.grounded=!0,this.mode="walk"}setFromCamera(t,e){let n=Gr.copy(e).sub(t).normalize();this.yaw=Math.atan2(-n.x,-n.z),this.pitch=Math.asin(ze.clamp(n.y,-1,1)),this.pos.set(t.x,this.terrain.heightAt(t.x,t.z),t.z),this.camY=t.y,this.grounded=!0,this.mode="walk"}toggleFly(){this.mode==="walk"?(this.mode="fly",this.grounded=!1,this.pos.y=Math.max(this.camY,this.terrain.heightAt(this.pos.x,this.pos.z)+3),this.vel.set(0,3,0),this.camY=this.pos.y):this.mode="fly-land"}groundAt(t,e){return this.terrain.heightAt(t,e)}collide(t,e,n){let s=t,r=e;return this.colliders.forEach(a=>a.query(s,r,n+10,o=>{let l=s-o.x,c=r-o.z,h=o.r+n,d=l*l+c*c;if(d<h*h){let u=Math.sqrt(d)||.001;s=o.x+l/u*h,r=o.z+c/u*h}})),[s,r]}update(t){let e=this.keys,n=(e.has("KeyW")||e.has("ArrowUp")?1:0)-(e.has("KeyS")||e.has("ArrowDown")?1:0)+-this.joy.mz,s=(e.has("KeyD")||e.has("ArrowRight")?1:0)-(e.has("KeyA")||e.has("ArrowLeft")?1:0)+this.joy.mx,r=e.has("ShiftLeft")||e.has("ShiftRight");this.sprint=r,this.yaw-=this.look.dx,this.pitch-=this.look.dy,this.look.dx=this.look.dy=0,this.pitch=ze.clamp(this.pitch,-1.5,1.5);let a=Math.cos(this.yaw),o=Math.sin(this.yaw);if(this.mode==="walk"){Gr.set(-o,0,-a),rl.set(a,0,-o);let c=r?12.5:5.4;Pn.set(0,0,0).addScaledVector(Gr,n).addScaledVector(rl,s);let h=Pn.length();h>1&&Pn.divideScalar(h);let d=this.grounded?14:3;this.vel.x+=(Pn.x*c-this.vel.x)*Math.min(1,d*t),this.vel.z+=(Pn.z*c-this.vel.z)*Math.min(1,d*t);let u=this.pos.x+this.vel.x*t,p=this.pos.z+this.vel.z*t,g=this.groundAt(this.pos.x,this.pos.z),_=Math.hypot(u-this.pos.x,p-this.pos.z);if(_>1e-5&&this.grounded){let v=this.groundAt(u,p);if((v-g)/_>1.5&&v-this.pos.y>.9){let S=this.groundAt(u,this.pos.z),b=this.groundAt(this.pos.x,p),A=(S-g)/Math.max(Math.abs(u-this.pos.x),1e-4)<1.5,x=(b-g)/Math.max(Math.abs(p-this.pos.z),1e-4)<1.5;A||(u=this.pos.x),x||(p=this.pos.z),!A&&!x&&(this.vel.x*=.2,this.vel.z*=.2)}}[u,p]=this.collide(u,p,.45);let m=1780;u=ze.clamp(u,-m,m),p=ze.clamp(p,-m,m),this.pos.x=u,this.pos.z=p;let f=this.groundAt(u,p);this.grounded&&(this.pos.y-f>.6&&this.pos.y>f?this.grounded=!1:this.pos.y=f,e.has("Space")&&this.grounded&&(this.vel.y=7.2,this.grounded=!1)),this.grounded||(this.vel.y-=21*t,this.pos.y+=this.vel.y*t,this.pos.y<=f&&(this.pos.y=f,this.vel.y=0,this.grounded=!0)),this.speed=Math.hypot(this.vel.x,this.vel.z),this.walking=this.grounded&&this.speed>1.2,this.walking&&(this.bob+=t*(r?12:8.5)*Math.min(1.3,this.speed/5));let M=this.walking?Math.sin(this.bob)*(r?.07:.045):0,E=this.pos.y+Bc+M;this.camY+=(E-this.camY)*Math.min(1,t*(this.grounded?16:30)),this.burn=!1,this.roll+=(-s*.012*(this.grounded?1:0)-this.roll)*Math.min(1,t*6)}else{let c=Math.cos(this.pitch),h=Math.sin(this.pitch);Gr.set(-o*c,h,-a*c),rl.set(a,0,-o);let d=r?70:24;Pn.set(0,0,0).addScaledVector(Gr,n).addScaledVector(rl,s);let u=(e.has("Space")?1:0)-(e.has("KeyC")||e.has("ControlLeft")?1:0);Pn.y+=u*.8,this.burn=u>0;let p=Pn.length();p>1&&Pn.divideScalar(p);let g=1.8;this.vel.x+=(Pn.x*d-this.vel.x)*Math.min(1,g*t),this.vel.y+=(Pn.y*d-this.vel.y)*Math.min(1,g*t),this.vel.z+=(Pn.z*d-this.vel.z)*Math.min(1,g*t);let _=performance.now()*.001;this.pos.x+=this.vel.x*t+Math.sin(_*.31)*.02,this.pos.z+=this.vel.z*t+Math.cos(_*.27)*.02,this.pos.y+=this.vel.y*t+Math.sin(_*.5)*.02;let m=1780;this.pos.x=ze.clamp(this.pos.x,-m,m),this.pos.z=ze.clamp(this.pos.z,-m,m);let f=this.groundAt(this.pos.x,this.pos.z);this.pos.y=ze.clamp(this.pos.y,f+2.5,1300),this.camY=this.pos.y,this.speed=this.vel.length(),this.walking=!1,this.roll+=(-s*.05-this.roll)*Math.min(1,t*3),this.mode==="fly-land"&&(this.vel.y+=(-6-this.vel.y)*Math.min(1,t*1.2),this.pos.y<=f+2.6&&(this.mode="walk",this.grounded=!1,this.vel.set(0,-1,0)))}let l=this.camera;l.position.set(this.pos.x,this.camY,this.pos.z),l.rotation.order="YXZ",l.rotation.set(this.pitch,this.yaw,this.roll)}}});var ol,Lf=ce(()=>{ol=class{constructor(){this.ctx=null,this.muted=!1,this.started=!1,this.flamePrev=new Map,this.nextBird=4,this.nextStep=0,this.musicVol=.9}start(){if(this.started){this.ctx.resume();return}let t=window.AudioContext||window.webkitAudioContext;if(!t)return;let e=this.ctx=new t;this.started=!0;let n=e.createDynamicsCompressor();n.threshold.value=-20,n.ratio.value=4,n.attack.value=.01,n.release.value=.25,n.connect(e.destination);let s=this.master=e.createGain();s.gain.value=0,s.connect(n),s.gain.linearRampToValueAtTime(this.muted?0:.8,e.currentTime+3);let r=e.sampleRate*4,a=this.noiseBuf=e.createBuffer(1,r,e.sampleRate),o=a.getChannelData(0),l=0,c=0,h=0;for(let L=0;L<r;L++){let O=Math.random()*2-1;l=.99765*l+O*.099046,c=.963*c+O*.2965164,h=.57*h+O*1.0526913,o[L]=(l+c+h+O*.1848)*.22}let d=this.reverb=e.createConvolver(),u=e.sampleRate*3.2,p=e.createBuffer(2,u,e.sampleRate);for(let L=0;L<2;L++){let O=p.getChannelData(L);for(let G=0;G<u;G++){let W=G/u;O[G]=(Math.random()*2-1)*Math.pow(1-W,2.6)*(W<.01?W*100:1)}}d.buffer=p;let g=this.revGain=e.createGain();g.gain.value=.55,d.connect(g),g.connect(s),this.musicBus=e.createGain(),this.musicBus.gain.value=.55,this.musicBus.connect(s),this.musicBus.connect(d);let _=e.createBufferSource();_.buffer=a,_.loop=!0;let m=this.windBP=e.createBiquadFilter();m.type="bandpass",m.frequency.value=500,m.Q.value=.5;let f=this.windGain=e.createGain();f.gain.value=.05,_.connect(m),m.connect(f),f.connect(s),_.start();let M=e.createOscillator();M.frequency.value=.09;let E=e.createGain();E.gain.value=180,M.connect(E),E.connect(m.frequency),M.start();let v=e.createBufferSource();v.buffer=a,v.loop=!0,v.playbackRate.value=.5;let S=e.createBiquadFilter();S.type="lowpass",S.frequency.value=160;let b=this.lowGain=e.createGain();b.gain.value=.1,v.connect(S),S.connect(b),b.connect(s),v.start();let A=e.createOscillator();A.type="sine",A.frequency.value=4300;let x=e.createGain();x.gain.value=0;let T=e.createOscillator();T.type="square",T.frequency.value=26;let R=e.createGain();R.gain.value=.5,T.connect(R);let P=e.createGain();P.gain.value=.5,R.connect(P.gain),A.connect(P),P.connect(x),x.connect(s),A.start(),T.start(),this.cricketGain=x;let N=e.createOscillator();N.frequency.value=.35;let B=e.createGain();B.gain.value=8,N.connect(B),B.connect(T.frequency),N.start(),this.scheduleMusic()}setMuted(t){this.muted=t,this.ctx&&this.master.gain.linearRampToValueAtTime(t?0:.8,this.ctx.currentTime+.4)}setMusic(t){this.musicVol=t,this.musicBus&&(this.musicBus.gain.value=.55*t)}scheduleMusic(){let t=this.ctx,e=146.83,n=[1,16/15,5/4*1+0,4/3,3/2,8/5,9/5,2],s=[0,1,4,5,7,8,10,12].map(a=>e*Math.pow(2,a/12));this.music={t:t.currentTime+.5,bar:0,scale:s,root:e};let r=()=>{if(!this.ctx)return;let a=this.music;for(;a.t<t.currentTime+1.5;)this.playBar(a);setTimeout(r,400)};r()}playBar(t){let e=this.ctx,n=t.t,s=.62,r=s*8,a=[[0,7],[0,7],[8,12],[5,12]],o=a[t.bar%a.length];for(let c of o)this.pad(n,r*1.05,t.root*Math.pow(2,(c-12)/12),.045);this.pad(n,r*1.05,t.root*.5,.05);let l=[[0,2,3,4,3,2,1,0],[4,5,4,3,2,3,1,0],[0,1,2,3,4,5,6,7],[7,6,5,4,3,4,2,0],[3,4,5,4,3,2,1,2]];if(t.bar%4!==3||Math.random()<.4){let c=l[Math.floor(Math.random()*l.length)],h=n+s*(Math.random()<.5?0:1);for(let d of c){if(Math.random()<.28){h+=s*.5;continue}let u=t.scale[d]*(Math.random()<.25?2:1);if(this.pluck(h,u,.09+Math.random()*.05),h+=s*(Math.random()<.3?1:.5),h>n+r)break}}t.t+=r,t.bar++}pad(t,e,n,s){let r=this.ctx,a=r.createGain();a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(s,t+e*.4),a.gain.linearRampToValueAtTime(0,t+e);let o=r.createBiquadFilter();o.type="lowpass",o.frequency.value=900,o.Q.value=.3;for(let l of[-6,5]){let c=r.createOscillator();c.type="sawtooth",c.frequency.value=n,c.detune.value=l,c.connect(o),c.start(t),c.stop(t+e+.1)}o.connect(a),a.connect(this.musicBus)}pluck(t,e,n){let s=this.ctx,r=s.createGain();r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(n,t+.006),r.gain.exponentialRampToValueAtTime(8e-4,t+1.6);let a=s.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(3600,t),a.frequency.exponentialRampToValueAtTime(500,t+.5);let o=s.createOscillator();o.type="triangle",o.frequency.value=e;let l=s.createOscillator();l.type="sawtooth",l.frequency.value=e*2.003;let c=s.createGain();c.gain.value=.18,o.connect(a),l.connect(c),c.connect(a),a.connect(r),r.connect(this.musicBus),o.start(t),l.start(t),o.stop(t+1.7),l.stop(t+1.7)}noiseBurst(t,e,n,s,r,a="bandpass",o=0){let l=this.ctx,c=l.createBufferSource();c.buffer=this.noiseBuf,c.loop=!0;let h=l.createBiquadFilter();h.type=a,h.frequency.value=n,h.Q.value=s;let d=l.createGain();if(d.gain.setValueAtTime(0,t),d.gain.linearRampToValueAtTime(r,t+Math.min(.04,e*.2)),d.gain.exponentialRampToValueAtTime(5e-4,t+e),c.connect(h),h.connect(d),l.createStereoPanner){let u=l.createStereoPanner();u.pan.value=o,d.connect(u),u.connect(this.master)}else d.connect(this.master);c.start(t,Math.random()*3),c.stop(t+e+.1)}footstep(t){if(!this.ctx)return;let e=this.ctx.currentTime;this.noiseBurst(e,.12,380+Math.random()*200,.8,.1*Math.min(1.4,t/5),"lowpass"),this.noiseBurst(e+.005,.05,2400,1,.02,"highpass")}burner(t,e=0){if(!this.ctx)return;let n=this.ctx.currentTime;this.noiseBurst(n,1.9,420,.4,t*.5,"bandpass",e),this.noiseBurst(n,2,140,.6,t*.7,"lowpass",e)}bird(){if(!this.ctx)return;let t=this.ctx,e=t.currentTime+.05,n=2200+Math.random()*2600,s=2+Math.floor(Math.random()*4),r=(Math.random()*2-1)*.8;for(let a=0;a<s;a++){let o=t.createOscillator();o.type="sine";let l=t.createGain(),c=e+a*.13;if(o.frequency.setValueAtTime(n,c),o.frequency.exponentialRampToValueAtTime(n*(1.3+Math.random()*.5),c+.09),l.gain.setValueAtTime(0,c),l.gain.linearRampToValueAtTime(.018,c+.02),l.gain.exponentialRampToValueAtTime(3e-4,c+.11),o.connect(l),t.createStereoPanner){let h=t.createStereoPanner();h.pan.value=r,l.connect(h),h.connect(this.master),h.connect(this.reverb)}else l.connect(this.master);o.start(c),o.stop(c+.13)}}chime(){if(!this.ctx)return;let t=this.ctx.currentTime;[0,7,12,19].forEach((e,n)=>this.pluck(t+n*.09,293.66*Math.pow(2,e/12),.1))}update(t,e){if(!this.ctx)return;let n=this.ctx,s=n.currentTime,r=Math.min(1,Math.max(0,(e.agl||0)/300)),a=.035+.1*r+.06*Math.min(1,(e.speed||0)/30);this.windGain.gain.setTargetAtTime(a,s,.4),this.windBP.frequency.setTargetAtTime(380+500*r+350*Math.min(1,(e.speed||0)/25),s,.6),this.lowGain.gain.setTargetAtTime(.06+.06*r,s,.5);let o=e.night||0;if(this.cricketGain.gain.setTargetAtTime(r<.15?.012*o:0,s,.8),this.nextBird-=t,this.nextBird<0&&(this.nextBird=3+Math.random()*8,(e.elev||0)>-6&&(e.elev||0)<60&&r<.4&&this.bird()),e.walking?(this.nextStep-=t,this.nextStep<=0&&(this.footstep(e.speed),this.nextStep=e.sprint?.29:.44)):this.nextStep=.1,e.balloons)for(let l of e.balloons){if((this.flamePrev.get(l.i)||0)<.5&&l.flame>=.5){let h=l.x-e.pos.x,d=l.y-e.pos.y,u=l.z-e.pos.z,p=Math.hypot(h,d,u),g=Math.min(.55,60/(30+p)*.4);if(p<900&&g>.01){let _=Math.max(-1,Math.min(1,(h*Math.cos(e.yaw)-u*Math.sin(e.yaw))/(Math.abs(h)+Math.abs(u)+1)));this.burner(g,_)}}this.flamePrev.set(l.i,l.flame)}e.selfBurn&&!this._selfBurn&&this.burner(.5),this._selfBurn=!!e.selfBurn}}});function Nf(i,t=1024){let e=document.createElement("canvas");e.width=e.height=t;let n=e.getContext("2d"),s=n.createImageData(t,t),r=2048/t,a=i.H,o=i.G,l=i.NX,c=i.NZ;for(let h=0;h<t;h++)for(let d=0;d<t;d++){let u=Math.floor(h*r)*2048+Math.floor(d*r),p=a[u],g=l[u],_=c[u],m=Math.sqrt(Math.max(0,1-g*g-_*_)),M=.42+.7*Oc(g*-.55+m*.7+_*-.45,0,1),E=Oc(p/210,0,1),v=(150+75*E)*M,S=(118+62*E)*M,b=(92+44*E)*M,A=Oc((o[u]-.35)*2.2,0,1);v=v*(1-A)+92*M*A,S=S*(1-A)+128*M*A,b=b*(1-A)+62*M*A;let x=(h*t+d)*4;s.data[x]=v,s.data[x+1]=S,s.data[x+2]=b,s.data[x+3]=255}return n.putImageData(s,0,0),e}var kt,Oc,ll,Df=ce(()=>{Kn();kt=i=>document.querySelector(i),Oc=(i,t,e)=>Math.min(Math.max(i,t),e);ll=class{constructor(t){this.app=t,this.el={loader:kt("#loader"),status:kt("#loader .status"),prog:kt("#loader .prog i"),bStart:kt("#bStart"),bFree:kt("#bFree"),caption:kt("#caption"),capK:kt("#caption .kick"),capH:kt("#caption h2"),capP:kt("#caption p"),skip:kt("#skip"),tourprog:kt("#tourprog"),tourbar:kt("#tourprog i"),hud:kt("#hud"),compass:kt("#compass canvas"),place:kt("#place"),placeN:kt("#place .n"),placeM:kt("#place .m"),placeK:kt("#place .k"),mini:kt("#mini canvas"),disc:kt("#disc"),mode:kt("#mode"),alt:kt("#alt"),hint:kt("#hint"),tod:kt("#tod"),clock:kt("#clock"),bFlow:kt("#bFlow"),bFly:kt("#bFly"),bMap:kt("#bMap"),bPhoto:kt("#bPhoto"),bSound:kt("#bSound"),bFull:kt("#bFull"),bTour:kt("#bTour"),poi:kt("#poi"),poiH:kt("#poi h3"),poiP:kt("#poi p"),poiK:kt("#poi .k"),pause:kt("#pause"),lockhint:kt("#lockhint"),goal:kt("#goal"),bigmap:kt("#bigmap"),bigCanvas:kt("#bigmap canvas"),fadeout:kt("#fadeout"),touch:kt("#touch")},this.disc=new Set(JSON.parse(localStorage.getItem("kapadokya_disc")||"[]")),this.capIdx=-1,this.poiTimer=0,this.hintTimer=0,this.buildStars()}buildStars(){let t=document.querySelector("#loader .stars"),e="";for(let n=0;n<90;n++){let s=Math.random()*100,r=Math.random()*62,a=Math.random()*1.6+.4,o=.25+Math.random()*.75;e+=`<i style="position:absolute;left:${s}%;top:${r}%;width:${a}px;height:${a}px;border-radius:50%;background:#fff;opacity:${o};animation-delay:${(Math.random()*4).toFixed(2)}s;animation-duration:${(2+Math.random()*3).toFixed(1)}s"></i>`}t.innerHTML=e}progress(t,e){this.el.prog.style.width=t*100+"%",e&&(this.el.status.textContent=e)}ready(){this.el.prog.style.width="100%",this.el.status.textContent="Haz\u0131r",this.el.bStart.classList.remove("hidden"),this.el.bFree.classList.remove("hidden")}hideLoader(){this.el.loader.style.opacity=0,this.el.loader.style.pointerEvents="none",setTimeout(()=>this.el.loader.classList.add("hidden"),1300)}setCaption(t){let e=this.el;if(!t){e.caption.classList.remove("show");return}e.caption.classList.remove("show"),setTimeout(()=>{e.caption.classList.toggle("center",!!t.center),e.capK.textContent=t.kick||"",e.capH.textContent=t.title||"",e.capP.textContent=t.text||"",e.caption.offsetWidth,e.caption.classList.add("show")},this.capIdx>=0?350:0)}updateCaptions(t,e){let n=-1;for(let s=0;s<e.length;s++)t>=e[s].t0&&t<e[s].t1&&(n=s);n!==this.capIdx&&(this.capIdx=n,this.setCaption(n>=0?e[n]:null))}tourUI(t){document.body.classList.toggle("cine",t),this.el.skip.classList.toggle("hidden",!t),this.el.tourprog.classList.toggle("hidden",!t),t||(this.capIdx=-1,this.setCaption(null))}tourProgress(t){this.el.tourbar.style.width=t*100+"%"}showHUD(t){this.el.hud.classList.toggle("off",!t)}showHint(){this.el.hint.style.opacity=1,clearTimeout(this._hintT),this._hintT=setTimeout(()=>{this.el.hint.style.opacity=0},14e3)}setClock(t){let e=(t%24+24)%24,n=Math.floor(e),s=Math.floor((e-n)*60);this.el.clock.textContent=String(n).padStart(2,"0")+":"+String(s).padStart(2,"0"),document.activeElement!==this.el.tod&&(this.el.tod.value=e)}drawCompass(t,e){let n=this.el.compass,s=n.getContext("2d"),r=n.width,a=n.height;s.clearRect(0,0,r,a);let o=(-t*180/Math.PI%360+360)%360,l=110,c=r/l;s.font="500 22px Inter, sans-serif",s.textAlign="center",s.textBaseline="middle";let h={0:"K",45:"KD",90:"D",135:"GD",180:"G",225:"GB",270:"B",315:"KB"};for(let d=Math.floor(o-l/2-2);d<=o+l/2+2;d++){let u=(d%360+360)%360,p=r/2+(d-o)*c;if(d%5===0){let g=d%15===0;s.strokeStyle="rgba(246,237,224,"+(g?.7:.35)+")",s.lineWidth=2,s.beginPath(),s.moveTo(p,a-2),s.lineTo(p,a-(g?18:11)),s.stroke()}h[u]!==void 0&&(s.fillStyle=u%90===0?"#ffd9a8":"rgba(246,237,224,.7)",s.font=(u%90===0?"600 24px":"500 18px")+" Inter, sans-serif",s.fillText(h[u],p,24))}for(let d of we){let p=((Math.atan2(d.x-e.x,-(d.z-e.z))*180/Math.PI%360+360)%360-o+540)%360-180;if(Math.abs(p)>l/2-2)continue;let g=r/2+p*c,_=this.disc.has(d.id);s.fillStyle=_?"rgba(255,255,255,.55)":"#f2a65a",s.beginPath(),s.moveTo(g,6),s.lineTo(g+7,13),s.lineTo(g,20),s.lineTo(g-7,13),s.closePath(),s.fill()}s.fillStyle="#fff",s.beginPath(),s.moveTo(r/2,a-2),s.lineTo(r/2-6,a-12),s.lineTo(r/2+6,a-12),s.closePath(),s.fill()}drawMini(t,e,n){let s=this.el.mini,r=s.getContext("2d"),a=s.width,o=760,l=t.width/4096,c=(e.x+2048)*l-o*l/2,h=(e.z+2048)*l-o*l/2;r.fillStyle="#211a17",r.fillRect(0,0,a,a),r.drawImage(t,c,h,o*l,o*l,0,0,a,a);let d=a/o;for(let u of we){let p=a/2+(u.x-e.x)*d,g=a/2+(u.z-e.z)*d;p<-10||g<-10||p>a+10||g>a+10||(r.fillStyle=this.disc.has(u.id)?"rgba(255,255,255,.85)":"#f2a65a",r.strokeStyle="rgba(0,0,0,.6)",r.lineWidth=3,r.beginPath(),r.arc(p,g,8,0,7),r.stroke(),r.fill())}r.save(),r.translate(a/2,a/2),r.rotate(-n),r.fillStyle="rgba(255,255,255,.18)",r.beginPath(),r.moveTo(0,0),r.arc(0,0,70,-Math.PI/2-.55,-Math.PI/2+.55),r.closePath(),r.fill(),r.fillStyle="#fff",r.strokeStyle="#000",r.lineWidth=3,r.beginPath(),r.moveTo(0,-13),r.lineTo(9,10),r.lineTo(0,5),r.lineTo(-9,10),r.closePath(),r.stroke(),r.fill(),r.restore()}drawBigMap(t,e,n){let s=this.el.bigCanvas,r=s.getContext("2d"),a=s.width;r.drawImage(t,0,0,a,a),r.strokeStyle="rgba(255,255,255,.12)",r.lineWidth=1;for(let c=-1500;c<=1500;c+=500){let h=(c+2048)/4096*a;r.beginPath(),r.moveTo(h,0),r.lineTo(h,a),r.moveTo(0,h),r.lineTo(a,h),r.stroke()}r.font="600 22px Cormorant Garamond, Georgia, serif",r.textBaseline="middle";for(let c of we){let h=(c.x+2048)/4096*a,d=(c.z+2048)/4096*a,u=this.disc.has(c.id);r.fillStyle=u?"#fff":"#f2a65a",r.strokeStyle="rgba(0,0,0,.7)",r.lineWidth=4,r.beginPath(),r.arc(h,d,9,0,7),r.stroke(),r.fill(),r.lineWidth=5,r.strokeStyle="rgba(0,0,0,.75)",r.strokeText(c.name,h+15,d),r.fillStyle="#fff6e8",r.fillText(c.name,h+15,d)}let o=(e.x+2048)/4096*a,l=(e.z+2048)/4096*a;r.save(),r.translate(o,l),r.rotate(-n),r.fillStyle="#fff",r.strokeStyle="#000",r.lineWidth=3,r.beginPath(),r.moveTo(0,-16),r.lineTo(11,13),r.lineTo(0,7),r.lineTo(-11,13),r.closePath(),r.stroke(),r.fill(),r.restore(),r.fillStyle="rgba(255,255,255,.7)",r.font="600 26px Inter, sans-serif",r.textAlign="center",r.fillText("K",a/2,26),r.textAlign="left"}checkDiscovery(t,e){let n=null,s=1e9;for(let r of we){let a=Math.hypot(r.x-t.x,r.z-t.z);a<r.r&&a<s&&(n=r,s=a),a<r.r*.5&&!this.disc.has(r.id)&&(this.disc.add(r.id),localStorage.setItem("kapadokya_disc",JSON.stringify([...this.disc])),this.showPOI(r),e&&e.chime())}return this.el.disc.innerHTML=`Ke\u015Ffedilen <b>${this.disc.size} / ${we.length}</b>`,n}showPOI(t){let e=this.el;e.poiH.textContent=t.name,e.poiP.textContent=t.text,e.poiK.textContent=this.disc.size===we.length?"B\xFCt\xFCn yerleri ke\u015Ffettin":"Yeni yer ke\u015Ffettin \xB7 "+this.disc.size+" / "+we.length,e.poi.classList.add("show"),clearTimeout(this._poiT),this._poiT=setTimeout(()=>e.poi.classList.remove("show"),9e3)}updateGoal(t){let e=null,n=1e9;for(let s of we){if(this.disc.has(s.id))continue;let r=Math.hypot(s.x-t.x,s.z-t.z);r<n&&(n=r,e=s)}this.el.goal.innerHTML=e?`S\u0131radaki <b>${e.name}</b> \xB7 ${n<1e3?Math.round(n/10)*10+" m":(n/1e3).toFixed(1)+" km"}`:"B\xFCt\xFCn yerleri ke\u015Ffettin \u2726"}updatePlace(t,e,n,s,r){let a=this.el;a.placeN.textContent=t?t.name:s==="walk"?"Kapadokya":"G\xF6ky\xFCz\xFC",a.placeK.textContent=t?this.disc.has(t.id)?"Ke\u015Ffedildi":"Yakla\u015F\u0131yorsun":"\u015Eu an";let o=Math.round(1040+e.y);a.placeM.textContent=`Rak\u0131m ${o} m \xB7 Zeminden ${Math.max(0,Math.round(n))} m`,a.mode.textContent=s==="walk"?"":"Balon modu"}}});function Uf(i,t,e){let n=2*t,s=[],r=[],a=(g,_)=>_*(n+1)+g;for(let g=0;g<=n;g++)for(let _=0;_<=n;_++)s.push((_-t)*i,0,(g-t)*i);let o=e/i;for(let g=0;g<n;g++)for(let _=0;_<n;_++){let m=_-t+.5,f=g-t+.5;if(Math.abs(m)<o&&Math.abs(f)<o)continue;let M=a(_,g),E=a(_+1,g),v=a(_,g+1),S=a(_+1,g+1);r.push(M,v,E,E,v,S)}let l=new Array(s.length/3).fill(0),c=g=>{let _=s.length/3;for(let m of g)s.push(s[m*3],0,s[m*3+2]),l.push(1);for(let m=0;m<g.length-1;m++){let f=g[m],M=g[m+1],E=_+m,v=_+m+1;r.push(f,E,M,M,E,v,f,M,E,M,v,E)}},h=Math.round(t-e/i),d=Math.round(t+e/i),u=(g,_,m,f)=>{let M=[];for(let E=m;E<=f;E++)M.push(_?a(E,g):a(g,E));return M};c(u(h,!0,h,d)),c(u(d,!0,h,d)),c(u(h,!1,h,d)),c(u(d,!1,h,d)),c(u(0,!0,0,n)),c(u(n,!0,0,n)),c(u(0,!1,0,n)),c(u(n,!1,0,n));let p=new ie;return p.setAttribute("position",new zt(s,3)),p.setAttribute("aSkirt",new zt(l,1)),p.setIndex(r),p.boundingSphere=new he(new I(0,500,0),t*i*1.5),p}function Ff(i){let t=new Ft({uniforms:{...Lt},vertexShader:Av,fragmentShader:Rv}),e=new Oe,n=new ue(Uf(128,72,2048),t),s=new ue(Uf(512,88,9216),t);return n.frustumCulled=!1,s.frustumCulled=!1,e.add(n,s),i.add(e),e}var Av,Rv,Bf=ce(()=>{Ie();fi();Av=`
${Pe}
varying vec3 vWorld;
float plateauBase(vec2 p){ return 150. + 16.*gfbm(p*0.0007 + vec2(11.,4.), 3); }
float mountain(vec2 p, vec2 c, float R, float H){
  float d = length(p - c);
  float k = clamp(1. - d / R, 0., 1.);
  float rid = 0.85 + 0.3*gfbm(p*0.00035 + c*0.001, 4);
  float crater = 1. - 0.22*smoothstep(0.08, 0.0, k) ;
  return H * pow(k, 1.25) * rid * crater;
}
float farH(vec2 p){
  float r = length(p);
  float base = plateauBase(p) + 14.*gfbm(p*0.0016, 3);
  float hills = smoothstep(2300., 9000., r) * (260.*gfbm(p*0.00045 + 3., 5) + 90.*gfbm(p*0.002, 3));
  float far = smoothstep(9000., 24000., r);
  float ridges = far * 420. * (1. - abs(gnoise(p*0.00016 + 7.)));
  float m = mountain(p, vec2(26500., 7400.), 11500., 3700.) + mountain(p, vec2(-27500., 19500.), 9500., 2600.) + mountain(p, vec2(-9000., -32000.), 8500., 1200.);
  return base + hills + ridges + m;
}
attribute float aSkirt;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  wp.y = farH(wp.xz) - aSkirt * 60.0;
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,Rv=`
${Pe}
${qe}
varying vec3 vWorld;
void main(){
  vec3 wp = vWorld;
  vec3 N = normalize(cross(dFdx(wp), dFdy(wp)));
  if (N.y < 0.0) N = -N;
  float rel = wp.y - 165.0;
  float n1 = gnoise(wp.xz*0.0009), n2 = vnoise(wp.xz*0.004);
  vec3 steppe = mix(vec3(0.30,0.25,0.15), vec3(0.36,0.31,0.19), n1*0.5+0.5);
  vec3 rock = mix(vec3(0.27,0.21,0.19), vec3(0.34,0.27,0.24), n2);
  vec3 col = mix(steppe, rock, smoothstep(250.0, 900.0, rel));
  float snow = smoothstep(1000.0, 1350.0, rel + 340.0*gnoise(wp.xz*0.0006) + 220.0*(1.0 - N.y));
  col = mix(col, vec3(0.85,0.87,0.92), snow);
  // da\u011F yama\xE7lar\u0131nda dere \xE7izgileri
  col *= 0.85 + 0.3*vnoise(wp.xz*vec2(0.0016,0.0016) + vec2(0.0, wp.y*0.002));
  float NdL = max(dot(N, uLightDir), 0.0);
  vec3 lit = col * (uLightColor*NdL + mix(uAmbGround, uAmbSky, N.y*0.5+0.5));
  gl_FragColor = vec4(applyFogS(lit, wp, 0.3), 1.0);
}
`});function Of(i,t){let e=Gn(555),n=[],s=(g,_,m)=>{let f=we.find(M=>M.id===g);for(let M=0;M<_;M++){let E=e()*6.28,v=e()*f.r*.7,S=f.x+Math.cos(E)*v,b=f.z+Math.sin(E)*v;n.push({cx:S,cz:b,cy:t.heightAt(S,b)+26+e()*40,r:50+e()*110,sp:(e()<.5?-1:1)*(8+e()*5),count:m})}};s("guvercinlik",4,22),s("goreme",2,16),s("ask",1,14),s("devrent",1,14),s("pasabag",1,14),s("gul",1,14),s("uchisar",1,16);let r=n.reduce((g,_)=>g+_.count,0),a=new an,o=new Float32Array([0,0,-.5,-1,0,.05,0,0,.45,0,0,-.5,0,0,.45,1,0,.05]),l=new Float32Array([0,-1,0,0,0,1]);a.setAttribute("position",new de(o,3)),a.setAttribute("aTip",new de(l,1));let c=new Float32Array(r*4),h=new Float32Array(r*4),d=0;for(let g of n)for(let _=0;_<g.count;_++,d++){let m=e()*6.28;c.set([g.cx+(e()-.5)*30,g.cz+(e()-.5)*30,g.r*(.85+e()*.3),g.sp*(.9+e()*.2)],d*4),h.set([m+_*.11,g.cy+(e()-.5)*14,.55+e()*.25,9+e()*4],d*4)}a.setAttribute("aB",new be(c,4)),a.setAttribute("aC",new be(h,4)),a.instanceCount=r;let u=new Ft({uniforms:{...Lt},vertexShader:Cv,fragmentShader:Iv,side:tn}),p=new ue(a,u);return p.frustumCulled=!1,i.add(p),p}var Cv,Iv,zf=ce(()=>{Ie();fi();Ws();Kn();Cv=`
attribute float aTip;
attribute vec4 aB;   // merkez x, merkez z, yar\u0131\xE7ap, i\u015Faretli h\u0131z (m/s)
attribute vec4 aC;   // faz, merkez y, boyut, kanat h\u0131z\u0131
uniform float uTime;
varying vec3 vWorld; varying float vShade;
void main(){
  float dirS = aB.w < 0.0 ? -1.0 : 1.0;
  float rad = aB.z * (1.0 + 0.18*sin(uTime*0.13 + aC.x*2.0));
  float ang = aC.x + uTime * aB.w / aB.z;
  vec3 center = vec3(aB.x, aC.y + sin(uTime*0.27 + aC.x*3.0)*3.5, aB.y);
  vec3 pos = center + vec3(cos(ang), 0.0, sin(ang)) * rad;
  vec3 fwd = normalize(vec3(-sin(ang), 0.0, cos(ang)) * dirS);
  vec3 right = vec3(-fwd.z, 0.0, fwd.x);
  vec3 loc = position * aC.z;
  float flap = sin(uTime*aC.w + aC.x*17.0);
  loc.y += aTip * flap * 0.55 * aC.z;
  loc.z += abs(aTip) * (0.15 + 0.12*flap) * aC.z;
  vec3 wp = pos + right * loc.x + vec3(0.0,1.0,0.0) * loc.y + fwd * (-loc.z);
  wp.y += sin(ang*3.0 + aC.x)*0.6;
  vWorld = wp;
  vShade = 0.65 + 0.35*flap*aTip + 0.1;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`,Iv=`
${Pe}
${qe}
varying vec3 vWorld; varying float vShade;
void main(){
  vec3 col = vec3(0.86,0.85,0.84) * clamp(vShade, 0.4, 1.1);
  vec3 lit = col * (uLightColor*0.45 + mix(uAmbGround, uAmbSky, 0.7));
  gl_FragColor = vec4(applyFog(lit, vWorld), 1.0);
}
`});var Dv=ed(()=>{Ie();fi();Cc();Yu();sf();Kn();uf();gf();Af();Ws();If();Pf();Lf();Df();Bf();zf();var Pv=new URLSearchParams(location.search),kf=Pv.has("dev"),Hc=i=>document.querySelector(i),gi=Hc("#c"),Mn;try{if(Mn=new qo({canvas:gi,antialias:!1,powerPreference:"high-performance",stencil:!1}),!Mn.capabilities.isWebGL2)throw new Error("webgl2")}catch(i){throw document.querySelector("#loader .status").textContent="Bu taray\u0131c\u0131 WebGL 2 desteklemiyor",document.querySelector("#loader .sub").textContent="L\xFCtfen g\xFCncel Chrome, Edge, Firefox veya Safari kullan\u0131n ve donan\u0131m h\u0131zland\u0131rmay\u0131 a\xE7\u0131n.",i}var mi=Math.min(window.devicePixelRatio||1,1.6);Mn.setPixelRatio(mi);Mn.setSize(window.innerWidth,window.innerHeight);Mn.toneMapping=Ji;Mn.outputColorSpace=rn;var hn=new Wi,Fe=new je(62,window.innerWidth/window.innerHeight,.4,13e4);Fe.position.set(Ui.x,150,Ui.z);hn.add(qu());var Ae=new $o(Mn,hn),Ze=nf(Mn,hn,Fe);Ze.composer.setPixelRatio(mi);Ze.composer.setSize(window.innerWidth,window.innerHeight);var Et=new ll,un=new ol,z={state:"loading",hour:5.3,flow:!1,photo:!1,map:!1,locked:!1,active:!1,tourT:0,fade:0,transition:0,discCheck:0,hudTick:0,frame:0,balloons:null,tour:null,player:null,cull:[],mapCanvas:null,selfBurnT:0,lastYaw:0,rollLook:0};function Lv(){let t=new Float32Array(4200),e=new Float32Array(1400);for(let a=0;a<1400;a++)t[a*3]=Math.random()*90,t[a*3+1]=Math.random()*90,t[a*3+2]=Math.random()*90,e[a]=Math.random();let n=new ie;n.setAttribute("position",new de(t,3)),n.setAttribute("aSeed",new de(e,1)),n.boundingSphere=new he(new I,1e6);let s=new Ft({uniforms:{uTime:Lt.uTime,uLightColor:Lt.uLightColor,uLightDir:Lt.uLightDir,uVis:{value:1}},vertexShader:`
      attribute float aSeed; uniform float uTime; varying float vA; uniform float uVis;
      void main(){
        vec3 p = position + vec3(sin(uTime*0.2+aSeed*30.0), uTime*0.15*(0.4+aSeed) , cos(uTime*0.17+aSeed*20.0))*3.0;
        vec3 rel = mod(p - cameraPosition + 45.0, 90.0) - 45.0;
        vec4 mv = viewMatrix * vec4(cameraPosition + rel, 1.0);
        float d = length(rel);
        vA = smoothstep(45.0, 20.0, d) * smoothstep(1.0, 4.0, d) * (0.4 + 0.6*aSeed) * uVis;
        gl_PointSize = (1.2 + 2.6*aSeed) * (1.0 + 90.0/(d+6.0)) ;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform vec3 uLightColor; varying float vA;
      void main(){ vec2 c = gl_PointCoord-0.5; float r = length(c); float a = smoothstep(0.5,0.0,r); gl_FragColor = vec4(uLightColor*0.35*vec3(1.0,0.9,0.75), a*a*vA*0.5); }`,transparent:!0,depthWrite:!1,blending:ci}),r=new dr(n,s);return r.frustumCulled=!1,r.renderOrder=3,hn.add(r),r}var pi=()=>new Promise(i=>requestAnimationFrame(()=>i()));async function Nv(){let i=performance.now(),t=h=>{kf&&console.log("BOOT",h,Math.round(performance.now()-i))};Et.progress(.04,"Vadiler olu\u015Fturuluyor"),await pi(),await pi(),await Ae.generate(h=>Et.progress(.04+.18*h)),t("gen"),Et.progress(.22,"Peribacalar\u0131 dikiliyor"),await pi();let e=of(Ae,hn),n=lf(Ae,e);t("chimneys+stamp"),Et.progress(.34,"I\u015F\u0131k ve g\xF6lge hesaplan\u0131yor"),await pi(),Ae.buildTextures(n),Ae.buildChunks(),t("textures+chunks"),Et.progress(.48,"Kaya evleri oyuluyor"),await pi(),Ff(hn);let s=cf(e,hn),r=hf(e),a=bf(Ae,hn);t("chimney meshes+decals"),Et.progress(.62,"Kasaba ve bah\xE7eler kuruluyor"),await pi();let o=wf(Ae,hn),l=Ef(Ae,hn,r),c=new Vn(24);for(let h of o.houses)h.annex||c.add(h.x,h.z,Math.max(h.w,h.d)*.62,null);s.meshes.forEach(h=>h.userData.maxDist=2900),z.cull=[...s.meshes,...a.meshes,...o.meshes,...l.meshes],t("town+trees"),Et.progress(.78,"Balonlar \u015Fi\u015Firiliyor"),await pi(),z.balloons=new nl(hn,Ae),z.balloons.update(.01),mf(hn,Ae),z.motes=Lv(),Of(hn,Ae),z.tour=new sl(Ae,z.balloons),z.player=new al(Fe,Ae,[r,c]),z.mapCanvas=Nf(Ae,1024),t("balloons+map"),Et.progress(.9,"G\xF6ky\xFCz\xFC boyan\u0131yor"),await pi(),Object.assign(window.__k,{chimneys:e,decals:a,town:o,trees:l,chm:s,houseHash:c,chHash:r}),Fe.position.set(-300,90,-800),Fe.lookAt(-230,40,-985),Ic(5.4),z.hour=5.4,Mn.compile(hn,Fe);for(let h=0;h<3;h++)qf(.016),await pi();t("warm"),Et.progress(1,"Haz\u0131r"),window.__ready=!0,kf?(Et.hideLoader(),Xr(null,!0)):Et.ready()}function Vc(){un.start(),z.balloons.reset(),z.balloons.update(.01,null),Et.hideLoader(),z.state="intro",z.tourT=0,z.transition=0,Et.showHUD(!1),Et.tourUI(!0),Et.el.pause.classList.add("hidden"),document.body.classList.remove("photo"),z.active=!1,Ze.grade.uniforms.uFade.value=1,Et.capIdx=-1}function Xr(i,t){z.state="explore",Et.tourUI(!1);let e=z.player;i?e.setFromCamera(Fe.position,z.tour.look):(e.place(Ui.x,Ui.z,1.8,-.06),z.hour=Math.max(z.hour,6.9)),Et.showHUD(!0),Et.showHint(),Ze.grade.uniforms.uFade.value=0,z.flow=!1,Et.el.bFlow.classList.remove("on"),z.active=!0,z.wasLocked=!1,i===null&&!t&&un.start()}function Wr(i){Et.el.pause.classList.toggle("hidden",!i)}function Gc(i){z.state==="intro"&&(i?(z.state="trans",z.transition=0,z.transDir=1):Xr(!0))}function Vf(){if(gi.requestPointerLock){let i=gi.requestPointerLock();i&&i.catch&&i.catch(()=>{})}}document.addEventListener("pointerlockchange",()=>{z.locked=document.pointerLockElement===gi,z.state==="explore"&&(z.locked?(z.active=!0,z.wasLocked=!0,Wr(!1)):z.wasLocked&&!z.touch&&!z.map&&(z.active=!1,Wr(!0),z.wasLocked=!1))});Et.el.pause.addEventListener("click",()=>{z.active=!0,Wr(!1),Vf(),gi.focus(),un.start()});gi.addEventListener("click",()=>{z.state==="explore"&&!z.locked&&z.active&&!z.touch&&Vf()});document.addEventListener("mousemove",i=>{z.state!=="explore"||!z.active||(z.locked||i.buttons&1)&&(z.player.look.dx+=i.movementX*.0022,z.player.look.dy+=i.movementY*.0022)});window.addEventListener("keydown",i=>{if(!(i.target&&i.target.tagName==="INPUT"&&i.code!=="Escape")){if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(i.code)&&i.preventDefault(),z.state==="intro"){["Space","Escape","Enter"].includes(i.code)&&Gc(!0);return}if(z.state==="explore"&&!i.repeat)switch(z.player.keys.add(i.code),i.code){case"KeyF":z.player.toggleFly(),Et.showHint();break;case"KeyT":Gf();break;case"KeyM":Wc();break;case"KeyP":Wf();break;case"KeyN":Xf();break;case"KeyO":z.capture=!0;break;case"KeyH":document.exitPointerLock&&document.exitPointerLock(),z.active=!1,Wr(!0);break;case"BracketRight":z.hour=(z.hour+.5)%24;break;case"BracketLeft":z.hour=(z.hour+23.5)%24;break}}});window.addEventListener("keyup",i=>{z.player&&z.player.keys.delete(i.code)});window.addEventListener("blur",()=>{z.player&&z.player.keys.clear()});function Gf(){z.flow=!z.flow,Et.el.bFlow.classList.toggle("on",z.flow)}function Wc(){z.map=!z.map,Et.el.bigmap.classList.toggle("hidden",!z.map),Et.el.bMap.classList.toggle("on",z.map),z.map&&document.exitPointerLock&&document.exitPointerLock(),!z.map&&z.state==="explore"&&(z.active=!0,Wr(!1))}function Wf(){z.photo=!z.photo,document.body.classList.toggle("photo",z.photo),Et.el.bPhoto.classList.toggle("on",z.photo)}function Xf(){un.muted=!un.muted,un.setMuted(un.muted),Et.el.bSound.classList.toggle("on",un.muted),Et.el.bSound.style.opacity=un.muted?.5:1}Et.el.bStart.addEventListener("click",Vc);Et.el.bFree.addEventListener("click",()=>{un.start(),Et.hideLoader(),z.hour=6.9,Xr(null,!1)});Et.el.skip.addEventListener("click",()=>Gc(!0));Et.el.bFlow.addEventListener("click",Gf);Et.el.bFly.addEventListener("click",()=>{z.player&&z.player.toggleFly(),gi.focus()});Et.el.bMap.addEventListener("click",Wc);Et.el.bigmap.addEventListener("click",Wc);Et.el.bPhoto.addEventListener("click",Wf);Et.el.bSound.addEventListener("click",Xf);Et.el.bFull.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()});Et.el.bTour.addEventListener("click",()=>{document.exitPointerLock&&document.exitPointerLock(),Vc()});Et.el.tod.addEventListener("input",()=>{z.hour=parseFloat(Et.el.tod.value),z.flow=!1,Et.el.bFlow.classList.remove("on")});document.querySelectorAll(".ibtn").forEach(i=>i.addEventListener("pointerdown",t=>t.stopPropagation()));(function(){if(!(window.matchMedia("(pointer: coarse)").matches||"ontouchstart"in window&&navigator.maxTouchPoints>1))return;z.touch=!0,Et.el.touch.classList.remove("hidden");let e=(r,a)=>{let o=null,l=0,c=0,h=r.querySelector("i");r.addEventListener("pointerdown",u=>{o=u.pointerId,r.setPointerCapture(o);let p=r.getBoundingClientRect();l=p.left+p.width/2,c=p.top+p.height/2}),r.addEventListener("pointermove",u=>{if(u.pointerId!==o)return;let p=(u.clientX-l)/55,g=(u.clientY-c)/55,_=Math.hypot(p,g);_>1&&(p/=_,g/=_),h.style.transform=`translate(${p*40}px,${g*40}px)`,a(p,g)});let d=u=>{u.pointerId===o&&(o=null,h.style.transform="",a(0,0))};r.addEventListener("pointerup",d),r.addEventListener("pointercancel",d)};e(Hc("#stickL"),(r,a)=>{z.player&&(z.player.joy.mx=r,z.player.joy.mz=a)});let n=0,s=0;e(Hc("#stickR"),(r,a)=>{n=r,s=a}),z.touchLook=()=>[n,s],Et.el.pause.addEventListener("click",()=>{z.active=!0})})();var Hf=new Zi,zc=0,cl=0,kc=4,Gb=new I;function qf(i){z.frame++,Lt.uTime.value+=i;let t=Lt.uTime.value,e=Fe;if(z.state==="intro"){let n=z.tour;if(z.tourT+=i,z.tourT>=n.total)Gc(!1);else{let s=n.sample(z.tourT);e.position.copy(s.pos),e.up.set(0,1,0),e.lookAt(s.look);let r=Math.atan2(-(s.look.x-s.pos.x),-(s.look.z-s.pos.z)),a=r-z.lastYaw;a>Math.PI&&(a-=2*Math.PI),a<-Math.PI&&(a+=2*Math.PI),z.rollLook+=(-a/Math.max(i,.001)*.35-z.rollLook)*Math.min(1,i*2),z.lastYaw=r,e.rotateZ(ze.clamp(z.rollLook,-.07,.07)),e.rotateX(Math.sin(t*.7)*.0012),e.rotateY(Math.sin(t*.53+1)*.0012),Math.abs(e.fov-s.fov)>.01&&(e.fov=s.fov,e.updateProjectionMatrix()),z.hour=s.hour,z.fade=s.fade,z.tourT<1.2&&(z.fade=Math.max(z.fade,1-z.tourT/1.2)),Et.updateCaptions(z.tourT,Cf),Et.tourProgress(z.tourT/n.total),Ze.grade.uniforms.uFade.value=z.fade}}else if(z.state==="trans")z.transition+=i/.7,Ze.grade.uniforms.uFade.value=Math.min(1,z.transition),z.transition>=1&&(Xr(null,!1),Ze.grade.uniforms.uFade.value=1,z.fadeIn=1);else if(z.state==="explore"){let n=z.player;if(z.fadeIn>0&&(z.fadeIn=Math.max(0,z.fadeIn-i/.9),Ze.grade.uniforms.uFade.value=z.fadeIn),z.touch&&z.touchLook&&z.active){let[r,a]=z.touchLook();n.look.dx+=r*i*2.2,n.look.dy+=a*i*1.6}z.active||(n.keys.clear(),n.joy.mx=n.joy.mz=0),n.update(z.active?i:0);let s=n.mode==="walk"?n.sprint&&n.speed>6?72:66:70+Math.min(10,n.speed*.12);e.fov+=(s-e.fov)*Math.min(1,i*4),e.updateProjectionMatrix(),z.flow&&(z.hour=(z.hour+i*.12)%24),n.mode!=="walk"&&n.burn?(z.selfBurnT-=i,z.selfBurnT<=0&&(z.selfBurnT=2.6,un.burner(.35))):z.selfBurnT=0}if(Ic(z.hour),Mn.toneMappingExposure=In.exposure*(z.state==="explore",1),Ae.chunks&&Ae.updateLod(e),z.balloons){let n=z.player,s=z.pb||(z.pb={s:0,x:0,y:0,z:0,yaw:0,flame:0}),r=z.state==="explore"&&n&&n.mode!=="walk";s.s+=((r?1:0)-s.s)*Math.min(1,i*(r?.9:2.5)),n&&(s.x=n.pos.x,s.y=e.position.y,s.z=n.pos.z,s.yaw=n.yaw),s.flame+=((r&&n.burn?1:0)-s.flame)*Math.min(1,i*(r&&n.burn?9:3)),z.balloons.update(z.state==="loading"?0:i,s)}if(z.cull.length&&Tf(z.cull,e),Ze.grade.uniforms.uTime.value=t,Ze.grade.uniforms.uAspect.value=e.aspect,Ze.bloom.strength=.26+.22*Math.max(0,1-Math.abs(In.elev-2)/14)+(In.elev<-4?.12:0),z.motes&&(z.motes.material.uniforms.uVis.value=ze.clamp((In.elev+4)/12,0,1)*(z.state==="intro"?.7:1)),z.state==="explore"){let n=z.player,s=n.pos.y-Ae.heightAt(n.pos.x,n.pos.z);if(z.hudTick+=i,z.frame%2===0&&(Et.drawCompass(n.yaw,n.pos),Et.drawMini(z.mapCanvas,n.pos,n.yaw)),z.map&&Et.drawBigMap(z.mapCanvas,n.pos,n.yaw),z.hudTick>.2){z.hudTick=0;let r=Et.checkDiscovery(n.pos,un);Et.updatePlace(r,n.pos,n.mode==="walk"?n.pos.y-Ae.heightAt(n.pos.x,n.pos.z):s,n.mode==="walk"?"walk":"fly",Ae),Et.setClock(z.hour),Et.el.lockhint.classList.toggle("hidden",z.locked||z.touch||!z.active||z.photo||z.map),Et.updateGoal(n.pos),Et.el.alt.innerHTML=n.mode==="walk"?"":"Y\xFCkseklik <b>"+Math.round(s)+" m</b>"}un.update(i,{agl:s,speed:n.speed,walking:n.walking&&z.active,sprint:n.sprint,night:Lt.uNight.value,elev:In.elev,balloons:z.balloons&&z.balloons.items,pos:n.pos,yaw:n.yaw,selfBurn:n.mode!=="walk"&&n.burn})}else z.state==="intro"&&un.update(i,{agl:e.position.y-Ae.heightAt(e.position.x,e.position.z),speed:8,walking:!1,night:Lt.uNight.value,elev:In.elev,balloons:z.balloons.items,pos:e.position,yaw:0})}function Yf(){if(requestAnimationFrame(Yf),!Ae.chunks||!z.player)return;Hf.update();let i=Math.min(Hf.getDelta(),.08);if(qf(i),Ze.composer.render(i),z.capture&&(z.capture=!1,gi.toBlob(t=>{if(!t)return;let e=document.createElement("a");e.href=URL.createObjectURL(t),e.download="kapadokya-"+Date.now()+".png",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),4e3)},"image/png")),zc+=i,cl++,cl>=45){let t=zc/cl;if(zc=0,cl=0,kc-=1,kc<=0){let e=mi;t>.026&&mi>.55?e=Math.max(.55,mi*.85):t<.0155&&mi<Math.min(window.devicePixelRatio||1,1.6)&&(e=Math.min(Math.min(window.devicePixelRatio||1,1.6),mi*1.1)),Math.abs(e-mi)>.01&&(mi=e,Mn.setPixelRatio(e),Ze.composer.setPixelRatio(e),Ze.composer.setSize(window.innerWidth,window.innerHeight),kc=3)}}}window.addEventListener("resize",()=>{Mn.setSize(window.innerWidth,window.innerHeight),Fe.aspect=window.innerWidth/window.innerHeight,Fe.updateProjectionMatrix(),Ze.composer.setSize(window.innerWidth,window.innerHeight)});gi.addEventListener("webglcontextlost",i=>i.preventDefault());window.__k={renderer:Mn,scene:hn,camera:Fe,terrain:Ae,U:Lt,post:Ze,POIS:we,S:z,ui:Et,sound:un,set(i,t,e,n,s,r,a,o){Fe.position.set(i,t,e),Fe.lookAt(n,s,r),a!==void 0&&(z.hour=a),o&&(Fe.fov=o,Fe.updateProjectionMatrix()),z.state="dev"},setHour(i){z.hour=i},tourAt(i){let t=z.tour.sample(i);return Fe.position.copy(t.pos),Fe.up.set(0,1,0),Fe.lookAt(t.look),Fe.fov=t.fov,Fe.updateProjectionMatrix(),z.hour=t.hour,z.state="dev",Ze.grade.uniforms.uFade.value=0,t.shot},startTour:Vc,startExplore:Xr};requestAnimationFrame(Yf);Nv()});Dv();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
