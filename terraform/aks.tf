
resource "azurerm_kubernetes_cluster" "main" {
  name                = "todo-aks-cluster"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "todoaks"

  default_node_pool {
    name           = "default"
    node_count     = 1
    vm_size        = "Standard_B2s_v2"
    vnet_subnet_id = azurerm_subnet.aks.id
  }
  network_profile {
    network_plugin = "azure"
    service_cidr   = "10.2.0.0/16"
    dns_service_ip = "10.2.0.10"
  }

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.aks.id]
  }

  tags = {
    project     = "todo-app"
    environment = "dev"
    managed_by  = "terraform"
  }

  depends_on = [
    azurerm_role_assignment.aks_network
  ]
}
