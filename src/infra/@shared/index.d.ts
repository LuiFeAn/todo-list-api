export type JwtOutputPayload = {
  id: string;
};

declare global {
  interface Request {
    user: JwtOutputPayload;
  }
}
