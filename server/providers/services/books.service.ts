import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../../entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository : Repository<Book>,
  ) {}

  findAllForUser(userId : number): Promise<Book[]> {
    return this.bookRepository.find({
      where : { userId : userId},
    })
  }

  findBookById(id : number) {
    return this.bookRepository.findOne(id);
  }

  createBook(book : Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  deleteBook(book : Book) {
    return this.bookRepository.delete(book);
  }

  updateBook(book : Book) {
    return this.bookRepository.update(book.id, book);
  }
}