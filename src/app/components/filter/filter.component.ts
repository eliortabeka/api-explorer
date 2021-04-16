import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ae-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  protocols: string[] = ['All', "HTTPS", "HTTP"];
  @Output() protocol$ = new EventEmitter();

  @Input() categories: string[];
  @Output() category$ = new EventEmitter();

  setCategory(event) {
    this.category$.emit(event.target.value);
  }

  setProtocol(event) {
    this.protocol$.emit(event.target.value);
  }

}
