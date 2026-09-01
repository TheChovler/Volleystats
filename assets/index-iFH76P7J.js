(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const W=1,M=[{id:"S",label:"Setter"},{id:"OH",label:"Outside"},{id:"MB",label:"Middle"},{id:"OPP",label:"Opposite"},{id:"L",label:"Libero"},{id:"DS",label:"DS"}],f=[1,2,3,4,5,6],K=[4,3,2,5,6,1],ct={4:"outside",3:"middle",2:"opposite",p:"pipe",d:"dump"},P=[4,3,2],q=[5,6,1];function Y(){return crypto.randomUUID()}function S(t){return{id:t.id,name:t.name,number:t.number,role:t.role}}function lt(t){return{1:t[2],2:t[3],3:t[4],4:t[5],5:t[6],6:t[1]}}function b(t){const e={lineup:{...t.startingLineup},setterId:t.setterId,scoreUs:0,scoreThem:0,weServe:t.weServeFirst};for(const n of t.events)dt(e,n);return e}function H(t,e){let n=!1;return e==="us"?(t.scoreUs+=1,t.weServe||(t.lineup=lt(t.lineup),t.weServe=!0,n=!0)):(t.scoreThem+=1,t.weServe&&(t.weServe=!1)),n}function dt(t,e){if(e.kind==="serve"){e.result==="ace"&&H(t,"us"),e.result==="out"&&H(t,"them");return}if(e.kind==="point"){H(t,e.winner);return}e.kind==="sub"&&(t.lineup={...t.lineup,[e.position]:e.in.id},t.setterId===e.out.id&&(t.setterId=e.in.id))}function L(t,e){const n=F(e,t.setterId),r={};for(const s of f)r[s]=S(F(e,t.lineup[s]));return{weServe:t.weServe,score:{us:t.scoreUs,them:t.scoreThem},setter:S(n),lineup:r}}function R(t){return t===2||t===3||t===4?"front":"back"}function B(t,e){for(const n of f)if(t[n]===e)return n;return null}function I(t,e,n,r){for(const s of e){const a=r.get(t[s]);if(a?.role===n)return a}}function ut(t,e){const n=e?k(e):!1;return t==="4"?n?"No front-row opposite in this rotation":"No front-row outside (OH) in this rotation":t==="3"?"No front-row middle in this rotation":t==="2"?n?"No front-row outside (OH) in this rotation":"No opposite on court":t==="p"?"No back-row outside for pipe":"Setter is not on court"}function k(t){return!t.weServe&&B(t.lineup,t.setterId)===1}function pt(t,e){return t==="p"?"pipe":t==="d"?"dump":e.role==="OH"?"outside":e.role==="MB"?"middle":e.role==="OPP"?"opposite":ct[t]}function Z(t,e,n){if(e==="d"){const a=n.get(t.setterId),i=a?B(t.lineup,a.id):null;return!a||!i?null:{hitter:a,court:R(i)}}if(e==="3"){const a=I(t.lineup,P,"MB",n);return a?{hitter:a,court:"front"}:null}const r=k(t);if(e==="4"){const a=r?"OPP":"OH",i=I(t.lineup,P,a,n);return i?{hitter:i,court:"front"}:null}if(e==="2"){if(r){const l=I(t.lineup,P,"OH",n);return l?{hitter:l,court:"front"}:null}const a=I(t.lineup,f,"OPP",n),i=a?B(t.lineup,a.id):null;return!a||!i?null:{hitter:a,court:R(i)}}const s=I(t.lineup,q,"OH",n);return s?{hitter:s,court:"back"}:null}function C(t,e,n){const r=[];for(const s of e){const a=n.get(t[s]);a&&r.push({rotationPos:s,player:a})}return r}function g(t,e){for(const n of e){const r=t.findIndex(s=>s.player.role===n);if(r>=0)return t.splice(r,1)[0]}return t.shift()}function mt(t,e){const n=C(t.lineup,P,e),r=C(t.lineup,q,e),s=(i,l)=>{if(l)return{hittingPos:i,rotationPos:l.rotationPos,player:l.player,row:R(l.rotationPos)}},a=k(t);return{4:s(4,g(n,a?["OPP"]:["OH"])),3:s(3,g(n,["MB"])),2:s(2,g(n,a?["OH"]:["OPP","S"])),6:s(6,g(r,["OH"])),1:s(1,g(r,["OPP","S"])),5:s(5,g(r,["L","MB","DS"]))}}function ft(t){return new Set(f.map(e=>t[e]))}function y(t){const e=t.sets[t.sets.length-1];if(!e)throw new Error("Match has no sets");return e}function X(t){return f.every(e=>!!t[e])}function F(t,e){const n=t.get(e);if(!n)throw new Error(`Unknown player ${e}`);return n}function bt(t){return new Map(t.map(e=>[e.id,e]))}function v(t){return`#${t.number} ${t.name}`}function A(t){return M.find(e=>e.id===t)?.label??t}const G="volleystats.roster",Q="volleystats.matches",j="volleystats.activeMatchId";function ht(){const t=localStorage.getItem(G);if(!t)return{teamName:"",players:[]};try{const e=JSON.parse(t);return!e||!Array.isArray(e.players)?{teamName:"",players:[]}:{teamName:e.teamName??"",players:e.players}}catch{return{teamName:"",players:[]}}}function vt(t){localStorage.setItem(G,JSON.stringify(t))}function $t(){const t=localStorage.getItem(Q);if(!t)return[];try{const e=JSON.parse(t);return Array.isArray(e)?e:[]}catch{return[]}}function yt(t){localStorage.setItem(Q,JSON.stringify(t))}function wt(){return localStorage.getItem(j)}function gt(t){t?localStorage.setItem(j,t):localStorage.removeItem(j)}function z(t,e){return{version:W,exportedAt:new Date().toISOString(),roster:t,matches:e}}function St(t){const e=JSON.parse(t);if(!e||e.version!==W)throw new Error("Unsupported or missing Volleystats file version");if(!e.roster||!Array.isArray(e.matches))throw new Error("Invalid Volleystats file");return e}const o={screen:"home",roster:ht(),matches:$t(),activeMatchId:wt(),setup:tt(),modal:null,reviewId:null,toast:""};let J=0,U;function tt(){return{opponent:"",lineup:{},setterId:"",weServeFirst:!0}}function p(){vt(o.roster),yt(o.matches),gt(o.activeMatchId)}function m(t){o.toast=t,window.clearTimeout(J),J=window.setTimeout(()=>{o.toast="",d()},1800),d()}function c(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function w(){return bt(o.roster.players)}function h(){return o.activeMatchId?o.matches.find(t=>t.id===o.activeMatchId)??null:null}function $(t){o.screen=t,o.modal=null,d()}function Ot(t){U=t,t.addEventListener("click",Dt),t.addEventListener("change",Ut),t.addEventListener("input",Ct),t.addEventListener("submit",Ft),document.addEventListener("keydown",Jt),d()}function d(){const t=o.toast?`<div class="toast" role="status">${c(o.toast)}</div>`:"";U.innerHTML=t+It()+Mt()}function It(){switch(o.screen){case"home":return kt();case"roster":return Et();case"setup":return Pt();case"live":return xt();case"matches":return Tt();case"review":return Lt()}}function Nt(){return window.matchMedia("(display-mode: standalone)").matches||"standalone"in navigator&&!!navigator.standalone}function kt(){const t=o.roster.teamName||"No team name yet",e=o.roster.players.length,n=h(),r=!Nt()&&location.protocol==="https:"?'<p class="hint"><strong>iPhone:</strong> tap Share → Add to Home Screen. Open that icon on court — no laptop, no signal.</p>':'<p class="hint">Data stays in this browser until you export. On court, use the Home Screen icon after installing from the HTTPS site.</p>';return`
    <div class="topbar"><h1>Volleystats</h1></div>
    <div class="card stack">
      <div>
        <div class="muted">Team</div>
        <strong>${c(t)}</strong>
        <span class="muted"> · ${e} player${e===1?"":"s"}</span>
      </div>
      <div class="home-grid">
        ${n?`<button class="btn btn-primary" data-act="resume">Resume match vs ${c(n.opponent||"opponent")}</button>`:""}
        <button class="btn btn-primary" data-act="new-match" ${e<6?"disabled":""}>New match</button>
        <button class="btn" data-act="go-roster">Roster</button>
        <button class="btn" data-act="go-matches">Past matches</button>
        <button class="btn" data-act="export-all">Export JSON</button>
        <button class="btn" data-act="import">Import JSON</button>
      </div>
      ${r}
    </div>
    <input type="file" accept="application/json" data-act="import-file" hidden />
  `}function Et(){const t=o.roster.players.slice().sort((e,n)=>e.number-n.number||e.name.localeCompare(n.name)).map(e=>`
        <tr>
          <td class="num">#${e.number}</td>
          <td>${c(e.name)}</td>
          <td>
            <select data-act="player-role" data-id="${e.id}" aria-label="Role for ${c(e.name)}">
              ${M.map(n=>`<option value="${n.id}" ${n.id===e.role?"selected":""}>${c(n.label)}</option>`).join("")}
            </select>
          </td>
          <td><button class="btn" data-act="del-player" data-id="${e.id}">Remove</button></td>
        </tr>`).join("");return`
    <div class="topbar">
      <h2>Roster</h2>
      <button class="btn" data-act="go-home">Home</button>
    </div>
    <div class="card stack">
      <label>Team name
        <input data-act="team-name" value="${c(o.roster.teamName)}" placeholder="e.g. Førde VBK" />
      </label>
      <form class="player-form" data-act="add-player">
        <input name="number" type="number" min="0" max="99" placeholder="#" required />
        <input name="name" placeholder="Name" required />
        <select name="role" aria-label="Preferred role">
          ${M.map(e=>`<option value="${e.id}">${c(e.label)}</option>`).join("")}
        </select>
        <button class="btn btn-primary" type="submit">Add</button>
      </form>
      <p class="hint">Preferred roles decide who gets the set after the switch: front-row OH → 4, front-row middle → 3, opposite → 2 (front or back), back-row OH → pipe.</p>
      <table>
        <thead><tr><th>#</th><th>Name</th><th>Role</th><th></th></tr></thead>
        <tbody>${t||'<tr><td colspan="4" class="muted">Add your ~16 players here, then pick a starting 6 in match setup.</td></tr>'}</tbody>
      </table>
    </div>
  `}function Pt(){const t=w(),e=X(o.setup.lineup),n=new Set(f.map(s=>o.setup.lineup[s]).filter(Boolean)),r=f.map(s=>o.setup.lineup[s]).filter(s=>!!s).map(s=>t.get(s)).filter(s=>!!s).map(s=>`<option value="${s.id}" ${s.id===o.setup.setterId?"selected":""}>${c(v(s))}</option>`).join("");return`
    <div class="topbar">
      <h2>Starting lineup</h2>
      <button class="btn" data-act="go-home">Home</button>
    </div>
    <div class="card stack">
      <label>Opponent
        <input data-act="opponent" value="${c(o.setup.opponent)}" placeholder="Optional" />
      </label>
      <p class="hint">Tap a court slot, then pick a player. Same player in two slots moves them.</p>
      ${At(o.setup.lineup,t,{setterId:o.setup.setterId,server:o.setup.weServeFirst,picking:o.modal?.type==="pick"?o.modal.position:null})}
      <label>Setter
        <select data-act="setter" ${n.size?"":"disabled"}>
          <option value="">Select setter</option>
          ${r}
        </select>
      </label>
      <label class="row">
        <input type="checkbox" data-act="we-serve" ${o.setup.weServeFirst?"checked":""} />
        We serve first
      </label>
      <button class="btn btn-primary btn-wide" data-act="start-match" ${e&&o.setup.setterId?"":"disabled"}>Start set 1</button>
    </div>
  `}function xt(){const t=h();if(!t)return'<div class="card">No active match. <button class="btn" data-act="go-home">Home</button></div>';const e=y(t),n=b(e),r=w(),s=t.sets.filter(l=>l.completed).map(l=>{const u=b(l);return`${u.scoreUs}–${u.scoreThem}`}).join(", "),a=[...e.events].reverse().slice(0,10),i=!n.weServe||e.completed;return`
    <div class="topbar">
      <h2>${c(o.roster.teamName||"Us")} vs ${c(t.opponent||"Opponent")}</h2>
      <div class="row">
        <button class="btn" data-act="undo" ${e.events.length&&!e.completed?"":"disabled"}>Undo <kbd>U</kbd></button>
        <button class="btn" data-act="go-home">Home</button>
      </div>
    </div>
    <div class="scoreboard card">
      <div>
        <div class="muted">Us</div>
        <div class="score us">${n.scoreUs}</div>
      </div>
      <div>
        <div class="muted">Set ${e.setNumber}${e.completed?" (done)":""}</div>
        <div class="serve-pill ${n.weServe?"we":"they"}">${n.weServe?"WE SERVE":"RECEIVE"}</div>
        ${k(n)?'<div class="hint">Setter in 1: opposite hits 4, outside hits 2</div>':""}
        ${s?`<div class="hint">Sets: ${c(s)}</div>`:""}
      </div>
      <div>
        <div class="muted">Them</div>
        <div class="score them">${n.scoreThem}</div>
      </div>
    </div>
    ${Ht(n,r,!e.completed)}
    <div class="pad">
      <div class="pad-row">
        ${N(n,r,"4")}${N(n,r,"3")}${N(n,r,"2")}
      </div>
      <div class="pad-row pad-row-2">
        ${N(n,r,"p")}${N(n,r,"d")}
      </div>
      <div class="pad-row">
        <button class="btn" data-act="serve" data-result="in" ${i?"disabled":""}><kbd>I</kbd> In</button>
        <button class="btn" data-act="serve" data-result="out" ${i?"disabled":""}><kbd>O</kbd> Out</button>
        <button class="btn" data-act="serve" data-result="ace" ${i?"disabled":""}><kbd>A</kbd> Ace</button>
      </div>
      <div class="pad-row pad-row-2">
        <button class="btn btn-primary" data-act="point" data-winner="us" ${e.completed?"disabled":""}><kbd>←</kbd> We score</button>
        <button class="btn" data-act="point" data-winner="them" ${e.completed?"disabled":""}>They score <kbd>→</kbd></button>
      </div>
    </div>
    <div class="card" style="margin-top:12px">
      <div class="row" style="justify-content:space-between">
        <strong>Last actions</strong>
        <span class="hint">4/3/2 are hitting roles after the switch · 2 is opposite front or back · tap a player to sub</span>
      </div>
      <ul class="log">
        ${a.map(l=>`<li><span>${c(et(l))}</span><span class="muted">${c(nt(l.at))}</span></li>`).join("")||'<li class="muted">Waiting for first action</li>'}
      </ul>
    </div>
    <div class="row" style="margin-top:12px">
      ${e.completed?'<button class="btn btn-primary" data-act="next-set">Next set</button>':'<button class="btn" data-act="end-set">End set</button>'}
      <button class="btn" data-act="export-match">Export match</button>
      <button class="btn btn-danger" data-act="end-match">End match</button>
    </div>
  `}function N(t,e,n){const r=h(),s=r?y(r).completed:!0,a=Z(t,n,e),l=a&&(n==="4"||n==="2")?A(a.hitter.role):{4:"Outside",3:"Middle",2:"Opposite",p:"Pipe",d:"Dump"}[n],u=a?`${v(a.hitter)}${n==="2"||n==="d"?` · ${a.court}`:""}`:"—",E=n.toUpperCase();return`<button class="btn" data-act="set" data-zone="${n}" ${s?"disabled":""}><kbd>${E}</kbd> ${l}<span class="pad-who">${c(u)}</span></button>`}function Tt(){return`
    <div class="topbar">
      <h2>Past matches</h2>
      <button class="btn" data-act="go-home">Home</button>
    </div>
    <div class="card">
      <table>
        <thead><tr><th>When</th><th>Opponent</th><th>Sets</th><th></th></tr></thead>
        <tbody>${[...o.matches].reverse().map(e=>{const n=e.sets.map(s=>{const a=b(s);return`${a.scoreUs}–${a.scoreThem}`}).join(", "),r=new Date(e.createdAt).toLocaleString();return`
        <tr>
          <td>${c(r)}</td>
          <td>${c(e.opponent||"—")}</td>
          <td class="num">${c(n||"—")}</td>
          <td class="row">
            <button class="btn" data-act="review" data-id="${e.id}">View</button>
            <button class="btn" data-act="export-one" data-id="${e.id}">JSON</button>
            <button class="btn btn-danger" data-act="del-match" data-id="${e.id}">Delete</button>
          </td>
        </tr>`}).join("")||'<tr><td colspan="4" class="muted">No matches yet.</td></tr>'}</tbody>
      </table>
    </div>
  `}function Lt(){const t=o.matches.find(n=>n.id===o.reviewId);if(!t)return'<div class="card">Match not found. <button class="btn" data-act="go-matches">Back</button></div>';const e=t.sets.map(n=>{const r=b(n),s=n.events.map(a=>`<li><span>${c(et(a))}</span><span class="muted">${c(nt(a.at))}</span></li>`).join("");return`
        <div class="card" style="margin-bottom:12px">
          <h3>Set ${n.setNumber} · ${r.scoreUs}–${r.scoreThem}</h3>
          <ul class="log">${s||'<li class="muted">No events</li>'}</ul>
        </div>`}).join("");return`
    <div class="topbar">
      <h2>vs ${c(t.opponent||"Opponent")}</h2>
      <div class="row">
        <button class="btn" data-act="export-one" data-id="${t.id}">Export JSON</button>
        <button class="btn" data-act="go-matches">Back</button>
      </div>
    </div>
    ${e}
  `}function At(t,e,n){return`
    <div class="court-wrap">
      <div class="net">NET</div>
      <div class="court">${K.map(s=>{const a=t[s],i=a?e.get(a):void 0,l=["slot",i?"":"empty",n.server&&s===1?"server":"",n.setterId&&a===n.setterId?"setter":"",n.picking===s?"picking":""].filter(Boolean).join(" "),u=n.live?`data-act="open-sub" data-pos="${s}"`:`data-act="open-pick" data-pos="${s}"`;return`
      <button class="${l}" ${u}>
        <span class="pos-num">${s}${s===1&&n.server?" · serve":""}</span>
        <span class="who">${i?c(v(i)):"Tap to pick"}</span>
        ${i?`<span class="slot-role">${c(A(i.role))}</span>`:""}
      </button>`}).join("")}</div>
    </div>
  `}function Ht(t,e,n){const r=mt(t,e),s=K.map(i=>{const l=r[i],u=l?.player,E=!!(l&&t.weServe&&l.rotationPos===1),ot=["slot",u?"":"empty",E?"server":"",u&&u.id===t.setterId?"setter":""].filter(Boolean).join(" "),at=n&&l?`data-act="open-sub" data-pos="${l.rotationPos}"`:"",it=u?`${c(A(u.role))} · ${l?.row}`:"";return`
      <button class="${ot}" ${at} ${n?"":"disabled"}>
        <span class="pos-num">${i}${E?" · serve":""}</span>
        <span class="who">${u?c(v(u)):"—"}</span>
        ${u?`<span class="slot-role">${it}</span>`:""}
      </button>`}).join("");return`
    <div class="court-wrap court-wrap-live">
      <div class="net">${k(t)?"NET · R1 receive (OPP 4 / OH 2)":"NET · hitting positions"}</div>
      <div class="court">${s}</div>
    </div>
  `}function Mt(){const t=o.modal;if(!t)return"";if(t.type==="pick"||t.type==="sub"){const e=Rt(t.type==="sub"?t.position:void 0),n=t.type==="sub"?`Substitute ${Bt(t.position)}`:`Position ${t.position}`,r=e.map(s=>`<button class="btn btn-wide" data-act="${t.type==="sub"?"do-sub":"assign"}" data-id="${s.id}" data-pos="${t.position}">${c(v(s))} <span class="tag">${c(A(s.role))}</span></button>`).join("");return`
      <div class="modal-back" data-act="close-modal">
        <div class="modal" data-stop="1">
          <div class="topbar"><h3>${c(n)}</h3><button class="btn" data-act="close-modal">Close</button></div>
          <div class="pick-list">${r||'<p class="muted">No available players.</p>'}</div>
        </div>
      </div>`}return t.type==="nextServe"?`
      <div class="modal-back" data-act="close-modal">
        <div class="modal" data-stop="1">
          <h3>Who serves set ${jt()}?</h3>
          <div class="stack">
            <button class="btn btn-primary" data-act="start-next" data-serve="us">We serve</button>
            <button class="btn" data-act="start-next" data-serve="them">They serve</button>
          </div>
        </div>
      </div>`:`
    <div class="modal-back" data-act="close-modal">
      <div class="modal" data-stop="1">
        <h3>End match?</h3>
        <p>Stops recording. You can still export and review it.</p>
        <div class="row">
          <button class="btn btn-danger" data-act="confirm-end">End match</button>
          <button class="btn" data-act="close-modal">Cancel</button>
        </div>
      </div>
    </div>`}function Rt(t){const e=h(),n=new Set;if(o.screen==="setup")for(const r of f){const s=o.setup.lineup[r];s&&r!==t&&n.add(s)}else if(e){const r=b(y(e));for(const s of f)s!==t&&n.add(r.lineup[s])}return o.roster.players.filter(r=>!n.has(r.id)).sort((r,s)=>r.number-s.number)}function Bt(t){const e=h();if(!e)return`rotation ${t}`;const n=b(y(e)),r=w().get(n.lineup[t]);return r?v(r):`rotation ${t}`}function jt(){const t=h();return t?t.sets.length+1:1}function et(t){if(t.kind==="set"){const e=t.zone==="p"||t.zone==="d"?"":` from ${t.zone}`;return`Set ${t.zoneLabel}${e}${t.court?` (${t.court})`:""} → ${v(t.hitter)}`}return t.kind==="serve"?`Serve ${t.result} · ${v(t.server)}`:t.kind==="point"?`${t.winner==="us"?"Our":"Their"} point${t.rotated?" · we rotate":""}`:`Sub pos ${t.position}: ${v(t.out)} → ${v(t.in)}`}function nt(t){return new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}function Dt(t){const e=t.target,n=e.closest("[data-act]");if(!n)return;const r=n.dataset.act;if(r){if(r==="close-modal"){if(n.classList.contains("modal-back")&&e.closest("[data-stop]")&&e!==n)return;o.modal=null,d();return}if(r==="go-home")return $("home");if(r==="go-roster")return $("roster");if(r==="go-matches")return $("matches");if(r==="resume")return $("live");if(r==="new-match"){o.setup=tt();const s=o.roster.players.find(a=>a.role==="S");o.setup.setterId=s?.id??"",$("setup");return}if(r==="export-all"){st("volleystats.json",z(o.roster,o.matches));return}if(r==="import"){U.querySelector("[data-act=import-file]")?.click();return}if(r==="del-player"){const s=n.dataset.id;o.roster.players=o.roster.players.filter(a=>a.id!==s),p(),d();return}if(r==="open-pick"){o.modal={type:"pick",position:Number(n.dataset.pos)},d();return}if(r==="assign"){Vt(Number(n.dataset.pos),n.dataset.id);return}if(r==="start-match"){_t();return}if(r==="open-sub"){const s=h();if(!s||y(s).completed)return;o.modal={type:"sub",position:Number(n.dataset.pos)},d();return}if(r==="do-sub"){Wt(Number(n.dataset.pos),n.dataset.id);return}if(r==="set"){x(n.dataset.zone);return}if(r==="serve"){T(n.dataset.result);return}if(r==="point"){D(n.dataset.winner);return}if(r==="undo"){rt();return}if(r==="end-set"){Kt();return}if(r==="next-set"){o.modal={type:"nextServe"},d();return}if(r==="start-next"){qt(n.dataset.serve==="us");return}if(r==="end-match"){o.modal={type:"confirmEnd"},d();return}if(r==="confirm-end"){Yt();return}if(r==="export-match"){const s=h();s&&_([s],V(s));return}if(r==="export-one"){const s=o.matches.find(a=>a.id===n.dataset.id);s&&_([s],V(s));return}if(r==="review"){o.reviewId=n.dataset.id??null,$("review");return}if(r==="del-match"){const s=n.dataset.id;o.matches=o.matches.filter(a=>a.id!==s),o.activeMatchId===s&&(o.activeMatchId=null),p(),d()}}}function Ut(t){const e=t.target,n=e.dataset.act;if(n==="player-role"){const r=e.dataset.id,s=e.value,a=o.roster.players.find(i=>i.id===r);a&&(a.role=s,p());return}if(n==="setter"){o.setup.setterId=e.value,d();return}if(n==="we-serve"){o.setup.weServeFirst=e.checked,d();return}if(n==="import-file"){const r=e,s=r.files?.[0];if(r.value="",!s)return;s.text().then(a=>{try{Zt(St(a)),m("Imported"),$("home")}catch(i){m(i instanceof Error?i.message:"Import failed")}})}}function Ct(t){const e=t.target,n=e.dataset.act;if(n==="team-name"){o.roster.teamName=e.value,p();return}n==="opponent"&&(o.setup.opponent=e.value)}function Ft(t){t.preventDefault();const e=t.target;if(e.dataset.act!=="add-player")return;const n=new FormData(e),r=Number(n.get("number")),s=String(n.get("name")??"").trim(),a=String(n.get("role")??"OH");if(!s||Number.isNaN(r)){m("Need a name and number");return}if(o.roster.players.some(i=>i.number===r)){m(`#${r} is already on the roster`);return}o.roster.players.push({id:Y(),name:s,number:r,role:a}),p(),e.reset(),d()}function Jt(t){if(o.screen!=="live"||o.modal)return;const e=t.target;if(e&&["INPUT","SELECT","TEXTAREA"].includes(e.tagName)||t.repeat)return;const n=t.key,r=n.toLowerCase();if(n==="ArrowLeft"){t.preventDefault(),D("us");return}if(n==="ArrowRight"){t.preventDefault(),D("them");return}if(r==="u"||n==="Backspace"){t.preventDefault(),rt();return}if(n==="4"||n==="3"||n==="2"){x(n);return}if(r==="p"){x("p");return}if(r==="d"){x("d");return}if(r==="i"){T("in");return}if(r==="o"){T("out");return}if(r==="a"){T("ace");return}}function Vt(t,e){for(const n of f)o.setup.lineup[n]===e&&delete o.setup.lineup[n];if(o.setup.lineup[t]=e,!o.setup.setterId||!Object.values(o.setup.lineup).includes(o.setup.setterId)){const n=w(),r=f.map(s=>o.setup.lineup[s]).map(s=>s?n.get(s):void 0).filter(s=>!!s);o.setup.setterId=r.find(s=>s.role==="S")?.id??e}o.modal=null,d()}function _t(){if(!X(o.setup.lineup)||!o.setup.setterId){m("Need a full starting 6 and a setter");return}const t={id:Y(),createdAt:new Date().toISOString(),opponent:o.setup.opponent.trim(),sets:[{setNumber:1,startingLineup:{...o.setup.lineup},setterId:o.setup.setterId,weServeFirst:o.setup.weServeFirst,events:[],completed:!1}]};o.matches.push(t),o.activeMatchId=t.id,p(),$("live")}function O(){const t=h();if(!t)return null;const e=y(t);return e.completed?(m("Set is over — start the next set"),null):{match:t,set:e}}function x(t){const e=O();if(!e)return;const n=w(),r=b(e.set),s=Z(r,t,n);if(!s){m(ut(t,r));return}e.set.events.push({kind:"set",at:new Date().toISOString(),zone:t,zoneLabel:pt(t,s.hitter),hitter:S(s.hitter),court:s.court,ctx:L(r,n)}),p(),d()}function T(t){const e=O();if(!e)return;const n=w(),r=b(e.set);if(!r.weServe){m("We are receiving — nothing to serve");return}const s=n.get(r.lineup[1]);s&&(e.set.events.push({kind:"serve",at:new Date().toISOString(),result:t,server:S(s),rotated:!1,ctx:L(r,n)}),p(),t==="ace"?m("Ace — point for us, keep serve"):t==="out"?m("Serve out — point for them"):d())}function D(t){const e=O();if(!e)return;const n=w(),r=b(e.set),s=t==="us"&&!r.weServe;e.set.events.push({kind:"point",at:new Date().toISOString(),winner:t,rotated:s,ctx:L(r,n)}),p(),d()}function Wt(t,e){const n=O();if(!n)return;const r=w(),s=b(n.set),a=s.lineup[t];if(a===e){o.modal=null,d();return}if(ft(s.lineup).has(e)){m("That player is already on court");return}const i=r.get(a),l=r.get(e);!i||!l||(n.set.events.push({kind:"sub",at:new Date().toISOString(),position:t,out:S(i),in:S(l),ctx:L(s,r)}),o.modal=null,p(),d())}function rt(){const t=O();!t||t.set.events.length===0||(t.set.events.pop(),p(),d())}function Kt(){const t=O();t&&(t.set.completed=!0,p(),d())}function qt(t){const e=h();if(!e)return;const n=y(e),r=b(n);e.sets.push({setNumber:e.sets.length+1,startingLineup:{...r.lineup},setterId:r.setterId,weServeFirst:t,events:[],completed:!1}),o.modal=null,p(),d()}function Yt(){const t=h();if(t){const e=y(t);e.events.length>0&&(e.completed=!0)}o.activeMatchId=null,o.modal=null,p(),$("home")}function V(t){const e=t.createdAt.slice(0,10),n=(t.opponent||"match").replace(/[^\w.-]+/g,"_");return`volleystats-${e}-${n}.json`}function _(t,e){st(e,z(o.roster,t))}function st(t,e){const n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),r=URL.createObjectURL(n),s=document.createElement("a");s.href=r,s.download=t,s.click(),URL.revokeObjectURL(r)}function Zt(t){const e=new Map(o.roster.players.map(r=>[r.id,r]));for(const r of t.roster.players)e.has(r.id)||(o.roster.players.push(r),e.set(r.id,r));!o.roster.teamName&&t.roster.teamName&&(o.roster.teamName=t.roster.teamName);const n=new Set(o.matches.map(r=>r.id));for(const r of t.matches)n.has(r.id)||o.matches.push(r);p()}Ot(document.querySelector("#app"));
