import { TableModule } from 'primeng/table';
import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableColumn } from '../../interfaces/table-column';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  imports:[NgFor, NgIf,TableModule],
  styleUrls: ['./reusable-table.component.scss']
})
export class ReusableTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() paginator: boolean = true;
  @Input() rows: number = 5;
  @Input() tableStyle: any = { 'min-width': '50rem' };
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];

  isImageUrl(value: any): boolean {
  if (typeof value !== 'string') return false;

  const cloudinaryRegex = /^https:\/\/res\.cloudinary\.com\/.+\.(jpeg|jpg|png|gif|webp|avif)(\?.*)?$/i;
  return cloudinaryRegex.test(value);
}


  handleImageError(event: any, rowData: any, field: string) {
    event.target.style.display = 'none';
    console.error(`Failed to load image: ${rowData[field]}`);
  }
  formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      console.error('Invalid date format', dateString);
      return dateString;
    }
  }

  isDate(value: any): boolean {
    if (typeof value !== 'string') return false;
    return !isNaN(Date.parse(value)) || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);
  }
  isRowEmpty(row: any): boolean {
    return this.columns.every(col => {
      const value = row[col.field];
      return value === null || value === undefined || value === '';
    });
  }


}