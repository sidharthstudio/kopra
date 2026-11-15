/**
 * Single source of truth for verified business information.
 * Everything here was taken from KOPRA's Google Business listing, Instagram
 * bio, or published press coverage (The Hindu, Oct 2026).
 *
 * Fields marked `pending` must be confirmed by the business owner before launch.
 */

export const BUSINESS = {
  name: "KOPRA",
  legalName: "KOPRA — Non Alcoholic Cocktail Bar",
  tagline: "India's first non-alcoholic cocktail bar",
  shortDescription:
    "A full bar experience without alcohol — house ferments, fresh produce and Kerala's own flavours, built into cocktails from scratch.",
  phone: "+91 96336 67600",
  phoneRaw: "+919633667600",
  whatsapp: "919633667600",
  instagramHandle: "@kopraindia",
  instagramUrl: "https://www.instagram.com/kopraindia/",
  address: {
    line1: "3rd Floor, Capitol Building",
    line2: "Nalanda Lane, Nanthancodu",
    city: "Thiruvananthapuram",
    state: "Kerala",
    postalCode: "695003",
    country: "IN",
    full: "3rd Floor, Capitol Building, Nalanda Lane, Nanthancodu, Thiruvananthapuram, Kerala 695003, India",
  },
  geo: { lat: 8.5138416, lng: 76.9525209 },
  hours: {
    label: "Open daily",
    open: "07:00",
    close: "23:00",
    display: "7:00 AM – 11:00 PM, every day",
    // Google listing shows identical hours for all seven days.
    days: [
      { day: "Monday", hours: "7:00 AM – 11:00 PM" },
      { day: "Tuesday", hours: "7:00 AM – 11:00 PM" },
      { day: "Wednesday", hours: "7:00 AM – 11:00 PM" },
      { day: "Thursday", hours: "7:00 AM – 11:00 PM" },
      { day: "Friday", hours: "7:00 AM – 11:00 PM" },
      { day: "Saturday", hours: "7:00 AM – 11:00 PM" },
      { day: "Sunday", hours: "7:00 AM – 11:00 PM" },
    ],
  },
  rating: { value: 4.9, count: 38, source: "Google Business Profile", asOf: "November 2026" },
  mapsPlaceId: "ChIJF7qZCb27BTsR9XtCd9Ty98g",
  mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJF7qZCb27BTsR9XtCd9Ty98g",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=8.5138416,76.9525209&destination_place_id=ChIJF7qZCb27BTsR9XtCd9Ty98g",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=8.5138416,76.9525209&z=17&hl=en&output=embed",
  workshop: { priceInr: 699, note: "per person, no experience needed" },
} as const;

export const WHATSAPP_URL = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
  "Hello KOPRA! I'd like to know more about your non-alcoholic cocktails and table bookings.",
)}`;

export const WHATSAPP_EVENT_URL = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
  "Hello KOPRA! I'd like to book the cocktail workshop. Could you share the next available date?",
)}`;

export const FOUNDERS = [
  { name: "Arun Kumar", role: "Founder" },
  { name: "Athira J", role: "Co-founder" },
  { name: "Yeji Yesu", role: "Co-founder" },
  { name: "Renjith Reji", role: "Co-founder & Mixologist" },
  { name: "Azad K V", role: "Co-founder & Mixologist" },
] as const;

/**
 * Information the business has not published. Surfaced in the UI as
 * "on request" and listed in docs/BUSINESS-DATA.md for owner approval.
 */
export const UNCONFIRMED = {
  email: true,
  drinkPrices: true,
  bookingSystem: true,
  delivery: true,
  dressCode: true,
  petPolicy: true,
  parking: true,
  largeGroupPolicy: true,
} as const;

export const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Story" },
  { href: "/events", label: "Experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/private-events", label: "Private Events" },
  { href: "/contact", label: "Visit" },
] as const;
