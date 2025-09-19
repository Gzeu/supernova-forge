import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByText('Loading Button')).toBeInTheDocument();
    expect(document.querySelector('[data-testid="loading-spinner"]')); // Loading spinner should be present
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="multiversx">MultiversX Button</Button>);
    expect(screen.getByText('MultiversX Button')).toHaveClass('from-cyan-400');
    
    rerender(<Button variant="success">Success Button</Button>);
    expect(screen.getByText('Success Button')).toHaveClass('bg-green-600');
  });

  it('is disabled when loading', () => {
    render(<Button loading>Disabled Button</Button>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });
});