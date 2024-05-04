import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
// ? Method, and data 
import { getAllBooks, getIdBooks, postBooks, putIdBooks } from './handler';
import { prisma } from '../prisma/PrismaClient';

// ? init elysia client
const app = new Elysia().decorate('db', prisma)
app.use(cors())
// * fetch all Books
app.get('/books', async ({ db }) => getAllBooks(db))
     // * fetch a single Books
     .get('/books/:id', ({ db, params, error }) => getIdBooks(db, params, error))
     // * create a Books 
     .post('/books', ({ db, body, error, set }) => postBooks(db, body, error, set), {
          body: t.Object({
               title: t.String({ minLength: 5, maxLength: 100 }),
               author: t.String({ minLength: 5, maxLength: 30 }),
               year: t.Number(),
          })
     })
     // * update a Books
     .put('/books/:id', ({ db, params, body, error }) => putIdBooks(db, params, body, error), {
          body: t.Object({
               title: t.String({ minLength: 5 }),
               author: t.String({ minLength: 5 }),
               year: t.Number(),
               read: t.Boolean()
          })

     })
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
