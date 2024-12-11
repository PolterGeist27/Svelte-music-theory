<script>
    import NoteDistance from "./NoteDistance.svelte";
    import AddSemitones from "./AddSemitones.svelte";
    import { writable } from 'svelte/store';

    const currentExercise = writable('AddSemitones');
</script>

<div class="centered">
    <div class="buttons">
        <button onclick={() => currentExercise.set('NoteDistance')}>Note Distance</button>
        <button onclick={() => currentExercise.set('AddSemitones')}>Add Semitones</button>
    </div>

    {#if $currentExercise === 'NoteDistance'}
        <NoteDistance />
    {:else if $currentExercise === 'AddSemitones'}
        <AddSemitones />
    {/if}
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
</style>
