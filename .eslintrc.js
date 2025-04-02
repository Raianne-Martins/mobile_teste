module.exports = {
  root: true, 
  extends: ['@react-native','eslint:recommended'], 
  parser: '@babel/babel-eslint', 
  parserOptions: {
    requireConfigFile: false, 
    ecmaVersion: 2020, 
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, 
    },
  },
  plugins: ['react'], 
  rules: {
    
    'react/prop-types': 'off', 
    // Outras regras personalizadas podem ser adicionadas
  },
  settings: {
    react: {
      version: 'detect', 
    },
  },
};
