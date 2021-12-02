/*
  Refactoring is based in Strategy Design Pattern.
  Also, code complies the Open-Closed Principle, because if we add new types of items in the future, we only need to:
    1. Create a specific ConcreteStatregy for new type.
    2. In client class GildedRose, add a new condition at UpdateItems() method.
  Nothing else changes, reducing significantly the risk to add bugs.
*/

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export interface UpdateStrategy {
  updateItem(i: number, items: Array<Item>): void;
}

export class ConcreteStategyNormalItem implements UpdateStrategy {
  updateItem(i: number, items: Item[]): void {
    if (items[i].quality > 0) {
      items[i].quality = items[i].quality - 1;
    }
    items[i].sellIn = items[i].sellIn - 1;
    if (items[i].sellIn < 0 && items[i].quality > 0) {
      items[i].quality = items[i].quality - 1;
    }
  }
}

export class ConcreteStrategyAgedBrieItem implements UpdateStrategy {
  updateItem(i: number, items: Item[]): void {
    if (items[i].quality < 50) {
      items[i].quality = items[i].quality + 1;
    }
    items[i].sellIn = items[i].sellIn - 1;
    if (items[i].sellIn < 0 && items[i].quality < 50) {
      items[i].quality = items[i].quality + 1;
    }
  }
}

export class ConcreteStrategyBackstagePassesItem implements UpdateStrategy {
  updateItem(i: number, items: Item[]): void {
    if (items[i].quality < 50) {
      items[i].quality = items[i].quality + 1;
      if (items[i].sellIn < 11 && items[i].quality < 50) {
        items[i].quality = items[i].quality + 1;
      }
      if (items[i].sellIn < 6 && items[i].quality < 50) {
        items[i].quality = items[i].quality + 1;
      }
    }
    items[i].sellIn = items[i].sellIn - 1;
    if (items[i].sellIn < 0) {
      items[i].quality = items[i].quality - items[i].quality;
    }
  }
}

export class ConcreteStrategySulfurasItem implements UpdateStrategy {
  updateItem(i: number, items: Item[]): void {}
}

export class ConcreteStrategyConjuredItem implements UpdateStrategy {
  updateItem(i: number, items: Item[]): void {
    if (items[i].quality > 0) {
      items[i].quality = items[i].quality - 2;
    }
    items[i].sellIn = items[i].sellIn - 1;
    if (items[i].sellIn < 0 && items[i].quality > 0) {
      items[i].quality = items[i].quality - 2;
    }
  }
}

export class Context {
  updateStategy!: UpdateStrategy;

  setUpdateStrategy(updateStategy: UpdateStrategy) {
    this.updateStategy = updateStategy;
  }

  executeUpdateStrategy(i: number, items: Item[]) {
    return this.updateStategy.updateItem(i, items);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>, private context: Context) {
    this.items = items;
  }

  updateItems() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name == "Aged Brie") this.context.setUpdateStrategy(new ConcreteStrategyAgedBrieItem());
      else if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert")
        this.context.setUpdateStrategy(new ConcreteStrategyBackstagePassesItem());
      else if (this.items[i].name == "Sulfuras, Hand of Ragnaros")
        this.context.setUpdateStrategy(new ConcreteStrategySulfurasItem());
      else if (this.items[i].name == "Conjured") this.context.setUpdateStrategy(new ConcreteStrategyConjuredItem());
      else this.context.setUpdateStrategy(new ConcreteStategyNormalItem());
      this.context.executeUpdateStrategy(i, this.items);
    }
    return this.items;
  }
}
