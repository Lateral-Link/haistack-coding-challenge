class CreateRequestWithGoodParams
  RSpec.shared_examples 'create request with good params' do |url|
    before { post "/api/v1/#{url}", params: params }

    it 'returns success' do
      expect(response).to be_successful
    end

    it 'adds the object in the db' do
      id = response.parsed_body['data']['id']
      expect(klass.take(id)).not_to be_empty
    end
  end
end
