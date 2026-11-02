// Placeholder photography from Pexels (free licence). Swap each id for
// Venus' own work when it is ready — every image on the site comes from here.
export const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export const site = {
  name: "Venus",
  tagline: "The Photography Company",
  phone: "+91 98400 00000",
  email: "hello@venusphotography.in",
  studio: "Studio 7, Khader Nawaz Khan Road, Nungambakkam, Chennai 600006",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Pinterest", href: "#" },
  ],
};

export const nav = [
  { label: "Stories", href: "#stories" },
  { label: "Services", href: "#services" },
  { label: "Album", href: "#album" },
  { label: "Archive", href: "#archive" },
  { label: "Films", href: "#films" },
  { label: "Journal", href: "#journal" },
];

export const heroSlides = [
  { src: px(20775588), place: "Muhurtham · Chennai", alt: "Bride and groom seated with garlands during a South Indian wedding ritual" },
  { src: px(19613670), place: "Reception · Bengaluru", alt: "Newlywed Indian couple in traditional attire" },
  { src: px(30458566), place: "Bridal portrait · Chennai", alt: "South Indian bride in a pink silk saree with gold jewellery" },
  { src: px(17657612), place: "Vows · Coimbatore", alt: "Indian couple embracing at an outdoor wedding" },
  { src: px(18361996), place: "Night ceremony · Pondicherry", alt: "Newlyweds under a decorated pavilion at night" },
];

export const rituals = [
  "Nichayathartham", "Muhurtham", "Kanyadaanam", "Mehendi", "Haldi",
  "Sangeet", "Baraat", "Saptapadi", "Oonjal", "Nalangu", "Pheras", "Reception",
];

export const services = [
  { no: "01", title: "Candid Wedding Photography", text: "Unposed, unhurried frames of the glances, tears and laughter between the rituals.", tags: ["Two lead photographers", "Full-day coverage"], img: px(38922738) },
  { no: "02", title: "Cinematic Wedding Films", text: "Feature-length films and a three-minute teaser scored and graded like cinema.", tags: ["4K · drone", "Same-day edit"], img: px(27443997) },
  { no: "03", title: "Pre-Wedding Stories", text: "A styled shoot at a location that means something to the two of you.", tags: ["Concept & styling", "Outfit changes"], img: px(36497421) },
  { no: "04", title: "Destination Weddings", text: "Palaces, temple towns and beaches — we travel with the whole crew.", tags: ["India & abroad", "Recce included"], img: px(33417236) },
  { no: "05", title: "Engagement & Nichayathartham", text: "The first promise, the families meeting, the first ring — told gently.", tags: ["Half-day", "Family portraits"], img: px(39625024) },
  { no: "06", title: "Haldi, Mehendi & Sangeet", text: "Turmeric, henna and dance floors captured in all their colour and chaos.", tags: ["Multi-event", "Colour-graded"], img: px(27960941) },
  { no: "07", title: "Heirloom Albums", text: "Hand-bound linen and leather albums printed on archival fine-art paper.", tags: ["Lay-flat spreads", "Lifetime print"], img: px(25489380) },
];

export const albumPages = [
  { kind: "cover" as const },
  { kind: "note" as const, text: "For the ones who will turn these pages long after us." },
  { kind: "photo" as const, src: px(35441120), caption: "The morning of the Muhurtham" },
  { kind: "photo" as const, src: px(30458555), caption: "Under the mandapam" },
  { kind: "photo" as const, src: px(40541299), caption: "Mehendi, the night before" },
  { kind: "photo" as const, src: px(20493946), caption: "Kanjeevaram & temple gold" },
  { kind: "photo" as const, src: px(32060316), caption: "First laugh as a married pair" },
  { kind: "photo" as const, src: px(4128977), caption: "Saptapadi — seven steps" },
];

export const albumChapters = [
  "Chapter I — The Cover",
  "Chapter II — Before the Muhurtham",
  "Chapter III — The Night of Henna",
  "Chapter IV — Seven Steps",
];

export const stats = [
  { value: 640, suffix: "+", label: "Weddings documented", pct: 0.82 },
  { value: 310, suffix: "+", label: "Films crafted", pct: 0.64 },
  { value: 42, suffix: "", label: "Cities & destinations", pct: 0.48 },
  { value: 12, suffix: " yrs", label: "Behind the lens", pct: 0.9 },
];

export const stories = [
  { names: "Meera & Arjun", place: "Mylapore, Chennai", src: px(30458521), x: 4, y: 10, r: -7 },
  { names: "Kavya & Rohan", place: "Udaipur", src: px(35069916), x: 22, y: 28, r: 5 },
  { names: "Divya & Karthik", place: "Madurai", src: px(19609201), x: 40, y: 6, r: -3 },
  { names: "Ananya & Vikram", place: "Goa", src: px(20518451), x: 57, y: 30, r: 8 },
  { names: "Lakshmi & Surya", place: "Thanjavur", src: px(39168358), x: 74, y: 8, r: -6 },
  { names: "Nila & Pranav", place: "Coimbatore", src: px(12153938), x: 62, y: 50, r: 4 },
];

export const galleryFilters = ["All", "Wedding", "Pre-Wedding", "Candid", "Destination", "Haldi & Mehendi"] as const;
export type GalleryFilter = (typeof galleryFilters)[number];

