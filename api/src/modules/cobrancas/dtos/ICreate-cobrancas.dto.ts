interface IReadFilesDTO {
  filename: string;
  fieldname?: string;
}

interface ICreateCobrancasDTO {
  matricula: string;
  nome: string;
  dataCobranca: Date;
  valor: number;
}

interface IResultCreateManyCobrancasDTO {
  count: number;
}

export { ICreateCobrancasDTO, IReadFilesDTO, IResultCreateManyCobrancasDTO };
