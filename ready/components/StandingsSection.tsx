import { Participant } from '../types/tournament';

type Props = {
  participantsHistory: Participant[][];
  selectedRound: number;
  setSelectedRound: (round: number) => void;
  rounds: any[];
};

export default function StandingsSection({
  participantsHistory,
  selectedRound,
  setSelectedRound,
  rounds
}: Props) {
  return (
    <div className="standings-section">
      <h2>Положение после тура</h2>
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
      
      <table className="tournament-standings">
        <thead>
          <tr>
            <th>Место</th>
            <th>Имя</th>
            <th>Рейтинг</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          {participantsHistory[selectedRound - 1]
            ?.sort((a, b) => b.points - a.points || b.rating - a.rating)
            .map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.name} {p.surname}</td>
                <td>{p.rating}</td>
                <td>{p.points.toFixed(1)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}