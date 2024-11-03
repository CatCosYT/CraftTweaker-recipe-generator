let currentRecipeType = 'shaped';

function switchRecipeType(type) {
    document.querySelectorAll('.recipe-form').forEach(form => form.classList.add('hidden'));
    document.getElementById(`${type}-form`).classList.remove('hidden');
    
    document.querySelectorAll('.recipe-type-selector button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`button[onclick="switchRecipeType('${type}')"]`).classList.add('active');
    
    currentRecipeType = type;
}

function addIngredient(btn) {
    const container = btn.parentElement.parentElement;
    const newRow = document.createElement('div');
    newRow.className = 'ingredient-row';
    newRow.innerHTML = `
        <input type="text" placeholder="minecraft:item_name">
        <button onclick="removeIngredient(this)">-</button>
    `;
    container.appendChild(newRow);
}

function addOutput(btn) {
    const container = btn.parentElement.parentElement;
    const newRow = document.createElement('div');
    newRow.className = 'output-row';
    newRow.innerHTML = `
        <input type="text" placeholder="minecraft:item_name">
        <button onclick="removeOutput(this)">-</button>
    `;
    container.appendChild(newRow);
}

function addAspect(btn) {
    const container = btn.parentElement.parentElement;
    const newRow = document.createElement('div');
    newRow.className = 'aspect-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Aspect name" class="aspect-name">
        <input type="number" value="1" min="1" class="aspect-amount">
        <button onclick="removeAspect(this)">-</button>
    `;
    container.appendChild(newRow);
}

function removeIngredient(btn) {
    btn.parentElement.remove();
}

function removeOutput(btn) {
    btn.parentElement.remove();
}

function removeAspect(btn) {
    btn.parentElement.remove();
}

function getShapedRecipeData() {
    const grid = [];
    const ingredients = {};
    let symbols = 'ABCDEFGHI';
    let symbolIndex = 0;

    for (let i = 0; i < 3; i++) {
        let row = '';
        for (let j = 0; j < 3; j++) {
            const input = document.querySelector(`input[data-pos="${i},${j}"]`);
            const value = input.value.trim();
            
            if (value) {
                const symbol = symbols[symbolIndex];
                row += symbol;
                ingredients[symbol] = value;
                symbolIndex++;
            } else {
                row += ' ';
            }
        }
        grid.push(row);
    }

    return {
        type: 'shaped',
        output: document.getElementById('shaped-output').value,
        pattern: grid,
        ingredients,
        metadata: parseInt(document.getElementById('shaped-metadata').value) || 0
    };
}

function getShapelessRecipeData() {
    const ingredients = Array.from(
        document.querySelectorAll('#shapeless-form .ingredient-row input')
    ).map(input => input.value.trim()).filter(Boolean);

    return {
        type: 'shapeless',
        output: document.getElementById('shapeless-output').value,
        ingredients,
        metadata: parseInt(document.getElementById('shapeless-metadata').value) || 0
    };
}

function getFurnaceRecipeData() {
    return {
        type: 'furnace',
        input: document.getElementById('furnace-input').value,
        output: document.getElementById('furnace-output').value,
        xp: parseFloat(document.getElementById('furnace-xp').value) || 0,
        metadata: parseInt(document.getElementById('furnace-metadata').value) || 0
    };
}

function getMetalPressRecipeData() {
    return {
        type: 'metalpress',
        input: document.getElementById('metalpress-input').value,
        mold: document.getElementById('metalpress-mold').value,
        output: document.getElementById('metalpress-output').value,
        energy: parseInt(document.getElementById('metalpress-energy').value) || 2400,
        metadata: parseInt(document.getElementById('metalpress-metadata').value) || 0
    };
}

function getArcaneWorkbenchData() {
    const grid = [];
    const ingredients = {};
    let symbols = 'ABCDEFGHI';
    let symbolIndex = 0;

    for (let i = 0; i < 3; i++) {
        let row = '';
        for (let j = 0; j < 3; j++) {
            const input = document.querySelector(`input[data-arcane-pos="${i},${j}"]`);
            const value = input.value.trim();
            
            if (value) {
                const symbol = symbols[symbolIndex];
                row += symbol;
                ingredients[symbol] = value;
                symbolIndex++;
            } else {
                row += ' ';
            }
        }
        grid.push(row);
    }

    const aspects = {};
    document.querySelectorAll('#arcane-form .aspect-row').forEach(row => {
        const name = row.querySelector('.aspect-name').value.trim();
        const amount = parseInt(row.querySelector('.aspect-amount').value) || 1;
        if (name) {
            aspects[name] = amount;
        }
    });

    return {
        type: 'arcane',
        output: document.getElementById('arcane-output').value,
        pattern: grid,
        ingredients,
        aspects,
        metadata: parseInt(document.getElementById('arcane-metadata').value) || 0
    };
}

function getInfusionData() {
    const ingredients = Array.from(
        document.querySelectorAll('#infusion-form .ingredient-row input')
    ).map(input => input.value.trim()).filter(Boolean);

    const aspects = {};
    document.querySelectorAll('#infusion-form .aspect-row').forEach(row => {
        const name = row.querySelector('.aspect-name').value.trim();
        const amount = parseInt(row.querySelector('.aspect-amount').value) || 1;
        if (name) {
            aspects[name] = amount;
        }
    });

    return {
        type: 'infusion',
        output: document.getElementById('infusion-output').value,
        centralItem: document.getElementById('infusion-central').value,
        ingredients,
        aspects,
        instability: parseInt(document.getElementById('infusion-instability').value) || 0,
        metadata: parseInt(document.getElementById('infusion-metadata').value) || 0
    };
}

function getManaInfusionData() {
    return {
        type: 'manainfusion',
        input: document.getElementById('manainfusion-input').value,
        output: document.getElementById('manainfusion-output').value,
        mana: parseInt(document.getElementById('manainfusion-mana').value) || 2000,
        catalyst: document.getElementById('manainfusion-catalyst').value || null,
        metadata: parseInt(document.getElementById('manainfusion-metadata').value) || 0
    };
}

function getElvenTradeData() {
    const inputs = Array.from(
        document.querySelectorAll('#elventrade-form .ingredient-row input')
    ).map(input => input.value.trim()).filter(Boolean);

    const outputs = Array.from(
        document.querySelectorAll('#elventrade-form .output-row input')
    ).map(input => input.value.trim()).filter(Boolean);

    return {
        type: 'elventrade',
        inputs,
        outputs
    };
}

function getRuneAltarData() {
    const inputs = Array.from(
        document.querySelectorAll('#runealtar-form .ingredient-row input')
    ).map(input => input.value.trim()).filter(Boolean);

    return {
        type: 'runealtar',
        output: document.getElementById('runealtar-output').value,
        inputs,
        mana: parseInt(document.getElementById('runealtar-mana').value) || 5000,
        metadata: parseInt(document.getElementById('runealtar-metadata').value) || 0
    };
}

async function generateRecipe() {
    let data;
    switch (currentRecipeType) {
        case 'shaped':
            data = getShapedRecipeData();
            break;
        case 'shapeless':
            data = getShapelessRecipeData();
            break;
        case 'furnace':
            data = getFurnaceRecipeData();
            break;
        case 'metalpress':
            data = getMetalPressRecipeData();
            break;
        case 'arcane':
            data = getArcaneWorkbenchData();
            break;
        case 'infusion':
            data = getInfusionData();
            break;
        case 'manainfusion':
            data = getManaInfusionData();
            break;
        case 'elventrade':
            data = getElvenTradeData();
            break;
        case 'runealtar':
            data = getRuneAltarData();
            break;
    }

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById('recipe-output').textContent = result.script;
        } else {
            document.getElementById('recipe-output').textContent = `Error: ${result.error}`;
        }
    } catch (error) {
        document.getElementById('recipe-output').textContent = `Error: ${error.message}`;
    }
}

function copyToClipboard() {
    const output = document.getElementById('recipe-output');
    navigator.clipboard.writeText(output.textContent)
        .then(() => alert('Copied to clipboard!'))
        .catch(err => console.error('Failed to copy:', err));
}

// Initialize with shaped recipe form
switchRecipeType('shaped');