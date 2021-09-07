const quarter = String.fromCharCode(0x00BC);
const half = String.fromCharCode(189);
const third = String.fromCharCode(0x2153);

const RECIPE_DATA = {
  chickenfingers: {
    id: '0001',
    name: 'Chicken Fingers',
    linkUrl: 'chickenfingers',
    recipe: {
      ingredients: [
        'Marinade:',
        '1 Egg',
        '1 cup of Buttermilk',
        `1 ${half} teaspoon Garlic powder`,
        '1 teaspoon Smoked Paprika',
        '1 teaspoon Kosher Salt',
        `${half} teaspoon Ground Black Pepper`,
        '',
        'Breading:',
        '3 cups Panko',
        '1 tablespoon Kosher Salf',
        '2 teaspoons Ground Black Pepper',
        '1 teaspoon Onion Powder',
        '1 teaspooon Garlic Powder',
        '1 teaspoon Smoked Paprika',
        `${half} cup Parmesean`,
        '1 tablespoon Italian Seasoning'
      ]
    }
  },
  chickenmarinade: {
    id: '0002',
    name: 'Chicken Marinade',
    linkUrl: 'chickenmarinade',
    recipe: {
      ingredients: [
        '1 cup Olive Oil',
        '1 cup Lemon Juice',
        '4 tablespoons Greek Seasoning',
        '2 tablespoons Kosher Salt',
        '2 tablespoons Cracked Black Pepper',
        '1 tablespoon Oregano',
        '1 teaspoon Thyme',
        '1 tablespoon Chopped Garlic',
        `${half} teaspoon Smoked Paprika`
      ]
    }
  },
  coleslaw: {
    id: '0003',
    name: 'Coleslaw',
    linkUrl: 'coleslaw',
    recipe: {
      ingredients: [
        `1 Cabbage, chopped`,
        `1 Carrot, shredded`,
        `2 Celery Stalks, diced`,
        `1 Red Onion, diced`,
        `1 tablesppon Greek Seasoning`,
        `1 teaspoon Thyme`,
        `1 teaspoon Onion Powder`,
        `1 teaspoon Ground Black Pepper`,
        `${half} teaspoon Smoked Paprika`,
        `1 tablespoon Kosher Salt`,
        `3 tablespoons White Sugar`,
        `1 tablespoon Chopped Garlic`,
        `${quarter} cup Olive Oil`,
        `${quarter} cup White Vinegar`,
        `1 tablespoon Lemon Juice`,
        `2 cups Mayo`,
        `${quarter} cup Yellow Mustard`
      ],
      notes: `Adjust according to Cabbage size`
    }
  },
  fishbatter: {
    id: '0004',
    name: 'Fish Batter',
    linkUrl: 'fishbatter',
    recipe: {
      ingredients: [
        'Batter:',
        '10 oz. Lemon Juice',
        '20 oz. Rickards Red',
        '30 oz. Cold Water',
        `5 ${half} cups Flour`,
        '4 heaping teaspoons Baking Powder',
        '5 heaping teaspoons Lemon Pepper',
        '3 tablespoons Dried Dill',
        '1 tablespoon Coriander',
        '2 tablespoons Kosher Salt',
        '1 teaspoon Ground Black Pepper',
        `${half} teaspoon Smoked Paprika`,
        '',
        'Dredge:',
        '2 cups flour',
        '1 tablespoon Coriander',
        '1 teaspoon Ground Black Pepper',
      ],
      notes: `Combine all dry ingredients for batter and mix well. Combine all wet ingredients. Mix both together with whisk until the consistiency of thickish pancake mix (adding water or flour if needed). Let sit for 10 minutes. Whisk before using.`
    }
  },
  frenchonionsoup: {
    id: '0005',
    name: 'French Onion Soup',
    linkUrl: 'frenchonionsoup',
    recipe: {
      ingredients: [
        `${quarter} cup Olive Oil`,
        `4 large Red Onions`,
        `2 teaspoons Chopped Garlic`,
        `1 cup Red Wine`,
        `1 teaspoon Oregano`,
        `1 teaspoon Rosemary`,
        `1 teaspoon Thyme`,
        `1 teaspoon Kosher Salt`,
        `${half} teaspoon Ground Black Pepper`,
        `1 cup Beef Soup Base Concentrate`,
        `Cold Water`
      ],
      notes: `Sautee Onions and Garlic in Olive Oil. De glaze with Red Wine when onions are transparent. Add Spices and Beef Soup Base Concentrate. Fill pot to top with cold Water and brind to boil. Turn off and taste, add Salt/Pepper if needed`
    }
  },
  garlicbutter: {
    id: '0006',
    name: 'Garlic Butter',
    linkUrl: 'garlicbutter',
    recipe: {
      ingredients: [
        `${half} container of Margerine`,
        `${half} cup of Chopped Garlic`,
        '1 tablespoon Worcestershire Sauce',
        '2 teaspoons Garlic Powder',
        '1 teaspoon Onion Powder',
        '1 teaspoon Oregano',
        '2 teaspoons Rosemary',
        '2 teaspoons Thyme',
        '1 tablespoon Kosher Salt',
        `${half} teaspoon Ground Black Pepper`
      ]
    }
  },
  guacamole: {
    id: '0007',
    name: 'Guacamole',
    linkUrl: 'guacamole',
    recipe: {
      ingredients: [
        '3 Avocados, mashed',
        '2 Roma Tomatoes, diced',
        `${half} cup diced Red Onion`,
        '1 tablespoon Chopped Garlic',
        '1 Lime, juiced',
        '1 teaspoon Kosher Salt',
        '3 tablespoon chopped Cilantro'
      ]
    }
  },
  marinara: {
    id: '0008',
    name: 'Marinara Sauce',
    linkUrl: 'marinara',
    recipe: {
      ingredients: [
        `1 28oz. can San Mazrano tomatoes`,
        `${quarter} cup Extra Virgin Olive Oil`,
        `7 cloves Garlic, slivered`,
        `Pinch of Crushed Chilies`,
        `1 teaspoon Kosher Salt`,
        `1 large Fresh Basil Sprig`,
        `1+ cup Water`
      ],
      notes: `Pour tomatoes in bowl and crush by hand. Pour 1 cup Water in can and slosh around. Set aside. In large skillet (not pot) over medium heat, heat oil, add Garlic. Soon as it sizzles (don't brown), add Tomatoes, then can of Water. Simmer until thickened and oil on surface is deep orange (approx 15 min.), place Basil sprid on sauce and let wilt, submerge. Discard Basil`
    }
  },
  obatzda: {
    id: '0009',
    name: 'Obatzda',
    linkUrl: 'obatzda',
    recipe: {
      ingredients: [
        `1 Large White Onion, roughly diced`,
        `1 lb Camembert/Brie cheese, cubed`,
        `6 tablespoons Butter`,
        `1 cup Cream Cheese`,
        `1 teaspoon Smoked Paprika`,
        `1 teaspoon Ground Black Pepper`,
        `1 tablespoon Kosher Salt`,
        `8 tablespoons Wheat Beer (Creemore)`
      ],
      notes: `Pulse in food processor.`
    }
  },
  beefrub: {
    id: '0010',
    name: 'Roast-beef Rub',
    linkUrl: 'beefrub',
    recipe: {
      ingredients: [
        '4 tablespoons Kosher Salt',
        '2 tablespoons Cracked Black Pepper',
        '1 tablespoon Smoked Paprika',
        '1 tablespoon Rosemary',
        '1 tablespoon Onion Powder',
        '2 tablespoons Chopped Garlic'
      ]
    }
  },
  rosemaryaioli: {
    id: '0011',
    name: 'Rosemary Aioli',
    linkUrl: 'rosemaryaioli',
    recipe: {
      ingredients: [
        `${half} container of Mayo`,
        `3 tablespoons Chopped Garlic`,
        `2 tablespoons Rosemary`,
        `1 teaspoon Onion Powder`,
        `1 teaspoon Kosher Salt`,
        `${half} teaspoon Ground Black Pepper`
      ]
    }
  },
  sriracha: {
    id: '0012',
    name: 'Sriracha',
    linkUrl: 'sriracha',
    recipe: {
      ingredients: [
        `Mayo`,
        `Sriracha`
      ]
    }
  },
  tartar: {
    id: '0013',
    name: 'Tartar Sauce',
    linkUrl: 'tartar',
    recipe: {
      ingredients: [
        `${half} container of Mayo`,
        `1 container of Sour Cream`,
        `${third} cup of Mustard`,
        `3 cups of Relish`,
        `1 tablespoon of Garlic`,
        `${quarter} cup of Lemon Juice`,
        `2 tablespoons Dry Dill`,
        `2 teaspoons Kosher Salt`,
        `1 teaspoon Ground Black Pepper`,
        `${half} teaspoon Paprika`,
        `1 Red Onion, finely diced`
      ]
    },
  },
  tzatziki: {
    id: '0014',
    name: 'Tzatziki',
    linkUrl: 'tzatziki',
    recipe: {
      ingredients: [
        '2 containers Greek Yogurt',
        '2 tablespoons Lemon Juice',
        '3 tablespoons Olive Oil',
        '2 teaspoons Chopped Garlic',
        '1 Cucumber, shredded',
        '3 tablespoon of Fresh Dill/1 tablespoon Dried Dill',
        `${half} teaspoon Kosher Salt`,
        `${half} teaspoon Ground Black Pepper`,
        `${half} teaspooon Onion Powder`,
      ]
    }
  },
};

export default RECIPE_DATA;