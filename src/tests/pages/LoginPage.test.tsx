import { render, screen } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';


test("Login page renders title", () => {
  render(<LoginPage value={{}} />);
  const titleElement = screen.getByText(/^Log In$/i);
  expect(titleElement).toBeInTheDocument();
});
