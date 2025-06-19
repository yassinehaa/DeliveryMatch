import {Component, OnInit} from '@angular/core';
import {ParcelRequest} from '../../../models/parcel-request.model';
import {ParcelService} from '../../../services/parcel.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-request-history',
  imports: [
    NgIf,
    DatePipe,
    NgForOf
  ],
  templateUrl: './request-history.component.html',
  styleUrl: './request-history.component.css'
})
export class RequestHistoryComponent implements OnInit{
  requests: ParcelRequest[] = [];

  constructor(private parcelService: ParcelService) {}

  ngOnInit() {
    // Placeholder: Fetch requests for a specific sender (replace with dynamic senderId)
    this.parcelService.getRequestsBySender(1).subscribe(data => {
      this.requests = data;
    });
  }

}
