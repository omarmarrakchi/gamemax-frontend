import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription } from '../../models/subscription';
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  message: string = '';
  error: string = '';
  userId: number = 1;

  constructor(private subscriptionService: SubscriptionService,  private router: Router
  ) {

  }
  buyNow(subscriptionType: string) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    const newSubscription: Subscription = {
      userId: this.userId,
      startingDate: startDate.toISOString(),
      expirationDate: endDate.toISOString(),
      subscriptionType: subscriptionType  // Utilisation dynamique du type
    };

    console.log("Subscription Data Sent:", newSubscription);

    this.subscriptionService.saveSubscription(newSubscription).subscribe({
      next: (response) => {
        this.message = 'Subscription created successfully!';
        this.error = '';
        console.log(this.message, response);
        this.router.navigate(['/payment']);

        // ✅ Cache le message après 3 secondes
        setTimeout(() => {
          this.message = '';
          this.router.navigate(['/payment']);
        }, 3000);
      },
      error: (err) => {
        this.error = 'Error creating subscription';
        this.message = '';
        console.error(this.error, err);

        // ✅ Cache l'erreur après 3 secondes
        setTimeout(() => {
          this.error = '';
          this.router.navigate(['/payment']);
        }, 3000);
      }
    });
  }

}
