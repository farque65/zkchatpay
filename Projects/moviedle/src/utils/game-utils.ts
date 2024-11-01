import { GuessResult, Movie } from './types';

export function compareMovies(guess: Movie, target: Movie): GuessResult {
  // Year comparison
  let yearMatch: GuessResult['yearMatch'] = 'far';
  const yearDifference = Math.abs(guess.year - target.year);
  if (yearDifference === 0) yearMatch = 'exact';
  else if (yearDifference <= 5) yearMatch = 'close';

  // Genre comparison
  const genreMatch = guess.genre.filter(genre => 
    target.genre.includes(genre)
  ).length;

  // Actor comparison
  const actorMatch = guess.actors.filter(actor => 
    target.actors.includes(actor)
  ).length;

  // Director comparison
  const directorMatch = guess.director === target.director;

  return {
    title: guess.title,
    yearMatch,
    genreMatch,
    actorMatch,
    directorMatch
  };
}

export function selectRandomMovie(movies: Movie[]): Movie {
  return movies[Math.floor(Math.random() * movies.length)];
}

export function getColorForYearMatch(yearMatch: GuessResult['yearMatch']): string {
  switch (yearMatch) {
    case 'exact': return 'bg-green-500';
    case 'close': return 'bg-yellow-500';
    case 'far': return 'bg-red-500';
  }
}