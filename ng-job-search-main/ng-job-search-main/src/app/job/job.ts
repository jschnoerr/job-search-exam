export interface Job {
    id: number;
    companyName: string;
    title: string;
    companyLogo: string;
    reference: string;
}

export interface DetailedJob extends Job {
    location: string;
    industries: string[];
    types: string[];
    description: string;
    publishDate: string;
  }