import { useState, useEffect } from "react";

/**
 * Hook personalizado para armazenar e recuperar dados do localStorage.
 * @param {string} key - Chave usada no localStorage.
 * @param {any} initialValue - Valor inicial caso não haja dados salvos.
 * @returns {[any, Function]} - Retorna o estado e uma função para atualizá-lo.
 */
export function useLocalStorage(key, initialValue) {
  // Estado inicial dos dados, puxando do localStorage se houver
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Erro ao acessar localStorage:", error);
      return initialValue;
    }
  });

  // Atualiza o localStorage sempre que o estado mudar
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
