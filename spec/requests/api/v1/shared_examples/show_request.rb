class ShowRequest
  RSpec.shared_examples 'show request' do |url|
    context 'when object is found' do
      before { get "/api/v1/#{url}/#{object.id}" }

      it 'returns success' do
        expect(response).to be_successful
      end
    end

    context 'when object is not found' do
      before { get "/api/v1/#{url}/0" }

      it 'returns 404' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
