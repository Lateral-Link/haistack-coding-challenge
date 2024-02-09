# frozen_string_literal: true

RSpec.describe 'Api::V1::Candidates' do
  describe 'POST /create' do
    subject(:create_candidate) { post '/api/v1/candidates', params: params }

    let(:params) { { candidate: { name: name, email: email, birthdate: birthdate } } }
    let(:name) { 'John Doe' }
    let(:email) { 'email@example.com' }
    let(:birthdate) { '1990-01-01' }

    context 'with valid params' do
      it 'returns http created' do
        create_candidate
        expect(response).to have_http_status(:created)
      end

      it 'creates a candidate' do
        create_candidate
        expect(Candidate.last).to have_attributes(name: name, email: email, birthdate: Date.parse(birthdate))
      end
    end

    context 'with invalid params' do
      let(:email) { 'invalid-email' }

      it 'returns http unprocessable entity' do
        create_candidate
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not create a candidate' do
        expect { create_candidate }.not_to change(Candidate, :count)
      end
    end
  end
end
