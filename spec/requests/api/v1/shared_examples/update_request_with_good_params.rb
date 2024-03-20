class UpdateRequestWithGoodParams
  RSpec.shared_examples 'update request with good params' do |url|
    before { put "/api/v1/#{url}/#{object.id}", params: params }

    it 'returns success' do
      expect(response).to be_successful
    end

    it 'updates the object in the db' do
      new_value = response.parsed_body['data'][field]
      expect(new_value).to eq expected_value
    end

    context 'when object is not found' do
      before { put "/api/v1/#{url}/#{object.id + 1}", params: params }

      it 'returns 404' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
