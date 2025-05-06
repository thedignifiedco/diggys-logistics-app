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
                      <p>You must be logged in to use the consignment tools.</p>
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
