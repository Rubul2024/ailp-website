import { NextResponse } from "next/server";

export async function POST() {

  const response = NextResponse.json({

    success: true,

    message: "Logout Successful.",

  });

  response.cookies.set(

    "memberToken",

    "",

    {

      expires: new Date(0),

      httpOnly: true,

      path: "/",

    }

  );

  return response;

}