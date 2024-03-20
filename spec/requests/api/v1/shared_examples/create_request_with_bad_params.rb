class CreateRequestWithBadParams
  RSpec.shared_examples 'create request with bad params' do |url|
    before { post "/api/v1/#{url}", params: params }

    it 'returns 422' do
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'fills the expected field with an error' do
      message = response.parsed_body['status']
      expect(message).to include('is invalid')
    end
  end
end
