/**
 * Dastarkhwan-e-Nizam - Authentic Hyderabadi Cuisine
 * Data Source: Menu Items, Categories, Reviews, Heritage Story
 */

const RESTAURANT_INFO = {
    name: "Dastarkhwan-e-Nizam",
    tagline: "Authentic Hyderabadi Royal Heritage Since 1954",
    phone: "+91 40 2452 7860",
    whatsapp: "+91 98490 12345",
    email: "shahi@dastarkhwan-nizam.com",
    address: "Palace Road, Near Charminar, Old City, Hyderabad, Telangana 500002",
    branch: "Banjara Hills, Road No. 10, Hyderabad, Telangana 500034",
    hours: "Open Daily: 11:30 AM – 11:30 PM",
    rating: 4.9,
    reviewsCount: "14,800+ Royal Guests",
    currency: "₹"
};

const CATEGORIES = [
    { id: "all", name: "Royal Banquet (All)", icon: "sparkles" },
    { id: "biryani", name: "Shahi Dum Biryani", icon: "flame" },
    { id: "deg", name: "The Royal Deg (Haleem & Stews)", icon: "pot" },
    { id: "kebabs", name: "Charcoal & Pathar Kebabs", icon: "utensils" },
    { id: "curries", name: "Nizami Salans & Curries", icon: "bowl" },
    { id: "breads", name: "Breads of Charminar", icon: "wheat" },
    { id: "meetha", name: "Shahi Meetha (Desserts)", icon: "cake" },
    { id: "chai", name: "Irani Chai & Refreshments", icon: "coffee" }
];

