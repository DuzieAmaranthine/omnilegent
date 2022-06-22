import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { JwtBody } from "server/decorators/jwt_body.decorator";
import { Roles } from "server/decorators/roles.decorator";
import { JwtBodyDto } from "server/dto/jwt_body.dto";
import { BookClub } from "server/entities/book_club.entity";
import { RoleKey } from "server/entities/role.entity";
import { BookClubService } from "../../providers/services/book_club.service";
import { UsersService } from "../../providers/services/users.service";
import * as crypto from 'crypto';
import { UserBookClub } from "server/entities/user_book_club.entity";

class BookClubPostBody {
  title : string;
  description : string;
  isPublic : boolean;
}

@Controller()
export class BookClubController {
  constructor(
    private bookClubService : BookClubService,
    private usersService : UsersService,
  ) {}

  @Get('/book_clubs')
  @Roles(RoleKey.ADMIN)
  public async index() {
    const clubs = await this.bookClubService.findAllBookClubs();
    return { clubs };
  }

  @Get('/book_clubs/:clubId')
  public async show(@Param('clubId') clubId : string) {
    const club = this.bookClubService.findBookClubById(parseInt(clubId, 10));
    return { club };
  }

  @Get('/current_clubs')
  public async current(@JwtBody() jwtBody : JwtBodyDto) {
    const clubs = await this.bookClubService.findAllForUser(jwtBody.userId);
    return { clubs };
  }

  @Get('/available_clubs')
  public async available(@JwtBody() jwtBody : JwtBodyDto) {
    const clubs = await this.bookClubService.findAvailableBookClubs(jwtBody.userId);
    return { clubs }
  }

  @Get('/current_members/:club_id')
  public async members(@Param('club_id') clubId : string) {
    const members = await this.bookClubService.findMembersForBookClub(parseInt(clubId, 10));
    return { members };
  }

  @Post('/book_clubs')
  public async create(@JwtBody() jwtBody : JwtBodyDto, @Body() body : BookClubPostBody) {
    const user = await this.usersService.find(jwtBody.userId);
    let club = new BookClub();

    club.ownerId = user.id;
    club.key = crypto.randomBytes(8).toString('hex');
    club.title = body.title;
    club.description = body.description;
    club.isPublic = body.isPublic;

    const newClub = await this.bookClubService.createBookClub(club);

    let userClub = new UserBookClub();
    userClub.userId = user.id;
    userClub.bookClubId = newClub.id;
    userClub.isBanned = false;
    userClub.user = user;
    userClub.bookClub = newClub;

    const newUserClub = await this.bookClubService.createUserBookClub(userClub);

    return { newClub };
  }

  @Post('/join_club/:club_id')
  public async join(@JwtBody() jwtBody : JwtBodyDto, @Param('club_id') clubId : string) {
    //TODO: verify the club exists
    //TODO: verify the user is not already banned
    const user = await this.usersService.find(jwtBody.userId);
    const club = await this.bookClubService.findBookClubById(parseInt(clubId, 10));

    let userClub = new UserBookClub();
    userClub.userId = user.id;
    userClub.bookClubId = club.id;
    userClub.isBanned = false;
    userClub.user = user;
    userClub.bookClub = club;

    const newUserClub = await this.bookClubService.createUserBookClub(userClub);

    return { club };
  }

  @Put('/ban_user/:clubId/:userId')
  public async ban(@JwtBody() jwtBody : JwtBodyDto, @Param('clubId') clubId : string, @Param('userId') userId : string) {
    const owner = await this.usersService.find(jwtBody.userId);
    const user = await this.usersService.find(parseInt(userId, 10));
    const club = await this.bookClubService.findBookClubById(parseInt(clubId, 10));

    if (owner.id !== club.ownerId) {
      return {'error' : 'You do not have permission for this action'}
    }

    const userClub = await this.bookClubService.findUserBookClub(club.id, user.id);
    userClub.isBanned = true;

    const updatedUserClub = await this.bookClubService.updateUserBookClub(userClub);

    return {'success' : `${user.firstName} ${user.lastName} has been banned from ${club.title}`}; 
  }

  @Delete('/quit_club/:clubId')
  public async quit(@JwtBody() jwtBody : JwtBodyDto, @Param('clubId') clubId : string) {
    const userClub = await this.bookClubService.findUserBookClub(jwtBody.userId, parseInt(clubId, 10));
    const deletedUserClub = await this.bookClubService.deleteUserBookClub(userClub);

    return {'success' : `You have left the club`};
  }

}