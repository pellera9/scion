/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=globalThis,me=t=>t,K=ae.trustedTypes,ge=K?K.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ce="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Oe="?"+x,Ge=`<${Oe}>`,E=document,W=()=>E.createComment(""),V=t=>t===null||typeof t!="object"&&typeof t!="function",le=Array.isArray,Te=t=>le(t)||typeof t?.[Symbol.iterator]=="function",ne=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,ve=/>/g,P=RegExp(`>|${ne}(?:([^\\s"'>=/]+)(${ne}*=${ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,ye=/"/g,ze=/^(?:script|style|textarea|title)$/i,We=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),c=We(1),k=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),$e=new WeakMap,S=E.createTreeWalker(E,129);function De(t,e){if(!le(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ge!==void 0?ge.createHTML(e):e}const Ve=(t,e)=>{const r=t.length-1,i=[];let s,n=e===2?"<svg>":e===3?"<math>":"",o=I;for(let l=0;l<r;l++){const a=t[l];let d,u,p=-1,b=0;for(;b<a.length&&(o.lastIndex=b,u=o.exec(a),u!==null);)b=o.lastIndex,o===I?u[1]==="!--"?o=fe:u[1]!==void 0?o=ve:u[2]!==void 0?(ze.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=P):u[3]!==void 0&&(o=P):o===P?u[0]===">"?(o=s??I,p=-1):u[1]===void 0?p=-2:(p=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?P:u[3]==='"'?ye:be):o===ye||o===be?o=P:o===fe||o===ve?o=I:(o=P,s=void 0);const $=o===P&&t[l+1].startsWith("/>")?" ":"";n+=o===I?a+Ge:p>=0?(i.push(d),a.slice(0,p)+Ce+a.slice(p)+x+$):a+x+(p===-2?l:$)}return[De(t,n+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};let oe=class je{constructor({strings:e,_$litType$:r},i){let s;this.parts=[];let n=0,o=0;const l=e.length-1,a=this.parts,[d,u]=Ve(e,r);if(this.el=je.createElement(d,i),S.currentNode=this.el.content,r===2||r===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=S.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const p of s.getAttributeNames())if(p.endsWith(Ce)){const b=u[o++],$=s.getAttribute(p).split(x),J=/([.?@])?(.*)/.exec(b);a.push({type:1,index:n,name:J[2],strings:$,ctor:J[1]==="."?Fe:J[1]==="?"?qe:J[1]==="@"?Ye:te}),s.removeAttribute(p)}else p.startsWith(x)&&(a.push({type:6,index:n}),s.removeAttribute(p));if(ze.test(s.tagName)){const p=s.textContent.split(x),b=p.length-1;if(b>0){s.textContent=K?K.emptyScript:"";for(let $=0;$<b;$++)s.append(p[$],W()),S.nextNode(),a.push({type:2,index:++n});s.append(p[b],W())}}}else if(s.nodeType===8)if(s.data===Oe)a.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(x,p+1))!==-1;)a.push({type:7,index:n}),p+=x.length-1}n++}}static createElement(e,r){const i=E.createElement("template");return i.innerHTML=e,i}};function C(t,e,r=t,i){if(e===k)return e;let s=i!==void 0?r._$Co?.[i]:r._$Cl;const n=V(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(t),s._$AT(t,r,i)),i!==void 0?(r._$Co??=[])[i]=s:r._$Cl=s),s!==void 0&&(e=C(t,s._$AS(t,e.values),s,i)),e}class Me{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:i}=this._$AD,s=(e?.creationScope??E).importNode(r,!0);S.currentNode=s;let n=S.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new M(n,n.nextSibling,this,e):a.type===1?d=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(d=new Ue(n,this,e)),this._$AV.push(d),a=i[++l]}o!==a?.index&&(n=S.nextNode(),o++)}return S.currentNode=E,s}p(e){let r=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,r),r+=i.strings.length-2):i._$AI(e[r])),r++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,i,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=C(this,e,r),V(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==k&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Te(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&V(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){const{values:r,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=oe.createElement(De(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(r);else{const n=new Me(s,this),o=n.u(this.options);n.p(r),this.T(o),this._$AH=n}}_$AC(e){let r=$e.get(e.strings);return r===void 0&&$e.set(e.strings,r=new oe(e)),r}k(e){le(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,s=0;for(const n of e)s===r.length?r.push(i=new M(this.O(W()),this.O(W()),this,this.options)):i=r[s],i._$AI(n),s++;s<r.length&&(this._$AR(i&&i._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){const i=me(e).nextSibling;me(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,i,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(e,r=this,i,s){const n=this.strings;let o=!1;if(n===void 0)e=C(this,e,r,0),o=!V(e)||e!==this._$AH&&e!==k,o&&(this._$AH=e);else{const l=e;let a,d;for(e=n[0],a=0;a<n.length-1;a++)d=C(this,l[i+a],r,a),d===k&&(d=this._$AH[a]),o||=!V(d)||d!==this._$AH[a],d===m?e=m:e!==m&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!s&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Fe extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class qe extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class Ye extends te{constructor(e,r,i,s,n){super(e,r,i,s,n),this.type=5}_$AI(e,r=this){if((e=C(this,e,r,0)??m)===k)return;const i=this._$AH,s=e===m&&i!==m||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==m&&(i===m||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ue{constructor(e,r,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}}const H={R:Me,D:Te,V:C,I:M,F:Ue},Je=ae.litHtmlPolyfillSupport;Je?.(oe,M),(ae.litHtmlVersions??=[]).push("3.3.2");const Ne=(t,e,r)=>{const i=r?.renderBefore??e;let s=i._$litPart$;if(s===void 0){const n=r?.renderBefore??null;i._$litPart$=s=new M(e.insertBefore(W(),n),n,void 0,r??{})}return s._$AI(t),s},Ze={resolveDirective:H.V,ElementPart:H.F,TemplateInstance:H.R,isIterable:H.D,ChildPart:H.I};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L={ATTRIBUTE:1,PROPERTY:3,EVENT:5,ELEMENT:6};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ke=t=>t===null||typeof t!="object"&&typeof t!="function",Qe=(t,e)=>t?._$litType$!==void 0,Xe=t=>t?._$litType$?.h!=null,et=t=>t.strings===void 0;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{TemplateInstance:tt,isIterable:rt,resolveDirective:Re,ChildPart:B,ElementPart:st}=Ze,it=(t,e,r={})=>{if(e._$litPart$!==void 0)throw Error("container already contains a live render");let i,s,n;const o=[],l=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT);let a;for(;(a=l.nextNode())!==null;){const d=a.data;if(d.startsWith("lit-part")){if(o.length===0&&i!==void 0)throw Error(`There must be only one root part per container. Found a part marker (${a}) when we already have a root part marker (${s})`);n=nt(t,a,o,r),i===void 0&&(i=n),s??=a}else if(d.startsWith("lit-node"))at(a,o,r);else if(d.startsWith("/lit-part")){if(o.length===1&&n!==i)throw Error("internal error");n=ot(a,n,o)}}if(i===void 0){const d=e instanceof ShadowRoot?"{container.host.localName}'s shadow root":e instanceof DocumentFragment?"DocumentFragment":e.localName;console.error(`There should be exactly one root part in a render container, but we didn't find any in ${d}.`)}e._$litPart$=i},nt=(t,e,r,i)=>{let s,n;if(r.length===0)n=new B(e,null,void 0,i),s=t;else{const o=r[r.length-1];if(o.type==="template-instance")n=new B(e,null,o.instance,i),o.instance._$AV.push(n),s=o.result.values[o.instancePartIndex++],o.templatePartIndex++;else if(o.type==="iterable"){n=new B(e,null,o.part,i);const l=o.iterator.next();if(l.done)throw s=void 0,o.done=!0,Error("Unhandled shorter than expected iterable");s=l.value,o.part._$AH.push(n)}else n=new B(e,null,o.part,i)}if(s=Re(n,s),s===k)r.push({part:n,type:"leaf"});else if(Ke(s))r.push({part:n,type:"leaf"}),n._$AH=s;else if(Qe(s)){if(Xe(s))throw Error("compiled templates are not supported");const o="lit-part "+lt(s);if(e.data!==o)throw Error("Hydration value mismatch: Unexpected TemplateResult rendered to part");{const l=B.prototype._$AC(s),a=new tt(l,n);r.push({type:"template-instance",instance:a,part:n,templatePartIndex:0,instancePartIndex:0,result:s}),n._$AH=a}}else rt(s)?(r.push({part:n,type:"iterable",value:s,iterator:s[Symbol.iterator](),done:!1}),n._$AH=[]):(r.push({part:n,type:"leaf"}),n._$AH=s??"");return n},ot=(t,e,r)=>{if(e===void 0)throw Error("unbalanced part marker");e._$AB=t;const i=r.pop();if(i.type==="iterable"&&!i.iterator.next().done)throw Error("unexpected longer than expected iterable");if(r.length>0)return r[r.length-1].part},at=(t,e,r)=>{const i=/lit-node (\d+)/.exec(t.data),s=parseInt(i[1]),n=t.nextElementSibling;if(n===null)throw Error("could not find node for attribute parts");n.removeAttribute("defer-hydration");const o=e[e.length-1];if(o.type!=="template-instance")throw Error("Hydration value mismatch: Primitive found where TemplateResult expected. This usually occurs due to conditional rendering that resulted in a different value or template being rendered between the server and client.");{const l=o.instance;for(;;){const a=l._$AD.parts[o.templatePartIndex];if(a===void 0||a.type!==L.ATTRIBUTE&&a.type!==L.ELEMENT||a.index!==s)break;if(a.type===L.ATTRIBUTE){const d=new a.ctor(n,a.name,a.strings,o.instance,r),u=et(d)?o.result.values[o.instancePartIndex]:o.result.values,p=!(d.type===L.EVENT||d.type===L.PROPERTY);d._$AI(u,d,o.instancePartIndex,p),o.instancePartIndex+=a.strings.length-1,l._$AV.push(d)}else{const d=new st(n,o.instance,r);Re(d,o.result.values[o.instancePartIndex++]),l._$AV.push(d)}o.templatePartIndex++}}},xe=new WeakMap,lt=t=>{let e=xe.get(t.strings);if(e!==void 0)return e;const r=new Uint32Array(2).fill(5381);for(const s of t.strings)for(let n=0;n<s.length;n++)r[n%2]=33*r[n%2]^s.charCodeAt(n);const i=String.fromCharCode(...new Uint8Array(r.buffer));return e=btoa(i),xe.set(t.strings,e),e};globalThis.litElementHydrateSupport=({LitElement:t})=>{const e=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),"observedAttributes").get;Object.defineProperty(t,"observedAttributes",{get(){return[...e.call(this),"defer-hydration"]}});const r=t.prototype.attributeChangedCallback;t.prototype.attributeChangedCallback=function(o,l,a){o==="defer-hydration"&&a===null&&i.call(this),r.call(this,o,l,a)};const i=t.prototype.connectedCallback;t.prototype.connectedCallback=function(){this.hasAttribute("defer-hydration")||i.call(this)};const s=t.prototype.createRenderRoot;t.prototype.createRenderRoot=function(){return this.shadowRoot?(this._$AG=!0,this.shadowRoot):s.call(this)};const n=Object.getPrototypeOf(t.prototype).update;t.prototype.update=function(o){const l=this.render();if(n.call(this,o),this._$AG){this._$AG=!1;for(const a of this.getAttributeNames())if(a.startsWith("hydrate-internals-")){const d=a.slice(18);this.removeAttribute(d),this.removeAttribute(a)}it(l,this.renderRoot,this.renderOptions)}else Ne(l,this.renderRoot,this.renderOptions)}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=globalThis,ce=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),we=new WeakMap;let Ie=class{constructor(e,r,i){if(this._$cssResult$=!0,i!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(ce&&e===void 0){const i=r!==void 0&&r.length===1;i&&(e=we.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&we.set(r,e))}return e}toString(){return this.cssText}};const ct=t=>new Ie(typeof t=="string"?t:t+"",void 0,de),f=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1],t[0]);return new Ie(r,t,de)},dt=(t,e)=>{if(ce)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const i=document.createElement("style"),s=Z.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=r.cssText,t.appendChild(i)}},_e=ce?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const i of e.cssRules)r+=i.cssText;return ct(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:pt,defineProperty:ht,getOwnPropertyDescriptor:ut,getOwnPropertyNames:mt,getOwnPropertySymbols:gt,getPrototypeOf:ft}=Object,re=globalThis,Ae=re.trustedTypes,vt=Ae?Ae.emptyScript:"",bt=re.reactiveElementPolyfillSupport,G=(t,e)=>t,Q={toAttribute(t,e){switch(e){case Boolean:t=t?vt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},pe=(t,e)=>!pt(t,e),Pe={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:pe};Symbol.metadata??=Symbol("metadata"),re.litPropertyMetadata??=new WeakMap;class z extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=Pe){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,r);s!==void 0&&ht(this.prototype,e,s)}}static getPropertyDescriptor(e,r,i){const{get:s,set:n}=ut(this.prototype,e)??{get(){return this[r]},set(o){this[r]=o}};return{get:s,set(o){const l=s?.call(this);n?.call(this,o),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Pe}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;const e=ft(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){const r=this.properties,i=[...mt(r),...gt(r)];for(const s of i)this.createProperty(s,r[s])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[i,s]of r)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[r,i]of this.elementProperties){const s=this._$Eu(r,i);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)r.unshift(_e(s))}else e!==void 0&&r.push(_e(e));return r}static _$Eu(e,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const i of r.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,r,i){this._$AK(e,i)}_$ET(e,r){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const n=(i.converter?.toAttribute!==void 0?i.converter:Q).toAttribute(r,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,r){const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const n=i.getPropertyOptions(s),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Q;this._$Em=s;const l=o.fromAttribute(r,n.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(e,r,i,s=!1,n){if(e!==void 0){const o=this.constructor;if(s===!1&&(n=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??pe)(n,r)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??r??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,n]of i){const{wrapped:o}=n,l=this[s];o!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,n,l)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(r)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM()}updated(e){}firstUpdated(e){}}z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[G("elementProperties")]=new Map,z[G("finalized")]=new Map,bt?.({ReactiveElement:z}),(re.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=globalThis;class g extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ne(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}}g._$litElement$=!0,g.finalized=!0,he.litElementHydrateSupport?.({LitElement:g});const yt=he.litElementPolyfillSupport;yt?.({LitElement:g});(he.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:pe},xt=(t=$t,e,r)=>{const{kind:i,metadata:s}=r;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(r.name,t),i==="accessor"){const{name:o}=r;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,a,t,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,t,l),l}}}if(i==="setter"){const{name:o}=r;return function(l){const a=this[o];e.call(this,l),this.requestUpdate(o,a,t,!0,l)}}throw Error("Unsupported decorator location: "+i)};function h(t){return(e,r)=>typeof r=="object"?xt(t,e,r):((i,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,i),o?Object.getOwnPropertyDescriptor(s,n):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(t){return h({...t,state:!0,attribute:!1})}var wt=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,se=(t,e,r,i)=>{for(var s=i>1?void 0:i?_t(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&wt(e,r,s),s};const At=[{title:"Overview",items:[{path:"/",label:"Dashboard",icon:"house"}]},{title:"Management",items:[{path:"/groves",label:"Groves",icon:"folder"},{path:"/agents",label:"Agents",icon:"cpu"}]},{title:"System",items:[{path:"/settings",label:"Settings",icon:"gear"}]}];let D=class extends g{constructor(){super(...arguments),this.user=null,this.currentPath="/",this.collapsed=!1}render(){return c`
      <div class="logo">
        <div class="logo-icon">S</div>
        <div class="logo-text">
          <h1>Scion</h1>
          <span>Agent Orchestration</span>
        </div>
      </div>

      <nav class="nav-container">
        ${At.map(t=>c`
            <div class="nav-section">
              <div class="nav-section-title">${t.title}</div>
              <ul class="nav-list">
                ${t.items.map(e=>c`
                    <li class="nav-item">
                      <a
                        href="${e.path}"
                        class="nav-link ${this.isActive(e.path)?"active":""}"
                        @click=${r=>this.handleNavClick(r,e.path)}
                      >
                        <sl-icon name="${e.icon}"></sl-icon>
                        <span class="nav-link-text">${e.label}</span>
                      </a>
                    </li>
                  `)}
              </ul>
            </div>
          `)}
      </nav>

      <div class="nav-footer">
        <button
          class="theme-toggle"
          @click=${()=>this.toggleTheme()}
          title="Toggle theme"
          aria-label="Toggle dark mode"
        >
          <sl-icon name="sun-moon"></sl-icon>
        </button>
      </div>
    `}isActive(t){return t==="/"?this.currentPath==="/":this.currentPath.startsWith(t)}handleNavClick(t,e){this.dispatchEvent(new CustomEvent("nav-click",{detail:{path:e},bubbles:!0,composed:!0}))}toggleTheme(){const t=document.documentElement,r=t.getAttribute("data-theme")==="dark"?"light":"dark";t.setAttribute("data-theme",r),r==="dark"?t.classList.add("sl-theme-dark"):t.classList.remove("sl-theme-dark"),localStorage.setItem("scion-theme",r),this.dispatchEvent(new CustomEvent("theme-change",{detail:{theme:r},bubbles:!0,composed:!0}))}};D.styles=f`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: var(--scion-sidebar-width, 260px);
      background: var(--scion-surface, #ffffff);
      border-right: 1px solid var(--scion-border, #e2e8f0);
    }

    :host([collapsed]) {
      width: var(--scion-sidebar-collapsed-width, 64px);
    }

    .logo {
      padding: 1.25rem 1rem;
      border-bottom: 1px solid var(--scion-border, #e2e8f0);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--scion-primary, #3b82f6) 0%, #1d4ed8 100%);
      border-radius: 0.5rem;
      color: white;
      font-weight: 700;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    :host([collapsed]) .logo-text {
      display: none;
    }

    .logo-text h1 {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--scion-text, #1e293b);
      margin: 0;
      line-height: 1.2;
    }

    .logo-text span {
      font-size: 0.6875rem;
      color: var(--scion-text-muted, #64748b);
      white-space: nowrap;
    }

    .nav-container {
      flex: 1;
      padding: 1rem 0.75rem;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .nav-section {
      margin-bottom: 1.5rem;
    }

    .nav-section:last-child {
      margin-bottom: 0;
    }

    .nav-section-title {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--scion-text-muted, #64748b);
      margin-bottom: 0.5rem;
      padding: 0 0.75rem;
    }

    :host([collapsed]) .nav-section-title {
      display: none;
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      margin-bottom: 0.25rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.75rem;
      border-radius: 0.5rem;
      color: var(--scion-text, #1e293b);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.15s ease;
    }

    :host([collapsed]) .nav-link {
      justify-content: center;
      padding: 0.75rem;
    }

    .nav-link:hover {
      background: var(--scion-bg-subtle, #f1f5f9);
    }

    .nav-link.active {
      background: var(--scion-primary, #3b82f6);
      color: white;
    }

    .nav-link.active:hover {
      background: var(--scion-primary-hover, #2563eb);
    }

    .nav-link sl-icon {
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .nav-link-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :host([collapsed]) .nav-link-text {
      display: none;
    }

    .nav-footer {
      padding: 0.75rem;
      border-top: 1px solid var(--scion-border, #e2e8f0);
    }

    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background: var(--scion-bg-subtle, #f1f5f9);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .theme-toggle:hover {
      background: var(--scion-border, #e2e8f0);
    }
  `;se([h({type:Object})],D.prototype,"user",2);se([h({type:String})],D.prototype,"currentPath",2);se([h({type:Boolean,reflect:!0})],D.prototype,"collapsed",2);D=se([v("scion-nav")],D);var Pt=Object.defineProperty,St=Object.getOwnPropertyDescriptor,U=(t,e,r,i)=>{for(var s=i>1?void 0:i?St(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Pt(e,r,s),s};let w=class extends g{constructor(){super(...arguments),this.user=null,this.currentPath="/",this.pageTitle="Dashboard",this.showMobileMenu=!1,this._menuOpen=!1}render(){return c`
      <div class="header-left">
        ${this.showMobileMenu?c`
              <button
                class="mobile-menu-btn"
                @click=${()=>this.handleMobileMenuClick()}
                aria-label="Open navigation menu"
              >
                <sl-icon name="list" style="font-size: 1.25rem;"></sl-icon>
              </button>
            `:""}
        <h1 class="page-title">${this.pageTitle}</h1>
      </div>

      <div class="header-right">
        <div class="header-actions">
          <sl-tooltip content="Notifications">
            <sl-icon-button name="bell" label="Notifications"></sl-icon-button>
          </sl-tooltip>
          <sl-tooltip content="Help">
            <sl-icon-button name="question-circle" label="Help"></sl-icon-button>
          </sl-tooltip>
        </div>

        <div class="user-section">${this.renderUserSection()}</div>
      </div>
    `}renderUserSection(){if(!this.user)return c`
        <a href="/auth/login" class="sign-in-link">
          <sl-icon name="box-arrow-in-right"></sl-icon>
          Sign in
        </a>
      `;const t=this.getInitials(this.user.name);return c`
      <span class="user-name">${this.user.name}</span>
      <sl-dropdown class="user-dropdown" placement="bottom-end">
        <button slot="trigger" class="user-button" aria-label="User menu">
          <sl-avatar
            class="user-avatar"
            initials="${t}"
            image="${this.user.avatar||""}"
            label="${this.user.name}"
          ></sl-avatar>
          <sl-icon name="chevron-down" class="dropdown-icon"></sl-icon>
        </button>
        <sl-menu>
          <sl-menu-item>
            <sl-icon slot="prefix" name="person"></sl-icon>
            Profile
          </sl-menu-item>
          <sl-menu-item>
            <sl-icon slot="prefix" name="gear"></sl-icon>
            Settings
          </sl-menu-item>
          <sl-divider></sl-divider>
          <sl-menu-item @click=${()=>this.handleLogout()}>
            <sl-icon slot="prefix" name="box-arrow-right"></sl-icon>
            Sign out
          </sl-menu-item>
        </sl-menu>
      </sl-dropdown>
    `}getInitials(t){return t.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2)}handleMobileMenuClick(){this.dispatchEvent(new CustomEvent("mobile-menu-toggle",{bubbles:!0,composed:!0}))}handleLogout(){this.dispatchEvent(new CustomEvent("logout",{bubbles:!0,composed:!0}))}};w.styles=f`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--scion-header-height, 60px);
      padding: 0 1.5rem;
      background: var(--scion-surface, #ffffff);
      border-bottom: 1px solid var(--scion-border, #e2e8f0);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .mobile-menu-btn {
      display: none;
      padding: 0.5rem;
      background: transparent;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      color: var(--scion-text, #1e293b);
    }

    .mobile-menu-btn:hover {
      background: var(--scion-bg-subtle, #f1f5f9);
    }

    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: flex;
      }
    }

    .page-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (max-width: 640px) {
      .header-actions {
        display: none;
      }
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--scion-text, #1e293b);
    }

    @media (max-width: 640px) {
      .user-name {
        display: none;
      }
    }

    .sign-in-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background: var(--scion-primary, #3b82f6);
      color: white;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.15s ease;
    }

    .sign-in-link:hover {
      background: var(--scion-primary-hover, #2563eb);
    }

    /* User dropdown styles */
    .user-dropdown {
      position: relative;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem;
      background: transparent;
      border: none;
      border-radius: 9999px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .user-button:hover {
      background: var(--scion-bg-subtle, #f1f5f9);
    }

    .user-avatar {
      --size: 2rem;
    }

    .dropdown-icon {
      font-size: 0.75rem;
      color: var(--scion-text-muted, #64748b);
      transition: transform 0.15s ease;
    }

    .user-dropdown[open] .dropdown-icon {
      transform: rotate(180deg);
    }
  `;U([h({type:Object})],w.prototype,"user",2);U([h({type:String})],w.prototype,"currentPath",2);U([h({type:String})],w.prototype,"pageTitle",2);U([h({type:Boolean})],w.prototype,"showMobileMenu",2);U([y()],w.prototype,"_menuOpen",2);w=U([v("scion-header")],w);var Et=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,ue=(t,e,r,i)=>{for(var s=i>1?void 0:i?kt(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Et(e,r,s),s};const Ct={"/":"Dashboard","/groves":"Groves","/agents":"Agents","/settings":"Settings"};let F=class extends g{constructor(){super(...arguments),this.path="/",this.currentLabel=""}render(){const t=this.generateBreadcrumbs();return t.length<=1?c``:c`
      <sl-breadcrumb>
        ${t.map((e,r)=>c`
            <sl-breadcrumb-item
              href="${e.current?"":e.href}"
              ?aria-current=${e.current?"page":!1}
            >
              ${r===0?c`<sl-icon name="house" class="breadcrumb-icon"></sl-icon>`:""}
              ${e.label}
            </sl-breadcrumb-item>
          `)}
      </sl-breadcrumb>
    `}generateBreadcrumbs(){const t=[];if(t.push({label:"Home",href:"/",current:this.path==="/"}),this.path==="/")return t;const e=this.path.split("/").filter(Boolean);let r="";return e.forEach((i,s)=>{r+=`/${i}`;const n=s===e.length-1;let o=Ct[r];o||(this.isId(i)?o=this.currentLabel&&n?this.currentLabel:this.formatId(i):o=this.formatSegment(i)),t.push({label:o,href:r,current:n})}),t}isId(t){return/^[0-9a-f-]{8,}$/i.test(t)||/^\d+$/.test(t)}formatId(t){return t.length>8?t.slice(0,8)+"...":t}formatSegment(t){return t.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}};F.styles=f`
    :host {
      display: block;
    }

    sl-breadcrumb {
      --separator-color: var(--scion-text-muted, #64748b);
    }

    sl-breadcrumb-item::part(label) {
      font-size: 0.875rem;
    }

    sl-breadcrumb-item::part(label):hover {
      color: var(--scion-primary, #3b82f6);
    }

    sl-breadcrumb-item[aria-current='page']::part(label) {
      color: var(--scion-text, #1e293b);
      font-weight: 500;
    }

    .breadcrumb-icon {
      font-size: 0.875rem;
      vertical-align: middle;
      margin-right: 0.25rem;
    }
  `;ue([h({type:String})],F.prototype,"path",2);ue([h({type:String})],F.prototype,"currentLabel",2);F=ue([v("scion-breadcrumb")],F);var Ot=Object.defineProperty,Tt=Object.getOwnPropertyDescriptor,ie=(t,e,r,i)=>{for(var s=i>1?void 0:i?Tt(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Ot(e,r,s),s};const Se={"/":"Dashboard","/groves":"Groves","/agents":"Agents","/settings":"Settings"};let j=class extends g{constructor(){super(...arguments),this.user=null,this.currentPath="/",this._drawerOpen=!1}render(){const t=this.getPageTitle();return c`
      <!-- Desktop Sidebar -->
      <aside class="sidebar">
        <scion-nav .user=${this.user} .currentPath=${this.currentPath}></scion-nav>
      </aside>

      <!-- Mobile Drawer -->
      <sl-drawer
        class="mobile-drawer"
        ?open=${this._drawerOpen}
        placement="start"
        @sl-hide=${()=>this.handleDrawerClose()}
      >
        <scion-nav
          .user=${this.user}
          .currentPath=${this.currentPath}
          @nav-click=${()=>this.handleNavClick()}
        ></scion-nav>
      </sl-drawer>

      <!-- Main Content -->
      <main class="main">
        <scion-header
          .user=${this.user}
          .currentPath=${this.currentPath}
          .pageTitle=${t}
          ?showMobileMenu=${!0}
          @mobile-menu-toggle=${()=>this.handleMobileMenuToggle()}
          @logout=${()=>this.handleLogout()}
        ></scion-header>

        <div class="content">
          <div class="content-inner">
            <slot></slot>
          </div>
        </div>
      </main>
    `}getPageTitle(){return Se[this.currentPath]?Se[this.currentPath]:this.currentPath.startsWith("/groves/")?"Grove Details":this.currentPath.startsWith("/agents/")?this.currentPath.includes("/terminal")?"Terminal":"Agent Details":"Page Not Found"}handleMobileMenuToggle(){this._drawerOpen=!this._drawerOpen}handleDrawerClose(){this._drawerOpen=!1}handleNavClick(){this._drawerOpen=!1}handleLogout(){fetch("/auth/logout",{method:"POST",credentials:"include"}).then(()=>{window.location.href="/auth/login"}).catch(t=>{console.error("Logout failed:",t)})}};j.styles=f`
    :host {
      display: flex;
      min-height: 100vh;
      background: var(--scion-bg, #f8fafc);
    }

    /* Desktop sidebar */
    .sidebar {
      display: flex;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      height: 100vh;
    }

    @media (max-width: 768px) {
      .sidebar {
        display: none;
      }
    }

    /* Hide mobile drawer until Shoelace is loaded */
    /* This prevents SSR from rendering a visible duplicate nav */
    sl-drawer:not(:defined) {
      display: none;
    }

    /* Mobile drawer */
    .mobile-drawer {
      --size: 280px;
    }

    .mobile-drawer::part(panel) {
      background: var(--scion-surface, #ffffff);
    }

    .mobile-drawer::part(close-button) {
      color: var(--scion-text, #1e293b);
    }

    .mobile-drawer::part(close-button):hover {
      color: var(--scion-primary, #3b82f6);
    }

    /* Main content area */
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0; /* Prevent flex overflow */
    }

    /* Content wrapper */
    .content {
      flex: 1;
      padding: 1.5rem;
      overflow: auto;
    }

    @media (max-width: 640px) {
      .content {
        padding: 1rem;
      }
    }

    /* Max width container */
    .content-inner {
      max-width: var(--scion-content-max-width, 1400px);
      margin: 0 auto;
      width: 100%;
    }

    /* Loading overlay */
    .loading-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.2s ease,
        visibility 0.2s ease;
    }

    .loading-overlay.visible {
      opacity: 1;
      visibility: visible;
    }

    @media (prefers-color-scheme: dark) {
      .loading-overlay {
        background: rgba(15, 23, 42, 0.8);
      }
    }
  `;ie([h({type:Object})],j.prototype,"user",2);ie([h({type:String})],j.prototype,"currentPath",2);ie([y()],j.prototype,"_drawerOpen",2);j=ie([v("scion-app")],j);var zt=Object.defineProperty,Dt=Object.getOwnPropertyDescriptor,N=(t,e,r,i)=>{for(var s=i>1?void 0:i?Dt(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&zt(e,r,s),s};const Ee={running:{variant:"success",icon:"play-circle",pulse:!1},stopped:{variant:"neutral",icon:"stop-circle",pulse:!1},provisioning:{variant:"warning",icon:"hourglass-split",pulse:!0},starting:{variant:"warning",icon:"arrow-repeat",pulse:!0},stopping:{variant:"warning",icon:"arrow-repeat",pulse:!0},error:{variant:"danger",icon:"exclamation-triangle",pulse:!1},healthy:{variant:"success",icon:"check-circle",pulse:!1},unhealthy:{variant:"danger",icon:"x-circle",pulse:!1},pending:{variant:"warning",icon:"clock",pulse:!0},active:{variant:"success",icon:"circle-fill",pulse:!1},inactive:{variant:"neutral",icon:"circle",pulse:!1},success:{variant:"success",pulse:!1},warning:{variant:"warning",pulse:!1},danger:{variant:"danger",pulse:!1},info:{variant:"primary",pulse:!1},neutral:{variant:"neutral",pulse:!1}};let _=class extends g{constructor(){super(...arguments),this.status="neutral",this.label="",this.size="medium",this.showIcon=!0,this.showPulse=!0}render(){const t=Ee[this.status]||Ee.neutral,e=this.label||this.status,r=this.showPulse&&t.pulse;return c`
      <span class="badge ${t.variant} ${this.size} ${r?"pulse":""}">
        ${this.showIcon&&t.icon?c`<sl-icon name="${t.icon}"></sl-icon>`:""}
        ${e}
      </span>
    `}};_.styles=f`
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      font-weight: 500;
      text-transform: capitalize;
      white-space: nowrap;
    }

    /* Size variants */
    .badge.small {
      font-size: 0.6875rem;
      padding: 0.125rem 0.5rem;
      gap: 0.25rem;
    }

    .badge.medium {
      font-size: 0.75rem;
    }

    .badge.large {
      font-size: 0.875rem;
      padding: 0.375rem 0.75rem;
    }

    .badge sl-icon {
      font-size: 0.875em;
    }

    .badge.small sl-icon {
      font-size: 0.75em;
    }

    .badge.large sl-icon {
      font-size: 1em;
    }

    /* Variant colors */
    .badge.success {
      background: var(--scion-success-100, #dcfce7);
      color: var(--scion-success-700, #15803d);
    }

    .badge.warning {
      background: var(--scion-warning-100, #fef3c7);
      color: var(--scion-warning-700, #b45309);
    }

    .badge.danger {
      background: var(--scion-danger-100, #fee2e2);
      color: var(--scion-danger-700, #b91c1c);
    }

    .badge.primary {
      background: var(--scion-primary-100, #dbeafe);
      color: var(--scion-primary-700, #1d4ed8);
    }

    .badge.neutral {
      background: var(--scion-neutral-100, #f1f5f9);
      color: var(--scion-neutral-600, #475569);
    }

    /* Pulse indicator */
    .pulse {
      position: relative;
    }

    .pulse::before {
      content: '';
      position: absolute;
      left: 0.5rem;
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .pulse.success::before {
      background: var(--scion-success-500, #22c55e);
      box-shadow: 0 0 0 0 var(--scion-success-400, #4ade80);
    }

    .pulse.warning::before {
      background: var(--scion-warning-500, #f59e0b);
      box-shadow: 0 0 0 0 var(--scion-warning-400, #fbbf24);
    }

    .pulse.danger::before {
      background: var(--scion-danger-500, #ef4444);
      box-shadow: 0 0 0 0 var(--scion-danger-400, #f87171);
    }

    @keyframes pulse {
      0% {
        box-shadow:
          0 0 0 0 rgba(34, 197, 94, 0.5),
          0 0 0 0 rgba(34, 197, 94, 0.3);
      }
      70% {
        box-shadow:
          0 0 0 6px rgba(34, 197, 94, 0),
          0 0 0 10px rgba(34, 197, 94, 0);
      }
      100% {
        box-shadow:
          0 0 0 0 rgba(34, 197, 94, 0),
          0 0 0 0 rgba(34, 197, 94, 0);
      }
    }

    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
      .badge.success {
        background: rgba(34, 197, 94, 0.2);
        color: #86efac;
      }

      .badge.warning {
        background: rgba(245, 158, 11, 0.2);
        color: #fcd34d;
      }

      .badge.danger {
        background: rgba(239, 68, 68, 0.2);
        color: #fca5a5;
      }

      .badge.primary {
        background: rgba(59, 130, 246, 0.2);
        color: #93c5fd;
      }

      .badge.neutral {
        background: rgba(100, 116, 139, 0.2);
        color: #cbd5e1;
      }
    }
  `;N([h({type:String})],_.prototype,"status",2);N([h({type:String})],_.prototype,"label",2);N([h({type:String})],_.prototype,"size",2);N([h({type:Boolean})],_.prototype,"showIcon",2);N([h({type:Boolean})],_.prototype,"showPulse",2);_=N([v("scion-status-badge")],_);var jt=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,He=(t,e,r,i)=>{for(var s=i>1?void 0:i?Mt(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&jt(e,r,s),s};let X=class extends g{constructor(){super(...arguments),this.pageData=null}render(){const t=this.pageData?.user?.name?.split(" ")[0]||"there";return c`
      <div class="hero">
        <h1>Welcome back, ${t}!</h1>
        <p>Here's what's happening with your agents today.</p>
      </div>

      <div class="stats">
        <div class="stat-card">
          <h3>Active Agents</h3>
          <div class="stat-value">
            <span>--</span>
          </div>
          <div class="stat-change">
            <scion-status-badge status="success" label="Ready" size="small"></scion-status-badge>
          </div>
        </div>
        <div class="stat-card">
          <h3>Groves</h3>
          <div class="stat-value">--</div>
          <div class="stat-change">Project workspaces</div>
        </div>
        <div class="stat-card">
          <h3>Tasks Completed</h3>
          <div class="stat-value">--</div>
          <div class="stat-change">This week</div>
        </div>
        <div class="stat-card">
          <h3>System Status</h3>
          <div class="stat-value">
            <scion-status-badge status="healthy" size="large" label="Healthy"></scion-status-badge>
          </div>
          <div class="stat-change">All systems operational</div>
        </div>
      </div>

      <h2 class="section-title">Quick Actions</h2>
      <div class="quick-actions">
        <a href="/agents" class="action-card">
          <div class="action-icon">
            <sl-icon name="plus-lg"></sl-icon>
          </div>
          <div class="action-text">
            <h4>Create Agent</h4>
            <p>Spin up a new AI agent</p>
          </div>
        </a>
        <a href="/groves" class="action-card">
          <div class="action-icon">
            <sl-icon name="folder"></sl-icon>
          </div>
          <div class="action-text">
            <h4>View Groves</h4>
            <p>Browse project workspaces</p>
          </div>
        </a>
        <a href="/agents" class="action-card">
          <div class="action-icon">
            <sl-icon name="terminal"></sl-icon>
          </div>
          <div class="action-text">
            <h4>Open Terminal</h4>
            <p>Connect to running agent</p>
          </div>
        </a>
      </div>

      <div class="activity-section">
        <h2 class="section-title">Recent Activity</h2>
        <div class="activity-list">
          <div class="empty-state">
            <sl-icon name="clock-history"></sl-icon>
            <p>No recent activity to display.<br />Start by creating your first agent.</p>
            <sl-button variant="primary" href="/agents" style="margin-top: 1rem;">
              <sl-icon slot="prefix" name="plus-lg"></sl-icon>
              Create Agent
            </sl-button>
          </div>
        </div>
      </div>
    `}};X.styles=f`
    :host {
      display: block;
    }

    .hero {
      background: linear-gradient(
        135deg,
        var(--scion-primary, #3b82f6) 0%,
        var(--scion-primary-700, #1d4ed8) 100%
      );
      color: white;
      padding: 2rem;
      border-radius: var(--scion-radius-lg, 0.75rem);
      margin-bottom: 2rem;
    }

    .hero h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
    }

    .hero p {
      font-size: 1rem;
      opacity: 0.9;
      margin: 0;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--scion-surface, #ffffff);
      border-radius: var(--scion-radius-lg, 0.75rem);
      padding: 1.5rem;
      box-shadow: var(--scion-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
      border: 1px solid var(--scion-border, #e2e8f0);
    }

    .stat-card h3 {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 0.5rem 0;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--scion-text, #1e293b);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .stat-change {
      font-size: 0.875rem;
      margin-top: 0.5rem;
      color: var(--scion-text-muted, #64748b);
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--scion-text, #1e293b);
    }

    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }

    .action-card {
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
      padding: 1.25rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: all var(--scion-transition-fast, 150ms ease);
      text-decoration: none;
      color: inherit;
    }

    .action-card:hover {
      border-color: var(--scion-primary, #3b82f6);
      box-shadow: var(--scion-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      transform: translateY(-2px);
    }

    .action-icon {
      width: 3rem;
      height: 3rem;
      border-radius: var(--scion-radius, 0.5rem);
      background: var(--scion-primary-50, #eff6ff);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--scion-primary, #3b82f6);
      flex-shrink: 0;
    }

    .action-icon sl-icon {
      font-size: 1.5rem;
    }

    .action-text h4 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
      color: var(--scion-text, #1e293b);
    }

    .action-text p {
      font-size: 0.875rem;
      color: var(--scion-text-muted, #64748b);
      margin: 0;
    }

    /* Recent activity section */
    .activity-section {
      margin-top: 2rem;
    }

    .activity-list {
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
      overflow: hidden;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--scion-border, #e2e8f0);
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background: var(--scion-bg-subtle, #f1f5f9);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--scion-text-muted, #64748b);
      flex-shrink: 0;
    }

    .activity-content {
      flex: 1;
      min-width: 0;
    }

    .activity-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--scion-text, #1e293b);
      margin: 0;
    }

    .activity-time {
      font-size: 0.75rem;
      color: var(--scion-text-muted, #64748b);
      margin-top: 0.125rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
      color: var(--scion-text-muted, #64748b);
    }

    .empty-state sl-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
  `;He([h({type:Object})],X.prototype,"pageData",2);X=He([v("scion-page-home")],X);var Ut=Object.defineProperty,Nt=Object.getOwnPropertyDescriptor,q=(t,e,r,i)=>{for(var s=i>1?void 0:i?Nt(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Ut(e,r,s),s};let O=class extends g{constructor(){super(...arguments),this.pageData=null,this.loading=!0,this.groves=[],this.error=null}connectedCallback(){super.connectedCallback(),this.loadGroves()}async loadGroves(){this.loading=!0,this.error=null;try{const t=await fetch("/api/groves");if(!t.ok){const r=await t.json().catch(()=>({}));throw new Error(r.message||`HTTP ${t.status}: ${t.statusText}`)}const e=await t.json();this.groves=Array.isArray(e)?e:e.groves||[]}catch(t){console.error("Failed to load groves:",t),this.error=t instanceof Error?t.message:"Failed to load groves"}finally{this.loading=!1}}getStatusVariant(t){switch(t){case"active":return"success";case"inactive":return"neutral";case"error":return"danger";default:return"neutral"}}formatDate(t){try{const e=new Date(t);return new Intl.RelativeTimeFormat("en",{numeric:"auto"}).format(Math.round((e.getTime()-Date.now())/(1e3*60*60*24)),"day")}catch{return t}}render(){return c`
      <div class="header">
        <h1>Groves</h1>
        <sl-button variant="primary" size="small" disabled>
          <sl-icon slot="prefix" name="plus-lg"></sl-icon>
          New Grove
        </sl-button>
      </div>

      ${this.loading?this.renderLoading():this.error?this.renderError():this.renderGroves()}
    `}renderLoading(){return c`
      <div class="loading-state">
        <sl-spinner></sl-spinner>
        <p>Loading groves...</p>
      </div>
    `}renderError(){return c`
      <div class="error-state">
        <sl-icon name="exclamation-triangle"></sl-icon>
        <h2>Failed to Load Groves</h2>
        <p>There was a problem connecting to the API.</p>
        <div class="error-details">${this.error}</div>
        <sl-button variant="primary" @click=${()=>this.loadGroves()}>
          <sl-icon slot="prefix" name="arrow-clockwise"></sl-icon>
          Retry
        </sl-button>
      </div>
    `}renderGroves(){return this.groves.length===0?this.renderEmptyState():c`
      <div class="grove-grid">${this.groves.map(t=>this.renderGroveCard(t))}</div>
    `}renderEmptyState(){return c`
      <div class="empty-state">
        <sl-icon name="folder2-open"></sl-icon>
        <h2>No Groves Found</h2>
        <p>
          Groves are project workspaces that contain your agents. Create your first grove to get
          started, or run
          <code>scion init</code> in a project directory.
        </p>
        <sl-button variant="primary" disabled>
          <sl-icon slot="prefix" name="plus-lg"></sl-icon>
          Create Grove
        </sl-button>
      </div>
    `}renderGroveCard(t){return c`
      <a href="/groves/${t.id}" class="grove-card">
        <div class="grove-header">
          <div>
            <h3 class="grove-name">
              <sl-icon name="folder-fill"></sl-icon>
              ${t.name}
            </h3>
            <div class="grove-path">${t.path}</div>
          </div>
          <scion-status-badge
            status=${this.getStatusVariant(t.status)}
            label=${t.status}
            size="small"
          >
          </scion-status-badge>
        </div>
        <div class="grove-stats">
          <div class="stat">
            <span class="stat-label">Agents</span>
            <span class="stat-value">${t.agentCount}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Updated</span>
            <span class="stat-value" style="font-size: 0.875rem; font-weight: 500;">
              ${this.formatDate(t.updatedAt)}
            </span>
          </div>
        </div>
      </a>
    `}};O.styles=f`
    :host {
      display: block;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .header h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--scion-text, #1e293b);
      margin: 0;
    }

    .grove-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .grove-card {
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
      padding: 1.5rem;
      transition: all var(--scion-transition-fast, 150ms ease);
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .grove-card:hover {
      border-color: var(--scion-primary, #3b82f6);
      box-shadow: var(--scion-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      transform: translateY(-2px);
    }

    .grove-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .grove-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .grove-name sl-icon {
      color: var(--scion-primary, #3b82f6);
    }

    .grove-path {
      font-size: 0.875rem;
      color: var(--scion-text-muted, #64748b);
      margin-top: 0.25rem;
      font-family: var(--scion-font-mono, monospace);
      word-break: break-all;
    }

    .grove-stats {
      display: flex;
      gap: 1.5rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--scion-border, #e2e8f0);
    }

    .stat {
      display: flex;
      flex-direction: column;
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--scion-text-muted, #64748b);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-value {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--scion-surface, #ffffff);
      border: 1px dashed var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
    }

    .empty-state sl-icon {
      font-size: 4rem;
      color: var(--scion-text-muted, #64748b);
      opacity: 0.5;
      margin-bottom: 1rem;
    }

    .empty-state h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.5rem 0;
    }

    .empty-state p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 1.5rem 0;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      color: var(--scion-text-muted, #64748b);
    }

    .loading-state sl-spinner {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .error-state {
      text-align: center;
      padding: 3rem 2rem;
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--sl-color-danger-200, #fecaca);
      border-radius: var(--scion-radius-lg, 0.75rem);
    }

    .error-state sl-icon {
      font-size: 3rem;
      color: var(--sl-color-danger-500, #ef4444);
      margin-bottom: 1rem;
    }

    .error-state h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.5rem 0;
    }

    .error-state p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 1rem 0;
    }

    .error-details {
      font-family: var(--scion-font-mono, monospace);
      font-size: 0.875rem;
      background: var(--scion-bg-subtle, #f1f5f9);
      padding: 0.75rem 1rem;
      border-radius: var(--scion-radius, 0.5rem);
      color: var(--sl-color-danger-700, #b91c1c);
      margin-bottom: 1rem;
    }
  `;q([h({type:Object})],O.prototype,"pageData",2);q([y()],O.prototype,"loading",2);q([y()],O.prototype,"groves",2);q([y()],O.prototype,"error",2);O=q([v("scion-page-groves")],O);var Rt=Object.defineProperty,It=Object.getOwnPropertyDescriptor,Y=(t,e,r,i)=>{for(var s=i>1?void 0:i?It(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Rt(e,r,s),s};let T=class extends g{constructor(){super(...arguments),this.pageData=null,this.loading=!0,this.agents=[],this.error=null}connectedCallback(){super.connectedCallback(),this.loadAgents()}async loadAgents(){this.loading=!0,this.error=null;try{const t=await fetch("/api/agents");if(!t.ok){const r=await t.json().catch(()=>({}));throw new Error(r.message||`HTTP ${t.status}: ${t.statusText}`)}const e=await t.json();this.agents=Array.isArray(e)?e:e.agents||[]}catch(t){console.error("Failed to load agents:",t),this.error=t instanceof Error?t.message:"Failed to load agents"}finally{this.loading=!1}}getStatusVariant(t){switch(t){case"running":return"success";case"stopped":return"neutral";case"provisioning":return"warning";case"error":return"danger";default:return"neutral"}}render(){return c`
      <div class="header">
        <h1>Agents</h1>
        <sl-button variant="primary" size="small" disabled>
          <sl-icon slot="prefix" name="plus-lg"></sl-icon>
          New Agent
        </sl-button>
      </div>

      ${this.loading?this.renderLoading():this.error?this.renderError():this.renderAgents()}
    `}renderLoading(){return c`
      <div class="loading-state">
        <sl-spinner></sl-spinner>
        <p>Loading agents...</p>
      </div>
    `}renderError(){return c`
      <div class="error-state">
        <sl-icon name="exclamation-triangle"></sl-icon>
        <h2>Failed to Load Agents</h2>
        <p>There was a problem connecting to the API.</p>
        <div class="error-details">${this.error}</div>
        <sl-button variant="primary" @click=${()=>this.loadAgents()}>
          <sl-icon slot="prefix" name="arrow-clockwise"></sl-icon>
          Retry
        </sl-button>
      </div>
    `}renderAgents(){return this.agents.length===0?this.renderEmptyState():c`
      <div class="agent-grid">${this.agents.map(t=>this.renderAgentCard(t))}</div>
    `}renderEmptyState(){return c`
      <div class="empty-state">
        <sl-icon name="cpu"></sl-icon>
        <h2>No Agents Found</h2>
        <p>
          Agents are AI-powered workers that can help you with coding tasks. Create your first agent
          to get started.
        </p>
        <sl-button variant="primary" disabled>
          <sl-icon slot="prefix" name="plus-lg"></sl-icon>
          Create Agent
        </sl-button>
      </div>
    `}renderAgentCard(t){return c`
      <div class="agent-card">
        <div class="agent-header">
          <div>
            <h3 class="agent-name">
              <sl-icon name="cpu"></sl-icon>
              ${t.name}
            </h3>
            <div class="agent-template">${t.template}</div>
          </div>
          <scion-status-badge
            status=${this.getStatusVariant(t.status)}
            label=${t.status}
            size="small"
          >
          </scion-status-badge>
        </div>

        ${t.taskSummary?c` <div class="agent-task">${t.taskSummary}</div> `:""}

        <div class="agent-actions">
          <sl-button variant="primary" size="small" ?disabled=${t.status!=="running"}>
            <sl-icon slot="prefix" name="terminal"></sl-icon>
            Terminal
          </sl-button>
          ${t.status==="running"?c`
                <sl-button variant="danger" size="small" outline>
                  <sl-icon slot="prefix" name="stop-circle"></sl-icon>
                  Stop
                </sl-button>
              `:c`
                <sl-button variant="success" size="small" outline>
                  <sl-icon slot="prefix" name="play-circle"></sl-icon>
                  Start
                </sl-button>
              `}
        </div>
      </div>
    `}};T.styles=f`
    :host {
      display: block;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .header h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--scion-text, #1e293b);
      margin: 0;
    }

    .agent-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .agent-card {
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
      padding: 1.5rem;
      transition: all var(--scion-transition-fast, 150ms ease);
    }

    .agent-card:hover {
      border-color: var(--scion-primary, #3b82f6);
      box-shadow: var(--scion-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    .agent-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .agent-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .agent-name sl-icon {
      color: var(--scion-primary, #3b82f6);
    }

    .agent-template {
      font-size: 0.875rem;
      color: var(--scion-text-muted, #64748b);
      margin-top: 0.25rem;
    }

    .agent-task {
      font-size: 0.875rem;
      color: var(--scion-text, #1e293b);
      margin-top: 0.75rem;
      padding: 0.75rem;
      background: var(--scion-bg-subtle, #f1f5f9);
      border-radius: var(--scion-radius, 0.5rem);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .agent-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--scion-border, #e2e8f0);
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--scion-surface, #ffffff);
      border: 1px dashed var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
    }

    .empty-state sl-icon {
      font-size: 4rem;
      color: var(--scion-text-muted, #64748b);
      opacity: 0.5;
      margin-bottom: 1rem;
    }

    .empty-state h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.5rem 0;
    }

    .empty-state p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 1.5rem 0;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      color: var(--scion-text-muted, #64748b);
    }

    .loading-state sl-spinner {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .error-state {
      text-align: center;
      padding: 3rem 2rem;
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--sl-color-danger-200, #fecaca);
      border-radius: var(--scion-radius-lg, 0.75rem);
    }

    .error-state sl-icon {
      font-size: 3rem;
      color: var(--sl-color-danger-500, #ef4444);
      margin-bottom: 1rem;
    }

    .error-state h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.5rem 0;
    }

    .error-state p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 1rem 0;
    }

    .error-details {
      font-family: var(--scion-font-mono, monospace);
      font-size: 0.875rem;
      background: var(--scion-bg-subtle, #f1f5f9);
      padding: 0.75rem 1rem;
      border-radius: var(--scion-radius, 0.5rem);
      color: var(--sl-color-danger-700, #b91c1c);
      margin-bottom: 1rem;
    }
  `;Y([h({type:Object})],T.prototype,"pageData",2);Y([y()],T.prototype,"loading",2);Y([y()],T.prototype,"agents",2);Y([y()],T.prototype,"error",2);T=Y([v("scion-page-agents")],T);var Ht=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,Le=(t,e,r,i)=>{for(var s=i>1?void 0:i?Lt(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Ht(e,r,s),s};let ee=class extends g{constructor(){super(...arguments),this.pageData=null}render(){const t=this.pageData?.path||"unknown";return c`
      <div class="container">
        <div class="illustration">
          <sl-icon name="emoji-frown"></sl-icon>
        </div>
        <div class="code">404</div>
        <h1>Page Not Found</h1>
        <p>
          Sorry, we couldn't find the page you're looking for. The path
          <span class="path">${t}</span> doesn't exist.
        </p>
        <div class="actions">
          <sl-button variant="primary" href="/">
            <sl-icon slot="prefix" name="house"></sl-icon>
            Back to Dashboard
          </sl-button>
          <sl-button variant="default" @click=${()=>this.handleGoBack()}>
            <sl-icon slot="prefix" name="arrow-left"></sl-icon>
            Go Back
          </sl-button>
        </div>
      </div>
    `}handleGoBack(){window.history.back()}};ee.styles=f`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 200px);
    }

    .container {
      text-align: center;
      max-width: 480px;
      padding: 2rem;
    }

    .code {
      font-size: 8rem;
      font-weight: 800;
      line-height: 1;
      background: linear-gradient(135deg, var(--scion-primary, #3b82f6) 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.75rem 0;
    }

    p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 2rem 0;
      line-height: 1.6;
    }

    .path {
      font-family: var(--scion-font-mono, monospace);
      background: var(--scion-bg-subtle, #f1f5f9);
      padding: 0.25rem 0.5rem;
      border-radius: var(--scion-radius-sm, 0.25rem);
      font-size: 0.875rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    sl-button::part(base) {
      font-weight: 500;
    }

    .illustration {
      margin-bottom: 1.5rem;
    }

    .illustration sl-icon {
      font-size: 6rem;
      color: var(--scion-neutral-300, #cbd5e1);
    }
  `;Le([h({type:Object})],ee.prototype,"pageData",2);ee=Le([v("scion-page-404")],ee);var Bt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,R=(t,e,r,i)=>{for(var s=i>1?void 0:i?Gt(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Bt(e,r,s),s};let A=class extends g{constructor(){super(...arguments),this.error="",this.returnTo="/",this.googleEnabled=!1,this.githubEnabled=!1,this._loading=!1}connectedCallback(){super.connectedCallback();const t=new URLSearchParams(window.location.search),e=t.get("error");e&&(this.error=decodeURIComponent(e));const r=t.get("returnTo");r&&(this.returnTo=r)}render(){const t=this.getProviders(),e=t.some(r=>r.available);return c`
      ${this._loading?this.renderLoading():""}

      <div class="login-container">
        <div class="logo">
          <div class="logo-text">Scion</div>
          <div class="logo-subtitle">Agent Orchestration Platform</div>
        </div>

        <h1>Sign in</h1>
        <p class="subtitle">Choose a provider to continue</p>

        ${this.error?c`
              <div class="error-alert" role="alert">
                <sl-icon name="exclamation-triangle"></sl-icon>
                <span class="error-message">${this.error}</span>
              </div>
            `:""}

        <div class="providers">
          ${e?t.map(r=>this.renderProvider(r)):c`
                <div class="no-providers">
                  <p>No authentication providers configured.</p>
                  <p>Please configure OAuth credentials in the server settings.</p>
                </div>
              `}
        </div>

        <div class="footer">
          <p>
            By signing in, you agree to the
            <a href="/terms">Terms of Service</a> and
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
      </div>
    `}getProviders(){return[{id:"google",name:"Google",icon:"google",available:this.googleEnabled},{id:"github",name:"GitHub",icon:"github",available:this.githubEnabled}]}renderProvider(t){if(!t.available)return c`
        <button class="provider-btn ${t.id}" disabled>
          ${this.renderProviderIcon(t.id)}
          <span>Continue with ${t.name}</span>
        </button>
      `;const e=`/auth/login/${t.id}`+(this.returnTo?`?returnTo=${encodeURIComponent(this.returnTo)}`:"");return c`
      <a
        href="${e}"
        class="provider-btn ${t.id}"
        @click=${()=>this.handleProviderClick(t)}
      >
        ${this.renderProviderIcon(t.id)}
        <span>Continue with ${t.name}</span>
      </a>
    `}renderProviderIcon(t){return t==="google"?c`
        <svg class="provider-icon" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      `:t==="github"?c`
        <svg class="provider-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
          />
        </svg>
      `:c`<sl-icon name="box-arrow-in-right"></sl-icon>`}handleProviderClick(t){this._loading=!0}renderLoading(){return c`
      <div class="loading-overlay">
        <div class="loading-content">
          <sl-spinner></sl-spinner>
          <p class="loading-text">Redirecting to sign in...</p>
        </div>
      </div>
    `}};A.styles=f`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: var(--scion-bg, #f8fafc);
      padding: 1rem;
    }

    .login-container {
      width: 100%;
      max-width: 400px;
      background: var(--scion-surface, #ffffff);
      border-radius: 1rem;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -2px rgba(0, 0, 0, 0.1);
      padding: 2.5rem;
    }

    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-text {
      font-size: 2rem;
      font-weight: 700;
      color: var(--scion-primary, #3b82f6);
      letter-spacing: -0.02em;
    }

    .logo-subtitle {
      font-size: 0.875rem;
      color: var(--scion-text-muted, #64748b);
      margin-top: 0.25rem;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      text-align: center;
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      font-size: 0.875rem;
      color: var(--scion-text-muted, #64748b);
      text-align: center;
      margin-bottom: 2rem;
    }

    .error-alert {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .error-alert sl-icon {
      color: #dc2626;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .error-message {
      font-size: 0.875rem;
      color: #991b1b;
    }

    .providers {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .provider-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.875rem 1.25rem;
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: 0.5rem;
      background: var(--scion-surface, #ffffff);
      color: var(--scion-text, #1e293b);
      font-size: 0.9375rem;
      font-weight: 500;
      cursor: pointer;
      transition:
        background 0.15s ease,
        border-color 0.15s ease,
        box-shadow 0.15s ease;
      text-decoration: none;
    }

    .provider-btn:hover {
      background: var(--scion-bg-subtle, #f8fafc);
      border-color: var(--scion-primary, #3b82f6);
    }

    .provider-btn:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--scion-primary-50, #eff6ff);
      border-color: var(--scion-primary, #3b82f6);
    }

    .provider-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .provider-btn:disabled:hover {
      background: var(--scion-surface, #ffffff);
      border-color: var(--scion-border, #e2e8f0);
    }

    .provider-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    /* Provider-specific colors */
    .provider-btn.google:hover {
      border-color: #4285f4;
    }

    .provider-btn.github:hover {
      border-color: #24292f;
    }

    .divider {
      display: flex;
      align-items: center;
      margin: 1.5rem 0;
      color: var(--scion-text-muted, #64748b);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--scion-border, #e2e8f0);
    }

    .divider::before {
      margin-right: 1rem;
    }

    .divider::after {
      margin-left: 1rem;
    }

    .no-providers {
      text-align: center;
      color: var(--scion-text-muted, #64748b);
      font-size: 0.875rem;
      padding: 1rem;
    }

    .footer {
      margin-top: 2rem;
      text-align: center;
      font-size: 0.75rem;
      color: var(--scion-text-muted, #64748b);
    }

    .footer a {
      color: var(--scion-primary, #3b82f6);
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    /* Loading overlay */
    .loading-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.9);
      z-index: 100;
    }

    .loading-content {
      text-align: center;
    }

    .loading-content sl-spinner {
      --indicator-color: var(--scion-primary, #3b82f6);
      --track-color: var(--scion-border, #e2e8f0);
      font-size: 2rem;
    }

    .loading-text {
      margin-top: 1rem;
      color: var(--scion-text-muted, #64748b);
      font-size: 0.875rem;
    }
  `;R([h({type:String})],A.prototype,"error",2);R([h({type:String})],A.prototype,"returnTo",2);R([h({type:Boolean})],A.prototype,"googleEnabled",2);R([h({type:Boolean})],A.prototype,"githubEnabled",2);R([y()],A.prototype,"_loading",2);A=R([v("scion-login-page")],A);async function ke(){console.info("[Scion] Initializing client...");const t=Wt();t&&console.info("[Scion] Initial page data:",t.path),await Promise.all([customElements.whenDefined("scion-app"),customElements.whenDefined("scion-nav"),customElements.whenDefined("scion-header"),customElements.whenDefined("scion-breadcrumb"),customElements.whenDefined("scion-status-badge"),customElements.whenDefined("scion-page-home"),customElements.whenDefined("scion-page-groves"),customElements.whenDefined("scion-page-agents"),customElements.whenDefined("scion-page-404"),customElements.whenDefined("scion-login-page")]),console.info("[Scion] Components defined, setting up router..."),Vt(),console.info("[Scion] Client initialization complete")}function Wt(){const t=document.getElementById("__SCION_DATA__");if(!t)return console.warn("[Scion] No initial data found"),null;try{return JSON.parse(t.textContent||"{}")}catch(e){return console.error("[Scion] Failed to parse initial data:",e),null}}function Vt(){if(!document.querySelector("scion-app")){console.error("[Scion] App shell not found");return}document.addEventListener("click",e=>{const i=e.target.closest("a");if(!i)return;const s=i.getAttribute("href");s&&(s.startsWith("http")||s.startsWith("//")||s.startsWith("javascript:")||s.startsWith("#")||s.startsWith("/api/")||s.startsWith("/auth/")||s.startsWith("/events")||(e.preventDefault(),Ft(s)))}),window.addEventListener("popstate",()=>{Be(window.location.pathname)})}function Ft(t){t!==window.location.pathname&&(window.history.pushState({},"",t),Be(t),window.location.href=t)}function Be(t){const e=document.querySelector("scion-app");e&&(e.currentPath=t)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{ke()}):ke();
//# sourceMappingURL=main.js.map
