import { useEffect, useState } from "react";
import { View } from "react-native";
import { useStore } from "./useStore";

interface StoreGateProps {
  children: React.ReactNode;
  onReady?: () => void;
}

/**
 * A component that ensures the store is initialized before rendering its children.
 * It calls `initStore`, waits for initialization to complete, and then renders the children.
 * Optionally triggers the `onReady` callback once the store is ready.
 */
const StoreGate: React.FC<StoreGateProps> = ({ children, onReady }) => {
  const { initStore } = useStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = async () => {
      const loadedStore = await initStore();

      setReady(true);
      onReady?.();
    };
    run();
  }, [onReady]);

  if (!ready) return <View />;

  return <>{children}</>;
};

export default StoreGate;
