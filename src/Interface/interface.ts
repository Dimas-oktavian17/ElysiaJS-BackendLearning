type Books = {
     id?: string;
     title: string;
     author: string;
     year: number;
     read: boolean;
     InsertAt?: Date;
     UpdateAt?: Date;
}
type ErrResponse = {
     status: string
     message?: string
     error?: string
}

export { Books, ErrResponse }
