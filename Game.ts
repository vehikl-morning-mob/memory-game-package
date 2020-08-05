import shuffle from 'shuffle-array';
import Card from './Card';
import Player from './Player';

export default class Game {
    public cards: Card[] = [];
    public player1: Player = new Player('1');
    public player2: Player = new Player('2');
    public currentPlayer: Player;
    private cardsInteractedWith: Card[] = [];
    private static readonly INTERACTION_STACK_SIZE = 2;
    private isAllowingUserInput: boolean = true;

    constructor(numberOfPairs: number) {
        let wordsForCards: string[] = [];

        this.currentPlayer = this.player1;

        for (let i = 1; i <= numberOfPairs; i++) {
            wordsForCards.push(i.toString());
        }
        const hasDuplicatedValues = () => new Set(wordsForCards).size !== wordsForCards.length;

        if (hasDuplicatedValues()) {
            throw new Error('All words must be unique.');
        }

        for (let word of wordsForCards) {
            this.cards.push(new Card(word));
            this.cards.push(new Card(word));
        }

        shuffle(this.cards);
    }

    private increaseScoreOfCurrentPlayer() {
        this.currentPlayer.score += 1;
    }

    public interactWithCard(index: number) {
        let currentCard = this.cards[index];
        if (currentCard.isFlipped || !this.isAllowingUserInput) {
            return;
        }
        currentCard.flip();
        this.cardsInteractedWith.unshift(currentCard);
        this.cardsInteractedWith.length = Game.INTERACTION_STACK_SIZE;
        if (this.isNumberOfFlippedCardsEven() && !this.areTwoLastCardsDifferent()) {
            this.increaseScoreOfCurrentPlayer();
        }

        if (this.isNumberOfFlippedCardsEven()) {
            this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        }

        if (this.isNumberOfFlippedCardsEven() && this.areTwoLastCardsDifferent()) {
            this.isAllowingUserInput = false;
            setTimeout(this.flipLastTwoCards.bind(this), 1000);
        }
    }

    private areTwoLastCardsDifferent() {
        return this.cardsInteractedWith[0].content !== this.cardsInteractedWith[1].content;
    }

    private flipLastTwoCards() {
        this.cardsInteractedWith[0].flip();
        this.cardsInteractedWith[1].flip();
        this.isAllowingUserInput = true;
    }

    private isNumberOfFlippedCardsEven() {
        const numberOfFlippedCards = this.cards.filter((card: Card) => card.isFlipped).length;
        return numberOfFlippedCards % 2 === 0;
    }

    get isOver() {
        return this.cards.every(card => card.isFlipped);
    }

    public restart() {
        shuffle(this.cards);
        for (const card of this.cards) {
            card.flip();
        }
    }
}