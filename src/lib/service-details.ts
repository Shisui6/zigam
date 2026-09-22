// Full Description of Services content.
// Summary cards link through to /service-details/[slug] for the detail.

export type DetailBlock =
  | { kind: "list"; heading?: string; items: string[] }
  | { kind: "table"; heading?: string; headers: string[]; rows: string[][] }
  | { kind: "note"; text: string; linkHref?: string; linkLabel?: string };

export type ServiceDetail = {
  slug: string;
  icon: string;
  title: string;
  summary: string; // shown on the summary card
  idealFor: string;
  intro?: string;
  blocks: DetailBlock[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "errand-concierge",
    icon: "fa-bag-shopping",
    title: "Errand Concierge",
    summary:
      "Let Zigam handle the tasks that keep life moving — outsourcing routine tasks and daily responsibilities.",
    idealFor: "Busy professionals, families, elderly clients, and anyone seeking more time for what matters most.",
    intro:
      "Our Errands Service is designed to help busy individuals, families, businesses and professionals save time by outsourcing routine tasks and daily responsibilities.",
    blocks: [
      {
        kind: "table",
        heading: "Activities may include",
        headers: ["For homes", "For businesses"],
        rows: [
          [
            "Grocery shopping and home supply procurement · Pharmacy and prescription collections · Laundry and dry cleaning drop-off and pickup · Package and parcel collection and delivery · Bill payments and routine transactions · Household supply purchases · Gift shopping and delivery · Courier and dispatch coordination · Basic personal shopping assistance",
            "Collection and delivery of documents · Bank deposits and routine banking errands · Procurement of office supplies and restocking · Courier coordination and dispatch services · Collection of business permits and regulatory documents · Vendor and supplier pickups and liaison · Delivery of packages to clients and partners · Event-related purchases and logistics support · Administrative errands on behalf of businesses · Inter-office document delivery and dispatch management",
          ],
        ],
      },
    ],
  },
  {
    slug: "kitchen-operation",
    icon: "fa-utensils",
    title: "Kitchen Operation",
    summary:
      "Our professional mise en place — we handle the time-consuming groundwork so you can focus on the final cooking or the business at hand.",
    idealFor:
      "Busy households, businesses, working professionals, large families, private chefs, food content creators and food bloggers, and clients preparing for events or special occasions.",
    intro:
      "Enjoy the convenience of a well-prepared kitchen without the hassle. Our Kitchen Operation service helps clients reduce meal preparation time by handling essential food preparation and kitchen support tasks. We strictly adhere to our “Zigam Clean & Safe” hygiene protocols.",
    blocks: [
      {
        kind: "table",
        heading: "Activities may include",
        headers: ["For homes", "For businesses"],
        rows: [
          [
            "Washing and sorting vegetables · Peeling, slicing and chopping ingredients · Cleaning and preparing meats, poultry and fish · Portioning and packaging food items · Grinding, blending and basic food processing · Organising ingredients for meal preparation · Kitchen clean-up during and after food preparation · Washing dishes and kitchen utensils · Refrigerator and pantry organisation · Assistance with batch meal preparation · Preparation of bulk items for preservation (blending peppers, cleaning and marinating proteins) · Pantry organisation and expiration date monitoring · Kitchen surface sanitation and restocking of essentials",
            "Office pantry organisation · Refreshment preparation support · Fruit washing and preparation · Beverage station setup and maintenance · Kitchen and pantry inventory organisation · Washing and sanitising kitchen utensils · Preparation support for meetings and corporate events · Food preparation assistance for small businesses in the food industry (subject to regulatory requirements) · Pantry and office kitchen management · Inventory tracking for office kitchen essentials (tea, coffee, snacks)",
          ],
        ],
      },
      {
        kind: "note",
        text:
          "While Associates support meal readiness, they do not replace a professional chef or provide specialised catering services.",
        linkHref: "/booking",
        linkLabel: "Hire a Private Chef",
      },
    ],
  },
  {
    slug: "laundry-and-care",
    icon: "fa-shirt",
    title: "Wardrobe and Laundry",
    summary: "Thoughtful wardrobe and linen care, delivered with attention to detail.",
    idealFor: "Anyone who values their time and their garments.",
    blocks: [
      {
        kind: "table",
        heading: "What's included",
        headers: ["Service type", "Activities"],
        rows: [
          [
            "Machine washing & handwashing",
            "Sorting laundry by colour and fabric type · Checking care labels to ensure the correct wash settings · Cleaning clothes and household items in the washing machine · Tumble drying or hanging wash to dry",
          ],
          [
            "Ironing",
            "Ironing clothes, bed linen and other household fabrics · Checking labels for the correct heat setting · Using steam for tough wrinkles · Folding or hanging items neatly when finished",
          ],
          [
            "Folding & finishing",
            "Folding and organising clean laundry once dry · Grouping similar items together (shirts, trousers, towels) · Placing folded laundry neatly where requested",
          ],
        ],
      },
      {
        kind: "note",
        text:
          "Please specify your laundry preferences when booking. Let us know whether you would like the Associate to wash, dry and repack the linen and towels, or simply place used laundry in the designated basket. You will need to book enough time to cover the option you choose.",
      },
    ],
  },
  {
    slug: "decluttering-and-organising",
    icon: "fa-boxes-stacked",
    title: "Decluttering & Organising",
    summary:
      "Transform your space into a more functional, beautiful and stress-free environment — creating order and maximising space.",
    idealFor:
      "Individuals and businesses seeking a more organised lifestyle, families, professionals, and anyone looking to create a calmer and more productive living environment.",
    blocks: [
      {
        kind: "table",
        heading: "Activities may include",
        headers: ["For homes", "For businesses"],
        rows: [
          [
            "Wardrobe and closet organisation · Kitchen and pantry organisation · Bedroom organisation · Children's room and toy organisation · Home office organisation · Document and filing organisation · Storage space optimisation · Sorting and categorising household items · Decluttering of living areas and common spaces · Assistance with donation and disposal preparation · Moving-in and moving-out organisation support · Seasonal organisation projects · Room-by-room decluttering and layout assessment · Storage solution implementation",
            "Workspace organisation · Systematisation of physical filing and document storage · Storage room and supply closet optimisation · Inventory room organisation · Archive and records organisation · Meeting room organisation · Reception area organisation · Office move preparation and unpacking support · Workspace optimisation and decluttering · Digital file organisation support · Event and project material organisation · General office “reset” for a clean, professional environment",
          ],
        ],
      },
    ],
  },
  {
    slug: "home-and-office-cleaning-and-care",
    icon: "fa-broom",
    title: "Home and Office Cleaning and Care",
    summary:
      "Everyday cleaning for homes and workplaces — dusting, mopping, sanitising, and keeping your space consistently presentable.",
    idealFor: "Homes and workplaces of every size.",
    blocks: [
      {
        kind: "table",
        heading: "General standard cleaning — homes",
        headers: ["Area", "Cleaning activities"],
        rows: [
          [
            "Living room",
            "Cobwebs taken out · All surfaces dusted and wiped · Door knobs and frames polished · Mirrors cleaned · Dusting of furniture and surfaces · Mopping and vacuuming of floors · Dusting and wiping of skirtings · Dusting and wiping of electronics and picture frames · Light switches and fixtures wiped",
          ],
          [
            "Bedroom",
            "Cobwebs taken out · All surfaces dusted and polished · Hard surfaces swept and cleaned · Beds arranged and laid neatly · Trash can emptied and washed · Making the bed · Vacuuming and mopping floors · Skirtings wiped · Folding or hanging of clothes · Tidying the room · Mirrors cleaned",
          ],
          [
            "Kitchen",
            "Cobwebs cleared · Dishes washed · Counters and table tops cleaned · Outside of appliances cleaned (fridge, stovetop, microwave, oven) · Sink cleaned inside · Hard surfaces swept and cleaned · Trash can emptied and washed · Surfaces, sinks and appliances wiped · Outside of cupboards and fridge wiped · Stove top and walls behind the stove cleaned · Walls wiped · Bins emptied and bin area cleaned · Floors mopped",
          ],
          [
            "Restroom and bathroom",
            "Cobwebs taken out · Urinals, toilets and toilet seats washed · Hard surfaces swept and cleaned · Tiles and bathtub washed · Mirrors cleaned · Trash can emptied and washed · Shower, bath and sinks cleaned · Counters and taps wiped · Walls wiped · Outside of cupboards and cabinets wiped · Clean towels folded or hung · Floors mopped · Bins emptied and bin area cleaned",
          ],
        ],
      },
      {
        kind: "table",
        heading: "Office cleaning",
        headers: ["Area", "Cleaning activities"],
        rows: [
          [
            "Office and common areas",
            "Dusting of furniture, desks and surfaces · Mopping and vacuuming of floors · General cleaning of meeting rooms and breakout spaces · Emptying of rubbish bins",
          ],
          [
            "Kitchenette / lunch room",
            "Washing of dishes, loading and unloading the dishwasher · Dusting and wiping all accessible surfaces · Wiping exterior cupboards, cabinets, surfaces, walls and tables · Wiping and cleaning kitchen appliances (fridge, microwave, kettle) · Cleaning of sinks and taps · Taking out rubbish and recycling · Vacuuming and mopping floors · Cobwebs cleared · Stove tops and walls behind the stove cleaned",
          ],
          [
            "Bathroom",
            "Cleaning of the shower or bath, sinks and taps · Cleaning of toilets · Wiping all walls and mirrors · Cleaning of exterior cabinets and cupboards · Folding and hanging of clean towels and paper towels · Emptying and cleaning of bins · Mopping floors",
          ],
        ],
      },
      {
        kind: "list",
        heading: "Activities that may also be included",
        items: [
          "Windows and blinds",
          "Cleaning the inside of appliances (fridge, stovetop, microwave, oven)",
          "Cleaning inside the kitchen cabinets",
          "Moving heavy items to clean behind and underneath",
          "Under the bed",
          "Cleaning of shoes and standing fans",
          "Washing of shower curtains",
          "Washing of the foot mat",
        ],
      },
    ],
  },
  {
    slug: "deep-cleaning",
    icon: "fa-spray-can-sparkles",
    title: "Deep Cleaning",
    summary:
      "A more thorough approach than standard cleaning — furniture moved for access, interior windows, inside cabinets, appliances, balcony and fans.",
    idealFor: "Periodic resets, neglected spaces, and anyone wanting a complete refresh.",
    intro:
      "This involves a more thorough approach to home cleaning than standard general cleaning. It includes moving furniture for better cleaning access, interior window cleaning, shelf cleaning, inside of kitchen cabinet cleaning, fridge and freezer cleaning, oven cleaning, balcony cleaning and fan cleaning — in addition to a more in-depth delivery of all standard cleaning tasks.",
    blocks: [
      {
        kind: "table",
        heading: "What's covered",
        headers: ["Area", "Cleaning activities"],
        rows: [
          [
            "Living room",
            "Cobwebs taken out · All surfaces dusted and wiped · Door knobs and frames polished · Light switches cleaned · Mirrors cleaned · Dusting of furniture and surfaces · Mopping and sweeping of floors · Skirtings dusted and wiped · Electronics and picture frames dusted and wiped",
          ],
          [
            "Bedroom",
            "Cobwebs taken out · All surfaces dusted and polished · Hard surfaces swept and cleaned · Beds arranged and laid neatly · Trash can emptied and washed · Making the bed · Sweeping and mopping floors · Skirtings wiped · Folding or hanging of up to 10 items of clothing · Mirrors cleaned",
          ],
          [
            "Kitchen",
            "Cobwebs taken out · Dishes washed · Counters and table tops cleaned · Outside of appliances cleaned · Sink cleaned inside · Hard surfaces swept and cleaned · Trash can emptied and washed · Surfaces, sinks and appliances wiped · Outside of cupboards and fridge wiped · Stove top and walls behind the stove cleaned · Inside and outside of the microwave cleaned · Walls wiped · Bins emptied · Floors mopped",
          ],
          [
            "Restroom and bathroom",
            "Cobwebs taken out · Urinals, toilets and toilet seats washed · Hard surfaces swept and cleaned · Tiles and bathtub washed · Mirrors cleaned · Trash can emptied and washed · Shower, bath and sinks cleaned · Counters and taps wiped · Walls and mirrors wiped · Floors mopped · Outside of cupboards and cabinets wiped · Clean towels folded or hung · Bins emptied and bin area cleaned",
          ],
        ],
      },
      {
        kind: "note",
        text:
          "Folding more than 10 items of clothing may attract additional charges. Homes significantly larger than others of the same size, and bookings that run longer than the estimated booking time, might attract additional charges — which will be duly communicated by our Relationship Manager.",
      },
    ],
  },
  {
    slug: "move-in-move-out-cleaning",
    icon: "fa-truck-ramp-box",
    title: "Move-in / Move-out Cleaning",
    summary: "A thorough cleaning of your new home in preparation for you to move in — or a complete reset on the way out.",
    idealFor: "Anyone relocating, and landlords preparing a property for handover.",
    blocks: [
      {
        kind: "table",
        heading: "What's covered",
        headers: ["Area", "Cleaning activities"],
        rows: [
          [
            "General areas (living room, bedrooms, hallways)",
            "Dust and wipe all surfaces: shelves, skirting boards, light fixtures, baseboards, doors and handles · Vacuum all carpets and rugs thoroughly, including edges and under furniture · Mop all hard floors and remove stains · Clean windows inside and out, including sills and frames · Clean light fittings and switches · Clean mirrors and glass surfaces streak-free · Dust and wipe down any provided furniture",
          ],
          [
            "Kitchen",
            "Oven: clean inside and outside, including racks and trays · Hob: clean stovetop, knobs, burners and grease buildup · Fridge/freezer: empty, defrost if necessary, clean interior and exterior including trays, shelves and drawers · Sink and taps: descale and clean thoroughly including drains · Worktops: wipe down all surfaces · Cupboards and drawers: wipe inside and out · Flooring cleaned · Bins emptied and cleaned inside",
          ],
          [
            "Bathroom",
            "Toilet: clean inside and out, including base and behind, sanitised thoroughly · Shower/bathtub: scrub tiles, grout and surfaces to remove soap scum, limescale and mould · Sink: clean and descale taps, drain and sink area · Mirror cleaned streak-free · Flooring cleaned · Towel racks, hooks and shelves wiped down",
          ],
          [
            "Bedrooms",
            "Wardrobes and closets: wipe down shelves, drawers and hanging rails, inside and out · Drawers and cabinets cleaned inside · Under the bed and behind furniture cleaned · Floors vacuumed and mopped",
          ],
          [
            "Hallways and stairs",
            "Skirting boards, doors and handles cleaned · Stairs vacuumed or flooring cleaned · Light fixtures and mirrors wiped down · Floors mopped or vacuumed",
          ],
        ],
      },
      {
        kind: "note",
        text:
          "Homes significantly larger than other homes of the same size, and bookings that run longer than the estimated booking time, might attract additional charges — which will be duly communicated by our Booking Support Team.",
      },
    ],
  },
  {
    slug: "airbnb-shortlet",
    icon: "fa-house-chimney-window",
    title: "Airbnb / Shortlet Cleaning",
    summary: "Turnover-ready cleaning that leaves your short-let guest-ready, with a hotel-style reset.",
    idealFor: "Hosts, property managers and hospitality operators.",
    blocks: [
      {
        kind: "table",
        heading: "What's included in your clean",
        headers: ["Area", "Activities"],
        rows: [
          [
            "Living room",
            "All general cleaning plus guest-ready presentation: dust all furniture, décor and surfaces · Vacuum and mop floors · Dust and wipe skirtings · Check for and remove any guest items or rubbish",
          ],
          [
            "Kitchen — clean and full reset",
            "Wipe down all counters, sinks, taps and appliances · Wash and pack away all dishes (or load and run dishwasher) · Wipe exterior of cupboards, fridge, oven, dishwasher · Spot-clean walls, splashbacks and high-touch areas · Clean inside microwave, kettle exterior, toaster, coffee machine (if requested) · Empty bins and clean the bin area · Mop floors · Remove all leftover food · Restock available kitchen consumables — tea, coffee, sugar, dishwashing liquid, paper towels (if requested)",
          ],
          [
            "Bedrooms — hotel-style reset",
            "Dust all furniture and surfaces · Strip beds and remove used linen · Make the bed with fresh, correctly fitted linen · Vacuum and mop floors · Dust and wipe skirtings · Remove guest items or rubbish, checking under the bed and inside cupboards · Ensure décor and furniture are neatly arranged",
          ],
          [
            "Bathrooms — sanitisation and presentation",
            "Clean and disinfect the shower, bath, basin and all taps · Thorough toilet cleaning · Wipe counters, shelves and mirrors · Spot-clean walls and high-touch areas · Wipe outside of cupboards and cabinets · Empty bins and clean bin area · Mop floors · Replace towels with clean, neatly folded sets · Restock toilet paper · Restock toiletries — soap, shampoo, conditioner, body wash (if requested)",
          ],
        ],
      },
      {
        kind: "note",
        text:
          "Not included: checking or replacing missing inventory items (utensils, mugs, glasses), and providing or purchasing extra supplies. We can only restock items already available in the property.",
      },
    ],
  },
  {
    slug: "post-construction-cleaning",
    icon: "fa-hard-hat",
    title: "Post-Construction Cleaning",
    summary: "Dust, debris and residue removed so a newly built or renovated space is ready to live in.",
    idealFor: "After building work, renovation or refurbishment.",
    blocks: [
      {
        kind: "table",
        heading: "What's covered",
        headers: ["Area", "Cleaning activities"],
        rows: [
          ["Living room", "Cobwebs taken out · All surfaces dusted and wiped · Door knobs and frames polished · Light switches cleaned · Mirrors cleaned"],
          ["Bedroom", "Cobwebs taken out · All surfaces dusted and polished · Hard surfaces swept and cleaned · Beds arranged and laid neatly · Trash can emptied and washed"],
          ["Kitchen", "Cobwebs taken out · Counters and table tops cleaned · Outside of appliances cleaned · Sink cleaned inside · Hard surfaces swept and cleaned · Trash can emptied and washed"],
          ["Restroom and bathroom", "Cobwebs taken out · Urinals, toilets and toilet seats washed · Hard surfaces swept and cleaned · Tiles and bathtub washed · Mirrors cleaned · Trash can emptied and washed"],
        ],
      },
      {
        kind: "list",
        heading: "Also included",
        items: [
          "Windows and blinds",
          "Cleaning inside cabinets",
          "Moving heavy items to clean behind and underneath",
          "Removal of paint and cement residue left from renovation or construction",
        ],
      },
    ],
  },
  {
    slug: "couch-and-rug-cleaning",
    icon: "fa-couch",
    title: "Couch & Rug Cleaning",
    summary: "Deep cleaning for upholstery and rugs, with or without machine drying.",
    idealFor: "Refreshing soft furnishings that see daily use.",
    blocks: [
      {
        kind: "table",
        heading: "Options",
        headers: ["Service type", "Option 1", "Option 2"],
        rows: [
          [
            "Couch / Rug",
            "Washing and sucking out moisture. Drying is carried out without a machine.",
            "Washing, sucking out moisture and drying. Drying is carried out with a machine.",
          ],
        ],
      },
    ],
  },
  {
    slug: "elderly-care-and-companionship",
    icon: "fa-hand-holding-heart",
    title: "Elderly Care & Companionship",
    summary: "Compassionate day-to-day support, companionship and light housekeeping.",
    idealFor: "Families supporting elderly loved ones at home.",
    blocks: [
      {
        kind: "table",
        heading: "What's included",
        headers: ["Service type", "Activities"],
        rows: [
          ["Mobility assistance", "Help moving around the home or going for short walks"],
          ["Medication reminders", "Gentle reminders to take medication. Please note: caregivers do not administer medication."],
          [
            "Personal care assistance",
            "Bathing, toilet assistance, personal hygiene, grooming and dressing · Admin help: sorting mail, paying bills online, managing appointments · Friendly conversation and connection: meaningful chats, games, reading, or helping with hobbies",
          ],
          ["Special needs assistance", "Connect with certified caregivers who can provide daily support for individuals who need special needs care"],
          ["Light housekeeping", "Changing linen and laundry help · Tidy-up tasks: light cleaning in common areas, washing dishes, wiping down surfaces"],
          ["Meal preparation", "Preparing light, nutritious meals or snacks based on preferences"],
        ],
      },
      {
        kind: "note",
        text:
          "Important: while we connect you with caregivers who are trained, vetted and experienced, they are not qualified nurses or medical professionals. For medical care, please consult a licensed healthcare provider. For hygiene or personal care tasks, we recommend booking a caregiver with 200+ hours of verified practical experience.",
      },
    ],
  },
  {
    slug: "childcare",
    icon: "fa-child",
    title: "Childcare",
    summary: "Attentive, supervised childminding support — with a parent or guardian present throughout.",
    idealFor: "Parents needing a reliable extra pair of hands at home.",
    blocks: [
      {
        kind: "table",
        heading: "What's included",
        headers: ["Service type", "Activities"],
        rows: [
          [
            "Supervising children",
            "Watching children while they play, ensuring safety and engaging in age-appropriate activities · Preparing or assisting with nutritious meals and snacks · Playtime and entertainment: games, outdoor play and educational tasks · Newborn support: bottle-feeding, bottle washing, changing nappies and general support",
          ],
          [
            "Household tasks",
            "Organising toys, clothes and other household items · Washing children's clothes and belongings · Light cleaning: washing dishes, sweeping, dusting and general tidying",
          ],
        ],
      },
      {
        kind: "note",
        text:
          "Please note: this is a supervised childcare service. We ask that a parent or guardian remains at home for the duration of the booking.",
      },
    ],
  },
];

export const getServiceDetail = (slug: string) => serviceDetails.find((s) => s.slug === slug);
