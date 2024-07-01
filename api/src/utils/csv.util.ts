import readline from 'readline';
import { Readable } from 'stream';
import { ICreateCobrancasDTO } from '../modules/cobrancas/dtos/ICreate-cobrancas.dto';
import { convertDateToTimestamp } from './convert-data-format.util';

export default async function CsvUtils(
  ArquivoCsv: any,
): Promise<ICreateCobrancasDTO[]> {
  const { buffer } = ArquivoCsv;
  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const bookFile = readline.createInterface({
    input: readableFile,
  });

  let registros: ICreateCobrancasDTO[] = [];

  for await (let line of bookFile) {
    let bookLineSplit = line.split(';');

    const inputDate = bookLineSplit[3]; // dd/mm/yyyy
    const dataCobrancaFormatada = await convertDateToTimestamp(inputDate); // yyyy-mm-ddT00:00:00.000Z

    if (dataCobrancaFormatada) {
      registros.push({
        matricula: bookLineSplit[1],
        nome: bookLineSplit[2],
        dataCobranca: dataCobrancaFormatada,
        valor: parseFloat(
          bookLineSplit[4].replace('"', '').replace(',', '.').replace('"', ''),
        ),
      });
    }
  }

  return registros;
}
