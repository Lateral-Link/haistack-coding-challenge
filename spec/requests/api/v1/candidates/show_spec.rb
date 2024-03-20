require 'rails_helper'
require 'support/factory_bot'
require 'requests/api/v1/shared_examples/show_request'

RSpec.describe 'Candidates' do
  describe 'Show' do
    let(:object) { create(:candidate) }

    it_behaves_like 'show request', 'candidates'
  end
end
