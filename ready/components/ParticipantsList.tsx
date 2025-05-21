import { Participant } from '../types/tournament';

type Props = {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
};

export default function ParticipantsList({ participants}: Props) {
  

  return (
    <div className="participants-list">
      {participants.length > 0 && (
        <>
          <h3>Зарегистрированные участники:</h3>
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Рейтинг</th>
                
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.name}</td>
                  <td>{participant.surname}</td>
                  <td>{participant.rating}</td>
                  <td>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}