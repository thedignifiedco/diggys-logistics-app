import { IncomingMessage, ServerResponse } from 'http';

declare module '@vercel/node' {
  export type VercelRequest = IncomingMessage & {
    query: { [key: string]: string | string[] };
    cookies: { [key: string]: string };
    body: any;
  };

  export type VercelResponse = ServerResponse & {
    send: (body: any) => VercelResponse;
    json: (jsonBody: any) => VercelResponse;
    status: (statusCode: number) => VercelResponse;
  };
}
