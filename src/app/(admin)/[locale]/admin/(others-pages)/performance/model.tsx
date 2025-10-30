
export  default interface PerformanceModel {
  performancecode : string;
  agentcode: string; 
  name: string; 
  description: string; 
  files: [{
    id: number; 
    path: string; 
  }]; 
}