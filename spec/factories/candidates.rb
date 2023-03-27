FactoryBot.define do
  factory :candidate do
    sequence(:name) { |n| "Joe Doe #{n}" }
    sequence(:email) { |n| "joedoe#{n}@email.com" }
    birth_date { "2000-03-27" }
  end
end