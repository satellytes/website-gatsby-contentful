export const theme = {
  background: '#202840',
  depth: {
    orbitLandingpage: 10
  },
  navHeight: 60,
  pagePadding: 20,
  layout: {
    contentMaxWidth: 900,
    breakoutWidth: 30,
    gridGap: 30
  },
  colors: {
    white: '#ffffff',
    dark: '#202840',
    light: '#5CCFE6',
    grey: '#A9A9A9',
    error: '#FF9999',
    progress: '#5CE6A1'
  },
  fontFamily: {
    coco: 'Coco Gothic',
    roboto: 'Roboto'
  },
  fontWeight: {
    extraBold: 800,
    bold: 600,
    regular: 400,
    light: 300,
  },
  breakpoints: {
    xs: 0,
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140
  },

  footer: {
    background: '#202840'
  },

  navigation: {
    background: '#202840',
    foreground: '#ffffff'
  },

  button: {
    background: '#5CCFE6',
    color: '#282C59',
    backgroundHover: '#80EAFF'
  }
};

export const themeLight = {
  ...theme,
  background: '#ffffff',
  colors: {
    white: '#202840',
    dark: '#5CCFE6',
    light: '#29B1CC',
    grey: '#A9A9A9'
  },

  navigation: {
    background: '#ffffff',
    foreground: '#202840'
  }
};

export default theme;