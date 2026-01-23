--
-- PostgreSQL database dump
--

\restrict ddvwanswz3FeGxdSQwjnIu8jOVWUnnRdkY3UWI4Nvwy1Yt4xnuDYchJndGD3bO4

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
-- Name: LoanStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LoanStatus" AS ENUM (
    'RESERVED',
    'APPROVED',
    'BORROWED',
    'RETURNED',
    'CANCELLED'
);


ALTER TYPE public."LoanStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Loan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Loan" (
    id integer NOT NULL,
    "studentId" integer NOT NULL,
    "equipmentId" integer NOT NULL,
    "reservedFrom" timestamp(3) without time zone NOT NULL,
    "reservedTo" timestamp(3) without time zone NOT NULL,
    status public."LoanStatus" DEFAULT 'RESERVED'::public."LoanStatus" NOT NULL,
    "technicianId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Loan" OWNER TO postgres;

--
-- Name: Loan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Loan_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Loan_id_seq" OWNER TO postgres;

--
-- Name: Loan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Loan_id_seq" OWNED BY public."Loan".id;


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
-- Name: Loan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Loan" ALTER COLUMN id SET DEFAULT nextval('public."Loan_id_seq"'::regclass);


--
-- Data for Name: Loan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Loan" (id, "studentId", "equipmentId", "reservedFrom", "reservedTo", status, "technicianId", "createdAt", "updatedAt") FROM stdin;
1	6	1	2026-01-19 09:00:00	2026-01-19 12:00:00	RETURNED	\N	2026-01-20 01:51:48.005	2026-01-20 01:53:16.065
2	4	1	2026-01-19 09:00:00	2026-01-19 12:00:00	RESERVED	\N	2026-01-21 19:16:03.961	2026-01-21 19:16:03.961
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ea379910-d7cc-45e2-a5e7-73f40824c003	7df6e080002059a9e00352f2573cd730890b4fc2796c0e2f5e8270f832b9bb2f	2026-01-19 03:43:16.127852+00	20260119034316_init	\N	\N	2026-01-19 03:43:16.102015+00	1
\.


--
-- Name: Loan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Loan_id_seq"', 2, true);


--
-- Name: Loan Loan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Loan"
    ADD CONSTRAINT "Loan_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict ddvwanswz3FeGxdSQwjnIu8jOVWUnnRdkY3UWI4Nvwy1Yt4xnuDYchJndGD3bO4

