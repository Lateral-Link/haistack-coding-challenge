# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.7'
gem 'rails', '~> 6.1.7', '>= 6.1.7.3'

gem 'jbuilder', '~> 2.7'
gem 'mysql2', '~> 0.5'
gem 'puma', '~> 5.0'
gem 'react-rails'
gem 'rswag-api'
gem 'rswag-ui'
gem 'webpacker', '~> 5.0'

gem 'bootsnap', '>= 1.4.4', require: false

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails'
  gem 'faker', '~> 3.2.1'
  gem 'shoulda-matchers', '~> 5.3'
  gem 'simplecov', require: false
end

group :development do
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'web-console', '>= 4.1.0'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'rspec-rails', '~> 6.0.0', groups: %i[development test]

gem 'factory_bot_rails', '~> 6.0.0', groups: %i[development test]

gem 'rubocop', '~> 1.48', groups: %i[development test], require: false
gem 'rubocop-performance', '~> 1.16', groups: %i[development test], require: false
gem 'rubocop-rails', '~> 2.18', groups: %i[development test], require: false
gem 'rubocop-rake', '~> 0.6.0', groups: %i[development test], require: false
gem 'rubocop-rspec', '~> 2.19', groups: %i[development test], require: false
