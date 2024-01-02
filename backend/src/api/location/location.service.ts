import { Injectable } from '@nestjs/common';
import { LocationGateway } from 'src/realtime/location/location.gateway';

@Injectable()
export class DeliveryService {
  constructor(private readonly locationGateway: LocationGateway) {}

  sendLocationUpdate(locationData: any) {
    // Assuming you have logic to get location updates for delivery
    // Send the location update to all connected clients
    this.locationGateway.server.emit('locationUpdated', locationData);
  }
}
