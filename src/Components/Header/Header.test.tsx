import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders learn react link', () => {
  render(<Header />);
  const startButton = screen.getByText(/start/i);
  expect(startButton).toBeInTheDocument();

  const cancelButton = screen.getByText(/cancel/i);
  expect(cancelButton).toBeInTheDocument();

  const bubbleSortButton = screen.getByText(/bubble/i);
  expect(bubbleSortButton).toBeInTheDocument();
  const selectionSortButton = screen.getByText(/selection/i);
  expect(selectionSortButton).toBeInTheDocument();
  const insertionSortButton = screen.getByText(/insertion/i);
  expect(insertionSortButton).toBeInTheDocument();
  const mergeSortButton = screen.getByText(/merge/i);
  expect(mergeSortButton).toBeInTheDocument();
  const quickSortButton = screen.getByText(/quick/i);
  expect(quickSortButton).toBeInTheDocument();
});
