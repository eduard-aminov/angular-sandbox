import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cell]'
})
export class CellDirective<T> {
  @Input() cell = '';

  constructor(private _templateRef: TemplateRef<T>) {}
}
