import StackHeader from '@components/StackHeader';

export const defaultStackScreenOptions = {
  header: StackHeader,
};

export enum ScreenName {
  // those are all screens inside any navigator
  HomeTab = 'HomeTab',
  BookmarksTab = 'BookmarksTab',
  HistoryTab = 'HistoryTab',
  AboutTab = 'AboutTab',

  Home = 'Home',
  ChooseLanguage = 'ChooseLanguage',
  SearchResults = 'SearchResults',
  SentenceDetails = 'SentenceDetails',

  About = 'About',
  History = 'History',
  Bookmarks = 'Bookmarks',
}

export enum BottomTabLabel {
  Home = 'Home',
  About = 'About',
  History = 'History',
  Bookmarks = 'Bookmarks',
}
