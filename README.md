# # Old Mick and the Emus
Old Mick and the Emus is an AR board game prototype using a camera to detects ArUco markers on a physical board and a browser that renders the live match.

## Start The Game

### First-time Setting Up The Game

## Windows (PowerShell)
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pip install -e .

## Windows (Command Prompt)
python -m venv .venv
.venv\Scripts\python.exe -m pip install --upgrade pip
.venv\Scripts\python.exe -m pip install -r requirements.txt
.venv\Scripts\python.exe -m pip install -e .

## macOS
python3 -m venv .venv
./.venv/bin/python -m pip install --upgrade pip
./.venv/bin/python -m pip install -r requirements.txt
./.venv/bin/python -m pip install -e .

### Launch Game (Windows)

From the repo root:

Recommended on Windows: use `launch_live_demo.cmd` by double-clicking it in File Explorer.

```powershell
powershell -ExecutionPolicy Bypass -File .\launch_live_demo.ps1
```

This starts:
- the Python live tracker
- the built-in HTTP server for `frontend/`

### Launch live demo (macOS)

Recommended on macOS: use `launch_live_demo.command` (one-time: `chmod +x launch_live_demo.command`), then double-click it in Finder.

From the repo root, you can also start the live demo with one double-click:

- `launch_live_demo.cmd` (recommended)

If you prefer PowerShell directly:

- `launch_live_demo.ps1`

Or run it from PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\launch_live_demo.ps1
```

This launcher:
- checks `.venv\Scripts\python.exe`
- starts the live camera + WebSocket + HTTP stack in a new PowerShell window
- opens `http://localhost:8080` in your default browser

Notes:
- If PowerShell execution policy blocks scripts, use `launch_live_demo.cmd` instead of running the `.ps1` file directly.
- Close the tracker by focusing the camera preview window and pressing `Q`, or by closing the spawned PowerShell window.
- `frontend/` is served directly by `run_live_tracker.py`. No `npm install`, Vite, or separate frontend dev server is required.


### Marker Guide and Board Setup
This game has two layers:
    - The "digital layer" which is the UI for the game
    - The "physical layer" to control the game

Both layers are needed for the game to work correctly

## Marker Inventory
| ID | Side | Role | Used during | Purpose |
|----|------|------|-------------|---------|
| `0` | Shared | `BOARD CORNER` | Board scan, setup, gameplay | Top-left board corner marker used for board calibration |
| `1` | Shared | `BOARD CORNER` | Board scan, setup, gameplay | Top-right board corner marker used for board calibration |
| `2` | Shared | `BOARD CORNER` | Board scan, setup, gameplay | Bottom-left board corner marker used for board calibration |
| `3` | Shared | `BOARD CORNER` | Board scan, setup, gameplay | Bottom-right board corner marker used for board calibration |
| `4` | Shared | `CONFIRM` | HQ setup, gameplay | Confirms HQ placement during setup and resolves the active side's turn during gameplay |
| `5` | Shared | `HELP` | Setup, gameplay | Shows the help overlay while visible |
| `10` | P1 | `TURN` | HQ setup, gameplay | Activates P1 setup or positioning flow |
| `11` | P1 | `HQ` | HQ setup | Sets P1's live HQ candidate cell |
| `12` | P1 | `ATK A` | Gameplay | P1 attacker token A |
| `13` | P1 | `ATK B` | Gameplay | P1 attacker token B |
| `14` | P1 | `DEF` | Gameplay | P1 defender token |
| `19` | P1 | `NUKE` | Gameplay | Sets P1's pending nuke target when available |
| `20` | P2 | `TURN` | HQ setup, gameplay | Activates P2 setup or positioning flow |
| `21` | P2 | `HQ` | HQ setup | Sets P2's live HQ candidate cell |
| `22` | P2 | `ATK A` | Gameplay | P2 attacker token A |
| `23` | P2 | `ATK B` | Gameplay | P2 attacker token B |
| `24` | P2 | `DEF` | Gameplay | P2 defender token |
| `29` | P2 | `NUKE` | Gameplay | Sets P2's pending nuke target when available |

## Board Setup
Set up the board only after running the game:
1. Place the board flat on a stable surface.
2. Place the four board-corner ArUco markers in their correct corner positions:
    - ID 0 = top-left
    - ID 1 = top-right
    - ID 2 = bottom-left
    - ID 3 = bottom-right
3. Position the camera (preferebly on top) so the full board and all corner markers are visible at the same time.
4. Keep the board well lit and avoid glare, shadows, and heavy occlusion.
5. Keep markers printed clearly, flat, and facing the camera.
6. Avoid moving the board or corner markers during scan or gameplay.

## Game Rules
Refer to the game design document to understand the game rules