const createNewElement = (element, classes = null, attributes = null, text = null ) => {
    const newElement = document.createElement(element);
    if (classes !== null) {
        classes.forEach((classe) => {
            newElement.classList.add(classe);
        });
    }
    if (attributes !== null) {
        attributes.forEach((attribut) => {
            newElement.setAttribute(attribut.attribute, attribut.content);
        });
    }
    if (text !== null) {
        newElement.innerText = text;
    }
    return newElement;
}