import Player from '../Player';

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

    it('picks a power ranger name if no name was provided', () => {
        const player = new Player();

        expect(player.powerRangersNames).toContain(player.name);
    });
});