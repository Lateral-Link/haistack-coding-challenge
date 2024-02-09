# frozen_string_literal: true

RSpec.describe 'Api::V1::Candidates' do
  describe 'GET /' do
    subject(:get_candidates) { get '/api/v1/candidates', params: params }

    let(:params) { {} }

    it 'returns http success' do
      get_candidates
      expect(response).to have_http_status(:success)
    end

    it 'returns a list of candidates' do
      candidates = create_list(:candidate, 2)
      get_candidates
      expect(response.parsed_body).to eq({
        candidates: [{
          id:        candidates.first.id,
          name:      candidates.first.name,
          email:     candidates.first.email,
          birthdate: candidates.first.birthdate.to_s
        }, {
          id:        candidates.second.id,
          name:      candidates.second.name,
          email:     candidates.second.email,
          birthdate: candidates.second.birthdate.to_s
        }],
        meta:       { page: 1, per_page: 20, total_pages: 1, total_count: 2 }
      }.deep_stringify_keys)
    end

    context 'with pagination' do
      let(:params) { { page: 2, per_page: 2 } }

      it 'returns only paginated elements' do
        candidates = create_list(:candidate, 3)
        get_candidates
        expect(response.parsed_body).to eq({
          candidates: [{
            id:        candidates.third.id,
            name:      candidates.third.name,
            email:     candidates.third.email,
            birthdate: candidates.third.birthdate.to_s
          }],
          meta:       { page: 2, per_page: 2, total_pages: 2, total_count: 3 }
        }.deep_stringify_keys)
      end
    end
  end

  describe 'GET /:id' do
    subject(:get_candidate) { get "/api/v1/candidates/#{candidate_id}" }

    let(:candidate_id) { candidate.id }
    let(:candidate) { create(:candidate) }

    context 'with existing candidate' do
      it 'returns http success' do
        get_candidate
        expect(response).to have_http_status(:success)
      end

      it 'returns the candidate' do
        get_candidate
        expect(response.parsed_body).to eq({
          id:        candidate.id,
          name:      candidate.name,
          email:     candidate.email,
          birthdate: candidate.birthdate.to_s
        }.deep_stringify_keys)
      end
    end

    context 'with non-existing candidate' do
      let(:candidate_id) { 'invalid-id' }

      it 'returns http not found' do
        get_candidate
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'PUT /:id' do
    subject(:update_candidate) { put "/api/v1/candidates/#{candidate_id}", params: params }

    let(:candidate_id) { candidate.id }
    let(:params) { { candidate: { name: 'John Doe', email: 'john@doe.com', birthdate: 20.years.ago } } }
    let(:candidate) { create(:candidate) }

    context 'with valid params' do
      it 'returns http ok' do
        update_candidate
        expect(response).to have_http_status(:ok)
      end

      it 'updates the candidate' do
        update_candidate
        expect(candidate.reload).to have_attributes(
          id:        candidate.id,
          name:      'John Doe',
          email:     'john@doe.com',
          birthdate: 20.years.ago.to_date
        )
      end
    end

    context 'with invalid params' do
      let(:params) { { candidate: { email: 'invalid-email' } } }

      it 'returns http unprocessable entity' do
        update_candidate
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not update the candidate' do
        update_candidate
        expect(candidate.reload).to have_attributes(
          id:        candidate.id,
          name:      candidate.name,
          email:     candidate.email,
          birthdate: candidate.birthdate
        )
      end
    end

    context 'with non-existing candidate' do
      let(:candidate_id) { 'invalid-id' }

      it 'returns http not found' do
        update_candidate
        expect(response).to have_http_status(:not_found)
      end
    end
  end

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
