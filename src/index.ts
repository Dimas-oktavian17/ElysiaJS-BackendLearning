import { Elysia } from "elysia";
import { PrismaClient } from '@prisma/client';
import { cors } from '@elysiajs/cors'
interface Post {
     id?: number;
     name: string;
     email: string;
     path: string;
}
// ? Create a new prisma client
const prisma = new PrismaClient({
     log: ["info", "warn", "error"]
});
// ? init elysia client
const app = new Elysia().decorate('db', prisma)
app.use(cors())
// * fetch all posts 
app.get('/posts', ({ db }) => db.user.findMany())
     // * fetch a single post
     .get('/posts/:id', ({ db, params }) => db.user.findUnique({ where: { id: Number(params.id) } }))
     // * fetch a single post by path
     .get('/posts/path/:path', ({ db, params }) => db.user.findUnique({ where: { email: String(params.path) } }))
     // * create a post 
     .post('/posts', ({ db, body }) => {
          return db.user.create({
               data: body as Post
          })
     })
     // * update a post
     .put('/posts/:id', ({ db, params, body }) => {
          return db.user.update({
               where: { id: Number(params.id) },
               data: body as Post
          })
     })
     // * delete a post
     .delete('/posts/:id', ({ db, params }) => {
          return db.user.delete({
               where: { id: Number(params.id) }
          })
     })
     // * handle errors
     .onError(({ code }) => code === 'NOT_FOUND' && 'Route not found :(')
     // * listening to events
     .listen(process.env.API_PORT || 3000, () => {
          console.log(
               `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
          );
     })
