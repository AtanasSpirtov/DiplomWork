import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BusinessService} from "../../service/business.service";
import {Business, Slot} from "../../model/Business";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit {
  createBusinessForm: FormGroup;

  constructor(private router: Router, private businessService: BusinessService, private datePipe: DatePipe) {
    this.createBusinessForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        location: new FormControl('', [Validators.required]),
        telephone: new FormControl('', [Validators.required]),
        picture: new FormControl(''),
        businessField: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        startTime: new FormControl('', [Validators.required]),
        endTime: new FormControl('', [Validators.required]),
        numberOfSlots: new FormControl(1, [Validators.required])
      }
    )
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.convertFileToBase64(file);
  }

  convertFileToBase64(file: File): void {
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      const base64String: string = reader.result as string;
      const base64Data: string = base64String.split(',')[1]; // Remove the MIME type part
      this.createBusinessForm.get('picture')?.setValue(base64Data);
      console.log(this.createBusinessForm.get('picture').value);    };
    reader.readAsDataURL(file);
  }

  goToListBusiness() {
    this.router.navigate(['business-home'])
  }

  saveBusiness() {
    if (this.createBusinessForm.valid) {
      let startTime = this.createBusinessForm.get('startTime').value
      let endTime = this.createBusinessForm.get('endTime').value
      let startDate = new Date()
      startDate.setHours(startTime)
      let endDate = new Date()
      endDate.setHours(endTime)
      let business = new Business(
        this.createBusinessForm.get('name').value,
        this.createBusinessForm.get('location').value,
        this.createBusinessForm.get('telephone').value,
        this.createBusinessForm.get('picture').value,
        this.createBusinessForm.get('businessField').value,
        this.datePipe.transform(startDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
        this.datePipe.transform(endDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
        this.generateSlotsByGivenData(
          Number(startTime),
          Number(endTime),
          this.createBusinessForm.get('numberOfSlots').value, false),
      )
      this.businessService.saveBusiness(business).subscribe()
    }
  }

  generateSlotsByGivenData(startHour: number, endHour: number, numberOfSplits: number, forOverview: boolean): any {
    let splits: Slot[] = [];
    if (
      !this.createBusinessForm.get('startTime').hasError('required') &&
      !this.createBusinessForm.get('endTime').hasError('required') &&
      !this.createBusinessForm.get('numberOfSlots').hasError('required')
    ) {
      const totalHours = endHour - startHour;
      const splitSize = totalHours / numberOfSplits;
      for (let i = 0; i < numberOfSplits; i++) {
        const start = startHour + i * splitSize;
        const end = startHour + (i + 1) * splitSize;
        splits.push(new Slot(this.convertToHourFormat(start), this.convertToHourFormat(end), []));
      }
      return (forOverview) ? splits.map(split => `${split.slotStartTime}h - ${split.slotEndTime}h `) : splits;
    }
    return splits
  }

  convertToHourFormat(hours: number): string {
    const wholeHours = Math.floor(hours);
    const minutes = Math.floor((hours - wholeHours) * 60);

    let hourString = wholeHours.toString();

    if (minutes > 0) {
      const minuteString = minutes.toString().padStart(2, '0');
      hourString += `.${minuteString}`;
    }

    return hourString;
  }

}
