# Haistack Coding Challenge

Coding challenge presented to candidates interviewing for a role at [Haistack.AI](https://www.linkedin.com/company/haistack/).

_#findyourneedle_

![A screenshot of the application](SCREENSHOT.png)

## Installation

1. Install [Docker Desktop](https://docs.docker.com/get-docker/).
2. [Clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
3. Copy the example [environment file](https://docs.docker.com/compose/environment-variables/env-file/).   
4. [Build the container image](https://docs.docker.com/engine/reference/commandline/compose_build/).
5. [Install JavaScript dependencies](https://classic.yarnpkg.com/en/docs/cli/install).
6. [Create and start the containers](https://docs.docker.com/engine/reference/commandline/compose_up/).

```shell
git clone git@github.com:Lateral-Link/haistack-coding-challenge.git

cd haistack-coding-challenge

cp .env.example .env

docker compose build --no-cache

docker compose --rm app yarn install

docker compose up
```

## Usage

Browse to http://localhost:3000.

### Running tests

```shell
docker compose run -e RAILS_ENV=test --rm app bundle exec rspec
```

## Support

Contact the authors in case of problems.  

## Contributing

Follow [these instructions](https://docs.github.com/en/get-started/quickstart/contributing-to-projects).

## Authors and acknowledgment

- [Mike Heise](mailto:mheise@haistack.ai)
- [Will Rosa](mailto:wrosa@haistack.ai)

## License

Copyright 2023 [Haistack.AI](https://www.linkedin.com/company/haistack/)

# Issue 5

We'll be solving this issue:
Create the candidates section by following these rules:

A list of all candidates should include their name, email address, options to edit and delete each record, and an option to add a new record.
A candidate must have a name, a unique email address, and a date of birth in the past.
The frontend must be implemented using React.
The backend must be implemented as a REST API.
The backend must implement tests using RSpec.

## Solution

First of all, I created a new model called Candidate with the following command:

rails generate model Candidate name:string email:string date_of_birth:date

and then I created the migration with:

docker-compose run app bundle exec rake db:migrate

I also added some validations to the model as follows:
```
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validate :date_of_birth_in_past

  def date_of_birth_in_past
    return unless date_of_birth.present? && date_of_birth > Date.current

    errors.add(:date_of_birth, 'must be in the past')
  end
```
I've created the controller with the following command:

rails generate controller Candidates

and then I've added some basic crud actions to the controller:
```
class CandidatesController < ApplicationController
    before_action :set_candidate, only: %i[show update destroy]

    def index
      candidates = Candidate.all
      render json: candidates
    end

    def show
      render json: @candidate
    end

    def create
      candidate = Candidate.new(candidate_params)
      if candidate.save
        render json: candidate, status: :created
      else
        render json: { error: candidate.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @candidate.update(candidate_params)
        render json: @candidate
      else
        render json: { error: @candidate.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @candidate.destroy
      head :no_content
    end

    private

    def set_candidate
      @candidate = Candidate.find(params[:id])
    end

    def candidate_params
      params.require(:candidate).permit(:name, :email, :date_of_birth)
    end
  end
```

I've deleted some specs that were created by default and added some tests to the candidates controller:
```
describe 'GET #index' do
    it 'returns a list of candidates' do
      # Create some candidate records in the test database
      candidate1 = Candidate.create(name: 'John Doe', email: 'john@example.com', date_of_birth: '1990-01-01')
      candidate2 = Candidate.create(name: 'Jane Doe', email: 'jane@example.com', date_of_birth: '1992-02-02')

      # Send a GET request to the index action
      get :index

      # Expect a successful response (HTTP status 200)
      expect(response).to have_http_status(:ok)

      # Parse the JSON response and check if it contains the expected data
      response_json = JSON.parse(response.body)
      expect(response_json.length).to eq(2)
      expect(response_json[0]['name']).to eq('John Doe')
      expect(response_json[1]['name']).to eq('Jane Doe')
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
  ```