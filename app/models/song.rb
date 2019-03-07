class Song < ApplicationRecord
  validates :name, presence: true
  validates :storage_url, presence: true
  validates :user_id, presence: true

  belongs_to :user

  def friendly_created_at
    created_at.strftime("%e %b %Y %H:%M:%S%p")
  end

  def friendly_updated_at
    updated_at.strftime("%e %b %Y %H:%M:%S%p")
  end
end
