interface IRepair {
    id: string;
    description: string;
    photos: {uri: string, text: string}[];
    urgent: boolean;
  }
  
  interface IPole {
    id: string;
    number: string;
    repairs: IRepair[];
  }

  export type {IRepair, IPole} 