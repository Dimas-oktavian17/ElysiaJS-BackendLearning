import { ErrResponse } from './interface'

const ErrGetResponse: ErrResponse = {
     status: "fail",
     message: "Buku tidak ditemukan"
}
const ErrPostNameResponse: ErrResponse = {
     status: "fail",
     message: "Gagal menambahkan buku. Mohon isi nama buku"
}
const CatchErrorResponse = (error: unknown): ErrResponse => {
     return {
          status: "error",
          error: `${error}`
     };
}
export { ErrGetResponse, ErrPostNameResponse, CatchErrorResponse }
