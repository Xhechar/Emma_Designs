import mssql from 'mssql';
import { sqlConfig } from '../config/config';

export class Helpers {

  static async query(query: string) {
    const pool = mssql.connect(sqlConfig) as Promise<mssql.ConnectionPool>;

    let result = ((await pool).request().query(query));

    return result;

  }

  static async execute(stored_procedure: string, data: { [c: string | number]: string | number }) {
    const pool = mssql.connect(sqlConfig) as Promise<mssql.ConnectionPool>;

    const request = ((await pool).request()) as mssql.Request;

    for (let key in data) {
      request.input(key, data[key]);
    }

    let result = request.execute(stored_procedure);

    return result;
  }

}