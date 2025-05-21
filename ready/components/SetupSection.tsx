
import { Participant } from '../types/tournament';
import ParticipantForm from './ParticipantForm';
import ParticipantsList from './ParticipantsList';

type Props = {
  participantsCount: string;
  roundsCount: string;
  participants: Participant[];
  setParticipantsCount: (value: string) => void;
  setRoundsCount: (value: string) => void;
  setParticipants: (participants: Participant[]) => void;
  showRoundError: boolean;
  setShowRoundError: (value: boolean) => void;
};

export default function SetupSection({
  participantsCount,
  roundsCount,
  participants,
  setParticipantsCount,
  setRoundsCount,
  setParticipants,
  showRoundError,
  setShowRoundError
}: Props) {
  return (
    <div className="setup-section">
      <h2>Настройка турнира</h2>
      <div className="settings">
        <label>
          Количество участников:
          <input
            type="number"
            value={participantsCount}
            onChange={(e) => setParticipantsCount(e.target.value)}
            disabled={participants.length > 0}
            min="2"
          />
        </label>
        <label>
          Количество туров:
          <input
            type="number"
            value={roundsCount}
            disabled={participants.length > 0}
            onChange={(e) => {
              setRoundsCount(e.target.value);
              setShowRoundError(false);
            }}
            min="1"
            className={showRoundError ? 'error-input' : ''}
          />
          {showRoundError && (
            <span className="error-text">Пожалуйста, укажите количество туров</span>
          )}
        </label>
      </div>
      
      <ParticipantForm
        participantsCount={participantsCount}
        participants={participants}
        setParticipants={setParticipants}
      />
      
      <ParticipantsList
        participants={participants}
        setParticipants={setParticipants}
      />
    </div>
  );
}