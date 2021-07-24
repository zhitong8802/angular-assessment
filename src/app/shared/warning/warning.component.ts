import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css'],
})

export class WarningComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  constructor() {}

  onClose(){
    this.close.emit();
  }
}
