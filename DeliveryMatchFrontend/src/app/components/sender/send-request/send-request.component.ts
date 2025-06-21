import {Component} from '@angular/core';
import {ParcelService} from '../../../services/parcel.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ParcelRequest} from '../../../models/parcel-request.model';
import {ParcelStatus} from '../../../models/role.model';

@Component({
  selector: 'app-send-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-request.component.html',
  styleUrl: './send-request.component.css'
})
export class SendRequestComponent {
  senderId: number = 1; // Example sender ID, replace with dynamic value from AuthService if available
  newRequest: ParcelRequest = {
    id: 0, // Will be assigned by backend
    sender: null!, // Will be set via AuthService or omitted in payload
    trip: null!, // Optional, can be set after trip selection
    dimensions: '',
    weight: 0,
    type: '',
    status: ParcelStatus.EN_ATTENTE, // Default status from ParcelStatus
    requestDate: new Date().toISOString()
  };

  constructor(private parcelService: ParcelService) {}

  onSubmit() {
    const payload = {
      senderId: this.senderId,
      dimensions: this.newRequest.dimensions,
      weight: this.newRequest.weight,
      type: this.newRequest.type,
      status: this.newRequest.status,
      requestDate: this.newRequest.requestDate
      // tripId omitted as it’s optional and set later by backend or driver
    };

    this.parcelService.sendRequest(payload).subscribe({
      next: () => {
        console.log('Request sent successfully');
        this.newRequest = {
          id: 0,
          sender: null!,
          trip: null!,
          dimensions: '',
          weight: 0,
          type: '',
          status: ParcelStatus.EN_ATTENTE,
          requestDate: new Date().toISOString()
        };
      },
      error: err => console.error('Error sending request:', err)
    });
  }
}
