import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
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
      <Container>
        <Row className="mt-5">
          <Col>
            <Container>
                <h2>Orders Dashboard</h2>
            </Container>
            <AccordionForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
