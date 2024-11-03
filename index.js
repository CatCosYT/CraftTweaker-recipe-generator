const RecipeGenerator = {
  // Shaped crafting recipe generator
  shaped: (output, pattern, ingredients, metadata = 0, nbt = null) => {
    const outputStr = nbt 
      ? `<${output}:${metadata}>.withTag(${JSON.stringify(nbt)})` 
      : `<${output}:${metadata}>`;
    
    const patternStr = pattern
      .map(row => `"${row}"`)
      .join(', ');
    
    const ingredientStr = Object.entries(ingredients)
      .map(([key, value]) => `${key}, ${value.startsWith("ore:") ? value : `<${value}>`}`)
      .join(', ');

    return `recipes.addShaped(${outputStr}, [${patternStr}], {${ingredientStr}});`;
  },

  // Shapeless crafting recipe generator
  shapeless: (output, ingredients, metadata = 0, nbt = null) => {
    const outputStr = nbt 
      ? `<${output}:${metadata}>.withTag(${JSON.stringify(nbt)})` 
      : `<${output}:${metadata}>`;
    
    const ingredientStr = ingredients
      .map(ing => ing.startsWith("ore:") ? ing : `<${ing}>`)
      .join(', ');

    return `recipes.addShapeless(${outputStr}, [${ingredientStr}]);`;
  },

  // Furnace recipe generator
  furnace: (output, input, xp = 0.0, metadata = 0) => {
    const inputStr = input.startsWith("ore:") ? input : `<${input}>`;
    return `furnace.addRecipe(<${output}:${metadata}>, ${inputStr}, ${xp});`;
  },

  // OreDictionary registration
  addOreDict: (oreDictName, item, metadata = 0) => {
    return `<ore:${oreDictName}>.add(<${item}:${metadata}>);`;
  },

  // Recipe removal
  removeRecipe: (output, metadata = 0) => {
    return `recipes.remove(<${output}:${metadata}>);`;
  },

  // Furnace recipe removal
  removeFurnaceRecipe: (output, metadata = 0) => {
    return `furnace.remove(<${output}:${metadata}>);`;
  }
};

// Example usage
console.log("// CraftTweaker Recipe Examples\n");

// Shaped recipe example: Diamond Sword with NBT
console.log("// Shaped Recipe - Enhanced Diamond Sword");
console.log(RecipeGenerator.shaped(
  "minecraft:diamond_sword",
  [" D ", " D ", " S "],
  { D: "minecraft:diamond", S: "minecraft:stick" },
  0,
  { display: { Name: "Enhanced Diamond Sword" }, Enchantments: [{ id: "sharpness", lvl: 1 }] }
));

// Shapeless recipe example: Custom Block
console.log("\n// Shapeless Recipe - Diamond Block from Diamonds");
console.log(RecipeGenerator.shapeless(
  "minecraft:diamond_block",
  ["minecraft:diamond", "minecraft:diamond", "minecraft:diamond",
   "minecraft:diamond", "minecraft:diamond", "minecraft:diamond",
   "minecraft:diamond", "minecraft:diamond", "minecraft:diamond"]
));

// Furnace recipe example
console.log("\n// Furnace Recipe - Smelting Iron Ore with XP");
console.log(RecipeGenerator.furnace(
  "minecraft:iron_ingot",
  "minecraft:iron_ore",
  0.7
));

// OreDictionary example
console.log("\n// OreDictionary Registration");
console.log(RecipeGenerator.addOreDict(
  "ingotIron",
  "minecraft:iron_ingot"
));

// Recipe using OreDictionary
console.log("\n// Recipe with OreDictionary");
console.log(RecipeGenerator.shaped(
  "minecraft:iron_block",
  ["III", "III", "III"],
  { I: "ore:ingotIron" }
));

module.exports = RecipeGenerator;