import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "new", component: CampaignFormComponent},
  {path: "list", component: CampaignListComponent},
  {path: "edit/:id", component: CampaignFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
