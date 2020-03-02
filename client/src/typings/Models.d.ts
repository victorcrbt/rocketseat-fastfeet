declare namespace Models {
  export interface Avatar {
    readonly id: number;
    name: string;
    mime_type: string;
    avatar_url: string;
  }

  export interface Deliveryman {
    readonly id?: number;
    name?: string;
    avatar_id?: number;
    email?: string;
    avatar?: Avatar;
    readonly created_at?: Date;
    readonly updated_at?: Date;
  }

  export interface Package {
    readonly id?: number;
    recipient_id?: number;
    deliveryman_id?: number;
    signature_id?: number | null;
    product?: string;
    canceled_at?: Date | null;
    start_date?: Date | null;
    end_date?: Date | null;
    deliveryman?: Deliveryman;
    recipient?: Recipient;
    readonly created_at?: Date;
    readonly updated_at?: Date;
  }

  export interface Problems {
    readonly id?: number;
    package_id?: number;
    description?: string;
    package: Package;
    readonly created_at?: Date;
    readonly updated_at?: Date;
  }

  export interface Recipient {
    readonly id?: number;
    name?: string;
    address?: string;
    address_number?: string;
    complement?: string;
    state?: string;
    city?: string;
    zip_code?: string;
    readonly created_at?: Date;
    readonly updated_at?: Date;
  }

  export interface User {
    readonly id?: number;
    name?: string;
    email?: string;
    password?: string;
    readonly created_at?: Date;
    readonly updated_at?: Date;
  }
}
