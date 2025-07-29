describe('Delete Todo Task Flow', () => {
  const email = 'tester1@gmail.com';
  const password = 'Tester1*';
  const todoTitle = 'Delete the created task2';
  const todoDescription = 'This task will be deleted in test';

  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login');
  });

  it('should create and delete a todo task', () => {
    // Step 1: Create a new task
    cy.get('input[name="title"]').type(todoTitle).type('{enter}');
    cy.get('textarea[name="description"]').type(todoDescription);
    cy.get('button[type="submit"]').click();

    // Step 2: Confirm it's added
    cy.contains('h4.task-title', todoTitle).should('exist');

    // Step 3: Intercept the DELETE API
    cy.intercept('DELETE', '**/api/task/removeTask').as('deleteTask');

    // Step 4: Click delete icon
    cy.contains('h4.task-title', todoTitle)
      .parents('div.bg-slate-300')
      .find('svg')
      .click({ force: true });

    // Step 5: Wait for the DELETE request to complete
    cy.wait('@deleteTask').its('response.statusCode').should('eq', 200);
    

    // Step 6: Confirm success response (optional)
    cy.wait(1500); // add buffer for UI update

    // Step 7: Assert it's no longer in the DOM
    cy.contains('h4.task-title', todoTitle).should('not.exist');
  });
})
