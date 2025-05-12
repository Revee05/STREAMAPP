require('dotenv').config({ path: './backend/.env' });
const pool = require("../config/db");

console.log("DB_PASS value (masked):", process.env.DB_PASS ? "*****" : "undefined");

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")           // Replace spaces with -
    .replace(/[^\w\-]+/g, "")       // Remove all non-word chars
    .replace(/\-\-+/g, "-");        // Replace multiple - with single -
}

async function populateFilmSlugs() {
  try {
    const filmsResult = await pool.query("SELECT id, title FROM films");
    for (const film of filmsResult.rows) {
      const slug = slugify(film.title);
      await pool.query("UPDATE films SET slug = $1 WHERE id = $2", [slug, film.id]);
      console.log(`Updated film id ${film.id} with slug ${slug}`);
    }
    console.log("Film slugs populated successfully.");
  } catch (error) {
    console.error("Error populating film slugs:", error);
  }
}

async function populateSeriesSlugs() {
  try {
    const seriesResult = await pool.query("SELECT id, title FROM series");
    for (const series of seriesResult.rows) {
      const slug = slugify(series.title);
      await pool.query("UPDATE series SET slug = $1 WHERE id = $2", [slug, series.id]);
      console.log(`Updated series id ${series.id} with slug ${slug}`);
    }
    console.log("Series slugs populated successfully.");
  } catch (error) {
    console.error("Error populating series slugs:", error);
  }
}

async function main() {
  await populateFilmSlugs();
  await populateSeriesSlugs();
  process.exit(0);
}

main();
