# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'home/index.html.erb' do
  it 'renders the home' do
    render

    expect(rendered).to include('Haistack Coding Challenge')
  end
end
