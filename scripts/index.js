import { RecipeController } from "./controllers/recipeController.js";
import { RecipeView } from "./views/recipeView.js";
import { RecipesModel } from "./model/recipesModel.js";

function main() {
    const model = new RecipesModel();
    const view = new RecipeView();
    const controller = new RecipeController(model, view);
    controller.init();


}
main();

