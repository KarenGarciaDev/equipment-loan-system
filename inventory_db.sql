--
-- PostgreSQL database dump
--

\restrict 2NFOg53LJDhgfmMxssKAZ0C0kPkUgjbuTHWf4eF27aVDhf7kXilopSbdIrG7Z39

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

--
-- Name: EquipmentStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."EquipmentStatus" AS ENUM (
    'AVAILABLE',
    'RESERVED',
    'LOANED',
    'MAINTENANCE'
);


ALTER TYPE public."EquipmentStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Equipment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Equipment" (
    id integer NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    description text,
    status public."EquipmentStatus" DEFAULT 'AVAILABLE'::public."EquipmentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Equipment" OWNER TO postgres;

--
-- Name: Equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Equipment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Equipment_id_seq" OWNER TO postgres;

--
-- Name: Equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Equipment_id_seq" OWNED BY public."Equipment".id;


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
-- Name: Equipment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Equipment" ALTER COLUMN id SET DEFAULT nextval('public."Equipment_id_seq"'::regclass);


--
-- Data for Name: Equipment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Equipment" (id, code, name, description, status, "createdAt", "updatedAt") FROM stdin;
1	EQ-009	Laptop Dell	Core i5 16GB	AVAILABLE	2026-01-20 01:48:39.257	2026-01-20 01:48:39.257
4	EQ-010	Laptop Dell	Core i5 16GB	AVAILABLE	2026-01-20 01:58:44.864	2026-01-20 01:58:44.864
5	EQ-11	Laptop Dell	Core i5 16GB	AVAILABLE	2026-01-20 01:58:53.915	2026-01-20 01:58:53.915
6	EQ-004	CABLE TIPO C	Core i5 16GB	AVAILABLE	2026-01-21 23:35:08.184	2026-01-21 23:35:08.184
7	EQ-999	Monitor Samsung	24 pulgadas	AVAILABLE	2026-01-22 02:17:52.017	2026-01-22 02:17:52.017
9	EQ-99	Monitor Samsung	24 pulgadas	AVAILABLE	2026-01-22 02:20:05.414	2026-01-22 02:20:05.414
10	EQ-777	Teclado Logitech	USB	AVAILABLE	2026-01-22 02:25:04.059	2026-01-22 02:25:04.059
11	EQ-77	Teclado Logitech	USB	AVAILABLE	2026-01-22 02:32:08.621	2026-01-22 02:32:08.621
13	EQ-1	Laptop Dell	Core i5 16GB	AVAILABLE	2026-01-22 05:34:02.277	2026-01-22 05:34:02.277
14	EQ-89	cable c	USB	AVAILABLE	2026-01-22 19:58:03.732	2026-01-22 19:58:03.732
15	EQ-117	Laptop Dell	Core i5 16GB	AVAILABLE	2026-01-22 20:14:11.572	2026-01-22 20:14:11.572
17	EQ-14	Laptop Dell	Core i5 16GB	AVAILABLE	2026-01-22 20:14:22.773	2026-01-22 20:14:22.773
18	EQ-0123	Laptop Dell	Core i5 16GB	AVAILABLE	2026-01-22 22:14:29.575	2026-01-22 22:14:29.575
19	EQ-048	Laptop Dell	Core i5 16GB	AVAILABLE	2026-01-22 22:14:38.193	2026-01-22 22:14:38.193
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
52b133e6-de6e-4986-9587-dac0ddb30a3a	9546446c06ab4bf5f25fe74f3ced8ffc2bb40b81a70736611d5c1ce3855dcfe3	2026-01-19 03:38:57.121226+00	20260118174444_init	\N	\N	2026-01-19 03:38:57.081605+00	1
\.


--
-- Name: Equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Equipment_id_seq"', 19, true);


--
-- Name: Equipment Equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Equipment"
    ADD CONSTRAINT "Equipment_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Equipment_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Equipment_code_key" ON public."Equipment" USING btree (code);


--
-- PostgreSQL database dump complete
--

\unrestrict 2NFOg53LJDhgfmMxssKAZ0C0kPkUgjbuTHWf4eF27aVDhf7kXilopSbdIrG7Z39

