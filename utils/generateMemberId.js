/* ==========================================================
   Generate Membership ID
========================================================== */

import Member from "@/models/Member";

export default async function generateMembershipId(){

const year=new Date().getFullYear();

const totalMembers=await Member.countDocuments();

const serial=String(

totalMembers+1

).padStart(6,"0");

return `AILP${year}${serial}`;

}