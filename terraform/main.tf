
resource "azurerm_resource_group" "main" {
  name     = "rg-todo-app"
  location = "Central India"

  tags = {
    project     = "todo-app"
    environment = "dev"
    managed_by  = "terraform"
  }
}
