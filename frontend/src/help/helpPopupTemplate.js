export const HELP_POPUP_SELECTORS = {
  root: ".help-popup-root",
  overlay: "[data-help-overlay]",
  panel: ".help-popup__panel",
  close: "[data-help-close]",
  tabButton: "[data-tab-btn]",
  tabPane: "[data-tab-pane]",
};

export function buildHelpPopupTemplate() {
  return `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Rye&family=Barlow:wght@400;600;700&display=swap');
      .help-popup-root, .help-popup-root *, .help-popup-root *::before, .help-popup-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
      .help-popup-root {
        --bg:#ece4d4; --surface:rgba(0,0,0,0.04); --border:rgba(0,0,0,0.10);
        --text:#4a3c28; --text-bright:#1e140a; --gold:#9e6e10; --muted:#8a7560;
        --farmer:#3a8c22; --emu:#b07818;
        --farmer-bg:rgba(58,140,34,0.10); --farmer-border:rgba(58,140,34,0.30);
        --emu-bg:rgba(176,120,24,0.10); --emu-border:rgba(176,120,24,0.30);
        --placeholder-bg:#e8e0d0; --placeholder-border:#c8b898;
        width:100vw; height:100vh; background:var(--bg); color:var(--text); font-family:'Barlow',sans-serif; pointer-events:auto;
      }
      .help-screen { width:100vw; height:100vh; display:flex; flex-direction:column; overflow:hidden; }
      .help-topbar { position:relative; display:flex; align-items:center; justify-content:center; padding:8px 56px; border-bottom:1px solid var(--border); flex-shrink:0; }
      .help-topbar-center { display:flex; flex-direction:column; align-items:center; gap:2px; }
      .help-title { font-family:'Rye',serif; font-size:15px; color:var(--text-bright); white-space:nowrap; text-align:center; }
      .help-subtitle { font-size:10px; color:var(--muted); text-align:center; }
      .help-marker-note { color:var(--muted); font-size:11px; line-height:1.35; }
      .help-close { position:absolute; right:20px; width:28px; height:28px; border:1px solid var(--border); border-radius:6px; background:none; color:var(--text); cursor:pointer; display:flex; align-items:center; justify-content:center; opacity:.5; }
      .help-close:hover { opacity:1; } .help-close svg { width:12px; height:12px; }
      .help-rows { flex:1; overflow-y:auto; padding:8px 56px 24px; display:flex; flex-direction:column; gap:10px; }
      .help-rows::-webkit-scrollbar { width:3px; } .help-rows::-webkit-scrollbar-thumb { background:var(--muted); border-radius:3px; }
      .help-row { flex:1; min-height:0; display:grid; grid-template-columns:1fr 2.4fr 1fr; gap:10px; align-items:stretch; }
      .help-card { border-radius:8px; padding:10px; display:flex; flex-direction:row; align-items:stretch; min-height:0; min-width:0; overflow:hidden; }
      .help-card.farmer { background:var(--farmer-bg); border:1px solid var(--farmer-border); }
      .help-card.emu { background:var(--emu-bg); border:1px solid var(--emu-border); flex-direction:row-reverse; }
      .help-thumb { flex:2; min-width:0; min-height:0; border-radius:4px; overflow:hidden; }
      .help-thumb img { width:100%; height:100%; object-fit:contain; image-rendering:pixelated; display:block; }
      .help-card.blended .help-thumb img, .help-card.wild .help-thumb img { mix-blend-mode:multiply; }
      .help-card.wild .help-thumb img { transform:scale(1.45); transform-origin:center center; }
      .help-thumb-pair { flex:3; min-width:0; min-height:0; display:flex; gap:4px; }
      .help-thumb-pair img { flex:1; min-width:0; height:100%; object-fit:contain; image-rendering:pixelated; border-radius:4px; display:block; }
      .help-card-text { flex:1; min-width:0; display:flex; flex-direction:column; justify-content:center; padding:4px 8px; gap:4px; text-align:left; }
      .help-card.farmer .help-card-text { text-align:right; }
      .help-card-name { font-family:'Rye',serif; font-size:13px; color:var(--text-bright); line-height:1.2; margin-top:0; flex-shrink:0; }
      .help-card-sub { font-size:11px; color:var(--muted); margin-top:0; flex-shrink:0; }
      .help-center { display:flex; gap:12px; align-items:stretch; }
      .help-mechanic { flex:1; display:flex; flex-direction:column; justify-content:center; gap:8px; padding-left:28px; }
      .help-mechanic-title { font-family:'Rye',serif; font-size:13px; color:var(--text-bright); }
      .help-faction-header { display:grid; grid-template-columns:1fr 2.4fr 1fr; gap:10px; flex-shrink:0; }
      .help-faction-label { font-family:'Rye',serif; font-size:13px; text-align:center; padding:4px 0; }
      .help-faction-label.farmer { color:var(--farmer); }
      .help-faction-label.emu { color:var(--emu); }
      .help-text, .help-list { font-size:12px; line-height:1.6; color:var(--text); }
      .help-list { padding-left:16px; } .help-list li { margin-bottom:2px; }
      .help-text strong, .help-list strong { color:var(--text-bright); font-weight:700; }
      .help-pills { display:flex; align-items:center; gap:4px; flex-wrap:wrap; }
      .help-pill { font-size:10px; font-weight:700; background:var(--surface); border:1px solid var(--border); border-radius:99px; padding:2px 8px; color:var(--gold); white-space:nowrap; }
      .help-pill-arrow { font-size:10px; color:var(--muted); }
      .help-upgrade-note { font-size:12px; color:var(--gold); font-weight:600; }
      .help-center.no-gif .help-mechanic { flex:1; }
      @media (max-width:768px) { .help-row { grid-template-columns:1fr; gap:8px; } .help-center { flex-direction:column; } .help-card { flex-direction:row; align-items:center; gap:10px; } .help-rows { padding:10px; } .help-topbar-left { flex-direction:column; gap:4px; } }
    </style>

    <div class="help-popup-root">
      <div class="help-screen">
        <div class="help-topbar">
          <div class="help-topbar-center">
            <span class="help-title">How to Play</span>
            <span class="help-subtitle">Flip the card back to resume game</span>
          </div>
          <button class="help-close" type="button" aria-label="Close" data-help-close>
            <svg viewBox="0 0 14 14" fill="none"><line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line></svg>
          </button>
        </div>
        <div class="help-rows">
          <div class="help-faction-header">
            <div class="help-faction-label farmer">Old Mick</div>
            <div></div>
            <div class="help-faction-label emu">The Emus</div>
          </div>
          ${row(card('farmer blended', 'assets/images/tokens/hq-mick.png', 'Grain Stash', 'Secret HQ - hidden'), winMechanic(), card('emu blended', 'assets/images/tokens/hq-emu.png', 'Bird Council', 'Secret HQ - hidden'))}
          ${row(card('farmer', 'assets/images/tokens/atk-m-1.png', 'Rifleman A & B (×2)', 'Destroys Nests', 'assets/images/tokens/atk-m-2.png'), attackMechanic(), card('emu', 'assets/images/tokens/atk-e-1.png', 'Emu Pack A & B (×2)', 'Destroys Farms', 'assets/images/tokens/atk-e-2.png'))}
          ${row(card('farmer', 'assets/images/tokens/def-m-level1.png', 'Old Mick', 'Protects Farms'), defenseMechanic(), card('emu', 'assets/images/tokens/def-e-level1.png', 'Cassowary', 'Protects Nests'))}
          ${row(card('farmer wild', 'assets/images/tokens/wild-token-m-keith.png', "Keith's Cannon", 'One use only'), wildMechanic(), card('emu wild', 'assets/images/tokens/wild-token-e-dino.png', 'The Ancestors', 'One use only'))}
          ${row(card('farmer blended', 'assets/images/tiles/cell-m-farm.png', 'Farms', 'Your cells'), terrainMechanic(), card('emu blended', 'assets/images/tiles/cell-e-nest.png', 'Nests', 'Your cells'))}
        </div>
      </div>
    </div>
  `;
}

