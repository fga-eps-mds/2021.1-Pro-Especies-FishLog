export default {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  reporters: ['default',  ['jest-sonar', {
    outputDirectory: 'coverage',
    outputName: 'test-report.xml',
    reportedFilePath: 'relative'
  }]],
  testMatch: ['**/**/*.spec.ts'],
  
};