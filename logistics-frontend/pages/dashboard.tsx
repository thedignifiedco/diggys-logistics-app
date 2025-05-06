'use client';
import { GetServerSideProps } from "next";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AccordionForm from '../components/AccordionForm';
import { Container, Row, Col } from 'react-bootstrap';
import { getSession } from "@frontegg/nextjs/pages";

const Dashboard = () => {

  return (
    <div>
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