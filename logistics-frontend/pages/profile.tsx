import Head from 'next/head';
import { GetServerSideProps } from "next";
import { getSession } from "@frontegg/nextjs/pages";
import { useAuth } from "@frontegg/nextjs";
import { Container, Card, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { AdminPortalButton } from "@/components/AdminPortal";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const { user } = useAuth();
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [metadata, setMetadata] = useState<Record<string, any>>({});

  // Decode the access token
  useEffect(() => {
    if (user?.accessToken) {
      const decoded = jwtDecode(user.accessToken);
      setDecodedToken(decoded);
    }
  }, [user]);

  useEffect(() => {
    if (user?.metadata) {
      try {
        const parsed =
          typeof user.metadata === "string"
            ? JSON.parse(user.metadata)
            : user.metadata;
        setMetadata(parsed);
      } catch (e) {
        console.error("Failed to parse user metadata:", e);
      }
    }
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <Head>
        <title>Profile - Diggys Logistics</title>
        <meta name="description" content="View and manage your user profile, organization details, and access token information in the Diggys Logistics platform." />
        <meta name="keywords" content="profile, user account, organization, authentication" />
        <meta name="author" content="Diggys Labs" />
        <meta property="og:title" content="Profile - Diggys Logistics" />
        <meta property="og:description" content="View and manage your user profile and organization details." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://logistics.dignifiedlabs.com/profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Profile - Diggys Logistics" />
        <meta name="twitter:description" content="View and manage your user profile and organization details." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Container className="content mt-4">
        <Card>
          <Card.Body>
            <Row>
              <Col sm={4}>
                <Image
                  src={user.profilePictureUrl ?? "/next.svg"}
                  roundedCircle
                  width="200"
                  height="200"
                  alt={user.name}
                  className="profile-picture"
                />
                <AdminPortalButton />
              </Col>
              <Col sm={8}>
                <h2>{user.name}</h2>
                <p>
                  <b>Email:</b> {user.email}
                </p>
                <p>
                  <b>Email Verified:</b> {JSON.stringify(user.verified)}
                </p>
                <p>
                  <b>User ID:</b> {user.sub}
                </p>
                <p>
                  <b>Org ID:</b> {user.tenantId}
                </p>
                <p>
                  <b>Team:</b> {metadata.teamId ?? "N/A"}
                </p>
                <p>
                  <b>Parent Company:</b>{" "}
                  {(user as any).customClaims?.Company ?? "N/A"} <br />
                  (Response from{" "}
                  <Link
                    href="https://fake-json-api.mock.beeceptor.com/companies"
                    target="_blank"
                  >
                    3rd-party API
                  </Link>
                  )
                </p>
                <h3>Decoded Access Token</h3>
                <pre>
                  {decodedToken
                    ? JSON.stringify(decodedToken, null, 2)
                    : "No token available"}
                </pre>
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
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
