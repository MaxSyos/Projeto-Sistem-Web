interface ISearchCobrancasDTO {
  dataInicial: string;
  dataFinal: string;
}

interface IResultSearchCobrancasDTO {
  id: string;
  matricula: string;
  nome: string;
  dataCobranca: Date;
  valor: number;
  create_at?: Date;
  update_at?: Date;
}

export { ISearchCobrancasDTO, IResultSearchCobrancasDTO };
