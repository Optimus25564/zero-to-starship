# 小小 SpaceX 工程师 · 小游戏合集 — 构建规范 (SPEC)

You are building one self-contained HTML minigame per file, part of a gallery of ~24.
They must all feel like ONE product. Read this whole file before writing code.

## Audience & tone
- Target player: a **10-year-old** (4th/5th grade), basic arithmetic, no physics.
- Mentor voice = a **cartoon Elon Musk** (直接、爱提问、冷幽默、第一性原理).
  Every Musk bubble ≤ ~60 Chinese characters.
- **Failure is good**: every failure path has a specific, funny recap ending in the culture meme
  “炸了？又一份数据。 / Boom? Another data point.” No blood, no injured people — cartoon explosions only.
- **先动手，后命名**: let the kid DISCOVER the rule by playing, then name it. Never lead with a definition.
- Big numbers get a kid analogy (7.9 km/s ≈ 京沪 2 分半; 3000℃ ≈ 两倍炼钢炉).

## Physics honesty (IMPORTANT — the user cares about this)
- Where real physics is cheap, **simulate it for real** (deterministic numeric integration / real formulas),
  don't fake with hardcoded `if` bands. Display real units.
- Reference simplification thresholds are in the PRD (given to you per game). Match them.
- Example already built: `games/newton-cannon.html` uses a real 2-body gravity integrator so 7.9/11.2 emerge
  from physics. Read it as the gold-standard reference for style, structure, and rigor.

## Bilingual (中文 primary, English secondary)
- Default language **zh**. A `EN` toggle top-right switches all visible strings; clicking again shows `中`.
- Keep a `T = {zh:{...}, en:{...}}` object and a `lang` variable, re-render text on toggle
  (copy the pattern from newton-cannon.html).

## Shared look — use common.css (DO NOT invent your own colors/among components)
- Link it: `<link rel="stylesheet" href="../common.css">`
- Use the provided classes: `header/.htitle/.headright/.backlink/.langtoggle`, `.hook`, `.stage`(+`.verdict`),
  `.panel`, `.readout`(`.big/.unit/.chip`), `.analogy`, `.sliderrow/.sliderwrap` + `input[type=range]` + `.ticks/.tick`,
  `.buttons` + `button`(`.fire/.ghost/.mini`), `.choices/.choice`(`.correct/.wrong/.half`, each with a `.key` span),
  `.feedback`, `.meters/.meter/.mbar/.mfill`(`.ok/.bad/.blue`)+`.mzone`, `.grid/.card`, `.badge/.medal`.
- You may add a small game-specific `<style>` block ONLY for things common.css doesn't cover (e.g. a canvas cursor).
- Colors: flame orange = accent/fire, blue = space/water, green = success, red = failure/danger. Dark space bg.

## Required page skeleton (every game)
```html
<!DOCTYPE html><html lang="zh"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>关卡名 · English</title>
<link rel="stylesheet" href="../common.css">
</head><body>
  <header>
    <div class="htitle"><h1 id="title">关卡名</h1><span class="en" id="titleEn">English</span></div>
    <div class="headright">
      <a class="backlink" href="../index.html" id="back">← 目录</a>
      <span class="langtoggle" id="langBtn">EN</span>
    </div>
  </header>
  <p class="hook" id="hook"></p>
  <!-- stage (canvas) and/or panels here -->
  <div class="badge" id="badge"><span class="medal">🏅</span><span id="badgeText"></span></div>
<script> /* inline, IIFE. No external libs. Canvas 2D only. */ </script>
</body></html>
```

## Badge + progress persistence (the hub reads these)
- Each game has a badge (name given per game).
- On the player **passing the goal**, set: `localStorage.setItem('mg.badge.<GAME_ID>', '1')`
  where `<GAME_ID>` is exactly the file basename without extension (e.g. `space-hockey`).
- Show the badge as locked (dashed) until earned, then `.earned` with the badge name.
- `.backlink` href is `../index.html`, and its text should also be bilingual (目录 / Menu).

## Canvas rules (for games with a scene)
- 2D canvas inside `<div class="stage">`. DPR-aware sizing on resize (copy newton-cannon's resize()).
- Keep animations **watchable/slow** (the user teaches with these): key motions ~3–5s, ease where natural.
- Cartoon explosions = expanding orange/white puff + shake, never gore.

## Interaction quality
- Any control → visible change within 0.5s.
- Every failure branch has its own message. No silent failure.
- From “trade-off” games onward: support a **half-credit** answer (`.choice.half`) = “not wrong, but has a cost”,
  and explain the cost. This teaches “答案有优劣，而非对错”.
- Do NOT gate/lock between games — each file is independently playable.

## Deliverable
- Write each assigned game to `prototypes/minigames/games/<GAME_ID>.html`.
- Self-contained: no build step, no external network, no CDN. Works when opened via a static server.
- After writing, do a quick self-check: valid HTML, JS has no syntax errors, links `../common.css`,
  writes its `mg.badge.<id>` on success, EN toggle works.

## Full game roster (for context; you build only YOUR assigned subset)
Chapter 1 物理训练营: throw-balls, balloon, space-hockey, shopping-cart, newton-cannon(done), twr-bench
Chapter 2 火箭工厂: nozzle, engine-pipeline, fuel-test, material-triangle, wind-tunnel, maxq
Chapter 3 飞向轨道: rocket-equation-wall, staging, launch-director, gravity-turn, circularize
Chapter 4 接住火箭: recovery-steps, cost-accounting, suicide-burn, chopsticks
Chapter 5 星辰大海: reentry-corridor, life-support, escape-reaction, pass-the-ball, launch-window
