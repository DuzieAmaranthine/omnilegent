import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookClub } from "server/entities/book_club.entity";
import { User } from "server/entities/user.entity";
import { UserBookClub } from "server/entities/user_book_club.entity";
import { Not, Repository } from "typeorm";

@Injectable()
export class BookClubService {
  constructor(
    @InjectRepository(BookClub)
    private bookClubRepository : Repository<BookClub>,
    @InjectRepository(UserBookClub)
    private userBookClubRepository : Repository<UserBookClub>,
    @InjectRepository(User)
    private userRepository : Repository<User>,
  ) {}

  findAllBookClubs() {
    return this.bookClubRepository.find();
  }

  findBookClubById(id : number) {
    return this.bookClubRepository.findOne(id);
  }

  findAllForUser(userId : number) : Promise<UserBookClub[]> {
    return this.userBookClubRepository.find({ relations : ['bookClub'], where : { userId : userId, isBanned : false}});
  }

  findAvailableBookClubs(userId : number) : Promise<UserBookClub[]> {
    return this.userBookClubRepository.find({relations : ['bookClub'], where : {userId : Not(userId), isBanned : false}});
  }

  findMembersForBookClub(clubId : number) : Promise<User[]> {
    return this.userRepository.find({
      select : ['id', 'firstName', 'lastName'],
      relations : ['userBookClub'], 
      where : {bookClubId : clubId}});
  }

  createBookClub(bookClub : BookClub) {
    return this.bookClubRepository.save(bookClub);
  }

  deleteBookClub(bookClub : BookClub) {
    return this.bookClubRepository.delete(bookClub);
  }

  updateBookClub(bookClub : BookClub) {
    return this.bookClubRepository.update(bookClub.id, bookClub);
  }

  createUserBookClub(userBookClub : UserBookClub) {
    return this.userBookClubRepository.save(userBookClub);
  }

  deleteUserBookClub(userBookClub : UserBookClub) {
    return this.userBookClubRepository.delete(userBookClub);
  }

  updateUserBookClub(userBookClub : UserBookClub) {
    return this.userBookClubRepository.update(userBookClub.id, userBookClub);
  }

  findUserBookClub(clubId : number, userId : number) {
    return this.userBookClubRepository.findOne({where : {bookClubId : clubId, userId : userId}});
  }
}