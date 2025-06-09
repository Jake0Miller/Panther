FactoryBot.define do
  factory :matter do
    title { "Test Matter" }
    description { "A description of the matter." }
    association :customer
  end
end 