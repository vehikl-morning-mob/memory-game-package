import Card from "../Card";

describe('Card', () => {
    let card: Card;
    const GIVEN_TEXT = 'cat';

    beforeEach(() => {
        card = new Card(GIVEN_TEXT);
    });

    it('is instantiated not flipped by default', () => {
        expect(card.isFlipped).toBe(false);
    });

    it('is flippable', () => {
        card.flip();

        expect(card.isFlipped).toBe(true);
    });

    it('does not display content if not flipped', () => {
        expect(card.visibleContent).toEqual('');
    });

    it('displays content if flipped', () => {
        card.flip();

        expect(card.visibleContent).toEqual(GIVEN_TEXT);
    });
});