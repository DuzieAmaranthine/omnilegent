import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookController } from "../controllers/api/book.controller";
import { Book } from "../entities/book.entity";
import { BooksService } from "../providers/services/books.service";
import { JwtService } from "../providers/services/jwt.service";

@Module({
  imports : [TypeOrmModule.forFeature([Book])],
  controllers : [BookController],
  providers : [BooksService, JwtService],
  exports : [],
})
export class BooksModule {}