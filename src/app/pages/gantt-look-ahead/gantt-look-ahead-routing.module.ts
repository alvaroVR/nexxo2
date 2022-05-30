import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GanttLookAheadComponent} from "./gantt-look-ahead/gantt-look-ahead.component";

const routes: Routes = [{
  path: '',
  component: GanttLookAheadComponent,
  data: {title: 'Lookahead'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GanttLookAheadRoutingModule {
}
