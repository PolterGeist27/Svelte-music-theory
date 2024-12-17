import { getContext, setContext } from "svelte";

type Score = { score: number }

let scoreKey = Symbol('score');

export function setScoreContext(score: Score) {
    setContext(scoreKey, score);
}

export function getScoreContext(): Score {
    return getContext(scoreKey) as Score;
}
