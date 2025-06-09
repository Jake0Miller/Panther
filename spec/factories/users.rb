FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    firm_name { "Test Firm" }
    password { "password123" }
  end
end 