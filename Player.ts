export default class Player {
    public score: number = 0;
    public name: string;

    constructor(name: string = '') {
        this.name = !name ? Player.pickPowerRangerName() : name;
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