import { formatAddress, formatBalance, formatTimeAgo, isValidAddress } from '@/lib/utils';

describe('Utils Functions', () => {
  describe('formatAddress', () => {
    it('formats address correctly', () => {
      const address = 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u';
      expect(formatAddress(address)).toBe('erd1qqqq...5w6u');
      expect(formatAddress(address, 6)).toBe('erd1qqqqqq...a5w6u');
    });
  });

  describe('formatBalance', () => {
    it('formats balance correctly', () => {
      expect(formatBalance('1000000000000000000')).toBe('1.0000');
      expect(formatBalance('500000000000000000')).toBe('0.5000');
    });
  });

  describe('formatTimeAgo', () => {
    it('formats time correctly', () => {
      const now = new Date();
      const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      
      expect(formatTimeAgo(oneMinuteAgo)).toBe('1m ago');
      expect(formatTimeAgo(oneHourAgo)).toBe('1h ago');
    });
  });

  describe('isValidAddress', () => {
    it('validates MultiversX addresses', () => {
      const validAddress = 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u';
      const invalidAddress = 'invalid_address';
      
      expect(isValidAddress(validAddress)).toBe(true);
      expect(isValidAddress(invalidAddress)).toBe(false);
    });
  });
});