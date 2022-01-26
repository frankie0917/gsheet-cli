import fs from 'fs';
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const main = async () => {
  const client = await auth.getClient();
  const googleSheet = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '1JVhKEAUt_-F2Hd71MUvUPQPz4dfb3pwPRe_O2cs1rQA';
  const res = await googleSheet.spreadsheets.get({
    auth,
    spreadsheetId,
    fields: ['sheets.data.rowData.values.formattedValue'],
  });
  fs.writeFileSync('data.json', JSON.stringify(res.data, null, 2));
};

main();
