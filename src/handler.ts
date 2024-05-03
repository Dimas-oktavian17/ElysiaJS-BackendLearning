import { Books } from './Interface/interface';
const getAllBooks = async (db: any) => {
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

export { getAllBooks }
