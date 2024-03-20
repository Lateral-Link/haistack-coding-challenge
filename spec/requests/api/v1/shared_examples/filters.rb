class Filters
  RSpec.shared_examples 'filter' do |url, filter_name, bad_value, column_name = filter_name|
    context 'with good value' do
      before { get "/api/v1/#{url}", params: { filter_name.to_sym => object.send(column_name.to_sym) } }

      it 'response contains the element' do
        item = response.parsed_body['data']['elements'].select { |elt| elt['id'] == object.id }
        expect(item).not_to be_empty
      end
    end

    context 'with bad value' do
      before { get "/api/v1/#{url}", params: { filter_name.to_sym => bad_value } }

      it "response doesnt contain the element filtered by #{filter_name}" do
        item = response.parsed_body['data']['elements'].select { |elt| elt['id'] == object.id }
        expect(item).to be_empty
      end
    end
  end
end
