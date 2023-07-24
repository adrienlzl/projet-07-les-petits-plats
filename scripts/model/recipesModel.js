import {Observable} from '../utils/Observable.js';

export class RecipesModel extends Observable {
    constructor() {
        super();
        this.recipes = [];
        this.recipesFiltered = [];
        this.value = "";
        this.newRecipes = [];
        this.tagContent = [];
    }
    checkTagsIngredient(recipe, tagsIngredient) {
        return (
            tagsIngredient.length === 0 ||
            tagsIngredient.every((tagIngredient) => {
                return (
                    recipe.name.toLowerCase().includes(tagIngredient.toLowerCase()) ||
                    recipe.description.toLowerCase().includes(tagIngredient.toLowerCase()) ||
                    recipe.ingredients.some((ingredient) =>
                        ingredient.ingredient.toLowerCase().includes(tagIngredient.toLowerCase())
                    )
                );
            })
        );
    }
    checkTagsAppliance(recipe, tagsAppliance) {
        const result = (
            tagsAppliance.length === 0 ||
            tagsAppliance.some((tagAppliance) => {
                return (
                    recipe.appliance.toLowerCase().includes(tagAppliance.toLowerCase())
                );
            })
        );

        return result;
    }

    checkTagsUstensils(recipe, tagsUstensils) {
        const result = (
            tagsUstensils.length === 0 ||
            tagsUstensils.every((tagUstensil) => {
                return recipe.ustensils.some((ustensil) =>
                    ustensil.toLowerCase().includes(tagUstensil.toLowerCase())
                );
            })
        );

        return result;
    }

    searchContent({value}) {
        this.value = value;
        this.updateFiltered();
    }
    searchTag(tagContent) {
        this.tagContent = tagContent
        this.updateFiltered()
    }
    setRecipes(recipes) {
        this.recipes = recipes;
        this.updateFiltered();
    }

    updateFiltered() {
        this.recipesFiltered = this.recipes;
        let newRecipes = [];
        let value = this.value;
        let tagsIngredient = this.tagContent.ingredientsTag;
        let tagsUstensils = this.tagContent.ustensilsTag;
        let tagsAppliance = this.tagContent.applianceTag;
        let noResult = false

        if (value !== "") {
            this.recipes.forEach((recipe) => {
                if (
                    recipe.name.toLowerCase().includes(value) ||
                    recipe.description.toLowerCase().includes(value) ||
                    recipe.ingredients.some(
                        (ingredient) => ingredient.ingredient.toLowerCase().includes(value)
                    )
                ) {
                    noResult = false
                    newRecipes.push(recipe);
                }
                if (newRecipes.length === 0) {
                    noResult = true
                }
            });
        }
        //newRecipes = newRecipes.length = 0 ? this.recipes : newRecipes;
        if (
            (tagsIngredient && tagsIngredient.length > 0) ||
            (tagsAppliance && tagsAppliance.length > 0) ||
            (tagsUstensils && tagsUstensils.length > 0)
        ) {
            if (newRecipes && newRecipes.length > 0) {
                newRecipes = newRecipes.filter((recipe) => {
                    return (
                        this.checkTagsIngredient(recipe, tagsIngredient) &&
                        this.checkTagsAppliance(recipe, tagsAppliance) &&
                        this.checkTagsUstensils(recipe, tagsUstensils)
                    );
                });
            } else {
                newRecipes = this.recipes.filter((recipe) => {
                    return (
                        this.checkTagsIngredient(recipe, tagsIngredient) &&
                        this.checkTagsAppliance(recipe, tagsAppliance) &&
                        this.checkTagsUstensils(recipe, tagsUstensils)
                    );
                });
            }
        }

        if (newRecipes.length !== 0) {
            this.recipesFiltered = newRecipes;
        }
        if (noResult === true) {
            this.recipesFiltered = [];
        }
        this.change();
    }


    change() {
        this.notifyObservers('change', {
            recipes: this.recipesFiltered
        });

    }

}
