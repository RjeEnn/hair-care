import './About.css'
import model from '../../assets/about-model.png'

const About = () => {
  return (
    <div id="about">
      <img src={model} alt="about" id="about-image" />
      <div className="about-container">
        <div className="about-banner">
          <h4 className="est">EST. 2022</h4>
          <h1>ABOUT -</h1>
          <h1>HAIR CARE</h1>
        </div>
        <div className="about-description">
          <h2>WHO WE ARE</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, aperiam magnam. Ea repellat aut iste. Expedita
            consequatur placeat officia, similique veniam voluptas non,
            consequuntur eius magni fugiat dicta, laborum vero!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
            porro ullam. Hic aperiam, unde cumque dicta laborum nesciunt
            voluptatibus adipisci!
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
