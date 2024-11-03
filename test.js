const RecipeGenerator = require('./index.js');

// Test cases
console.log("Running tests...\n");

// Test shaped recipe
const shapedTest = RecipeGenerator.shaped(
  "minecraft:chest",
  ["PPP", "P P", "PPP"],
  { P: "minecraft:planks" }
);
console.assert(
  shapedTest === 'recipes.addShaped(<minecraft:chest:0>, ["PPP", "P P", "PPP"], {P, <minecraft:planks>});',
  "Shaped recipe test failed"
);

// Test shapeless recipe
const shapelessTest = RecipeGenerator.shapeless(
  "minecraft:paper",
  ["minecraft:reeds", "minecraft:reeds", "minecraft:reeds"]
);
console.assert(
  shapelessTest === 'recipes.addShapeless(<minecraft:paper:0>, [<minecraft:reeds>, <minecraft:reeds>, <minecraft:reeds>]);',
  "Shapeless recipe test failed"
);

// Test furnace recipe
const furnaceTest = RecipeGenerator.furnace(
  "minecraft:iron_ingot",
  "minecraft:iron_ore",
  0.7
);
console.assert(
  furnaceTest === 'furnace.addRecipe(<minecraft:iron_ingot:0>, <minecraft:iron_ore>, 0.7);',
  "Furnace recipe test failed"
);

// Test OreDictionary
const oreDictTest = RecipeGenerator.addOreDict(
  "ingotIron",
  "minecraft:iron_ingot"
);
console.assert(
  oreDictTest === '<ore:ingotIron>.add(<minecraft:iron_ingot:0>);',
  "OreDictionary test failed"
);

console.log("All tests completed successfully!");