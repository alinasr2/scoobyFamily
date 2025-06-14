import { Component, inject, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from '../../core/services/dashboard/dashboard.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule,TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  totalOrders: number = 0;
  totalPets: number = 0;
  totalProducts: number = 0;
  totalSales: number = 0;

  ngOnInit(): void {
    this.getAllOrders();
    this.getAllPets();
    this.getAllProducts();
  }

  getAllOrders(): void {
    this.dashboardService.getAllOrders().subscribe({
      next: (res) => {
        this.totalOrders = res.results;
        this.totalSales = this.calculatePaidSales(res);
      }
    });
  }

  getAllPets(): void {
    this.dashboardService.getAllPets().subscribe({
      next: (res) => {
        this.totalPets = (res.data).length;
      }
    });
  }

  getAllProducts(): void {
    this.dashboardService.getAllProducts().subscribe({
      next: (res) => {
        this.totalProducts = res.results;
      }
    });
  }

  calculatePaidSales(data: any): number {
    let totalSales: number = 0;
    for (const order of data.data) {
      if (order.isPaidAndDelivered) {
        totalSales += order.totalOrderPrice;
      }
    }
    return totalSales;
  }

  ordersData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
    datasets: [
      {
        label: 'Orders',
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        data: [120, 150, 180, 90, 160, 170, 190, 200]
      }
    ]
  };

  salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#2196F3',
        borderColor: '#1976D2',
        data: [65, 59, 80, 81, 56, 55, 40, 75]
      }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  horizontalChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };
}