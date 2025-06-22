import { Component, OnInit } from '@angular/core';
import { ParcelRequest } from '../../../models/parcel-request.model';
import { Trip } from '../../../models/trip.model';
import { TripService } from '../../../services/trip.service';
import { ParcelService } from '../../../services/parcel.service';
import { AuthService } from '../../../services/auth.service';
import { DatePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NgForOf, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalTrips: number = 0;
  totalRequests: number = 0;
  recentTrips: Trip[] = [];
  recentRequests: ParcelRequest[] = [];

  constructor(
    private tripService: TripService,
    private parcelService: ParcelService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.tripService.getTrips().subscribe(data => {
      this.totalTrips = data.length;
      this.recentTrips = data.slice(0, 5);
    });

    const senderId = this.authService.getUser()?.userId;
    if (senderId) {
      this.parcelService.getRequestsBySender(senderId).subscribe(data => {
        this.totalRequests = data.length;
        this.recentRequests = data.slice(0, 5);
      });
    } else {
      console.error('No senderId available');
      this.recentRequests = [];
    }
  }
}
