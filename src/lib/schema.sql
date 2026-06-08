-- ==============================================================================
-- Ak Dan Designs - Relational Database Schema
-- ==============================================================================

-- 1. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  tag TEXT NOT NULL,
  image TEXT NOT NULL,
  quote TEXT NOT NULL,
  paragraphs JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 2. Works Table
CREATE TABLE IF NOT EXISTS works (
  slug TEXT PRIMARY KEY,
  id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  size TEXT NOT NULL DEFAULT 'half',
  tagline TEXT NOT NULL,
  client TEXT NOT NULL,
  location TEXT NOT NULL,
  deliverable TEXT,
  description TEXT NOT NULL,
  approach TEXT,
  hero_image TEXT NOT NULL,
  image_fit TEXT DEFAULT 'cover',
  use_curated_gallery BOOLEAN DEFAULT TRUE,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  colors JSONB DEFAULT '[]'::jsonb,
  typography JSONB,
  next_slug TEXT,
  next_title TEXT
);

-- 3. About Section Table (Single-Row Configuration Table)
CREATE TABLE IF NOT EXISTS about (
  id INT PRIMARY KEY DEFAULT 1,
  profile_image TEXT NOT NULL,
  philosophy_paragraphs JSONB NOT NULL DEFAULT '[]'::jsonb,
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  clients JSONB NOT NULL DEFAULT '[]'::jsonb,
  CONSTRAINT single_row_check CHECK (id = 1)
);
