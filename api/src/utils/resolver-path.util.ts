import path from 'path';
import ambienteConfig from '../config/ambiente/ambiente.config';
import { TipoAmbiente } from '../config/ambiente/ambiente.enum';

/*
  Tem por principal objetivo, definir os diretórios dos arquivos,
  tendo em vista necessidade atuar conforme Env Dev ou Prod.
*/
export async function resolverPath(
  diretorioDestino: string,
  stringDestino: string,
) {
  const pathTemplate =
    ambienteConfig.tipoAmbiente === TipoAmbiente.PRODUCAO
      ? path.join(diretorioDestino, `../${stringDestino}/`)
      : path.resolve(diretorioDestino, stringDestino);
  return pathTemplate;
}
