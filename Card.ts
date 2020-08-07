export default class Card {
    public readonly content: string;
    private _isFlipped: boolean = false;

    constructor(content: string) {
        this.content = content;
    }

    public get isFlipped(): boolean {
        return this._isFlipped;
    }

    public get visibleContent(): string {
        return this.isFlipped ? this.content : '';
    }

    public flip() {
        this._isFlipped = !this._isFlipped;
    }
}