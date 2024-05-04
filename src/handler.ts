import { PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Books } from './Interface/interface';
import { CatchErrorResponse, ErrGetResponse, ErrPostNameResponse } from './Interface/ErrorResponse';
// import { InsertAt, UpdateAt, id } from './Helper/Utility';

//  * GetALLBooks
const getAllBooks = async (db: PrismaClient<{ log: ("error" | "info" | "warn")[]; }, never, DefaultArgs>) => {
     try {
          const dataBooks = await db.books.findMany()
          const simplifiedBooks = dataBooks.map((book: Books) => ({
               id: book.id,
               title: book.title,
               year: book.year
          }));
          return {
               status: "success",
               data: {
                    books: simplifiedBooks
               }
          }
     } catch (error) {
          // ? Handle error that ocurred the database operation
          CatchErrorResponse(error)
     }
}
// * GetBooksByID
const getIdBooks = async (db: PrismaClient<{ log: ("error" | "info" | "warn")[]; }, never, DefaultArgs>, params: Record<"id", string>, error: any) => {
     try {
          const BookID = await db.books.findUnique({ where: { id: Number(params.id) } })
          // ? Checking if the book exists showing the books
          return BookID !== null ? {
               status: "success",
               data: {
                    books: BookID
               }
               // ? if not, throw 404 
          } : error(404, ErrGetResponse)
     } catch (error) {
          // ? Handle any errors that occur during the database operation
          CatchErrorResponse(error)
     }
}
// * PostBooks
const postBooks = async (db: PrismaClient<{ log: ("error" | "info" | "warn")[]; }, never, DefaultArgs>, body: unknown, error: any, set: any) => {
     try {
          const InsertData = await db.books.create({
               data: body as Books
          })
          set.status = 201
          return {
               status: "success",
               message: "Buku berhasil ditambahkan",
               data: {
                    bookId: InsertData.id
               }
          }
     } catch (err) {
          // ? Handle any errors that occur during the database operation
          error(400, ErrPostNameResponse)
          // CatchErrorResponse(error)
     }
}
export { getAllBooks, getIdBooks, postBooks }
