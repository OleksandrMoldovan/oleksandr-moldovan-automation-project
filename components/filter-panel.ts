import {  Page } from '@playwright/test';

export class FilterPanel{

  private readonly page: Page;

  constructor(page: Page){  
    this.page = page;
  }
  async checkFilter(filterOption: string){
    await this.page.getByRole('checkbox', { name: filterOption, exact: true }).check(); 
  }
}

export enum HandTools {
  Hammer = 'Hammer',
  HandSaw = 'Hand Saw',
  Wrench = 'Wrench',
  Screwdriver = 'Screwdriver',
  Pliers = 'Pliers',
  Chisels = 'Chisels',
  Measures = 'Measures',
}

export enum PowerTools {
  Grinder = 'Grinder',
  Sander = 'Sander',
  Saw = 'Saw',
  Drill = 'Drill',
}

export enum Other {
  ToolBelts = 'Tool Belts',
  StorageSolutions = 'Storage Solutions',
  Workbench = 'Workbench',
  SafetyGear = 'Safety Gear',
  Fasteners = 'Fasteners',
}
