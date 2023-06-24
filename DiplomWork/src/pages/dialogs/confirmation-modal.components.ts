import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogData} from "./confirmation-dialog-data";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
  }

  close(): void {
    this.dialogRef.close()
  }

  get confirmColor() {
    const confirmColor = this.data.confirmColor;
    if (confirmColor) {
      return confirmColor
    }
    return 'primary'
  }
  get cancelColor() {
    const confirmColor = this.data.cancelColor;
    if (confirmColor) {
      return confirmColor
    }
    return ''
  }
}
