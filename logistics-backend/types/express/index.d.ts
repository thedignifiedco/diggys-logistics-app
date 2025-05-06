export {};

declare global {
  namespace Express {
    interface Request {
      frontegg?: {
        user: {
          sub: string;
          email?: string;
          name?: string;
          roles?: string[];
          tenantId?: string;
          metadata?: {
            teamId?: string;
            [key: string]: any;
          };
          [key: string]: any;
        };
      };
      user?: Request['frontegg']['user'];
      userId?: string;
      userTeamId?: string;
      userOrgId?: string;
    }
  }
}
