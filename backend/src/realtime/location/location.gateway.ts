import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class LocationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server!: Server;
  clients: Socket[] = [];

  handleConnection(client: Socket) {
    this.clients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.clients = this.clients.filter((c) => c.id !== client.id);
  }

  @SubscribeMessage('sendLocation')
  receiveLocation(
    client: Socket,
    payload: { lat: number; lng: number; orderId: string },
  ) {
    this.server.to(payload.orderId).emit('newLocation', payload);
  }
}
