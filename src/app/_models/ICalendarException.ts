export interface Detalles {
  idstore: string;
  name: string;
  d1: string;
  d2: string;
  d3: string;
  d4: string;
  d5: string;
  d6: string;
  d7: string;
  d8: string;
  d9: string;
  d10: string;
  d11: string;
  d12: string;
  d13: string;
  d14: string;
  d15: string;
  d16: string;
  d17: string;
  d18?: any;
  d19?: any;
  d20?: any;
  d21?: any;
  d22?: any;
  d23?: any;
  d24?: any;
  d25?: any;
  d26?: any;
  d27?: any;
  d28?: any;
  d29?: any;
  d30?: any;
}

export interface CalendarRutesExcept {
  label?: any;
  code: number;
  error?: any;
  detalles: Detalles[];
}

export interface DatesSalesCalenda {
  label?: any;
  code?: any;
  error?: any;
  detalles: Detalles[];
}
