import { Locator, Page } from '@playwright/test';
import type { allSortOption } from '../tests/data/sorting-options';

export class SortProducts {
  private readonly page: Page;
  private readonly sortDropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropDown = this.page.locator('[data-test="sort"]');
  }

  async selectSortOption(option: allSortOption) {
    await this.sortDropDown.selectOption(option);
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

export class FilterPanel{

  private readonly page: Page;

  constructor(page: Page){  
    this.page = page;
  }
  async checkFilter(filterOption: string){
    await this.page.getByRole('checkbox', { name: filterOption, exact: true }).check(); 
  }
}
