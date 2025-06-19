import { User } from './user.model';
import { Trip } from './trip.model';
import { ParcelStatus } from './role.model';
export interface ParcelRequest {
  id: number;
  sender: User;
  trip: Trip;
  dimensions: string;
  weight: number;
  type: string;
  status: ParcelStatus;
  requestDate: string;
}
