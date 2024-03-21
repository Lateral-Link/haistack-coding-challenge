class UpdateRequestWithBadParams
  RSpec.shared_examples 'update request with bad params' do |url|
    before { put "/api/v1/#{url}/#{object.id}", params: params }

    it 'return 422' do
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'fills the expected field with an error' do
      message = response.parsed_body['status']
      expect(message).to include('is invalid')
    end
  end
end
