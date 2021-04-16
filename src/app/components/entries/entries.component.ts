import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CoreService} from "../../core.service";
import {EntriesInterface, EntryInterface} from "../../entries.interface";

@Component({
  selector: 'ae-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent {
  @Input() entries: EntryInterface[] = [];
}
