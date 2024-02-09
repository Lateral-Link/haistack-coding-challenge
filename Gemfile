# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.7'

gem 'bootsnap', '>= 1.4.4', require: false
gem 'jbuilder', '~> 2.7'
gem 'mysql2', '~> 0.5'
gem 'puma', '~> 5.0'
gem 'rails', '~> 6.1.7', '>= 6.1.7.3'
gem 'rswag'
gem 'webpacker', '~> 5.0'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails', '~> 6.0.0', require: false
  gem 'faker', '~> 3.2'
  gem 'pry-byebug'
  gem 'rspec-rails', '~> 6.0.0'
  gem 'rubocop', '~> 1.48', require: false
  gem 'rubocop-performance', '~> 1.16', require: false
  gem 'rubocop-rails', '~> 2.18', require: false
  gem 'rubocop-rake', '~> 0.6.0', require: false
  gem 'rubocop-rspec', '~> 2.19', require: false
end

group :development do
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'ruby-lsp-rails'
  gem 'web-console', '>= 4.1.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
