import {Component, OnInit} from '@angular/core';
import {ParcelService} from '../../../services/parcel.service';
import {ParcelRequest} from '../../../models/parcel-request.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-trip-request',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './trip-request.component.html',
  styleUrl: './trip-request.component.css'
})
export class TripRequestComponent implements OnInit{
  requests: ParcelRequest[] = [];

  constructor(private parcelService: ParcelService) {}

  ngOnInit() {
    // Placeholder: Fetch requests for a specific trip (replace with dynamic tripId)
    this.parcelService.getRequestsBySender(1).subscribe(data => {
      this.requests = data;
    });
  }

  acceptRequest(requestId: number) {
    this.parcelService.acceptRequest(requestId).subscribe(updated => {
      this.requests = this.requests.map(r => r.id === requestId ? updated : r);
    });
  }

  refuseRequest(requestId: number) {
    this.parcelService.refuseRequest(requestId).subscribe(updated => {
      this.requests = this.requests.map(r => r.id === requestId ? updated : r);
    });
  }

}
