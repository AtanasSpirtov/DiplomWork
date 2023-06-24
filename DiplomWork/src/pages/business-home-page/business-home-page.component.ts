import {Component, OnInit} from '@angular/core';
import {Business} from "../../model/Business";
import {Router} from "@angular/router";
import {BusinessService} from "../../service/business.service";
import {take} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../dialogs/confirmation-modal.components";

@Component({
  selector: 'app-business-home-page',
  templateUrl: './business-home-page.component.html',
  styleUrls: ['./business-home-page.component.scss']
})
export class BusinessHomePageComponent implements OnInit {

  allBusinesses: Business[] = []
  displayedColumns = ['PICTURE', 'NAME', 'LOCATION', 'TELEPHONE', 'BUSINESS_FIELD', 'START_TIME', 'END_TIME', 'ACTION'];

  constructor(private router: Router,
              private businessService: BusinessService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.businessService.getAllBusinesses()
      .subscribe(businesses => this.allBusinesses = businesses)
  }

  goToCreateBusiness() {
    this.router.navigate(['create-business'])
  }

  getImage(picture: string) {
    return `data:image/jpeg;base64,${picture}`;
  }

  viewBusiness(id: number) {
    let currentBusiness = this.allBusinesses.find(business => business.id == id)
    this.router.navigate(['view-business', {business: JSON.stringify(currentBusiness)}])
  }

  editBusiness(id: number) {

  }

  deleteBusiness(id: number) {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete Business?',
        message: 'Are you sure you want to delete this business. All slots and assigned users will be removed'
      }
    }).afterClosed()
      .pipe(take(1))
      .subscribe(confirmed => {
        if (confirmed) {
          this.businessService.deleteBusinessById(id).subscribe( _ =>
            this.businessService.getAllBusinesses()
              .subscribe(businesses => this.allBusinesses = businesses)
          )
        }
      });
  }
}
