import { describe, it, expect } from 'vitest';
import { BasicMembership, PremiumMembership, SuperMembership } from '../src/memberships';
import { Membership } from '../src/Membership';
import { FakeLoanBuilder } from '../fakes/FakeLoan';

describe('membership', () => {
  describe('Basic membership', () => {
    it ('should have the correct id', () => {
      const membership: Membership = new BasicMembership();

      expect(membership.getId()).toBe('basic');
    });

    it ('should allow loan when there list is empty', () => {
      const membership: Membership = new BasicMembership();

      expect(membership.canLoan([])).toBe(true);
    });

    it ('should reject loan when there\'s 1 loan or more', () => {
      const membership: Membership = new BasicMembership();
      const FakeLoan = new FakeLoanBuilder().build();

      expect(membership.canLoan([FakeLoan])).toBe(false);
    });

    it ('should allow the correct amount of loan days', () => {
      const membership: Membership = new BasicMembership();

      expect(membership.getDurationInDays()).toBe(7);
    });
  });

  describe('Premium membership', () => {
    it ('should have the correct id', () => {
      const membership: Membership = new PremiumMembership();

      expect(membership.getId()).toBe('premium');
    });

    it ('should allow the correct amount of loan days', () => {
      const membership: Membership = new PremiumMembership();

      expect(membership.getDurationInDays()).toBe(14);
    });

    it ('should reject loan if any of them is overdue', () => {
      const membership: Membership = new PremiumMembership();

      const loans = [
        new FakeLoanBuilder().build(),
        new FakeLoanBuilder().withIsOverdueValue(true).build(),
        new FakeLoanBuilder().build()
      ];

      expect(membership.canLoan(loans)).toBeFalsy();
    });

    it ('should reject loan if there are more than 5 existing loans', () => {
      const membership: Membership = new PremiumMembership();
      const loans = new Array(6).fill(new FakeLoanBuilder().build());

      expect(membership.canLoan(loans)).toBeFalsy();
    });
  });

  describe('Super membership', () => {
    it ('should have the correct id', () => {
      const membership: Membership = new SuperMembership();

      expect(membership.getId()).toBe('super');
    });

    it ('should reject loan if any of them is overdue', () => {
      const membership: Membership = new SuperMembership();

      const loans = [
        new FakeLoanBuilder().build(),
        new FakeLoanBuilder().withIsOverdueValue(true).build(),
        new FakeLoanBuilder().build()
      ];

      expect(membership.canLoan(loans)).toBeTruthy();
    });

    it ('should reject loan if there are more than 5 existing loans', () => {
      const membership: Membership = new SuperMembership();
      const loans = new Array(6).fill(new FakeLoanBuilder().build());

      expect(membership.canLoan(loans)).toBeFalsy();
    });
  });
});