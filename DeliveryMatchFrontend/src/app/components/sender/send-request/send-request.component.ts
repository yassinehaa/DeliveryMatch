import { Component } from '@angular/core';
import {ParcelService} from '../../../services/parcel.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-send-request',
  imports: [
    FormsModule
  ],
  templateUrl: './send-request.component.html',
  styleUrl: './send-request.component.css'
})
export class SendRequestComponent {
  newRequest = {
    tripId: 0,
    dimensions: '',
    weight: 0,
    type: ''
  };
  senderId = 1; // Placeholder, replace with dynamic ID

  constructor(private parcelService: ParcelService) {}

  onSubmit() {
    this.parcelService.sendRequest(this.senderId, this.newRequest).subscribe({
      next: () => console.log('Request sent successfully'),
      error: (err) => console.error('Error sending request', err)
    });
  }
}
