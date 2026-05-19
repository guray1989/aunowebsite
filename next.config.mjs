/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/blog.html', destination: '/blog', permanent: true },
    ];
  },
  // Ana sayfa ve statik HTML'ler public/ üzerinden sunulsun (mobil sector sayfaları dahil)
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/about', destination: '/about.html' },
        { source: '/contact', destination: '/contact.html' },
        { source: '/blog', destination: '/blog.html' },
        { source: '/raf-omru-ambalaj-cozumleri', destination: '/raf-omru-ambalaj-cozumleri.html' },
        { source: '/:lang(tr|en)/raf-omru-ambalaj-cozumleri', destination: '/:lang/raf-omru-ambalaj-cozumleri.html' },
        { source: '/:lang(tr|en)', destination: '/index.html' },
        { source: '/:lang(tr|en)/', destination: '/index.html' },
        { source: '/:lang(tr|en)/about', destination: '/about.html' },
        { source: '/:lang(tr|en)/about.html', destination: '/about.html' },
        { source: '/:lang(tr|en)/contact', destination: '/contact.html' },
        { source: '/:lang(tr|en)/contact.html', destination: '/contact.html' },
        { source: '/:lang(tr|en)/blog', destination: '/blog.html' },
        { source: '/:lang(tr|en)/blog.html', destination: '/blog.html' },
        { source: '/:lang(tr|en)/solutions', destination: '/:lang/solutions/index.html' },
        { source: '/:lang(tr|en)/solutions/', destination: '/:lang/solutions/index.html' },
        { source: '/:lang(tr|en)/solutions/index.html', destination: '/:lang/solutions/index.html' },
        { source: '/:lang(tr|en)/sectors/meat-dairy', destination: '/sectors/meat-dairy.html' },
        { source: '/:lang(tr|en)/sectors/meat-dairy.html', destination: '/sectors/meat-dairy.html' },
        { source: '/:lang(tr|en)/sectors/confectionery-chocolate', destination: '/sectors/confectionery-chocolate.html' },
        { source: '/:lang(tr|en)/sectors/confectionery-chocolate.html', destination: '/sectors/confectionery-chocolate.html' },
        { source: '/:lang(tr|en)/sectors/ready-meals', destination: '/sectors/ready-meals.html' },
        { source: '/:lang(tr|en)/sectors/ready-meals.html', destination: '/sectors/ready-meals.html' },
        { source: '/:lang(tr|en)/sectors/dry-foods', destination: '/sectors/dry-foods.html' },
        { source: '/:lang(tr|en)/sectors/dry-foods.html', destination: '/sectors/dry-foods.html' },
        { source: '/', destination: '/index.html' },
      ],
    };
  },
};

export default nextConfig;
