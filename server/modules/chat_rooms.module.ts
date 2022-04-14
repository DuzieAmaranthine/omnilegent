import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "server/providers/services/users.service";
import { ChatroomController } from "../controllers/api/chat_room.controller";
import { ChatRoom } from "../entities/chat_room.entity";
import { Message } from "../entities/message.entity";
import { MessagesGateway } from "../providers/gateways/messages.gateway";
import { ChatRoomsService } from "../providers/services/chat_rooms.service";
import { JwtService } from "../providers/services/jwt.service";
import { MessagesService } from "../providers/services/messages.service";
import { GuardUtil } from "../providers/util/guard.util";
import { UsersModule } from "./users.module";

@Module({
  imports : [TypeOrmModule.forFeature([ChatRoom, Message]), UsersModule],
  controllers : [ChatroomController],
  providers : [MessagesGateway, ChatRoomsService, MessagesService, UsersService, JwtService, GuardUtil],
  exports : [],
})
export class ChatRoomsModule {}