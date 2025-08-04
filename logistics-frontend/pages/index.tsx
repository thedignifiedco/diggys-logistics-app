import Head from 'next/head';
import NavBar from '../components/NavBar';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';
import { useAuth } from "@frontegg/nextjs";
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import ConsingmentForm from '../components/ConsignmentForm';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      <Head>
        <title>Diggys Logistics - Supply Chain Tracking System</title>
        <meta name="description" content="Track and manage your supply chain consignments with our comprehensive logistics platform. Real-time tracking, secure authentication, and efficient management tools." />
        <meta name="keywords" content="logistics, supply chain, tracking, consignment, freight, shipping" />
        <meta name="author" content="Diggys Labs" />
        <meta property="og:title" content="Diggys Logistics - Supply Chain Tracking System" />
        <meta property="og:description" content="Track and manage your supply chain consignments with our comprehensive logistics platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://logistics.dignifiedlabs.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Diggys Logistics - Supply Chain Tracking System" />
        <meta name="twitter:description" content="Track and manage your supply chain consignments with our comprehensive logistics platform." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
        <div className="container content">
            <div className="row justify-content-center">
                <div className="main col-md-8">
                    <HeroBanner />
                    {isAuthenticated && (
                    <p>Hi <b>{user?.name}</b>,</p>
                    )}
                    {isAuthenticated ? (
                      <ConsingmentForm />
                  ) : (
                    <div className="alert alert-warning">
                      <p>You must be logged in to use the consignment tracker.</p>
                      <Link href="/account/login">
                        <Button variant="primary">Login / Signup</Button>
                      </Link>
                    </div>
                  )}
                </div>
            </div>
        </div>
      <Footer />
    </div>
  );
};

export default Home;
