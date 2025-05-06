import { GetServerSideProps } from 'next';
import { getSession } from '@frontegg/nextjs/pages';
import { useAuth } from '@frontegg/nextjs';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { AdminPortalButton } from '@/components/AdminPortal';
import Link from 'next/link';

const ProfilePage = () => {
  const { user } = useAuth();
  const [metadata, setMetadata] = useState<Record<string, any>>({});

  useEffect(() => {
    if (user?.metadata) {
      try {
        const parsed =
          typeof user.metadata === 'string'
            ? JSON.parse(user.metadata)
            : user.metadata;
        setMetadata(parsed);
      } catch (e) {
        console.error('Failed to parse user metadata:', e);
      }
    }
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <NavBar />
      <Container className="content mt-4">
        <Card>
          <Card.Body>
            <Row>
              <Col sm={4}>
                <Image
                  src={user.profilePictureUrl ?? '/next.svg'}
                  roundedCircle
                  width="200"
                  height="200"
                  alt={user.name}
                />
              </Col>
              <Col sm={8}>
                <h2>{user.name}</h2>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Email Verified:</b> {JSON.stringify(user.verified)}</p>
                <p><b>User ID:</b> {user.sub}</p>
                <p><b>Org ID:</b> {user.tenantId}</p>
                <p><b>Team ID:</b> {metadata.teamId ?? 'N/A'}</p>
                <p>
                  <b>Parent Company:</b> {metadata.Company ?? 'N/A'} <br />
                  (Response from{' '}
                  <Link href="https://fake-json-api.mock.beeceptor.com/companies" target="_blank">
                    3rd-party API
                  </Link>)
                </p>
                <AdminPortalButton />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context.req);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
