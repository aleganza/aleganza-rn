import { useTheme } from '@/lib/theme/useTheme';
import { View } from 'react-native';

/**
 * Valid spacing size keys from the theme
 * @typedef {'xs'|'sm'|'md'|'base'|'lg'|'xl'|'xxl'|'xxxl'} SpacingSize
 */

/**
 * @component
 * @example
 * <Spacer size="md" />
 * <Spacer size="md" direction="horizontal" />
 */
const Spacer = ({ size = 'base', direction = 'vertical' }) => {
  const { theme } = useTheme();

  const getValue = () => {
    const spacingValue = theme.spacing[size as keyof typeof theme.spacing];
    return spacingValue || theme.spacing.md;
  };

  const value = getValue();

  return (
    <View
      style={
        direction === 'vertical'
          ? { height: value }
          : { width: value }
      }
    />
  );
};

/**
 * @typedef {Object} SpacerProps
 * @property {SpacingSize|number} [size='base']
 * @property {'vertical'|'horizontal'} [direction='vertical']
 */

export default Spacer;
