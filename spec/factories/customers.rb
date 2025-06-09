FactoryBot.define do
  factory :customer do
    name { "Test Customer" }
    phone { "+1234567890" }
    association :user
  end
end 