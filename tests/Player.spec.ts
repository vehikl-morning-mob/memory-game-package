import Player from '../Player';
import Card from '../Card';

describe('Player', () => {
    it('starts with a score of 0', () => {
        const player = new Player();
        expect(player.score).toEqual(0);
    });

    it('has a name property', () => {
        const playerName = "Alex";

        const player = new Player(playerName);

        expect(player.name).toEqual(playerName);
    });

    it('gives a name if no name was provided', () => {
        const player = new Player();

        expect(player.name).not.toBeFalsy();
    });

    it('can own a pair of cards', () => {
        const player = new Player();
        const cardOne = new Card('1');
        const cardTwo = new Card('1');

        player.ownPair(cardOne, cardTwo);

        expect(player.cardsOwned).toContain(cardOne);
        expect(player.cardsOwned).toContain(cardTwo);
    });

    it('knows when they own a card', () => {
        const player = new Player();
        const cardOne = new Card('1');
        const cardTwo = new Card('1');
        const cardTheyDoNotOwn = new Card('2');

        player.ownPair(cardOne, cardTwo);

        expect(player.ownsCard(cardOne)).toBe(true);
        expect(player.ownsCard(cardTwo)).toBe(true);
        expect(player.ownsCard(cardTheyDoNotOwn)).toBe(false);
    });
});