# frozen_string_literal: true

require 'swagger_helper'

describe 'Candidates API' do
  path '/api/v1/candidates' do
    post 'Creates a candidate' do
      tags 'Candidates'
      consumes 'application/json'
      parameter name: :candidate, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string, example: 'Andre' },
          email: { type: :string, format: :email, example: 'andre@haistack.ai' },
          birthdate: { type: :string, format: :date, example: '1992-04-27' }
        },
        required: %w[name email birthdate]
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
end
