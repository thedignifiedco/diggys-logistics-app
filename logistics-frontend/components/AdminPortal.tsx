'use client';
import { AdminPortal } from '@frontegg/nextjs';
import { Button } from 'react-bootstrap';

export const AdminPortalButton = () => {
  return (
    <Button variant="primary" className="adminPortal-btn mt-3" onClick={() => AdminPortal.show()}>Admin Portal</Button>
  );
};