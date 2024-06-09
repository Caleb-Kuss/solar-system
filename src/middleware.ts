export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/explore/:path*", "/marsRover", "/admin/:path*"],
};
