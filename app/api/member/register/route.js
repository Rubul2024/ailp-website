/* ==========================================================
   Legacy registration endpoint — same handler as
   /api/auth/register so there is one validated code path.
========================================================== */

export { POST } from "@/app/api/auth/register/route";

export const dynamic = "force-dynamic";
