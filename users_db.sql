--
-- PostgreSQL database dump
--

\restrict I9eKNjf8PQbAtDb98mCbxdtt9uXWnVgf7PNmCUjEQF4HRFTGlL8qxhLEts5X8eG

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 16.11 (Debian 16.11-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    role text DEFAULT 'USER'::text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, name, role, "isActive", "createdAt") FROM stdin;
1	2@uce.edu.ec	$2a$10$bo71EvPm1OZ.Y.ukEpbO8uh79XAnyTR/hG9KUbfK4W0XGlU9tnb62	2	TECHNICIAN	t	2026-01-19 03:25:56.36
2	kagarciab@uce.edu.ec	$2a$10$mmueeoTudZU0w2npUBPDyOLxG3UlEvw4cmPRaTFB8kebS3FkV4vk.	Karen Garcia	TECHNICIAN	t	2026-01-19 03:26:11.408
3	mabenitez@uce.edu.ec	$2a$10$UZtEQsMOp9.rO7ew8X8SM.opEOIE2s8eUC5PPekU7hHVe3InLEDUy	María Benitez	STUDENT	t	2026-01-19 03:26:44.271
4	kagarciab1@uce.edu.ec	$2a$10$S2ZIOCdwWz5fDLp9XfaKnuvFHL4CIWQOO82zADeK1zE4CFY2RNwvG	Karen Garcia	STUDENT	t	2026-01-19 03:27:16.99
5	22@uce.edu.ec	$2a$10$GHrnxb9JrVHLuogj5YJP5O7ePxWdl.OsRzt1ldrDgVqFdvuqc8Bfe	22	STUDENT	t	2026-01-19 19:41:36.425
6	marta@uce.edu.ec	$2a$10$ycUn6eScdPyt31U.kJBpceVoPPj4PVEuZeDzvgp.lLnhHhgfO3c4K	Marta Alarcón	STUDENT	t	2026-01-20 01:03:13.025
7	prueba1@uce.edu.ec	$2a$10$lzW.4lZPPHdZH2OoT7pdzOnCmBYRwYViFMh9C7ZVYdIK53HNCsDSi	prueba	STUDENT	t	2026-01-20 01:41:33.846
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5925e401-5be2-4d36-8004-aaa2f614e8da	7ead7e3038ddfef6e8f5c8ff0d32415fae86dc478e0365621aaf75c32c3e22c1	2026-01-19 03:24:27.513329+00	20260115010703_init_users	\N	\N	2026-01-19 03:24:27.482489+00	1
\.


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 7, true);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- PostgreSQL database dump complete
--

\unrestrict I9eKNjf8PQbAtDb98mCbxdtt9uXWnVgf7PNmCUjEQF4HRFTGlL8qxhLEts5X8eG

