const express = require('express');
const bodyParser = require('body-parser');
const { RecipeGenerator } = require('./src/generator');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/generate', (req, res) => {
  const { type, ...params } = req.body;
  let result;

  try {
    switch (type) {
      case 'shaped':
        result = RecipeGenerator.shaped(
          params.output,
          params.pattern,
          params.ingredients,
          params.metadata,
          params.nbt
        );
        break;
      case 'shapeless':
        result = RecipeGenerator.shapeless(
          params.output,
          params.ingredients,
          params.metadata,
          params.nbt
        );
        break;
      case 'furnace':
        result = RecipeGenerator.furnace(
          params.output,
          params.input,
          params.xp,
          params.metadata
        );
        break;
      case 'metalpress':
        result = RecipeGenerator.metalPress(
          params.output,
          params.input,
          params.mold,
          params.energy,
          params.metadata
        );
        break;
      case 'arcane':
        result = RecipeGenerator.arcaneWorkbench(
          params.output,
          params.aspects,
          params.pattern,
          params.ingredients,
          params.metadata,
          params.nbt
        );
        break;
      case 'infusion':
        result = RecipeGenerator.infusion(
          params.output,
          params.centralItem,
          params.ingredients,
          params.aspects,
          params.instability,
          params.metadata,
          params.nbt
        );
        break;
      case 'manainfusion':
        result = RecipeGenerator.manaInfusion(
          params.output,
          params.input,
          params.mana,
          params.catalyst,
          params.metadata
        );
        break;
      case 'elventrade':
        result = RecipeGenerator.elvenTrade(
          params.outputs,
          params.inputs
        );
        break;
      case 'runealtar':
        result = RecipeGenerator.runeAltar(
          params.output,
          params.inputs,
          params.mana,
          params.metadata
        );
        break;
      default:
        throw new Error('Invalid recipe type');
    }
    res.json({ success: true, script: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});