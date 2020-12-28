import { Collection } from "../models/Collection";

export abstract class CollectionView<T, K> {
  regions: { [key: string]: Element } = {};

  abstract renderItem(model: T, itemParent: Element): void;

  constructor(public parent: Element, public collection: Collection<T, K>) {
    this.collection.on("fetch", () => {
      this.render();
    });
  }

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    for (let model of this.collection.models) {
      const itemParent = document.createElement("div");
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }
    this.parent.append(templateElement.content);
  }
}
