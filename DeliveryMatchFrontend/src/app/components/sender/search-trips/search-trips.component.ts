import { Component } from '@angular/core';
import { Trip } from '../../../models/trip.model';
import { TripService } from '../../../services/trip.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-trips',
  standalone: true,
  imports: [NgIf, FormsModule, NgForOf],
  templateUrl: './search-trips.component.html',
  styleUrls: ['./search-trips.component.css']
})
export class SearchTripsComponent {
  trips: Trip[] = [];
  destination = '';

  constructor(private tripService: TripService) {}

  search() {
    this.tripService.searchTrips(this.destination).subscribe((data) => {
      this.trips = data;
    });
  }
}
