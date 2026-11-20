# QA Report: KLARDOSIS Prototype

*Prepared by: qa-agent | Date: 2026-11-20 | Checked: `04-prototype/index.html` | Against: `02-strategy.md`, `03-copywriting.md`, Regulation (EC) No 1924/2006 (health claims) and the Union list (Reg. (EU) No 432/2012). Read-only review; the prototype was not modified.*

---

## 🔴 Must fix

### 1. Non-specific health claims "gut health" and "women's health" with no authorised claim alongside
- **Where:** `<article class="card" id="clean">` (selling point 3), `<p>`, sentence: *"A small, focused range: magnesium, vitamin D, gut health and a women's health bundle."*
- **Problem:** Under Art. 2(2)(5) of Reg. 1924/2006, any wording that states or implies a link between a food and health counts as a health claim. "Gut health" (for the gut product) and "women's health" (for the bundle) imply that these products benefit the health of the gut and women's health in general. That makes them **general, non-specific health claims** (Art. 10(3)). These are only allowed when a **specific authorised claim from the Union list sits right next to them**. The page has no such claim. For the gut product it is worse. The strategy itself says that probiotic and botanical ingredients have "limited authorised claims", and the EU has authorised no claim for probiotics or gut flora. German competitors (TQG / More Nutrition) have already lost claims cases [strategy §2], so this is a real Abmahnung risk.
- **Copy origin:** this sentence comes word for word from `03-copywriting.md`, selling point 3. That file also says the gut-health copy should stay "descriptive only until regulatory review is done". The page is consistent with the copy, but the copy itself breaks that rule.
- **Fix:** name the products by what they contain, not by a health outcome. For example: *"magnesium, vitamin D, a culture-and-fibre formula and a women's bundle for cycle and menopause"*, with final names set after the food-law review in Phase 0. You could also keep the terms and add a specific authorised claim from the Union list right next to each one, for example a vitamin/mineral claim for an ingredient in the women's bundle. That claim has to be chosen and approved by the legal reviewer. Please update `03-copywriting.md` as well, so the wording is not used again.

*No other health claims were found. The page makes no statement about what magnesium, vitamin D or any ingredient does in the body. "We only use health claims authorised by the EU" (card 4) is a statement about our policy, not a health claim. It is acceptable as long as it stays true across the live site.*

---

## 🟡 Should fix

