--
-- PostgreSQL database dump
--

\restrict t2xryLRPXXaYHnTFOimdHfil6O8lbeRt4MMKvnPXLGqh4NBq49aDdiqjyIK9at3

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


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: LoginAttempt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LoginAttempt" (
    email text NOT NULL,
    success boolean NOT NULL,
    ip text,
    "userAgent" text,
    reason text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userName" text,
    "userRole" text,
    id integer NOT NULL,
    "userId" integer
);


ALTER TABLE public."LoginAttempt" OWNER TO postgres;

--
-- Name: LoginAttempt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LoginAttempt_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."LoginAttempt_id_seq" OWNER TO postgres;

--
-- Name: LoginAttempt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LoginAttempt_id_seq" OWNED BY public."LoginAttempt".id;


--
-- Name: RefreshToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RefreshToken" (
    "tokenHash" text NOT NULL,
    device text,
    ip text,
    "userAgent" text,
    revoked boolean DEFAULT false NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."RefreshToken" OWNER TO postgres;

--
-- Name: RefreshToken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RefreshToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."RefreshToken_id_seq" OWNER TO postgres;

--
-- Name: RefreshToken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RefreshToken_id_seq" OWNED BY public."RefreshToken".id;


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
-- Name: LoginAttempt id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LoginAttempt" ALTER COLUMN id SET DEFAULT nextval('public."LoginAttempt_id_seq"'::regclass);


--
-- Name: RefreshToken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshToken" ALTER COLUMN id SET DEFAULT nextval('public."RefreshToken_id_seq"'::regclass);


--
-- Data for Name: LoginAttempt; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LoginAttempt" (email, success, ip, "userAgent", reason, "createdAt", "userName", "userRole", id, "userId") FROM stdin;
marta@uce.edu.ec	f	::ffff:172.20.0.1	PostmanRuntime/7.51.0	INVALID_PASSWORD	2026-01-20 01:29:16.692	Marta Alarcón	STUDENT	1	6
marta@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-20 01:29:22.169	Marta Alarcón	STUDENT	2	6
marta@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-20 01:50:36.723	Marta Alarcón	STUDENT	3	6
marta@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-20 01:52:08.107	Marta Alarcón	STUDENT	4	6
kagarciab@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-20 01:53:02.048	Karen Garcia	TECHNICIAN	5	2
kagraciab@uce.edu.ec	f	::ffff:172.20.0.1	PostmanRuntime/7.51.0	USER_NOT_FOUND_OR_INACTIVE	2026-01-21 19:09:04.004	\N	\N	6	\N
kagarciab@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-21 19:09:19.438	Karen Garcia	TECHNICIAN	7	2
21@uce.edu.ec	f	::ffff:172.20.0.1	PostmanRuntime/7.51.0	USER_NOT_FOUND_OR_INACTIVE	2026-01-21 19:12:55.97	\N	\N	8	\N
kagraciab1@uce.edu.ec	f	::ffff:172.20.0.1	PostmanRuntime/7.51.0	USER_NOT_FOUND_OR_INACTIVE	2026-01-21 19:14:04.538	\N	\N	9	\N
kagraciab1@uce.edu.ec	f	::ffff:172.20.0.1	PostmanRuntime/7.51.0	USER_NOT_FOUND_OR_INACTIVE	2026-01-21 19:14:12.084	\N	\N	10	\N
kagarciab1@uce.edu.ec	f	::ffff:172.20.0.1	PostmanRuntime/7.51.0	INVALID_PASSWORD	2026-01-21 19:14:23.843	Karen Garcia	STUDENT	11	4
kagarciab1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-21 19:14:27.289	Karen Garcia	STUDENT	12	4
kagarciab1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-21 23:20:02.729	Karen Garcia	STUDENT	13	4
kagarciab1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-21 23:26:35.638	Karen Garcia	STUDENT	14	4
kagarciab1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 00:12:34.644	Karen Garcia	STUDENT	15	4
marta@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 02:15:52.266	Marta Alarcón	STUDENT	16	6
kagarciab1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 03:26:35.34	Karen Garcia	STUDENT	17	4
prueba@uce.edu.ec	f	::ffff:172.20.0.1	PostmanRuntime/7.51.0	USER_NOT_FOUND_OR_INACTIVE	2026-01-22 04:19:50.52	\N	\N	18	\N
prueba1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 04:20:28.466	prueba	STUDENT	19	7
prueba1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 04:21:06.296	prueba	STUDENT	20	7
prueba1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 05:21:33.883	prueba	STUDENT	21	7
kagarciab@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 06:04:10.366	Karen Garcia	TECHNICIAN	22	2
kagarciab1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 06:04:15.499	Karen Garcia	STUDENT	23	4
kagarciab1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 06:06:11.908	Karen Garcia	STUDENT	24	4
prueba1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 07:13:08.38	prueba	STUDENT	25	7
prueba1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 18:12:33.375	prueba	STUDENT	26	7
kagarciab@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 19:54:39.382	Karen Garcia	TECHNICIAN	27	2
kagarciab1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 19:55:37.368	Karen Garcia	STUDENT	28	4
kagarciab1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 21:21:55.884	Karen Garcia	STUDENT	29	4
kagarciab1@uce.edu.ec	t	::ffff:172.20.0.1	PostmanRuntime/7.51.0	AUTH_ERROR	2026-01-22 22:17:20.117	Karen Garcia	STUDENT	30	4
\.


