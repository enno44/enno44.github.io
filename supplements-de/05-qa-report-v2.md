# QA Report v2 (verification round): KLARDOSIS Prototype

*Prepared by: qa-agent | Date: 2026-11-20 | Checked: `04-prototype/index.html` (after the developer fix) | Against: `02-strategy.md`, `03-copywriting.md` (updated), previous report `05-qa-report.md`, Regulation (EC) No 1924/2006 and the Union list (Reg. (EU) No 432/2012). This was a read-only review. I did not change the prototype or any other file. This is a QA view, not legal advice. The Phase 0 food-law review makes the final call.*

---

## Status of the previous 🔴 item

| v1 item | Status |
|---|---|
| 🔴 1. "gut health" / "women's health" used as non-specific health claims (card `#clean`) | **Partly fixed.** "gut health" is now "a cultures-and-botanicals formula". This is purely descriptive and acceptable. "women's health bundle" is now "a women's bundle for cycle and menopause". The phrase "for cycle and menopause" still creates a health link (see 🔴 1 below). |

---

## 🔴 Must fix

### 1. "a women's bundle for cycle and menopause" is still an implied health claim
- **Where:** `<article class="card" id="clean">`, `<p>`, line 139: *"...a cultures-and-botanicals formula and a women's bundle for cycle and menopause."* The same text appears in `03-copywriting.md`, selling point 3 (line 38).
- **Problem:** Art. 2(2)(5) of Reg. 1924/2006 defines a health claim as any wording that "states, suggests or implies" a link between a food and health. Saying a supplement is "for" the menstrual cycle and the menopause implies that it supports those body processes, or eases the symptoms that come with them. That makes it a **general, non-specific health claim** under Art. 10(3), and the page has **no specific authorised claim next to it**. The risk is higher here than usual for three reasons:
  - Menopause-related wording for botanicals (for example red clover, black cohosh or monk's pepper) falls under the "on-hold" botanical claims. These are not authorised and are a common target for Abmahnungen in Germany.
  - It breaks the project's own rule in the `03-copywriting.md` compliance notes: "name products by what they contain, never by a health outcome."
  - It is the same type of problem as the v1 🔴. The fix moved the health reference from the noun ("women's health") into a purpose phrase ("for cycle and menopause").
- **Self-correction:** the v1 report suggested this exact wording as a fix. That suggestion was wrong. The developer and copywriter followed QA's advice, so this is not their mistake.
- **Fix (pick one):**
  - **(a) Recommended:** drop the purpose phrase and name the product by its target group or its contents. For example: *"...a cultures-and-botanicals formula and a women's bundle."* Or: *"...and a women's bundle with [named vitamins/minerals]."*
  - **(b)** Keep a reference to cycle or menopause only if a **specific authorised Union-list claim** is placed right next to it, for an ingredient that is actually in the bundle. One example: vitamin B6 "contributes to the regulation of hormonal activity", which is only allowed if the product contains enough B6 for that claim. The legal reviewer must choose and approve the claim.
  - Make the same change in `03-copywriting.md` (selling point 3). Also add a line to its compliance notes saying that purpose phrases such as "for menopause", "for the cycle", "for digestion" or "for the gut" are not allowed without an authorised claim.

*Rest of the claims sweep: no other health claims were found. "cultures-and-botanicals formula" only names the contents. It avoids "probiotic", which the EU Commission guidance treats as an implied health claim, so it is acceptable. "Clean formulas", "No sweeteners", "Minimal additives" and "Vegan wherever possible" are not health claims. "We only use health claims authorised by the EU" (card 4) is a statement about company policy and is still acceptable. The new pack mark, "Dosed within BfR guidance", comes with a clear disclaimer saying it is not a BfR approval, so it is acceptable.*

---

## 🟡 Should fix

Earlier 🟡 items that are still open, with their v1 numbers:

1. **(v1 #3) Test data is cited without a source.** `#dosing`: "Recent consumer tests found that half of 28 magnesium products..." still gives no source. Add "Öko-Test 06/2026" (strategy §1), for example as a footnote. This matters for UWG compliance and for credibility.
2. **(v1 #4) "So we test them ourselves" can still read as full safety testing.** `#batch`, line 134. The next sentence limits the scope to heavy metals and contaminants, but the sentence on its own still sounds like a general safety test. Suggestion: "So we test every batch for heavy metals and contaminants ourselves."
3. **(v1 #5) Features in the present tense do not exist yet.** QR codes and lab reports, per-delivery certificates, and the "who does not need this" product pages are all described as if they already exist. The demo banner covers this for now. These features must exist before the page goes live.
4. **(v1 #7) Language and market.** The page still uses `lang="en"` and English copy. A production version needs German copy, `lang="de"` and the German slogan "Die richtige Dosis. Belegt.". This is acceptable for the demo.
5. **(v1 #8) Impressum and Datenschutz are missing.** They are still not in the footer. Add them before any public use.
6. **(v1 #10) The 30–60 women segment gets little space.** It is still mentioned only in the product list. This is acceptable for the D2C launch.

New 🟡 item:

7. **The strategy document is out of date compared with the copy and the page.** `02-strategy.md` still uses the wording that the copy has now dropped:
   - "BfR-compliant" mark (§3 differentiator 1, line 56)
   - "BfR-compliant dosing" mark in Amazon listings (Phase 2, line 108)
   - "dosed below the BfR maximum levels" (positioning, line 13), where the copy now says "at or below"
   - "Gut health product" and "Women's health bundle" (product range, lines 77–78)

   The page itself is fine. The risk is that someone later reuses these terms from the strategy, for example in an Amazon listing or an influencer brief. Suggestion: ask strategy-agent to align these terms, or add a note that the copy compliance notes override them.

---

## 🟢 Passed

**Fixed since v1:**
- **v1 🟡 #1 "BfR-compliant dosing":** changed to "Dosed within BfR guidance". It now has an explicit disclaimer: "it is not an approval or certification by the BfR". Fixed.
- **v1 🟡 #2 Mixed dosing terms:** the hero `p.sub`, the `#dosing` `<h3>` and its body text all use "at or below" now. The text "exceeded the BfR recommendation" refers to competitors, so it is correct. Fixed.
- **v1 🟡 #6 Hero secondary link had no visible demo note:** a visible `span.demo-note` ("Demo: scrolls to card 2 below") has been added, and its target (`#batch` = card 2) is correct. Fixed.
- **v1 🟡 #9 Low contrast of `.demo-note`:** the colour is now #6b5310 on #f7f8f6, roughly 7:1, which passes WCAG AA. Fixed.
- **v1 🔴 #1 "gut health":** replaced by the descriptive "cultures-and-botanicals formula". Fixed. "women's health" is still open, see 🔴 1.
- **`03-copywriting.md`:** updated in line with the page. It has a new compliance note on product names (Art. 10(3)) and on the standard "at or below" wording.

**Still passing (re-checked):**
- **HTML syntax:** the new `<div>` wrapper inside `.actions` (lines 114–117) is properly closed. All tags are closed and nested correctly. Every `id` is unique. All anchors (`#top`, `#why`, `#essentials`, `#dosing`, `#batch`, `#clean`, `#honest`) resolve. No empty `href`.
- **No forgotten placeholders.** All three demo links have visible demo notes, and there is a top banner and a footer disclosure.
- **Consistency with the copy:** every visible text block on the page matches the updated `03-copywriting.md` word for word (slogan, headline, subheadline, CTAs, all four cards, supporting line, alternative CTA).
- **Consistency with the strategy:** the positioning, the five differentiators, the focused four-product range, the exclusion of kids' products, D2C subscriptions and "Dose Check" are all kept. The only gap is the wording drift described in 🟡 7.
- **Compliance notes followed:** no reference to passing Öko-Test or Stiftung Warentest, no "the only brand that...", no "legally approved", no disease or miracle claims, and the trademark and legal-review disclaimers are in the footer.
- **CTAs and mobile layout:** both primary `.btn` buttons are clear. In the `@media (max-width: 720px)` view the grid becomes one column and the buttons go full width. `flex-wrap` on the header and `.actions` and `clamp()` on the h1 are unchanged. The added wrapper `div` stacks the link and its note properly on small screens.

---

## Summary: deliverable or not

**Not yet deliverable. One 🔴 issue remains.** The fix removed "gut health" correctly. But "women's health" became "a women's bundle for cycle and menopause", which is still an implied non-specific health claim under Art. 10(3) of Reg. 1924/2006, with no authorised claim next to it. This wording came from QA's own v1 suggestion, which was a mistake. Changing it to "a women's bundle" (or naming its contents) on the page and in `03-copywriting.md` is a one-line fix. After that, the prototype can be handed over as a teaching demo.

Four of the ten v1 🟡 items are fixed (#1, #2, #6, #9). Six are still open and are not blocking for the demo. There is also one new 🟡 item: the old "BfR-compliant" and "gut/women's health" terms are still in `02-strategy.md`.
