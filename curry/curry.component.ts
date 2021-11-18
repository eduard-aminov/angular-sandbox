import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface PanelState {
  filterBtn: {
    disable: boolean;
    visible: boolean;
  };
  renewBtn: {
    disable: boolean;
    visible: boolean;
  };
  input: {
    value: string;
    disable: boolean;
    visible: boolean;
  };
  checkbox: {
    checked: boolean;
  };
  icon: {
    size: {
      width: number;
      height: number;
    };
    visible: boolean;
  };
}

const InitialState: PanelState = {
  renewBtn: {
    disable: false,
    visible: true,
  },
  filterBtn: {
    disable: false,
    visible: true,
  },
  input: {
    value: 'SomeText',
    disable: false,
    visible: true,
  },
  checkbox: {
    checked: true,
  },
  icon: {
    size: {
      height: 16,
      width: 16,
    },
    visible: true,
  }
};

type KeyValuesOf<T> = { [K in keyof T]: T[K] }[keyof T];

type ValuesOf<T> = T[keyof T];
type ObjectValuesOf<T> = Exclude<Extract<ValuesOf<T>, object>,
  Array<any>>;

type NonObjectKeysOf<T> = {
  [K in keyof T]: T[K] extends Array<any> ?
                  K :
                  T[K] extends object ? never : K
}[keyof T];

type NonObjectPropertiesOf<T> = Pick<T, NonObjectKeysOf<T>>;

type UnionToIntersection<U> = (U extends any
                               ? (k: U) => void
                               : never) extends ((k: infer I) => void)
                              ? I
                              : never;

type DeepFlatten<T> = T extends any
                      ? Pick<T, NonObjectKeysOf<T>> &
                        UnionToIntersection<DeepFlatten2<ObjectValuesOf<T>>>
                      : never;

type DeepFlatten2<T> = T extends any
                       ? Pick<T, NonObjectKeysOf<T>> &
                         UnionToIntersection<DeepFlatten3<ObjectValuesOf<T>>>
                       : never;

type DeepFlatten3<T> = T extends any
                       ? Pick<T, NonObjectKeysOf<T>> &
                         UnionToIntersection<DeepFlatten4<ObjectValuesOf<T>>>
                       : never;

type DeepFlatten4<T> = T extends any
                       ? Pick<T, NonObjectKeysOf<T>> &
                         UnionToIntersection<DeepFlatten5<ObjectValuesOf<T>>>
                       : never;

type DeepFlatten5<T> = T extends any
                       ? Pick<T, NonObjectKeysOf<T>> &
                         UnionToIntersection<DeepFlatten6<ObjectValuesOf<T>>>
                       : never;

type DeepFlatten6<T> = T extends any
                       ? Pick<T, NonObjectKeysOf<T>> &
                         UnionToIntersection<DeepFlatten7<ObjectValuesOf<T>>>
                       : never;

type DeepFlatten7<T> = T extends any
                       ? Pick<T, NonObjectKeysOf<T>> &
                         UnionToIntersection<DeepFlatten8<ObjectValuesOf<T>>>
                       : never;

type DeepFlatten8<T> = T extends any
                       ? Pick<T, NonObjectKeysOf<T>> &
                         UnionToIntersection<DeepFlatten9<ObjectValuesOf<T>>>
                       : never;

type DeepFlatten9<T> = T extends any
                       ? Pick<T, NonObjectKeysOf<T>>
                       : UnionToIntersection<ObjectValuesOf<T>>;

// type fn<T> = (...args: Array<keyof T>) => fn1<UnionToIntersection<KeyValuesOf<T>>>;
// type fn1<T> = (...args: Array<keyof T>) => fn2<UnionToIntersection<KeyValuesOf<T>>>;
// type fn2<T> = (...args: Array<keyof T>) => fn3<UnionToIntersection<KeyValuesOf<T>>>;
// type fn3<T> = (...args: Array<keyof T>) => fn4<UnionToIntersection<KeyValuesOf<T>>>;
// type fn4<T> = (...args: Array<keyof T>) => UnionToIntersection<KeyValuesOf<T>>;
//
// const tzt: DeepFlatten<PanelState> = {
//
// }
//
// const curry: fn<PanelState> = (...args) => {
//   return (...args) => {
//     return (...args) => {
//       return (...args) => {
//
//       };
//     };
//   };
// };

// const value = curry('checkbox')('size')();

const obj = InitialState;

// function get<T, P1 extends keyof PanelState>(prop1: P1): PanelState[P1] | undefined;
// function get<T, P1 extends keyof PanelState,
//   P2 extends keyof PanelState[P1]>(prop1: P1, prop2: P2): () => PanelState[P1][P2] | undefined;
// function get<T, P1 extends keyof PanelState,
//   P2 extends keyof PanelState[P1],
//   P3 extends keyof PanelState[P1][P2]>(prop1: P1, prop2: P2, prop3: P3): PanelState[P1][P2][P3] | undefined;
// function get(obj: any, ...props: string[]): any {
//   return obj && props.reduce(
//     (result, prop) => result === null ? undefined : result[prop],
//     obj
//   );



@Component({
  selector: 'app-curry',
  templateUrl: './curry.component.html',
  styleUrls: ['./curry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurryComponent<T = PanelState> implements OnInit {
  panelState$: BehaviorSubject<PanelState> = new BehaviorSubject<PanelState>(InitialState);

  // state$: Observable<(...args: string[]) => any> = this.getStateSubscriber(this.panelState$);

  state: PanelState | null = null;

  ngOnInit(): void {
    // const fn = this.curryState(InitialState);
    // console.log(fn('')('disable')());
    this.panelState$.subscribe(val => this.state = val);
    this.get('filterBtn', 'disable');
  }

  curryState(state: PanelState): any {
    const next = <T>(...args: Array<keyof T>): any => {
      return (x: any) => {
        if (!x) {
          let prop: any = state;
          for (const arg of args) {
            const propValue = prop[arg];
            if (propValue === undefined) {
              return prop;
            } else {
              prop = propValue;
            }
          }
          return prop;
        }
        return next<T>(...args, x);
      };
    };
    return next<PanelState>();
  }

  get<P1 extends keyof PanelState>(prop1: P1): PanelState[P1] | undefined;
  get<P1 extends keyof PanelState,
    P2 extends keyof PanelState[P1]>(prop1: P1, prop2: P2): () => PanelState[P1][P2] | undefined;
  get<P1 extends keyof PanelState,
    P2 extends keyof PanelState[P1],
    P3 extends keyof PanelState[P1][P2]>(prop1: P1, prop2: P2, prop3: P3): PanelState[P1][P2][P3] | undefined;
  get(...props: string[]): any {
    return this.state && props.reduce(
      (result: any, prop: any) => result === null ? undefined : result[prop],
      this.state
    );
  }

  toggle(): void {
    this.panelState$.next({
      ...this.panelState$.getValue(),
      filterBtn: {
        ...this.panelState$.getValue().filterBtn,
        disable: !this.panelState$.getValue().filterBtn.disable,
      }
    });
  }
}
