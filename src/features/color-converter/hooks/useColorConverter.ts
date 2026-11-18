import { useState } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl } from '../utils/color';

interface ColorConverterState {
  hex: string;
  rgb: string;
  hsl: string;
  error: string;
  copied: string;
}

const initialState: ColorConverterState = {
  hex: '#166534',
  rgb: '',
  hsl: '',
  error: '',
  copied: '',
};

export function useColorConverter() {
  const [state, setState] = useState(initialState);

  const updateState = (updates: Partial<ColorConverterState>) => {
    setState((previous) => ({ ...previous, ...updates }));
  };

  const convert = (hex: string = state.hex) => {
    try {
      const rgb = hexToRgb(hex);
      const hsl = rgbToHsl(rgb);

      updateState({
        hex: rgbToHex(rgb),
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        error: '',
        copied: '',
      });
    } catch (error) {
      updateState({
        error:
          error instanceof Error ? error.message : 'Failed to convert color.',
        rgb: '',
        hsl: '',
      });
    }
  };

  const updateHex = (hex: string) => {
    updateState({ hex, error: '', copied: '' });
  };

  const copyValue = async (value: string, type: string) => {
    try {
      await navigator.clipboard.writeText(value);
      updateState({ copied: type, error: '' });
    } catch {
      updateState({ error: 'Failed to copy to clipboard.', copied: '' });
    }
  };

  const clear = () => {
    setState({
      ...initialState,
      hex: '',
    });
  };

  return {
    state,
    updateHex,
    convert,
    copyValue,
    clear,
  };
}
