import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "../../entities/message.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository : Repository<Message>,
  ) {}

  findAllForRoom(id : number): Promise<Message[]> {
    const mess = this.messagesRepository.find({
      where : { chatRoomId : id, },
    });

    return mess;
  }

  async createMessage(message : Message): Promise<Message> {
    return this.messagesRepository.save(message);
  }
}