import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from '../../entities/chat_room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomsService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository : Repository<ChatRoom>,
  ) {}

  findAllChatRooms() {
    return this.chatRoomRepository.find();
  }

  findChatRoomById(id : number) {
    return this.chatRoomRepository.findOne(id);
  }

  deleteChatRoom(chatRoom : ChatRoom) {
    return this.chatRoomRepository.delete(chatRoom);
  }

  createChatRoom(chatRoom : ChatRoom) {
    return this.chatRoomRepository.create(chatRoom);
  }

  updateChatRoom(chatRoom : ChatRoom) {
    return this.chatRoomRepository.update(chatRoom.id, chatRoom);
  }
}