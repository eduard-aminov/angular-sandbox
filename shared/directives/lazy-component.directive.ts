import {
  ComponentFactoryResolver,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Type,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appLazyComponent]'
})
export class LazyComponentDirective implements OnDestroy {
  // tslint:disable-next-line:variable-name
  private _inputs: any;
  // tslint:disable-next-line:variable-name
  private _outputs: any;
  private subscription = new Subscription();

  @Input('appLazyComponent') set comp(type: Type<any> | null | undefined) {
    if (type) {
      const factory = this.resolver.resolveComponentFactory(type);
      this.compRef = this.vcr.createComponent(factory);
      if (this._inputs) {
        this.refreshInputs(this._inputs);
      }
      if (this._outputs) {
        Object.keys(this._outputs).forEach(output => {
          this.subscription.add((this.compRef.instance[output] as EventEmitter<any>).subscribe(this._outputs[output]));
        });
      }
    }
  }

  @Input() set inputs(data: { [x: string]: any; }) {
    if (data) {
      if (this.compRef) {
        this.refreshInputs(data);
        this.compRef.hostView.detectChanges();
      } else {
        this._inputs = data;
      }
    }
  }

  @Input() set outputs(data: any) {
    this._outputs = data;
  }

  private compRef: any;

  constructor(private vcr: ViewContainerRef, private resolver: ComponentFactoryResolver) {
  }

  private refreshInputs(inputs: { [x: string]: any; }): void {
    if (inputs) {
      Object.keys(inputs).forEach(inputName => this.compRef.instance[inputName] = inputs[inputName]);
    }
  }

  ngOnDestroy(): void {
    this.compRef = null;
    this.subscription.unsubscribe();
  }
}
