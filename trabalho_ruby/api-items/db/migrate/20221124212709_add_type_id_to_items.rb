class AddTypeIdToItems < ActiveRecord::Migration[7.0]
  def change
    add_reference :items, :type, null: false, foreign_key: true
  end
end
