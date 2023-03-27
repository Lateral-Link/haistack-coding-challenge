require 'rails_helper'

RSpec.describe 'api/v1/candidates', type: :request do
  # Helper method to parse json response
  def json_body
    JSON.parse(response.body)
  end

  let(:valid_attributes) do
    attributes_for(:candidate)
  end

  let(:invalid_attributes) do
    attributes_for(:candidate, name: '', email: 'invalid_email', birth_date: '2100-01-01')
  end

  describe 'GET /index' do
    let!(:candidates) { create_list(:candidate, 3) }

    before { get api_v1_candidates_url }

    it 'returns success' do
      expect(response).to be_successful
    end

    it 'returns a list of candidates equal to 3' do
      expect(json_body.count).to eq(3)
    end

    # every candidate in the list should have the correct attributes
    it 'returns the correct attributes for each candidate' do
      candidates.each do |candidate|
        expect(json_body).to include(candidate.slice(:id, :name, :email, :birth_date).stringify_keys)
      end
    end
  end

  describe 'GET /show' do
    let!(:candidate) { create(:candidate, valid_attributes) }

    before { get api_v1_candidate_url(candidate) }

    it 'renders a successful response and returns the correct candidate' do
      expect(response).to be_successful
      expect(json_body).to eq(candidate.slice(:id, :name, :email, :birth_date).stringify_keys)
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
      it 'does not create a new Candidate' do
        expect do
          post api_v1_candidates_url, params: invalid_attributes
        end.not_to change(Candidate, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_body).to eq({
                                  'errors' => {
                                    'name' => ["can't be blank"],
                                    'email' => ['is invalid'],
                                    'birth_date' => ['must be before 2003-03-27']
                                  }
                                })
      end
    end
  end

  describe 'PATCH /update' do
    let!(:candidate) { create(:candidate, valid_attributes) }
    let(:new_attributes) { attributes_for(:candidate) }

    before { patch api_v1_candidate_url(candidate), params: new_attributes }

    context 'with valid parameters' do
      it 'updates the requested candidate and returns the updated candidate' do
        candidate.reload
        expect(candidate).to have_attributes(new_attributes.stringify_keys)
        expect(response).to be_successful
        expect(json_body).to eq(candidate.slice(:id, :name, :email, :birth_date).stringify_keys)
      end
    end

    context 'with invalid parameters' do
      let(:new_attributes) { invalid_attributes }

      it "renders a successful response (i.e. to display the 'edit' template)" do
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE /destroy' do
    let!(:candidate) { create(:candidate, valid_attributes) }

    it 'destroys the requested candidate and returns status code :no_content' do
      expect do
        delete api_v1_candidate_url(candidate)
      end.to change(Candidate, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
