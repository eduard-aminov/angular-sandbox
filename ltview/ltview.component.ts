import { Component, ɵɵdefineComponent, ɵɵelementEnd, ɵɵelementStart, ɵɵtext } from '@angular/core';
import { RenderFlags } from '@angular/compiler/src/core';

@Component({
  selector: 'app-ltview',
  template: '',
})
export class LtviewComponent {
  static ɵcmp = ɵɵdefineComponent<LtviewComponent>({
    decls: 5,
    template: (rf, ctx) => {
      if (rf && RenderFlags.Create) {
        ɵɵelementStart(0, 'div');
        ɵɵtext(1, 'Hello');
        ɵɵelementStart(2, 'b');
        ɵɵtext(3, 'World!');
        ɵɵelementEnd();
        ɵɵelementEnd();
      }
    },
    type: LtviewComponent,
    vars: 0
  });
}
