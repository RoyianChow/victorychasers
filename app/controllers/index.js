// Index Controller
import { UserDisplayName } from "../utils/index.js";

export function displayHomePage(req, res, next){
    res.render('index',res.render('index', {title: 'Home', page: 'home', displayName: UserDisplayName(req)}));
    
}

export function displayAboutPage(req, res, next){
    res.render('index',res.render('index', {title: 'About', page: 'about', displayName: UserDisplayName(req)}));
}



export function displayContactPage(req, res, next){
    res.render('index',res.render('index', {title: 'Contact', page: 'contact', displayName: UserDisplayName(req)}));
}
