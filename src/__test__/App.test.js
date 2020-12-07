import { render } from '@testing-library/react';
import App from '../App';
import ReactDOM from 'react-dom';

describe('test ReactDOM', () => {
  beforeEach(() => {
    ReactDOM.render = jest.fn();
  });
  afterAll(() => {
    ReactDOM.render.mockRestore();
  });
  it('renders learn react link', () => {
    render(<App />);
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
