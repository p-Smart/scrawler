import { alpha } from '@mui/material/styles';

export const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50)
  };
};

export const neutral = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927'
};

export const indigo = withAlphas({
  lightest: '#F5F7FF',
  light: '#EBEEFE',
  main: '#6366F1',
  dark: '#4338CA',
  darkest: '#312E81',
});

export const pink = {
  lightest: '#FEE9EA',
  light: '#FDB5B8',
  main: '#EE6192',
  dark: '#B31D30',
  darkest: '#7A0B1A',
};

export const greyish = withAlphas({
  lightest: '#F6F6F6',
  light: '#D2D2D2',
  main: '#7F7F7F',
  dark: '#464646',
  darkest: '#212121',
});


export const bluish = withAlphas({
  lightest: '#F2F7FC',
  light: '#D7E6F7',
  main: '#4D8FE6',
  dark: '#1651A4',
  darkest: '#0B3251',
});

export const success = withAlphas({
  lightest: '#F0FDF9',
  light: '#3FC79A',
  main: '#10B981',
  dark: '#0B815A',
  darkest: '#134E48',
});

export const info = withAlphas({
  lightest: '#ECFDFF',
  light: '#CFF9FE',
  main: '#06AED4',
  dark: '#0E7090',
  darkest: '#164C63',
});

export const warning = withAlphas({
  lightest: '#FFFAEB',
  light: '#FEF0C7',
  main: '#F79009',
  dark: '#B54708',
  darkest: '#7A2E0E',
});

export const error = withAlphas({
  lightest: '#FEF3F2',
  light: '#FEE4E2',
  main: '#F04438',
  dark: '#B42318',
  darkest: '#7A271A',
});

export const gold = withAlphas( {
  lightest: '#FFF9E6',
  light: '#FFEACD',
  main: '#FFD700',
  dark: '#C0A456',
  darkest: '#8B7500',
});

export const silver = withAlphas({
  lightest: '#F2F2F2',
  light: '#D9D9D9',
  main: '#C0C0C0',
  dark: '#898989',
  darkest: '#595959',
});

export const gradient = {
  background: `linear-gradient(135deg, ${silver.lightest}, ${gold.lightest}, ${indigo.lightest})`,
};


