import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-masonry-area',
  templateUrl: './masonry-area.component.html',
  styleUrls: ['./masonry-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryAreaComponent implements AfterViewInit {

  @ViewChild('area')
  private readonly area: ElementRef<Element> | null = null;

  private areaChildren: Element[] = [];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const resizeObserver = new ResizeObserver((entries) => {

      const getElementsAsLines = (entry: ResizeObserverEntry) => {
        const width = entry.contentRect.width;

        const children = this.areaChildren.slice();
        const lines: Element[][] = [];
        let lineWidthSum = 0;
        let currentLineIndex = 0;

        while (children.length) {
          const child = children.shift()!;
          const childWidth = child.clientWidth;

          if (!children.length) {
            lines.push([child]);
            break;
          }

          if ((lineWidthSum + childWidth) < width) {
            lineWidthSum += childWidth;

            if (!lines[currentLineIndex]) {
              lines.push([]);
            }

            lines[currentLineIndex].push(child);
          } else {
            children.unshift(child);
            currentLineIndex++;
            lineWidthSum = 0;
          }
        }

        return lines;
      };
      const getElementsAsColumnsFromLines = (lines: Element[][]) => {
        const columns: Element[][] = [];
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
          for (let columnIndex = 0; columnIndex < lines[lineIndex].length; columnIndex++) {
            const child = lines[lineIndex][columnIndex];
            if (child) {

              if (!columns[columnIndex]) {
                columns.push([]);
              }

              columns[columnIndex].push(child);
            } else {
              break;
            }
          }
        }
        return columns;
      };

      const lines = getElementsAsLines(entries[0]);
      const columns = getElementsAsColumnsFromLines(lines);

      for (const column of columns) {
        const columnWrapper = this.renderer.createElement('div');
        for (const element of column) {
          columnWrapper.insertAdjacentElement('beforeend', element);
        }
        area?.insertAdjacentElement('afterbegin', columnWrapper);
      }

      for (const child of Array.from(area?.children ?? [])) {
        if (!child?.innerHTML.length) {
          area?.removeChild(child);
        }
      }
    });
    const area = this.area?.nativeElement;
    if (area) {
      this.areaChildren = Array.from(area?.children!);
      resizeObserver.observe(area);
    }
  }


}
