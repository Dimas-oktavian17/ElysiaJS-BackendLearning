interface Books {
     id?: number;
     title: string;
     author: string;
     year: number;
     read: boolean;
     InsertAt?: string | Date;
     UpdateAt?: string | Date;
}
interface ErrResponse {
     status: string
     message: string
}

export { Books, ErrResponse }
