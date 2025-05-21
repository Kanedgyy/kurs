import { Match, Participant } from '../types/tournament';
import MatchComponent from './Match';

type Props = {
  currentRound: number;
  roundsCount: string;
  matches: Match[];
  participants: Participant[];
  isTournamentFinished: boolean;
  setMatches: (matches: Match[]) => void;
  handleFinishRound: () => void;
};

export default function RoundsSection({
  currentRound,
  roundsCount,
  matches,
  participants,
  isTournamentFinished,
  setMatches,
  handleFinishRound
}: Props) {
  
  return (
    <div className="rounds-section">
      <h2>Тур {currentRound} из {roundsCount}</h2>
      <div className="matches-list">
        {matches.map((match) => (
          <MatchComponent
            key={match.id}
            match={match}
            participants={participants}
            setMatches={setMatches}
            matches={matches}
          />
        ))}
      </div>
      <button 
        className="primary-button"
        onClick={handleFinishRound}
        disabled={
          matches.some(m => !m.result && m.player2 !== 'BYE') || 
          isTournamentFinished
        }
      >
        {currentRound < Number(roundsCount) ? 'Следующий тур' : 'Завершить турнир'}
      </button>
    </div>
  );
}