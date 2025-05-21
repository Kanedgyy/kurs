import { useState } from 'react';
import { Participant } from '../types/tournament';

type Props = {
  participantsCount: string;
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
};

export default function ParticipantForm({ 
  participantsCount,
  participants,
  setParticipants 
}: Props) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [rating, setRating] = useState('');

  const handleAddParticipant = () => {
    const newParticipant: Participant = {
      id: `${name}-${surname}-${Date.now()}`,
      registrationNumber: participants.length + 1,
      name,
      surname,
      rating: Number(rating),
      points: 0,
      opponents: [],
      hasBye: false,
      gamesPlayed: 0
    };
    setParticipants([...participants, newParticipant]);
    setName('');
    setSurname('');
    setRating('');
  };

  return (
    <div className="participants-form">
      <h3>Добавить участника ({participants.length}/{participantsCount})</h3>
      <div className="input-group">
        <input
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Фамилия"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="number"
          placeholder="Рейтинг"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button
          onClick={handleAddParticipant}
          disabled={
            !name || 
            !surname || 
            !rating || 
            participants.length >= Number(participantsCount) || 
            !participantsCount 
          }
        >
          Добавить
        </button>
      </div>
    </div>
  );
}