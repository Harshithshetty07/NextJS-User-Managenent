// File: middleware.js
export function middleware(request) {
    return new Response();
  }
  
  export const config = {
    matcher: '/api/:path*',
  }