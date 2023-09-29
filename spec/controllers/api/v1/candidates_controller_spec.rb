require 'rails_helper'

RSpec.describe Api::V1::CandidatesController, type: :controller do
  describe 'GET #index' do
    it 'returns a list of candidates' do
      # Create some candidate records in the test database
      candidate1 = Candidate.create(name: 'Guilherme Andreúce Sobreira Monteiro',
                                    email: 'guilherme.andreuce-2@gmail.com', date_of_birth: '1996-10-24')
      candidate2 = Candidate.create(name: 'Nicole Borba Monteiro', email: 'nicole@teste.com',
                                    date_of_birth: '1995-04-25')

      # Send a GET request to the index action
      get :index

      # Expect a successful response (HTTP status 200)
      expect(response).to have_http_status(:ok)

      # Parse the JSON response and check if it contains the expected data
      response_json = JSON.parse(response.body)
      expect(response_json['candidates'].length).to eq(10)
      expect(response_json['candidates'][0]['name']).to eq('Aline Pereira')
      expect(response_json['candidates'][1]['name']).to eq('Ana Pereira')
    end
  end

  describe 'GET #show' do
    it 'returns a candidate by ID' do
      # Create a candidate record in the test database
      candidate = Candidate.create(name: 'John Doe', email: 'john@example.com', date_of_birth: '1990-01-01')

      # Send a GET request to the show action with the candidate's ID
      get :show, params: { id: candidate.id }

      # Expect a successful response (HTTP status 200)
      expect(response).to have_http_status(:ok)

      # Parse the JSON response and check if it contains the expected data
      response_json = JSON.parse(response.body)
      expect(response_json['name']).to eq('John Doe')
    end
  end

  describe 'POST #create' do
    it 'creates a new candidate' do
      # Send a POST request to create a new candidate
      post :create,
           params: { candidate: { name: 'Alice Smith', email: 'alice@example.com', date_of_birth: '1988-03-15' } }

      # Expect a successful response (HTTP status 201)
      expect(response).to have_http_status(:created)

      # Parse the JSON response and check if it contains the expected data
      response_json = JSON.parse(response.body)
      expect(response_json['name']).to eq('Alice Smith')
    end

    it 'returns error for invalid candidate' do
      # Send a POST request with invalid data
      post :create, params: { candidate: { name: '', email: 'invalid_email', date_of_birth: 'future_date' } }

      # Expect an unprocessable entity response (HTTP status 422)
      expect(response).to have_http_status(:unprocessable_entity)

      # Parse the JSON response and check if it contains error messages
      response_json = JSON.parse(response.body)
      expect(response_json).to have_key('error')
    end
  end

  describe 'PUT #update' do
    it 'updates the candidate' do
      # Create a candidate record in the test database
      candidate = Candidate.create(name: 'John Doe', email: 'john@example.com', date_of_birth: '1990-01-01')

      # Send a PUT request to update the candidate's name
      put :update, params: { id: candidate.id, candidate: { name: 'Updated Name' } }

      # Expect a successful response (HTTP status 200)
      expect(response).to have_http_status(:ok)

      # Reload the candidate record from the database and check if it was updated
      candidate.reload
      expect(candidate.name).to eq('Updated Name')
    end

    it 'returns error for invalid update' do
      # Create a candidate record in the test database
      candidate = Candidate.create(name: 'John Doe', email: 'john@example.com', date_of_birth: '1990-01-01')

      # Send a PUT request with invalid data
      put :update, params: { id: candidate.id, candidate: { email: 'invalid_email' } }

      # Expect an unprocessable entity response (HTTP status 422)
      expect(response).to have_http_status(:unprocessable_entity)

      # Parse the JSON response and check if it contains error messages
      response_json = JSON.parse(response.body)
      expect(response_json).to have_key('error')
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the candidate' do
      # Create a candidate record in the test database
      candidate = Candidate.create(name: 'John Doe', email: 'john@example.com', date_of_birth: '1990-01-01')

      # Send a DELETE request to destroy the candidate
      delete :destroy, params: { id: candidate.id }

      # Expect a no content response (HTTP status 204)
      expect(response).to have_http_status(:no_content)

      # Check if the candidate no longer exists in the database
      expect { candidate.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
