import { useEffect } from 'react';
import { Match, MatchResult, Participant } from '../types/tournament';

type Props = {
  match: Match;
  participants: Participant[];
  matches: Match[];
  setMatches: (matches: Match[]) => void;
};

export default function MatchComponent({ match, participants, matches, setMatches }: Props) {
  useEffect(() => {
    if (match.player2 === 'BYE' && match.result !== 'win1') {
      const newMatches = matches.map(m => 
        m.id === match.id ? {...m, result: 'win1' as MatchResult} : m
      );
      setMatches(newMatches);
    }
  }, [match, matches, setMatches]);


  const player1 = participants.find(p => p.id === match.player1);
  const player2 = participants.find(p => p.id === match.player2);

  const handleResultChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMatches = matches.map(m => 
      m.id === match.id ? {...m, result: e.target.value as MatchResult} : m
    );
    setMatches(newMatches);
  };

  return (
    <div className="match">
      <div className="players">
        <span>{player1?.name} {player1?.surname}</span>
        <span>vs</span>
        <span>{player2 ? `${player2.name} ${player2.surname}` : 'BYE'}</span>
      </div>
      <select
        value={match.result}
        onChange={handleResultChange}
        disabled={match.player2 === 'BYE'}
      >
        <option value="">Выберите результат</option>
        <option value="win1">Победа {player1?.name}</option>
        {player2 && <option value="win2">Победа {player2.name}</option>}
        {player2 && <option value="draw">Ничья</option>}
      </select>
    </div>
  );
}
