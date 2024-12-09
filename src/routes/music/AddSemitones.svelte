<script lang="ts">
    import { onMount } from 'svelte';
    
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let RandomNote: string = '';
    let interval = 0;

    let letterInput: string = '';

    function generateRandomNote() {
        const firstIndex = Math.floor(Math.random() * notes.length);
        const semitone = Math.floor(Math.random() * 25) - 12; // Random number of semitones between -12 and 12

        // Retrieve the element
        RandomNote = notes[firstIndex];
        interval = semitone;
    }

    onMount(() => {
        generateRandomNote();
    });

    function checkSemitones() {
        const firstIndex = notes.indexOf(RandomNote);
        const correctIndex = (firstIndex + interval + notes.length) % notes.length;
        
        if (notes[correctIndex] === letterInput) {
            alert('Correct!');
        } else {
            alert(`Incorrect. The correct note is ${notes[correctIndex]}.`);
        }

        // Update notes and clear input
        generateRandomNote();
        letterInput = '';
    }
</script>

<div style="margin-bottom: 1rem; text-align: center;">
    <p style="font-size: 1.25rem; font-weight: bold; color: white;">
        {#if interval >= 0}
            {RandomNote} + {interval} = ??
        {:else}
            <!-- The '-' sign is already displayed -->
            {RandomNote} - {-interval} = ??
        {/if}
    </p>
</div>

<div>
    <label for="letters" style="color: white;">Note:</label>
    <input
      id="letters"
      type="text"
      bind:value={letterInput}
      placeholder="Enter a note"
      pattern="[a-zA-Z]*"
      on:input={(e) => {
        const target = e.target;
        if (target instanceof HTMLInputElement) {
            target.value = target.value.replace(/[^a-zA-Z]/g, '')
        }
      }}
    />
    <button class="submit-button" on:click={checkSemitones}>Submit</button>
</div>

<style>
    .submit-button {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        background-color: #3b82f6;
        color: white;
        font-weight: 600;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .submit-button:hover {
        background-color: #2563eb;
    }

    .submit-button:focus {
        outline: none;
        outline: 2px solid rgba(96, 165, 250, 0.75);
    }
</style>
