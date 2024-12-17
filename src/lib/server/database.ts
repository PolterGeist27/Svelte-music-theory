import sql from 'mssql';
import type { config as SqlConfig } from 'mssql';

const config: SqlConfig = {
    user: 'user123',
    password: 'Abcd1234',
    server: 'diogotavares-pc\\SQLEXPRESS',
    database: 'SvelteApp',
    options: {
        encrypt: true, // Use encryption for Azure SQL Server
        trustServerCertificate: true, // Needed for self-signed certificates
    },
};

export async function connect() {
    try {
        return await sql.connect(config);
    } catch (err) {
        console.error('SQL Server Connection Error:', err);
        throw err;
    }
}

export async function query<T = any>(text: string, params: any[] = []): Promise<T[]> {
    const pool = await connect(); // Connect to the database
    const request = pool.request();

    // Bind parameters
    params.forEach((param, index) => {
        request.input(`param${index + 1}`, param);
    });

    const result = await request.query(text);
    return result.recordset;
}

// New function to fetch the top 10 scores and usernames
export async function getTopScores(): Promise<{ Username: string; Score: number }[]> {
    const queryText = `
        SELECT TOP 10 U.Username, S.Score
        FROM [dbo].[Scores] S
        JOIN [dbo].[Users] U ON S.UserId = U.Id
        ORDER BY S.Score DESC;
    `;

    return await query<{ Username: string; Score: number }>(queryText);
}
