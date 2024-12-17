import type { RequestHandler } from '@sveltejs/kit';
import { query } from '$lib/server/database';

export const GET: RequestHandler = async () => {
    try {
        const scores = await query('SELECT * FROM Users');
        return new Response(JSON.stringify(scores), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const { Username, Highscore } = body;

    if (!Username || !Highscore) {
        return new Response(JSON.stringify({ error: 'Invalid input data' }), { status: 400 });
    }

    try {
        const result = await query(
            `INSERT INTO Users (Username, Highscore) VALUES (@param1, @param2); 
             SELECT SCOPE_IDENTITY() AS Id;`,
            [Username, Highscore]
        );

        return new Response(JSON.stringify(result[0]), { status: 201 });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
};
