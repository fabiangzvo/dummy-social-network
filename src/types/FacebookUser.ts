export interface FacebookUser {
  id: string;
  first_name: string;
  last_name: string;
  name: string;
  name_format: string;
  picture: {
    data: {
      height: number;
      width: number;
      is_silhouette: boolean;
      url: string;
    };
  };
  short_name: string;
  email: string;
}
