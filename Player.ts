export default class Player {
    public score: number = 0;
    public name: string;

    public powerRangersNames: string[] = [
        'Jason',
        'Trini',
        'Zac',
        'Tommy'
    ];

    constructor(name: string = '') {
        this.name = !name ? this.pickPowerRangerName() : name;
    }

    private pickPowerRangerName() {
        return this.powerRangersNames[Math.floor(Math.random() * this.powerRangersNames.length)];
    }
}