function card(side, img, name, sub = '', img2 = '') {
  const thumb = img2
    ? `<div class="help-thumb-pair"><img src="${img}" alt="${name}"><img src="${img2}" alt="${name}"></div>`
    : `<div class="help-thumb"><img src="${img}" alt="${name}"></div>`;
  const text = `<div class="help-card-text"><div class="help-card-name">${name}</div>${sub ? `<div class="help-card-sub">${sub}</div>` : ''}</div>`;
  return `<div class="help-card ${side}">${thumb}${text}</div>`;
}

function row(left, center, right) {
  return `<div class="help-row">${left}${center}${right}</div>`;
}

function center(mechanic, gifSrc = null, gifAlt = '') {
  const gif = gifSrc ? `<div class="help-gif"><img src="${gifSrc}" alt="${gifAlt}"></div>` : '';
  return `<div class="help-center${gifSrc ? '' : ' no-gif'}"><div class="help-mechanic">${mechanic}</div>${gif}</div>`;
}

function winMechanic() {
  return center(`<div class="help-mechanic-title">Win Condition</div><ul class="help-list"><li><strong>Standard Win:</strong> Destroy all enemy Farms or all enemy Nests</li><li><strong>Instant Win:</strong> Destroy their hidden HQ (Grain Stash or Bird Council)</li></ul>`);
}

function attackMechanic() {
  return center(`<div class="help-mechanic-title">Attack Token</div><p class="help-text">Fires in a straight line - horizontal, vertical, or diagonal. Hits the first enemy cell it reaches.</p><div class="help-pills"><span class="help-pill">Lv 1 - 1 cell</span><span class="help-pill-arrow">-></span><span class="help-pill">Lv 2 - 2 cells</span><span class="help-pill-arrow">-></span><span class="help-pill">Lv 3 - 3 cells</span></div><span class="help-upgrade-note">Destroy enemy Farms or Nests to upgrade. Each levels up independently.</span>`);
}

function defenseMechanic() {
  return center(`<div class="help-mechanic-title">Defence Token</div><p class="help-text">Projects a perimeter zone around itself. Break the perimeter first - then the cell. Move the token and the perimeter resets.</p><div class="help-pills"><span class="help-pill">Default - 3x3</span><span class="help-pill-arrow">-></span><span class="help-pill">Upgraded - 5x5</span></div><span class="help-upgrade-note">Upgrades when your Farms / Nests drop to half.</span>`);
}

function wildMechanic() {
  return center(`<div class="help-mechanic-title">Wild Token</div><p class="help-text">Place a 3x3 zone in enemy territory. 5 random cells destroyed. Bypasses perimeter. One use only.</p><span class="help-upgrade-note">Unlocks when your Farms / Nests drop to critically low numbers.</span>`);
}

function terrainMechanic() {
  return center(`<div class="help-mechanic-title">Terrain & Cells</div><ul class="help-list"><li><strong>Terrain</strong> - Termite Mounds (2 HP) and Rocks (5 HP) block attacks. Hit them repeatedly to clear.</li><li><strong>Cells</strong> - Farms and Nests have 1 HP each. Easily destroyed -guard them with your Defence Token.</li></ul>`);
}
