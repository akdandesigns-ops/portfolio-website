import fs from "fs";
import path from "path";
import { Pool, PoolConfig } from "pg";

// ==============================================================================
// 1. ENVIRONMENT LOADER (Zero-dependency .env.local parser)
// ==============================================================================
function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) return;
      const key = trimmed.substring(0, eqIdx).trim();
      let val = trimmed.substring(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    });
    console.log("✅ Loaded environment variables from .env.local");
  } else {
    console.log("⚠️ No .env.local file found. Using default environment configuration.");
  }
}

loadEnvLocal();

// ==============================================================================
// 2. DATABASE CONFIGURATION & CLIENT INITIALIZATION
// ==============================================================================
const connectionString = process.env.DATABASE_URL;
const poolConfig: PoolConfig = connectionString
  ? { connectionString }
  : {
      host: process.env.PGHOST || "localhost",
      port: parseInt(process.env.PGPORT || "5432"),
      user: process.env.PGUSER || "postgres",
      password: process.env.PGPASSWORD || "akdanadmin123",
      database: process.env.PGDATABASE || "akdandesigns",
    };

const isLocal =
  (connectionString && (connectionString.includes("localhost") || connectionString.includes("127.0.0.1"))) ||
  (!connectionString && (poolConfig.host === "localhost" || poolConfig.host === "127.0.0.1"));

if (!isLocal) {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(poolConfig);

async function runMigration() {
  console.log("🚀 Starting database migration to PostgreSQL...");
  const client = await pool.connect();

  try {
    // ==============================================================================
    // 3. EXECUTE SCHEMA DEFINITIONS (schema.sql)
    // ==============================================================================
    console.log("📦 Creating database tables...");
    const schemaSqlPath = path.join(process.cwd(), "src", "lib", "schema.sql");
    if (!fs.existsSync(schemaSqlPath)) {
      throw new Error(`schema.sql not found at ${schemaSqlPath}`);
    }
    const schemaSql = fs.readFileSync(schemaSqlPath, "utf-8");
    await client.query(schemaSql);
    console.log("✅ Tables initialized successfully.");

    // ==============================================================================
    // 4. MIGRATE BLOGS DATA
    // ==============================================================================
    const blogsJsonPath = path.join(process.cwd(), "src", "data", "blogs.json");
    if (fs.existsSync(blogsJsonPath)) {
      console.log("📚 Migrating blog posts...");
      const blogsData = JSON.parse(fs.readFileSync(blogsJsonPath, "utf-8"));
      
      for (const blog of blogsData) {
        const queryText = `
          INSERT INTO blogs (slug, title, date, read_time, tag, image, quote, paragraphs)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (slug) DO UPDATE SET
            title = EXCLUDED.title,
            date = EXCLUDED.date,
            read_time = EXCLUDED.read_time,
            tag = EXCLUDED.tag,
            image = EXCLUDED.image,
            quote = EXCLUDED.quote,
            paragraphs = EXCLUDED.paragraphs;
        `;
        const params = [
          blog.slug,
          blog.title,
          blog.date,
          blog.readTime,
          blog.tag,
          blog.image,
          blog.quote,
          JSON.stringify(blog.paragraphs || [])
        ];
        await client.query(queryText, params);
        console.log(`   - Seeded blog: "${blog.title}"`);
      }
      console.log("✅ Blogs migration complete.");
    } else {
      console.log("⚠️ No blogs.json file found to migrate.");
    }

    // ==============================================================================
    // 5. MIGRATE WORKS (CASE STUDIES) DATA
    // ==============================================================================
    const worksJsonPath = path.join(process.cwd(), "src", "data", "works.json");
    if (fs.existsSync(worksJsonPath)) {
      console.log("💼 Migrating works & case studies...");
      const worksData = JSON.parse(fs.readFileSync(worksJsonPath, "utf-8"));

      for (const work of worksData) {
        const queryText = `
          INSERT INTO works (
            slug, id, name, category, year, size, tagline, client, location, 
            deliverable, description, approach, hero_image, image_fit, 
            use_curated_gallery, gallery, colors, typography, next_slug, next_title
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
          )
          ON CONFLICT (slug) DO UPDATE SET
            id = EXCLUDED.id,
            name = EXCLUDED.name,
            category = EXCLUDED.category,
            year = EXCLUDED.year,
            size = EXCLUDED.size,
            tagline = EXCLUDED.tagline,
            client = EXCLUDED.client,
            location = EXCLUDED.location,
            deliverable = EXCLUDED.deliverable,
            description = EXCLUDED.description,
            approach = EXCLUDED.approach,
            hero_image = EXCLUDED.hero_image,
            image_fit = EXCLUDED.image_fit,
            use_curated_gallery = EXCLUDED.use_curated_gallery,
            gallery = EXCLUDED.gallery,
            colors = EXCLUDED.colors,
            typography = EXCLUDED.typography,
            next_slug = EXCLUDED.next_slug,
            next_title = EXCLUDED.next_title;
        `;
        const params = [
          work.slug,
          work.id,
          work.name,
          work.category,
          work.year,
          work.size || "half",
          work.tagline,
          work.client,
          work.location,
          work.deliverable || null,
          work.description,
          work.approach || null,
          work.heroImage,
          work.imageFit || "cover",
          work.useCuratedGallery !== false,
          JSON.stringify(work.gallery || []),
          JSON.stringify(work.colors || []),
          work.typography ? JSON.stringify(work.typography) : null,
          work.nextSlug || null,
          work.nextTitle || null
        ];
        await client.query(queryText, params);
        console.log(`   - Seeded work: "${work.name}"`);
      }
      console.log("✅ Works migration complete.");
    } else {
      console.log("⚠️ No works.json file found to migrate.");
    }

    // ==============================================================================
    // 6. MIGRATE ABOUT SECTION DATA
    // ==============================================================================
    const aboutJsonPath = path.join(process.cwd(), "src", "data", "about.json");
    if (fs.existsSync(aboutJsonPath)) {
      console.log("ℹ️ Migrating about page data...");
      const about = JSON.parse(fs.readFileSync(aboutJsonPath, "utf-8"));

      const queryText = `
        INSERT INTO about (id, profile_image, philosophy_paragraphs, services, clients)
        VALUES (1, $1, $2, $3, $4)
        ON CONFLICT (id) DO UPDATE SET
          profile_image = EXCLUDED.profile_image,
          philosophy_paragraphs = EXCLUDED.philosophy_paragraphs,
          services = EXCLUDED.services,
          clients = EXCLUDED.clients;
      `;
      const params = [
        about.profileImage,
        JSON.stringify(about.philosophyParagraphs || []),
        JSON.stringify(about.services || []),
        JSON.stringify(about.clients || [])
      ];
      await client.query(queryText, params);
      console.log("✅ About data migration complete.");
    } else {
      console.log("⚠️ No about.json file found to migrate.");
    }

    console.log("\n🎉 Database migration finished successfully without any issues!");

  } catch (err) {
    console.error("❌ Database migration failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
