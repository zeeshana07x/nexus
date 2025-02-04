const nextConfig = {
  images: {
    domains: ['next-ecommerce-template-4.vercel.app'], // Add your domain here
  },
  typescript: {
    // WARNING: Disabling type checking in production can lead to runtime errors.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
