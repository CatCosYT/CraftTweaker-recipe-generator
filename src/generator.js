class RecipeGenerator {
  static shaped(output, pattern, ingredients, metadata = 0, nbt = null) {
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
  }

  static shapeless(output, ingredients, metadata = 0, nbt = null) {
    const outputStr = nbt 
      ? `<${output}:${metadata}>.withTag(${JSON.stringify(nbt)})` 
      : `<${output}:${metadata}>`;
    
    const ingredientStr = ingredients
      .map(ing => ing.startsWith("ore:") ? ing : `<${ing}>`)
      .join(', ');

    return `recipes.addShapeless(${outputStr}, [${ingredientStr}]);`;
  }

  static furnace(output, input, xp = 0.0, metadata = 0) {
    const inputStr = input.startsWith("ore:") ? input : `<${input}>`;
    return `furnace.addRecipe(<${output}:${metadata}>, ${inputStr}, ${xp});`;
  }

  static metalPress(output, input, mold, energy = 2400, metadata = 0) {
    const outputStr = `<${output}:${metadata}>`;
    const inputStr = input.startsWith("ore:") ? input : `<${input}>`;
    const moldStr = `<${mold}>`;
    return `mods.immersiveengineering.MetalPress.addRecipe(${outputStr}, ${inputStr}, ${moldStr}, ${energy});`;
  }

  static arcaneWorkbench(output, aspects, pattern, ingredients, metadata = 0, nbt = null) {
    const outputStr = nbt 
      ? `<${output}:${metadata}>.withTag(${JSON.stringify(nbt)})` 
      : `<${output}:${metadata}>`;
    
    const patternStr = pattern
      .map(row => `"${row}"`)
      .join(', ');
    
    const ingredientStr = Object.entries(ingredients)
      .map(([key, value]) => `${key}, ${value.startsWith("ore:") ? value : `<${value}>`}`)
      .join(', ');

    const aspectStr = Object.entries(aspects)
      .map(([aspect, amount]) => `"${aspect}": ${amount}`)
      .join(', ');

    return `mods.thaumcraft.ArcaneWorkbench.registerShapedRecipe(
      "${output}_recipe", 
      {${aspectStr}}, 
      ${outputStr}, 
      [${patternStr}], 
      {${ingredientStr}}
    );`;
  }

  static infusion(output, centralItem, ingredients, aspects, instability = 0, metadata = 0, nbt = null) {
    const outputStr = nbt 
      ? `<${output}:${metadata}>.withTag(${JSON.stringify(nbt)})` 
      : `<${output}:${metadata}>`;
    
    const centralStr = centralItem.startsWith("ore:") ? centralItem : `<${centralItem}>`;
    
    const ingredientStr = ingredients
      .map(ing => ing.startsWith("ore:") ? ing : `<${ing}>`)
      .join(', ');

    const aspectStr = Object.entries(aspects)
      .map(([aspect, amount]) => `<aspect:${aspect}> * ${amount}`)
      .join(', ');

    return `mods.thaumcraft.Infusion.registerRecipe(
      "${output}_recipe",
      "${output}",
      ${outputStr},
      ${instability},
      [${aspectStr}],
      ${centralStr},
      [${ingredientStr}]
    );`;
  }

  static manaInfusion(output, input, mana = 2000, catalyst = null, metadata = 0) {
    const outputStr = `<${output}:${metadata}>`;
    const inputStr = input.startsWith("ore:") ? input : `<${input}>`;
    const catalystStr = catalyst ? `, <${catalyst}>` : '';
    
    return `mods.botania.ManaInfusion.addInfusion(${outputStr}, ${inputStr}, ${mana}${catalystStr});`;
  }

  static elvenTrade(outputs, inputs) {
    const outputStr = outputs
      .map(out => `<${out}>`)
      .join(', ');
    
    const inputStr = inputs
      .map(inp => inp.startsWith("ore:") ? inp : `<${inp}>`)
      .join(', ');

    return `mods.botania.ElvenTrade.addRecipe([${outputStr}], [${inputStr}]);`;
  }

  static runeAltar(output, inputs, mana = 5000, metadata = 0) {
    const outputStr = `<${output}:${metadata}>`;
    const inputStr = inputs
      .map(inp => inp.startsWith("ore:") ? inp : `<${inp}>`)
      .join(', ');

    return `mods.botania.RuneAltar.addRecipe(${outputStr}, [${inputStr}], ${mana});`;
  }
}

module.exports = { RecipeGenerator };