import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { WarningComponent } from '../shared/warning/warning.component';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
})
export class MainScreenComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  warningHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    setTimeout(() => this.showWarning('WARNING'), 50);
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showWarning(message: string) {
    const warningCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      WarningComponent
    );
    const hostViewContainerRef = this.warningHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      warningCmpFactory
    );

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
