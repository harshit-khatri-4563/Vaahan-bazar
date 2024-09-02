import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isTenantAdminRoute = createRouteMatcher([
  '/Admin',
  '/Admin/:id',
]);

const requiresAuthRoute = createRouteMatcher([
  '/dashboard',
  '/dashboard/:path*',
  
  "/Sell"
  
]);


export default clerkMiddleware((auth, req, res) => {
  if (isTenantAdminRoute(req)) {
    auth().protect(has => {
      return has({ role: 'org:admin' });
    });
  }

  if (requiresAuthRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
