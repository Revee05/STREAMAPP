-- Migration script to add created_at and updated_at columns to existing tables

ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE films 
  ADD COLUMN IF NOT EXISTS created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE series 
  ADD COLUMN IF NOT EXISTS created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE genres 
  ADD COLUMN IF NOT EXISTS created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE film_genres
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;



-- Add indexes on foreign key columns for performance (optional)
CREATE INDEX IF NOT EXISTS idx_user_series_lists_user_id ON user_series_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_user_series_lists_series_id ON user_series_lists(series_id);

CREATE INDEX IF NOT EXISTS idx_user_film_lists_user_id ON user_film_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_user_film_lists_film_id ON user_film_lists(film_id);

CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_ratings_film_id ON ratings(film_id);
CREATE INDEX IF NOT EXISTS idx_ratings_series_id ON ratings(series_id);
