export type Page = 
  | 'setup' 
  | 'participants' 
  | 'rounds' 
  | 'results' 
  | 'standings' 
  | 'pairings' 
  | 'overall';

export type MatchResult = 'win1' | 'win2' | 'draw' | '';

export interface Participant {
  id: string;
  name: string;
  surname: string;
  rating: number;
  points: number;
  opponents: string[];
  hasBye: boolean;
  registrationNumber: number;
  gamesPlayed: number;
}

export interface Match {
  id: number;
  player1: string;
  player2: string;
  result: MatchResult;
}