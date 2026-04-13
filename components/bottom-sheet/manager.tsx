import { createRef } from 'react';
import { BottomSheetRef } from './types';

class BottomSheetManager {
  private refs: Map<string, React.RefObject<BottomSheetRef>> = new Map();

  register(name: string, ref: React.RefObject<BottomSheetRef>) {
    this.refs.set(name, ref);
  }

  unregister(name: string) {
    this.refs.delete(name);
  }

  show(name: string, props?: any) {
    const ref = this.refs.get(name);
    if (ref?.current) {
      ref.current.expand(props);
    } else {
      console.warn(`BottomSheet "${name}" not found`);
    }
  }

  hide(name: string) {
    const ref = this.refs.get(name);
    if (ref?.current) {
      ref.current.close();
    }
  }

  snapToIndex(name: string, index: number) {
    const ref = this.refs.get(name);
    if (ref?.current) {
      ref.current.snapToIndex(index);
    }
  }
}

export const SheetManager = new BottomSheetManager();