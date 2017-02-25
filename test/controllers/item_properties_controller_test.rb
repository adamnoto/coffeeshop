require 'test_helper'

class ItemPropertiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get item_properties_index_url
    assert_response :success
  end

end
