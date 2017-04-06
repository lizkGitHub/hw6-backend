const defaultUser = 'zl52'

let articles = { 
    "articles" : [
        {"_id":1,"text":"Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Vivamus aliquet elit ac nisl. Fusce fermentum odio nec arcu. Vivamus euismod mauris. In ut quam vitae odio lacinia tincidunt. Praesent ut ligula non mi varius sagittis. Cras sagittis. Praesent ac sem eget est egestas volutpat. Vivamus consectetuer hendrerit lacus. Cras non dolor. Vivamus in erat ut urna cursus vestibulum. Fusce commodo aliquam arcu. Nam commodo suscipit quam. Quisque id odio. Praesent venenatis metus at tortor pulvinar varius.","date":"2015-07-11T11:31:58.291Z","img":null,"comments":[],"author":"cjb6test"},
        {"_id":2,"text":"Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh. Sed a libero. Cras varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Nam at tortor in tellus interdum sagittis. Aliquam lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. Nam adipiscing. Vestibulum eu odio.\r","date":"2015-08-30T15:46:03.575Z","img":null,"comments":[],"author":"cjb6"},
        {"_id":3,"text":"Pellentesque commodo eros a enim. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Sed libero. Aliquam erat volutpat. Etiam vitae tortor. Morbi vestibulum volutpat enim. Aliquam eu nunc. Nunc sed turpis. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Nulla porta dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.\r","date":"2015-05-10T08:27:30.126Z","img":null,"comments":[],"author":"gradertest"}]} 

// receives a JSON article, return the article with an id, 
// and add the article to the list returned by GET
const addArticle = (req, res) => {
     const numArticles = articles.articles.length;
     const article = {}
     let result = {}
     article._id = numArticles + 1
     article.text = req.body.text
     article.author = defaultUser
     article.comemnts = []
     result.articles = [article] 
     res.send(result)
     articles['articles'].push(article)

}

const getArticles = (req, res) => {
    const _id = req.params.id
    console.log(req.params.id)
    if (!_id) {
        res.send(articles)
    } else {
    	const result = {}
    	result.articles = articles.articles.filter(article => (article._id == _id))
        res.send(result)
    }
} 

const index = (req, res) => {
     res.send({ hello: 'world' })
}

 

module.exports = (app) => {
    app.get('/', index)
	app.post('/article', addArticle)
	app.get('/articles/:id*?', getArticles)
}