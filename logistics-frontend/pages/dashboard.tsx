import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AccordionForm from '../components/AccordionForm';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = true; // Replace with actual authentication logic
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <NavBar />
      <Container className='content'>
            <Container>
                <h2>Consignments Dashboard</h2>
            </Container>
            <AccordionForm />
      </Container>
      <Footer />
    </div>
  );
};

export default Dashboard;
