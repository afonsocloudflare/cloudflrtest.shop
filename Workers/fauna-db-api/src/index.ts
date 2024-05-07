import { Hono } from 'hono';
import { Client, fql, ServiceError } from 'fauna';

type Bindings = {
  FAUNA_SECRET: string;
};

type Variables = {
  faunaClient: Client;
};

type Product = {
  id: string;
  serialNumber: number;
  title: string;
  weightLbs: number;
  quantity: number;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use('*', async (c, next) => {
  const faunaClient = new Client({
    secret: c.env.FAUNA_SECRET,
  });
  c.set('faunaClient', faunaClient);
  await next();
});

app.get('/', (c) => {
  return c.text('Hello World');
});

export default app;

app.use('*', async (c, next) => {
  const faunaClient = new Client({
    secret: c.env.FAUNA_SECRET,
  });
  c.set('faunaClient', faunaClient);
  await next();
});