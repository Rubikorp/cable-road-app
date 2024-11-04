interface IRepair {
    id: string;
    description: string;
    urgent: boolean;
    completed: boolean;
  }
  
  interface IPole {
    id: string;
    number: string;
    repairs: IRepair[];
  }

  export type {IRepair, IPole} 