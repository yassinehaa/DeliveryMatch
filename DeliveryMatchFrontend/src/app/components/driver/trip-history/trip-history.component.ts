import {Component, OnInit} from '@angular/core';
import {Trip} from '../../../models/trip.model';
import {TripService} from '../../../services/trip.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-trip-history',
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './trip-history.component.html',
  styleUrl: './trip-history.component.css'
})
export class TripHistoryComponent implements OnInit{
  trips: Trip[] = [];
  constructor(private tripservice:TripService) {
  }
  ngOnInit() {
    // Placeholder: Fetch trips for a specific driver (replace with dynamic driverId)
    this.tripservice.getTrips().subscribe(data => {
      this.trips = data;
    });
  }
}
