import { Participant } from '../types/tournament';
import { calculateBuchholz } from '../utils/tournamentUtils';

type Props = {
  participants: Participant[];
  participantsHistory: Participant[][];
};

export default function OverallTable({ participants, participantsHistory }: Props) {
  return (
    <div className="overall-section">
      <h2>Общая таблица результатов</h2>
      <table className="overall-table">
        <thead>
          <tr>
            <th>Место</th>
            <th>Игрок</th>
            <th>Рейтинг</th>
            <th>Очки</th>
            <th>Коэф. Бухгольца</th>
            <th>Партий сыграно</th>
          </tr>
        </thead>
        <tbody>
          {participants
            .sort((a, b) => 
              b.points - a.points || 
              calculateBuchholz(b, participantsHistory, participants) - calculateBuchholz(a, participantsHistory, participants) || 
              b.rating - a.rating
            )
            .map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.name} {p.surname}</td>
                <td>{p.rating}</td>
                <td>{p.points.toFixed(1)}</td>
                <td>{calculateBuchholz(p, participantsHistory, participants).toFixed(1)}</td>
                <td>{p.opponents.filter(id => id !== 'BYE').length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}