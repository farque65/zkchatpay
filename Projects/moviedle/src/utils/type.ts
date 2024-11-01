export interface Movie {
    id: number;
    title: string;
    year: number;
    genre: string[];
    actors: string[];
    director: string;
  }
  
  export interface GuessResult {
    title: string;
    yearMatch: 'exact' | 'close' | 'far';
    genreMatch: number;
    actorMatch: number;
    directorMatch: boolean;
  }
  
  export interface GameState {
    targetMovie: Movie;
    guesses: GuessResult[];
    remainingAttempts: number;
    gameStatus: 'playing' | 'won' | 'lost';
  }