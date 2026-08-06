import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Login } from './login';
import { BankService } from '../services/bank';

type BankServiceMock = {
  getUsers: ReturnType<typeof vi.fn>;
};

type RouterMock = {
  navigate: ReturnType<typeof vi.fn>;
};

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let bankServiceSpy: BankServiceMock;
  let routerSpy: RouterMock;

  beforeEach(async () => {
    bankServiceSpy = { getUsers: vi.fn() };
    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: BankService, useValue: bankServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully with valid credentials', fakeAsync(() => {
    const user = { id: 1, accountNumber: '123', password: 'pwd' };
    bankServiceSpy.getUsers.mockReturnValue(of([user]));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    component.login('123', 'pwd');
    tick();

    expect(bankServiceSpy.getUsers).toHaveBeenCalled();
    expect(component['bank'].currentUser).toEqual(user);
    expect(alertSpy).toHaveBeenCalledWith('Login Successful');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should show invalid credentials message for wrong login', fakeAsync(() => {
    bankServiceSpy.getUsers.mockReturnValue(of([]));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    component.login('123', 'wrong');
    tick();

    expect(alertSpy).toHaveBeenCalledWith('Invalid Account Number or Password');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));

  it('should show server error message when getUsers fails', fakeAsync(() => {
    bankServiceSpy.getUsers.mockReturnValue(throwError(() => new Error('Network error')));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    component.login('123', 'pwd');
    tick();

    expect(alertSpy).toHaveBeenCalledWith('Unable to connect to the server.');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));
});
