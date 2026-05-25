import { COLORS } from "../constants.js";
import { preloadAll } from "../audio.js";

/**
 * BootScene — preloads all assets, then starts IntroScene.
 * WebSocket is managed externally (main.js → registry).
 */
export class BootScene extends Phaser.Scene {
  constructor() { super("Boot"); }

  preload() {
    preloadAll(this);

    this.load.image("board",          "assets/images/board.png");
    // Optional intro title — missing file is OK (IntroScene uses text fallback)
    this.load.image("intro_title",    "assets/images/intro_title.png");

    // Attack tokens — sprite sheets (128×128 frames, vertical strip)
    this.load.spritesheet("tok_mick_atk_a", "assets/images/sprites/atk-m-1-sprite.png", { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet("tok_mick_atk_b", "assets/images/sprites/atk-m-2-sprite.png", { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet("tok_emu_atk_a",  "assets/images/sprites/atk-e-1-sprite.png", { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet("tok_emu_atk_b",  "assets/images/sprites/atk-e-2-sprite.png", { frameWidth: 128, frameHeight: 128 });

    // Defense tokens — sprite sheets (level 1 and level 2)
    this.load.spritesheet("tok_mick_def",   "assets/images/sprites/def-m-level1-sprite.png", { frameWidth: 117, frameHeight: 128 });
    this.load.spritesheet("tok_mick_def_2", "assets/images/sprites/def-m-level2-sprite.png", { frameWidth: 117, frameHeight: 128 });
    this.load.spritesheet("tok_emu_def",    "assets/images/sprites/def-e-level1-sprite.png", { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet("tok_emu_def_2",  "assets/images/sprites/def-e-level2-sprite.png", { frameWidth: 128, frameHeight: 128 });

    // Nuke/wild tokens
    this.load.image("tok_mick_nuke",  "assets/images/tokens/wild-token-m-keith.png");
    this.load.image("tok_emu_nuke",   "assets/images/tokens/wild-token-e-dino.png");

    // HQ tokens
    this.load.image("hq_grain_stash",      "assets/images/tokens/hq-mick.png");
    this.load.image("hq_grain_stash_dead", "assets/images/tokens/hq-mick-destroyed.png");
    this.load.image("hq_bird_council",     "assets/images/tokens/hq-emu.png");
    this.load.image("hq_bird_council_dead","assets/images/tokens/hq-emu-destroyed.png");

    // Terrain tiles
    this.load.image("cell_mick",      "assets/images/tiles/cell-m-farm.png");
    this.load.image("cell_emu",       "assets/images/tiles/cell-e-nest.png");
    this.load.image("hard_mick",      "assets/images/tiles/hard-terrain.png");
    this.load.image("hard_emu",       "assets/images/tiles/hard-terrain.png");
    this.load.image("soft_mick",      "assets/images/tiles/soft-terrain1.png");
    this.load.image("soft_emu",       "assets/images/tiles/soft-terrain2.png");

    this.load.on("loaderror", (file) => {
      console.warn(`[boot] missing: ${file.key} (${file.url})`);
    });
  }

  _removeWhiteBg(key, threshold = 230) {
    if (!this.textures.exists(key)) return;
    const img    = this.textures.get(key).getSourceImage();
    const canvas = document.createElement("canvas");
    canvas.width  = img.naturalWidth  || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx  = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const id   = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = id.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > threshold && data[i+1] > threshold && data[i+2] > threshold)
        data[i+3] = 0;
    }
    ctx.putImageData(id, 0, 0);
    this.textures.remove(key);
    this.textures.addCanvas(key, canvas);
  }

  create() {
    const WHITE_BG_KEYS = [
      "tok_mick_nuke", "tok_emu_nuke",
      "hq_grain_stash", "hq_grain_stash_dead", "hq_bird_council", "hq_bird_council_dead",
      "cell_mick", "cell_emu", "hard_mick", "hard_emu", "soft_mick", "soft_emu",
    ];
    for (const key of WHITE_BG_KEYS) this._removeWhiteBg(key);

    const ws = this.game.registry.get("ws");
    this.scene.start("Intro", { ws });
  }
}
