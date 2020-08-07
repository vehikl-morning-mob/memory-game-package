import Card from "./Card";

export default class Player {
    public name: string;
    public cardsOwned: Card[] = [];

    get score(): number {
        return this.cardsOwned.length / 2;
    }

    constructor(name: string = '') {
        this.name = !name ? Player.pickPowerRangerName() : name;
    }

    public ownPair(cardOne: Card, cardTwo: Card) {
        this.cardsOwned.push(cardOne, cardTwo);
    }

    public ownsCard(card: Card): boolean {
        return this.cardsOwned.includes(card);
    }

    private static pickPowerRangerName() {
        const powerRangersNames: string[] = [
            'Jason',
            'Trini',
            'Zac',
            'Tommy'
        ];
        return powerRangersNames[Math.floor(Math.random() * powerRangersNames.length)];
    }
}