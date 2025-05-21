import { Match, Participant } from '../types/tournament';


type Props = {
  rounds: Match[][];
  selectedRound: number;
  setSelectedRound: (round: number) => void;
  participantsHistory: Participant[][];
};

export default function PairingsSection({
  rounds,
  selectedRound,
  setSelectedRound,
  participantsHistory
}: Props) {
  return (
    <div className="pairings-section">
      <h2>Пары по доскам</h2>
      <div className="rounds-tabs">
        {rounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedRound(index + 1)}
            className={`tab ${selectedRound === index + 1 ? 'active' : ''}`}
          >
            Тур {index + 1}
          </button>
        ))}
      </div>

      <table className="board-pairs">
        <thead>
          <tr>
            <th>Номер</th>
            <th colSpan={3}>White</th>
            <th>Результат</th>
            <th colSpan={3}>Black</th>
            <th>Номер</th>
          </tr>
          <tr>
            <th></th>
            <th>Имя</th>
            <th>Рейтинг</th>
            <th>Очки</th>
            <th></th>
            <th>Очки</th>
            <th>Имя</th>
            <th>Рейтинг</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rounds[selectedRound - 1]?.map((match) => {
            const roundParticipants = participantsHistory[selectedRound - 1] || [];
            const whitePlayer = roundParticipants.find(p => p.id === match.player1);
            const blackPlayer = roundParticipants.find(p => p.id === match.player2);
            
            return (
              <tr key={match.id}>
                <td>{whitePlayer?.registrationNumber}</td>
                <td>{whitePlayer?.name} {whitePlayer?.surname}</td>
                <td>{whitePlayer?.rating}</td>
                <td>{whitePlayer?.points.toFixed(1)}</td>
                <td>
                  {match.result === 'win1' && '1-0'}
                  {match.result === 'win2' && '0-1'}
                  {match.result === 'draw' && '½-½'}
                  {!match.result && '-'}
                </td>
                <td>{blackPlayer?.points.toFixed(1) || '-'}</td>
                <td>{blackPlayer ? `${blackPlayer.name} ${blackPlayer.surname}` : 'BYE'}</td>
                <td>{blackPlayer?.rating || '-'}</td>
                <td>{blackPlayer?.registrationNumber || '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}