// Dinner Planner offline app
const LS_DISHES_KEY = "dp_dishes_v1";
const LS_LIKES_KEY = "dp_likes_v1";
const LS_PLAN_KEY  = "dp_plan_v1";
const LS_PEOPLE_KEY = "dp_people_v1";

const DEFAULT_DISHES = [
  {
    "name": "Lemon Herb Roast Chicken & Potatoes",
    "tags": [
      "Chicken",
      "Tray-bake",
      "GF"
    ],
    "ingredients": [
      {
        "item": "Chicken thighs (boneless)",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Baby potatoes (roasted)",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Olive oil",
        "qty": 1,
        "unit": "tbsp"
      },
      {
        "item": "Green beans",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 74,
      "carbs_g": 61,
      "fat_g": 24,
      "calories": 750
    }
  },
  {
    "name": "Peri-Peri Chicken with Rice",
    "tags": [
      "Chicken",
      "Spicy"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Cooked brown rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Peri-peri sauce",
        "qty": 1,
        "unit": "tbsp"
      },
      {
        "item": "Broccoli florets",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 60,
      "carbs_g": 45,
      "fat_g": 7,
      "calories": 480
    }
  },
  {
    "name": "Chicken Tikka Masala (Light)",
    "tags": [
      "Chicken",
      "Curry"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Cooked basmati rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Light coconut milk",
        "qty": 0.5,
        "unit": "cup"
      },
      {
        "item": "Masala sauce",
        "qty": 0.5,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 62,
      "carbs_g": 48,
      "fat_g": 31,
      "calories": 720
    }
  },
  {
    "name": "Honey Garlic Chicken Stir-Fry",
    "tags": [
      "Chicken",
      "Stir-fry",
      "Quick"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Stir-fry veg mix",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Cooked rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Olive oil",
        "qty": 1,
        "unit": "tbsp"
      }
    ],
    "macros": {
      "protein_g": 60,
      "carbs_g": 45,
      "fat_g": 21,
      "calories": 610
    }
  },
  {
    "name": "Greek Chicken with Orzo",
    "tags": [
      "Chicken",
      "Mediterranean"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Cooked orzo pasta",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Feta (crumbled)",
        "qty": 30,
        "unit": "g"
      },
      {
        "item": "Spinach",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 64,
      "carbs_g": 37,
      "fat_g": 16,
      "calories": 550
    }
  },
  {
    "name": "Chicken Fajita Skillet",
    "tags": [
      "Chicken",
      "Tex-Mex",
      "GF"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 170,
        "unit": "g"
      },
      {
        "item": "Bell pepper",
        "qty": 1,
        "unit": "pc"
      },
      {
        "item": "Onion",
        "qty": 0.5,
        "unit": "pc"
      },
      {
        "item": "Cooked rice",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 57,
      "carbs_g": 45,
      "fat_g": 7,
      "calories": 470
    }
  },
  {
    "name": "Chicken Pesto Pasta",
    "tags": [
      "Chicken",
      "Pasta"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 150,
        "unit": "g"
      },
      {
        "item": "Cooked wholewheat pasta",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Pesto",
        "qty": 1,
        "unit": "tbsp"
      },
      {
        "item": "Cherry tomatoes",
        "qty": 6,
        "unit": "pc"
      }
    ],
    "macros": {
      "protein_g": 54,
      "carbs_g": 37,
      "fat_g": 7,
      "calories": 420
    }
  },
  {
    "name": "Chicken & Veggie Sheet Pan",
    "tags": [
      "Chicken",
      "Tray-bake",
      "GF"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 170,
        "unit": "g"
      },
      {
        "item": "Courgette",
        "qty": 0.5,
        "unit": "pc"
      },
      {
        "item": "Red pepper",
        "qty": 0.5,
        "unit": "pc"
      },
      {
        "item": "Baby potatoes",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 56,
      "carbs_g": 26,
      "fat_g": 6,
      "calories": 380
    }
  },
  {
    "name": "Soy-Ginger Chicken with Quinoa",
    "tags": [
      "Chicken",
      "Asian"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 170,
        "unit": "g"
      },
      {
        "item": "Cooked quinoa",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Edamame",
        "qty": 0.5,
        "unit": "cup"
      },
      {
        "item": "Spring onion",
        "qty": 1,
        "unit": "pc"
      }
    ],
    "macros": {
      "protein_g": 61,
      "carbs_g": 39,
      "fat_g": 10,
      "calories": 490
    }
  },
  {
    "name": "Butter Chicken (Lightened)",
    "tags": [
      "Chicken",
      "Curry"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 170,
        "unit": "g"
      },
      {
        "item": "Cooked basmati rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Light cream sauce",
        "qty": 0.5,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 57,
      "carbs_g": 45,
      "fat_g": 7,
      "calories": 470
    }
  },
  {
    "name": "Chicken & Chickpea Tagine",
    "tags": [
      "Chicken",
      "Moroccan"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Chickpeas",
        "qty": 0.75,
        "unit": "cup"
      },
      {
        "item": "Couscous (cooked)",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 67,
      "carbs_g": 62,
      "fat_g": 9,
      "calories": 590
    }
  },
  {
    "name": "BBQ Chicken Sweet Potato",
    "tags": [
      "Chicken",
      "BBQ",
      "GF"
    ],
    "ingredients": [
      {
        "item": "Pulled chicken",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Sweet potato (roasted)",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "BBQ sauce",
        "qty": 1,
        "unit": "tbsp"
      }
    ],
    "macros": {
      "protein_g": 53,
      "carbs_g": 26,
      "fat_g": 6,
      "calories": 370
    }
  },
  {
    "name": "Beef & Broccoli",
    "tags": [
      "Beef",
      "Stir-fry",
      "GF"
    ],
    "ingredients": [
      {
        "item": "Beef strips",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Broccoli florets",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Cooked rice",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 51,
      "carbs_g": 45,
      "fat_g": 18,
      "calories": 550
    }
  },
  {
    "name": "Chili Con Carne",
    "tags": [
      "Beef",
      "Stew"
    ],
    "ingredients": [
      {
        "item": "Lean ground beef",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Kidney beans",
        "qty": 0.75,
        "unit": "cup"
      },
      {
        "item": "Tomato passata",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 58,
      "carbs_g": 26,
      "fat_g": 20,
      "calories": 520
    }
  },
  {
    "name": "Korean Beef Bowl",
    "tags": [
      "Beef",
      "Asian"
    ],
    "ingredients": [
      {
        "item": "Lean ground beef",
        "qty": 170,
        "unit": "g"
      },
      {
        "item": "Cooked rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Spring onion",
        "qty": 1,
        "unit": "pc"
      }
    ],
    "macros": {
      "protein_g": 48,
      "carbs_g": 45,
      "fat_g": 18,
      "calories": 530
    }
  },
  {
    "name": "Steak & Garlic Green Beans",
    "tags": [
      "Beef",
      "Low-carb",
      "GF"
    ],
    "ingredients": [
      {
        "item": "Steak (cooked)",
        "qty": 200,
        "unit": "g"
      },
      {
        "item": "Green beans",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Butter",
        "qty": 1,
        "unit": "tbsp"
      }
    ],
    "macros": {
      "protein_g": 67,
      "carbs_g": 35,
      "fat_g": 34,
      "calories": 710
    }
  },
  {
    "name": "Beef Lasagne (Light)",
    "tags": [
      "Beef",
      "Pasta",
      "Oven"
    ],
    "ingredients": [
      {
        "item": "Lean ground beef",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Wholewheat lasagne (cooked)",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Mozzarella",
        "qty": 40,
        "unit": "g"
      }
    ],
    "macros": {
      "protein_g": 52,
      "carbs_g": 0,
      "fat_g": 28,
      "calories": 460
    }
  },
  {
    "name": "Pork Tenderloin & Veg",
    "tags": [
      "Pork",
      "GF",
      "Oven"
    ],
    "ingredients": [
      {
        "item": "Pork tenderloin (cooked)",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Roast veg mix",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Baby potatoes",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 43,
      "carbs_g": 26,
      "fat_g": 22,
      "calories": 470
    }
  },
  {
    "name": "Pulled Pork Tacos",
    "tags": [
      "Pork",
      "Tex-Mex"
    ],
    "ingredients": [
      {
        "item": "Pulled pork",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Tortilla",
        "qty": 2,
        "unit": "pc"
      },
      {
        "item": "Salsa",
        "qty": 2,
        "unit": "tbsp"
      }
    ],
    "macros": {
      "protein_g": 43,
      "carbs_g": 48,
      "fat_g": 25,
      "calories": 590
    }
  },
  {
    "name": "Pork & Apple Tray Bake",
    "tags": [
      "Pork",
      "Tray-bake"
    ],
    "ingredients": [
      {
        "item": "Pork chops (cooked)",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Apple (slices)",
        "qty": 0.5,
        "unit": "pc"
      },
      {
        "item": "Baby potatoes",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 43,
      "carbs_g": 26,
      "fat_g": 22,
      "calories": 470
    }
  },
  {
    "name": "Meatballs & Marinara",
    "tags": [
      "Beef",
      "Pasta"
    ],
    "ingredients": [
      {
        "item": "Beef meatballs",
        "qty": 5,
        "unit": "pc"
      },
      {
        "item": "Cooked wholewheat pasta",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Marinara",
        "qty": 0.5,
        "unit": "cup"
      },
      {
        "item": "Parmesan",
        "qty": 20,
        "unit": "g"
      }
    ],
    "macros": {
      "protein_g": 59,
      "carbs_g": 37,
      "fat_g": 26,
      "calories": 610
    }
  },
  {
    "name": "Beef Stir-Fry Udon",
    "tags": [
      "Beef",
      "Stir-fry"
    ],
    "ingredients": [
      {
        "item": "Beef strips",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Cooked udon noodles",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Stir-fry veg mix",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 42,
      "carbs_g": 0,
      "fat_g": 16,
      "calories": 310
    }
  },
  {
    "name": "Salmon & Dill Potatoes",
    "tags": [
      "Fish",
      "GF",
      "Oven"
    ],
    "ingredients": [
      {
        "item": "Baked salmon",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Baby potatoes",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Green beans",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 63,
      "carbs_g": 61,
      "fat_g": 27,
      "calories": 740
    }
  },
  {
    "name": "Miso Salmon with Rice",
    "tags": [
      "Fish",
      "Asian"
    ],
    "ingredients": [
      {
        "item": "Baked salmon",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Cooked rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Edamame",
        "qty": 0.5,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 44,
      "carbs_g": 45,
      "fat_g": 21,
      "calories": 550
    }
  },
  {
    "name": "Cod with Lemon & Greens",
    "tags": [
      "Fish",
      "GF",
      "Low-carb"
    ],
    "ingredients": [
      {
        "item": "Baked cod",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Asparagus",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Olive oil",
        "qty": 1,
        "unit": "tbsp"
      }
    ],
    "macros": {
      "protein_g": 43,
      "carbs_g": 0,
      "fat_g": 18,
      "calories": 330
    }
  },
  {
    "name": "Prawn Stir-Fry",
    "tags": [
      "Seafood",
      "Quick"
    ],
    "ingredients": [
      {
        "item": "Prawns (cooked)",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Stir-fry veg mix",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Cooked rice",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 47,
      "carbs_g": 45,
      "fat_g": 4,
      "calories": 410
    }
  },
  {
    "name": "Tuna Steak & Quinoa",
    "tags": [
      "Fish",
      "GF"
    ],
    "ingredients": [
      {
        "item": "Tuna steak (cooked)",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Cooked quinoa",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Broccoli florets",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 55,
      "carbs_g": 39,
      "fat_g": 22,
      "calories": 570
    }
  },
  {
    "name": "Fish Tacos",
    "tags": [
      "Fish",
      "Tex-Mex"
    ],
    "ingredients": [
      {
        "item": "White fish (cooked)",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Tortilla",
        "qty": 2,
        "unit": "pc"
      },
      {
        "item": "Slaw mix",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 8,
      "carbs_g": 48,
      "fat_g": 6,
      "calories": 280
    }
  },
  {
    "name": "Garlic Butter Prawns & Pasta",
    "tags": [
      "Seafood",
      "Pasta"
    ],
    "ingredients": [
      {
        "item": "Prawns (cooked)",
        "qty": 170,
        "unit": "g"
      },
      {
        "item": "Cooked wholewheat pasta",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Butter",
        "qty": 1,
        "unit": "tbsp"
      }
    ],
    "macros": {
      "protein_g": 48,
      "carbs_g": 37,
      "fat_g": 16,
      "calories": 480
    }
  },
  {
    "name": "Mediterranean Baked Cod",
    "tags": [
      "Fish",
      "Mediterranean"
    ],
    "ingredients": [
      {
        "item": "Baked cod",
        "qty": 170,
        "unit": "g"
      },
      {
        "item": "Cherry tomatoes",
        "qty": 8,
        "unit": "pc"
      },
      {
        "item": "Olives",
        "qty": 6,
        "unit": "pc"
      },
      {
        "item": "Cooked couscous",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 47,
      "carbs_g": 36,
      "fat_g": 4,
      "calories": 370
    }
  },
  {
    "name": "Teriyaki Salmon Bowl",
    "tags": [
      "Fish",
      "Asian"
    ],
    "ingredients": [
      {
        "item": "Baked salmon",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Cooked rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Broccoli florets",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 44,
      "carbs_g": 45,
      "fat_g": 21,
      "calories": 550
    }
  },
  {
    "name": "Smoky Paprika Prawns",
    "tags": [
      "Seafood",
      "GF"
    ],
    "ingredients": [
      {
        "item": "Prawns (cooked)",
        "qty": 170,
        "unit": "g"
      },
      {
        "item": "Roast veg mix",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Cooked quinoa",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 49,
      "carbs_g": 39,
      "fat_g": 7,
      "calories": 410
    }
  },
  {
    "name": "Chickpea & Spinach Curry",
    "tags": [
      "Veg",
      "Vegan",
      "Curry"
    ],
    "ingredients": [
      {
        "item": "Chickpeas",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Light coconut milk",
        "qty": 0.5,
        "unit": "cup"
      },
      {
        "item": "Cooked basmati rice",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 22,
      "carbs_g": 83,
      "fat_g": 28,
      "calories": 670
    }
  },
  {
    "name": "Tofu Peanut Stir-Fry",
    "tags": [
      "Veg",
      "Vegan",
      "Stir-fry"
    ],
    "ingredients": [
      {
        "item": "Firm tofu",
        "qty": 200,
        "unit": "g"
      },
      {
        "item": "Stir-fry veg mix",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Rice noodles (cooked)",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 24,
      "carbs_g": 48,
      "fat_g": 12,
      "calories": 400
    }
  },
  {
    "name": "Lentil Bolognese Pasta",
    "tags": [
      "Veg",
      "Pasta"
    ],
    "ingredients": [
      {
        "item": "Cooked green lentils",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Cooked wholewheat pasta",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Tomato passata",
        "qty": 0.75,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 22,
      "carbs_g": 72,
      "fat_g": 4,
      "calories": 420
    }
  },
  {
    "name": "Halloumi & Couscous Bowl",
    "tags": [
      "Veg",
      "Mediterranean"
    ],
    "ingredients": [
      {
        "item": "Halloumi (grilled)",
        "qty": 100,
        "unit": "g"
      },
      {
        "item": "Cooked couscous",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Roast veg mix",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 6,
      "carbs_g": 36,
      "fat_g": 0,
      "calories": 170
    }
  },
  {
    "name": "Black Bean Enchilada Skillet",
    "tags": [
      "Veg",
      "Tex-Mex"
    ],
    "ingredients": [
      {
        "item": "Black beans",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Tortilla",
        "qty": 2,
        "unit": "pc"
      },
      {
        "item": "Cheddar",
        "qty": 40,
        "unit": "g"
      }
    ],
    "macros": {
      "protein_g": 33,
      "carbs_g": 83,
      "fat_g": 21,
      "calories": 650
    }
  },
  {
    "name": "Miso-Glazed Aubergine & Rice",
    "tags": [
      "Veg",
      "Asian",
      "Vegan"
    ],
    "ingredients": [
      {
        "item": "Aubergine (roasted)",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Cooked rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Tofu (baked)",
        "qty": 150,
        "unit": "g"
      }
    ],
    "macros": {
      "protein_g": 19,
      "carbs_g": 47,
      "fat_g": 10,
      "calories": 350
    }
  },
  {
    "name": "Veggie Fried Rice with Edamame",
    "tags": [
      "Veg",
      "Vegan",
      "Quick"
    ],
    "ingredients": [
      {
        "item": "Cooked rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Edamame",
        "qty": 0.75,
        "unit": "cup"
      },
      {
        "item": "Mixed veg",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 4,
      "carbs_g": 45,
      "fat_g": 0,
      "calories": 200
    }
  },
  {
    "name": "Tempeh Burrito Bowl",
    "tags": [
      "Veg",
      "Vegan"
    ],
    "ingredients": [
      {
        "item": "Tempeh (cooked)",
        "qty": 200,
        "unit": "g"
      },
      {
        "item": "Cooked brown rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Black beans",
        "qty": 0.75,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 51,
      "carbs_g": 81,
      "fat_g": 19,
      "calories": 700
    }
  },
  {
    "name": "Greek Bean & Feta Salad",
    "tags": [
      "Veg",
      "Mediterranean"
    ],
    "ingredients": [
      {
        "item": "Cannellini beans",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Feta",
        "qty": 40,
        "unit": "g"
      },
      {
        "item": "Cherry tomatoes",
        "qty": 8,
        "unit": "pc"
      }
    ],
    "macros": {
      "protein_g": 25,
      "carbs_g": 35,
      "fat_g": 15,
      "calories": 380
    }
  },
  {
    "name": "Butternut Squash & Chickpea Tagine",
    "tags": [
      "Veg",
      "Moroccan",
      "Vegan"
    ],
    "ingredients": [
      {
        "item": "Chickpeas",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Cooked couscous",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Roast butternut squash",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 21,
      "carbs_g": 71,
      "fat_g": 4,
      "calories": 400
    }
  },
  {
    "name": "Cottage Cheese Protein Pasta",
    "tags": [
      "Veg",
      "High-protein"
    ],
    "ingredients": [
      {
        "item": "Cottage cheese",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Cooked wholewheat pasta",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Peas",
        "qty": 0.5,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 7,
      "carbs_g": 37,
      "fat_g": 2,
      "calories": 190
    }
  },
  {
    "name": "Veggie Lentil Shepherd\u2019s Pie",
    "tags": [
      "Veg",
      "Oven"
    ],
    "ingredients": [
      {
        "item": "Cooked green lentils",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Mashed potatoes",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Mixed veg",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 18,
      "carbs_g": 61,
      "fat_g": 3,
      "calories": 340
    }
  },
  {
    "name": "Chicken & Veg Soup",
    "tags": [
      "Soup",
      "Chicken",
      "Low-cal"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Mixed veg",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Potatoes (diced)",
        "qty": 0.5,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 51,
      "carbs_g": 13,
      "fat_g": 6,
      "calories": 310
    }
  },
  {
    "name": "Beef & Barley Soup",
    "tags": [
      "Soup",
      "Beef"
    ],
    "ingredients": [
      {
        "item": "Lean beef (diced)",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Barley (cooked)",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Mixed veg",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 42,
      "carbs_g": 0,
      "fat_g": 16,
      "calories": 310
    }
  },
  {
    "name": "Turkey Chili",
    "tags": [
      "Stew",
      "Turkey",
      "High-protein"
    ],
    "ingredients": [
      {
        "item": "Lean ground turkey",
        "qty": 180,
        "unit": "g"
      },
      {
        "item": "Kidney beans",
        "qty": 0.75,
        "unit": "cup"
      },
      {
        "item": "Tomato passata",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 63,
      "carbs_g": 26,
      "fat_g": 8,
      "calories": 430
    }
  },
  {
    "name": "Minestrone with Chicken",
    "tags": [
      "Soup",
      "Pasta"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 140,
        "unit": "g"
      },
      {
        "item": "Cooked small pasta",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Mixed veg",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 50,
      "carbs_g": 37,
      "fat_g": 7,
      "calories": 410
    }
  },
  {
    "name": "Thai Red Curry (Chicken)",
    "tags": [
      "Curry",
      "Chicken"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 170,
        "unit": "g"
      },
      {
        "item": "Light coconut milk",
        "qty": 0.5,
        "unit": "cup"
      },
      {
        "item": "Cooked jasmine rice",
        "qty": 1,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 59,
      "carbs_g": 48,
      "fat_g": 31,
      "calories": 700
    }
  },
  {
    "name": "White Bean & Kale Stew",
    "tags": [
      "Soup",
      "Veg",
      "Vegan"
    ],
    "ingredients": [
      {
        "item": "Cannellini beans",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Kale",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Potatoes (diced)",
        "qty": 0.5,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 16,
      "carbs_g": 48,
      "fat_g": 3,
      "calories": 290
    }
  },
  {
    "name": "Seafood Chowder (Light)",
    "tags": [
      "Soup",
      "Seafood"
    ],
    "ingredients": [
      {
        "item": "White fish (cooked)",
        "qty": 150,
        "unit": "g"
      },
      {
        "item": "Prawns (cooked)",
        "qty": 80,
        "unit": "g"
      },
      {
        "item": "Light cream",
        "qty": 0.5,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 19,
      "carbs_g": 0,
      "fat_g": 2,
      "calories": 90
    }
  },
  {
    "name": "Beef & Tomato One-Pot Pasta",
    "tags": [
      "Beef",
      "Pasta",
      "One-pot"
    ],
    "ingredients": [
      {
        "item": "Lean ground beef",
        "qty": 160,
        "unit": "g"
      },
      {
        "item": "Cooked wholewheat pasta",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Tomato passata",
        "qty": 0.75,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 49,
      "carbs_g": 37,
      "fat_g": 18,
      "calories": 500
    }
  },
  {
    "name": "Chicken Jambalaya",
    "tags": [
      "Chicken",
      "Rice",
      "One-pot"
    ],
    "ingredients": [
      {
        "item": "Chicken breast",
        "qty": 170,
        "unit": "g"
      },
      {
        "item": "Cooked rice",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Chorizo (optional)",
        "qty": 30,
        "unit": "g"
      }
    ],
    "macros": {
      "protein_g": 57,
      "carbs_g": 45,
      "fat_g": 7,
      "calories": 470
    }
  },
  {
    "name": "Tofu & Veg Hotpot",
    "tags": [
      "Veg",
      "Vegan",
      "One-pot"
    ],
    "ingredients": [
      {
        "item": "Firm tofu",
        "qty": 200,
        "unit": "g"
      },
      {
        "item": "Mixed veg",
        "qty": 1,
        "unit": "cup"
      },
      {
        "item": "Potatoes (diced)",
        "qty": 0.5,
        "unit": "cup"
      }
    ],
    "macros": {
      "protein_g": 22,
      "carbs_g": 16,
      "fat_g": 12,
      "calories": 260
    }
  }
];

function loadDishes() {
  const raw = localStorage.getItem(LS_DISHES_KEY);
  if (!raw) return DEFAULT_DISHES;
  try { return JSON.parse(raw); } catch { return DEFAULT_DISHES; }
}
function saveDishes(d) { localStorage.setItem(LS_DISHES_KEY, JSON.stringify(d, null, 2)); }

function loadLikes() { try { return JSON.parse(localStorage.getItem(LS_LIKES_KEY) || "{}"); } catch { return {}; } }
function saveLikes(l) { localStorage.setItem(LS_LIKES_KEY, JSON.stringify(l)); }

function loadPlan() { try { return JSON.parse(localStorage.getItem(LS_PLAN_KEY) || "null"); } catch { return null; } }
function savePlan(p) { localStorage.setItem(LS_PLAN_KEY, JSON.stringify(p)); }

function pickRandom(arr, k, weights=null) {
  const pool = arr.slice();
  const w = weights ? weights.slice() : null;
  const chosen = [];
  while (chosen.length < Math.min(k, pool.length)) {
    let idx;
    if (w) {
      const total = w.reduce((s, v)=> s + v, 0);
      let r = Math.random() * total;
      for (let i=0;i<w.length;i++){ r -= w[i]; if (r <= 0){ idx = i; break; } }
    } else { idx = Math.floor(Math.random() * pool.length); }
    chosen.push(pool.splice(idx,1)[0]);
    if (w) w.splice(idx,1);
  }
  return chosen;
}

function buildWeights(dishes, likes) {
  // Favourited dishes get 2x weight
  return dishes.map(d => likes[d.name] ? 2 : 1);
}

function aggregateIngredients(plan) {
  const people = getPeople();
  const map = new Map();
  for (const d of plan) {
    for (const ing of d.ingredients) {
      const key = `${ing.item}|${ing.unit}`;
      map.set(key, (map.get(key) || 0) + Number(ing.qty) * people);
    }
  }
  return Array.from(map.entries()).map(([key, qty]) => {
    const [item, unit] = key.split("|");
    return { item, qty, unit };
  }).sort((a,b)=> a.item.localeCompare(b.item));
}

function renderShoppingList(ings) {
  const ul = document.getElementById("shoppingList");
  ul.innerHTML = "";
  ings.forEach(({item, qty, unit}) => {
    const li = document.createElement("li");
    li.className = "check";
    li.textContent = `☐ ${item} — ${qty} ${unit}`;
    ul.appendChild(li);
  });
}

function renderPlan(plan, likes, allDishes) {
  const people = getPeople();
  const container = document.getElementById("plan");
  container.innerHTML = "";
  plan.forEach((dish, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    const liked = !!likes[dish.name];
    const tags = (dish.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
    card.innerHTML = `
      <div class="title-row">
        <div>
          <strong>${dish.name}</strong>
          <span class="pill">Day ${idx+1}</span>
          ${tags}
          <div class="small">≈ ${dish.macros?.calories || "—"} kcal · ${dish.macros?.protein_g || "—"}g P · ${dish.macros?.carbs_g || "—"}g C · ${dish.macros?.fat_g || "—"}g F <br/>Total for ${people}: ≈ ${(dish.macros?.calories||0)*people} kcal · ${(dish.macros?.protein_g||0)*people}g P · ${(dish.macros?.carbs_g||0)*people}g C · ${(dish.macros?.fat_g||0)*people}g F</div>
        </div>
        <div class="row">
          <button class="ghost" data-like="${idx}">${liked ? "⭐" : "☆"}</button>
          <button data-swap="${idx}">↔ Swap</button>
        </div>
      </div>
      <div class="small">Serves: ${people} — totals shown below.</div>
      <ul>${dish.ingredients.map(i => `<li class="check">☐ ${i.item} — ${Number(i.qty)*people} ${i.unit}</li>`).join("")}</ul>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll("[data-swap]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-swap"));
      const namesInPlan = new Set(plan.map(p => p.name));
      const candidates = allDishes.filter(d => !namesInPlan.has(d.name));
      const weights = buildWeights(candidates, likes);
      const replacement = pickRandom(candidates, 1, weights)[0] || allDishes[Math.floor(Math.random()*allDishes.length)];
      plan[i] = replacement;
      savePlan(plan);
      renderPlan(plan, likes, allDishes);
      renderShoppingList(aggregateIngredients(plan));
    });
  });

  container.querySelectorAll("[data-like]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-like"));
      const name = plan[i].name;
      likes[name] = !likes[name];
      saveLikes(likes);
      renderPlan(plan, likes, allDishes);
    });
  });

  // tick-off behaviour
  container.querySelectorAll('.check').forEach(li => {
    li.addEventListener('click', () => {
      const t = li.textContent;
      if (t.startsWith('☐')) {
        li.textContent = t.replace('☐','☑');
        li.style.textDecoration = 'line-through';
        li.style.opacity = '0.7';
      } else {
        li.textContent = t.replace('☑','☐');
        li.style.textDecoration = '';
        li.style.opacity = '1';
      }
    });
  });
}

function listToText(ings) {
  const people = getPeople();
  return ings.map(i => `• ${i.item} — ${i.qty} ${i.unit}`).join("\\n");
}

async function shareText(text) {
  if (navigator.share && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
    try { await navigator.share({ text }); return true; } catch(e) {}
  }
  try { await navigator.clipboard.writeText(text); alert("Copied to clipboard!"); return true; }
  catch(e) { window.prompt("Copy this shopping list:", text); }
}

function init() {

function getPeople(){ return Math.max(1, parseInt(localStorage.getItem(LS_PEOPLE_KEY) || "1")); }
function setPeople(n){ localStorage.setItem(LS_PEOPLE_KEY, String(n)); }


  let dishes = loadDishes();
  const likes = loadLikes();
  const plan = loadPlan();

  // populate days select
  const daysSel = document.getElementById("days");
  [3,4,5,6,7].forEach(v => {
    const opt = document.createElement("option");
    opt.value = v; opt.textContent = v;
    if (v === 7) opt.selected = true;
    daysSel.appendChild(opt);
  });

  // people selector
  const peopleInput = document.getElementById("people");
  peopleInput.value = getPeople();
  peopleInput.addEventListener("change", () => {
    const n = Math.max(1, Math.min(12, parseInt(peopleInput.value || "1")));
    peopleInput.value = n;
    setPeople(n);
    const currentPlan = loadPlan() || [];
    renderPlan(currentPlan, likes, dishes);
    renderShoppingList(aggregateIngredients(currentPlan));
  });


  const editor = document.getElementById("dishesEditor");
  editor.value = JSON.stringify(dishes, null, 2);
  document.getElementById("saveDishes").addEventListener("click", () => {
    try {
      const parsed = JSON.parse(editor.value);
      if (!Array.isArray(parsed)) throw new Error("Top-level JSON must be an array of dishes.");
      saveDishes(parsed);
      dishes = parsed;
      alert("Dishes saved on this device.");
    } catch (e) { alert("Invalid JSON: " + e.message); }
  });

  const daysSel = document.getElementById("days");

  function buildPlan() {
    const days = Number(daysSel.value);
    const weights = buildWeights(dishes, likes);
    const selection = pickRandom(dishes, days, weights.slice());
    savePlan(selection);
    renderPlan(selection, likes, dishes);
    renderShoppingList(aggregateIngredients(selection));
  }

  document.getElementById("randomize").addEventListener("click", buildPlan);
  document.getElementById("rebuild").addEventListener("click", () => {
    const p = loadPlan() || [];
    renderShoppingList(aggregateIngredients(p));
  });
  document.getElementById("clearLikes").addEventListener("click", () => {
    localStorage.removeItem(LS_LIKES_KEY);
    alert("Cleared favourites.");
    renderPlan(loadPlan()||[], {}, dishes);
  });
  document.getElementById("shareList").addEventListener("click", () => {
    const p = loadPlan() || [];
    shareText(listToText(aggregateIngredients(p)));
  });

  if (plan) {
    renderPlan(plan, likes, dishes);
    renderShoppingList(aggregateIngredients(plan));
  } else {
    buildPlan();
  }
}

window.addEventListener("load", init);

// Service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}
