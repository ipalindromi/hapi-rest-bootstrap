const fs = require('fs');
const path = require('path');

jest.mock('fs');

const { findMethods, findRoutes } = require('../server-helpers');

beforeEach(() => {
	jest.resetModules();
});

describe('findMethods', () => {
	beforeEach(() => {
		fs.statSync.mockReturnValue({
			isDirectory: () => false,
		});
	});

	test('It will findRoutes in the file system', () => {
		// These are used to find routes
		fs.readdirSync.mockReturnValue(['example.js']);

		const testFunc = () => 'test';

		// The `virtual` is important here, and makes it possible to test
		// for a module that does not exist. We provide our own implementation.
		// doMock is used instead of `mock` to avoid premature hoisting.
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

	test('It will findMethods in the file system', () => {
		// These are used to find routes
		fs.readdirSync.mockReturnValue(['example.js']);

		const testFunc = () => 'test';

		jest.doMock(
			path.join(__dirname, '..', '/methods/example.js'),
			() => ({
				testFunc,
			}),
			{ virtual: true },
		);

		const routes = findMethods();
		expect(routes).toStrictEqual([['testFunc', testFunc]]);
	});
});
