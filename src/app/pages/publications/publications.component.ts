import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ScienceUnitService} from '../../services/data/science.unit.service';
import {ModalDirective} from 'ngx-bootstrap';
import {ScienceUnit} from './model/science.unit';
import {IOption} from 'ng-select';
import {UserService} from '../../services/data/users.service';
import {Toast, ToasterService} from 'angular2-toaster';

@Component({
  selector: 's2m-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
  @ViewChild('lgModal') lgModal: ModalDirective;
  @ViewChild('updateModal') updateModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('bibtexModal') bibtexModal: ModalDirective;

  model = new ScienceUnit();
  types = [{ua: 'Книга', en: 'Book'},
    {ua : 'Глава', en : 'Chapter'},
    {ua : 'Конференція', en : 'Conference'},
    {ua : 'Журнал', en : 'Journal'},
    {ua : 'Інше', en : 'Other'},
    {ua : 'Патент', en : 'Patent'},
    {ua : 'Тезис', en : 'Thesis'}];

  options: Array<IOption>;
  fileName: any;

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
      // name: {
      //   title: 'Назва',
      //   type: 'string',
      // },
      title: {
        // title: 'Титулка',
        title: 'Назва',
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

  bibtexSettings = {
    actions: {
      add: false,
      columnTitle: 'Дії',
      position: 'right',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    noDataMessage: 'Нема даних',
    columns: {
      // name: {
      //   title: 'Назва',
      //   type: 'string',
      // },
      title: {
        // title: 'Титулка',
        title: 'Назва',
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
  };

  source: LocalDataSource;
  bibtexSource: LocalDataSource;
  bibtexUsers: any;
  bibtexScienceUnits: Array<any>;
  constructor(private scienceUnitService: ScienceUnitService,
              private userService: UserService,
              private toastr: ToasterService) {
    this.source = new LocalDataSource([]);
    this.bibtexSource = new LocalDataSource([]);
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
        this.model.unitTypeUa = this.getUaTypeName(this.model.unitType);
        this.transformUserToIds();
      });
  }

  loadEmployees(): void {
    this.userService.getUsers()
      .subscribe(response => {
        const users = [];
        for (const user of response) {
          users.push({label: user.lastNameUa + ' ' + user.firstNameUa + ' ' + user.middleNameUa, value: user.id});
        }
        this.options = users;
      });
  }

  transformIdsToUsers(): void {
    const users = [];
    for (const userId of this.model.users) {
      users.push({id: userId});
    }
    this.model.users = users;
  }

  transformUserToIds(): void {
    const users = [];
    for (const user of this.model.users) {
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
    const fileList: FileList = event.target.files;
    if (fileList.length === 0) {
      return;
    }
    const file = fileList[0];
    this.fileName = file.name;
    this.scienceUnitService.uploadBibtex(file)
      .subscribe((response) => {
        this.bibtexScienceUnits = response;
        this.bibtexSource.load(this.bibtexScienceUnits);
    });
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

  callBibtexModal() {
    this.bibtexModal.show();
    this.bibtexSource.load([]);
    this.bibtexUsers = null;
    this.fileName = '';
  }

  saveBibtexUnits() {
    if (this.bibtexUsers == null || this.bibtexUsers.length === 0) {
      this.showWarningMessage('Оберіть користувача!');
      return;
    }
    if (this.bibtexScienceUnits == null || this.bibtexScienceUnits.length === 0) {
      this.showWarningMessage('Нема даних!');
      return;
    }
    this.bibtexSource.getAll().then((data) => {
      this.scienceUnitService.bulkSaveScienceUnits(this.bibtexUsers, data)
        .subscribe(() => this.loadScienceUnits());
    });
    this.bibtexModal.hide();
  }

  private showWarningMessage(message: string) {
    const toast: Toast = {
      type: 'warning',
      title: 'Увага',
      body: message,
      showCloseButton: true,
    };
    this.toastr.pop(toast);
  }

  private getUaTypeName(type: string) {
    let typeUa = null;
    this.types.forEach((value => {
      if (value.en === type) {
        typeUa = value.ua;
      }
    }));
    return typeUa;
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
