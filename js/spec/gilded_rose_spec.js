describe("Gilded Rose Safety Net", function() {

  it("should decrease quality and sell_in by 1 for normal items", function() {
    items = [ new Item("+5 Dexterity Vest", 10, 20) ];
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(19);
  });

  it("should degrade normal items twice as fast once sell_in is 0 or less", function() {
    items = [ new Item("Elixir of the Mongoose", 0, 10) ];
    update_quality();
    expect(items[0].quality).toEqual(8);
  });

  it("should ensure quality never drops below 0", function() {
    items = [ new Item("Elixir of the Mongoose", 5, 0) ];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });

  it("should increase quality of Aged Brie the older it gets", function() {
    items = [ new Item("Aged Brie", 5, 10) ];
    update_quality();
    expect(items[0].quality).toEqual(11);
  });

  it("should limit maximum item quality to 50", function() {
    items = [ new Item("Aged Brie", 5, 50) ];
    update_quality();
    expect(items[0].quality).toEqual(50);
  });

  it("should never decrease quality or change sell_in for Sulfuras", function() {
    items = [ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ];
    update_quality();
    expect(items[0].sell_in).toEqual(0);
    expect(items[0].quality).toEqual(80);
  });

  it("should increase Backstage passes quality by 2 when 10 days or less remain", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20) ];
    update_quality();
    expect(items[0].quality).toEqual(22);
  });

  it("should increase Backstage passes quality by 3 when 5 days or less remain", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20) ];
    update_quality();
    expect(items[0].quality).toEqual(23);
  });

  it("should drop Backstage passes quality to 0 after the concert", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20) ];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });

  it("should degrade Conjured items twice as fast as normal items before expiration", function() {
    items = [ new Item("Conjured Mana Cake", 3, 6) ];
    update_quality();
    expect(items[0].quality).toEqual(4); // 6 - 2 = 4
  });

  it("should degrade Conjured items by 4 points per day when expired", function() {
    items = [ new Item("Conjured Mana Cake", 0, 6) ];
    update_quality();
    expect(items[0].quality).toEqual(2); // 6 - 4 = 2
  });

});