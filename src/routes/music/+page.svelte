<script lang="ts">
    import type { PageData } from './$types';
    import { setScoreContext } from '$lib/context/context';

    import NoteDistance from "./NoteDistance.svelte";
    import AddSemitones from "./AddSemitones.svelte";
    
    let { data }: { data: PageData } = $props();
    
    let currentExercise = $state('AddSemitones');
    let showLeaderboard = $state(false);

    let score = $state({ score: 0 });
    setScoreContext(score);
</script>

<div class="centered">
    
    <!-- Leaderboard -->
    <button onclick={() => showLeaderboard = true}>Leaderboard</button>
    {#if showLeaderboard}
        <div class="leaderboard-popup">
            <h2 class="text-2xl font-bold mb-3 border-b-2 border-gray-300 pb-2">Leaderboard</h2>
            {#if data.scores.length > 0}
                <ul>
                    {#each data.scores as { Username, Score }}
                        <li>{Username}: {Score} points</li>
                    {/each}
                </ul>
            {:else}
                <p>No scores available.</p>
            {/if}
            <button onclick={() => showLeaderboard = false}>Close</button>
        </div>
    {/if}

    <!-- Current Score Display -->
    <div class="score-display">
        <h2>Current Score: {score.score}</h2>
    </div>

    <!-- Exercises -->
    {#if currentExercise === 'NoteDistance'}
        <NoteDistance />
    {:else if currentExercise === 'AddSemitones'}
        <AddSemitones />
    {/if}

    <!-- Buttons to switch exercises -->
    <div class="buttons">
        <button onclick={() => currentExercise = 'NoteDistance'}>Note Distance</button>
        <button onclick={() => currentExercise = 'AddSemitones'}>Add Semitones</button>
    </div>
</div>

<style>
    .centered {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #1e1e1e;
    }
    .buttons {
        margin-bottom: 20px;
    }
    button {
        background-color: #6200ea;
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: #3700b3;
    }
    button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(98, 0, 234, 0.5);
    }

    .leaderboard-popup {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        width: 300px;
        max-width: 90%;
    }
    .leaderboard-popup h2 {
        margin-top: 0;
    }
    .leaderboard-popup ul {
        list-style: none;
        padding: 0;
    }
    .leaderboard-popup li {
        margin: 5px 0;
    }

    .score-display {
        color: white;
        font-size: 24px;
        margin-top: 20px;
        padding: 10px;
        background-color: #333;
        border-radius: 5px;
        text-align: center;
        margin-bottom: 10px;
    }

</style>
