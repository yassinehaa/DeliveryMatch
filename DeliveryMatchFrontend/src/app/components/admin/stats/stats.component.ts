import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements AfterViewInit{
  @ViewChild('tripChart') tripChart!: ElementRef;
  chart: any;

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = this.tripChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        datasets: [{
          label: 'Trip Counts',
          data: [10, 15, 20, 18, 25],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }, {
          label: 'Request Counts',
          data: [5, 8, 12, 10, 15],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
