import {Observable} from '../utils/Observable.js';


export class RecipesModel extends Observable {
    constructor() {
        super();
        this.recipes = [];
        this.recipesFiltered = [];
        this.value = "";
        this.tagContent = {
            ingredientsTag: [], // Initialisez les tags des ingrédients avec un tableau vide par défaut
            ustensilsTag: [], // Initialisez les tags des ustensiles avec un tableau vide par défaut
            applianceTag: [] // Initialisez les tags des appareils avec un tableau vide par défaut
        };
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
        return (
            tagsAppliance.length === 0 ||
            tagsAppliance.some((tagAppliance) => {
                return recipe.appliance.toLowerCase().includes(tagAppliance.toLowerCase());
            })
        );
    }

    checkTagsUstensils(recipe, tagsUstensils) {
        return (
            tagsUstensils.length === 0 ||
            tagsUstensils.every((tagUstensil) => {
                return recipe.ustensils.some((ustensil) =>
                    ustensil.toLowerCase().includes(tagUstensil.toLowerCase())
                );
            })
        );
    }

    searchContent({ value }) {
        this.value = value;
        this.updateFiltered();
    }

    searchTag(tagContent) {
        this.tagContent = tagContent;
        this.updateFiltered();
    }

    setRecipes(recipes, tagsIngredient, tagsAppliance, tagsUstensils) {
        this.recipes = recipes;
        this.tagContent = {
            ingredientsTag: tagsIngredient || [], // Initialisez les tags des ingrédients avec un tableau vide par défaut si tagsIngredient est undefined
            ustensilsTag: tagsUstensils || [], // Initialisez les tags des ustensiles avec un tableau vide par défaut si tagsUstensils est undefined
            applianceTag: tagsAppliance || [] // Initialisez les tags des appareils avec un tableau vide par défaut si tagsAppliance est undefined
        };
        this.updateFiltered();
    }

    updateFiltered() {
        this.recipesFiltered = [];

        for (let i = 0; i < this.recipes.length; i++) {
            const recipe = this.recipes[i];
            const searchMatch =
                recipe.name.toLowerCase().includes(this.value.toLowerCase()) ||
                recipe.description.toLowerCase().includes(this.value.toLowerCase()) ||
                recipe.ingredients.some((ingredient) =>
                    ingredient.ingredient.toLowerCase().includes(this.value.toLowerCase())
                );

            const tagsMatch =
                this.checkTagsIngredient(recipe, this.tagContent.ingredientsTag) &&
                this.checkTagsAppliance(recipe, this.tagContent.applianceTag) &&
                this.checkTagsUstensils(recipe, this.tagContent.ustensilsTag);

            if (searchMatch && tagsMatch) {
                this.recipesFiltered.push(recipe);
            }
        }

        this.change();
    }

    change() {
        this.notifyObservers('change', {
            recipes: this.recipesFiltered
        });
    }
}