import { User } from './user.model';
import { ParcelRequest } from './parcel-request.model';

export interface Trip {
  id: number;
  driver: User | null;
  departure: string;
  destination: string;
  stopovers: string[];
  maxDimensions: string;
  merchandiseType: string;
  availableCapacity: number;
  departureDate: string;
  requests: ParcelRequest[];
}
