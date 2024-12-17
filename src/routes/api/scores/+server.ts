import { json } from '@sveltejs/kit';
import * as db from '$lib/server/database';

export const GET = async ({ url }) => {
    try {
        // Extract the "user" query parameter (if it exists)
        const user = url.searchParams.get('user'); // Example: /api/scores?user=Alice

        let scores;

        if (user) {
            // Fetch scores for a specific user
            scores = await db.query(
                `SELECT U.Username, S.Score
                 FROM Scores S
                 JOIN Users U ON S.UserId = U.Id
                 WHERE U.Username = @param1
                 ORDER BY S.Score DESC;`,
                [user]
            );
        } else {
            // Fetch the top 10 scores
            scores = await db.query(
                `SELECT TOP 10 U.Username, S.Score
                 FROM Scores S
                 JOIN Users U ON S.UserId = U.Id
                 ORDER BY S.Score DESC;`
            );
        }

        return json({ success: true, data: scores });
    } catch (error) {
        console.error('Error fetching scores:', error);
        return json({ success: false, error: 'Unable to fetch scores' }, { status: 500 });
    }
};

export const POST = async ({ request }) => {
    try {
        const { userId, score } = await request.json();

        if (!userId || !score) {
            return json({ success: false, error: 'Missing userId or score' }, { status: 400 });
        }

        await db.query(
            `INSERT INTO Scores (UserId, Score)
             VALUES (@param1, @param2);`,
            [userId, score]
        );

        return json({ success: true, message: 'Score saved successfully' });
    } catch (error) {
        console.error('Error saving score:', error);
        return json({ success: false, error: 'Unable to save score' }, { status: 500 });
    }
};
