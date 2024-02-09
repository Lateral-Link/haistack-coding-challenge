# frozen_string_literal: true

require 'swagger_helper'

describe 'Candidates API' do
  path '/api/v1/candidates' do
    get 'Retrieves a list of candidates' do
      tags 'Candidates'
      produces 'application/json'
      parameter name: :page, in: :query, type: :integer
      parameter name: :per_page, in: :query, type: :integer

      response '200', 'Candidates list' do
        schema type:       :object,
               properties: {
                 candidates: {
                   type:  :array,
                   items: {
                     type:       :object,
                     properties: {
                       id:        { type: :integer },
                       name:      { type: :string },
                       email:     { type: :string },
                       birthdate: { type: :string, format: :date }
                     }
                   }
                 },
                 meta:       {
                   type:       :object,
                   properties: {
                     page:        { type: :integer },
                     per_page:    { type: :integer },
                     total_pages: { type: :integer },
                     total_count: { type: :integer }
                   }
                 }
               }

        let(:page) { 1 }
        let(:per_page) { 20 }
        run_test!
      end
    end

    post 'Creates a candidate' do
      tags 'Candidates'
      consumes 'application/json'
      parameter name: :candidate, in: :body, schema: {
        type:       :object,
        properties: {
          name:      { type: :string, example: 'Andre' },
          email:     { type: :string, format: :email, example: 'andre@haistack.ai' },
          birthdate: { type: :string, format: :date, example: '1992-04-27' }
        },
        required:   %w[name email birthdate]
      }

      response '201', 'Candidate created' do
        let(:candidate) { { name: 'foo', email: 'foo@example.com', birthdate: '1990-01-01' } }
        run_test!
      end

      response '422', 'Invalid request' do
        let(:candidate) { { name: 'foo' } }
        run_test!
      end
    end
  end

  path '/api/v1/candidates/{id}' do
    get 'Retrieves a candidate' do
      tags 'Candidates'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer

      response '200', 'Candidate found' do
        schema type:       :object,
               properties: {
                 id:        { type: :integer },
                 name:      { type: :string },
                 email:     { type: :string },
                 birthdate: { type: :string, format: :date }
               }

        let(:id) { create(:candidate).id }
        run_test!
      end

      response '404', 'Candidate not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end

    put 'Updates a candidate' do
      tags 'Candidates'
      consumes 'application/json'
      parameter name: :id, in: :path, type: :integer
      parameter name: :candidate, in: :body, schema: {
        type:       :object,
        properties: {
          name:      { type: :string, example: 'Andre' },
          email:     { type: :string, format: :email, example: 'andre@haistack.ai' },
          birthdate: { type: :string, format: :date, example: '1992-04-27' }
        }
      }

      response '200', 'Candidate updated' do
        let(:id) { create(:candidate).id }
        let(:candidate) { { name: 'foo', email: 'andre@haistack.ai', birthdate: '1990-01-01' } }

        run_test!
      end

      response '422', 'Invalid request' do
        let(:id) { create(:candidate).id }
        let(:candidate) { { email: 'foo' } }

        run_test!
      end

      response '404', 'Candidate not found' do
        let(:id) { 'invalid' }
        let(:candidate) { { name: 'foo', email: 'andre@haistack.ai, birthdate: 1990-01-01' } }

        run_test!
      end
    end

    delete 'Deletes a candidate' do
      tags 'Candidates'
      parameter name: :id, in: :path, type: :integer

      response '200', 'Candidate deleted' do
        let(:id) { create(:candidate).id }
        run_test!
      end

      response '404', 'Candidate not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end
