import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'greenatva.com',
        port: '',
        pathname: '/cdn/shop/files/**',
      },
    ],
  }
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images:{
//     domains:[
//       "images.unsplash.com"
//     ]
//   }
// };

// export default nextConfig;
