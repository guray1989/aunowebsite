// Translation data
const translations = {
  en: {
    welcome: 'Welcome to AUNO Pack',
    subtitle: 'AI-Powered Innovative<br>Packaging Material Design',
    description: 'Contact us for packaging recommendations tailored to your company and products.',
    'tagline-prefix': 'Why Aunopack',
    tagline: 'Grow your sales targets<br>with the right packaging decisions.',
    'paper-title': 'Paper Packaging',
    'paper-desc': 'High-quality, sustainable paper packaging with <span class="highlight-yellow">customizable</span> <span class="highlight-yellow">printing options</span>, designed to preserve food freshness and safety.',
    'flexible-title': 'Flexible Packaging',
    'flexible-desc': 'Versatile and durable pouches ideal for a wide range of food products, offering convenient storage and <span class="highlight-yellow">optional digital or flexo printing</span>',
    'sustainable-title': 'Sustainable Packaging',
    'sustainable-desc': 'Different sustainable packaging structures come with their own advantages and disadvantages.<br><br>When selecting the right solution, technical requirements, cost, and ease of manufacturing must be carefully evaluated.<br><br>When a fully recyclable option is not feasible, materials and structures that support sustainability can be preferred.',
    'ai-title': 'AI Packaging Solutions',
    'ai-desc': 'We develop smart and responsible solutions with AI.',
    'print-title': 'Print',
    'print-desc': 'Custom printing solutions for your packaging needs.',
    address: 'Address: Seyrantepe Mah. İbrahim Karaoğlanoğlu Cad. 85 Kağıthane, İstanbul, Turkey.',
    'footer-text': 'Email: info@aunopack.com. For any inquiries or support, please feel free to contact us by email or visit our location.',
    // Navigation
    logo: 'AUNOPACK',
    'nav-products': 'Products',
    'nav-sectors': 'Sectors',
    'nav-solutions': 'Solutions',
    'nav-case-studies': 'Blog',
    'nav-about': 'About',
    'nav-cta': 'Start Your Enquiry',
    'mega-products-title': 'Products',
    'mega-sectors-title': 'Sectors',
    'mega-solutions-title': 'Solutions',
    'nav-pouches': 'Pouches & Bags',
    'nav-sleeves': 'Paperboard Sleeves',
    'nav-envelope-cartons': 'Envelope-Style Cartons',
    'nav-paperboard': 'Paperboard Packaging',
    'sector-confectionery': 'Confectionery & Snacks',
    'sector-meat-dairy': 'Meat & Dairy',
    'sector-ready-meals': 'Ready Meals & Meal Kits',
    'sector-premium': 'Dry Foods',
    'solution-shelf-life-title': 'Shelf-Life Focused Packaging Solutions',
    'solution-shelf-life-desc': 'Packaging structures that extend shelf life reliably.',
    'solution-shelf-performance-title': 'Shelf-Performance Packaging Solutions',
    'solution-shelf-performance-desc': 'Shelf-stable formats designed for strong on-shelf presentation.',
    'solution-small-batches-title': 'Small-Batch Packaging Solutions',
    'solution-small-batches-desc': 'Professional packaging for limited runs and special editions.',
    'solution-aunoai-title': 'Data-Guided Design',
    'solution-aunoai-desc': 'Data-guided packaging design powered by AunoAI.',
    'nav-who-we-are': 'Who We Are',
    'nav-how-we-work': 'How We Work',
    'nav-sustainability': 'Sustainability',
    'nav-faq': 'FAQ',
    'nav-contact': 'Contact',
    'nav-contact-form': 'Contact Form',
    'sr-only-menu': 'Open/Close menu',
    'solutions-link': 'Solutions',
    'contact-hero-title': 'Get in Touch',
    'contact-hero-desc': 'Fill out the form for your questions or quote requests. We will get back to you as soon as possible at info@aunopack.com.',
    'contact-label-name': 'Full Name',
    'contact-label-email': 'Email',
    'contact-label-company': 'Company / Organization',
    'contact-label-topic': 'Topic',
    'contact-label-message': 'Your Message',
    'contact-placeholder-name': 'Your full name',
    'contact-placeholder-email': 'example@company.com',
    'contact-placeholder-company': 'Company name (optional)',
    'contact-placeholder-message': 'Write your message...',
    'contact-submit': 'Send',
    'contact-note': 'When you submit, your message is sent to <strong>info@aunopack.com</strong> via Formspree; your email client will not open.',
    'contact-topic-select': 'Select topic',
    'contact-topic-product': 'Product & Solution Enquiry',
    'contact-topic-partnership': 'Strategic Partnership',
    'about-hero-title': 'AunoPack',
    'about-p1': 'For companies, packaging decisions are a multi-dimensional process that depends on product properties, target market, segment position, production infrastructure, and the evaluation of sustainable packaging types. Yet these decisions are often made with limited alternatives and fragmented assessments.',
    'about-p2': 'AUNO AI analyses packaging decisions in a multi-parameter way across technical performance, cost, sustainability, machine infrastructure, usage volume, logistics conditions, and supply availability.',
    'about-p3': 'The system identifies and compares optimal packaging structure alternatives that align with company goals. The visual decision process is also managed in a data-driven way via the AI-supported design portal.',
    'about-p4': 'The chosen structure is not only recommended; it is supplied and implemented.',
    'about-p5': 'We connect brands with innovative, alternative and sustainable packaging solutions.',
    'sector-cta': 'Discover the Solution',
    'sector-featured-products': 'Featured Products',
    'sector-faq-title': 'Frequently Asked Questions',
    'sector-faq-intro': 'We have collected the questions we often receive. For more, <a href="../contact.html">contact us</a>.',
    // Why AunoPack circles (home)
    'why-1-title': 'Packaging Optimisation',
    'why-1-desc': 'Let\'s reduce costs from excess material use, wrong structure and inefficient production with better packaging decisions.',
    'why-2-title': 'Sales Performance Through Packaging',
    'why-2-desc': 'We aim for packaging to support product sales performance through shelf visibility, ease of use and category fit.',
    'why-3-title': 'Sustainable Packaging Structures',
    'why-3-desc': 'We evaluate paper and plastic packaging with equal distance.',
    'why-3-desc2': 'In material choices we consider environmental impact as well as cost, market habits, technical performance and regulations.',
    'why-4-title': 'Packaging Decision',
    'why-4-desc': 'We turn trial-and-error, fragmented and long decision processes into a faster, clearer structure supported by data and AI.',
    'why-5-title': 'Innovation at Material and System Level',
    'why-5-desc': 'We support your R&D processes with our AI-supported packaging development platform.',
    // Confectionery & Chocolate
    'cc-hero-title': 'Innovative Packaging Solutions for<br>Confectionery & Chocolate',
    'cc-hero-desc': 'In the confectionery and snacking segment, packaging is more than protection—it drives shelf differentiation and purchase decisions.<br><br>Sales-focused packaging is a strategic choice: data-informed, differentiated from competitors, and balanced for sustainability.',
    'cc-g1-title': 'Trend Alignment & Fast Packaging Updates',
    'cc-g1-p': 'Trends in confectionery and chocolate change quickly. We help you update your packaging quickly and in a controlled way for seasonal campaigns, special-occasion designs, and limited editions.',
    'cc-g2-title': 'Data-Driven Packaging Decisions',
    'cc-g2-p1': 'We treat packaging as a measurable sales system where material and visual decisions work together.',
    'cc-g2-p2': 'With our AI-backed data infrastructure we analyse which material structures, formats, and visual approaches increase purchase likelihood on shelf in confectionery and snacking.',
    'cc-g3-title': 'Shelf Life and Product Protection',
    'cc-g3-p1': 'In confectionery and snacks, moisture, light, and aroma loss directly affect quality.',
    'cc-g3-p2': 'We analyse material and structure combinations to meet your target best-before window.',
    'cc-g4-title': 'Sustainability and Cost Balance',
    'cc-g4-p1': 'We consider sustainability targets together with production reality and unit costs.',
    'cc-g4-p2': 'We design packaging that balances environmental and financial impact and supply suitable sustainable material alternatives.',
    'cc-f1-title': 'Flexible Packaging and Carton Systems',
    'cc-f1-li1': 'Product visibility through transparent structures',
    'cc-f1-li2': 'Large brand area with carton system',
    'cc-f1-li3': 'Low minimum order options',
    'cc-f1-li4': 'Primary pack stays; carton system is updated—stock and packaging waste minimised.',
    'cc-f1-note': 'Back-seal pouches for automatic packing lines',
    'cc-f2-title': 'Sleeve-Based Packaging Systems',
    'cc-f2-li1': 'Shelf look refreshed by updating only the sleeve, not the primary pack',
    'cc-f2-li2': 'Suitable for seasonal and limited-edition designs',
    'cc-f2-li3': 'Low minimum order options',
    'cc-f2-li4': 'Less carton use than box packaging (can exceed 50%* reduction)',
    'cc-f3-title': 'Sustainable Packaging Structures',
    'cc-f3-li1': 'Compostable packaging structures',
    'cc-f3-li2': 'Paper-based packaging suitable for recycling',
    'cc-f3-li3': 'Recyclable paper packaging for automatic packing lines',
    'cc-f3-li4': 'Recyclable or compostable bags',
    'cc-f4-title': 'Premium and Special Presentation',
    'cc-f4-li1': 'Multi-product sets and bundle packaging',
    'cc-f4-li2': 'Structures optimised for campaign and promotion packs',
    'cc-f4-li3': 'Carton and pouch systems with optimised volume for multiple combinations',
    'cc-f4-li4': 'Rational material use in premium carton systems',
    // Ready Meals
    'rm-hero-title': 'Premium Segment Solutions for Ready Meals',
    'rm-hero-desc': 'Less material. More optimised design. Greater impact.<br><br>Our data- and AI-driven packaging decision system analyses paper weight, structure, print surface ratio, design and sustainability together via secondary sleeve solutions to measurably optimise premium positioning for ready meals.',
    'rm-g1-title': 'Extended Brand Story',
    'rm-g1-p1': 'On ready meal packs, the communication area on printed film is limited. Consumers want clearer information on contents, production and brand.',
    'rm-g1-p2': 'Sleeve solutions increase readability and clarify messaging with a large surface. They also offer space for QR codes and detailed brand storytelling.',
    'rm-g2-title': 'Low-Volume Advantage',
    'rm-g2-p1': 'Carton sleeves are the most flexible way to move products into the premium segment without changing the primary pack.',
    'rm-g2-p2': 'Update only the sleeve design to follow trends, run special-occasion concepts and trial new products—without renewing the primary pack.',
    'rm-g2-p3': 'This approach is the fastest, most practical way to upgrade segment and develop limited editions without high stock risk.',
    'rm-g3-title': 'Sustainable Brand Layer',
    'rm-g3-p1': 'Functional lid structures are often essential on ready meal packs. Sleeves add a renewable, responsibly sourced paper-based brand layer without changing that structure, strengthening sustainability perception.',
    'rm-g3-p2': 'Less material, optimised weight and paper touch reduce environmental impact and build a more natural, responsible brand image.',
    'rm-f1-title': 'Flexible Packaging and Carton Systems',
    'rm-f1-li1': 'Product visibility through transparent structures',
    'rm-f1-li2': 'Large brand area with carton system',
    'rm-f1-li3': 'Low minimum order options',
    'rm-f1-li4': 'Primary pack stays; carton system is updated—stock and packaging waste minimised.',
    'rm-f1-li5': 'Back-seal pouches for automatic packing lines',
    'rm-f2-title': 'Sleeve System',
    'rm-f2-li1': 'Modular closed or half-open sleeve options for different product formats',
    'rm-f2-li2': 'AUNO AI–driven system for automatic sizing and fast prototypes by product size and tray type',
    'rm-f2-li3': 'Low-volume runs for campaigns and specials; flexible setup reduces stock risk without changing the primary pack',
    'rm-f2-li4': 'Wider, optimised communication area vs printed films',
    // Meat & Dairy
    'md-hero-title': 'Premium Shelf Positioning for<br>Meat & Dairy',
    'md-hero-desc': 'In meat, dairy and deli, packaging is not only protection but also a positioning tool. Barrier performance and shelf life come from the primary pack, but brand perception should not be an afterthought.<br><br>AunoPack moves your products into the premium segment with carton sleeve and support systems on your existing unprinted vacuum bags or barrier structures—keeping technical performance intact.',
    'md-g1-title': 'Brand Layer on Unprinted Packs',
    'md-g1-p1': 'Skin and shrink pouch systems for meat and dairy deliver strong protection and shelf life, but often have little or no print and limited space for brand communication.',
    'md-g1-p2': 'Add a carton brand layer to give your technical pack a visible, differentiated presence on shelf.',
    'md-g2-title': 'Data-Driven Packaging Decisions',
    'md-g2-p1': 'We treat packaging as a measurable sales system where material and visual decisions work together.',
    'md-g2-p2': 'With our AI-backed data infrastructure we analyse which material structures, formats and visual approaches increase purchase likelihood on shelf in meat and dairy.',
    'md-g3-title': 'Premium Look at Low Volumes',
    'md-g3-p': 'Without changing your pouch structure, we help you achieve a distinct, story-driven shelf presence with low-volume production and seasonal, segment-specific design flexibility—so your brand is both safe and perceived as premium.',
    'md-f1-title': 'Envelope-Style Carton Systems',
    'md-f1-li1': 'Creates brand surface without changing the inner pack',
    'md-f1-li2': 'Suitable for low-volume runs and flexible for specials',
    'md-f1-li3': 'Strengthens shelf impact',
    'md-f2-title': 'Sleeve-Based Packaging Systems',
    'md-f2-li1': 'Builds a premium, secure shelf impression',
    'md-f2-li2': 'Wide area for communication and information',
    'md-f2-li3': 'Suitable for low volumes and flexible design',
    'md-f2-li4': 'Easily adapts to different products and design variants',
    'md-f3-title': 'Sustainable Packaging Structures',
    'md-f3-li1': 'Mono-material and recyclable options',
    'md-f3-li2': 'PPWR and regulation-compliant structures',
    'md-f3-li3': 'Balance of barrier needs and sustainability',
    'md-f3-li4': 'Paper–flexible hybrid solutions where suitable',
    'md-f4-title': 'Premium Presentation and Campaign Packs',
    'md-f4-li1': 'Multi-product sets and gift packs',
    'md-f4-li2': 'Campaign and seasonal packaging updates',
    'md-f4-li3': 'Structures that create volume and premium perception on shelf',
    'md-f4-li4': 'Cost-efficient carton and pouch systems',
    // Dry Foods
    'df-hero-title': 'Innovative Packaging Solutions for Dry Foods',
    'df-hero-desc': 'AunoPack develops solutions for brands in both standard and premium dry foods: measurable positioning, cost optimisation and environmental compliance using sleeves, paper–plastic hybrids, and sustainable flexible packaging systems.',
    'df-g1-title': 'Data-Driven Packaging Decisions',
    'df-g1-p1': 'We treat packaging as a measurable sales system where material and visual decisions work together.',
    'df-g1-p2': 'With our AI-backed data we analyse which material structures, formats and visual approaches increase purchase likelihood on shelf in pasta, granola and dry foods.',
    'df-g2-title': 'Shelf Life',
    'df-g2-p1': 'Moisture and oxygen control directly affect shelf life in pasta, granola and pulses. The right film and seal quality help you hit your best-before target.',
    'df-g2-p2': 'Sleeve and carton layers can serve as both protection and brand surface for dry formats.',
    'df-g3-title': 'Sustainable Packaging',
    'df-g3-p1': 'Recyclable pouch and reel structures in dry foods, with material simplification and mono-material design, offer options to reduce environmental impact.',
    'df-g3-p2': 'Paper-based structures, mono-PE or recyclable flexibles can meet both product protection and sustainability goals.',
    'df-f1-title': 'Premium Packaging Solutions',
    'df-f1-li1': 'Product protection with functional inner pouch',
    'df-f1-li2': 'Premium, sustainable shelf look with carton overwrap',
    'df-f1-li3': 'Flexible stock and print management with fixed inner pack and variable outer design',
    'df-f1-li4': 'Suitable for small runs and low minimums',
    'df-f2-title': 'Design-Led Sleeve Systems',
    'df-f2-li1': 'Strong, legible brand communication with a large, continuous print surface',
    'df-f2-li2': 'Flexible system for low volumes and design changes',
    'df-f2-li3': 'Sustainable carton options for environmental compliance',
    'df-f2-li4': 'Suitable for window, die-cut and innovative design applications',
    'df-f3-title': 'Sustainable Packaging Structures',
    'df-f3-li1': 'Compostable packaging structures',
    'df-f3-li2': 'Paper-based packaging suitable for recycling',
    'df-f3-li3': 'Recyclable paper packaging for automatic packing lines',
    'df-f3-li4': 'Recyclable or compostable bags',
    'df-f4-title': 'Premium and Special Presentation',
    'df-f4-li1': 'Multi-product sets and bundle packaging',
    'df-f4-li2': 'Structures optimised for campaign and promotion packs',
    'df-f4-li3': 'Carton and pouch systems with optimised volume for multiple combinations',
    'df-f4-li4': 'Rational material use in premium carton systems',
    // FAQ Confectionery
    'cc-faq-q1': 'How do you differentiate in confectionery and snack packaging?',
    'cc-faq-a1': 'In snacking, differentiation does not come from graphics alone. Real differentiation happens in three areas:<br><br>- Structural form (stand-up pouch, box + inner bag, sleeve systems)<br>- Material choice (matte, kraft, mono-material, tactile surfaces)<br>- Volume and presence on shelf<br><br>Data-driven packaging analysis helps your brand stand out structurally from competitors.',
    'cc-faq-q2': 'Is design enough, or should the structure change too?',
    'cc-faq-a2': 'Many brands only change the graphic design. But real impact on shelf often comes from changing the packaging structure.<br><br>For example:<br><br>- Volume-base systems instead of the same flat pouch<br>- Premium feel with carton sleeve<br>- Hybrid paper + flexible structures<br><br>Structural differentiation helps you step out of price competition.',
    'cc-faq-q3': 'What should you consider when looking for confectionery packaging ideas?',
    'cc-faq-a3': 'Beyond trend visuals, consider:<br><br>- Product sensitivity to moisture and oxygen<br>- Shelf-life target<br>- Target market sustainability expectations<br>- Cost pressure<br><br>Prefer technically validated packaging systems over purely aesthetic ideas.',
    'cc-faq-q4': 'Are sustainable confectionery and snack packs possible?',
    'cc-faq-a4': 'Sustainable options are possible for many snack products. This depends on:<br><br>- Barrier needs of the product<br>- Machine compatibility<br>- Supply chain capacity<br><br>Mono-material transition or hybrid systems can strengthen brand perception while meeting regulations.',
    'cc-faq-q5': 'How do you optimise confectionery packaging cost?',
    'cc-faq-a5': 'The right approach is to analyse the packaging system as a whole for the product. Data-driven analysis identifies over-engineered or excessively high-barrier structures so you can optimise materials, structure and system without losing performance.<br><br>Cost reduction should not compromise product safety, shelf life or brand perception.',
    'cc-faq-q6': 'How do you create packaging that stands out with AI?',
    'cc-faq-a6': 'AI supports the packaging decision process by analysing:<br><br>- Competitor analysis<br>- Structural comparisons<br>- Sustainability risk assessment<br>- Cost optimisation scenarios<br><br>So packaging becomes a strategic growth tool, not just design.',
    'cc-faq-q7': 'How do you build a real packaging strategy instead of mockups?',
    'cc-faq-a7': 'Mockups inspire but are not enough for sales growth.<br><br>A real strategy includes:<br><br>- Product technical analysis<br>- Competitor shelf review<br>- Structural differentiation potential<br>- Sustainability compliance<br>- Cost balance',
    // FAQ Ready Meals
    'rm-faq-q1': 'What is sleeve packaging?',
    'rm-faq-a1-1': 'Sleeve packaging is a carton outer layer that wraps around the primary pack (e.g. tray, bowl or kraft box) and does not fully enclose the product.',
    'rm-faq-a1-2': 'In the AUNO system, the sleeve is not just a pack part but a modular brand layer that moves the product into the premium segment.',
    'rm-faq-q2': 'Why use sleeves for ready meals and meal kits?',
    'rm-faq-a2-1': 'The sleeve system lets you position the product as premium without changing the tray or film.',
    'rm-faq-a2-2': 'It provides a larger communication area, makes campaign and special editions easier, and uses material more efficiently than fully closed cartons.',
    'rm-faq-q3': 'How does AUNO AI optimise sleeve design?',
    'rm-faq-a3-1': 'AUNO AI derives dimensions automatically and offers data-driven design using parameters such as product size, tray type, shelf position and target segment.',
    'rm-faq-a3-2': 'It also evaluates text density, readability, visual hierarchy and communication balance to define the layout for maximum brand impact.',
    'rm-faq-q4': 'Is the sleeve system suitable for low-volume production?',
    'rm-faq-a4-1': 'Yes. The sleeve is ideal for campaigns, special occasions and limited editions.',
    'rm-faq-a4-2': 'With the primary pack unchanged, only the outer layer is updated, reducing stock risk and enabling fast market adaptation.',
    'rm-faq-q5': 'Is sleeve packaging sustainable?',
    'rm-faq-a5-1': 'Sleeves can be made from paper-based materials and can use less material than fully closed cartons.',
    'rm-faq-a5-2': 'AUNO AI helps optimise environmental impact by analysing grammage, logistics efficiency and sustainability criteria.',
    'rm-faq-q6': 'Which product types suit the sleeve system?',
    'rm-faq-a6-1': 'Single-portion ready meals, MAP tray systems, frozen products, meal kit sets and kraft-box presentation packs are all suitable for sleeves.',
    'rm-faq-a6-2': 'The right format (full sleeve, half band or carton overwrap) is determined via the modular system.',
    // FAQ Meat & Dairy
    'md-faq-q1': 'Can I get a premium look with low-volume production?',
    'md-faq-a1': 'Yes. Carton sleeve systems applied over unprinted pouches or vacuum packs can create a high shelf-value look even at low volumes.',
    'md-faq-q2': 'Can I differentiate on shelf without changing my current pack?',
    'md-faq-a2': 'Yes. You can strengthen design and communication on the outer layer while keeping the inner pack. This does not disrupt production.',
    'md-faq-q3': 'I want to share more product information. Is there enough space?',
    'md-faq-a3': 'Sleeve and carton carrier systems offer a large area for brand story, content information, certifications and usage tips.',
    'md-faq-q4': 'Is this system expensive for smaller brands?',
    'md-faq-a4': 'No. Sleeve systems suit low print runs and reduce investment per product variant.',
    'md-faq-q5': 'Can I offer different product varieties with the same pouch?',
    'md-faq-a5': 'Yes. The inner pack can stay the same while you change the design layer, so you can manage variety in a cost-effective way.',
    'md-faq-q6': 'Can I get support during the design process?',
    'md-faq-a6': 'Yes. AI-supported design analysis provides design recommendations based on category trends, shelf density and brand positioning.',
    'md-faq-q7': 'How do I stand out in a crowded shelf?',
    'md-faq-a7': 'Differentiation within the category comes from geometry, use of white space, surface texture and communication area optimisation.',
    'md-faq-q8': 'Is this system only for premium brands?',
    'md-faq-a8': 'No. Sleeve and envelope-style carton systems work for brands in different segments too.',
    // FAQ Dry Foods
    'df-faq-q1': 'Why is moisture barrier important in pasta and granola packaging?',
    'df-faq-a1': 'Moisture directly affects brittleness, mould risk and shelf life in pasta, granola and pulses. The right barrier film and seal help the product meet its best-before target. AunoPack analyses suitable materials and structures for your product type.',
    'df-faq-q2': 'How do you make the right packaging decision for dry foods?',
    'df-faq-a2': 'The right packaging decision is based not only on product type or protection needs but also on weight, consumption frequency, target price segment, shelf positioning and logistics.',
    'df-faq-q3': 'Can you produce dry food cartons or sleeves in low volumes?',
    'df-faq-a3': 'Yes. Sleeves and kraft carton overwraps suit low print runs and allow premium presentation for campaign, special-occasion and limited-edition pasta, granola or breakfast products without stock risk.',
    'df-faq-q4': 'Does sustainable material shorten shelf life?',
    'df-faq-a4': 'Not always. In dry foods, paper/carton-based and recyclable structures can be balanced with moisture barrier needs for many product types. AunoPack analyses the balance between sustainability and shelf life for your product.',
    'df-faq-q5': 'Can I get data support for design and material choice?',
    'df-faq-a5': 'Yes. Our AI-backed data infrastructure evaluates shelf preference likelihood, material performance and sustainability together in dry foods and provides design and structure recommendations.',
    'df-faq-q6': 'What is the difference between kraft carton overwrap and fully printed carton?',
    'df-faq-a6': 'With kraft overwrap, the main carton stays plain or lightly printed; the outer sleeve carries the brand and campaign message. With fully printed cartons, the whole surface is printed. Overwrap is more economical at low volumes, more flexible for campaign changes, and reduces stock risk.'
  },
  tr: {
    welcome: 'AUNO Pack\'e Hoş Geldiniz',
    subtitle: 'Yenilikçi Ambalaj<br>Malzemeleri',
    description: 'Firmanıza ve ürününüze özel geliştirilmiş ambalaj önerileri için iletişime geçin.',
    'tagline-prefix': 'Neden Aunopack',
    tagline: 'Doğru ambalaj kararlarıyla<br>satış hedeflerinizi büyütün.',
    'paper-title': 'Kağıt Ambalaj',
    'paper-desc': 'Gıda tazeliğini ve güvenliğini korumak için tasarlanmış yüksek kaliteli, <span class="highlight-yellow">firmanıza özel baskılı</span>, sürdürülebilir kağıt ve karton ambalajlar',
    'flexible-title': 'Esnek Ambalaj',
    'flexible-desc': 'Çeşitli gıda ürünlerinin paketlenmesi için; <span class="highlight-yellow">dijital veya flekso baskı</span> seçenekleriyle, ürüne uygun ve sürdürülebilir malzeme yapılarıyla üretilmiş esnek ambalajlar',
    'sustainable-title': 'Sürdürülebilir Ambalaj',
    'sustainable-desc': 'Her sürdürülebilir ambalaj stratejisinin farklı avantajları ve zorlukları vardır.<br><br>Uygun çözümü seçerken teknik ihtiyaçlar, maliyet, üretilebilirlik dikkatle değerlendirilmelidir.<br><br>Geri dönüştürülebilir bir çözüm mümkün olmadığında ise, sürdürülebilirliği destekleyen ambalaj yapıları ve malzemeler tercih edilebilir.',
    'ai-title': 'Yapay Zekâ ile Yenilikçi Ambalaj Malzeme Çözümleri',
    'ai-desc': 'Firmanıza ve ürününüze özel geliştirilmiş ambalaj önerileri için iletişime geçin.',
    'print-title': 'Baskı',
    'print-desc': 'Ambalaj ihtiyaçlarınız için özel baskı çözümleri.',
    address: 'Adres: Seyrantepe Mah. İbrahim Karaoğlanoğlu Cad. 85 Kağıthane, İstanbul, Türkiye.',
    'footer-text': 'E-posta: info@aunopack.com. Herhangi bir soru veya destek için bizimle e-posta yoluyla iletişime geçebilir veya firmamızı ziyaret edebilirsiniz.',
    // Navigation
    logo: 'AUNOPACK',
    'nav-products': 'Ürünler',
    'nav-sectors': 'Sektörler',
    'nav-solutions': 'Çözümler',
    'nav-case-studies': 'Blog',
    'nav-about': 'Hakkımızda',
    'nav-cta': 'Teklif Al',
    'mega-products-title': 'Ürünler',
    'mega-sectors-title': 'Sektörler',
    'mega-solutions-title': 'Çözümler',
    'nav-pouches': 'Torbalar',
    'nav-sleeves': 'Sleeveler',
    'nav-envelope-cartons': 'Zarf Tipi Kutular',
    'nav-paperboard': 'Karton Ambalajlar',
    'sector-confectionery': 'Şekerleme & Atıştırmalıklar',
    'sector-meat-dairy': 'Et & Süt Ürünleri',
    'sector-ready-meals': 'Hazır Yemek & Meal Kit',
    'sector-premium': 'Kuru Gıdalar',
    'solution-shelf-life-title': 'Raf Ömrü Odaklı Ambalaj Çözümleri',
    'solution-shelf-life-desc': 'Uzun raf ömrü sağlayan ambalaj yapıları.',
    'solution-shelf-performance-title': 'Raf Performansı Odaklı Ambalaj Çözümleri',
    'solution-shelf-performance-desc': 'Rafta stabil duran, düzgün dizilebilen satış odaklı yapılar.',
    'solution-small-batches-title': 'Küçük Seriler için Ambalaj Çözümleri',
    'solution-small-batches-desc': 'Butik ve özel seri ürünler için profesyonel ambalaj yapıları.',
    'solution-aunoai-title': 'Veri Odaklı Ambalaj Tasarımı ve Malzeme Seçimi',
    'solution-aunoai-desc': 'AunoAI ile veri destekli ambalaj tasarım çözümleri.',
    'nav-who-we-are': 'Biz Kimiz?',
    'nav-how-we-work': 'Nasıl Çalışıyoruz?',
    'nav-sustainability': 'Sürdürülebilirlik',
    'nav-faq': 'SSS',
    'nav-contact': 'İletişim',
    'nav-contact-form': 'İletişim Formu',
    'sr-only-menu': 'Menüyü Aç/Kapat',
    'solutions-link': 'Çözümler',
    'contact-hero-title': 'Bize Ulaşın',
    'contact-hero-desc': 'Sorularınız veya teklif talepleriniz için formu doldurun. En kısa sürede info@aunopack.com üzerinden size dönüş yapacağız.',
    'contact-label-name': 'Ad Soyad',
    'contact-label-email': 'E-posta',
    'contact-label-company': 'Firma / Kurum',
    'contact-label-topic': 'Konu',
    'contact-label-message': 'Mesajınız',
    'contact-placeholder-name': 'Adınız ve soyadınız',
    'contact-placeholder-email': 'ornek@firma.com',
    'contact-placeholder-company': 'Firma adı (isteğe bağlı)',
    'contact-placeholder-message': 'Mesajınızı yazın...',
    'contact-submit': 'Gönder',
    'contact-note': 'Form gönderildiğinde mesajınız <strong>info@aunopack.com</strong> adresine Formspree üzerinden iletilir; e-posta programı açılmaz.',
    'contact-topic-select': 'Konu seçin',
    'contact-topic-product': 'Ürün & Çözüm Talebi',
    'contact-topic-partnership': 'Stratejik İş Birliği',
    'about-hero-title': 'AunoPack',
    'about-p1': 'Firmalar için ambalaj kararı; ürün özellikleri, hedef pazar, segment konumu ve üretim altyapısı ve sürdürülebilir ambalaj tiplerinin değerlendirilmesine bağlı olarak çok boyutlu bir süreçtir. Ancak bu kararlar çoğu zaman sınırlı alternatifler üzerinden ve parçalı değerlendirmelerle alınır.',
    'about-p2': 'AUNO AI; ambalaj kararlarını teknik performans, maliyet, sürdürülebilirlik, makine altyapısı, kullanım miktarı, lojistik koşullar ve tedarik edilebilirlik kriterleri üzerinden çok parametreli olarak analiz eder.',
    'about-p3': 'Sistem; firma hedefleri ile örtüşen optimum ambalaj yapı alternatiflerini belirler ve karşılaştırır. Yapay zeka destekli tasarım portalı ile görsel karar süreci de veri temelli olarak yönetilir.',
    'about-p4': 'Seçilen yapı yalnızca önerilmez; tedarik edilerek uygulanır.',
    'about-p5': 'Markaları yenilikçi, alternatif ve sürdürülebilir ambalaj çözümleri ile buluştururuz.',
    'sector-cta': 'Çözümünü Keşfet',
    'sector-featured-products': 'Öne çıkan ürünler',
    'sector-faq-title': 'Sıkça Sorulan Sorular',
    'sector-faq-intro': 'Sık aldığımız soruları aşağıda topladık. Daha fazlası için <a href="../contact.html">bize ulaşın</a>.',
    // Why AunoPack circles (home)
    'why-1-title': 'Ambalaj Optimizasyonu',
    'why-1-desc': 'Ambalajda gereğinden fazla malzeme kullanımı, yanlış yapı ve verimsiz üretim kaynaklı maliyetleri, daha doğru ambalaj kararlarıyla azaltalım.',
    'why-2-title': 'Ambalajın Satış Üzerindeki Etkisi',
    'why-2-desc': 'Ambalajın; rafta görünürlük, kullanım kolaylığı ve kategori uyumu ile ürün satış performansını desteklemesini hedefliyoruz.',
    'why-3-title': 'Sürdürülebilir Ambalaj Yapıları',
    'why-3-desc': 'Kağıt ve plastik ambalajı eşit mesafede değerlendiriyoruz.',
    'why-3-desc2': 'Malzeme seçimlerinde çevresel etki kadar maliyet, pazar alışkanlıkları, teknik performans ve regülasyonları da dikkate alıyoruz.',
    'why-4-title': 'Ambalaj Kararı',
    'why-4-desc': 'Deneme yanılmaya dayalı, parçalı ve uzun karar süreçlerini; veri ve yapay zekâ destekli daha hızlı ve net bir yapıya dönüştürüyoruz.',
    'why-5-title': 'Malzeme ve Sistem Düzeyinde İnovasyon',
    'why-5-desc': 'Yapay Zeka Destekli Ambalaj Geliştirme Platformumuzla Ar-ge Süreçlerinizi Destekliyoruz.',
    // Confectionery & Chocolate
    'cc-hero-title': 'Şekerleme & Çikolata İçin<br>Yenilikçi Ambalaj Çözümleri',
    'cc-hero-desc': 'Şekerleme ve atıştırmalık segmentinde ambalaj; ürünü korumanın ötesinde, rafta ayrışma ve satın alma kararını yönlendiren bir araçtır.<br><br>Bu nedenle satışı destekleyen ambalaj; veriyle kurgulanmış, rakiplerden ayrışan ve sürdürülebilirlik dengesini gözeten stratejik bir karardır.',
    'cc-g1-title': 'Trend Uyum & Hızlı Ambalaj Güncelleme',
    'cc-g1-p': 'Şekerleme ve çikolata kategorisinde trendler hızla değişir. Sezonluk kampanyalar, özel gün tasarımları ve sınırlı üretim seriler için ambalajınızı hızlı ve kontrollü şekilde güncellemenizi sağlıyoruz.',
    'cc-g2-title': 'Veri Destekli Ambalaj Kararları',
    'cc-g2-p1': 'Ambalajı malzeme ve görsel kararların birlikte çalıştığı ölçülebilir bir satış sistemi olarak ele alıyoruz.',
    'cc-g2-p2': 'AI destekli veri altyapımızla; şekerleme ve atıştırmalık kategorisinde hangi malzeme yapısının, hangi formun ve hangi görsel yaklaşımın raf üzerindeki tercih olasılığını artıracağını analiz ediyoruz.',
    'cc-g3-title': 'Raf Ömrü ve Ürün Koruma Performansı',
    'cc-g3-p1': 'Şekerleme ve atıştırmalık ürünlerde nem, ışık ve aroma kaybı doğrudan kaliteyi etkiler.',
    'cc-g3-p2': 'Hedeflenen S.K.T. süresine uygun malzeme ve yapı kombinasyonlarını analiz ederiz.',
    'cc-g4-title': 'Sürdürülebilirlik ve Maliyet Dengesi',
    'cc-g4-p1': 'Sürdürülebilirlik hedeflerini, üretim gerçekleri ve birim maliyetlerle birlikte ele alırız.',
    'cc-g4-p2': 'Hem çevresel hem finansal açıdan dengeli ambalaj yapıları kurgular, uygun sürdürülebilir malzeme alternatiflerini tedarik ederiz.',
    'cc-f1-title': 'Esnek Ambalaj Sistemleri ve Karton Sistemleri',
    'cc-f1-li1': 'Şeffaf yapı sayesinde ürün görünürlüğü',
    'cc-f1-li2': 'Karton sistemi ile geniş marka alanı',
    'cc-f1-li3': 'Düşük minimum sipariş seçenekleri',
    'cc-f1-li4': 'Ana ambalaj korunur, karton sistem güncellenir; stok riski ve ambalaj kaybı minimize edilir.',
    'cc-f1-note': 'Otomatik paketleme hat formuna sahip sırt kaynaklı poşetler',
    'cc-f2-title': 'Sleeve Giydirmeli Ambalaj Sistemleri',
    'cc-f2-li1': 'Ana ambalaj değişmeden, yalnızca sleeve güncellenerek raf görünümü yenilenir',
    'cc-f2-li2': 'Sezonluk ve limited edition tasarımlara uygun yapı',
    'cc-f2-li3': 'Düşük minimum sipariş seçenekleri',
    'cc-f2-li4': "Kutu ambalaja kıyasla (%50'nin üzerine çıkabilen*) daha az karton kullanımı",
    'cc-f3-title': 'Sürdürülebilir Ambalaj Yapıları',
    'cc-f3-li1': 'Kompostlanabilir ambalaj yapıları',
    'cc-f3-li2': 'Geri dönüşüme uygun kağıt bazlı ambalajlar',
    'cc-f3-li3': 'Otomatik paketleme hatlarına uygun geri dönüştürülebilir kağıt ambalaj çözümleri',
    'cc-f3-li4': 'Geri dönüştürülebilir veya kompostlanabilir torbalar',
    'cc-f4-title': 'Premium ve Özel Sunum Çözümleri',
    'cc-f4-li1': 'Çoklu ürün setleri ve bundle paketleme sistemleri',
    'cc-f4-li2': 'Kampanya ve promosyon paketleri için optimize edilmiş ambalaj yapıları',
    'cc-f4-li3': 'Çoklu kombinasyonlara uygun, hacmi optimize edilmiş karton ve torba sistemleri',
    'cc-f4-li4': 'Premium Kutu Sistemlerinde Akılcı Malzeme Kullanımı',
    // Ready Meals
    'rm-hero-title': 'Hazır Yemeklerde Premium Segment Çözümleri',
    'rm-hero-desc': 'Daha az malzeme. Daha optimize edilmiş tasarım. Daha yüksek etki.<br><br>Veri ve AI destekli ambalaj karar sistemimiz; ikincil ambalaj olan sleeve çözümüyle kağıt kalınlığı, yapısal form, baskı yüzeyi oranı, tasarım ve sürdürülebilirlik kriterlerini birlikte analiz ederek hazır yemek ürünlerinde premium segment konumunu ölçülebilir şekilde optimize eder.',
    'rm-g1-title': 'Genişletilmiş Marka Hikayesi',
    'rm-g1-p1': 'Hazır yemek ambalajlarında baskılı film yüzeylerindeki iletişim alanı sınırlıdır. Oysa tüketici; ürün içeriği, üretim süreci ve marka yaklaşımı hakkında daha fazla ve daha net bilgi görmek ister.',
    'rm-g1-p2': 'Sleeve çözümleri; geniş yüzeyi sayesinde okunabilirliği artırır, mesajları netleştirir. QR kodlar ve detaylı marka anlatımı için ek alan sunar.',
    'rm-g2-title': 'Düşük Adet Avantajı',
    'rm-g2-p1': "Karton Sleeve'ler mevcut ambalajı değiştirmeden ürünü premium segmente taşımanın en esnek yoludur.",
    'rm-g2-p2': 'Ana ambalajı yenilemeye gerek kalmadan yalnızca sleeve tasarımı değiştirilerek trendlere uyum sağlanabilir, özel gün konseptleri geliştirilebilir ve yeni ürün denemeleri yapılabilir.',
    'rm-g2-p3': 'Bu yaklaşım; yüksek stok riski oluşturmadan segment yükseltme ve sınırlı seri ürün geliştirmenin en hızlı ve pratik yoludur.',
    'rm-g3-title': 'Sürdürülebilir Marka Katmanı',
    'rm-g3-p1': 'Hazır yemek ambalajlarında fonksiyonel kap yapısı çoğu zaman zorunludur. Sleeve çözümleri; bu yapıyı değiştirmeden, yenilenebilir ve sorumlu kaynaklı kağıt bazlı bir marka katmanı ekleyerek sürdürülebilirlik algısını güçlendirir.',
    'rm-g3-p2': 'Daha az malzeme kullanımı, optimize edilmiş gramaj ve kağıt teması sayesinde hem çevresel etki azaltılır hem de tüketici nezdinde daha doğal ve sorumlu bir marka konumu oluşturulur.',
    'rm-f1-title': 'Esnek Ambalaj Sistemleri ve Karton Sistemleri',
    'rm-f1-li1': 'Şeffaf yapı sayesinde ürün görünürlüğü',
    'rm-f1-li2': 'Karton sistemi ile geniş marka alanı',
    'rm-f1-li3': 'Düşük minimum sipariş seçenekleri',
    'rm-f1-li4': 'Ana ambalaj korunur, karton sistem güncellenir; stok riski ve ambalaj kaybı minimize edilir.',
    'rm-f1-li5': 'Otomatik paketleme hat formuna sahip sırt kaynaklı poşetler',
    'rm-f2-title': 'Sleeve Sistemi',
    'rm-f2-li1': 'Kapalı veya yarım açık sleeve seçenekleri ile farklı ürün formatlarına uyum sağlayan modüler yapı',
    'rm-f2-li2': 'AUNO AI destekli sistem ile ürün ölçüsü ve tray tipine göre otomatik ölçü ve hızlı prototip',
    'rm-f2-li3': 'Kampanya ve özel seriler için düşük adetli üretime uygun, ana ambalajı değiştirmeden stok riskini azaltan esnek yapı',
    'rm-f2-li4': 'Baskılı filmlere kıyasla daha geniş ve optimize edilmiş iletişim yüzeyi',
    // Meat & Dairy
    'md-hero-title': 'Et & Süt Ürünleri<br>Premium Raf Konumlandırma Çözümleri',
    'md-hero-desc': 'Et, süt ürünleri ve şarküteri kategorisinde ambalaj; yalnızca koruma değil, aynı zamanda konumlandırma aracıdır. Bariyer performansı ve raf ömrü birincil ambalajla sağlanırken, marka algısı ikinci plana atılmamalıdır.<br><br>AunoPack, mevcut baskısız vakum torbaları veya bariyerli ambalaj yapıları üzerine geliştirdiği karton sleeve ve destek sistemleriyle, teknik güvenliği koruyarak ürünlerinizi premium segmente taşır.',
    'md-g1-title': 'Baskısız Ambalajlarda Marka Katmanı',
    'md-g1-p1': 'Et ve süt ürünlerinde kullanılan skinpack ve shrink torba sistemleri ürün koruma ve raf ömrü açısından yüksek performans sağlar; ancak bu yapılar çoğu zaman baskısızdır veya marka iletişimi için yeterli yüzey sunmaz.',
    'md-g1-p2': 'Karton bir marka katmanı ile, ürünü koruyan teknik ambalaja rafta ayrışmayı sağlayan görünürlük katmanını ekleyin.',
    'md-g2-title': 'Veri Destekli Ambalaj Kararları',
    'md-g2-p1': 'Ambalajı malzeme ve görsel kararların birlikte çalıştığı ölçülebilir bir satış sistemi olarak ele alıyoruz.',
    'md-g2-p2': 'AI destekli veri altyapımızla; et ve süt ürünleri kategorisinde hangi malzeme yapısının, hangi formun ve hangi görsel yaklaşımın raf üzerindeki tercih olasılığını artıracağını analiz ediyoruz.',
    'md-g3-title': 'Düşük Adetlerde Premium Görüntü',
    'md-g3-p': 'Mevcut torba yapısını değiştirmeden, düşük adetlerde üretim imkânıyla, sezonluk ve segment bazlı tasarım esnekliği sunarak, raf üzerinde ayrışan ve hikâyesi olan bir görünüm oluşturarak markanızın hem güvenli hem de algısal olarak güçlü bir konuma ulaşmasını sağlar.',
    'md-f1-title': 'Zarf Tipi Kutu Sistemleri',
    'md-f1-li1': 'İç ambalajı değiştirmeden marka yüzeyi oluşturur',
    'md-f1-li2': 'Düşük adetli üretimlere uygundur, özel seri ürünlerde esneklik sunar',
    'md-f1-li3': 'Raf etkisini artırır',
    'md-f2-title': 'Sleeve Giydirmeli Ambalaj Sistemleri',
    'md-f2-li1': 'Premium ve güvenli bir raf algısı oluşturur',
    'md-f2-li2': 'Geniş iletişim ve bilgi alanı sunar',
    'md-f2-li3': 'Düşük adetlere ve esnek tasarıma uygundur',
    'md-f2-li4': 'Farklı ürün ve tasarım varyasyonlarına kolayca uyum sağlar',
    'md-f3-title': 'Sürdürülebilir Ambalaj Yapıları',
    'md-f3-li1': 'Mono-material ve geri dönüştürülebilir alternatifler',
    'md-f3-li2': 'PPWR ve regülasyon uyumlu yapılar',
    'md-f3-li3': 'Bariyer ihtiyacı ile sürdürülebilirlik dengesi',
    'md-f3-li4': 'Kağıt-esnek hibrit çözümler (ürüne uygun olduğunda)',
    'md-f4-title': 'Premium Sunum ve Kampanya Paketleri',
    'md-f4-li1': 'Çoklu ürün setleri ve hediye paketleri',
    'md-f4-li2': 'Kampanya ve sezonsal ambalaj güncellemeleri',
    'md-f4-li3': "Raf'ta hacim ve premium algı yaratan yapılar",
    'md-f4-li4': 'Maliyet verimli karton ve torba sistemleri',
    // Dry Foods
    'df-hero-title': 'Kuru Gıdalarda Yenilikçi Ambalaj Çözümleri',
    'df-hero-desc': 'AunoPack; sleeve, kağıt-plastik hibrit yapılar, sürdürülebilir ve esnek ambalaj sistemleriyle hem standart hem premium segmentte markalar için ölçülebilir konumlandırma, maliyet optimizasyonu ve çevresel uyum odaklı çözümler geliştirir.',
    'df-g1-title': 'Veri Destekli Ambalaj Kararları',
    'df-g1-p1': 'Ambalajı malzeme ve görsel kararların birlikte çalıştığı ölçülebilir bir satış sistemi olarak ele alıyoruz.',
    'df-g1-p2': 'AI destekli veri altyapımızla; makarna, granola ve kuru gıda kategorisinde hangi malzeme yapısının, formun ve görsel yaklaşımın raf üzerindeki tercih olasılığını artıracağını analiz ediyoruz.',
    'df-g2-title': 'Raf Ömrü',
    'df-g2-p1': 'Makarna, granola ve bakliyat ürünlerinde nem ve oksijen kontrolü raf ömrünü doğrudan etkiler. Doğru film yapısı ve kapatma kalitesi ile hedeflenen S.K.T. süresine ulaşılır.',
    'df-g2-p2': 'Sleeve ve karton katmanları hem koruma hem marka yüzeyi olarak kuru gıda formatlarına uyarlanabilir.',
    'df-g3-title': 'Sürdürülebilir Ambalajlar',
    'df-g3-p1': 'Kuru gıda ambalajlarında geri dönüştürülebilir torba ve bobin yapıları; malzeme sadeleştirme ve mono-materyal tasarım yaklaşımı sayesinde çevresel etkiyi azaltmaya yönelik alternatifler sunar.',
    'df-g3-p2': 'Kağıt bazlı yapılar, mono-PE veya geri dönüştürülebilir esnek ambalaj seçenekleri ile hem ürün koruma hem de sürdürülebilirlik kriterleri birlikte değerlendirilebilir.',
    'df-f1-title': 'Premium Ambalaj Çözümleri',
    'df-f1-li1': 'Fonksiyonel iç torba ile ürün koruma',
    'df-f1-li2': 'Karton giydirme ile premium ve sürdürülebilir raf görünümü',
    'df-f1-li3': 'Sabit iç ambalaj yapısı ile değişken dış tasarım sayesinde esnek stok ve baskı yönetimi',
    'df-f1-li4': 'Küçük ölçekli üretim ve düşük adetli siparişlere uygun yapı',
    'df-f2-title': 'Tasarım Odaklı Sleeve Sistemleri',
    'df-f2-li1': 'Geniş ve kesintisiz baskı yüzeyi ile güçlü ve okunaklı marka iletişimi',
    'df-f2-li2': 'Düşük adetli üretim ve tasarım değişimine uygun esnek sistem',
    'df-f2-li3': 'Sürdürülebilir karton alternatifleri ile çevresel uyumlu çözüm',
    'df-f2-li4': 'Pencereli, özel kesimli ve yenilikçi tasarım uygulamalarına uygun yapı',
    'df-f3-title': 'Sürdürülebilir Ambalaj Yapıları',
    'df-f3-li1': 'Kompostlanabilir ambalaj yapıları',
    'df-f3-li2': 'Geri dönüşüme uygun kağıt bazlı ambalajlar',
    'df-f3-li3': 'Otomatik paketleme hatlarına uygun geri dönüştürülebilir kağıt ambalaj çözümleri',
    'df-f3-li4': 'Geri dönüştürülebilir veya kompostlanabilir torbalar',
    'df-f4-title': 'Premium ve Özel Sunum Çözümleri',
    'df-f4-li1': 'Çoklu ürün setleri ve bundle paketleme sistemleri',
    'df-f4-li2': 'Kampanya ve promosyon paketleri için optimize edilmiş ambalaj yapıları',
    'df-f4-li3': 'Çoklu kombinasyonlara uygun, hacmi optimize edilmiş karton ve torba sistemleri',
    'df-f4-li4': 'Premium Kutu Sistemlerinde Akılcı Malzeme Kullanımı',
    // FAQ Confectionery
    'cc-faq-q1': "Şekerleme ve Atıştırmalık Ambalajları'nda farklılaşma nasıl sağlanır?",
    'cc-faq-a1': 'Atıştırmalık kategorisinde farklılaşma yalnızca grafik tasarımla sağlanmaz. Gerçek ayrışma şu üç alanda oluşur:<br><br>- Yapısal form (stand-up pouch, box + inner bag, sleeve systems)<br>- Malzeme seçimi (mat, kraft, mono-material, dokunsal yüzeyler)<br>- Raf\'ta hacim ve duruş avantajı<br><br>Veri destekli ambalaj analizi, markanın rakiplerinden yapısal olarak ayrışmasını sağlar.',
    'cc-faq-q2': 'Şekerleme ve Atıştırmalık Ambalajları tasarımı yeterli mi, yoksa yapı da değişmeli mi?',
    'cc-faq-a2': 'Çoğu marka yalnızca grafik tasarım değiştirir. Ancak raf\'ta gerçek etki çoğu zaman yapısal ambalaj değişimi ile oluşur.<br><br>Örneğin:<br><br>- Aynı doypack yerine hacimli tabanlı sistem<br>- Karton sleeve ile premium algı<br>- Hibrit kağıt + esnek yapı<br><br>Yapısal farklılaşma, fiyat rekabetinden çıkmayı destekler.',
    'cc-faq-q3': 'Şekerleme ve Atıştırmalık Ambalajları fikirleri ararken nelere dikkat edilmeli?',
    'cc-faq-a3': 'Trend görseller yerine şu kriterler değerlendirilmelidir:<br><br>- Ürünün nem ve oksijen hassasiyeti<br>- Raf ömrü hedefi<br>- Hedef pazarın sürdürülebilirlik beklentisi<br>- Maliyet baskısı<br><br>Yalnızca estetik fikirler yerine teknik olarak doğrulanmış ambalaj sistemleri tercih edilmelidir.',
    'cc-faq-q4': 'Sürdürülebilir Şekerleme ve Atıştırmalık Ambalajları mümkün mü?',
    'cc-faq-a4': 'Birçok atıştırmalık ürün için sürdürülebilir alternatifler mümkündür. Ancak bu:<br><br>- Ürünün bariyer ihtiyacına<br>- Makine uyumluluğuna<br>- Tedarik zinciri kapasitesine<br><br>bağlıdır.<br><br>Mono-material geçiş veya hibrit sistemler, regülasyon uyumu sağlarken marka algısını güçlendirebilir.',
    'cc-faq-q5': 'Şekerleme ve Atıştırmalık Ambalajları maliyeti nasıl optimize edilir?',
    'cc-faq-a5': 'Doğru yaklaşım, ambalaj sisteminin ürün özelinde bütüncül olarak analiz edilmesidir. Veri destekli analiz, gereğinden yüksek bariyerli veya aşırı mühendislik yapılmış ambalaj yapılarının tespit edilmesini sağlar. Böylece performans kaybı olmadan malzeme, yapı ve sistem optimizasyonu yapılabilir.<br><br>Maliyet düşürme çalışmaları; ürün güvenliğini, raf ömrünü ve marka algısını riske atmadan gerçekleştirilmelidir.',
    'cc-faq-q6': 'AI ile fark yaratan ambalaj nasıl oluşturulur?',
    'cc-faq-a6': 'Yapay zeka, ambalaj karar sürecinde:<br><br>- Rakip analizini<br>- Yapısal karşılaştırmaları<br>- Sürdürülebilirlik risk değerlendirmesini<br>- Maliyet optimizasyon senaryolarını<br><br>veri üzerinden analiz etmeye yardımcı olur.<br><br>Bu sayede ambalaj yalnızca tasarım değil, stratejik büyüme aracı haline gelir.',
    'cc-faq-q7': 'Mockup yerine gerçek ambalaj stratejisi nasıl oluşturulur?',
    'cc-faq-a7': 'Mockup görseller ilham verir ancak satış artışı için yeterli değildir.<br><br>Gerçek strateji:<br><br>- Ürün teknik analizi<br>- Rakip raf incelemesi<br>- Yapısal farklılaşma potansiyeli<br>- Sürdürülebilirlik uyumu<br>- Maliyet dengesi',
    // FAQ Ready Meals
    'rm-faq-q1': 'Sleeve ambalaj nedir?',
    'rm-faq-a1-1': 'Sleeve ambalaj; tray, kase veya kraft kutu gibi ana ambalaj yapısının etrafına uygulanan, ürünü tamamen kapatmayan karton dış katmandır.',
    'rm-faq-a1-2': 'AUNO sisteminde sleeve; yalnızca bir ambalaj parçası değil, ürünü premium segmente taşıyan modüler bir marka katmanı olarak konumlandırılır.',
    'rm-faq-q2': 'Hazır yemek ve meal kit ürünlerinde neden sleeve tercih edilmelidir?',
    'rm-faq-a2-1': 'Sleeve sistemi; ana tray veya film yapısını değiştirmeden ürünü premium konumlandırma imkânı sunar.',
    'rm-faq-a2-2': 'Daha geniş iletişim yüzeyi sağlar, kampanya ve özel seri geçişlerini kolaylaştırır ve tam kapalı kutulara kıyasla daha verimli malzeme kullanımı sunar.',
    'rm-faq-q3': 'AUNO AI sleeve tasarımını nasıl optimize eder?',
    'rm-faq-a3-1': 'AUNO AI; ürün ölçüsü, tray tipi, raf konumu ve hedef segment gibi parametreleri analiz ederek otomatik ölçü çıkarır ve AI ile veri destekli tasarım hizmeti verir.',
    'rm-faq-a3-2': 'Ayrıca metin yoğunluğu, okunabilirlik, görsel hiyerarşi ve iletişim dengesi gibi kriterleri değerlendirerek maksimum marka etkisi sağlayacak yerleşimi belirler.',
    'rm-faq-q4': 'Sleeve sistemi düşük adetli üretime uygun mudur?',
    'rm-faq-a4-1': 'Evet. Sleeve yapısı kampanya, özel gün ve sınırlı seri ürünler için idealdir.',
    'rm-faq-a4-2': 'Ana ambalaj sabit kalırken yalnızca dış katman değiştirilerek stok riski azaltılır ve pazara hızlı adaptasyon sağlanır.',
    'rm-faq-q5': 'Sleeve ambalaj sürdürülebilir midir?',
    'rm-faq-a5-1': 'Sleeve çözümleri kağıt bazlı malzemelerden üretilebilir ve tam kapalı karton kutulara kıyasla daha az malzeme kullanımı sağlayabilir.',
    'rm-faq-a5-2': 'AUNO AI; malzeme gramajı, lojistik verimlilik ve sürdürülebilirlik kriterlerini analiz ederek çevresel etkiyi optimize etmeye yardımcı olur.',
    'rm-faq-q6': 'Hangi ürün tipleri sleeve sistemi için uygundur?',
    'rm-faq-a6-1': 'Tekli porsiyon hazır yemekler, MAP tray sistemleri, donuk ürünler, meal kit setleri ve kraft kutu bazlı sunum paketleri sleeve sistemi için uygundur.',
    'rm-faq-a6-2': 'Uygun yapı (tam sleeve, yarım band veya kutu giydirme) modüler sistem üzerinden belirlenir.',
    // FAQ Meat & Dairy
    'md-faq-q1': 'Düşük adetli üretimlerde premium görünüm elde edebilir miyim?',
    'md-faq-a1': 'Evet. Baskısız torba veya vakum ambalaj üzerine uygulanan karton sleeve sistemleri ile düşük adetlerde dahi raf değeri yüksek bir görünüm oluşturulabilir.',
    'md-faq-q2': 'Mevcut ambalajımı değiştirmeden rafta farklılaşabilir miyim?',
    'md-faq-a2': 'Evet. Mevcut iç ambalaj korunarak dış katmanda tasarım ve iletişim gücü artırılabilir. Bu yöntem üretim sürecini bozmaz.',
    'md-faq-q3': 'Ürün hakkında daha fazla bilgi paylaşmak istiyorum, alan yeterli olur mu?',
    'md-faq-a3': 'Sleeve ve karton taşıyıcı sistemler; marka hikâyesi, içerik bilgileri, sertifikalar ve kullanım önerileri için geniş iletişim alanı sunar.',
    'md-faq-q4': 'Küçük markalar için bu sistem maliyetli midir?',
    'md-faq-a4': 'Hayır. Sleeve sistemleri düşük baskı adetlerine uygundur ve ürün çeşidi başına yatırım yükünü azaltır.',
    'md-faq-q5': 'Aynı torba ile farklı ürün çeşitleri çıkarabilir miyim?',
    'md-faq-a5': 'Evet. İç ambalaj sabit kalırken tasarım katmanı değiştirilebilir. Bu da ürün çeşitliliğini maliyet etkin şekilde yönetmenizi sağlar.',
    'md-faq-q6': 'Tasarım sürecinde destek alabiliyor muyum?',
    'md-faq-a6': 'Evet. Yapay zekâ destekli tasarım analizi ile kategori trendleri, raf yoğunluğu ve marka konumlandırmasına uygun tasarım önerileri sunulur.',
    'md-faq-q7': 'Raf kalabalığında nasıl öne çıkarım?',
    'md-faq-a7': 'Geometri, renk boşluğu, yüzey dokusu ve iletişim alanı optimizasyonu ile kategori içinde ayrışma sağlanır.',
    'md-faq-q8': 'Bu sistem sadece premium markalar için mi?',
    'md-faq-a8': 'Hayır. Sleeve ve zarf tipi kutu sistemleri farklı segmentlerdeki markalar için de uygundur.',
    // FAQ Dry Foods
    'df-faq-q1': 'Makarna ve granola ambalajında nem bariyeri neden önemlidir?',
    'df-faq-a1': 'Nem; makarna, granola ve bakliyatın kırılganlığını, küf riskini ve raf ömrünü doğrudan etkiler. Doğru bariyer film ve kapatma yapısı ile ürün hedeflenen S.K.T. süresine güvenle ulaşır. AunoPack, ürün tipinize göre uygun malzeme ve yapıyı analiz eder.',
    'df-faq-q2': 'Kuru gıdalarda doğru ambalaj kararı nasıl verilir?',
    'df-faq-a2': 'Doğru ambalaj kararı yalnızca ürün tipine veya koruma ihtiyacına göre değil; ürünün gramajı, tüketim sıklığı, hedef fiyat segmenti, raf konumlandırması ve lojistik gereklilikleri birlikte değerlendirilerek verilir.',
    'df-faq-q3': 'Düşük adetlerde kuru gıda kutusu veya sleeve üretmek mümkün mü?',
    'df-faq-a3': 'Evet. Sleeve ve kraft kutu giydirme düşük baskı adetlerine uygundur. Kampanya, özel gün ve sınırlı seri makarna, granola veya kahvaltılık ürünler için stok riski olmadan premium sunum imkânı sağlar.',
    'df-faq-q4': 'Sürdürülebilir malzeme raf ömrünü kısaltır mı?',
    'df-faq-a4': 'Her zaman değil. Kuru gıdalarda kağıt/karton ağırlıklı ve geri dönüştürülebilir yapılar birçok ürün tipinde nem bariyeri ihtiyacı ile dengelenebilir. AunoPack, ürününüze göre sürdürülebilirlik ve raf ömrü dengesini analiz eder.',
    'df-faq-q5': 'Tasarım ve malzeme seçiminde veri desteği alabiliyor muyum?',
    'df-faq-a5': 'Evet. AI destekli veri altyapımızla kuru gıda kategorisinde raf tercih olasılığı, malzeme performansı ve sürdürülebilirlik kriterleri birlikte değerlendirilir; tasarım ve yapı önerileri sunulur.',
    'df-faq-q6': 'Kraft kutu giydirme ile tam baskılı kutu arasındaki fark nedir?',
    'df-faq-a6': 'Kraft kutu giydirmede ana kutu sade veya az baskılı kalır; dış sleeve katmanı ile marka ve kampanya mesajı verilir. Tam baskılı kutuda tüm kutu yüzeyi baskılıdır. Giydirme; düşük adetlerde daha ekonomik, kampanya değişiminde daha esnektir ve stok riskini azaltır.'
  }
};

