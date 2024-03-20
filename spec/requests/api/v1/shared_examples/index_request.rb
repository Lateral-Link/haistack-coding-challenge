class IndexRequest
  RSpec.shared_examples 'index request' do |url|
    context 'when object is found' do
      before { get "/api/v1/#{url}" }

      it 'returns success' do
        expect(response).to be_successful
      end

      it 'the field elements is an array of objects' do
        expect(response.parsed_body['data']['elements']).to be_a(Array)
      end

      it 'the field count is the length of ids field' do
        body = response.parsed_body
        expect(body['data']['count']).to eql(body['data']['ids'].size)
      end
    end
  end
end
