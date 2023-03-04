import Nav from '../Components/Nav'
import '../App.css'

export default function LandingPage() {
    return(
        <div className="landingPage">
            <Nav />
            <article className='landingArticle'>
                <div className='article'>
                    <div className='text'>
                        <h1 className='appreciationBigText'>APPRECIATION...</h1>
                        <p className='para'>This clone website is my token of appreciation to the developers of Discord for allowing me to meet new people, create connections, and so much more.</p>
                    </div>
                    <div className="svgContainer">
                        <img src="/undraw_appreciation_5ugl.svg" alt="person-holding-heart-balloon" className='appreciationSvg'/>
                    </div>
                </div>
            </article>
            <article className="myArticle">
                <section className='myArticleBox'>
                    <div className="mySvgContainer">
                        <img src='/undraw_male_avatar_g98d.svg' alt='my-svg' className='profileSvg'/>
                    </div>
                    <div className="myText">
                        <h1 className="myIntroduction">Introducing myself...</h1>
                        <p className='myPara'>Hi! My name's Waffen. Not your typical first name, I know. I'm currenly situated in the Philippines. At the making of this website, I am currently enrolled in the 11th-grade. I'm looking to pursue a career in Web Development in the future!</p>
                    </div>
                </section>
            </article>
            <footer>
                <h5>Made with <span style={{ color: 'red', fontSize: '1.1em'}}>♥</span> by Waffen Sultan</h5>
            </footer>
        </div>
    )
}