import { Subscription } from '../subscription';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { WindowRefService } from '../window-ref.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  providers: [WindowRefService]
})
export class SubscriptionComponent implements OnInit {

  subscriptionID = '';


  constructor(private winRef: WindowRefService, private _subscriptionService: SubscriptionService) { }

  ngOnInit() {
  }
  payWithRazor(val) {
    this._subscriptionService.getSubscriptionID().subscribe(
      data => {
        this.subscriptionID = data.id;
        const options: any = {
          "key": "rzp_test_5EpPqDFLqVMpY5",
          "subscription_id": this.subscriptionID,
          "name": "Ritesh Ghorpade",
          "description": "For Mind Bowser",
          "image": "/your_logo.png",
          "handler": response => {
            this._subscriptionService.saveSubscription(response.razorpay_payment_id, response.razorpay_subscription_id, response.razorpay_signature).subscribe(
              data => {
                console.log('Sucess');
                console.log(data);
              },
              error => {
                console.log('Error');
                console.log(error.message);
              },
            );
          },
          "theme": {
            "color": "#F37254"
          }
        };
        const rzp = new this.winRef.nativeWindow.Razorpay(options);
        rzp.open();
      },
      error => {

      },
    );

  }
}
//"prefill": {
 // "name": "Gaurav Kumar",
 // "email": "gaurav.kumar@example.com",
 // "contact": "+919876543210"
//},