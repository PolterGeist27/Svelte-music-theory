<script>
    let count = $state(0);
</script>


<div class="h-screen flex">
    <div class="m-auto">
        <h1>Count: {count}</h1>
        
        <button onclick={() => count++} class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            +
        </button>
        <button onclick={() => count--} class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            -
        </button>
        
        <br>

        <a href="music">Music Theory</a>
    </div>

</div>

