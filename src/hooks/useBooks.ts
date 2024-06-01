import { Genre } from "./useGenres";

export interface Comment {
  username: string;
  comment: string;
}

export class Book {
    public id: number;
    public title: string;
    public author: string;
    public pageCount: number;
    public image: string;
    public genre: string;
    public available: boolean;
    public comments: Comment[];
    public borrowedBy: string;

    constructor(id: number, title: string, author: string, pageCount: number, image: string, genre: string, available: boolean, borrowedBy: string) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.pageCount = pageCount;
      this.image = image;
      this.genre = genre;
      this.available = available;
      this.comments = [];
      this.borrowedBy = borrowedBy;
    }
    getId(): number {
      return this.id;
    }

    setId(id: number): void {
      this.id = id;
    }

    getTitle(): string {
      return this.title;
    }

    setTitle(title: string): void {
      this.title = title;
    }

    getAuthor(): string {
      return this.author;
    }

    setAuthor(author: string): void {
      this.author = author;
    }

    getPageCount(): number {
      return this.pageCount;
    }

    setPageCount(pageCount: number): void {
      this.pageCount = pageCount;
    }
    setImage(image: string): void {
        this.image = image;
      }

      getImage(): string {
        return this.image;
      }
      setGenre(genre: string): void {
        this.genre = genre;
      }

      getGenre(): string {
        return this.genre;
    }

    setAvailable(available: boolean): void {
        this.available = available;
    }

    getAvailable(): boolean {
        return this.available;
    }

    addComment(username: string, comment: string): void {
        this.comments.push({ username, comment });
    }

    getComments(): Comment[] {
        return this.comments;
    }

    getBorrowedBy(): string {
        return this.borrowedBy;
    }

    setBorrowedBy(value: string) {
        this.borrowedBy = value;
    }
}

export const getBooks = async (): Promise<Book[]> => {
    return await fetch('http://localhost:8080/api/books', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then((responseBooks: Book[]) => {

            const bookList: Book[] = [];

            responseBooks.forEach(book => {
                let bookToAdd = new Book(book.id, book.title, book.author, book.pageCount, book.image, book.genre, book.available, book.borrowedBy);
                bookList.push(bookToAdd);
            })
            return bookList;

        })
        .catch((err) => {
            console.log(err.message);
            throw err;
        });
};

export default getBooks;