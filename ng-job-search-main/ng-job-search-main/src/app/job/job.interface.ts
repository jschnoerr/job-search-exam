export interface Job {
    readonly id: number;
    readonly companyName: string;
    readonly title: string;
    readonly companyLogo: string;
    readonly reference: string;
}

export interface DetailedJob extends Job {
    readonly location: string;
    readonly industries: string[];
    readonly types: string[];
    readonly description: string;
    readonly publishDate: string;
  }