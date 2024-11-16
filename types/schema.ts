// Database Schema Types
export interface User {
  user_id: number;
  name: string;
  gotra?: string;
  date_of_birth?: string;
  gender?: string;
  avatar?: string;
  email_id?: string;
  email_id_2?: string;
  email_id_3?: string;
  phone_number_1?: string;
  phone_number_2?: string;
  phone_number_3?: string;
  id?: number;
  email: string;
  organization?: string;
  password: string;
  profile_img?: string;
  role?: string;
  enabled?: boolean;
}

export interface Achievement {
  achievement_id: number;
  user_id: number;
  exceptional_talent?: string;
  awards_recognition?: string;
  comments?: string;
}

export interface Address {
  address_id: number;
  user_id: number;
  address_type: string;
  flat_door_number?: string;
  apartment_name?: string;
  first_line_address: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
}

export interface Business {
  business_id: number;
  user_id: number;
  company_business_name: string;
  business_email: string;
  description?: string;
  usp?: string;
  entity_type?: string;
  industry?: string;
  business_type?: string;
  product_or_service?: string;
  products_services?: string;
  import_export?: boolean;
  business_size?: string;
  business_stage?: string;
  address_type?: string;
  country?: string;
  city?: string;
  area?: string;
  pincode?: string;
  google_location?: string;
  phone?: string;
  founded_year?: number;
  business_pan?: string;
  gstin?: string;
  cin?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  android_app?: string;
  ios_app?: string;
  key_challenges?: string;
}

export interface Education {
  education_id: number;
  user_id: number;
  institution_name: string;
  course_name: string;
  class_level: string;
}

export interface Employment {
  employment_id: number;
  user_id: number;
  designation: string;
  start_date: string;
  role_in_business: string;
}

export interface FamilyRelation {
  relation_id: number;
  user_id: number;
  related_user_id: number;
  relationship_type: string;
}

export interface IdentificationDocument {
  document_id: number;
  user_id: number;
  document_type: string;
  document_number: string;
}

export interface MetadataTracking {
  metadata_id: number;
  user_id: number;
  current_key_challenges?: string;
  looking_for?: string;
  help_community?: string;
  investment_focus_domain?: string;
  investment_size?: string;
  invest_stage_startup?: string;
  key_criteria_investment?: string;
}

export interface SocialProfile {
  profile_id: number;
  user_id: number;
  platform: string;
  profile_url: string;
}