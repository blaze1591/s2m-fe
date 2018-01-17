import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ScienceUnitService} from '../../services/data/science.unit.service';
import {ModalDirective} from 'ngx-bootstrap';
import {ScienceUnit} from './model/science.unit';
import {IOption} from 'ng-select';
import {UserService} from '../../services/data/users.service';

@Component({
  selector: 's2m-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
  @ViewChild('lgModal') lgModal: ModalDirective;
  @ViewChild('updateModal') updateModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;

  model = new ScienceUnit();
  types = ['Book', 'Chapter', 'Conference', 'Journal', 'Other', 'Patent', 'Thesis'];
  options: Array<IOption>;

  settings = {
    actions: {
      columnTitle: 'Дії',
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'Нема даних',
    columns: {
      name: {
        title: 'Назва',
        type: 'string',
      },
      title: {
        title: 'Титулка',
        type: 'string',
      },
      unitType: {
        title: 'Тип',
        type: 'string',
      },
      author: {
        title: 'Автор',
        type: 'string',
      },
      year: {
        title: 'Рiк',
        type: 'string',
      },
    },
    mode: 'external',
  };

  source: LocalDataSource;
  constructor(private scienceUnitService: ScienceUnitService,
              private userService: UserService) {
    this.source = new LocalDataSource([]);
  }

  ngOnInit() {
    this.loadScienceUnits();
    this.loadEmployees();
  }

  loadScienceUnits(): void {
    this.scienceUnitService.getAllScienceUnits()
      .subscribe(response => {
        this.source.load(response);
      });
  }

  loadScienceUnit(id: string): void {
    this.scienceUnitService.getScienceUnitInfo(id)
      .subscribe(response => {
        this.model = response;
        this.transformUserToIds();
      });
  }

  loadEmployees(): void {
    this.userService.getUsers()
      .subscribe(response => {
        let users = [];
        for (let user of response) {
          users.push({label: user.firstNameUa + ' ' + user.middleNameUa + ' ' + user.lastNameUa, value: user.id});
        }
        this.options = users;
      });
  }

  transformIdsToUsers(): void {
    let users = [];
    for (let userId of this.model.users) {
      users.push({id: userId});
    }
    this.model.users = users;
  }

  transformUserToIds(): void {
    let users = [];
    for (let user of this.model.users) {
      users.push(user.id);
    }
    this.model.users = users;
  }

  create(event): void {
    this.model = new ScienceUnit();
    this.lgModal.show();
  }

  saveUnit(): void {
    this.transformIdsToUsers();
    this.scienceUnitService.saveScienceUnit(this.model)
      .subscribe(() => {
        // TODO: update only in table
        this.loadScienceUnits();
      });
    this.lgModal.hide();
  }

  edit(event): void {
    this.loadScienceUnit(event.data.id);
    this.updateModal.show();
  }

  updateUnit(): void {
    this.transformIdsToUsers();
    this.scienceUnitService.updateScienceUnit(this.model)
      .subscribe(() => {
        // TODO: update only in table
        this.loadScienceUnits();
      });
    this.updateModal.hide();
  }

  delete(event) {
    this.deleteModal.show();
    this.model.id = event.data.id;
  }

  deleteUnit() {
    this.scienceUnitService.deleteScienceUnit(this.model.id)
      .subscribe(() => {
        // TODO: update only in table
        this.loadScienceUnits();
      });
    this.deleteModal.hide();
  }

  uploadBibtex(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length === 0) {
      alert('return');
      return;
    }
    let file = fileList[0];
    alert(file.name);
    this.scienceUnitService.uploadBibtex(file).subscribe(() => alert('called'));
  }

  onTypeChange() {
    const scienceUnit: ScienceUnit = this.model;
    this.model = new ScienceUnit();

    this.model.unitType = scienceUnit.unitType;

    this.model.name = scienceUnit.name;
    this.model.title = scienceUnit.title;
    this.model.year = scienceUnit.year;
    this.model.url = scienceUnit.url;
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'name',
        search: query,
      },
      {
        field: 'title',
        search: query,
      },
      {
        field: 'unitType',
        search: query,
      },
      {
        field: 'author',
        search: query,
      },
      {
        field: 'year',
        search: query,
      },
    ]);
  }
//  Fields presence checks
  isVolumeShouldBePresent(): boolean {
    return this.model.unitType != null
      && this.model.unitType !== 'Other'
      && this.model.unitType !== 'Patent'
      && this.model.unitType !== 'Thesis';
  }

  isPublisherShouldBePresent(): boolean {
    return this.model.unitType === 'Book'
      || this.model.unitType === 'Journal';
  }

  isChapterOrConference(): boolean {
    return this.model.unitType === 'Chapter'
      || this.model.unitType === 'Conference';
  }

  isBookTitleShouldBePresent(): boolean {
    return this.isChapterOrConference();
  }

  isNumberShouldBePresent(): boolean {
    return this.model.unitType != null
      && this.model.unitType !== 'Patent'
      && this.model.unitType !== 'Thesis'
      && this.model.unitType !== 'Book';
  }

  isPagesShouldBePresent(): boolean {
    return this.model.unitType === 'Chapter'
      || this.model.unitType === 'Conference'
      || this.model.unitType === 'Journal';
  }

  isOrganizationShouldBePresent(): boolean {
    return this.model.unitType === 'Chapter'
      || this.model.unitType === 'Conference';
  }

  isJournalShouldBePresent(): boolean {
    return this.model.unitType === 'Journal'
      || this.model.unitType === 'Other';
  }

  isNoteShouldBePresent(): boolean {
    return this.model.unitType === 'Patent';
  }

  isSchoolShouldBePresent(): boolean {
    return this.model.unitType === 'Thesis';
  }
}
