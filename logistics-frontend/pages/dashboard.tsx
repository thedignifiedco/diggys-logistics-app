'use client';
import Head from 'next/head';
import { GetServerSideProps } from "next";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AccordionForm from '../components/AccordionForm';
import { Container, Row, Col } from 'react-bootstrap';
import { getSession } from "@frontegg/nextjs/pages";

const Dashboard = () => {

  return (
    <div>
      <Head>
        <title>Dashboard - Diggys Logistics</title>
        <meta name="description" content="Manage and track your consignments with our comprehensive dashboard. View, create, update, and monitor all your logistics operations." />
        <meta name="keywords" content="dashboard, consignments, logistics management, tracking" />
        <meta name="author" content="Diggys Labs" />
        <meta property="og:title" content="Dashboard - Diggys Logistics" />
        <meta property="og:description" content="Manage and track your consignments with our comprehensive dashboard." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://logistics.dignifiedlabs.com/dashboard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dashboard - Diggys Logistics" />
        <meta name="twitter:description" content="Manage and track your consignments with our comprehensive dashboard." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Container className="content">
        <h2>Consignments Dashboard</h2>
        <AccordionForm />
      </Container>
      <Footer />
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context.req);

  if (!session) {
    return {
      redirect: {
        destination: `/account/login?redirectUrl=${encodeURIComponent(
          context.resolvedUrl
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};