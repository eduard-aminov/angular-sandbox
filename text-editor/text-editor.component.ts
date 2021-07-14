import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextEditorComponent implements OnInit {

  @ViewChild('editor') editor: ElementRef<HTMLDivElement> | undefined;

  editorValue = '';
  private documentRef: Document;

  constructor(@Inject(DOCUMENT) documentRef: Document) {
    this.documentRef = documentRef;
  }

  ngOnInit(): void {
  }

  onInput(): void {
    this.editorValue = this.editor?.nativeElement?.innerHTML!;
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('keyup', ['$event'])
  @HostListener('selectionchange', ['$event'])
  onSelectionChange($event: Event): void {
    const selection = this.documentRef.getSelection();
    console.log(selection);
  }

  toggleBold(): void {
    this.documentRef.execCommand('bold');
  }

  selectAll(): void {
    this.documentRef.execCommand('selectAll');
  }

  toggleItalic(): void {
    this.documentRef.execCommand('italic');
  }

  setBackColor(): void {
    this.documentRef.execCommand('backColor', false, 'red');
  }

  setEditorBackColor(): void {
    this.editor?.nativeElement?.setAttribute('style', 'background-color: yellow;');
  }
}
