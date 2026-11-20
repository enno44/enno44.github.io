# QA Report v3 (verification round 3): KLARDOSIS Prototype

*Prepared by: qa-agent | Date: 2026-11-20 | Checked: `04-prototype/index.html` | Against: `03-copywriting.md`, `02-strategy.md`, previous report `05-qa-report-v2.md`, Reg. (EC) No 1924/2006 and the Union list (Reg. (EU) No 432/2012). Read-only review; no file other than this report was changed. This is a QA view, not legal advice; the Phase 0 food-law review makes the final call.*

---

## Status of the v2 🔴 item

| v2 item | Status |
|---|---|
| 🔴 1. "a women's bundle for cycle and menopause" (implied non-specific health claim, Art. 10(3)) | **Resolved.** `index.html` line 139 (`article#clean > p`) now reads "...a cultures-and-botanicals formula and a women's bundle." `03-copywriting.md` selling point 3 (line 38) and the compliance note (line 76) use the same wording. No purpose phrase and no health outcome remain. This is fix option (a) from v2. |

---

## 🔴 Must fix

**None.**

Full claims sweep of the customer-facing page and the marketing copy (`03-copywriting.md`, website copy and presentation key points):
- No health claims, disease claims or purpose phrases ("for the gut", "for menopause", "for digestion", "for immunity", etc.) on the page or in the copy.
- "cultures-and-botanicals formula" and "women's bundle" only name contents or the target group. Acceptable.
- "No sweeteners", "Minimal additives", "Vegan wherever possible", "Clean formulas" are not health claims.
- "We only use health claims authorised by the EU" (card 4) is a statement of company policy. Acceptable.
- "Dosed within BfR guidance" comes with an explicit "not an approval or certification by the BfR" disclaimer. Acceptable for the demo; label wording still goes to the Phase 0 review.
- No "passed Öko-Test/Stiftung Warentest", no "the only brand that...", no "legally approved" on the page or in the copy.

The words "cycle/menopause" and "women's health (cycle, menopause)" remain only in `02-strategy.md` (lines 45 and 78), which is an internal strategy document describing a target segment and product angle. Per the review scope these are not customer-facing claims, so they are not 🔴 (see 🟡 7).

---

## 🟡 Should fix (carried over, not blocking for the demo)

1. **(v1 #3) Test data without a source.** `#dosing`: "Recent consumer tests found that half of 28 magnesium products..." still has no source. Add "Öko-Test 06/2026" (strategy §1) as a footnote (UWG, credibility).
2. **(v1 #4) "So we test them ourselves"** (`#batch`, line 134) can still read as full safety testing. Suggestion: "So we test every batch for heavy metals and contaminants ourselves."
3. **(v1 #5) Present-tense features that do not exist yet** (QR codes / lab reports, per-delivery certificates, "who does not need this" product pages). Covered by the demo banner; must exist before going live.
4. **(v1 #7) Language/market:** `lang="en"` and English copy. Production needs German copy, `lang="de"` and "Die richtige Dosis. Belegt.". Fine for the demo.
5. **(v1 #8) No Impressum / Datenschutz** in the footer. Required before any public use.
6. **(v1 #10) The women 30–60 segment** appears only in the product list. Acceptable for D2C launch.
7. **(v2 #7, partly fixed) Strategy wording drift.** `02-strategy.md` now uses "Dosed within BfR guidance" (lines 56, 108) and "Cultures-and-botanicals formula" / "Women's bundle" (lines 77–78), so most of v2 #7 is fixed. Still open:
   - Line 13 (positioning) and line 56 still say "dosed below the BfR maximum(s)", while the copy standard is "at or below".
   - Line 78 "Women's bundle (cycle/menopause)" and line 45 "bundles for women's health (cycle, menopause)": internal and acceptable, but add a note that these must not be reused in listings, packaging or influencer briefs without an authorised claim.
8. **(new) Strategy PR line conflicts with the copy compliance notes.** `02-strategy.md` line 102: "position KLARDOSIS as the brand built to pass these tests". `03-copywriting.md` compliance notes forbid stating or implying that KLARDOSIS has passed or will pass Öko-Test / Stiftung Warentest. This is internal, but it would become a problem if used in a press release. Suggest rewording, e.g. "position KLARDOSIS as the brand that welcomes independent testing".
9. **(new, minor) Copy compliance note not extended.** v2 suggested adding an explicit ban on purpose phrases ("for menopause", "for the cycle", "for digestion", "for the gut") to the `03-copywriting.md` compliance notes. Line 77 bans health-outcome names in general, which covers it in spirit; adding the explicit examples would prevent a relapse.

---

## 🟢 Passed

- **v2 🔴 1 resolved** (see table above). Page and copy match word for word.
- **HTML syntax:** all tags closed and correctly nested; ids unique; all anchors (`#top`, `#why`, `#essentials`, `#dosing`, `#batch`, `#clean`, `#honest`) resolve; no empty `href`.
- **No forgotten placeholders:** every demo link has a visible `.demo-note`; top banner and footer disclosure present (brand trademark not checked, copy pending legal review).
- **Consistency with copy:** slogan, headline, subheadline, CTAs, all four cards, supporting line and alternative CTA match `03-copywriting.md` exactly.
- **Consistency with strategy:** positioning, five differentiators, four-product range, no kids' products, D2C subscription and "Dose Check" content are all reflected.
- **CTAs and mobile:** two clear primary `.btn` CTAs; `@media (max-width: 720px)` makes the grid single-column and buttons full-width; `flex-wrap` on header and `.actions`; `clamp()` on h1. `.demo-note` contrast about 7:1.

---

## Summary: deliverable or not

**Deliverable as a teaching demo.** No 🔴 issues remain. The last 🔴 item ("a women's bundle for cycle and menopause") is fixed on the page and in the copy, and the claims sweep found no non-authorised health claims under Reg. 1924/2006 in customer-facing text. Nine 🟡 items remain open (sources, wording of the batch-testing line, features not built yet, German version, Impressum/Datenschutz, and some internal strategy wording). None of them block the demo, but items 1, 2, 4 and 5 must be fixed, along with the Phase 0 legal review, before any public or production use.
