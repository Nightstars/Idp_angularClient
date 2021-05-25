import { Injectable } from '@angular/core';
import {User, UserManager} from "oidc-client";
import {environment} from "../../environments/environment";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OpenIdConnectService {
private userManager=new UserManager(environment.openIdConnectSettings);
private currentUser: User | undefined;
get userAvailable():boolean{
  return !!this.currentUser;
}
get currentLoginUser(): User{
  return <User>this.currentUser;
}
userLoaded$=new ReplaySubject<boolean>(1);
  constructor() {
    this.userManager.clearStaleState();
    this.userManager
      .getUser()
      .then(user=>{
      if(user){
        this.currentUser=user;
        this.userLoaded$.next(true);
      }else{
        // @ts-ignore
        this.currentUser=null;
        this.userLoaded$.next(false);
      }
    })
      .catch(err =>{
      // @ts-ignore
      this.currentUser=null;
      this.userLoaded$.next(false);
    });

    this.userManager.events.addUserLoaded(user =>{
      console.log('user loaded',user);
      this.currentUser=user;
      this.userLoaded$.next(true);
    });

    this.userManager.events.addUserUnloaded(() =>{
      console.log('user unloaded');
      // @ts-ignore
      this.currentUser=null;
      this.userLoaded$.next(false);
    });
    }

  triggerSignIn() {
    this.userManager.signinRedirect().then(() =>{
      console.log('triggerSignIn');
    })
  }

  handleCallback() {
    this.userManager.signinRedirectCallback().then(user =>{
      this.currentUser=user;
      if (window.location.hash) {
        window.location.hash = decodeURIComponent(window.location.hash).replace('#', '?');
      }
      console.log('handleCallBack');
    })
  }

  handleSilentCallback() {
    this.userManager.signinSilentCallback().then(user =>{
      this.currentUser=user;
      if (window.location.hash) {
        window.location.hash = decodeURIComponent(window.location.hash).replace('#', '?');
      }
      console.log('handleSilentCallback');
    })
  }

  triggerSignOut() {
    this.userManager.signoutRedirect().then(res => {
      console.log('triggerSignOut');
    })
  }

}
