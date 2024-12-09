<script lang="ts">
    import { onMount } from 'svelte';
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let RandomNotes: string[] = [];
    let numberInput: number = 0;

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

        if (numberInput === distanceUp || numberInput === -distanceDown) {
            alert('Correct!');
        } else {
            alert(`Incorrect. The correct number of semitones is either ${distanceUp} (up) or -${distanceDown} (down).`);
        }

        // Update notes and clear input
        generateRandomNotes();
        numberInput = 0;
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
      type="number"
      bind:value={numberInput}
      placeholder="Enter number of semitones"
    />
    <button class="submit-button" onclick={checkSemitones}>Submit</button>
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
