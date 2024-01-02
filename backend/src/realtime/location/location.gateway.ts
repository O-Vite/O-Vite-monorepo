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
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket, ...args: any[]) {
    // Logic when a client connects
  }

  handleDisconnect(client: Socket) {
    // Logic when a client disconnects
  }

  @SubscribeMessage('updateLocation')
  handleUpdateLocation(client: Socket, data: any): void {
    // Handle the update location message from the client
    // You can broadcast this message to all clients or handle it as needed
    this.server.emit('locationUpdated', data);
  }
}
