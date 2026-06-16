# Source: FadiaR/epso-ad5-digital-prep

- **Repo:** https://github.com/FadiaR/epso-ad5-digital-prep
- **License:** MIT
- **Pulled:** 2026-06-16
- **Original file:** `digital.v1.0.json` (292 questions; repo also includes
  `additional_questions.json`, not yet converted — pull separately if needed)
- **Converted file:** `epso-digital-skills-external.json` (this repo's schema)
- **Conversion script:** `convert_fadiar.py`

## Schema differences from native `/epso-digital-skills.json`

The original source uses a flat schema with no language field:
`{ theme, q, opts[], a, exp }` — English only.

This was converted into this repo's native bilingual shape
(`{ en: {...}, el: {...}, theme }`) so it can be loaded with the same
loader logic as the native Digital Skills sets. **The `el` block is
present but intentionally empty** — these questions have NOT been
translated or reviewed in Greek. Do not surface this set in a Greek-only
UI flow until translated.

## Do not merge with native set

This set (`ds_ext_*` keys) is feature-different from the native
`ds_*` Digital Skills set: different question style (FadiaR's are
shorter/scenario-based with a `theme` tag per question; native set
has no theme tagging and includes longer scenario-based items with
distractor analysis). Keep them as separate selectable tracks in the
portal rather than combining into one scored pool.

## Attribution

Per MIT license terms, the original LICENSE file should travel with
this content. Credit FadiaR in the main repo README under a
"Third-party content" or "Acknowledgements" section.

