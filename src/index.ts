import { Elysia } from "elysia";
import { PrismaClient } from '@prisma/client';
import { cors } from '@elysiajs/cors'
interface Books {
     id?: number;
     title: string;
     author: string;
     year: number;
     read: boolean;
     InsertAt?: string | Date;
     UpdateAt?: string | Date;
}
// ? Create a new prisma client
const prisma = new PrismaClient({
     log: ["info", "warn", "error"]
});
// ? init elysia client
const app = new Elysia().decorate('db', prisma)
app.use(cors())
// * fetch all posts 
app.get('/posts', ({ db }) => db.books.findMany())
     // * fetch a single post
     .get('/posts/:id', ({ db, params }) => db.books.findUnique({ where: { id: Number(params.id) } }))
     // * fetch a single post by path
     .get('/posts/path/:path', ({ db, params }) => db.books.findUnique({ where: { email: String(params.path) } }))
     // * create a post 
     .post('/posts', ({ db, body }) => {
          return db.books.create({
               data: body as Books
          })
     })
     // * update a post
     .put('/posts/:id', ({ db, params, body }) => {
          return db.books.update({
               where: { id: Number(params.id) },
               data: body as Books
          })
     })
     // * delete a post
     .delete('/posts/:id', ({ db, params }) => {
          return db.books.delete({
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
