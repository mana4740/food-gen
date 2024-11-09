// javascript/displayRecipes.js
class DisplayRecipes {
    constructor() {
      this.init();
    }
  
    init() {
      // Retrieve the recipe from localStorage
      const recipeText = localStorage.getItem('recipe');
      if (recipeText) {
        // Display the recipe immediately
        this.displayRecipe(recipeText);
      } else {
        alert('No recipe available. Please search for a recipe first.');
        // Redirect back to enter-ingredients.html
        window.location.href = 'enter-ingredients.html';
      }
    }
  
    displayRecipe(recipeText) {
      // Find the container to display the recipe
      const container = document.querySelector('.paper');
  
      // Check if container exists
      if (!container) {
        console.error('Recipe container not found.');
        return;
      }
  
      // Clear any existing content
      container.innerHTML = '';
  
      // Format the recipe text
      const formattedRecipe = this.formatRecipe(recipeText);
  
      // Insert the formatted recipe into the container
      container.innerHTML = formattedRecipe;
    }
  
    formatRecipe(recipeText) {
      // Basic formatting: Convert line breaks to paragraphs
      const lines = recipeText.split('\n');
      let formattedText = '';
  
      lines.forEach(line => {
        line = line.trim();
        if (line !== '') {
          if (/^Ingredients:/i.test(line) || /^Instructions:/i.test(line) || /^Preparation:/i.test(line)) {
            formattedText += `<h3>${line}</h3>`;
          } else if (/^\d+\./.test(line)) {
            // Steps in the recipe
            formattedText += `<p>${line}</p>`;
          } else {
            formattedText += `<p>${line}</p>`;
          }
        }
      });
  
      return formattedText;
    }
  }
  
  // Initialize the display module when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new DisplayRecipes();
  });
  