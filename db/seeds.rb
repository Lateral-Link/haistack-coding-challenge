require 'factory_bot_rails'

puts 'Creating candidates...'

created_count = 0
10.times do
  candidate = FactoryBot.create(:candidate)
  if candidate.persisted?
    puts "Candidate created: Name: #{candidate.name}, Email: #{candidate.email}, Date of Birth: #{candidate.date_of_birth}"
    created_count += 1
  end
end

puts "#{created_count} candidates created successfully." if created_count.positive?
