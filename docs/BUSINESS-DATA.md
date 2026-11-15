# KOPRA — verified business data

Compiled November 2026. Everything the website states about KOPRA is traced to one of the sources below. Where KOPRA has not published something, the website says so and the item is listed under **Awaiting owner confirmation**.

## Sources

1. **Google Business Profile** — “KOPRA - NON ALCOHOLIC COCKTAIL BAR”, place ID `ChIJF7qZCb27BTsR9XtCd9Ty98g`, data as of 1 November 2026.
2. **Instagram** — [@kopraindia](https://www.instagram.com/kopraindia/) bio and posts.
3. **The Hindu**, 16 October 2026 — “Kopra in Thiruvananthapuram serves non-alcoholic cocktails inspired by Kerala” (Nainu Oommen).
4. **Documented tasting session**, published 1 October 2026 — drink names and ingredient lists (Mytrystwithfood).
5. **Founders Desk** and **Great Kerala** coverage, October 2026 — concept framing.
6. Google reviews (September–October 2026) — quoted in the site's reviews section.

## Verified

| Field | Value | Source |
| --- | --- | --- |
| Trading name | KOPRA — Non Alcoholic Cocktail Bar | Google, Instagram |
| Category | Non-alcoholic cocktail bar / café | Google |
| Address | 3rd Floor, Capitol Building, Nalanda Lane, Nanthancodu, Thiruvananthapuram, Kerala 695003 | Google, The Hindu |
| Phone | +91 96336 67600 | Google, Instagram |
| Opening hours | 7:00 AM – 11:00 PM, all seven days | Google, Instagram |
| Coordinates | 8.5138416, 76.9525209 | Google |
| Rating | 4.9 from 38 reviews | Google (Nov 2026) |
| Instagram | @kopraindia | Instagram |
| Positioning | “India's first non-alcoholic cocktail bar” | Instagram bio, press |
| Founders | Arun Kumar (founder); Athira J, Yeji Yesu, Renjith Reji, Azad K V (co-founders) | The Hindu |
| Mixologists | Renjith Reji and Azad K V (previously The Ivory Club) | The Hindu |
| Techniques | Fermentation, carbonation, clarification, house infusions | The Hindu, press |
| Approach | No alcohol, no syrups, no added sugars; zero-waste intent | Tasting-session review, press |
| Interior | Scarlet-tinted room with pop-culture references; bar soundtrack | The Hindu |
| Workshop | ₹699 per person, no experience needed | Instagram |
| Google reviews | Quoted on the homepage, attributed to “Google review” + month | Google |

### Menu items (name + ingredients verified)

| Drink | Ingredients | Notes |
| --- | --- | --- |
| First Night | Jasmine flower, fresh apple juice, sandalwood | Signature |
| Paadam | Kanji vellam (rice water) fermented with milk kefir, curry leaf, green chilli, shallots, raw mango, ginger | Signature; contains dairy |
| Panakam | Kombucha, long pepper, honey, Indian oregano | Signature; contains honey |
| Green Chutney (Ka) | Green chutney, kaffir lime leaf, water kefir | Signature |
| After Meal | Tepache, cumin, nannari, ashwagandha, licorice, hibiscus | Signature, digestive |
| The Breakfast | Pineapple, fresh coconut milk, Palayagodan coffee | Signature; contains coconut milk |
| House kombucha | In-house kombucha, seasonal fruit | Category item |
| Tepache | Pineapple, spice | Category item |
| Palayagodan coffee | Palayagodan coffee | Category item |
| Benne Dosa | Rice batter, butter | Food |
| Mangalore Chicken Ghee Roast Dosa | Chicken, ghee roast masala, dosa batter | Food |

Desserts exist and are praised in Google reviews, but no dessert names were published — the site says “Ask your server for today's selection” rather than inventing dishes.

## Awaiting owner confirmation

These are intentionally **not** stated as fact on the website. Provide them and they can be added in minutes.

| # | Item | Current handling on site |
| --- | --- | --- |
| 1 | **Drink and food prices (INR)** | Stored as `NULL`; rendered “Price on request”, with an explicit explanation on the menu page. Enter real prices in `/admin/menu` — the site updates immediately. |
| 2 | **Public email address** | Not shown. Contact page says “Not published — use the form or WhatsApp”. |
| 3 | **Reservation policy** (hold time, deposits, cancellations) | The site only says requests are confirmed by the team; the 15-minute hold in `lib/content.ts` (`SEATING_NOTES`) is a **proposed** policy — approve, edit or remove it. |
| 4 | **Capacity / minimum spend for private events** | Stated as “confirmed per date”. |
| 5 | **Workshop inclusions and schedule** | Price and “no experience needed” are verified; what the ₹699 includes and the next dates are shown as “on request”. |
| 6 | **Parking at Capitol Building** | FAQ marks the answer “Awaiting confirmation” and directs guests to call. |
| 7 | **Takeaway / delivery** | No online ordering implemented. The site states none is offered and invites guests to call. |
| 8 | **Vegetarian / vegan / allergy policies** | Only ingredient-derived notes are shown (dairy in Paadam, honey in Panakam, chicken in the ghee roast dosa). No blanket dietary claims. |
| 9 | **Dress code, pet policy, corkage, children** | Not mentioned anywhere. |
| 10 | **Photography** | All imagery is licensed representative photography, labelled on the gallery page. Replace via `/admin/gallery` and `/admin/menu`. |
| 11 | **Founding date / brand story details** | Site says “Opened 2026” and “Since 2026”, consistent with press and reviews. Confirm exact opening date if a precise date is wanted. |
| 12 | **Reviews** | Quoted from Google; confirm permission to reproduce reviewer text if required. |

## Claims deliberately softened

- “Zero-waste” is presented as “zero-waste intent” / “mindful use of ingredients”, not a certification.
- “No syrups or added sugar” is attributed to KOPRA's stated approach rather than stated as an ingredient audit.
- “India's first” is KOPRA's own billing (Instagram bio) and is repeated by press; it is presented as the brand's positioning.

## Updating this data

1. Business facts (address, phone, hours, socials, geo) → `lib/business.ts`.
2. Editorial copy, reviews, FAQs, principles, seating notes → `lib/content.ts`.
3. Menu, prices, events, gallery → the `/admin` dashboard (stored in `data/kopra.db`).
4. Re-run `npm run build` after code-level changes; admin edits appear immediately.
