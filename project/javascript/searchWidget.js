// javascript/searchWidget.js
class SearchWidget {
    constructor() {
        this.apiKey = 'sk-proj-qL6K3jCcQ7ga7NgSB-_OgaN0hmp47I7inJTDHMC2Mp2j-GICGV5Z6KZhL9hMWiZ9M1orSeHc8fT3BlbkFJvtsA9my_oewZmfNXwyqcuB6H21JuNIl21UI1eBD_mmk5aCbjHN58xDoJBz8UT6mnBQveWsQy'; 
        this.init();
    }

    init() {
      // Create the search form dynamically
      const container = document.getElementById('food-widget');
  
      const form = document.createElement('form');
      form.id = 'ingredient-form';
  
      const label = document.createElement('label');
      label.htmlFor = 'ingredients';
      label.textContent = 'Enter ingredients (separated by commas):';
  
      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'ingredients';
      input.name = 'ingredients';
      input.placeholder = 'e.g., chicken, rice, tomato';
  
      const button = document.createElement('button');
      button.type = 'submit';
      button.textContent = 'Search Recipe';
  
      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(button);
  
      container.appendChild(form);
  
      // Event listener for form submission
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const ingredients = input.value.trim();
        if (ingredients) {
          this.showLoadingIndicator();
          this.fetchRecipeFromOpenAI(ingredients);
        } else {
          alert('Please enter at least one ingredient.');
        }
      });
    }
  
    showLoadingIndicator() {
      const loadingIndicator = document.getElementById('loadingIndicator');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'flex';
      } else {
        console.error('Loading indicator element not found.');
      }
    }
  
    hideLoadingIndicator() {
      const loadingIndicator = document.getElementById('loadingIndicator');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      } else {
        console.error('Loading indicator element not found.');
      }
    }
  
    async fetchRecipeFromOpenAI(ingredients) {
      const prompt = `Give me a recipe that uses the following ingredients: ${ingredients}. Include the name of the dish, ingredients with measurements, and detailed instructions in English.`;
  
      const data = {
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "max_tokens": 500,
        "temperature": 0.7
      };
  
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify(data)
        });
  
        const responseData = await response.json();
  
        if (response.ok && responseData.choices && responseData.choices.length > 0) {
          const recipeText = responseData.choices[0].message.content.trim();
          // Store the recipe in localStorage
          localStorage.setItem('recipe', recipeText);
          // Hide the loading indicator
          this.hideLoadingIndicator();
          // Redirect to recipe.html
          window.location.href = 'recipe.html';
        } else {
          console.error('Error from OpenAI API:', responseData);
          alert('Could not fetch recipe. Please try again later.');
          this.hideLoadingIndicator();
        }
      } catch (error) {
        console.error('Error fetching recipe from OpenAI:', error);
        alert('An error occurred while fetching the recipe.');
        this.hideLoadingIndicator();
      }
    }
  }
  
  // Initialize the widget when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new SearchWidget();
  });
  