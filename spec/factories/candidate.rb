# frozen_string_literal: true

FactoryBot.define do
  factory :candidate do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    birthdate { Faker::Date.birthday(min_age: 18, max_age: 65) }
  end
end
