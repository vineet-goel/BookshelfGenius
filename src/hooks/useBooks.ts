import { Genre } from "./useGenres";

interface Comment {
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
  public comments: Comment[];

  constructor(
    id: number,
    title: string,
    author: string,
    pageCount: number,
    image: string,
    genre: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.image = image;
    this.genre = genre;
    this.comments = [];
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

  addComment(username: string, comment: string): void {
    this.comments.push({ username, comment });
  }

  getComments(): Comment[] {
    return this.comments;
  }
}

const books: Book[] = [
  new Book(1, "The Great Gatsby", "F. Scott Fitzgerald", 180,"./src/images/book1.jpg","Classics"),
  new Book(2, "Pride and Prejudice", "Jane Austen", 320,"./src/images/book2.jpg","Classics"),
  new Book(3, "Crime and Punishment", "Fyodor Mihaylovic Dostoyevski", 687,"./src/images/book3.jpg","Classics"),
  new Book(4, "To Kill a Mockingbird", "Harper Lee", 360,"./src/images/book4.jpg","Classics"),
  new Book(5, "The Catcher in the Rye", "J. D. Salinger", 234,"./src/images/book5.jpg","Classics"),
  new Book(6, "1984", "George Orwell", 352,"./src/images/book6.jpg","Classics"),
  new Book(7, "Moby-Dick", "Herman Melville", 728,"./src/images/book7.jpg","Classics"),
  new Book(8, "War and Peace", "Leo Tolstoy", 1823,"./src/images/book8.jpg","Classics"),
  new Book(9, "Alice's Adventures in Wonderland", "Lewis Carroll", 128,"./src/images/book9.jpg","Classics"),
  new Book(10, "Jane Eyre", "Charlotte Bronte", 608,"./src/images/book10.jpg","Classics"),
  new Book(11, "Great Expectations", "Charles Dickens", 656,"./src/images/book11.jpg","Classics"),
  new Book(12, "The Adventures of Huckleberry Finn", "Mark Twain", 343,"./src/images/book12.jpg","Classics"),
  new Book(13, "Wuthering Heights", "Emily Bronte", 443,"./src/images/book13.jpg","Classics"),
  new Book(14, "The Picture of Dorian Gray", "Oscar Wilde", 280,"./src/images/book14.jpg","Classics"),
  new Book(15, "Don Quixote", "Miguel de Cervantes", 906,"./src/images/book15.jpg","Classics"),
  new Book(16, "Anna Karenina", "Leo Tolstoy", 1035,"./src/images/book16.jpg","Classics"),
  new Book(17, "Frankenstein", "Mary Shelley", 256,"./src/images/book17.jpg","Classics"),
  new Book(18, "The Brothers Karamazov", "Fyodor Dostoyevsky", 1080,"./src/images/book18.jpg","Classics"),
  new Book(19, "The Grapes of Wrath", "John Steinbeck", 540,"./src/images/book19.jpg","Classics"),
  new Book(20, "The Scarlet Letter", "Nathaniel Hawthorne", 264,"./src/images/book20.jpg","Classics"),
  new Book(21, "The Girl with the Dragon Tattoo", "Stieg Larsson", 646, "./src/images/book21.jpg","Mystery"),
  new Book(22, "Gone Girl", "Gillian Flynn", 600, "./src/images/book22.jpg","Mystery"),
  new Book(23, "The Hound of the Baskervilles", "Arthur Conan Doyle", 138, "./src/images/book23.jpg","Mystery"),
  new Book(24, "Big Little Lies", "Liane Moriarty", 416, "./src/images/book24.jpg","Mystery"),
  new Book(25, "The Da Vinci Code", "Dan Brown", 495, "./src/images/book25.jpg","Mystery"),
  new Book(26, "The Lord of the Rings", "J.R.R. Tolkien", 520, "./src/images/book26.jpg","Fantasy"),
  new Book(27, "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 300, "./src/images/book27.jpg","Fantasy"),
  new Book(28, "A Song of Ice and Fire", "George R.R. Martin", 847, "./src/images/book28.jpg","Fantasy"),
  new Book(29, "The Name of the Wind", "Patrick Rothfuss", 736, "./src/images/book29.jpg","Fantasy"),
  new Book(30, "Mistborn: The Final Empire", "Brandon Sanderson", 668, "./src/images/book30.jpg","Fantasy"),
  new Book(31, "Dune", "Frank Herbert", 712, "./src/images/book31.jpg","Science Fiction"),
  new Book(32, "Neuromancer", "William Gibson", 336, "./src/images/book32.jpg","Science Fiction"),
  new Book(33, "The Martian", "Andy Weir", 416, "./src/images/book33.jpg","Science Fiction"),
  new Book(34, "Foundation", "Isaac Asimov", 304, "./src/images/book34.jpg","Science Fiction"),
  new Book(35, "The Notebook", "Nicholas Sparks", 276, "./src/images/book35.jpg","Romance"),
  new Book(36, "Outlander", "Diana Gabaldon", 703, "./src/images/book36.jpg","Romance"),
  new Book(37, "Me Before You", "Jojo Moyes", 476, "./src/images/book37.jpg","Romance"),
  new Book(38, "The Fault in Our Stars", "John Green", 320, "./src/images/book38.jpg","Romance"), 
  new Book(39,"The Silence of the Lambs", "Thomas Harris",432, "./src/images/book39.jpg","Mystery"),
  new Book(40, "The Magician's Nephew (Narnia 1)", "C. S. Lewis", 240, " ./src/images/book40.jpg","Fantasy"),
  new Book(41, "Brave New World", "Aldous Huxley", 288, "./src/images/book41.jpg","Science Fiction"),
  new Book(42, "Gone with the Wind", "Margaret Mitchell", 960, " ./src/images/book42.jpg","Romance"),
  
];

const useBooks = (selectedGenre?: Genre | null) => {
  return { books, selectedGenre };
};

export default useBooks;