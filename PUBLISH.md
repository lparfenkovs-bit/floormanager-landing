# GitHub Sync Prep

The landing site is staged locally and organized for a straight GitHub sync once the repository write limit clears.

## Files to sync

- `index.html`
- `features.html`
- `pricing.html`
- `contact.html`
- `styles.css`
- `app.js`
- `README.md`

## Windows-safe publish flow

```powershell
git status
git add index.html features.html pricing.html contact.html styles.css app.js README.md PUBLISH.md
git commit -m "Build multi-page floormanager landing site"
git push origin main
```

## Notes

- The current session could not write to GitHub because the app hit a usage limit.
- No production or data-related files are touched here.
- The site structure is now split by page, so the repo can be synced without further restructuring.
