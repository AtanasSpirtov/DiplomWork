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
        telephone: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10,15}")]),
        picture: new FormControl('', Validators.required),
        businessField: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        startTime: new FormControl('', [Validators.required]),
        endTime: new FormControl('', [Validators.required]),
        numberOfSlots: new FormControl(1, [Validators.required]),
        maxUsers: new FormControl(1, [Validators.required, Validators.min(1)])
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
    };
    reader.readAsDataURL(file);
  }

  goToListBusiness() {
    this.router.navigate(['business-home'])
  }

  saveBusiness() {
    if (this.createBusinessForm.valid) {
      let startTime = (this.createBusinessForm.get('startTime').value as string)
      let startTimeSplit = startTime.split(":")
      let endTime = (this.createBusinessForm.get('endTime').value as string)
      let endTimeSplit = endTime.split(":")
      let startDate = new Date()
      startDate.setHours(Number(startTimeSplit[0]))
      startDate.setMinutes(Number(startTimeSplit[1]))
      let endDate = new Date()
      endDate.setHours(Number(endTimeSplit[0]))
      endDate.setMinutes(Number(endTimeSplit[1]))
      let business = new Business(
        this.createBusinessForm.get('name').value,
        this.createBusinessForm.get('location').value,
        this.createBusinessForm.get('telephone').value,
        this.createBusinessForm.get('picture').value,
        this.createBusinessForm.get('businessField').value,
        this.datePipe.transform(startDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
        this.datePipe.transform(endDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
        this.generateSlotsByGivenData(
          startTime,
          endTime,
          this.createBusinessForm.get('numberOfSlots').value,
          false,
          this.createBusinessForm.get('maxUsers').value
        ),
      )
      this.businessService.saveBusiness(business).subscribe(response =>
        this.router.navigate(['business-home']))
    }
  }

  convertToMinutes(time) {
    let timeParts = time.split(":");
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);

    return hours * 60 + minutes;
  }

  generateSlotsByGivenData(startTime: string, endTime: string, numberOfSplits: number, forOverview: boolean, maxUsers: number): any {
    let splits: Slot[] = [];
    if (
      !this.createBusinessForm.get('startTime').hasError('required') &&
      !this.createBusinessForm.get('endTime').hasError('required') &&
      !this.createBusinessForm.get('numberOfSlots').hasError('required')
    ) {
      let startMinutes = this.convertToMinutes(startTime);
      let endMinutes = this.convertToMinutes(endTime);

      const totalHours = Number((endMinutes - startMinutes) / 60);
      const splitSize = totalHours / numberOfSplits;
      for (let i = 0; i < numberOfSplits; i++) {
        const start = startMinutes / 60 + i * splitSize;
        const end = startMinutes / 60 + (i + 1) * splitSize;
        splits.push(new Slot(this.convertToHourFormat(Number(start)), this.convertToHourFormat(Number(end)), [], maxUsers, null));
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
