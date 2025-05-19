import { NextResponse } from "next/server";

const apiUrl = process.env.SERVER_API || 'http://localhost:8000';

export async function GET(request) {
  try {
    const filmsResponse = await fetch(`${apiUrl}/api/trending/Film`);
    const seriesResponse = await fetch(`${apiUrl}/api/trending/Series`);

    if (!filmsResponse.ok || !seriesResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch trending data" }, { status: 500 });
    }

    const films = await filmsResponse.json();
    const series = await seriesResponse.json();

    return NextResponse.json({ films: films.films, series: series.series });
  } catch (error) {
    console.error("Error fetching trending data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
