import React from 'react';
import { render, screen, fireEvent, cleanup, mount } from '@testing-library/react';
import App from './App';
import './MockMatchmedia';
import 'jest-dom/extend-expect';

let renderApp = () => render(<App />);

afterEach(() => {
  cleanup();
});

test('checks page header exists', () => {
 
  const linkElement = screen.getByText(/Library Books/i);
  expect(linkElement).toBeInTheDocument();

});

test('checks Load Data Button exists', () => {
  render(<App />);
  const linkElement = screen.getByText(/Load Data/i);
  expect(linkElement).toBeInTheDocument();
});

test('checks Load Data Invalid URL Button exists', () => {
  render(<App />);
  const linkElement = screen.getByText(/Load from Invalid URL/i);
  expect(linkElement).toBeInTheDocument();
});


describe('Load Data Button click starts a spinner', () => {
  const { getByTestId } = renderApp();
  it('Test click event', () => {
    const component = render(<App />);
    const button = getByTestId('load-data');
    fireEvent.click(button);
    jest.useFakeTimers();
    jest.runAllTimers();
    const loadingmask = getByTestId('mask');
    expect(loadingmask).toBeInTheDocument();
  });
});


// Not an expert in writing jest unit test cases for asynchronous calls. We use cucumber + selenide automation suites + feature files for these scenarios.


