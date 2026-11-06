# Portfolio mobile and accessibility audit

Date: 2026-11-06

Scope: homepage and Support Ticket AI case study, Chrome desktop browser with narrow iframe viewports. This is a targeted engineering check, not a WCAG conformance certification or an assistive-technology user study.

## Findings and fixes

- At 320px frame width, the homepage header wrapped to 169px while the anchor offset was 110px. Headers now scroll with the page below 600px; small-screen anchor offsets are 24px. Desktop navigation remains sticky.
- Both skip links now target a main element with tabindex=-1. Keyboard Tab revealed the skip link with a solid focus outline; Enter transferred focus to main.
- The project screenshot link uses an inset focus outline so its containing overflow does not clip the indicator.
- Enlarged text exposed horizontal overflow in the name heading. Headings, descriptive grid cells, buttons, and preview controls now allow text to reflow.

## Checks

- Homepage at 320 and 375px, case study at 320 and 768px: document scroll width equaled client width (310/310, 365/365, 310/310, 758/758 with the browser scrollbar).
- Additional 320px fixtures enlarged body text and links to approximately twice their normal mobile size, including a 120px name heading. Both pages then remained 310/310. These are CSS enlargement fixtures, not a verified browser text-zoom setting.
- Main text contrast calculations: muted on paper 5.48:1; muted on section band 5.14:1; green on paper 6.43:1; paper on dark ink 12.96:1. This checks these colour pairs, not every possible state.
- Images on the two pages have alt attributes.
- Screenshot controls can be activated with Enter. Source retains reduced-motion handling and semantic button state.

## Limits

No real-device, screen-reader, forced-colours, or cross-browser certification was performed. Browser zoom shortcuts did not change the reported viewport in this environment, so zoom was checked through the explicitly described enlargement fixtures instead. Temporary audit fixtures are not deployed.
