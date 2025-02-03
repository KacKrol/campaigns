import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from '../campaign/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-form',
  standalone: false,
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit {

  campaignForm: FormGroup = new FormGroup({});
  currentCampaignId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.campaignForm = this.formBuilder.group({
      campaignName: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: ['', Validators.required],
      campaignFund: ['', Validators.required],
      status: [false],
      town: ['Not selected'],
      radius: ['', Validators.required]
    });

    this.currentCampaignId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.currentCampaignId) {
      const campaign = this.campaignService.getCampaign(this.currentCampaignId);

      if (campaign) {
        this.campaignForm.patchValue(campaign);
      }
    }
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      const campaign = this.campaignForm.value;

      if (this.currentCampaignId) {
        this.campaignService.updateCampaign(this.currentCampaignId, campaign);
      } else {
        this.campaignService.addCampaign(campaign);
      }

      this.router.navigate(['/list']);
    }
  }
}