const MENU_ITEMS = [
    // BIRYANI
    {
        id: "biryani-1",
        name: "Kacchi Gosht Dum Biryani",
        category: "biryani",
        isVeg: false,
        isBestseller: true,
        price: 499,
        rating: 4.9,
        reviewCount: 3420,
        spiceLevel: "Nizami Spicy",
        cookingStyle: "Dum Pukht (Sealed Clay Handi)",
        prepTime: "25-30 mins",
        description: "Tender baby goat marinated overnight in 32 crushed spices, layered raw with saffron-soaked aged basmati rice, sealed with dough in a clay pot and cooked over slow charcoal embers. Served with Mirchi ka Salan & Burani Raita.",
        ingredients: ["Spring Mutton", "Royal Basmati", "Pure Desi Ghee", "Kashmiri Saffron", "Birista (Fried Onions)", "Mint & Rose Petals"],
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=900&auto=format&fit=crop",
        tags: ["Signature", "Slow-Cooked", "Clay Pot"]
    },
    {
        id: "biryani-2",
        name: "Nizam's Murgh Dum Biryani",
        category: "biryani",
        isVeg: false,
        isBestseller: true,
        price: 399,
        rating: 4.8,
        reviewCount: 2890,
        spiceLevel: "Medium Spicy",
        cookingStyle: "Traditional Dum",
        prepTime: "20-25 mins",
        description: "Juicy country chicken cuts marinated in rich curd, shahi jeera, mace, and green chillies, cooked on gentle dum with saffron-infused basmati rice. Accompanied by Mirchi ka Salan and dahi chutney.",
        ingredients: ["Farm Chicken", "Aged Basmati", "Green Cardamom", "Ghee", "Fried Shallots", "Coriander"],
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=900&auto=format&fit=crop",
        tags: ["Bestseller", "Classic"]
    },
    {
        id: "biryani-3",
        name: "Sofiyani Murgh Biryani (White Royal)",
        category: "biryani",
        isVeg: false,
        isBestseller: false,
        price: 449,
        rating: 4.7,
        reviewCount: 1120,
        spiceLevel: "Mild & Aromatic",
        cookingStyle: "Nizami Court Recipe",
        prepTime: "25 mins",
        description: "The mild, aristocratic white biryani of the Asaf Jahi court. Prepared with chicken simmered in almond paste, mawa, white pepper, milk, and kewra water without any turmeric or red chilli powder.",
        ingredients: ["Tender Chicken", "Almond Paste", "White Pepper", "Mawa (Khoya)", "Kewra Water", "Cream"],
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=900&auto=format&fit=crop",
        tags: ["Royal Heritage", "Mild", "No Red Chilli"]
    },
    {
        id: "biryani-4",
        name: "Shahi Subz Tarkari Dum Biryani",
        category: "biryani",
        isVeg: true,
        isBestseller: false,
        price: 349,
        rating: 4.7,
        reviewCount: 1850,
        spiceLevel: "Medium",
        cookingStyle: "Slow Dum",
        prepTime: "20 mins",
        description: "Farm-fresh baby carrots, French beans, green peas, and Malai paneer cubes slow-steamed in a royal saffron and caramelized onion broth with long-grain rice.",
        ingredients: ["Malai Paneer", "Garden Veggies", "Basmati", "Saffron", "Star Anise", "Mint"],
        image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=900&auto=format&fit=crop",
        tags: ["Vegetarian", "Fragrant"]
    },

    // THE ROYAL DEG
    {
        id: "deg-1",
        name: "GI-Tagged Hyderabadi Shahi Haleem",
        category: "deg",
        isVeg: false,
        isBestseller: true,
        price: 429,
        rating: 5.0,
        reviewCount: 4200,
        spiceLevel: "Rich & Warm",
        cookingStyle: "12-Hour Woodfire Beaten",
        prepTime: "Ready to Serve",
        description: "Hyderabad's GI-tagged legendary feast dish. Slow-cooked over firewood for twelve hours with shredded de-boned lamb, broken wheat, lentils, dry fruits, and abundant pure ghee, beaten continuously with heavy wooden pestles to a silky texture.",
        ingredients: ["Prime Lamb", "Cracked Wheat", "Desi Ghee", "Cashews", "Dried Rosebuds", "Fried Birista", "Fresh Lime"],
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=900&auto=format&fit=crop",
        tags: ["GI Certified", "Must Try", "12-Hr Simmered"]
    },
    {
        id: "deg-2",
        name: "Hyderabadi Mutton Marag",
        category: "deg",
        isVeg: false,
        isBestseller: false,
        price: 379,
        rating: 4.8,
        reviewCount: 1450,
        spiceLevel: "Peppery & Robust",
        cookingStyle: "Simmered Shank Broth",
        prepTime: "15 mins",
        description: "The ceremonial Hyderabadi royal wedding soup. A velvety, peppery mutton shank soup thickened with almond and cashew pastes, spiced with green cardamom and coarse black peppercorns.",
        ingredients: ["Mutton Shanks", "Ground Almonds", "Pistachios", "Tellicherry Black Pepper", "Cream", "Green Chilies"],
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=900&auto=format&fit=crop",
        tags: ["Royal Broth", "Wedding Classic"]
    },
    {
        id: "deg-3",
        name: "Shahi Nalli Nihari",
        category: "deg",
        isVeg: false,
        isBestseller: true,
        price: 469,
        rating: 4.9,
        reviewCount: 1980,
        spiceLevel: "Aromatically Fiery",
        cookingStyle: "Overnight Deg Simmer",
        prepTime: "15 mins",
        description: "Tender lamb shanks cooked overnight in a rich, gelatinous bone marrow reduction, seasoned with 24 specialized potli spices, finished with fresh julienned ginger, cilantro, and lemon juice.",
        ingredients: ["Marrow Lamb Shanks", "Potli Masala", "Mustard Oil", "Ginger Juliennes", "Bone Marrow Ghee"],
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=900&auto=format&fit=crop",
        tags: ["Bone Marrow", "Chef Special"]
    },

    // KEBABS & STARTERS
    {
        id: "kebab-1",
        name: "Pathar Ka Gosht",
        category: "kebabs",
        isVeg: false,
        isBestseller: true,
        price: 479,
        rating: 4.9,
        reviewCount: 2600,
        spiceLevel: "Smoky & Peppery",
        cookingStyle: "Charred Granite Stone",
        prepTime: "20 mins",
        description: "A Nizam-era masterstroke: Paper-thin fillets of lamb marinated with raw papaya, allspice, and potli masala, then seared over red-hot river granite heated by charcoal embers.",
        ingredients: ["Pounded Mutton Slivers", "Raw Papaya", "Black Stone Flowers (Dagad Phool)", "Ghee", "Royal Cumin"],
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop",
        tags: ["Nizam's Invention", "Granite Grilled"]
    },
    {
        id: "kebab-2",
        name: "Hyderabadi Shikampur Kebab",
        category: "kebabs",
        isVeg: false,
        isBestseller: false,
        price: 419,
        rating: 4.8,
        reviewCount: 1390,
        spiceLevel: "Medium",
        cookingStyle: "Tawa Ghee Roast",
        prepTime: "15 mins",
        description: "Silken minced mutton patties stuffed with a refreshing secret core of spiced hung yogurt, fresh mint, coriander, and finely chopped green chillies, griddled in pure ghee.",
        ingredients: ["Minced Lamb", "Hung Yogurt (Chakka)", "Bengal Gram", "Mace", "Mint Core", "Desi Ghee"],
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=900&auto=format&fit=crop",
        tags: ["Stuffed Center", "Melt in Mouth"]
    },
    {
        id: "kebab-3",
        name: "Asafi Tala Hua Gosht",
        category: "kebabs",
        isVeg: false,
        isBestseller: true,
        price: 439,
        rating: 4.9,
        reviewCount: 2150,
        spiceLevel: "Spicy & Crisp",
        cookingStyle: "Iron Kadai Fried",
        prepTime: "15 mins",
        description: "Bite-sized boneless mutton pieces boiled tender in turmeric and ginger-garlic, then pan-crisped with heaps of curry leaves, crushed garlic, and fiery green chillies.",
        ingredients: ["Crisped Mutton", "Fresh Curry Leaves", "Pounded Garlic", "Green Chilies", "Black Pepper"],
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=900&auto=format&fit=crop",
        tags: ["Old City Classic", "Crunchy & Spicy"]
    },
    {
        id: "kebab-4",
        name: "Nizami Paneer Tikka Angara",
        category: "kebabs",
        isVeg: true,
        isBestseller: false,
        price: 369,
        rating: 4.7,
        reviewCount: 980,
        spiceLevel: "Medium",
        cookingStyle: "Clay Oven Tandoor",
        prepTime: "15 mins",
        description: "Thick steaks of fresh artisan paneer marinated in yellow chilli powder, hung curd, and mustard oil, smoked with live clove charcoal in the royal tandoor.",
        ingredients: ["Fresh Paneer", "Yellow Chilli", "Hung Curd", "Clove Smoke", "Bell Peppers"],
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=900&auto=format&fit=crop",
        tags: ["Vegetarian", "Smoked"]
    },

    // CURRIES & SALANS
    {
        id: "curry-1",
        name: "Authentic Mirchi Ka Salan",
        category: "curries",
        isVeg: true,
        isBestseller: true,
        price: 289,
        rating: 4.9,
        reviewCount: 2200,
        spiceLevel: "Tangy & Nutty",
        cookingStyle: "Slow Simmered Gravy",
        prepTime: "15 mins",
        description: "The indispensable companion to Hyderabadi Biryani. Long Bhavnagri green peppers shallow-fried and simmered in a luscious gravy of roasted peanuts, sesame seeds, desiccated coconut, and tart tamarind pulp.",
        ingredients: ["Bhavnagri Chillies", "Roasted Peanuts", "Til (Sesame Seeds)", "Tamarind", "Coconut Milk", "Curry Leaves"],
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=900&auto=format&fit=crop",
        tags: ["Heritage Icon", "Biryani Soulmate", "Vegan"]
    },
    {
        id: "curry-2",
        name: "Shahi Baghara Baingan",
        category: "curries",
        isVeg: true,
        isBestseller: false,
        price: 299,
        rating: 4.8,
        reviewCount: 1100,
        spiceLevel: "Tangy & Aromatic",
        cookingStyle: "Tempered Clay Pot",
        prepTime: "15 mins",
        description: "Slit purple baby eggplants pan-fried until tender, steeped in a nutty sesame-peanut gravy tempered with kalonji (nigella seeds), mustard seeds, and fresh curry sprigs.",
        ingredients: ["Baby Eggplants", "Nigella Seeds", "Sesame Paste", "Fenugreek", "Tamarind Pulp"],
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=900&auto=format&fit=crop",
        tags: ["Vegetarian", "Nizami Classic"]
    },
    {
        id: "curry-3",
        name: "Dum Ka Murgh (Royal Chicken)",
        category: "curries",
        isVeg: false,
        isBestseller: true,
        price: 419,
        rating: 4.8,
        reviewCount: 1730,
        spiceLevel: "Rich & Mild",
        cookingStyle: "Dum Steamed Stew",
        prepTime: "20 mins",
        description: "Tender whole cuts of chicken marinated in cashew nut paste, chironji, poppy seeds, fried onion paste, and saffron, cooked sealed with dough on dum.",
        ingredients: ["Chicken Cuts", "Cashew Paste", "Khus Khus (Poppy Seeds)", "Chironji", "Saffron Milk"],
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=900&auto=format&fit=crop",
        tags: ["Creamy & Rich", "Slow Cooked"]
    },

    // BREADS
    {
        id: "bread-1",
        name: "Shahi Sheermal",
        category: "breads",
        isVeg: true,
        isBestseller: true,
        price: 99,
        rating: 4.9,
        reviewCount: 1800,
        spiceLevel: "Sweet & Saffron",
        cookingStyle: "Tandoor Baked",
        prepTime: "10 mins",
        description: "Royal saffron-enriched leavened flatbread kneaded with milk and pure ghee, pricked with floral patterns and brushed with saffron water.",
        ingredients: ["Refined Flour", "Warm Milk", "Kashmiri Saffron", "Pure Ghee", "Cardamom"],
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=900&auto=format&fit=crop",
        tags: ["Saffron Brushed", "Royal Bread"]
    },
    {
        id: "bread-2",
        name: "Asaf Jahi Charminar Kulcha",
        category: "breads",
        isVeg: true,
        isBestseller: false,
        price: 89,
        rating: 4.7,
        reviewCount: 920,
        spiceLevel: "Flaky & Savory",
        cookingStyle: "Charcoal Tandoor",
        prepTime: "10 mins",
        description: "The historical triangular Hyderabadi flatbread, reminiscent of the Nizam's court emblem, layered with kalonji seeds and butter.",
        ingredients: ["Wheat Dough", "Kalonji Seeds", "Desi Butter", "Sesame"],
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=900&auto=format&fit=crop",
        tags: ["Court Emblem", "Flaky"]
    },
    {
        id: "bread-3",
        name: "Ulte Tawe Ki Roomali Roti",
        category: "breads",
        isVeg: true,
        isBestseller: false,
        price: 49,
        rating: 4.8,
        reviewCount: 2100,
        spiceLevel: "Delicate",
        cookingStyle: "Inverted Wok Tossed",
        prepTime: "5 mins",
        description: "Handkerchief-thin bread skillfully hand-tossed and cooked within seconds on an inverted dome griddle.",
        ingredients: ["Soft Wheat Dough", "Milk", "Clarified Butter"],
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=900&auto=format&fit=crop",
        tags: ["Paper Thin", "Light"]
    },

    // SHAHI MEETHA (DESSERTS)
    {
        id: "meetha-1",
        name: "Shahi Double Ka Meetha",
        category: "meetha",
        isVeg: true,
        isBestseller: true,
        price: 249,
        rating: 5.0,
        reviewCount: 3890,
        spiceLevel: "Rich & Sweet",
        cookingStyle: "Rabri Baked Ghee Pudding",
        prepTime: "Ready to Serve",
        description: "The undisputed emperor of Hyderabadi confections. Thick artisanal bread crisped in pure golden ghee, soaked in concentrated saffron cardamom rabri, topped with silver vark and toasted pistachios.",
        ingredients: ["Ghee-Toasted Bread", "Condensed Rabri", "Saffron", "Green Cardamom", "Pistachios", "Edible Silver Foil"],
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=900&auto=format&fit=crop",
        tags: ["Must Order", "Nizam's Favorite"]
    },
    {
        id: "meetha-2",
        name: "Royal Qubani Ka Meetha with Fresh Malai",
        category: "meetha",
        isVeg: true,
        isBestseller: true,
        price: 269,
        rating: 4.9,
        reviewCount: 3120,
        spiceLevel: "Velvety Tart & Sweet",
        cookingStyle: "Slow-Stewed Apricots",
        prepTime: "Ready to Serve",
        description: "Dried Turkish apricots stewed slowly with rock sugar into a glossy compote, studded with their roasted sweet apricot kernels, topped with chilled heavy clotted clotted cream (fresh malai).",
        ingredients: ["Turkish Dried Apricots", "Apricot Kernels", "Rock Sugar", "Farm Clotted Malai", "Rose Syrup"],
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=900&auto=format&fit=crop",
        tags: ["Historic Dessert", "Fresh Malai"]
    },
    {
        id: "meetha-3",
        name: "Gil-e-Firdaus (Clay of Paradise)",
        category: "meetha",
        isVeg: true,
        isBestseller: false,
        price: 229,
        rating: 4.8,
        reviewCount: 890,
        spiceLevel: "Delicate & Floral",
        cookingStyle: "Clay Pot Chilled",
        prepTime: "Ready to Serve",
        description: "An elusive courtly dessert made of grated tender bottle gourd, sago pearls, condensed milk, and crushed almonds, chilled in earthen cups.",
        ingredients: ["Tender Lauki", "Sabudana Pearls", "Mawa", "Rose Essence", "Silver Leaves"],
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=900&auto=format&fit=crop",
        tags: ["Rare Royal Recipe", "Earthen Clay"]
    },

    // IRANI CHAI & BEVERAGES
    {
        id: "chai-1",
        name: "Kadak Irani Chai with Osmania Biscuits",
        category: "chai",
        isVeg: true,
        isBestseller: true,
        price: 129,
        rating: 4.9,
        reviewCount: 4600,
        spiceLevel: "Creamy & Sweet",
        cookingStyle: "Copper Samovar Brewed",
        prepTime: "5 mins",
        description: "The heartbeat of Hyderabad. Rich, caramelized condensed milk tea brewed in copper samovars, served with three fresh, melt-in-the-mouth salted Osmania butter biscuits.",
        ingredients: ["Assam CTC Tea", "Slow-Condensed Milk", "Mawa Hints", "Osmania Butter Biscuits"],
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop",
        tags: ["Hyderabad Emotion", "With Biscuits"]
    },
    {
        id: "chai-2",
        name: "Shahi Saffron Badam Sharbat",
        category: "chai",
        isVeg: true,
        isBestseller: false,
        price: 189,
        rating: 4.8,
        reviewCount: 1100,
        spiceLevel: "Chilled & Refreshing",
        cookingStyle: "Stone Ground Cold Blend",
        prepTime: "5 mins",
        description: "An invigorating elixir of crushed California almonds, pure saffron threads, musk melon seeds, and fragrant organic rose water, served chilled.",
        ingredients: ["Peeled Almonds", "Kashmiri Saffron", "Rose Water", "Chilled Milk", "Pistachio Bits"],
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=900&auto=format&fit=crop",
        tags: ["Summer Cooling", "Royal Elixir"]
    }
];

