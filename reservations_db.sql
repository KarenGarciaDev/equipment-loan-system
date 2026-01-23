--
-- PostgreSQL database dump
--

\restrict 7AhKsOnANIgDLQcvFFFTf35DjSSdoUiJvjhDnV0ef9PuArWB4mjZ22uvuvJTlnl

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: ReservationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ReservationStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'CANCELLED',
    'FULFILLED'
);


ALTER TYPE public."ReservationStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: EquipmentSnapshot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EquipmentSnapshot" (
    "equipmentId" integer NOT NULL,
    name text NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."EquipmentSnapshot" OWNER TO postgres;

--
-- Name: Reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reservation" (
    id integer NOT NULL,
    "equipmentId" integer NOT NULL,
    "studentId" integer NOT NULL,
    "studentEmail" text NOT NULL,
    "studentName" text,
    "technicianName" text,
    "startAt" timestamp(3) without time zone NOT NULL,
    "endAt" timestamp(3) without time zone NOT NULL,
    reason text,
    status public."ReservationStatus" DEFAULT 'PENDING'::public."ReservationStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Reservation" OWNER TO postgres;

--
-- Name: Reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reservation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reservation_id_seq" OWNER TO postgres;

--
-- Name: Reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reservation_id_seq" OWNED BY public."Reservation".id;


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
-- Name: Reservation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation" ALTER COLUMN id SET DEFAULT nextval('public."Reservation_id_seq"'::regclass);


--
-- Data for Name: EquipmentSnapshot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EquipmentSnapshot" ("equipmentId", name, status, "createdAt") FROM stdin;
7	Monitor Samsung	AVAILABLE	2026-01-22 03:38:04.876
6	CABLE TIPO C	AVAILABLE	2026-01-22 03:38:04.876
10	Teclado Logitech	AVAILABLE	2026-01-22 03:38:04.876
13	Laptop Dell	AVAILABLE	2026-01-22 05:34:02.321
14	cable c	AVAILABLE	2026-01-22 19:58:03.927
15	Laptop Dell	AVAILABLE	2026-01-22 20:14:11.602
17	Laptop Dell	AVAILABLE	2026-01-22 20:14:22.777
1	Laptop Demo	AVAILABLE	2026-01-22 21:25:46.357
18	Laptop Dell	AVAILABLE	2026-01-22 22:14:29.694
19	Laptop Dell	AVAILABLE	2026-01-22 22:14:38.2
\.


--
-- Data for Name: Reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reservation" (id, "equipmentId", "studentId", "studentEmail", "studentName", "technicianName", "startAt", "endAt", reason, status, "createdAt", "updatedAt") FROM stdin;
7	7	6	kagarciab@uce.edu.ec	Karen Garcia 	\N	1970-01-01 00:00:00	1970-01-01 00:00:00	\N	PENDING	2026-01-22 04:28:28.84	2026-01-22 04:25:21.392
1	6	7	prueba1@uce.edu.ec	prueba	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	PENDING	2026-01-22 05:21:55.271	2026-01-22 05:21:55.271
4	13	7	prueba1@uce.edu.ec	prueba	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	CANCELLED	2026-01-22 05:35:27.552	2026-01-22 05:48:47.374
5	13	4	kagarciab1@uce.edu.ec	Karen Garcia	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	PENDING	2026-01-22 06:06:59.158	2026-01-22 06:06:59.158
2	10	7	prueba1@uce.edu.ec	prueba	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	CANCELLED	2026-01-22 05:31:07.205	2026-01-22 07:14:45.358
6	10	7	prueba1@uce.edu.ec	prueba	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	PENDING	2026-01-22 07:15:04.101	2026-01-22 07:15:04.101
3	7	7	prueba1@uce.edu.ec	prueba	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	CANCELLED	2026-01-22 05:31:29.239	2026-01-22 18:13:40.931
8	7	7	prueba1@uce.edu.ec	prueba	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	PENDING	2026-01-22 18:14:52.622	2026-01-22 18:14:52.622
9	14	4	kagarciab1@uce.edu.ec	Karen Garcia	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	PENDING	2026-01-22 19:58:20.396	2026-01-22 19:58:20.396
10	17	4	kagarciab1@uce.edu.ec	Karen Garcia	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	PENDING	2026-01-22 20:14:54.209	2026-01-22 20:14:54.209
11	15	4	kagarciab1@uce.edu.ec	Karen Garcia	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	CANCELLED	2026-01-22 20:28:21.001	2026-01-22 20:35:56.539
12	15	4	kagarciab1@uce.edu.ec	Karen Garcia	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	CANCELLED	2026-01-22 20:36:07.712	2026-01-22 20:39:48.866
13	15	4	kagarciab1@uce.edu.ec	Karen Garcia	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	CANCELLED	2026-01-22 20:39:59.906	2026-01-22 21:24:08.682
15	1	4	kagarciab1@uce.edu.ec	Karen Garcia	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	CANCELLED	2026-01-22 21:25:57.475	2026-01-22 21:37:52.548
14	15	4	kagarciab1@uce.edu.ec	Karen Garcia	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	CANCELLED	2026-01-22 21:24:24.909	2026-01-22 22:07:44.805
16	15	4	kagarciab1@uce.edu.ec	Karen Garcia	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	PENDING	2026-01-22 22:08:18.599	2026-01-22 22:08:18.599
17	18	4	kagarciab1@uce.edu.ec	Karen Garcia	\N	2026-01-21 10:00:00	2026-01-21 12:00:00	Reserva de prueba	CANCELLED	2026-01-22 22:17:44.061	2026-01-22 22:18:37.538
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d92be3bf-7226-4678-ab43-8a573b08f776	bf51dc91d45548473da73eba8e718cb3b1eb1f9cc7195b59fbd0bc2611300d05	2026-01-22 03:34:28.255118+00	20260122033048_init_snapshot	\N	\N	2026-01-22 03:34:28.22712+00	1
\.


--
-- Name: Reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reservation_id_seq"', 17, true);


--
-- Name: EquipmentSnapshot EquipmentSnapshot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EquipmentSnapshot"
    ADD CONSTRAINT "EquipmentSnapshot_pkey" PRIMARY KEY ("equipmentId");


--
-- Name: Reservation Reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Reservation_equipmentId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Reservation_equipmentId_idx" ON public."Reservation" USING btree ("equipmentId");


--
-- Name: Reservation_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Reservation_status_idx" ON public."Reservation" USING btree (status);


--
-- Name: Reservation_studentId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Reservation_studentId_idx" ON public."Reservation" USING btree ("studentId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict 7AhKsOnANIgDLQcvFFFTf35DjSSdoUiJvjhDnV0ef9PuArWB4mjZ22uvuvJTlnl

