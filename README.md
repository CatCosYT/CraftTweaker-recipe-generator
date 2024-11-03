# CraftTweaker Recipe Generator

A Node.js utility for generating CraftTweaker scripts for Minecraft 1.12.2.

## Features

- Shaped crafting recipes
- Shapeless crafting recipes
- Furnace smelting recipes
- Item metadata support
- NBT data handling
- OreDictionary integration

## Usage

### Shaped Recipe

```javascript
RecipeGenerator.shaped(
  "minecraft:diamond_sword",  // output item
  [" D ", " D ", " S "],     // pattern
  {                          // ingredients
    D: "minecraft:diamond", 
    S: "minecraft:stick"
  },
  0,                         // metadata (optional)
  {                          // NBT data (optional)
    display: { 
      Name: "Enhanced Diamond Sword" 
    }
  }
);
```

### Shapeless Recipe

```javascript
RecipeGenerator.shapeless(
  "minecraft:paper",                                    // output item
  ["minecraft:reeds", "minecraft:reeds", "minecraft:reeds"], // ingredients
  0                                                    // metadata (optional)
);
```

### Furnace Recipe

```javascript
RecipeGenerator.furnace(
  "minecraft:iron_ingot",   // output item
  "minecraft:iron_ore",     // input item
  0.7,                      // XP (optional)
  0                         // metadata (optional)
);
```

### OreDictionary

```javascript
RecipeGenerator.addOreDict(
  "ingotIron",             // OreDictionary name
  "minecraft:iron_ingot",  // item
  0                        // metadata (optional)
);
```

## Running Tests

```bash
npm test
```