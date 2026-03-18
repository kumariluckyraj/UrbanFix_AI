/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't bundle @xenova/transformers on the server
      config.externals = config.externals || [];
      config.externals.push("@xenova/transformers");
    }
    return config;
  },
};

module.exports = nextConfig;