import { Node } from './models/node';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  left: Node[] = [];
  right: Node[] = [];

  ngOnInit() {

    // left 

    let node = new Node('left 1');
    node.type = 'Attribute';
    this.left.push(node);

    node = new Node('left 2');
    node.type = 'Attribute';
    this.left.push(node);

    node = new Node('left 3');
    node.type = 'Attribute';
    this.left.push(node);

    node = new Node('left 4');
    node.type = 'Attribute';
    this.left.push(node);

    node = new Node('left 5');
    node.type = 'Attribute';
    this.left.push(node);


    // right

    node = new Node('right 1');
    node.type = 'Attribute';
    this.right.push(node);

    node = new Node('right 2');
    node.type = 'Attribute';
    this.right.push(node);

    node = new Node('right 3');
    node.type = 'Attribute';
    this.right.push(node);

    node = new Node('right 4');
    node.type = 'Attribute';
    this.right.push(node);

  }

  leftToRight(evt) {
    // check if it doesn't exist in right
    if (this.right.indexOf(evt.dragData) === -1) {
      this.right.push(evt.dragData);
    }
  }

  rightToLeft(evt) {
    const draggedNode = evt.dragData;
    // check if it doesn't exist in left
    if (this.left.indexOf(draggedNode) === -1) {
      // Dirty workaround to check if the element doesn't have a name suffix with _Hier
      console.log(draggedNode.label, draggedNode.label.indexOf('_Hier'));
      if (draggedNode.label.indexOf('_Hier') === -1){
        this.left.push(draggedNode);
      }
    }
    // remove item from the right
    const idx = this.right.indexOf(draggedNode);
    this.right.splice(idx, 1);
  }

  nestedDropSucess(parent: Node) {

    const idx = this.right.indexOf(parent);

    const parentClone = JSON.parse(JSON.stringify(parent))

    const newNode = new Node(parentClone.label + '_Hier');
    newNode.children.push(parentClone);

    this.right.splice(idx, 0, newNode);
    // https://github.com/akserg/ng2-dnd/issues/177#issuecomment-319318556
    setTimeout(() => {
      this.right.splice(idx+1, 1)
    }, 260);
  }
}

export interface Item {
  id: number;
  label: string;
  mandatory: boolean;
  children?: Item[];
}
