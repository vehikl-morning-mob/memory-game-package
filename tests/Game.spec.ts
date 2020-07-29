import Game from '../Game';
import Card from '../Card';

jest.useFakeTimers();

enum FlipType {
    correct,
    incorrect
}

describe('Game', () => {
    let game: Game;

    function makeFlip(previousCardInteracted: number, flipType: FlipType): Card {
        const isValidSelection = (sourceContent, comparisonContent) =>
            flipType === FlipType.correct
                ? sourceContent === comparisonContent
                : sourceContent !== comparisonContent;

        const previousContent = game.cards[previousCardInteracted].content;

        for (let i = 1; i < game.cards.length; i++) {
            const newContent = game.cards[i].content;
            if (isValidSelection(newContent, previousContent)) {
                game.interactWithCard(i);
                return game.cards[i];
            }
        }
    }

    beforeEach(() => {
        game = new Game(3)
    })

    it('generates pairs of cards for the provided amount of words', () => {
        const numberOfPairs = 3;
        const game = new Game(numberOfPairs);

        expect(game.cards).toHaveLength(2 * numberOfPairs);
    });
    describe('player interaction', function () {

        it('flips the card on interaction', function () {
            game.interactWithCard(0);
            expect(game.cards[0].isFlipped).toBeTruthy();
        });

        it('flips two cards with same content and they stay flipped', () => {
            game.interactWithCard(0);
            let cardsSelected = [game.cards[0]];
            cardsSelected.push(makeFlip(0, FlipType.correct));


            jest.advanceTimersByTime(1000);

            cardsSelected.forEach((card: Card, cardIndex: number) => {
                expect(card.isFlipped).toBeTruthy();
            })
        })

        it('flips two cards with different content and they are flipped back after a second', () => {
            game.interactWithCard(0);
            let cardsSelected = [game.cards[0]];

            cardsSelected.push(makeFlip(0, FlipType.incorrect));

            cardsSelected.forEach((card: Card, cardIndex: number) => {
                expect(card.isFlipped).toBeTruthy();
            })

            jest.advanceTimersByTime(1000);

            cardsSelected.forEach((card: Card, cardIndex: number) => {
                expect(card.isFlipped).toBeFalsy();
            })
        })

        it('cannot unflip a card that is already flipped', () => {
            game.interactWithCard(0);
            game.interactWithCard(0);
            expect(game.cards[0].isFlipped).toBeTruthy();
        });

        it('disables flipping a card while pausing after flipping 2 different cards', () => {
            game.interactWithCard(0);
            for (let i = 1; i < game.cards.length; i++) {
                if (game.cards[i].content !== game.cards[0].content) {
                    game.interactWithCard(i);
                    game.interactWithCard(i + 1);
                    expect(game.cards[i + 1].isFlipped).toBeFalsy();
                    break;
                }
            }
        });

        it('informs when the game is over', () => {
            let listOfWords = game.cards.map((card: Card) => card.content);
            expect(game.isOver).toBe(false);

            listOfWords.forEach((word: string) => {
                game.cards.forEach((card: Card, cardIndex: number) => {
                    if (card.content === word) {
                        game.interactWithCard(cardIndex);
                    }
                })
            });

            expect(game.isOver).toBe(true);
        });
    });

    describe('multi-player', () => {
        it('starts with 2 players', () => {
           expect(game.player1).toBeTruthy();
           expect(game.player2).toBeTruthy();
        });

        it('counts the score of each player when player 1 scores', () => {
            game.interactWithCard(0);
            makeFlip(0, FlipType.correct);

            expect(game.player1.score).toEqual(1);
            expect(game.player2.score).toEqual(0);
        });

        it('counts the score of each player when player 2 scores', () => {
            game.interactWithCard(0);
            makeFlip(0, FlipType.incorrect);

            jest.advanceTimersByTime(1000);

            game.interactWithCard(0);
            makeFlip(0, FlipType.correct);

            expect(game.player1.score).toEqual(0);
            expect(game.player2.score).toEqual(1);
        });


        it('keeps track of whose turn it is', () => {
            expect(game.currentPlayer).toEqual('1');
            game.interactWithCard(0);

            makeFlip(0, FlipType.correct);

            jest.advanceTimersByTime(1000);

            expect(game.currentPlayer).toEqual('2');
        });
    });
});
