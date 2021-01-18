import { Subscription } from '../subscription';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { WindowRefService } from '../window-ref.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  providers: [WindowRefService]
})
export class SubscriptionComponent implements OnInit {

  subscriptionID = '';
  loggedIn = "false";
  error = '';


  constructor(private winRef: WindowRefService, private _subscriptionService: SubscriptionService, private _route: Router) { }

  ngOnInit() {
    this._subscriptionService.getSubscriptionAndLoginInfo().subscribe(
      data => {
        console.log(data);
        this.subscriptionID = data.subscriptionID;
        this.loggedIn = data.loggedIn;
      },
      error => {
        console.log('Error');
        console.log(error.message);
      }
    );
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
                this.subscriptionID = "";
                this.error = "Transaction failed please try again";
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
  cancelWithRazor() {
    this._subscriptionService.cancelSubscriptionID().subscribe(data => {
      console.log('Cancel Sucess');
      this.subscriptionID = '';
    }, error => {
      console.log('Error');
      console.log(error.message);;
    });
  }
  login() {
    this._route.navigate(['/']);
  }
}
//"prefill": {
 // "name": "Gaurav Kumar",
 // "email": "gaurav.kumar@example.com",
 // "contact": "+919876543210"
//},