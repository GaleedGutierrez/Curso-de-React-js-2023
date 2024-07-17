import { AxeBuilder } from '@axe-core/playwright';
import { expect, Page, test } from '@playwright/test';

const TODO_ITEMS_LIST = [
	'Buy some cheese',
	'Feed the cat',
	'Book a doctors appointment',
];

async function addTodos(page: Page): Promise<void> {
	const INPUT = page.getByPlaceholder('Create a new task...');

	// Add first todo
	await INPUT.fill(TODO_ITEMS_LIST[0]);
	await page.keyboard.press('Enter');

	// Add second todo
	await INPUT.fill(TODO_ITEMS_LIST[1]);
	await page.keyboard.press('Enter');

	// Add third todo
	await INPUT.fill(TODO_ITEMS_LIST[2]);
	await page.keyboard.press('Enter');
}

async function markTask({
	page,
	taskNumber,
	isCheck = true,
}: {
	page: Page;
	taskNumber: number;
	isCheck?: boolean;
}): Promise<void> {
	const ITEM = page
		.getByRole('listitem')
		.filter({ hasNot: page.getByRole('link') })
		.filter({ hasText: TODO_ITEMS_LIST[taskNumber] })
		.locator('label');

	if (isCheck) {
		await ITEM.check();
	} else {
		await ITEM.uncheck();
	}
}

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe('Check CRUD', () => {
	test('Should add todos', async ({ page }) => {
		await addTodos(page);

		const TODO_ITEMS = page
			.getByRole('listitem')
			.filter({ hasNot: page.getByRole('link') });

		const AMOUNT_TODOS = await TODO_ITEMS.count();

		await expect(TODO_ITEMS).toHaveText(TODO_ITEMS_LIST);
		expect(AMOUNT_TODOS).toBe(TODO_ITEMS_LIST.length);
	});

	test('Should edit a todo item', async ({ page }) => {
		await addTodos(page);

		const NEW_VALUE = 'Buy some milk';

		await page.getByText(TODO_ITEMS_LIST[0]).dblclick();
		await page.getByText(TODO_ITEMS_LIST[0]).fill(NEW_VALUE);
		await page.keyboard.press('Enter');

		const NEW_LIST_CONTENT = page.getByText(NEW_VALUE);

		await expect(NEW_LIST_CONTENT).toHaveText(NEW_VALUE);
	});
	test('Should delete task', async ({ page }) => {
		await addTodos(page);
		await page
			.getByRole('listitem')
			.filter({ hasText: TODO_ITEMS_LIST[0] })
			.getByLabel('Delete task')
			.click();

		const ITEMS_LEFT = page.getByText('items left');
		const AMOUNT_TODOS = await page
			.getByRole('listitem')
			.filter({ hasNot: page.getByRole('link') })
			.count();

		expect(AMOUNT_TODOS).toBe(TODO_ITEMS_LIST.length - 1);
		await expect(ITEMS_LEFT).toHaveText('2 items left');
	});
});

test.describe('Check mark and unmark task', () => {
	test('Should be 2 (two) items left', async ({ page }) => {
		await addTodos(page);
		await markTask({ page, taskNumber: 0 });

		const CHECKBOX = page
			.getByRole('listitem')
			.filter({ hasText: TODO_ITEMS_LIST[0] })
			.getByRole('checkbox');
		const ITEMS_LEFT = page.getByText('items left');

		await expect(ITEMS_LEFT).toHaveText('2 items left');
		await expect(CHECKBOX).toBeChecked();
	});

	test('Should be 3 (three) items left', async ({ page }) => {
		await addTodos(page);
		await markTask({ page, taskNumber: 0 });
		await markTask({ page, taskNumber: 0, isCheck: false });

		const CHECKBOX = page
			.getByRole('listitem')
			.filter({ hasText: TODO_ITEMS_LIST[0] })
			.getByRole('checkbox');
		const ITEMS_LEFT = page.getByText('items left');

		await expect(ITEMS_LEFT).toHaveText('3 items left');
		await expect(CHECKBOX).not.toBeChecked();
	});
	test('Should have text "1 item left" when only one task active', async ({
		page,
	}) => {
		await addTodos(page);
		await markTask({ page, taskNumber: 0 });
		await markTask({ page, taskNumber: 1 });

		const ITEM_LEFT = page.getByText('item left');

		await expect(ITEM_LEFT).toHaveText('1 item left');
	});
});

