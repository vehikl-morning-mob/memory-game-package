import Player from '../Player';

describe('Player', () => {
   it ('starts with a score of 0', () => {
       const player = new Player();
       expect(player.score).toEqual(0);
   });
});