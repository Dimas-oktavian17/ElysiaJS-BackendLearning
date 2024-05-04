import { ErrResponse } from './interface'

const ErrGetResponse: ErrResponse = {
     status: "fail",
     message: "Buku tidak ditemukan"
}
const ErrPostNameResponse: ErrResponse = {
     status: "fail",
     message: "Gagal menambahkan buku. Mohon isi nama buku"
}
const ErrPutIdResponse: ErrResponse = {
     status: "fail",
     message: "Gagal memperbarui buku. Id tidak ditemukan"
}

const CatchErrorResponse = (error: unknown): ErrResponse => {
     return {
          status: "error",
          error: `${error}`
     };
}
export { ErrGetResponse, ErrPostNameResponse, ErrPutIdResponse, CatchErrorResponse }
