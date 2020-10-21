// A component that has methods should be tested. Alternatively, use this to assert its dumbness
export const expectToBeDumb = (component: {}) => {
  const methods = Object.getOwnPropertyNames(component).filter(prop => typeof prop === 'function');
  expect(methods.length).toBe(0);
};

