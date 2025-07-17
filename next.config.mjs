/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'localhost', 'fakestoreapi.com', 'encrypted-tbn3.gstatic.com', "unixindia.in", "www.elixirdigitalmedia.com"],
  },
  async rewrites() {
    return [
      
      {
        source: '/asset/:path*/:file', // the URL pattern you want to match
        destination: '/api/v1/asset/:path*/:file', // actual path on the file system
      },
    ];
  },
};

export default nextConfig;
