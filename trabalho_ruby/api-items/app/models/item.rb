class Item < ApplicationRecord
    belongs_to :type

    validates :name, presence: true
end
