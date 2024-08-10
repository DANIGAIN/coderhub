/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com','avatars.githubusercontent.com' ,'i.imgur.com','www.google.com','www.gadstyle.com','coderhub1.netlify.app'], 
      },
    env: {
        MONGO_URI: process.env.MONGO_URI,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        SECRET: process.env.SECRET,
        GMAIL: process.env.GMAIL,
        APP_PASSWORD: process.env.APP_PASSWORD,
      },
};

export default nextConfig;
    