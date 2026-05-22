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

});