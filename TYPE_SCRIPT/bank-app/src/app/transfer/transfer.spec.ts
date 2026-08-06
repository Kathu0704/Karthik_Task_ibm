import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Transfer } from './transfer';
import { BankService } from '../services/bank';

type BankServiceMock = {
  addTransaction: ReturnType<typeof vi.fn>;
  updateBalance: ReturnType<typeof vi.fn>;
  currentUser: { id: number; accountNumber: string; balance: number };
};

describe('Transfer', () => {
  let component: Transfer;
  let fixture: ComponentFixture<Transfer>;
  let bankServiceSpy: BankServiceMock;

  beforeEach(async () => {
    bankServiceSpy = {
      addTransaction: vi.fn(),
      updateBalance: vi.fn(),
      currentUser: { id: 1, accountNumber: '123', balance: 1000 }
    };

    await TestBed.configureTestingModule({
      imports: [Transfer],
      providers: [{ provide: BankService, useValue: bankServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(Transfer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transfer amount when valid', fakeAsync(() => {
    bankServiceSpy.addTransaction.mockReturnValue(of({}));
    bankServiceSpy.updateBalance.mockReturnValue(of({}));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    component.transferMoney('456', '200');
    tick();

    expect(bankServiceSpy.addTransaction).toHaveBeenCalledWith({
      userId: 1,
      accountNumber: '123',
      type: 'Transfer',
      receiver: '456',
      amount: 200
    });
    expect(bankServiceSpy.updateBalance).toHaveBeenCalledWith(1, 800);
    expect(bankServiceSpy.currentUser.balance).toBe(800);
    expect(alertSpy).toHaveBeenCalledWith('Transfer Successful');
  }));

  it('should reject zero or negative transfer amount', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    component.transferMoney('456', '0');

    expect(alertSpy).toHaveBeenCalledWith('Enter a valid amount');
    expect(bankServiceSpy.addTransaction).not.toHaveBeenCalled();
    expect(bankServiceSpy.updateBalance).not.toHaveBeenCalled();
  });

  it('should reject transfer when balance is insufficient', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    component.transferMoney('456', '1500');

    expect(alertSpy).toHaveBeenCalledWith('Insufficient Balance');
    expect(bankServiceSpy.addTransaction).not.toHaveBeenCalled();
    expect(bankServiceSpy.updateBalance).not.toHaveBeenCalled();
  });
});
