function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    update_single_item(items[i]);
  }
}

function update_single_item(item) {
  if (item.name === 'Sulfuras, Hand of Ragnaros') {
    return;
  }

  item.sell_in = item.sell_in - 1;

  if (item.name === 'Aged Brie') {
    adjust_quality(item, item.sell_in < 0 ? 2 : 1);
  }
  else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
    if (item.sell_in < 0) {
      item.quality = 0;
    } else if (item.sell_in < 5) {
      adjust_quality(item, 3);
    } else if (item.sell_in < 10) {
      adjust_quality(item, 2);
    } else {
      adjust_quality(item, 1);
    }
  }
  else if (item.name.indexOf('Conjured') === 0) {
    adjust_quality(item, item.sell_in < 0 ? -4 : -2);
  }
  else {
    adjust_quality(item, item.sell_in < 0 ? -2 : -1);
  }
}

function adjust_quality(item, amount) {
  item.quality = item.quality + amount;
  if (item.quality > 50) {
    item.quality = 50;
  }
  if (item.quality < 0) {
    item.quality = 0;
  }
}