// Get saved language preference or detect browser language
function getInitialLanguage() {
  // Check localStorage first
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang && (savedLang === 'en' || savedLang === 'tr')) {
    return savedLang;
  }
  
  // Detect browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('tr')) {
    return 'tr';
  }
  
  // Default to English
  return 'en';
}

// Set language
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'tr') return;
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      const translation = translations[lang][key];
      const containsHTML = /<[^>]+>/.test(translation);
      if (containsHTML) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
      if (element.tagName === 'OPTION' && element.getAttribute('value') !== '') {
        element.value = translation;
      }
    }
  });

  // Update placeholders
  const placeholderEls = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderEls.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  
  // Update images with data-i18n-img attribute
  const imageElements = document.querySelectorAll('[data-i18n-img]');
  imageElements.forEach(img => {
    const baseName = img.getAttribute('data-i18n-img');
    // Base path (common image for both languages)
    const basePath = `assets/images/${baseName}.png`;
    
    // Language-specific paths
    let langSpecificPath;
    if (lang === 'tr') {
      langSpecificPath = `assets/images/${baseName}-tr.png`;
    } else {
      langSpecificPath = `assets/images/${baseName}-en.png`;
    }
    
    // Try to load language-specific image first
    const testImg = new Image();
    testImg.onload = () => {
      // Language-specific image exists, use it
      img.src = langSpecificPath;
    };
    testImg.onerror = () => {
      // Language-specific image doesn't exist, use common base image
      img.src = basePath;
    };
    testImg.src = langSpecificPath;
  });
  
  // Update active button state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
  
  // Save preference
  localStorage.setItem('preferred-language', lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
  const initialLang = getInitialLanguage();
  setLanguage(initialLang);
  
  // Add click handlers to language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});

