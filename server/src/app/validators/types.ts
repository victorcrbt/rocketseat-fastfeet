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