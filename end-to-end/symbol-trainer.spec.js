import { expect, test } from '@playwright/test';

test.describe('symbol-trainer desktop', () => {
  test.use({ viewport: { width: 1900, height: 1080 } });

  test('given: navigation to /symbol-trainer and click to help, should: see intro-section and then help-section', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Check if intro-section title is rendered
    await expect(
      page.getByRole('heading', { name: 'SymbolTrainer' }),
    ).toBeVisible();

    // Click on help-section button
    await page.getByRole('button', { name: 'Instructions / Help' }).click();

    // Check if help-section is rendered
    await expect(
      page.getByRole('heading', { name: 'How to Use' }),
    ).toBeVisible();
    await expect(page.getByText('Pick your level in the')).toBeVisible();
  });

  test('given: click to first SymbolTrainer button then shortcut-use then typing to win and fail, should: see levelStrings 1 and 2, then win and fail with correct wpm + reset + focus-behaviour', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Checks navigation to trainer section success.
    await page.getByRole('button', { name: 'SymbolTrainer' }).nth(0).click();
    await expect(page.getByText('78637')).toBeVisible();

    // Checks shortcut(s) to be working.
    await page.keyboard.press('Meta+j');
    await expect(page.getByText('94864')).toBeVisible();
    await page.keyboard.press('Meta+k');
    await expect(page.getByText('78637')).toBeVisible();
    await page.keyboard.press('Meta+ArrowDown');
    await expect(page.getByText('94864')).toBeVisible();
    await page.keyboard.press('Meta+ArrowUp');
    await expect(page.getByText('78637')).toBeVisible();

    // Types without having to click into the input, verifies its custom focus
    // behaviour. Extra character "t" sets up next assertion.
    await page.keyboard.type('78637t', { delay: 200 });

    // Verifies input disabled on win, by not including "t".
    await expect(page.getByRole('textbox')).toHaveValue('78637');

    // Checks for wpm score on winning to be rendered. It is a standalone 1-3
    // digit number.
    //! implementation detail?
    await expect(page.locator('#trainer')).toContainText(/^\d{1,3}$/);

    // Delays next typing until input is reset.
    await page.waitForTimeout(2100);

    // Types again without click on input, verifies focus reset behaviour after win.
    await page.keyboard.type('7863ft', { delay: 200 });

    // Verifies input disabled on fail, by not including "t".
    await expect(page.getByRole('textbox')).toHaveValue('7863f');

    // Verifies inputString reset after fail, because no input string overlaps
    // levelString.
    await page.waitForTimeout(1100);
    await expect(page.getByText('78637')).toBeVisible();

    // Click in an empty area to attempt removing focus.
    await page.mouse.click(10, 10);

    // Types again after clicking outside of input, verifies focus always
    // staying on input. Also correct typing "pre-win" to be working, no reset
    // in between as long as correct characters are given.
    await page.keyboard.type('786', { delay: 200 });
    await page.waitForTimeout(500);
    await expect(page.getByRole('textbox')).toHaveValue('786');
  });

  test('given: highscores in localStorage, click on level-section button, then on a level item, should: render first and last levels in list with correct highscores, and then the chosen levelstring in trainer-section', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Set highscores in localStorage
    await page.evaluate(() => {
      localStorage.setItem(
        'highScores',
        JSON.stringify({
          1: 55,
          2: 45,
        }),
      );
    });
    await page.reload();

    // Click on level-section button
    await page.getByRole('button', { name: 'Level' }).click();

    // Check if levelItems are rendered
    const levelItems = page.locator('#level li');
    await expect(levelItems).toHaveCount(200);

    // Check if first and last levels are rendered with correct highscores
    await expect(levelItems.nth(0)).toContainText('55');
    await expect(levelItems.nth(1)).toContainText('45');
    await expect(levelItems.nth(199)).toContainText('00');

    // Click on a level item
    await page.getByRole('button', { name: 'Level 42' }).click();

    // Check if the chosen levelstring is rendered in the trainer-section
    await expect(page.getByText('7-/,/')).toBeVisible();
  });

  test('given: typed and won in trainer-section, should: render new highscore in trainer-menu next to level-section button', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    await page.getByRole('button', { name: 'SymbolTrainer' }).nth(1).click();
    await page.keyboard.type('78637t', { delay: 200 });

    //! fail
    await expect(page.locator('#trainer-menu')).toContainText(
      /\/ (?!00)\d{2,3}/,
    );
  });

  test('given: clicked on save-section button, then backup button, and then import button, should: see save-section and correct backup and import', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Additional Saving Options')).toBeVisible();
    await expect(page.getByText('Your scores get auto-saved')).toBeVisible();
    await expect(page.getByText('Last backup download was')).toBeVisible();

    await page.getByRole('button', { name: 'Download Backup File' }).click();

//! how to assert download and import?
  });

  test('given: clicked on help-section button 2, should: see help-section', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    await page.getByRole('button', { name: 'Help' }).nth(1).click();

    await expect(page.getByText('How to Use')).toBeVisible();
    await expect(page.getByText('Pick your level in the')).toBeVisible();
  });




});

/*
- all elements that don't get checked via click/ interaction .toBeVisible

-x all header links hrefs to be correct => ask check jan afterwards!
-x title once per route
-x small screen: responsive note


-x intro to help1
-x intro to SymbolTrainer 1 to levelchange shortcut to win to fail

-// intro to level (incl. first and last level) to symboltrainer via levelclick
- / highscore in trainer menu on typing
-/ intro to save to backupdownload to import
-x intro to help2

-  intro to level to trainer via toggle to help to trainer via toggle to save to trainer via toggle
- all paths: 
intro 
to trainer2 to save
to trainer2 to help

to level to trainer2 
to level to save

to level to help

to save to help 
to save to level
 */
test.describe('symbol-trainer mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });
  test('given: small screen, should: see responsive note, title and correct header links', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Responsive note(s)
    await expect(page.getByText('SymbolTrainer is Desktop Only')).toBeVisible();
    await expect(page.getByText('In case you')).toBeVisible();

    // Title
    await expect(page).toHaveTitle(/SymbolTrainer/);
    // Header links
    await expect(
      page.getByRole('link', { name: 'LeonWarscheck' }),
    ).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
    await expect(page.getByRole('link', { name: 'Tools' })).toHaveAttribute(
      'href',
      '/symbol-trainer',
    );
  });
});
