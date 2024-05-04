interface Books {
     id?: String;
     title: string;
     author: string;
     year: number;
     read: boolean;
     InsertAt?: Date;
     UpdateAt?: Date;
}
interface ErrResponse {
     status: string
     message?: string
     error?: string
}

export { Books, ErrResponse }
