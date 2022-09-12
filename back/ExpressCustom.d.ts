declare namespace Express {
  export interface Response {
    success?: Response<any>;
    wrong?: Response<any>;
    forbidden?: Response<any>;
    accessDenied?: Response<any>;
    internal?: Response<any>;
    notFound?: Response<any>;
  }
}

declare module 'http' {
  interface IncomingHttpHeaders {
    user: any;
  }
}
