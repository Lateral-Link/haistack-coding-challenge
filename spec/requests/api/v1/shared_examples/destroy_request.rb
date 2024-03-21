class DestroyRequest
  RSpec.shared_examples 'destroy request' do |url|
    context 'when object is found' do
      before { delete "/api/v1/#{url}/#{object.id}" }

      it 'returns success' do
        expect(response).to be_successful
      end

      it 'deletes the object in the db' do
        klass = object.class.name.constantize
        removed = klass.find_by(id: object.id)
        expect(removed).to be_nil
      end
    end

    context 'when object is not found' do
      before { delete "/api/v1/#{url}/#{object.id + 1}" }

      it 'returns 404' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
