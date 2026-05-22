# Manual And No-Camera Play

## Purpose

This document covers the runtime modes that let you use the current frontend and authoritative rules without a live camera feed.

## Supported Modes

### Terminal manual play

Entrypoint:

- `runner/run_manual_play.py`
<<<<<<< Updated upstream
- `docs/manual_play.md`
=======

Use when:

- testing the frontend without camera hardware
- testing rules from a controlled terminal flow
- reproducing battle/setup behavior without marker input

### Browser manual play

Entrypoint:

- `runner/run_browser_manual_play.py`
>>>>>>> Stashed changes

Use when:

- testing browser token placement quickly
- skipping the full HQ setup flow for UI iteration

Status:

- useful and documented
- not the primary live runtime path

## Shared Characteristics

Both modes:

- use the same main frontend served at `http://localhost:8080`
- use the same WebSocket transport
- keep `backend/live_rules/game_model.py` as the authoritative rule owner
- avoid the camera tracker path

## Launch Instructions

From the repository root, with `.venv` active:

### Windows PowerShell

```powershell
.\.venv\Scripts\python.exe -m runner.run_manual_play
```

<<<<<<< Updated upstream
This will:
- start `runner.run_manual_play`

Open `http://localhost:8080` separately in your browser.
=======
Browser manual play:

```powershell
.\.venv\Scripts\python.exe -m runner.run_browser_manual_play
```

### macOS

```bash
./.venv/bin/python -m runner.run_manual_play
```

Browser manual play:

```bash
./.venv/bin/python -m runner.run_browser_manual_play
```

Then open:

```text
http://localhost:8080
```

Do not run these at the same time as `run_live_tracker.py` unless you intentionally change the ports.

## Terminal Manual Play Flow

Typical operator flow:

1. Start `runner.run_manual_play`.
2. Choose a mode with `mode normal` or `mode tutorial`.
3. Choose the first setup side with `choose_side old_mick` or `choose_side mob`.
4. Place and confirm both HQs.
5. Place tokens with `set` commands.
6. Advance turns with `flip` or `turn 1` / `turn 2`.
7. Watch the frontend update at `http://localhost:8080`.
>>>>>>> Stashed changes

## Terminal Commands

```text
help
show
show_setup
choose_side old_mick
choose_side mob
set_hq p1 A3
confirm_hq p1
reset_setup
set p1 atk_a A3 E
set p1 atk_b C4 NW
set p1 def D5
set p2 atk_a J9 W
clear p1 atk_a
turn 1
turn 2
flip
new_map
tier 1 +1
tier 2 -1
quit
```

<<<<<<< Updated upstream
Rules for commands:
- board cells use `A1` through `L12`
- attackers need a direction: `E`, `SE`, `S`, `SW`, `W`, `NW`, `N`, `NE`
- defenders only need a position
- choose a setup side before confirming HQs
- use `set_hq` and `confirm_hq` to finish hidden HQ setup
- `flip` toggles turn `1 <-> 2`
- `turn 1` or `turn 2` sets the current turn explicitly
- `new_map` regenerates terrain and resets the setup flow
- `tier` changes the same tier values the browser UI already renders
- `show` prints a readable summary of the current state
- `show_setup` prints setup-only progress and status
=======
Rules:
>>>>>>> Stashed changes

- cells use `A1` through `L12`
- attackers need a direction
- defenders need only a position
- run a `mode` command before setup commands
- `new_map` regenerates terrain and resets setup in the current mode

## Browser Manual Play Behavior

<<<<<<< Updated upstream
Typical flow:
1. Launch the manual runner.
2. Choose the first setup side with `choose_side old_mick` or `choose_side mob`.
3. Set and confirm both HQs with `set_hq` and `confirm_hq`.
4. Place both sides with `set` commands.
5. Open or watch `http://localhost:8080`.
6. Use `flip` or `turn 1` / `turn 2` to advance the battle and trigger attack resolution.
7. Use `show` or `show_setup` whenever you want a terminal-side summary.
=======
`run_browser_manual_play.py` bootstraps directly into a playable `normal` match:
>>>>>>> Stashed changes

- locks `normal` mode
- chooses `old_mick` as the first setup side
- auto-places and confirms both HQs
- enters `game` with `manual_controls` enabled

In this mode, the browser can:

- click friendly cells to place tokens
- click attack tokens to rotate them
- use `END TURN` to resolve attacks

## Limitations

- Manual modes are for development and testing, not the primary physical play experience.
- Browser manual play intentionally bypasses the marker-driven setup flow.
- Manual runtimes still use the same rules model, so win state, replay flow, and payload structure stay aligned with the main runtime.

## Related Documents

- `runner/README.md`
- `docs/setup_flow_backend_v1.md`
- `docs/board_state_v1.md`
- `docs/authoritative_actions_v1.md`
