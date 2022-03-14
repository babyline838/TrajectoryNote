export interface Trajectory {
  date: string;
  records: Record[];
}

export interface Record {
  location: string;
  close_contacts: Person[];
  // TODO: implement fields
}

export interface Person {
  name: string;
  relation: string;
  with_mask: boolean;
  phone: string;
  department: string;
}
