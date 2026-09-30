(()=>{var Ki={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ji={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ld=0,Fh=1,cd=2;var Do=1,hd=2,br=3,Qi=0,ln=1,Pe=2,zn=0,ts=1,cn=2,Bh=3,Oh=4,ud=5;var Rs=100,dd=101,fd=102,pd=103,md=104,gd=200,_d=201,xd=202,vd=203,Hh=204,zh=205,yd=206,Md=207,Sd=208,bd=209,Ed=210,Td=211,wd=212,Ad=213,Rd=214,za=0,ka=1,Va=2,ar=3,Ga=4,Wa=5,Xa=6,qa=7,yl=0,Cd=1,Pd=2,jn=0,No=1,Uo=2,Fo=3,Cs=4,Bo=5,Oo=6,Ho=7;var kh=300,es=301,Ps=302,Ml=303,Sl=304,zo=306,Zn=1e3,Bn=1001,Ya=1002,nn=1003,Id=1004;var ko=1005;var Xe=1006,bl=1007;var kn=1008;var Sn=1009,Vh=1010,Gh=1011,Er=1012,El=1013,Qn=1014,Vn=1015,He=1016,Tl=1017,wl=1018,Tr=1020,Wh=35902,Xh=35899,qh=1021,Yh=1022,bn=1023,oi=1026,ns=1027,wr=1028,Al=1029,is=1030,Rl=1031;var Cl=1033,Vo=33776,Go=33777,Wo=33778,Xo=33779,Pl=35840,Il=35841,Ll=35842,Dl=35843,Nl=36196,Ul=37492,Fl=37496,Bl=37488,Ol=37489,qo=37490,Hl=37491,zl=37808,kl=37809,Vl=37810,Gl=37811,Wl=37812,Xl=37813,ql=37814,Yl=37815,Zl=37816,$l=37817,Jl=37818,Kl=37819,jl=37820,Ql=37821,tc=36492,ec=36494,nc=36495,ic=36283,sc=36284,Yo=36285,rc=36286;var no=2300,Za=2301,Oa=2302,Sh=2303,bh=2400,Eh=2401,Th=2402;var Ld=3200;var Zo=0,Dd=1,Ai="",tn="srgb",io="srgb-linear",so="linear",_e="srgb";var Ha=7680;var Nd=519,Ud=512,Fd=513,Bd=514,oc=515,Od=516,Hd=517,ac=518,zd=519,Zh=35044,Ri=35048;var $h="300 es",Yn=2e3,lr=2001;function ep(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function np(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ro(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kd(){let i=ro("canvas");return i.style.display="block",i}var Ru={},cr=null;function oo(...i){let t="THREE."+i.shift();cr?cr("log",t,...i):console.log(t,...i)}function Vd(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function $t(...i){i=Vd(i);let t="THREE."+i.shift();if(cr)cr("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Kt(...i){i=Vd(i);let t="THREE."+i.shift();if(cr)cr("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ys(...i){let t=i.join(" ");t in Ru||(Ru[t]=!0,$t(...i))}function Gd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Wd={[za]:ka,[Va]:Xa,[Ga]:qa,[ar]:Wa,[ka]:za,[Xa]:Va,[qa]:Ga,[Wa]:ar},$n=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Cu=1234567,jr=Math.PI/180,Ms=180/Math.PI;function ri(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(un[i&255]+un[i>>8&255]+un[i>>16&255]+un[i>>24&255]+"-"+un[t&255]+un[t>>8&255]+"-"+un[t>>16&15|64]+un[t>>24&255]+"-"+un[e&63|128]+un[e>>8&255]+"-"+un[e>>16&255]+un[e>>24&255]+un[n&255]+un[n>>8&255]+un[n>>16&255]+un[n>>24&255]).toLowerCase()}function ne(i,t,e){return Math.max(t,Math.min(e,i))}function Jh(i,t){return(i%t+t)%t}function ip(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function sp(i,t,e){return i!==t?(e-i)/(t-i):0}function Qr(i,t,e){return(1-e)*i+e*t}function rp(i,t,e,n){return Qr(i,t,1-Math.exp(-e*n))}function op(i,t=1){return t-Math.abs(Jh(i,t*2)-t)}function ap(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function lp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function cp(i,t){return i+Math.floor(Math.random()*(t-i+1))}function hp(i,t){return i+Math.random()*(t-i)}function up(i){return i*(.5-Math.random())}function dp(i){i!==void 0&&(Cu=i);let t=Cu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fp(i){return i*jr}function pp(i){return i*Ms}function mp(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function gp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _p(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function xp(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),f=r((t-n)/2),u=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*f,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*f,a*c);break;case"ZXZ":i.set(l*f,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*h,a*c);break;default:$t("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function qn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Se(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ue={DEG2RAD:jr,RAD2DEG:Ms,generateUUID:ri,clamp:ne,euclideanModulo:Jh,mapLinear:ip,inverseLerp:sp,lerp:Qr,damp:rp,pingpong:op,smoothstep:ap,smootherstep:lp,randInt:cp,randFloat:hp,randFloatSpread:up,seededRandom:dp,degToRad:fp,radToDeg:pp,isPowerOfTwo:mp,ceilPowerOfTwo:gp,floorPowerOfTwo:_p,setQuaternionFromProperEuler:xp,normalize:Se,denormalize:qn},W=class i{static{i.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},on=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],f=n[s+3],u=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(f!==_||l!==u||c!==d||h!==g){let m=l*u+c*d+h*g+f*_;m<0&&(u=-u,d=-d,g=-g,_=-_,m=-m);let p=1-a;if(m<.9995){let M=Math.acos(m),S=Math.sin(M);p=Math.sin(p*M)/S,a=Math.sin(a*M)/S,l=l*p+u*a,c=c*p+d*a,h=h*p+g*a,f=f*p+_*a}else{l=l*p+u*a,c=c*p+d*a,h=h*p+g*a,f=f*p+_*a;let M=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=M,c*=M,h*=M,f*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],f=r[o],u=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*f+l*d-c*u,t[e+1]=l*g+h*u+c*f-a*d,t[e+2]=c*g+h*d+a*u-l*f,t[e+3]=h*g-a*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),f=a(r/2),u=l(n/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:$t("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=n+a+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>f){let d=2*Math.sqrt(1+n-a-f);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>f){let d=2*Math.sqrt(1+a-n-f);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class i{static{i.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Pu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Pu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+l*c+o*f-a*h,this.y=n+l*h+a*c-r*f,this.z=s+l*f+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Kc.copy(this).projectOnVector(t),this.sub(Kc)}reflect(t){return this.sub(Kc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Kc=new A,Pu=new on,Qt=class i{static{i.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],M=s[1],S=s[4],v=s[7],T=s[2],E=s[5],C=s[8];return r[0]=o*_+a*M+l*T,r[3]=o*m+a*S+l*E,r[6]=o*p+a*v+l*C,r[1]=c*_+h*M+f*T,r[4]=c*m+h*S+f*E,r[7]=c*p+h*v+f*C,r[2]=u*_+d*M+g*T,r[5]=u*m+d*S+g*E,r[8]=u*p+d*v+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=h*o-a*c,u=a*l-h*r,d=c*r-o*l,g=e*f+n*u+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=f*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return ys("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(jc.makeScale(t,e)),this}rotate(t){return ys("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(jc.makeRotation(-t)),this}translate(t,e){return ys("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(jc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},jc=new Qt,Iu=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lu=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vp(){let i={enabled:!0,workingColorSpace:io,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===_e&&(s.r=Si(s.r),s.g=Si(s.g),s.b=Si(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===_e&&(s.r=or(s.r),s.g=or(s.g),s.b=or(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ai?so:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ys("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ys("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[io]:{primaries:t,whitePoint:n,transfer:so,toXYZ:Iu,fromXYZ:Lu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:tn},outputColorSpaceConfig:{drawingBufferColorSpace:tn}},[tn]:{primaries:t,whitePoint:n,transfer:_e,toXYZ:Iu,fromXYZ:Lu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:tn}}}),i}var ae=vp();function Si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function or(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Vs,$a=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Vs===void 0&&(Vs=ro("canvas")),Vs.width=t.width,Vs.height=t.height;let s=Vs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Vs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ro("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Si(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Si(e[n]/255)*255):e[n]=Si(e[n]);return{data:e,width:t.width,height:t.height}}else return $t("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},yp=0,hr=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=ri(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Qc(s[o].image)):r.push(Qc(s[o]))}else r=Qc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Qc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?$a.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:($t("Texture: Unable to serialize Texture."),{})}var Mp=0,th=new A,_n=class i extends $n{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Bn,s=Bn,r=Xe,o=kn,a=bn,l=Sn,c=i.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=ri(),this.name="",this.source=new hr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new W(0,0),this.repeat=new W(1,1),this.center=new W(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(th).x}get height(){return this.source.getSize(th).y}get depth(){return this.source.getSize(th).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){$t(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){$t(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==kh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zn:t.x=t.x-Math.floor(t.x);break;case Bn:t.x=t.x<0?0:1;break;case Ya:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zn:t.y=t.y-Math.floor(t.y);break;case Bn:t.y=t.y<0?0:1;break;case Ya:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};_n.DEFAULT_IMAGE=null;_n.DEFAULT_MAPPING=kh;_n.DEFAULT_ANISOTROPY=1;var Ce=class i{static{i.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(c+1)/2,v=(d+1)/2,T=(p+1)/2,E=(h+u)/4,C=(f+_)/4,y=(g+m)/4;return S>v&&S>T?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=E/n,r=C/n):v>T?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=E/s,r=y/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=C/r,s=y/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-_)/M,this.z=(u-h)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ja=class extends $n{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new _n(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new hr(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ke=class extends Ja{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ao=class extends _n{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ka=class extends _n{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var me=class i{static{i.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,l,c,h,f,u,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,f,u,d,g,_,m)}set(t,e,n,s,r,o,a,l,c,h,f,u,d,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Gs.setFromMatrixColumn(t,0).length(),r=1/Gs.setFromMatrixColumn(t,1).length(),o=1/Gs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=o*h,d=o*f,g=a*h,_=a*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,d=l*f,g=c*h,_=c*f;e[0]=u+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,d=l*f,g=c*h,_=c*f;e[0]=u-_*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,d=o*f,g=a*h,_=a*f;e[0]=l*h,e[4]=g*c-d,e[8]=u*c+_,e[1]=l*f,e[5]=_*c+u,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-u*f,e[8]=g*f+d,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*f+g,e[10]=u-_*f}else if(t.order==="XZY"){let u=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+_,e[5]=o*h,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*h,e[10]=_*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sp,t,bp)}lookAt(t,e,n){let s=this.elements;return Rn.subVectors(t,e),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),Oi.crossVectors(n,Rn),Oi.lengthSq()===0&&(Math.abs(n.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),Oi.crossVectors(n,Rn)),Oi.normalize(),ua.crossVectors(Rn,Oi),s[0]=Oi.x,s[4]=ua.x,s[8]=Rn.x,s[1]=Oi.y,s[5]=ua.y,s[9]=Rn.y,s[2]=Oi.z,s[6]=ua.z,s[10]=Rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],S=n[7],v=n[11],T=n[15],E=s[0],C=s[4],y=s[8],w=s[12],I=s[1],N=s[5],H=s[9],V=s[13],L=s[2],O=s[6],X=s[10],q=s[14],nt=s[3],Z=s[7],$=s[11],et=s[15];return r[0]=o*E+a*I+l*L+c*nt,r[4]=o*C+a*N+l*O+c*Z,r[8]=o*y+a*H+l*X+c*$,r[12]=o*w+a*V+l*q+c*et,r[1]=h*E+f*I+u*L+d*nt,r[5]=h*C+f*N+u*O+d*Z,r[9]=h*y+f*H+u*X+d*$,r[13]=h*w+f*V+u*q+d*et,r[2]=g*E+_*I+m*L+p*nt,r[6]=g*C+_*N+m*O+p*Z,r[10]=g*y+_*H+m*X+p*$,r[14]=g*w+_*V+m*q+p*et,r[3]=M*E+S*I+v*L+T*nt,r[7]=M*C+S*N+v*O+T*Z,r[11]=M*y+S*H+v*X+T*$,r[15]=M*w+S*V+v*q+T*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15],M=l*d-c*u,S=a*d-c*f,v=a*u-l*f,T=o*d-c*h,E=o*u-l*h,C=o*f-a*h;return e*(_*M-m*S+p*v)-n*(g*M-m*T+p*E)+s*(g*S-_*T+p*C)-r*(g*v-_*E+m*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=e*a-n*o,S=e*l-s*o,v=e*c-r*o,T=n*l-s*a,E=n*c-r*a,C=s*c-r*l,y=h*_-f*g,w=h*m-u*g,I=h*p-d*g,N=f*m-u*_,H=f*p-d*_,V=u*p-d*m,L=M*V-S*H+v*N+T*I-E*w+C*y;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/L;return t[0]=(a*V-l*H+c*N)*O,t[1]=(s*H-n*V-r*N)*O,t[2]=(_*C-m*E+p*T)*O,t[3]=(u*E-f*C-d*T)*O,t[4]=(l*I-o*V-c*w)*O,t[5]=(e*V-s*I+r*w)*O,t[6]=(m*v-g*C-p*S)*O,t[7]=(h*C-u*v+d*S)*O,t[8]=(o*H-a*I+c*y)*O,t[9]=(n*I-e*H-r*y)*O,t[10]=(g*E-_*v+p*M)*O,t[11]=(f*v-h*E-d*M)*O,t[12]=(a*w-o*N-l*y)*O,t[13]=(e*N-n*w+s*y)*O,t[14]=(_*S-g*T-m*M)*O,t[15]=(h*T-f*S+u*M)*O,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,f=a+a,u=r*c,d=r*h,g=r*f,_=o*h,m=o*f,p=a*f,M=l*c,S=l*h,v=l*f,T=n.x,E=n.y,C=n.z;return s[0]=(1-(_+p))*T,s[1]=(d+v)*T,s[2]=(g-S)*T,s[3]=0,s[4]=(d-v)*E,s[5]=(1-(u+p))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(g+S)*C,s[9]=(m-M)*C,s[10]=(1-(u+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Gs.set(s[0],s[1],s[2]).length(),a=Gs.set(s[4],s[5],s[6]).length(),l=Gs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Gn.copy(this);let c=1/o,h=1/a,f=1/l;return Gn.elements[0]*=c,Gn.elements[1]*=c,Gn.elements[2]*=c,Gn.elements[4]*=h,Gn.elements[5]*=h,Gn.elements[6]*=h,Gn.elements[8]*=f,Gn.elements[9]*=f,Gn.elements[10]*=f,e.setFromRotationMatrix(Gn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=Yn,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===Yn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===lr)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Yn,l=!1){let c=this.elements,h=2/(e-t),f=2/(n-s),u=-(e+t)/(e-t),d=-(n+s)/(n-s),g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===Yn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===lr)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Gs=new A,Gn=new me,Sp=new A(0,0,0),bp=new A(1,1,1),Oi=new A,ua=new A,Rn=new A,Du=new me,Nu=new on,On=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ne(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:$t("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Du.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Du,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Nu.setFromEuler(this),this.setFromQuaternion(Nu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};On.DEFAULT_ORDER="XYZ";var lo=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Ep=0,Uu=new A,Ws=new on,mi=new me,da=new A,Vr=new A,Tp=new A,wp=new on,Fu=new A(1,0,0),Bu=new A(0,1,0),Ou=new A(0,0,1),Hu={type:"added"},Ap={type:"removed"},Xs={type:"childadded",child:null},eh={type:"childremoved",child:null},Fe=class i extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=ri(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new A,e=new On,n=new on,s=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new Qt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.multiply(Ws),this}rotateOnWorldAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.premultiply(Ws),this}rotateX(t){return this.rotateOnAxis(Fu,t)}rotateY(t){return this.rotateOnAxis(Bu,t)}rotateZ(t){return this.rotateOnAxis(Ou,t)}translateOnAxis(t,e){return Uu.copy(t).applyQuaternion(this.quaternion),this.position.add(Uu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Fu,t)}translateY(t){return this.translateOnAxis(Bu,t)}translateZ(t){return this.translateOnAxis(Ou,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?da.copy(t):da.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(Vr,da,this.up):mi.lookAt(da,Vr,this.up),this.quaternion.setFromRotationMatrix(mi),s&&(mi.extractRotation(s.matrixWorld),Ws.setFromRotationMatrix(mi),this.quaternion.premultiply(Ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Kt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Hu),Xs.child=t,this.dispatchEvent(Xs),Xs.child=null):Kt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ap),eh.child=t,this.dispatchEvent(eh),eh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),mi.multiply(t.parent.matrixWorld)),t.applyMatrix4(mi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Hu),Xs.child=t,this.dispatchEvent(Xs),Xs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,t,Tp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,wp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),f=o(t.shapes),u=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Fe.DEFAULT_UP=new A(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Re=class extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}},Rp={type:"move"},ur=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Rp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},fa={h:0,s:0,l:0};function nh(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var _t=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=tn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ae.workingColorSpace){if(t=Jh(t,1),e=ne(e,0,1),n=ne(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=nh(o,r,t+1/3),this.g=nh(o,r,t),this.b=nh(o,r,t-1/3)}return ae.colorSpaceToWorking(this,s),this}setStyle(t,e=tn){function n(r){r!==void 0&&parseFloat(r)<1&&$t("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:$t("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);$t("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=tn){let n=Xd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):$t("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Si(t.r),this.g=Si(t.g),this.b=Si(t.b),this}copyLinearToSRGB(t){return this.r=or(t.r),this.g=or(t.g),this.b=or(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=tn){return ae.workingToColorSpace(dn.copy(this),t),Math.round(ne(dn.r*255,0,255))*65536+Math.round(ne(dn.g*255,0,255))*256+Math.round(ne(dn.b*255,0,255))}getHexString(t=tn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.workingToColorSpace(dn.copy(this),e);let n=dn.r,s=dn.g,r=dn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let f=o-a;switch(c=h<=.5?f/(o+a):f/(2-o-a),o){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.workingToColorSpace(dn.copy(this),e),t.r=dn.r,t.g=dn.g,t.b=dn.b,t}getStyle(t=tn){ae.workingToColorSpace(dn.copy(this),t);let e=dn.r,n=dn.g,s=dn.b;return t!==tn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Hi),this.setHSL(Hi.h+t,Hi.s+e,Hi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Hi),t.getHSL(fa);let n=Qr(Hi.h,fa.h,e),s=Qr(Hi.s,fa.s,e),r=Qr(Hi.l,fa.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},dn=new _t;_t.NAMES=Xd;var co=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new _t(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var ho=class extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new On,this.environmentIntensity=1,this.environmentRotation=new On,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Wn=new A,gi=new A,ih=new A,_i=new A,qs=new A,Ys=new A,zu=new A,sh=new A,rh=new A,oh=new A,ah=new Ce,lh=new Ce,ch=new Ce,yi=class i{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Wn.subVectors(t,e),s.cross(Wn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Wn.subVectors(s,e),gi.subVectors(n,e),ih.subVectors(t,e);let o=Wn.dot(Wn),a=Wn.dot(gi),l=Wn.dot(ih),c=gi.dot(gi),h=gi.dot(ih),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,_i)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,_i.x),l.addScaledVector(o,_i.y),l.addScaledVector(a,_i.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return ah.setScalar(0),lh.setScalar(0),ch.setScalar(0),ah.fromBufferAttribute(t,e),lh.fromBufferAttribute(t,n),ch.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ah,r.x),o.addScaledVector(lh,r.y),o.addScaledVector(ch,r.z),o}static isFrontFacing(t,e,n,s){return Wn.subVectors(n,e),gi.subVectors(t,e),Wn.cross(gi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Wn.cross(gi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;qs.subVectors(s,n),Ys.subVectors(r,n),sh.subVectors(t,n);let l=qs.dot(sh),c=Ys.dot(sh);if(l<=0&&c<=0)return e.copy(n);rh.subVectors(t,s);let h=qs.dot(rh),f=Ys.dot(rh);if(h>=0&&f<=h)return e.copy(s);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(qs,o);oh.subVectors(t,r);let d=qs.dot(oh),g=Ys.dot(oh);if(g>=0&&d<=g)return e.copy(r);let _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ys,a);let m=h*g-d*f;if(m<=0&&f-h>=0&&d-g>=0)return zu.subVectors(r,s),a=(f-h)/(f-h+(d-g)),e.copy(s).addScaledVector(zu,a);let p=1/(m+_+u);return o=_*p,a=u*p,e.copy(n).addScaledVector(qs,o).addScaledVector(Ys,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ai=class{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Xn):Xn.fromBufferAttribute(r,o),Xn.applyMatrix4(t.matrixWorld),this.expandByPoint(Xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),pa.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),pa.copy(n.boundingBox)),pa.applyMatrix4(t.matrixWorld),this.union(pa)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Xn),Xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Gr),ma.subVectors(this.max,Gr),Zs.subVectors(t.a,Gr),$s.subVectors(t.b,Gr),Js.subVectors(t.c,Gr),zi.subVectors($s,Zs),ki.subVectors(Js,$s),gs.subVectors(Zs,Js);let e=[0,-zi.z,zi.y,0,-ki.z,ki.y,0,-gs.z,gs.y,zi.z,0,-zi.x,ki.z,0,-ki.x,gs.z,0,-gs.x,-zi.y,zi.x,0,-ki.y,ki.x,0,-gs.y,gs.x,0];return!hh(e,Zs,$s,Js,ma)||(e=[1,0,0,0,1,0,0,0,1],!hh(e,Zs,$s,Js,ma))?!1:(ga.crossVectors(zi,ki),e=[ga.x,ga.y,ga.z],hh(e,Zs,$s,Js,ma))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},xi=[new A,new A,new A,new A,new A,new A,new A,new A],Xn=new A,pa=new ai,Zs=new A,$s=new A,Js=new A,zi=new A,ki=new A,gs=new A,Gr=new A,ma=new A,ga=new A,_s=new A;function hh(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){_s.fromArray(i,r);let a=s.x*Math.abs(_s.x)+s.y*Math.abs(_s.y)+s.z*Math.abs(_s.z),l=t.dot(_s),c=e.dot(_s),h=n.dot(_s);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Mi=Cp();function Cp(){let i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function Pp(i){Math.abs(i)>65504&&$t("DataUtils.toHalfFloat(): Value out of range."),i=ne(i,-65504,65504),Mi.floatView[0]=i;let t=Mi.uint32View[0],e=t>>23&511;return Mi.baseTable[e]+((t&8388607)>>Mi.shiftTable[e])}function Ip(i){let t=i>>10;return Mi.uint32View[0]=Mi.mantissaTable[Mi.offsetTable[t]+(i&1023)]+Mi.exponentTable[t],Mi.floatView[0]}var uo=class{static toHalfFloat(t){return Pp(t)}static fromHalfFloat(t){return Ip(t)}},Ye=new A,_a=new W,Lp=0,he=class extends $n{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Zh,this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)_a.fromBufferAttribute(this,e),_a.applyMatrix3(t),this.setXY(e,_a.x,_a.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix3(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix4(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyNormalMatrix(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.transformDirection(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=qn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Se(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=qn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=qn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=qn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=qn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),n=Se(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),n=Se(n,this.array),s=Se(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),n=Se(n,this.array),s=Se(s,this.array),r=Se(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var fo=class extends he{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var po=class extends he{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var jt=class extends he{constructor(t,e,n){super(new Float32Array(t),e,n)}},Dp=new ai,Wr=new A,uh=new A,bi=class{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Dp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Wr.subVectors(t,this.center);let e=Wr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Wr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(uh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Wr.copy(t.center).add(uh)),this.expandByPoint(Wr.copy(t.center).sub(uh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Np=0,Fn=new me,dh=new Fe,Ks=new A,Cn=new ai,Xr=new ai,Qe=new A,ce=class i extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=ri(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ep(t)?po:fo)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Fn.makeRotationFromQuaternion(t),this.applyMatrix4(Fn),this}rotateX(t){return Fn.makeRotationX(t),this.applyMatrix4(Fn),this}rotateY(t){return Fn.makeRotationY(t),this.applyMatrix4(Fn),this}rotateZ(t){return Fn.makeRotationZ(t),this.applyMatrix4(Fn),this}translate(t,e,n){return Fn.makeTranslation(t,e,n),this.applyMatrix4(Fn),this}scale(t,e,n){return Fn.makeScale(t,e,n),this.applyMatrix4(Fn),this}lookAt(t){return dh.lookAt(t),dh.updateMatrix(),this.applyMatrix4(dh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ks).negate(),this.translate(Ks.x,Ks.y,Ks.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new jt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&$t("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Kt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Qe.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Qe),Qe.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Qe)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Kt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Kt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){let n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Xr.setFromBufferAttribute(a),this.morphTargetsRelative?(Qe.addVectors(Cn.min,Xr.min),Cn.expandByPoint(Qe),Qe.addVectors(Cn.max,Xr.max),Cn.expandByPoint(Qe)):(Cn.expandByPoint(Xr.min),Cn.expandByPoint(Xr.max))}Cn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Qe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Qe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Qe.fromBufferAttribute(a,c),l&&(Ks.fromBufferAttribute(t,c),Qe.add(Ks)),s=Math.max(s,n.distanceToSquared(Qe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Kt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Kt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new he(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let y=0;y<n.count;y++)a[y]=new A,l[y]=new A;let c=new A,h=new A,f=new A,u=new W,d=new W,g=new W,_=new A,m=new A;function p(y,w,I){c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,w),f.fromBufferAttribute(n,I),u.fromBufferAttribute(r,y),d.fromBufferAttribute(r,w),g.fromBufferAttribute(r,I),h.sub(c),f.sub(c),d.sub(u),g.sub(u);let N=1/(d.x*g.y-g.x*d.y);isFinite(N)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(N),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(N),a[y].add(_),a[w].add(_),a[I].add(_),l[y].add(m),l[w].add(m),l[I].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let y=0,w=M.length;y<w;++y){let I=M[y],N=I.start,H=I.count;for(let V=N,L=N+H;V<L;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let S=new A,v=new A,T=new A,E=new A;function C(y){T.fromBufferAttribute(s,y),E.copy(T);let w=a[y];S.copy(w),S.sub(T.multiplyScalar(T.dot(w))).normalize(),v.crossVectors(E,w);let N=v.dot(l[y])<0?-1:1;o.setXYZW(y,S.x,S.y,S.z,N)}for(let y=0,w=M.length;y<w;++y){let I=M[y],N=I.start,H=I.count;for(let V=N,L=N+H;V<L;V+=3)C(t.getX(V+0)),C(t.getX(V+1)),C(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new he(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let s=new A,r=new A,o=new A,a=new A,l=new A,c=new A,h=new A,f=new A;if(t)for(let u=0,d=t.count;u<d;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Qe.fromBufferAttribute(t,e),Qe.normalize(),t.setXYZ(e,Qe.x,Qe.y,Qe.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,f=a.normalized,u=new c.constructor(l.length*h),d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[d++]}return new he(u,h,f)}if(this.index===null)return $t("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=t(u,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},mo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Zh,this.updateRanges=[],this.version=0,this.uuid=ri()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ri()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ri()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},gn=new A,dr=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)gn.fromBufferAttribute(this,e),gn.applyMatrix4(t),this.setXYZ(e,gn.x,gn.y,gn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)gn.fromBufferAttribute(this,e),gn.applyNormalMatrix(t),this.setXYZ(e,gn.x,gn.y,gn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)gn.fromBufferAttribute(this,e),gn.transformDirection(t),this.setXYZ(e,gn.x,gn.y,gn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=qn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Se(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=qn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=qn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=qn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=qn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Se(e,this.array),n=Se(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Se(e,this.array),n=Se(n,this.array),s=Se(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Se(e,this.array),n=Se(n,this.array),s=Se(s,this.array),r=Se(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){oo("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new he(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){oo("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},fh=new A,Up=new A,Fp=new Qt,Pn=class{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=fh.subVectors(n,e).cross(Up.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(fh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Fp.getNormalMatrix(t),s=this.coplanarPoint(fh).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Bp=0,Jn=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=ri(),this.name="",this.type="Material",this.blending=ts,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hh,this.blendDst=zh,this.blendEquation=Rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ha,this.stencilZFail=Ha,this.stencilZPass=Ha,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){$t(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){$t(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new _t().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Pn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new W().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new W().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Ei=class extends Jn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},js,qr=new A,Qs=new A,tr=new A,er=new W,Yr=new W,qd=new me,xa=new A,Zr=new A,va=new A,ku=new W,ph=new W,Vu=new W,Gi=class extends Fe{constructor(t=new Ei){if(super(),this.isSprite=!0,this.type="Sprite",js===void 0){js=new ce;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new mo(e,5);js.setIndex([0,1,2,0,2,3]),js.setAttribute("position",new dr(n,3,0,!1)),js.setAttribute("uv",new dr(n,2,3,!1))}this.geometry=js,this.material=t,this.center=new W(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Kt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qs.setFromMatrixScale(this.matrixWorld),qd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),tr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qs.multiplyScalar(-tr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;ya(xa.set(-.5,-.5,0),tr,o,Qs,s,r),ya(Zr.set(.5,-.5,0),tr,o,Qs,s,r),ya(va.set(.5,.5,0),tr,o,Qs,s,r),ku.set(0,0),ph.set(1,0),Vu.set(1,1);let a=t.ray.intersectTriangle(xa,Zr,va,!1,qr);if(a===null&&(ya(Zr.set(-.5,.5,0),tr,o,Qs,s,r),ph.set(0,1),a=t.ray.intersectTriangle(xa,va,Zr,!1,qr),a===null))return;let l=t.ray.origin.distanceTo(qr);l<t.near||l>t.far||e.push({distance:l,point:qr.clone(),uv:yi.getInterpolation(qr,xa,Zr,va,ku,ph,Vu,new W),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function ya(i,t,e,n,s,r){er.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Yr.x=r*er.x-s*er.y,Yr.y=s*er.x+r*er.y):Yr.copy(er),i.copy(t),i.x+=Yr.x,i.y+=Yr.y,i.applyMatrix4(qd)}var vi=new A,mh=new A,Ma=new A,Sa=new A,Ss=class{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=vi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vi.copy(this.origin).addScaledVector(this.direction,e),vi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){mh.copy(t).add(e).multiplyScalar(.5),Ma.copy(e).sub(t).normalize(),Sa.copy(this.origin).sub(mh);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ma),a=Sa.dot(this.direction),l=-Sa.dot(Ma),c=Sa.lengthSq(),h=Math.abs(1-o*o),f,u,d,g;if(h>0)if(f=o*l-a,u=o*a-l,g=r*h,f>=0)if(u>=-g)if(u<=g){let _=1/h;f*=_,u*=_,d=f*(f+o*u+2*a)+u*(o*f+u+2*l)+c}else u=r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(mh).addScaledVector(Ma,u),d}intersectSphere(t,e){if(t.radius<0)return null;vi.subVectors(t.center,this.origin);let n=vi.dot(this.direction),s=vi.dot(vi)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(a=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,vi)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,f=t.x-o.x,u=t.y-o.y,d=t.z-o.z,g=e.x-o.x,_=e.y-o.y,m=e.z-o.z,p=n.x-o.x,M=n.y-o.y,S=n.z-o.z,v=Math.abs(l),T=Math.abs(c),E=Math.abs(h),C,y,w,I,N,H,V,L,O,X,q,nt;if(v>=T&&v>=E?(w=l,H=f,O=g,nt=p,l>=0?(C=c,y=h,I=u,N=d,V=_,L=m,X=M,q=S):(C=h,y=c,I=d,N=u,V=m,L=_,X=S,q=M)):T>=E?(w=c,H=u,O=_,nt=M,c>=0?(C=h,y=l,I=d,N=f,V=m,L=g,X=S,q=p):(C=l,y=h,I=f,N=d,V=g,L=m,X=p,q=S)):(w=h,H=d,O=m,nt=S,h>=0?(C=l,y=c,I=f,N=u,V=g,L=_,X=p,q=M):(C=c,y=l,I=u,N=f,V=_,L=g,X=M,q=p)),w===0)return null;let Z=C/w,$=y/w,et=1/w,Ut=I-Z*H,bt=N-$*H,ie=V-Z*O,rt=L-$*O,yt=X-Z*nt,k=q-$*nt,G=yt*rt-k*ie,K=Ut*k-bt*yt,mt=ie*bt-rt*Ut;if(s){if(G<0||K<0||mt<0)return null}else if((G<0||K<0||mt<0)&&(G>0||K>0||mt>0))return null;let ct=G+K+mt;if(ct===0)return null;let gt=et*(G*H+K*O+mt*nt);return(ct>0?gt<0:gt>0)?null:this.at(gt/ct,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},an=class extends Jn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Gu=new me,xs=new Ss,ba=new bi,Wu=new A,Ea=new A,Ta=new A,wa=new A,gh=new A,Aa=new A,Xu=new A,Ra=new A,pt=class extends Fe{constructor(t=new ce,e=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Aa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],f=r[l];h!==0&&(gh.fromBufferAttribute(f,t),o?Aa.addScaledVector(gh,h):Aa.addScaledVector(gh.sub(e),h))}e.add(Aa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ba.copy(n.boundingSphere),ba.applyMatrix4(r),xs.copy(t.ray).recast(t.near),!(ba.containsPoint(xs.origin)===!1&&(xs.intersectSphere(ba,Wu)===null||xs.origin.distanceToSquared(Wu)>(t.far-t.near)**2))&&(Gu.copy(r).invert(),xs.copy(t.ray).applyMatrix4(Gu),!(n.boundingBox!==null&&xs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xs)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,T=S;v<T;v+=3){let E=a.getX(v),C=a.getX(v+1),y=a.getX(v+2);s=Ca(this,p,t,n,c,h,f,E,C,y),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let M=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);s=Ca(this,o,t,n,c,h,f,M,S,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,T=S;v<T;v+=3){let E=v,C=v+1,y=v+2;s=Ca(this,p,t,n,c,h,f,E,C,y),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let M=m,S=m+1,v=m+2;s=Ca(this,o,t,n,c,h,f,M,S,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Op(i,t,e,n,s,r,o,a){let l;if(t.side===ln?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Qi,a),l===null)return null;Ra.copy(a),Ra.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Ra);return c<e.near||c>e.far?null:{distance:c,point:Ra.clone(),object:i}}function Ca(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Ea),i.getVertexPosition(l,Ta),i.getVertexPosition(c,wa);let h=Op(i,t,e,n,Ea,Ta,wa,Xu);if(h){let f=new A;yi.getBarycoord(Xu,Ea,Ta,wa,f),s&&(h.uv=yi.getInterpolatedAttribute(s,a,l,c,f,new W)),r&&(h.uv1=yi.getInterpolatedAttribute(r,a,l,c,f,new W)),o&&(h.normal=yi.getInterpolatedAttribute(o,a,l,c,f,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new A,materialIndex:0};yi.getNormal(Ea,Ta,wa,u.normal),h.face=u,h.barycoord=f}return h}var Ti=class extends _n{constructor(t=null,e=1,n=1,s,r,o,a,l,c=nn,h=nn,f,u){super(null,o,a,l,c,h,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var vn=class extends he{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},nr=new me,qu=new me,Pa=[],Yu=new ai,Hp=new me,$r=new pt,Jr=new bi,Wi=class extends pt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new vn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Hp)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ai),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,nr),Yu.copy(t.boundingBox).applyMatrix4(nr),this.boundingBox.union(Yu)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new bi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,nr),Jr.copy(t.boundingSphere).applyMatrix4(nr),this.boundingSphere.union(Jr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if($r.geometry=this.geometry,$r.material=this.material,$r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jr.copy(this.boundingSphere),Jr.applyMatrix4(n),t.ray.intersectsSphere(Jr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,nr),qu.multiplyMatrices(n,nr),$r.matrixWorld=qu,$r.raycast(t,Pa);for(let o=0,a=Pa.length;o<a;o++){let l=Pa[o];l.instanceId=r,l.object=this,e.push(l)}Pa.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new vn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ti(new Float32Array(s*this.count),s,this.count,wr,Vn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},vs=new bi,zp=new W(.5,.5),Ia=new A,fr=class{constructor(t=new Pn,e=new Pn,n=new Pn,s=new Pn,r=new Pn,o=new Pn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Yn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],M=r[12],S=r[13],v=r[14],T=r[15];if(s[0].setComponents(c-o,d-h,p-g,T-M).normalize(),s[1].setComponents(c+o,d+h,p+g,T+M).normalize(),s[2].setComponents(c+a,d+f,p+_,T+S).normalize(),s[3].setComponents(c-a,d-f,p-_,T-S).normalize(),n)s[4].setComponents(l,u,m,v).normalize(),s[5].setComponents(c-l,d-u,p-m,T-v).normalize();else if(s[4].setComponents(c-l,d-u,p-m,T-v).normalize(),e===Yn)s[5].setComponents(c+l,d+u,p+m,T+v).normalize();else if(e===lr)s[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(t){vs.center.set(0,0,0);let e=zp.distanceTo(t.center);return vs.radius=.7071067811865476+e,vs.applyMatrix4(t.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ia.x=s.normal.x>0?t.max.x:t.min.x,Ia.y=s.normal.y>0?t.max.y:t.min.y,Ia.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ia)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ja=class extends Jn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Zu=new me,wh=new Ss,La=new bi,Da=new A,go=class extends Fe{constructor(t=new ce,e=new ja){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),La.copy(n.boundingSphere),La.applyMatrix4(s),La.radius+=r,t.ray.intersectsSphere(La)===!1)return;Zu.copy(s).invert(),wh.copy(t.ray).applyMatrix4(Zu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,f=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=u,_=d;g<_;g++){let m=c.getX(g);Da.fromBufferAttribute(f,m),$u(Da,m,l,s,t,e,this)}}else{let u=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=u,_=d;g<_;g++)Da.fromBufferAttribute(f,g),$u(Da,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function $u(i,t,e,n,s,r,o){let a=wh.distanceSqToPoint(i);if(a<e){let l=new A;wh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var _o=class extends _n{constructor(t=[],e=es,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Xi=class extends _n{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var qi=class extends _n{constructor(t,e,n=Qn,s,r,o,a=nn,l=nn,c,h=oi,f=1){if(h!==oi&&h!==ns)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new hr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Qa=class extends qi{constructor(t,e=Qn,n=es,s,r,o=nn,a=nn,l,c=oi){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},xo=class extends _n{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ne=class i extends ce{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],f=[],u=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(f,2));function g(_,m,p,M,S,v,T,E,C,y,w){let I=v/C,N=T/y,H=v/2,V=T/2,L=E/2,O=C+1,X=y+1,q=0,nt=0,Z=new A;for(let $=0;$<X;$++){let et=$*N-V;for(let Ut=0;Ut<O;Ut++){let bt=Ut*I-H;Z[_]=bt*M,Z[m]=et*S,Z[p]=L,c.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[p]=E>0?1:-1,h.push(Z.x,Z.y,Z.z),f.push(Ut/C),f.push(1-$/y),q+=1}}for(let $=0;$<y;$++)for(let et=0;et<C;et++){let Ut=u+et+O*$,bt=u+et+O*($+1),ie=u+(et+1)+O*($+1),rt=u+(et+1)+O*$;l.push(Ut,bt,rt),l.push(bt,ie,rt),nt+=6}a.addGroup(d,nt,w),d+=nt,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var xe=class i extends ce{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],u=[],d=[],g=0,_=[],m=n/2,p=0;M(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new jt(f,3)),this.setAttribute("normal",new jt(u,3)),this.setAttribute("uv",new jt(d,2));function M(){let v=new A,T=new A,E=0,C=(e-t)/n;for(let y=0;y<=r;y++){let w=[],I=y/r,N=I*(e-t)+t;for(let H=0;H<=s;H++){let V=H/s,L=V*l+a,O=Math.sin(L),X=Math.cos(L);T.x=N*O,T.y=-I*n+m,T.z=N*X,f.push(T.x,T.y,T.z),v.set(O,C,X).normalize(),u.push(v.x,v.y,v.z),d.push(V,1-I),w.push(g++)}_.push(w)}for(let y=0;y<s;y++)for(let w=0;w<r;w++){let I=_[w][y],N=_[w+1][y],H=_[w+1][y+1],V=_[w][y+1];(t>0||w!==0)&&(h.push(I,N,V),E+=3),(e>0||w!==r-1)&&(h.push(N,H,V),E+=3)}c.addGroup(p,E,0),p+=E}function S(v){let T=g,E=new W,C=new A,y=0,w=v===!0?t:e,I=v===!0?1:-1;for(let H=1;H<=s;H++)f.push(0,m*I,0),u.push(0,I,0),d.push(.5,.5),g++;let N=g;for(let H=0;H<=s;H++){let L=H/s*l+a,O=Math.cos(L),X=Math.sin(L);C.x=w*X,C.y=m*I,C.z=w*O,f.push(C.x,C.y,C.z),u.push(0,I,0),E.x=O*.5+.5,E.y=X*.5*I+.5,d.push(E.x,E.y),g++}for(let H=0;H<s;H++){let V=T+H,L=N+H;v===!0?h.push(L,L+1,V):h.push(L+1,L,V),y+=3}c.addGroup(p,y,v===!0?1:2),p+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},li=class i extends xe{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},tl=class i extends ce{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new jt(r,3)),this.setAttribute("normal",new jt(r.slice(),3)),this.setAttribute("uv",new jt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let S=new A,v=new A,T=new A;for(let E=0;E<e.length;E+=3)d(e[E+0],S),d(e[E+1],v),d(e[E+2],T),l(S,v,T,M)}function l(M,S,v,T){let E=T+1,C=[];for(let y=0;y<=E;y++){C[y]=[];let w=M.clone().lerp(v,y/E),I=S.clone().lerp(v,y/E),N=E-y;for(let H=0;H<=N;H++)H===0&&y===E?C[y][H]=w:C[y][H]=w.clone().lerp(I,H/N)}for(let y=0;y<E;y++)for(let w=0;w<2*(E-y)-1;w++){let I=Math.floor(w/2);w%2===0?(u(C[y][I+1]),u(C[y+1][I]),u(C[y][I])):(u(C[y][I+1]),u(C[y+1][I+1]),u(C[y+1][I]))}}function c(M){let S=new A;for(let v=0;v<r.length;v+=3)S.x=r[v+0],S.y=r[v+1],S.z=r[v+2],S.normalize().multiplyScalar(M),r[v+0]=S.x,r[v+1]=S.y,r[v+2]=S.z}function h(){let M=new A;for(let S=0;S<r.length;S+=3){M.x=r[S+0],M.y=r[S+1],M.z=r[S+2];let v=m(M)/2/Math.PI+.5,T=p(M)/Math.PI+.5;o.push(v,1-T)}g(),f()}function f(){for(let M=0;M<o.length;M+=6){let S=o[M+0],v=o[M+2],T=o[M+4],E=Math.max(S,v,T),C=Math.min(S,v,T);E>.9&&C<.1&&(S<.2&&(o[M+0]+=1),v<.2&&(o[M+2]+=1),T<.2&&(o[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function d(M,S){let v=M*3;S.x=t[v+0],S.y=t[v+1],S.z=t[v+2]}function g(){let M=new A,S=new A,v=new A,T=new A,E=new W,C=new W,y=new W;for(let w=0,I=0;w<r.length;w+=9,I+=6){M.set(r[w+0],r[w+1],r[w+2]),S.set(r[w+3],r[w+4],r[w+5]),v.set(r[w+6],r[w+7],r[w+8]),E.set(o[I+0],o[I+1]),C.set(o[I+2],o[I+3]),y.set(o[I+4],o[I+5]),T.copy(M).add(S).add(v).divideScalar(3);let N=m(T);_(E,I+0,M,N),_(C,I+2,S,N),_(y,I+4,v,N)}}function _(M,S,v,T){T<0&&M.x===1&&(o[S]=M.x-1),v.x===0&&v.z===0&&(o[S]=T/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var In=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){$t("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],u=n[s+1]-h,d=(o-h)/u;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new W:new A);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new A,s=[],r=[],o=[],a=new A,l=new me;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new A)}r[0]=new A,o[0]=new A;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(ne(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ne(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},pr=class extends In{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new W){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},el=class extends pr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Kh(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,f){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+f)+(l-a)/f;u*=h,d*=h,s(o,a,u,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Ju=new A,Ku=new A,_h=new Kh,xh=new Kh,vh=new Kh,nl=class extends In{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new A){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Ku.subVectors(s[0],s[1]).add(s[0]),c=Ku);let f=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Ju.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ju),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),_h.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,g,_,m),xh.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,g,_,m),vh.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(_h.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),xh.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),vh.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(_h.calc(l),xh.calc(l),vh.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new A().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function ju(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function kp(i,t){let e=1-i;return e*e*t}function Vp(i,t){return 2*(1-i)*i*t}function Gp(i,t){return i*i*t}function to(i,t,e,n){return kp(i,t)+Vp(i,e)+Gp(i,n)}function Wp(i,t){let e=1-i;return e*e*e*t}function Xp(i,t){let e=1-i;return 3*e*e*i*t}function qp(i,t){return 3*(1-i)*i*i*t}function Yp(i,t){return i*i*i*t}function eo(i,t,e,n,s){return Wp(i,t)+Xp(i,e)+qp(i,n)+Yp(i,s)}var vo=class extends In{constructor(t=new W,e=new W,n=new W,s=new W){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new W){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(eo(t,s.x,r.x,o.x,a.x),eo(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},il=class extends In{constructor(t=new A,e=new A,n=new A,s=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new A){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(eo(t,s.x,r.x,o.x,a.x),eo(t,s.y,r.y,o.y,a.y),eo(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},yo=class extends In{constructor(t=new W,e=new W){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new W){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new W){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},sl=class extends In{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Mo=class extends In{constructor(t=new W,e=new W,n=new W){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new W){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(to(t,s.x,r.x,o.x),to(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},rl=class extends In{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(to(t,s.x,r.x,o.x),to(t,s.y,r.y,o.y),to(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},So=class extends In{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new W){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(ju(a,l.x,c.x,h.x,f.x),ju(a,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new W().fromArray(s))}return this}},Ah=Object.freeze({__proto__:null,ArcCurve:el,CatmullRomCurve3:nl,CubicBezierCurve:vo,CubicBezierCurve3:il,EllipseCurve:pr,LineCurve:yo,LineCurve3:sl,QuadraticBezierCurve:Mo,QuadraticBezierCurve3:rl,SplineCurve:So}),ol=class extends In{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ah[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Ah[s.type]().fromJSON(s))}return this}},bo=class extends ol{constructor(t){super(),this.type="Path",this.currentPoint=new W,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new yo(this.currentPoint.clone(),new W(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Mo(this.currentPoint.clone(),new W(t,e),new W(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new vo(this.currentPoint.clone(),new W(t,e),new W(n,s),new W(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new So(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new pr(t,e,n,s,r,o,a,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Kn=class extends bo{constructor(t){super(t),this.uuid=ri(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new bo().fromJSON(s))}return this}};function Zp(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Yd(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Qp(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let h=a,f=l;for(let u=e;u<s;u+=e){let d=i[u],g=i[u+1];d<a&&(a=d),g<l&&(l=g),d>h&&(h=d),g>f&&(f=g)}c=Math.max(h-a,f-l),c=c!==0?32767/c:0}return Eo(r,o,e,a,l,c,0),o}function Yd(i,t,e,n,s){let r;if(s===hm(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Qu(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Qu(o/n|0,i[o],i[o+1],r);return r&&mr(r,r.next)&&(wo(r),r=r.next),r}function bs(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(mr(e,e.next)||Oe(e.prev,e,e.next)===0)){if(wo(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Eo(i,t,e,n,s,r,o){if(!i)return;!o&&r&&sm(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Jp(i,n,s,r):$p(i)){t.push(l.i,i.i,c.i),wo(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Kp(bs(i),t),Eo(i,t,e,n,s,r,2)):o===2&&jp(i,t,e,n,s,r):Eo(bs(i),t,e,n,s,r,1);break}}}function $p(i){let t=i.prev,e=i,n=i.next;if(Oe(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),f=Math.min(a,l,c),u=Math.max(s,r,o),d=Math.max(a,l,c),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=d&&Kr(s,a,r,l,o,c,g.x,g.y)&&Oe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Jp(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Oe(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,f=r.y,u=o.y,d=Math.min(a,l,c),g=Math.min(h,f,u),_=Math.max(a,l,c),m=Math.max(h,f,u),p=Rh(d,g,t,e,n),M=Rh(_,m,t,e,n),S=i.prevZ,v=i.nextZ;for(;S&&S.z>=p&&v&&v.z<=M;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Kr(a,h,l,f,c,u,S.x,S.y)&&Oe(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Kr(a,h,l,f,c,u,v.x,v.y)&&Oe(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Kr(a,h,l,f,c,u,S.x,S.y)&&Oe(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=M;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Kr(a,h,l,f,c,u,v.x,v.y)&&Oe(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Kp(i,t){let e=i;do{let n=e.prev,s=e.next.next;!mr(n,s)&&$d(n,e,e.next,s)&&To(n,s)&&To(s,n)&&(t.push(n.i,e.i,s.i),wo(e),wo(e.next),e=i=s),e=e.next}while(e!==i);return bs(e)}function jp(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&am(o,a)){let l=Jd(o,a);o=bs(o,o.next),l=bs(l,l.next),Eo(o,t,e,n,s,r,0),Eo(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Qp(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Yd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(om(c))}s.sort(tm);for(let r=0;r<s.length;r++)e=em(s[r],e);return e}function tm(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function em(i,t){let e=nm(i,t);if(!e)return t;let n=Jd(e,i);return bs(n,n.next),bs(e,e.next)}function nm(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(mr(i,e))return e;do{if(mr(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,o=e.x<e.next.x?e:e.next,f===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Zd(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let f=Math.abs(s-e.y)/(n-e.x);To(e,i)&&(f<h||f===h&&(e.x>o.x||e.x===o.x&&im(o,e)))&&(o=e,h=f)}e=e.next}while(e!==a);return o}function im(i,t){return Oe(i.prev,i,t.prev)<0&&Oe(t.next,i,i.next)<0}function sm(i,t,e,n){let s=i;do s.z===0&&(s.z=Rh(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,rm(s)}function rm(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Rh(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function om(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Zd(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Kr(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Zd(i,t,e,n,s,r,o,a)}function am(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!lm(i,t)&&(To(i,t)&&To(t,i)&&cm(i,t)&&(Oe(i.prev,i,t.prev)||Oe(i,t.prev,t))||mr(i,t)&&Oe(i.prev,i,i.next)>0&&Oe(t.prev,t,t.next)>0)}function Oe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function mr(i,t){return i.x===t.x&&i.y===t.y}function $d(i,t,e,n){let s=Ua(Oe(i,t,e)),r=Ua(Oe(i,t,n)),o=Ua(Oe(e,n,i)),a=Ua(Oe(e,n,t));return!!(s!==r&&o!==a||s===0&&Na(i,e,t)||r===0&&Na(i,n,t)||o===0&&Na(e,i,n)||a===0&&Na(e,t,n))}function Na(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ua(i){return i>0?1:i<0?-1:0}function lm(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&$d(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function To(i,t){return Oe(i.prev,i,i.next)<0?Oe(i,t,i.next)>=0&&Oe(i,i.prev,t)>=0:Oe(i,t,i.prev)<0||Oe(i,i.next,t)<0}function cm(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Jd(i,t){let e=Ch(i.i,i.x,i.y),n=Ch(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Qu(i,t,e,n){let s=Ch(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function wo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ch(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function hm(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Ph=class{static triangulate(t,e,n=2){return Zp(t,e,n)}},si=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];td(t),ed(n,t);let o=t.length;e.forEach(td);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,ed(n,e[l]);let a=Ph.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function td(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function ed(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var gr=class i extends ce{constructor(t=new Kn([new W(.5,.5),new W(-.5,.5),new W(-.5,-.5),new W(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new jt(s,3)),this.setAttribute("uv",new jt(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:um,S,v=!1,T,E,C,y;if(p){S=p.getSpacedPoints(h),v=!0,u=!1;let Q=p.isCatmullRomCurve3?p.closed:!1;T=p.computeFrenetFrames(h,Q),E=new A,C=new A,y=new A}u||(m=0,d=0,g=0,_=0);let w=a.extractPoints(c),I=w.shape,N=w.holes;if(!si.isClockWise(I)){I=I.reverse();for(let Q=0,at=N.length;Q<at;Q++){let ht=N[Q];si.isClockWise(ht)&&(N[Q]=ht.reverse())}}function V(Q){let ht=10000000000000001e-36,ut=Q[0];for(let Mt=1;Mt<=Q.length;Mt++){let Gt=Mt%Q.length,Ht=Q[Gt],Wt=Ht.x-ut.x,Xt=Ht.y-ut.y,U=Wt*Wt+Xt*Xt,fe=Math.max(Math.abs(Ht.x),Math.abs(Ht.y),Math.abs(ut.x),Math.abs(ut.y)),se=ht*fe*fe;if(U<=se){Q.splice(Gt,1),Mt--;continue}ut=Ht}}V(I),N.forEach(V);let L=N.length,O=I;for(let Q=0;Q<L;Q++){let at=N[Q];I=I.concat(at)}function X(Q,at,ht){return at||Kt("ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(at,ht)}let q=I.length;function nt(Q,at,ht){let ut,Mt,Gt,Ht=Q.x-at.x,Wt=Q.y-at.y,Xt=ht.x-Q.x,U=ht.y-Q.y,fe=Ht*Ht+Wt*Wt,se=Ht*U-Wt*Xt;if(Math.abs(se)>Number.EPSILON){let R=Math.sqrt(fe),x=Math.sqrt(Xt*Xt+U*U),z=at.x-Wt/R,Y=at.y+Ht/R,j=ht.x-U/x,dt=ht.y+Xt/x,xt=((j-z)*U-(dt-Y)*Xt)/(Ht*U-Wt*Xt);ut=z+Ht*xt-Q.x,Mt=Y+Wt*xt-Q.y;let tt=ut*ut+Mt*Mt;if(tt<=2)return new W(ut,Mt);Gt=Math.sqrt(tt/2)}else{let R=!1;Ht>Number.EPSILON?Xt>Number.EPSILON&&(R=!0):Ht<-Number.EPSILON?Xt<-Number.EPSILON&&(R=!0):Math.sign(Wt)===Math.sign(U)&&(R=!0),R?(ut=-Wt,Mt=Ht,Gt=Math.sqrt(fe)):(ut=Ht,Mt=Wt,Gt=Math.sqrt(fe/2))}return new W(ut/Gt,Mt/Gt)}let Z=[];for(let Q=0,at=O.length,ht=at-1,ut=Q+1;Q<at;Q++,ht++,ut++)ht===at&&(ht=0),ut===at&&(ut=0),Z[Q]=nt(O[Q],O[ht],O[ut]);let $=[],et,Ut=Z.concat();for(let Q=0,at=L;Q<at;Q++){let ht=N[Q];et=[];for(let ut=0,Mt=ht.length,Gt=Mt-1,Ht=ut+1;ut<Mt;ut++,Gt++,Ht++)Gt===Mt&&(Gt=0),Ht===Mt&&(Ht=0),et[ut]=nt(ht[ut],ht[Gt],ht[Ht]);$.push(et),Ut=Ut.concat(et)}let bt;if(m===0)bt=si.triangulateShape(O,N);else{let Q=[],at=[];for(let ht=0;ht<m;ht++){let ut=ht/m,Mt=d*Math.cos(ut*Math.PI/2),Gt=g*Math.sin(ut*Math.PI/2)+_;for(let Ht=0,Wt=O.length;Ht<Wt;Ht++){let Xt=X(O[Ht],Z[Ht],Gt);K(Xt.x,Xt.y,-Mt),ut===0&&Q.push(Xt)}for(let Ht=0,Wt=L;Ht<Wt;Ht++){let Xt=N[Ht];et=$[Ht];let U=[];for(let fe=0,se=Xt.length;fe<se;fe++){let R=X(Xt[fe],et[fe],Gt);K(R.x,R.y,-Mt),ut===0&&U.push(R)}ut===0&&at.push(U)}}bt=si.triangulateShape(Q,at)}let ie=bt.length,rt=g+_;for(let Q=0;Q<q;Q++){let at=u?X(I[Q],Ut[Q],rt):I[Q];v?(C.copy(T.normals[0]).multiplyScalar(at.x),E.copy(T.binormals[0]).multiplyScalar(at.y),y.copy(S[0]).add(C).add(E),K(y.x,y.y,y.z)):K(at.x,at.y,0)}for(let Q=1;Q<=h;Q++)for(let at=0;at<q;at++){let ht=u?X(I[at],Ut[at],rt):I[at];v?(C.copy(T.normals[Q]).multiplyScalar(ht.x),E.copy(T.binormals[Q]).multiplyScalar(ht.y),y.copy(S[Q]).add(C).add(E),K(y.x,y.y,y.z)):K(ht.x,ht.y,f/h*Q)}for(let Q=m-1;Q>=0;Q--){let at=Q/m,ht=d*Math.cos(at*Math.PI/2),ut=g*Math.sin(at*Math.PI/2)+_;for(let Mt=0,Gt=O.length;Mt<Gt;Mt++){let Ht=X(O[Mt],Z[Mt],ut);K(Ht.x,Ht.y,f+ht)}for(let Mt=0,Gt=N.length;Mt<Gt;Mt++){let Ht=N[Mt];et=$[Mt];for(let Wt=0,Xt=Ht.length;Wt<Xt;Wt++){let U=X(Ht[Wt],et[Wt],ut);v?K(U.x,U.y+S[h-1].y,S[h-1].x+ht):K(U.x,U.y,f+ht)}}}yt(),k();function yt(){let Q=s.length/3;if(u){let at=0,ht=q*at;for(let ut=0;ut<ie;ut++){let Mt=bt[ut];mt(Mt[2]+ht,Mt[1]+ht,Mt[0]+ht)}at=h+m*2,ht=q*at;for(let ut=0;ut<ie;ut++){let Mt=bt[ut];mt(Mt[0]+ht,Mt[1]+ht,Mt[2]+ht)}}else{for(let at=0;at<ie;at++){let ht=bt[at];mt(ht[2],ht[1],ht[0])}for(let at=0;at<ie;at++){let ht=bt[at];mt(ht[0]+q*h,ht[1]+q*h,ht[2]+q*h)}}n.addGroup(Q,s.length/3-Q,0)}function k(){let Q=s.length/3,at=0;G(O,at),at+=O.length;for(let ht=0,ut=N.length;ht<ut;ht++){let Mt=N[ht];G(Mt,at),at+=Mt.length}n.addGroup(Q,s.length/3-Q,1)}function G(Q,at){let ht=Q.length;for(;--ht>=0;){let ut=ht,Mt=ht-1;Mt<0&&(Mt=Q.length-1);for(let Gt=0,Ht=h+m*2;Gt<Ht;Gt++){let Wt=q*Gt,Xt=q*(Gt+1),U=at+ut+Wt,fe=at+Mt+Wt,se=at+Mt+Xt,R=at+ut+Xt;ct(U,fe,se,R)}}}function K(Q,at,ht){l.push(Q),l.push(at),l.push(ht)}function mt(Q,at,ht){gt(Q),gt(at),gt(ht);let ut=s.length/3,Mt=M.generateTopUV(n,s,ut-3,ut-2,ut-1);qt(Mt[0]),qt(Mt[1]),qt(Mt[2])}function ct(Q,at,ht,ut){gt(Q),gt(at),gt(ut),gt(at),gt(ht),gt(ut);let Mt=s.length/3,Gt=M.generateSideWallUV(n,s,Mt-6,Mt-3,Mt-2,Mt-1);qt(Gt[0]),qt(Gt[1]),qt(Gt[3]),qt(Gt[1]),qt(Gt[2]),qt(Gt[3])}function gt(Q){s.push(l[Q*3+0]),s.push(l[Q*3+1]),s.push(l[Q*3+2])}function qt(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return dm(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Ah[s.type]().fromJSON(s)),new i(n,t.options)}},um={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new W(r,o),new W(a,l),new W(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],u=t[s*3],d=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new W(o,1-l),new W(c,1-f),new W(u,1-g),new W(_,1-p)]:[new W(a,1-l),new W(h,1-f),new W(d,1-g),new W(m,1-p)]}};function dm(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ao=class i extends tl{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},Hn=class i extends ce{constructor(t=[new W(0,-.5),new W(.5,0),new W(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ne(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/e,f=new A,u=new W,d=new A,g=new A,_=new A,m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),l.push(d.x,d.y,d.z),_.copy(g)}for(let M=0;M<=e;M++){let S=n+M*h*s,v=Math.sin(S),T=Math.cos(S);for(let E=0;E<=t.length-1;E++){f.x=t[E].x*v,f.y=t[E].y,f.z=t[E].x*T,o.push(f.x,f.y,f.z),u.x=M/e,u.y=E/(t.length-1),a.push(u.x,u.y);let C=l[3*E+0]*v,y=l[3*E+1],w=l[3*E+0]*T;c.push(C,y,w)}}for(let M=0;M<e;M++)for(let S=0;S<t.length-1;S++){let v=S+M*t.length,T=v,E=v+t.length,C=v+t.length+1,y=v+1;r.push(T,E,y),r.push(C,y,E)}this.setIndex(r),this.setAttribute("position",new jt(o,3)),this.setAttribute("uv",new jt(a,2)),this.setAttribute("normal",new jt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var yn=class i extends ce{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,f=t/a,u=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let M=p*u-o;for(let S=0;S<c;S++){let v=S*f-r;g.push(v,-M,0),_.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){let S=M+c*p,v=M+c*(p+1),T=M+1+c*(p+1),E=M+1+c*p;d.push(S,v,E),d.push(v,T,E)}this.setIndex(d),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(_,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Mn=class i extends ce{constructor(t=new Kn([new W(0,.5),new W(-.5,-.5),new W(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new jt(s,3)),this.setAttribute("normal",new jt(r,3)),this.setAttribute("uv",new jt(o,2));function c(h){let f=s.length/3,u=h.extractPoints(e),d=u.shape,g=u.holes;si.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){let M=g[m];si.isClockWise(M)===!0&&(g[m]=M.reverse())}let _=si.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){let M=g[m];d=d.concat(M)}for(let m=0,p=d.length;m<p;m++){let M=d[m];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let m=0,p=_.length;m<p;m++){let M=_[m],S=M[0]+f,v=M[1]+f,T=M[2]+f;n.push(S,v,T),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return fm(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function fm(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var qe=class i extends ce{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],f=new A,u=new A,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let M=[],S=p/n,v=o+S*a,T=t*Math.cos(v),E=Math.sqrt(t*t-T*T),C=0;p===0&&o===0?C=.5/e:p===n&&l===Math.PI&&(C=-.5/e);for(let y=0;y<=e;y++){let w=y/e,I=s+w*r;f.x=-E*Math.cos(I),f.y=T,f.z=E*Math.sin(I),g.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),m.push(w+C,1-S),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){let S=h[p][M+1],v=h[p][M],T=h[p+1][M],E=h[p+1][M+1];(p!==0||o>0)&&d.push(S,v,E),(p!==n-1||l<Math.PI)&&d.push(v,T,E)}this.setIndex(d),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(_,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var wi=class i extends ce{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],f=[],u=new A,d=new A,g=new A;for(let _=0;_<=n;_++){let m=o+_/n*a;for(let p=0;p<=s;p++){let M=p/s*r;d.x=(t+e*Math.cos(m))*Math.cos(M),d.y=(t+e*Math.cos(m))*Math.sin(M),d.z=e*Math.sin(m),c.push(d.x,d.y,d.z),u.x=t*Math.cos(M),u.y=t*Math.sin(M),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),f.push(p/s),f.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=s;m++){let p=(s+1)*_+m-1,M=(s+1)*(_-1)+m-1,S=(s+1)*(_-1)+m,v=(s+1)*_+m;l.push(p,M,v),l.push(M,S,v)}this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Is(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(nd(s))s.isRenderTargetTexture?($t("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(nd(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function fn(i){let t={};for(let e=0;e<i.length;e++){let n=Is(i[e]);for(let s in n)t[s]=n[s]}return t}function nd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function pm(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function jh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}var Ci={clone:Is,merge:fn},mm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,re=class extends Jn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mm,this.fragmentShader=gm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Is(t.uniforms),this.uniformsGroups=pm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new _t().setHex(s.value);break;case"v2":this.uniforms[n].value=new W().fromArray(s.value);break;case"v3":this.uniforms[n].value=new A().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ce().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Qt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new me().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},_r=class extends re{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ze=class extends Jn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new _t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zo,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var xr=class extends Jn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zo,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=yl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},al=class extends Jn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ld,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ll=class extends Jn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ir(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function yh(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Yi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},cl=class extends Yi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bh,endingEnd:bh}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Eh:r=t,a=2*e-n;break;case Th:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Eh:o=t,l=2*n-e;break;case Th:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-u*m+2*u*_-u*g,M=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,S=(-1-d)*m+(1.5+d)*_+.5*g,v=d*m-d*_;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+M*o[c+T]+S*o[l+T]+v*o[f+T];return r}},hl=class extends Yi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),f=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*f+o[l+u]*h;return r}},ul=class extends Yi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},dl=class extends Yi{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,f=this.outTangents;if(!h||!f){let g=(n-e)/(s-e),_=1-g;for(let m=0;m!==a;++m)r[m]=o[c+m]*_+o[l+m]*g;return r}let u=a*2,d=t-1;for(let g=0;g!==a;++g){let _=o[c+g],m=o[l+g],p=d*u+g*2,M=f[p],S=f[p+1],v=t*u+g*2,T=h[v],E=h[v+1],C=xm(n,e,M,T,s);r[g]=Kd(C,_,S,E,m)}return r}};function Kd(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function _m(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function xm(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=Kd(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=_m(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Ln=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ir(e,this.TimeBufferType),this.values=ir(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ir(t.times,Array),values:ir(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),yh(t.settings)&&(n.settings={inTangents:ir(t.settings.inTangents,Array),outTangents:ir(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ul(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new hl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new cl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new dl(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case no:e=this.InterpolantFactoryMethodDiscrete;break;case Za:e=this.InterpolantFactoryMethodLinear;break;case Oa:e=this.InterpolantFactoryMethodSmooth;break;case Sh:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return $t("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return no;case this.InterpolantFactoryMethodLinear:return Za;case this.InterpolantFactoryMethodSmooth:return Oa;case this.InterpolantFactoryMethodBezier:return Sh}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;yh(this.settings)&&(id(this.settings.inTangents,t),id(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Kt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Kt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Kt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Kt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&np(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Kt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Oa,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let f=a*n,u=f-n,d=f+n;for(let g=0;g!==n;++g){let _=e[f+g];if(_!==e[u+g]||_!==e[d+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let f=a*n,u=o*n;for(let d=0;d!==n;++d)e[u+d]=e[f+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,yh(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function id(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Ln.prototype.ValueTypeName="";Ln.prototype.TimeBufferType=Float32Array;Ln.prototype.ValueBufferType=Float32Array;Ln.prototype.DefaultInterpolation=Za;var Zi=class extends Ln{constructor(t,e,n){super(t,e,n)}};Zi.prototype.ValueTypeName="bool";Zi.prototype.ValueBufferType=Array;Zi.prototype.DefaultInterpolation=no;Zi.prototype.InterpolantFactoryMethodLinear=void 0;Zi.prototype.InterpolantFactoryMethodSmooth=void 0;var fl=class extends Ln{constructor(t,e,n,s){super(t,e,n,s)}};fl.prototype.ValueTypeName="color";var pl=class extends Ln{constructor(t,e,n,s){super(t,e,n,s)}};pl.prototype.ValueTypeName="number";var ml=class extends Yi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)on.slerpFlat(r,0,o,c-a,o,c,l);return r}},Ro=class extends Ln{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new ml(this.times,this.values,this.getValueSize(),t)}};Ro.prototype.ValueTypeName="quaternion";Ro.prototype.InterpolantFactoryMethodSmooth=void 0;var $i=class extends Ln{constructor(t,e,n){super(t,e,n)}};$i.prototype.ValueTypeName="string";$i.prototype.ValueBufferType=Array;$i.prototype.DefaultInterpolation=no;$i.prototype.InterpolantFactoryMethodLinear=void 0;$i.prototype.InterpolantFactoryMethodSmooth=void 0;var gl=class extends Ln{constructor(t,e,n,s){super(t,e,n,s)}};gl.prototype.ValueTypeName="vector";var _l=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},jd=new _l,xl=class{constructor(t){this.manager=t!==void 0?t:jd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};xl.DEFAULT_MATERIAL_NAME="__DEFAULT";var Es=class extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new _t(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},vr=class extends Es{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new _t(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Mh=new me,sd=new A,rd=new A,yr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new W(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fr,this._frameExtents=new W(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;sd.setFromMatrixPosition(t.matrixWorld),e.position.copy(sd),rd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(rd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Mh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Mh,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===lr||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(Mh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Fa=new A,Ba=new on,ii=new A,Co=class extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Fa,Ba,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fa,Ba,ii.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Fa,Ba,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fa,Ba,ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Vi=new A,od=new W,ad=new W,en=class extends Co{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ms*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ms*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vi.x,Vi.y).multiplyScalar(-t/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vi.x,Vi.y).multiplyScalar(-t/Vi.z)}getViewSize(t,e){return this.getViewBounds(t,od,ad),e.subVectors(ad,od)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(jr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ih=class extends yr{constructor(){super(new en(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=Ms*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){let t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}},Po=class extends Es{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Ih}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}},Lh=class extends yr{constructor(){super(new en(90,1,.5,500)),this.isPointLightShadow=!0}},Ts=class extends Es{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Lh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Ji=class extends Co{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Dh=class extends yr{constructor(){super(new Ji(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ws=class extends Es{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new Dh}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var As=class extends ce{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var sr=-90,rr=1,Mr=class extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new en(sr,rr,t,e);s.layers=this.layers,this.add(s);let r=new en(sr,rr,t,e);r.layers=this.layers,this.add(r);let o=new en(sr,rr,t,e);o.layers=this.layers,this.add(o);let a=new en(sr,rr,t,e);a.layers=this.layers,this.add(a);let l=new en(sr,rr,t,e);l.layers=this.layers,this.add(l);let c=new en(sr,rr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Yn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},vl=class extends en{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Io=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=vm.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function vm(){this._document.hidden===!1&&this.reset()}var Qh="\\[\\]\\.:\\/",ym=new RegExp("["+Qh+"]","g"),tu="[^"+Qh+"]",Mm="[^"+Qh.replace("\\.","")+"]",Sm=/((?:WC+[\/:])*)/.source.replace("WC",tu),bm=/(WCOD+)?/.source.replace("WCOD",Mm),Em=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",tu),Tm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",tu),wm=new RegExp("^"+Sm+bm+Em+Tm+"$"),Am=["material","materials","bones","map"],Nh=class{constructor(t,e,n){let s=n||De.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},De=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(ym,"")}static parseTrackName(t){let e=wm.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Am.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){$t("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Kt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Kt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Kt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Kt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Kt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Kt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Kt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;Kt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Kt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Kt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};De.Composite=Nh;De.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};De.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};De.prototype.GetterByBindingType=[De.prototype._getValue_direct,De.prototype._getValue_array,De.prototype._getValue_arrayElement,De.prototype._getValue_toArray];De.prototype.SetterByBindingTypeAndVersioning=[[De.prototype._setValue_direct,De.prototype._setValue_direct_setNeedsUpdate,De.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[De.prototype._setValue_array,De.prototype._setValue_array_setNeedsUpdate,De.prototype._setValue_array_setMatrixWorldNeedsUpdate],[De.prototype._setValue_arrayElement,De.prototype._setValue_arrayElement_setNeedsUpdate,De.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[De.prototype._setValue_fromArray,De.prototype._setValue_fromArray_setNeedsUpdate,De.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ay=new Float32Array(1);var Sr=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ne(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Uh=class i{static{i.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};var Lo=class extends $n{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function eu(i,t,e,n){let s=Rm(n);switch(e){case qh:return i*t;case wr:return i*t/s.components*s.byteLength;case Al:return i*t/s.components*s.byteLength;case is:return i*t*2/s.components*s.byteLength;case Rl:return i*t*2/s.components*s.byteLength;case Yh:return i*t*3/s.components*s.byteLength;case bn:return i*t*4/s.components*s.byteLength;case Cl:return i*t*4/s.components*s.byteLength;case Vo:case Go:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Wo:case Xo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Il:case Dl:return Math.max(i,16)*Math.max(t,8)/4;case Pl:case Ll:return Math.max(i,8)*Math.max(t,8)/2;case Nl:case Ul:case Bl:case Ol:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Fl:case qo:case Hl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case zl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case kl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Vl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Gl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Wl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Xl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ql:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Yl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Zl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case $l:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Jl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Kl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case jl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ql:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case tc:case ec:case nc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ic:case sc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Yo:case rc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Rm(i){switch(i){case Sn:case Vh:return{byteLength:1,components:1};case Er:case Gh:case He:return{byteLength:2,components:1};case Tl:case wl:return{byteLength:2,components:4};case Qn:case El:case Vn:return{byteLength:4,components:1};case Wh:case Xh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?$t("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Mf(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Dm(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,f=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,c){let h=l.array,f=l.updateRanges;if(i.bindBuffer(c,a),f.length===0)i.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){let g=f[u],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){let _=f[d];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Nm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Um=`#ifdef USE_ALPHAHASH
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
#endif`,Fm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Om=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zm=`#ifdef USE_AOMAP
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
#endif`,km=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vm=`#ifdef USE_BATCHING
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
#endif`,Gm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ym=`#ifdef USE_IRIDESCENCE
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
#endif`,Zm=`#ifdef USE_BUMPMAP
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
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,t0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,e0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,n0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,i0=`#define PI 3.141592653589793
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
} // validated`,s0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,r0=`vec3 transformedNormal = objectNormal;
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
#endif`,o0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,a0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,l0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,c0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,h0="gl_FragColor = linearToOutputTexel( gl_FragColor );",u0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,d0=`#ifdef USE_ENVMAP
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
#endif`,f0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,p0=`#ifdef USE_ENVMAP
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
#endif`,m0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,g0=`#ifdef USE_ENVMAP
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
#endif`,_0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,x0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,v0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,y0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,M0=`#ifdef USE_GRADIENTMAP
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
}`,S0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,b0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,E0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,T0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,w0=`#ifdef USE_ENVMAP
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
#endif`,A0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,R0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,C0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,P0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,I0=`PhysicalMaterial material;
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
#endif`,L0=`uniform sampler2D dfgLUT;
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
}`,D0=`
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
#endif`,N0=`#if defined( RE_IndirectDiffuse )
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
#endif`,U0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,F0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,B0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,O0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,z0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,k0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,V0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,G0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,W0=`#if defined( USE_POINTS_UV )
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
#endif`,X0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,q0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Y0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Z0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J0=`#ifdef USE_MORPHTARGETS
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
#endif`,K0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Q0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ig=`#ifdef USE_NORMALMAP
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
#endif`,sg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ag=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ug=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vg=`float getShadowMask() {
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
}`,yg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mg=`#ifdef USE_SKINNING
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
#endif`,Sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bg=`#ifdef USE_SKINNING
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
#endif`,Eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ag=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rg=`#ifdef USE_TRANSMISSION
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
#endif`,Cg=`#ifdef USE_TRANSMISSION
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
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ug=`uniform sampler2D t2D;
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
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`#include <common>
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
}`,kg=`#if DEPTH_PACKING == 3200
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
}`,Vg=`#define DISTANCE
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
}`,Gg=`#define DISTANCE
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
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`uniform float scale;
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
}`,Yg=`uniform vec3 diffuse;
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
}`,Zg=`#include <common>
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
}`,$g=`uniform vec3 diffuse;
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
}`,Jg=`#define LAMBERT
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
}`,Kg=`#define LAMBERT
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
}`,jg=`#define MATCAP
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
}`,Qg=`#define MATCAP
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
}`,t_=`#define NORMAL
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
}`,e_=`#define NORMAL
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
}`,n_=`#define PHONG
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
}`,i_=`#define PHONG
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
}`,s_=`#define STANDARD
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
}`,r_=`#define STANDARD
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
}`,o_=`#define TOON
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
}`,a_=`#define TOON
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
}`,l_=`uniform float size;
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
}`,c_=`uniform vec3 diffuse;
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
}`,h_=`#include <common>
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
}`,u_=`uniform vec3 color;
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
}`,d_=`uniform float rotation;
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
}`,f_=`uniform vec3 diffuse;
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
}`,oe={alphahash_fragment:Nm,alphahash_pars_fragment:Um,alphamap_fragment:Fm,alphamap_pars_fragment:Bm,alphatest_fragment:Om,alphatest_pars_fragment:Hm,aomap_fragment:zm,aomap_pars_fragment:km,batching_pars_vertex:Vm,batching_vertex:Gm,begin_vertex:Wm,beginnormal_vertex:Xm,bsdfs:qm,iridescence_fragment:Ym,bumpmap_pars_fragment:Zm,clipping_planes_fragment:$m,clipping_planes_pars_fragment:Jm,clipping_planes_pars_vertex:Km,clipping_planes_vertex:jm,color_fragment:Qm,color_pars_fragment:t0,color_pars_vertex:e0,color_vertex:n0,common:i0,cube_uv_reflection_fragment:s0,defaultnormal_vertex:r0,displacementmap_pars_vertex:o0,displacementmap_vertex:a0,emissivemap_fragment:l0,emissivemap_pars_fragment:c0,colorspace_fragment:h0,colorspace_pars_fragment:u0,envmap_fragment:d0,envmap_common_pars_fragment:f0,envmap_pars_fragment:p0,envmap_pars_vertex:m0,envmap_physical_pars_fragment:w0,envmap_vertex:g0,fog_vertex:_0,fog_pars_vertex:x0,fog_fragment:v0,fog_pars_fragment:y0,gradientmap_pars_fragment:M0,lightmap_pars_fragment:S0,lights_lambert_fragment:b0,lights_lambert_pars_fragment:E0,lights_pars_begin:T0,lights_toon_fragment:A0,lights_toon_pars_fragment:R0,lights_phong_fragment:C0,lights_phong_pars_fragment:P0,lights_physical_fragment:I0,lights_physical_pars_fragment:L0,lights_fragment_begin:D0,lights_fragment_maps:N0,lights_fragment_end:U0,lightprobes_pars_fragment:F0,logdepthbuf_fragment:B0,logdepthbuf_pars_fragment:O0,logdepthbuf_pars_vertex:H0,logdepthbuf_vertex:z0,map_fragment:k0,map_pars_fragment:V0,map_particle_fragment:G0,map_particle_pars_fragment:W0,metalnessmap_fragment:X0,metalnessmap_pars_fragment:q0,morphinstance_vertex:Y0,morphcolor_vertex:Z0,morphnormal_vertex:$0,morphtarget_pars_vertex:J0,morphtarget_vertex:K0,normal_fragment_begin:j0,normal_fragment_maps:Q0,normal_pars_fragment:tg,normal_pars_vertex:eg,normal_vertex:ng,normalmap_pars_fragment:ig,clearcoat_normal_fragment_begin:sg,clearcoat_normal_fragment_maps:rg,clearcoat_pars_fragment:og,iridescence_pars_fragment:ag,opaque_fragment:lg,packing:cg,premultiplied_alpha_fragment:hg,project_vertex:ug,dithering_fragment:dg,dithering_pars_fragment:fg,roughnessmap_fragment:pg,roughnessmap_pars_fragment:mg,shadowmap_pars_fragment:gg,shadowmap_pars_vertex:_g,shadowmap_vertex:xg,shadowmask_pars_fragment:vg,skinbase_vertex:yg,skinning_pars_vertex:Mg,skinning_vertex:Sg,skinnormal_vertex:bg,specularmap_fragment:Eg,specularmap_pars_fragment:Tg,tonemapping_fragment:wg,tonemapping_pars_fragment:Ag,transmission_fragment:Rg,transmission_pars_fragment:Cg,uv_pars_fragment:Pg,uv_pars_vertex:Ig,uv_vertex:Lg,worldpos_vertex:Dg,background_vert:Ng,background_frag:Ug,backgroundCube_vert:Fg,backgroundCube_frag:Bg,cube_vert:Og,cube_frag:Hg,depth_vert:zg,depth_frag:kg,distance_vert:Vg,distance_frag:Gg,equirect_vert:Wg,equirect_frag:Xg,linedashed_vert:qg,linedashed_frag:Yg,meshbasic_vert:Zg,meshbasic_frag:$g,meshlambert_vert:Jg,meshlambert_frag:Kg,meshmatcap_vert:jg,meshmatcap_frag:Qg,meshnormal_vert:t_,meshnormal_frag:e_,meshphong_vert:n_,meshphong_frag:i_,meshphysical_vert:s_,meshphysical_frag:r_,meshtoon_vert:o_,meshtoon_frag:a_,points_vert:l_,points_frag:c_,shadow_vert:h_,shadow_frag:u_,sprite_vert:d_,sprite_frag:f_},It={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new A},probesMax:{value:new A},probesResolution:{value:new A}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},hi={basic:{uniforms:fn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:oe.meshbasic_vert,fragmentShader:oe.meshbasic_frag},lambert:{uniforms:fn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new _t(0)},envMapIntensity:{value:1}}]),vertexShader:oe.meshlambert_vert,fragmentShader:oe.meshlambert_frag},phong:{uniforms:fn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:oe.meshphong_vert,fragmentShader:oe.meshphong_frag},standard:{uniforms:fn([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag},toon:{uniforms:fn([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new _t(0)}}]),vertexShader:oe.meshtoon_vert,fragmentShader:oe.meshtoon_frag},matcap:{uniforms:fn([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:oe.meshmatcap_vert,fragmentShader:oe.meshmatcap_frag},points:{uniforms:fn([It.points,It.fog]),vertexShader:oe.points_vert,fragmentShader:oe.points_frag},dashed:{uniforms:fn([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:oe.linedashed_vert,fragmentShader:oe.linedashed_frag},depth:{uniforms:fn([It.common,It.displacementmap]),vertexShader:oe.depth_vert,fragmentShader:oe.depth_frag},normal:{uniforms:fn([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:oe.meshnormal_vert,fragmentShader:oe.meshnormal_frag},sprite:{uniforms:fn([It.sprite,It.fog]),vertexShader:oe.sprite_vert,fragmentShader:oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:oe.background_vert,fragmentShader:oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:oe.backgroundCube_vert,fragmentShader:oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:oe.cube_vert,fragmentShader:oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:oe.equirect_vert,fragmentShader:oe.equirect_frag},distance:{uniforms:fn([It.common,It.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:oe.distance_vert,fragmentShader:oe.distance_frag},shadow:{uniforms:fn([It.lights,It.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:oe.shadow_vert,fragmentShader:oe.shadow_frag}};hi.physical={uniforms:fn([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new W(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new W},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new W},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag};var lc={r:0,b:0,g:0},p_=new me,Sf=new Qt;Sf.set(-1,0,0,0,1,0,0,0,1);function m_(i,t,e,n,s,r){let o=new _t(0),a=s===!0?0:1,l,c,h=null,f=0,u=null;function d(M){let S=M.isScene===!0?M.background:null;if(S&&S.isTexture){let v=M.backgroundBlurriness>0;S=t.get(S,v)}return S}function g(M){let S=!1,v=d(M);v===null?m(o,a):v&&v.isColor&&(m(v,1),S=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,S){let v=d(S);v&&(v.isCubeTexture||v.mapping===zo)?(c===void 0&&(c=new pt(new Ne(1,1,1),new re({name:"BackgroundCubeMaterial",uniforms:Is(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(p_.makeRotationFromEuler(S.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Sf),c.material.toneMapped=ae.getTransfer(v.colorSpace)!==_e,(h!==v||f!==v.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new pt(new yn(2,2),new re({name:"BackgroundMaterial",uniforms:Is(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=ae.getTransfer(v.colorSpace)!==_e,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,f=v.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,S){M.getRGB(lc,jh(i)),e.buffers.color.setClear(lc.r,lc.g,lc.b,S,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,S=1){o.set(M),a=S,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(o,a)},render:g,addToRenderList:_,dispose:p}}function g_(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(N,H,V,L,O){let X=!1,q=f(N,L,V,H);r!==q&&(r=q,c(r.object)),X=d(N,L,V,O),X&&g(N,L,V,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,v(N,H,V,L),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return i.createVertexArray()}function c(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function f(N,H,V,L){let O=L.wireframe===!0,X=n[H.id];X===void 0&&(X={},n[H.id]=X);let q=N.isInstancedMesh===!0?N.id:0,nt=X[q];nt===void 0&&(nt={},X[q]=nt);let Z=nt[V.id];Z===void 0&&(Z={},nt[V.id]=Z);let $=Z[O];return $===void 0&&($=u(l()),Z[O]=$),$}function u(N){let H=[],V=[],L=[];for(let O=0;O<e;O++)H[O]=0,V[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:V,attributeDivisors:L,object:N,attributes:{},index:null}}function d(N,H,V,L){let O=r.attributes,X=H.attributes,q=0,nt=V.getAttributes();for(let Z in nt)if(nt[Z].location>=0){let et=O[Z],Ut=X[Z];if(Ut===void 0&&(Z==="instanceMatrix"&&N.instanceMatrix&&(Ut=N.instanceMatrix),Z==="instanceColor"&&N.instanceColor&&(Ut=N.instanceColor)),et===void 0||et.attribute!==Ut||Ut&&et.data!==Ut.data)return!0;q++}return r.attributesNum!==q||r.index!==L}function g(N,H,V,L){let O={},X=H.attributes,q=0,nt=V.getAttributes();for(let Z in nt)if(nt[Z].location>=0){let et=X[Z];et===void 0&&(Z==="instanceMatrix"&&N.instanceMatrix&&(et=N.instanceMatrix),Z==="instanceColor"&&N.instanceColor&&(et=N.instanceColor));let Ut={};Ut.attribute=et,et&&et.data&&(Ut.data=et.data),O[Z]=Ut,q++}r.attributes=O,r.attributesNum=q,r.index=L}function _(){let N=r.newAttributes;for(let H=0,V=N.length;H<V;H++)N[H]=0}function m(N){p(N,0)}function p(N,H){let V=r.newAttributes,L=r.enabledAttributes,O=r.attributeDivisors;V[N]=1,L[N]===0&&(i.enableVertexAttribArray(N),L[N]=1),O[N]!==H&&(i.vertexAttribDivisor(N,H),O[N]=H)}function M(){let N=r.newAttributes,H=r.enabledAttributes;for(let V=0,L=H.length;V<L;V++)H[V]!==N[V]&&(i.disableVertexAttribArray(V),H[V]=0)}function S(N,H,V,L,O,X,q){q===!0?i.vertexAttribIPointer(N,H,V,O,X):i.vertexAttribPointer(N,H,V,L,O,X)}function v(N,H,V,L){_();let O=L.attributes,X=V.getAttributes(),q=H.defaultAttributeValues;for(let nt in X){let Z=X[nt];if(Z.location>=0){let $=O[nt];if($===void 0&&(nt==="instanceMatrix"&&N.instanceMatrix&&($=N.instanceMatrix),nt==="instanceColor"&&N.instanceColor&&($=N.instanceColor)),$!==void 0){let et=$.normalized,Ut=$.itemSize,bt=t.get($);if(bt===void 0)continue;let ie=bt.buffer,rt=bt.type,yt=bt.bytesPerElement,k=rt===i.INT||rt===i.UNSIGNED_INT||$.gpuType===El;if($.isInterleavedBufferAttribute){let G=$.data,K=G.stride,mt=$.offset;if(G.isInstancedInterleavedBuffer){for(let ct=0;ct<Z.locationSize;ct++)p(Z.location+ct,G.meshPerAttribute);N.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let ct=0;ct<Z.locationSize;ct++)m(Z.location+ct);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let ct=0;ct<Z.locationSize;ct++)S(Z.location+ct,Ut/Z.locationSize,rt,et,K*yt,(mt+Ut/Z.locationSize*ct)*yt,k)}else{if($.isInstancedBufferAttribute){for(let G=0;G<Z.locationSize;G++)p(Z.location+G,$.meshPerAttribute);N.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let G=0;G<Z.locationSize;G++)m(Z.location+G);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let G=0;G<Z.locationSize;G++)S(Z.location+G,Ut/Z.locationSize,rt,et,Ut*yt,Ut/Z.locationSize*G*yt,k)}}else if(q!==void 0){let et=q[nt];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(Z.location,et);break;case 3:i.vertexAttrib3fv(Z.location,et);break;case 4:i.vertexAttrib4fv(Z.location,et);break;default:i.vertexAttrib1fv(Z.location,et)}}}}M()}function T(){w();for(let N in n){let H=n[N];for(let V in H){let L=H[V];for(let O in L){let X=L[O];for(let q in X)h(X[q].object),delete X[q];delete L[O]}}delete n[N]}}function E(N){if(n[N.id]===void 0)return;let H=n[N.id];for(let V in H){let L=H[V];for(let O in L){let X=L[O];for(let q in X)h(X[q].object),delete X[q];delete L[O]}}delete n[N.id]}function C(N){for(let H in n){let V=n[H];for(let L in V){let O=V[L];if(O[N.id]===void 0)continue;let X=O[N.id];for(let q in X)h(X[q].object),delete X[q];delete O[N.id]}}}function y(N){for(let H in n){let V=n[H],L=N.isInstancedMesh===!0?N.id:0,O=V[L];if(O!==void 0){for(let X in O){let q=O[X];for(let nt in q)h(q[nt].object),delete q[nt];delete O[X]}delete V[L],Object.keys(V).length===0&&delete n[H]}}}function w(){I(),o=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:I,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function __(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function x_(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==bn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let y=C===He&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Sn&&C!==Vn&&!y&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&($t("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&$t("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:v,maxSamples:T,samples:E}}function v_(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Pn,a=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||s;return s=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,S=M*4,v=p.clippingState||null;l.value=v,v=h(g,u,S,d);for(let T=0;T!==S;++T)v[T]=e[T];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,g){let _=f!==null?f.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=d+_*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=d;S!==_;++S,v+=4)o.copy(f[S]).applyMatrix4(M,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}var Rr=4,y_=6,M_=20,S_=256,$o=new Ji,Qd=new _t,nu=null,iu=0,su=0,ru=!1,b_=new A,Ls=new A,hc=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=b_}=r;nu=this._renderer.getRenderTarget(),iu=this._renderer.getActiveCubeFace(),su=this._renderer.getActiveMipmapLevel(),ru=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ef(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(nu,iu,su),this._renderer.xr.enabled=ru,t.scissorTest=!1,Ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===es||t.mapping===Ps?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),nu=this._renderer.getRenderTarget(),iu=this._renderer.getActiveCubeFace(),su=this._renderer.getActiveMipmapLevel(),ru=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xe,minFilter:Xe,generateMipmaps:!1,type:He,format:bn,colorSpace:io,depthBuffer:!1},s=tf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tf(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=E_(r)),this._blurMaterial=w_(r,t,e),this._ggxMaterial=T_(r,t,e)}return s}_compileMaterial(t){let e=new pt(new ce,t);this._renderer.compile(e,$o)}_sceneToCubeUV(t,e,n,s,r){let l=new en(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Qd),f.toneMapping=jn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pt(new Ne,new an({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,p=!1,M=t.background;M?M.isColor&&(m.color.copy(M),t.background=null,p=!0):(m.color.copy(Qd),p=!0);for(let S=0;S<6;S++){let v=S%3;v===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[S],r.y,r.z)):v===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[S]));let T=this._cubeSize;Ar(s,v*T,S>2?T:0,T,T),f.setRenderTarget(s),p&&f.render(_,l),f.render(t,l)}f.toneMapping=d,f.autoClear=u,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===es||t.mapping===Ps;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=nf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ef());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ar(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,$o)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=c*1.25,d=f*u,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Rr?n-g+Rr:0),p=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,Ar(r,m,p,3*_,2*_),s.setRenderTarget(r),s.render(a,$o),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Ar(t,m,p,3*_,2*_),s.setRenderTarget(t),s.render(a,$o)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],f=3*h*(s>this._lodMax-Rr?s-this._lodMax+Rr:0),u=4*(this._cubeSize-h);Ar(e,f,u,3*h,2*h),o.setRenderTarget(e),o.render(l,$o)}};function E_(i){let t=[],e=[],n=i,s=i-Rr+1+y_;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,u=6,d=3,g=new Float32Array(d*u*f),_=new Float32Array(d*u*f);for(let p=0;p<f;p++){let M=p%3*2/3-1,S=p>2?0:-1,v=[M,S,0,M+2/3,S,0,M+2/3,S+1,0,M,S,0,M+2/3,S+1,0,M,S+1,0];g.set(v,d*u*p);for(let T=0;T<u;T++){let E=h[T*2]*2-1,C=h[T*2+1]*2-1;p===0?Ls.set(1,C,E):p===1?Ls.set(-E,1,-C):p===2?Ls.set(-E,C,1):p===3?Ls.set(-1,C,-E):p===4?Ls.set(-E,-1,C):Ls.set(E,C,-1),Ls.toArray(_,(p*u+T)*d)}}let m=new ce;m.setAttribute("position",new he(g,d)),m.setAttribute("outputDirection",new he(_,d)),e.push(new pt(m,null)),n>Rr&&n--}return{lodMeshes:e,sizeLods:t}}function tf(i,t,e){let n=new ke(i,t,e);return n.texture.mapping=zo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ar(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function T_(i,t,e){return new re({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:S_,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:dc(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function w_(i,t,e){return new re({name:"SphericalGaussianBlur",defines:{SAMPLES:M_,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:dc(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function ef(){return new re({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dc(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function nf(){return new re({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function dc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Pr=class extends ke{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new _o(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ne(5,5,5),r=new re({name:"CubemapFromEquirect",uniforms:Is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:zn});r.uniforms.tEquirect.value=e;let o=new pt(s,r),a=e.minFilter;return e.minFilter===kn&&(e.minFilter=Xe),new Mr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function A_(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?o(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===Ml||d===Sl)if(t.has(u)){let g=t.get(u).texture;return a(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let _=new Pr(g.height);return _.fromEquirectangularTexture(i,u),t.set(u,_),u.addEventListener("dispose",c),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let d=u.mapping,g=d===Ml||d===Sl,_=d===es||d===Ps;if(g||_){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new hc(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let M=u.image;return g&&M&&M.height>0||_&&M&&l(M)?(n===null&&(n=new hc(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,d){return d===Ml?u.mapping=es:d===Sl&&(u.mapping=Ps),u}function l(u){let d=0,g=6;for(let _=0;_<g;_++)u[_]!==void 0&&d++;return d===g}function c(u){let d=u.target;d.removeEventListener("dispose",c);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function R_(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ys("WebGLRenderer: "+n+" extension not supported."),s}}}function C_(i,t,e,n){let s={},r=new WeakMap;function o(f){let u=f.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];let d=r.get(u);d&&(t.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(f,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(f){let u=f.attributes;for(let d in u)t.update(u[d],i.ARRAY_BUFFER)}function c(f){let u=[],d=f.index,g=f.attributes.position,_=0;if(g===void 0)return;if(d!==null){let M=d.array;_=d.version;for(let S=0,v=M.length;S<v;S+=3){let T=M[S+0],E=M[S+1],C=M[S+2];u.push(T,E,E,C,C,T)}}else{let M=g.array;_=g.version;for(let S=0,v=M.length/3-1;S<v;S+=3){let T=S+0,E=S+1,C=S+2;u.push(T,E,E,C,C,T)}}let m=new(g.count>=65535?po:fo)(u,1);m.version=_;let p=r.get(f);p&&t.remove(p),r.set(f,m)}function h(f){let u=r.get(f);if(u){let d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:h}}function P_(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,u){i.drawElements(n,u,r,f*o),e.update(u,n,1)}function c(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,f*o,d),e.update(u,n,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let _=0;for(let m=0;m<d;m++)_+=u[m];e.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function I_(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Kt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function L_(i,t,e){let n=new WeakMap,s=new Ce;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==f){let w=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],S=0;d===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let v=a.attributes.position.count*S,T=1;v>t.maxTextureSize&&(T=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let E=new Float32Array(v*T*4*f),C=new ao(E,v,T,f);C.type=Vn,C.needsUpdate=!0;let y=S*4;for(let I=0;I<f;I++){let N=m[I],H=p[I],V=M[I],L=v*T*4*I;for(let O=0;O<N.count;O++){let X=O*y;d===!0&&(s.fromBufferAttribute(N,O),E[L+X+0]=s.x,E[L+X+1]=s.y,E[L+X+2]=s.z,E[L+X+3]=0),g===!0&&(s.fromBufferAttribute(H,O),E[L+X+4]=s.x,E[L+X+5]=s.y,E[L+X+6]=s.z,E[L+X+7]=0),_===!0&&(s.fromBufferAttribute(V,O),E[L+X+8]=s.x,E[L+X+9]=s.y,E[L+X+10]=s.z,E[L+X+11]=V.itemSize===4?s.w:1)}}u={count:f,texture:C,size:new W(v,T)},n.set(a,u),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function D_(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var N_={[No]:"LINEAR_TONE_MAPPING",[Uo]:"REINHARD_TONE_MAPPING",[Fo]:"CINEON_TONE_MAPPING",[Cs]:"ACES_FILMIC_TONE_MAPPING",[Oo]:"AGX_TONE_MAPPING",[Ho]:"NEUTRAL_TONE_MAPPING",[Bo]:"CUSTOM_TONE_MAPPING"};function U_(i,t,e,n,s,r){let o=new ke(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new ce;c.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new jt([0,2,0,0,2,0],2));let h=new _r({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new pt(c,h),u=new Ji(-1,1,1,-1,0,1),d=null,g=null,_=!1,m,p=null,M=[],S=!1;this.setSize=function(v,T){o.setSize(v,T),a!==null&&a.setSize(v,T),l!==null&&l.setSize(v,T);for(let E=0;E<M.length;E++){let C=M[E];C.setSize&&C.setSize(v,T)}},this.setEffects=function(v){M=v,S=M.length>0&&M[0].isRenderPass===!0;let T=o.width,E=o.height;M.length>0&&a===null&&(a=new ke(T,E,{type:He,depthBuffer:!1,stencilBuffer:!1}),l=new ke(T,E,{type:He,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<M.length;C++){let y=M[C];y.setSize&&y.setSize(T,E)}},this.begin=function(v,T){if(_||v.toneMapping===jn&&M.length===0)return!1;if(p=T,T!==null){let E=T.width,C=T.height;(o.width!==E||o.height!==C)&&this.setSize(E,C)}return S===!1&&v.setRenderTarget(o),m=v.toneMapping,v.toneMapping=jn,!0},this.hasRenderPass=function(){return S},this.end=function(v,T){v.toneMapping=m,_=!0;let E=o,C=a;for(let y=0;y<M.length;y++){let w=M[y];w.enabled!==!1&&(w.render(v,C,E,T),w.needsSwap!==!1&&(E=C,C=C===a?l:a))}if(d!==v.outputColorSpace||g!==v.toneMapping){d=v.outputColorSpace,g=v.toneMapping,h.defines={},ae.getTransfer(d)===_e&&(h.defines.SRGB_TRANSFER="");let y=N_[g];y&&(h.defines[y]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,v.setRenderTarget(p),v.render(f,u),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var bf=new _n,lu=new qi(1,1),Ef=new ao,Tf=new Ka,wf=new _o,sf=[],rf=[],of=new Float32Array(16),af=new Float32Array(9),lf=new Float32Array(4);function Ir(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=sf[s];if(r===void 0&&(r=new Float32Array(s),sf[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Je(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ke(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function fc(i,t){let e=rf[t];e===void 0&&(e=new Int32Array(t),rf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function F_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function B_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;i.uniform2fv(this.addr,t),Ke(e,t)}}function O_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Je(e,t))return;i.uniform3fv(this.addr,t),Ke(e,t)}}function H_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;i.uniform4fv(this.addr,t),Ke(e,t)}}function z_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Je(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ke(e,t)}else{if(Je(e,n))return;lf.set(n),i.uniformMatrix2fv(this.addr,!1,lf),Ke(e,n)}}function k_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Je(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ke(e,t)}else{if(Je(e,n))return;af.set(n),i.uniformMatrix3fv(this.addr,!1,af),Ke(e,n)}}function V_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Je(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ke(e,t)}else{if(Je(e,n))return;of.set(n),i.uniformMatrix4fv(this.addr,!1,of),Ke(e,n)}}function G_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function W_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;i.uniform2iv(this.addr,t),Ke(e,t)}}function X_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Je(e,t))return;i.uniform3iv(this.addr,t),Ke(e,t)}}function q_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;i.uniform4iv(this.addr,t),Ke(e,t)}}function Y_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Z_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;i.uniform2uiv(this.addr,t),Ke(e,t)}}function $_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Je(e,t))return;i.uniform3uiv(this.addr,t),Ke(e,t)}}function J_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;i.uniform4uiv(this.addr,t),Ke(e,t)}}function K_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(lu.compareFunction=e.isReversedDepthBuffer()?ac:oc,r=lu):r=bf,e.setTexture2D(t||r,s)}function j_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Tf,s)}function Q_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||wf,s)}function tx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ef,s)}function ex(i){switch(i){case 5126:return F_;case 35664:return B_;case 35665:return O_;case 35666:return H_;case 35674:return z_;case 35675:return k_;case 35676:return V_;case 5124:case 35670:return G_;case 35667:case 35671:return W_;case 35668:case 35672:return X_;case 35669:case 35673:return q_;case 5125:return Y_;case 36294:return Z_;case 36295:return $_;case 36296:return J_;case 35678:case 36198:case 36298:case 36306:case 35682:return K_;case 35679:case 36299:case 36307:return j_;case 35680:case 36300:case 36308:case 36293:return Q_;case 36289:case 36303:case 36311:case 36292:return tx}}function nx(i,t){i.uniform1fv(this.addr,t)}function ix(i,t){let e=Ir(t,this.size,2);i.uniform2fv(this.addr,e)}function sx(i,t){let e=Ir(t,this.size,3);i.uniform3fv(this.addr,e)}function rx(i,t){let e=Ir(t,this.size,4);i.uniform4fv(this.addr,e)}function ox(i,t){let e=Ir(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function ax(i,t){let e=Ir(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function lx(i,t){let e=Ir(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function cx(i,t){i.uniform1iv(this.addr,t)}function hx(i,t){i.uniform2iv(this.addr,t)}function ux(i,t){i.uniform3iv(this.addr,t)}function dx(i,t){i.uniform4iv(this.addr,t)}function fx(i,t){i.uniform1uiv(this.addr,t)}function px(i,t){i.uniform2uiv(this.addr,t)}function mx(i,t){i.uniform3uiv(this.addr,t)}function gx(i,t){i.uniform4uiv(this.addr,t)}function _x(i,t,e){let n=this.cache,s=t.length,r=fc(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Ke(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=lu:o=bf;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function xx(i,t,e){let n=this.cache,s=t.length,r=fc(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Ke(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Tf,r[o])}function vx(i,t,e){let n=this.cache,s=t.length,r=fc(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Ke(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||wf,r[o])}function yx(i,t,e){let n=this.cache,s=t.length,r=fc(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Ke(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Ef,r[o])}function Mx(i){switch(i){case 5126:return nx;case 35664:return ix;case 35665:return sx;case 35666:return rx;case 35674:return ox;case 35675:return ax;case 35676:return lx;case 5124:case 35670:return cx;case 35667:case 35671:return hx;case 35668:case 35672:return ux;case 35669:case 35673:return dx;case 5125:return fx;case 36294:return px;case 36295:return mx;case 36296:return gx;case 35678:case 36198:case 36298:case 36306:case 35682:return _x;case 35679:case 36299:case 36307:return xx;case 35680:case 36300:case 36308:case 36293:return vx;case 36289:case 36303:case 36311:case 36292:return yx}}var cu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ex(e.type)}},hu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Mx(e.type)}},uu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},ou=/(\w+)(\])?(\[|\.)?/g;function cf(i,t){i.seq.push(t),i.map[t.id]=t}function Sx(i,t,e){let n=i.name,s=n.length;for(ou.lastIndex=0;;){let r=ou.exec(n),o=ou.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){cf(e,c===void 0?new cu(a,i,t):new hu(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new uu(a),cf(e,f)),e=f}}}var Cr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);Sx(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function hf(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var bx=37297,Ex=0;function Tx(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var uf=new Qt;function wx(i){ae._getMatrix(uf,ae.workingColorSpace,i);let t=`mat3( ${uf.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(i)){case so:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return $t("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function df(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Tx(i.getShaderSource(t),a)}else return r}function Ax(i,t){let e=wx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Rx={[No]:"Linear",[Uo]:"Reinhard",[Fo]:"Cineon",[Cs]:"ACESFilmic",[Oo]:"AgX",[Ho]:"Neutral",[Bo]:"Custom"};function Cx(i,t){let e=Rx[t];return e===void 0?($t("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var cc=new A;function Px(){ae.getLuminanceCoefficients(cc);let i=cc.x.toFixed(4),t=cc.y.toFixed(4),e=cc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ix(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ko).join(`
`)}function Lx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Dx(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ko(i){return i!==""}function ff(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function pf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Nx=/^[ \t]*#include +<([\w\d./]+)>/gm;function du(i){return i.replace(Nx,Fx)}var Ux=new Map;function Fx(i,t){let e=oe[t];if(e===void 0){let n=Ux.get(t);if(n!==void 0)e=oe[n],$t('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return du(e)}var Bx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mf(i){return i.replace(Bx,Ox)}function Ox(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function gf(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Hx={[Do]:"SHADOWMAP_TYPE_PCF",[br]:"SHADOWMAP_TYPE_VSM"};function zx(i){return Hx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var kx={[es]:"ENVMAP_TYPE_CUBE",[Ps]:"ENVMAP_TYPE_CUBE",[zo]:"ENVMAP_TYPE_CUBE_UV"};function Vx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":kx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Gx={[Ps]:"ENVMAP_MODE_REFRACTION"};function Wx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Gx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Xx={[yl]:"ENVMAP_BLENDING_MULTIPLY",[Cd]:"ENVMAP_BLENDING_MIX",[Pd]:"ENVMAP_BLENDING_ADD"};function qx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Xx[i.combine]||"ENVMAP_BLENDING_NONE"}function Yx(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Zx(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=zx(e),c=Vx(e),h=Wx(e),f=qx(e),u=Yx(e),d=Ix(e),g=Lx(r),_=s.createProgram(),m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ko).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ko).join(`
`),p.length>0&&(p+=`
`)):(m=[gf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ko).join(`
`),p=[gf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==jn?"#define TONE_MAPPING":"",e.toneMapping!==jn?oe.tonemapping_pars_fragment:"",e.toneMapping!==jn?Cx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",oe.colorspace_pars_fragment,Ax("linearToOutputTexel",e.outputColorSpace),Px(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ko).join(`
`)),o=du(o),o=ff(o,e),o=pf(o,e),a=du(a),a=ff(a,e),a=pf(a,e),o=mf(o),a=mf(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===$h?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$h?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=M+m+o,v=M+p+a,T=hf(s,s.VERTEX_SHADER,S),E=hf(s,s.FRAGMENT_SHADER,v);s.attachShader(_,T),s.attachShader(_,E),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(N){if(i.debug.checkShaderErrors){let H=s.getProgramInfoLog(_)||"",V=s.getShaderInfoLog(T)||"",L=s.getShaderInfoLog(E)||"",O=H.trim(),X=V.trim(),q=L.trim(),nt=!0,Z=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(nt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,E);else{let $=df(s,T,"vertex"),et=df(s,E,"fragment");Kt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+O+`
`+$+`
`+et)}else O!==""?$t("WebGLProgram: Program Info Log:",O):(X===""||q==="")&&(Z=!1);Z&&(N.diagnostics={runnable:nt,programLog:O,vertexShader:{log:X,prefix:m},fragmentShader:{log:q,prefix:p}})}s.deleteShader(T),s.deleteShader(E),y=new Cr(s,_),w=Dx(s,_)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(_,bx)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ex++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=E,this}var $x=0,fu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new pu(t),e.set(t,n)),n}},pu=class{constructor(t){this.id=$x++,this.code=t,this.usedTimes=0}};function Jx(i){return i===is||i===qo||i===Yo}function Kx(i,t,e,n,s,r){let o=new lo,a=new fu,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,u=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function _(y,w,I,N,H,V){let L=N.fog,O=H.geometry,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?N.environment:null,q=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,nt=t.get(y.envMap||X,q),Z=nt&&nt.mapping===zo?nt.image.height:null,$=d[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&$t("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let et=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ut=et!==void 0?et.length:0,bt=0;O.morphAttributes.position!==void 0&&(bt=1),O.morphAttributes.normal!==void 0&&(bt=2),O.morphAttributes.color!==void 0&&(bt=3);let ie,rt,yt,k;if($){let Me=hi[$];ie=Me.vertexShader,rt=Me.fragmentShader}else{ie=y.vertexShader,rt=y.fragmentShader;let Me=a.getVertexShaderStage(y),ue=a.getFragmentShaderStage(y);a.update(y,Me,ue),yt=Me.id,k=ue.id}let G=i.getRenderTarget(),K=i.state.buffers.depth.getReversed(),mt=H.isInstancedMesh===!0,ct=H.isBatchedMesh===!0,gt=!!y.map,qt=!!y.matcap,Q=!!nt,at=!!y.aoMap,ht=!!y.lightMap,ut=!!y.bumpMap&&y.wireframe===!1,Mt=!!y.normalMap,Gt=!!y.displacementMap,Ht=!!y.emissiveMap,Wt=!!y.metalnessMap,Xt=!!y.roughnessMap,U=y.anisotropy>0,fe=y.clearcoat>0,se=y.dispersion>0,R=y.retroreflectivity>0,x=y.iridescence>0,z=y.sheen>0,Y=y.transmission>0,j=U&&!!y.anisotropyMap,dt=fe&&!!y.clearcoatMap,xt=fe&&!!y.clearcoatNormalMap,tt=fe&&!!y.clearcoatRoughnessMap,ot=x&&!!y.iridescenceMap,wt=x&&!!y.iridescenceThicknessMap,Vt=z&&!!y.sheenColorMap,Ct=z&&!!y.sheenRoughnessMap,Et=!!y.specularMap,kt=!!y.specularColorMap,Yt=!!y.specularIntensityMap,ee=Y&&!!y.transmissionMap,F=Y&&!!y.thicknessMap,At=!!y.gradientMap,it=!!y.alphaMap,Rt=y.alphaTest>0,Dt=!!y.alphaHash,lt=!!y.extensions,Ot=jn;y.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(Ot=i.toneMapping);let zt={shaderID:$,shaderType:y.type,shaderName:y.name,vertexShader:ie,fragmentShader:rt,defines:y.defines,customVertexShaderID:yt,customFragmentShaderID:k,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:ct,batchingColor:ct&&H._colorsTexture!==null,instancing:mt,instancingColor:mt&&H.instanceColor!==null,instancingMorph:mt&&H.morphTexture!==null,outputColorSpace:G===null?i.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:ae.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:gt,matcap:qt,envMap:Q,envMapMode:Q&&nt.mapping,envMapCubeUVHeight:Z,aoMap:at,lightMap:ht,bumpMap:ut,normalMap:Mt,displacementMap:Gt,emissiveMap:Ht,normalMapObjectSpace:Mt&&y.normalMapType===Dd,normalMapTangentSpace:Mt&&y.normalMapType===Zo,packedNormalMap:Mt&&y.normalMapType===Zo&&Jx(y.normalMap.format),metalnessMap:Wt,roughnessMap:Xt,anisotropy:U,anisotropyMap:j,clearcoat:fe,clearcoatMap:dt,clearcoatNormalMap:xt,clearcoatRoughnessMap:tt,dispersion:se,retroreflection:R,iridescence:x,iridescenceMap:ot,iridescenceThicknessMap:wt,sheen:z,sheenColorMap:Vt,sheenRoughnessMap:Ct,specularMap:Et,specularColorMap:kt,specularIntensityMap:Yt,transmission:Y,transmissionMap:ee,thicknessMap:F,gradientMap:At,opaque:y.transparent===!1&&y.blending===ts&&y.alphaToCoverage===!1,alphaMap:it,alphaTest:Rt,alphaHash:Dt,combine:y.combine,mapUv:gt&&g(y.map.channel),aoMapUv:at&&g(y.aoMap.channel),lightMapUv:ht&&g(y.lightMap.channel),bumpMapUv:ut&&g(y.bumpMap.channel),normalMapUv:Mt&&g(y.normalMap.channel),displacementMapUv:Gt&&g(y.displacementMap.channel),emissiveMapUv:Ht&&g(y.emissiveMap.channel),metalnessMapUv:Wt&&g(y.metalnessMap.channel),roughnessMapUv:Xt&&g(y.roughnessMap.channel),anisotropyMapUv:j&&g(y.anisotropyMap.channel),clearcoatMapUv:dt&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:xt&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ot&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:wt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Vt&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&g(y.sheenRoughnessMap.channel),specularMapUv:Et&&g(y.specularMap.channel),specularColorMapUv:kt&&g(y.specularColorMap.channel),specularIntensityMapUv:Yt&&g(y.specularIntensityMap.channel),transmissionMapUv:ee&&g(y.transmissionMap.channel),thicknessMapUv:F&&g(y.thicknessMap.channel),alphaMapUv:it&&g(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Mt||U),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!O.attributes.uv&&(gt||it),fog:!!L,useFog:y.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&Mt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:K,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Ut,morphTextureStride:bt,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ot,decodeVideoTexture:gt&&y.map.isVideoTexture===!0&&ae.getTransfer(y.map.colorSpace)===_e,decodeVideoTextureEmissive:Ht&&y.emissiveMap.isVideoTexture===!0&&ae.getTransfer(y.emissiveMap.colorSpace)===_e,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Pe,flipSided:y.side===ln,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:lt&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(lt&&y.extensions.multiDraw===!0||ct)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return zt.vertexUv1s=l.has(1),zt.vertexUv2s=l.has(2),zt.vertexUv3s=l.has(3),l.clear(),zt}function m(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let I in y.defines)w.push(I),w.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(p(w,y),M(w,y),w.push(i.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function p(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numSunLights),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numSunLightShadows),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function M(y,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.retroreflection&&o.enable(24),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function S(y){let w=d[y.type],I;if(w){let N=hi[w];I=Ci.clone(N.uniforms)}else I=y.uniforms;return I}function v(y,w){let I=h.get(w);return I!==void 0?++I.usedTimes:(I=new Zx(i,w,y,s),c.push(I),h.set(w,I)),I}function T(y){if(--y.usedTimes===0){let w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function E(y){a.remove(y)}function C(){a.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:S,acquireProgram:v,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:C}}function jx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Qx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function _f(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function xf(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function a(u,d,g,_,m,p){let M=i[t];return M===void 0?(M={id:u.id,object:u,geometry:d,material:g,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:p},i[t]=M):(M.id=u.id,M.object=u,M.geometry=d,M.material=g,M.materialVariant=o(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=m,M.group=p),t++,M}function l(u,d,g,_,m,p,M){M.reversedDepth===!0&&(m=-m);let S=a(u,d,g,_,m,p);g.transmission>0?n.push(S):g.transparent===!0?s.push(S):e.push(S)}function c(u,d,g,_,m,p){let M=a(u,d,g,_,m,p);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):e.unshift(M)}function h(u,d){e.length>1&&e.sort(u||Qx),n.length>1&&n.sort(d||_f),s.length>1&&s.sort(d||_f)}function f(){for(let u=t,d=i.length;u<d;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:h}}function tv(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new xf,i.set(n,[o])):s>=r.length?(o=new xf,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function ev(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new A,color:new _t};break;case"SpotLight":e={position:new A,direction:new A,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new _t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":e={color:new _t,position:new A,halfWidth:new A,halfHeight:new A};break}return i[t.id]=e,e}}}function nv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var iv=0;function sv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function rv(i){let t=new ev,e=nv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);let s=new A,r=new me,o=new me;function a(c){let h=0,f=0,u=0;for(let H=0;H<9;H++)n.probe[H].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,S=0,v=0,T=0,E=0,C=0,y=0,w=0,I=0;c.sort(sv);for(let H=0,V=c.length;H<V;H++){let L=c[H],O=L.color,X=L.intensity,q=L.distance,nt=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===is?nt=L.shadow.map.texture:nt=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=O.r*X,f+=O.g*X,u+=O.b*X;else if(L.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(L.sh.coefficients[Z],X);I++}else if(L.isSunLight){let Z=t.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,et=e.get(L);et.shadowIntensity=$.intensity,et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[g]=et,n.sunShadowMap[g]=nt;let Ut=$.getViewportCount();for(let bt=0;bt<Ut;bt++)n.sunShadowMatrix[_+bt]=$.getMatrix(bt),n.sunShadowCascade[_+bt]=$._cascadeData[bt];_+=Ut,g++}n.sun[d]=Z,d++}else if(L.isDirectionalLight){let Z=t.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,et=e.get(L);et.shadowIntensity=$.intensity,et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize=$.mapSize,n.directionalShadow[m]=et,n.directionalShadowMap[m]=nt,n.directionalShadowMatrix[m]=L.shadow.matrix,T++}n.directional[m]=Z,m++}else if(L.isSpotLight){let Z=t.get(L);Z.position.setFromMatrixPosition(L.matrixWorld),Z.color.copy(O).multiplyScalar(X),Z.distance=q,Z.coneCos=Math.cos(L.angle),Z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Z.decay=L.decay,n.spot[M]=Z;let $=L.shadow;if(L.map&&(n.spotLightMap[y]=L.map,y++,$.updateMatrices(L),L.castShadow&&w++),n.spotLightMatrix[M]=$.matrix,L.castShadow){let et=e.get(L);et.shadowIntensity=$.intensity,et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize=$.mapSize,n.spotShadow[M]=et,n.spotShadowMap[M]=nt,C++}M++}else if(L.isRectAreaLight){let Z=t.get(L);Z.color.copy(O).multiplyScalar(X),Z.halfWidth.set(L.width*.5,0,0),Z.halfHeight.set(0,L.height*.5,0),n.rectArea[S]=Z,S++}else if(L.isPointLight){let Z=t.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),Z.distance=L.distance,Z.decay=L.decay,L.castShadow){let $=L.shadow,et=e.get(L);et.shadowIntensity=$.intensity,et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize=$.mapSize,et.shadowCameraNear=$.camera.near,et.shadowCameraFar=$.camera.far,n.pointShadow[p]=et,n.pointShadowMap[p]=nt,n.pointShadowMatrix[p]=L.shadow.matrix,E++}n.point[p]=Z,p++}else if(L.isHemisphereLight){let Z=t.get(L);Z.skyColor.copy(L.color).multiplyScalar(X),Z.groundColor.copy(L.groundColor).multiplyScalar(X),n.hemi[v]=Z,v++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=It.LTC_FLOAT_1,n.rectAreaLTC2=It.LTC_FLOAT_2):(n.rectAreaLTC1=It.LTC_HALF_1,n.rectAreaLTC2=It.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let N=n.hash;(N.sunLength!==d||N.directionalLength!==m||N.pointLength!==p||N.spotLength!==M||N.rectAreaLength!==S||N.hemiLength!==v||N.numSunShadows!==g||N.numDirectionalShadows!==T||N.numPointShadows!==E||N.numSpotShadows!==C||N.numSpotMaps!==y||N.numLightProbes!==I)&&(n.sun.length=d,n.directional.length=m,n.spot.length=M,n.rectArea.length=S,n.point.length=p,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+y-w,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=I,N.sunLength=d,N.directionalLength=m,N.pointLength=p,N.spotLength=M,N.rectAreaLength=S,N.hemiLength=v,N.numSunShadows=g,N.numDirectionalShadows=T,N.numPointShadows=E,N.numSpotShadows=C,N.numSpotMaps=y,N.numLightProbes=I,n.version=iv++)}function l(c,h){let f=0,u=0,d=0,g=0,_=0,m=0,p=h.matrixWorldInverse;for(let M=0,S=c.length;M<S;M++){let v=c[M];if(v.isSunLight){let T=n.sun[f];T.direction.setFromMatrixPosition(v.matrixWorld),T.direction.transformDirection(p),f++}else if(v.isDirectionalLight){let T=n.directional[u];T.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),u++}else if(v.isSpotLight){let T=n.spot[g];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),g++}else if(v.isRectAreaLight){let T=n.rectArea[_];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(p),o.identity(),r.copy(v.matrixWorld),r.premultiply(p),o.extractRotation(r),T.halfWidth.set(v.width*.5,0,0),T.halfHeight.set(0,v.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let T=n.point[d];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(p),d++}else if(v.isHemisphereLight){let T=n.hemi[m];T.direction.setFromMatrixPosition(v.matrixWorld),T.direction.transformDirection(p),m++}}}return{setup:a,setupView:l,state:n}}function vf(i){let t=new rv(i),e=[],n=[],s=[];function r(u){f.camera=u,e.length=0,n.length=0,s.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function ov(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new vf(i),t.set(s,[a])):r>=o.length?(a=new vf(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var av=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lv=`uniform sampler2D shadow_pass;
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
}`,cv=[new A(1,0,0),new A(-1,0,0),new A(0,1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1)],hv=[new A(0,-1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1),new A(0,-1,0),new A(0,-1,0)],yf=new me,Jo=new A,au=new A;function uv(i,t,e){let n=new fr,s=new W,r=new W,o=new Ce,a=new al,l=new ll,c={},h=e.maxTextureSize,f={[Qi]:ln,[ln]:Qi,[Pe]:Pe},u=new re({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:av,fragmentShader:lv}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let g=new ce;g.setAttribute("position",new he(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new pt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Do;let p=this.type;this.render=function(E,C,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===hd&&($t("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Do);let w=i.getRenderTarget(),I=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),H=i.state;H.setBlending(zn),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let V=p!==this.type;V&&C.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(O=>O.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,O=E.length;L<O;L++){let X=E[L],q=X.shadow;if(q===void 0){$t("WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let nt=q.getFrameExtents();s.multiply(nt),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/nt.x),s.x=r.x*nt.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/nt.y),s.y=r.y*nt.y,q.mapSize.y=r.y));let Z=i.state.buffers.depth.getReversed();if(q.camera._reversedDepth=Z,q.map===null||V===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===br){if(X.isPointLight){$t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new ke(s.x,s.y,{format:is,type:He,minFilter:Xe,magFilter:Xe,generateMipmaps:!1}),q.map.texture.name=X.name+".shadowMap",q.map.depthTexture=new qi(s.x,s.y,Vn),q.map.depthTexture.name=X.name+".shadowMapDepth",q.map.depthTexture.format=oi,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=nn,q.map.depthTexture.magFilter=nn}else X.isPointLight?(q.map=new Pr(s.x),q.map.depthTexture=new Qa(s.x,Qn)):(q.map=new ke(s.x,s.y),q.map.depthTexture=new qi(s.x,s.y,Qn)),q.map.depthTexture.name=X.name+".shadowMap",q.map.depthTexture.format=oi,this.type===Do?(q.map.depthTexture.compareFunction=Z?ac:oc,q.map.depthTexture.minFilter=Xe,q.map.depthTexture.magFilter=Xe):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=nn,q.map.depthTexture.magFilter=nn);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);let $=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();X.isPointLight!==!0&&q.updateMatrices(X,y);for(let et=0;et<$;et++){let Ut=q.getCamera(et);if(X.isPointLight){let bt=q.camera,ie=q.matrix,rt=X.distance||bt.far;rt!==bt.far&&(bt.far=rt,bt.updateProjectionMatrix()),Jo.setFromMatrixPosition(X.matrixWorld),bt.position.copy(Jo),au.copy(bt.position),au.add(cv[et]),bt.up.copy(hv[et]),bt.lookAt(au),bt.updateMatrixWorld(),ie.makeTranslation(-Jo.x,-Jo.y,-Jo.z),yf.multiplyMatrices(bt.projectionMatrix,bt.matrixWorldInverse),q._frustum.setFromProjectionMatrix(yf,bt.coordinateSystem,bt.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)i.setRenderTarget(q.map,et),i.clear();else{et===0&&(i.setRenderTarget(q.map),i.clear());let bt=q.getViewport(et);o.set(r.x*bt.x,r.y*bt.y,r.x*bt.z,r.y*bt.w),H.viewport(o)}n=q.getFrustum(et),v(C,y,Ut,X,this.type)}q.isPointLightShadow!==!0&&this.type===br&&M(q,y),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,I,N)};function M(E,C){let y=t.update(_);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null?E.mapPass=new ke(s.x,s.y,{format:is,type:He}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,y,u,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,y,d,_,null)}function S(E,C,y,w){let I=null,N=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)I=N;else if(I=y.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let H=I.uuid,V=C.uuid,L=c[H];L===void 0&&(L={},c[H]=L);let O=L[V];O===void 0&&(O=I.clone(),L[V]=O,C.addEventListener("dispose",T)),I=O}if(I.visible=C.visible,I.wireframe=C.wireframe,w===br?I.side=C.shadowSide!==null?C.shadowSide:C.side:I.side=C.shadowSide!==null?C.shadowSide:f[C.side],I.alphaMap=C.alphaMap,I.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,I.map=C.map,I.clipShadows=C.clipShadows,I.clippingPlanes=C.clippingPlanes,I.clipIntersection=C.clipIntersection,I.displacementMap=C.displacementMap,I.displacementScale=C.displacementScale,I.displacementBias=C.displacementBias,I.wireframeLinewidth=C.wireframeLinewidth,I.linewidth=C.linewidth,y.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let H=i.properties.get(I);H.light=y}return I}function v(E,C,y,w,I){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&I===br)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);let V=t.update(E),L=E.material;if(Array.isArray(L)){let O=V.groups;for(let X=0,q=O.length;X<q;X++){let nt=O[X],Z=L[nt.materialIndex];if(Z&&Z.visible){let $=S(E,Z,w,I);E.onBeforeShadow(i,E,C,y,V,$,nt),i.renderBufferDirect(y,null,V,$,E,nt),E.onAfterShadow(i,E,C,y,V,$,nt)}}}else if(L.visible){let O=S(E,L,w,I);E.onBeforeShadow(i,E,C,y,V,O,null),i.renderBufferDirect(y,null,V,O,E,null),E.onAfterShadow(i,E,C,y,V,O,null)}}let H=E.children;for(let V=0,L=H.length;V<L;V++)v(H[V],C,y,w,I)}function T(E){E.target.removeEventListener("dispose",T);for(let y in c){let w=c[y],I=E.target.uuid;I in w&&(w[I].dispose(),delete w[I])}}}function dv(i,t){function e(){let F=!1,At=new Ce,it=null,Rt=new Ce(0,0,0,0);return{setMask:function(Dt){it!==Dt&&!F&&(i.colorMask(Dt,Dt,Dt,Dt),it=Dt)},setLocked:function(Dt){F=Dt},setClear:function(Dt,lt,Ot,zt,Me){Me===!0&&(Dt*=zt,lt*=zt,Ot*=zt),At.set(Dt,lt,Ot,zt),Rt.equals(At)===!1&&(i.clearColor(Dt,lt,Ot,zt),Rt.copy(At))},reset:function(){F=!1,it=null,Rt.set(-1,0,0,0)}}}function n(){let F=!1,At=!1,it=null,Rt=null,Dt=null;return{setReversed:function(lt){if(At!==lt){let Ot=t.get("EXT_clip_control");lt?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT),At=lt;let zt=Dt;Dt=null,this.setClear(zt)}},getReversed:function(){return At},setTest:function(lt){lt?G(i.DEPTH_TEST):K(i.DEPTH_TEST)},setMask:function(lt){it!==lt&&!F&&(i.depthMask(lt),it=lt)},setFunc:function(lt){if(At&&(lt=Wd[lt]),Rt!==lt){switch(lt){case za:i.depthFunc(i.NEVER);break;case ka:i.depthFunc(i.ALWAYS);break;case Va:i.depthFunc(i.LESS);break;case ar:i.depthFunc(i.LEQUAL);break;case Ga:i.depthFunc(i.EQUAL);break;case Wa:i.depthFunc(i.GEQUAL);break;case Xa:i.depthFunc(i.GREATER);break;case qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Rt=lt}},setLocked:function(lt){F=lt},setClear:function(lt){Dt!==lt&&(Dt=lt,At&&(lt=1-lt),i.clearDepth(lt))},reset:function(){F=!1,it=null,Rt=null,Dt=null,At=!1}}}function s(){let F=!1,At=null,it=null,Rt=null,Dt=null,lt=null,Ot=null,zt=null,Me=null;return{setTest:function(ue){F||(ue?G(i.STENCIL_TEST):K(i.STENCIL_TEST))},setMask:function(ue){At!==ue&&!F&&(i.stencilMask(ue),At=ue)},setFunc:function(ue,xn,Nn){(it!==ue||Rt!==xn||Dt!==Nn)&&(i.stencilFunc(ue,xn,Nn),it=ue,Rt=xn,Dt=Nn)},setOp:function(ue,xn,Nn){(lt!==ue||Ot!==xn||zt!==Nn)&&(i.stencilOp(ue,xn,Nn),lt=ue,Ot=xn,zt=Nn)},setLocked:function(ue){F=ue},setClear:function(ue){Me!==ue&&(i.clearStencil(ue),Me=ue)},reset:function(){F=!1,At=null,it=null,Rt=null,Dt=null,lt=null,Ot=null,zt=null,Me=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},f={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,S=null,v=null,T=null,E=null,C=null,y=new _t(0,0,0),w=0,I=!1,N=null,H=null,V=null,L=null,O=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,nt=0,Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(Z)[1]),q=nt>=1):Z.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),q=nt>=2);let $=null,et={},Ut=i.getParameter(i.SCISSOR_BOX),bt=i.getParameter(i.VIEWPORT),ie=new Ce().fromArray(Ut),rt=new Ce().fromArray(bt);function yt(F,At,it,Rt){let Dt=new Uint8Array(4),lt=i.createTexture();i.bindTexture(F,lt),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ot=0;Ot<it;Ot++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(At,0,i.RGBA,1,1,Rt,0,i.RGBA,i.UNSIGNED_BYTE,Dt):i.texImage2D(At+Ot,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Dt);return lt}let k={};k[i.TEXTURE_2D]=yt(i.TEXTURE_2D,i.TEXTURE_2D,1),k[i.TEXTURE_CUBE_MAP]=yt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[i.TEXTURE_2D_ARRAY]=yt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),k[i.TEXTURE_3D]=yt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),G(i.DEPTH_TEST),o.setFunc(ar),ut(!1),Mt(Fh),G(i.CULL_FACE),at(zn);function G(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function K(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function mt(F,At){return u[F]!==At?(i.bindFramebuffer(F,At),u[F]=At,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=At),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=At),!0):!1}function ct(F,At){let it=g,Rt=!1;if(F){it=d.get(At),it===void 0&&(it=[],d.set(At,it));let Dt=F.textures;if(it.length!==Dt.length||it[0]!==i.COLOR_ATTACHMENT0){for(let lt=0,Ot=Dt.length;lt<Ot;lt++)it[lt]=i.COLOR_ATTACHMENT0+lt;it.length=Dt.length,Rt=!0}}else it[0]!==i.BACK&&(it[0]=i.BACK,Rt=!0);Rt&&i.drawBuffers(it)}function gt(F){return _!==F?(i.useProgram(F),_=F,!0):!1}let qt={[Rs]:i.FUNC_ADD,[dd]:i.FUNC_SUBTRACT,[fd]:i.FUNC_REVERSE_SUBTRACT};qt[pd]=i.MIN,qt[md]=i.MAX;let Q={[gd]:i.ZERO,[_d]:i.ONE,[xd]:i.SRC_COLOR,[Hh]:i.SRC_ALPHA,[Ed]:i.SRC_ALPHA_SATURATE,[Sd]:i.DST_COLOR,[yd]:i.DST_ALPHA,[vd]:i.ONE_MINUS_SRC_COLOR,[zh]:i.ONE_MINUS_SRC_ALPHA,[bd]:i.ONE_MINUS_DST_COLOR,[Md]:i.ONE_MINUS_DST_ALPHA,[Td]:i.CONSTANT_COLOR,[wd]:i.ONE_MINUS_CONSTANT_COLOR,[Ad]:i.CONSTANT_ALPHA,[Rd]:i.ONE_MINUS_CONSTANT_ALPHA};function at(F,At,it,Rt,Dt,lt,Ot,zt,Me,ue){if(F===zn){m===!0&&(K(i.BLEND),m=!1);return}if(m===!1&&(G(i.BLEND),m=!0),F!==ud){if(F!==p||ue!==I){if((M!==Rs||T!==Rs)&&(i.blendEquation(i.FUNC_ADD),M=Rs,T=Rs),ue)switch(F){case ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cn:i.blendFunc(i.ONE,i.ONE);break;case Bh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Oh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Kt("WebGLState: Invalid blending: ",F);break}else switch(F){case ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bh:Kt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Oh:Kt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Kt("WebGLState: Invalid blending: ",F);break}S=null,v=null,E=null,C=null,y.set(0,0,0),w=0,p=F,I=ue}return}Dt=Dt||At,lt=lt||it,Ot=Ot||Rt,(At!==M||Dt!==T)&&(i.blendEquationSeparate(qt[At],qt[Dt]),M=At,T=Dt),(it!==S||Rt!==v||lt!==E||Ot!==C)&&(i.blendFuncSeparate(Q[it],Q[Rt],Q[lt],Q[Ot]),S=it,v=Rt,E=lt,C=Ot),(zt.equals(y)===!1||Me!==w)&&(i.blendColor(zt.r,zt.g,zt.b,Me),y.copy(zt),w=Me),p=F,I=!1}function ht(F,At){F.side===Pe?K(i.CULL_FACE):G(i.CULL_FACE);let it=F.side===ln;At&&(it=!it),ut(it),F.blending===ts&&F.transparent===!1?at(zn):at(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let Rt=F.stencilWrite;a.setTest(Rt),Rt&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ht(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?G(i.SAMPLE_ALPHA_TO_COVERAGE):K(i.SAMPLE_ALPHA_TO_COVERAGE)}function ut(F){N!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),N=F)}function Mt(F){F!==ld?(G(i.CULL_FACE),F!==H&&(F===Fh?i.cullFace(i.BACK):F===cd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):K(i.CULL_FACE),H=F}function Gt(F){F!==V&&(q&&i.lineWidth(F),V=F)}function Ht(F,At,it){F?(G(i.POLYGON_OFFSET_FILL),(L!==At||O!==it)&&(L=At,O=it,o.getReversed()&&(At=-At),i.polygonOffset(At,it))):K(i.POLYGON_OFFSET_FILL)}function Wt(F){F?G(i.SCISSOR_TEST):K(i.SCISSOR_TEST)}function Xt(F){F===void 0&&(F=i.TEXTURE0+X-1),$!==F&&(i.activeTexture(F),$=F)}function U(F,At,it){it===void 0&&($===null?it=i.TEXTURE0+X-1:it=$);let Rt=et[it];Rt===void 0&&(Rt={type:void 0,texture:void 0},et[it]=Rt),(Rt.type!==F||Rt.texture!==At)&&($!==it&&(i.activeTexture(it),$=it),i.bindTexture(F,At||k[F]),Rt.type=F,Rt.texture=At)}function fe(){let F=et[$];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function se(){try{i.compressedTexImage2D(...arguments)}catch(F){Kt("WebGLState:",F)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(F){Kt("WebGLState:",F)}}function x(){try{i.texSubImage2D(...arguments)}catch(F){Kt("WebGLState:",F)}}function z(){try{i.texSubImage3D(...arguments)}catch(F){Kt("WebGLState:",F)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(F){Kt("WebGLState:",F)}}function j(){try{i.compressedTexSubImage3D(...arguments)}catch(F){Kt("WebGLState:",F)}}function dt(){try{i.texStorage2D(...arguments)}catch(F){Kt("WebGLState:",F)}}function xt(){try{i.texStorage3D(...arguments)}catch(F){Kt("WebGLState:",F)}}function tt(){try{i.texImage2D(...arguments)}catch(F){Kt("WebGLState:",F)}}function ot(){try{i.texImage3D(...arguments)}catch(F){Kt("WebGLState:",F)}}function wt(F){return f[F]!==void 0?f[F]:i.getParameter(F)}function Vt(F,At){f[F]!==At&&(i.pixelStorei(F,At),f[F]=At)}function Ct(F){ie.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),ie.copy(F))}function Et(F){rt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),rt.copy(F))}function kt(F,At){let it=c.get(At);it===void 0&&(it=new WeakMap,c.set(At,it));let Rt=it.get(F);Rt===void 0&&(Rt=i.getUniformBlockIndex(At,F.name),it.set(F,Rt))}function Yt(F,At){let Rt=c.get(At).get(F);l.get(At)!==Rt&&(i.uniformBlockBinding(At,Rt,F.__bindingPointIndex),l.set(At,Rt))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},$=null,et={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,S=null,v=null,T=null,E=null,C=null,y=new _t(0,0,0),w=0,I=!1,N=null,H=null,V=null,L=null,O=null,ie.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:G,disable:K,bindFramebuffer:mt,drawBuffers:ct,useProgram:gt,setBlending:at,setMaterial:ht,setFlipSided:ut,setCullFace:Mt,setLineWidth:Gt,setPolygonOffset:Ht,setScissorTest:Wt,activeTexture:Xt,bindTexture:U,unbindTexture:fe,compressedTexImage2D:se,compressedTexImage3D:R,texImage2D:tt,texImage3D:ot,pixelStorei:Vt,getParameter:wt,updateUBOMapping:kt,uniformBlockBinding:Yt,texStorage2D:dt,texStorage3D:xt,texSubImage2D:x,texSubImage3D:z,compressedTexSubImage2D:Y,compressedTexSubImage3D:j,scissor:Ct,viewport:Et,reset:ee}}function fv(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new W,h=new WeakMap,f=new Set,u,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,x){return g?new OffscreenCanvas(R,x):ro("canvas")}function m(R,x,z){let Y=1,j=se(R);if((j.width>z||j.height>z)&&(Y=z/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let dt=Math.floor(Y*j.width),xt=Math.floor(Y*j.height);u===void 0&&(u=_(dt,xt));let tt=x?_(dt,xt):u;return tt.width=dt,tt.height=xt,tt.getContext("2d").drawImage(R,0,0,dt,xt),$t("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+dt+"x"+xt+")."),tt}else return"data"in R&&$t("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),R;return R}function p(R){return R.generateMipmaps}function M(R){i.generateMipmap(R)}function S(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(R,x,z,Y,j,dt=!1){if(R!==null){if(i[R]!==void 0)return i[R];$t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let xt;Y&&(xt=t.get("EXT_texture_norm16"),xt||$t("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let tt=x;if(x===i.RED&&(z===i.FLOAT&&(tt=i.R32F),z===i.HALF_FLOAT&&(tt=i.R16F),z===i.UNSIGNED_BYTE&&(tt=i.R8),z===i.UNSIGNED_SHORT&&xt&&(tt=xt.R16_EXT),z===i.SHORT&&xt&&(tt=xt.R16_SNORM_EXT)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(tt=i.R8UI),z===i.UNSIGNED_SHORT&&(tt=i.R16UI),z===i.UNSIGNED_INT&&(tt=i.R32UI),z===i.BYTE&&(tt=i.R8I),z===i.SHORT&&(tt=i.R16I),z===i.INT&&(tt=i.R32I)),x===i.RG&&(z===i.FLOAT&&(tt=i.RG32F),z===i.HALF_FLOAT&&(tt=i.RG16F),z===i.UNSIGNED_BYTE&&(tt=i.RG8),z===i.UNSIGNED_SHORT&&xt&&(tt=xt.RG16_EXT),z===i.SHORT&&xt&&(tt=xt.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(tt=i.RG8UI),z===i.UNSIGNED_SHORT&&(tt=i.RG16UI),z===i.UNSIGNED_INT&&(tt=i.RG32UI),z===i.BYTE&&(tt=i.RG8I),z===i.SHORT&&(tt=i.RG16I),z===i.INT&&(tt=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(tt=i.RGB8UI),z===i.UNSIGNED_SHORT&&(tt=i.RGB16UI),z===i.UNSIGNED_INT&&(tt=i.RGB32UI),z===i.BYTE&&(tt=i.RGB8I),z===i.SHORT&&(tt=i.RGB16I),z===i.INT&&(tt=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(tt=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(tt=i.RGBA16UI),z===i.UNSIGNED_INT&&(tt=i.RGBA32UI),z===i.BYTE&&(tt=i.RGBA8I),z===i.SHORT&&(tt=i.RGBA16I),z===i.INT&&(tt=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_SHORT&&xt&&(tt=xt.RGB16_EXT),z===i.SHORT&&xt&&(tt=xt.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(tt=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(tt=i.R11F_G11F_B10F)),x===i.RGBA){let ot=dt?so:ae.getTransfer(j);z===i.FLOAT&&(tt=i.RGBA32F),z===i.HALF_FLOAT&&(tt=i.RGBA16F),z===i.UNSIGNED_BYTE&&(tt=ot===_e?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&xt&&(tt=xt.RGBA16_EXT),z===i.SHORT&&xt&&(tt=xt.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(tt=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(tt=i.RGB5_A1)}return(tt===i.R16F||tt===i.R32F||tt===i.RG16F||tt===i.RG32F||tt===i.RGBA16F||tt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function T(R,x){let z;return R?x===null||x===Qn||x===Tr?z=i.DEPTH24_STENCIL8:x===Vn?z=i.DEPTH32F_STENCIL8:x===Er&&(z=i.DEPTH24_STENCIL8,$t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Qn||x===Tr?z=i.DEPTH_COMPONENT24:x===Vn?z=i.DEPTH_COMPONENT32F:x===Er&&(z=i.DEPTH_COMPONENT16),z}function E(R,x){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==nn&&R.minFilter!==Xe?Math.log2(Math.max(x.width,x.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?x.mipmaps.length:1}function C(R){let x=R.target;x.removeEventListener("dispose",C),w(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&f.delete(x)}function y(R){let x=R.target;x.removeEventListener("dispose",y),N(x)}function w(R){let x=n.get(R);if(x.__webglInit===void 0)return;let z=R.source,Y=d.get(z);if(Y){let j=Y[x.__cacheKey];j.usedTimes--,j.usedTimes===0&&I(R),Object.keys(Y).length===0&&d.delete(z)}n.remove(R)}function I(R){let x=n.get(R);i.deleteTexture(x.__webglTexture);let z=R.source,Y=d.get(z);delete Y[x.__cacheKey],o.memory.textures--}function N(R){let x=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let j=0;j<x.__webglFramebuffer[Y].length;j++)i.deleteFramebuffer(x.__webglFramebuffer[Y][j]);else i.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)i.deleteFramebuffer(x.__webglFramebuffer[Y]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let z=R.textures;for(let Y=0,j=z.length;Y<j;Y++){let dt=n.get(z[Y]);dt.__webglTexture&&(i.deleteTexture(dt.__webglTexture),o.memory.textures--),n.remove(z[Y])}n.remove(R)}let H=0;function V(){H=0}function L(){return H}function O(R){H=R}function X(){let R=H;return R>=s.maxTextures&&$t("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),H+=1,R}function q(R){let x=[];return x.push(R.wrapS),x.push(R.wrapT),x.push(R.wrapR||0),x.push(R.magFilter),x.push(R.minFilter),x.push(R.anisotropy),x.push(R.internalFormat),x.push(R.format),x.push(R.type),x.push(R.generateMipmaps),x.push(R.premultiplyAlpha),x.push(R.flipY),x.push(R.unpackAlignment),x.push(R.colorSpace),x.join()}function nt(R,x){let z=n.get(R);if(R.isVideoTexture&&U(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&z.__version!==R.version){let Y=R.image;if(Y===null)$t("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)$t("WebGLRenderer: Texture marked for update but image is incomplete");else{K(z,R,x);return}}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function Z(R,x){let z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){K(z,R,x);return}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function $(R,x){let z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){K(z,R,x);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function et(R,x){let z=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&z.__version!==R.version){mt(z,R,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}let Ut={[Zn]:i.REPEAT,[Bn]:i.CLAMP_TO_EDGE,[Ya]:i.MIRRORED_REPEAT},bt={[nn]:i.NEAREST,[Id]:i.NEAREST_MIPMAP_NEAREST,[ko]:i.NEAREST_MIPMAP_LINEAR,[Xe]:i.LINEAR,[bl]:i.LINEAR_MIPMAP_NEAREST,[kn]:i.LINEAR_MIPMAP_LINEAR},ie={[Ud]:i.NEVER,[zd]:i.ALWAYS,[Fd]:i.LESS,[oc]:i.LEQUAL,[Bd]:i.EQUAL,[ac]:i.GEQUAL,[Od]:i.GREATER,[Hd]:i.NOTEQUAL};function rt(R,x){if(x.type===Vn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Xe||x.magFilter===bl||x.magFilter===ko||x.magFilter===kn||x.minFilter===Xe||x.minFilter===bl||x.minFilter===ko||x.minFilter===kn)&&$t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Ut[x.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Ut[x.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Ut[x.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,bt[x.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,bt[x.minFilter]),x.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ie[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===nn||x.minFilter!==ko&&x.minFilter!==kn||x.type===Vn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function yt(R,x){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,x.addEventListener("dispose",C));let Y=x.source,j=d.get(Y);j===void 0&&(j={},d.set(Y,j));let dt=q(x);if(dt!==R.__cacheKey){j[dt]===void 0&&(j[dt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),j[dt].usedTimes++;let xt=j[R.__cacheKey];xt!==void 0&&(j[R.__cacheKey].usedTimes--,xt.usedTimes===0&&I(x)),R.__cacheKey=dt,R.__webglTexture=j[dt].texture}return z}function k(R,x,z){return Math.floor(Math.floor(R/z)/x)}function G(R,x,z,Y){let dt=R.updateRanges;if(dt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,Y,x.data);else{dt.sort((Vt,Ct)=>Vt.start-Ct.start);let xt=0;for(let Vt=1;Vt<dt.length;Vt++){let Ct=dt[xt],Et=dt[Vt],kt=Ct.start+Ct.count,Yt=k(Et.start,x.width,4),ee=k(Ct.start,x.width,4);Et.start<=kt+1&&Yt===ee&&k(Et.start+Et.count-1,x.width,4)===Yt?Ct.count=Math.max(Ct.count,Et.start+Et.count-Ct.start):(++xt,dt[xt]=Et)}dt.length=xt+1;let tt=e.getParameter(i.UNPACK_ROW_LENGTH),ot=e.getParameter(i.UNPACK_SKIP_PIXELS),wt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Vt=0,Ct=dt.length;Vt<Ct;Vt++){let Et=dt[Vt],kt=Math.floor(Et.start/4),Yt=Math.ceil(Et.count/4),ee=kt%x.width,F=Math.floor(kt/x.width),At=Yt,it=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),e.pixelStorei(i.UNPACK_SKIP_ROWS,F),e.texSubImage2D(i.TEXTURE_2D,0,ee,F,At,it,z,Y,x.data)}R.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,tt),e.pixelStorei(i.UNPACK_SKIP_PIXELS,ot),e.pixelStorei(i.UNPACK_SKIP_ROWS,wt)}}function K(R,x,z){let Y=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=i.TEXTURE_3D);let j=yt(R,x),dt=x.source;e.bindTexture(Y,R.__webglTexture,i.TEXTURE0+z);let xt=n.get(dt);if(dt.version!==xt.__version||j===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let it=ae.getPrimaries(ae.workingColorSpace),Rt=x.colorSpace===Ai?null:ae.getPrimaries(x.colorSpace),Dt=x.colorSpace===Ai||it===Rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let ot=m(x.image,!1,s.maxTextureSize);ot=fe(x,ot);let wt=r.convert(x.format,x.colorSpace),Vt=r.convert(x.type),Ct=v(x.internalFormat,wt,Vt,x.normalized,x.colorSpace,x.isVideoTexture);rt(Y,x);let Et,kt=x.mipmaps,Yt=x.isVideoTexture!==!0,ee=xt.__version===void 0||j===!0,F=dt.dataReady,At=E(x,ot);if(x.isDepthTexture)Ct=T(x.format===ns,x.type),ee&&(Yt?e.texStorage2D(i.TEXTURE_2D,1,Ct,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,Ct,ot.width,ot.height,0,wt,Vt,null));else if(x.isDataTexture)if(kt.length>0){Yt&&ee&&e.texStorage2D(i.TEXTURE_2D,At,Ct,kt[0].width,kt[0].height);for(let it=0,Rt=kt.length;it<Rt;it++)Et=kt[it],Yt?F&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,Et.width,Et.height,wt,Vt,Et.data):e.texImage2D(i.TEXTURE_2D,it,Ct,Et.width,Et.height,0,wt,Vt,Et.data);x.generateMipmaps=!1}else Yt?(ee&&e.texStorage2D(i.TEXTURE_2D,At,Ct,ot.width,ot.height),F&&G(x,ot,wt,Vt)):e.texImage2D(i.TEXTURE_2D,0,Ct,ot.width,ot.height,0,wt,Vt,ot.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Yt&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Ct,kt[0].width,kt[0].height,ot.depth);for(let it=0,Rt=kt.length;it<Rt;it++)if(Et=kt[it],x.format!==bn)if(wt!==null)if(Yt){if(F)if(x.layerUpdates.size>0){let Dt=eu(Et.width,Et.height,x.format,x.type);for(let lt of x.layerUpdates){let Ot=Et.data.subarray(lt*Dt/Et.data.BYTES_PER_ELEMENT,(lt+1)*Dt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,lt,Et.width,Et.height,1,wt,Ot)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,Et.width,Et.height,ot.depth,wt,Et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,it,Ct,Et.width,Et.height,ot.depth,0,Et.data,0,0);else $t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Yt?F&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,Et.width,Et.height,ot.depth,wt,Vt,Et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,it,Ct,Et.width,Et.height,ot.depth,0,wt,Vt,Et.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Yt&&ee&&e.texStorage2D(i.TEXTURE_2D,At,Ct,kt[0].width,kt[0].height);for(let it=0,Rt=kt.length;it<Rt;it++)Et=kt[it],x.format!==bn?wt!==null?Yt?F&&e.compressedTexSubImage2D(i.TEXTURE_2D,it,0,0,Et.width,Et.height,wt,Et.data):e.compressedTexImage2D(i.TEXTURE_2D,it,Ct,Et.width,Et.height,0,Et.data):$t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?F&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,Et.width,Et.height,wt,Vt,Et.data):e.texImage2D(i.TEXTURE_2D,it,Ct,Et.width,Et.height,0,wt,Vt,Et.data)}else if(x.isDataArrayTexture)if(Yt){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Ct,ot.width,ot.height,ot.depth),F)if(x.layerUpdates.size>0){let it=eu(ot.width,ot.height,x.format,x.type);for(let Rt of x.layerUpdates){let Dt=ot.data.subarray(Rt*it/ot.data.BYTES_PER_ELEMENT,(Rt+1)*it/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Rt,ot.width,ot.height,1,wt,Vt,Dt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,wt,Vt,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ct,ot.width,ot.height,ot.depth,0,wt,Vt,ot.data);else if(x.isData3DTexture)Yt?(ee&&e.texStorage3D(i.TEXTURE_3D,At,Ct,ot.width,ot.height,ot.depth),F&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,wt,Vt,ot.data)):e.texImage3D(i.TEXTURE_3D,0,Ct,ot.width,ot.height,ot.depth,0,wt,Vt,ot.data);else if(x.isFramebufferTexture){if(ee)if(Yt)e.texStorage2D(i.TEXTURE_2D,At,Ct,ot.width,ot.height);else{let it=ot.width,Rt=ot.height;for(let Dt=0;Dt<At;Dt++)e.texImage2D(i.TEXTURE_2D,Dt,Ct,it,Rt,0,wt,Vt,null),it>>=1,Rt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let it=i.canvas;if(it.hasAttribute("layoutsubtree")||it.setAttribute("layoutsubtree","true"),ot.parentNode!==it){it.appendChild(ot),f.add(x),it.onpaint=Rt=>{let Dt=Rt.changedElements;for(let lt of f)Dt.includes(lt.image)&&(lt.needsUpdate=!0)},it.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ot);else{let Dt=i.RGBA,lt=i.RGBA,Ot=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Dt,lt,Ot,ot)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(kt.length>0){if(Yt&&ee){let it=se(kt[0]);e.texStorage2D(i.TEXTURE_2D,At,Ct,it.width,it.height)}for(let it=0,Rt=kt.length;it<Rt;it++)Et=kt[it],Yt?F&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,wt,Vt,Et):e.texImage2D(i.TEXTURE_2D,it,Ct,wt,Vt,Et);x.generateMipmaps=!1}else if(Yt){if(ee){let it=se(ot);e.texStorage2D(i.TEXTURE_2D,At,Ct,it.width,it.height)}F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,wt,Vt,ot)}else e.texImage2D(i.TEXTURE_2D,0,Ct,wt,Vt,ot);p(x)&&M(Y),xt.__version=dt.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function mt(R,x,z){if(x.image.length!==6)return;let Y=yt(R,x),j=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+z);let dt=n.get(j);if(j.version!==dt.__version||Y===!0){e.activeTexture(i.TEXTURE0+z);let xt=ae.getPrimaries(ae.workingColorSpace),tt=x.colorSpace===Ai?null:ae.getPrimaries(x.colorSpace),ot=x.colorSpace===Ai||xt===tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);let wt=x.isCompressedTexture||x.image[0].isCompressedTexture,Vt=x.image[0]&&x.image[0].isDataTexture,Ct=[];for(let lt=0;lt<6;lt++)!wt&&!Vt?Ct[lt]=m(x.image[lt],!0,s.maxCubemapSize):Ct[lt]=Vt?x.image[lt].image:x.image[lt],Ct[lt]=fe(x,Ct[lt]);let Et=Ct[0],kt=r.convert(x.format,x.colorSpace),Yt=r.convert(x.type),ee=v(x.internalFormat,kt,Yt,x.normalized,x.colorSpace),F=x.isVideoTexture!==!0,At=dt.__version===void 0||Y===!0,it=j.dataReady,Rt=E(x,Et);rt(i.TEXTURE_CUBE_MAP,x);let Dt;if(wt){F&&At&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Rt,ee,Et.width,Et.height);for(let lt=0;lt<6;lt++){Dt=Ct[lt].mipmaps;for(let Ot=0;Ot<Dt.length;Ot++){let zt=Dt[Ot];x.format!==bn?kt!==null?F?it&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ot,0,0,zt.width,zt.height,kt,zt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ot,ee,zt.width,zt.height,0,zt.data):$t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ot,0,0,zt.width,zt.height,kt,Yt,zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ot,ee,zt.width,zt.height,0,kt,Yt,zt.data)}}}else{if(Dt=x.mipmaps,F&&At){Dt.length>0&&Rt++;let lt=se(Ct[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Rt,ee,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(Vt){F?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,Ct[lt].width,Ct[lt].height,kt,Yt,Ct[lt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,ee,Ct[lt].width,Ct[lt].height,0,kt,Yt,Ct[lt].data);for(let Ot=0;Ot<Dt.length;Ot++){let Me=Dt[Ot].image[lt].image;F?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ot+1,0,0,Me.width,Me.height,kt,Yt,Me.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ot+1,ee,Me.width,Me.height,0,kt,Yt,Me.data)}}else{F?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,kt,Yt,Ct[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,ee,kt,Yt,Ct[lt]);for(let Ot=0;Ot<Dt.length;Ot++){let zt=Dt[Ot];F?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ot+1,0,0,kt,Yt,zt.image[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ot+1,ee,kt,Yt,zt.image[lt])}}}p(x)&&M(i.TEXTURE_CUBE_MAP),dt.__version=j.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function ct(R,x,z,Y,j,dt){let xt=r.convert(z.format,z.colorSpace),tt=r.convert(z.type),ot=v(z.internalFormat,xt,tt,z.normalized,z.colorSpace),wt=n.get(x),Vt=n.get(z);if(Vt.__renderTarget=x,!wt.__hasExternalTextures){let Ct=Math.max(1,x.width>>dt),Et=Math.max(1,x.height>>dt);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,dt,ot,Ct,Et,x.depth,0,xt,tt,null):e.texImage2D(j,dt,ot,Ct,Et,0,xt,tt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),Xt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,j,Vt.__webglTexture,0,Wt(x)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,j,Vt.__webglTexture,dt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(R,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,R),x.depthBuffer){let Y=x.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,dt=T(x.stencilBuffer,j),xt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Xt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt(x),dt,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt(x),dt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,dt,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xt,i.RENDERBUFFER,R)}else{let Y=x.textures;for(let j=0;j<Y.length;j++){let dt=Y[j],xt=r.convert(dt.format,dt.colorSpace),tt=r.convert(dt.type),ot=v(dt.internalFormat,xt,tt,dt.normalized,dt.colorSpace);Xt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt(x),ot,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt(x),ot,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ot,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function qt(R,x,z){let Y=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let j=n.get(x.depthTexture);if(j.__renderTarget=x,(!j.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y){if(j.__webglInit===void 0&&(j.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),j.__webglTexture===void 0){j.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),rt(i.TEXTURE_CUBE_MAP,x.depthTexture);let wt=r.convert(x.depthTexture.format),Vt=r.convert(x.depthTexture.type),Ct;x.depthTexture.format===oi?Ct=i.DEPTH_COMPONENT24:x.depthTexture.format===ns&&(Ct=i.DEPTH24_STENCIL8);for(let Et=0;Et<6;Et++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,Ct,x.width,x.height,0,wt,Vt,null)}}else nt(x.depthTexture,0);let dt=j.__webglTexture,xt=Wt(x),tt=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,ot=x.depthTexture.format===ns?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===oi)Xt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,tt,dt,0,xt):i.framebufferTexture2D(i.FRAMEBUFFER,ot,tt,dt,0);else if(x.depthTexture.format===ns)Xt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,tt,dt,0,xt):i.framebufferTexture2D(i.FRAMEBUFFER,ot,tt,dt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Q(R){let x=n.get(R),z=R.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==R.depthTexture){let Y=R.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){let j=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),x.__depthDisposeCallback=j}x.__boundDepthTexture=Y}if(R.depthTexture&&!x.__autoAllocateDepthBuffer)if(z)for(let Y=0;Y<6;Y++)qt(x.__webglFramebuffer[Y],R,Y);else{let Y=R.texture.mipmaps;Y&&Y.length>0?qt(x.__webglFramebuffer[0],R,0):qt(x.__webglFramebuffer,R,0)}else if(z){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=i.createRenderbuffer(),gt(x.__webglDepthbuffer[Y],R,!1);else{let j=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=x.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,dt)}}else{let Y=R.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),gt(x.__webglDepthbuffer,R,!1);else{let j=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,dt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(R,x,z){let Y=n.get(R);x!==void 0&&ct(Y.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Q(R)}function ht(R){let x=R.texture,z=n.get(R),Y=n.get(x);R.addEventListener("dispose",y);let j=R.textures,dt=R.isWebGLCubeRenderTarget===!0,xt=j.length>1;if(xt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=x.version,o.memory.textures++),dt){z.__webglFramebuffer=[];for(let tt=0;tt<6;tt++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[tt]=[];for(let ot=0;ot<x.mipmaps.length;ot++)z.__webglFramebuffer[tt][ot]=i.createFramebuffer()}else z.__webglFramebuffer[tt]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let tt=0;tt<x.mipmaps.length;tt++)z.__webglFramebuffer[tt]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(xt)for(let tt=0,ot=j.length;tt<ot;tt++){let wt=n.get(j[tt]);wt.__webglTexture===void 0&&(wt.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Xt(R)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let tt=0;tt<j.length;tt++){let ot=j[tt];z.__webglColorRenderbuffer[tt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[tt]);let wt=r.convert(ot.format,ot.colorSpace),Vt=r.convert(ot.type),Ct=v(ot.internalFormat,wt,Vt,ot.normalized,ot.colorSpace,R.isXRRenderTarget===!0),Et=Wt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Et,Ct,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+tt,i.RENDERBUFFER,z.__webglColorRenderbuffer[tt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),gt(z.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(dt){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),rt(i.TEXTURE_CUBE_MAP,x);for(let tt=0;tt<6;tt++)if(x.mipmaps&&x.mipmaps.length>0)for(let ot=0;ot<x.mipmaps.length;ot++)ct(z.__webglFramebuffer[tt][ot],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ot);else ct(z.__webglFramebuffer[tt],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0);p(x)&&M(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let tt=0,ot=j.length;tt<ot;tt++){let wt=j[tt],Vt=n.get(wt),Ct=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Ct=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Ct,Vt.__webglTexture),rt(Ct,wt),ct(z.__webglFramebuffer,R,wt,i.COLOR_ATTACHMENT0+tt,Ct,0),p(wt)&&M(Ct)}e.unbindTexture()}else{let tt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(tt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(tt,Y.__webglTexture),rt(tt,x),x.mipmaps&&x.mipmaps.length>0)for(let ot=0;ot<x.mipmaps.length;ot++)ct(z.__webglFramebuffer[ot],R,x,i.COLOR_ATTACHMENT0,tt,ot);else ct(z.__webglFramebuffer,R,x,i.COLOR_ATTACHMENT0,tt,0);p(x)&&M(tt),e.unbindTexture()}R.depthBuffer&&Q(R)}function ut(R){let x=R.textures;for(let z=0,Y=x.length;z<Y;z++){let j=x[z];if(p(j)){let dt=S(R),xt=n.get(j).__webglTexture;e.bindTexture(dt,xt),M(dt),e.unbindTexture()}}}let Mt=[],Gt=[];function Ht(R){if(R.samples>0){if(Xt(R)===!1){let x=R.textures,z=R.width,Y=R.height,j=i.COLOR_BUFFER_BIT,dt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=n.get(R),tt=x.length>1;if(tt)for(let wt=0;wt<x.length;wt++)e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer);let ot=R.texture.mipmaps;ot&&ot.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let wt=0;wt<x.length;wt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),tt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xt.__webglColorRenderbuffer[wt]);let Vt=n.get(x[wt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Vt,0)}i.blitFramebuffer(0,0,z,Y,0,0,z,Y,j,i.NEAREST),l===!0&&(Mt.length=0,Gt.length=0,Mt.push(i.COLOR_ATTACHMENT0+wt),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(Mt.push(dt),Gt.push(dt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Gt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Mt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),tt)for(let wt=0;wt<x.length;wt++){e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,xt.__webglColorRenderbuffer[wt]);let Vt=n.get(x[wt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,Vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let x=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Wt(R){return Math.min(s.maxSamples,R.samples)}function Xt(R){let x=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function U(R){let x=o.render.frame;h.get(R)!==x&&(h.set(R,x),R.update())}function fe(R,x){let z=R.colorSpace,Y=R.format,j=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||z!==io&&z!==Ai&&(ae.getTransfer(z)===_e?(Y!==bn||j!==Sn)&&$t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Kt("WebGLTextures: Unsupported texture color space:",z)),x}function se(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=V,this.getTextureUnits=L,this.setTextureUnits=O,this.setTexture2D=nt,this.setTexture2DArray=Z,this.setTexture3D=$,this.setTextureCube=et,this.rebindTextures=at,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=Ht,this.setupDepthRenderbuffer=Q,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=Xt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function pv(i,t){function e(n,s=Ai){let r,o=ae.getTransfer(s);if(n===Sn)return i.UNSIGNED_BYTE;if(n===Tl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Wh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Xh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Vh)return i.BYTE;if(n===Gh)return i.SHORT;if(n===Er)return i.UNSIGNED_SHORT;if(n===El)return i.INT;if(n===Qn)return i.UNSIGNED_INT;if(n===Vn)return i.FLOAT;if(n===He)return i.HALF_FLOAT;if(n===qh)return i.ALPHA;if(n===Yh)return i.RGB;if(n===bn)return i.RGBA;if(n===oi)return i.DEPTH_COMPONENT;if(n===ns)return i.DEPTH_STENCIL;if(n===wr)return i.RED;if(n===Al)return i.RED_INTEGER;if(n===is)return i.RG;if(n===Rl)return i.RG_INTEGER;if(n===Cl)return i.RGBA_INTEGER;if(n===Vo||n===Go||n===Wo||n===Xo)if(o===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Vo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Xo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Vo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Go)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Wo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Xo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Pl||n===Il||n===Ll||n===Dl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Pl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Il)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ll)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Dl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Nl||n===Ul||n===Fl||n===Bl||n===Ol||n===qo||n===Hl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Nl||n===Ul)return o===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Fl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Bl)return r.COMPRESSED_R11_EAC;if(n===Ol)return r.COMPRESSED_SIGNED_R11_EAC;if(n===qo)return r.COMPRESSED_RG11_EAC;if(n===Hl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===zl||n===kl||n===Vl||n===Gl||n===Wl||n===Xl||n===ql||n===Yl||n===Zl||n===$l||n===Jl||n===Kl||n===jl||n===Ql)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===zl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===kl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Gl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ql)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$l)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Jl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Kl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===jl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ql)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===tc||n===ec||n===nc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===tc)return o===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ec)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ic||n===sc||n===Yo||n===rc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ic)return r.COMPRESSED_RED_RGTC1_EXT;if(n===sc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Tr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var mv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gv=`
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

}`,mu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new xo(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new re({vertexShader:mv,fragmentShader:gv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new pt(new yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},gu=class extends $n{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null,_=typeof XRWebGLBinding<"u",m=new mu,p={},M=e.getContextAttributes(),S=null,v=null,T=[],E=[],C=new W,y=null,w=null,I=new en;I.viewport=new Ce;let N=new en;N.viewport=new Ce;let H=[I,N],V=new vl,L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let G=T[k];return G===void 0&&(G=new ur,T[k]=G),G.getTargetRaySpace()},this.getControllerGrip=function(k){let G=T[k];return G===void 0&&(G=new ur,T[k]=G),G.getGripSpace()},this.getHand=function(k){let G=T[k];return G===void 0&&(G=new ur,T[k]=G),G.getHandSpace()};function X(k){let G=E.indexOf(k.inputSource);if(G===-1)return;let K=T[G];K!==void 0&&(K.update(k.inputSource,k.frame,c||o),K.dispatchEvent({type:k.type,data:k.inputSource}))}function q(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",nt);for(let k=0;k<T.length;k++){let G=E[k];G!==null&&(E[k]=null,T[k].disconnect(G))}L=null,O=null,m.reset();for(let k in p)delete p[k];if(t.setRenderTarget(S),d=null,u=null,f=null,s=null,v=null,yt.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(C.width,C.height,!1),w!==null){let k=w.camera;k.fov=w.fov,k.zoom=w.zoom,k.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,n.isPresenting===!0&&$t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,n.isPresenting===!0&&$t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(S=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",q),s.addEventListener("inputsourceschange",nt),M.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let K=null,mt=null,ct=null;M.depth&&(ct=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,K=M.stencil?ns:oi,mt=M.stencil?Tr:Qn);let gt={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(gt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new ke(u.textureWidth,u.textureHeight,{format:bn,type:Sn,depthTexture:new qi(u.textureWidth,u.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let K={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,K),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new ke(d.framebufferWidth,d.framebufferHeight,{format:bn,type:Sn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),yt.setContext(s),yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function nt(k){for(let G=0;G<k.removed.length;G++){let K=k.removed[G],mt=E.indexOf(K);mt>=0&&(E[mt]=null,T[mt].disconnect(K))}for(let G=0;G<k.added.length;G++){let K=k.added[G],mt=E.indexOf(K);if(mt===-1){for(let gt=0;gt<T.length;gt++)if(gt>=E.length){E.push(K),mt=gt;break}else if(E[gt]===null){E[gt]=K,mt=gt;break}if(mt===-1)break}let ct=T[mt];ct&&ct.connect(K)}}let Z=new A,$=new A;function et(k,G,K){Z.setFromMatrixPosition(G.matrixWorld),$.setFromMatrixPosition(K.matrixWorld);let mt=Z.distanceTo($),ct=G.projectionMatrix.elements,gt=K.projectionMatrix.elements,qt=ct[14]/(ct[10]-1),Q=ct[14]/(ct[10]+1),at=(ct[9]+1)/ct[5],ht=(ct[9]-1)/ct[5],ut=(ct[8]-1)/ct[0],Mt=(gt[8]+1)/gt[0],Gt=qt*ut,Ht=qt*Mt,Wt=mt/(-ut+Mt),Xt=Wt*-ut;if(G.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Xt),k.translateZ(Wt),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),ct[10]===-1)k.projectionMatrix.copy(G.projectionMatrix),k.projectionMatrixInverse.copy(G.projectionMatrixInverse);else{let U=qt+Wt,fe=Q+Wt,se=Gt-Xt,R=Ht+(mt-Xt),x=at*Q/fe*U,z=ht*Q/fe*U;k.projectionMatrix.makePerspective(se,R,x,z,U,fe),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function Ut(k,G){G===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(G.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;let G=k.near,K=k.far;m.texture!==null&&(m.depthNear>0&&(G=m.depthNear),m.depthFar>0&&(K=m.depthFar)),V.near=N.near=I.near=G,V.far=N.far=I.far=K,(L!==V.near||O!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),L=V.near,O=V.far),V.layers.mask=k.layers.mask|6,I.layers.mask=V.layers.mask&-5,N.layers.mask=V.layers.mask&-3;let mt=k.parent,ct=V.cameras;Ut(V,mt);for(let gt=0;gt<ct.length;gt++)Ut(ct[gt],mt);ct.length===2?et(V,I,N):V.projectionMatrix.copy(I.projectionMatrix),w===null&&k.isPerspectiveCamera&&(w={camera:k,fov:k.fov,zoom:k.zoom}),bt(k,V,mt)};function bt(k,G,K){K===null?k.matrix.copy(G.matrixWorld):(k.matrix.copy(K.matrixWorld),k.matrix.invert(),k.matrix.multiply(G.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(G.projectionMatrix),k.projectionMatrixInverse.copy(G.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Ms*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(k){l=k,u!==null&&(u.fixedFoveation=k),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=k)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(k){return p[k]};let ie=null;function rt(k,G){if(h=G.getViewerPose(c||o),g=G,h!==null){let K=h.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let mt=!1;K.length!==V.cameras.length&&(V.cameras.length=0,mt=!0);for(let Q=0;Q<K.length;Q++){let at=K[Q],ht=null;if(d!==null)ht=d.getViewport(at);else{let Mt=f.getViewSubImage(u,at);ht=Mt.viewport,Q===0&&(t.setRenderTargetTextures(v,Mt.colorTexture,Mt.depthStencilTexture),t.setRenderTarget(v))}let ut=H[Q];ut===void 0&&(ut=new en,ut.layers.enable(Q),ut.viewport=new Ce,H[Q]=ut),ut.matrix.fromArray(at.transform.matrix),ut.matrix.decompose(ut.position,ut.quaternion,ut.scale),ut.projectionMatrix.fromArray(at.projectionMatrix),ut.projectionMatrixInverse.copy(ut.projectionMatrix).invert(),ut.viewport.set(ht.x,ht.y,ht.width,ht.height),Q===0&&(V.matrix.copy(ut.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),mt===!0&&V.cameras.push(ut)}let ct=s.enabledFeatures;if(ct&&ct.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=n.getBinding();let Q=f.getDepthInformation(K[0]);Q&&Q.isValid&&Q.texture&&m.init(Q,s.renderState)}if(ct&&ct.includes("camera-access")&&_){t.state.unbindTexture(),f=n.getBinding();for(let Q=0;Q<K.length;Q++){let at=K[Q].camera;if(at){let ht=p[at];ht||(ht=new xo,p[at]=ht);let ut=f.getCameraImage(at);ht.sourceTexture=ut}}}}for(let K=0;K<T.length;K++){let mt=E[K],ct=T[K];mt!==null&&ct!==void 0&&ct.update(mt,G,c||o)}ie&&ie(k,G),G.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:G}),g=null}let yt=new Mf;yt.setAnimationLoop(rt),this.setAnimationLoop=function(k){ie=k},this.dispose=function(){}}},_v=new me,Af=new Qt;Af.set(-1,0,0,0,1,0,0,0,1);function xv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,jh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,S,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ln&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ln&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=t.get(p),S=M.envMap,v=M.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(_v.makeRotationFromEuler(v)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Af),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ln&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function vv(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,T){let E=T.program;n.uniformBlockBinding(v,E)}function c(v,T){let E=s[v.id];E===void 0&&(m(v),E=h(v),s[v.id]=E,v.addEventListener("dispose",M));let C=T.program;n.updateUBOMapping(v,C);let y=t.render.frame;r[v.id]!==y&&(u(v),r[v.id]=y)}function h(v){let T=f();v.__bindingPointIndex=T;let E=i.createBuffer(),C=v.__size,y=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,E),E}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Kt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let T=s[v.id],E=v.uniforms,C=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let y=0,w=E.length;y<w;y++){let I=E[y];if(Array.isArray(I))for(let N=0,H=I.length;N<H;N++)d(I[N],y,N,C);else d(I,y,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,T,E,C){if(_(v,T,E,C)===!0){let y=v.__offset,w=v.value;if(Array.isArray(w)){let I=0;for(let N=0;N<w.length;N++){let H=w[N],V=p(H);g(H,v.__data,I),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(I+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,v.__data)}}function g(v,T,E){typeof v=="number"||typeof v=="boolean"?T[0]=v:v.isMatrix3?(T[0]=v.elements[0],T[1]=v.elements[1],T[2]=v.elements[2],T[3]=0,T[4]=v.elements[3],T[5]=v.elements[4],T[6]=v.elements[5],T[7]=0,T[8]=v.elements[6],T[9]=v.elements[7],T[10]=v.elements[8],T[11]=0):ArrayBuffer.isView(v)?T.set(new v.constructor(v.buffer,v.byteOffset,T.length)):v.toArray(T,E)}function _(v,T,E,C){let y=v.value,w=T+"_"+E;if(C[w]===void 0)return typeof y=="number"||typeof y=="boolean"?C[w]=y:ArrayBuffer.isView(y)?C[w]=y.slice():C[w]=y.clone(),!0;{let I=C[w];if(typeof y=="number"||typeof y=="boolean"){if(I!==y)return C[w]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(I.equals(y)===!1)return I.copy(y),!0}}return!1}function m(v){let T=v.uniforms,E=0,C=16;for(let w=0,I=T.length;w<I;w++){let N=Array.isArray(T[w])?T[w]:[T[w]];for(let H=0,V=N.length;H<V;H++){let L=N[H],O=Array.isArray(L.value)?L.value:[L.value];for(let X=0,q=O.length;X<q;X++){let nt=O[X],Z=p(nt),$=E%C,et=$%Z.boundary,Ut=$+et;E+=et,Ut!==0&&C-Ut<Z.storage&&(E+=C-Ut),L.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=E,E+=Z.storage}}}let y=E%C;return y>0&&(E+=C-y),v.__size=E,v.__cache={},this}function p(v){let T={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(T.boundary=4,T.storage=4):v.isVector2?(T.boundary=8,T.storage=8):v.isVector3||v.isColor?(T.boundary=16,T.storage=12):v.isVector4?(T.boundary=16,T.storage=16):v.isMatrix3?(T.boundary=48,T.storage=48):v.isMatrix4?(T.boundary=64,T.storage=64):v.isTexture?$t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(T.boundary=16,T.storage=v.byteLength):$t("WebGLRenderer: Unsupported uniform value type.",v),T}function M(v){let T=v.target;T.removeEventListener("dispose",M);let E=o.indexOf(T.__bindingPointIndex);o.splice(E,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function S(){for(let v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:S}}var yv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ci=null;function Mv(){return ci===null&&(ci=new Ti(yv,16,16,is,He),ci.name="DFG_LUT",ci.minFilter=Xe,ci.magFilter=Xe,ci.wrapS=Bn,ci.wrapT=Bn,ci.generateMipmaps=!1,ci.needsUpdate=!0),ci}var uc=class{constructor(t={}){let{canvas:e=kd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Sn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let _=d,m=new Set([Cl,Rl,Al]),p=new Set([Sn,Qn,Er,Tr,Tl,wl]),M=new Uint32Array(4),S=new Int32Array(4),v=new A,T=null,E=null,C=[],y=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,N=!1,H=null,V=null,L=null,O=null;this._outputColorSpace=tn;let X=0,q=0,nt=null,Z=-1,$=null,et=new Ce,Ut=new Ce,bt=null,ie=new _t(0),rt=0,yt=e.width,k=e.height,G=1,K=null,mt=null,ct=new Ce(0,0,yt,k),gt=new Ce(0,0,yt,k),qt=!1,Q=new fr,at=!1,ht=!1,ut=new me,Mt=new A,Gt=new Ce,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Wt=!1;function Xt(){return nt===null?G:1}let U=n;function fe(b,B){return e.getContext(b,B)}let se,R,x,z,Y,j,dt,xt,tt,ot,wt,Vt,Ct,Et,kt,Yt,ee,F,At,it,Rt,Dt,lt;try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Me,!1),e.addEventListener("webglcontextrestored",ue,!1),e.addEventListener("webglcontextcreationerror",xn,!1),U===null){let B="webgl2";if(U=fe(B,b),U===null)throw fe(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ot()}catch(b){throw e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",xn,!1),Kt("WebGLRenderer: "+b.message),b}function Ot(){se=new R_(U),se.init(),Rt=new pv(U,se),R=new x_(U,se,t,Rt),x=new dv(U,se),R.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),V=U.createFramebuffer(),L=U.createFramebuffer(),O=U.createFramebuffer(),z=new I_(U),Y=new jx,j=new fv(U,se,x,Y,R,Rt,z),dt=new A_(I),xt=new Dm(U),Dt=new g_(U,xt),tt=new C_(U,xt,z,Dt),ot=new D_(U,tt,xt,Dt,z),F=new L_(U,R,j),kt=new v_(Y),wt=new Kx(I,dt,se,R,Dt,kt),Vt=new xv(I,Y),Ct=new tv,Et=new ov(se),ee=new m_(I,dt,x,ot,g,l),Yt=new uv(I,ot,R),lt=new vv(U,z,R,x),At=new __(U,se,z),it=new P_(U,se,z),z.programs=wt.programs,I.capabilities=R,I.extensions=se,I.properties=Y,I.renderLists=Ct,I.shadowMap=Yt,I.state=x,I.info=z}_!==Sn&&(w=new U_(_,e.width,e.height,a,s,r));let zt=new gu(I,U);this.xr=zt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let b=se.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=se.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(b){b!==void 0&&(G=b,this.setSize(yt,k,!1))},this.getSize=function(b){return b.set(yt,k)},this.setSize=function(b,B,J=!0){if(zt.isPresenting){$t("WebGLRenderer: Can't change size while VR device is presenting.");return}yt=b,k=B,e.width=Math.floor(b*G),e.height=Math.floor(B*G),J===!0&&(e.style.width=b+"px",e.style.height=B+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(yt*G,k*G).floor()},this.setDrawingBufferSize=function(b,B,J){yt=b,k=B,G=J,e.width=Math.floor(b*J),e.height=Math.floor(B*J),this.setViewport(0,0,b,B)},this.setEffects=function(b){if(_===Sn){Kt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let B=0;B<b.length;B++)if(b[B].isOutputPass===!0){$t("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(et)},this.getViewport=function(b){return b.copy(ct)},this.setViewport=function(b,B,J,P){b.isVector4?ct.set(b.x,b.y,b.z,b.w):ct.set(b,B,J,P),x.viewport(et.copy(ct).multiplyScalar(G).round())},this.getScissor=function(b){return b.copy(gt)},this.setScissor=function(b,B,J,P){b.isVector4?gt.set(b.x,b.y,b.z,b.w):gt.set(b,B,J,P),x.scissor(Ut.copy(gt).multiplyScalar(G).round())},this.getScissorTest=function(){return qt},this.setScissorTest=function(b){x.setScissorTest(qt=b)},this.setOpaqueSort=function(b){K=b},this.setTransparentSort=function(b){mt=b},this.getClearColor=function(b){return b.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor(...arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha(...arguments)},this.clear=function(b=!0,B=!0,J=!0){let P=0;if(b){let D=!1;if(nt!==null){let st=nt.texture.format;D=m.has(st)}if(D){let st=nt.texture.type,vt=p.has(st),ft=ee.getClearColor(),Nt=ee.getClearAlpha(),Ft=ft.r,Zt=ft.g,Jt=ft.b;vt?(M[0]=Ft,M[1]=Zt,M[2]=Jt,M[3]=Nt,U.clearBufferuiv(U.COLOR,0,M)):(S[0]=Ft,S[1]=Zt,S[2]=Jt,S[3]=Nt,U.clearBufferiv(U.COLOR,0,S))}else P|=U.COLOR_BUFFER_BIT}B&&(P|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(P|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P!==0&&U.clear(P)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),H=b},this.dispose=function(){e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",xn,!1),ee.dispose(),Ct.dispose(),Et.dispose(),Y.dispose(),dt.dispose(),ot.dispose(),Dt.dispose(),lt.dispose(),wt.dispose(),zt.dispose(),zt.removeEventListener("sessionstart",Fs),zt.removeEventListener("sessionend",zr),ei.stop()};function Me(b){b.preventDefault(),oo("WebGLRenderer: Context Lost."),N=!0}function ue(){oo("WebGLRenderer: Context Restored."),N=!1;let b=z.autoReset,B=Yt.enabled,J=Yt.autoUpdate,P=Yt.needsUpdate,D=Yt.type;Ot(),z.autoReset=b,Yt.enabled=B,Yt.autoUpdate=J,Yt.needsUpdate=P,Yt.type=D}function xn(b){Kt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Nn(b){let B=b.target;B.removeEventListener("dispose",Nn),oa(B)}function oa(b){Or(b),Y.remove(b)}function Or(b){let B=Y.get(b).programs;B!==void 0&&(B.forEach(function(J){wt.releaseProgram(J)}),b.isShaderMaterial&&wt.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,J,P,D,st){B===null&&(B=Ht);let vt=D.isMesh&&D.matrixWorld.determinantAffine()<0,ft=Jc(b,B,J,P,D);x.setMaterial(P,vt);let Nt=J.index,Ft=1;if(P.wireframe===!0){if(Nt=tt.getWireframeAttribute(J),Nt===void 0)return;Ft=2}let Zt=J.drawRange,Jt=J.attributes.position,Tt=Zt.start*Ft,de=(Zt.start+Zt.count)*Ft;st!==null&&(Tt=Math.max(Tt,st.start*Ft),de=Math.min(de,(st.start+st.count)*Ft)),Nt!==null?(Tt=Math.max(Tt,0),de=Math.min(de,Nt.count)):Jt!=null&&(Tt=Math.max(Tt,0),de=Math.min(de,Jt.count));let Be=de-Tt;if(Be<0||Be===1/0)return;Dt.setup(D,P,ft,J,Nt);let Ee,ve=At;if(Nt!==null&&(Ee=xt.get(Nt),ve=it,ve.setIndex(Ee)),D.isMesh)P.wireframe===!0?(x.setLineWidth(P.wireframeLinewidth*Xt()),ve.setMode(U.LINES)):ve.setMode(U.TRIANGLES);else if(D.isLine){let hn=P.linewidth;hn===void 0&&(hn=1),x.setLineWidth(hn*Xt()),D.isLineSegments?ve.setMode(U.LINES):D.isLineLoop?ve.setMode(U.LINE_LOOP):ve.setMode(U.LINE_STRIP)}else D.isPoints?ve.setMode(U.POINTS):D.isSprite&&ve.setMode(U.TRIANGLES);if(D.isBatchedMesh)if(se.get("WEBGL_multi_draw"))ve.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{let hn=D._multiDrawStarts,Bt=D._multiDrawCounts,mn=D._multiDrawCount,pe=Nt?xt.get(Nt).bytesPerElement:1,Un=Y.get(P).currentProgram.getUniforms();for(let ni=0;ni<mn;ni++)Un.setValue(U,"_gl_DrawID",ni),ve.render(hn[ni]/pe,Bt[ni])}else if(D.isInstancedMesh)ve.renderInstances(Tt,Be,D.count);else if(J.isInstancedBufferGeometry){let hn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Bt=Math.min(J.instanceCount,hn);ve.renderInstances(Tt,Be,Bt)}else ve.render(Tt,Be)};function aa(b,B,J,P){H!==null&&b.isNodeMaterial&&H.setObject(P,b),at===!0&&kt.setState(b,J,!1),b.transparent===!0&&b.side===Pe&&b.forceSinglePass===!1?(b.side=ln,b.needsUpdate=!0,pi(b,B,P),b.side=Qi,b.needsUpdate=!0,pi(b,B,P),b.side=Pe):pi(b,B,P)}this.compile=function(b,B,J=null){J===null&&(J=b),H!==null&&H.renderStart(b,B,J),E=Et.get(J),E.init(B),y.push(E),J.traverseVisible(function(D){D.isLight&&D.layers.test(B.layers)&&(E.pushLight(D),D.castShadow&&E.pushShadow(D))}),b!==J&&b.traverseVisible(function(D){D.isLight&&D.layers.test(B.layers)&&(E.pushLight(D),D.castShadow&&E.pushShadow(D))}),E.setupLights(),H!==null&&H.updateLights(E.state.lightsArray),ht=this.localClippingEnabled,at=kt.init(this.clippingPlanes,ht),at===!0&&kt.setGlobalState(this.clippingPlanes,B),H!==null&&Yt.render(E.state.shadowsArray,J,B);let P=new Set;return b.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;let st=D.material;if(st)if(Array.isArray(st))for(let vt=0;vt<st.length;vt++){let ft=st[vt];aa(ft,J,B,D),P.add(ft)}else aa(st,J,B,D),P.add(st)}),E=y.pop(),H!==null&&H.renderEnd(),P},this.compileAsync=function(b,B,J=null){let P=this.compile(b,B,J);return new Promise(D=>{function st(){if(P.forEach(function(vt){let Nt=Y.get(vt).currentProgram;(Nt===void 0||Nt.isReady())&&P.delete(vt)}),P.size===0){D(b);return}setTimeout(st,10)}se.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let ps=null;function Hr(b){ps&&ps(b)}function Fs(){ei.stop()}function zr(){ei.start()}let ei=new Mf;ei.setAnimationLoop(Hr),typeof self<"u"&&ei.setContext(self),this.setAnimationLoop=function(b){ps=b,zt.setAnimationLoop(b),b===null?ei.stop():ei.start()},zt.addEventListener("sessionstart",Fs),zt.addEventListener("sessionend",zr),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){Kt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;H!==null&&H.renderStart(b,B);let J=zt.enabled===!0&&zt.isPresenting===!0,P=w!==null&&(nt===null||J)&&w.begin(I,nt);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),zt.enabled===!0&&zt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(zt.cameraAutoUpdate===!0&&zt.updateCamera(B),B=zt.getCamera()),b.isScene===!0&&b.onBeforeRender(I,b,B,nt),E=Et.get(b,y.length),E.init(B),E.state.textureUnits=j.getTextureUnits(),y.push(E),ut.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Q.setFromProjectionMatrix(ut,Yn,B.reversedDepth),ht=this.localClippingEnabled,at=kt.init(this.clippingPlanes,ht),T=Ct.get(b,C.length),T.init(),C.push(T),zt.enabled===!0&&zt.isPresenting===!0){let vt=I.xr.getDepthSensingMesh();vt!==null&&Bs(vt,B,-1/0,I.sortObjects)}Bs(b,B,0,I.sortObjects),T.finish(),H!==null&&H.updateLights(E.state.lightsArray),I.sortObjects===!0&&T.sort(K,mt),Wt=zt.enabled===!1||zt.isPresenting===!1||zt.hasDepthSensing()===!1,Wt&&ee.addToRenderList(T,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),at===!0&&kt.beginShadows();let D=E.state.shadowsArray;if(Yt.render(D,b,B),at===!0&&kt.endShadows(),(P&&w.hasRenderPass())===!1){let vt=T.opaque,ft=T.transmissive;if(E.setupLights(),B.isArrayCamera){let Nt=B.cameras;if(ft.length>0)for(let Ft=0,Zt=Nt.length;Ft<Zt;Ft++){let Jt=Nt[Ft];la(vt,ft,b,Jt)}Wt&&ee.render(b);for(let Ft=0,Zt=Nt.length;Ft<Zt;Ft++){let Jt=Nt[Ft];$c(T,b,Jt,Jt.viewport)}}else ft.length>0&&la(vt,ft,b,B),Wt&&ee.render(b),$c(T,b,B)}nt!==null&&q===0&&(j.updateMultisampleRenderTarget(nt),j.updateRenderTargetMipmap(nt)),P&&w.end(I),b.isScene===!0&&b.onAfterRender(I,b,B),Dt.resetDefaultState(),Z=-1,$=null,y.pop(),y.length>0?(E=y[y.length-1],j.setTextureUnits(E.state.textureUnits),at===!0&&kt.setGlobalState(I.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,H!==null&&H.renderEnd()};function Bs(b,B,J,P){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)J=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(Q)){P&&Gt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ut);let vt=ot.update(b),ft=b.material;ft.visible&&T.push(b,vt,ft,J,Gt.z,null,B)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(Q))){let vt=ot.update(b),ft=b.material;if(P&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Gt.copy(b.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Gt.copy(vt.boundingSphere.center)),Gt.applyMatrix4(b.matrixWorld).applyMatrix4(ut)),Array.isArray(ft)){let Nt=vt.groups;for(let Ft=0,Zt=Nt.length;Ft<Zt;Ft++){let Jt=Nt[Ft],Tt=ft[Jt.materialIndex];Tt&&Tt.visible&&T.push(b,vt,Tt,J,Gt.z,Jt,B)}}else ft.visible&&T.push(b,vt,ft,J,Gt.z,null,B)}}let st=b.children;for(let vt=0,ft=st.length;vt<ft;vt++)Bs(st[vt],B,J,P)}function $c(b,B,J,P){let{opaque:D,transmissive:st,transparent:vt}=b;E.setupLightsView(J),at===!0&&kt.setGlobalState(I.clippingPlanes,J),P&&x.viewport(et.copy(P)),D.length>0&&Ni(D,B,J),st.length>0&&Ni(st,B,J),vt.length>0&&Ni(vt,B,J),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function la(b,B,J,P){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[P.id]===void 0){let Tt=se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[P.id]=new ke(1,1,{generateMipmaps:!0,type:Tt?He:Sn,minFilter:kn,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ae.workingColorSpace})}let st=E.state.transmissionRenderTarget[P.id],vt=P.viewport||et;st.setSize(vt.z*I.transmissionResolutionScale,vt.w*I.transmissionResolutionScale);let ft=I.getRenderTarget(),Nt=I.getActiveCubeFace(),Ft=I.getActiveMipmapLevel();I.setRenderTarget(st),I.getClearColor(ie),rt=I.getClearAlpha(),rt<1&&I.setClearColor(16777215,.5),I.clear(),Wt&&ee.render(J);let Zt=I.toneMapping;I.toneMapping=jn;let Jt=P.viewport;if(P.viewport!==void 0&&(P.viewport=void 0),E.setupLightsView(P),at===!0&&kt.setGlobalState(I.clippingPlanes,P),Ni(b,J,P),j.updateMultisampleRenderTarget(st),j.updateRenderTargetMipmap(st),se.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let de=0,Be=B.length;de<Be;de++){let Ee=B[de],{object:ve,geometry:hn,material:Bt,group:mn}=Ee;if(Bt.side===Pe&&ve.layers.test(P.layers)){let pe=Bt.side;Bt.side=ln,Bt.needsUpdate=!0,fi(ve,J,P,hn,Bt,mn),Bt.side=pe,Bt.needsUpdate=!0,Tt=!0}}Tt===!0&&(j.updateMultisampleRenderTarget(st),j.updateRenderTargetMipmap(st))}I.setRenderTarget(ft,Nt,Ft),I.setClearColor(ie,rt),Jt!==void 0&&(P.viewport=Jt),I.toneMapping=Zt}function Ni(b,B,J){let P=B.isScene===!0?B.overrideMaterial:null;for(let D=0,st=b.length;D<st;D++){let vt=b[D],{object:ft,geometry:Nt,group:Ft}=vt,Zt=vt.material;Zt.allowOverride===!0&&P!==null&&(Zt=P),ft.layers.test(J.layers)&&fi(ft,B,J,Nt,Zt,Ft)}}function fi(b,B,J,P,D,st){H!==null&&D.isNodeMaterial&&H.setObject(b,D),b.onBeforeRender(I,B,J,P,D,st),b.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),D.onBeforeRender(I,B,J,P,b,st),D.transparent===!0&&D.side===Pe&&D.forceSinglePass===!1?(D.side=ln,D.needsUpdate=!0,I.renderBufferDirect(J,B,P,D,b,st),D.side=Qi,D.needsUpdate=!0,I.renderBufferDirect(J,B,P,D,b,st),D.side=Pe):I.renderBufferDirect(J,B,P,D,b,st),b.onAfterRender(I,B,J,P,D,st)}function pi(b,B,J){B.isScene!==!0&&(B=Ht);let P=Y.get(b),D=E.state.lights,st=E.state.shadowsArray,vt=D.state.version,ft=wt.getParameters(b,D.state,st,B,J,E.state.lightProbeGridArray),Nt=wt.getProgramCacheKey(ft),Ft=P.programs;P.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?B.environment:null,P.fog=B.fog;let Zt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;P.envMap=dt.get(b.envMap||P.environment,Zt),P.envMapRotation=P.environment!==null&&b.envMap===null?B.environmentRotation:b.envMapRotation,Ft===void 0&&(b.addEventListener("dispose",Nn),Ft=new Map,P.programs=Ft);let Jt=Ft.get(Nt);if(Jt!==void 0){if(P.currentProgram===Jt&&P.lightsStateVersion===vt)return ca(b,ft),Jt}else ft.uniforms=wt.getUniforms(b),H!==null&&b.isNodeMaterial&&H.build(b,J,ft),b.onBeforeCompile(ft,I),Jt=wt.acquireProgram(ft,Nt),Ft.set(Nt,Jt),P.uniforms=ft.uniforms;let Tt=P.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Tt.clippingPlanes=kt.uniform),ca(b,ft),P.needsLights=ms(b),P.lightsStateVersion=vt,P.needsLights&&(Tt.ambientLightColor.value=D.state.ambient,Tt.lightProbe.value=D.state.probe,Tt.sunLights.value=D.state.sun,Tt.sunLightShadows.value=D.state.sunShadow,Tt.directionalLights.value=D.state.directional,Tt.directionalLightShadows.value=D.state.directionalShadow,Tt.spotLights.value=D.state.spot,Tt.spotLightShadows.value=D.state.spotShadow,Tt.rectAreaLights.value=D.state.rectArea,Tt.ltc_1.value=D.state.rectAreaLTC1,Tt.ltc_2.value=D.state.rectAreaLTC2,Tt.pointLights.value=D.state.point,Tt.pointLightShadows.value=D.state.pointShadow,Tt.hemisphereLights.value=D.state.hemi,Tt.sunShadowMatrix.value=D.state.sunShadowMatrix,Tt.sunShadowCascade.value=D.state.sunShadowCascade,Tt.directionalShadowMatrix.value=D.state.directionalShadowMatrix,Tt.spotLightMatrix.value=D.state.spotLightMatrix,Tt.spotLightMap.value=D.state.spotLightMap,Tt.pointShadowMatrix.value=D.state.pointShadowMatrix),P.lightProbeGrid=E.state.lightProbeGridArray.length>0,P.currentProgram=Jt,P.uniformsList=null,Jt}function kr(b){if(b.uniformsList===null){let B=b.currentProgram.getUniforms();b.uniformsList=Cr.seqWithValue(B.seq,b.uniforms)}return b.uniformsList}function ca(b,B){let J=Y.get(b);J.outputColorSpace=B.outputColorSpace,J.batching=B.batching,J.batchingColor=B.batchingColor,J.instancing=B.instancing,J.instancingColor=B.instancingColor,J.instancingMorph=B.instancingMorph,J.skinning=B.skinning,J.morphTargets=B.morphTargets,J.morphNormals=B.morphNormals,J.morphColors=B.morphColors,J.morphTargetsCount=B.morphTargetsCount,J.numClippingPlanes=B.numClippingPlanes,J.numIntersection=B.numClipIntersection,J.vertexAlphas=B.vertexAlphas,J.vertexTangents=B.vertexTangents,J.toneMapping=B.toneMapping}function ha(b,B){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;v.setFromMatrixPosition(B.matrixWorld);for(let J=0,P=b.length;J<P;J++){let D=b[J];if(D.texture!==null&&D.boundingBox.containsPoint(v))return D}return null}function Jc(b,B,J,P,D){B.isScene!==!0&&(B=Ht),j.resetTextureUnits();let st=B.fog,vt=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?B.environment:null,ft=nt===null?I.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:ae.workingColorSpace,Nt=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap,Ft=dt.get(P.envMap||vt,Nt),Zt=P.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Jt=!!J.attributes.tangent&&(!!P.normalMap||P.anisotropy>0),Tt=!!J.morphAttributes.position,de=!!J.morphAttributes.normal,Be=!!J.morphAttributes.color,Ee=jn;P.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Ee=I.toneMapping);let ve=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,hn=ve!==void 0?ve.length:0,Bt=Y.get(P),mn=E.state.lights;if(at===!0&&(ht===!0||b!==$)){let Ae=b===$&&P.id===Z;kt.setState(P,b,Ae)}let pe=!1;P.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==mn.state.version||Bt.outputColorSpace!==ft||D.isBatchedMesh&&Bt.batching===!1||!D.isBatchedMesh&&Bt.batching===!0||D.isBatchedMesh&&Bt.batchingColor===!0&&D._colorsTexture===null||D.isBatchedMesh&&Bt.batchingColor===!1&&D._colorsTexture!==null||D.isInstancedMesh&&Bt.instancing===!1||!D.isInstancedMesh&&Bt.instancing===!0||D.isSkinnedMesh&&Bt.skinning===!1||!D.isSkinnedMesh&&Bt.skinning===!0||D.isInstancedMesh&&Bt.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Bt.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Bt.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Bt.instancingMorph===!1&&D.morphTexture!==null||Bt.envMap!==Ft||P.fog===!0&&Bt.fog!==st||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==kt.numPlanes||Bt.numIntersection!==kt.numIntersection)||Bt.vertexAlphas!==Zt||Bt.vertexTangents!==Jt||Bt.morphTargets!==Tt||Bt.morphNormals!==de||Bt.morphColors!==Be||Bt.toneMapping!==Ee||Bt.morphTargetsCount!==hn||!!Bt.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(pe=!0):(pe=!0,Bt.__version=P.version);let Un=Bt.currentProgram;pe===!0&&(Un=pi(P,B,D),H&&P.isNodeMaterial&&H.onUpdateProgram(P,Un,Bt));let ni=!1,Ui=!1,zs=!1,Te=Un.getUniforms(),We=Bt.uniforms;if(x.useProgram(Un.program)&&(ni=!0,Ui=!0,zs=!0),P.id!==Z&&(Z=P.id,Ui=!0),Bt.needsLights){let Ae=ha(E.state.lightProbeGridArray,D);Bt.lightProbeGrid!==Ae&&(Bt.lightProbeGrid=Ae,Ui=!0)}if(ni||$!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Te.setValue(U,"projectionMatrix",b.projectionMatrix),Te.setValue(U,"viewMatrix",b.matrixWorldInverse);let Bi=Te.map.cameraPosition;Bi!==void 0&&Bi.setValue(U,Mt.setFromMatrixPosition(b.matrixWorld)),R.logarithmicDepthBuffer&&Te.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(P.isMeshPhongMaterial||P.isMeshToonMaterial||P.isMeshLambertMaterial||P.isMeshBasicMaterial||P.isMeshStandardMaterial||P.isShaderMaterial)&&Te.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),$!==b&&($=b,Ui=!0,zs=!0)}if(Bt.needsLights&&(mn.state.sunShadowMap.length>0&&Te.setValue(U,"sunShadowMap",mn.state.sunShadowMap,j),mn.state.directionalShadowMap.length>0&&Te.setValue(U,"directionalShadowMap",mn.state.directionalShadowMap,j),mn.state.spotShadowMap.length>0&&Te.setValue(U,"spotShadowMap",mn.state.spotShadowMap,j),mn.state.pointShadowMap.length>0&&Te.setValue(U,"pointShadowMap",mn.state.pointShadowMap,j)),D.isSkinnedMesh){Te.setOptional(U,D,"bindMatrix"),Te.setOptional(U,D,"bindMatrixInverse");let Ae=D.skeleton;Ae&&(Ae.boneTexture===null&&Ae.computeBoneTexture(),Te.setValue(U,"boneTexture",Ae.boneTexture,j))}D.isBatchedMesh&&(Te.setOptional(U,D,"batchingTexture"),Te.setValue(U,"batchingTexture",D._matricesTexture,j),Te.setOptional(U,D,"batchingIdTexture"),Te.setValue(U,"batchingIdTexture",D._indirectTexture,j),Te.setOptional(U,D,"batchingColorTexture"),D._colorsTexture!==null&&Te.setValue(U,"batchingColorTexture",D._colorsTexture,j));let Fi=J.morphAttributes;if((Fi.position!==void 0||Fi.normal!==void 0||Fi.color!==void 0)&&F.update(D,J,Un),(Ui||Bt.receiveShadow!==D.receiveShadow)&&(Bt.receiveShadow=D.receiveShadow,Te.setValue(U,"receiveShadow",D.receiveShadow)),(P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial)&&P.envMap===null&&B.environment!==null&&(We.envMapIntensity.value=B.environmentIntensity),We.dfgLUT!==void 0&&(We.dfgLUT.value=Mv()),Ui){if(Te.setValue(U,"toneMappingExposure",I.toneMappingExposure),Bt.needsLights&&Os(We,zs),st&&P.fog===!0&&Vt.refreshFogUniforms(We,st),Vt.refreshMaterialUniforms(We,P,G,k,E.state.transmissionRenderTarget[b.id]),Bt.needsLights&&Bt.lightProbeGrid){let Ae=Bt.lightProbeGrid;We.probesSH.value=Ae.texture,We.probesMin.value.copy(Ae.boundingBox.min),We.probesMax.value.copy(Ae.boundingBox.max),We.probesResolution.value.copy(Ae.resolution)}Cr.upload(U,kr(Bt),We,j)}if(P.isShaderMaterial&&P.uniformsNeedUpdate===!0&&(Cr.upload(U,kr(Bt),We,j),P.uniformsNeedUpdate=!1),P.isSpriteMaterial&&Te.setValue(U,"center",D.center),Te.setValue(U,"modelViewMatrix",D.modelViewMatrix),Te.setValue(U,"normalMatrix",D.normalMatrix),Te.setValue(U,"modelMatrix",D.matrixWorld),P.uniformsGroups!==void 0){let Ae=P.uniformsGroups;for(let Bi=0,ks=Ae.length;Bi<ks;Bi++){let Au=Ae[Bi];lt.update(Au,Un),lt.bind(Au,Un)}}return Un}function Os(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.sunLights.needsUpdate=B,b.sunLightShadows.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function ms(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(b,B,J){let P=Y.get(b);P.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,P.__autoAllocateDepthBuffer===!1&&(P.__useRenderToTexture=!1),Y.get(b.texture).__webglTexture=B,Y.get(b.depthTexture).__webglTexture=P.__autoAllocateDepthBuffer?void 0:J,P.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,B){let J=Y.get(b);J.__webglFramebuffer=B,J.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(b,B=0,J=0){nt=b,X=B,q=J;let P=null,D=!1,st=!1;if(b){let ft=Y.get(b);if(ft.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(U.FRAMEBUFFER,ft.__webglFramebuffer),et.copy(b.viewport),Ut.copy(b.scissor),bt=b.scissorTest,x.viewport(et),x.scissor(Ut),x.setScissorTest(bt),Z=-1;return}else if(ft.__webglFramebuffer===void 0)j.setupRenderTarget(b);else if(ft.__hasExternalTextures)j.rebindTextures(b,Y.get(b.texture).__webglTexture,Y.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Zt=b.depthTexture;if(ft.__boundDepthTexture!==Zt){if(Zt!==null&&Y.has(Zt)&&(b.width!==Zt.image.width||b.height!==Zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(b)}}let Nt=b.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(st=!0);let Ft=Y.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ft[B])?P=Ft[B][J]:P=Ft[B],D=!0):b.samples>0&&j.useMultisampledRTT(b)===!1?P=Y.get(b).__webglMultisampledFramebuffer:Array.isArray(Ft)?P=Ft[J]:P=Ft,et.copy(b.viewport),Ut.copy(b.scissor),bt=b.scissorTest}else et.copy(ct).multiplyScalar(G).floor(),Ut.copy(gt).multiplyScalar(G).floor(),bt=qt;if(J!==0&&(P=V),x.bindFramebuffer(U.FRAMEBUFFER,P)&&x.drawBuffers(b,P),x.viewport(et),x.scissor(Ut),x.setScissorTest(bt),D){let ft=Y.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+B,ft.__webglTexture,J)}else if(st){let ft=B;for(let Nt=0;Nt<b.textures.length;Nt++){let Ft=Y.get(b.textures[Nt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Nt,Ft.__webglTexture,J,ft)}}else if(b!==null&&J!==0){let ft=Y.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ft.__webglTexture,J)}Z=-1};function Hs(b){let B=Y.get(b);return(B.__readFormat!==b.format||B.__readType!==b.type)&&(B.__readFormat=b.format,B.__readType=b.type,B.__formatReadable=R.textureFormatReadable(b.format),B.__typeReadable=R.textureTypeReadable(b.type)),B}this.readRenderTargetPixels=function(b,B,J,P,D,st,vt,ft=0){if(!(b&&b.isWebGLRenderTarget)){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=Y.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&vt!==void 0&&(Nt=Nt[vt]),Nt){x.bindFramebuffer(U.FRAMEBUFFER,Nt);try{let Ft=b.textures[ft],Zt=Ft.format,Jt=Ft.type;b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ft);let Tt=Hs(Ft);if(Tt.__formatReadable===!1){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Tt.__typeReadable===!1){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-P&&J>=0&&J<=b.height-D&&U.readPixels(B,J,P,D,Rt.convert(Zt),Rt.convert(Jt),st)}finally{let Ft=nt!==null?Y.get(nt).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(b,B,J,P,D,st,vt,ft=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=Y.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&vt!==void 0&&(Nt=Nt[vt]),Nt)if(B>=0&&B<=b.width-P&&J>=0&&J<=b.height-D){x.bindFramebuffer(U.FRAMEBUFFER,Nt);let Ft=b.textures[ft],Zt=Ft.format,Jt=Ft.type;b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ft);let Tt=Hs(Ft);if(Tt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Tt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let de=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,de),U.bufferData(U.PIXEL_PACK_BUFFER,st.byteLength,U.STREAM_READ),U.readPixels(B,J,P,D,Rt.convert(Zt),Rt.convert(Jt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Be=nt!==null?Y.get(nt).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,Be);let Ee=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Gd(U,Ee,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,de),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,st),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(de),U.deleteSync(Ee),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,B=null,J=0){let P=Math.pow(2,-J),D=Math.floor(b.image.width*P),st=Math.floor(b.image.height*P),vt=B!==null?B.x:0,ft=B!==null?B.y:0;j.setTexture2D(b,0),U.copyTexSubImage2D(U.TEXTURE_2D,J,0,0,vt,ft,D,st),x.unbindTexture()},this.copyTextureToTexture=function(b,B,J=null,P=null,D=0,st=0){let vt,ft,Nt,Ft,Zt,Jt,Tt,de,Be,Ee=b.isCompressedTexture?b.mipmaps[st]:b.image;if(J!==null)vt=J.max.x-J.min.x,ft=J.max.y-J.min.y,Nt=J.isBox3?J.max.z-J.min.z:1,Ft=J.min.x,Zt=J.min.y,Jt=J.isBox3?J.min.z:0;else{let We=Math.pow(2,-D);vt=Math.floor(Ee.width*We),ft=Math.floor(Ee.height*We),b.isDataArrayTexture?Nt=Ee.depth:b.isData3DTexture?Nt=Math.floor(Ee.depth*We):Nt=1,Ft=0,Zt=0,Jt=0}P!==null?(Tt=P.x,de=P.y,Be=P.z):(Tt=0,de=0,Be=0);let ve=Rt.convert(B.format),hn=Rt.convert(B.type),Bt;B.isData3DTexture?(j.setTexture3D(B,0),Bt=U.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(j.setTexture2DArray(B,0),Bt=U.TEXTURE_2D_ARRAY):(j.setTexture2D(B,0),Bt=U.TEXTURE_2D),x.activeTexture(U.TEXTURE0),x.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),x.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),x.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);let mn=x.getParameter(U.UNPACK_ROW_LENGTH),pe=x.getParameter(U.UNPACK_IMAGE_HEIGHT),Un=x.getParameter(U.UNPACK_SKIP_PIXELS),ni=x.getParameter(U.UNPACK_SKIP_ROWS),Ui=x.getParameter(U.UNPACK_SKIP_IMAGES);x.pixelStorei(U.UNPACK_ROW_LENGTH,Ee.width),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ee.height),x.pixelStorei(U.UNPACK_SKIP_PIXELS,Ft),x.pixelStorei(U.UNPACK_SKIP_ROWS,Zt),x.pixelStorei(U.UNPACK_SKIP_IMAGES,Jt);let zs=b.isDataArrayTexture||b.isData3DTexture,Te=B.isDataArrayTexture||B.isData3DTexture;if(b.isDepthTexture){let We=Y.get(b),Fi=Y.get(B),Ae=Y.get(We.__renderTarget),Bi=Y.get(Fi.__renderTarget);x.bindFramebuffer(U.READ_FRAMEBUFFER,Ae.__webglFramebuffer),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let ks=0;ks<Nt;ks++)zs&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Y.get(b).__webglTexture,D,Jt+ks),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Y.get(B).__webglTexture,st,Be+ks)),U.blitFramebuffer(Ft,Zt,vt,ft,Tt,de,vt,ft,U.DEPTH_BUFFER_BIT,U.NEAREST);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(D!==0||b.isRenderTargetTexture||Y.has(b)){let We=Y.get(b),Fi=Y.get(B);x.bindFramebuffer(U.READ_FRAMEBUFFER,L),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,O);for(let Ae=0;Ae<Nt;Ae++)zs?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,We.__webglTexture,D,Jt+Ae):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,We.__webglTexture,D),Te?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Fi.__webglTexture,st,Be+Ae):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Fi.__webglTexture,st),D!==0?U.blitFramebuffer(Ft,Zt,vt,ft,Tt,de,vt,ft,U.COLOR_BUFFER_BIT,U.NEAREST):Te?U.copyTexSubImage3D(Bt,st,Tt,de,Be+Ae,Ft,Zt,vt,ft):U.copyTexSubImage2D(Bt,st,Tt,de,Ft,Zt,vt,ft);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Te?b.isDataTexture||b.isData3DTexture?U.texSubImage3D(Bt,st,Tt,de,Be,vt,ft,Nt,ve,hn,Ee.data):B.isCompressedArrayTexture?U.compressedTexSubImage3D(Bt,st,Tt,de,Be,vt,ft,Nt,ve,Ee.data):U.texSubImage3D(Bt,st,Tt,de,Be,vt,ft,Nt,ve,hn,Ee):b.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,st,Tt,de,vt,ft,ve,hn,Ee.data):b.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,st,Tt,de,Ee.width,Ee.height,ve,Ee.data):U.texSubImage2D(U.TEXTURE_2D,st,Tt,de,vt,ft,ve,hn,Ee);x.pixelStorei(U.UNPACK_ROW_LENGTH,mn),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,pe),x.pixelStorei(U.UNPACK_SKIP_PIXELS,Un),x.pixelStorei(U.UNPACK_SKIP_ROWS,ni),x.pixelStorei(U.UNPACK_SKIP_IMAGES,Ui),st===0&&B.generateMipmaps&&U.generateMipmap(Bt),x.unbindTexture()},this.initRenderTarget=function(b){Y.get(b).__webglFramebuffer===void 0&&j.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?j.setTextureCube(b,0):b.isData3DTexture?j.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?j.setTexture2DArray(b,0):j.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){X=0,q=0,nt=null,x.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}};var ze=new URLSearchParams(location.search),ss=ze.get("q")==="low"?"low":"high",Sv={high:{maxDpr:1.5,renderScale:1,seaRadial:300,seaAngular:512,rainNear:2e4,rainFar:14e3,sprayMax:7e3,cityBuildings:9500,cityLights:5200,bloom:!0,msaa:4,cubeRes:256,envEvery:3,cloudOct:5,seaOct:7,birds:16,ripples:!0,lowClouds:5,shadows:!1},low:{maxDpr:1,renderScale:.7,seaRadial:160,seaAngular:256,rainNear:7e3,rainFar:4e3,sprayMax:700,cityBuildings:3200,cityLights:1800,bloom:!1,msaa:0,cubeRes:128,envEvery:4,cloudOct:3,seaOct:5,birds:8,ripples:!1,lowClouds:3,shadows:!1}},ye=Sv[ss],Lr=60,Rf=10,Cf={platformY:4.2,lanternY:20,topY:30.5},Pf=Number(ze.get("seed"))||1453;var If=new W(.7071,-.7071),jo=.8,bv=9.81,Lf=[[0,72,1],[16,44,.75],[-24,27,.5],[38,16,.3],[-52,9,.17],[66,5,.09],[-12,2.7,.05]],_u=Lf.length,rs=Lf.map(([i,t,e])=>{let n=Math.atan2(If.y,If.x)+Ue.degToRad(i),s=2*Math.PI/t;return{dx:Math.cos(n),dz:Math.sin(n),L:t,k:s,w:Math.sqrt(bv*s),ar:e}}),os={amp:.4,steep:.6,time:0},xu=`
#define NW ${_u}
const vec4 WV[NW] = vec4[NW](
${rs.map(i=>`  vec4(${i.dx.toFixed(5)}, ${i.dz.toFixed(5)}, ${i.k.toFixed(6)}, ${i.ar.toFixed(4)})`).join(`,
`)}
);
const float WW[NW] = float[NW](${rs.map(i=>i.w.toFixed(5)).join(", ")});
uniform float uAmp;
uniform float uSteep;
uniform float uWaveTime;

// Yatay kayma + y\xFCkseklik
vec3 gerstnerDisp(vec2 p){
  vec3 d = vec3(0.0);
  for (int i = 0; i < NW; i++) {
    float k = WV[i].z, a = WV[i].w * uAmp;
    float Q = min(1.0, uSteep / (float(NW) * k * a + 1e-4));
    float f = k * dot(WV[i].xy, p) - WW[i] * uWaveTime;
    float c = cos(f), s = sin(f);
    d.x += Q * a * WV[i].x * c;
    d.z += Q * a * WV[i].y * c;
    d.y += a * s;
  }
  return d;
}
`;function Ev(i){let t=rs[i],e=t.ar*os.amp;return Math.min(1,os.steep/(_u*t.k*e+1e-4))}function Tv(i,t,e,n){let s=0,r=0,o=0;for(let a=0;a<_u;a++){let l=rs[a],c=l.ar*os.amp,h=Ev(a),f=l.k*(l.dx*i+l.dz*t)-l.w*e,u=Math.cos(f);s+=h*c*l.dx*u,r+=h*c*l.dz*u,o+=c*Math.sin(f)}return n.x=s,n.y=o,n.z=r,n}var pc=new A;function En(i,t,e){let n=e*jo,s=i,r=t;for(let o=0;o<3;o++)Tv(s,r,n,pc),s=i-pc.x,r=t-pc.z;return pc.y}var Qo=(i,t)=>ze.has(i)?Number(ze.get(i)):t,Lt={time:0,dt:.016,storm:Qo("storm",.8),stormSmooth:Qo("storm",.8),day:Qo("day",0),daySmooth:Qo("day",0),rain:.8,wind:12,gust:0,wave:{amp:.6,steep:.6},waveTimeScale:jo,lampWorld:[],camMode:ze.get("free")?"free":"cinematic",camTime:Qo("t",0),uiHidden:!1,photoMode:!1,soundOn:!1,showFps:ze.get("fps")!=="0",camHold:!1,renderH:1080};var we=i=>({value:i}),Pt={uTime:we(0),uStorm:we(.75),uDay:we(0),uFlash:we(0),uFlashDir:we(new A(0,1,0)),uFlashGlow:we(0),uZenith:we(new _t(.01,.015,.03)),uHorizon:we(new _t(.03,.05,.09)),uFogColor:we(new _t(.03,.05,.09)),uFogDensity:we(8e-4),uSunDir:we(new A(1,-.3,-.2).normalize()),uSunColor:we(new _t(1,.5,.3)),uSunAmt:we(0),uMoonDir:we(new A(.93,.21,-.3).normalize()),uMoonAmt:we(1),uCover:we(.8),uWind:we(new W(6,-6)),uCamPos:we(new A),uLanternPos:we(new A(0,20,0)),uBeamDir1:we(new A(1,-.02,0)),uBeamDir2:we(new A(-1,-.02,0)),uBeamAmt:we(1),uBeamHalf:we(.05),uBeamAtten:we(6e-4),uRes:we(new W(1920,1080)),uNightLights:we(1),uAmbient:we(new _t(.1,.12,.2))},Df=`
uniform float uTime, uStorm, uDay, uFlash, uFlashGlow, uSunAmt, uMoonAmt, uCover, uFogDensity;
uniform float uBeamAmt, uBeamHalf, uBeamAtten, uNightLights;
uniform vec3 uFlashDir, uZenith, uHorizon, uFogColor, uSunDir, uSunColor, uMoonDir, uCamPos, uLanternPos, uBeamDir1, uBeamDir2, uAmbient;
uniform vec2 uWind, uRes;
`;function Ve(i){return function(){i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function as(i,t,e){let n=Math.imul(i,374761393)+Math.imul(t,668265263)+Math.imul(e,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}var mc=i=>i*i*(3-2*i);function vu(i,t,e,n,s=0){let r=Math.floor(i),o=Math.floor(t),a=mc(i-r),l=mc(t-o),c=(r%e+e)%e,h=(c+1)%e,f=(o%n+n)%n,u=(f+1)%n,d=as(c,f,s),g=as(h,f,s),_=as(c,u,s),m=as(h,u,s);return d+(g-d)*a+(_-d)*l+(d-g-_+m)*a*l}function ui(i,t,e,n=5,s=0,r=.5){let o=0,a=.5,l=1,c=0;for(let h=0;h<n;h++)o+=a*vu(i*l,t*l,e*l,e*l,s+h*17),c+=a,a*=r,l*=2;return o/c}function wv(i,t,e=0){let n=Math.floor(i),s=Math.floor(t),r=mc(i-n),o=mc(t-s),a=as(n,s,e),l=as(n+1,s,e),c=as(n,s+1,e),h=as(n+1,s+1,e);return a+(l-a)*r+(c-a)*o+(a-l-c+h)*r*o}function Tn(i,t,e=4,n=0){let s=0,r=.5,o=0;for(let a=0;a<e;a++)s+=r*wv(i,t,n+a*31),o+=r,i=i*2.03+11.7,t=t*2.03+3.1,r*=.5;return s/o}var Ie=(i,t,e)=>Math.min(e,Math.max(t,i)),wn=(i,t,e)=>i+(t-i)*e,ti=(i,t,e)=>{let n=Ie((e-i)/(t-i),0,1);return n*n*(3-2*n)};var ta=[{d:0,z:[.004,.008,.022],h:[.02,.03,.058]},{d:.5,z:[.01,.022,.062],h:[.06,.09,.15]},{d:.8,z:[.022,.042,.12],h:[.3,.135,.105]},{d:1,z:[.06,.105,.23],h:[.68,.32,.15]}],Av=new _t,Rv=new _t;function Nf(i,t,e){i=Ie(i,0,1);for(let s=0;s<ta.length-1;s++){let r=ta[s],o=ta[s+1];if(i<=o.d){let a=(i-r.d)/(o.d-r.d),l=a*a*(3-2*a);return e.setRGB(wn(r[t][0],o[t][0],l),wn(r[t][1],o[t][1],l),wn(r[t][2],o[t][2],l)),e}}let n=ta[ta.length-1][t];return e.setRGB(n[0],n[1],n[2])}var gc=class{constructor(t,e){this.renderer=t,this.scene=e,e.fog=new co(1054752,8e-4),this.hemi=new vr(2767462,395276,.6),this.moon=new ws(9414399,.4),this.sun=new ws(16751194,0),this.flashLight=new ws(12374271,0),this.flashHemi=new vr(11190527,4212848,0),e.add(this.hemi,this.moon,this.sun,this.flashLight,this.flashHemi),this.cubeRT=new Pr(ye.cubeRes,{type:He,generateMipmaps:!0,minFilter:kn}),this.cube=new Mr(1,3e4,this.cubeRT),this.cube.layers.set(1),this.cube.position.set(0,3,0),e.add(this.cube),this.frame=0,this.gustPhase=0}update(t,e){let n=Lt;n.stormSmooth+=(n.storm-n.stormSmooth)*Math.min(1,t*1.6),n.daySmooth+=(n.day-n.daySmooth)*Math.min(1,t*1.6);let s=n.stormSmooth,r=n.daySmooth;Pt.uTime.value=e,Pt.uStorm.value=s,Pt.uDay.value=r;let o=wn(2,26,Math.pow(s,.9));n.gust=.5+.5*Math.sin(e*.37)*Math.sin(e*.91+1.3)+.25*Math.sin(e*2.3),n.wind=o*(.8+.4*n.gust),Pt.uWind.value.set(.7071*n.wind,-.7071*n.wind),n.rain=Ie((s-.12)/.75,0,1),os.amp=wn(.05,1.12,Math.pow(s,1.3))*(.95+.1*n.gust),os.steep=wn(.45,1,s),n.wave.amp=os.amp,n.wave.steep=os.steep,Nf(r,"z",Pt.uZenith.value),Nf(r,"h",Pt.uHorizon.value);let a=Pt.uZenith.value,l=Pt.uHorizon.value;for(let[g,_]of[[a,.42],[l,.72]]){let m=g.r*.3+g.g*.5+g.b*.2,p=Av.setRGB(m*.9,m*1.05,m*1.3);g.lerp(p,s*(.55-.25*r)),g.multiplyScalar(1-_*s*.5)}Pt.uFogColor.value.copy(l).multiplyScalar(.92);let c=Pt.uFlash.value;Pt.uFogColor.value.r+=.03*c,Pt.uFogColor.value.g+=.042*c,Pt.uFogColor.value.b+=.075*c,Pt.uFogDensity.value=wn(22e-5,.00115,Math.pow(s,.8));let h=Ue.degToRad(wn(-34,4,ti(.3,1,r)));Pt.uSunDir.value.set(Math.cos(h)*.94,Math.sin(h),-Math.cos(h)*.34).normalize(),Pt.uSunAmt.value=ti(.4,1,r)*(1-.3*s),Pt.uSunColor.value.setRGB(1,.56+.1*r,.3+.1*r),Pt.uMoonAmt.value=(1-ti(.35,.85,r))*(1-.15*s),Pt.uCover.value=wn(.34,.9,Math.pow(s,.75)),Pt.uNightLights.value=1-ti(.65,1,r)*.75;let f=Pt.uFlash.value,u=Rv.copy(l).lerp(a,.55);Pt.uAmbient.value.copy(u),this.hemi.color.copy(a).lerp(l,.3).multiplyScalar(1.4).addScalar(.03),this.hemi.groundColor.copy(l).multiplyScalar(.25).addScalar(.012),this.hemi.intensity=1+r*1.6,this.scene.fog.color.copy(Pt.uFogColor.value),this.scene.fog.density=Pt.uFogDensity.value;let d=Pt.uMoonDir.value;this.moon.position.copy(d).multiplyScalar(300),this.moon.intensity=.55*Pt.uMoonAmt.value*(1-.65*s),this.moon.color.setRGB(.55,.68,1),this.sun.position.copy(Pt.uSunDir.value).multiplyScalar(300),this.sun.intensity=ti(.55,1,r)*2.4*(1-.6*s),this.sun.color.copy(Pt.uSunColor.value),this.flashLight.position.copy(Pt.uFlashDir.value).multiplyScalar(300),this.flashLight.position.y+=200,this.flashLight.intensity=f*5,this.flashHemi.intensity=f*3.2}renderCube(){this.frame++,(this.frame%ye.envEvery===0||Pt.uFlash.value>.05)&&this.cube.update(this.renderer,this.scene)}};var rn=Df,Pi=`
float hash21(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hash11(float p){ p = fract(p * .1031); p *= p + 33.33; p *= p + p; return fract(p); }
vec2 hash22(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash21(i), hash21(i+vec2(1.,0.)), f.x), mix(hash21(i+vec2(0.,1.)), hash21(i+vec2(1.,1.)), f.x), f.y);
}
float fbmN(vec2 p, int oct){
  float a = 0.5, s = 0.0, n = 0.0;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i = 0; i < 6; i++){
    if(i >= oct) break;
    s += a * vnoise(p); n += a; p = m * p; a *= 0.5;
  }
  return s / n;
}
`,di=`
float coneLit(vec3 P, vec3 dir){
  vec3 r = P - uLanternPos;
  float s = dot(r, dir);
  if (s < 4.0) return 0.0;
  float perp = length(r - dir * s);
  float rad = 1.0 + s * uBeamHalf;
  float k = 1.0 - smoothstep(0.0, 1.0, perp / rad);
  return k * k * exp(-s * uBeamAtten) * smoothstep(4.0, 40.0, s) * (1.0 / (1.0 + s * 0.0028));
}
float beamLit(vec3 P){ return uBeamAmt * (coneLit(P, uBeamDir1) + 0.55 * coneLit(P, uBeamDir2)); }
`;var Cv=`
varying vec3 vDir;
void main(){
  vDir = position;
  vec4 p = projectionMatrix * mat4(mat3(viewMatrix)) * vec4(position, 1.0);
  gl_Position = p.xyww; // en arkada
}
`,Pv=`
${rn}
${Pi}
uniform vec3 uFlashDir2;
uniform float uCloudOct;
varying vec3 vDir;

float starField(vec3 d){
  vec2 uv = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0)));
  uv *= vec2(1400.0 / 6.2831853, 1400.0 / 6.2831853);
  vec2 id = floor(uv);
  vec2 f = fract(uv) - 0.5;
  float h = hash21(id);
  vec2 o = (hash22(id + 7.0) - 0.5) * 0.7;
  float r = length(f - o);
  float bright = step(0.978, h) * (0.35 + 0.65 * hash21(id + 3.0));
  float tw = 0.75 + 0.25 * sin(uTime * (1.0 + 3.0 * hash21(id + 5.0)) + h * 40.0);
  return bright * tw * smoothstep(0.24, 0.0, r);
}

void main(){
  vec3 d = normalize(vDir);
  float y = d.y;
  float ay = max(y, 0.0);

  // temel gradyan
  vec3 col = mix(uHorizon, uZenith, pow(ay, 0.42));
  if (y < 0.0) col = uHorizon;

  // \u015Fafak: g\xFCne\u015Fin do\u011Fdu\u011Fu y\xF6n (do\u011Fu)
  float sd = max(dot(d, normalize(uSunDir)), 0.0);
  float horizonBand = exp(-ay * 6.0);
  col += uSunColor * uSunAmt * (0.42 * pow(sd, 3.0) * horizonBand + 0.30 * pow(sd, 12.0) + 0.9 * pow(sd, 140.0));

  // y\u0131ld\u0131zlar (bulut arkas\u0131nda kal\u0131r)
  float clearSky = 1.0 - smoothstep(0.2, 0.8, uCover);
  vec3 stars = vec3(0.75, 0.82, 1.0) * starField(d) * smoothstep(0.02, 0.3, y) * (1.0 - uDay * 1.1) * 1.4 * (0.05 + 0.95 * clearSky);

  // ay
  float md = dot(d, normalize(uMoonDir));
  vec3 moon = vec3(0.0);
  if (uMoonAmt > 0.001) {
    float disc = smoothstep(0.99972, 0.99982, md);
    // kraterli g\xF6r\xFCn\xFCm
    float cr = fbmN(d.xz * 260.0 + d.y * 90.0, 3);
    moon = vec3(0.95, 0.96, 1.0) * disc * (0.7 + 0.5 * cr) * 3.0;
    moon += vec3(0.4, 0.5, 0.75) * (pow(max(md, 0.0), 300.0) * 0.5 + pow(max(md, 0.0), 40.0) * 0.06);
    moon *= uMoonAmt * smoothstep(0.0, 0.05, y);
  }

  // ---- bulutlar ----
  vec2 cp = d.xz / (ay + 0.16);
  vec2 wind = uWind * uTime * 0.0011;
  int oct = int(uCloudOct);
  float base = fbmN(cp * 0.30 + wind, oct);
  float det = fbmN(cp * 1.15 + wind * 2.2 + base * 1.6, oct);
  float dens = base * 0.62 + det * 0.5;
  float thr = 1.12 - uCover * 0.88;
  float a = smoothstep(thr - 0.06, thr + 0.16, dens);
  // yatay bulut yap\u0131s\u0131 ufka yakla\u015Ft\u0131k\xE7a yo\u011Funla\u015Fs\u0131n (bulut duvar\u0131)
  a = clamp(a + (1.0 - smoothstep(0.0, 0.22, ay)) * uCover * 0.5, 0.0, 1.0);
  // \u0131\u015F\u0131k taraf\u0131na k\xFC\xE7\xFCk kayma ile g\xF6lgelendirme
  vec2 toL = normalize(uSunDir.xz + 1e-3) * 0.35;
  float dl = fbmN(cp * 0.30 + wind + toL, oct);
  float lit = clamp(0.55 + (base - dl) * 3.2, 0.0, 1.0);
  float thick = smoothstep(thr, thr + 0.5, dens);
  vec3 cDark = vec3(0.008, 0.010, 0.016) + uHorizon * 0.10;
  vec3 cLit = vec3(0.055, 0.062, 0.085) + uHorizon * 0.45 + uZenith * 0.5;
  vec3 cloud = mix(cDark, cLit, lit * (1.0 - 0.55 * thick));
  // \u015Fafak/ay g\xFCm\xFC\u015F\xFC kenar
  cloud += uSunColor * uSunAmt * (pow(sd, 4.0) * lit * 0.5 + pow(sd, 18.0) * 0.45) * (0.4 + 0.6 * (1.0 - thick));
  cloud += vec3(0.5, 0.6, 0.9) * uMoonAmt * (pow(max(md, 0.0), 12.0) * 0.16 + pow(max(md, 0.0), 5.0) * 0.05) * (1.0 - thick * 0.75) * (1.0 - uStorm * 0.35);
  // \u015Fim\u015Fek: bulutun i\xE7ten ayd\u0131nlanmas\u0131
  float fd = max(dot(d, normalize(uFlashDir)), 0.0);
  float glow = pow(fd, 5.0) * uFlashGlow;
  vec3 flashCol = vec3(0.62, 0.72, 1.0);
  float inner = (0.3 + 0.7 * (1.0 - thick * 0.5)) * (0.4 + 0.6 * lit);
  cloud += flashCol * uFlash * (0.10 + 0.32 * inner) * (0.5 + 1.8 * glow);
  // g\xF6ky\xFCz\xFC bo\u015Flu\u011Fu da parlar
  col += flashCol * uFlash * (0.2 + 1.2 * glow) * 0.14;

  vec3 sky = col + stars * (1.0 - a) + moon * (1.0 - a * 0.94);
  vec3 fin = mix(sky, cloud, a * smoothstep(-0.02, 0.06, y));
  // ufuk hatt\u0131n\u0131 sise kar\u0131\u015Ft\u0131r
  fin = mix(uFogColor, fin, smoothstep(-0.005, 0.07, y) * 0.9 + 0.1 * step(0.0, y));
  if (y < 0.0) fin = uFogColor;
  gl_FragColor = vec4(fin, 1.0);
}
`,Iv=`
varying vec3 vWorld;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,Lv=`
${rn}
${Pi}
${di}
uniform float uLayerH, uScale, uSpeed, uAlpha, uSeed, uThickness;
uniform vec3 uTint;
uniform int uOct;
varying vec3 vWorld;
void main(){
  vec3 toP = vWorld - uCamPos;
  float dist = length(toP);
  // hareket: r\xFCzg\xE2r y\xF6n\xFCnde ak\u0131\u015F
  vec2 wp = vWorld.xz * uScale + uWind * uTime * uSpeed * 0.02 + vec2(uSeed * 13.1, uSeed * 7.7);
  float n = fbmN(wp, uOct);
  float n2 = fbmN(wp * 2.7 + n * 1.5 + uTime * 0.01, uOct);
  float dens = n * 0.7 + n2 * 0.45;
  float a = smoothstep(0.42 + (1.0 - uStorm) * 0.16, 0.9, dens) * uAlpha * (0.3 + 0.7 * uStorm);
  // yak\u0131n ve uzak yumu\u015Fatma
  a *= smoothstep(20.0, 140.0, dist) * (1.0 - smoothstep(2200.0, 5200.0, dist));
  float dy = abs(uCamPos.y - uLayerH);
  a *= smoothstep(0.0, uThickness, dy);
  // ayd\u0131nlatma
  float bl = beamLit(vWorld);
  vec3 lightCol = uTint * (0.35 + 1.6 * length(uAmbient)) + uHorizon * 0.55;
  lightCol += vec3(0.55, 0.65, 1.0) * uFlash * 1.5;
  lightCol += vec3(1.0, 0.86, 0.6) * bl * 14.0;
  lightCol += uSunColor * uSunAmt * 0.8;
  vec3 col = mix(lightCol, uFogColor, 1.0 - exp(-pow(dist * uFogDensity * 0.6, 1.4)) * 0.85);
  gl_FragColor = vec4(col, a);
}
`,_c=class{constructor(){let t=new qe(1,48,32);this.skyMat=new re({uniforms:{...Pt,uFlashDir2:{value:new A},uCloudOct:{value:ye.cloudOct}},vertexShader:Cv,fragmentShader:Pv,side:ln,depthWrite:!1,depthTest:!1}),this.dome=new pt(t,this.skyMat),this.dome.frustumCulled=!1,this.dome.renderOrder=-1e3,this.dome.scale.setScalar(1e3),this.dome.layers.enable(1),this.dome.name="sky",this.low=new Re;let e=[{h:4.5,scale:.01,speed:.55,alpha:.32,thick:3,tint:[.32,.36,.42],seed:1},{h:15,scale:.0075,speed:.8,alpha:.3,thick:6,tint:[.3,.34,.4],seed:2},{h:70,scale:.0042,speed:1.4,alpha:.62,thick:25,tint:[.16,.18,.23],seed:3},{h:135,scale:.0031,speed:1.9,alpha:.7,thick:30,tint:[.14,.16,.21],seed:4},{h:230,scale:.0022,speed:2.4,alpha:.75,thick:40,tint:[.12,.14,.19],seed:5}].slice(0,ye.lowClouds);this.layers=[];for(let n of e){let s=new re({uniforms:{...Pt,uLayerH:{value:n.h},uScale:{value:n.scale},uSpeed:{value:n.speed},uAlpha:{value:n.alpha},uSeed:{value:n.seed},uThickness:{value:n.thick},uTint:{value:new _t(...n.tint)},uOct:{value:ye.cloudOct>=5?4:3}},vertexShader:Iv,fragmentShader:Lv,transparent:!0,depthWrite:!1,side:Pe}),r=new pt(new yn(1,1,1,1).rotateX(-Math.PI/2),s);r.scale.setScalar(9e3),r.position.y=n.h,r.renderOrder=3,r.frustumCulled=!1,this.low.add(r),this.layers.push(r)}}update(t){this.dome.position.copy(t);for(let e of this.layers)e.position.x=t.x,e.position.z=t.z}};function Ii(i,t){let e=document.createElement("canvas");return e.width=i,e.height=t,e}function ls(i,t=!0){let e=new Xi(i);return e.wrapS=e.wrapT=Zn,e.anisotropy=8,t&&(e.colorSpace=tn),e.needsUpdate=!0,e}function yu(i=1024,t=7,e={}){let n=Ve(t),s=e.base||[196,178,142],r=Ii(i,i),o=Ii(i,i),a=r.getContext("2d"),l=o.getContext("2d");a.fillStyle=`rgb(${s})`,a.fillRect(0,0,i,i),l.fillStyle="#9a9a9a",l.fillRect(0,0,i,i);let c=e.rows||14,h=i/c;for(let g=0;g<c;g++){let _=-n()*200,m=g*h,p=h;for(;_<i;){let M=95+n()*110,S=(n()-.5)*46,v=(n()-.5)*12;a.fillStyle=`rgb(${s[0]+S+v},${s[1]+S},${s[2]+S-v})`,a.fillRect(_,m,M,p);let T=150+n()*60;l.fillStyle=`rgb(${T},${T},${T})`,l.fillRect(_,m,M,p),a.fillStyle="rgba(52,44,34,0.92)",a.fillRect(_,m,M,5),a.fillRect(_,m,5,p),l.fillStyle="#202020",l.fillRect(_,m,M,4),l.fillRect(_,m,4,p),_+=M}}let f=a.getImageData(0,0,i,i),u=l.getImageData(0,0,i,i),d=8;for(let g=0;g<i;g++)for(let _=0;_<i;_++){let m=(g*i+_)*4,p=ui(_/i*d*2,g/i*d*2,d*2,4,3),M=vu(_/i*64,g/i*4,64,4,9),S=Ie((M-.6)*1.6,0,1)*Ie(p*1.2-.2,0,1),v=.78+p*.4-S*.42;f.data[m]*=v,f.data[m+1]*=v*(1-S*.02),f.data[m+2]*=v*(1+S*.03);let T=.75+p*.5;u.data[m]*=T,u.data[m+1]*=T,u.data[m+2]*=T}return a.putImageData(f,0,0),l.putImageData(u,0,0),{map:ls(r),bump:ls(o,!1)}}function Uf(i=1024,t=21){let e=Ii(i,i),n=Ii(i,i),s=e.getContext("2d"),r=n.getContext("2d"),o=s.createImageData(i,i),a=r.createImageData(i,i),l=6;for(let c=0;c<i;c++)for(let h=0;h<i;h++){let f=h/i*l,u=c/i*l,d=ui(f,u,l,6,t),g=1-Math.abs(ui(f*1.7,u*1.7,l*1.7|0||l,4,t+5)-.5)*2,_=Math.pow(Ie(g,0,1),6),m=Ie((ui(f*.8,u*.8,l,3,t+9)-.55)*3,0,1),p=92+d*92,M=88+d*86,S=84+d*80;p=p*(1-m*.35)+20*m,M=M*(1-m*.1)+38*m,S=S*(1-m*.4)+12*m;let v=1-_*.6,T=(c*i+h)*4;o.data[T]=p*v,o.data[T+1]=M*v,o.data[T+2]=S*v,o.data[T+3]=255;let E=(d*.8+.2)*255*(1-_*.5);a.data[T]=a.data[T+1]=a.data[T+2]=E,a.data[T+3]=255}return s.putImageData(o,0,0),r.putImageData(a,0,0),{map:ls(e),bump:ls(n,!1)}}function Ff(i=512){let t=Ii(i,i),e=t.getContext("2d"),n=e.createImageData(i,i),s=24;for(let o=0;o<i;o++)for(let a=0;a<i;a++){let l=ui(a/i*12,o/i*12,12,5,44),c=a/i*s%1,h=c<.045?1:0,f=o/i*10%1<.02?1:0,u=78+l*42-h*34+(c>.045&&c<.09?14:0)-f*16,d=(o*i+a)*4;n.data[d]=u*.86,n.data[d+1]=u*.94,n.data[d+2]=u*1.02+6,n.data[d+3]=255}return e.putImageData(n,0,0),ls(t)}function Bf(i=512){let t=Ii(i,i),e=t.getContext("2d"),n=Ve(5);e.fillStyle="#8b8677",e.fillRect(0,0,i,i);let s=8,r=i/s;for(let a=0;a<s;a++)for(let l=0;l<s;l++){let c=(n()-.5)*30;e.fillStyle=`rgb(${140+c},${134+c},${118+c})`,e.fillRect(l*r+2,a*r+2,r-4,r-4)}let o=e.getImageData(0,0,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){let c=.7+ui(l/i*16,a/i*16,16,4,71)*.6,h=(a*i+l)*4;o.data[h]*=c,o.data[h+1]*=c,o.data[h+2]*=c}return e.putImageData(o,0,0),ls(t)}function Of(i=512){let t=new Uint8Array(i*i*4),e=8,n=new Float32Array(i*i),s=new Float32Array(i*i);for(let o=0;o<i;o++)for(let a=0;a<i;a++){let l=a/i*e,c=o/i*e,h=ui(l,c,e,5,101),f=1-Math.abs(h-.5)*2;n[o*i+a]=f*.65+ui(l*2,c*2,e*2,3,55)*.35,s[o*i+a]=ui(l*2,c*2,e*2,5,909)}for(let o=0;o<i;o++)for(let a=0;a<i;a++){let l=o*i+a,c=n[o*i+(a+1)%i]-n[o*i+(a-1+i)%i],h=n[(o+1)%i*i+a]-n[(o-1+i)%i*i+a];t[l*4]=Ie(128+c*400,0,255),t[l*4+1]=Ie(128+h*400,0,255),t[l*4+2]=Ie(n[l]*255,0,255),t[l*4+3]=Ie(s[l]*255,0,255)}let r=new Ti(t,i,i,bn);return r.wrapS=r.wrapT=Zn,r.minFilter=kn,r.magFilter=Xe,r.generateMipmaps=!0,r.anisotropy=8,r.needsUpdate=!0,r}function xc(i=128,t=0){let e=Ii(i,i),n=e.getContext("2d"),s=n.createRadialGradient(i/2,i/2,i*t,i/2,i/2,i/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.15,"rgba(255,255,255,0.55)"),s.addColorStop(.4,"rgba(255,255,255,0.14)"),s.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=s,n.fillRect(0,0,i,i);let r=new Xi(e);return r.colorSpace=tn,r}function Hf(){let e=Ii(384,256),n=e.getContext("2d");n.fillStyle="#c4121f",n.fillRect(0,0,384,256),n.fillStyle="#fff",n.beginPath(),n.arc(256*.5+10,256/2,256*.25,0,Math.PI*2),n.fill(),n.fillStyle="#c4121f",n.beginPath(),n.arc(256*.5+24,256/2,256*.2,0,Math.PI*2),n.fill(),n.fillStyle="#fff",n.beginPath();let s=256*.5+118,r=256/2,o=256*.115;for(let a=0;a<5;a++){let l=-Math.PI/2+a*4*Math.PI/5,c=s+Math.cos(l)*o,h=r+Math.sin(l)*o;a?n.lineTo(c,h):n.moveTo(c,h)}return n.closePath(),n.fill(),ls(e)}function zf(i=256){let t=Ii(i,i),e=t.getContext("2d"),n=Ve(88);e.fillStyle="#5a3a30",e.fillRect(0,0,i,i);let s=16,r=12,o=i/s,a=i/r;for(let l=0;l<s;l++)for(let c=0;c<r;c++){let h=(n()-.5)*40;e.fillStyle=`rgb(${112+h},${64+h*.6},${48+h*.5})`,e.fillRect(c*a+l%2*a/2,l*o,a-1.5,o-1.5),e.fillRect(c*a+l%2*a/2-a,l*o,a-1.5,o-1.5)}return ls(t)}var le={center:new W(-3.5,3.5),bow:new W(-.7071,.7071),lat:new W(.7071,.7071),A:20.5,B:8.8,N:128,rockScaleAtWater:1.05};function vc(i,t,e=new W){return e.x=le.center.x+le.bow.x*i+le.lat.x*t,e.y=le.center.y+le.bow.y*i+le.lat.y*t,e}function Dv(i,t=1){let e=Math.cos(i),n=Math.sin(i),s=le.A*(e>=0?e:.8*e),r=le.B*n*(e>0?1-.55*e*e:1);return[s*t,r*t]}function Ds(i=1,t=le.N){let e=[];for(let n=0;n<t;n++){let[s,r]=Dv(n/t*Math.PI*2,i);e.push(vc(s,r))}return e}function Nv(i){let t=i.length,e=[];for(let s=0;s<t;s++){let r=i[(s-1+t)%t],o=i[(s+1)%t],a=o.x-r.x,l=o.y-r.y,c=Math.hypot(a,l)||1;a/=c,l/=c,e.push(new W(l,-a))}let n=0;for(let s=0;s<t;s++)n+=e[s].x*(i[s].x-le.center.x)+e[s].y*(i[s].y-le.center.y);return n<0&&e.forEach(s=>s.multiplyScalar(-1)),e}function Dr(i,t=4,e=le.N,n={}){let s=Ds(1,e),r=Nv(s),o=e+1,a=new Float32Array(i.length*o*3),l=new Float32Array(i.length*o*2),c=[0];for(let d=1;d<=e;d++)c.push(c[d-1]+s[d%e].distanceTo(s[d-1]));for(let d=0;d<i.length;d++){let g=i[d];for(let _=0;_<o;_++){let m=_%e,p=s[m].x-le.center.x,M=s[m].y-le.center.y,S=g.jitter?g.jitter(m,_):0,v=le.center.x+p*g.scale+r[m].x*S,T=le.center.y+M*g.scale+r[m].y*S,E=(d*o+_)*3;a[E]=v,a[E+1]=g.y+(g.jy?g.jy(m,_):0),a[E+2]=T;let C=(d*o+_)*2;l[C]=c[_]/t,l[C+1]=g.y/t}}let h=[];for(let d=0;d<i.length-1;d++)for(let g=0;g<e;g++){let _=d*o+g,m=_+1,p=_+o,M=p+1;n.flip?h.push(_,m,p,m,M,p):h.push(_,p,m,m,p,M)}let f=new ce;f.setAttribute("position",new he(a,3)),f.setAttribute("uv",new he(l,2)),f.setIndex(h),f.computeVertexNormals();let u=f.attributes.normal;for(let d=0;d<i.length;d++){let g=d*o,_=d*o+e,m=u.getX(g)+u.getX(_),p=u.getY(g)+u.getY(_),M=u.getZ(g)+u.getZ(_),S=Math.hypot(m,p,M)||1;u.setXYZ(g,m/S,p/S,M/S),u.setXYZ(_,m/S,p/S,M/S)}return f}function kf(i,t,e=3){let n=Ds(i),s=new Kn(n.map(l=>new W(l.x,-l.y))),r=new Mn(s,1);r.rotateX(-Math.PI/2),r.translate(0,t,0);let o=r.attributes.position,a=r.attributes.uv;for(let l=0;l<o.count;l++)a.setXY(l,o.getX(l)/e,o.getZ(l)/e);return r.computeVertexNormals(),r}function Vf(i=192,t=46){let e=Ds(le.rockScaleAtWater,96),n=e.length,s=new Uint16Array(i*i),r=uo.toHalfFloat;for(let a=0;a<i;a++)for(let l=0;l<i;l++){let c=le.center.x+((l+.5)/i*2-1)*t,h=le.center.y+((a+.5)/i*2-1)*t,f=1e9,u=!1;for(let g=0,_=n-1;g<n;_=g++){let m=e[g].x,p=e[g].y,M=e[_].x,S=e[_].y;p>h!=S>h&&c<(M-m)*(h-p)/(S-p)+m&&(u=!u);let v=M-m,T=S-p,E=Ie(((c-m)*v+(h-p)*T)/(v*v+T*T),0,1),C=c-(m+v*E),y=h-(p+T*E),w=C*C+y*y;w<f&&(f=w)}let d=Math.sqrt(f)*(u?-1:1);s[a*i+l]=r(d)}let o=new Ti(s,i,i,wr,He);return o.minFilter=o.magFilter=Xe,o.wrapS=o.wrapT=Bn,o.needsUpdate=!0,{tex:o,half:t,center:le.center.clone()}}function Gf(i=3,t=1){return(e,n)=>(Tn(e*.21+i,i*3.7,4,i)-.5)*2.4*t+(Tn(e*.9,i,2,i+1)-.5)*.9*t}var yc=rs[0],Wf=`
float rockPulse(vec2 p0){
  float s = 0.5 + 0.5 * sin(dot(p0, vec2(${yc.dx.toFixed(5)}, ${yc.dz.toFixed(5)})) * ${yc.k.toFixed(6)} - uWaveTime * ${yc.w.toFixed(5)} + 1.1);
  return s * s;
}
`,Uv=`
${rn}
${xu}
${Wf}
varying vec3 vWorld;      // yer de\u011Fi\u015Ftirmi\u015F d\xFCnya konumu
varying vec2 vP0;         // ilk (yer de\u011Fi\u015Ftirmemi\u015F) xz
varying float vDist;
uniform sampler2D uSdf;
uniform vec4 uSdfInfo;    // merkez.xy, yar\u0131 boyut, -
uniform float uRunup;

float sdfAt(vec2 p){
  vec2 uv = (p - uSdfInfo.xy) / (uSdfInfo.z * 2.0) + 0.5;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 60.0;
  return texture2D(uSdf, uv).r;
}

void main(){
  vec2 p0 = position.xz;
  vec3 d = gerstnerDisp(p0);
  vec3 wp = vec3(p0.x + d.x, d.y, p0.y + d.z);
  // Adaya \xE7arpan dalgan\u0131n y\xFCkselmesi (t\u0131rmanma): dalga ge\xE7tik\xE7e suyun duvara vurmas\u0131
  float sd = sdfAt(wp.xz);
  float near = 1.0 - smoothstep(0.5, 11.0, sd);
  float pulse = rockPulse(p0);
  wp.y += uRunup * near * (0.2 + 0.8 * pulse) * 1.35;
  vP0 = p0;
  vWorld = wp;
  vDist = length(wp - uCamPos);
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`,Fv=`
${rn}
${xu}
${Wf}
${Pi}
${di}
varying vec3 vWorld;
varying vec2 vP0;
varying float vDist;
uniform samplerCube uEnv;
uniform sampler2D uNoise;
uniform sampler2D uSdf;
uniform vec4 uSdfInfo;
uniform vec3 uLights[3];     // ek \u0131\u015F\u0131k konumlar\u0131 (gemi, iskele fenerleri)
uniform vec3 uLightCol[3];
uniform float uRain;
uniform float uWaveTimeRaw;
uniform int uOct;

float sdfAt(vec2 p){
  vec2 uv = (p - uSdfInfo.xy) / (uSdfInfo.z * 2.0) + 0.5;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 60.0;
  return texture2D(uSdf, uv).r;
}

// Ya\u011Fmur damlas\u0131 halkalar\u0131
vec2 rippleNormal(vec2 p, float t){
  vec2 n = vec2(0.0);
  for (int layer = 0; layer < 2; layer++) {
    vec2 q = p * (layer == 0 ? 1.7 : 3.1);
    vec2 id = floor(q);
    vec2 f = fract(q) - 0.5;
    float h = hash21(id + float(layer) * 17.0);
    float ph = fract(t * (0.6 + h * 0.5) + h * 7.0);
    vec2 c = (hash22(id + 3.0) - 0.5) * 0.3;
    vec2 dv = f - c;
    float r = length(dv);
    float ring = sin((r - ph * 0.22) * 90.0) * exp(-abs(r - ph * 0.22) * 40.0) * (1.0 - ph) * step(h, 0.55);
    n += normalize(dv + 1e-4) * ring * 0.5;
  }
  return n;
}

void main(){
  vec3 P = vWorld;
  vec3 toCam = uCamPos - P;
  float dist = length(toCam);
  vec3 V = toCam / dist;

  // ---- Gerstner normali (LOD'lu) + Jacobian ----
  float footprint = dist * 0.0011 + 0.02;
  float Sxx = 0.0, Szz = 0.0, Sxz = 0.0;
  vec3 N = vec3(0.0, 1.0, 0.0);
  float crest = 0.0;
  for (int i = 0; i < NW; i++) {
    float k = WV[i].z;
    float L = 6.2831853 / k;
    float lod = clamp(L / (footprint * 7.0) - 1.0, 0.0, 1.0);
    float a = WV[i].w * uAmp * lod;
    float Qi = min(1.0, uSteep / (float(NW) * k * (WV[i].w * uAmp) + 1e-4));
    float f = k * dot(WV[i].xy, vP0) - WW[i] * uWaveTime;
    float c = cos(f), s = sin(f);
    N.x -= WV[i].x * k * a * c;
    N.z -= WV[i].y * k * a * c;
    N.y -= Qi * k * a * s;
    Sxx += Qi * k * a * WV[i].x * WV[i].x * s;
    Szz += Qi * k * a * WV[i].y * WV[i].y * s;
    Sxz += Qi * k * a * WV[i].x * WV[i].y * s;
    crest += a * s;
  }
  float J = (1.0 - Sxx) * (1.0 - Szz) - Sxz * Sxz;

  // ---- ince detay normali (kayd\u0131rmal\u0131 iki katman) ----
  float detailAmt = 1.0 - smoothstep(30.0, 160.0, dist);
  vec2 w1 = vWorld.xz * 0.09 + vec2(uTime * 0.021, uTime * -0.033) * (0.6 + uStorm);
  vec2 w2 = vWorld.xz * 0.31 + vec2(uTime * -0.05, uTime * 0.043) * (0.6 + uStorm);
  vec2 w3 = vWorld.xz * 1.1 + vec2(uTime * 0.11, uTime * 0.07);
  vec4 t1 = texture2D(uNoise, w1);
  vec4 t2 = texture2D(uNoise, w2);
  vec4 t3 = texture2D(uNoise, w3);
  t3.rg = mix(vec2(0.5), t3.rg, detailAmt);
  float detailFade = 1.0 - smoothstep(60.0, 420.0, dist);
  vec2 dn = ((t1.rg - 0.5) * 0.9 + (t2.rg - 0.5) * 1.2 + (t3.rg - 0.5) * 0.9 * detailFade) * (0.12 + 0.46 * uStorm);
  N.xz += dn * (0.35 + 0.65 * detailFade);
  #ifdef RIPPLES
  if (uRain > 0.05 && dist < 90.0) {
    N.xz += rippleNormal(vWorld.xz, uTime) * uRain * 0.45 * (1.0 - dist / 90.0);
  }
  #endif
  N = normalize(N);
  // uzakta normal d\xFCzle\u015Fsin (par\u0131lt\u0131 g\xFCr\xFClt\xFCs\xFCn\xFC kes)
  N = normalize(mix(N, vec3(0.0, 1.0, 0.0), smoothstep(500.0, 3500.0, dist) * 0.65));

  // ---- Fresnel yans\u0131ma ----
  float ndv = max(dot(N, V), 0.0);
  float fres = 0.02 + 0.98 * pow(1.0 - ndv, 5.0);
  vec3 R = reflect(-V, N);
  R.y = abs(R.y) + 0.0005;
  vec3 refl = textureCube(uEnv, R, 0.6 + 1.8 * uStorm).rgb;

  // ---- Suyun kendi rengi (\u0131\u015F\u0131\u011Fa ba\u011Fl\u0131) ----
  vec3 skyAmb = mix(uHorizon, uZenith, 0.5);
  vec3 deep = vec3(0.004, 0.018, 0.028);
  vec3 turq = vec3(0.02, 0.10, 0.11);
  float heightN = clamp(crest / (uAmp * 1.8 + 0.001) * 0.5 + 0.5, 0.0, 1.0);
  vec3 body = mix(deep, turq, pow(heightN, 2.2) * (0.35 + 0.65 * uStorm));
  body *= (0.25 + 2.4 * length(skyAmb)) * (0.55 + 0.6 * heightN);
  body += uFogColor * 0.05 + vec3(0.9, 0.5, 0.25) * 0.03 * exp(-length(vWorld.xz - vec2(-2.0, 2.0)) * 0.08);
  body *= 1.0 + uFlash * 1.4;

  // ---- K\xF6p\xFCk ----
  float sdfV = sdfAt(vWorld.xz);
  float noiseF = t1.a * 0.55 + t2.a * 0.45;
  float foam = smoothstep(0.66, 0.16, J) * (0.35 + 0.65 * noiseF);
  foam += smoothstep(uAmp * 1.1, uAmp * 2.0 + 0.001, crest) * smoothstep(0.42, 0.72, noiseF) * 0.9;
  // kayal\u0131kta: dalga vurduk\xE7a k\xF6p\xFCk halkas\u0131
  float pulse = rockPulse(vP0);
  float rockFoam = (1.0 - smoothstep(0.0, 2.2 + 5.5 * pulse, sdfV + (noiseF - 0.5) * 2.5)) * (0.5 + 0.5 * pulse) * (0.25 + 0.75 * uStorm);
  rockFoam += (1.0 - smoothstep(0.0, 11.0, sdfV)) * smoothstep(0.35, 0.8, noiseF) * uStorm * 0.55;
  // k\u0131y\u0131 (\xDCsk\xFCdar) k\xF6p\xFC\u011F\xFC
  float shore = vWorld.x - (255.0 + (noiseF - 0.5) * 4.0);
  float shoreFoam = (1.0 - smoothstep(0.0, 7.0, abs(shore))) * (0.4 + 0.6 * noiseF) * uStorm;
  rockFoam *= 0.35 + 0.9 * smoothstep(0.25, 0.75, noiseF);
  foam = clamp(foam * (0.30 + 1.15 * uStorm) + rockFoam + shoreFoam, 0.0, 0.88);
  foam *= smoothstep(0.30, 0.62, noiseF + foam * 0.35);

  // ---- H\xFCzme ve \u0131\u015F\u0131k kaynaklar\u0131 ----
  float bl = beamLit(vWorld);
  vec3 col = mix(body, refl, fres);
  vec3 beamCol = vec3(1.0, 0.9, 0.7);

  // par\u0131lt\u0131: fener ve di\u011Fer \u0131\u015F\u0131klar\u0131n yans\u0131mas\u0131
  vec3 spec = vec3(0.0);
  vec3 Ldir = normalize(uLanternPos - vWorld);
  vec3 H = normalize(V + Ldir);
  float sp = pow(max(dot(N, H), 0.0), 220.0 + 600.0 * (1.0 - uStorm));
  spec += beamCol * sp * bl * 15.0;
  for (int i = 0; i < 3; i++) {
    vec3 Ld = uLights[i] - vWorld;
    float dl = length(Ld);
    Ld /= dl;
    vec3 Hh = normalize(V + Ld);
    float s2 = pow(max(dot(N, Hh), 0.0), 380.0);
    spec += uLightCol[i] * s2 * (1.0 / (1.0 + dl * 0.02)) * 3.0;
    // geni\u015F hare
    spec += uLightCol[i] * pow(max(dot(N, Hh), 0.0), 40.0) * 0.06 * (1.0 / (1.0 + dl * 0.03));
  }
  col += spec * (0.35 + 0.65 * fres + 0.4);
  // h\xFCzmenin suyu ayd\u0131nlatmas\u0131 (da\u011F\u0131n\u0131k)
  col += beamCol * bl * (0.03 + 0.55 * foam + 0.03 * heightN);

  // k\xF6p\xFCk rengi: ortam + \u015Fim\u015Fek + h\xFCzme
  vec3 foamLit = (vec3(0.55, 0.64, 0.78) * (0.05 + 0.6 * length(skyAmb)) * (0.7 + 0.6 * t2.a) + uFlash * vec3(0.7, 0.8, 1.0) * 0.55 + beamCol * bl * 1.3 + vec3(1.0, 0.7, 0.4) * 0.03);
  foamLit += uAmbient * 0.3 + vec3(1.0, 0.68, 0.40) * 0.16 * exp(-length(vWorld.xz - vec2(-2.0, 2.0)) * 0.12);
  col = mix(col, foamLit, foam * 0.92);

  // uzak sis
  float f = 1.0 - exp(-pow(dist * uFogDensity, 1.5));
  col = mix(col, uFogColor, clamp(f, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`,Mc=class{constructor(t){this.noise=Of(384);let e=Vf(160,46);this.sdf=e;let n=this.buildGeometry(ye.seaRadial,ye.seaAngular);this.uniforms={...Pt,uAmp:{value:.5},uSteep:{value:.6},uWaveTime:{value:0},uWaveTimeRaw:{value:0},uEnv:{value:t},uNoise:{value:this.noise},uSdf:{value:e.tex},uSdfInfo:{value:new Ce(e.center.x,e.center.y,e.half,0)},uRunup:{value:.5},uRain:{value:.5},uLights:{value:[new A(9999,30,9999),new A(0,3,0),new A(0,3,0)]},uLightCol:{value:[new _t(0,0,0),new _t(1,.6,.3),new _t(1,.6,.3)]},uOct:{value:ye.seaOct}},this.material=new re({uniforms:this.uniforms,vertexShader:Uv,fragmentShader:Fv,defines:ye.ripples?{RIPPLES:1}:{}}),this.mesh=new pt(n,this.material),this.mesh.frustumCulled=!1,this.mesh.name="sea"}buildGeometry(t,e){let r=new Float32Array((t+1)*(e+1)*3),o=0;for(let c=0;c<=t;c++){let h=c/t,f=1.5+9e3*(Math.exp(6*h)-1)/(Math.exp(6)-1);for(let u=0;u<=e;u++){let d=u/e*Math.PI*2;r[o++]=Math.cos(d)*f,r[o++]=0,r[o++]=Math.sin(d)*f}}let a=[];for(let c=0;c<t;c++)for(let h=0;h<e;h++){let f=c*(e+1)+h,u=f+1,d=f+e+1,g=d+1;a.push(f,u,d,u,g,d)}let l=new ce;return l.setAttribute("position",new he(r,3)),l.setIndex(a),l}update(t,e,n){let s=this.uniforms;s.uAmp.value=t.wave.amp,s.uSteep.value=t.wave.steep,s.uWaveTime.value=e*t.waveTimeScale,s.uRunup.value=t.storm*.9+.05,s.uRain.value=t.rain,n&&(s.uLights.value[0].copy(n.lightPos),s.uLightCol.value[0].setRGB(1,.85,.55).multiplyScalar(.9));for(let r=0;r<t.lampWorld.length&&r<2;r++)s.uLights.value[r+1].copy(t.lampWorld[r]),s.uLightCol.value[r+1].setRGB(1,.6,.28).multiplyScalar(.7)}};function pn(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new ce,c=0;for(let h=0;h<i.length;++h){let f=i[h],u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0,f=[];for(let u=0;u<i.length;++u){let d=i[u].index;for(let g=0;g<d.count;++g)f.push(d.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(f)}for(let h in r){let f=Xf(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(let h in o){let f=o[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let _=0;_<o[h].length;++_)d.push(o[h][_][u]);let g=Xf(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function Xf(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new he(o,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let f=l/e;for(let u=0,d=h.count;u<d;u++)for(let g=0;g<e;g++){let _=h.getComponent(u,g);a.setComponent(u+f,g,_)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}var St={platformY:Cf.platformY,shaftBottom:4.2,shaftTop:15.6,rBottom:4.55,rTop:3.75,galleryY:17.3,drumTop:19.5,lanternBottom:19.9,lanternTop:22.5,domeBase:22.85,topY:31.6},Mu=i=>Ue.lerp(St.rBottom,St.rTop,(i-St.shaftBottom)/(St.shaftTop-St.shaftBottom));function Ns(i,t,e,n={}){let s=i.map.clone();s.repeat.set(t,e),s.needsUpdate=!0;let r=i.bump.clone();return r.repeat.set(t,e),r.needsUpdate=!0,new Ze({emissive:329482,map:s,bumpMap:r,bumpScale:n.bump??2.2,roughness:n.rough??.88,metalness:0,color:n.color??16777215})}function cs(i,t){let e=new Kn,n=i/2;return e.moveTo(-n,0),e.lineTo(n,0),e.lineTo(n,t-n),e.absarc(0,t-n,n,0,Math.PI,!1),e.lineTo(-n,0),e}function Bv(i,t,e,n=.35,s=.28){let r=i/2+n,o=t/2+n,a=Math.max(r-o*(1+s),.2),l=o*s,c=[[-r,0,-o],[r,0,-o],[r,0,o],[-r,0,o],[-a,e,-l],[a,e,-l],[a,e,l],[-a,e,l]],h=[[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7],[4,5,6,7]],f=[],u=[],d=(_,m,p)=>{for(let M of[_,m,p])f.push(...c[M]),u.push(c[M][0]*.35,c[M][2]*.35+c[M][1]*.35)};for(let _ of h)d(_[0],_[1],_[2]),d(_[0],_[2],_[3]);let g=new ce;return g.setAttribute("position",new jt(f,3)),g.setAttribute("uv",new jt(u,2)),g.computeVertexNormals(),g}function qf(i={}){let t=new Re;t.name="KizKulesi";let e=Ve(2024),n=yu(768,7,{base:[204,194,172]}),s=yu(768,12,{base:[150,142,124],rows:10}),r=Uf(512,21);r.map.repeat.set(1,1);let o=new Ze({map:r.map,bumpMap:r.bump,bumpScale:6,roughness:.42,metalness:.08,color:14673134,emissive:658964,side:Pe}),a=Ns(s,1,1,{color:15000284,rough:.8}),l=Ns(n,6,3,{color:16777215,bump:2}),c=Ns(n,4.5,.6,{color:16446694}),h=Ns(n,5,.5,{color:15129796}),f=Bf(384);f.repeat.set(1,1);let u=new Ze({map:f,roughness:.5,metalness:0,color:11579576}),d=Ff(384),g=new Ze({map:d,color:10925250,metalness:.8,roughness:.34,envMapIntensity:1}),_=zf(256);_.wrapS=_.wrapT=Zn;let m=new Ze({map:_,roughness:.7,metalness:0,color:13220016,side:Pe}),p=new Ze({color:1380879,roughness:.9}),M=new Ze({color:1842980,roughness:.45,metalness:.8}),S=new an({color:new _t(1,.62,.26),fog:!0}),v=new an({color:new _t(1,.86,.6),fog:!0}),T=[],E=[-8,-5.5,-3.5,-2,-.9,0,.9,1.7,2.35],C=Gf(4,1);E.forEach((P,D)=>{let st=1+.042*(2.35-P),vt=D===0?.5:1;T.push({y:P,scale:st,jitter:(ft,Nt)=>C(ft,Nt)*vt*(P>1.2?.55:1),jy:ft=>P>1.2?(Tn(ft*.4,9,3,5)-.5)*.5:(Tn(ft*.5,P,3,5)-.5)*1.4})});let y=Dr(T,5,le.N,{flip:!0}),w=new pt(y,o);w.name="rock",t.add(w);let I=Dr([{y:2.33,scale:1,jitter:(P,D)=>C(P,D)*.55,jy:P=>(Tn(P*.4,9,3,5)-.5)*.5},{y:2.3,scale:.9}],5,le.N,{flip:!1});t.add(new pt(I,o));let N=[],H=Ds(1.06,40);for(let P=0;P<46;P++){let D=H[Math.floor(e()*H.length)],st=D.x-le.center.x,vt=D.y-le.center.y,ft=Math.hypot(st,vt),Nt=.6+e()*3.4,Ft=.55+e()*e()*2,Zt=new Ao(1,3),Jt=Zt.attributes.position;for(let Tt=0;Tt<Jt.count;Tt++){let de=Jt.getX(Tt),Be=Jt.getY(Tt),Ee=Jt.getZ(Tt),ve=.62+Tn(de*2.6+P,Be*2.6+Ee*2.1,4,P)*.85;Jt.setXYZ(Tt,de*ve*1.25,Be*ve*.72,Ee*ve)}Zt.computeVertexNormals(),Zt.scale(Ft,Ft,Ft),Zt.rotateY(e()*6.28),Zt.translate(D.x+st/ft*Nt,-.35+(e()-.5)*.9+(e()<.3?.6:0),D.y+vt/ft*Nt),N.push(Zt)}let V=new pt(pn(N),o);V.name="boulders",t.add(V);let L=[{y:-2.5,scale:.975},{y:1.3,scale:.958},{y:St.platformY,scale:.945}],O=Dr(L,4.2,le.N,{flip:!0}),X=new pt(O,a);X.name="wall",t.add(X);let q=new pt(Dr([{y:St.platformY-.05,scale:.955},{y:St.platformY+.12,scale:.955},{y:St.platformY+.14,scale:.925}],4,le.N,{flip:!0}),h);t.add(q);let nt=new pt(Dr([{y:St.platformY+.12,scale:.93},{y:St.platformY+1.05,scale:.93},{y:St.platformY+1.1,scale:.905},{y:St.platformY+.12,scale:.905}],3,le.N,{flip:!0}),a);t.add(nt);let Z=new pt(kf(.925,St.platformY+.11,2.6),u);t.add(Z);let $=new Re,et=10,Ut=[],bt=-le.A*.8*.94;for(let P=0;P<et;P++){let D=St.platformY-.32*P+.1,st=bt-P*.95,vt=D+2.5,ft=new Ne(1,vt,3.6);ft.translate(st-.45,D-vt/2,0),Ut.push(ft)}let ie=new pt(pn(Ut),Ns(s,1.2,1.2,{color:14210767}));$.add(ie);let rt=new xe(.16,.2,.45,10);for(let[P,D]of[[bt-7.7,1.5],[bt-7.7,-1.5],[bt-4.5,1.6],[bt-4.5,-1.6]]){let st=new pt(rt,M),vt=Math.min(et-1,Math.round((bt-P)/.95));st.position.set(P,St.platformY-.32*vt+.1+.22,D),$.add(st)}let yt=St.platformY+.1,k=new pt(new xe(.06,.08,2.6,8),M);k.position.set(bt-.5,yt+1.3,1.9),$.add(k);let G=new pt(new qe(.22,12,8),S);G.position.set(bt-.5,yt+2.7,1.9),$.add(G);let K=k.clone();K.position.z=-1.9,$.add(K);let mt=G.clone();mt.position.z=-1.9,$.add(mt),$.position.set(le.center.x,0,le.center.y),$.rotation.y=-Math.atan2(le.bow.y,le.bow.x),t.add($);let ct=[[bt-.5,yt+2.7,1.9],[bt-.5,yt+2.7,-1.9]],gt=new Re,qt=11.6,Q=5.4,at=3.5,ht=new pt(new Ne(qt,at,Q),Ns(n,3,1,{color:15129798}));ht.position.y=St.platformY+.11+at/2,gt.add(ht);let ut=new pt(Bv(qt,Q,1.9,.4),m);ut.position.y=St.platformY+.11+at,gt.add(ut);let Mt=[],Gt=cs(.75,1.5),Ht=new Mn(Gt,8),Wt=new Mn(cs(1,1.75),8),Xt=St.platformY+.11+.9,U=[];for(let P of[-1,1])for(let D=0;D<5;D++){let st=-qt/2+1.5+D*2.15,vt=new pt(Ht,D===2&&P===1?v:S);vt.position.set(st,Xt,P*(Q/2+.03)),P<0&&(vt.rotation.y=Math.PI),gt.add(vt);let ft=new pt(Wt,p);ft.position.set(st,Xt-.1,P*(Q/2+.015)),P<0&&(ft.rotation.y=Math.PI),gt.add(ft)}let fe=new pt(new Mn(cs(1.3,2.4),8),S);fe.position.set(qt/2+.03,St.platformY+.11,0),fe.rotation.y=Math.PI/2,gt.add(fe);let se=new pt(new Mn(cs(1.6,2.7),8),p);se.position.set(qt/2+.015,St.platformY+.11,0),se.rotation.y=Math.PI/2,gt.add(se);let R=new pt(new Ne(.8,2.2,.8),Ns(n,1,1));R.position.set(-qt*.25,St.platformY+at+2.2,Q*.12),gt.add(R),gt.position.set(...(()=>{let P=vc(4.8,0);return[P.x,0,P.y]})()),gt.rotation.y=-Math.atan2(le.bow.y,le.bow.x),t.add(gt);let x=new Re;x.name="tower",t.add(x);let z=[];z.push(new W(St.rBottom+.55,St.shaftBottom-.05)),z.push(new W(St.rBottom+.5,St.shaftBottom+.9)),z.push(new W(St.rBottom+.12,St.shaftBottom+1.5)),z.push(new W(St.rBottom,St.shaftBottom+1.6)),z.push(new W(St.rTop,St.shaftTop));let Y=new pt(new Hn(z,64),l);x.add(Y);let j=[9.8,13.1];for(let P of j){let D=Mu(P),st=[new W(D-.05,P),new W(D+.2,P+.08),new W(D+.24,P+.32),new W(D+.12,P+.44),new W(D-.05,P+.5)];x.add(new pt(new Hn(st,64),h))}let dt=[],xt=St.shaftTop;dt.push(new W(St.rTop,xt)),dt.push(new W(St.rTop+.15,xt+.35)),dt.push(new W(St.rTop+.12,xt+.55)),dt.push(new W(St.rTop+.5,xt+.75)),dt.push(new W(St.rTop+.9,xt+1.05)),dt.push(new W(4.85,xt+1.2)),dt.push(new W(4.9,St.galleryY)),dt.push(new W(4.75,St.galleryY+.02)),x.add(new pt(new Hn(dt,64),h));let tt=new Ne(.42,.9,.8),ot=[];for(let P=0;P<36;P++){let D=P/36*Math.PI*2,st=tt.clone();st.translate(0,0,0),st.rotateY(-D+Math.PI/2),st.translate(Math.cos(D)*(St.rTop+.55),xt+.7,Math.sin(D)*(St.rTop+.55)),ot.push(st)}x.add(new pt(pn(ot),h));let wt=new pt(new xe(4.78,4.78,.06,64),u);wt.position.y=St.galleryY+.03,x.add(wt);let Vt=new xe(.045,.06,.95,6),Ct=[];for(let P=0;P<64;P++){let D=P/64*Math.PI*2,st=Vt.clone();st.translate(Math.cos(D)*4.7,St.galleryY+.5,Math.sin(D)*4.7),Ct.push(st)}x.add(new pt(pn(Ct),M));let Et=new pt(new wi(4.7,.06,6,96),M);Et.rotation.x=Math.PI/2,Et.position.y=St.galleryY+1,x.add(Et);let kt=Et.clone();kt.position.y=St.galleryY+.15,kt.scale.setScalar(1),x.add(kt);let Yt=[new W(3.1,St.galleryY),new W(3,St.galleryY+.3),new W(3,St.drumTop-.3),new W(3.35,St.drumTop-.15),new W(3.4,St.drumTop),new W(3.1,St.drumTop+.05),new W(2.75,St.drumTop+.06)],ee=new pt(new Hn(Yt,48),c);x.add(ee);let F=new Re;F.name="lantern",x.add(F);let At=new an({color:new _t(1,.86,.55),transparent:!0,opacity:.11,side:Pe,depthWrite:!1,blending:cn}),it=new pt(new xe(2.62,2.62,St.lanternTop-St.lanternBottom,32,1,!0),At);it.position.y=(St.lanternTop+St.lanternBottom)/2,F.add(it);let Rt=new Ne(.11,St.lanternTop-St.lanternBottom,.11),Dt=[];for(let P=0;P<16;P++){let D=P/16*Math.PI*2,st=Rt.clone();st.translate(Math.cos(D)*2.64,(St.lanternTop+St.lanternBottom)/2,Math.sin(D)*2.64),Dt.push(st)}F.add(new pt(pn(Dt),M));for(let P of[St.lanternBottom+.05,(St.lanternTop+St.lanternBottom)/2,St.lanternTop-.05]){let D=new pt(new wi(2.64,.05,6,48),M);D.rotation.x=Math.PI/2,D.position.y=P,F.add(D)}let lt=new pt(new xe(2.7,2.7,.15,32),p);lt.position.y=St.lanternBottom,F.add(lt);let Ot=new Re;Ot.position.y=(St.lanternTop+St.lanternBottom)/2-.2;let zt=new pt(new qe(.28,16,12),new an({color:new _t(3.6,3.1,2.3)}));Ot.add(zt);let Me=new an({color:new _t(2.6,2.2,1.6),side:Pe});for(let P of[1,-1]){let D=new pt(new xe(.95,.95,1.3,16,1,!0,-.55,1.1),Me);D.rotation.y=P>0?0:Math.PI,Ot.add(D)}let ue=new pt(new wi(.98,.04,6,32),M);ue.rotation.x=Math.PI/2,ue.position.y=.72,Ot.add(ue);let xn=ue.clone();xn.position.y=-.72,Ot.add(xn);for(let P=-3;P<=3;P++){let D=new pt(new wi(.93+.01*Math.abs(P),.028,5,32),Me);D.rotation.x=Math.PI/2,D.position.y=P*.2,Ot.add(D)}F.add(Ot);let Nn=[new W(2.8,St.lanternTop),new W(3.2,St.lanternTop+.06),new W(3.28,St.lanternTop+.3),new W(3.05,St.lanternTop+.36)];x.add(new pt(new Hn(Nn,48),h));let oa=[],Or=St.domeBase,aa=[[3.05,0],[3.22,.28],[3.24,.75],[3.12,1.35],[2.85,2],[2.42,2.65],[1.95,3.25],[1.5,3.95],[1.1,4.7],[.76,5.45],[.5,6.15],[.32,6.85],[.22,7.45],[.16,7.9]];for(let[P,D]of aa)oa.push(new W(P,Or+D*1));let ps=new pt(new Hn(oa,96),g);ps.name="dome",x.add(ps);let Hr=new pt(new wi(3.05,.09,6,64),g);Hr.rotation.x=Math.PI/2,Hr.position.y=Or+.06,x.add(Hr);let Fs=Or+7.9,zr=new pt(new xe(.035,.07,1.6,8),M);zr.position.y=Fs+.75,x.add(zr);let ei=new pt(new qe(.3,16,12),new Ze({color:13148746,metalness:.9,roughness:.3}));ei.position.y=Fs+.1,x.add(ei);let Bs=new pt(new qe(.09,8,6),new an({color:new _t(3,.3,.2)}));Bs.position.y=Fs+1.58,x.add(Bs);let $c=[],la=[{y:6.6,n:4,off:.4,w:.55,h:1},{y:9,n:5,off:1.1,w:.62,h:1.25},{y:11.6,n:5,off:.2,w:.62,h:1.25},{y:14,n:6,off:.7,w:.58,h:1.15}],Ni=new Map;for(let P of la)for(let D=0;D<P.n;D++){let st=P.off+D/P.n*Math.PI*2,vt=Mu(P.y)+.03,ft=P.w+":"+P.h;Ni.has(ft)||Ni.set(ft,[new Mn(cs(P.w,P.h),8),new Mn(cs(P.w+.3,P.h+.3),8)]);let[Nt,Ft]=Ni.get(ft),Zt=(D*7+P.y*3|0)%3!==0,Jt=new pt(Ft,p);Jt.position.set(Math.cos(st)*(vt-.012),P.y-.14,Math.sin(st)*(vt-.012)),Jt.rotation.y=Math.PI/2-st,x.add(Jt);let Tt=new pt(Nt,Zt?S:p);Tt.position.set(Math.cos(st)*vt,P.y,Math.sin(st)*vt),Tt.rotation.y=Math.PI/2-st,x.add(Tt)}for(let P=0;P<8;P++){let D=.2+P/8*Math.PI*2,st=new pt(new Mn(cs(.5,.95),6),v);st.position.set(Math.cos(D)*3.03,St.galleryY+.5,Math.sin(D)*3.03),st.rotation.y=Math.PI/2-D,x.add(st)}{let P=-Math.PI/4,D=Mu(St.platformY+1.6)+.03,st=new pt(new Mn(cs(1.5,2.6),8),p);st.position.set(Math.cos(P)*D,St.platformY+.11,Math.sin(P)*D),st.rotation.y=Math.PI/2-P,x.add(st)}let fi=new Re;{let P=vc(-10.5,-4.2);fi.position.set(P.x,St.platformY+.11,P.y);let D=new pt(new xe(.05,.08,9.5,8),M);D.position.y=4.75,fi.add(D);let st=new pt(new qe(.11,8,6),new Ze({color:13148746,metalness:1,roughness:.3}));st.position.y=9.55,fi.add(st)}let pi=new yn(2.4,1.6,26,12),kr=pi.attributes.position.array.slice(),ca=new Ze({map:Hf(),side:Pe,roughness:.8,emissive:2228738,emissiveIntensity:.4}),ha=new pt(pi,ca);ha.position.set(1.2,8.5,0),fi.add(ha),t.add(fi);let Jc=new _t(1,.62,.3),Os=[],ms=new Fe;ms.position.copy($.position),ms.rotation.copy($.rotation),ms.updateMatrixWorld(!0);for(let P of ct){let D=new A(...P).applyMatrix4(ms.matrixWorld),st=new Ts(Jc,40,32,1.6);st.position.copy(D),t.add(st),Os.push(st)}let Hs=new Ts(new _t(1,.7,.4),26,26,1.7);Hs.position.set(6.2,St.platformY+3,-1.5),t.add(Hs),Os.push(Hs);let b=new Ts(new _t(1,.82,.55),30,22,1.6);return b.position.set(0,(St.lanternTop+St.lanternBottom)/2,0),t.add(b),Os.push(b),{group:t,lens:Ot,lights:Os,glowMats:[S,v],leadMat:g,rock:w,dome:ps,lanternPos:new A(0,(St.lanternTop+St.lanternBottom)/2-.2,0),lampWorld:ct.map(P=>new A(...P).applyMatrix4(ms.matrixWorld)),update(P,D,st){let vt=pi.attributes.position,ft=1.6+D*.28,Nt=.14+Math.min(D,24)*.014;for(let Ft=0;Ft<vt.count;Ft++){let Zt=kr[Ft*3],Jt=kr[Ft*3+1],Tt=(Zt+1.2)/2.4,de=Math.sin(Tt*7-P*ft*3.2+Jt*1.2)*Nt*Tt*1.4+Math.sin(Tt*13-P*ft*5.1)*Nt*.35*Tt;vt.setXYZ(Ft,Zt*(1-.07*Tt*st),Jt+Math.sin(Tt*4-P*ft*2)*.06*Tt,de)}vt.needsUpdate=!0,pi.computeVertexNormals(),fi.rotation.y=Math.PI/4},flicker(P){let D=.92+.08*Math.sin(P*9.3)*Math.sin(P*3.1+1.3)+.03*Math.sin(P*23);S.color.setRGB(1*D*1.4,.62*D*1.4,.26*D*1.4),v.color.setRGB(1*D*1.5,.86*D*1.5,.6*D*1.5)}}}var Ov=1500,Yf=-.021,Hv=`
uniform float uLen;
uniform float uHalf;
varying vec3 vWorld;
varying vec3 vNormalW;
varying float vS;
void main(){
  // konik: apex z=0, uzunluk z=uLen
  float s = position.z * uLen;
  float r = 0.6 + s * uHalf;
  vec3 local = vec3(position.x * r, position.y * r, s);
  vec4 w = modelMatrix * vec4(local, 1.0);
  vWorld = w.xyz;
  vS = s;
  vec3 nl = normalize(vec3(position.x, position.y, -uHalf));
  vNormalW = normalize(mat3(modelMatrix) * nl);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,zv=`
${rn}
${Pi}
uniform float uIntensity;
uniform float uSign;
uniform vec3 uAxis;
varying vec3 vWorld;
varying vec3 vNormalW;
varying float vS;
void main(){
  vec3 V = normalize(uCamPos - vWorld);
  float ndv = abs(dot(normalize(vNormalW), V));
  float dist = length(uCamPos - vWorld);
  // yol uzunlu\u011Fu ~ ndv; kenarlar yumu\u015Fak
  float body = pow(ndv, 2.0);
  float along = smoothstep(3.0, 45.0, vS) * (1.0 / (1.0 + vS * 0.0042)) * exp(-vS * uBeamAtten);
  // ya\u011Fmur/sis i\xE7indeki par\xE7ac\u0131k dokusu
  float grain = 0.7 + 0.3 * vnoise(vec2(vS * 0.045 - uTime * 2.4, atan(vNormalW.x, vNormalW.z) * 9.0 + vS * 0.01));
  float streak = 0.75 + 0.25 * vnoise(vec2(vWorld.x * 0.4 + vWorld.z * 0.31 + uTime * 11.0, vWorld.y * 0.05 + uTime * 30.0));
  float density = 0.16 + 0.7 * uStorm;
  along *= 1.0 - smoothstep(0.55, 1.0, vS / 1500.0);
  // kameraya \xE7ok yakla\u015F\u0131nca s\xF6ns\xFCn (y\xFCzeyde patlamas\u0131n)
  float near = smoothstep(2.0, 16.0, dist) * smoothstep(-1.0, 7.0, vWorld.y);
  float axisAlign = abs(dot(uAxis, V));
  along *= 1.0 - 0.9 * smoothstep(0.80, 0.985, axisAlign);
  float a = body * along * grain * streak * density * uIntensity * near * uBeamAmt;
  vec3 col = vec3(1.0, 0.9, 0.7) * a;
  // sis rengiyle kar\u0131\u015Ft\u0131r (uzak h\xFCzme solukla\u015F\u0131r)
  col = mix(col, col * 0.7 + uFogColor * a * 0.6, 0.25);
  gl_FragColor = vec4(col, 1.0);
}
`,Sc=class{constructor(t,e){this.tower=e,this.angle=0,this.group=new Re,this.group.position.copy(e.lanternPos),t.add(this.group);let n=new xe(1,1,1,40,28,!0);n.rotateX(Math.PI/2),n.translate(0,0,.5),this.beams=[];for(let[r,o,a]of[[0,1,1],[1,-1,.55]]){let l=new re({uniforms:{...Pt,uLen:{value:Ov},uHalf:{value:.05},uIntensity:{value:a},uSign:{value:o},uAxis:{value:new A(1,0,0)}},vertexShader:Hv,fragmentShader:zv,transparent:!0,blending:cn,depthWrite:!1,side:Pe}),c=new pt(n,l);c.renderOrder=5,c.frustumCulled=!1,this.group.add(c),this.beams.push(c)}let s=xc(128);this.glowMat=new Ei({map:s,color:new _t(1,.85,.55),blending:cn,depthWrite:!1,transparent:!0,opacity:1}),this.glow=new Gi(this.glowMat),this.glow.scale.setScalar(14),this.glow.renderOrder=7,this.group.add(this.glow),this.glowMat2=new Ei({map:s,color:new _t(1,.9,.7),blending:cn,depthWrite:!1,transparent:!0,opacity:.4}),this.glow2=new Gi(this.glowMat2),this.glow2.scale.setScalar(120),this.glow2.renderOrder=7,this.group.add(this.glow2),this.spots=[];for(let r of[110,60]){let o=new Po(16769712,r,420,.085,.7,1.4);o.position.copy(e.lanternPos);let a=new Fe;t.add(a),o.target=a,t.add(o),this.spots.push(o)}this.dirs=[new A,new A],this._z=new A(0,0,1),this._tc=new A}update(t,e,n,s){this.angle=e/Rf*Math.PI*2;let r=Math.cos(this.angle),o=Math.sin(this.angle),a=this.dirs[0].set(r,Yf,o).normalize(),l=this.dirs[1].set(-r,Yf,-o).normalize();Pt.uBeamDir1.value.copy(a),Pt.uBeamDir2.value.copy(l),Pt.uLanternPos.value.copy(this.tower.lanternPos),Pt.uBeamAmt.value=1-.85*Math.max(0,s.daySmooth-.82)/.18,Pt.uBeamAtten.value=Pt.uFogDensity.value*1.6+12e-5;for(let _=0;_<2;_++){let m=this.dirs[_],p=this.beams[_];p.quaternion.setFromUnitVectors(this._z,m),p.material.uniforms.uHalf.value=Pt.uBeamHalf.value,p.material.uniforms.uAxis.value.copy(m)}for(let _=0;_<2;_++){let m=this.spots[_];m.target.position.copy(this.tower.lanternPos).addScaledVector(this.dirs[_],60),m.intensity=(_===0?110:60)*Pt.uBeamAmt.value}this.tower.lens.rotation.y=-this.angle+Math.PI/2;let c=this._tc.copy(n.position).sub(this.tower.lanternPos),h=c.length();c.divideScalar(h);let f=Math.max(0,Math.max(a.dot(c),.55*l.dot(c))),u=.55+3.6*Math.pow(f,6),d=Math.exp(-Math.pow(h*Pt.uFogDensity.value,1.5)),g=Math.max(.35,Math.min(1.4,h/45));this.glowMat.opacity=Math.min(1.1,.35*u*(.5+.5*d))*Pt.uBeamAmt.value,this.glow.scale.setScalar(9*g+7*f),this.glowMat2.opacity=Math.min(.6,.06+.38*Math.pow(f,4))*(.4+.6*s.stormSmooth)*Pt.uBeamAmt.value,this.glow2.scale.setScalar(36+70*f)}};var kv=`
${rn}
${di}
attribute vec3 aSeed;       // 0..1
uniform vec3 uBox;
uniform vec3 uVel;          // damla h\u0131z\u0131 (m/s)
uniform float uLen;         // \xE7izgi uzunlu\u011Fu (s cinsinden h\u0131z \xE7arpan\u0131)
uniform float uWidth;
uniform float uPx;
uniform float uIntensity;
uniform float uOpacity;
varying vec2 vUv;
varying float vAlpha;
varying vec3 vLight;
void main(){
  vec3 vel = uVel * (0.85 + 0.3 * aSeed.x);
  vec3 c = uCamPos;
  // d\xFCnyaya sabit d\xF6nen kutu: konum = box * fract(seed + vel*t/box - c/box)
  vec3 q = fract(aSeed + vel * uTime / uBox - c / uBox);
  vec3 head = c + (q - 0.5) * uBox;
  // kutu kenar\u0131nda s\xF6nme
  vec3 e = abs(q - 0.5) * 2.0;
  float edge = 1.0 - smoothstep(0.75, 1.0, max(max(e.x, e.y), e.z));
  vec3 tail = head - normalize(vel) * uLen * (0.7 + 0.6 * aSeed.z);
  vec4 vh = viewMatrix * vec4(head, 1.0);
  vec4 vt = viewMatrix * vec4(tail, 1.0);
  vec2 d = vh.xy / max(-vh.z, 0.1) - vt.xy / max(-vt.z, 0.1);
  d = length(d) < 1e-7 ? vec2(0.0, 1.0) : normalize(d);
  vec2 n = vec2(-d.y, d.x);
  vec4 vp = mix(vt, vh, position.y);
  float depth = max(-vp.z, 0.5);
  float wpx = uPx * depth * 1.15;
  float w = max(uWidth, wpx);
  vp.xy += n * position.x * w;
  vUv = vec2(position.x, position.y);
  // ince \xE7izgilerin enerjisini koru
  float thin = min(1.0, uWidth / wpx);
  vAlpha = edge * thin * uOpacity * (0.6 + 0.4 * aSeed.z) * smoothstep(0.6, 3.0, depth);
  // ayd\u0131nlatma: ortam + \u015Fim\u015Fek + fener h\xFCzmesi
  float bl = beamLit(head);
  float towerNear = exp(-length(head.xz) * 0.022) * exp(-max(head.y - 26.0, 0.0) * 0.03);
  vLight = (vec3(0.34, 0.42, 0.58) * (0.5 + 0.5 * uStorm) + uHorizon * 2.4 + uAmbient * 2.0) * uIntensity
         + vec3(0.7, 0.8, 1.0) * uFlash * 2.6
         + vec3(1.0, 0.88, 0.62) * bl * 9.0
         + vec3(1.0, 0.68, 0.38) * towerNear * 0.55
         + uSunColor * uSunAmt * 0.35;
  gl_Position = projectionMatrix * vp;
}
`,Vv=`
${rn}
varying vec2 vUv;
varying float vAlpha;
varying vec3 vLight;
void main(){
  float across = 1.0 - abs(vUv.x);
  float along = smoothstep(0.0, 0.25, vUv.y) * (1.0 - smoothstep(0.85, 1.0, vUv.y) * 0.4);
  float a = across * across * along * vAlpha;
  if (a < 0.002) discard;
  gl_FragColor = vec4(vLight, a);
}
`,bc=class{constructor(t){this.group=new Re,this.layers=[],this.addLayer(ye.rainNear,new A(46,34,46),.009,.9,.4),this.addLayer(ye.rainFar,new A(240,110,240),.028,3,.2),t.add(this.group)}addLayer(t,e,n,s,r){let o=Ve(t+9),a=new As;a.setAttribute("position",new he(new Float32Array([-1,0,0,1,0,0,-1,1,0,1,1,0]),3)),a.setIndex([0,1,2,1,3,2]);let l=new Float32Array(t*3);for(let f=0;f<l.length;f++)l[f]=o();a.setAttribute("aSeed",new vn(l,3)),a.instanceCount=t;let c=new re({uniforms:{...Pt,uBox:{value:e},uVel:{value:new A(6,-9,-6)},uLen:{value:s},uWidth:{value:n},uPx:{value:.001},uIntensity:{value:1},uOpacity:{value:r}},vertexShader:kv,fragmentShader:Vv,transparent:!0,depthWrite:!1,blending:ts,side:Pe}),h=new pt(a,c);h.frustumCulled=!1,h.renderOrder=8,this.group.add(h),this.layers.push({mesh:h,mat:c,count:t,opacity:r})}update(t,e){let n=t.stormSmooth,s=t.rain,r=t.wind,o=.7071*r*.55,a=-.7071*r*.55,l=2*Math.tan(Ue.degToRad(e.fov)/2)/(t.renderH||1080);for(let c of this.layers){let h=c.mat.uniforms;h.uVel.value.set(o,-(9.5+3*n),a),h.uPx.value=l,h.uOpacity.value=c.opacity*s,c.mesh.geometry.instanceCount=Math.floor(c.count*Math.min(1,.06+s*1)),c.mesh.visible=s>.01}}};var hs=1600,Gv=`
attribute vec3 aA;
attribute vec3 aB;
attribute vec2 aCorner;   // x: yan (-1,1), y: u\xE7 (0,1)
attribute vec3 aInfo;     // x: seviye parlakl\u0131\u011F\u0131, y: s\u0131ra (0..1), z: piksel geni\u015Fli\u011Fi
uniform float uPx;
uniform float uProgress;
varying float vSide;
varying float vLevel;
varying float vAlong;
void main(){
  vec4 va = viewMatrix * vec4(aA, 1.0);
  vec4 vb = viewMatrix * vec4(aB, 1.0);
  vec4 vp = mix(va, vb, aCorner.y);
  vec2 d = vb.xy / max(-vb.z, 1.0) - va.xy / max(-va.z, 1.0);
  d = length(d) < 1e-6 ? vec2(0.0, 1.0) : normalize(d);
  vec2 n = vec2(-d.y, d.x);
  float w = aInfo.z * uPx * max(-vp.z, 1.0);
  vec2 ext = d * w * 0.55 * (aCorner.y * 2.0 - 1.0);
  vp.xy += n * aCorner.x * w + ext;
  vSide = aCorner.x;
  vLevel = aInfo.x;
  // \xE7\u0131k\u0131\u015F s\u0131ras\u0131na g\xF6re ilerleme (y\u0131ld\u0131r\u0131m yukar\u0131dan a\u015Fa\u011F\u0131 \xE7akar)
  vAlong = step(aInfo.y, uProgress);
  gl_Position = projectionMatrix * vp;
}
`,Wv=`
uniform float uBoltI;
varying float vSide;
varying float vLevel;
varying float vAlong;
void main(){
  if (vAlong < 0.5) discard;
  float p = abs(vSide);
  float core = exp(-p * p * 26.0);
  float glow = exp(-p * 2.6) * 0.30;
  vec3 col = mix(vec3(0.45, 0.58, 1.0), vec3(1.0, 0.97, 0.95), core);
  gl_FragColor = vec4(col * (core * 2.4 + glow * 0.8) * uBoltI * vLevel, 1.0);
}
`,Ec=class{constructor(t,e){this.camera=e,this.rng=Ve(Pf*7+3),this.onThunder=null;let n=new ce;this.aA=new Float32Array(hs*4*3),this.aB=new Float32Array(hs*4*3),this.aCorner=new Float32Array(hs*4*2),this.aInfo=new Float32Array(hs*4*3);let s=new Uint32Array(hs*6);for(let o=0;o<hs;o++){let a=o*4;this.aCorner.set([-1,0,1,0,-1,1,1,1],o*8),s.set([a,a+1,a+2,a+1,a+3,a+2],o*6)}n.setAttribute("position",new he(new Float32Array(hs*4*3),3)),n.setAttribute("aA",new he(this.aA,3).setUsage(Ri)),n.setAttribute("aB",new he(this.aB,3).setUsage(Ri)),n.setAttribute("aCorner",new he(this.aCorner,2)),n.setAttribute("aInfo",new he(this.aInfo,3).setUsage(Ri)),n.setIndex(new he(s,1)),n.setDrawRange(0,0),this.geo=n,this.uniforms={uPx:{value:.001},uProgress:{value:1},uBoltI:{value:0}};let r=new re({uniforms:this.uniforms,vertexShader:Gv,fragmentShader:Wv,transparent:!0,blending:cn,depthWrite:!1,depthTest:!0,fog:!1,side:Pe});this.mesh=new pt(n,r),this.mesh.frustumCulled=!1,this.mesh.renderOrder=6,this.mesh.layers.enable(1),this.mesh.visible=!0,t.add(this.mesh),this.t=0,this.hold=null,this.active=!1,this.strokes=[],this.peak=1,this.visibleBolt=!0,this.nextIn=Xv(),this.queue=[],this.count=0}buildBolt(t,e){let n=this.rng,s=[],r=(u,d,g,_,m,p,M,S,v)=>{if(_===0)return s.push({a:u,b:d,o0:p,o1:M,bright:S,width:v}),[u,d];let T=d.clone().sub(u),E=u.clone().lerp(d,.42+n()*.16),C=new A(n()-.5,(n()-.5)*.35,n()-.5).cross(T);C.lengthSq()<1e-6&&C.set(1,0,0),C.normalize(),E.addScaledVector(C,(n()-.5)*2*m);let y=(p+M)/2;return[...r(u,E,g,_-1,m*.56,p,y,S,v),...r(E,d,g,_-1,m*.56,y,M,S,v)]},o=t.distanceTo(e),l=r(t,e,0,7,o*.085,0,1,1,6.5).filter((u,d)=>d%2===0),c=5+Math.floor(n()*6),h=(u,d,g,_,m)=>{let p=d.clone(),M=u.clone().addScaledVector(p,m);return r(u,M,_,_===1?5:4,m*.12,g,Math.min(1,g+m/o*.9),_===1?.6:.36,_===1?4:2.6)};for(let u=0;u<c;u++){let d=2+Math.floor(n()*(l.length-4)),g=l[d],m=1-Ie((g.y-e.y)/(t.y-e.y),0,1),p=new A((n()-.5)*1.6,-(.15+n()*.7),(n()-.5)*1.6).normalize(),M=o*(.1+n()*.28),S=h(g,p,m,1,M);if(n()<.7){let v=2+Math.floor(n()*Math.max(1,S.length-4)),T=S[Math.min(v,S.length-1)],E=new A((n()-.5)*2,-(.05+n()*.5),(n()-.5)*2).normalize();h(T,E,Math.min(1,m+.1),2,M*(.3+n()*.4))}}let f=1+Math.floor(n()*3);for(let u=0;u<f;u++){let d=Math.floor(n()*6),g=l[d],_=new A((n()-.5)*2,(n()-.5)*.08,(n()-.5)*2).normalize();h(g,_,Ie(d/l.length,0,1),1,o*(.25+n()*.4))}return s}writeBolt(t){let e=Math.min(t.length,hs);for(let n=0;n<e;n++){let s=t[n];for(let r=0;r<4;r++){let o=(n*4+r)*3;this.aA[o]=s.a.x,this.aA[o+1]=s.a.y,this.aA[o+2]=s.a.z,this.aB[o]=s.b.x,this.aB[o+1]=s.b.y,this.aB[o+2]=s.b.z,this.aInfo[o]=s.bright,this.aInfo[o+1]=r<2?s.o0:s.o1,this.aInfo[o+2]=s.width}}this.geo.attributes.aA.needsUpdate=!0,this.geo.attributes.aB.needsUpdate=!0,this.geo.attributes.aInfo.needsUpdate=!0,this.geo.setDrawRange(0,e*6)}strike(t={}){let e=this.rng,n=this.camera,s=new A;n.getWorldDirection(s),s.y=0,s.lengthSq()<1e-4&&s.set(1,0,0),s.normalize();let r=(e()-.5)*(t.manual?.5:.8)+(t.manual?0:e()<.5?.12:-.12),o=Math.cos(r),a=Math.sin(r),l=new A(s.x*o-s.z*a,0,s.x*a+s.z*o),c=700+e()*320,h=n.position.clone().addScaledVector(l,c);h.y=e()<.7?0:4+e()*30;let f=95+e()*75,u=h.clone();if(u.y=f,u.x+=(e()-.5)*240,u.z+=(e()-.5)*240,this.visibleBolt=!t.sheet,this.visibleBolt){let M=this.buildBolt(u,h);this.writeBolt(M)}else this.geo.setDrawRange(0,0);let d=u.clone().sub(n.position).normalize();Pt.uFlashDir.value.copy(d);let g=1-Ie((c-700)/320,0,1);this.peak=.85+g*.9+e()*.3;let _=3+Math.floor(e()*3);this.strokes=[];let m=0;for(let M=0;M<_;M++)this.strokes.push({t0:m,a:M===0?1:.45+e()*.6,tau:.05+e()*.06}),m+=.06+e()*.16;this.t=0,this.active=!0,this.uniforms.uProgress.value=0,this.dist=c,this.count++;let p=Math.max(1,Math.min(3,c/343));this.onThunder&&this.onThunder({delay:p,distance:c,loudness:Ie(.35+g*.65,0,1),sheet:!!t.sheet})}update(t,e){let s=Lt.stormSmooth;if(s>.22&&(this.nextIn-=t,this.nextIn<=0)){let a=wn(24,5.5,(s-.22)/.78);this.nextIn=Ie(-Math.log(1-this.rng())*a,2.5,a*2.6),this.strike({sheet:this.rng()<.25}),this.rng()<.28&&this.queue.push(.7+this.rng()*.9)}for(let a=this.queue.length-1;a>=0;a--)this.queue[a]-=t,this.queue[a]<=0&&(this.queue.splice(a,1),this.strike({}));let r=0;if(this.active){this.t=this.hold!==null?this.hold:this.t+t;for(let l of this.strokes){let c=this.t-l.t0;c>=0&&(r+=l.a*Math.exp(-c/l.tau)*(c<.012?c/.012:1))}let a=.18*Math.exp(-this.t/.5);r=Math.min(1.35,(r+a)*this.peak),this.uniforms.uProgress.value=Ie(this.t/.075,0,1.2),this.uniforms.uBoltI.value=this.visibleBolt?Ie(r*1.2,0,3):0,this.t>1.2&&(this.active=!1,this.geo.setDrawRange(0,0),r=0)}Pt.uFlash.value=r,Pt.uFlashGlow.value=r;let o=Lt.renderH||1080;this.uniforms.uPx.value=2*Math.tan(Ue.degToRad(e.fov)/2)/o,this.flash=r}};function Xv(){return ze.get("nostrike")==="1"?1e9:4.2}var qv=`
${rn}
${di}
attribute vec3 aPos;
attribute vec4 aData;   // ya\u015F, \xF6m\xFCr, boyut, t\xFCr (0 damla, 1 sis)
attribute vec3 aVel;
varying vec2 vUv;
varying float vA;
varying vec3 vLight;
varying float vType;
void main(){
  float age = aData.x, life = aData.y;
  float t = age / max(life, 0.01);
  float alive = step(0.0, age) * step(age, life);
  float grow = mix(1.0, 3.2, aData.w) * (0.35 + 0.65 * sqrt(clamp(t, 0.0, 1.0)));
  float size = aData.z * grow * alive;
  vec4 vp = viewMatrix * vec4(aPos, 1.0);
  vec3 vv = mat3(viewMatrix) * aVel;
  float spd = length(vv.xy);
  vec2 dir = spd > 0.01 ? vv.xy / spd : vec2(0.0, 1.0);
  float stretch = 1.0 + (1.0 - aData.w) * min(spd * 0.22, 3.2);
  vec2 q = position.xy;
  vp.xy += (dir * q.y * stretch + vec2(-dir.y, dir.x) * q.x) * size;
  vUv = position.xy;
  vType = aData.w;
  float fade = (1.0 - t) * smoothstep(0.0, 0.06, t);
  vA = fade * mix(0.85, 0.15, aData.w) * alive;
  float bl = beamLit(aPos);
  vLight = (uAmbient * 2.6 + uHorizon * 0.9 + vec3(0.03, 0.035, 0.045))
         + vec3(0.7, 0.8, 1.0) * uFlash * 2.4
         + vec3(1.0, 0.88, 0.62) * bl * 10.0
         + vec3(1.0, 0.68, 0.40) * 0.85 * exp(-length(aPos - vec3(0.0, 7.0, 0.0)) * 0.045);
  gl_Position = projectionMatrix * vp;
}
`,Yv=`
varying vec2 vUv;
varying float vA;
varying vec3 vLight;
varying float vType;
void main(){
  float r = length(vUv) * 2.0;
  float soft = smoothstep(1.0, 0.25, r);
  float a = soft * vA;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vLight, a);
}
`,Tc=rs[0];function Zv(i,t,e){let n=.5+.5*Math.sin((i*Tc.dx+t*Tc.dz)*Tc.k-e*jo*Tc.w+1.1);return n*n}var wc=class{constructor(t){let e=ye.sprayMax;this.N=e,this.pos=new Float32Array(e*3),this.vel=new Float32Array(e*3),this.data=new Float32Array(e*4);for(let o=0;o<e;o++)this.data[o*4]=-1;this.head=0,this.rnd=Ve(99);let n=new As;n.setAttribute("position",new he(new Float32Array([-.5,-.5,0,.5,-.5,0,-.5,.5,0,.5,.5,0]),3)),n.setIndex([0,1,2,1,3,2]),this.aPos=new vn(this.pos,3).setUsage(Ri),this.aData=new vn(this.data,4).setUsage(Ri),n.setAttribute("aPos",this.aPos),n.setAttribute("aData",this.aData),this.aVel=new vn(this.vel,3).setUsage(Ri),n.setAttribute("aVel",this.aVel),n.instanceCount=e;let s=new re({uniforms:{...Pt},vertexShader:qv,fragmentShader:Yv,transparent:!0,depthWrite:!1});this.mesh=new pt(n,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=9,t.add(this.mesh);let r=Ds(1.07,44);this.pts=r.map((o,a,l)=>{let c=l[(a+1)%l.length],h=l[(a-1+l.length)%l.length],f=c.y-h.y,u=-(c.x-h.x),d=Math.hypot(f,u)||1;f/=d,u/=d,f*(o.x-le.center.x)+u*(o.y-le.center.y)<0&&(f=-f,u=-u);let g=Math.max(0,-(f*.7071+u*-.7071));return{x:o.x,z:o.y,nx:f,nz:u,exposure:g,last:0}})}emit(t,e,n,s,r,o,a,l,c){let h=this.head;this.head=(this.head+1)%this.N,this.pos[h*3]=t,this.pos[h*3+1]=e,this.pos[h*3+2]=n,this.vel[h*3]=s,this.vel[h*3+1]=r,this.vel[h*3+2]=o,this.data[h*4]=0,this.data[h*4+1]=a,this.data[h*4+2]=l,this.data[h*4+3]=c}burst(t,e,n){let s=this.rnd,r=Math.floor((40+e*150)*(.4+.6*n)),o=Math.max(.8,St.platformY*.35);for(let l=0;l<r;l++){let c=(1.5+s()*4.5)*(.6+e),h=(5+s()*10.5)*(.55+.75*e),f=(s()-.5)*3.5,u=-t.nz,d=t.nx;this.emit(t.x+t.nx*(.3+s())+u*(s()-.5)*3,o+s()*1.2,t.z+t.nz*(.3+s())+d*(s()-.5)*3,t.nx*c+u*f,h,t.nz*c+d*f,1+s()*1.7,.05+s()*s()*s()*.55+s()*.06,0)}let a=Math.floor(2+e*5);for(let l=0;l<a;l++)this.emit(t.x+t.nx*s()*2,o+.5+s()*2.5,t.z+t.nz*s()*2,t.nx*(1+s()*2),1.5+s()*3,t.nz*(1+s()*2),1.6+s()*1.8,1+s()*1.2,1)}update(t,e,n){let s=n.stormSmooth;if(s>.06)for(let h of this.pts){if(h.exposure<.08)continue;let f=Zv(h.x,h.z,e);if(f>.68&&h.last<=.68){let u=h.exposure*(.35+.65*f);this.rnd()<.3+.7*s&&this.burst(h,u*(.4+.9*s),s)}h.last=f}let r=n.wind,o=.7071*r,a=-.7071*r,l=this.N,c=this.data;for(let h=0;h<l;h++){let f=c[h*4];if(f<0)continue;let u=c[h*4+1],d=f+t;if(d>u){c[h*4]=-1;continue}c[h*4]=d;let g=c[h*4+3],_=g>.5?.9:.15;this.vel[h*3]+=(o-this.vel[h*3])*_*t,this.vel[h*3+2]+=(a-this.vel[h*3+2])*_*t,this.vel[h*3+1]-=(g>.5?.6:9.8)*t,this.pos[h*3]+=this.vel[h*3]*t,this.pos[h*3+1]+=this.vel[h*3+1]*t,this.pos[h*3+2]+=this.vel[h*3+2]*t,g<.5&&this.pos[h*3+1]<En(this.pos[h*3],this.pos[h*3+2],e)&&this.vel[h*3+1]<0&&(c[h*4]=-1)}this.aPos.needsUpdate=!0,this.aData.needsUpdate=!0,this.aVel.needsUpdate=!0}};var $v=258;function Nr(i){return $v+16*Math.sin(i*.0042)+9*Math.sin(i*.0113+1.3)}function us(i,t){let e=Nr(t),n=i-e;if(n<0)return-6;let s=3.4,r=130*Math.pow(ti(30,950,n),1.1)*(.65+.7*Tn(i*.0016,t*.0016,4,7)),o=9*(Tn(i*.011,t*.011,3,3)-.5);return s+r+o*ti(20,200,n)+(n<10?-1.2*(1-n/10):0)}function Jv(i,t,e,n,s){let r=[],o=new Ne(n*1.7,e*.11,n*1.7);o.translate(0,e*.055,0),r.push(o);let a=new xe(n*.62,n*.78,e*.6,14);a.translate(0,e*.11+e*.3,0),r.push(a);let l=new xe(n*1.25,n*1,e*.045,14);l.translate(0,e*.68,0),r.push(l);let c=new xe(n*1.25,n*1.25,e*.028,14,1,!0);c.translate(0,e*.7,0),r.push(c);let h=new xe(n*.5,n*.6,e*.16,14);h.translate(0,e*.78,0),r.push(h);let f=new li(n*.62,e*.2,14);f.translate(0,e*.9,0),r.push(f);let u=new xe(n*.04,n*.06,e*.08,5);u.translate(0,e*1.03,0),r.push(u);let d=pn(r.map(g=>g.toNonIndexed()));d.translate(i,0,t),s.push(d)}function Kv(i,t,e,n,s,r=.85){let o=new qe(n,20,12,0,Math.PI*2,0,Math.PI/2);o.scale(1,r,1),o.translate(i,t,e),s.push(o.toNonIndexed())}function Li({x:i,z:t,y:e=0,r:n=10,minarets:s=2,mh:r=40,rot:o=0,halfDomes:a=4,court:l=!0,scaleY:c=1}){let h=[],f=new Ne(n*2.1,n*1,n*2.1);f.translate(0,n*.5,0),h.push(f.toNonIndexed());let u=new xe(n*.98,n*1.02,n*.36,24);u.translate(0,n*1.18,0),h.push(u.toNonIndexed()),Kv(0,n*1.36,0,n,h,.92);let d=[[1,0],[-1,0],[0,1],[0,-1]];for(let p=0;p<Math.min(a,4);p++){let[M,S]=d[p],v=new qe(n*.62,14,8,0,Math.PI*2,0,Math.PI/2);v.scale(1,.85,1),v.translate(M*n*1.35,n*.95,S*n*1.35),h.push(v.toNonIndexed())}for(let[p,M]of[[1,1],[-1,1],[1,-1],[-1,-1]]){let S=new qe(n*.26,10,6,0,Math.PI*2,0,Math.PI/2);S.translate(p*n*.95,n*1,M*n*.95),h.push(S.toNonIndexed())}if(l){let p=new Ne(n*1.9,n*.32,n*1.5);p.translate(0,n*.16,n*2.2),h.push(p.toNonIndexed());for(let M of[-.8,-.4,0,.4,.8]){let S=new qe(n*.22,8,5,0,Math.PI*2,0,Math.PI/2);S.translate(M*n*.9,n*.32,n*2.2),h.push(S.toNonIndexed())}}let g=[];(s===1?[[n*1.15,n*1.6]]:s===2?[[-n*1.1,n*1.05],[n*1.1,n*1.05]]:s===4?[[-n*1.2,-n*1.2],[n*1.2,-n*1.2],[-n*1.2,n*1.2],[n*1.2,n*1.2]]:[[-n*1.2,-n*1.2],[n*1.2,-n*1.2],[-n*1.2,n*1.2],[n*1.2,n*1.2],[-n*1,n*2.9],[n*1,n*2.9]]).forEach((p,M)=>Jv(p[0],p[1],r*(s===6&&M>=4?.78:1),Math.max(.9,n*.11),g));let m=pn([...h,...g.map(p=>p.index?p.toNonIndexed():p)]);return m.scale(1,c,1),m.rotateY(o),m.translate(i,e,t),m}function Zf(i,t,e,n,s,r,o,a){let l=new yn(t-i,n-e,s,r);l.rotateX(-Math.PI/2),l.translate((i+t)/2,0,(e+n)/2);let c=l.attributes.position,h=new Float32Array(c.count*3);for(let f=0;f<c.count;f++){let u=c.getX(f),d=c.getZ(f),g=o(u,d);c.setY(f,g);let _=a(u,d,g);h[f*3]=_[0],h[f*3+1]=_[1],h[f*3+2]=_[2]}return l.setAttribute("color",new he(h,3)),l.computeVertexNormals(),l}var jv=`
attribute vec3 aColor;
attribute vec2 aSp;   // boyut(m), faz
uniform float uTime, uNightLights, uFogDensity, uPxScale, uStorm, uDay;
varying vec3 vColor;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float depth = max(-mv.z, 1.0);
  float px = aSp.x * uPxScale / depth;
  float size = clamp(px, 1.6, 18.0);
  gl_PointSize = size;
  float fl = 0.88 + 0.12 * sin(uTime * (1.5 + aSp.y * 4.0) + aSp.y * 60.0);
  float fog = exp(-pow(depth * uFogDensity * 0.85, 1.5));
  // k\xFC\xE7\xFCk noktalarda enerji koru; yak\u0131nda \xE7ok parlamas\u0131n
  float e = min(1.0, px / 1.6);
  vColor = aColor * fl * uNightLights * fog * (0.45 + 0.55 * e) * (1.0 - 0.3 * uStorm);
  gl_Position = projectionMatrix * mv;
}
`,Qv=`
varying vec3 vColor;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c) * 2.0;
  float a = pow(clamp(1.0 - r, 0.0, 1.0), 1.6);
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor * a, 1.0);
}
`,ty=`
varying vec3 vWorld;
varying vec3 vN;
varying vec3 vCol;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  vWorld = wp.xyz;
  vN = normalize(mat3(modelMatrix) * normalize(mat3(instanceMatrix) * normal));
  #ifdef USE_INSTANCING_COLOR
    vCol = instanceColor;
  #else
    vCol = vec3(0.08);
  #endif
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,ey=`
${rn}
${Pi}
varying vec3 vWorld;
varying vec3 vN;
varying vec3 vCol;
void main(){
  vec3 N = normalize(vN);
  float dist = length(vWorld - uCamPos);
  float side = 1.0 - step(0.6, abs(N.y));
  // cephe koordinat\u0131 (y\xFCze g\xF6re yatay eksen)
  vec2 fc = vec2(dot(vWorld.xz, vec2(-N.z, N.x)), vWorld.y);
  vec2 cs = vec2(3.6, 3.3);
  vec2 cell = floor(fc / cs);
  vec2 f = fract(fc / cs);
  float win = step(0.22, f.x) * step(f.x, 0.72) * step(0.28, f.y) * step(f.y, 0.78) * side;
  float wfade = 1.0 - smoothstep(380.0, 1100.0, dist);
  float r = hash21(cell * 1.37 + floor(vWorld.x * 0.071 + vWorld.z * 0.093) * 3.1);
  float litP = mix(0.30, 0.10, smoothstep(0.0, 1.0, uDay)) * uNightLights;
  float lit = step(1.0 - litP, r) * win * wfade;
  vec3 warm = mix(vec3(2.4, 1.45, 0.62), vec3(1.5, 1.7, 2.1), step(0.9, fract(r * 13.7)));
  // \u0131\u015F\u0131kland\u0131rma
  vec3 ambient = uAmbient * 2.0 + vec3(0.010, 0.012, 0.016);
  vec3 flash = vec3(0.62, 0.74, 1.0) * uFlash * (0.7 + 0.5 * N.y);
  vec3 sun = uSunColor * uSunAmt * max(dot(N, normalize(uSunDir)), 0.0) * 0.9;
  vec3 moon = vec3(0.4, 0.5, 0.8) * uMoonAmt * max(dot(N, normalize(uMoonDir)), 0.0) * 0.06;
  vec3 base = vCol * (ambient + flash + sun + moon);
  // cam: koyu, g\xF6ky\xFCz\xFCn\xFC hafif yans\u0131t\u0131r
  base = mix(base, base * 0.45 + uHorizon * 0.10 + flash * 0.25, win * wfade * (1.0 - lit));
  vec3 col = base + warm * lit * (0.55 + 0.6 * hash21(cell + 9.0));
  float f2 = 1.0 - exp(-pow(dist * uFogDensity, 1.6));
  col = mix(col, uFogColor, clamp(f2, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;function ny(){let i=new Ne(1,1,1);return i.translate(0,.5,0),i.deleteAttribute("uv"),i.toNonIndexed()}function iy(){return new re({uniforms:{...Pt},vertexShader:ty,fragmentShader:ey})}var Ac=class{constructor(t){this.group=new Re;let e=Ve(1071),n=new xr({vertexColors:!0}),s=iy(),r=new xr({color:9278368,emissive:new _t(.05,.036,.022)});this.mosqueMat=r,this.bldMat=s;let o=Zf(Nr(0)-30,2600,-3200,3200,90,220,us,(rt,yt,k)=>{let G=Tn(rt*.02,yt*.02,3,2);return[.05+G*.05,.06+G*.055,.055+G*.05]}),a=new pt(o,n);a.name="uskudar-arazi",this.group.add(a);let l=ye.cityBuildings,c=ny(),h=new Wi(c,s,Math.floor(l*1.4)),f=0,u=new me,d=new on,g=new A,_=new A,m=new _t,p=[],M=[],S=[],v=(rt,yt,k,G,K)=>{p.push(rt,yt,k),M.push(G[0],G[1],G[2]),S.push(K,e())},T=[[2.6,1.6,.7],[2.2,1.3,.55],[2,1.7,1],[1.7,2,2.4],[2.5,.9,.4]];for(let rt=0;rt<l;rt++){let yt=Math.pow(e(),1.9),k=Nr(0)+34+yt*1150,G=(e()-.5)*3e3*(.55+.45*(1-yt)),K=us(k,G),mt=1-yt,ct=6+e()*9,gt=6+e()*9,qt=5+e()*(7+20*mt*e());d.setFromAxisAngle(new A(0,1,0),.32+(e()<.5?.02:-.03)+(e()-.5)*.15),_.set(k,K-.5,G),g.set(ct,qt,gt),u.compose(_,d,g),h.setMatrixAt(f,u);let Q=.05+e()*.06;h.setColorAt(f,m.setRGB(Q*1.05,Q,Q*.95+e()*.02)),f++,e()<.4&&(_.set(k+(e()-.5)*ct*.3,K-.5+qt,G+(e()-.5)*gt*.3),g.set(ct*(.35+e()*.4),2.2+e()*3.5,gt*(.35+e()*.4)),h.setMatrixAt(f,u.compose(_,d,g)),h.setColorAt(f,m.setRGB(Q*.9,Q*.9,Q*.9)),f++);let at=Math.floor(e()*4)+(mt>.5?1:0);for(let ht=0;ht<at&&p.length/3<ye.cityLights;ht++){if(e()<.3)continue;let ut=e()<.5?-1:1,Mt=(e()-.5)*ct,Gt=2+e()*(qt-3),Ht=new A(Mt,Gt,ut*gt*.5+.2).applyQuaternion(d),Wt=T[Math.floor(e()*T.length)];v(k+Ht.x,K-.5+Ht.y,G+Ht.z,Wt.map(Xt=>Xt*(.9+e()*.7)),.9+e()*.9)}}h.count=f,h.instanceMatrix.needsUpdate=!0,h.instanceColor&&(h.instanceColor.needsUpdate=!0),h.frustumCulled=!1,h.name="uskudar-binalar",this.group.add(h);for(let rt=-1500;rt<=1500;rt+=11){let yt=Nr(rt)+7+(e()-.5)*2;v(yt,us(yt,rt)+5.5,rt,[4.2,2.4,1],1.6)}for(let rt=0;rt<260;rt++){let yt=Nr(0)+60+e()*500,k=(e()-.5)*2600;v(yt,us(yt,k)+5,k,[3,1.9,.9],1.4)}let E=[],C=Nr(0);E.push(Li({x:C+14,z:22,y:3,r:3.6,minarets:1,mh:17,rot:.3,halfDomes:0,court:!0})),E.push(Li({x:C+88,z:-128,y:us(C+88,-128),r:10.5,minarets:2,mh:44,rot:.32,halfDomes:4})),E.push(Li({x:C+104,z:150,y:us(C+104,150),r:9.5,minarets:2,mh:40,rot:.3,halfDomes:3}));for(let[rt,yt,k,G,K]of[[430,-360,9,38,2],[610,330,10,42,2],[820,-40,8.5,36,2],[300,470,7.5,32,1],[520,-700,8,34,2]]){let mt=C+rt;E.push(Li({x:mt,z:yt,y:us(mt,yt)-1,r:k,minarets:K,mh:G,rot:.3,halfDomes:2}))}{let rt=[],yt=C+300,k=1350,G=us(yt,k),K=new Ne(220,26,220);K.translate(0,13,0),rt.push(K.toNonIndexed());for(let[ct,gt]of[[-1,-1],[1,-1],[-1,1],[1,1]]){let qt=new xe(9,10,44,14);qt.translate(ct*110,22,gt*110),rt.push(qt.toNonIndexed());let Q=new li(11,14,14);Q.translate(ct*110,51,gt*110),rt.push(Q.toNonIndexed())}let mt=pn(rt);mt.translate(yt,G-2,k),E.push(mt)}let y=new pt(pn(E.map(rt=>rt.index?rt.toNonIndexed():rt)),r);y.name="uskudar-camiler",this.group.add(y);for(let[rt,yt,k]of[[88,-128,46],[104,150,42]])v(C+rt,k,yt,[4.5,3.8,2.6],1.8);let w=new Re,I=new A(-1330,0,-520),N=Math.atan2(-I.z,-I.x);w.position.copy(I),w.rotation.y=-N+Math.PI/2,w.scale.setScalar(1.3);let H=(rt,yt)=>{let k=40*Math.sin(rt*.004)-60*Math.exp(-Math.pow((rt-30)/200,2))*-1,G=-(yt-k);if(G<0)return-6;let K=-Math.exp(-Math.pow((rt-330)/90,2))*60*ti(0,120,G);return 3+48*ti(20,520,G)*(.75+.45*Tn(rt*.004,yt*.004,3,11))+K*0},V=Zf(-1400,1400,-1200,300,90,70,H,(rt,yt,k)=>{let G=Tn(rt*.02,yt*.02,3,2);return[.045+G*.04,.05+G*.04,.05+G*.04]});w.add(new pt(V,n));let L=Math.floor(ye.cityBuildings*.6),O=new Wi(c,s,L),X=[];for(let rt=0;rt<L;rt++){let yt=(e()-.5)*2100+150,k=-(e()*e())*800+40,G=H(yt,k);if(G<0){O.setMatrixAt(rt,u.makeScale(0,0,0));continue}let K=7+e()*11,mt=7+e()*11,ct=6+e()*11;_.set(yt,G-.5,k),g.set(K,ct,mt),d.setFromAxisAngle(new A(0,1,0),(e()-.5)*.5),O.setMatrixAt(rt,u.compose(_,d,g));let gt=.045+e()*.05;O.setColorAt(rt,m.setRGB(gt,gt*1.02,gt*1.08)),e()<.7&&X.length/3<ye.cityLights*.6&&X.push(yt+(e()-.5)*K,G+2+e()*(ct-2),k+mt*.5)}O.frustumCulled=!1,w.add(O);let q=[],nt=(rt,yt)=>H(rt,yt),Z=1.25;q.push(Li({x:-150,z:-330,y:nt(-150,-330),r:16,minarets:4,mh:58,rot:.15,halfDomes:2,court:!1,scaleY:Z})),q.push(Li({x:-340,z:-380,y:nt(-340,-380),r:13,minarets:6,mh:62,rot:.1,halfDomes:4,court:!0,scaleY:Z})),q.push(Li({x:210,z:-470,y:nt(210,-470),r:14,minarets:4,mh:60,rot:.2,halfDomes:2,court:!0,scaleY:Z})),q.push(Li({x:420,z:-520,y:nt(420,-520),r:8,minarets:2,mh:36,rot:.1,halfDomes:2,scaleY:Z})),q.push(Li({x:-520,z:-300,y:nt(-520,-300),r:7,minarets:2,mh:32,rot:.1,halfDomes:2,scaleY:Z}));{let rt=[];for(let k=0;k<16;k++){let G=-30+e()*240,K=-70-e()*180,mt=5+e()*8,ct=new Ne(mt*1.6,mt,mt*1.4);ct.translate(0,mt/2,0),ct.translate(G,nt(G,K),K),rt.push(ct.toNonIndexed());let gt=new qe(mt*.6,10,6,0,6.29,0,1.57);gt.translate(G,nt(G,K)+mt,K),rt.push(gt.toNonIndexed())}for(let[k,G,K]of[[60,-40,30],[150,-110,34]]){let mt=new xe(4,5,K,10);mt.translate(k,nt(k,G)+K/2,G),rt.push(mt.toNonIndexed());let ct=new li(5.6,10,10);ct.translate(k,nt(k,G)+K+5,G),rt.push(ct.toNonIndexed())}let yt=new Ne(520,9,4);yt.translate(90,5,-20),yt.translate(0,nt(90,-20),0),rt.push(yt.toNonIndexed()),q.push(pn(rt))}{let k=nt(640,-560)+22,G=new xe(7.5,8.6,58,20);G.translate(640,k+29,-560);let K=new xe(9.5,7.5,6,20);K.translate(640,k+60,-560);let mt=new li(9,19,20);mt.translate(640,k+72,-560),q.push(pn([G.toNonIndexed(),K.toNonIndexed(),mt.toNonIndexed()]))}let $=new pt(pn(q.map(rt=>rt.index?rt.toNonIndexed():rt)),r);w.add($);let et=[];for(let rt=0;rt<X.length;rt+=3){let yt=T[Math.floor(e()*T.length)];et.push({p:new A(X[rt],X[rt+1],X[rt+2]),c:yt.map(k=>k*1.1),s:1.3+e()*1})}w.updateMatrixWorld(!0);for(let rt of et){let yt=rt.p.clone().applyMatrix4(w.matrixWorld);v(yt.x,yt.y,yt.z,rt.c,rt.s)}for(let[rt,yt,k]of[[-150,-330,16],[-340,-380,13],[210,-470,14]]){let G=new A(rt,nt(rt,yt)+k*1.5,yt).applyMatrix4(w.matrixWorld);v(G.x,G.y,G.z,[3.6,2.6,1.6],8)}{let rt=new A(640,nt(640,-560)+22+62,-560).applyMatrix4(w.matrixWorld);v(rt.x,rt.y,rt.z,[3.6,2.9,1.9],6)}this.group.add(w),this.old=w;let Ut=p.length/3,bt=new ce;bt.setAttribute("position",new jt(p,3)),bt.setAttribute("aColor",new jt(M,3)),bt.setAttribute("aSp",new jt(S,2)),this.lightMat=new re({uniforms:{...Pt,uPxScale:{value:800}},vertexShader:jv,fragmentShader:Qv,transparent:!0,depthWrite:!1,blending:cn});let ie=new go(bt,this.lightMat);ie.frustumCulled=!1,ie.renderOrder=4,ie.name="sehir-isiklari",this.group.add(ie),this.lightCount=Ut,this.group.traverse(rt=>rt.layers.enable(1)),t.add(this.group)}setPxScale(t){this.lightMat.uniforms.uPxScale.value=t}update(t,e,n){this.lightMat.uniforms.uPxScale.value=e/(2*Math.tan(Ue.degToRad(t.fov)/2)),this.mosqueMat.emissive.setRGB(.05*(1-.6*n),.036*(1-.6*n),.022*(1-.6*n))}};var te=58,Le=11.5,Rc=150,Cc=-540,Pc=900,bu=-900,ds=(Rc-Cc)/2,ea=Pc-bu,Su=2*ea+2*Math.PI*ds;function sy(i){if(i=(i%Su+Su)%Su,i<ea)return{x:Rc,z:Pc-i,h:-Math.PI/2};i-=ea;let t=Math.PI*ds;if(i<t){let r=i/ds,o=(Rc+Cc)/2,a=bu;return{x:o+Math.cos(r)*ds,z:a-Math.sin(r)*ds,h:-Math.PI/2-r}}if(i-=t,i<ea)return{x:Cc,z:bu+i,h:Math.PI/2};i-=ea;let e=i/ds,n=(Rc+Cc)/2,s=Pc;return{x:n-Math.cos(e)*ds,z:s+Math.sin(e)*ds,h:Math.PI/2-e}}function $f(i,t,e,n){let s=Ve(n),r=20,o=26,a=document.createElement("canvas");a.width=i*r,a.height=t*o;let l=a.getContext("2d");l.fillStyle="#000",l.fillRect(0,0,a.width,a.height);for(let h=0;h<t;h++)for(let f=0;f<i;f++){if(s()>e)continue;let u=s();l.fillStyle=u<.8?"#ffd58a":"#fff2cf",l.fillRect(f*r+4,h*o+5,r-8,o-12)}let c=new Xi(a);return c.colorSpace=tn,c.wrapS=c.wrapT=Zn,c}var Ic=class{constructor(t){this.s=Pc-100,this.speed=9.5;let e=new Re;this.root=e;let n=new Ze({color:14278114,roughness:.7}),s=new Ze({color:1317410,roughness:.65}),r=new Ze({color:9051159,roughness:.7}),o=new Ze({color:987670,roughness:.8}),a=new Kn;a.moveTo(te/2,0),a.bezierCurveTo(te*.32,Le*.5,te*.05,Le*.5,-te*.36,Le*.5),a.lineTo(-te*.5,Le*.38),a.lineTo(-te*.5,-Le*.38),a.lineTo(-te*.36,-Le*.5),a.bezierCurveTo(te*.05,-Le*.5,te*.32,-Le*.5,te/2,0);let l=new gr(a,{depth:4.2,bevelEnabled:!1,curveSegments:16});l.rotateX(-Math.PI/2),l.translate(0,-1.6,0);{let L=l.attributes.position;for(let O=0;O<L.count;O++){let X=Math.max(0,L.getX(O)/(te/2)),q=Math.max(0,-L.getX(O)/(te/2));L.setY(O,L.getY(O)+(L.getY(O)>0?1.3*X*X+.5*q*q:.9*X*X*X))}l.computeVertexNormals()}let c=new pt(l,[s,s]);e.add(c);let h=new pt(new gr(a,{depth:1.1,bevelEnabled:!1,curveSegments:16}).rotateX(-Math.PI/2).translate(0,1.5,0),r);h.scale.set(1.001,1,1.001),e.add(h);let f=new pt(new Ne(te*.66,3,Le*.86),n);f.position.set(-te*.06,4.1,0);let u=$f(28,1,.92,4),d=$f(22,1,.9,9),g=(L,O)=>{let X=L.clone();return X.repeat.set(O,1),X.needsUpdate=!0,new Ze({color:13620442,roughness:.7,emissiveMap:X,emissive:new _t(2.2,1.7,1),emissiveIntensity:1})},_=(L,O,X,q,nt,Z,$,et)=>{let Ut=new pt(new yn(L,O),g($,et));return Ut.position.set(q,nt,Z),Ut};e.add(f);for(let L of[-1,1]){let O=_(te*.62,1.5,0,-te*.06,4.35,L*(Le*.43+.02),u,1);L<0&&(O.rotation.y=Math.PI),e.add(O)}let m=new pt(new Ne(te*.5,2.8,Le*.7),n);m.position.set(-te*.08,6.9,0),e.add(m);for(let L of[-1,1]){let O=_(te*.46,1.4,0,-te*.08,7,L*(Le*.35+.02),d,1);L<0&&(O.rotation.y=Math.PI),e.add(O)}let p=_(Le*.6,1.4,0,0,7,0,d,.3);p.rotation.y=Math.PI/2,p.position.set(-te*.08+te*.25+.02,7,0),e.add(p);let M=new pt(new Ne(te*.14,2.6,Le*.55),n);M.position.set(te*.14,9.3,0),e.add(M);let S=new pt(new Ne(.1,1,Le*.5),new an({color:new _t(2.6,2,1.1)}));S.position.set(te*.14+te*.07+.02,9.45,0),e.add(S);let v=new pt(new xe(1.7,2,7.5,16),n);v.scale.z=1.2,v.position.set(-te*.14,11.2,0),e.add(v);let T=new pt(new xe(1.72,1.72,2,16),o);T.scale.z=1.2,T.position.set(-te*.14,14.2,0),e.add(T);let E=new pt(new xe(1.78,1.78,.7,16),r);E.scale.z=1.2,E.position.set(-te*.14,13,0),e.add(E);let C=new pt(new xe(.1,.16,8,6),o);C.position.set(te*.14,15,0),e.add(C);let y=L=>new an({color:L}),w=(L,O,X,q,nt=.28)=>{let Z=new pt(new qe(nt,8,6),y(L));return Z.position.set(O,X,q),e.add(Z),Z};w(new _t(6,6,5.5),te*.14,19,0,.35),w(new _t(6,.3,.2),te*.22,8.8,Le*.27),w(new _t(.3,5,.6),te*.22,8.8,-Le*.27),w(new _t(5,4.5,3.8),-te*.46,6,0,.3);for(let L=0;L<7;L++)w(new _t(4,3.2,2),-te*.32+L*6.5,5.9,L%2?Le*.44:-Le*.44,.18);let I=xc(64),N=(L,O,X,q,nt,Z)=>{let $=new Gi(new Ei({map:I,color:L,blending:cn,depthWrite:!1,transparent:!0,opacity:Z}));return $.scale.setScalar(O),$.position.set(X,q,nt),e.add($),$};N(new _t(1,.95,.85),16,te*.14,19,0,.9),N(new _t(1,.75,.4),60,-te*.06,6.5,0,.32),N(new _t(1,.3,.2),8,te*.22,8.8,Le*.27,.8),N(new _t(.3,1,.4),8,te*.22,8.8,-Le*.27,.8);let H=new yn(190,15,1,1);H.rotateX(-Math.PI/2),H.translate(-te*.5-95,0,0),this.wakeMat=new re({uniforms:{...Pt},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`
        uniform vec3 uHorizon, uAmbient; uniform float uFlash, uTime;
        varying vec2 vUv;
        float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
        void main(){
          float along = 1.0 - vUv.x; // 0 = gemi, 1 = uzak
          float across = abs(vUv.y - 0.5) * 2.0;
          float spread = 0.25 + along * 0.75;
          float m = smoothstep(spread, spread * 0.3, across);
          float nz = n(vec2(along * 40.0 - uTime * 0.4, vUv.y * 14.0)) * 0.6 + n(vec2(along * 90.0, vUv.y * 30.0 - uTime)) * 0.4;
          float a = m * (1.0 - along) * smoothstep(0.25, 0.7, nz) * 0.55;
          vec3 c = vec3(0.5, 0.58, 0.65) * (0.05 + length(uAmbient) * 1.5) + uFlash * vec3(0.5, 0.6, 0.9);
          gl_FragColor = vec4(c, a);
        }`,transparent:!0,depthWrite:!1});let V=new pt(H,this.wakeMat);V.renderOrder=2,this.wake=V,e.add(V),t.add(e),this.lightPos=new A,this.roll=0,this.pitch=0,e.traverse(L=>L.layers.enable(1))}update(t,e){this.s+=this.speed*t;let n=sy(this.s),s=Math.cos(n.h),r=Math.sin(n.h),o=En(n.x+s*te*.4,n.z+r*te*.4,e),a=En(n.x-s*te*.4,n.z-r*te*.4,e),l=En(n.x-r*Le*.5,n.z+s*Le*.5,e),c=En(n.x+r*Le*.5,n.z-s*Le*.5,e),h=(o+a+l+c)/4,f=Math.atan2(o-a,te*.8),u=Math.atan2(l-c,Le),d=Math.min(1,t*2.5);this.pitch+=(f-this.pitch)*d,this.roll+=(u*1.5-this.roll)*d,this.root.position.set(n.x,h*.9-.3,n.z),this.root.rotation.set(0,0,0),this.root.rotation.order="YZX",this.root.rotation.y=-n.h,this.root.rotation.z=this.pitch,this.root.rotation.x=this.roll,this.root.updateMatrixWorld(),this.lightPos.set(0,7,0).applyMatrix4(this.root.matrixWorld),this.wake.position.y=.35-(h*.9-.3)+h*.4}};function ry(){let i=[],t=[.6,.64,.7],e=[.93,.94,.97],n=[.1,.11,.13],s=[.95,.72,.15],r=(g,_)=>{let m=g.attributes.position,p=g.attributes.normal,M=new Float32Array(m.count*3);for(let S=0;S<m.count;S++){let v=_(m.getX(S),m.getY(S),m.getZ(S),p.getY(S));M[S*3]=v[0],M[S*3+1]=v[1],M[S*3+2]=v[2]}return g.setAttribute("aColor",new he(M,3)),g},o=[];for(let g=0;g<=10;g++){let _=g/10;o.push(new W(.001+.078*Math.pow(Math.sin(Math.PI*Math.min(.98,_*.96+.02)),.75),-.3+_*.62))}let a=new Hn(o,8);a.rotateZ(-Math.PI/2),a.scale(1,.85,1),a=a.toNonIndexed(),a.deleteAttribute("uv"),a.computeVertexNormals(),i.push(r(a,(g,_,m,p)=>p>.15?t:e));let l=new qe(.052,8,6);l.translate(.345,.026,0),l=l.toNonIndexed(),l.deleteAttribute("uv"),i.push(r(l,()=>e));let c=new li(.02,.085,5);c.rotateZ(-Math.PI/2),c.translate(.43,.012,0),c=c.toNonIndexed(),c.deleteAttribute("uv"),i.push(r(c,()=>s));let h=[-.28,.01,0,-.5,.005,.09,-.5,.005,-.09],f=new ce;f.setAttribute("position",new jt(h,3)),f.computeVertexNormals(),i.push(r(f,()=>e));let u=[[0,.11,-.13,.02],[.24,.1,-.15,.06],[.46,.05,-.17,.1],[.64,-.06,-.2,.1]],d=[-.2,.09,.76];for(let g of[1,-1]){let _=[],m=(...E)=>_.push(...E);for(let E=0;E<u.length-1;E++){let C=u[E],y=u[E+1],w=[C[1],C[3],C[0]*g],I=[C[2],C[3]-.01,C[0]*g],N=[y[1],y[3],y[0]*g],H=[y[2],y[3]-.01,y[0]*g];g>0?m(...w,...I,...N,...I,...H,...N):m(...w,...N,...I,...I,...N,...H)}let p=u[u.length-1],M=[p[1],p[3],p[0]*g],S=[p[2],p[3]-.01,p[0]*g],v=[d[0],d[1],d[2]*g];g>0?m(...M,...S,...v):m(...M,...v,...S);let T=new ce;T.setAttribute("position",new jt(_,3)),T.computeVertexNormals(),i.push(r(T,(E,C,y)=>{let w=Math.abs(y);return w>.55?n:w>.46?[.32,.34,.38]:t}))}return pn(i)}var oy=`
${rn}
${di}
attribute vec3 aColor;
attribute vec2 aInst;   // faz, \xE7\u0131rpma h\u0131z\u0131
varying vec3 vCol;
varying float vFog;
void main(){
  vec3 p = position;
  float f = abs(p.z);
  float flap = sin(uTime * aInst.y + aInst.x);
  p.y += flap * f * f * 0.62 - 0.05 * f * f * (1.0 - flap);
  p.x -= abs(flap) * f * 0.05;
  vec4 wp = modelMatrix * instanceMatrix * vec4(p, 1.0);
  vec3 nw = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
  float shade = 0.62 + 0.38 * nw.y;
  vec4 mv = viewMatrix * wp;
  float dist = length(mv.xyz);
  vFog = exp(-pow(dist * uFogDensity, 1.5));
  float bl = beamLit(wp.xyz);
  vec3 near = vec3(1.0, 0.7, 0.42) * 0.55 * exp(-length(wp.xyz - vec3(0.0, 15.0, 0.0)) * 0.05);
  vCol = aColor * shade * (uAmbient * 2.0 + vec3(0.012, 0.014, 0.02) + vec3(0.7, 0.8, 1.0) * uFlash * 1.6 + vec3(1.0, 0.9, 0.72) * bl * 12.0 + near + uSunColor * uSunAmt * 0.5);
  gl_Position = projectionMatrix * mv;
}
`,ay=`
${rn}
varying vec3 vCol;
varying float vFog;
void main(){
  gl_FragColor = vec4(mix(uFogColor, vCol, vFog), 1.0);
}
`,Lc=class{constructor(t){let e=ye.birds;this.n=e;let n=ry(),s=new Float32Array(e*2);this.rnd=Ve(555),this.cfg=[];for(let o=0;o<e;o++){let a=this.rnd,l=o<e*.6;this.cfg.push({cx:(a()-.5)*14,cz:(a()-.5)*14,y0:l?16+a()*26:6+a()*12,Rx:l?20+a()*40:60+a()*140,Rz:l?16+a()*34:50+a()*110,w:(l?.22:.12)*(a()<.5?1:-1)*(.7+a()*.6),ph:a()*6.28,bob:a()*6,bobAmp:1+a()*3,size:.95+a()*.45,near:l}),s[o*2]=a()*6.28,s[o*2+1]=7+a()*5}n.setAttribute("aInst",new vn(s,2));let r=new re({uniforms:{...Pt},vertexShader:oy,fragmentShader:ay,side:Pe});this.mesh=new Wi(n,r,e),this.mesh.frustumCulled=!1,this.mesh.layers.disableAll(),this.mesh.layers.enable(0),t.add(this.mesh),this._m=new me,this._q=new on,this._e=new On,this._p=new A,this._p2=new A,this._s=new A}posAt(t,e,n,s){let r=t.ph+t.w*e*(.8+n*.9),o=n*6;return s.set(t.cx+Math.cos(r)*t.Rx+Math.sin(e*.31+t.bob)*3+o*.2,t.y0+Math.sin(e*.5+t.bob)*t.bobAmp+Math.sin(e*1.9+t.ph)*.6,t.cz+Math.sin(r)*t.Rz),t.near||(s.y=Math.max(s.y,En(s.x,s.z,e)+2.5)),s}update(t,e,n,s){let r=this._p,o=this._p2;for(let a=0;a<this.n;a++){let l=this.cfg[a];if(this.posAt(l,e,n,r),this.posAt(l,e+.15,n,o),s)for(let _ of[r,o]){let m=_.x-s.x,p=_.y-s.y,M=_.z-s.z,S=Math.hypot(m,p,M);if(S<22){let v=(22-S)/Math.max(S,.01);_.x+=m*v,_.y+=p*v,_.z+=M*v}}let c=o.x-r.x,h=o.y-r.y,f=o.z-r.z,u=Math.atan2(-f,c),d=Math.atan2(h,Math.hypot(c,f)),g=-Math.sign(l.w)*(.45+n*.25);this._e.set(g,u,d,"YZX"),this._q.setFromEuler(this._e),this._s.setScalar(l.size),this._m.compose(r,this._q,this._s),this.mesh.setMatrixAt(a,this._m)}this.mesh.instanceMatrix.needsUpdate=!0}};var Jf={type:"change"},Tu={type:"start"},jf={type:"end"},Dc=new Ss,Kf=new Pn,ly=Math.cos(70*Ue.DEG2RAD),je=new A,An=2*Math.PI,be={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Eu=1e-6,Nc=class extends Lo{constructor(t,e=null){super(t,e),this.state=be.NONE,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ki.ROTATE,MIDDLE:Ki.DOLLY,RIGHT:Ki.PAN},this.touches={ONE:ji.ROTATE,TWO:ji.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new on,this._lastTargetPosition=new A,this._quat=new on().setFromUnitVectors(t.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Sr,this._sphericalDelta=new Sr,this._scale=1,this._panOffset=new A,this._rotateStart=new W,this._rotateEnd=new W,this._rotateDelta=new W,this._panStart=new W,this._panEnd=new W,this._panDelta=new W,this._dollyStart=new W,this._dollyEnd=new W,this._dollyDelta=new W,this._dollyDirection=new A,this._mouse=new W,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=hy.bind(this),this._onPointerDown=cy.bind(this),this._onPointerUp=uy.bind(this),this._onContextMenu=xy.bind(this),this._onMouseWheel=py.bind(this),this._onKeyDown=my.bind(this),this._onTouchStart=gy.bind(this),this._onTouchMove=_y.bind(this),this._onMouseDown=dy.bind(this),this._onMouseMove=fy.bind(this),this._interceptControlDown=vy.bind(this),this._interceptControlUp=yy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=be.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Jf),this.update(),this.state=be.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;je.copy(e).sub(this.target),je.applyQuaternion(this._quat),this._spherical.setFromVector3(je),this.autoRotate&&this.state===be.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=An:n>Math.PI&&(n-=An),s<-Math.PI?s+=An:s>Math.PI&&(s-=An),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(je.setFromSpherical(this._spherical),je.applyQuaternion(this._quatInverse),e.copy(this.target).add(je),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=je.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new A(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new A(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=je.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Dc.origin.copy(this.object.position),Dc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Dc.direction))<ly?this.object.lookAt(this.target):(Kf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Dc.intersectPlane(Kf,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Eu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Eu||this._lastTargetPosition.distanceToSquared(this.target)>Eu?(this.dispatchEvent(Jf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?An/60*this.autoRotateSpeed*t:An/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){je.setFromMatrixColumn(e,0),je.multiplyScalar(-t),this._panOffset.add(je)}_panUp(t,e){this.screenSpacePanning===!0?je.setFromMatrixColumn(e,1):(je.setFromMatrixColumn(e,0),je.crossVectors(this.object.up,je)),je.multiplyScalar(t),this._panOffset.add(je)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;je.copy(s).sub(this.target);let r=je.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(An*this._rotateDelta.x/e.clientHeight),this._rotateUp(An*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(An*this._rotateDelta.x/e.clientHeight),this._rotateUp(An*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new W,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function cy(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function hy(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function uy(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(jf),this.state=be.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function dy(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ki.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=be.DOLLY;break;case Ki.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=be.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=be.ROTATE}break;case Ki.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=be.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=be.PAN}break;default:this.state=be.NONE}this.state!==be.NONE&&this.dispatchEvent(Tu)}function fy(i){switch(this.state){case be.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case be.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case be.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function py(i){this.enabled===!1||this.enableZoom===!1||this.state!==be.NONE||(i.preventDefault(),this.dispatchEvent(Tu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(jf))}function my(i){this.enabled!==!1&&this._handleKeyDown(i)}function gy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ji.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=be.TOUCH_ROTATE;break;case ji.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=be.TOUCH_PAN;break;default:this.state=be.NONE}break;case 2:switch(this.touches.TWO){case ji.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=be.TOUCH_DOLLY_PAN;break;case ji.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=be.TOUCH_DOLLY_ROTATE;break;default:this.state=be.NONE}break;default:this.state=be.NONE}this.state!==be.NONE&&this.dispatchEvent(Tu)}function _y(i){switch(this._trackPointer(i),this.state){case be.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case be.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case be.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case be.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=be.NONE}}function xy(i){this.enabled!==!1&&i.preventDefault()}function vy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yy(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Ge=(i,t,e)=>new A(i,t,e),na=(i,t,e)=>Ge(i*Math.cos(Ue.degToRad(t)),e,i*Math.sin(Ue.degToRad(t))),Us=[{t:0,pos:Ge(-262,31,84),tgt:Ge(-6,17.5,-8),fov:32,name:"I \xB7 Uzak plan"},{t:7,pos:Ge(-246,27,70),tgt:Ge(-4,17,-6),fov:31},{t:13.5,pos:Ge(-190,15,62),tgt:Ge(-2,14.5,-3),fov:33},{t:18,pos:Ge(-108,4.2,54),tgt:Ge(0,10,-2),fov:40,name:"II \xB7 Dalga seviyesi"},{t:23,pos:Ge(-88,2.4,6),tgt:Ge(0,9,-1),fov:42},{t:27,pos:Ge(-72,3.4,-46),tgt:Ge(0,10,0),fov:42},{t:31,pos:na(66,-112,9),tgt:Ge(0,13,0),fov:42,name:"III \xB7 Kulenin \xE7evresi"},{t:35.5,pos:na(58,-52,14),tgt:Ge(0,15,0),fov:42},{t:40,pos:na(46,8,18),tgt:Ge(0,17,0),fov:40},{t:43.5,pos:na(23,42,22.5),tgt:Ge(0,20.6,0),fov:38,name:"IV \xB7 Fener odas\u0131"},{t:48,pos:na(15.5,88,24),tgt:Ge(0,21,0),fov:34},{t:53,pos:Ge(-60,30,120),tgt:Ge(0,20,0),fov:34},{t:57.5,pos:Ge(-230,33,100),tgt:Ge(-9,18,-8),fov:32.5}],Di=Us.length;function Oc(i){return Us[(i%Di+Di)%Di]}function Hc(i){return Us[(i%Di+Di)%Di].t+Math.floor(i/Di)*Lr}function Qf(i,t,e,n,s,r,o){let a=r*r,l=a*r,c=2*l-3*a+1,h=l-2*a+r,f=-2*l+3*a,u=l-a;return o.set(c*i.x+h*s*t.x+f*e.x+u*s*n.x,c*i.y+h*s*t.y+f*e.y+u*s*n.y,c*i.z+h*s*t.z+f*e.z+u*s*n.z)}var Uc=new A,Fc=new A;function Bc(i,t,e){let n=Oc(t-1)[i],s=Oc(t+1)[i],r=Hc(t+1)-Hc(t-1);return e.copy(s).sub(n).divideScalar(r)}function zc(i,t,e){let n=(i%Lr+Lr)%Lr,s=0;for(let d=0;d<Di;d++)n>=Us[d].t&&(s=d);let r=Hc(s),a=Hc(s+1)-r,l=(n-r)/a,c=Oc(s),h=Oc(s+1);Bc("pos",s,Uc),Bc("pos",s+1,Fc),Qf(c.pos,Uc,h.pos,Fc,a,l,t),Bc("tgt",s,Uc),Bc("tgt",s+1,Fc),Qf(c.tgt,Uc,h.tgt,Fc,a,l,e);let f=Ue.lerp(c.fov,h.fov,l*l*(3-2*l)),u="";for(let d=0;d<Di;d++)Us[d].name&&n>=Us[d].t&&(u=Us[d].name);return{fov:f,name:u}}var My=Math.PI*2,kc=class{constructor(t,e){this.camera=t,this.dom=e,this.pos=new A,this.tgt=new A,this.controls=new Nc(t,e),this.controls.enableDamping=!0,this.controls.dampingFactor=.07,this.controls.minDistance=4,this.controls.maxDistance=900,this.controls.maxPolarAngle=Math.PI*.497,this.controls.zoomSpeed=.9,this.controls.enabled=!1,this.blend=1,this.blendFrom={pos:new A,tgt:new A,fov:35},this.shakeSeed=0,this.fov=34,this.chapter="",this.up=new A(0,1,0),this._look=new A,this._t=new A,this._r=new A,this._u=new A,this._lp=new A,this._roll=0,e.addEventListener("pointerdown",()=>{Lt.camMode==="cinematic"&&this.setMode("free")}),e.addEventListener("wheel",()=>{Lt.camMode==="cinematic"&&this.setMode("free")},{passive:!0}),Lt.camMode==="free"&&this.setMode("free",!0)}setMode(t,e=!1){if(!(t===Lt.camMode&&!e))if(Lt.camMode=t,t==="free"){this.controls.enabled=!0;let n=new A;zc(Lt.camTime,this.pos,n),this.controls.target.copy(n),this.controls.update()}else this.controls.enabled=!1,this.blend=0,this.blendFrom.pos.copy(this.camera.position),this.blendFrom.tgt.copy(this.controls.target),this.blendFrom.fov=this.camera.fov}update(t,e){if(Lt.camHold||(Lt.camTime+=t),Lt.camMode==="free"){this.controls.update();let y=this.camera,w=En(y.position.x,y.position.z,e)+.9;y.position.y<w&&(y.position.y=w),this.chapter="Serbest kamera";return}let n=Lt.camTime,s=zc(n,this.pos,this.tgt);this.chapter=s.name;let r=this.camera,o=Lt.stormSmooth,a=n/Lr*My,l=9e-4+.0022*o,c=l*(Math.sin(a*23)*.6+Math.sin(a*41+1.3)*.4+Math.sin(a*7)*.8),h=l*(Math.sin(a*29+.7)*.6+Math.sin(a*53)*.4+Math.sin(a*11+2)*.8),f=this.pos,u=f.y;if(u<14){let y=En(f.x,f.z,e);u=Math.max(u+y*.4,y+.9)}let d=this._t.copy(this.tgt),g=f.x,_=u,m=f.z,p=s.fov;if(this.blend<1){this.blend=Math.min(1,this.blend+t/1.8);let y=this.blend*this.blend*(3-2*this.blend);g=Ue.lerp(this.blendFrom.pos.x,g,y),_=Ue.lerp(this.blendFrom.pos.y,_,y),m=Ue.lerp(this.blendFrom.pos.z,m,y),d.lerpVectors(this.blendFrom.tgt,d,y),p=Ue.lerp(this.blendFrom.fov,p,y)}r.position.set(g,_,m);let M=d.sub(r.position),S=M.length();M.divideScalar(S);let v=this._r.crossVectors(M,this.up).normalize(),T=this._u.crossVectors(v,M);M.addScaledVector(v,c).addScaledVector(T,h).normalize(),r.up.set(0,1,0),r.lookAt(this._lp.copy(r.position).add(M));let E=Math.max(0,1-u/12),C=(Math.sin(n*.9)*.012+Math.sin(n*.37+1)*.02)*E*(.4+o);r.rotateZ(C),Math.abs(r.fov-p)>.001&&(r.fov=p,r.updateProjectionMatrix())}};function ia(i,t,e,n=1){let s=Math.floor(i.sampleRate*t),r=i.createBuffer(1,s,i.sampleRate),o=r.getChannelData(0),a=Ve(n);if(e==="white")for(let l=0;l<s;l++)o[l]=a()*2-1;else if(e==="pink"){let l=0,c=0,h=0,f=0,u=0,d=0,g=0;for(let _=0;_<s;_++){let m=a()*2-1;l=.99886*l+m*.0555179,c=.99332*c+m*.0750759,h=.969*h+m*.153852,f=.8665*f+m*.3104856,u=.55*u+m*.5329522,d=-.7616*d-m*.016898,o[_]=(l+c+h+f+u+d+g+m*.5362)*.11,g=m*.115926}}else if(e==="brown"){let l=0;for(let c=0;c<s;c++){let h=a()*2-1;l=(l+.02*h)/1.02,o[c]=l*3.5}}else if(e==="patter"){for(let c=0;c<s;c++)o[c]=0;let l=Math.floor(t*900);for(let c=0;c<l;c++){let h=Math.floor(a()*s),f=(.15+a()*.85)*(a()<.08?1.6:1),u=40+Math.floor(a()*160);for(let d=0;d<u&&h+d<s;d++)o[h+d]+=(a()*2-1)*f*Math.exp(-d/(u*.28))}}return r}function Sy(i,t,e){let n=Math.floor(i.sampleRate*t),s=i.createBuffer(2,n,i.sampleRate),r=Ve(42);for(let o=0;o<2;o++){let a=s.getChannelData(o);for(let l=0;l<n;l++)a[l]=(r()*2-1)*Math.pow(1-l/n,e)}return s}var Vc=class{constructor(){this.ctx=null,this.on=!1,this.built=!1,this.rnd=Ve(2718),this.nextWave=0,this.nextHorn=0,this.nextGull=0,this.storm=.7,this.wind=10}async enable(t){this.ctx||(this.ctx=t||new(window.AudioContext||window.webkitAudioContext)({latencyHint:"interactive"}),this.build()),this.ctx.resume&&await this.ctx.resume(),this.on=!0;let e=this.ctx.currentTime;this.master.gain.cancelScheduledValues(e),this.master.gain.setTargetAtTime(.72,e,.4),this.nextWave=e+1,this.nextHorn=e+14+this.rnd()*20,this.nextGull=e+5}disable(){if(!this.ctx)return;this.on=!1;let t=this.ctx.currentTime;this.master.gain.cancelScheduledValues(t),this.master.gain.setTargetAtTime(0,t,.15),setTimeout(()=>{!this.on&&this.ctx.suspend&&this.ctx.suspend()},700)}build(){let t=this.ctx,e=t.destination;this.master=t.createGain(),this.master.gain.value=0;let n=t.createDynamicsCompressor();n.threshold.value=-18,n.knee.value=20,n.ratio.value=4,n.attack.value=.005,n.release.value=.25,this.master.connect(n),n.connect(e),this.verb=t.createConvolver(),this.verb.buffer=Sy(t,3.2,2.6),this.verbGain=t.createGain(),this.verbGain.gain.value=.5,this.verb.connect(this.verbGain),this.verbGain.connect(this.master);let s=(m,p,M=1)=>{let S=t.createBufferSource();return S.buffer=m,S.loop=!0,S.playbackRate.value=M,S.connect(p),S.start(),S};this.white=ia(t,4,"white",1),this.pink=ia(t,6,"pink",2),this.brown=ia(t,8,"brown",3),this.patter=ia(t,3.7,"patter",4),this.patter2=ia(t,5.3,"patter",5),this.rainGain=t.createGain(),this.rainGain.gain.value=0;let r=t.createBiquadFilter();r.type="highpass",r.frequency.value=700;let o=t.createBiquadFilter();o.type="lowpass",o.frequency.value=9500;let a=t.createBiquadFilter();a.type="peaking",a.frequency.value=3600,a.gain.value=4,a.Q.value=.7,r.connect(a),a.connect(o),o.connect(this.rainGain),s(this.white,r),this.patterGain=t.createGain(),this.patterGain.gain.value=0;let l=t.createBiquadFilter();l.type="bandpass",l.frequency.value=2600,l.Q.value=.5,l.connect(this.patterGain),s(this.patter,l),s(this.patter2,l,1.03),this.rainGain.connect(this.master),this.patterGain.connect(this.master);let c=t.createGain();c.gain.value=.25,this.rainGain.connect(c),c.connect(this.verb),this.windGain=t.createGain(),this.windGain.gain.value=0,this.windBP=t.createBiquadFilter(),this.windBP.type="bandpass",this.windBP.frequency.value=300,this.windBP.Q.value=1.1,s(this.brown,this.windBP),this.windBP.connect(this.windGain);let h=t.createBiquadFilter();h.type="bandpass",h.frequency.value=780,h.Q.value=7,this.howlGain=t.createGain(),this.howlGain.gain.value=0,s(this.pink,h),h.connect(this.howlGain),this.howlBP=h,this.windGain.connect(this.master),this.howlGain.connect(this.master);let f=t.createGain();f.gain.value=.3,this.windGain.connect(f),f.connect(this.verb);let u=(m,p,M)=>{let S=t.createOscillator();S.frequency.value=m;let v=t.createGain();return v.gain.value=p,S.connect(v),v.connect(M),S.start(),S};u(.11,140,this.windBP.frequency),u(.29,90,this.windBP.frequency),u(.07,260,h.frequency),u(.19,120,h.frequency),this.windGust=t.createGain(),this.windGust.gain.value=1,u(.13,.28,this.windGain.gain),u(.043,.2,this.howlGain.gain),this.seaBase=t.createGain(),this.seaBase.gain.value=0;let d=t.createBiquadFilter();d.type="lowpass",d.frequency.value=260,s(this.brown,d,.7),d.connect(this.seaBase),this.seaBase.connect(this.master),this.waveGain=t.createGain(),this.waveGain.gain.value=0,this.waveLP=t.createBiquadFilter(),this.waveLP.type="lowpass",this.waveLP.frequency.value=400,this.waveLP.Q.value=.8;let g=t.createBiquadFilter();g.type="highpass",g.frequency.value=90,s(this.pink,this.waveLP,.9),this.waveLP.connect(g),g.connect(this.waveGain),this.waveGain.connect(this.master);let _=t.createGain();_.gain.value=.35,this.waveGain.connect(_),_.connect(this.verb),this.built=!0}setStorm(t,e){if(this.storm=t,this.wind=e,!this.built||!this.on)return;let n=this.ctx.currentTime,s=.35,r=Ie((t-.08)/.85,0,1);this.rainGain.gain.setTargetAtTime(Math.pow(r,1.15)*.34,n,s),this.patterGain.gain.setTargetAtTime(Math.pow(r,1.4)*.5,n,s),this.windGain.gain.setTargetAtTime(.03+Math.pow(t,1.2)*.42,n,s),this.howlGain.gain.setTargetAtTime(Math.pow(t,2.2)*.13,n,s),this.seaBase.gain.setTargetAtTime(.1+t*.34,n,s),this.windBP.Q.setTargetAtTime(.9+t*1.6,n,.5),this.verbGain.gain.setTargetAtTime(.35+t*.3,n,.5)}swell(t,e){let n=this.ctx,s=this.waveGain.gain,r=this.waveLP.frequency,o=1.6+this.rnd()*1.4,a=t+o,l=2.6+this.rnd()*2;s.setValueAtTime(1e-4,t),s.linearRampToValueAtTime(e*.45,a-.25),s.linearRampToValueAtTime(e,a),s.exponentialRampToValueAtTime(2e-4,a+l),r.setValueAtTime(300,t),r.exponentialRampToValueAtTime(700,a-.2),r.exponentialRampToValueAtTime(2600+this.storm*1500,a+.12),r.exponentialRampToValueAtTime(380,a+l)}schedule(t){if(!this.built)return;let e=this.rnd;for(;this.nextWave<t;){let n=(.08+this.storm*.42)*(.6+e()*.6);this.swell(this.nextWave,n),this.nextWave+=wn(9.5,5.5,this.storm)+e()*3.5}this.nextHorn<t&&(this.horn(this.nextHorn),this.nextHorn+=45+e()*50),this.nextGull<t&&(this.storm<.85&&this.gull(this.nextGull),this.nextGull+=(7+e()*12)*(1+this.storm*1.5))}update(){!this.built||!this.on||this.schedule(this.ctx.currentTime+2.5)}thunder({delay:t,distance:e,loudness:n=.7}){if(!this.built||!this.on)return;let s=this.ctx,r=this.rnd,o=s.currentTime+t,a=Ie(1-(e-300)/800,0,1);if(a>.2){let M=s.createBufferSource();M.buffer=this.white;let S=s.createBiquadFilter();S.type="bandpass",S.frequency.value=2500+r()*1500,S.Q.value=.6;let v=s.createGain();v.gain.setValueAtTime(0,o),v.gain.linearRampToValueAtTime(n*.65*a,o+.004),v.gain.exponentialRampToValueAtTime(5e-4,o+.22+a*.25),M.connect(S),S.connect(v),v.connect(this.master),v.connect(this.verb),M.start(o,r()*2),M.stop(o+.6)}let l=4.2+r()*3.5+(1-a)*1.5,c=s.createBufferSource();c.buffer=this.brown,c.loop=!0;let h=s.createBiquadFilter();h.type="lowpass",h.Q.value=.9,h.frequency.setValueAtTime(600+a*900,o),h.frequency.exponentialRampToValueAtTime(70,o+l);let f=s.createGain();f.gain.setValueAtTime(0,o);let u=o,d=n*(1.25+a*1.3);f.gain.linearRampToValueAtTime(d*1,o+.05);let g=4+Math.floor(r()*5);for(let M=0;M<g;M++){u+=l/g*(.6+r()*.8);let S=d*Math.pow(1-M/(g+1),1.6)*(.35+r()*.65);f.gain.linearRampToValueAtTime(S,u),f.gain.linearRampToValueAtTime(S*.25,u+.25+r()*.5)}f.gain.linearRampToValueAtTime(1e-4,o+l+1.2),c.connect(h),h.connect(f),f.connect(this.master);let _=s.createGain();_.gain.value=.6,f.connect(_),_.connect(this.verb),c.start(o,r()*5),c.stop(o+l+1.5);let m=s.createOscillator();m.type="sine",m.frequency.setValueAtTime(58+r()*12,o),m.frequency.exponentialRampToValueAtTime(32,o+l);let p=s.createGain();p.gain.setValueAtTime(0,o),p.gain.linearRampToValueAtTime(d*.55,o+.2),p.gain.exponentialRampToValueAtTime(5e-4,o+l*.8),m.connect(p),p.connect(this.master),m.start(o),m.stop(o+l)}horn(t){let e=this.ctx,n=e.createGain();n.gain.setValueAtTime(0,t);let s=.05+.03*(1-this.storm);n.gain.linearRampToValueAtTime(s,t+.35),n.gain.setValueAtTime(s,t+1.9),n.gain.exponentialRampToValueAtTime(4e-4,t+3.6);let r=e.createBiquadFilter();r.type="lowpass",r.frequency.value=520,r.Q.value=2;for(let[a,l]of[[98,0],[123.5,0],[196,0]]){let c=e.createOscillator();c.type="sawtooth",c.frequency.value=a,c.detune.value=(this.rnd()-.5)*8;let h=e.createGain();h.gain.value=a>150?.35:1,c.connect(h),h.connect(r),c.start(t+l),c.stop(t+3.7)}r.connect(n),n.connect(this.master);let o=e.createGain();o.gain.value=.9,n.connect(o),o.connect(this.verb)}gull(t){let e=this.ctx,n=this.rnd,s=2+Math.floor(n()*3),r=t,o=e.createStereoPanner?e.createStereoPanner():null;o&&(o.pan.value=(n()-.5)*1.6,o.connect(this.master));for(let a=0;a<s;a++){let l=e.createOscillator();l.type="sawtooth";let c=900+n()*500;l.frequency.setValueAtTime(c*.75,r),l.frequency.linearRampToValueAtTime(c*1.5,r+.12),l.frequency.linearRampToValueAtTime(c*.9,r+.32);let h=e.createOscillator();h.frequency.value=38;let f=e.createGain();f.gain.value=60,h.connect(f),f.connect(l.frequency);let u=e.createBiquadFilter();u.type="bandpass",u.frequency.value=1900,u.Q.value=1.2;let d=e.createGain();d.gain.setValueAtTime(0,r),d.gain.linearRampToValueAtTime(.028,r+.04),d.gain.exponentialRampToValueAtTime(5e-4,r+.4),l.connect(u),u.connect(d),d.connect(o||this.master),l.start(r),l.stop(r+.45),h.start(r),h.stop(r+.45),r+=.32+n()*.12}}};var Ur={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Dn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},by=new Ji(-1,1,1,-1,0,1),wu=class extends ce{constructor(){super(),this.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new jt([0,2,0,0,2,0],2))}},Ey=new wu,fs=class{constructor(t){this._mesh=new pt(Ey,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,by)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Fr=class extends Dn{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof re?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Ci.clone(t.uniforms),this.material=new re({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new fs(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var sa=class extends Dn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Gc=class extends Dn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Wc=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new W);this._width=n.width,this._height=n.height,e=new ke(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:He}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Fr(Ur),this.copyPass.material.blending=zn,this.timer=new Io}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}sa!==void 0&&(o instanceof sa?n=!0:o instanceof Gc&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new W);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Xc=class extends Dn{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new _t}render(t,e,n){let s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}};var tp={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new _t(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Br=class i extends Dn{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new W(t.x,t.y):new W(256,256),this.clearColor=new _t(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ke(r,o,{type:He,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let f=new ke(r,o,{type:He,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let u=new ke(r,o,{type:He,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),o=Math.round(o/2)}let a=tp;this.highPassUniforms=Ci.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new re({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new W(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ci.clone(Ur.uniforms),this.blendMaterial=new re({uniforms:this.copyUniforms,vertexShader:Ur.vertexShader,fragmentShader:Ur.fragmentShader,premultipliedAlpha:!0,blending:cn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new _t,this._oldClearAlpha=1,this._basic=new an,this._fsQuad=new fs(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new W(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){let e=[],n=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(n*n))/n);let s=[],r=[];for(let o=1;o<t;o+=2){let a=e[o],l=o+1<t?e[o+1]:0,c=a+l;s.push((o*a+(o+1)*l)/c),r.push(c)}return new re({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new W(.5,.5)},direction:{value:new W(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}_getCompositeMaterial(t){return new re({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};Br.BlurDirectionX=new W(1,0);Br.BlurDirectionY=new W(0,1);var ra={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var qc=class extends Dn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ci.clone(ra.uniforms),this.material=new _r({name:ra.name,uniforms:this.uniforms,vertexShader:ra.vertexShader,fragmentShader:ra.fragmentShader}),this._fsQuad=new fs(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ae.getTransfer(this._outputColorSpace)===_e&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===No?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Uo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fo?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Cs?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Oo?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ho?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Bo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Ty={uniforms:{tDiffuse:{value:null},uTime:Pt.uTime,uFlash:Pt.uFlash,uStorm:Pt.uStorm,uDay:Pt.uDay,uAspect:{value:16/9}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime, uFlash, uStorm, uDay, uAspect;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec2 c = vUv - 0.5;
      float r2 = dot(c * vec2(uAspect, 1.0), c * vec2(uAspect, 1.0));
      // kromatik sapma (kenarlara do\u011Fru)
      float ca = 0.0003 + 0.0010 * r2 + 0.0015 * uFlash;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + c * ca * 1.6).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - c * ca * 1.6).b;
      // hafif derecelendirme: g\xF6lgelerde so\u011Fuk, parlaklarda s\u0131cak
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(col, col * vec3(0.94, 1.0, 1.08), (1.0 - smoothstep(0.0, 0.5, lum)) * 0.6);
      col = mix(col, col * vec3(1.06, 1.0, 0.92), smoothstep(0.5, 1.0, lum) * 0.5);
      col = pow(col, vec3(0.97));
      col = mix(vec3(lum), col, 1.06 + 0.12 * uDay);
      // vinyet
      col *= 1.0 - smoothstep(0.12, 0.62, r2) * (0.55 + 0.15 * uStorm);
      // film gren\u0131
      float g = hash(vUv * vec2(1920.0, 1080.0) + fract(uTime * 7.0) * 100.0) - 0.5;
      col += g * (0.022 + 0.018 * uStorm) * (1.0 - lum * 0.6);
      gl_FragColor = vec4(col, 1.0);
    }
  `},Yc=class{constructor(t,e,n){this.renderer=t;let s=t.getDrawingBufferSize(new W),r=new ke(s.x,s.y,{type:He,samples:ye.msaa});this.composer=new Wc(t,r),this.composer.addPass(new Xc(e,n)),ye.bloom&&(this.bloom=new Br(new W(s.x,s.y),.55,.8,.85),this.composer.addPass(this.bloom)),this.composer.addPass(new qc),this.final=new Fr(Ty),this.composer.addPass(this.final)}setSize(t,e,n){this.composer.setPixelRatio(n),this.composer.setSize(t,e),this.final.uniforms.uAspect.value=t/e}render(t){this.bloom&&(this.bloom.strength=.5+.2*Math.min(1.2,Pt.uFlash.value)+.1*Pt.uStorm.value),this.composer.render(t)}};var ge=i=>document.getElementById(i),Zc=class{constructor(t){this.h=t;let e=document.body;ze.get("ui")==="0"&&(e.classList.add("ui-hidden"),Lt.uiHidden=!0),(ze.has("nointro")||ze.get("ui")==="0")&&e.classList.add("nointro"),Lt.showFps||e.classList.add("nofps"),ge("bFps").classList.toggle("on",Lt.showFps),this.storm=ge("storm"),this.day=ge("day"),this.storm.value=Lt.storm,this.day.value=Lt.day,this.storm.addEventListener("input",()=>{Lt.storm=Number(this.storm.value),this.refresh()}),this.day.addEventListener("input",()=>{Lt.day=Number(this.day.value),this.refresh()}),ge("bStrike").onclick=()=>t.strike(),ge("bCam").onclick=()=>t.camToggle(),ge("bBack").onclick=()=>t.camCinematic(),ge("bSound").onclick=()=>t.sound(),ge("bPhoto").onclick=()=>this.photo(!0),ge("pDl").onclick=()=>t.download(),ge("pExit").onclick=()=>this.photo(!1),ge("bFps").onclick=()=>this.fps(!Lt.showFps),ge("bQ").onclick=()=>{let s=new URLSearchParams(location.search);ss==="low"?s.delete("q"):s.set("q","low"),location.search=s.toString()},ge("bQT").textContent="Kalite: "+(ss==="low"?"D\xFC\u015F\xFCk":"Y\xFCksek"),ge("bQ").classList.toggle("on",ss==="low"),window.addEventListener("keydown",s=>{if(s.target&&s.target.tagName==="INPUT"&&s.key.length===1&&!/[a-zA-Z]/.test(s.key))return;let r=s.key.toLowerCase();r==="h"?this.hide(!Lt.uiHidden):r==="f"?this.fps(!Lt.showFps):r==="l"?t.strike():r==="m"?t.sound():r==="c"?t.camToggle():r==="p"?this.photo(!Lt.photoMode):r==="escape"&&Lt.photoMode?this.photo(!1):(r==="enter"||r===" ")&&Lt.photoMode&&(s.preventDefault(),t.download())});let n=0;window.addEventListener("mousemove",()=>{Lt.photoMode&&(ge("photoBar").classList.remove("faded"),clearTimeout(n),n=setTimeout(()=>ge("photoBar").classList.add("faded"),2600))}),this.refresh(),this.updateCamButtons()}refresh(){ge("stormv").textContent=Math.round(Lt.storm*100)+"%";let t=Lt.day,e=120+t*285,n=String(Math.floor(e/60)).padStart(2,"0"),s=String(Math.floor(e%60)).padStart(2,"0"),r=t<.35?"Gece":t<.75?"Seher":"\u015Eafak";ge("dayv").textContent=`${r} ${n}:${s}`}hide(t){Lt.uiHidden=t,document.body.classList.toggle("ui-hidden",t)}fps(t){Lt.showFps=t,document.body.classList.toggle("nofps",!t),ge("bFps").classList.toggle("on",t),this.toast(t?"FPS sayac\u0131 a\xE7\u0131k":"FPS sayac\u0131 gizlendi")}photo(t){Lt.photoMode=t,document.body.classList.toggle("ui-hidden",t||Lt.uiHidden),ge("photoBar").classList.toggle("hide",!t),ge("photoBar").classList.remove("faded"),t&&(ge("intro").style.display="none",setTimeout(()=>Lt.photoMode&&ge("photoBar").classList.add("faded"),3200))}updateCamButtons(){let t=Lt.camMode==="free";ge("bBack").classList.toggle("hide",!t),ge("bCam").classList.toggle("hide",t),ge("bCam").classList.toggle("on",!t)}setChapter(t){let e=ge("chapter");e.textContent!==t&&(e.textContent=t)}setSound(t){ge("bSound").classList.toggle("on",t),ge("bSoundT").textContent=t?"Ses a\xE7\u0131k":"Ses kapal\u0131"}setFps(t,e,n){ge("fpsv").textContent=t.toFixed(0)+" fps \xB7 "+e.toFixed(1)+" ms",ge("fpsx").textContent=n}toast(t){let e=ge("toast");e.textContent=t,e.classList.add("show"),clearTimeout(this._tt),this._tt=setTimeout(()=>e.classList.remove("show"),1800)}error(t){let e=ge("err");e.textContent=t,e.classList.remove("hide")}};var $e;function wy(){let i=performance.now();try{let T=function(){return Math.min(window.devicePixelRatio||1,ye.maxDpr)*ye.renderScale},E=function(){let K=innerWidth,mt=innerHeight,ct=T()*S;e.setPixelRatio(ct),e.setSize(K,mt,!1),s.aspect=K/mt,s.updateProjectionMatrix(),p.setSize(K,mt,ct),Lt.renderH=Math.round(mt*ct),Pt.uRes.value.set(K*ct,mt*ct)},y=function(){let K=e.getPixelRatio(),mt=Math.min(3840/innerWidth,K*1.6);e.setPixelRatio(mt),e.setSize(innerWidth,innerHeight,!1),p.setSize(innerWidth,innerHeight,mt),Lt.renderH=Math.round(innerHeight*mt),p.render(1e-4);let ct=t.toDataURL("image/png"),gt=document.createElement("a");gt.href=ct,gt.download=`kiz-kulesi-${Date.now()}.png`,document.body.appendChild(gt),gt.click(),gt.remove(),E(),$e.toast("PNG indirildi")},Z=function(){requestAnimationFrame(Z);let K=performance.now(),mt=K,ct=Math.min((K-w)/1e3,.1);w=K;let gt=q?0:ct;Lt.dt=gt,Lt.time+=gt;let qt=Lt.time+40;e.toneMappingExposure=(Number(ze.get("exp"))||1.15)*(1-.2*Lt.daySmooth);let Q=performance.now();m.update(gt,qt),s.updateMatrixWorld(),Pt.uCamPos.value.copy(s.position),f.update(gt,s);let at=performance.now();r.update(gt,qt);let ht=performance.now();o.update(s.position),g.update(gt,qt),l.update(Lt,qt,g),a.update(qt,Lt.wind,Lt.stormSmooth),a.flicker(qt),c.update(gt,qt,s,Lt),h.update(Lt,s),u.update(gt,qt,Lt),_.update(gt,qt,Lt.stormSmooth,s.position),d.update(s,Lt.renderH,Lt.daySmooth),M.setStorm(Lt.stormSmooth,Lt.wind),M.update(),$e.setChapter(m.chapter),$e.updateCamButtons();let ut=performance.now(),Mt=yt();d.setPxScale(ye.cubeRes/2),r.renderCube(),d.setPxScale(Lt.renderH/(2*Math.tan(Ue.degToRad(s.fov)/2)));let Gt=performance.now();p.render(gt);let Ht=performance.now();et&&(rt[0]+=at-Q,rt[1]+=ht-at,rt[2]+=ut-ht,rt[3]+=Gt-ut,rt[4]+=Ht-Gt,rt[5]++),k(Mt),G(),et&&ie.push([Lt.camTime,performance.now()-mt]),nt&&e.getContext().finish(),N++,X+=(ct*1e3-X)*.05;let Wt=performance.now();if(Wt-H>=500){let Xt=N*1e3/(Wt-H);N=0,H=Wt,O.push(Xt),O.length>600&&O.shift(),$e.setFps(Xt,1e3/Xt,`${Math.round(e.domElement.width)}\xD7${Math.round(e.domElement.height)} \xB7 ${ss}`),v&&(Xt<54?(V++,L=0):Xt>59&&S<1?(L++,V=0):V=L=0,V>=2&&S>.5&&(S=Math.max(.5,S*.9),E(),V=0),L>=8&&(S=Math.min(1,S*1.06),E(),L=0))}},yt=function(){if(!et)return null;let K=$.createQuery();return $.beginQuery(et.TIME_ELAPSED_EXT,K),K},k=function(K){K&&($.endQuery(et.TIME_ELAPSED_EXT),Ut.push([K,Lt.camTime]))},G=function(){for(;Ut.length;){let[K,mt]=Ut[0];if(!$.getQueryParameter(K,$.QUERY_RESULT_AVAILABLE))break;let ct=$.getParameter(et.GPU_DISJOINT_EXT),gt=$.getQueryParameter(K,$.QUERY_RESULT);Ut.shift(),$.deleteQuery(K),ct||bt.push([mt,gt/1e6])}};$e=new Zc({strike:()=>f&&f.strike({manual:!0}),camToggle:()=>{m.setMode(Lt.camMode==="free"?"cinematic":"free"),$e.updateCamButtons()},camCinematic:()=>{m.setMode("cinematic"),$e.updateCamButtons(),$e.toast("Sinematik kameraya d\xF6n\xFCl\xFCyor")},sound:()=>C(),download:()=>y()});let t=document.getElementById("c"),e=new uc({canvas:t,antialias:!1,powerPreference:"high-performance",alpha:!1,stencil:!1});e.toneMapping=Cs,e.toneMappingExposure=Number(ze.get("exp"))||1.15,e.setClearColor(329484,1);let n=new ho,s=new en(35,innerWidth/innerHeight,.4,16e3);s.position.set(-262,31,84);let r=new gc(e,n),o=new _c;n.add(o.dome,o.low);let a=qf();n.add(a.group),a.leadMat.envMap=r.cubeRT.texture;let l=new Mc(r.cubeRT.texture);l.mesh.name="deniz",n.add(l.mesh);let c=new Sc(n,a),h=new bc(n),f=new Ec(n,s),u=new wc(n),d=new Ac(n),g=new Ic(n),_=new Lc(n),m=new kc(s,t),p=new Yc(e,n,s),M=new Vc;Lt.lampWorld=a.lampWorld,Pt.uLanternPos.value.copy(a.lanternPos),f.onThunder=K=>M.thunder(K),$e.updateCamButtons();let S=1,v=ze.get("adapt")!=="0"&&ss==="high";addEventListener("resize",E),E();async function C(){if(Lt.soundOn)M.disable(),Lt.soundOn=!1,$e.setSound(!1),$e.toast("Ses kapal\u0131");else try{await M.enable(),Lt.soundOn=!0,$e.setSound(!0),$e.toast("Ses a\xE7\u0131k \u2014 f\u0131rt\u0131na \u015Fiddetiyle birlikte de\u011Fi\u015Fir")}catch(K){$e.toast("Ses ba\u015Flat\u0131lamad\u0131: "+K.message)}}let w=performance.now(),I=0,N=0,H=performance.now(),V=0,L=0,O=[],X=16.7,q=ze.get("pause")==="1",nt=ze.get("sync")==="1",$=e.getContext(),et=ze.get("gpu")==="1"?$.getExtension("EXT_disjoint_timer_query_webgl2"):null,Ut=[],bt=[],ie=[],rt=[0,0,0,0,0,0];window.__kiz={state:Lt,U:Pt,camera:s,renderer:e,scene:n,lightning:f,rig:m,audio:M,tower:a,sea:l,ship:g,sky:o,rain:h,city:d,spray:u,birds:_,post:p,env:r,fpsLog:O,gpuLog:bt,cpuLog:ie,sect:rt,scale:()=>S,seekCam(K,mt=!0){Lt.camTime=K,Lt.camHold=mt},setStorm(K){Lt.storm=K,Lt.stormSmooth=K,$e.storm.value=K,$e.refresh()},setDay(K){Lt.day=K,Lt.daySmooth=K,$e.day.value=K,$e.refresh()},strike(K){f.strike(K||{manual:!0})},heightAt:En,sampleCinematic:zc,setSize(K,mt){E()}},ze.has("t")&&(Lt.camTime=Number(ze.get("t"))),ze.get("hold")==="1"&&(Lt.camHold=!0);try{e.compile(n,s),r.renderCube(),p.render(.001)}catch(K){console.warn("\u0131s\u0131nma",K)}window.__kiz.bootMs=performance.now()-i,document.getElementById("loading")?.remove(),requestAnimationFrame(Z)}catch(t){console.error(t&&t.stack?t.stack:t),$e?$e.error("Sahne ba\u015Flat\u0131lamad\u0131: "+t.message+`
(WebGL2 destekli bir taray\u0131c\u0131 gerekir)`):document.body.textContent="Ba\u015Flat\u0131lamad\u0131: "+t.message}}requestAnimationFrame(()=>setTimeout(wy,30));})();
//# sourceMappingURL=app.js.map
