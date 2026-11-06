# Portfolio performance baseline

Measured 2026-11-06 with Google PageSpeed Insights, mobile Lighthouse 13.6.0, emulated Moto G Power, slow 4G, initial page load. One lab run per page; these are not real-user percentiles. PageSpeed reported no field data.

| Metric | Homepage | Support Ticket AI case study |
|---|---:|---:|
| Performance | 100 | 100 |
| Accessibility (automated checks) | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 0.8 s | 0.8 s |
| Largest Contentful Paint | 0.8 s | 1.9 s |
| Total Blocking Time | 0 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 2.1 s | 0.8 s |

Homepage report: https://pagespeed.web.dev/analysis/https-olabanjiolaide-github-io-olabanjiolaide/rskov2v5ok?form_factor=mobile

Case study report: https://pagespeed.web.dev/analysis/https-olabanjiolaide-github-io-olabanjiolaide-support-ticket-ai-html/8a4ka8zlci?form_factor=mobile

## Changes guided by the reports

- Added explicit screenshot dimensions (1440 by 1394) to both pages. Preview switches update dimensions from the newly loaded screenshot.
- Changed the case study screenshot from lazy to eager loading with high fetch priority because Lighthouse identified it as the LCP element.

These measurements precede those changes. No before/after speed gain is claimed. Further opportunities include responsive image variants and screenshot delivery. GitHub Pages and raw.githubusercontent.com control their response cache headers. Avoid adding dependencies or a new hosting layer solely to remove low-impact diagnostics when the measured result is already good.

A score of 100 is not proof of full accessibility or universal device performance. Retain manual keyboard and real-device checks.
