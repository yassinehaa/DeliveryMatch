import {Component, OnInit} from '@angular/core';
import {ParcelRequest} from '../../../models/parcel-request.model';
import {Trip} from '../../../models/trip.model';
import {TripService} from '../../../services/trip.service';
import {ParcelService} from '../../../services/parcel.service';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  totalTrips: number = 0;
  totalRequests: number = 0;
  recentTrips: Trip[] = [];
  recentRequests: ParcelRequest[] = [];

  constructor(private tripService: TripService, private parcelService: ParcelService) {}

  ngOnInit() {
    this.tripService.getTrips().subscribe(data => {
      this.totalTrips = data.length;
      this.recentTrips = data.slice(0, 5); // Show last 5 trips
    });
    this.parcelService.getRequestsBySender(1).subscribe(data => { // Placeholder senderId
      this.totalRequests = data.length;
      this.recentRequests = data.slice(0, 5); // Show last 5 requests
    });
  }

}
