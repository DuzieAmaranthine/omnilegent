import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { JwtBody } from "../../decorators/jwt_body.decorator";
import { JwtBodyDto } from "../../dto/jwt_body.dto";
import { ChatRoom } from "../../entities/chat_room.entity";
import { ChatRoomsService } from "../../providers/services/chat_rooms.service";
import { UsersService } from '../../providers/services/users.service';
import * as crypto from 'crypto';
import { UserChatRoom } from "server/entities/user_chatroom.entity";

class ChatroomPostBody {
  title : string;
  description : string;
  meetingTime : string;
  currentTopic : string;
}

@Controller()
export class ChatroomController {
  constructor(
    private chatroomsService : ChatRoomsService,
    private usersService : UsersService,
  ) {}

  @Get('/chat_rooms')
  public async index() {
    const rooms = await this.chatroomsService.findAllChatRooms();
    return { rooms };
  }

  @Get('/chat_rooms/:id')
  public async show(@Param('id') id : string) {
    const room = await this.chatroomsService.findChatRoomById(parseInt(id, 10));
    return { room };
  }

  @Get('/current_rooms')
  public async current(@JwtBody() jwtBody : JwtBodyDto) {
    return this.chatroomsService.findAllForUser(jwtBody.userId);
  }

  @Get('/club_members/:id')
  public async members(@Param('id') id : string) {
    const memberObjs = await this.chatroomsService.findMembersForClub(parseInt(id, 10));
    console.log(memberObjs);
    
    return memberObjs;
  }

  @Post('/chat_rooms')
  public async create(@JwtBody() jwtBody : JwtBodyDto, @Body() body : ChatroomPostBody) {
    const user = await this.usersService.find(jwtBody.userId);
    let room = new ChatRoom();

    room.key = crypto.randomBytes(8).toString('hex');
    room.title = body.title;
    room.ownerName = user.firstName;
    room.description = body.description;
    room.meetingTime = body.meetingTime;
    room.ownerId = jwtBody.userId;

    if (body.currentTopic) {
      room.currentTopic = body.currentTopic;
    }

    if (body.meetingTime) {
      room.meetingTime = body.meetingTime;
    }

    const newRoom = await this.chatroomsService.createChatRoom(room);

    let newUserChat = new UserChatRoom();
    newUserChat.userId = jwtBody.userId;
    newUserChat.chatRoomId = newRoom.id;

    const createdUserChat = await this.chatroomsService.createUserChatRoom(newUserChat);

    return { newRoom };
  }

  @Post('/join_room/:id')
  public async join(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    let newUserChat = new UserChatRoom();
    newUserChat.userId = jwtBody.userId;
    newUserChat.chatRoomId = parseInt(id, 10);
    const createdUserChat = await this.chatroomsService.createUserChatRoom(newUserChat);

    return { createdUserChat };
  }

  @Delete('/chat_rooms/:id')
  public async destroy(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    const room = await this.chatroomsService.findChatRoomById(parseInt(id, 10));

    if (room.ownerId !== jwtBody.userId) {
      return {'error' : 'Unauthorized'};
    }

    await this.chatroomsService.deleteChatRoom(room);
    return {'success' : `${room.title} was deleted`};
  }

  @Delete('/quit_room/:id')
  public async quit(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    const targetUserChat = await this.chatroomsService.findUserChatRoom(parseInt(id, 10));

    if (targetUserChat.userId !== jwtBody.userId) {
      return {'error' : 'Unauthorized'};
    }

    await this.chatroomsService.deleteUserChatRoom(targetUserChat);
    return {'success' : 'User left the room'};
  }
}