import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Order } from '../../shared/interfaces/order';
import { ReusableTableComponent } from '../../shared/components/reusable-table/reusable-table.component';

@Component({
  selector: 'app-admin-orders',
  imports: [ReusableTableComponent],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss'
})
export class AdminOrdersComponent implements OnInit {
  private readonly cartService = inject(CartService);
  orders:Order[] = [];
  processedOrders:object[] = [];
  ngOnInit(): void {
    this.getAllOrders()
  }
  getAllOrders():void{
    this.cartService.getAllOrders().subscribe({
      next:(res)=>{
        this.orders = res.data;
        this.processedOrders = this.getProcessedOrders();
        console.log(this.processedOrders);
        
      }
    })
  }


  getProcessedOrders() {
    return this.orders.map(order => ({
      totalPrice: order.totalOrderPrice,
      orderItems: this.getOrderItemsSummary(order.cartItems).length,
      paymentMethod: order.paymentMethodType,
      delivered: order.isPaidAndDelivered ? 'Yes' : 'No',
    }));
  }
  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  }
  getOrderItemsSummary(cartItems: any[]) {
    return cartItems.map(item => 
      `${item.quantity} `);
  }
  columns = [
    { header: 'Total Price (L.E)', field: 'totalPrice', width: '25%' },
    { header: 'Order Item', field: 'orderItems', width: '25%' },
    { header: 'Payment Method', field: 'paymentMethod', width: '25%' },
    { header: 'Deliverd', field: 'delivered', width: '25%' },
  ];
}
