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
        --bg:#1a1208; --surface:rgba(240,232,208,0.06); --border:rgba(240,232,208,0.08);
        --text:#ddd0aa; --text-bright:#f8f0e0; --gold:#d4a84a; --muted:#7a6a50;
        --farmer:#6adf50; --emu:#e0b030;
        --farmer-bg:rgba(74,110,58,0.18); --farmer-border:rgba(106,222,80,0.28);
        --emu-bg:rgba(122,96,64,0.18); --emu-border:rgba(224,176,48,0.28);
        --placeholder-bg:#0f0a04; --placeholder-border:#2a1e0e;
        width:100vw; height:100vh; background:var(--bg); color:var(--text); font-family:'Barlow',sans-serif; pointer-events:auto;
      }
      .help-screen { width:100vw; height:100vh; display:flex; flex-direction:column; overflow:hidden; }
      .help-topbar { position:relative; display:flex; align-items:center; justify-content:center; padding:10px 20px; border-bottom:1px solid var(--border); flex-shrink:0; }
      .help-title { font-family:'Rye',serif; font-size:15px; color:var(--text-bright); white-space:nowrap; text-align:center; }
      .help-marker-note { color:var(--muted); font-size:11px; line-height:1.35; }
      .help-close { position:absolute; right:20px; width:28px; height:28px; border:1px solid var(--border); border-radius:6px; background:none; color:var(--text); cursor:pointer; display:flex; align-items:center; justify-content:center; opacity:.5; }
      .help-close:hover { opacity:1; } .help-close svg { width:12px; height:12px; }
      .help-rows { flex:1; overflow-y:auto; padding:12px 16px; display:flex; flex-direction:column; gap:10px; }
      .help-rows::-webkit-scrollbar { width:3px; } .help-rows::-webkit-scrollbar-thumb { background:var(--muted); border-radius:3px; }
      .help-row { flex:1; min-height:0; display:grid; grid-template-columns:1fr 2.4fr 1fr; gap:10px; align-items:stretch; }
      .help-card { border-radius:8px; padding:10px; display:flex; flex-direction:column; min-height:0; min-width:0; overflow:hidden; }
      .help-card.farmer { background:var(--farmer-bg); border:1px solid var(--farmer-border); }
      .help-card.emu { background:var(--emu-bg); border:1px solid var(--emu-border); }
      .help-thumb { flex:1; min-height:0; width:100%; border-radius:4px; overflow:hidden; }
      .help-thumb img { width:100%; height:100%; object-fit:contain; image-rendering:pixelated; display:block; }
      .help-thumb-pair { flex:1; min-height:0; display:flex; gap:4px; }
      .help-thumb-pair img { flex:1; min-width:0; height:100%; object-fit:contain; image-rendering:pixelated; border-radius:4px; display:block; }
      .help-card-name { font-family:'Rye',serif; font-size:13px; color:var(--text-bright); line-height:1.2; margin-top:8px; flex-shrink:0; }
      .help-card-sub { font-size:11px; color:var(--muted); margin-top:2px; flex-shrink:0; }
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
      .help-pill-arrow, .help-upgrade-note { font-size:10px; color:var(--muted); }
      .help-center.no-gif .help-mechanic { flex:1; }
      @media (max-width:768px) { .help-row { grid-template-columns:1fr; gap:8px; } .help-center { flex-direction:column; } .help-card { flex-direction:row; align-items:center; gap:10px; } .help-rows { padding:10px; } .help-topbar-left { flex-direction:column; gap:4px; } }
    </style>

    <div class="help-popup-root">
      <div class="help-screen">
        <div class="help-topbar">
          <span class="help-title">How to Play</span>
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
          ${row(card('farmer', 'assets/images/tokens/hq-mick.png', 'Grain Stash', 'Secret HQ - hidden'), winMechanic(), card('emu', 'assets/images/tokens/hq-emu.png', 'Bird Council', 'Secret HQ - hidden'))}
          ${row(card('farmer', 'assets/images/tokens/atk-m-1.png', 'Rifleman A / B x 2', '', 'assets/images/tokens/atk-m-2.png'), attackMechanic(), card('emu', 'assets/images/tokens/atk-e-1.png', 'Emu Pack A / B x 2', '', 'assets/images/tokens/atk-e-2.png'))}
          ${row(card('farmer', 'assets/images/tokens/def-m-level1.png', 'Old Mick x 1'), defenseMechanic(), card('emu', 'assets/images/tokens/def-e-level1.png', 'Cassowary x 1'))}
          ${row(card('farmer', 'assets/images/tokens/wild-token-m-keith.png', "Keith's Cannon", 'One use only'), wildMechanic(), card('emu', 'assets/images/tokens/wild-token-e-dino.png', 'The Ancestors', 'One use only'))}
          ${row(card('farmer', 'assets/images/tiles/cell-m-farm.png', 'Farms', 'Your cells'), terrainMechanic(), card('emu', 'assets/images/tiles/cell-e-nest.png', 'Nests', 'Your cells'))}
        </div>
      </div>
    </div>
  `;
}

function card(side, img, name, sub = '', img2 = '') {
  const thumb = img2
    ? `<div class="help-thumb-pair"><img src="${img}" alt="${name}"><img src="${img2}" alt="${name}"></div>`
    : `<div class="help-thumb"><img src="${img}" alt="${name}"></div>`;
  return `<div class="help-card ${side}">${thumb}<div class="help-card-name">${name}</div>${sub ? `<div class="help-card-sub">${sub}</div>` : ''}</div>`;
}

function row(left, center, right) {
  return `<div class="help-row">${left}${center}${right}</div>`;
}

function center(mechanic, gifSrc = null, gifAlt = '') {
  const gif = gifSrc ? `<div class="help-gif"><img src="${gifSrc}" alt="${gifAlt}"></div>` : '';
  return `<div class="help-center${gifSrc ? '' : ' no-gif'}"><div class="help-mechanic">${mechanic}</div>${gif}</div>`;
}

function winMechanic() {
  return center(`<div class="help-mechanic-title">Win Condition</div><ul class="help-list"><li>Destroy the enemy's secret HQ - instant win</li><li>Wipe all enemy cells - destroy every Farm or every Nest</li></ul>`);
}

