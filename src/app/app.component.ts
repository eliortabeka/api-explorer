import {Component, OnInit} from '@angular/core';
import {CoreService} from "./core.service";
import {EntriesInterface, EntryInterface} from "./entries.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private coreService: CoreService) {}

  ngOnInit() {
    this.getAllEntries();
    this.getCategoriesForApp();
  }


  categoriesList: string[] = [];
  categoriesSub:any;
  getCategoriesForApp() {
    this.categoriesSub = this.coreService.getCategories()
      .subscribe((data: string[]) => {
        this.categoriesList = ['All', ...data];
      });
  }

  entriesSub: any;
  getAllEntries() {
    if(this.entriesByTitleSub) { this.entriesByTitleSub.unsubscribe(); }
    this.entriesSub = this.coreService.getEntries()
      .subscribe((dataFromServer: EntriesInterface) => {
        this.setData(dataFromServer.entries);
      });
  }

  entriesByTitleSub: any;
  getEntriesByTitle(title: string) {
    this.entriesSub.unsubscribe();
    this.entriesByTitleSub = this.coreService.getEntryByTitle(title)
      .subscribe((dataFromServer: EntriesInterface) => {
        this.setData(dataFromServer.entries);
      });
  }

  entries: EntryInterface[] = [];
  entriesBackup: EntryInterface[] = [];
  entriesByCategories: EntryInterface[] = [];
  setData(entriesDataFromServer) {
    this.entriesBackup = entriesDataFromServer;
    this.entries = entriesDataFromServer;
  }

  filterBy(filterType, userSelection) {
    if (filterType === 'protocol') {
      if (this.entriesByCategories.length > 0) {
        this.entries = this.entriesByCategories.filter((entry: EntryInterface) => {
          return userSelection === 'HTTPS' ? entry.HTTPS : userSelection === 'HTTP' ? !entry.HTTPS : true;
        })
      } else {
        this.entries = this.entriesBackup.filter((entry: EntryInterface) => {
          return userSelection === 'HTTPS' ? entry.HTTPS : userSelection === 'HTTP' ? !entry.HTTPS : true;
        })
      }
    }
    if (filterType === 'category') {
      if (userSelection !== 'All') {
        this.entriesByCategories = this.entriesBackup.filter((entry: EntryInterface) => {
          return userSelection !== 'All' ? entry.Category === userSelection : true;
        });
      }
      this.entries = this.entriesBackup.filter((entry: EntryInterface) => {
        return userSelection !== 'All' ? entry.Category === userSelection : true;
      });
    }
  }

}
