/*
  # Music Models and Training Data Schema

  1. New Tables
    - `genres`
      - `id` (text, primary key) - Genre identifier
      - `name` (text) - Display name
      - `icon` (text) - Emoji icon
      - `gradient` (text) - UI gradient
      - `created_at` (timestamp)
    
    - `training_data`
      - `id` (uuid, primary key)
      - `genre_id` (text, foreign key)
      - `file_path` (text) - Path to training audio file
      - `processed` (boolean) - Training status
      - `created_at` (timestamp)
    
    - `model_versions`
      - `id` (uuid, primary key)
      - `genre_id` (text, foreign key)
      - `version` (integer)
      - `accuracy` (float)
      - `status` (text) - Training status
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create genres table
CREATE TABLE IF NOT EXISTS genres (
  id text PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL,
  gradient text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create training_data table
CREATE TABLE IF NOT EXISTS training_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  genre_id text REFERENCES genres(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create model_versions table
CREATE TABLE IF NOT EXISTS model_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  genre_id text REFERENCES genres(id) ON DELETE CASCADE,
  version integer NOT NULL,
  accuracy float NOT NULL,
  status text NOT NULL CHECK (status IN ('training', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_versions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to genres"
  ON genres
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can insert training data"
  ON training_data
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view training data"
  ON training_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read model versions"
  ON model_versions
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial genres
INSERT INTO genres (id, name, icon, gradient)
VALUES 
  ('rock', 'Rock', '🎸', 'from-red-500 to-orange-500'),
  ('electronic', 'Electronic', '🎧', 'from-blue-500 to-purple-500'),
  ('jazz', 'Jazz', '🎷', 'from-yellow-500 to-amber-500'),
  ('hiphop', 'Hip-Hop', '🎤', 'from-gray-800 to-gray-900'),
  ('lofi', 'Lo-Fi', '🎼', 'from-teal-500 to-emerald-500')
ON CONFLICT (id) DO NOTHING;