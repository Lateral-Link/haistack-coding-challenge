FactoryBot.define do
  factory :candidate, class: 'Candidate' do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    date_of_birth { rand(20..90).years.ago.to_date }
  end
end
