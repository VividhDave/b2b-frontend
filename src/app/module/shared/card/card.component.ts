import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Page} from '../../../models/page';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  books: any[];
  colSpanValue: number = 0;
  @Input() dataSource: any;
  @Input() pageIndex: any;
  @Input() cols: any;
  @Input() isCreate: boolean;
  @Output() createEvent: EventEmitter<any> = new EventEmitter();
  @Output() onSortPaginateEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.colSpanValue = this.cols ? this.cols.length + 1 : 0;
    if (this.isCreate) {
      this.colSpanValue++;
    }
  }

  onCreateEvent(event: any): void {
    this.createEvent.emit(event);
  }

  loadData(event: Page): void {
    this.onSortPaginateEvent.emit(event);
  }

}
