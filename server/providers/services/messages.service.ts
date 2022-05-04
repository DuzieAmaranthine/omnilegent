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
    console.log("IN SERVICE");
    
    const mess = this.messagesRepository.find({
      where : { chatRoomId : id, },
    });

    console.log(mess);
    return mess;
    
  }

  async createMessage(message : Message): Promise<Message> {
    return this.messagesRepository.save(message);
  }
}