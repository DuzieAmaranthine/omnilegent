import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JwtBody } from '../../decorators/jwt_body.decorator';
import { JwtBodyDto} from '../../dto/jwt_body.dto';
import { Book } from '../../entities/book.entity';
import { BooksService } from '../../providers/services/books.service'

class BookPostBody {
  title : string;
  author : string;
  description : string;
  pages : number;
  hasRead : boolean;
  pubDate : string;
  dateRead : string;
  thumbnail : string;
  genre : string;
}

@Controller()
export class BookController {
  constructor(private booksService : BooksService) {}

  @Get('/books')
  public async index(@JwtBody() jwtBody : JwtBodyDto) {
    const books = await this.booksService.findAllForUser(jwtBody.userId);
    return { books };
  }

  @Get('/books_read')
  public async read(@JwtBody() jwtBody : JwtBodyDto) {
    const books = await (await this.booksService.findAllForUser(jwtBody.userId)).filter((book) => {return book.hasRead});
    return { books };
  }

  @Get('/books_to_read')
  public async toRead(@JwtBody() jwtBody : JwtBodyDto) {
    const books = await (await this.booksService.findAllForUser(jwtBody.userId)).filter((book) => {return !book.hasRead});
    return { books };
  }

  @Get('/books/:id')
  public async show(@Param('id') id : string) {
    const book = await this.booksService.findBookById(parseInt(id, 10));
    return { book };
  }

  @Post('/books')
  public async create(@JwtBody() jwtBody : JwtBodyDto, @Body() body : BookPostBody) {
    let book = new Book();
    book.title = body.title;
    book.author = body.author;
    book.description = body.description;
    book.pages = body.pages;
    book.pubDate = body.pubDate;
    book.thumbnail = body.thumbnail;
    book.hasRead = body.hasRead;
    book.dateRead = body.dateRead;
    book.userId = jwtBody.userId;
    book.genre = body.genre;

    const newBook = await this.booksService.createBook(book);

    return { newBook };
  }

  @Put('/books/:id')
  public async update(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto,) {
    let book = await this.booksService.findBookById(parseInt(id, 10));

    if (book.userId !== jwtBody.userId) {
      return {'error' : 'Unauthorized'};
    }

    book.hasRead = true;
    book.dateRead = Date.toString();
    const updatedBook = await this.booksService.updateBook(book);

    return {'success' : `Book's read status is now ${book.hasRead}`};
  }

  @Delete('/books/:id')
  public async destroy(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    const book = await this.booksService.findBookById(parseInt(id, 10));

    if (book.userId !== jwtBody.userId) {
      return {'error' : 'Unauthorized'};
    }

    await this.booksService.deleteBook(book);

    return {'success' : `${book.title} has been deleted`}
  }
}