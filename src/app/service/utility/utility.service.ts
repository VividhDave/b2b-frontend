import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private readonly messageService: MessageService) { }

  showSuccess(message: string): void {
    this.messageService.add(
      { severity: 'success', summary: 'Success', detail: message  }
    );
  }

  showError(message: string): void {
    this.messageService.add(
      { severity: 'error', summary: 'Error', detail: message }
    );
  }

  showInfo(message: string): void {
    this.messageService.add(
      { severity: 'info', summary: 'Info', detail: message }
    );
  }
}
