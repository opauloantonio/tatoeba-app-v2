describe('When launching the app, the user', () => {
  const initialToLang = 'English';
  const initialFromLang = 'Portuguese';
  const searchText = 'Nice job';

  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    // await device.reloadReactNative();
  });

  it('should see the Home screen', async () => {
    await expect(element(by.text('Tatoeba'))).toBeVisible();
  });

  it('should be able to navigate and select language to translate from', async () => {
    const fromText = element(by.id('fromLang'));
    await fromText.tap();

    const fromLangOption = element(by.text(initialFromLang));
    await fromLangOption.tap();
  });

  it('should be able to navigate and select language to translate to', async () => {
    const toText = element(by.id('toLang'));
    await toText.tap();

    const toLangOption = element(by.text(initialToLang));
    await toLangOption.tap();
  });

  it('should be able to switch languages', async () => {
    const switcher = element(by.id('switchLangs'));
    await switcher.tap();

    const toText = element(by.id('toLang'));
    const fromText = element(by.id('fromLang'));

    await expect(toText).toHaveText(initialFromLang);
    await expect(fromText).toHaveText(initialToLang);
  });

  it('should be able to tap on search input and insert text', async () => {
    const searchInput = element(by.label('search input'));
    await searchInput.typeText(searchText);
    await expect(searchInput).toHaveText(searchText);
  });

  it('should be able to submit search and go to the Results screen', async () => {
    const submitButton = element(by.text('SEARCH'));
    await submitButton.multiTap(2);

    const resultsHeader = element(by.text(`Results for "${searchText}"`));
    await expect(resultsHeader).toBeVisible();
  });
});
