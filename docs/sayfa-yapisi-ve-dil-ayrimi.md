# Sayfa Yapısı ve TR / EN Dil Ayrımı

## 1. Genel yapı

- **Tek URL:** Aynı sayfa (örn. `index.html`). Ayrı `/tr/` veya `/en/` adresleri yok.
- **Dil seçimi:** Sağ üstte **EN** ve **TR** butonları (`lang-btn`).
- **Tercih saklama:** Seçilen dil `localStorage` içinde `preferred-language` anahtarıyla tutulur (`'en'` veya `'tr'`).
- **Script sırası:** Sayfa yüklenince `i18n.js` çalışır, ardından `navigation.js` (mobil menü vb.).

---

## 2. İki farklı dil mantığı

### A) `data-i18n` ile metin değiştirme (çoğu alan)

- **HTML:** Çevrilecek metin bir element içinde yazılı; elemente `data-i18n="anahtar"` verilir.
- **Çeviriler:** `public/i18n.js` içinde `translations.en` ve `translations.tr` objelerinde aynı anahtarlar var.
- **Çalışma:** Kullanıcı EN/TR’ye tıklayınca `setLanguage(lang)` çağrılır; script tüm `[data-i18n]` elementlerini bulur, `translations[lang][anahtar]` ile metni değiştirir (veya `innerHTML` / `textContent` günceller).

**Örnek (menü):**
```html
<span data-i18n="nav-sectors">Sektörler</span>
```
- TR → "Sektörler"
- EN → "Sectors"  
(Her ikisi de `i18n.js` içindeki `translations.tr` / `translations.en` ile gelir.)

**Kullanıldığı yerler:** Logo, menü (Sektörler, Çözümler, Blog, Hakkımızda, Teklif Al), hero alt başlık ve açıklama, tagline (“Neden Aunopack” / “Why Aunopack”), Neden AunoPack kartları, footer, solutions/sectors sayfalarındaki tüm çeviri metinler.

---

### B) `data-intro-lang` ile blok gösterme (sadece intro)

- **HTML:** Aynı yerde iki ayrı `<section class="intro">` var; biri sadece TR, biri sadece EN.
- **İşaretleme:**
  - TR bloğu: `data-intro-lang="tr"` (varsayılan görünür).
  - EN bloğu: `data-intro-lang="en"` ve `hidden` (başta gizli).
- **Çalışma:** `setLanguage(lang)` çağrıldığında `i18n.js` içinde şu kod çalışır:
  - `data-intro-lang="tr"` olan blok → sadece `lang === 'tr'` iken görünür.
  - `data-intro-lang="en"` olan blok → sadece `lang === 'en'` iken görünür.  
Yani metin değiştirmek yok; sadece ilgili dilin bloğu gösterilir, diğeri `hidden` yapılır.

**Örnek (ana sayfa intro):**
```html
<!-- Türkçe intro (varsayılan görünen) -->
<section class="intro intro--tr" data-intro-lang="tr">
  <h2 id="intro-heading-tr" class="intro__title">AunoPack – Ambalaj Kararlarında Veri Gücü</h2>
  <p class="intro__text">Ürününüz için gerçekten en doğru ambalaj...</p>
</section>

<!-- İngilizce intro (başta gizli) -->
<section class="intro intro--en" data-intro-lang="en" hidden>
  <h2 id="intro-heading-en" class="intro__title">AunoPack – Data-Driven Packaging Decisions</h2>
  <p class="intro__text">Do you really know the right packaging structure...</p>
</section>
```

- TR seçilince: sadece ilk blok görünür.
- EN seçilince: sadece ikinci blok görünür; Türkçe metin hiç ekranda olmaz.

---

## 3. Akış özeti

| Adım | Ne olur |
|------|--------|
| Sayfa açılır | `getInitialLanguage()` çalışır: önce `localStorage['preferred-language']`, yoksa tarayıcı dili, son çare `'en'`. |
| `setLanguage(lang)` | 1) `document.documentElement.lang = lang` 2) Intro blokları: `[data-intro-lang]` ile sadece seçili dilin bloğu gösterilir 3) Tüm `[data-i18n]` metinleri `translations[lang]` ile güncellenir 4) `.lang-btn` active sınıfı ve `localStorage` güncellenir. |
| EN / TR tıklanır | Aynı `setLanguage(lang)` tekrar çalışır; intro blokları + tüm data-i18n alanları seçilen dile göre güncellenir. |

---

## 4. Dosya bazlı yapı

| Dosya | Rol |
|-------|-----|
| `public/index.html` | Ana sayfa: hero, **intro (TR + EN blokları)**, tagline, Neden AunoPack, footer. Menü ve çoğu metin `data-i18n`. |
| `public/i18n.js` | `translations.en` / `translations.tr` sözlükleri; `setLanguage()`; intro için `[data-intro-lang]` göster/gizle; dil butonları ve `localStorage`. |
| `public/navigation.js` | Masaüstü/mobil menü, `setLanguage`’ı sarmalayıp menü metinlerini de günceller. |
| `public/solutions/index.html`, `public/sectors/*.html`, `about.html`, `contact.html` | Aynı `data-i18n` mantığı; bu sayfalarda intro blokları yok, sadece `data-i18n` ile çeviri. |

---

## 5. Özet

- **TR/EN ayrımı:** Tek sayfa, tek URL; dil **JavaScript** ile değişir.
- **Çoğu metin:** `data-i18n="anahtar"` + `i18n.js` içindeki `translations.en` / `translations.tr` ile değiştirilir.
- **Sadece ana sayfa intro:** Metin değiştirme yok; iki ayrı blok (`data-intro-lang="tr"` ve `data-intro-lang="en"`) var, dil değişince sadece ilgili blok gösterilir, diğeri gizlenir; böylece Türkçe ve İngilizce birbirini etkilemez.
