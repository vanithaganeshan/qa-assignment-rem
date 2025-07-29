describe('User Register Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/register'); 
    });


    // Positive Case: Valid Credentials
  
    it('Register with valid credentials and check welcome message', () => {
        const random = Math.floor(Math.random() * 10000);
        const name = 'yuga';
        const email = `yuga${random}@example.com`;
      
        cy.get('input[name="name"]').type(name);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type('Europe123*');
        cy.get('button[type="submit"]').click();
      
        // Assertion: Check welcome message with username
        cy.contains('welcome,').should('be.visible');
        cy.get('p.mr-5 span.text-blue-800').should('contain.text', name);
      });

// Negative Case: Empty fields

  it('Should show error when all fields are empty', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Expected a string but received a undefined').should('be.visible');
  });

//   //  Negative Case: Invalid email format
  it('Should show error for invalid email format', () => {
    cy.get('input[name="name"]').type('user');
    cy.get('input[name="email"]').type('usermail.com');
    cy.get('input[name="password"]').type('User123*');
    cy.get('button[type="submit"]').click();
    cy.contains('Please enter a valid email').should('be.visible');
  });

  //  Negative Case: Weak password
  it('Should show error for weak password', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('Please enter a strong password').should('be.visible');
  });

//   //  Negative Case: Already registered email
  it('Should show error for already registered email', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('vanithaganeshan@gmail.com'); // already registered
    cy.get('input[name="password"]').type('Europe123*');
    cy.get('button[type="submit"]').click();
    cy.contains('User already exists').should('be.visible');
  });
});
    
