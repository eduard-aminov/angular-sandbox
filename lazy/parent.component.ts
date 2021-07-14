import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent {

  childComponent: Promise<Type<ChildComponent>> | undefined;
  childComponentInputs = {
    name: 'Eduard',
    age: 23,
  };

  childComponentOutputs = {
    nameChange: () => this.childComponentInputs = {...this.childComponentInputs, name: 'Kirill'},
  };

  createComponent(): void {
    if (!this.childComponent) {
      this.childComponent = import(`./child/child.component`)
        .then(({ChildComponent}) => ChildComponent);
    }
  }
}
