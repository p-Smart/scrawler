import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { bluish, gold, silver, error, greyish, indigo, info, neutral, pink, success, warning, gradient, withAlphas,} from './colors';

export function createPalette() {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12)
    },
    background: {
      default: '#fff',
      paper: '#fff'
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'light',
    neutral,
    primary: withAlphas({
      lightest: '#F5F7FF',
      light: '#EBEEFE',
      main: '#f85d01',
      dark: '#4338CA',
      darkest: '#312E81',
    }),
    secondary: withAlphas({
      lightest: '#F5F7FF',
      light: '#EBEEFE',
      main: '#7360ee',
      dark: '#4338CA',
      darkest: '#312E81',
    }),
    success,
    greyish,
    indigo,
    gold,
    silver,
    gradient,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38)
    },
    warning
  };
}
