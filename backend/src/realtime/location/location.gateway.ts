import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class LocationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server!: Server;

  // clients: Socket[] = [];

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;

    // console.log(`Client id: ${client.id} connected`);
    // console.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    // this.clients = this.clients.filter((c) => c.id !== client.id);
  }

  @SubscribeMessage('sendLocation')
  receiveLocation(
    @MessageBody() data: { lat: number; lng: number; orderId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    // this.server.to(data.orderId).emit('newLocation', data);
    // only for admin
    this.server.emit('newLocation', data);
  }
}