export const gallery: { src: string; cat: Exclude<GalleryFilter, "All">; alt: string; shape: "tall" | "wide" | "sq" }[] = [
  { src: px(10440232), cat: "Wedding", alt: "Couple during the wedding ceremony", shape: "wide" },
  { src: px(17841215), cat: "Wedding", alt: "South Indian bride portrait, Chennai", shape: "tall" },
  { src: px(30458530), cat: "Pre-Wedding", alt: "Bride with bouquet in a green forest", shape: "wide" },
  { src: px(16314538), cat: "Candid", alt: "Couple sharing a quiet moment", shape: "sq" },
  { src: px(33508474), cat: "Destination", alt: "Marigold archway at an outdoor venue", shape: "tall" },
  { src: px(29984888), cat: "Haldi & Mehendi", alt: "Haldi ceremony around the bride", shape: "tall" },
  { src: px(8804917), cat: "Wedding", alt: "Couple at their wedding ceremony", shape: "wide" },
  { src: px(30458524), cat: "Pre-Wedding", alt: "Bride posing in lush greenery", shape: "tall" },
  { src: px(27906415), cat: "Candid", alt: "Joyful couple in traditional attire", shape: "sq" },
  { src: px(34079355), cat: "Destination", alt: "Floral mandap with chandeliers", shape: "wide" },
  { src: px(13273850), cat: "Haldi & Mehendi", alt: "Henna and turmeric on hands", shape: "sq" },
  { src: px(38982424), cat: "Wedding", alt: "Couple at a night ceremony", shape: "tall" },
  { src: px(27114962), cat: "Pre-Wedding", alt: "Couple adorned with flower garlands", shape: "tall" },
  { src: px(30458515), cat: "Candid", alt: "Bride outdoors in traditional jewellery", shape: "tall" },
  { src: px(31307953), cat: "Destination", alt: "Outdoor setup with pink florals", shape: "wide" },
  { src: px(13156145), cat: "Destination", alt: "Wedding stage with a floral arch", shape: "sq" },
  { src: px(38259809), cat: "Haldi & Mehendi", alt: "Henna and red bangles close-up", shape: "wide" },
];

export const films = [
  { title: "A Mylapore Morning", couple: "Meera & Arjun", place: "Chennai", length: "04:52", stills: [px(18361996), px(19613670), px(20775588)] },
  { title: "Salt, Sand & Sindoor", couple: "Ananya & Vikram", place: "Goa", length: "06:10", stills: [px(27443997), px(13078094), px(32309613)] },
  { title: "The Temple Town Vows", couple: "Divya & Karthik", place: "Madurai", length: "05:24", stills: [px(13078094), px(10440232), px(8804917)] },
];

export const journey = [
  { title: "The first conversation", text: "Coffee or a video call — we listen to your story, families and rituals before we talk packages.", icon: "chat" },
  { title: "Planning the frames", text: "A shot list built around your muhurtham timings, venues, light and the people who matter.", icon: "plan" },
  { title: "Pre-wedding shoot", text: "A relaxed day together so you are at ease in front of our lenses well before the big one.", icon: "camera" },
  { title: "The wedding days", text: "Lead photographers, cinematographers and drone crew — quietly everywhere, never in the way.", icon: "rings" },
  { title: "Curating & grading", text: "Every frame hand-picked and colour-graded. Teaser within a week, full gallery in six.", icon: "reel" },
  { title: "Your heirloom album", text: "Designed with you spread by spread, printed archival and hand-bound to last generations.", icon: "book" },
] as const;

export const testimonials = [
  { quote: "They knew every ritual before it happened. Our parents still call the album 'the treasure'.", names: "Meera & Arjun", place: "Chennai · 2025", src: px(14311014) },
  { quote: "We forgot the cameras were there — then cried watching the film. It felt like our wedding, only more beautiful.", names: "Kavya & Rohan", place: "Udaipur · 2025", src: px(39168358) },
  { quote: "Three days, four events, two families and not one missed moment. Calm, kind and wildly talented.", names: "Lakshmi & Surya", place: "Thanjavur · 2024", src: px(35441120) },
  { quote: "The pre-wedding shoot felt like a holiday with friends. The photos look like a film poster.", names: "Nila & Pranav", place: "Coimbatore · 2024", src: px(30458555) },
];

export const journal = [
  { title: "Planning a temple wedding in Tamil Nadu: light, timings & etiquette", cat: "Guides", date: "Oct 2026", src: px(12718058) },
  { title: "Why we shoot marigold mandaps at golden hour", cat: "Behind the lens", date: "Sep 2026", src: px(11255470) },
  { title: "Meera & Arjun — a Mylapore wedding in Kanjeevaram silk", cat: "Real weddings", date: "Aug 2026", src: px(26186201) },
  { title: "Choosing your heirloom album: linen, leather or silk?", cat: "Albums", date: "Jul 2026", src: px(25489380) },
];

export const faqs = [
  { q: "How early should we book Venus for our wedding?", a: "Muhurtham dates fill fast — most couples book 8 to 12 months ahead. Peak season (November to February) often closes a year in advance, so reach out as soon as your date is fixed." },
  { q: "Do you cover South Indian and North Indian rituals?", a: "Yes. Our team has covered Tamil, Telugu, Kannada, Malayali, Marwari, Punjabi and Bengali weddings — we study your ceremony order before the day so nothing sacred is missed." },
  { q: "Do you travel for destination weddings?", a: "Always. We travel across India and abroad; travel and stay are quoted transparently, and a location recce is included for destination packages." },
  { q: "When will we receive our photos and film?", a: "A sneak peek within 72 hours, the teaser within a week, the full graded gallery in about six weeks and the feature film in ten to twelve weeks." },
  { q: "What is included in the heirloom album?", a: "A lay-flat album of 40 to 80 spreads on archival fine-art paper, bound in linen, leather or raw silk — designed together with you and printed to last generations." },
  { q: "How do we reserve our date?", a: "Send us an inquiry with your date and city. We will set up a call, share a tailored proposal and reserve the date on a signed agreement with a 30% advance." },
];

export const inquiryServices = ["Candid Photography", "Cinematic Film", "Pre-Wedding", "Destination", "Heirloom Album", "Drone"];
