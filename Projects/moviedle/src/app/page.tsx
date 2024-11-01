'use client';

import { useEffect, useState } from 'react';
import { compareMovies, selectRandomMovie } from '../utils/game-utils';
import { MOVIE_DATABASE } from '../utils/movie-data';
import { GuessResult, Movie } from '../utils/type';

export default function MovieDlePage() {
  const [targetMovie, setTargetMovie] = useState<Movie | null>(null);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [remainingAttempts, setRemainingAttempts] = useState<number>(6);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [possibleMovies, setPossibleMovies] = useState<Movie[]>(MOVIE_DATABASE);

  useEffect(() => {
    const movie = selectRandomMovie(MOVIE_DATABASE);
    setTargetMovie(movie);
  }, []);

  const handleGuess = () => {
    if (!targetMovie) return;

    const guessedMovie = possibleMovies.find(
      movie => movie.title.toLowerCase() === currentGuess.toLowerCase()
    );

    if (!guessedMovie) {
      alert('Movie not found. Try again!');
      return;
    }

    const result = compareMovies(guessedMovie, targetMovie);
    
    setGuesses(prev => [result, ...prev]);
    setRemainingAttempts(prev => prev - 1);
    setCurrentGuess('');

    if (result.title === targetMovie.title) {
      setGameStatus('won');
    } else if (remainingAttempts === 1) {
      setGameStatus('lost');
    }
  };

  const renderGameResult = () => {
    if (gameStatus === 'won') {
      return (
        <div className="text-green-500 font-bold">
          Congratulations! You guessed the movie: {targetMovie?.title}
        </div>
      );
    }
    if (gameStatus === 'lost') {
      return (
        <div className="text-red-500 font-bold">
          Game Over! The movie was: {targetMovie?.title}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-4">Moviedle</h1>
      <h3 className="text-xl font-bold text-center mb-4">Guess the Movie</h3>
      
      {gameStatus === 'playing' && (
        <div className="flex mb-4 text-black">
          <input 
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
            placeholder="Enter a movie title"
            className="flex-grow p-2 border rounded-l"
          />
          <button 
            onClick={handleGuess}
            className="bg-blue-500 text-white p-2 rounded-r"
            disabled={!currentGuess}
          >
            Guess
          </button>
        </div>
      )}

      {renderGameResult()}

      <div className="mt-4">
        <h2 className="font-bold mb-2">Your Guesses:</h2>
        {guesses.map((guess, index) => (
          <div 
            key={index} 
            className="flex items-center p-2 border-b"
          >
            <span className="flex-grow">{guess.title}</span>
            <div className="flex space-x-2">
              <span 
                className={`p-1 rounded ${
                  guess.yearMatch === 'exact' ? 'bg-green-500' :
                  guess.yearMatch === 'close' ? 'bg-yellow-500' : 'bg-red-500'
                } text-white`}
              >
                Year: {guess.yearMatch}
              </span>
              <span className="p-1 rounded bg-blue-500 text-white">
                Genres: {guess.genreMatch}
              </span>
              <span className="p-1 rounded bg-purple-500 text-white">
                Actors: {guess.actorMatch}
              </span>
              <span 
                className={`p-1 rounded ${
                  guess.directorMatch ? 'bg-green-500' : 'bg-red-500'
                } text-white`}
              >
                Director: {guess.directorMatch ? 'Match' : 'No Match'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}