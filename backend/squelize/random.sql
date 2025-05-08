CREATE UNIQUE INDEX users_username_key ON users USING btree ("username");
CREATE UNIQUE INDEX users_email_key ON users USING btree ("email");


ALTER TABLE ratings 
ALTER COLUMN rating DROP NOT NULL, 
ALTER COLUMN rating TYPE NUMERIC(3,1), 
ADD CONSTRAINT rating_check CHECK (rating IS NULL OR (rating >= 2.0 AND rating <= 10.0));
