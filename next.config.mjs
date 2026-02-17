/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ana sayfa ve statik HTML'ler public/ üzerinden sunulsun (mobil sector sayfaları dahil)
  async rewrites() {
    return [
      { source: '/', destination: '/index.html' },
    ];
  },
};

export default nextConfig;
