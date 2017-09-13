export class Node {
  type: string;
  children?: Node[] = [];
  mandatory: boolean;

  constructor(public label) {}
}