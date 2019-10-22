const fs = require('fs');
const path = require('path');

jest.mock('fs');

const { findMethods, findPlugins, findRoutes } = require('../server-helpers');

beforeEach(() => {});

describe('findMethods', () => {
	jest.resetModules();
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

		const methods = findMethods();
		expect(methods).toStrictEqual([['testFunc', testFunc]]);
	});

	test('It will findPlugins in the file system', () => {
		// These are used to find routes
		fs.readdirSync.mockReturnValue(['example.js']);

		const testFunc = () => 'test';

		jest.doMock(
			path.join(__dirname, '..', '/plugins/example.js'),
			() => ({
				testFunc,
			}),
			{ virtual: true },
		);

		const plugins = findPlugins();
		expect(plugins).toStrictEqual([testFunc]);
	});
});
