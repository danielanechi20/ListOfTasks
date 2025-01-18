module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',  // Telling Jest to use Babel to transform JS files
    },
    testEnvironment: 'jsdom',  // Useful for React or browser-like environments
    transformIgnorePatterns: ['/node_modules/(?!zustand)/'],  // Exclude specific libraries like Zustand from transformation if needed
  };
  