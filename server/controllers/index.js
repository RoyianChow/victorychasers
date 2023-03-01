//File name: comp229_midterm_301256903
//Name: Royian Chowdhury
// Student ID: 301256903
// Web app name: comp229-w2023-midterm-301256903.azurewebsites.net
export function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}