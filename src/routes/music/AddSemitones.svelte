<script lang="ts">
    import { onMount } from 'svelte';
    
    let { score = $bindable(0), ...props } = $props();
    
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let RandomNote = $state('');
    let interval = $state(0);

    let letterInput = '';
    let inputElement: HTMLInputElement | null = null; // Reference to input element

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
        
        if (notes[correctIndex] === inputElement?.value) {
            alert('Correct!');
            score += 1;
        } 
        else {
            alert(`Incorrect. The correct note is ${notes[correctIndex]}.`);
            score = 0;
        }

        // Update notes and clear input
        generateRandomNote();
        if (inputElement) {
            inputElement.value = '';
            inputElement.focus();
        }
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
      bind:this={inputElement}
      placeholder="Enter a note"
      pattern="[a-zA-Z]*"
      oninput={(e) => {
        const target = e.target;
        if (target instanceof HTMLInputElement) {
            target.value = target.value.replace(/[^a-zA-Z#]/g, '')
        }
      }}
    />
    <button class="submit-button" onclick={checkSemitones}>Submit</button>
</div>

<style>
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
