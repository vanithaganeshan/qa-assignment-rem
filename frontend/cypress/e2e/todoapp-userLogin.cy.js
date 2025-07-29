describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login'); 
  });

  it('Login with invalid/empty credentials', () => {
    cy.get('input[name="email"]').type('invaliduser@example.com');
    cy.get('input[name="password"]').type('invaliduser');
    cy.get('button[type="submit"]').click();

    cy.get('div.bg-red-200').should('contain.text', 'User does not exist')
  .and('be.visible');

  });

    //cy.contains('User does not exist',{timeout:10000}).should('be.visible'); 

  it('Login with empty credentials', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Please enter all fields').should('be.visible'); 
  });

  it('Login with valid credentials', () => {
    cy.get('input[name="email"]').type('vanithaganeshan@gmail.com');  
    cy.get('input[name="password"]').type('Europe123*');       
    cy.get('button[type="submit"]').click();

    // Assertion for user is redirected or dashboard appears
    cy.url().should('not.include', '/login');
    cy.contains('Todo App').should('be.visible');  
  });
});


