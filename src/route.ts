import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
// ? Method, and data 
import { Books } from './Interface/interface';
import { getAllBooks, getIdBooks } from './handler';
import { prisma } from '../prisma/PrismaClient';

// ? init elysia client
const app = new Elysia().decorate('db', prisma)
app.use(cors())
// * fetch all posts 
app.get('/books', async ({ db }) => getAllBooks(db))
     // * fetch a single post
     .get('/books/:id', ({ db, params, error }) => getIdBooks(db, params, error))
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
