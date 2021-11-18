export class LinkedList {

  constructor(public value = 0, public next: LinkedList | null = null) {}

  getNode(index: number): LinkedList | null {
    if (index === 0) {
      return this;
    }
    let cur = this.next;
    let i = 1;
    while (cur) {
      if (i === index) {
        return cur;
      }
      i++;
      cur = cur.next;
    }
    return null;
  }

  get(index: number): number {
    if (index < 0) {
      return -1;
    } else {
      const found = this.getNode(index);
      return found ? found.value : -1;
    }
  }

  addAtHead(val: number): void {
    const node = new LinkedList(val);
    if (!this.next) {
      this.next = node;
    } else {
      node.next = this.next;
      this.next = node;
    }
  }

  addAtTail(val: number): void {
    const node = new LinkedList(val);
    if (!this.next) {
      this.next = node;
    } else {
      const tail = this.tail;
      if (tail) {
        tail.next = node;
      }
    }
  }

  addAtIndex(index: number, val: number): void {
    if (index === 0) {
      this.addAtHead(val);
    } else {
      const node = new LinkedList(val);
      const prev = this.getNode(index - 1);
      if (prev) {
        node.next = prev.next;
        prev.next = node;
      }
    }
  }
  //
  // deleteAtIndex(index: number): void {
  //   if (index === 0) {
  //     this = this.next;
  //   }
  //   const found = this.getNode(index);
  //   if (found) {
  //
  //   }
  // }

  get tail(): LinkedList | null {
    let tail = this.next;
    if (tail) {
      while (tail.next) {
        tail = tail.next;
      }
    }
    return tail;
  }
}
