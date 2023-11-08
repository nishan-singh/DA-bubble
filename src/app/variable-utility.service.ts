import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VariableUtilityService {
  trackSidebar: boolean = false;
  constructor() {}

  toggleSidebar(): boolean {
    return (this.trackSidebar = !this.trackSidebar);
  }
}
