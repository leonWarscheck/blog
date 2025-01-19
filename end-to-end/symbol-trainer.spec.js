import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('symbol-trainer desktop', () => {
  test.use({ viewport: { width: 1900, height: 1080 } });

  test('given: navigation to /symbol-trainer and click to help, should: see intro-section and then help-section', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Check if intro-section title is rendered
    await expect(
      page.getByRole('heading', { name: /SymbolTrainer/i }),
    ).toBeVisible();

    // Click on help-section button
    await page.getByRole('button', { name: /Instructions \/ Help/i }).click();

    // Check if help-section is rendered
    await expect(
      page.getByRole('heading', { name: /How to Use/i }),
    ).toBeVisible();
    await expect(page.getByText(/Pick your level in the/i)).toBeVisible();
  });

  test('given: click to SymbolTrainer button 1 then shortcut-use then typing to win and fail, should: see levelStrings 1 and 2, then win and fail with correct wpm + reset + focus-behaviour', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Check navigation to trainer section success
    await page.getByRole('button', { name: 'SymbolTrainer' }).nth(0).click();
    await expect(page.getByLabel('trainer-section')).toContainText('78637');

    // Check shortcut(s) to be working
    await page.keyboard.press('Meta+j');
    await expect(page.getByLabel('trainer-section')).toContainText('94864');
    await page.keyboard.press('Meta+k');
    await expect(page.getByLabel('trainer-section')).toContainText('78637');
    await page.keyboard.press('Meta+ArrowDown');
    await expect(page.getByLabel('trainer-section')).toContainText('94864');
    await page.keyboard.press('Meta+ArrowUp');
    await expect(page.getByLabel('trainer-section')).toContainText('78637');

    // Type without having to click into the input, verify its custom focus
    // behaviour. Extra character "t" sets up next assertion.
    await page.keyboard.type('78637t', { delay: 200 });

    // Verify input disabled on win, also by not having "t" included.
    await expect(page.getByRole('textbox')).toHaveValue('78637');
    await expect(page.getByRole('textbox')).toBeDisabled();

    // Check for wpm score on winning to be rendered. It is a standalone 1-3
    // digit number.
    await expect(page.getByLabel('current-wpm-score')).toContainText(
      /^\d{1,3}$/,
    );

    // Delay until (and verify) input reset after win.
    await expect(page.getByRole('textbox')).toHaveValue('', { timeout: 2100 });

    // Type again without click on input, verify focus reset behaviour after win.
    await page.keyboard.type('7863ft', { delay: 200 });

    // Verify input disabled on fail, also by not including "t".
    await expect(page.getByRole('textbox')).toHaveValue('7863f');
    await expect(page.getByRole('textbox')).toBeDisabled();

    // Verify inputString reset after fail, and delay until next interaction.
    await expect(page.getByRole('textbox')).toHaveValue('', { timeout: 1100 });

    // Click in an empty area to attempt removing focus.
    await page.mouse.click(10, 10);

    // Type again after clicking outside of input, verify focus always
    // staying on input. Also correct typing "pre-win" to be working, no reset
    // in between as long as correct characters are given.
    await page.keyboard.type('786', { delay: 200 });
    await page.waitForTimeout(1000);
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
    await page.getByRole('button', { name: /Level/i }).click();

    // Check if levelItems are rendered
    const levelSection = page.getByLabel('level-section');
    await expect(levelSection.getByRole('listitem')).toHaveCount(200);

    // Check if first and last levels are rendered with correct highscores
    await expect(levelSection.getByRole('listitem').nth(0)).toContainText('55');
    await expect(levelSection.getByRole('listitem').nth(1)).toContainText('45');
    await expect(levelSection.getByRole('listitem').nth(199)).toContainText(
      '00',
    );

    // Click on a level item
    await page
      .getByRole('button', { name: /Level 42 \(lowerCase, 5 \)/i })
      .click();

    // Check if the chosen levelstring is rendered in the trainer-section
    await expect(page.getByLabel('trainer-section')).toContainText('7-/,/');
  });

  test('given: typed and won in trainer-section, should: render new highscore in trainer-menu next to level-section button', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Navigate to trainer-section and type to create a new highscore
    await page
      .getByRole('button', { name: /SymbolTrainer/i })
      .nth(1)
      .click();
    await page.keyboard.type('78637t', { delay: 200 });

    // Verify a new highscore > 10 to be rendered in trainer-menu bar next to level-section button
    await expect(page.getByLabel('trainer-menu')).toContainText(
      /([1-9][0-9]|[1-9][0-9][0-9])/,
    );
  });

  test('given: clicked on save-section button, then backup button, and then import button, should: see save-section and correct backup and import', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Set highscores in localStorage
    const highScores = JSON.stringify({
      1: 55,
      2: 45,
    });

    await page.evaluate(scores => {
      localStorage.setItem('highScores', scores);
    }, highScores);
    await page.reload();

    // Verify successful navigation to save-section
    await page.getByRole('button', { name: /Save/i }).click();
    await expect(page.getByText(/Additional Saving Options/i)).toBeVisible();
    await expect(page.getByText(/Your scores get auto-saved/i)).toBeVisible();
    await expect(page.getByText(/Last backup download was/i)).toBeVisible();

    // Setup download listener before clicking
    const downloadPromise = page.waitForEvent('download', { timeout: 0 });
    await page.getByRole('button', { name: /Download Backup File/i }).click();

    try {
      const download = await downloadPromise;
      const downloadPath = createDownloadPath(download);

      // Ensure downloads directory exists
      await fs.promises.mkdir(path.dirname(downloadPath), { recursive: true });

      await download.saveAs(downloadPath);
      const fileContent = await fs.promises.readFile(downloadPath, 'utf8');

      expect(fileContent).toContain(highScores);

      // Cleanup downloaded file
      await fs.promises.unlink(downloadPath);
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }

    // Click the label to open the file chooser
    await page.click('label[for="file-upload"]');

    // Set the file on the input element
    await page.setInputFiles(
      '#file-upload',
      path.join(__dirname, 'fixtures', 'symbol-trainer-highScores.json'),
    );

    // Verify the imported data in localStorage
    const importedScores = await page.evaluate(() => {
      return localStorage.getItem('highScores');
    });
    expect(JSON.parse(importedScores)).toEqual({
      1: 42,
    });
  });

  test('given: clicked on help-section button 2, should: see help-section', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Verify successful navigation to help-section via button in trainer-menu bar
    await page.getByRole('button', { name: /Help/i }).nth(1).click();
    await expect(page.getByText(/How to Use/i)).toBeVisible();
    await expect(page.getByText(/Pick your level in the/i)).toBeVisible();
  });

  test('given: 2 clicks (toggle) on each button of level, help and save, should: each time see buttons-section and then trainer-section', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Navigate to level-section, via level-section button
    await page.getByRole('button', { name: /Level 01 \//i }).click();
    await expect(
      page.getByRole('button', { name: /Level 1 \(numbers, 5 \) 78637 WPM/i }),
    ).toBeVisible();

    // Navigate to trainer-section, via level-section button toggle
    await page.getByRole('button', { name: /Level 01 \//i }).click();
    await expect(page.getByLabel('trainer-section')).toContainText('78637');

    // Navigate to help-section, via help-section button
    await page.getByRole('button', { name: /Help/i }).click();
    await expect(page.getByText(/How to Use/i)).toBeVisible();

    // Navigate to trainer-section, via help-section button toggle
    await page.getByRole('button', { name: /Help/i }).click();
    await expect(page.getByLabel('trainer-section')).toContainText('78637');

    await page.getByRole('button', { name: /Save/i }).click();
    await expect(page.getByText(/Additional Saving Options/i)).toBeVisible();

    await page.getByRole('button', { name: /Save/i }).click();
    await expect(page.getByLabel('trainer-section')).toContainText('78637');
  });
});

test.describe('symbol-trainer mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });
  test('given: small screen, should: see responsive note, title and correct header links', async ({
    page,
  }) => {
    await page.goto('/symbol-trainer');

    // Responsive note(s)
    await expect(
      page.getByText(/SymbolTrainer is Desktop Only/i),
    ).toBeVisible();
    await expect(page.getByText(/In case you/i)).toBeVisible();

    // Title
    await expect(page).toHaveTitle(/SymbolTrainer/);
    // Header links
    await expect(
      page.getByRole('link', { name: /LeonWarscheck/i }),
    ).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: /About/i })).toHaveAttribute(
      'href',
      '/about',
    );
    await expect(page.getByRole('link', { name: /Tools/i })).toHaveAttribute(
      'href',
      '/symbol-trainer',
    );
  });
});

// Helper function to create download path
const createDownloadPath = download => {
  return path.join(__dirname, 'downloads', `${download.suggestedFilename()}`);
};
