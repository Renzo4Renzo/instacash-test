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

export class UpdateItem {
  updateNormalItem(i: number, items: Array<Item>) {
    if (items[i].quality > 0) {
      items[i].quality = items[i].quality - 1;
    }
    items[i].sellIn = items[i].sellIn - 1;
    if (items[i].sellIn < 0 && items[i].quality > 0) {
      items[i].quality = items[i].quality - 1;
    }
  }

  updateAgedBrie(i: number, items: Array<Item>) {
    if (items[i].quality < 50) {
      items[i].quality = items[i].quality + 1;
    }
    items[i].sellIn = items[i].sellIn - 1;
    if (items[i].sellIn < 0 && items[i].quality < 50) {
      items[i].quality = items[i].quality + 1;
    }
  }

  updateBackstagePasses(i: number, items: Array<Item>) {
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

  updateSulfuras() {}

  updateConjured(i: number, items: Array<Item>) {
    if (items[i].quality > 0) {
      items[i].quality = items[i].quality - 2;
    }
    items[i].sellIn = items[i].sellIn - 1;
    if (items[i].sellIn < 0 && items[i].quality > 0) {
      items[i].quality = items[i].quality - 2;
    }
  }
}

export class GildedRose {
  items: Array<Item>;
  updateItem: UpdateItem = new UpdateItem();

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  /* updateQuality() {
      for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
              if (this.items[i].quality > 0) {
                  if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                      this.items[i].quality = this.items[i].quality - 1
                  }
              }
          } else {
              if (this.items[i].quality < 50) {
                  this.items[i].quality = this.items[i].quality + 1
                  if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                      if (this.items[i].sellIn < 11) {
                          if (this.items[i].quality < 50) {
                              this.items[i].quality = this.items[i].quality + 1
                          }
                      }
                      if (this.items[i].sellIn < 6) {
                          if (this.items[i].quality < 50) {
                              this.items[i].quality = this.items[i].quality + 1
                          }
                      }
                  }
              }
          }
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
              this.items[i].sellIn = this.items[i].sellIn - 1;
          }
          if (this.items[i].sellIn < 0) {
              if (this.items[i].name != 'Aged Brie') {
                  if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                      if (this.items[i].quality > 0) {
                          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                              this.items[i].quality = this.items[i].quality - 1
                          }
                      }
                  } else {
                      this.items[i].quality = this.items[i].quality - this.items[i].quality
                  }
              } else {
                  if (this.items[i].quality < 50) {
                      this.items[i].quality = this.items[i].quality + 1
                  }
              }
          }
      }
      return this.items;
  } */

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name == "Aged Brie") this.updateItem.updateAgedBrie(i, this.items);
      else if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert")
        this.updateItem.updateBackstagePasses(i, this.items);
      else if (this.items[i].name == "Sulfuras, Hand of Ragnaros") this.updateItem.updateSulfuras();
      else if (this.items[i].name == "Conjured") this.updateItem.updateConjured(i, this.items);
      else this.updateItem.updateNormalItem(i, this.items);
    }
    return this.items;
  }
}
