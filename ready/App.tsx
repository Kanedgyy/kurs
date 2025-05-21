import { useState, useEffect } from 'react';
import { Participant, Match } from './types/tournament';
import { createByeMatch, createMatch, calculateBuchholz } from './utils/tournamentUtils';
import Navbar from './components/Navbar';
import SetupSection from './components/SetupSection';
import RoundsSection from './components/RoundsSection';
import StandingsSection from './components/StandingsSection';
import PairingsSection from './components/PairingsSection';
import ResultsSection from './components/ResultsSection';
import OverallTable from './components/OverallTable';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'



export default function SwissTournament() {
  
  const [participantsCount, setParticipantsCount] = useState('');
  const [roundsCount, setRoundsCount] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [rounds, setRounds] = useState<Match[][]>([]);
  const [selectedRound, setSelectedRound] = useState(1);
  const [participantsHistory, setParticipantsHistory] = useState<Participant[][]>([]);
  const [showRoundError, setShowRoundError] = useState(false);
  const [isTournamentFinished, setIsTournamentFinished] = useState(false);

  

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/rounds' && rounds.length < currentRound) {
      generatePairings();
    }
  }, [location.pathname, currentRound, rounds.length]);

  const generatePairings = () => {
  if (participants.length === 0) return;

    
    const sorted = [...participants].sort((a, b) => 
      b.points - a.points || 
      calculateBuchholz(b, participantsHistory, participants) - calculateBuchholz(a, participantsHistory, participants) || 
      b.rating - a.rating
    );
  const pairs: Match[] = [];
  const used = new Set<string>();
  
  // Обработка BYE
  if (sorted.length % 2 !== 0) {
    const byePlayer = sorted.find(p => 
      !p.opponents.includes('BYE') && 
      !used.has(p.id)
    );
    
    if (byePlayer) {
      pairs.push(createByeMatch(byePlayer));
      used.add(byePlayer.id);
      

      setParticipants(prev => prev.map(p => 
        p.id === byePlayer.id ? {...p, hasBye: true} : p
      ));
    }
  }


  for (const player of sorted) {
    if (used.has(player.id)) continue;
    
    const opponent = sorted.find(p => 
      !used.has(p.id) &&
      p.id !== player.id &&
      !player.opponents.includes(p.id)
    );

    if (opponent) {
      pairs.push(createMatch(player, opponent));
      used.add(player.id);
      used.add(opponent.id);
    }
  }

  setMatches(pairs);
  };

  const handleFinishRound = () => {
    const updatedParticipants = participants.map(p => ({...p}));
    
    setParticipantsHistory([...participantsHistory, participants]);

    
    
    matches.forEach(match => {
      if (match.player2 === 'BYE') {
        const p = updatedParticipants.find(p => p.id === match.player1)!;
        p.points += 1;
        p.opponents.push('BYE');
      } else {
        const p1 = updatedParticipants.find(p => p.id === match.player1)!;
        const p2 = updatedParticipants.find(p => p.id === match.player2)!;
        
        // Добавляем соперников друг другу
        p1.opponents.push(p2.id);
        p2.opponents.push(p1.id);
        
        switch (match.result) {
          case 'win1': 
            p1.points += 1;
            break;
          case 'win2': 
            p2.points += 1;
            break;
          case 'draw': 
            p1.points += 0.5;
            p2.points += 0.5;
            break;
        }
      }

      updatedParticipants.forEach(p => {
        p.gamesPlayed = p.opponents.filter(id => id !== 'BYE').length;
      });

    });

    setParticipantsHistory([...participantsHistory, updatedParticipants]);
    setParticipants(updatedParticipants);
    setRounds([...rounds, matches]);
    
    if (currentRound < Number(roundsCount)) {
      setCurrentRound(c => c + 1);
      generatePairings();
    } else {
      setIsTournamentFinished(true);
      navigate('/results');
    }
  };
  

  return (
    <div className="container">
      <Navbar
        participantsCount={participantsCount}
        roundsCount={roundsCount}
        participantsLength={participants.length}
        roundsLength={rounds.length}
      />

      <Routes>
        <Route path="/setup" element={
          <SetupSection
            participantsCount={participantsCount}
            roundsCount={roundsCount}
            participants={participants}
            setParticipantsCount={setParticipantsCount}
            setRoundsCount={setRoundsCount}
            setParticipants={setParticipants}
            showRoundError={showRoundError}
            setShowRoundError={setShowRoundError}
          />
        }/>
        
        <Route path="/rounds" element={
          <RoundsSection
            currentRound={currentRound}
            roundsCount={roundsCount}
            matches={matches}
            participants={participants}
            isTournamentFinished={isTournamentFinished}
            setMatches={setMatches}
            handleFinishRound={handleFinishRound}
          />
        }/>

        <Route path="/standings" element={
          <StandingsSection
            participantsHistory={participantsHistory}
            selectedRound={selectedRound}
            setSelectedRound={setSelectedRound}
            rounds={rounds}
          />
        }/>

        <Route path="/pairings" element={
          <PairingsSection
            rounds={rounds}
            selectedRound={selectedRound}
            setSelectedRound={setSelectedRound}
            participantsHistory={participantsHistory}
          />
        }/>

        <Route path="/overall" element={
          <OverallTable
            participants={participants}
            participantsHistory={participantsHistory}
          />
        }/>

        <Route path="/results" element={
          <ResultsSection
            participants={participants}
            rounds={rounds}
          />
        }/>

        <Route path="/" element={<Navigate to="/setup" replace />} />
      </Routes>
    </div>
  )
}