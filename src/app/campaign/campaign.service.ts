import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private campaigns: Campaign[] = [];
  
  private accountBalance: number = 20000; 
  private accountBalanceSubject = new BehaviorSubject<number>(this.accountBalance);
  accountBalance$ = this.accountBalanceSubject.asObservable(); 


  updateAccountBalance(fund: number) {
    this.accountBalance -= fund; 
    this.accountBalanceSubject.next(this.accountBalance); 
  }


  returnAccountBalance(fund: number) {
    this.accountBalance += fund; 
    this.accountBalanceSubject.next(this.accountBalance); 
  }

  // CRUD

  getCampaigns(): Campaign[] {
    return this.campaigns;
  }

  getCampaign(id: string): Campaign | undefined {
    return this.campaigns.find(cam => cam.id === id);
  }

  addCampaign(campaign: Campaign): void {
    campaign.id = Date.now().toString();
    this.campaigns.push(campaign);
    console.log(this.campaigns);

    this.updateAccountBalance(campaign.campaignFund);
  }

  deleteCampaign(id: string): void {
    let index = this.campaigns.findIndex(cam => cam.id === id);
    const campaignToDelete = this.campaigns[index];
    
    if (campaignToDelete) {

      this.returnAccountBalance(campaignToDelete.campaignFund);
      

      this.campaigns.splice(index, 1);
    }
  }

  updateCampaign(id: string, updatedCampaign: Campaign): void {
    let index = this.campaigns.findIndex(cam => cam.id === id);
    const oldCampaign = this.campaigns[index];


    const fundDifference = updatedCampaign.campaignFund - oldCampaign.campaignFund;

    if (fundDifference !== 0) {
      this.updateAccountBalance(Math.abs(fundDifference));
    }

    this.campaigns[index] = updatedCampaign;
  }
}
