export class DialogData {
  title: string;
}
export class ConfirmationDialogData extends DialogData {
  message: string;
  confirmText: string | null;
  confirmColor: string | null;
  resources: string[] | null;
  cancelText: string | null;
  cancelColor: string | null;
}
