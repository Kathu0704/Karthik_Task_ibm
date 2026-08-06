import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Register } from './register';
import { BankService } from '../services/bank';

type BankServiceMock = {
  registerUser: ReturnType<typeof vi.fn>;
};

type RouterMock = {
  navigate: ReturnType<typeof vi.fn>;
};

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let bankServiceSpy: BankServiceMock;
  let routerSpy: RouterMock;

  beforeEach(async () => {
    bankServiceSpy = { registerUser: vi.fn() };
    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        { provide: BankService, useValue: bankServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a new user with valid details', fakeAsync(() => {
    bankServiceSpy.registerUser.mockReturnValue(of({}));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    component.register('123', 'pwd', '500');
    tick();

    expect(bankServiceSpy.registerUser).toHaveBeenCalledWith({
      accountNumber: '123',
      password: 'pwd',
      balance: 500
    });
    expect(alertSpy).toHaveBeenCalledWith('Account Created Successfully');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should show an error for invalid registration details', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    component.register('', '', '0');

    expect(alertSpy).toHaveBeenCalledWith('Enter valid details');
    expect(bankServiceSpy.registerUser).not.toHaveBeenCalled();
  });
});
