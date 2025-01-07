export class ApiService {
  constructor() {
    this.apiURL = 'https://localhost:7094/api';
  }

  handleError(error) {
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } 
  }

  async fetchWithConfig(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    };

    try {
      const response = await fetch(url, defaultOptions);
      if (!response.ok) {
        throw {
          response: {
            data: await response.json().catch(() => ({})),
            status: response.status,
            headers: Object.fromEntries(response.headers)
          }
        };
      }

      const text = await response.text();
    if (text) {
      return JSON.parse(text); // Parse only if there's a body
    } else {
      return null; // Or return undefined, or some other default value
    }
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  getTasks() {
    return this.fetchWithConfig(`${this.apiURL}/tasks`, {
      method: 'GET'
    });
  }

  deleteTask(id) {
    return this.fetchWithConfig(`${this.apiURL}/tasks/${id}`, {
      method: 'DELETE'
    }).catch(error => {
      console.log('delete', error);
      this.handleError(error);
    });
  }

  createTask(data) {
    return this.fetchWithConfig(`${this.apiURL}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  completeTask(data) {
    data.IsCompleted = true;
    return this.updateTask(data.id, data);
  }

  updateTask(id, data) {
    return this.fetchWithConfig(`${this.apiURL}/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
}

export default ApiService;