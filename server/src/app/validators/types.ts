export interface DeliverymanShowSchema {
  deliveryman: string;
}

export interface DeliverymanStoreSchema {
  name: string;
  avatar_id: number;
  email: string;
}

export interface DeliverymanUpdateSchema {
  name: string;
  avatar_id: number;
  email: string;
}

export interface DeliverymanDestroySchema {
  deliveryman: string;
}

export interface DeliveryUpdateSchema {
  package_id: string;
  deliveryman_id: string;
  start_date: Date;
  end_date: Date;
  signature_id: number;
}

export interface DeliveryProblemStoreSchema {
  package_id: string;
  description: string;
}

export interface PackageShowSchema {
  package_id: string;
}

export interface PackageStoreSchema {
  recipient_id: number;
  deliveryman_id: number;
  product: string;
  start_date: Date;
}

export interface PackageUpdateSchema {
  package_id: string;
  recipient_id: number;
  deliveryman_id: number;
  product: string;
  start_date: Date;
  end_date: Date;
  canceled_at: Date;
}

export interface PackageDestroySchema {
  package_id: string;
}

export interface RecipientShowSchema {
  recipient: string;
}

export interface RecipientStoreSchema {
  name: string;
  address: string;
  address_number: string;
  complement: string;
  state: string;
  city: string;
  zip_code: string;
}

export interface RecipientUpdateSchema {
  name: string;
  address: string;
  address_number: string;
  complement: string;
  state: string;
  city: string;
  zip_code: string;
  recipient: string;
}

export interface RecipientDestroySchema {
  recipient: string;
}

export interface SessionStoreSchema {
  email: string;
  password: string;
}

export interface UserStoreSchema {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
