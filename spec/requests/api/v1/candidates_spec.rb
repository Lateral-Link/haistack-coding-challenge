require 'rails_helper'

RSpec.describe 'api/v1/candidates', type: :request do
  # Helper method to parse json response
  def json_body
    JSON.parse(response.body)
  end

  let(:valid_attributes) do
    attributes_for(:candidate)
  end

  let(:invalid_attributes_missing_keys) do
    {}
  end

  let(:invalid_attributes_missing_values) do
    attributes_for(:candidate, name: '', email: '', birth_date: '')
  end

  let(:invalid_attributes_invalid_email) do
    attributes_for(:candidate, name: 'John Doe', email: 'invalid_email', birth_date: '2000-01-01')
  end

  let(:invalid_attributes_future_date) do
    attributes_for(:candidate, name: 'John Doe', email: 'john.doe@example.com', birth_date: Date.tomorrow.to_s)
  end

  describe 'GET /index' do
    it 'returns success' do
      get api_v1_candidates_url
      expect(response).to be_successful
    end

    it 'returns a list of candidates equal to 3' do
      get api_v1_candidates_url
      expect(json_body.count).to eq(1)
    end

    # every candidate in the list should have the correct attributes
    it 'returns the correct attributes for each candidate' do
      get api_v1_candidates_url

      json_body.each do |candidate|
        expect(candidate).to include(candidate.slice(:id, :name, :email, :birth_date).stringify_keys)
      end
    end
  end

  describe 'GET /show' do
    let!(:candidate) { create(:candidate) }

    it 'renders a successful response and returns the correct candidate' do
      get api_v1_candidate_url(candidate.id)
      expect(response).to be_successful
      expect(json_body).to have_key('id')
      expect(json_body).to have_key('name')
      expect(json_body).to have_key('email')
      expect(json_body).to have_key('birth_date')
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Candidate' do
        expect do
          post api_v1_candidates_url, params: valid_attributes
        end.to change(Candidate, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(json_body).to include(valid_attributes.stringify_keys.merge('id' => Candidate.last.id))
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Candidate with missing keys' do
        expect do
          post api_v1_candidates_url, params: invalid_attributes_missing_keys
        end.not_to change(Candidate, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not create a new Candidate with missing values' do
        expect do
          post api_v1_candidates_url, params: invalid_attributes_missing_values
        end.not_to change(Candidate, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not create a new Candidate with invalid email' do
        expect do
          post api_v1_candidates_url, params: invalid_attributes_invalid_email
        end.not_to change(Candidate, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not create a new Candidate with future date' do
        expect do
          post api_v1_candidates_url, params: invalid_attributes_future_date
        end.not_to change(Candidate, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /update' do
    let!(:candidate) { create(:candidate, valid_attributes) }
    let!(:other_candidate) { create(:candidate) }
    let(:new_attributes) { attributes_for(:candidate, email: other_candidate.email) }

    context 'with valid parameters' do
      it 'updates the requested candidate and returns the updated candidate' do
        patch api_v1_candidate_url(candidate), params: valid_attributes
        expect(response).to be_successful
      end
    end

    context 'with invalid parameters' do
      it 'does not update the candidate with missing keys' do
        patch api_v1_candidate_url(candidate), params: invalid_attributes_missing_keys
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not update the candidate with missing values' do
        patch api_v1_candidate_url(candidate), params: invalid_attributes_missing_values
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not update the candidate with invalid email' do
        patch api_v1_candidate_url(candidate), params: invalid_attributes_invalid_email
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not update the candidate with future date' do
        patch api_v1_candidate_url(candidate), params: invalid_attributes_future_date
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not update the candidate with email already taken' do
        patch api_v1_candidate_url(candidate), params: new_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /destroy' do
    let!(:candidate) { create(:candidate, valid_attributes) }

    it 'destroys the requested candidate and returns status code :no_content' do
      expect do
        delete api_v1_candidate_url(candidate)
      end.to change(Candidate, :count).by(-1)

      expect(response).to have_http_status(:ok)
    end
  end
end
