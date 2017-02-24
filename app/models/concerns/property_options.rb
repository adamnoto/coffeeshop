module PropertyOptions
  extend self

  SIZE_TALL = 'tall'.freeze
  SIZE_GRANDE = 'grande'.freeze
  SIZE_VENTI = 'venti'.freeze

  TYPE_TEA = 'tea'.freeze
  TYPE_COFFEE = 'coffee'.freeze

  def size_choices
    [SIZE_TALL, SIZE_GRANDE, SIZE_VENTI].freeze
  end

  def type_choices
    [TYPE_TEA, TYPE_COFFEE].freeze
  end
end
