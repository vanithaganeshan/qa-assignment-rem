describe('Todo Add Tests', () => {
    beforeEach(() => {
      // Login steps here (if not using cy.session)
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="email"]').type('vanithaganeshan@gmail.com');
      cy.get('input[name="password"]').type('Europe123*');
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/login');
  
      // Go to main todo page
      cy.visit('http://localhost:3000/');
    });
  
    it('adds a new todo item successfully', () => {

      cy.get('input[name="title"]').type('Complete REM assignment');
      cy.get('textarea[name="description"]').type('Write test cases and complete automation');
      cy.get('button[type="submit"]').click();
      });
      it('should add a new todo and display it in the list', () => {
        cy.get('input[name="title"]').type('My New Task');
        cy.get('textarea[name="description"]').type('This is the description for my new task.');
        cy.get('button[type="submit"]').click();
    
        // Check that new todo appears in the list
        cy.contains('My New Task').scrollIntoView().should('be.visible');
    });
    
  });