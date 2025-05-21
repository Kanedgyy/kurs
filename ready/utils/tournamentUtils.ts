import { Participant, Match } from '../types/tournament';

export const calculateBuchholz = (participant: Participant, participantsHistory: Participant[][], participants: Participant[]) => {
  const finalState = participantsHistory[participantsHistory.length - 1] || participants;
  return participant.opponents.reduce((sum, opponentId) => {
    if (opponentId === 'BYE') return sum;
    const opponent = finalState.find(p => p.id === opponentId);
    return sum + (opponent?.points || 0);
  }, 0);
};

export const createByeMatch = (player: Participant): Match => ({
  id: Date.now() + Math.random(),
  player1: player.id,
  player2: 'BYE',
  result: 'win1'
});

export const createMatch = (player1: Participant, player2: Participant): Match => ({
  id: Date.now() + Math.random(),
  player1: player1.id,
  player2: player2.id,
  result: ''
});