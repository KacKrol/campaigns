import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  accountBalance: number = 20000;

  constructor(private campaignService: CampaignService) {}

  
   ngOnInit(): void {
    
    this.campaignService.accountBalance$.subscribe(balance => {
      this.accountBalance = balance
    });
  }
}
