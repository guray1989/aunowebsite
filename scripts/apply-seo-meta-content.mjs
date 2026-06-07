/**
 * AI-generated SEO meta (TR + EN). Run: node scripts/apply-seo-meta-content.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'scripts', 'seo-pages.json');

/** @type {Record<string, { tr: { title: string, description: string }, en: { title: string, description: string } }>} */
const META = {
  home: {
    tr: {
      title: 'Sürdürülebilir Gıda Ambalaj Çözümleri | AunoPack',
      description:
        'Gıda markaları için sürdürülebilir ambalaj malzemeleri ve akıllı ambalaj çözümleri. AunoPack ile raf ömrü, maliyet ve sürdürülebilirliği birlikte optimize edin.',
    },
    en: {
      title: 'Smart Food Packaging Solutions | AunoPack',
      description:
        'Sustainable packaging materials and AI-powered packaging solutions for food brands. Optimize shelf life, cost and sustainability with AunoPack.',
    },
  },
  solutions: {
    tr: {
      title: 'Ambalaj Çözümleri | AUNOPACK',
      description:
        'Raf ömrü, raf performansı, küçük seri üretim ve veri odaklı ambalaj tasarımı. Gıda üreticileri için uçtan uca ambalaj çözümleri.',
    },
    en: {
      title: 'Packaging Solutions | AUNOPACK',
      description:
        'Shelf life, shelf performance, small batches and data-guided packaging design. End-to-end packaging solutions for food manufacturers.',
    },
  },
  'solutions-shelf-life': {
    tr: {
      title: 'Raf Ömrü Ambalaj Çözümleri | AUNOPACK',
      description:
        'Gıda ürünlerinde raf ömrünü uzatan ambalaj yapıları. Nem, oksijen ve ışık bariyeri analizi ile doğru malzeme seçimi.',
    },
    en: {
      title: 'Shelf Life Packaging Solutions | AUNOPACK',
      description:
        'Packaging structures that extend shelf life for food products. Barrier analysis and data-driven material selection.',
    },
  },
  'solutions-shelf-performance': {
    tr: {
      title: 'Raf Performansı Ambalaj Çözümleri | AUNOPACK',
      description:
        'Rafta duruş, dizilebilirlik ve marka görünürlüğü için ambalaj çözümleri. Gıda ürünlerinde satışı destekleyen ambalaj tasarımı.',
    },
    en: {
      title: 'Shelf Performance Packaging | AUNOPACK',
      description:
        'Packaging for shelf stability, stackability and brand visibility. Designs that help food products stand out and sell.',
    },
  },
  'solutions-small-batches': {
    tr: {
      title: 'Küçük Seri Ambalaj Çözümleri | AUNOPACK',
      description:
        'Kampanya, özel seri ve düşük adetli üretimler için sleeve, kutu giydirme ve esnek baskılı ambalaj çözümleri.',
    },
    en: {
      title: 'Small-Batch Packaging Solutions | AUNOPACK',
      description:
        'Sleeves, carton overwrap and flexible print for campaigns, limited runs and low-volume food production.',
    },
  },
  'solutions-data-guided': {
    tr: {
      title: 'Veri Odaklı Ambalaj Tasarımı | AUNOPACK',
      description:
        'AunoAI ile ambalaj malzemesi, form ve görsel kararlarınızı analiz edin. Sürdürülebilirlik ve raf performansını birlikte değerlendirin.',
    },
    en: {
      title: 'Data-Guided Packaging Design | AUNOPACK',
      description:
        'Analyze packaging material, form and visual decisions with AunoAI. Evaluate sustainability and shelf performance together.',
    },
  },
  'article-shelf-life': {
    tr: {
      title: 'Raf Ömrü Ambalaj Rehberi | AUNOPACK',
      description:
        'Gıda ambalajında raf ömrü stratejileri: MAP, vakum, termoform ve bariyer malzemeleri. Ürün ve pazar ihtiyaçlarına göre doğru seçim.',
    },
    en: {
      title: 'Shelf Life Packaging Guide | AUNOPACK',
      description:
        'Shelf-life strategies for food packaging: MAP, vacuum, thermoforming and barrier materials. Choose the right solution for your product.',
    },
  },
  'article-shelf-performance': {
    tr: {
      title: 'Raf Performansı Ambalaj Rehberi | AUNOPACK',
      description:
        'Doypack, sleeve ve hibrit ambalaj yapılarıyla rafta görünürlük. Marka algısı ve ticari performansı dengeleyen ambalaj kararları.',
    },
    en: {
      title: 'Shelf Performance Packaging Guide | AUNOPACK',
      description:
        'Shelf visibility with doypack, sleeves and hybrid structures. Packaging decisions that balance brand perception and sales.',
    },
  },
  'sector-confectionery': {
    tr: {
      title: 'Şekerleme & Çikolata Ambalajı | AUNOPACK',
      description:
        'Çikolata, şekerleme ve atıştırmalıklar için sleeve, raf ömrü ve sürdürülebilir ambalaj çözümleri. Düşük MOQ seçenekleri.',
    },
    en: {
      title: 'Confectionery & Chocolate Packaging | AUNOPACK',
      description:
        'Sleeve, shelf-life and sustainable packaging for chocolate, confectionery and snacks. Low-MOQ options available.',
    },
  },
  'sector-meat-dairy': {
    tr: {
      title: 'Et & Süt Ürünleri Ambalajı | AUNOPACK',
      description:
        'Et ve süt ürünleri için bariyer ambalaj, raf ömrü ve sürdürülebilirlik odaklı çözümler. Yapay zekâ destekli malzeme seçimi.',
    },
    en: {
      title: 'Meat & Dairy Packaging | AUNOPACK',
      description:
        'Barrier packaging, shelf life and sustainability for meat and dairy products. AI-supported material selection.',
    },
  },
  'sector-ready-meals': {
    tr: {
      title: 'Hazır Yemek Ambalaj Çözümleri | AUNOPACK',
      description:
        'Hazır yemek ve meal kit ürünleri için tray, karton ve bariyer ambalaj. Teslimat dayanıklılığı ve raf ömrü odaklı yapılar.',
    },
    en: {
      title: 'Ready Meal Packaging | AUNOPACK',
      description:
        'Tray, carton and barrier packaging for ready meals and meal kits. Built for delivery durability and shelf life.',
    },
  },
  'sector-dry-foods': {
    tr: {
      title: 'Kuru Gıda Ambalaj Çözümleri | AUNOPACK',
      description:
        'Makarna, granola, bakliyat ve kahvaltılık ürünler için raf ömrü, sleeve ve sürdürülebilir ambalaj çözümleri.',
    },
    en: {
      title: 'Dry Food Packaging Solutions | AUNOPACK',
      description:
        'Shelf-life, sleeve and sustainable packaging for pasta, granola, pulses and breakfast products.',
    },
  },
  about: {
    tr: {
      title: 'Hakkımızda | AUNOPACK',
      description:
        'AunoPack\'ı tanıyın: gıda markalarına veri ve yapay zekâ destekli ambalaj kararları sunan ekibimiz ve yaklaşımımız.',
    },
    en: {
      title: 'About Us | AUNOPACK',
      description:
        'Meet AunoPack — we help food brands make smarter packaging decisions with data and AI-driven insights.',
    },
  },
  contact: {
    tr: {
      title: 'İletişim | AUNOPACK',
      description:
        'Ambalaj projeleriniz ve teklif talepleriniz için AunoPack ile iletişime geçin. Formu doldurun, size dönelim.',
    },
    en: {
      title: 'Contact | AUNOPACK',
      description:
        'Get in touch with AunoPack for packaging projects and quotes. Fill out the form and our team will respond.',
    },
  },
  blog: {
    tr: {
      title: 'Ambalaj Blogu | AUNOPACK',
      description:
        'Gıda ambalajı, sürdürülebilirlik ve sektör trendleri hakkında AunoPack blog yazıları ve vaka çalışmaları.',
    },
    en: {
      title: 'Packaging Blog | AUNOPACK',
      description:
        'AunoPack blog on food packaging, sustainability and industry trends. Case studies and expert insights.',
    },
  },
};

function withOg(bundle) {
  return {
    ...bundle,
    ogTitle: bundle.title,
    ogDescription: bundle.description,
  };
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

for (const page of data.pages) {
  const content = META[page.id];
  if (!content) {
    console.warn('no meta content for', page.id);
    continue;
  }
  page.meta = {
    tr: withOg(content.tr),
    en: withOg(content.en),
  };
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n');
console.log('Updated meta for', data.pages.length, 'pages in seo-pages.json');
