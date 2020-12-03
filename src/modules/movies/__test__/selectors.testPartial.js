// External
import { expect } from 'chai';

// Internal
import * as selectors from '../selectors';
import util from '../util';

const moviesSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    beforeEach(() => {
      // assign for each test block
      mockStore.movies = util.buildMockStore({
        list: {
          1: {
            id: 1,
            name: 'blah',
          },
        },
        selectedId: 1,
        search: {
          prevId: 1,
          name: null,
          tags: null,
          categories: null,
        },
      });
    });

    it('Should return equals', () => {
      expect(selectors.getMoviesStore(mockStore))
        .to.deep.equal(mockStore.movies)
        .and.an('object');
    });

    it('Should return the movies list', () => {
      expect(selectors.getMoviesList(mockStore))
        .to.deep.equal(mockStore.movies.list)
        .and.an('object');
    });

    it('Should return the selected movie id', () => {
      expect(selectors.getSelectedMovieId(mockStore))
        .to.deep.equal(mockStore.movies.selectedId)
        .and.a('number');
    });

    it('Should return the selected movie', () => {
      expect(selectors.getSelectedMovie(mockStore))
        .to.deep.equal({
          id: 1,
          name: 'blah',
        })
        .and.an('object');
    });

    it('Should return the movies list as an array', () => {
      expect(selectors.getMovieListArray(mockStore))
        .to.deep.equal([{ id: 1, name: 'blah' }])
        .and.an('array');
    });

    it('Should return the movies search info', () => {
      expect(selectors.getMoviesSearch(mockStore))
        .to.deep.equal({
          prevId: 1,
          name: null,
          tags: null,
          categories: null,
        })
        .and.an('object');
    });
  });

export default moviesSelectorsTest;
