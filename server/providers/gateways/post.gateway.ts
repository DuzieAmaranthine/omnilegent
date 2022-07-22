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
import { Post } from '../../entities/post.entity';
import { PostService } from '../services/post.service';
import { UsersService } from '../services/users.service';
import { BookClubService } from '../services/book_club.service';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { GatewayAuthGuard } from '../guards/gatewayauth.guard';
import { JwtService } from '../services/jwt.service';
import { GatewayJwtBody } from '../../decorators/gateway_jwt_body.decorator';
import { JwtBodyDto } from '../../dto/jwt_body.dto';

class PostPayload {
  contents : string;
  userId : number;
  originalPostId : number;
}

@WebSocketGateway()
@UseGuards(GatewayAuthGuard)
export class PostsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server : Server;

  constructor(
    private postService : PostService,
    private usersService : UsersService,
    private bookClubService : BookClubService, 
    private jwtService : JwtService) {}

  async handleConnection(client : any, ...args : any[]) {
    try {
      const jwt = client.handshake.auth.token;
      this.jwtService.parseToken(jwt);
      client.join(client.handshake.query.bookClubId as unknown as string);
      const posts = await this.postService.findAllForClub(client.handshake.query.bookClubId);
      client.emit('initial-posts', posts)
    } 
    catch (e) {
      console.log(e);
      
      throw new WsException('Invalid Token');
    }
  }

  handleDisconnect(client : any) {
    console.log('Client Disconnected');
  }


  @SubscribeMessage('post')
  async handlePost(
    @ConnectedSocket() client : Socket,
    @MessageBody() payload : PostPayload,
    @GatewayJwtBody() jwtBody : JwtBodyDto,
  ) {
    const user = await this.usersService.find(payload.userId);
    const post = new Post();
    post.contents = payload.contents;
    post.userId = payload.userId;
    post.userName = user.firstName + ' ' + user.lastName;
    post.likes = [];
    post.isDeleted = false;
    post.postDate = new Date().getTime();
    post.bookClubId = parseInt(client.handshake.query.clubId as unknown as string, 10);
    post.bookClub = await this.bookClubService.findBookClubById(post.bookClubId);

    if (payload.originalPostId) {
      post.originalPostId = payload.originalPostId;
      post.originalPost = await this.postService.findPostById(payload.originalPostId);
    }

    await this.postService.createPost(post);
    this.server.to(`${post.bookClubId}`).emit('post', post);
  }
}

