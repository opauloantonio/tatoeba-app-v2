describe.only('Bookmarks', () => {
  const searchText = 'My favorite';

  beforeAll(async () => {
    await device.launchApp();
  });

  describe('When searching for sentences, the user', () => {
    it('should be able to see a list of results', async () => {
      const searchInput = element(by.label('search input'));
      const submitButton = element(by.text('SEARCH'));

      await searchInput.typeText(searchText);
      await submitButton.multiTap(2);
    });

    it('should be able to add sentences to their bookmarks', async () => {
      // This is flaky, it would be better to make sure we scroll enough for a new SentenceContainer
      // to appear at the top and press that specific container's menu anchor
      for (let i = 0; i < 2; i++) {
        const menuAnchor = element(by.id('mainSentenceMenuAnchor')).atIndex(i);
        await menuAnchor.tap();
        
        const addBookmarkButton = element(by.text('Add bookmark'));
        await expect(addBookmarkButton).toBeVisible();
        await addBookmarkButton.tap();
      }
    });

    it('should be able to navigate to the Bookmarks screen', async () => {
      // TODO I only set this id on a single element, the BookmarkIcon
      // but Detox complains that multiple elements match, why is that?
      const bookmarksTab = element(by.id('bookmarks-tab')).atIndex(0);
      await bookmarksTab.tap();
    });

    it.skip('should be able to delete individual bookmarks', async () => {});

    it('should be able to delete all bookmarks at once', async () => {
      const clearBooksmarksButton = element(by.text('CLEAR BOOKMARKS'));
      await clearBooksmarksButton.tap();

      // system dialog, breaks on iOS?
      await element(by.text('Confirm')).tap();

      const emptyText = element(by.text('Your bookmarks will appear here'));
      await expect(emptyText).toBeVisible();
    });
  });
});