function attackMechanic() {
  return center(`<div class="help-mechanic-title">Attack Token</div><p class="help-text">Fires in a straight line - horizontal, vertical, or diagonal. Hits the first enemy cell it reaches.</p><div class="help-pills"><span class="help-pill">Lv 1 - 1 cell</span><span class="help-pill-arrow">-></span><span class="help-pill">Lv 2 - 2 cells</span><span class="help-pill-arrow">-></span><span class="help-pill">Lv 3 - 3 cells</span></div><span class="help-upgrade-note">Each token levels up independently.</span>`);
}

function defenseMechanic() {
  return center(`<div class="help-mechanic-title">Defence Token</div><p class="help-text">Projects a perimeter zone around itself. Break the perimeter first - then the cell. Move the token and the perimeter resets.</p><div class="help-pills"><span class="help-pill">Default - 3x3</span><span class="help-pill-arrow">-></span><span class="help-pill">Upgraded - 5x5</span></div><span class="help-upgrade-note">Upgrades when your own cells reach roughly half.</span>`);
}

function wildMechanic() {
  return center(`<div class="help-mechanic-title">Wild Token</div><p class="help-text">Place a 3x3 zone in enemy territory. 5 random cells destroyed. Bypasses perimeter. One use only.</p><span class="help-upgrade-note">Unlocks when your own cells reach critically low.</span>`);
}

function terrainMechanic() {
  return center(`<div class="help-mechanic-title">Terrain & Cells</div><ul class="help-list"><li><strong>Terrain</strong> - Rocks and Termite Mounds appear on both sides. Blocks attacks. Hit it enough and it breaks.</li><li><strong>Cells</strong> - Farms and Nests are what you're fighting over. Destroy theirs. Protect yours.</li></ul>`);
}
