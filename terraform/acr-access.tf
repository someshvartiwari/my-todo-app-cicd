
resource "azurerm_role_assignment" "aks_acr_pull" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPull"

  principal_id   = azurerm_kubernetes_cluster.main.kubelet_identity[0].object_id
  principal_type = "ServicePrincipal"

  skip_service_principal_aad_check = true
}
