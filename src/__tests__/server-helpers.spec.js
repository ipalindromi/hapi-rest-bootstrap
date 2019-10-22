const fs = require('fs');
const path = require('path');

jest.mock('fs');

const { findRoutes } = require('../server-helpers');

beforeEach(() => {
	jest.resetModules();
});

describe('findMethods', () => {
	test('It will find routes in the file system', () => {
		// These are used to find routes
		fs.readdirSync.mockReturnValue(['example.js']);
		fs.statSync.mockReturnValue({
			isDirectory: () => false,
		});

		const testFunc = () => 'test';

		// The `virtual` is important here, and makes it possible to test
		// for a module that does not exist. We provide our own implementation.
		jest.doMock(
			path.join(__dirname, '..', '/routes/example.js'),
			() => ({
				testFunc,
			}),
			{ virtual: true },
		);

		const routes = findRoutes();
		expect(routes).toStrictEqual([testFunc]);
	});
});
