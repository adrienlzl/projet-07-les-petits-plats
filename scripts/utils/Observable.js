export class Observable {
    constructor() {
        this.observersName = new Map();
    }


    addObserver(name, observer) {
        let observers = this.observersName.get(name);

        if (!observers) {
            observers = [];
            this.observersName.set(name, observers)
        }

        observers.push(observer);
    }


    removeObserver(name, observer) {
        let observers = this.observersName.get(name);

        if (!observers) {
            return;
        }

        const removeIndex = observers.findIndex((obs) => {
            obs === observer
        });

        if (removeIndex !== -1) {
            observers.splice(removeIndex, 1);
        }
    }

    notifyObservers(name, data) {
        const observers = this.observersName.get(name);

        if (!observers) {
            return;
        }

        observers.forEach(observer => {
            observer(data);
        });

    }
}

// export default Observable;
