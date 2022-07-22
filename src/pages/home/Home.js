import './Home.css'
import homeModel from '../../assets/model-home.png'
import homeArrow from '../../assets/arrow-right.png'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <div id="home">
      <Helmet>
        <title>Hair Care</title>
      </Helmet>

      <img src={homeModel} alt="home lady" id="model-image" />
      <div className="container">
        <h3 className="line-one">SUBSCRIBE TO</h3>
        <h3 className="line-two">
          <span className="bolder">HAIR</span> CARE NEWSLETTER -
        </h3>
        <h3 className="line-three">GET DISCOUNTS FIRST!</h3>
        <p className="end">
          We'll send e-mails about discounts to you every month
        </p>
      </div>

      <div className="container flex">
        <div>
          <h4>500+</h4>
          <p className="vertical-gap-none">People already know</p>
          <p className="vertical-gap-none">about discounts</p>
        </div>

        <div className="subscribe">
          <img src={homeArrow} alt="" className="home-arrow" />

          <div className="pad-right div-btn">
            <p className="vertical-gap-none">SUBSCRIBE</p>
            <p className="vertical-gap-none">NOW</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
