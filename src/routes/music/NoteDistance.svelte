<script lang="ts">
	import { getScoreContext } from '$lib/context/context';
    import { onMount } from 'svelte';

    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let RandomNotes: string[] = $state([]);
    
    let inputElement: HTMLInputElement | null = null; // Reference to input element

    let score = getScoreContext();

    function generateRandomNotes() {
        const firstIndex = Math.floor(Math.random() * notes.length);
        let secondIndex;

        do {
            secondIndex = Math.floor(Math.random() * notes.length);
        } while (secondIndex === firstIndex);

        // Retrieve the elements
        const firstElement = notes[firstIndex];
        const secondElement = notes[secondIndex];

        RandomNotes = [firstElement, secondElement];
    }

    onMount(() => {
        generateRandomNotes();
    });

    function checkSemitones() {
        const firstIndex = notes.indexOf(RandomNotes[0]);
        const secondIndex = notes.indexOf(RandomNotes[1]);
        const distanceUp = (secondIndex - firstIndex + notes.length) % notes.length;
        const distanceDown = (firstIndex - secondIndex + notes.length) % notes.length;

        const inputValue = Number(inputElement?.value);
        if (inputValue === distanceUp || inputValue === -distanceDown) {
            alert('Correct!');
            score.score += 1;
        } else {
            alert(`Incorrect. The correct number of semitones between ${RandomNotes[0]} and ${RandomNotes[1]} ` +
                `is either ${distanceUp} (up) or -${distanceDown} (down).`);
            score.score = 0;
        }

        // Update notes and clear input
        generateRandomNotes();
        if (inputElement) {
            inputElement.value = '';
            inputElement.focus();
        }
    }
</script>


<div style="margin-bottom: 1rem; text-align: center;">
    <p style="font-size: 1.25rem; font-weight: bold; color: white;">
        {RandomNotes[0]} --> {RandomNotes[1]}
    </p>
</div>

<div>
    <label for="semitones" style="color: white;">Semitones:</label>
    <input
      id="semitones"
      bind:this={inputElement}
      placeholder="Enter number of semitones"
      oninput={(e) => {
        const target = e.target;
        if (target instanceof HTMLInputElement) {
            // Replace any invalid characters (non-digits and multiple '-' or misplaced '-')
            target.value = target.value.replace(/[^0-9-]/g, '')       // Allow only digits and '-'
                                       .replace(/(?!^-)-/g, '');     // Remove '-' if not at the start
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
