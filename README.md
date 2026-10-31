# Tiling Forest Demo · Web

An unofficial browser port of **Tiling Forest – Tiling Town Demo**, built with JavaScript and Canvas 2D. It uses the original demo's forest map, tile definitions, pixel art, rules, music, and sound effects.

**Original game by [muratsubo Games](https://store.steampowered.com/app/4213590/).** The original game, design, levels, artwork, music, sound effects, fonts, and trademarks belong to their respective rights holders. This project is not affiliated with or endorsed by the original developer. Attribution does not grant permission to redistribute the original assets. See [COPYRIGHT.md](COPYRIGHT.md).

## Play online

**[Play on GitHub Pages](https://wangrunji0408.github.io/tiling-forest-demo-web/)**

Pushes to `main` run the automated tests and deploy `dist/` to GitHub Pages.

## Run locally

Requires Node.js 18 or later. No npm dependencies are needed.

```sh
npm run dev
```

Open http://localhost:4173. To use another port:

```sh
PORT=4174 npm run dev
```

Run the tests:

```sh
npm test
```

The `dist/` directory can be hosted directly on a static web server.

## Features

- The complete original forest: **35 areas and 36 tile unlocks**.
- Road and terrain edge matching, exploration, and progressive area unlocking.
- Area filling, road connectivity, facing stump pairs, and flower propagation.
- Demo completion at N-6 and full-forest completion checks.
- Original pixel art, logo, font, music, and sound effects.
- Panning, zooming, overview, area navigation, and note markers.
- Undo/redo, area reset, and restoration of completed layouts.
- Browser autosave, JSON export/import, and original `progress.json` import.
- **System-language detection:** English, Simplified Chinese, and Japanese; other languages fall back to English. A manual override is available in the menu and persists in the browser.

## Touch controls

- **Tap** an empty cell to place the selected tile.
- **Drag with one finger** to pan the map in any mode.
- **Pinch with two fingers** to zoom around the gesture's midpoint. Lifting your fingers after a pan or pinch does not place a tile.
- Select **Erase**, then tap a placed tile to remove it. Use **Undo** to restore it.
- Swipe the **bottom tile strip** horizontally to browse unlocked tiles.
- Tap the **area name** to expand or collapse its progress and layout controls.
- Use the map overview and zoom buttons when convenient.

The layout adapts to portrait and landscape screens and respects display safe areas.

## Mouse and keyboard

| Action | Input |
| --- | --- |
| Place / erase a tile | Left / right mouse button |
| Pan the map | Drag, WASD, or arrow keys |
| Zoom | Q / E; mouse wheel in Move mode |
| Previous / next tile | R / T or mouse wheel |
| Select the first ten tiles | 1–0 |
| Undo / redo | Z / X |
| Reset the current area | C |
| Collapse the tile strip | Tab |
| Toggle Move mode | Esc |
| Open guide / rules | G / H |

Tile orientations are unlocked separately, as in the original game. Arbitrary rotation is not available.

## Project structure

- `dist/engine.js`: puzzle rules and save handling.
- `dist/app.js`: rendering, interface, audio, and interaction.
- `dist/gestures.js`: single-pointer pan and multi-touch zoom handling.
- `dist/i18n.js`: system-language selection and interface translations.
- `dist/data.json`: map, tile definitions, and text extracted from the original demo.
- `dist/assets/`: original resources; rights remain with their respective owners.
- `scripts/extract.py`: resource extraction from a locally installed Windows demo.
- `scripts/subset-font.py`: optional web-font subset generation.
- `tests/`: puzzle, gesture, and localization tests.
- `docs/reverse-engineering.md`: original analysis and validation notes (Chinese).

To extract assets again, install the Python dependencies with `pip install -r requirements.txt`, then run `python scripts/extract.py`. The script defaults to the demo installed in a macOS CrossOver Steam bottle. It does not modify the original executable or Steam saves.

The optional font-subset script requires `fonttools` and `brotli` and retains the font's original license.

## Fidelity and limitations

Maps, tile definitions, and assets come from the original demo; gameplay is independently reimplemented. The interface is adapted for browsers rather than reproduced frame by frame. Original tutorial sequences, all animations, dynamic guide reasoning, Steam achievements, and Steam Cloud are not fully ported.

Saves are stored per browser and origin. Export a save to move between devices. Translations apply to the web interface; bundled original reference files retain their original languages.

This repository does not include the Windows executable, Steam DLLs, account data, or personal saves. No separate open-source license has been granted for the independently written port code. Public repository visibility does not imply unrestricted redistribution rights for all contents.
