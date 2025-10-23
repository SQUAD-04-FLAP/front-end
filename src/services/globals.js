import { atom } from "jotai";
import { Atom, getDefaultStore, WritableAtom } from "jotai";

// modificando os estados do jotai sem precisar de um componente - nao da erro
// conta com getter e setter para manipulacao
export async function GetterAtom(getAtom){
  const store = getDefaultStore();
  const value = store.get(getAtom);
  return value;
}

export function SetterAtom(setAtom, value) {
  const store = getDefaultStore();
  store.set(setAtom, value);
}

export const projectWS = atom([]);