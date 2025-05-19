import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const backendUrl = process.env.SERVER_API;
    const reqBody = await request.json();

    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(reqBody),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
