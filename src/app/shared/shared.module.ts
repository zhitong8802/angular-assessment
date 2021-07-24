import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { WarningComponent } from './warning/warning.component';

@NgModule({
  declarations: [
    WarningComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [CommonModule],
  exports: [
    WarningComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    CommonModule
  ],
  entryComponents: [WarningComponent],
  providers: []
})
export class SharedModule {}
