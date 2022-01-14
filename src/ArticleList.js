import React, {useEffect, useState} from "react";
import { Typography, Card, CardContent, CardActions, Button, CardHeader, CardMedia, Fab } from '@mui/material';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { Snackbar, LinearProgress } from '@mui/material';
import { Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { capitainBluebearImage } from "./articles/CapitainBluebear";
import { tippingImage } from "./articles/Tipping";
import { applePieImage } from "./articles/ApplePie";
import { Article } from "./articles/Article";
import { kangarooImage } from "./articles/Kangaroo";
import { germanImage } from "./articles/Characteristics";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {supabase} from "./supabaseClient";
import CircularProgress from '@mui/material/CircularProgress';
import Container from "@mui/material/Container";
import { Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    article: {
        margin: "16px",
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function fetch_articles(user_id = 0) {
    /**
     * this function emulates an API response. replace this with an ajax request once you have a backend.
     * SEND user id from session
     * API recovers two information:
     * 1. select USER.level, USER.complete_articles from USER where USER.id == ID
     * 2. select * from ARTICLES where ARTICLES.level == USER.level
     * return a list of articles with an additional bool flag if each article is completed
     */
    return [
        {
            'id': 0,
            'completed': false,
            'title': 'Apple Pie',
            'preview': '"German Apple Cake is a traditional German dessert that is so easy to make even if you aren’t totally kitchen confident! With a simple batter that rises up and bakes around the apples this easy apple coffee cake is the perfect everyday dessert that tastes best with a dollop of whipped cream on top."',
            'content': 'Ingredients: <ul> <li> 120 g soft butter</li> <li>120 g sugar</li> <li>2 tbsp. vanilla extract</li> <li>1 pinch of salt</li> <li>3 eggs</li> <li>200g flour</li> <li>1 tsp baking powder</li> <li>4 - 5 sour apples (about 600 g)</li> <li>2 tbsp. sugar</li> </ul> <p>Method:</p> <p>Preheat the oven to 180 degrees. Grease mould and dust with flour. Cream eggs, butter, sugar, vanilla extract and salt. Add flour and baking powder and mix everything to a smooth dough. Peel the apples, remove the core, cut into quarters and score lengthwise on the back. Pour the dough into the tin, place the apples in a circle on top, sprinkle with 2 tbsp. sugar and bake in the oven for approx. 40 minutes until golden brown.</p> <p>After baking, leave to stand in the form for a few minutes, then remove and allow to cool. To serve, dust with icing sugar and serve with whipped cream if desired.</p>',
            'link': 'applepie',
            'category': 'Recipes',
            'media': applePieImage,
        },
        {
            'id': 1,
            'completed': true,
            'title': 'German Characteristics',
            'preview': 'It is true that many Germans tend to place punctuality as a high priority. Hence the global observation that German trains often run perfectly on time',
            'content': '<p>\n Traditionally, German people tie a lot of importance to notions of\n family and community. Regarding the latter, this is partially where the\n well-known ‘rule-following’ and orderly nature of the German people\n comes from: if everyone in the community follows the rules and does\n things the right way, the neighborhood/town/city/country will be a nice\n place for all residents to live, hence why many might seem like\n sticklers when it comes to correct recycling and late-night noise - they\n take it seriously for the sake of everyone.\n </p>',
            'link': 'characteristics',
            'category': 'Cultural Tips',
            'media': germanImage
        },
        {
            'id': 2,
            'completed': true,
            'title': 'Capitain Bluebear',
            'preview': 'The 13​¹⁄₂ Lives of Captain Bluebear is a 1999 fantasy novel by German writer and cartoonist Walter Moers which details the numerous lives of a human-sized bear with blue fur. It\'s a modern german classic.',
            'content': 'A life usually begins with birth - mine does not. At least I do not know\n how I came into life. I could - theoretically - have been born from the\n foam of a wave or grown in a shell like a pearl. I might have fallen from\n the sky, in a shooting star, but all that is certain is that I was\n abandoned as a foundling in the middle of the ocean. My first memory is\n that I was floating in rough seas, naked and alone in a walnut shell,\n because I was originally very, very small. I still remember a sound. It\n was a very big sound. No matter how small you are, you tend to\n overestimate things, but today I know that it was indeed the biggest sound\n in the world, generated by the most monstrous, dangerous and loudest water\n vortex in the seven seas - I had no idea that it was the dreaded Malmstrom\n I was looking at in my bowl. For me it was only a huge gurgling. Probably\n I thought (if you could call it thinking) that it was probably the most\n natural state to drift naked in a nutshell on the open sea towards a\n deafening roar.\n <p>Excerpt from The 13 1/2 Lives of Capitain Bluebear by Walter Moers.</p>',
            'link': 'bluebear',
            'category': 'Media',
            'media': capitainBluebearImage
        },
        {
            'id': 3,
            'completed': false,
            'title': 'The Kangaroo Chronicles',
            'preview': 'Marc-Uwe Kling writes funny songs and stories. His business model is to write books that fiercely criticize capitalism and sell incredibly well. For his Kangaroo stories he was awarded the German Radio Award, the German Cabaret Award and the German Audio Book Prize.',
            'content': '<h2>The Kangaroo from Across the Street</h2>\n <p>Ding Dong. It rings. I go to the door, open it and stand face to face a kangaroo. I blink, look behind me, look down the stairs, then up the stairs. I look straight ahead. The kangaroo is still there.</p>\n <p>"Hello," says the kangaroo, and without moving my head I look left, right, at the clock and finally at the kangaroo.</p>\n <p>"Hello", I say.</p>\n <p>"I\'ve just moved in across the street, wanted to make some pancakes, and I noticed that I forgot to buy eggs ... " I nod, go to the kitchen and come back with two eggs.</p>\n <p>"Thank you very much", says the kangaroo and puts the eggs into his bag, I nod and it disappears behind the door opposite the flat. I tap the tip of my nose several times with my left index finger - and close the door - and soon the doorbell rings again. I immediately open the door, because I am still standing behind it.</p>\n <p>"Oh!", says the kangaroo in surprise. "That was quick. Uh ... I just realised I haven\'t got any salt either."</p> <p>I nod, go to the kitchen and come back with a salt shaker.</p>\n <p>"Thank you very much! Perhaps if you had a little more milk and flour... " I nod and go into the kitchen.The kangaroo takes everything, says thank you and leaves. Two minutes later the doorbell rings again. I open the door and offer the kangaroo a pan and oil.</p>\n <p>"Thank you", says the kangaroo, "good thinking! Perhaps if you had another whisk or a mixer..." I nod and go off.</p>\n <p>"And maybe a mixing bowl?", the kangaroo calls after me. Ten minutes later the doorbell rings again.</p>\n <p>"No stove ...", the kangaroo just says. I nod and clear the way.</p>\n <p>"Just turn right," I say. The kangaroo goes into the kitchen, and I follow him.It turns out to be so clumsy that I take over the pan.</p>\n<p> Excerpt from The Kangaroo Chronicles by Marc - Uwe Kling.</p>',
            'link': 'kangaroo',
            'category': 'Media',
            'media': kangarooImage
        },
        {
            'id': 4,
            'completed': false,
            'title': 'Tipping Tips',
            'preview': 'Tipping in Germany and tipping in some other countries, such as the United States, are totally different. In Germany, waitresses are paid more and so the tips are smaller compared to the USA. Nevertheless, the 5-10% rule of thumb still applies.',
            'content': '<p>Service and VAT are included in the menu price in restaurants, bars, etc. all over Germany. \n Still, it is typical to "round up" the amount to some more-or-less round figure. A rule of \n thumb is to add 5-10%, generally ending with a full Euro amount.</p>\n <p><em>Caveat:</em> it is not typical to be given a check, then leave your money on the table. \n You have to tell the amount including tip you want to pay before you pay (via cash or credit card)</p>\n<p><em>How to pay:</em> Typically, the waiter/waitress always comes to you and tells you your \ntotal. You then tell him/her how much you will pay, i.e. the amount you owe plus any "rounding \n up" -- for example, the waiter / waitress might say "€7.60;" you hand him/her a €10 note and say \n "9 Euros." S/he then will give you €1 in change.</p>',
            'link': 'tipping',
            'category': 'Cultural Tips',
            'media': tippingImage
        }
    ]
}

function fetch_user_level(user_id){
    return 2
}

export function ArticleList({userInfo, updateUserInfo}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [notification, setNotification] = useState('');
    const [articles, setArticles] = useState();
    const [level, setLevel] = useState(fetch_user_level());
    const { articleId } = useParams();
    const history = useHistory();
    const vertical = 'bottom', horizontal = 'center';
    const [loading, setLoading] = useState(true)

    const handleClickOpen = () => {
        setOpen(true);
        setContent('');
    };

    const handleClose = () => {
        setOpen(false);
        setContent('');
    };

    const notificationReset = () => {
        setNotification('')
    }

    useEffect(() => {
        if (!articles) {
            setLoading(true)
            supabase
                .rpc('get_completed_articles', {
                    logged_user_id: supabase.auth.session().user.id
                })
                .eq('level', userInfo.level)
                .eq('lang', userInfo.language)
                .then(response => {
                    const {data, error} = response
                    if (error)
                        console.log(error)
                        setArticles(["call failed"])
                    if (data){
                        setArticles(data)
                    }
                    setLoading(false)
                })
        }

        // if (articles.every((article) => article.completed)) {
        //     setNotification("CONGRATS! you just advanced to level " + (level + 1))
        //     setLevel(level + 1)
        //     // TODO: load new articles for the next level from backend
        //     setArticles([{
        //             'id': 99,
        //             'completed': false,
        //             'title': 'Harder article',
        //             'content': 'this is a new article, harder and more complex with new words',
        //             'link': 'bluebear',
        //             'category': 'Media',
        //             'media': capitainBluebearImage
        //         }],
        //     )
        // }
    });

    const markAsComplete = (articleId) => {
        setArticles(articles.map((article) => article.id === articleId ? {...article, completed: true} : article));
        // TODO: send new state to backend, we reset this on page refresh atm
        history.push("/articles")
        setNotification("CONGRATS! Article \"" + articles[articleId].title + "\" is completed!")
    }

    function getArticle(articleId){
        let article = articles.find(article => article.id === articleId)
        if(article)
            return(
                <Article title={article.title} image={article.media} onComplete={() => markAsComplete(articleId)}>
                    {article.content}
                </Article>
            )
        return(
            <Grid container spacing={2} alignItems="stretch">
                {articles.map((article, i) => {
                   return (
                       <Grid item xs={12} lg={4} md={6} key={i}>
                           {preview(article.title, article.preview, article.link, article.category, article.media, article.id, article.completed)}
                       </Grid>
                   )
                })}
            </Grid>
        )
    }

    function preview(title, content, link, category, image, articleId, completed=false) {
        return (
            <Card key={articleId} elevation={4} sx={{ height: '100%' }} className={classes.article}>
                <div className="completed-anchor">
                    <CardMedia image={image} className={completed? 'completed-article': null} component="img" height="160"/>
                    {completed? <span className='completed-banner'>COMPLETED</span>:null}
                </div>
                <CardHeader title={title} subheader={category}/>
                <CardContent>
                    <Typography variant="body1" color="textSecondary">
                        {content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={"/articles/" + articleId}>
                        <Button size="small" color="primary">
                            Read More
                        </Button>
                    </Link>
                </CardActions>
            </Card >);
    }

    return <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Content</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insert text of a new article
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="addText"
                    multiline
                    fullWidth
                    value={content}
                    onChange={(event) => { setContent(event.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Link to="/articles/myarticle">
                    <Button onClick={() => {
                        localStorage.setItem("myArticle", content);
                        handleClose();
                    }} color="primary">
                        Submit
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
        {
            loading ? <CircularProgress/> :
                <>
                    {getArticle(parseInt(articleId))}
                    <Snackbar
                        autoHideDuration={3000}
                        anchorOrigin={{vertical, horizontal}}
                        open={Boolean(notification)}
                        onClose={notificationReset}
                        message={notification}
                        key={notification}
                    />
                </>
        }
        <Fab aria-label="import" color="primary" className={classes.fab} onClick={handleClickOpen}>
            <PostAddIcon />
        </Fab>
    </div >
}