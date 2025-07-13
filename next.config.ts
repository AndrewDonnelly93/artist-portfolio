/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "style-src-attr 'self' 'unsafe-inline';",
              "font-src 'self' https://fonts.gstatic.com;",
              'frame-src https://www.google.com https://www.recaptcha.net;',
              "img-src 'self' https://ctfassets.net https://*.ctfassets.net;",
              "connect-src 'self' https://*.ctfassets.net https://cdn.contentful.com https://www.google.com https://www.gstatic.com;",
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
            ].join(' '),
          },
        ],
      },
    ];
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
};

export default nextConfig;
