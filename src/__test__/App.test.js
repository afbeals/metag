import { render, screen } from '@testing-library/react';
import App from '../App';
import ReactDOM from 'react-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

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
