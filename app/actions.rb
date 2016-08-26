require 'json'

helpers do
  def get_updated_contact_list
    Contact.all.order(:name)
  end
end

get '/' do
  @contacts = get_updated_contact_list
  erb :index
end

get '/search/:pattern' do
  pattern = "%" + params[:pattern] + "%"
  Contact.where("name LIKE ? OR email like ? OR phone LIKE ?",pattern,pattern,pattern).order(:name).to_json
end

post '/new' do
  Contact.create(
    name: params[:name],
    email: params[:email],
    phone: params[:phone]
  )
  get_updated_contact_list.to_json
end

post '/edit' do
  contact = Contact.find(params[:id])
  contact.email = params[:email]
  contact.phone = params[:phone]
  contact.save
  get_updated_contact_list.to_json
end

get '/delete/:id' do
  Contact.find(params[:id]).destroy
  get_updated_contact_list.to_json
end

get '/show' do
  get_updated_contact_list.to_json
end