--
-- Data for Name: RefreshToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RefreshToken" ("tokenHash", device, ip, "userAgent", revoked, "expiresAt", "createdAt", id, "userId") FROM stdin;
$2a$10$zM/xVAn6bvQZ6CroMYqYK.Yc8/5TihXO4CgQRxBc33NeDWRVs0a9a	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-27 01:29:22.163	2026-01-20 01:29:22.165	1	6
$2a$10$EJvCHdVjtY7x65cplbKu4eL2weQyLNUmMfd2LxnfldeWRi.ip8e8a	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-27 01:50:36.697	2026-01-20 01:50:36.702	2	6
$2a$10$sadt5JT27Nq1tzKCehs0huSczKX1D1LJV7kImM.Ty4Ttv3HaFSGk2	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-27 01:52:08.102	2026-01-20 01:52:08.103	3	6
$2a$10$6VbhkZ3wQMQTKC5KkJvXqOLW0Rsj1nykG84B6iHmO0Th7nBNAGvMG	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-27 01:53:02.043	2026-01-20 01:53:02.044	4	2
$2a$10$LhGNArpVbIbnLkHystZt2e5CKA0U3OLXJ1MnDzk9EOnNkjRrfToDu	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-28 19:09:19.428	2026-01-21 19:09:19.43	5	2
$2a$10$PjjLM6p9TrBbcukv1pAHIuPX3jH2GbVpICaeg6SJFzr48O2e9PxWC	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-28 19:14:27.284	2026-01-21 19:14:27.286	6	4
$2a$10$7uRlBYZywJE2Ma9/mFeil.ylMJ455AnCNp8ehSB1A8UBFS1YoXn4S	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-28 23:20:02.582	2026-01-21 23:20:02.642	7	4
$2a$10$krbhXby.wx/TaDOTGQbGV.d6E0vHRIDu0PR1ZWBlBhw6X7FgoAjzC	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-28 23:26:35.612	2026-01-21 23:26:35.616	8	4
$2a$10$.hgy27AyEXuIlHmETDJVjeRKu94nCCgvOzFzr5KqWjML19enNBPyK	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 00:12:34.551	2026-01-22 00:12:34.569	9	4
$2a$10$ppRVBAo5QL7FBCGFngR6cuefNY/jtE1pTRb59EVGBhmU3zzMIM4AO	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 02:15:52.149	2026-01-22 02:15:52.174	10	6
$2a$10$1wxv7b6h3H6i.zakjTBhn.UngtFykaAECXNPYcrXIawu956qPn0rW	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 03:26:35.252	2026-01-22 03:26:35.273	11	4
$2a$10$WoVoZ0zYBPizS0eluDNaAulZSHCNdGgKFOcr5hNTCsU6CtDswVD3a	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 04:20:28.439	2026-01-22 04:20:28.444	12	7
$2a$10$OjixHZySX7bUeAvFzsPOOuAfSH.13TXrcL7g0vr/wQ/jgSYaW6PTi	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 04:21:06.289	2026-01-22 04:21:06.291	13	7
$2a$10$3LVhlRAGRm0C0b63KGUVMOS/tzZXBAV1qICjjxTZYCZDucR3Igyg6	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 05:21:33.816	2026-01-22 05:21:33.831	14	7
$2a$10$4nd47NOEkOpS43qERyCJr.Q6xguRbarzINTwfCpIOCFQNpFxIw0IW	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 06:04:10.295	2026-01-22 06:04:10.31	15	2
$2a$10$4IRWZWmx6u2sxwD1tGBVZeDqKOqbcEXgxz0NZtvJKXCbG4ojDJU12	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 06:04:15.493	2026-01-22 06:04:15.495	16	4
$2a$10$nn9KKVz4QfnuS3nM8dtaFe2HOwQkcVCgHBc.1qJdfL24BzhXaOSK6	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 06:06:11.901	2026-01-22 06:06:11.902	17	4
$2a$10$nISqgKQgrXTeW73ojqfeRO1bYM3UBwmJibVA1ywU9vfHvoJ8WGQ56	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 07:13:08.3	2026-01-22 07:13:08.319	18	7
$2a$10$9P5tUKamO0iUkiB8MENTruoO5PXDYIHxdSuqx0ekREUKqGWch0aMK	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 18:12:33.358	2026-01-22 18:12:33.363	19	7
$2a$10$BGwgaCu1O/joG7UmeFVQc.1giAKgKdFuKw2qAJu.c/1HzfPpKHwXC	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 19:54:39.295	2026-01-22 19:54:39.322	20	2
$2a$10$BdJzMTC0Om80vS1LBw9yAe8Tnnz68VJXjLbzW.RlbXAig8sc/ShS6	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 19:55:37.36	2026-01-22 19:55:37.363	21	4
$2a$10$KQrlsRiogF1PTLKETMI8Q.d25UaIScBZqjsPMKGaXpRn9ws2tA0F2	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 21:21:55.819	2026-01-22 21:21:55.835	22	4
$2a$10$8dkFY50SIthw9qx9DvGDbeEzM8OuZuvQzGV6xdipHvW65ADqFGyiy	postman	::ffff:172.20.0.1	PostmanRuntime/7.51.0	f	2026-01-29 22:17:20.067	2026-01-22 22:17:20.079	23	4
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6018d2f6-cae6-43ba-b0e5-180b09f03f8a	0afbd12c413828fa417c7e15ecbcb4425add46d02ca5cee62bf8a0b2ba0024c4	2026-01-20 01:10:11.059733+00	20260117190407_init_auth	\N	\N	2026-01-20 01:10:11.044129+00	1
0ea3d223-e786-49c1-9058-b3d4a89d9a58	2b18a0a73b4bce691de308bfdeb193d8cb3816166ca79b81b2f8468d8c2499ec	2026-01-20 01:10:11.092679+00	20260117192353_init_auth	\N	\N	2026-01-20 01:10:11.061311+00	1
9544e9ed-5a50-450b-a2a8-b96eba2c47dc	14e3240bf2e434f043ffed6f958e8d67db7b72b170d74b18989bf2aea40060a7	2026-01-20 01:10:43.193912+00	20260120011043_init_auth	\N	\N	2026-01-20 01:10:43.162368+00	1
\.


--
-- Name: LoginAttempt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LoginAttempt_id_seq"', 30, true);


--
-- Name: RefreshToken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RefreshToken_id_seq"', 23, true);


--
-- Name: LoginAttempt LoginAttempt_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LoginAttempt"
    ADD CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY (id);


--
-- Name: RefreshToken RefreshToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshToken"
    ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: LoginAttempt_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LoginAttempt_email_idx" ON public."LoginAttempt" USING btree (email);


--
-- Name: LoginAttempt_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LoginAttempt_userId_idx" ON public."LoginAttempt" USING btree ("userId");


--
-- Name: RefreshToken_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "RefreshToken_userId_idx" ON public."RefreshToken" USING btree ("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict t2xryLRPXXaYHnTFOimdHfil6O8lbeRt4MMKvnPXLGqh4NBq49aDdiqjyIK9at3

