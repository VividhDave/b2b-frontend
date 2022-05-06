import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Page } from '../../../models/page';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  books: any[];
  colSpanValue: number = 0;
  @Input() dataSource: any;
  @Input() totalElement: any;
  @Input() pageIndex: any;
  @Input() cols: any;
  @Input() isEdit: boolean;
  @Input() isEditBulk: boolean = false;
  @Input() isDelete: boolean = false;
  @Input() isDetails: boolean = false;
  @Input() isApprove: boolean = false;
  @Input() isReject: boolean = false;
  @Output() editEvent: EventEmitter<any> = new EventEmitter();
  @Output() editBulkEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() approveEvent: EventEmitter<any> = new EventEmitter();
  @Output() rejectEvent: EventEmitter<any> = new EventEmitter();
  @Output() detailEvent: EventEmitter<any> = new EventEmitter();
  @Output() onSortPaginateEvent: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
    this.colSpanValue = this.cols ? this.cols.length + 1 : 0;
    if (this.isDelete || this.isEdit) {
      this.colSpanValue++;
    }
  }

  onEditEvent(event: any): void {
    this.editEvent.emit(event);
  }

  onEditBulkEvent(event: any): void {
    this.editBulkEvent.emit(event);
  }

  onDeleteEvent(event: any): void {
    this.deleteEvent.emit(event);
  }

  loadData(event: Page): void {
    this.onSortPaginateEvent.emit(event);
  }

  onDetailsEvent(event: any): void {
    this.detailEvent.emit(event);
  }

  onApproveEvent(event: any): void {
    this.approveEvent.emit(event);
  }

  onRejectEvent(event: any): void {
    this.rejectEvent.emit(event);
  }

}
