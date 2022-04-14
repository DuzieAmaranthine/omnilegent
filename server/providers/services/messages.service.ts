import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "../../entities/message.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository : Repository<Message>,
  ) {}

  findAllForRoom(id : number): Promise<Message[]> {
    return this.messagesRepository.find({
      where : { chatRoomId : id, },
    });
  }

  async createMessage(message : Message): Promise<Message> {
    return this.messagesRepository.save(message);
  }
}