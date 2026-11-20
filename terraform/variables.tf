
variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}

variable "postgres_admin" {
  description = "PostgreSQL administrator username"
  type        = string
}

variable "postgres_password" {
  description = "PostgreSQL administrator password"
  type        = string
  sensitive   = true
}
