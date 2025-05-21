import { Participant } from '../types/tournament';

type Props = {
  participants: Participant[];
  rounds: any[];
};

export default function ResultsSection({ participants, rounds}: Props) {
  return (
    <div className="results-section">
      <h2>Итоговые результаты</h2>
      <div className="player-results">
        {participants.map(p => (
          <div key={p.id} className="player-card">
            <h4>{p.name} {p.surname}</h4>
            <p>Общее количество очков: {p.points.toFixed(1)}</p>
            <div className="match-history">
              <h5>История матчей:</h5>
              {rounds.map((round, ri) => {
                const match = round.find((m: any) => 
                  m.player1 === p.id || m.player2 === p.id
                );
                
                if (!match) return null;

                const isPlayer1 = match.player1 === p.id;
                const opponentId = isPlayer1 ? match.player2 : match.player1;
                const opponent = participants.find(op => op.id === opponentId)?.surname || 'BYE';

                let result;
                if (match.result === 'draw') {
                  result = 'Ничья';
                } else if (isPlayer1) {
                  result = match.result === 'win1' ? 'Победа' : 'Поражение';
                } else {
                  result = match.result === 'win2' ? 'Победа' : 'Поражение';
                }

                return (
                  <div key={ri} className="match-result">
                    Тур {ri + 1}: vs {opponent} - {result}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}