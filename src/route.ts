import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
// ? Method, and data 
import { getAllBooks, getIdBooks, postBooks } from './handler';
import { prisma } from '../prisma/PrismaClient';

// ? init elysia client
const app = new Elysia().decorate('db', prisma)
app.use(cors())
// * fetch all posts 
app.get('/books', async ({ db }) => getAllBooks(db))
     // * fetch a single post
     .get('/books/:id', ({ db, params, error }) => getIdBooks(db, params, error))
     // * create a post 
     .post('/books', ({ db, body, error, set }) => postBooks(db, body, error, set), {
          body: t.Object({
               title: t.String({ minLength: 5, maxLength: 100 }),
               author: t.String({ minLength: 5, maxLength: 30 }),
               year: t.Number(),
          })
     })
     // update a post
     // .put('/posts/:id', ({ db, params, body }) => {
     //      return db.books.update({
     //           where: { id: Number(params.id) },
     //           data: body as Books
     //      })
     // })
     // // * delete a post
     // .delete('/posts/:id', ({ db, params }) => {
     //      return db.books.delete({
     //           where: { id: Number(params.id) }
     //      })
     // })
     // * handle errors
     .onError(({ code }) => code === 'NOT_FOUND' && 'Route not found :(')
     // * listening to events
     .listen(process.env.API_PORT || 3000, () => {
          console.log(
               `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
          );
     })