1. **"BfR-compliant dosing" may read as a legal approval.** `#dosing` card: *Look for the "BfR-compliant dosing" mark on every pack.* BfR values are recommendations, not legal limits (copy compliance note: do not call it "legally approved dosing"). "Compliant" suggests that a rule is being met. Suggestion: "Dosed below BfR recommendations" or "Within BfR guidance". Have the label wording checked in the Phase 0 claims review.
2. **The page uses mixed terms for the same idea.** The hero `p.sub` says *"below the maximum levels recommended by ... BfR"*. The `#dosing` `<h3>` says *"Dosed to BfR recommendations, not beyond them"*. The body says *"below the BfR maximum levels"* and *"at or below 250 mg"*. "Below" and "at or below" are not the same thing. Pick one wording ("at or below the BfR maximum level proposals") and use it everywhere. This comes from the copy, so fix it in `03-copywriting.md` too.
3. **Test data is cited without a source.** `#dosing`: *"Recent consumer tests found that half of 28 magnesium products exceeded..."*. The strategy gives the source (Öko-Test 06/2026). Add it, for example as a footnote. A factual claim about competitors should be traceable (UWG / comparative advertising), and the source makes the claim more credible to a sceptical audience.
4. **"Safety-tested" wording may overstate our own testing.** `#batch` card: *"...believe supplements are safety-tested before they go on sale. They are not. So we test them ourselves."* This can be read as saying that KLARDOSIS products are safety-tested. Our tests only cover heavy metals and contaminants. Suggestion: "So we test every batch for heavy metals and contaminants ourselves."
5. **Features described in the present tense do not exist yet.** The batch QR codes and lab reports, the per-delivery certificates in `section.cta`, and the "who does not need this" product pages are all described as if they exist. That is fine for a demo, because the banner and the footer disclose it. But the page must not go live until these features are real, or the claims would be misleading.
6. **The hero secondary link has no visible demo note.** `<a class="link" href="#batch">See a batch certificate</a>` scrolls to a text card, not to a certificate. Only an HTML comment explains this. The other two demo links have a visible `span.demo-note`. Add one here too, for consistency and to avoid confusing users.
7. **Language and market.** The page uses `<html lang="en">` and is fully in English, while the target market is Germany. The copy gives a German slogan, "Die richtige Dosis. Belegt.", and the strategy requires German labels and shop information. This is acceptable for the teaching demo. A production version needs German copy and `lang="de"`.
8. **German legal pages are missing.** The footer has no Impressum or Datenschutz links. These are mandatory for a live German site (DDG / DSGVO). They are not needed for the demo, but add placeholders before any public use.
9. **Small-text contrast is low.** `.demo-note` text (#8a7a3d at 0.8rem on #f7f8f6) has a contrast ratio of about 4:1, below the WCAG AA level of 4.5:1. Darken it, for example to #6b5310, the colour the demo banner already uses.
10. **The page does not show the 30–60 women segment.** The strategy names women aged 30–60 as the secondary segment and suggests a subscription bundle for them. The page mentions the bundle only in a list. This is acceptable for the D2C launch, which targets the primary segment, but it could be featured later.

---

## 🟢 Passed

- **HTML syntax:** valid `<!DOCTYPE html>`, and all tags are properly closed and nested (`header` / `main` / `section` / `article` / `footer`). Every `id` is unique, and every in-page anchor (`#top`, `#why`, `#essentials`, `#dosing`, `#batch`, `#clean`, `#honest`) has a matching target. No broken or empty `href`.
- **No forgotten placeholders:** no lorem ipsum, TODO or "XXX". Every placeholder link is disclosed as a demo, by the top banner and the `demo-note` spans.
- **Consistency with the copy (`03-copywriting.md`):** the slogan, hero headline, subheadline, both hero CTAs, all four selling points, the main CTA, the supporting line and the alternative CTA match the copy word for word.
- **Consistency with the strategy (`02-strategy.md`):** the page keeps the positioning ("right amount, proven"), all five core differentiators (BfR dosing, batch certificates, Union-list claims only, clean formulation, honest guidance), the focused four-product range, the exclusion of kids' products, the D2C subscription model and the "Dose Check" content idea.
- **Copy compliance notes followed:** the page does not say or imply that KLARDOSIS has passed Öko-Test or Stiftung Warentest, uses no "the only brand that..." wording, does not call the dosing "legally approved", and makes no disease or miracle claims. The footer discloses that the trademark is unchecked and that the copy is pending legal review.
- **CTAs:** the primary buttons ("Check our dosing", "Find your KLARDOSIS essentials") are clear and visually distinct (`.btn`). The secondary actions are styled as links.
- **Mobile layout:** the viewport meta tag is present. `@media (max-width: 720px)` switches `.grid` to one column and makes `.btn` full width. The header and `.actions` use flex with `flex-wrap`, the h1 uses `clamp()`, and `.wrap` has a 20px side gutter. No fixed widths that could cause horizontal scrolling.
- **Basic accessibility:** `nav` has an `aria-label`, the heading order (h1 → h2 → h3) is correct, and the main text contrast is adequate.

---

## Summary: deliverable or not

**Deliverable as a teaching demo after one fix.** The markup is clean, the content matches the copy and the strategy, and the layout is responsive. One 🔴 issue remains: the product-range sentence uses **"gut health"** and **"women's health"** as non-specific health claims with no authorised specific claim next to them, which goes against Art. 10(3) of Reg. 1924/2006. Fix the wording on the page and in `03-copywriting.md`. After that, the prototype can be handed over. The 🟡 items, mainly the "BfR-compliant" wording, the inconsistent dosing terms and the uncited test data, should be fixed before any public or production use.