test.describe('Check clear completed', () => {
	test('Should clear completed tasks', async ({ page }) => {
		await addTodos(page);
		await markTask({ page, taskNumber: 0 });
		await markTask({ page, taskNumber: 1 });

		const ITEMS_LEFT = page.getByText('item left');

		await page.getByText('Clear completed').click();
		await expect(ITEMS_LEFT).toHaveText('1 item left');

		const AMOUNT_TODOS = await page
			.getByRole('listitem')
			.filter({ hasNot: page.getByRole('link') })
			.count();

		expect(AMOUNT_TODOS).toBe(1);
	});
});

test.describe('Check persistence', () => {
	test('Should persist todos after page reload', async ({ page }) => {
		const TASK_NUMBER = 1;

		await addTodos(page);
		await markTask({ page, taskNumber: TASK_NUMBER });
		await page.reload();

		const ITEMS_LEFT = page.getByText('items left');
		const AMOUNT_TODOS = await page
			.getByRole('listitem')
			.filter({ hasNot: page.getByRole('link') })
			.count();
		const TODO_COMPLETED = page
			.getByRole('listitem')
			.filter({ hasText: TODO_ITEMS_LIST[TASK_NUMBER] })
			.locator('label');

		await expect(ITEMS_LEFT).toHaveText('2 items left');
		await expect(TODO_COMPLETED).toBeChecked();
		expect(AMOUNT_TODOS).toBe(TODO_ITEMS_LIST.length);
	});
});

test.describe('Check filters', () => {
	test('Should filter active tasks', async ({ page }) => {
		await addTodos(page);
		await markTask({ page, taskNumber: 0 });
		await markTask({ page, taskNumber: 1 });

		// Active Task
		const ITEMS_LEFT = page.getByText('item left');

		await page.getByText('Active', { exact: true }).click();
		await expect(page).toHaveURL('/#active');
		await expect(ITEMS_LEFT).toHaveText('1 item left');
	});

	test('Should filter completed tasks', async ({ page }) => {
		await addTodos(page);
		await markTask({ page, taskNumber: 0 });
		await markTask({ page, taskNumber: 1 });
		await page.getByText('Completed', { exact: true }).click();
		await expect(page).toHaveURL('/#completed');

		const COMPLETED_TASK = await page
			.getByRole('listitem')
			.filter({ hasNot: page.getByRole('link') })
			.count();

		expect(COMPLETED_TASK).toBe(2);
	});

	test('Should show all tasks', async ({ page }) => {
		await addTodos(page);
		await markTask({ page, taskNumber: 0 });
		await markTask({ page, taskNumber: 1 });
		await page.getByText('Completed', { exact: true }).click();
		await expect(page).toHaveURL('/#completed');
		await page.getByText('Active', { exact: true }).click();
		await expect(page).toHaveURL('/#active');
		await page.getByText('All', { exact: true }).click();
		await expect(page).toHaveURL('/#all');

		const AMOUNT_TODOS = await page
			.getByRole('listitem')
			.filter({ hasNot: page.getByRole('link') })
			.count();

		expect(AMOUNT_TODOS).toBe(TODO_ITEMS_LIST.length);
	});
});

test.describe('Check empty list', () => {
	test('Should have text "Add your first task"', async ({ page }) => {
		const TODO_LIST = await page.getByRole('listitem').count();
		const MESSAGE = page.getByText('Add your first task');

		expect(TODO_LIST).toBe(0);
		await expect(MESSAGE).toBeVisible();
	});
});

test.describe('Accessibility', () => {
	test('Should not have any automatically detectable accessibility issues with empty todo', async ({
		page,
	}) => {
		const accessibilityScanResults = await new AxeBuilder({
			page,
		}).analyze();

		expect(accessibilityScanResults.violations).toHaveLength(0);
	});

	test('Should not have any automatically detectable accessibility issues with todos', async ({
		page,
	}) => {
		await addTodos(page);
		await page
			.getByRole('listitem')
			.filter({ hasText: TODO_ITEMS_LIST[0] })
			.locator('label')
			.check();

		// TODO: improve css selectors for strake tasks and color for state component
		const accessibilityScanResults = await new AxeBuilder({
			page,
		})
			.exclude('#root > div > main > section > div > div')
			.exclude(
				'#root > div > main > section > div > ul > li > div > span > s',
			)
			.analyze();

		expect(accessibilityScanResults.violations).toHaveLength(0);
	});
});
