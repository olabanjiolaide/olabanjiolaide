# Portfolio design system

## Purpose and audience
An academic and applied AI portfolio for research collaborators and employers. Help visitors understand Olabanji Olaide's interests, inspect public project evidence, and reach his professional profiles. Unpublished work stays private.

## Visual identity
Preserve the deep green and warm paper palette, authentic portrait, plain project descriptions, and interactive screenshot showcase. Use Newsreader for editorial display typography and the native sans-serif stack for readable body copy and controls. Newsreader is self-hosted under the SIL Open Font License.

## Tokens and composition
Ink #123039; muted #53686d; paper #f7f7f2; green #326351; accent #d5eb91; line #dce3dc. Maximum content width 1160px. Gutters 32px desktop and 18px phone. Main spacing scale: 8, 16, 24, 32, 48, 64px. Display tracking no tighter than -0.025em. Content headings describe sections directly; omit decorative section numbering and kicker labels. Research reads as editorial rows, not repeated equal cards.

## Motion and interaction
One entrance treatment on the project description. Preview switching is the main motion event; pointer-triggered transitions use 180ms ease-out. Keyboard-triggered screenshot changes are immediate. Gate hover transforms to fine pointers. Preserve reduced-motion support and visible keyboard focus. Never hide content until scripts load. No autoplay, cursor followers, or perpetual decorative loops.

## Assets and truth
Use the supplied portrait and real project screenshots. Retain descriptive alt text, screenshot captions and synthetic-data evaluation limits. Do not fabricate publications, awards, dates, statistics, or demonstrations. Preserve working GitHub and LinkedIn destinations.

## References
getdesign.md informed this durable specification; no third-party brand identity is copied. Impeccable informed hierarchy and refinement. Emil Kowalski's emil-design-eng informed input-specific animation, easing, and touch hover behavior. Taste Skill is installed as an optional art-direction reference; its commercial-site and browser-runner assumptions are not the workflow for this academic portfolio.

## Project demo discoverability
When a project has a public interactive experience, show a high-contrast, always-visible demo button beside its title/summary and a secondary case-study link. Repeat the demo entry in the screenshot toolbar when the preview precedes the summary, and in the case-study introduction. Do not bury it among repository or setup links, depend on hover, or use motion to attract attention. Keep touch targets at least 44px and wrap controls on phones. Label the actual experience: browser walkthrough, recorded replay, or hosted model inference. State synthetic/no-inference limits beside the CTA. Use “Run locally” for setup instructions so they cannot be mistaken for the public demo. Do not show a live-demo CTA for an unavailable service or private repository.
