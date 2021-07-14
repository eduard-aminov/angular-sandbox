import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragndropComponent implements OnInit {
  private readonly document: Document | undefined;
  private sourceDraggableElementId: string | undefined;
  private targetDraggableElementId: string | undefined;
  private toPushElementPosition: 'beforebegin' | 'afterend' | undefined;

  constructor(@Inject(DOCUMENT) document: Document) {
    this.document = document;
  }

  @ViewChild('dropzone') dropzone: ElementRef | undefined;

  ngOnInit(): void {
  }

  onDragStart($event: DragEvent): void {
    this.sourceDraggableElementId = ($event.target as HTMLElement).id;
  }

  onDragOverDropzone($event: DragEvent): void {
    $event.preventDefault();
  }

  onDragOverElement($event: DragEvent): void {
    $event.preventDefault();
    this.targetDraggableElementId = ($event.target as HTMLElement).id;
    const targetElement = ($event.currentTarget as HTMLElement);
    if (this.getSourceElementPosition($event)) {
      this.toPushElementPosition = 'beforebegin';
      targetElement.style.borderTop = '2px blue solid';
      targetElement.style.borderBottom = 'unset';
    } else {
      this.toPushElementPosition = 'afterend';
      targetElement.style.borderBottom = '2px blue solid';
      targetElement.style.borderTop = 'unset';
    }
  }

  onDragLeaveElement($event: DragEvent): void {
    $event.preventDefault();
    ($event.currentTarget as HTMLElement).style.border = '1px solid grey';
  }

  onDrop(): void {
    const sourceElement = this.document?.getElementById(this.sourceDraggableElementId!);
    const targetElement = this.document?.getElementById(this.targetDraggableElementId!);
    targetElement!.style.border = '1px solid grey';
    targetElement?.insertAdjacentElement(this.toPushElementPosition!, sourceElement as HTMLElement);
  }

  getSourceElementPosition($event: DragEvent): boolean {
    return $event.offsetY < ($event.currentTarget as HTMLElement).offsetHeight / 2;
  }
}
