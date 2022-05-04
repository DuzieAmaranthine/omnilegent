import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Message } from "../../entities/message.entity";
import { MessagesService } from "../services/messages.service";
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { GatewayAuthGuard } from '../guards/gatewayauth.guard';
import { JwtService } from '../services/jwt.service';
import { GatewayJwtBody } from '../../decorators/gateway_jwt_body.decorator';
import { JwtBodyDto } from '../../dto/jwt_body.dto';

class ChatMessagePayload {
  contents : string;
  userName : string;
  userId : number;
}

@WebSocketGateway()
@UseGuards(GatewayAuthGuard)
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server : Server;

  constructor(private messagesService : MessagesService, private jwtService : JwtService) {}

  async handleConnection(client : any, ...args : any[]) {
    try {
      const jwt = client.handshake.auth.token;
      this.jwtService.parseToken(jwt);
      client.join(client.handshake.query.chatRoomId as unknown as string);
      // const messages = await this.messagesService.findAllForRoom(client.handshake.query.chatRoomId);
      // console.log('MESSAGES');
      
      // client.emit('initial-messages', messages);
      // console.log("END");
      
    } 
    catch (e) {
      throw new WsException('Invalid Token');
    }
  }

  handleDisconnect(client : any) {
    console.log('Client Disconnected');
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client : Socket,
    @MessageBody() payload : ChatMessagePayload,
    @GatewayJwtBody() jwtBody : JwtBodyDto,
  ) {
    let message = new Message();
    message.contents = payload.contents;
    message.userName = payload.userName;
    message.chatRoomId = parseInt(client.handshake.query.chatRoomId as unknown as string, 10);
    // message = await this.messagesService.createMessage(message);
    this.server.to(`${message.chatRoomId}`).emit('message', message);
  }
}