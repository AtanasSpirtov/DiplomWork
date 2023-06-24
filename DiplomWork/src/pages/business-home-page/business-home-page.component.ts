import {Component, OnInit} from '@angular/core';
import {Business} from "../../model/Business";
import {Router} from "@angular/router";
import {BusinessService} from "../../service/business.service";

@Component({
  selector: 'app-business-home-page',
  templateUrl: './business-home-page.component.html',
  styleUrls: ['./business-home-page.component.scss']
})
export class BusinessHomePageComponent implements OnInit {

  allBusinesses: Business[] = []
  displayedColumns = ['PICTURE', 'NAME', 'LOCATION', 'TELEPHONE', 'BUSINESS_FIELD', 'START_TIME', 'END_TIME', 'ACTION'];

  constructor(private router: Router, private businessService: BusinessService) {
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

  }

  editBusiness(id: number) {

  }

  deleteBusiness(id: number) {
  }
}
