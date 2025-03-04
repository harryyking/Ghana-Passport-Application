/** @type {import('next').NextConfig} */
const nextConfig = {
    image: {
        images: {
            remotePatterns: [
              {
                protocol: 'https',
                hostname: 'utfs.io', // Add the hostname
                pathname: '/f/**',     // Allow all paths under this domain
              },
            ],
          },
    }
};

export default nextConfig;
