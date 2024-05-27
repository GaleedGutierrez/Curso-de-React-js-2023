import { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
	extends: ['@commitlint/config-conventional'],
	formatter: '@commitlint/format',
};

module.exports = Configuration;
