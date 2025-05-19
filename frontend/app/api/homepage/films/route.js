import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "12";

  const apiUrl = process.env.SERVER_API;

  try {
    const response = await fetch(
      `${apiUrl}/api/films/Film/all?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch films" }, { status: 500 });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching films:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
