import { Node } from '../models/node';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit, OnDestroy {

  @Input()
  node: Node;

  @Input()
  isRoot = false;

  @Output()
  childDragged = new EventEmitter();

  collapsed = true;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  onDropSucess(evt) {
    const draggedItem = JSON.parse(JSON.stringify(evt.dragData))
    if (this.isRoot) {
      // if this element is root and it already has children, then a new dragged node to this node
      // will just become his first child, and the current subtree will be child of the new child
      if (this.node.children.length > 0) {
        const cachedChildren = this.node.children;
        this.node.children = [draggedItem];
        this.node.children[0].children = cachedChildren;
      } else {
        this.node.children.push(draggedItem);
        const newNode = new Node(this.node.label + '_Hier');
        newNode.children.push(this.node);
        this.childDragged.next();
      }
    } else {
      // if the element is not root we should treat this differently
      // when dragging an element to this element, that element becomes the parent this element
      // in other words, that element becomes this node and the current node becomes the child of the
      // incoming node
      const cachedNode = this.node;
      this.node = draggedItem;
      this.node.children = [cachedNode];
    }
    this.removeDragClass();
  }

  // not sure if this is the cleanest solution, but sometimes the .dnd-drag-over class keeps around
  // even after the drop action has finished. We make sure to remove all those classes here
  removeDragClass() {
    const elems = document.querySelectorAll('.dnd-drag-over');
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.remove('dnd-drag-over');
    }
  }

  ngOnDestroy() {
    this.cdRef.detach();
  }



  // returns the image used to represent the node
  // only roots can have the group image
  get nodeImg() {
    return this.isRoot && this.node.children.length > 0 ? 'assets/group.svg' : 'assets/single.svg';
  }

}