const REVIEWS = [
    {
        id: 1,
        author: "Nawabzada Mir Tahir Ali",
        role: "Hyderabadi Heritage Conservator",
        rating: 5,
        date: "2 days ago",
        comment: "This is the ONLY restaurant in Telangana that honors the true 18th-century Asaf Jahi dum technique. The Kacchi Gosht Biryani has that unmistakable saffron aroma and the rice grain length is pristine. Double ka Meetha will transport you to a royal wedding.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 2,
        author: "Ananya Deshmukh",
        role: "Food & Travel Journalist (Condé Nast)",
        rating: 5,
        date: "1 week ago",
        comment: "Their GI-Tagged Haleem is unmatched. Silky, deeply infused with marrow and pure ghee, and the crunch of birista on top is poetry. Dining in their Royal Majlis under the chandeliers was an unforgettable evening.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 3,
        author: "Chef Sanjeev Kapur",
        role: "Culinary Consultant",
        rating: 5,
        date: "2 weeks ago",
        comment: "Pathar Ka Gosht made on actual heated granite river stone! You can taste the smoky charcoal and the subtle hint of stone flower (dagad phool). Outstanding hospitality and service worthy of a palace.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
];

const HERITAGE_TIMELINE = [
    {
        year: "1724",
        title: "The Nizami Culinary Fusion",
        description: "The founding Nizam, Nizam-ul-Mulk, combines Mughal slow-cooking with Deccan sour and spicy flavors, introducing tamarind, peanuts, and coconut into royal banquets."
    },
    {
        year: "1894",
        title: "The Secret of the 36-Spice Potli",
        description: "Royal head chefs (Khansamas) create the legendary 'Potli Masala' containing 36 wild herbs, stone flower, vetiver roots, and dried rose petals reserved for state feasts."
    },
    {
        year: "1954",
        title: "Dastarkhwan-e-Nizam Opens",
        description: "Our founder, Master Ustad Mohammad Ishaq, apprentice to the 7th Nizam’s royal kitchen, opens the historic stone-arched dining hall by Charminar."
    },
    {
        year: "Today",
        title: "Preserving Authentic Heritage",
        description: "Continuing our sacred pledge to slow-cook every pot over firewood and charcoal, never cutting corners, honoring three centuries of Nizami gastronomy."
    }
];
