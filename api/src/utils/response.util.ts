interface ResponseDTO {
  codigo?: number;
  mensagem?: string;
  dados: any;
}

const send = (dados: any): ResponseDTO => {
  return {
    mensagem: 'sucesso!',
    dados,
  };
};

const sendErro = (codigo: number, dados: any): ResponseDTO => {
  return {
    codigo,
    mensagem: 'erro!',
    dados,
  };
};

export const ResponserSucesso = {
  send,
};

export const ResponserErro = {
  sendErro,
};
