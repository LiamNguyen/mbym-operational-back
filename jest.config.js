module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	clearMocks: true,
	coverageDirectory: 'coverage',
	testMatch: ['**/__tests__/**/?(*.)+(spec|test).[tj]s?(x)'],
	collectCoverage: false,
	collectCoverageFrom: ['src/**/*.{js,ts}']
};
