import { PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Books } from './Interface/interface';
import { ErrGetResponse } from './Interface/ErrorResponse';
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
          // Handle any errors that occur during the database operation
          return {
               status: "error",
               error: "Failed to fetch books"
          };
     }
}
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
          // Handle any errors that occur during the database operation
          return {
               status: "error",
               error: "Failed to fetch books"
          };
     }
}
export { getAllBooks, getIdBooks }
