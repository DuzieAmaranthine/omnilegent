import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { JwtBody } from "../../decorators/jwt_body.decorator";
import { JwtBodyDto } from "../../dto/jwt_body.dto";
import { ChatRoom } from "../../entities/chat_room.entity";
import { ChatRoomsService } from "../../providers/services/chat_rooms.service";
import { UsersService } from '../../providers/services/users.service';
import * as crypto from 'crypto';

class ChatroomPostBody {
  name : string;
  description : string;
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

  @Post('/chat_rooms')
  public async create(@JwtBody() jwtBody : JwtBodyDto, @Body() body : ChatroomPostBody) {
    const user = await this.usersService.find(jwtBody.userId);
    let room = new ChatRoom();

    room.key = crypto.randomBytes(8).toString('hex');
    room.name = body.name;
    room.ownerName = user.firstName;
    room.description = body.description;
    room.ownerId = jwtBody.userId;

    const newRoom = await this.chatroomsService.createChatRoom(room);

    return { newRoom };
  }

  @Delete('/chat_rooms/:id')
  public async destroy(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    const room = await this.chatroomsService.findChatRoomById(parseInt(id, 10));

    if (room.ownerId !== jwtBody.userId) {
      return {'error' : 'Unauthorized'};
    }

    await this.chatroomsService.deleteChatRoom(room);
    return {'success' : `${room.name} was deleted`};
  }
}