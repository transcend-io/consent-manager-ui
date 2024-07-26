self.transcend = Object.assign({
  "country": "DE",
  "countryRegion": "HH"
}, self.transcend);
self.airgap = Object.assign({
  readyQueue: [],
  ready(c) {
      this.readyQueue.push(c)
  },
  purposes: {
      "useDefault": false,
      "types": {
          "Advertising": {
              "name": "Advertising",
              "description": "Helps us and others serve ads relevant to you.",
              "defaultConsent": true,
              "showInConsentManager": true,
              "configurable": true,
              "essential": false,
              "trackingType": "Advertising",
              // "optOutSignals": ["DNT"]
              "optOutSignals": []
          },
          "Analytics": {
              "name": "Analytics",
              "description": "Help us learn how our site is used and how it performs.",
              "defaultConsent": true,
              "showInConsentManager": true,
              "configurable": true,
              "essential": false,
              "trackingType": "Analytics",
              // "optOutSignals": ["DNT"]
              "optOutSignals": []
          },
          "CustomPurpose": {
              "name": "CustomPurpose",
              "description": "Spacey",
              "defaultConsent": true,
              "showInConsentManager": true,
              "configurable": true,
              "essential": false,
              "trackingType": "CustomPurpose",
              "optOutSignals": []
          },
          "Functional": {
              "name": "Functional",
              "description": "Personalization, autofilled forms, etc.",
              "defaultConsent": true,
              "showInConsentManager": true,
              "configurable": true,
              "essential": false,
              "trackingType": "Functional",
              // "optOutSignals": ["DNT"]
              "optOutSignals": []
          },
          "SaleOfInfo": {
              "name": "SaleOfInfo",
              "description": "Sale of personal information.",
              "defaultConsent": true,
              "showInConsentManager": true,
              "configurable": true,
              "essential": false,
              "trackingType": "SaleOfInfo",
              // "optOutSignals": ["DNT", "GPC"]
              "optOutSignals": []
          },
          "UniquePurpose": {
              "name": "UniquePurpose",
              "description": "Unique Purpose",
              "defaultConsent": true,
              "showInConsentManager": true,
              "configurable": true,
              "essential": false,
              "trackingType": "UniquePurpose",
              "optOutSignals": []
          }
      }
  },
  regimePurposeScopes: [[["GDPR"], ["Advertising", "Analytics", "CustomPurpose", "Functional", "SaleOfInfo", "UniquePurpose"]], [["CDPA"], ["SaleOfInfo"]], [["CPA"], ["SaleOfInfo"]], [["CPRA"], ["SaleOfInfo"]], [["LGPD"], ["Advertising", "Analytics", "Functional", "SaleOfInfo"]], [["NEVADA_SB220"], ["SaleOfInfo"]], [["nFADP"], ["Advertising", "Analytics", "Functional", "SaleOfInfo"]]],
  macroregions: [["EU", "BE GR LT PT BG ES LU RO CZ FR RE GP MQ GF YT BL MF PM WF PF NC HU SI DK FO GL HR MT SK DE IT NL AW CW SX FI AX EE CY AT SE IE LV PL AI BM IO VG KY FK GI MS PN SH TC GG JE IM"]],
  regionRegimesMap: [[[["EU"], ["GB"], ["NO"], ["IS"], ["LI"]], ["GDPR"], "in", ["bg-BG", "hr-HR", "cs-CZ", "da-DK", "nl-BE", "nl-NL", "en-IE", "et-EE", "fi-FI", "fr-BE", "fr-FR", "fr-LU", "de-AT", "de-DE", "de-LI", "de-LU", "el-GR", "hu-HU", "is-IS", "ga-IE", "it-IT", "lv-LV", "lt-LT", "mt-MT", "no-NO", "nb-NO", "nn-NO", "pl-PL", "pt-PT", "ro-RO", "sk-SK", "sl-SI", "es-ES", "sv-FI", "sv-FI", "sv-SE"], [], null, null, {
      "consentExpiry": "518400",
      "onConsentExpiry": "ResetOptIns"
  }], [[["US", "VA"]], ["CDPA"], "in", [], [], null, null, {}], [[["US", "CO"]], ["CPA"], "in", [], [], null, null, {}], [[["US", "CA"]], ["CPRA"], "in", [], [], null, null, {}], [[["BR"]], ["LGPD"], "in", ["pt-BR"], [], null, null, {}], [[["US", "NV"]], ["NEVADA_SB220"], "in", [], [], null, null, {}], [[["CH"]], ["nFADP"], "in", ["de-CH", "fr-CH", "it-CH", "en-CH", "pt-CH", "gsw-CH"], [], null, null, {}]],
  regimePurposeOptOuts: [[["GDPR"], ["Advertising", "Analytics", "Functional", "SaleOfInfo"]], [["LGPD"], ["Advertising", "Analytics", "Functional", "SaleOfInfo"]], [["nFADP"], ["Advertising", "Analytics", "Functional", "SaleOfInfo"]]],
  cookies: [],
  id: "59d11191-f022-48dc-a24b-39c387973190"
}, self.airgap);
self.airgap.loadOptions = Object.assign({
  "consentPrecedence": "user",
  "unknownRequestPolicy": "allow",
  "prompt": "0",
  "regimePrecedence": "GDPR;CDPA;CPA;CPRA;LGPD;NEVADA_SB220;nFADP;Unknown",
}, self.airgap.loadOptions);
(()=>{
"use strict";var ft=Object.defineProperty,dt=Object.defineProperties;var mt=Object.getOwnPropertyDescriptors;var ye=Object.getOwnPropertySymbols;var Pt=Object.prototype.hasOwnProperty,Tt=Object.prototype.propertyIsEnumerable;var _e=(e,n,t)=>n in e?ft(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,g=(e,n)=>{for(var t in n||(n={}))Pt.call(n,t)&&_e(e,t,n[t]);if(ye)for(var t of ye(n))Tt.call(n,t)&&_e(e,t,n[t]);return e},Ie=(e,n)=>dt(e,mt(n));var Ct="Unknown",De=[["GDPR","LGPD","nFADP"],["Advertising","Analytics","Functional","SaleOfInfo"]],Q=[De,[["CPRA","CDPA","CPA","NEVADA_SB220","US_DNSS"],["SaleOfInfo"]],[[Ct],[]]],X=[De],Wt=Object.fromEntries(X.map(([e,n])=>e.map(t=>[t,n])).flat()),Ht=Object.fromEntries(Q.map(([e,n])=>e.map(t=>[t,n])).flat());var ke=[["EU","AI AT AW AX BE BG BL BM CW CY CZ DE DK EE ES FI FK FO FR GB GF GG GI GL GP HR HU IE IM IO IT JE KY LT LU LV MF MQ MS MT NC NL PF PL PM PN PT RE RO SE SH SI SK SX TC UK VG WF YT"]],Ne=[[[["US","CA"]],["CPRA"]],[[["EU"],["GB"],["NO"],["IS"],["LI"]],["GDPR"],"in",!0,["Europe"]],[[["BR"]],["LGPD"],"in",!1,"Araguaina Bahia Belem Boa_Vista Campo_Grande Cuiaba Eirunepe Fortaleza Maceio Manaus Noronha Porto_Velho Recife Rio_Branco Santarem Sao_Paulo".split(" ")]];var St="FacebookLDU",qt=`${St}:strict`;var Z=(e,n=!0)=>!0;var ee=window.airgap,xe=ee==null?void 0:ee.loadOptions,Me=document.currentScript?document.currentScript.dataset:{},m=xe?g(g({},xe),Me):Me,Ot=/\.+$/g,Ue=e=>e.replace(Ot,""),Et=/(?:\s*(?:,\s*)+|\s+)/,be=e=>e.split(Et),te=(e,n,t)=>{let o={},s=!1;return e.forEach(c=>{let r=t[c];n[c]!==r&&(s||(s=!0),o[c]=r)}),s?o:null},I=!1,ne=!1,ve=!1;var{requireAuth:tn,unknownRequestPolicy:oe,unknownCookiePolicy:se}=m,{partition:D}=m,nn=Symbol("");var F=!oe||oe==="allow",re=F||oe==="require-full-consent",ae=!se||se==="allow",we=ae||se==="require-full-consent";var ie=e=>`airgap.${e}(): Authorization proof is untrusted`,ce="Essential",k="Unknown",pe=k,ue="request",le="cookie";var O=console;var Le=!1,Rt=()=>{Le=!0},K=new Set,B=()=>(Le||((navigator.doNotTrack==="1"||navigator.doNotTrack==="on")&&K.add("DNT"),navigator.globalPrivacyControl&&K.add("GPC"),Rt()),K);var{regime:fe,defaultRegime:Ge,regimeDetection:ge}=m,At="ip-only",yt="heuristics-only",j,_t=()=>{if(typeof j<"u")return j;let{country:e,countryRegion:n}=Be||{};return e||n?j=[e,n]:j=null},A,he=null,de=(e,n)=>{var t,o;return fe&&!n||e!==pe&&Y&&!((o=(t=z.find(([s])=>s.some(c=>e===c)))==null?void 0:t[1])!=null&&o.length)?!1:(A.add(e),!0)},It=(e,n)=>e===n||je.some(([t,o])=>t===e&&o.includes(n)||t===n&&o.includes(e)),Dt=e=>e.split(/\s*;\s*/).map(t=>de(t,!0)).some(t=>t);var Fe,Ke=()=>{if(!Fe){Fe=!0;let e=N();for(let{1:n,6:t,7:o}of Pe.values())if(n.values().next().done||n.some(s=>e.has(s))){if(o)for(let[s,c]of Object.entries(o))m[s]=c;!he&&typeof t=="string"&&(he=t)}}},N=()=>{if(A)return A;if(A=new Set,fe)Dt(fe);else if(ge!=="off"){let e,n=()=>(e||(e=new Intl.DateTimeFormat().resolvedOptions().timeZone),e),t=r=>navigator.languages.some(l=>r.some(u=>l.toUpperCase().includes(u.toUpperCase()))),o=r=>navigator.languages.some(l=>l.split("-").slice(1).some(u=>r.includes(u.toUpperCase()))),[s,c]=_t()||[];for(let[r,l,u,P,T]of Pe.values()){let d=ge!==yt&&s&&r.some(([f,v])=>It(s,f)&&(!v||c===v))||ge!==At&&((Array.isArray(P)?t(P):P&&r.some(([f])=>f&&o([f])))||Array.isArray(T)&&T.some(f=>n().includes(f)));if(u!=="out"?d:!d)for(let f of l.values())de(f)}}return A.values().next().done&&(!Ge||!de(Ge))&&A.add(pe),A},me=(e,n=N())=>{let t=new Set;for(let[o,s]of e.values())for(let c of n.values())if(o.includes(c))for(let r of s.values())t.add(r);return t};var Ye=!0,{consentPrecedence:kt}=m,He=kt==="signals",Te=`tcm${D?"MP":""}Consent`,Je=e=>{let n=Reflect.ownKeys(e);for(let t of n.values()){let o=e[t];o&&typeof o=="object"&&Je(o)}return Object.freeze(e)},Nt=e=>(Object.freeze(e.prototype),Object.freeze(e)),xt=()=>{let e=localStorage[Te],n=e&&JSON.parse(e)||{};return D?n[D]||{}:n},Mt=e=>{let n;if(D){let t=localStorage[Te],o=t&&JSON.parse(t)||{};o[D]=e,n=JSON.stringify(o)}else n=JSON.stringify(e);localStorage[Te]=n};var x,U=new Map,C,M,R=!1,y=!1,E=!1,G,_;var ze=new Map,Ut=new Map,W={},bt="Auto",Ve=new Set,J=new Set,qe=[],vt=[k],V,$e=()=>x.types,wt=async(e,n=y,t=E,o=void 0,s=!0,c=new Date().toISOString(),r=R,l=void 0)=>{let u=te(Reflect.ownKeys(e),C,e),P=r||y!==n||E!==t||!!u;Object.keys(e).forEach(d=>{var f;(f=U.get(d))!=null&&f.configurable&&(C[d]=e[d])}),E=t,y=n,M=c,R=P;let T=Xe(o,l);Mt(Ze({purposes:C,timestamp:c,updated:P,confirmed:n,prompted:t,metadata:T.metadata,metadataTimestamp:T.metadataTimestamp}))},q=(e,n,t)=>{var l,u,P,T;if(!Z(e))return ne&&O.error(ie("setConsent")),!1;let s=(l=t==null?void 0:t.confirmed)!=null?l:!0,c=!!((u=t==null?void 0:t.prompted)!=null?u:E),r=wt(n,s,c,t==null?void 0:t.metadata,!0,(P=t==null?void 0:t.timestamp)!=null?P:new Date().toISOString(),R,(T=t==null?void 0:t.metadataTimestamp)!=null?T:new Date().toISOString()).then(()=>(I&&O.log("Consent set to",C),!0));return t!=null&&t.waitForSync?r:!0},Lt=async(e,n=!0,t=new Date().toISOString())=>{let{metadata:o,metadataTimestamp:s}=Xe(e,t);G=o,_=s,I&&O.log("Metadata set",G)},Qe=async(e,n,t=!0,o=new Date().toISOString())=>{if(Z(e))await Lt(n,t,o);else return ne&&O.error(ie("setConsentMetadata")),!1;return!0},Gt=e=>e.every(n=>Oe(n)),Xe=(e,n)=>{let t=e===!1,o=e!==null&&typeof e<"u"&&(!_||n&&Date.parse(n)>Date.parse(_));return{metadata:t?void 0:o?e:G,metadataTimestamp:t?void 0:o?n:_}},Ze=e=>{if(!e)return Se();let{purposes:n,timestamp:t,prompted:o,confirmed:s,updated:c,metadata:r,metadataTimestamp:l}=e;return y=!!(s||Ye&&!Ee&&Gt(Array.from(b))),Ye&&(Ye=!1),E=!!o,R=!!c,G=r,n&&Object.keys(n).forEach(u=>{b.has(u)&&(C[u]=n[u])}),t&&(M=t),l&&(_=l),{purposes:C,timestamp:M,confirmed:y,prompted:E,updated:R,metadata:r,metadataTimestamp:_}};var L=(e,n)=>{if(Ee)return!0;for(let t of e.values()){let o=U.get(t);if(o&&o.essential)return!0;if(t===k||!o)return n===ue?F||re&&L(J,n):n===le?ae||we&&L(J,n):L(e,ue)&&L(e,le);if(b.has(t)&&!C[t])return!1}return!0};var Se=()=>({purposes:g({},C),confirmed:y,prompted:E,timestamp:M!=null?M:M=new Date().toISOString(),updated:R,metadata:G,metadataTimestamp:_}),et=()=>L(J),tt=()=>qe.every(e=>!C[e]),nt=(e,n=!1)=>{var o;let t={};for(let s of Object.keys(W).values())(!n||(o=U.get(s))!=null&&o.showInConsentManager)&&(t[s]=e);return t},ot=e=>q(e,nt(!0,!0)),st=e=>q(e,nt(!1,!0)),ht=e=>typeof e>"u"||Array.isArray(e)&&e.values().next().done||e instanceof Set&&e.values().next().done?new Set(vt):e instanceof Set?e:new Set(e),Ft=(e,n)=>{if(n){let t=Object.keys(n);for(let o of t.values())e.set(Ue(o),ht(n[o]))}},h=class extends Map{constructor(n){super(),Ft(this,n)}};Nt(h);var Kt=new h,Bt=(e,n,t=!1)=>{for(let[o,s]of n.entries())e.set(o,s);I&&O.log("Data flow purpose map loaded",n)};var Oe=e=>{var t;let n=(t=U.get(e))==null?void 0:t.optOutSignals;return!!n&&n.some(o=>B().has(o))},jt=(e,n)=>{var t;if((!n||He)&&Oe(e))return!0;for(let o of N().values()){let s=(t=at.find(([c])=>c.includes(o)))==null?void 0:t[1];if(s&&s.includes(e))return!0}return!1},We=(e,n,t)=>{if(typeof n=="boolean")return n;let o=be(`${n}`);for(let s of o.values())switch(s){case"off":return!1;case bt:if(jt(e,t))return!1;break}return n},rt=()=>{var f,v,Re,Ae;I&&O.log(`Network events with unknown purposes are ${F?"always allowed":`${re?"":"not "}consentable`}`);let e={defaultConsent:"Auto",configurable:!0,essential:!1,optOutSignals:["DNT"]},n={[ce]:{name:ce,description:"",defaultConsent:!0,configurable:!1,essential:!0},[k]:{name:k,description:"",defaultConsent:!1,configurable:!1,essential:!1}},t=(f=H)==null?void 0:f.types;t&&Object.keys(t).forEach(a=>{t[a]=g(g({},e),t[a])});let o=(Re=(v=H)==null?void 0:v.useDefault)!=null?Re:!0,s=g(g({},o&&{Functional:g({name:"Functionality",description:"Personalization, autofilled forms, etc."},e),Analytics:g({name:"Analytics + Performance",description:"Help us learn how our site is used and how it performs."},e),Advertising:g({name:"Targeting / Advertising",description:"Helps us and others serve ads relevant to you."},e),SaleOfInfo:Ie(g({name:"Sale of personal information",description:""},e),{optOutSignals:["GPC","DNT"]})}),t);x={useDefault:o,types:g(g({},s),n)};let c=(a,i)=>i==="boolean"||i==="string",r=(Ae=H)==null?void 0:Ae.defaultConsent;if(typeof r<"u"){let a=c(r,typeof r)?(()=>{let i={};return Object.keys(s).forEach(S=>{i[S]=r}),i})():r;Object.keys(a).forEach(i=>{var w;let S=(w=x.types)==null?void 0:w[i];S?S.defaultConsent=a[i]:ve&&O.warn(`Default consent specified for unrecognized tracking purpose: ${JSON.stringify(i)}`)})}Ce&&(I&&O.log("Using embedded purpose map"),Bt(Kt,new h(Ce),!0)),Object.keys(x.types).forEach(a=>{let i=x.types[a],S=i.configurable&&!i.essential&&(!Y||b.has(a));Ve.add(a),U.set(a,i),S&&(qe.push(a),J.add(a)),i.configurable&&(ze.set(a,"defaultConsent"in i?We(a,i.defaultConsent):!1),Ut.set(a,"defaultConsent"in i?We(a,i.defaultConsent,!0):!1))}),Je(x);let l=a=>{var w;if(!He)return;let{purposes:i}=a,S;for(let[$,gt]of Object.entries(i))gt&&((w=U.get($))!=null&&w.configurable)&&Oe($)&&(S=!0,i[$]=!1);S&&(a.timestamp=new Date().toISOString(),a.confirmed=a.updated=!0)};for(let[a,i]of ze.entries())W[a]=i;let u=xt(),{confirmed:P,purposes:T}=u;V={purposes:W,confirmed:y,updated:R=R||!!(T&&te(Array.from(Ve),T,W)),prompted:E};let d=P?u:V;d!==V&&l(V),l(d),C=d==null?void 0:d.purposes,Ze(d)};var{airgap:p,transcend:Be}=window,it=p==null?void 0:p.macroregions,je=(Array.isArray(it)?it:ke).map(([e,n])=>[e,n.split(" ")]),ct=p==null?void 0:p.regionRegimesMap,Pe=Array.isArray(ct)?ct:Ne,pt=p==null?void 0:p.regimePurposeOptOuts,at=Array.isArray(pt)?pt:X,kn=m.regimePrecedence?m.regimePrecedence.split(";"):[],ut=p==null?void 0:p.regimePurposeScopes,Y=m.regimePurposeScopes!=="off",z=Array.isArray(ut)?ut:Q,b=me(z),Ee=b.values().next().done,H=p==null?void 0:p.purposes,Ce=p==null?void 0:p.purposeMap,lt=()=>{zt()},Yt=!1;var zt=()=>{Ke(),rt();let e={};e.getRegimePurposes=n=>me(z,n),e.getConsent=Se,e.setConsent=q,e.setConsentMetadata=Qe,e.optIn=ot,e.optOut=st,e.isOptedIn=et,e.isOptedOut=tt,e.getPurposeTypes=$e,e.getRegimes=()=>new Set(N()),e.getPrivacySignals=()=>new Set(B()),Object.defineProperty(window,"airgap",{value:e,configurable:!1,enumerable:!1}),Yt=!0};lt();
})()
