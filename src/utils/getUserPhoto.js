// const BASE_IMAGE_URL = "http://ec2-54-226-167-245.compute-1.amazonaws.com:8080/flapboard/arquivos/";
const BASE_IMAGE_URL = "https://api.flapkanban.top/flapboard/arquivos/";

export function getUserPhoto(user) {
  if (!user) return "";

  const foto = user.fotoUrl || "";

  // 1) Sem foto: avatar automático
  if (!foto) {
    const encodedName = encodeURIComponent(user.nome || "User");
    return `https://ui-avatars.com/api/?name=${encodedName}`;
  }

  // 2) Se já vier uma URL completa, retorna direto
  if (/^https?:\/\//i.test(foto)) {
    return foto;
  }

  // 3) Normaliza removendo barras iniciais
  let cleaned = foto.replace(/^\/+/, "");

  // 4) Se o backend armazenou o caminho completo 'flapboard/arquivos/xxx', remover esse prefixo
  cleaned = cleaned.replace(/^flapboard\/arquivos\//, "");

  // 5) Retorna URL formada corretamente
  return BASE_IMAGE_URL + cleaned;
}
