# launch-workshops — deck design rules

Standing decisions for custom HTML decks under `decks/<name>/`. Apply to all new decks unless a deck explicitly opts out.

## PDF download

Use **html2canvas + jsPDF** (CDN, client-side, on-demand). Do **not** use `window.print()` or `@media print` for the user-facing PDF download.

**Why:** Chrome's print pipeline converts CSS px → PostScript pt at 96/72 ratio. Slide pages at 1440×810px = 1080×607.5pt (fractional), so Chrome rounds page heights and drift accumulates — visible misalignment by slide 5–6 and worse beyond. We exhausted CSS fixes (`@page` sizing, `break-inside:avoid`, `justify-content:flex-start`, fixed-px padding, block layout) — none of them resolve it because the root cause is in Chrome's print layout engine, not our CSS.

**Pattern** (working reference: [decks/xla-by-design-customer/index.html](decks/xla-by-design-customer/index.html)):

```html
<script src="https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
<button class="print-btn" id="pdfBtn">↓ PDF</button>

<script>
document.getElementById('pdfBtn').addEventListener('click', async () => {
  await document.fonts.ready;
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  const slides = [...document.querySelectorAll('.slide')];
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1440, 810], hotfixes: ['px_scaling'] });
  for (let i = 0; i < slides.length; i++) {
    const canvas = await html2canvas(slides[i], {
      width: 1440, height: 810,
      windowWidth: 1440, windowHeight: 810,
      scale: 2, useCORS: true, backgroundColor: null, logging: false,
    });
    if (i > 0) pdf.addPage([1440, 810], 'landscape');
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, 1440, 810);
  }
  pdf.save('Deck-Name.pdf');
});
</script>
```

**Rules:**
- Always `await document.fonts.ready` before capturing — fonts loading mid-capture produce visible reflow.
- Always force `.reveal` (and any other animation-gated) classes on before capture so slides aren't blank.
- `windowWidth: 1440, windowHeight: 810` is required — without it, html2canvas captures at the visitor's actual viewport and vh/vw padding will be wrong on mobile.
- `scale: 2` for crisp output. Higher scales blow up file size with no visible gain.
- Show progress on the button (`Generating N/12…`) — capture takes 5–15s for a 12-slide deck.
- Output JPEG at 0.92 quality — produces ~50KB per slide. PNG is 3–4× larger with no quality benefit for screen decks.

**Trade-off accepted:** PDF text is rasterized (not selectable/searchable). Acceptable for sales/marketing decks. If a deck needs selectable text (e.g. legal, contract attachments), revisit.

## Mobile chrome (footer + L-mark)

Absolutely-positioned chrome at `left:7vw` (footer) and `right:7vw` (L-mark) collides on narrow viewports because:
- Footer text "Launch by NTT DATA · Digital Workplace Services" wraps to 2 lines under ~375px width, growing taller and overlapping slide content.
- L-mark at 26×26px looks oversized next to compressed footer text.

**Rule:** every deck must include a `<640px` breakpoint that scales both proportionally:

```css
@media(max-width:640px){
  .foot{font-size:.55rem;letter-spacing:.1em}
  .lmark{width:16px;height:16px}
}
```

**Why those values:** `.55rem` keeps the footer on one line at 375px (267px wide, well under the `calc(100% - 14vw - 36px)` max). 16×16 L-mark matches the ~13px footer text height with 3px breathing room. Tested on iPhone SE width (375px); 40px clearance between footer text and L-mark.

Also keep the existing `.foot { max-width: calc(100% - 14vw - 36px) }` as a safety net — without it, longer footer text overflows into the L-mark even at the smaller font size.
