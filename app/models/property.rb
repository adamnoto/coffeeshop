class Property < ApplicationRecord
  extend PropertyOptions

  SIZE = 'size'.freeze # tall, grande, venti
  TYPE = 'type'.freeze # tea or coffee

  ALL_PROPERTIES = [
    SIZE,
    TYPE
  ].freeze
end
