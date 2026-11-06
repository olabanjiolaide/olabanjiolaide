# Portfolio design references

- UI/UX Pro Max: academic researcher portfolio editorial search; minimal editorial hierarchy, consistent spacing, larger readable labels, generous interaction targets, reduced-motion support.
- 21st.dev: Bento Card by 0xUrvish, https://21st.dev/@0xUrvish/components/bento-card (demo 10457). Retrieved through the connected 21st.dev app. The interactive preview-switching pattern is reimplemented in vanilla HTML/CSS/JavaScript for this static website; no React or Motion runtime is required. Sample dashboard data from the reference is not used.

## Validation

- JavaScript syntax check.
- Browser: Workspace, All requests, and Resolved screenshots load; pointer and Space-key activation work.
- Desktop preview has no horizontal overflow.
- 375px and 768px iframe layout checks show no horizontal overflow after correcting the hero background.
- Motion is optional, with the existing reduced-motion handling retained. Preview controls stay hidden without JavaScript, leaving the initial screenshot available.
