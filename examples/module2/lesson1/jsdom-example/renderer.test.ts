// @vitest-environment jsdom

import { describe, expect, test } from 'vitest';
import { renderItems } from './renderer';

const users: User[] = [
  { id: 1, name: 'John', age: 30, role: 'user' },
  { id: 2, name: 'Jane', age: 25, role: 'admin' },
  { id: 3, name: 'Jack', age: 40, role: 'user' },
];

describe('User renderer', () => {
  test('should render all users if admin is rendering the list', () => {
    localStorage.setItem('userRole', 'admin');

    const container = document.createElement('div');
    renderItems(container, users);
    expect(Array.from(container.querySelectorAll('li'))).toHaveLength(3);
    const items = Array.from(container.querySelectorAll('li'));
    expect(items.at(0)?.textContent).toContain('John');
    expect(items.at(1)?.textContent).toContain('Jane');
    expect(items.at(2)?.textContent).toContain('Jack');
  });

  test('should render only regular users if non-admin is rendering the list', () => {
    localStorage.setItem('userRole', 'user');

    const container = document.createElement('div');
    renderItems(container, users);
    expect(Array.from(container.querySelectorAll('li'))).toHaveLength(2);

    const items = Array.from(container.querySelectorAll('li'));
    expect(items.at(0)?.textContent).toContain('John');
    expect(items.at(1)?.textContent).toContain('Jack');
  });
});
