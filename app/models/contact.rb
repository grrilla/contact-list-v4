class Contact < ActiveRecord::Base

  validates :email,
    presence: true

  validates :name,
    presence: true


  # def to_s
  #   "#{id}: #{name} (#{email})"
  # end

end
