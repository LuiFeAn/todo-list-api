export type JwtOutputPayload = {
  id: number;
};

declare global {
  interface Request {
    user: JwtOutputPayload;
  }
}
