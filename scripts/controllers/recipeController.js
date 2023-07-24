class RecipeController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        model.addObserver('change', (data) => {
            view.render(data)
        })
        view.addObserver('search', (value) => {
            model.searchContent(value)
        });
        view.addObserver('searchTag', (tagContent)=> {
            model.searchTag(tagContent)

        })
    }

    init() {
        fetch('data/recipes.json')
            .then((res) => res.json()
            )
            .then(({recipes}) => {
                this.model.setRecipes(recipes);
            })

    }
}


export {RecipeController}

