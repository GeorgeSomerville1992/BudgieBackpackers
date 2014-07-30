# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# ['registered', 'banned', 'moderator', 'admin'].each do |role|
#   Role.find_or_create_by_name({name: role})
# end

george = User.new(name: 'George', email: "george@ga.com", password: "password")
james = User.new(name: 'James', email: "james@ga.com", password: "password")
josh = User.new(name: 'Josh', email: "josh@ga.com", password: "password")