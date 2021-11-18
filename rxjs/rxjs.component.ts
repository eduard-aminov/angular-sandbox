import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private readonly documentClick$ = fromEvent(this.document, 'click');

  ngOnInit(): void {
    // forkJoin([of(2), this.documentClick$.pipe(first())]).subscribe(
    //   v => console.log('next', v),
    //   v => console.log(v),
    //   () => console.log('complete')
    // );
    // combineLatest([of(2), this.documentClick$]).subscribe(
    //   v => console.log('next', v),
    //   v => console.log(v),
    //   () => console.log('complete')
    // );
    // zip([of(2), this.documentClick$]).subscribe(
    //   v => console.log('next', v),
    //   v => console.log(v),
    //   () => console.log('complete')
    // );
    // this.documentClick$.pipe(withLatestFrom(of(2))).subscribe(
    //   v => console.log('next', v),
    //   v => console.log(v),
    //   () => console.log('complete')
    // );
  }
}
