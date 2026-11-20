
resource "azurerm_postgresql_flexible_server" "main" {
  name                = "todo-postgres-2026"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location

  version    = "16"
  sku_name   = "GP_Standard_D2s_v3"
  storage_mb = 32768

  delegated_subnet_id = azurerm_subnet.postgres.id
  private_dns_zone_id = azurerm_private_dns_zone.postgres.id

  administrator_login    = var.postgres_admin
  administrator_password = var.postgres_password

  backup_retention_days         = 7
  public_network_access_enabled = false

  tags = {
    project     = "todo-app"
    environment = "dev"
    managed_by  = "terraform"
  }
}
