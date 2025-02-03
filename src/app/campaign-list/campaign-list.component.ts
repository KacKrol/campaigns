import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../models/campaign';

@Component({
  selector: 'app-campaign-list',
  standalone: false,
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.css'
})
export class CampaignListComponent implements OnInit {

  campaigns: Campaign[] = [];

  constructor(private campaignService: CampaignService) {

  }

  ngOnInit(): void {
    this.campaigns = this.campaignService.getCampaigns();
  }

  deleteCampaign(id: string){
    this.campaignService.deleteCampaign(id);
  }
}
