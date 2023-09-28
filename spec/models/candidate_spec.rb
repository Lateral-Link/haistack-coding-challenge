require 'rails_helper'

RSpec.describe Candidate, type: :model do
  it 'is valid with a name' do
    candidate = Candidate.new(
      name: 'John Doe',
      email: 'john@example.com',
      date_of_birth: 25.years.ago.to_date
    )
    expect(candidate).to be_valid
  end

  it 'is invalid without a name' do
    candidate = Candidate.new(email: 'john@example.com', date_of_birth: 25.years.ago.to_date)
    candidate.valid?
    expect(candidate.errors[:name]).to include("can't be blank")
  end

  it 'is valid with a valid email format' do
    candidate = Candidate.new(
      name: 'John Doe',
      email: 'test@example.com',
      date_of_birth: 25.years.ago.to_date
    )
    expect(candidate).to be_valid
  end

  it 'is invalid with an invalid email format' do
    candidate = Candidate.new(email: 'invalid_email')
    candidate.valid?
    expect(candidate.errors[:email]).to include('is invalid')
  end

  it 'is valid with a date of birth in the past' do
    candidate = Candidate.new(
      name: 'John Doe',
      email: 'john@example.com',
      date_of_birth: 20.years.ago.to_date
    )
    expect(candidate).to be_valid
  end

  it 'is invalid with a date of birth in the future' do
    candidate = Candidate.new(date_of_birth: 1.day.from_now.to_date)
    candidate.valid?
    expect(candidate.errors[:date_of_birth]).to include('must be in the past')
  end

  it 'is valid with an age greater than 16 years old' do
    candidate = Candidate.new(
      name: 'John Doe',
      email: 'john@example.com',
      date_of_birth: 17.years.ago.to_date
    )
    expect(candidate).to be_valid
  end

  it 'is invalid with an age less than 16 years old' do
    candidate = Candidate.new(date_of_birth: 15.years.ago.to_date)
    candidate.valid?
    expect(candidate.errors[:date_of_birth]).to include('must be at least 16 years old')
  end

  it 'is valid with an age less than 70 years old' do
    candidate = Candidate.new(
      name: 'John Doe',
      email: 'john@example.com',
      date_of_birth: 69.years.ago.to_date
    )
    expect(candidate).to be_valid
  end

  it 'is invalid with an age greater than 70 years old' do
    candidate = Candidate.new(date_of_birth: 71.years.ago.to_date)
    candidate.valid?
    expect(candidate.errors[:date_of_birth]).to include('must be at most 70 years old')
  end
end
