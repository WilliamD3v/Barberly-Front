export interface Payments {
  _id: string,
  client_reference_id: string,
  userEmail: string,
  stripe_subscription_id: string,
  stripe_customer_id: string,
}