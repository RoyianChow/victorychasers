// Index Controller

export function displayHomePage(req, res, next){
    res.render('index', {title: 'Home', page: 'home'});
}

export function displayAboutPage(req, res, next){
    res.render('index', {title: 'About', page: 'about'});
}

export function displayServicesPage(req, res, next){
    res.render('index', {title: 'Services', page: 'services'});
}

export function displayProjectsPage(req, res, next){
    res.render('index', {title: 'Projects', page: 'projects'});
}

export function displayContactPage(req, res, next){
    res.render('index', {title: 'Contact', page: 'contact'});
}
export function displayTournamentPage(req, res, next){
    res.render('index', {title: 'Create-Tournament', page: 'create-tournament'});
}
export function displayViewTournamentPage(req, res, next){
    res.render('index', {title: 'view-Tournament', page: 'view-tournament'});

}export function displayLoginPage(req, res, next){
    res.render('index', {title: 'login', page: 'login'});}
