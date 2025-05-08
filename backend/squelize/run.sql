-- 1. Create the table film_genres
CREATE TABLE film_genres(
    film_id integer NOT NULL,
    genre_id integer NOT NULL,
    PRIMARY KEY(film_id,genre_id),
    CONSTRAINT film_genres_film_id_fkey FOREIGN key(film_id) REFERENCES films(id),
    CONSTRAINT film_genres_genre_id_fkey FOREIGN key(genre_id) REFERENCES genres(id)
);

--2. Create the table films
CREATE TABLE films(
    id SERIAL NOT NULL,
    title varchar(100) NOT NULL,
    description text,
    poster_url text,
    views integer DEFAULT 0,
    release_year integer,
    release_month integer,
    release_day integer,
    films_url text,
    PRIMARY KEY(id)
);

--3. Create the table genres
CREATE TABLE genres(
    id SERIAL NOT NULL,
    name varchar(50) NOT NULL,
    PRIMARY KEY(id)
);
CREATE UNIQUE INDEX genres_name_key ON public.genres USING btree (name);

--4. Create the table ratings
CREATE TABLE ratings(
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    film_id integer,
    series_id integer,
    rating numeric(3,1),
    PRIMARY KEY(id),
    CONSTRAINT ratings_user_id_fkey FOREIGN key(user_id) REFERENCES users(id),
    CONSTRAINT ratings_film_id_fkey FOREIGN key(film_id) REFERENCES films(id),
    CONSTRAINT ratings_series_id_fkey FOREIGN key(series_id) REFERENCES series(id),
    CONSTRAINT ratings_rating_check CHECK ((rating >= (2)::numeric) AND (rating <= (10)::numeric) AND ((rating % (2)::numeric) = (0)::numeric)),
    CONSTRAINT rating_check CHECK ((rating IS NULL) OR ((rating >= 2.0) AND (rating <= 10.0)))
);
CREATE UNIQUE INDEX ratings_user_id_film_id_key ON public.ratings USING btree (user_id, film_id);
CREATE UNIQUE INDEX ratings_user_id_series_id_key ON public.ratings USING btree (user_id, series_id);

--5. Create the table series
CREATE TABLE series(
    id SERIAL NOT NULL,
    title varchar(100) NOT NULL,
    description text,
    poster_url text,
    seasons integer,
    views integer DEFAULT 0,
    episode integer,
    release_year integer,
    release_month integer,
    release_day integer,
    video_url text,
    series_url text,
    PRIMARY KEY(id)
);

--6. Create the table series_genres
CREATE TABLE series_genres(
    series_id integer NOT NULL,
    genre_id integer NOT NULL,
    PRIMARY KEY(series_id,genre_id),
    CONSTRAINT series_genres_series_id_fkey FOREIGN key(series_id) REFERENCES series(id),
    CONSTRAINT series_genres_genre_id_fkey FOREIGN key(genre_id) REFERENCES genres(id)
);

--7. Create the table user_films_lists
CREATE TABLE series_genres(
    series_id integer NOT NULL,
    genre_id integer NOT NULL,
    PRIMARY KEY(series_id,genre_id),
    CONSTRAINT series_genres_series_id_fkey FOREIGN key(series_id) REFERENCES series(id),
    CONSTRAINT series_genres_genre_id_fkey FOREIGN key(genre_id) REFERENCES genres(id)
);

--8. Create the table user_series_lists
CREATE TABLE user_film_lists(
    id SERIAL NOT NULL,
    user_id integer,
    film_id integer,
    list_type varchar(20),
    PRIMARY KEY(id),
    CONSTRAINT user_film_lists_user_id_fkey FOREIGN key(user_id) REFERENCES users(id),
    CONSTRAINT user_film_lists_film_id_fkey FOREIGN key(film_id) REFERENCES films(id),
    CONSTRAINT user_film_lists_list_type_check CHECK ((list_type)::text = ANY ((ARRAY['favorites'::character varying, 'watch later'::character varying])::text[]))
);

--9. Create the table users
CREATE TABLE users(
    id SERIAL NOT NULL,
    username varchar(50) NOT NULL,
    email varchar(100) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    role varchar(20) DEFAULT 'user'::character varying,
    PRIMARY KEY(id)
);
CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);