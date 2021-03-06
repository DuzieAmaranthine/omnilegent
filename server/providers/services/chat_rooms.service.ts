import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from '../../entities/chat_room.entity';
import { Repository } from 'typeorm';
import { UserChatRoom } from 'server/entities/user_chatroom.entity';

@Injectable()
export class ChatRoomsService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository : Repository<ChatRoom>,
    @InjectRepository(UserChatRoom)
    private userChatRoomRepository : Repository<UserChatRoom>,
  ) {}

  findAllChatRooms() {
    return this.chatRoomRepository.find();
  }

  findChatRoomById(id : number) {
    return this.chatRoomRepository.findOne(id);
  }

  findAllForUser(userId : number) : Promise<UserChatRoom[]> {
    return this.userChatRoomRepository.find({ relations : ['chatRoom'], where : { userId : userId}});
  }

  findAvailableRooms(userId : number) : Promise<UserChatRoom[]> {
    return this.userChatRoomRepository.find({relations : ['chatRoom'], where : {userId : userId}});
  }

  findMembersForClub(id : number) : Promise<UserChatRoom[]> {
    return this.userChatRoomRepository.find({ relations : ['user'], where : {chatRoomId : id}});
  }

  deleteChatRoom(chatRoom : ChatRoom) {
    return this.chatRoomRepository.delete(chatRoom);
  }

  createChatRoom(chatRoom : ChatRoom) {
    return this.chatRoomRepository.save(chatRoom);
  }

  updateChatRoom(chatRoom : ChatRoom) {
    return this.chatRoomRepository.update(chatRoom.id, chatRoom);
  }

  createUserChatRoom(userChatRoom : UserChatRoom) {
    return this.userChatRoomRepository.save(userChatRoom);
  }

  deleteUserChatRoom(userChatRoom : UserChatRoom) {
    return this.userChatRoomRepository.delete(userChatRoom);
  }

  findUserChatRoom(chatId : number, userId : number) {
    return this.userChatRoomRepository.findOne({where : {chatRoomId : chatId, userId : userId}});
  }
}