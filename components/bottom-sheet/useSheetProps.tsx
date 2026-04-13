import { useState, useEffect } from 'react';

const sheetPropsStore = new Map<string, any>();
const listeners = new Map<string, Set<(props: any) => void>>();

export const updateSheetProps = (sheetName: string, props: any) => {
  sheetPropsStore.set(sheetName, props);
  listeners.get(sheetName)?.forEach(listener => listener(props));
};

export const useSheetProps = <T,>(sheetName: string): T | null => {
  const [props, setProps] = useState<T | null>(
    () => sheetPropsStore.get(sheetName) || null
  );

  useEffect(() => {
    if (!listeners.has(sheetName)) {
      listeners.set(sheetName, new Set());
    }
    
    const listener = (newProps: T) => setProps(newProps);
    listeners.get(sheetName)!.add(listener);

    return () => {
      listeners.get(sheetName)?.delete(listener);
    };
  }, [sheetName]);

  return props;
};